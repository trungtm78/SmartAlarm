# SmartAlarm — Functional Requirements Document

![SmartAlarm — explanatory diagram](assets/03-Proactive-Rescue.svg)


Version 3.0 · 24/10/2026 · Proposed design. WF IDs are cross-screen requirements; FR-<screen ID> denotes detailed interface specifications in Screen-Specifications.md. Together they form the complete FRD for the baseline.

Revision 3.0 is a complete design baseline, not a deployed or certified product. WF-01–WF-20 below, mandatory WF-21–WF-27 appendices, and WF-28–WF-33 physical workflows together with WF-34–WF-37 form 37 workflows. The screen catalog contains 241 screens, including F01–F20. Physical integration must use configuration-specific evidence from [Physical Device Catalog](Physical-Device-Catalog.md); the functional requirements below do not assert unsupported vendor capabilities.

## 1. Terminology and state models

**Signal/Event:** an immutable observation from a source, with observed_at and received_at. **Incident:** an operational record collecting evidence, with severity and an owner. **SOS:** a request for assistance for a person/group, with its own state and an optional incident link. **Warning:** a message issued by version and audience. **Delivery:** one sending attempt through one channel. **Task:** an assignment for a unit. **Personal status:** a sourced statement/status, not an inference of absolute safety. **Command:** an instruction to a device, separate from an event.

| Object | Valid states | Transition condition / actor |
|---|---|---|
| Signal | received → validated → correlated / quarantined / rejected | Gateway validates schema/source/tenant; invalid signals do not enter live workflows |
| Incident | new → triaging → active → contained → resolved → closed | Operator triage; supervisor closes after checklist completion; reopening requires a reason |
| Incident exception | new/triaging → dismissed; any incident not yet closed → linked | Dismissal requires a reason; linking does not delete IDs or evidence |
| SOS | submitted → acknowledged → assigned → assisting → resolved | Server receipt differs from operator ACK; responders update only assigned tasks |
| SOS cancel | submitted/acknowledged/assigned → cancellation_requested → canceled or continued processing | After dispatch, an operator decision is required; citizens cannot delete the record |
| Person status | unknown, in_danger, help_requested, self_reported_safe, responder_confirmed_assisted | Append observations with timestamp/source; may return to danger; safe does not close the incident |
| Warning | draft → review → approved → sending → active → expired / canceled | New versions require reapproval; authors cannot approve their own work when policy requires separation |
| Task | offered → accepted → en_route → on_scene → completed | Offer deadline → expired → reassign; decline requires a reason; a task has one current owner |
| Command | requested → approved → dispatched → accepted → executing → succeeded / failed / unknown / expired | Device acceptance does not prove success; a timeout does not automatically mean physical failure |

**Physical asset:** an installed, configuration-bound controller, pump, valve, releasing system, or rescue device. **Capability:** independently approved observe/control permission for an exact operation. **Physical feedback:** observed evidence distinct from transport/device acknowledgment. **Impairment:** an authorized reduction in protection requiring compensating measures and verified restoration. **Mission:** a supervised equipment operation with local authority and handover. UI label UNKNOWN maps to the existing machine state `unknown`; it is not a new terminal success/failure state. Impairment lifecycle: requested → approved → active → restoration_pending → verified_closed; expiry without restoration stays restoration_pending and escalates. Mission lifecycle: draft → review → approved → locally_accepted → executing → completed / aborted / unknown; completion requires outcome evidence.

## 2. Authorization and common controls

Every endpoint checks the principal, tenant membership, region, site scope, object ownership, and action permission on the server. Hiding frontend buttons is not a security control. Family members see only shared fields; operators see information needed for the incident; platform admins have no automatic data access. Warning approvers and command approvers have separate permissions. Break-glass access requires a reason, expiry, audit, and supervisor notification; it does not bypass tenant boundaries. Access to out-of-scope objects returns 404 or an error that does not disclose their existence.

Lists use cursor pagination, stable sorting (created_at,id), and a maximum of 100 records/page. All mutations require validation, idempotency when creating effects, and optimistic concurrency on updates. List screens provide search/filter for appropriate fields and loading/empty/error/denied states; forms provide required/invalid/conflict/unsaved states; details provide stale/not-found states. Prototype data is not real telemetry.

Physical control additionally checks the site/controller capability, vendor permission, OT access policy, current impairment/lockout, local authority, and operation-specific approval. The UI must show monitor-only, control eligible, inhibited, stale, and UNKNOWN distinctly. Engineering access does not imply incident command authority. Segment OT from public networks; allowlist supported endpoints and operations, use controlled maintenance access, and retain credential/change audit. Local automatic detection, pump starting, and releasing protection must not depend on cloud approval or connectivity.

## 3. Cross-cutting functional requirements

### WF-01 — Onboarding and identity (BR-06)
An admin creates a tenant with an immutable home_region; selects locale/timezone, configures SSO/MFA, and invites memberships by site. Users select a workspace before entering the console. Recovery returns the same message for existing and nonexistent emails to reduce enumeration. Invitations are single-use, have a TTL, and enforce email/domain policy. When SSO is unavailable, a controlled break-glass account is available within the appropriate tenant; MFA is not automatically bypassed.

**AC:** expired invitations are rejected; revoked roles cannot use old tokens after the proposed 60 s revocation propagation limit; switching workspaces does not display the previous tenant's cache. Screens A01–A10, T02–T04.

### WF-02 — Location and map registration (BR-01)
Site admins create a country/region/site/building/floor/zone/road-segment/geofence graph. Not every site must have floors. Device binding checks that the device belongs to the same tenant. Floor plans have revisions, scale, exits, accessibility, and an approver. Each incident stores the plan revision used. Locations carry method, accuracy, and age; GPS does not automatically infer a floor. Without positioning, users can enter a location manually and send an SOS.

**AC:** plans without a reviewer cannot be published; zones with active incidents cannot be hard-deleted; routes without freshness information show “not verified” and are not presented as certainly safe. Screens S01–S05, C03, C06.

### WF-03 — Multi-source event ingestion (BR-01,05)
Adapters check credentials, tenant binding, schema, clock skew, and payload limits, then durably store the event before issuing a receipt. A duplicate key (tenant,source,event_id) returns the previous receipt. Late events are retained for audit, but live rules evaluate TTL by hazard. Unknown sources/permissions/units/locations are quarantined. Inputs support HTTPS/CloudEvents, MQTT adapters, CAP, camera metadata, wearables, telematics, and manual entry.

**AC:** replaying the same ID 100 times creates one event; two tenants using the same event ID do not collide; sources spoofing a tenant are blocked; stale events do not initiate commands. Screens O03,O05,I01–I06.

### WF-04 — Verification and correlation (BR-01,02)
Versioned rules provide candidate incidents by time window, zone, hazard, and source. Operators review evidence and confidence, then create or link incidents; splitting preserves audit records and source links. Different hazards are not combined merely because they are nearby; cross-hazard relationships have a type (caused_by/nearby/possible_duplicate). Camera detection is labeled “possible fire”; fire panel policy may immediately initiate a response through a site-approved workflow without waiting for AI.

**AC:** merging does not lose SOS/tasks; splitting does not duplicate dispatch; rule changes do not rewrite history; dismissal requires a reason. Screens O03–O07,S11–S14.

