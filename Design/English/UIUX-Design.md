# SmartAlarm — UI/UX & Design System

Revision 2.0 · Full product · Vietnamese / English / Japanese. See [Prototype](../Prototype.html), [screen catalog](Screen-Catalog.csv), [individual screen specifications](Screen-Specifications.md), and [tokens](../Design-Tokens.json).

![SmartAlarm overview](../assets/01-All-in-One.svg)

## 1. V2 visual-first design: what, where, next action

**Decision order: hazard → affected place → next action → uncertainty.** Citizen emergency screens are guidance surfaces, not miniature administration dashboards. A labeled hazard pictogram, task-specific scene and concise next action occupy the first decision layer. Full field values and operational rules remain available in labeled disclosures and the design inspector. Internal implementation rules do not become the product subtitle.

Composition follows the actor and task before the legacy layout type. The citizen sees the relevant landmark and assistance action; the responder sees destination, hazard and assignment state; the commander sees incident scope, open needs, map and unit capacity; the administrator sees the object, version and change impact. Do not draw a map for every screen: permissions use a matrix, translations use paired text, execution uses an evidence timeline, and physical systems use a control schematic.

Use purpose-drawn SVG scenes and icon-plus-short-label controls. Generic glyphs, color-only status, decorative photos and cinematic emergency backgrounds are excluded from the critical path. Camera evidence is source material with permission, capture time and caption. All prototype geometry is illustrative, not a surveyed plan.

Unknown/stale/pending must be as legible as confirmed. Display observed time and source, not a fixed “updated 8 seconds ago” claim. A receipt is distinct from human acknowledgment and from physical effect. Self-reported safe is labeled as such; absence of a distress signal never means safe.

This revision is a design contract and prototype specification. It does not claim completed usability testing or proven three-second recognition. See [the UX audit](UX-Redesign-Audit.md) and the [233-screen matrix](../UX-Redesign-Matrix.json).

## 2. Information architecture by user

| Surface | Priority tasks | Navigation and principles |
|---|---|---|
| Companion | Receive warnings, evacuate, SOS, support family | Home / SOS / Groups / Profile; prioritize guidance and receipts during incidents |
| Field | Accept work, arrive, record observations, hand over | Shift / Assignments / Incident / Outbox; show owner and pending sync |
| Command | Triage, dispatch, accountability, warning, PA, AI | Site/region scope fixed in the header; incident workspace connects all actions |
| Site operations | Location, graph, device, detector, calibration | Edit → test → review → publish; explicit version states |
| Connect / Developer | Adapter, schema, sandbox, health, DLQ | Capability before enabling; secrets never displayed in tables/logs |
| Care | Profile, consent, relationship, proactive cases | Separate functional needs from medical notes; minimal role-based views |
| Platform | Cell, release, DR, security, support access | Metadata by default; platform-operator status alone does not unlock tenant PII |
| Localization | VI/EN/JA, terms, templates, voice | Source version → translation → independent review → publication |

Screen IDs remain stable across name/locale changes; shared screens are reused through context without duplicating logic per industry. Taxonomy/playbook/site profiles determine content differences. Maps have floor/location context, a list alternative, and source timestamps.

## 3. V2 tokens and measured accessibility targets

Design-Tokens.json is synchronized to prototype-v2.css. The CSS currently declares these values directly; synchronization is not a claim that the prototype imports the JSON. Production must generate both from one versioned source. The JSON retains primitive → semantic → component layers and records CSS variable bindings, responsive breakpoints, reference contrast calculations and acceptance targets.

