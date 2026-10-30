# SmartAlarm — Functional Requirements Document

![SmartAlarm — explanatory diagram](assets/03-Proactive-Rescue.svg)


Version 1.0 · 23/10/2026 · Proposed design. WF IDs are cross-screen requirements; FR-<screen ID> denotes detailed interface specifications in Screen-Specifications.md. Together they form the complete FRD for the baseline.

Revision 1.0 is a complete design baseline, not a deployed or certified product. WF-01–WF-20 below, mandatory WF-21–WF-27 appendices, and WF-28–WF-33 physical workflows form 33 workflows. The screen catalog contains 233 screens, including F01–F20. Physical integration must use configuration-specific evidence from [Physical Device Catalog](Physical-Device-Catalog.md); the functional requirements below do not assert unsupported vendor capabilities.

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


The physical gate additionally executes PHY-01–PHY-16 and AC-F01–AC-F20, checks every FR-PHY-01–FR-PHY-16 requirement, and requires the approved physical test arrangement and authorized site team. Acceptance-Matrix.csv contains 65 cross-system and 233 screen cases (298 total). Designed cases are not execution evidence. Supplier support, physical permits, local operator readiness, and signed FAT/SAT are dependencies for enabling production control; missing evidence leaves the relevant capability unavailable or monitor-only.

## Mandatory appendices within the same baseline

[Rescue speakers and voice navigation](Voice-Rescue-Design.md) adds WF-21–22. [Positioning, optimization, AI, and care profiles](Positioning-AI-Care-Design.md) adds WF-23–27. These two documents are part of the full design, not optional features for a later phase. [Screen specifications](Screen-Specifications.md) provides FRs for each screen ID.