### WF-05 — Multi-category SOS (BR-03)
Users select a category or Other/Unknown; enter/update location, notes, and the number of people. The emergency flow does not require a complete profile. The server returns an SOS ID and received_at after commit. The client displays pending when the request is only stored locally. Resending uses client_request_id, TTL, and reconciled state. Threat/discreet requests default to no sound and no group fan-out; ordinary assistance uses rule-based severity rather than treating every SOS as P1.

**AC:** network loss does not show “received”; resending does not create a second SOS; users who deny GPS can still enter location manually; changing category does not lose the ID. Screens C05–C10,C26–C27,X01–X02.

### WF-06 — Fall detection and check-in (BR-03)
An approved detector emits possible_fall; the app displays a proposed 30 s check-in with “I'm OK” and “Get help now”. Without a response, the server timer continues even if the app closes, creating an operator/caregiver request according to consent. An offline device produces unknown status, not a conclusion that the person fell. Check-in duration is configurable by service/group, with an accessible alternative; it is not automatically used as a diagnosis.

**AC:** escalation continues after the app is killed; a late “I'm OK” updates the record without silently withdrawing an ongoing task; false positives retain a review reason. Screens C24–C25,T07–T08.

### WF-07 — Road incident (BR-03)
Reports/telematics provide position, heading if available, road segment, vehicle count, and injuries=unknown. Correlation distinguishes opposite traffic directions and bridge levels. Users can submit a minimal quick report and add details later. Dispatch targets configured units; without an agreement, the system does not automatically call a public emergency endpoint.

**AC:** missing injury data is accepted as unknown; one acceleration sample does not auto-confirm a collision; sensitive data goes only to the assigned team. Screens C26,O04,O08.

### WF-08 — Disaster and CAP (BR-01,06)
Connectors allowlist issuers and validate XML/schema, identifiers, sent, status, scope, info/area, and expiry. Deduplicate sender+identifier; Update/Cancel references the previous version and must preserve lineage. Official warnings and local responses are separate objects. Expired warnings do not continue live broadcast; cancellation does not delete previously sent versions. Polygons use CAP's coordinate order and are explicitly converted to GeoJSON; lat/lon must not be implicitly swapped.

**AC:** Test/Exercise does not enter the Actual flow; unauthorized issuers are quarantined; Update replaces the active version while retaining the previous one; users outside the polygon are not selected because of coordinate errors. Screens O28–O29,C14–C17.

### WF-09 — Warning and audience (BR-02,06)
Authors select the incident, area/site/group, severity, languages, content, and expiry. Audience preview is a snapshot of eligible recipients and exclusion reasons; an independent approver signs the version. Changing content/audience after approval requires reapproval. Rapid break-glass issuance requires special permission and audit; not every P1 must wait for approval if the site playbook permits preapproved templates. Machine translation is draft-only; safety content must be reviewed.

**AC:** approval of v3 does not permit sending v4; an audience ID targeting the wrong tenant is blocked; scheduled warnings recheck expiry and permissions at issuance. Screens O13–O15,T06.

### WF-10 — Delivery and escalation (BR-02,04)
Notifications create individual delivery attempts by recipient/channel/version; queued/submitted/provider_accepted/delivered/read/human_ack/failed/unknown remain distinct states. Provider callbacks are authenticated and replay-protected. An ACK deadline triggers durable escalation with an owner and maximum steps. Channel fallback does not automatically send private content by SMS; SMS templates are minimal and use authenticated links when needed. Push notifications cannot guarantee bypassing the operating system's silent mode.

**AC:** provider acceptance does not increase the human ACK count; duplicate callbacks do not duplicate escalation; provider failures use bounded retries and alternate providers, and 429 respects retry_after. Screens O16–O17,T05.

### WF-11 — Dispatch and response (BR-02)
Dispatchers filter units by capability, availability, site authorization, and latest location. ETA is only a timestamped estimate. Offers have a deadline; units accept atomically using a version. If nobody accepts, escalate; do not automatically mark dispatch as completed. Responders transition through en_route/on_scene, record observations and handover, and complete tasks; task completion does not close the incident.

**AC:** two dispatchers cannot assign two owners to one task; offline acceptance must remain pending until server confirmation; reassignment retains the previous responder's notes as observations. Screens O08–O10,R01–R12.

### WF-12 — Personal safety and groups (BR-03)
Safety reports store status, person, incident scope, observed_at, reporter, and location precision. Fan-out reaches all eligible subscribed groups at report time, plus verified contacts; recipients are deduplicated. Each group receives status; detailed location requires specific consent. Revoked memberships/consent are rechecked before delivery. Group chat includes membership, abuse reporting, and individual blocking for social interaction; blocking cannot disable mandatory site warnings under the published policy.

**AC:** one contact in 3 groups does not receive 3 identical SMS messages; location consent off does not leak coordinates; a safe report does not close a building incident; unknown is not counted as safe. Screens C11–C23,O11–O12.

### WF-13 — Shelter and guidance (BR-03,04)
Operators maintain shelter status, estimated capacity, timestamp, accessibility, and valid_until. Offline packs store versioned, expiring plans/guidance/contacts and do not guarantee live routes. Voice uses the same approved text with a transcript and pause/replay; autoplay must not expose discreet mode. Without a verified route, display only the plan and approved guidance rather than automatically drawing an optimized fire-avoidance route.

**AC:** a shelter past valid_until becomes unknown; missing capacity data is not shown as 0; offline plans display their age. Screens C03–C04,C16–C18,O26–O27.

### WF-14 — Devices and maintenance (BR-01,04)
Enrollment tokens are single-use; device certificates support rotation/revocation. Heartbeat thresholds depend on device class; stale/disconnected is distinct from the area's safety status. Maintenance suppression has a start/end, reason, approver, and replacement coverage; blind spots are always visible. When maintenance ends, monitoring automatically resumes and is logged.

**AC:** revoked certificates cannot ingest; suppression does not continue after maintenance ends; firmware upgrades do not automatically run fleet-wide during an active incident. Screens S06–S10.

Physical maintenance additionally follows WF-31: ending a software suppression window does not prove that physical protection has been restored; required local checks and acknowledgment remain mandatory.

### WF-15 — Physical command (BR-05)
Commands are limited to declared capabilities; parameter schema, zone, expiry, interlock, authorized approver, and local controller policy are all mandatory. The web interface cannot send arbitrary raw commands. Gateway receipt, device accepted, executing, and verified result are separate. An unknown timeout does not blindly retry a non-idempotent command. Cloud actuation does not replace certified local protection loops. Closed-head sprinklers typically activate thermally; the prototype does not assume software can open individual sprinkler heads.

**AC:** commands past TTL do not execute after reconnect; zone mismatches are rejected; acceptance without feedback remains unknown/awaiting confirmation; simulators have no live credentials. Screens O18–O19.

WF-30 refines this command workflow for installed suppression and rescue equipment. Wet-pipe monitoring, releasing-controller requests, pump requests, and mobile equipment actions remain separate capabilities; use WF-28 binding and WF-32 acceptance before enabling any control.