| Element | V2 value / behavior |
|---|---|
| Canvas / ink / muted / divider | #F3F5F4 / #142B35 / #52666F / #D3DFDF |
| Urgent / confirmed / information / uncertain | #B51E32 / #08745E / #155FA0 / #8B5B00 |
| Navigation / review stage | #192F39 / #E8EEEF |
| Verified guidance / uncertain guidance | #0A5F50 with white; #FFF1CD with #5F3E00 |
| Body | 16 px, line-height 1.45 in current CSS; user text enlargement must remain usable |
| Headings | h1 30 px; mobile 26 px; urgent 27 px; h2 21 px; h3 17 px |
| Guidance instruction | 25 px; mobile 23 px |
| Font | Segoe UI, Arial, Yu Gothic, Meiryo, sans-serif |
| Controls | Main buttons/inputs 48 px minimum; mobile primary 56 px; review chrome/disclosures 44 px; phone navigation 52 px |
| SOS choices | 132 px minimum; “other” row 72 px; pictogram 44 px with visible label |
| Focus | 3 px blue outline, 4 px offset; verify against actual adjacent surfaces |
| Radius | Button/card 8 px; scene 10 px; frame 12 px; desktop mobile-preview frame 28 px |
| Motion | No defined transition durations; reduced motion disables animation/transitions and smooth scrolling |
| Responsive | Compact layout at 1120 px; mobile at 720 px; mobile-preview maximum 444 px, focus preview 460 px |

A subtle divider is not automatically an accessible control boundary. Test boundaries, text and focus in the rendered context. Target normal-text contrast ≥ 4.5:1 and applicable large-text/non-text contrast ≥ 3:1. WCAG 2.2 minimum target size is 24 CSS px with defined exceptions; project touch targets are deliberately larger. Reference contrast values in JSON apply only to flat color pairs, not the complete screen. Use label, shape and pattern in addition to color; unknown never inherits confirmed green. Test 320 CSS-pixel reflow, 200% text enlargement, keyboard focus, screen readers, one-handed interaction, reduced motion and long VI/EN/JA content.

## 4. Component specifications

| Component | Data and behavior | States |
|---|---|---|
| Incident badge | severity + state + source/freshness; click opens incident | new/active/contained/closed/unknown |
| Receipt card | ID, server time, process state; server receipt differs from human ACK | local pending/received/acknowledged/failed |
| SOS action | Clear CTA, with an Unknown option; no mandatory hold gesture for users unable to perform it | ready/confirming/sending/pending/received |
| Voice step | landmark, heading quality, step index, transcript, repeat/pause | playing/paused/replanning/stale/no verified route |
| Map/floor | version, floor, overlays, legend, accessible text list | loading/partial/offline/stale/no location |
| Priority case | person, exposure, functional need, presence quality, reasons | proposed/reviewed/assigned/contacted/resolved |
| Approval panel | exact digest, author, approver, target, effect, TTL | draft/pending/approved/expired/rejected/conflict |
| Device command | Separate requested/accepted/completed; capability-specific feedback | pending/accepted/executing/succeeded/unknown |
| Speaker receipt | device + broadcast version + playback + fault | buffering/playing/completed/preempted/unknown |
| AI answer | cutoff, evidence links, uncertain claims, human decision | generating/validated/unsupported/stale/unavailable |
| Data grid | sortable/searchable, stable row key, scoped export | loading/empty/filter-empty/denied/error |
| Health record | purpose, access reason, minimal fields, audit | limited view/authorized/break-glass/expired |

Approval actions use explicit verbs, not just “OK”. Delete/deactivate/revoke include an impact explanation; destructive actions do not share the color/position of safe primary actions. Undo appears only when the backend actually supports reversing the effect; do not promise undo for an executed physical command.

## 5. Clickable review flows