### WF-16 — Drone (BR-05)
Fleet adapters primarily provide telemetry/media and health. A mission draft includes purpose, incident, route/geofence, altitude reference, pilot, clearance, weather check, and lost-link policy. The local pilot decides deployment according to the integrated system's capabilities. Approval does not mean takeoff has occurred. AI detectors do not automatically issue TAKEOFF. Abort/return commands require capability support and flight-stack confirmation; the UI does not promise universal cancellation.

**AC:** no approval without pilot/clearance; stale telemetry disables position-dependent commands; link loss shows unknown while local policy continues; mission evidence has hash/provenance. Screens I11–I15.

### WF-17 — Connector lifecycle (BR-05)
Install manifest → configure secret reference → map → sandbox test → approve → activate → monitor → rotate/deprecate. Connectors run with least privilege, outbound allowlists, quota/backpressure, and a kill switch. DLQ replay requires a reason, a valid schema, and retention of the original ID; command replay is blocked by default. Cross-tenant exchange requires an agreement and payload allowlist.

**AC:** adapter failures do not block direct SOS; oversized payloads return 413; incompatible major schemas are quarantined; secrets do not appear in logs/exports. Screens I01–I10.

### WF-18 — Internationalization and data (BR-06)
Use UTC for storage, IANA timezones for display/schedules, BCP47 locales, Unicode, and E.164 phone numbers according to country. The UI includes RTL layout tests, pluralization, and pseudo-localization. Do not hardcode one worldwide emergency number; the emergency contact registry is verified by country/site. Residency covers databases, object storage, backups, logs, support, and exports; global routing does not carry raw SOS data.

**AC:** schedules crossing DST do not send twice, using a schedule occurrence ID; long locales do not obscure CTAs; changing region is a reviewed migration, not merely editing a dropdown. Screens A01,A10,T02,T06.

### WF-19 — Retention, audit, and privacy (BR-06,07)
Data classes have retention policies, legal holds, and deletion jobs with reports. Export/deletion verifies the requester, scope, and exceptions; held evidence is not deleted. Audit is append-only with actor, action, object/version, reason, time, correlation, and before/after digests. Do not embed tokens, raw secrets, or complete medical notes in audit records.

**AC:** precise-location access is logged; deletion does not remove held records; exports exclude other tenants; break-glass access automatically revokes at TTL expiry. Screens C29–C30,T09–T11.

### WF-20 — Closure, analytics, exercise, and handover (BR-07)
Closure requires an open SOS/task check, disposition of people with unknown status, partner handover, a reason, and a supervisor. An “All clear” warning is a separate action. Drills require environment+mode isolation in the broker, credentials, and recipient directory; a banner alone is insufficient. Reports separate transport latency, operator latency, and response latency; samples with missing data explicitly state their denominator.

**AC:** safety check-ins do not close incidents; drills do not call live webhooks/actuators; shift handovers have incoming acknowledgment; reports are deidentified when the user lacks PII permission. Screens O20–O25,T16–T17.

### WF-28 — Physical onboarding and point/zone mapping (BR-13,15)
Bind the installed regional model, serial number, firmware, gateway, license, vendor permission, and compatibility dossier before activating an adapter. Import and independently review point addresses, semantic states, units/scaling, site/zone associations, and cause-and-effect revisions. Distinguish wet-pipe, pre-action/deluge, pump, and mobile rescue assets. Unknown capability defaults to monitor-only; onboarding cannot create control authority.

**FR-PHY-01:** retain the exact equipment/interface identity and approved evidence revision. **FR-PHY-02:** validate point and zone mapping against physical labels and reject cross-tenant, duplicate, or unresolved mappings. **FR-PHY-03:** version the cause-and-effect and read/control capability contracts; changes require impact review and reacceptance where affected.

**AC:** an unbound firmware or license change suspends dependent control; a wrong-zone mapping cannot be activated; wet-pipe heads are not offered as individually controllable outputs. Screens F02–F06,F20.

### WF-29 — Physical telemetry and supervision (BR-01,13)
Ingest manufacturer-supported panel, pump, valve, release, waterflow, power, and link states with provenance and quality. Preserve controller alarm priority and local protection when cloud/edge is unavailable. Separate demand, motor running, release output, valve position, waterflow, and confirmed field observations. Missing or stale values remain unknown; do not turn a link fault into a safe indication.

**FR-PHY-04:** store source/receive time, source address, unit, quality, mapping revision, and raw evidence reference for each observation. **FR-PHY-05:** supervise freshness/link health using approved device/site thresholds and expose coverage gaps and compensating measures. **FR-PHY-06:** correlate without suppressing local protective actions; deduplicate transport replay while retaining state transitions and restoration evidence.

**AC:** stale pump-running data is visibly uncertain; pressure alone does not confirm discharge; loss of cloud leaves local automatic protection available; duplicate telemetry does not create duplicate incidents. Screens F01,F07–F08.

### WF-30 — Authorized actuation, feedback, and UNKNOWN reconciliation (BR-14)
Only a site-accepted, explicitly control-capable operation may create a physical request. Validate actor authority, incident/site/zone, approved parameter envelope, current physical readiness, local interlocks, command expiry, and the policy's independent approval requirements. Site/controller authority prevails. The system never assumes that BACnet/Modbus writes, a relay, or a network ACK authorizes or proves suppression. AI cannot originate autonomous release/start/motion actions.

**FR-PHY-07:** reject monitor-only or undocumented operations server-side and at the edge; preserve the approved request and command-policy version. **FR-PHY-08:** enforce TTL, unique request ID, duplicate-effect prevention, and bounded delivery; do not replay expired requests after reconnect or blindly retry non-idempotent actions. **FR-PHY-09:** distinguish transport receipt, device acceptance, execution, and physical feedback; evaluate success only against operation-specific approved evidence. **FR-PHY-10:** display UNKNOWN for missing/conflicting outcomes; assign reconciliation to a named operator and support local override and acknowledged manual handover without erasing history.

**AC:** ACK without required feedback cannot become succeeded; duplicate/expired requests produce no new effect; loss of feedback opens reconciliation; local override blocks conflicting remote control. Screens F09–F13; WF-15 remains applicable.

### WF-31 — Impairment, test, and restoration (BR-13,15)
An authorized impairment identifies equipment, affected zones, time window, reason, owner, compensating protection, and the local test/lockout arrangement. Keep test and production credentials, routes, and outputs distinct; a UI banner is insufficient. Expiry prompts restoration verification and escalation rather than claiming protection has returned. Local safety ownership remains explicit during shift handover.

**FR-PHY-11:** require approved impairment and physical isolation/lockout evidence before relevant tests; block unauthorized production commands while preserving agreed local protection arrangements. **FR-PHY-12:** close an impairment only after required physical state checks, restoration evidence, and responsible-person acknowledgment; track overdue restoration and residual gaps.

**AC:** a simulated test cannot reach a live output; expiration without verification remains impaired/awaiting restoration; maintenance handover has an incoming owner. Screens F14,F18.

### WF-32 — FAT/SAT and compatibility evidence (BR-15)
Maintain a configuration-specific dossier of manufacturer documents, interface permissions, regional listings/limitations, point maps, electrical/hydraulic dependencies, approved cause-and-effect, FAT, SAT, commissioning, calibration, and operator training. Manufacturer research and simulator results are not field acceptance. No whole-system certification is inferred from a component listing.

**FR-PHY-13:** track document revision, provenance, reviewer, expiry where applicable, and acceptance scope per model/firmware/site/capability. **FR-PHY-14:** gate production capability activation on signed required tests and approvals; equipment, firmware, mapping, or policy changes trigger impact assessment and invalidate affected acceptance until revalidated.

**AC:** missing SAT blocks production control even after simulator PASS; an unrelated site's certificate cannot satisfy the gate; changed firmware leaves unaffected read capabilities available only if their contract remains valid. Screens F15–F17.

### WF-33 — Rescue robot and water-monitor mission (BR-16)
A mission binds the actual supported robot or water-monitor interface, purpose, incident, qualified operator, operating area, route/no-go zones, water/energy supply, telemetry freshness, and lost-link/local-emergency policy. Observe-only equipment remains observe-only. Approval is not movement or discharge. The local operator determines deployment and remains able to take over according to the vendor-supported design; no universal stop/return function is promised.

**FR-PHY-15:** require mission-specific authority, capability evidence, operating envelope, and readiness checks; separate movement, aiming, and water discharge permissions. **FR-PHY-16:** record telemetry and action feedback, enforce approved lost-link behavior locally, and provide acknowledged manual handover and outcome evidence; never infer rescue completion from command acceptance.

**AC:** missing vendor-supported control or operator blocks dispatch of physical actions; stale position blocks dependent aiming/motion; link loss shows UNKNOWN and the approved local policy; a handover retains responsibility and evidence. Screen F19, with F11–F13 for execution and reconciliation.



<!-- BMS-INTEGRATED-3.0-BEGIN -->
## 3A. Existing BMS integration — implementation contracts

This section is normative within design baseline3.0, replacing annex-only treatment. Preserve WF-01–33, FR-PHY and screen FRs; add WF-34–37 and FR-BMS-01–40. These are development and acceptance specifications, not evidence of implemented software.

### WF-34 — BMS onboarding → discovery/import → mapping → qualification (BR-17,18)

Screens: BMS01, BMS02, BMS05, I01–I04, F03–F05, F15–F17. Related FR-BMS suffixes: 01–10, 31–32, 35–36, 39.

### WF-35 — BMS alarm → native lifecycle → correlation → rescue → reconciliation (BR-17,18)

Screens: BMS03, BMS08, O03–O17, H08–H11, Q04–Q09. Related FR-BMS suffixes: 11–21, 30, 33, 38.

### WF-36 — Preview → authorize → dispatch → observe → reconcile / hand over (BR-19)

Screens: BMS04, BMS07, F09–F13. Related FR-BMS suffixes: 22–27.

### WF-37 — Operate → degrade/recover → upgrade → retire (BR-20)

Screens: BMS01, BMS05–BMS08, I05, G02–G10. Related FR-BMS suffixes: 28–29, 31–37, 40.

**Mandatory common contract.** Every mutation carries tenant/site scope, actor, authorization result, correlation/request IDs, expected revision and an idempotency key for side effects. Same key/same payload returns the prior result; same key/different payload conflicts. Backend authorization is independent of UI. Point identity includes tenant/site/connection/native namespace/native ID; display names are not keys. BMS observations cannot confirm people safe. BMS ACK is a separate capability and cannot close SmartAlarm incidents. No raw write-any-point API is exposed.

**Error classification.** 400 invalid schema/type/enum;403 missing scope/capability;409 revision/idempotency conflict;422 mapping/business precondition failure;429 budget exceeded;503 source/edge unavailable. Side-effect timeouts must not be described as retryable failures: return the intent ID and unknown outcome for readback. Retain native status in evidence rather than replacing it with an internal HTTP code.

#### FR-BMS-01 — Site BMS inventory

| Item | Contract |
|---|---|
| Actor / permission | bms.connection.create |
| Inputs | tenant/site, product/build, profile ID, endpoint, evidence refs, secretRef |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Create a draft BmsSystem; validate endpoint allowlist, account scope and evidence; run planned read-only probes; record observed build/license/interface. |
| Outputs and failure | BMSConnection qualification revision; missing evidence remains unavailable, never infer compatibility from the vendor name. |
| Acceptance | Activation requires build, interface and evidence. |
| Screens / traceability | BMS01, I01–I02, F17 |

#### FR-BMS-02 — Capability-specific access

| Item | Contract |
|---|---|
| Actor / permission | IAM security administrator; capability-policy reviewer |
| Inputs | requested capabilities, role policy, vendor evidence, license, FAT/SAT refs |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Intersect implemented/vendor/licensed/authorized/tested capabilities; separate read/history/ACK/command/release permissions; re-evaluate on revocation or configuration changes. |
| Outputs and failure | Versioned CapabilitySnapshot with denial reasons; UI is only a projection and APIs reject operations outside the set. |
| Acceptance | Read, history, ACK and commands have separate server permissions. |
| Screens / traceability | I02, I07, F03 |

#### FR-BMS-03 — Bounded discovery

| Item | Contract |
|---|---|
| Actor / permission | bms.discovery.run |
| Inputs | connection ID, approved roots/subnets/object classes, request budget, cancel token |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Create a discovery job, approve scope, browse with pagination and rate limits; never scan the entire network automatically; support cancellation and separate checkpointed partial results. |
| Outputs and failure | DiscoveryJob complete/partial/cancelled/failed; throttle below alarm intake priority. |
| Acceptance | Scan approved scope only; cancellable; alarm intake remains available. |
| Screens / traceability | I02, S08, BMS01 |

#### FR-BMS-04 — Point and object import

| Item | Contract |
|---|---|
| Actor / permission | bms.mapping.edit |
| Inputs | CSV/API export, content hash, source namespace, encoding, expected revision |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Parse into staging; validate duplicate native keys, type, unit and required fields; show row-level errors; commit an approved revision atomically, not live row-by-row. |
| Outputs and failure | ImportPreview and immutable ImportRevision; parsing failure does not create partial live points. |
| Acceptance | Preview row errors, duplicate IDs and encoding; commit a revision. |
| Screens / traceability | F04, S06 |

#### FR-BMS-05 — Unit and semantic mapping

| Item | Contract |
|---|---|
| Actor / permission | bms.mapping.edit + independent qualification reviewer |
| Inputs | raw address/object ID, data type, scale/offset, unit, enum, endian, quality mapping |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Run golden fixtures for normal, zero, missing, boundary, NaN and unknown enums; verify unit conversion; retain raw values; publish only after reviewer approval. |
| Outputs and failure | PointMapping revision and test evidence; overflow/type mismatch is quarantined rather than silently coerced. |
| Acceptance | Golden fixtures verify scale, enums, types and byte order. |
| Screens / traceability | I03, F04 |

#### FR-BMS-06 — Equipment and zone topology

| Item | Contract |
|---|---|
| Actor / permission | bms.mapping.edit + site engineer |
| Inputs | equipment ID, point ID, room, HVAC zone, fire compartment, route-edge IDs |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Create typed locatedIn/serves/observes/affects relationships; validate tenant/site and dependencies; allow multiple zones with explicit roles; do not collapse all graphs into one zone label. |
| Outputs and failure | TopologyRevision; reject dangling/cross-tenant edges; unmapped points cannot drive automated routing. |
| Acceptance | Distinguish room, HVAC zone, fire compartment and route edge. |
| Screens / traceability | BMS02, F05, S02–S04 |