- Fire response: O03 → O05 → O06 → O04 → O08 → O09 → O10 → O11 → O12; citizen C02 → C03 → C05 → C06 → C07 → C08 → C11 → C12.
- Proactive rescue: H10 → H08 → H09 → O09 → R03 → R04 → R05 → R06 → R07 → R08. Later SOS requests link to the case according to the backend design.
- Voice route: C35 → C36; secondary links C37/C38 cover rerouting and uncertainty; C40 configures voice. S15 → S16 is graph validation; O35 → O36 distributes versions.
- PA: P01 → P02 → P03 → P04 → P05; P06 live session review; P07 connects a drone mission; P09 arbitration policy.
- AI: Q06 → Q07 → Q05 → O36; evidence links to H09/O05, with no automatic command-execution button.
- Integration: I01 → I02 → I03 → I04 → I05 → I06; D05 → D06 is adapter conformance.
- Localization: L01 → L02 → L03 → L01; L04 voice, L05 fallback, L06 terms.

Other screens have individual deep links in the catalog. The prototype implements navigation, search/filter, basic form validation, choice selection, local sample chat, and speech samples if supported by the OS. It has no backend or real control; production business states are described in the FRD/Detail Design. Some sample input values remain in English as source content; labels/titles/navigation switch between VI/EN/JA. English sample data is not a complete translation of production warning templates.

## 6. Internationalization & accessibility

UI locale and content locale are separate: Japanese users may read an original message entered by a Vietnamese user, alongside a labeled assistive translation. Critical templates have approved vi/en/ja versions, text/audio parity, and locale-specific reviewers. Do not concatenate words into sentences; ICU placeholders use typed variables and guard against lost/swapped variables across translations. Field names, validation, empty/error states, and date/time must all be localized. Test Japanese line breaks, full-width punctuation, and IME; test Vietnamese diacritics with fonts and truncation. Avoid excessive uppercase/letter spacing for Japanese.

All actions support keyboards; modals trap focus correctly and return focus to the trigger on closing; live regions announce receipts/errors sufficiently without continuously reading telemetry. Screen readers have map descriptions and alternative lists. Support 200% user zoom, mobile text scaling, high contrast, and reduced motion; do not unnecessarily lock orientation. App voice has transcripts; people who cannot hear use text/haptics; people with limited vision have screen readers and CTA labels. Directions are more than arrows; always include text/landmarks.

## 7. Critical state matrix

| Situation | Required display | Alternative action |
|---|---|---|
| SOS has not reached server | Local pending, timestamp, no success icon | Retry with same request ID; configured local calling option |
| Location/floor unknown | Method/age/uncertainty; no falsely precise pin | Enter location, scan anchor, SOS |
| Hazard updated | Route withdrawn, stop old speech, new version | Reviewed guidance / assistance |
| No route | Clearly state that a route cannot be verified | Approved refuge/assisted evacuation, no fabricated route |
| No response to welfare check | Unknown/no contact | Escalation according to policy |
| Missing health profile | No assistance information, not “healthy” | Proactively ask about needs when making contact |
| PA ACK but speaker fault | Per-device unknown/fault, coverage gap | Team/portable speaker/other channel |
| AI stale/unsupported | Cutoff, sources, warning; action disabled | Manual review / deterministic services |
| Conflicting update | Server version vs draft | Review/merge, no silent overwrite |
| Region degradation | Impacted scope and freshness | Approved failover, cached approved content |

## 8. V2 responsive and composition architecture

The current CSS uses 1120 px and 720 px breakpoints. Desktop shows a role-specific scene/workspace with an adjacent decision rail. At 1120 px the command rail and split views move below the scene; at 720 px the review shell collapses and product content uses a single task column. Mobile actions stack or use an explicit two-action arrangement; they must not disappear. Main mobile actions are 56 px high. The current implementation does not guarantee a sticky action bar: acceptability depends on verifying the action and its necessary alternative remain discoverable without covering the scene or content.

The review catalog and specification inspector are separate from product content. Focus mode removes them. Source fields can be progressively disclosed, but critical constraints and recovery controls remain visible. Screen-specific composition is defined in each of the 233 screen specifications, not inferred from a generic legacy layout label. Wallboards remain read-only and omit restricted medical details.