#### FR-BMS-07 — Mapping publication and impact review

| Item | Contract |
|---|---|
| Actor / permission | bms.mapping.validate; bms.qualification.submit; separate bms.connection.activate |
| Inputs | candidate revision, expected current version, impact graph, fixtures, approval |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Show affected alarm rules, routes, PA zones and command permissions; require If-Match; publish one revision; retain mapping rollback and audit without reversing physical effects. |
| Outputs and failure | MappingPublished; conflicts return the current version and require review, never last-write-wins. |
| Acceptance | Show dependencies and approve revisions; rollback does not undo physical effects. |
| Screens / traceability | BMS05, F04, F17 |

#### FR-BMS-08 — Observation quality and freshness

| Item | Contract |
|---|---|
| Actor / permission | connector runtime; bms.point.read |
| Inputs | source value/status, source time quality, receivedAt, sequence/epoch, freshness policy |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Normalize quality independently of value; calculate age only with trustworthy clocks; retain late observations in history without overwriting newer projections; emit freshness transitions. |
| Outputs and failure | Observation and current projection; unknown/bad/stale never becomes false/zero/normal. |
| Acceptance | Zero differs from missing; late data cannot overwrite newer observations. |
| Screens / traceability | F01, F07, S07 |

#### FR-BMS-09 — Subscriptions and polling

| Item | Contract |
|---|---|
| Actor / permission | connector runtime; bms.lifecycle.change |
| Inputs | subscription ID/lease, supported COV/SSE/events, approved poll groups/budget |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Renew before lease expiry according to the vendor contract; detect silent gaps; reconcile before reporting healthy; polling fallback uses an approved profile and stable identity, never automatic protocol switching. |
| Outputs and failure | SubscriptionHealth and reconciliation job; rate-limit/quota errors use bounded jittered backoff, and history cannot starve alarm queues. |
| Acceptance | Renew/reconcile lost subscriptions; polling follows measured budgets. |
| Screens / traceability | I05, BMS06 |

#### FR-BMS-10 — History and investigation

| Item | Contract |
|---|---|
| Actor / permission | qualified history reader / investigator |
| Inputs | point IDs, bounded UTC interval, source timezone, aggregation, cursor |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Query history within quotas; retain raw/interpolated/aggregate and gap flags; deduplicate by native identity; never feed historical values into live control. |
| Outputs and failure | HistoryPage, continuation and coverage; expose partial/backfill gaps and never interpolate them into safety evidence. |
| Acceptance | Preserve UTC, timezone, gaps and raw/interpolated distinctions. |
| Screens / traceability | F07, O21–O22 |

#### FR-BMS-11 — Native alarm lifecycle

| Item | Contract |
|---|---|
| Actor / permission | connector runtime; bms.alarm.read |
| Inputs | native alarm key, occurrence/branch, active, ACK, confirmed, retained/suppressed, quality |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Persist immutable native transitions; keep independent state dimensions and unsupported=null; build a versioned projection; active=false does not imply acknowledgement or incident closure. |
| Outputs and failure | BmsAlarmProjection and alarm.transitioned; lost occurrence identity requires reconciliation, never text-only merging. |
| Acceptance | Active, ACK, confirmed and suppressed are independent; unsupported=null. |
| Screens / traceability | BMS03, O03, F07 |

#### FR-BMS-12 — Priority and severity mapping

| Item | Contract |
|---|---|
| Actor / permission | site safety engineer + qualification reviewer |
| Inputs | native priority/severity range, class, source context, approved response matrix |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Map per source class; test limits and ordering; retain native severity; mapping changes require impact review of active escalations. |
| Outputs and failure | SeverityMapping revision; unmapped classes become needs-review with raw priority, never default-low. |
| Acceptance | Do not invert priority numbers globally; test per source. |
| Screens / traceability | S11–S13, O05 |

#### FR-BMS-13 — Correlation and provenance

| Item | Contract |
|---|---|
| Actor / permission | correlation service + incident operator |
| Inputs | panel/native provenance, source path, occurrence, zone, timing uncertainty |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Retain canonical observations and all receipt paths; establish mirror lineage before confidence scoring; correlation carries evidence and can be reversed; a BMS mirror and direct panel are not independent evidence. |
| Outputs and failure | CorrelationDecision and lineage links; ambiguity remains separate/pending and never deletes the original alarm. |
| Acceptance | A BMS mirror and direct panel feed are not independent evidence. |
| Screens / traceability | O05–O07, BMS03 |

#### FR-BMS-14 — Controlled external ACK

| Item | Contract |
|---|---|
| Actor / permission | bms.alarm.ack_native |
| Inputs | alarm ID, expected occurrence/version, native ACK token, actor, comment, idempotency key |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Check source ACK capability and permission; re-read changed versions; durably record intent before ACK to the exact occurrence; await receipt/native state; never acknowledge history. |
| Outputs and failure | AcknowledgementIntent pending/confirmed/failed/unknown; timeout never creates local confirmation and the incident remains open. |
| Acceptance | Target the correct occurrence/version; failed receipt remains pending. |
| Screens / traceability | BMS03, O03, F07 |

#### FR-BMS-15 — Observe external acknowledgement

| Item | Contract |
|---|---|
| Actor / permission | connector runtime; bms.alarm.read |
| Inputs | native ACK transition, actor/time, occurrence, provenance |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Record source actor separately from SmartAlarm actor; link matching intents by correlation ID; update acknowledgement projection without changing rescue/closure checklists. |
| Outputs and failure | acknowledgement_changed; missing actor remains null/unknown, never attributed to the currently signed-in user. |
| Acceptance | Preserve source actor; ACK does not close the rescue incident. |
| Screens / traceability | BMS03, O04 |

#### FR-BMS-16 — Publish incident summaries to BMS

| Item | Contract |
|---|---|
| Actor / permission | approved integration writeback service + operator |
| Inputs | incident summary schema, permitted BMS namespace, correlation/causation IDs, minimal audience fields |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Build a minimal projection; remove unnecessary medical/identity data; record lineage and origin; reject echoes using source plus causation; never mirror raw SOS/chat. |
| Outputs and failure | WritebackReceipt and loop ledger; loops trip the writeback circuit breaker while alarm intake continues. |
| Acceptance | Approved namespace, minimal data and anti-echo; no medical records. |
| Screens / traceability | BMS08, I08–I10 |

#### FR-BMS-17 — Operator alarm grouping

| Item | Contract |
|---|---|
| Actor / permission | incident operator; bms.alarm.read |
| Inputs | alarm flood group keys, severity, acknowledgement state, raw event references |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Group display by versioned rules and windows; expose counts, earliest/latest and drill-down; pin unacknowledged P1; never change or delete raw history. |
| Outputs and failure | GroupedAlarmView; operators can ungroup; actual suppression requires a separate maintenance workflow. |
| Acceptance | Retain raw events and grouping counts; unacknowledged P1 remains visible. |
| Screens / traceability | O03, BMS03 |

#### FR-BMS-18 — Maintenance and suppression

| Item | Contract |
|---|---|
| Actor / permission | maintenance authority + site operator |
| Inputs | asset/zone scope, reason, permit, owner, start/end, alternative protection |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Approve impairment; mark affected rules/routes; adjust presentation under policy; require restoration checks at expiry rather than assuming healthy equipment. |
| Outputs and failure | ImpairmentRecord active/restoration-pending/closed; overdue escalation and explicit ownership. |
| Acceptance | Require reason, owner and expiry; elapsed maintenance does not prove restoration. |
| Screens / traceability | F14, F18 |

#### FR-BMS-19 — BMS evidence for evacuation

| Item | Contract |
|---|---|
| Actor / permission | route service + site safety engineer |
| Inputs | door/fan/lift observation, topology revision, freshness, capability and approved route policy |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Resolve affected route edges; use only qualified evidence; stale/conflicting data lowers confidence or atomically withdraws route and voice revisions; an open door does not prove a safe exit. |
| Outputs and failure | RouteConstraintEvidence and guidance revision; unknown routes offer assistance rather than fabricated directions. |
| Acceptance | Stale door/fan/lift evidence lowers confidence or withdraws guidance. |
| Screens / traceability | Q04–Q05, C35–C38 |

#### FR-BMS-20 — Proactive rescue

| Item | Contract |
|---|---|
| Actor / permission | care triage operator + authorized responder |
| Inputs | functional needs with consent, identity presence evidence, zone exposure, observation ages |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Combine scoped presence with functional needs; occupancy counts only create area-check tasks; explain prioritization; authorized personnel review and assign teams. |
| Outputs and failure | ProactiveRescueCandidate and evidence; absence of SOS/presence does not establish safety or death. |
| Acceptance | Combine needs and fresh presence; occupancy counts are not identities. |
| Screens / traceability | H08–H11, O11–O12 |

#### FR-BMS-21 — Approved PA and app response

| Item | Contract |
|---|---|
| Actor / permission | warning authority + PA operator |
| Inputs | qualified BMS alarm, approved cause/effect, message revision/locale, audience/PA zones |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Deterministic rules create warning intents; validate actual/exercise and dedup before fan-out; do not wait for an LLM; send approved content and separate delivery/playback/human acknowledgement. |
| Outputs and failure | WarningIntent and per-channel receipts; replay/echo cannot rebroadcast and unreviewed translations are not automatically released. |
| Acceptance | Do not wait for an LLM; echo/history cannot repeat broadcasts. |
| Screens / traceability | O13–O17, P01–P09 |

#### FR-BMS-22 — Control impact preview

| Item | Contract |
|---|---|
| Actor / permission | bms.command.preview |
| Inputs | target, desired effect, expected state/version, affected zones, local owner/priority, current policy |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Preview cause/effect, consequences and feedback prerequisites before submission; provide no raw-write editor; block non-allowlisted targets and stale states. |
| Outputs and failure | CommandPreview bound to payload hash/revisions; target/value changes require new preview and approval. |
| Acceptance | Show target, owner, priority, preconditions and affected zones. |
| Screens / traceability | F09–F10, BMS04 |

#### FR-BMS-23 — Approved commands with expiry

| Item | Contract |
|---|---|
| Actor / permission | bms.command.submit + separate authorized physical-command approver |
| Inputs | CommandPreview hash, requester/approver, TTL, live state, interlocks |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Reuse the physical Command aggregate; separate duties by risk; revalidate at edge before dispatch; reject expired approval or changed payload; do not dispatch under local override. |
| Outputs and failure | Command intent/audit; TTL limits dispatch authority and does not promise retained BMS state clears after power loss. |
| Acceptance | Parameter changes invalidate approval; local override retains priority. |
| Screens / traceability | F10, BMS04 |

#### FR-BMS-24 — Priority lease and relinquishment

| Item | Contract |
|---|---|
| Actor / permission | authorized physical-command approver + local authority |
| Inputs | approved priority slot, ownership proof, expected current slot value, release intent |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Use only site-approved priority slots; record lease/owner/current value; relinquish through the same command guards after readback; never clear another actor’s slot; define a separate watchdog/manual cleanup plan. |
| Outputs and failure | OwnershipProjection and ReleaseIntent; unproven ownership requires local handover. |
| Acceptance | Use permitted slots only; never clear an unproven foreign slot. |
| Screens / traceability | BMS04, F13 |

#### FR-BMS-25 — Physical outcome reconciliation

| Item | Contract |
|---|---|
| Actor / permission | command reconciler + authorized site observer |
| Inputs | transport receipt, controller execution status, independent feedback points, time bounds |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Track three evidence layers separately; compare expected effect with qualified feedback; HTTP200/accepted alone cannot mean completed; discrepancies create tasks and retain evidence. |
| Outputs and failure | PhysicalOutcome verified/contradictory/unknown under the existing aggregate; never fabricate completion. |
| Acceptance | Separate transport receipt, controller report and independent feedback. |
| Screens / traceability | F11–F12 |

#### FR-BMS-26 — Timeout and unknown outcomes

| Item | Contract |
|---|---|
| Actor / permission | bms.command.reconcile |
| Inputs | command ID, last receipt/sequence, source availability, readback plan |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | On timeout mark outcome unknown; query status/readback first; retry requests only where the adapter proves safe semantics under an approved plan, never blanket-retry physical effects. |
| Outputs and failure | ReconciliationCase; uncertain outcomes require local escalation and retain dispatch fencing. |
| Acceptance | Do not resend unknown effects; query/read back first. |
| Screens / traceability | F12, BMS07 |

#### FR-BMS-27 — Local override and handover

| Item | Contract |
|---|---|
| Actor / permission | site operator + command authority |
| Inputs | local override status, open intents/leases, handover owner, cleanup evidence |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Revoke remote eligibility on override; hand over outstanding effects; reconnect reconciles without restoring old commands; local owner confirms release before renewed authority. |
| Outputs and failure | HandoverRecord and blocked capabilities; unknown override state is insufficient for writes. |
| Acceptance | Do not restore old commands on reconnect; assign cleanup ownership. |
| Screens / traceability | F13, BMS04, BMS07 |

#### FR-BMS-28 — Durable journal and offline operation

| Item | Contract |
|---|---|
| Actor / permission | edge runtime + operations |
| Inputs | durable journal quota, sequence/checkpoint, offline policy, disk thresholds |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Commit incoming events before durable-intake acknowledgement; prioritize alarm/control evidence; throttle history first; never falsely acknowledge at disk limits; replay is explicitly marked. |
| Outputs and failure | JournalCheckpoint and gap/backpressure alarms; local protection remains independent. |
| Acceptance | Do not acknowledge transport ingestion before durable commit; this is separate from human/native alarm ACK. Local protection remains independent. |
| Screens / traceability | I05, G02, BMS07 |

#### FR-BMS-29 — HA and single writer

| Item | Contract |
|---|---|
| Actor / permission | edge operations + security |
| Inputs | leader epoch, egress fence, lease health, standby credentials, failover approval |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Only the active writer has authority at the actual egress; cached leases are insufficient; failover fences/revokes the old writer; disable automatic write failover when fencing cannot be proven. |
| Outputs and failure | WriterEpoch/Health evidence; split brain falls back to observe-only with escalation. |
| Acceptance | Fence at the actual dispatch point; standby cannot write. |
| Screens / traceability | G03–G04, BMS07 |