Scenes provide meaningful titles/descriptions and text equivalents. Drawn arrows require verified heading, route version and hazard evidence. If those fail, remove the implied direction and expose manual location, verified refuge or assistance as appropriate. Receipt ladders distinguish local, server, human and physical evidence; they do not advance merely because navigation occurs.

## 9. V2 usability validation plan — not yet conducted

The three-second hazard/place/next-action recognition goal is a hypothesis, not a result. Run counterbalanced baseline-versus-V2 tasks with citizens, responders, dispatchers and physical-system operators; include older, low-vision, cognitive/access-needs, one-handed and multilingual participants. Use safe simulations, consent and a stop option. Measure correct recognition, time-to-first-correct-action, completion, mistaken pending/unknown interpretations, accidental actions and recovery after loss of connection, heading or route approval. Report errors and role-specific distributions, not only averages.

Test small unfamiliar icons alone and with labels, long VI/EN/JA copy, reduced motion, color-vision variation and assistive technology. Agree release criteria before testing; fast but wrong is failure. Screenshot checks and structural QA are not user studies or accessibility certification. The audit contains the study protocol and domain failure cases.

## 10. References

[WCAG 2.2](https://www.w3.org/TR/WCAG22/) is the target web standard. The design references modern component systems and native conventions while retaining emergency-response domain semantics. No certification or actual usability measurement is claimed yet.

<!-- PHYSICAL_DESIGN_1_0 -->

## 11. Baseline 1.0 — physical firefighting and rescue interfaces

The full product now contains **233 screens and 33 workflows**. PhysicalSystems F01–F20 add controller/point/zone/cause-and-effect onboarding (WF-28), physical supervision (WF-29), conditional control (WF-30), impairment/maintenance (WF-31), FAT/SAT/certification (WF-32), and rescue equipment missions (WF-33). Existing screen IDs remain stable. Do not provide a generic “fight fire” button for devices with different physical consequences.

F01/F07/F08 place source, observed_at, quality and test/impairment/local-override state beside each signal. Pump-running, pressure, valve-open and flow remain separate; controller ACK never has the color or label “fire extinguished”. Unknown, fault, stale and power loss cannot share a green indicator. Dashboards do not aggregate impaired zones into all-clear. Physical maps identify floor, source point, mapping revision and zone boundary.

F09→F10→F11 form review → authorize → feedback, not three clicks that imply execution. Review exposes exact target/operation/parameters/zone/version/expiry, consequences and local authority. Unverified capability/certificate/interlock blocks the production execution CTA with reasons and a path to F17; the prototype only navigates review screens. Requester and approver are independent; any payload edit invalidates approval. Default Enter, hidden-zone bulk selection and ambiguous gestures cannot initiate release. Two-person confirmation does not replace controller interlocks.

F11 separates acceptance, controller execution reports and independent physical feedback. F12 reconciles unknown outcomes through supported readback/qualified observation; it provides no release-retry action to discover the outcome. F13 prominently shows local override and revokes the remote lease; return to remote needs explicit authorized action, never reconnection alone.

F14/F18 expose permit, scope, compensating measure, owner, expiry, overdue escalation and witnessed restoration. Permit expiry does not make impaired equipment healthy. F15–F17 pin BOM/firmware/mapping/cause-and-effect/test plan; expected and observed fields are separate, with no automatic pass. Missing certificate-scope evidence blocks release. F19 shows robot/drone mission, qualified operator, water supply, access/load limits, local stop and casualty procedure; an unknown public API permits task dispatch only, not a fabricated joystick/discharge control.

Additional usability tasks: distinguish flow from valve contact; identify incomplete ACK evidence; detect test zones; handle local control; dispatch a robot despite link loss; locate missing SAT evidence. Keyboard/screen-reader output includes blocking reasons and source/freshness, not color alone. State transitions retain a path to the local response team during cloud outages. See [screen specifications](Screen-Specifications.md) and [device catalog](Rescue-IoT-Device-Catalog.md).