#### FR-BMS-30 — Alarm resynchronization after gaps

| Item | Contract |
|---|---|
| Actor / permission | bms.reconciliation.run |
| Inputs | last cursor/source epoch, paginated active snapshot, transition gaps |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Read active snapshots under source contracts; ConditionRefresh/active lists do not replace historical replay; commit completion markers before evaluating missing entries; retain unverified alarms across gaps. |
| Outputs and failure | SnapshotReconciliation complete/partial/gapped; never clear from one missing page or failed snapshot. |
| Acceptance | Uncertain snapshot/cursor exposes gaps; one page cannot clear missing alarms. |
| Screens / traceability | BMS03, BMS07 |

#### FR-BMS-31 — Schema drift and upgrades

| Item | Contract |
|---|---|
| Actor / permission | bms.mapping.edit + bms.lifecycle.change + qualification reviewer |
| Inputs | native schema diff, connector/mapping version, dependency impact, rollback artifact |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Renames retain stable keys; type/unit/enum/capability changes quarantine affected objects; shadow/test new adapters with fixtures; drain before cutover; version rollback cannot resurrect commands. |
| Outputs and failure | DriftDecision and rollout records; affected routes/commands remain invalidated until requalified. |
| Acceptance | Rename preserves identity; type/unit changes quarantine affected capabilities. |
| Screens / traceability | BMS05, G09–G10 |

#### FR-BMS-32 — License, certificate and account lifecycle

| Item | Contract |
|---|---|
| Actor / permission | security administrator + site integrator |
| Inputs | secretRef, certificate fingerprint/expiry, license entitlement, rotation/revoke plan |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Use a secret store; test new principals with least privilege; overlap certificates under policy; revocation makes capabilities unavailable; never log/export tokens or passwords. |
| Outputs and failure | Credential/LicenseEvidence revision; pre-expiry escalation and affected-capability shutdown. |
| Acceptance | Test rotation; revocation blocks privileges; never log secrets. |
| Screens / traceability | I05, I07, F17 |

#### FR-BMS-33 — Data- and zone-aware health

| Item | Contract |
|---|---|
| Actor / permission | bms.health.read |
| Inputs | point freshness distribution, source latency, queue age, source clock quality, edge connectivity |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Aggregate by zone/source and criticality; healthy heartbeat cannot hide stale points; measure only trustworthy timestamps; expose gaps and bad quality; alarm against site budgets. |
| Outputs and failure | ConnectorHealth and affected zones; gateway-online never implies all-clear. |
| Acceptance | Online gateway does not hide stale points; alarm latency is measured separately. |
| Screens / traceability | I05, F01, BMS01 |

#### FR-BMS-34 — Capacity, backfill and retention

| Item | Contract |
|---|---|
| Actor / permission | platform operations + site integrator |
| Inputs | point groups, intervals, batch limits, change/burst rate, retention/offline window |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Size samples separately from batched requests; benchmark actual sources; separate alarm/history queues; throttle backfill and per-BMS quotas; cloud autoscaling cannot increase BMS capacity. |
| Outputs and failure | ApprovedCapacityPlan and measured thresholds; excess load degrades visibly without silent alarm drops. |
| Acceptance | Per-BMS quotas; historian work cannot starve alarm queues. |
| Screens / traceability | BMS06, G02 |

#### FR-BMS-35 — Actual and exercise isolation

| Item | Contract |
|---|---|
| Actor / permission | exercise controller + site commissioning authority |
| Inputs | mode actual/exercise/commissioning, isolated namespace, approved test plan |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Exercises use simulators and synthetic identities; block production ACK/writes; real commissioning needs permits and local personnel; mode transitions require audit and queue reconciliation. |
| Outputs and failure | ModeBoundSession; changing a UI flag cannot bypass server isolation. |
| Acceptance | Simulation never sends real ACK/writes; commissioning has a separate plan. |
| Screens / traceability | I04, F15–F16 |

#### FR-BMS-36 — Configuration-specific FAT/SAT

| Item | Contract |
|---|---|
| Actor / permission | bms.qualification.submit + independent FAT/SAT witness |
| Inputs | exact build/license/profile/map versions, fixtures, expected outcomes, measured evidence |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Run tests per capability and exact configuration; retain raw evidence, observer, pass/fail and deviations; passing reads grants no ACK/write permission; require separate site SAT sign-off. |
| Outputs and failure | AcceptanceEvidence and capability admission; failed/untested capabilities remain disabled. |
| Acceptance | Sign off per capability; passing reads does not authorize commands. |
| Screens / traceability | F15–F17, BMS01 |

#### FR-BMS-37 — Support and forensic export

| Item | Contract |
|---|---|
| Actor / permission | scoped support investigator |
| Inputs | incident/connection IDs, bounded time range, export purpose, redaction policy |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | Build timelines with source/revision/actor/quality; redact secrets and health details; authorize async export and download; expire and audit access; separate original evidence from presentation. |
| Outputs and failure | ForensicExport manifest/hash/expiry; reject scope violations, with no cross-tenant support bypass. |
| Acceptance | Timeline includes revisions/sources; redact secrets and health data. |
| Screens / traceability | O21–O22, G07–G08 |

#### FR-BMS-38 — Evidence-based BMS AI assistance

| Item | Contract |
|---|---|
| Actor / permission | AI analyst + incident commander |
| Inputs | scoped observations, provenance, quality/freshness, authorized tools, model/prompt version |
| Preconditions | Valid tenant/site; identified source and applicable profile/mapping revision; authorized read or action scope and qualified capability; actual/exercise mode distinguished. Missing qualification blocks source-side actions while evidence remains reviewable. |
| Processing | LLM produces analysis with evidence references and uncertainty; source text is data, not instructions; deterministic policy decides eligibility; AI has no raw-write/ACK tools. |
| Outputs and failure | AdvisoryAnalysis with revisions/citations; missing sources/LLM failure cannot block core alarm/routing. |
| Acceptance | LLM reads scoped, sourced evidence; it never controls directly. |
| Screens / traceability | Q06–Q09 |

#### FR-BMS-39 — Tenant/site isolation and residency

| Item | Contract |
|---|---|
| Actor / permission | tenant/site administrator + regional security |
| Inputs | tenant/site/region IDs, native namespace, connection principal, allowed projections |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Partition registry, cache, journal, events and queries by composite scope; authorize cross-site/region projections; residency covers backups/exports; repeated native IDs cannot collide. |
| Outputs and failure | Scoped resource identities and audit; unauthorized scope returns denied/not-found under policy without leakage. |
| Acceptance | Repeated native IDs remain isolated; cross-site access uses authorized projections. |
| Screens / traceability | G01, T02–T04, BMS01 |

#### FR-BMS-40 — Controlled retirement and handover

| Item | Contract |
|---|---|
| Actor / permission | bms.lifecycle.change + local owner + security administrator |
| Inputs | connection ID, active alarms/intents/leases, retention plan, handover acceptance |
| Preconditions | Valid tenant/site and configuration authority; candidate profiles/maps may be drafts. Qualification is required before activation, not before drafting. Any external operation uses only its current qualified capability. |
| Processing | Freeze new commands; drain/check outstanding effects; hand over local ownership; revoke credentials/subscriptions; verify no egress; retain evidence/tombstones under policy. |
| Outputs and failure | RetirementRecord completes only after handover/revoke verification; unresolved effects block completion. |
| Acceptance | Review open alarms/leases, hand over, revoke, verify and retain audit. |
| Screens / traceability | BMS01, F13, G06 |

### BMS release gate

Execute designed BMS-T01–20 business and BMS-P-01–28 protocol cases per profile/site; overlapping cases are not additive independent coverage. BMS01 displays separate read/history/ACK/command/release acceptance. Evidence records exact build, adapter/profile/mapping revisions, environment, redacted raw requests/responses, local observations, actors and time. Build/type/unit/authority changes invalidate related evidence and require reassessment. [BMS research](../BMS/English/BMS-Research-and-Design-EN.md) retains vendor sources; [Detail Design](Detail-Design.md) specifies schemas/APIs, state machines and transactions.
**Canonical API integration.** This baseline implements the typed `/bms/connections/{connection_id}/...` resource family in [API-Contract.json](../API-Contract.json), including discovery, mapping revisions, qualification/activation, native acknowledgements, command previews/submission and lifecycle transitions. Earlier `/bms-systems` and `/bms-release-intents` names in research are draft aliases, not additional production endpoints. BMS command submission delegates the existing physical Command executor and cannot bypass its policy.

<!-- BMS-INTEGRATED-3.0-END -->

## 4. NFRs and acceptance environment

| ID | Proposed requirement | Verification |
|---|---|---|
| NFR-01 | Production regional core 99.95% monthly | Synthetic + server metrics; include dependency failures affecting users |
| NFR-02 | Ingest p95 ≤ 2 s; fan-out enqueue p95 ≤ 5 s | Load of 100 event/s steady, 1,000 event/s for 60 s; 10,000 recipients/incident; metadata payload ≤ 64 KB |
| NFR-03 | Priority fairness | P1 reserved queues; tenant noisy-neighbor test; bulk telemetry must not block SOS |
| NFR-04 | Multi-AZ target RPO 0 for committed records, RTO ≤ 15 minutes | Kill primary, verify durable commit and failover; commit only after testing |
| NFR-05 | Regional disaster RPO ≤ 5 minutes, RTO ≤ 60 minutes | Restore/cold-region drill within residency policy; immutable backup restore |
| NFR-06 | WCAG 2.2 AA target | Keyboard, screen reader, zoom, contrast, and error announcements; no certification claim yet |
| NFR-07 | Web interactive p95 ≤ 3 s on the reference network | 4G simulation, representative low-end device; map loads separate from core content |
| NFR-08 | Offline durable outbox and stale visibility | Airplane mode, app kill, reconnect, clock skew, and reassignment conflict |
| NFR-09 | Security isolation | Tenant/object permission tests, upload validation, credential revocation, audit coverage |
| NFR-10 | Backward compatibility | API/event contract tests; additive minor changes; parallel major versions with sunset |

Reference loads are engineering targets, not measured benchmarks. Media uploads use object storage separately from the critical event pipeline. NFRs apply to the product to be built; the static prototype does not demonstrate that these requirements are met.

| ID | Physical requirement | Verification |
|---|---|---|
| NFR-11 | Local automatic protection independent of cloud/edge availability | Witness cloud/link/adapter failure without inhibiting the approved local protection sequence |
| NFR-12 | Configuration-specific telemetry/feedback timing and quality | Signed freshness, delivery, and feedback deadlines per device/site; measure separately; UNKNOWN on deadline violation |
| NFR-13 | OT and command isolation | Prove monitor-only enforcement, denied writes, least privilege, maintenance access control, and no test-to-live path |
| NFR-14 | Configuration-specific physical assurance | Complete provenance and signed required FAT/SAT; changes invalidate affected capability acceptance |

These physical NFRs do not substitute software latency targets for physical response or hydraulic performance. Device/site timing and pass criteria must be approved before tests, and results must identify firmware, hardware, and operating conditions.

## 5. Overall acceptance gate

### V2 interaction gate mapped to existing contracts

These criteria extend acceptance of the corresponding FRs without changing IDs or API enums.

| Contract / screens | Condition and observable result |
|---|---|
| WF-05, FR-C06/C07/C08, FR-X01 | Without connectivity, save a locally pending request; do not display server or team receipt. Reconcile using the original identifier when connectivity returns. Reported location remains editable before submission. |
| WF-11, FR-R02/R03/R04, FR-O08/O09 | Selecting a team does not mean acceptance or arrival. Show the owner and source-backed state; an unsupported ETA is unconfirmed, not an illustrative time presented as a promise. |
| WF-22/24, FR-C35/C36/C37/C38/C39 | Unknown heading removes turn arrows; unverified floor removes turn-by-turn guidance. Withdrawal cancels old route graphics and queued speech before a replacement can open. Only an approved replacement with the correct revision may guide. |
| WF-12, FR-C27 | Entering or reloading discreet mode starts no sound, vibration or speech; quick exit and clearly labeled assistance remain available. |
| WF-21/30, FR-P04/P09/F11/F12 | Receipt, actual playback, human ACK and physical effect have separate sources and timestamps. Missing independent feedback remains UNKNOWN; no automatic retry of a non-idempotent operation. |

Cross-cutting gate: VI/EN/JA diagrams have equivalent text, icons have labels and color is never the sole meaning. Keyboard and focus remain usable; 320 CSS px reflow and text enlargement retain the action. Measure 48–56 px touch targets for emergency/field flows and 44 px for ordinary controls. Test assistive technology and real devices; screenshots or CSS inspection alone do not establish conformity.

Prototype v2 uses scene navigation and sample records. Navigation to C08 or a confirmation screen is not backend-receipt evidence. These are implementation gates and must not be marked PASS from prototype navigation alone.


Run complete Fire, Disaster, Fall, Road, discreet SOS, and generic assistance flows; test duplicates, late data, out-of-order data, expiry, network partitions, unauthorized tenants, quota saturation, provider failures, and restore. For physical/drone integrations, simulator PASS does not replace on-site acceptance. The detailed matrix is in Acceptance-Matrix.csv. Screen-level acceptance is in Screen-Specifications.md and linked to each mockup ID.


The physical gate additionally executes PHY-01–PHY-16 and AC-F01–AC-F20, checks every FR-PHY-01–FR-PHY-16 requirement, and requires the approved physical test arrangement and authorized site team. Acceptance-Matrix.csv retains the 298 baseline cases and adds 48 BMS cases (346 planned cases before any separately managed screen acceptance additions). Designed cases are not execution evidence. Supplier support, physical permits, local operator readiness, and signed FAT/SAT are dependencies for enabling production control; missing evidence leaves the relevant capability unavailable or monitor-only.

## Mandatory appendices within the same baseline

[Rescue speakers and voice navigation](Voice-Rescue-Design.md) adds WF-21–22. [Positioning, optimization, AI, and care profiles](Positioning-AI-Care-Design.md) adds WF-23–27. These two documents are part of the full design, not optional features for a later phase. [Screen specifications](Screen-Specifications.md) provides FRs for each screen ID.
