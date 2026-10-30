# SmartAlarm — UX redesign audit and screen contract

**Decision baseline: 23 October 2026 · 233 screens · English companion**

## Executive decision

SmartAlarm needs different visual workspaces for a person escaping danger, a responder completing a task, a commander coordinating an incident, and an administrator changing configuration. Repeated card grids and explanatory paragraphs do not communicate those jobs. The redesign places hazard, location, current evidence and next action before supporting details. Every registered ID, role, field, action and destination remains preserved.

This is a design audit and acceptance specification, not a user-testing report, safe-evacuation proof, WCAG conformance claim or evidence of live operation. Three-second recognition is a **hypothesis to test**, not an achieved result. Prototype data and simulated receipts remain explicitly identified. The JSON companion contains one bilingual record per screen and its original contract. Context classification describes the predominant job; it never changes authorization.

## 1. Evidence and concrete defects

The review inspected Screen-Registry.json, prototype.js, UIUX-Design.md and Screen-Specifications.md. The written baseline already describes role-based surfaces and uncertainty, but the previous renderer did not realize those distinctions consistently.

| Implementation evidence | Consequence | Required correction |
|---|---|---|
| content(s) selects shared composition primarily from s.type. | Residents, dispatchers and maintainers decode similar cards despite different decisions. | Select role/task composition first; reuse smaller components inside it. |
| floor(s) draws one static floor and route; map(s) draws one campus. | A schematic can imply situation knowledge it does not possess. | Bind geometry to context and evidence; mark illustrations and provide list equivalents. |
| render() places localized SMARTALARM.rules in the product subtitle. | Internal implementation rules compete with urgent guidance. | Move rules to the inspector; product copy states what, where and next action. |
| ui.fresh contains constant “Updated 8s ago”. | Data appears current without new observations. | Show explicit simulation time or age calculated from real observed time; distinguish fetched time. |
| Generic glyphs and repeated dot legends represent different entities. | Users must learn arbitrary symbols under pressure. | Labeled pictograms distinguish people, blocked paths, refuges, speakers and controllers. |
| Mobile navigation is reused across citizen and responder surfaces. | Tasks, decline, assistance, transcript or outbox alternatives become hard to discover. | Use role-specific navigation and verify critical alternatives at narrow widths. |
| One generic non-ready message replaces task content. | Offline SOS, stale navigation and denied medical access look equivalent. | Show the unavailable capability, retained evidence and valid next step. |
| Broad states omit route withdrawal, uncertain heading and physical-result reconciliation. | Happy-path polish conceals consequential failure decisions. | Add domain-specific transitions and test them, not only isolated error screenshots. |
| Primary clicks show a transition toast then navigate. | Navigation can be mistaken for delivery or execution. | Separate local intent, server receipt, human acknowledgment and physical evidence. |

These are source observations and design risks, not measured incident outcomes. Source review cannot establish comprehension, touch usability or screen-reader behavior.

## 2. Hierarchy by role

| Surface | First reading | Main visual | Action and disclosure |
|---|---|---|---|
| Citizen in danger | Hazard, affected place, one instruction | Relevant landmark or floor segment with uncertainty | Help/SOS or validated next step; voice, transcript and manual location reachable |
| Citizen everyday | Local warning and own/family status | Compact area summary and labeled people states | Active warning first; social and privacy features outside urgent guidance |
| Responder | Assigned task, destination, hazards | Approach/floor view with assistance targets | Accept/decline, arrival, observation or handover by phase; visible outbox |
| Command | Priority, unanswered needs, ownership | Situation map, actionable queue and unit lanes | Incident-scoped dispatch/warning; full history in details |
| Public address | Zones, approved message, priority owner | Coverage map and playback-evidence chain | Preview/approve/stop within authority; local priority visible |
| Physical systems | Exact equipment, authority, evidence | Control schematic and cause/effect graph | Review gates and reconciliation, no shortcut around interlocks |
| Care | Functional need, exposure, last-known evidence | Need/capability matching and presence matrix | Assign assistance; separate medical permission boundary |
| Site/integration | Object/version and change impact | Graph, mapping, diff or dependencies | Draft, test, review, publish; disclose advanced fields |
| Platform/developer/localization | Scope and validity | Compatibility grid, trace, region topology or paired translation | Sandbox/release/publication gates; protected secrets and tenant boundaries |

Visual-first does not mean maps everywhere. T04 needs a permission matrix; D02 a request/response split view; L03 a version comparison.

## 3. Emergency composition and visual policy

Order: **what happened → where it matters → what to do now → what is uncertain**. The first viewport contains one dominant action and its necessary alternative. A large help button must not push affected floor or route validity below the fold. Icons always have short visible labels; meaning never depends on color alone.

Use diagrams for spatial facts and device relationships. Decorative photography, dramatic flames and cinematic backgrounds do not belong in the critical path. Camera evidence has permission, capture time, source and readable caption. Prototype drawings are illustrative, not surveyed plans.

Position includes source, time and accuracy. Unknown heading removes directional arrows: use a named verified landmark, orientation-free plan, manual correction or assistance. Unknown floor, blocked segment, expired hazard evidence and withdrawn guidance are different states. Withdraw obsolete route lines and queued speech together; a replacement is not approved until its exact version is approved.

SOS permits unknown location and manual entry. Saved locally, received by server, accepted by team and resolved are different. Self-reported safety applies only to the person, audience and timestamp; it does not prove household or incident safety. Local controller authority, interlocks and handover rules survive cloud/network failure.

## 4. Findings by domain

- **A Access:** make region, organization and effective role explicit. Device revocation shows the selected target and consequence. Accessibility preview begins before emergencies.
- **C Citizen:** separate calm home, warnings, SOS, guidance and social circles. C35–C39 require actual guidance-state variations; C25 needs explicit fall-response choices; C27 honors discreet audio/haptics.
- **R Responder:** acceptance deadlines and ownership precede navigation. Observation, outbox and receiver handover are separate; synchronization must preserve notes.
- **O Command:** show open SOS and unconfirmed people beside unit capacity. Connect warning audience, approved version and delivery evidence. O35/O36 expose route restriction, withdrawal and unreachable people.
- **S Sites:** published geometry differs from drafts. Compare plan revisions, accessible edges, calibration, test evidence and coverage gaps before publication.
- **I Integrations:** visualize capability and trust boundaries. Test tenant spoof, duplicate events and expired certificates. Drone control stays with authorized pilot and local safety boundaries.
- **T Administration:** use scope matrices, escalation ladders, retention timelines and capacity charts. Make emergency reserved capacity explicit.
- **X System states:** each is a task-specific recovery. X01 retains pending SOS identity; X02 offers manual location; X09 marks stale evidence and unavailable commands.
- **G Platform:** show regional writer authority without exposing tenant records. Recovery evidence, support expiry and rollback are separate gates.
- **D Developer:** request/response, traces and versions dominate. Sandbox is unmistakable; copied examples never expose secrets.
- **L Localization:** align source, translation, variables and transcript. Missing critical content and stale versions block publication.
- **P Public address:** coverage, exact message, priority and stop matter more than a generic audio player. Receipt is not audibility; preserve local priority and lost-link behavior.
- **H Care:** match functional needs to assistance, restricting medical detail separately. Expected attendance, observed presence and unknown are different.
- **Q Intelligence:** evidence and uncertainty remain beside recommendations. Compare excluded routes as well as selected options; AI has sources, cutoff and human authority.
- **F Physical systems:** equipment topology, exact command and physical feedback replace generic cards. Unknown outcomes trigger reconciliation; capability evidence is not universal remote-control permission.

## 5. Accessibility and localization acceptance

WCAG 2.2 is the accessibility reference. WAI cognitive patterns inform design rather than adding a conformance level. Clear visible labels support comprehension. WCAG minimum target size is 24 × 24 CSS pixels with defined exceptions; this design targets 48–56 CSS pixels for emergency/field controls and 44 CSS pixels for routine controls, verified on actual layouts. [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [Clear Visible Labels](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p06-clear-labels/).

Test keyboard access, visible unobscured focus, programmatic names matching visible labels, status announcements, text enlargement and 320 CSS-pixel reflow. Measure normal-text contrast of at least 4.5:1 and applicable large-text/non-text contrast of at least 3:1. Map alternatives expose equivalent named entities and decisions without vision or dragging. Declared tokens alone do not establish compliance.

Add shape, pattern and text to color; test monochrome and common color-vision deficiencies. Reduced motion removes nonessential motion; continuous flashing is not an urgency mechanism. Voice includes transcript, replay and stop. Test one-handed use on touch hardware, reachability and accidental taps.

Fluent readers review VI/EN; preserve and regression-test existing JA rendering. Test long translations, Vietnamese diacritics and mixed-script locations. Test small/unfamiliar pictograms without labels to reveal ambiguity, then with labels in task context. Never claim universal icon comprehension or standards certification without evidence.

## 6. Controlled usability study — proposed, not conducted

Recruit citizens, responders, dispatchers and site/physical-system operators, including older people, low vision, cognitive/access needs, one-handed use and second-language readers. Use consent, non-distressing simulation and a stop option; never create real danger or send live alerts.

Counterbalance baseline/new design and scenario order while holding hazard facts and action choices constant. Measure time and accuracy identifying hazard, place and next action; successful task completion; unknown/stale/pending misread as safe/received; accidental consequential actions; recovery after route withdrawal, uncertain heading, offline SOS and unknown actuation. Report medians and upper-tail times, errors, sample size and confidence intervals where supported; do not hide role differences in one average.

Three seconds is a product target for short controlled exposure, followed by the participant explaining the interpretation. Fast but wrong fails. Set release thresholds before the study with the safety owner, informed by risk and pilot data. Any observed unsafe interpretation triggers investigation; no errors in a small sample does not prove safety.

Compare icon-only/icon-plus-label, small-screen/desktop, reduced-motion/standard and first/second-language conditions. Add assistive-technology walkthroughs and physical one-hand trials. Screenshot review cannot replace these sessions.

## 7. Verification gates and sources

1. Preserve exactly 233 unique IDs and original fields, role, action, destination, rules and workflow.
2. Execute each screen-specific validation; record fixture, viewport, locale, input method, expected state and observed result.
3. Exercise route withdrawal C03/C35–C39, SOS pending C07/X01, authority and unknown actuation O18/O19/F09–F13, acoustic uncertainty P04 and unknown presence H10.
4. Render all VI/EN screens and inspect narrow/enlarged-text layouts, focus, names, contrast and target geometry; archive evidence and defects.
5. Conduct the proposed study before making recognition-time claims.
6. Separately validate production authorization, local interlocks, integrations, timestamps and device feedback. A prototype transition proves none of these.

HSE emphasizes relevant alarms with defined responses and respect for human limitations. This informs action priority, ownership and alarm-flood control. The process-industry guidance does not certify SmartAlarm or replace site-specific assessment. [HSE alarm management](https://www.hse.gov.uk/humanfactors/topics/alarm-management.htm). WAI also advocates making objects and usage clear; role composition is this project's interpretation. [WAI understandable content objective](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/).

Sources were checked for this review as of **23 October 2026**. No external source establishes this prototype's usability.

## 8. Complete screen-by-screen redesign matrix

Every entry is a design obligation. JSON retains the full original fields, rules, workflow and transition. Folded details remain discoverable and keyboard-accessible; critical constraints stay in the decision layer.


### A01 — Welcome & region

**Context:** configuration · **Role:** Citizen · **FR:** FR-A01

**Primary visual:** Region selector with language samples and readable text-size preview

**Primary question:** For welcome & region, what do Region, Language establish, and is “Continue” available to Citizen in this scope?

**Primary action:** Continue → A02

**Secondary disclosure:** Keep Region, Language in the decision layer. Put the supporting details for Accessibility, full source/version history and FR-A01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a welcome & region fixture for Citizen; change Region and make Accessibility unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Continue” reaches A02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A02 — Sign in

**Context:** configuration · **Role:** All roles · **FR:** FR-A02

**Primary visual:** Workspace identity beside passkey and SSO entry

**Primary question:** For sign in, what do Email, Workspace establish, and is “Sign in” available to All roles in this scope?

**Primary action:** Sign in → A03

**Secondary disclosure:** Keep Email, Workspace in the decision layer. Put the supporting details for Method, full source/version history and FR-A02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a sign in fixture for All roles; change Email and make Method unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Sign in” reaches A03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A03 — Verify identity

**Context:** configuration · **Role:** All roles · **FR:** FR-A03

**Primary visual:** Verification method and code slots with remaining attempt feedback

**Primary question:** For verify identity, what do Method, Verification code establish, and is “Verify” available to All roles in this scope?

**Primary action:** Verify → A04

**Secondary disclosure:** Keep Method, Verification code in the decision layer. Put the supporting details for Trusted device, full source/version history and FR-A03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a verify identity fixture for All roles; change Method and make Trusted device unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Verify” reaches A04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A04 — Workspace switcher

**Context:** configuration · **Role:** All roles · **FR:** FR-A04

**Primary visual:** Organization tiles showing region and effective role before entry

**Primary question:** For workspace switcher, what do Northstar, Harbor Campus establish, and is “Enter workspace” available to All roles in this scope?

**Primary action:** Enter workspace → O01

**Secondary disclosure:** Keep Northstar, Harbor Campus in the decision layer. Put the supporting details for Personal, full source/version history and FR-A04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a workspace switcher fixture for All roles; change Northstar and make Personal unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Enter workspace” reaches O01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A05 — Recover access

**Context:** configuration · **Role:** All roles · **FR:** FR-A05

**Primary visual:** Recovery method selector and masked destination receipt

**Primary question:** For recover access, what do Email, Recovery method establish, and is “Send recovery link” available to All roles in this scope?

**Primary action:** Send recovery link → A02

**Secondary disclosure:** Keep Email, Recovery method in the decision layer. Put the supporting details for Request, full source/version history and FR-A05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a recover access fixture for All roles; change Email and make Request unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send recovery link” reaches A02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A06 — Accept invitation

**Context:** configuration · **Role:** All roles · **FR:** FR-A06

**Primary visual:** Invitation identity, role scope and expiry comparison

**Primary question:** For accept invitation, what do Organization, Role establish, and is “Accept invitation” available to All roles in this scope?

**Primary action:** Accept invitation → A07

**Secondary disclosure:** Keep Organization, Role in the decision layer. Put the supporting details for Region, Invitation, full source/version history and FR-A06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a accept invitation fixture for All roles; change Organization and make Invitation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Accept invitation” reaches A07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A07 — Permissions & consent

**Context:** configuration · **Role:** Citizen · **FR:** FR-A07

**Primary visual:** Separate permission switches with purpose pictograms

**Primary question:** For permissions & consent, what do Notifications, Location establish, and is “Save choices” available to Citizen in this scope?

**Primary action:** Save choices → C01

**Secondary disclosure:** Keep Notifications, Location in the decision layer. Put the supporting details for Emergency sharing, Camera, full source/version history and FR-A07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a permissions & consent fixture for Citizen; change Notifications and make Camera unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save choices” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A08 — Session & device security

**Context:** configuration · **Role:** All roles · **FR:** FR-A08

**Primary visual:** Device silhouettes with current-session badge and last activity

**Primary question:** For session & device security, what do This device, Work tablet establish, and is “Review session” available to All roles in this scope?

**Primary action:** Review session → A09

**Secondary disclosure:** Keep This device, Work tablet in the decision layer. Put the supporting details for Old phone, full source/version history and FR-A08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a session & device security fixture for All roles; change This device and make Old phone unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review session” reaches A09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A09 — Revoke session

**Context:** configuration · **Role:** All roles · **FR:** FR-A09

**Primary visual:** Selected device and revocation impact confirmation

**Primary question:** For revoke session, what do Device, Effect establish, and is “Revoke selected session” available to All roles in this scope?

**Primary action:** Revoke selected session → A08

**Secondary disclosure:** Keep Device, Effect in the decision layer. Put the supporting details for Reason, full source/version history and FR-A09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a revoke session fixture for All roles; change Device and make Reason unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Revoke selected session” reaches A08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### A10 — Profile & accessibility

**Context:** configuration · **Role:** All roles · **FR:** FR-A10

**Primary visual:** Live accessibility preview beside language and motion settings

**Primary question:** For profile & accessibility, what do Name, Language establish, and is “Save profile” available to All roles in this scope?

**Primary action:** Save profile → C01

**Secondary disclosure:** Keep Name, Language in the decision layer. Put the supporting details for Text size, Reduce motion, Timezone, full source/version history and FR-A10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**Validation:** Use a profile & accessibility fixture for All roles; change Name and make Timezone unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save profile” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C01 — Safety home

**Context:** configuration · **Role:** Citizen · **FR:** FR-C01

**Primary visual:** Local hazard summary above family check-in and connection state

**Primary question:** For safety home, what do Your area, Active alert establish, and is “View active alert” available to Citizen in this scope?

**Primary action:** View active alert → C02

**Secondary disclosure:** Keep Your area, Active alert in the decision layer. Put the supporting details for Family, Connection, full source/version history and FR-C01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a safety home fixture for Citizen; change Your area and make Connection unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View active alert” reaches C02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C02 — Alert detail

**Context:** emergency · **Role:** Citizen · **FR:** FR-C02

**Primary visual:** Hazard pictogram, affected place and one authoritative instruction

**Primary question:** For alert detail, what do Severity, Source establish, and is “View guidance” available to Citizen in this scope?

**Primary action:** View guidance → C03

**Secondary disclosure:** Keep Severity, Source in the decision layer. Put the supporting details for Updated, Instruction, full source/version history and FR-C02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a alert detail fixture for Citizen; change Severity and make Instruction unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View guidance” reaches C03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C03 — Evacuation guidance

**Context:** emergency · **Role:** Citizen · **FR:** FR-C03

**Primary visual:** Floor schematic with current position uncertainty, blocked corridor and accessible refuge

**Primary question:** For evacuation guidance, what do Location, Plan establish, and is “I need assistance” available to Citizen in this scope?

**Primary action:** I need assistance → C05

**Secondary disclosure:** Keep Location, Plan in the decision layer. Put the supporting details for Route status, Accessible route, full source/version history and FR-C03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** If route approval, floor or hazard freshness becomes invalid, withdraw the route line and show assistance/refuge options validated for the site.

**Validation:** Use a evacuation guidance fixture for Citizen; change Location and make Accessible route unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “I need assistance” reaches C05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C04 — Voice & accessible guidance

**Context:** emergency · **Role:** Citizen · **FR:** FR-C04

**Primary visual:** Large audio controls paired with synchronized readable transcript

**Primary question:** For voice & accessible guidance, what do Language, Audio establish, and is “Return to plan” available to Citizen in this scope?

**Primary action:** Return to plan → C03

**Secondary disclosure:** Keep Language, Audio in the decision layer. Put the supporting details for Transcript, Haptics, full source/version history and FR-C04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a voice & accessible guidance fixture for Citizen; change Language and make Haptics unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Return to plan” reaches C03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C05 — SOS type

**Context:** emergency · **Role:** Citizen · **FR:** FR-C05

**Primary visual:** Distinct fire, medical, collision and threat pictograms with short labels

**Primary question:** For sos type, what do Fire or trapped, Medical or fall establish, and is “Continue with selected need” available to Citizen in this scope?

**Primary action:** Continue with selected need → C06

**Secondary disclosure:** Keep Fire or trapped, Medical or fall in the decision layer. Put the supporting details for Road collision, Personal threat, Other need, full source/version history and FR-C05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a sos type fixture for Citizen; change Fire or trapped and make Other need unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Continue with selected need” reaches C06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C06 — SOS location & details

**Context:** emergency · **Role:** Citizen · **FR:** FR-C06

**Primary visual:** Location pin with accuracy boundary and manual correction

**Primary question:** For sos location & details, what do Location, Accuracy establish, and is “Review SOS” available to Citizen in this scope?

**Primary action:** Review SOS → C07

**Secondary disclosure:** Keep Location, Accuracy in the decision layer. Put the supporting details for People needing help, Note, full source/version history and FR-C06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a sos location & details fixture for Citizen; change Location and make Note unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review SOS” reaches C07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C07 — Confirm SOS

**Context:** emergency · **Role:** Citizen · **FR:** FR-C07

**Primary visual:** SOS review showing need, location and recipients before sending

**Primary question:** For confirm sos, what do Category, Location establish, and is “Send SOS — demo” available to Citizen in this scope?

**Primary action:** Send SOS — demo → C08

**Secondary disclosure:** Keep Category, Location in the decision layer. Put the supporting details for Recipients, Sharing, full source/version history and FR-C07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Sending may remain local pending; display server receipt separately and keep a safe alternate contact path, without repeated duplicate SOS.

**Validation:** Use a confirm sos fixture for Citizen; change Category and make Sharing unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Send SOS — demo” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C08 — SOS tracking

**Context:** emergency · **Role:** Citizen · **FR:** FR-C08

**Primary visual:** Receipt ladder distinguishing queued, server-received and human-accepted

**Primary question:** For sos tracking, what do 10:42:12, 10:42:18 establish, and is “Contact assigned team” available to Citizen in this scope?

**Primary action:** Contact assigned team → C09

**Secondary disclosure:** Keep 10:42:12, 10:42:18 in the decision layer. Put the supporting details for 10:43:02, Current, full source/version history and FR-C08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a sos tracking fixture for Citizen; change 10:42:12 and make Current unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Contact assigned team” reaches C09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C09 — Incident conversation

**Context:** emergency · **Role:** Citizen · **FR:** FR-C09

**Primary visual:** Incident conversation showing sender role and delivery state per message

**Primary question:** For incident conversation, what do Operator, You establish, and is “Send demo message” available to Citizen in this scope?

**Primary action:** Send demo message → C09

**Secondary disclosure:** Keep Operator, You in the decision layer. Put the supporting details for System, full source/version history and FR-C09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a incident conversation fixture for Citizen; change Operator and make System unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send demo message” reaches C09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C10 — Update or cancel SOS

**Context:** emergency · **Role:** Citizen · **FR:** FR-C10

**Primary visual:** Existing SOS beside proposed update and cancellation effect

**Primary question:** For update or cancel sos, what do Request, Action establish, and is “Submit update” available to Citizen in this scope?

**Primary action:** Submit update → C08

**Secondary disclosure:** Keep Request, Action in the decision layer. Put the supporting details for Reason, Notice, full source/version history and FR-C10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a update or cancel sos fixture for Citizen; change Request and make Notice unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit update” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C11 — Confirm personal safety

**Context:** emergency · **Role:** Citizen · **FR:** FR-C11

**Primary visual:** Three explicit personal-status choices with sharing precision

**Primary question:** For confirm personal safety, what do Status, Location establish, and is “Confirm my safety” available to Citizen in this scope?

**Primary action:** Confirm my safety → C12

**Secondary disclosure:** Keep Status, Location in the decision layer. Put the supporting details for Share with, Precision, full source/version history and FR-C11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Personal confirmation is self-reported, audience-scoped and timestamped; it must not mark an entire household or incident safe.

**Validation:** Use a confirm personal safety fixture for Citizen; change Status and make Precision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Confirm my safety” reaches C12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C12 — Safety receipt

**Context:** emergency · **Role:** Citizen · **FR:** FR-C12

**Primary visual:** Personal report and separate delivery receipts for each audience

**Primary question:** For safety receipt, what do Personal status, Groups establish, and is “View delivery details” available to Citizen in this scope?

**Primary action:** View delivery details → C13

**Secondary disclosure:** Keep Personal status, Groups in the decision layer. Put the supporting details for Contacts, Incident, full source/version history and FR-C12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a safety receipt fixture for Citizen; change Personal status and make Incident unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View delivery details” reaches C13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C13 — Notification inbox

**Context:** configuration · **Role:** Citizen · **FR:** FR-C13

**Primary visual:** Alert inbox ordered by urgency with source and expiration

**Primary question:** For notification inbox, what do Fire alert, Safety confirmation establish, and is “Open alert” available to Citizen in this scope?

**Primary action:** Open alert → C02

**Secondary disclosure:** Keep Fire alert, Safety confirmation in the decision layer. Put the supporting details for Family update, full source/version history and FR-C13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a notification inbox fixture for Citizen; change Fire alert and make Family update unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open alert” reaches C02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C14 — Nearby hazards

**Context:** emergency · **Role:** Citizen · **FR:** FR-C14

**Primary visual:** Nearby hazard map with list equivalent and measured distance uncertainty

**Primary question:** For nearby hazards, what do Flood watch, Road closure establish, and is “View hazard” available to Citizen in this scope?

**Primary action:** View hazard → C15

**Secondary disclosure:** Keep Flood watch, Road closure in the decision layer. Put the supporting details for Fire, full source/version history and FR-C14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a nearby hazards fixture for Citizen; change Flood watch and make Fire unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “View hazard” reaches C15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C15 — Disaster advisory

**Context:** emergency · **Role:** Citizen · **FR:** FR-C15

**Primary visual:** Advisory boundary and validity band beside source certainty

**Primary question:** For disaster advisory, what do Source, Certainty establish, and is “View shelter information” available to Citizen in this scope?

**Primary action:** View shelter information → C16

**Secondary disclosure:** Keep Source, Certainty in the decision layer. Put the supporting details for Valid until, Area, full source/version history and FR-C15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a disaster advisory fixture for Citizen; change Source and make Area unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View shelter information” reaches C16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C16 — Shelters & assembly points

**Context:** emergency · **Role:** Citizen · **FR:** FR-C16

**Primary visual:** Shelter cards comparing accessibility, current availability and distance

**Primary question:** For shelters & assembly points, what do North shelter, West center establish, and is “Open shelter details” available to Citizen in this scope?

**Primary action:** Open shelter details → C17

**Secondary disclosure:** Keep North shelter, West center in the decision layer. Put the supporting details for Campus North, full source/version history and FR-C16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a shelters & assembly points fixture for Citizen; change North shelter and make Campus North unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open shelter details” reaches C17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C17 — Shelter details

**Context:** emergency · **Role:** Citizen · **FR:** FR-C17

**Primary visual:** Shelter entrance diagram and verified access/capacity status

**Primary question:** For shelter details, what do Status, Accessibility establish, and is “Save shelter offline” available to Citizen in this scope?

**Primary action:** Save shelter offline → C18

**Secondary disclosure:** Keep Status, Accessibility in the decision layer. Put the supporting details for Capacity, Address, full source/version history and FR-C17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a shelter details fixture for Citizen; change Status and make Address unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save shelter offline” reaches C18 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C18 — Offline safety pack

**Context:** configuration · **Role:** Citizen · **FR:** FR-C18

**Primary visual:** Offline pack contents with version and last synchronization age

**Primary question:** For offline safety pack, what do Campus plan, Contacts establish, and is “Review cached plan” available to Citizen in this scope?

**Primary action:** Review cached plan → C03

**Secondary disclosure:** Keep Campus plan, Contacts in the decision layer. Put the supporting details for Guidance, Last sync, full source/version history and FR-C18 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a offline safety pack fixture for Citizen; change Campus plan and make Last sync unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review cached plan” reaches C03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C19 — My circles

**Context:** configuration · **Role:** Citizen · **FR:** FR-C19

**Primary visual:** Circle membership summary with outstanding check-in count

**Primary question:** For my circles, what do Family, Campus establish, and is “Open family” available to Citizen in this scope?

**Primary action:** Open family → C20

**Secondary disclosure:** Keep Family, Campus in the decision layer. Put the supporting details for Travel team, full source/version history and FR-C19 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a my circles fixture for Citizen; change Family and make Travel team unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open family” reaches C20 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C20 — Circle conversation

**Context:** configuration · **Role:** Citizen · **FR:** FR-C20

**Primary visual:** Group conversation with member check-in context

**Primary question:** For circle conversation, what do System, Jamie establish, and is “View member status” available to Citizen in this scope?

**Primary action:** View member status → C22

**Secondary disclosure:** Keep System, Jamie in the decision layer. Put the supporting details for Morgan, full source/version history and FR-C20 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a circle conversation fixture for Citizen; change System and make Morgan unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “View member status” reaches C22 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C21 — Create or edit circle

**Context:** configuration · **Role:** Citizen · **FR:** FR-C21

**Primary visual:** Circle membership and sharing scope preview

**Primary question:** For create or edit circle, what do Name, Membership establish, and is “Save circle” available to Citizen in this scope?

**Primary action:** Save circle → C19

**Secondary disclosure:** Keep Name, Membership in the decision layer. Put the supporting details for Safety updates, Location sharing, full source/version history and FR-C21 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a create or edit circle fixture for Citizen; change Name and make Location sharing unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save circle” reaches C19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C22 — Circle member status

**Context:** configuration · **Role:** Citizen · **FR:** FR-C22

**Primary visual:** Member status board separating reported safe from unknown

**Primary question:** For circle member status, what do Alex, Jamie establish, and is “Send check-in request” available to Citizen in this scope?

**Primary action:** Send check-in request → C20

**Secondary disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, full source/version history and FR-C22 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a circle member status fixture for Citizen; change Alex and make Morgan unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send check-in request” reaches C20 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C23 — Emergency contacts

**Context:** configuration · **Role:** Citizen · **FR:** FR-C23

**Primary visual:** Contact order with channel pictograms and disclosure preview

**Primary question:** For emergency contacts, what do Primary, Secondary establish, and is “Save contacts” available to Citizen in this scope?

**Primary action:** Save contacts → C01

**Secondary disclosure:** Keep Primary, Secondary in the decision layer. Put the supporting details for Channel, Share, full source/version history and FR-C23 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a emergency contacts fixture for Citizen; change Primary and make Share unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save contacts” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C24 — Care & fall detection

**Context:** configuration · **Role:** Citizen · **FR:** FR-C24

**Primary visual:** Wearable connection and fall-check-in escalation sequence

**Primary question:** For care & fall detection, what do Wearable, Detection establish, and is “Review test alert” available to Citizen in this scope?

**Primary action:** Review test alert → C25

**Secondary disclosure:** Keep Wearable, Detection in the decision layer. Put the supporting details for Check-in window, Escalation, full source/version history and FR-C24 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a care & fall detection fixture for Citizen; change Wearable and make Escalation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review test alert” reaches C25 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C25 — Possible fall check-in

**Context:** emergency · **Role:** Citizen · **FR:** FR-C25

**Primary visual:** Fall check-in with large help and dismiss controls and time remaining

**Primary question:** For possible fall check-in, what do Evidence, Check-in window establish, and is “I need help now” available to Citizen in this scope?

**Primary action:** I need help now → C08

**Secondary disclosure:** Keep Evidence, Check-in window in the decision layer. Put the supporting details for No response, Alternative, full source/version history and FR-C25 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** No response remains unconfirmed; a stopped timer is not a help receipt, and accessibility must not depend on a press-and-hold gesture.

**Validation:** Use a possible fall check-in fixture for Citizen; change Evidence and make Alternative unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “I need help now” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C26 — Road incident report

**Context:** emergency · **Role:** Citizen · **FR:** FR-C26

**Primary visual:** Road orientation sketch with manual direction and injury entry

**Primary question:** For road incident report, what do Position, Direction establish, and is “Review SOS” available to Citizen in this scope?

**Primary action:** Review SOS → C07

**Secondary disclosure:** Keep Position, Direction in the decision layer. Put the supporting details for Vehicles, Injuries, Attachment, full source/version history and FR-C26 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a road incident report fixture for Citizen; change Position and make Attachment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review SOS” reaches C07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C27 — Discreet assistance

**Context:** emergency · **Role:** Citizen · **FR:** FR-C27

**Primary visual:** Quiet high-contrast assistance controls showing sound and vibration state

**Primary question:** For discreet assistance, what do Sound, Haptics establish, and is “Send discreet request — demo” available to Citizen in this scope?

**Primary action:** Send discreet request — demo → C08

**Secondary disclosure:** Keep Sound, Haptics in the decision layer. Put the supporting details for Sharing, Location, full source/version history and FR-C27 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Never autoplay speech or vibration against the discreet selection; reveal pending versus received without a conspicuous success animation.

**Validation:** Use a discreet assistance fixture for Citizen; change Sound and make Location unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Send discreet request — demo” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C28 — My reports & history

**Context:** configuration · **Role:** Citizen · **FR:** FR-C28

**Primary visual:** Personal request history showing open, resolved and pending receipts

**Primary question:** For my reports & history, what do SOS-041, SOS-028 establish, and is “View request” available to Citizen in this scope?

**Primary action:** View request → C08

**Secondary disclosure:** Keep SOS-041, SOS-028 in the decision layer. Put the supporting details for Check-in, full source/version history and FR-C28 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a my reports & history fixture for Citizen; change SOS-041 and make Check-in unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “View request” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C29 — Privacy & data requests

**Context:** configuration · **Role:** Citizen · **FR:** FR-C29

**Primary visual:** Privacy scope preview showing live location and export/deletion choices

**Primary question:** For privacy & data requests, what do Live location, Circle visibility establish, and is “Review data request” available to Citizen in this scope?

**Primary action:** Review data request → C30

**Secondary disclosure:** Keep Live location, Circle visibility in the decision layer. Put the supporting details for Export, Deletion, full source/version history and FR-C29 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a privacy & data requests fixture for Citizen; change Live location and make Deletion unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review data request” reaches C30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C30 — Data request receipt

**Context:** configuration · **Role:** Citizen · **FR:** FR-C30

**Primary visual:** Data request progress and verified delivery destination

**Primary question:** For data request receipt, what do Type, Scope establish, and is “Back to privacy” available to Citizen in this scope?

**Primary action:** Back to privacy → C29

**Secondary disclosure:** Keep Type, Scope in the decision layer. Put the supporting details for Status, Delivery, full source/version history and FR-C30 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a data request receipt fixture for Citizen; change Type and make Delivery unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Back to privacy” reaches C29 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R01 — Shift & readiness

**Context:** field · **Role:** Responder · **FR:** FR-R01

**Primary visual:** Unit readiness checklist with capability and shift status

**Primary question:** For shift & readiness, what do Unit, Shift establish, and is “View assignments” available to Responder in this scope?

**Primary action:** View assignments → R02

**Secondary disclosure:** Keep Unit, Shift in the decision layer. Put the supporting details for Capabilities, Readiness, full source/version history and FR-R01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a shift & readiness fixture for Responder; change Unit and make Readiness unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View assignments” reaches R02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R02 — Assignment inbox

**Context:** field · **Role:** Responder · **FR:** FR-R02

**Primary visual:** Assignment queue ranked by urgency and acceptance deadline

**Primary question:** For assignment inbox, what do INC-2041, INC-2037 establish, and is “Open assignment” available to Responder in this scope?

**Primary action:** Open assignment → R03

**Secondary disclosure:** Keep INC-2041, INC-2037 in the decision layer. Put the supporting details for Coverage, full source/version history and FR-R02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a assignment inbox fixture for Responder; change INC-2041 and make Coverage unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open assignment” reaches R03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R03 — Accept or decline task

**Context:** field · **Role:** Responder · **FR:** FR-R03

**Primary visual:** Task identity, person location and hazard summary above accept/decline

**Primary question:** For accept or decline task, what do Incident, Person establish, and is “Accept assignment” available to Responder in this scope?

**Primary action:** Accept assignment → R04

**Secondary disclosure:** Keep Incident, Person in the decision layer. Put the supporting details for Location, Hazards, full source/version history and FR-R03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a accept or decline task fixture for Responder; change Incident and make Hazards unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Accept assignment” reaches R04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R04 — Navigation & arrival

**Context:** field · **Role:** Responder · **FR:** FR-R04

**Primary visual:** Destination and approach map showing route validity and arrival action

**Primary question:** For navigation & arrival, what do Assignment, Destination establish, and is “Report arrival” available to Responder in this scope?

**Primary action:** Report arrival → R05

**Secondary disclosure:** Keep Assignment, Destination in the decision layer. Put the supporting details for Location freshness, Route, full source/version history and FR-R04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a navigation & arrival fixture for Responder; change Assignment and make Route unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Report arrival” reaches R05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R05 — Field situation

**Context:** field · **Role:** Responder · **FR:** FR-R05

**Primary visual:** Field floor map with blocked zones, open SOS and teammate locations

**Primary question:** For field situation, what do Open SOS, Blocked area establish, and is “Open assistance record” available to Responder in this scope?

**Primary action:** Open assistance record → R06

**Secondary disclosure:** Keep Open SOS, Blocked area in the decision layer. Put the supporting details for Plan, Team, full source/version history and FR-R05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a field situation fixture for Responder; change Open SOS and make Team unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open assistance record” reaches R06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R06 — Assistance & triage record

**Context:** field · **Role:** Responder · **FR:** FR-R06

**Primary visual:** Person-centered observation form with condition and assistance actions

**Primary question:** For assistance & triage record, what do Person, Contact establish, and is “Save observation” available to Responder in this scope?

**Primary action:** Save observation → R07

**Secondary disclosure:** Keep Person, Contact in the decision layer. Put the supporting details for Condition, Action, full source/version history and FR-R06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a assistance & triage record fixture for Responder; change Person and make Action unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save observation” reaches R07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R07 — Task status & handover

**Context:** field · **Role:** Responder · **FR:** FR-R07

**Primary visual:** Task handover timeline showing receiver acceptance separately

**Primary question:** For task status & handover, what do Task, State establish, and is “Submit handover” available to Responder in this scope?

**Primary action:** Submit handover → R08

**Secondary disclosure:** Keep Task, State in the decision layer. Put the supporting details for Receiver, Evidence, full source/version history and FR-R07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a task status & handover fixture for Responder; change Task and make Evidence unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit handover” reaches R08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R08 — Task completion

**Context:** field · **Role:** Responder · **FR:** FR-R08

**Primary visual:** Completion evidence and receiving team acknowledgment

**Primary question:** For task completion, what do Person, Handover establish, and is “Back to shift” available to Responder in this scope?

**Primary action:** Back to shift → R01

**Secondary disclosure:** Keep Person, Handover in the decision layer. Put the supporting details for Incident, Next, full source/version history and FR-R08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a task completion fixture for Responder; change Person and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Back to shift” reaches R01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R09 — Team communications

**Context:** field · **Role:** Responder · **FR:** FR-R09

**Primary visual:** Team channel with command identity and pending message markers

**Primary question:** For team communications, what do Command, Rescue 02 establish, and is “Send demo message” available to Responder in this scope?

**Primary action:** Send demo message → R09

**Secondary disclosure:** Keep Command, Rescue 02 in the decision layer. Put the supporting details for System, full source/version history and FR-R09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a team communications fixture for Responder; change Command and make System unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send demo message” reaches R09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R10 — Evidence capture

**Context:** field · **Role:** Responder · **FR:** FR-R10

**Primary visual:** Evidence preview with incident binding and privacy redaction

**Primary question:** For evidence capture, what do Type, Incident establish, and is “Queue attachment” available to Responder in this scope?

**Primary action:** Queue attachment → R11

**Secondary disclosure:** Keep Type, Incident in the decision layer. Put the supporting details for Caption, Privacy, full source/version history and FR-R10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a evidence capture fixture for Responder; change Type and make Privacy unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Queue attachment” reaches R11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R11 — Offline outbox

**Context:** field · **Role:** Responder · **FR:** FR-R11

**Primary visual:** Outbox grouped by queued, retryable and conflicting items

**Primary question:** For offline outbox, what do Observation, Photo establish, and is “Resolve sync conflict” available to Responder in this scope?

**Primary action:** Resolve sync conflict → R12

**Secondary disclosure:** Keep Observation, Photo in the decision layer. Put the supporting details for Status update, full source/version history and FR-R11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a offline outbox fixture for Responder; change Observation and make Status update unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Resolve sync conflict” reaches R12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### R12 — Resolve field conflict

**Context:** field · **Role:** Responder · **FR:** FR-R12

**Primary visual:** Local observation beside server change with preserve-note option

**Primary question:** For resolve field conflict, what do Local, Server establish, and is “Keep note and refresh” available to Responder in this scope?

**Primary action:** Keep note and refresh → R02

**Secondary disclosure:** Keep Local, Server in the decision layer. Put the supporting details for Your note, Action, full source/version history and FR-R12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**Validation:** Use a resolve field conflict fixture for Responder; change Local and make Action unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Keep note and refresh” reaches R02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O01 — Command overview

**Context:** command · **Role:** Operator · **FR:** FR-O01

**Primary visual:** Priority incident strip, capacity board and site situation map

**Primary question:** For command overview, what do Active incidents, Unacknowledged P1 establish, and is “Open priority incident” available to Operator in this scope?

**Primary action:** Open priority incident → O04

**Secondary disclosure:** Keep Active incidents, Unacknowledged P1 in the decision layer. Put the supporting details for Open SOS, Available units, full source/version history and FR-O01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a command overview fixture for Operator; change Active incidents and make Available units unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open priority incident” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O02 — Live situation map

**Context:** command · **Role:** Operator · **FR:** FR-O02

**Primary visual:** Multi-incident geographic map with event freshness by layer

**Primary question:** For live situation map, what do Fire, Flood establish, and is “Open incident” available to Operator in this scope?

**Primary action:** Open incident → O04

**Secondary disclosure:** Keep Fire, Flood in the decision layer. Put the supporting details for Road collision, Map freshness, full source/version history and FR-O02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a live situation map fixture for Operator; change Fire and make Map freshness unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open incident” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O03 — Signal triage queue

**Context:** command · **Role:** Operator · **FR:** FR-O03

**Primary visual:** Signal evidence queue showing duplicate suspicion and source quality

**Primary question:** For signal triage queue, what do EV-3101, EV-3102 establish, and is “Inspect signal” available to Operator in this scope?

**Primary action:** Inspect signal → O05

**Secondary disclosure:** Keep EV-3101, EV-3102 in the decision layer. Put the supporting details for EV-3103, full source/version history and FR-O03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a signal triage queue fixture for Operator; change EV-3101 and make EV-3103 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Inspect signal” reaches O05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O04 — Incident workspace

**Context:** command · **Role:** Operator · **FR:** FR-O04

**Primary visual:** Incident map beside open SOS, unconfirmed people and action ownership

**Primary question:** For incident workspace, what do INC-2041, Open SOS establish, and is “Open dispatch” available to Operator in this scope?

**Primary action:** Open dispatch → O08

**Secondary disclosure:** Keep INC-2041, Open SOS in the decision layer. Put the supporting details for Self-reported safe, Unconfirmed people, full source/version history and FR-O04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a incident workspace fixture for Operator; change INC-2041 and make Unconfirmed people unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open dispatch” reaches O08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O05 — Signal evidence review

**Context:** command · **Role:** Operator · **FR:** FR-O05

**Primary visual:** Evidence frame with observed time, confidence and mapped location

**Primary question:** For signal evidence review, what do Source, Observed establish, and is “Create incident from signal” available to Operator in this scope?

**Primary action:** Create incident from signal → O06

**Secondary disclosure:** Keep Source, Observed in the decision layer. Put the supporting details for Confidence, Location, full source/version history and FR-O05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a signal evidence review fixture for Operator; change Source and make Location unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Create incident from signal” reaches O06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O06 — Create incident

**Context:** command · **Role:** Operator · **FR:** FR-O06

**Primary visual:** Incident creation preview linking category, severity and owner

**Primary question:** For create incident, what do Category, Severity establish, and is “Create demo incident” available to Operator in this scope?

**Primary action:** Create demo incident → O04

**Secondary disclosure:** Keep Category, Severity in the decision layer. Put the supporting details for Location, Evidence, Owner, full source/version history and FR-O06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a create incident fixture for Operator; change Category and make Owner unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Create demo incident” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O07 — Correlate or split incidents

**Context:** command · **Role:** Supervisor · **FR:** FR-O07

**Primary visual:** Side-by-side incident lineage with merge/split impact

**Primary question:** For correlate or split incidents, what do Primary, Related establish, and is “Save correlation” available to Supervisor in this scope?

**Primary action:** Save correlation → O04

**Secondary disclosure:** Keep Primary, Related in the decision layer. Put the supporting details for Evidence, Decision, full source/version history and FR-O07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a correlate or split incidents fixture for Supervisor; change Primary and make Decision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save correlation” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O08 — Dispatch board

**Context:** command · **Role:** Dispatcher · **FR:** FR-O08

**Primary visual:** Unit lanes showing capabilities, tasks and acceptance state

**Primary question:** For dispatch board, what do Rescue 02, Medical 01 establish, and is “Review assignment” available to Dispatcher in this scope?

**Primary action:** Review assignment → O09

**Secondary disclosure:** Keep Rescue 02, Medical 01 in the decision layer. Put the supporting details for Security 03, Task, full source/version history and FR-O08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a dispatch board fixture for Dispatcher; change Rescue 02 and make Task unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review assignment” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O09 — Assign responder

**Context:** command · **Role:** Dispatcher · **FR:** FR-O09

**Primary visual:** Assignment preview binding exact unit, task and response deadline

**Primary question:** For assign responder, what do Incident, Unit establish, and is “Assign team — demo” available to Dispatcher in this scope?

**Primary action:** Assign team — demo → O10

**Secondary disclosure:** Keep Incident, Unit in the decision layer. Put the supporting details for Task, Acceptance deadline, full source/version history and FR-O09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a assign responder fixture for Dispatcher; change Incident and make Acceptance deadline unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Assign team — demo” reaches O10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O10 — Response timeline

**Context:** command · **Role:** Operator · **FR:** FR-O10

**Primary visual:** Chronological response milestones with source-specific receipts

**Primary question:** For response timeline, what do 10:40:12, 10:40:19 establish, and is “Review people status” available to Operator in this scope?

**Primary action:** Review people status → O11

**Secondary disclosure:** Keep 10:40:12, 10:40:19 in the decision layer. Put the supporting details for 10:42:18, 10:43:02, full source/version history and FR-O10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a response timeline fixture for Operator; change 10:40:12 and make 10:43:02 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review people status” reaches O11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O11 — People accountability

**Context:** command · **Role:** Operator · **FR:** FR-O11

**Primary visual:** People board separating unconfirmed, assisted and self-reported safe

**Primary question:** For people accountability, what do Alex, Jamie establish, and is “Open person” available to Operator in this scope?

**Primary action:** Open person → O12

**Secondary disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Scope, full source/version history and FR-O11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a people accountability fixture for Operator; change Alex and make Scope unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open person” reaches O12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O12 — Person assistance detail

**Context:** command · **Role:** Operator · **FR:** FR-O12

**Primary visual:** Assistance need, consent scope and last-known location

**Primary question:** For person assistance detail, what do Location, Consent establish, and is “Assign assistance” available to Operator in this scope?

**Primary action:** Assign assistance → O09

**Secondary disclosure:** Keep Location, Consent in the decision layer. Put the supporting details for Status, Freshness, full source/version history and FR-O12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a person assistance detail fixture for Operator; change Location and make Freshness unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Assign assistance” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O13 — Compose warning

**Context:** command · **Role:** Warning author · **FR:** FR-O13

**Primary visual:** Warning composer beside affected-area and instruction preview

**Primary question:** For compose warning, what do Category, Area establish, and is “Preview audience” available to Warning author in this scope?

**Primary action:** Preview audience → O14

**Secondary disclosure:** Keep Category, Area in the decision layer. Put the supporting details for Language, Instruction, Expiry, full source/version history and FR-O13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a compose warning fixture for Warning author; change Category and make Expiry unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Preview audience” reaches O14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O14 — Warning preview & audience

**Context:** command · **Role:** Warning author · **FR:** FR-O14

**Primary visual:** Audience footprint and channel/language coverage comparison

**Primary question:** For warning preview & audience, what do Audience, Channels establish, and is “Submit for approval” available to Warning author in this scope?

**Primary action:** Submit for approval → O15

**Secondary disclosure:** Keep Audience, Channels in the decision layer. Put the supporting details for Translations, Exclusions, full source/version history and FR-O14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a warning preview & audience fixture for Warning author; change Audience and make Exclusions unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit for approval” reaches O15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O15 — Approve warning

**Context:** command · **Role:** Warning approver · **FR:** FR-O15

**Primary visual:** Exact warning version and author/approver separation

**Primary question:** For approve warning, what do Author, Approver establish, and is “Approve demo warning” available to Warning approver in this scope?

**Primary action:** Approve demo warning → O16

**Secondary disclosure:** Keep Author, Approver in the decision layer. Put the supporting details for Version, Reason, full source/version history and FR-O15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a approve warning fixture for Warning approver; change Author and make Reason unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve demo warning” reaches O16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O16 — Delivery & escalation

**Context:** command · **Role:** Operator · **FR:** FR-O16

**Primary visual:** Delivery funnel separating provider receipt and human acknowledgment

**Primary question:** For delivery & escalation, what do Push, SMS establish, and is “Review failed deliveries” available to Operator in this scope?

**Primary action:** Review failed deliveries → O17

**Secondary disclosure:** Keep Push, SMS in the decision layer. Put the supporting details for Human acknowledgments, Next escalation, full source/version history and FR-O16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a delivery & escalation fixture for Operator; change Push and make Next escalation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review failed deliveries” reaches O17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O17 — Delivery failure review

**Context:** command · **Role:** Operator · **FR:** FR-O17

**Primary visual:** Failed-recipient cohort beside fallback-channel proposal

**Primary question:** For delivery failure review, what do Provider, Failure establish, and is “Queue fallback — demo” available to Operator in this scope?

**Primary action:** Queue fallback — demo → O16

**Secondary disclosure:** Keep Provider, Failure in the decision layer. Put the supporting details for Affected, Fallback, full source/version history and FR-O17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a delivery failure review fixture for Operator; change Provider and make Fallback unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Queue fallback — demo” reaches O16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O18 — Physical command approval

**Context:** command · **Role:** Authorized controller · **FR:** FR-O18

**Primary visual:** Equipment target schematic with interlocks and expiring command digest

**Primary question:** For physical command approval, what do Target, Command establish, and is “Approve simulated command” available to Authorized controller in this scope?

**Primary action:** Approve simulated command → O19

**Secondary disclosure:** Keep Target, Command in the decision layer. Put the supporting details for Interlocks, Expires, full source/version history and FR-O18 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Expired command, failed interlock or changed target invalidates approval; require review of the exact command version.

**Validation:** Use a physical command approval fixture for Authorized controller; change Target and make Expires unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve simulated command” reaches O19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O19 — Physical command status

**Context:** command · **Role:** Authorized controller · **FR:** FR-O19

**Primary visual:** Command timeline separating transport receipt and physical effect

**Primary question:** For physical command status, what do 10:44:00, 10:44:03 establish, and is “Refresh command evidence” available to Authorized controller in this scope?

**Primary action:** Refresh command evidence → O19

**Secondary disclosure:** Keep 10:44:00, 10:44:03 in the decision layer. Put the supporting details for 10:44:04, Current, full source/version history and FR-O19 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Controller acknowledgment without physical feedback remains unknown; show reconciliation rather than repeat-command success.

**Validation:** Use a physical command status fixture for Authorized controller; change 10:44:00 and make Current unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Refresh command evidence” reaches O19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O20 — Incident closure review

**Context:** command · **Role:** Supervisor · **FR:** FR-O20

**Primary visual:** Closure blockers highlighting open SOS and unresolved people

**Primary question:** For incident closure review, what do Open SOS, Unconfirmed people establish, and is “Close demo incident” available to Supervisor in this scope?

**Primary action:** Close demo incident → O21

**Secondary disclosure:** Keep Open SOS, Unconfirmed people in the decision layer. Put the supporting details for Units, Reason, Approver, full source/version history and FR-O20 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Open SOS and unresolved people remain visible blockers or require explicit governed disposition; closing the view is not incident closure.

**Validation:** Use a incident closure review fixture for Supervisor; change Open SOS and make Approver unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Close demo incident” reaches O21 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O21 — After-action review

**Context:** command · **Role:** Supervisor · **FR:** FR-O21

**Primary visual:** Response interval chart with delivery gaps and improvement owners

**Primary question:** For after-action review, what do First acknowledgment, Assignment acceptance establish, and is “Create improvement action” available to Supervisor in this scope?

**Primary action:** Create improvement action → O22

**Secondary disclosure:** Keep First acknowledgment, Assignment acceptance in the decision layer. Put the supporting details for Delivery gaps, Improvement, full source/version history and FR-O21 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a after-action review fixture for Supervisor; change First acknowledgment and make Improvement unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Create improvement action” reaches O22 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O22 — Improvement action

**Context:** command · **Role:** Supervisor · **FR:** FR-O22

**Primary visual:** Improvement task with accountable owner and due-date progress

**Primary question:** For improvement action, what do Action, Owner establish, and is “Save action” available to Supervisor in this scope?

**Primary action:** Save action → O21

**Secondary disclosure:** Keep Action, Owner in the decision layer. Put the supporting details for Due date, Linked incident, full source/version history and FR-O22 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a improvement action fixture for Supervisor; change Action and make Linked incident unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save action” reaches O21 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O23 — Drill scheduler

**Context:** command · **Role:** Supervisor · **FR:** FR-O23

**Primary visual:** Drill scenario schedule clearly separated from live environment

**Primary question:** For drill scheduler, what do Scenario, Environment establish, and is “Open drill control” available to Supervisor in this scope?

**Primary action:** Open drill control → O24

**Secondary disclosure:** Keep Scenario, Environment in the decision layer. Put the supporting details for Participants, Start, full source/version history and FR-O23 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a drill scheduler fixture for Supervisor; change Scenario and make Start unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open drill control” reaches O24 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O24 — Drill control room

**Context:** command · **Role:** Supervisor · **FR:** FR-O24

**Primary visual:** Drill progress board with explicit actuator isolation state

**Primary question:** For drill control room, what do Mode, Live actuators establish, and is “Review drill report” available to Supervisor in this scope?

**Primary action:** Review drill report → O21

**Secondary disclosure:** Keep Mode, Live actuators in the decision layer. Put the supporting details for Test recipients, Completed steps, full source/version history and FR-O24 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a drill control room fixture for Supervisor; change Mode and make Completed steps unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review drill report” reaches O21 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O25 — Shift handover

**Context:** command · **Role:** Supervisor · **FR:** FR-O25

**Primary visual:** Outgoing/incoming responsibility transfer with unresolved actions

**Primary question:** For shift handover, what do Outgoing, Incoming establish, and is “Record handover” available to Supervisor in this scope?

**Primary action:** Record handover → O01

**Secondary disclosure:** Keep Outgoing, Incoming in the decision layer. Put the supporting details for Open incidents, Outstanding actions, Acknowledgment, full source/version history and FR-O25 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a shift handover fixture for Supervisor; change Outgoing and make Acknowledgment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Record handover” reaches O01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O26 — Shelter operations

**Context:** command · **Role:** Operator · **FR:** FR-O26

**Primary visual:** Shelter capacity board including unknown and expired reports

**Primary question:** For shelter operations, what do North shelter, West center establish, and is “Edit shelter” available to Operator in this scope?

**Primary action:** Edit shelter → O27

**Secondary disclosure:** Keep North shelter, West center in the decision layer. Put the supporting details for South shelter, Last refresh, full source/version history and FR-O26 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a shelter operations fixture for Operator; change North shelter and make Last refresh unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit shelter” reaches O27 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O27 — Edit shelter status

**Context:** command · **Role:** Operator · **FR:** FR-O27

**Primary visual:** Shelter status editor beside capacity and validity preview

**Primary question:** For edit shelter status, what do Shelter, Status establish, and is “Publish demo update” available to Operator in this scope?

**Primary action:** Publish demo update → O26

**Secondary disclosure:** Keep Shelter, Status in the decision layer. Put the supporting details for Available capacity, Accessibility, Valid until, full source/version history and FR-O27 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a edit shelter status fixture for Operator; change Shelter and make Valid until unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish demo update” reaches O26 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O28 — Regional disaster feed

**Context:** command · **Role:** Operator · **FR:** FR-O28

**Primary visual:** Regional advisory queue with source identity and supersession

**Primary question:** For regional disaster feed, what do CAP-041, CAP-039 establish, and is “Inspect advisory” available to Operator in this scope?

**Primary action:** Inspect advisory → O29

**Secondary disclosure:** Keep CAP-041, CAP-039 in the decision layer. Put the supporting details for CAP-038, full source/version history and FR-O28 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a regional disaster feed fixture for Operator; change CAP-041 and make CAP-038 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Inspect advisory” reaches O29 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O29 — CAP advisory review

**Context:** command · **Role:** Operator · **FR:** FR-O29

**Primary visual:** CAP message lineage with update/cancel references and expiry

**Primary question:** For cap advisory review, what do Sender, Identifier establish, and is “Create local response” available to Operator in this scope?

**Primary action:** Create local response → O06

**Secondary disclosure:** Keep Sender, Identifier in the decision layer. Put the supporting details for Message type, References, Expires, full source/version history and FR-O29 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a cap advisory review fixture for Operator; change Sender and make Expires unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Create local response” reaches O06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O30 — Search & audit timeline

**Context:** command · **Role:** Auditor · **FR:** FR-O30

**Primary visual:** Audit timeline with actor, scope and immutable event details

**Primary question:** For search & audit timeline, what do Query, Create establish, and is “Inspect audit entry” available to Auditor in this scope?

**Primary action:** Inspect audit entry → T11

**Secondary disclosure:** Keep Query, Create in the decision layer. Put the supporting details for Dispatch, Export, full source/version history and FR-O30 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a search & audit timeline fixture for Auditor; change Query and make Export unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect audit entry” reaches T11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S01 — Site directory

**Context:** configuration · **Role:** Site admin · **FR:** FR-S01

**Primary visual:** Site map and directory with region boundary

**Primary question:** For site directory, what do Harbor Campus, Riverside establish, and is “Open site” available to Site admin in this scope?

**Primary action:** Open site → S02

**Secondary disclosure:** Keep Harbor Campus, Riverside in the decision layer. Put the supporting details for North highway, full source/version history and FR-S01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a site directory fixture for Site admin; change Harbor Campus and make North highway unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open site” reaches S02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S02 — Site structure

**Context:** configuration · **Role:** Site admin · **FR:** FR-S02

**Primary visual:** Building-floor-zone tree with selected spatial context

**Primary question:** For site structure, what do Building A, Floor 05 establish, and is “Edit location” available to Site admin in this scope?

**Primary action:** Edit location → S03

**Secondary disclosure:** Keep Building A, Floor 05 in the decision layer. Put the supporting details for Zone A05-03, Assembly, full source/version history and FR-S02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a site structure fixture for Site admin; change Building A and make Assembly unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit location” reaches S03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S03 — Location editor

**Context:** configuration · **Role:** Site admin · **FR:** FR-S03

**Primary visual:** Parent-location path beside coordinate and floor preview

**Primary question:** For location editor, what do Name, Parent establish, and is “Save location” available to Site admin in this scope?

**Primary action:** Save location → S02

**Secondary disclosure:** Keep Name, Parent in the decision layer. Put the supporting details for Coordinates, Floor reference, Timezone, full source/version history and FR-S03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a location editor fixture for Site admin; change Name and make Timezone unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save location” reaches S02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S04 — Floor plan editor

**Context:** configuration · **Role:** Site admin · **FR:** FR-S04

**Primary visual:** Plan canvas showing exits, refuges and revision differences

**Primary question:** For floor plan editor, what do Plan, Revision establish, and is “Review plan publication” available to Site admin in this scope?

**Primary action:** Review plan publication → S05

**Secondary disclosure:** Keep Plan, Revision in the decision layer. Put the supporting details for Exits, Accessible refuge, Hazard overlay, full source/version history and FR-S04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a floor plan editor fixture for Site admin; change Plan and make Hazard overlay unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review plan publication” reaches S05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S05 — Plan approval & versions

**Context:** configuration · **Role:** Supervisor · **FR:** FR-S05

**Primary visual:** Plan revision comparison with published/draft state

**Primary question:** For plan approval & versions, what do Revision 13, Revision 12 establish, and is “Publish reviewed draft — demo” available to Supervisor in this scope?

**Primary action:** Publish reviewed draft — demo → S04

**Secondary disclosure:** Keep Revision 13, Revision 12 in the decision layer. Put the supporting details for Revision 11, full source/version history and FR-S05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a plan approval & versions fixture for Supervisor; change Revision 13 and make Revision 11 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Publish reviewed draft — demo” reaches S04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S06 — Device inventory

**Context:** configuration · **Role:** Device admin · **FR:** FR-S06

**Primary visual:** Device inventory grouped by physical function and health

**Primary question:** For device inventory, what do CAM-A05-03, SMK-A05-03 establish, and is “Open device” available to Device admin in this scope?

**Primary action:** Open device → S07

**Secondary disclosure:** Keep CAM-A05-03, SMK-A05-03 in the decision layer. Put the supporting details for GW-012, WR-401, full source/version history and FR-S06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a device inventory fixture for Device admin; change CAM-A05-03 and make WR-401 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open device” reaches S07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S07 — Device detail & health

**Context:** configuration · **Role:** Device admin · **FR:** FR-S07

**Primary visual:** Device diagram with heartbeat, certificate and firmware evidence

**Primary question:** For device detail & health, what do Certificate, Last heartbeat establish, and is “Review device configuration” available to Device admin in this scope?

**Primary action:** Review device configuration → S08

**Secondary disclosure:** Keep Certificate, Last heartbeat in the decision layer. Put the supporting details for Firmware, Location, full source/version history and FR-S07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a device detail & health fixture for Device admin; change Certificate and make Location unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review device configuration” reaches S08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S08 — Provision device

**Context:** configuration · **Role:** Device admin · **FR:** FR-S08

**Primary visual:** Enrollment sequence tying serial, site and capability claim

**Primary question:** For provision device, what do Serial, Enrollment token establish, and is “Enroll simulated device” available to Device admin in this scope?

**Primary action:** Enroll simulated device → S07

**Secondary disclosure:** Keep Serial, Enrollment token in the decision layer. Put the supporting details for Location, Capabilities, full source/version history and FR-S08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a provision device fixture for Device admin; change Serial and make Capabilities unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Enroll simulated device” reaches S07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S09 — Camera wall

**Context:** configuration · **Role:** Operator · **FR:** FR-S09

**Primary visual:** Permission-gated camera tiles with timestamp and missing-feed state

**Primary question:** For camera wall, what do CAM-A05-01, CAM-A05-02 establish, and is “Open detection evidence” available to Operator in this scope?

**Primary action:** Open detection evidence → O05

**Secondary disclosure:** Keep CAM-A05-01, CAM-A05-02 in the decision layer. Put the supporting details for CAM-A05-03, Access, full source/version history and FR-S09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a camera wall fixture for Operator; change CAM-A05-01 and make Access unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open detection evidence” reaches O05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S10 — Maintenance & calibration

**Context:** configuration · **Role:** Device admin · **FR:** FR-S10

**Primary visual:** Maintenance window alongside backup-coverage map

**Primary question:** For maintenance & calibration, what do Device, Window establish, and is “Schedule maintenance” available to Device admin in this scope?

**Primary action:** Schedule maintenance → S06

**Secondary disclosure:** Keep Device, Window in the decision layer. Put the supporting details for Backup coverage, Approver, full source/version history and FR-S10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a maintenance & calibration fixture for Device admin; change Device and make Approver unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Schedule maintenance” reaches S06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S11 — Rule library

**Context:** configuration · **Role:** Rule author · **FR:** FR-S11

**Primary visual:** Versioned rule list showing hazard family and enabled scope

**Primary question:** For rule library, what do Fire rule v4, Fall rule v2 establish, and is “Edit rule” available to Rule author in this scope?

**Primary action:** Edit rule → S12

**Secondary disclosure:** Keep Fire rule v4, Fall rule v2 in the decision layer. Put the supporting details for Road collision v1, Flood threshold v3, full source/version history and FR-S11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a rule library fixture for Rule author; change Fire rule v4 and make Flood threshold v3 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit rule” reaches S12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S12 — Rule editor & simulation

**Context:** configuration · **Role:** Rule author · **FR:** FR-S12

**Primary visual:** Condition-action flow beside simulation-only indicator

**Primary question:** For rule editor & simulation, what do Rule, Condition establish, and is “View simulation results” available to Rule author in this scope?

**Primary action:** View simulation results → S13

**Secondary disclosure:** Keep Rule, Condition in the decision layer. Put the supporting details for Window, Action, Mode, full source/version history and FR-S12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a rule editor & simulation fixture for Rule author; change Rule and make Mode unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “View simulation results” reaches S13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S13 — Rule test & approval

**Context:** configuration · **Role:** Rule approver · **FR:** FR-S13

**Primary visual:** Test-case outcome grid with false-merge evidence

**Primary question:** For rule test & approval, what do Fixture cases, False merges establish, and is “Return rule for changes” available to Rule approver in this scope?

**Primary action:** Return rule for changes → S12

**Secondary disclosure:** Keep Fixture cases, False merges in the decision layer. Put the supporting details for Version, Reviewer, full source/version history and FR-S13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a rule test & approval fixture for Rule approver; change Fixture cases and make Reviewer unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Return rule for changes” reaches S12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S14 — AI model monitoring

**Context:** configuration · **Role:** Model operator · **FR:** FR-S14

**Primary visual:** Model quality trend with sample provenance and drift

**Primary question:** For ai model monitoring, what do Model, Labeled sample establish, and is “Open review queue” available to Model operator in this scope?

**Primary action:** Open review queue → O03

**Secondary disclosure:** Keep Model, Labeled sample in the decision layer. Put the supporting details for False-positive review, Drift, full source/version history and FR-S14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a ai model monitoring fixture for Model operator; change Model and make Drift unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open review queue” reaches O03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I01 — Connector catalog

**Context:** configuration · **Role:** Integration admin · **FR:** FR-I01

**Primary visual:** Connector catalog grouped by event, advisory and control capability

**Primary question:** For connector catalog, what do MQTT sensors, CAP authority establish, and is “Configure connector” available to Integration admin in this scope?

**Primary action:** Configure connector → I02

**Secondary disclosure:** Keep MQTT sensors, CAP authority in the decision layer. Put the supporting details for MAVLink gateway, IOC bridge, full source/version history and FR-I01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a connector catalog fixture for Integration admin; change MQTT sensors and make IOC bridge unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Configure connector” reaches I02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I02 — Connector setup

**Context:** configuration · **Role:** Integration admin · **FR:** FR-I02

**Primary visual:** Connector setup flow with endpoint-region-capability preview

**Primary question:** For connector setup, what do Type, Endpoint establish, and is “Test connection” available to Integration admin in this scope?

**Primary action:** Test connection → I03

**Secondary disclosure:** Keep Type, Endpoint in the decision layer. Put the supporting details for Region, Auth, Capabilities, full source/version history and FR-I02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a connector setup fixture for Integration admin; change Type and make Capabilities unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Test connection” reaches I03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I03 — Schema mapping

**Context:** configuration · **Role:** Integration admin · **FR:** FR-I03

**Primary visual:** Source-to-target field mapping with units and unknown-field lane

**Primary question:** For schema mapping, what do Source field, Target establish, and is “Run contract tests” available to Integration admin in this scope?

**Primary action:** Run contract tests → I04

**Secondary disclosure:** Keep Source field, Target in the decision layer. Put the supporting details for Unit, Location, Unknown fields, full source/version history and FR-I03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a schema mapping fixture for Integration admin; change Source field and make Unknown fields unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Run contract tests” reaches I04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I04 — Connector test console

**Context:** configuration · **Role:** Integration admin · **FR:** FR-I04

**Primary visual:** Contract-test matrix separating accepted and rejected fixtures

**Primary question:** For connector test console, what do Valid event, Duplicate event establish, and is “Enable demo connector” available to Integration admin in this scope?

**Primary action:** Enable demo connector → I05

**Secondary disclosure:** Keep Valid event, Duplicate event in the decision layer. Put the supporting details for Wrong tenant, Expired certificate, full source/version history and FR-I04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a connector test console fixture for Integration admin; change Valid event and make Expired certificate unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Enable demo connector” reaches I05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I05 — Connector health

**Context:** configuration · **Role:** Integration admin · **FR:** FR-I05

**Primary visual:** Connector health lanes showing lag, failure and data age

**Primary question:** For connector health, what do MQTT bridge, IOC bridge establish, and is “Inspect dead letters” available to Integration admin in this scope?

**Primary action:** Inspect dead letters → I06

**Secondary disclosure:** Keep MQTT bridge, IOC bridge in the decision layer. Put the supporting details for CAP feed, Drone bridge, full source/version history and FR-I05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a connector health fixture for Integration admin; change MQTT bridge and make Drone bridge unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect dead letters” reaches I06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I06 — Dead-letter & replay

**Context:** configuration · **Role:** Integration admin · **FR:** FR-I06

**Primary visual:** Dead-letter payload diff and replay eligibility

**Primary question:** For dead-letter & replay, what do Event, Error establish, and is “Replay simulated event” available to Integration admin in this scope?

**Primary action:** Replay simulated event → I05

**Secondary disclosure:** Keep Event, Error in the decision layer. Put the supporting details for Correction, Replay, full source/version history and FR-I06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a dead-letter & replay fixture for Integration admin; change Event and make Replay unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Replay simulated event” reaches I05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I07 — API clients & scopes

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-I07

**Primary visual:** API scope grid with masked credentials and expiry

**Primary question:** For api clients & scopes, what do Client, Scopes establish, and is “Save client” available to Tenant admin in this scope?

**Primary action:** Save client → I08

**Secondary disclosure:** Keep Client, Scopes in the decision layer. Put the supporting details for Region, Secret, Expiry, full source/version history and FR-I07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a api clients & scopes fixture for Tenant admin; change Client and make Expiry unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save client” reaches I08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I08 — Webhook subscriptions

**Context:** configuration · **Role:** Integration admin · **FR:** FR-I08

**Primary visual:** Webhook route diagram showing signature and retry policy

**Primary question:** For webhook subscriptions, what do URL, Events establish, and is “Send test payload” available to Integration admin in this scope?

**Primary action:** Send test payload → I04

**Secondary disclosure:** Keep URL, Events in the decision layer. Put the supporting details for Signature, Retries, full source/version history and FR-I08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a webhook subscriptions fixture for Integration admin; change URL and make Retries unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Send test payload” reaches I04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I09 — Partner exchange agreements

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-I09

**Primary visual:** Partner disclosure boundary with retention and approval state

**Primary question:** For partner exchange agreements, what do Partner, Purpose establish, and is “Save agreement draft” available to Tenant admin in this scope?

**Primary action:** Save agreement draft → I10

**Secondary disclosure:** Keep Partner, Purpose in the decision layer. Put the supporting details for Fields, Retention, Approval, full source/version history and FR-I09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a partner exchange agreements fixture for Tenant admin; change Partner and make Approval unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save agreement draft” reaches I10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I10 — IOC exchange history

**Context:** configuration · **Role:** Operator · **FR:** FR-I10

**Primary visual:** Exchange timeline with payload scope and receipt identity

**Primary question:** For ioc exchange history, what do INC-2041, SOS-041 establish, and is “Inspect payload” available to Operator in this scope?

**Primary action:** Inspect payload → I04

**Secondary disclosure:** Keep INC-2041, SOS-041 in the decision layer. Put the supporting details for Update 4, full source/version history and FR-I10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a ioc exchange history fixture for Operator; change INC-2041 and make Update 4 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Inspect payload” reaches I04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I11 — Drone fleet

**Context:** configuration · **Role:** Drone operator · **FR:** FR-I11

**Primary visual:** Fleet readiness cards showing battery, availability and pilot control

**Primary question:** For drone fleet, what do DR-01, DR-02 establish, and is “Plan mission” available to Drone operator in this scope?

**Primary action:** Plan mission → I12

**Secondary disclosure:** Keep DR-01, DR-02 in the decision layer. Put the supporting details for DR-03, Control, full source/version history and FR-I11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a drone fleet fixture for Drone operator; change DR-01 and make Control unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Plan mission” reaches I12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I12 — Drone mission planning

**Context:** configuration · **Role:** Drone operator · **FR:** FR-I12

**Primary visual:** Mission geofence with pilot, weather and authority checklist

**Primary question:** For drone mission planning, what do Purpose, Geofence establish, and is “Review mission approval” available to Drone operator in this scope?

**Primary action:** Review mission approval → I13

**Secondary disclosure:** Keep Purpose, Geofence in the decision layer. Put the supporting details for Pilot, Weather, Authority, full source/version history and FR-I12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a drone mission planning fixture for Drone operator; change Purpose and make Authority unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review mission approval” reaches I13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I13 — Drone preflight & approval

**Context:** configuration · **Role:** Drone supervisor · **FR:** FR-I13

**Primary visual:** Preflight gate showing lost-link plan and explicit pilot approval

**Primary question:** For drone preflight & approval, what do Pilot, Battery establish, and is “Approve simulated mission” available to Drone supervisor in this scope?

**Primary action:** Approve simulated mission → I14

**Secondary disclosure:** Keep Pilot, Battery in the decision layer. Put the supporting details for Geofence, Clearance, Lost-link plan, full source/version history and FR-I13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a drone preflight & approval fixture for Drone supervisor; change Pilot and make Lost-link plan unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve simulated mission” reaches I14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I14 — Drone mission telemetry

**Context:** command · **Role:** Drone operator · **FR:** FR-I14

**Primary visual:** Telemetry strip with stale-data warning and local-control ownership

**Primary question:** For drone mission telemetry, what do Flight state, Altitude establish, and is “Review mission record” available to Drone operator in this scope?

**Primary action:** Review mission record → I15

**Secondary disclosure:** Keep Flight state, Altitude in the decision layer. Put the supporting details for Battery, Telemetry age, Command, full source/version history and FR-I14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a drone mission telemetry fixture for Drone operator; change Flight state and make Command unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review mission record” reaches I15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### I15 — Drone mission record

**Context:** configuration · **Role:** Drone operator · **FR:** FR-I15

**Primary visual:** Mission evidence timeline with flight log and accountable pilot

**Primary question:** For drone mission record, what do Mission, Incident establish, and is “Return to fleet” available to Drone operator in this scope?

**Primary action:** Return to fleet → I11

**Secondary disclosure:** Keep Mission, Incident in the decision layer. Put the supporting details for Flight log, Outcome, Pilot, full source/version history and FR-I15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**Validation:** Use a drone mission record fixture for Drone operator; change Mission and make Pilot unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Return to fleet” reaches I11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T01 — Tenant overview

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-T01

**Primary visual:** Tenant health summary with region and capacity allocation

**Primary question:** For tenant overview, what do Region, Sites establish, and is “Manage organization” available to Tenant admin in this scope?

**Primary action:** Manage organization → T02

**Secondary disclosure:** Keep Region, Sites in the decision layer. Put the supporting details for Licensed devices, Operational health, full source/version history and FR-T01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a tenant overview fixture for Tenant admin; change Region and make Operational health unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Manage organization” reaches T02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T02 — Organization & regions

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-T02

**Primary visual:** Organization region boundary beside locale and timezone controls

**Primary question:** For organization & regions, what do Organization, Home region establish, and is “Save settings” available to Tenant admin in this scope?

**Primary action:** Save settings → T01

**Secondary disclosure:** Keep Organization, Home region in the decision layer. Put the supporting details for Locale, Timezone, Cross-region transfer, full source/version history and FR-T02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a organization & regions fixture for Tenant admin; change Organization and make Cross-region transfer unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save settings” reaches T01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T03 — Users & invitations

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-T03

**Primary visual:** Membership roster with invitation lifecycle and role badges

**Primary question:** For users & invitations, what do Alex, Jamie establish, and is “Edit membership” available to Tenant admin in this scope?

**Primary action:** Edit membership → T04

**Secondary disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Service client, full source/version history and FR-T03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a users & invitations fixture for Tenant admin; change Alex and make Service client unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit membership” reaches T04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T04 — Role & scope editor

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-T04

**Primary visual:** Permission-by-site matrix with explicit denied capabilities

**Primary question:** For role & scope editor, what do Role, Sites establish, and is “Save role” available to Tenant admin in this scope?

**Primary action:** Save role → T03

**Secondary disclosure:** Keep Role, Sites in the decision layer. Put the supporting details for Permission, Restriction, full source/version history and FR-T04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a role & scope editor fixture for Tenant admin; change Role and make Restriction unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save role” reaches T03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T05 — On-call & escalation

**Context:** configuration · **Role:** Supervisor · **FR:** FR-T05

**Primary visual:** Escalation ladder with timed owner changes and calendar coverage

**Primary question:** For on-call & escalation, what do Primary, After 60 seconds establish, and is “Save escalation” available to Supervisor in this scope?

**Primary action:** Save escalation → T01

**Secondary disclosure:** Keep Primary, After 60 seconds in the decision layer. Put the supporting details for After 120 seconds, Calendar, full source/version history and FR-T05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a on-call & escalation fixture for Supervisor; change Primary and make Calendar unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save escalation” reaches T01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T06 — Message templates & languages

**Context:** configuration · **Role:** Content editor · **FR:** FR-T06

**Primary visual:** Multilingual message preview with variable and fallback status

**Primary question:** For message templates & languages, what do Template, English establish, and is “Preview template” available to Content editor in this scope?

**Primary action:** Preview template → O14

**Secondary disclosure:** Keep Template, English in the decision layer. Put the supporting details for Japanese, Fallback, Variables, full source/version history and FR-T06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a message templates & languages fixture for Content editor; change Template and make Variables unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Preview template” reaches O14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T07 — Hazard taxonomy & playbooks

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-T07

**Primary visual:** Hazard taxonomy tree connected to draft playbook steps

**Primary question:** For hazard taxonomy & playbooks, what do Category, Severity default establish, and is “Save draft playbook” available to Tenant admin in this scope?

**Primary action:** Save draft playbook → T08

**Secondary disclosure:** Keep Category, Severity default in the decision layer. Put the supporting details for Playbook, Sensitivity, full source/version history and FR-T07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a hazard taxonomy & playbooks fixture for Tenant admin; change Category and make Sensitivity unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save draft playbook” reaches T08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T08 — Playbook approval

**Context:** configuration · **Role:** Supervisor · **FR:** FR-T08

**Primary visual:** Versioned playbook step sequence and timeout responsibilities

**Primary question:** For playbook approval, what do Version, Trigger establish, and is “Publish demo playbook” available to Supervisor in this scope?

**Primary action:** Publish demo playbook → T07

**Secondary disclosure:** Keep Version, Trigger in the decision layer. Put the supporting details for Steps, Timeout, Owner, full source/version history and FR-T08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a playbook approval fixture for Supervisor; change Version and make Owner unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish demo playbook” reaches T07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T09 — Retention & legal holds

**Context:** configuration · **Role:** Privacy officer · **FR:** FR-T09

**Primary visual:** Retention timeline with legal-hold overrides

**Primary question:** For retention & legal holds, what do Precise location, Incident record establish, and is “Save policy draft” available to Privacy officer in this scope?

**Primary action:** Save policy draft → T10

**Secondary disclosure:** Keep Precise location, Incident record in the decision layer. Put the supporting details for Evidence, Legal hold, full source/version history and FR-T09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a retention & legal holds fixture for Privacy officer; change Precise location and make Legal hold unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save policy draft” reaches T10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T10 — Privacy request review

**Context:** configuration · **Role:** Privacy officer · **FR:** FR-T10

**Primary visual:** Data export preview showing identity proof and evidence exclusions

**Primary question:** For privacy request review, what do Identity, Data classes establish, and is “Approve demo export” available to Privacy officer in this scope?

**Primary action:** Approve demo export → C30

**Secondary disclosure:** Keep Identity, Data classes in the decision layer. Put the supporting details for Incident evidence, Decision, full source/version history and FR-T10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a privacy request review fixture for Privacy officer; change Identity and make Decision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve demo export” reaches C30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T11 — Audit record

**Context:** configuration · **Role:** Auditor · **FR:** FR-T11

**Primary visual:** Immutable audit event linking actor, object and trace

**Primary question:** For audit record, what do Actor, Action establish, and is “Return to audit search” available to Auditor in this scope?

**Primary action:** Return to audit search → O30

**Secondary disclosure:** Keep Actor, Action in the decision layer. Put the supporting details for Object, Time, Trace, full source/version history and FR-T11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a audit record fixture for Auditor; change Actor and make Trace unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Return to audit search” reaches O30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T12 — Service health & recovery

**Context:** configuration · **Role:** Platform operator · **FR:** FR-T12

**Primary visual:** Dependency-health topology with recovery readiness

**Primary question:** For service health & recovery, what do EU ingestion, Notification provider establish, and is “Open recovery runbook” available to Platform operator in this scope?

**Primary action:** Open recovery runbook → T13

**Secondary disclosure:** Keep EU ingestion, Notification provider in the decision layer. Put the supporting details for Database replica, Last restore drill, full source/version history and FR-T12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a service health & recovery fixture for Platform operator; change EU ingestion and make Last restore drill unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open recovery runbook” reaches T13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T13 — Recovery runbook

**Context:** configuration · **Role:** Platform operator · **FR:** FR-T13

**Primary visual:** Recovery checklist with verified completion evidence per step

**Primary question:** For recovery runbook, what do Step 1, Step 2 establish, and is “Record drill outcome” available to Platform operator in this scope?

**Primary action:** Record drill outcome → T12

**Secondary disclosure:** Keep Step 1, Step 2 in the decision layer. Put the supporting details for Step 3, Step 4, full source/version history and FR-T13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a recovery runbook fixture for Platform operator; change Step 1 and make Step 4 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Record drill outcome” reaches T12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T14 — Usage & subscription

**Context:** configuration · **Role:** Billing admin · **FR:** FR-T14

**Primary visual:** Capacity consumption chart with emergency reservation

**Primary question:** For usage & subscription, what do Plan, Sites establish, and is “Review capacity policy” available to Billing admin in this scope?

**Primary action:** Review capacity policy → T15

**Secondary disclosure:** Keep Plan, Sites in the decision layer. Put the supporting details for Devices, SMS budget, Emergency behavior, full source/version history and FR-T14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a usage & subscription fixture for Billing admin; change Plan and make Emergency behavior unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review capacity policy” reaches T15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T15 — Capacity & quota policy

**Context:** configuration · **Role:** Platform operator · **FR:** FR-T15

**Primary visual:** Queue policy comparison showing P1 reserves and hard-limit effects

**Primary question:** For capacity & quota policy, what do P1 reserved queue, Telemetry sampling establish, and is “Save capacity draft” available to Platform operator in this scope?

**Primary action:** Save capacity draft → T14

**Secondary disclosure:** Keep P1 reserved queue, Telemetry sampling in the decision layer. Put the supporting details for SOS ingestion, Warning threshold, Hard limit behavior, full source/version history and FR-T15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a capacity & quota policy fixture for Platform operator; change P1 reserved queue and make Hard limit behavior unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save capacity draft” reaches T14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T16 — Analytics & export

**Context:** configuration · **Role:** Analyst · **FR:** FR-T16

**Primary visual:** Distribution chart separating median, P95 and missing receipts

**Primary question:** For analytics & export, what do Period, Median acknowledgment establish, and is “Prepare demo report” available to Analyst in this scope?

**Primary action:** Prepare demo report → T17

**Secondary disclosure:** Keep Period, Median acknowledgment in the decision layer. Put the supporting details for P95 acknowledgment, Unconfirmed delivery, Export, full source/version history and FR-T16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a analytics & export fixture for Analyst; change Period and make Export unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Prepare demo report” reaches T17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### T17 — Report schedule

**Context:** configuration · **Role:** Analyst · **FR:** FR-T17

**Primary visual:** Report schedule preview with timezone and recipient disclosure

**Primary question:** For report schedule, what do Report, Audience establish, and is “Save schedule draft” available to Analyst in this scope?

**Primary action:** Save schedule draft → T16

**Secondary disclosure:** Keep Report, Audience in the decision layer. Put the supporting details for Timezone, Schedule, PII, full source/version history and FR-T17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**Validation:** Use a report schedule fixture for Analyst; change Report and make PII unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save schedule draft” reaches T16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X01 — No connection / SOS pending

**Context:** emergency · **Role:** Citizen · **FR:** FR-X01

**Primary visual:** Locally saved SOS receipt with server-receipt absence prominent

**Primary question:** For no connection / sos pending, what do Local record, Server receipt establish, and is “View offline outbox” available to Citizen in this scope?

**Primary action:** View offline outbox → R11

**Secondary disclosure:** Keep Local record, Server receipt in the decision layer. Put the supporting details for Retry, Alternative, full source/version history and FR-X01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a no connection / sos pending fixture for Citizen; change Local record and make Alternative unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View offline outbox” reaches R11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X02 — Permission unavailable

**Context:** emergency · **Role:** Citizen · **FR:** FR-X02

**Primary visual:** Manual location entry beside unavailable-permission explanation

**Primary question:** For permission unavailable, what do Automatic location, Alternative establish, and is “Enter location manually” available to Citizen in this scope?

**Primary action:** Enter location manually → C06

**Secondary disclosure:** Keep Automatic location, Alternative in the decision layer. Put the supporting details for Privacy, SOS, full source/version history and FR-X02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a permission unavailable fixture for Citizen; change Automatic location and make SOS unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Enter location manually” reaches C06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X03 — No active incidents

**Context:** configuration · **Role:** Operator · **FR:** FR-X03

**Primary visual:** Empty incident view with coverage and unknown-device evidence

**Primary question:** For no active incidents, what do Filters, Coverage establish, and is “Review device health” available to Operator in this scope?

**Primary action:** Review device health → S06

**Secondary disclosure:** Keep Filters, Coverage in the decision layer. Put the supporting details for Last sync, Unknown devices, full source/version history and FR-X03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a no active incidents fixture for Operator; change Filters and make Unknown devices unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review device health” reaches S06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X04 — Access denied

**Context:** configuration · **Role:** All roles · **FR:** FR-X04

**Primary visual:** Workspace selection recovery without disclosing denied object

**Primary question:** For access denied, what do Request, Data establish, and is “Choose workspace” available to All roles in this scope?

**Primary action:** Choose workspace → A04

**Secondary disclosure:** Keep Request, Data in the decision layer. Put the supporting details for Next step, Audit, full source/version history and FR-X04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a access denied fixture for All roles; change Request and make Audit unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Choose workspace” reaches A04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X05 — Service unavailable

**Context:** emergency · **Role:** All roles · **FR:** FR-X05

**Primary visual:** Service outage panel with cached-content age and alternate path

**Primary question:** For service unavailable, what do Status, Cached content establish, and is “Open offline pack” available to All roles in this scope?

**Primary action:** Open offline pack → C18

**Secondary disclosure:** Keep Status, Cached content in the decision layer. Put the supporting details for Submission, Recovery, full source/version history and FR-X05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a service unavailable fixture for All roles; change Status and make Recovery unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open offline pack” reaches C18 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X06 — Unsaved changes & conflict

**Context:** configuration · **Role:** Site admin · **FR:** FR-X06

**Primary visual:** Local/server version comparison preserving unsaved edits

**Primary question:** For unsaved changes & conflict, what do Your version, Current version establish, and is “Review latest version” available to Site admin in this scope?

**Primary action:** Review latest version → S05

**Secondary disclosure:** Keep Your version, Current version in the decision layer. Put the supporting details for Your changes, Resolution, full source/version history and FR-X06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a unsaved changes & conflict fixture for Site admin; change Your version and make Resolution unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review latest version” reaches S05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X07 — Empty search & filter reset

**Context:** configuration · **Role:** Operator · **FR:** FR-X07

**Primary visual:** Search query and active filters beside reset control

**Primary question:** For empty search & filter reset, what do Query, Scope establish, and is “Reset search” available to Operator in this scope?

**Primary action:** Reset search → O30

**Secondary disclosure:** Keep Query, Scope in the decision layer. Put the supporting details for Period, Suggestion, full source/version history and FR-X07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a empty search & filter reset fixture for Operator; change Query and make Suggestion unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Reset search” reaches O30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X08 — Expired session

**Context:** configuration · **Role:** All roles · **FR:** FR-X08

**Primary visual:** Session-expired panel explaining protected draft recovery

**Primary question:** For expired session, what do Draft, Session establish, and is “Sign in” available to All roles in this scope?

**Primary action:** Sign in → A02

**Secondary disclosure:** Keep Draft, Session in the decision layer. Put the supporting details for Sensitive data, Next, full source/version history and FR-X08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a expired session fixture for All roles; change Draft and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Sign in” reaches A02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X09 — Loading & stale data

**Context:** emergency · **Role:** Operator · **FR:** FR-X09

**Primary visual:** Stale-data band showing source age and unavailable commands

**Primary question:** For loading & stale data, what do Current view, Connection establish, and is “Return to command” available to Operator in this scope?

**Primary action:** Return to command → O01

**Secondary disclosure:** Keep Current view, Connection in the decision layer. Put the supporting details for Commands, Next, full source/version history and FR-X09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a loading & stale data fixture for Operator; change Current view and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Return to command” reaches O01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### X10 — Attachment rejected

**Context:** configuration · **Role:** Responder · **FR:** FR-X10

**Primary visual:** Rejected attachment preview with reason and allowed replacement

**Primary question:** For attachment rejected, what do File, Reason establish, and is “Choose another attachment” available to Responder in this scope?

**Primary action:** Choose another attachment → R10

**Secondary disclosure:** Keep File, Reason in the decision layer. Put the supporting details for Allowed, Action, full source/version history and FR-X10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**Validation:** Use a attachment rejected fixture for Responder; change File and make Action unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Choose another attachment” reaches R10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G01 — Regional operations

**Context:** configuration · **Role:** Platform operator · **FR:** FR-G01

**Primary visual:** Regional cell topology with residency boundaries

**Primary question:** For regional operations, what do EU cell, APAC cell establish, and is “Inspect regional cell” available to Platform operator in this scope?

**Primary action:** Inspect regional cell → G02

**Secondary disclosure:** Keep EU cell, APAC cell in the decision layer. Put the supporting details for Global directory, Residency, full source/version history and FR-G01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a regional operations fixture for Platform operator; change EU cell and make Residency unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect regional cell” reaches G02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G02 — Regional cell detail

**Context:** configuration · **Role:** Platform operator · **FR:** FR-G02

**Primary visual:** Cell replication and writer-epoch status

**Primary question:** For regional cell detail, what do Writer epoch, Broker lag establish, and is “Review recovery readiness” available to Platform operator in this scope?

**Primary action:** Review recovery readiness → G03

**Secondary disclosure:** Keep Writer epoch, Broker lag in the decision layer. Put the supporting details for Database, DR target, full source/version history and FR-G02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a regional cell detail fixture for Platform operator; change Writer epoch and make DR target unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review recovery readiness” reaches G03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G03 — Disaster recovery drill

**Context:** configuration · **Role:** Platform operator · **FR:** FR-G03

**Primary visual:** Recovery drill timeline with target RPO/RTO and evidence

**Primary question:** For disaster recovery drill, what do Cell, Mode establish, and is “Record drill evidence” available to Platform operator in this scope?

**Primary action:** Record drill evidence → G04

**Secondary disclosure:** Keep Cell, Mode in the decision layer. Put the supporting details for Backup, Target RPO, Target RTO, full source/version history and FR-G03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a disaster recovery drill fixture for Platform operator; change Cell and make Target RTO unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Record drill evidence” reaches G04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G04 — Recovery verification

**Context:** configuration · **Role:** Platform operator · **FR:** FR-G04

**Primary visual:** Recovery proof grid separating fencing and record durability

**Primary question:** For recovery verification, what do Writer fencing, SOS records establish, and is “Review regional operations” available to Platform operator in this scope?

**Primary action:** Review regional operations → G01

**Secondary disclosure:** Keep Writer fencing, SOS records in the decision layer. Put the supporting details for Outbox, Residency, full source/version history and FR-G04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a recovery verification fixture for Platform operator; change Writer fencing and make Residency unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review regional operations” reaches G01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G05 — Tenant provisioning

**Context:** configuration · **Role:** Platform admin · **FR:** FR-G05

**Primary visual:** Tenant provisioning dependency plan and isolation boundary

**Primary question:** For tenant provisioning, what do Tenant, Home region establish, and is “Review provisioning plan” available to Platform admin in this scope?

**Primary action:** Review provisioning plan → G06

**Secondary disclosure:** Keep Tenant, Home region in the decision layer. Put the supporting details for Isolation, Plan, Policy set, full source/version history and FR-G05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a tenant provisioning fixture for Platform admin; change Tenant and make Policy set unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review provisioning plan” reaches G06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G06 — Tenant lifecycle

**Context:** configuration · **Role:** Platform admin · **FR:** FR-G06

**Primary visual:** Tenant lifecycle state diagram with migration/deletion gates

**Primary question:** For tenant lifecycle, what do Status, Region migration establish, and is “Request support access” available to Platform admin in this scope?

**Primary action:** Request support access → G07

**Secondary disclosure:** Keep Status, Region migration in the decision layer. Put the supporting details for Deletion, Support access, full source/version history and FR-G06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a tenant lifecycle fixture for Platform admin; change Status and make Support access unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Request support access” reaches G07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G07 — Time-bound support access

**Context:** configuration · **Role:** Security operator · **FR:** FR-G07

**Primary visual:** Support request showing minimal scope and access expiry

**Primary question:** For time-bound support access, what do Tenant, Scope establish, and is “Submit access request” available to Security operator in this scope?

**Primary action:** Submit access request → G08

**Secondary disclosure:** Keep Tenant, Scope in the decision layer. Put the supporting details for Reason, Duration, PII access, full source/version history and FR-G07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a time-bound support access fixture for Security operator; change Tenant and make PII access unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit access request” reaches G08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G08 — Support access approval

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-G08

**Primary visual:** Support authorization comparing requester and approved scope

**Primary question:** For support access approval, what do Requester, Scope establish, and is “Approve scoped access — sample” available to Tenant admin in this scope?

**Primary action:** Approve scoped access — sample → G06

**Secondary disclosure:** Keep Requester, Scope in the decision layer. Put the supporting details for Expiry, Audit, full source/version history and FR-G08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a support access approval fixture for Tenant admin; change Requester and make Audit unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve scoped access — sample” reaches G06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G09 — Release & schema compatibility

**Context:** configuration · **Role:** Release manager · **FR:** FR-G09

**Primary visual:** Release compatibility matrix across schema and mobile versions

**Primary question:** For release & schema compatibility, what do Incident service, Event schema establish, and is “Review release gate” available to Release manager in this scope?

**Primary action:** Review release gate → G10

**Secondary disclosure:** Keep Incident service, Event schema in the decision layer. Put the supporting details for Mobile API, Rollback, full source/version history and FR-G09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a release & schema compatibility fixture for Release manager; change Incident service and make Rollback unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review release gate” reaches G10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G10 — Release gate & rollback

**Context:** configuration · **Role:** Release manager · **FR:** FR-G10

**Primary visual:** Release gate checklist with rollback viability and SLO trend

**Primary question:** For release gate & rollback, what do Contract tests, Tenant isolation establish, and is “Record release decision” available to Release manager in this scope?

**Primary action:** Record release decision → G09

**Secondary disclosure:** Keep Contract tests, Tenant isolation in the decision layer. Put the supporting details for SLO burn rate, Migration, full source/version history and FR-G10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a release gate & rollback fixture for Release manager; change Contract tests and make Migration unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Record release decision” reaches G09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G11 — Security incidents

**Context:** configuration · **Role:** Security operator · **FR:** FR-G11

**Primary visual:** Security signal queue with affected trust boundary

**Primary question:** For security incidents, what do Device certificate, Webhook replay establish, and is “Open security case” available to Security operator in this scope?

**Primary action:** Open security case → G12

**Secondary disclosure:** Keep Device certificate, Webhook replay in the decision layer. Put the supporting details for Support session, Upload scan, full source/version history and FR-G11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a security incidents fixture for Security operator; change Device certificate and make Upload scan unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open security case” reaches G12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### G12 — Security case & containment

**Context:** configuration · **Role:** Security operator · **FR:** FR-G12

**Primary visual:** Containment timeline showing residual exposure and evidence

**Primary question:** For security case & containment, what do Case, Source establish, and is “Record containment” available to Security operator in this scope?

**Primary action:** Record containment → G11

**Secondary disclosure:** Keep Case, Source in the decision layer. Put the supporting details for Action, Coverage, Evidence, full source/version history and FR-G12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**Validation:** Use a security case & containment fixture for Security operator; change Case and make Evidence unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Record containment” reaches G11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D01 — Developer workspace

**Context:** configuration · **Role:** Partner developer · **FR:** FR-D01

**Primary visual:** Developer resource map separating sandbox and production

**Primary question:** For developer workspace, what do API reference, Event schemas establish, and is “Open API explorer” available to Partner developer in this scope?

**Primary action:** Open API explorer → D02

**Secondary disclosure:** Keep API reference, Event schemas in the decision layer. Put the supporting details for SDK examples, Sandbox, full source/version history and FR-D01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a developer workspace fixture for Partner developer; change API reference and make Sandbox unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open API explorer” reaches D02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D02 — API explorer

**Context:** configuration · **Role:** Partner developer · **FR:** FR-D02

**Primary visual:** Request/response split pane with scope and idempotency preview

**Primary question:** For api explorer, what do Auth, Payload establish, and is “Run sandbox request” available to Partner developer in this scope?

**Primary action:** Run sandbox request → D03

**Secondary disclosure:** Keep Auth, Payload in the decision layer. Put the supporting details for Idempotency, Response, full source/version history and FR-D02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a api explorer fixture for Partner developer; change Auth and make Response unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Run sandbox request” reaches D03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D03 — Sandbox request results

**Context:** configuration · **Role:** Partner developer · **FR:** FR-D03

**Primary visual:** Sandbox response showing HTTP, durable receipt and trace separately

**Primary question:** For sandbox request results, what do HTTP status, Receipt establish, and is “Open schema registry” available to Partner developer in this scope?

**Primary action:** Open schema registry → D04

**Secondary disclosure:** Keep HTTP status, Receipt in the decision layer. Put the supporting details for Durability, Incident, Trace, full source/version history and FR-D03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a sandbox request results fixture for Partner developer; change HTTP status and make Trace unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open schema registry” reaches D04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D04 — Schema registry

**Context:** configuration · **Role:** Partner developer · **FR:** FR-D04

**Primary visual:** Schema version tree with compatibility and deprecation markers

**Primary question:** For schema registry, what do signal.fire.observed, incident.updated establish, and is “View schema contract” available to Partner developer in this scope?

**Primary action:** View schema contract → D05

**Secondary disclosure:** Keep signal.fire.observed, incident.updated in the decision layer. Put the supporting details for command.result, Deprecated versions, full source/version history and FR-D04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a schema registry fixture for Partner developer; change signal.fire.observed and make Deprecated versions unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View schema contract” reaches D05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D05 — Connector manifest editor

**Context:** configuration · **Role:** Partner developer · **FR:** FR-D05

**Primary visual:** Connector capability manifest with validation diff

**Primary question:** For connector manifest editor, what do Connector, Version establish, and is “Submit for conformance” available to Partner developer in this scope?

**Primary action:** Submit for conformance → D06

**Secondary disclosure:** Keep Connector, Version in the decision layer. Put the supporting details for Capabilities, Auth, Retry class, full source/version history and FR-D05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a connector manifest editor fixture for Partner developer; change Connector and make Retry class unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit for conformance” reaches D06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D06 — Conformance certification

**Context:** configuration · **Role:** Integration reviewer · **FR:** FR-D06

**Primary visual:** Conformance scenario matrix with security and backpressure results

**Primary question:** For conformance certification, what do Duplicate delivery, Tenant spoof establish, and is “Approve adapter version” available to Integration reviewer in this scope?

**Primary action:** Approve adapter version → I01

**Secondary disclosure:** Keep Duplicate delivery, Tenant spoof in the decision layer. Put the supporting details for Clock skew, Expired credentials, Backpressure, full source/version history and FR-D06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a conformance certification fixture for Integration reviewer; change Duplicate delivery and make Backpressure unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve adapter version” reaches I01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D07 — Webhook delivery trace

**Context:** configuration · **Role:** Partner developer · **FR:** FR-D07

**Primary visual:** Webhook retry timeline with exact delivery outcome

**Primary question:** For webhook delivery trace, what do 10:40:00, 10:40:01 establish, and is “Review subscription” available to Partner developer in this scope?

**Primary action:** Review subscription → I08

**Secondary disclosure:** Keep 10:40:00, 10:40:01 in the decision layer. Put the supporting details for 10:40:03, 10:40:07, full source/version history and FR-D07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a webhook delivery trace fixture for Partner developer; change 10:40:00 and make 10:40:07 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review subscription” reaches I08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### D08 — Credential rotation

**Context:** configuration · **Role:** Partner developer · **FR:** FR-D08

**Primary visual:** Credential overlap timeline with secret-free rotation preview

**Primary question:** For credential rotation, what do Client, Current key establish, and is “Create rotation request” available to Partner developer in this scope?

**Primary action:** Create rotation request → I07

**Secondary disclosure:** Keep Client, Current key in the decision layer. Put the supporting details for Overlap window, New key, full source/version history and FR-D08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**Validation:** Use a credential rotation fixture for Partner developer; change Client and make New key unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Create rotation request” reaches I07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### L01 — Language coverage

**Context:** configuration · **Role:** Localization manager · **FR:** FR-L01

**Primary visual:** Language coverage grid highlighting critical missing content

**Primary question:** For language coverage, what do Vietnamese, English establish, and is “Open translation workspace” available to Localization manager in this scope?

**Primary action:** Open translation workspace → L02

**Secondary disclosure:** Keep Vietnamese, English in the decision layer. Put the supporting details for Japanese, Critical templates, full source/version history and FR-L01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**Validation:** Use a language coverage fixture for Localization manager; change Vietnamese and make Critical templates unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open translation workspace” reaches L02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### L02 — Translation editor

**Context:** configuration · **Role:** Translator · **FR:** FR-L02

**Primary visual:** Source/translation paired editor with protected variables

**Primary question:** For translation editor, what do Template, Source language establish, and is “Submit translation review” available to Translator in this scope?

**Primary action:** Submit translation review → L03

**Secondary disclosure:** Keep Template, Source language in the decision layer. Put the supporting details for Target language, Variables, Review, full source/version history and FR-L02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**Validation:** Use a translation editor fixture for Translator; change Template and make Review unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit translation review” reaches L03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### L03 — Translation review

**Context:** configuration · **Role:** Language reviewer · **FR:** FR-L03

**Primary visual:** Version-parity review showing text, variables and voice transcript

**Primary question:** For translation review, what do Source version, Target locale establish, and is “Approve translation version” available to Language reviewer in this scope?

**Primary action:** Approve translation version → L01

**Secondary disclosure:** Keep Source version, Target locale in the decision layer. Put the supporting details for Variable parity, Voice transcript, Reviewer, full source/version history and FR-L03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**Validation:** Use a translation review fixture for Language reviewer; change Source version and make Reviewer unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve translation version” reaches L01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### L04 — Voice & pronunciation

**Context:** configuration · **Role:** Content editor · **FR:** FR-L04

**Primary visual:** Pronunciation samples paired with exact transcript and fallback

**Primary question:** For voice & pronunciation, what do Locale, Voice establish, and is “Save voice configuration” available to Content editor in this scope?

**Primary action:** Save voice configuration → L01

**Secondary disclosure:** Keep Locale, Voice in the decision layer. Put the supporting details for Transcript, Site pronunciation, Fallback, full source/version history and FR-L04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**Validation:** Use a voice & pronunciation fixture for Content editor; change Locale and make Fallback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save voice configuration” reaches L01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### L05 — Locale fallback policy

**Context:** configuration · **Role:** Tenant admin · **FR:** FR-L05

**Primary visual:** Locale fallback tree showing missing-critical-content behavior

**Primary question:** For locale fallback policy, what do Supported, User preference establish, and is “Save language policy” available to Tenant admin in this scope?

**Primary action:** Save language policy → L01

**Secondary disclosure:** Keep Supported, User preference in the decision layer. Put the supporting details for Missing critical content, Fallback language, full source/version history and FR-L05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**Validation:** Use a locale fallback policy fixture for Tenant admin; change Supported and make Fallback language unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save language policy” reaches L01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### L06 — Emergency terminology

**Context:** configuration · **Role:** Language reviewer · **FR:** FR-L06

**Primary visual:** Emergency term comparison distinguishing safe, unknown and SOS

**Primary question:** For emergency terminology, what do SOS, Safe establish, and is “Review translation editor” available to Language reviewer in this scope?

**Primary action:** Review translation editor → L02

**Secondary disclosure:** Keep SOS, Safe in the decision layer. Put the supporting details for Unknown, full source/version history and FR-L06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**Validation:** Use a emergency terminology fixture for Language reviewer; change SOS and make Unknown unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review translation editor” reaches L02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C31 — Circle membership & invitations

**Context:** configuration · **Role:** Citizen · **FR:** FR-C31

**Primary visual:** Circle roster with invitation state and sharing privileges

**Primary question:** For circle membership & invitations, what do Alex, Jamie establish, and is “Manage invitation” available to Citizen in this scope?

**Primary action:** Manage invitation → C32

**Secondary disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Sharing, full source/version history and FR-C31 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a circle membership & invitations fixture for Citizen; change Alex and make Sharing unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Manage invitation” reaches C32 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C32 — Invite circle member

**Context:** configuration · **Role:** Citizen · **FR:** FR-C32

**Primary visual:** Invitation preview with recipient, role and location access

**Primary question:** For invite circle member, what do Circle, Contact establish, and is “Create invitation — sample” available to Citizen in this scope?

**Primary action:** Create invitation — sample → C31

**Secondary disclosure:** Keep Circle, Contact in the decision layer. Put the supporting details for Role, Invitation expiry, Location access, full source/version history and FR-C32 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a invite circle member fixture for Citizen; change Circle and make Location access unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Create invitation — sample” reaches C31 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C33 — Report or block conversation

**Context:** configuration · **Role:** Citizen · **FR:** FR-C33

**Primary visual:** Conversation report scope and block effect on safety warnings

**Primary question:** For report or block conversation, what do Conversation, Reason establish, and is “Submit report — sample” available to Citizen in this scope?

**Primary action:** Submit report — sample → C19

**Secondary disclosure:** Keep Conversation, Reason in the decision layer. Put the supporting details for Action, Site warnings, full source/version history and FR-C33 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a report or block conversation fixture for Citizen; change Conversation and make Site warnings unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit report — sample” reaches C19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C34 — Notification preferences

**Context:** configuration · **Role:** Citizen · **FR:** FR-C34

**Primary visual:** Separate social, safety and discreet notification preferences

**Primary question:** For notification preferences, what do Language, Social messages establish, and is “Save preferences” available to Citizen in this scope?

**Primary action:** Save preferences → C01

**Secondary disclosure:** Keep Language, Social messages in the decision layer. Put the supporting details for Safety alerts, Discreet requests, SMS, full source/version history and FR-C34 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a notification preferences fixture for Citizen; change Language and make SMS unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save preferences” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O31 — Incident archive & reopen

**Context:** command · **Role:** Supervisor · **FR:** FR-O31

**Primary visual:** Closed-incident archive preserving original chronology

**Primary question:** For incident archive & reopen, what do INC-2032, INC-2028 establish, and is “Review reopening” available to Supervisor in this scope?

**Primary action:** Review reopening → O32

**Secondary disclosure:** Keep INC-2032, INC-2028 in the decision layer. Put the supporting details for INC-2010, full source/version history and FR-O31 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a incident archive & reopen fixture for Supervisor; change INC-2032 and make INC-2010 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review reopening” reaches O32 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O32 — Reopen incident

**Context:** command · **Role:** Supervisor · **FR:** FR-O32

**Primary visual:** Reopening preview showing new owner and retained evidence

**Primary question:** For reopen incident, what do Incident, Reason establish, and is “Reopen incident — sample” available to Supervisor in this scope?

**Primary action:** Reopen incident — sample → O04

**Secondary disclosure:** Keep Incident, Reason in the decision layer. Put the supporting details for Owner, Severity, History, full source/version history and FR-O32 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a reopen incident fixture for Supervisor; change Incident and make History unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Reopen incident — sample” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O33 — Federated incident sharing

**Context:** command · **Role:** Supervisor · **FR:** FR-O33

**Primary visual:** Partner exchange preview showing disclosed fields and authority

**Primary question:** For federated incident sharing, what do Partner, Fields establish, and is “Review partner exchange” available to Supervisor in this scope?

**Primary action:** Review partner exchange → I10

**Secondary disclosure:** Keep Partner, Fields in the decision layer. Put the supporting details for Authority, Agreement, full source/version history and FR-O33 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a federated incident sharing fixture for Supervisor; change Partner and make Agreement unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review partner exchange” reaches I10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O34 — Accessibility assistance queue

**Context:** command · **Role:** Dispatcher · **FR:** FR-O34

**Primary visual:** Accessibility queue matching functional needs to capable units

**Primary question:** For accessibility assistance queue, what do SOS-041, SOS-044 establish, and is “Assign capable unit” available to Dispatcher in this scope?

**Primary action:** Assign capable unit → O09

**Secondary disclosure:** Keep SOS-041, SOS-044 in the decision layer. Put the supporting details for SOS-046, Source, full source/version history and FR-O34 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**Validation:** Use a accessibility assistance queue fixture for Dispatcher; change SOS-041 and make Source unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Assign capable unit” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C35 — Voice evacuation navigation

**Context:** emergency · **Role:** Citizen · **FR:** FR-C35

**Primary visual:** Next landmark instruction above floor route and position-quality band

**Primary question:** For voice evacuation navigation, what do Location, Next instruction establish, and is “Show next instruction” available to Citizen in this scope?

**Primary action:** Show next instruction → C36

**Secondary disclosure:** Keep Location, Next instruction in the decision layer. Put the supporting details for Position quality, Hazard data, full source/version history and FR-C35 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Stop obsolete speech when guidance version changes; stale position must not advance the next landmark.

**Validation:** Use a voice evacuation navigation fixture for Citizen; change Location and make Hazard data unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Show next instruction” reaches C36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C36 — Navigation step & orientation

**Context:** emergency · **Role:** Citizen · **FR:** FR-C36

**Primary visual:** Single navigation step with landmark picture and heading-confidence label

**Primary question:** For navigation step & orientation, what do Step, Instruction establish, and is “Repeat voice instruction” available to Citizen in this scope?

**Primary action:** Repeat voice instruction → C36

**Secondary disclosure:** Keep Step, Instruction in the decision layer. Put the supporting details for Heading, Accessible route, full source/version history and FR-C36 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Unknown heading removes directional arrows; use a verified landmark and manual orientation instead of fabricated left/right.

**Validation:** Use a navigation step & orientation fixture for Citizen; change Step and make Accessible route unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Repeat voice instruction” reaches C36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C37 — Route change notification

**Context:** emergency · **Role:** Citizen · **FR:** FR-C37

**Primary visual:** Withdrawn old route beside approved replacement and change reason

**Primary question:** For route change notification, what do Reason, Old route establish, and is “Review updated route” available to Citizen in this scope?

**Primary action:** Review updated route → C35

**Secondary disclosure:** Keep Reason, Old route in the decision layer. Put the supporting details for New instruction, Guidance version, full source/version history and FR-C37 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Withdraw old-route visuals and queued speech atomically; do not display replacement as approved before its version is accepted.

**Validation:** Use a route change notification fixture for Citizen; change Reason and make Guidance version unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review updated route” reaches C35 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C38 — Position uncertain / no route

**Context:** emergency · **Role:** Citizen · **FR:** FR-C38

**Primary visual:** Unknown floor/heading panel with manual location and assistance controls

**Primary question:** For position uncertain / no route, what do Floor, Heading establish, and is “Request assistance” available to Citizen in this scope?

**Primary action:** Request assistance → C05

**Secondary disclosure:** Keep Floor, Heading in the decision layer. Put the supporting details for Next step, Voice, full source/version history and FR-C38 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Do not invent a route or heading. Keep location correction and assistance reachable without permission recovery.

**Validation:** Use a position uncertain / no route fixture for Citizen; change Floor and make Voice unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Request assistance” reaches C05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C39 — Outdoor hazard avoidance

**Context:** emergency · **Role:** Citizen · **FR:** FR-C39

**Primary visual:** Outdoor hazard boundary, destination and unknown road segments

**Primary question:** For outdoor hazard avoidance, what do Area, Destination establish, and is “View next route step” available to Citizen in this scope?

**Primary action:** View next route step → C36

**Secondary disclosure:** Keep Area, Destination in the decision layer. Put the supporting details for Road condition, Unknown segments, full source/version history and FR-C39 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a outdoor hazard avoidance fixture for Citizen; change Area and make Unknown segments unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View next route step” reaches C36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### C40 — Voice language & guidance settings

**Context:** configuration · **Role:** Citizen · **FR:** FR-C40

**Primary visual:** Voice sample, rate control and discreet-mode preview

**Primary question:** For voice language & guidance settings, what do Language, Voice establish, and is “Save guidance preferences” available to Citizen in this scope?

**Primary action:** Save guidance preferences → C35

**Secondary disclosure:** Keep Language, Voice in the decision layer. Put the supporting details for Speech rate, Haptics, Discreet mode, full source/version history and FR-C40 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**Validation:** Use a voice language & guidance settings fixture for Citizen; change Language and make Discreet mode unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save guidance preferences” reaches C35 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P01 — Speaker zones & coverage

**Context:** command · **Role:** PA operator · **FR:** FR-P01

**Primary visual:** Speaker coverage map with uncovered zones and incident context

**Primary question:** For speaker zones & coverage, what do Building A, Outdoor campus establish, and is “Select broadcast zones” available to PA operator in this scope?

**Primary action:** Select broadcast zones → P02

**Secondary disclosure:** Keep Building A, Outdoor campus in the decision layer. Put the supporting details for Coverage gaps, Live incident, full source/version history and FR-P01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a speaker zones & coverage fixture for PA operator; change Building A and make Live incident unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Select broadcast zones” reaches P02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P02 — Compose rescue announcement

**Context:** command · **Role:** PA author · **FR:** FR-P02

**Primary visual:** Announcement text/audio preview tied to zones and expiry

**Primary question:** For compose rescue announcement, what do Zones, Priority establish, and is “Preview announcement” available to PA author in this scope?

**Primary action:** Preview announcement → P03

**Secondary disclosure:** Keep Zones, Priority in the decision layer. Put the supporting details for Languages, Source, Expires, full source/version history and FR-P02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a compose rescue announcement fixture for PA author; change Zones and make Expires unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Preview announcement” reaches P03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P03 — Preview & approve announcement

**Context:** command · **Role:** PA approver · **FR:** FR-P03

**Primary visual:** Exact message version with selected speakers and language sequence

**Primary question:** For preview & approve announcement, what do Message version, Selected speakers establish, and is “Approve sample playback” available to PA approver in this scope?

**Primary action:** Approve sample playback → P04

**Secondary disclosure:** Keep Message version, Selected speakers in the decision layer. Put the supporting details for Language sequence, Repetition, Approver, full source/version history and FR-P03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a preview & approve announcement fixture for PA approver; change Message version and make Approver unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve sample playback” reaches P04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P04 — Speaker playback monitoring

**Context:** command · **Role:** PA operator · **FR:** FR-P04

**Primary visual:** Playback progress distinguishing controller receipt from audibility

**Primary question:** For speaker playback monitoring, what do Controller, Speakers establish, and is “Inspect speaker health” available to PA operator in this scope?

**Primary action:** Inspect speaker health → P05

**Secondary disclosure:** Keep Controller, Speakers in the decision layer. Put the supporting details for Acoustic verification, Next, full source/version history and FR-P04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Speaker receipt cannot prove occupants heard the message; coverage gaps and unknown acoustic evidence remain prominent.

**Validation:** Use a speaker playback monitoring fixture for PA operator; change Controller and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect speaker health” reaches P05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P05 — Speaker device & self-test

**Context:** command · **Role:** Device admin · **FR:** FR-P05

**Primary visual:** Speaker power-network-amplifier chain with self-test age

**Primary question:** For speaker device & self-test, what do Power, Network establish, and is “Open coverage fallback” available to Device admin in this scope?

**Primary action:** Open coverage fallback → P01

**Secondary disclosure:** Keep Power, Network in the decision layer. Put the supporting details for Amplifier, Last self-test, Coverage fallback, full source/version history and FR-P05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a speaker device & self-test fixture for Device admin; change Power and make Coverage fallback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open coverage fallback” reaches P01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P06 — Live rescue microphone

**Context:** command · **Role:** Authorized announcer · **FR:** FR-P06

**Primary visual:** Live microphone session with selected zones and explicit stop control

**Primary question:** For live rescue microphone, what do Zones, Microphone establish, and is “Review live session — sample” available to Authorized announcer in this scope?

**Primary action:** Review live session — sample → P04

**Secondary disclosure:** Keep Zones, Microphone in the decision layer. Put the supporting details for Priority, Maximum session, Recording, full source/version history and FR-P06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a live rescue microphone fixture for Authorized announcer; change Zones and make Recording unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review live session — sample” reaches P04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P07 — Drone / vehicle speaker mission

**Context:** command · **Role:** Drone operator · **FR:** FR-P07

**Primary visual:** Mobile speaker mission footprint with pilot ownership

**Primary question:** For drone / vehicle speaker mission, what do Platform, Message establish, and is “Review mission” available to Drone operator in this scope?

**Primary action:** Review mission → I13

**Secondary disclosure:** Keep Platform, Message in the decision layer. Put the supporting details for Pilot, Broadcast area, Playback, full source/version history and FR-P07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a drone / vehicle speaker mission fixture for Drone operator; change Platform and make Playback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review mission” reaches I13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P08 — Audio library & TTS review

**Context:** configuration · **Role:** Content editor · **FR:** FR-P08

**Primary visual:** Language audio library with pronunciation review and transcript

**Primary question:** For audio library & tts review, what do PA-04 vi-VN, PA-04 en establish, and is “Edit voice content” available to Content editor in this scope?

**Primary action:** Edit voice content → L04

**Secondary disclosure:** Keep PA-04 vi-VN, PA-04 en in the decision layer. Put the supporting details for PA-04 ja-JP, Pronunciation, full source/version history and FR-P08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a audio library & tts review fixture for Content editor; change PA-04 vi-VN and make Pronunciation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit voice content” reaches L04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### P09 — PA priority & arbitration

**Context:** configuration · **Role:** PA admin · **FR:** FR-P09

**Primary visual:** Priority arbitration stack showing local priority and lost-link behavior

**Primary question:** For pa priority & arbitration, what do Highest priority, Cloud rescue message establish, and is “Save arbitration policy” available to PA admin in this scope?

**Primary action:** Save arbitration policy → P01

**Secondary disclosure:** Keep Highest priority, Cloud rescue message in the decision layer. Put the supporting details for Routine audio, Lost link, Resume, full source/version history and FR-P09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**Validation:** Use a pa priority & arbitration fixture for PA admin; change Highest priority and make Resume unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save arbitration policy” reaches P01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S15 — Evacuation graph editor

**Context:** configuration · **Role:** Route designer · **FR:** FR-S15

**Primary visual:** Evacuation graph with node/edge types and inaccessible links

**Primary question:** For evacuation graph editor, what do Nodes, Edges establish, and is “Review route validation” available to Route designer in this scope?

**Primary action:** Review route validation → S16

**Secondary disclosure:** Keep Nodes, Edges in the decision layer. Put the supporting details for Elevators, Map revision, full source/version history and FR-S15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a evacuation graph editor fixture for Route designer; change Nodes and make Map revision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review route validation” reaches S16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### S16 — Route simulation & approval

**Context:** configuration · **Role:** Safety reviewer · **FR:** FR-S16

**Primary visual:** Scenario comparison showing blocked, unknown and wheelchair routes

**Primary question:** For route simulation & approval, what do Blocked corridor, Unknown floor establish, and is “Publish reviewed graph” available to Safety reviewer in this scope?

**Primary action:** Publish reviewed graph → S15

**Secondary disclosure:** Keep Blocked corridor, Unknown floor in the decision layer. Put the supporting details for Wheelchair profile, Expired hazard data, Reviewer, full source/version history and FR-S16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**Validation:** Use a route simulation & approval fixture for Safety reviewer; change Blocked corridor and make Reviewer unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish reviewed graph” reaches S15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O35 — Hazard zones & route restrictions

**Context:** command · **Role:** Incident commander · **FR:** FR-O35

**Primary visual:** Hazard polygon editor with affected route segments and expiry

**Primary question:** For hazard zones & route restrictions, what do Hazard, Geometry establish, and is “Review guidance impact” available to Incident commander in this scope?

**Primary action:** Review guidance impact → O36

**Secondary disclosure:** Keep Hazard, Geometry in the decision layer. Put the supporting details for Certainty, Expires, Affected routes, full source/version history and FR-O35 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Expired geometry removes its authority; changed restrictions identify affected guidance versions before publication.

**Validation:** Use a hazard zones & route restrictions fixture for Incident commander; change Hazard and make Affected routes unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review guidance impact” reaches O36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### O36 — Guidance distribution & receipts

**Context:** command · **Role:** Operator · **FR:** FR-O36

**Primary visual:** Guidance version distribution separating withdrawal and delivery receipts

**Primary question:** For guidance distribution & receipts, what do Guidance version, Smartphones establish, and is “Open speaker operations” available to Operator in this scope?

**Primary action:** Open speaker operations → P01

**Secondary disclosure:** Keep Guidance version, Smartphones in the decision layer. Put the supporting details for Speaker controller, Old route, Unreachable users, full source/version history and FR-O36 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Old-route withdrawal and new-version delivery have separate receipts; unreachable people remain visible and require alternate channels.

**Validation:** Use a guidance distribution & receipts fixture for Operator; change Guidance version and make Unreachable users unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open speaker operations” reaches P01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H01 — My rescue assistance profile

**Context:** configuration · **Role:** Citizen · **FR:** FR-H01

**Primary visual:** Functional assistance profile with mobility and communication pictograms

**Primary question:** For my rescue assistance profile, what do Age group, Mobility establish, and is “Review emergency sharing” available to Citizen in this scope?

**Primary action:** Review emergency sharing → H02

**Secondary disclosure:** Keep Age group, Mobility in the decision layer. Put the supporting details for Stairs, Communication, Source, full source/version history and FR-H01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a my rescue assistance profile fixture for Citizen; change Age group and make Source unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review emergency sharing” reaches H02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H02 — Health & assistance sharing

**Context:** configuration · **Role:** Citizen · **FR:** FR-H02

**Primary visual:** Separate functional-needs and medical-note disclosure previews

**Primary question:** For health & assistance sharing, what do Functional needs, Medical notes establish, and is “Save sharing preferences” available to Citizen in this scope?

**Primary action:** Save sharing preferences → H01

**Secondary disclosure:** Keep Functional needs, Medical notes in the decision layer. Put the supporting details for Family groups, Consent, Review date, full source/version history and FR-H02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a health & assistance sharing fixture for Citizen; change Functional needs and make Review date unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save sharing preferences” reaches H01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H03 — Caregiver relationships

**Context:** configuration · **Role:** Citizen · **FR:** FR-H03

**Primary visual:** Caregiver relationship graph with pending and expired authority

**Primary question:** For caregiver relationships, what do Jamie, Morgan establish, and is “Review caregiver authority” available to Citizen in this scope?

**Primary action:** Review caregiver authority → H04

**Secondary disclosure:** Keep Jamie, Morgan in the decision layer. Put the supporting details for Pending request, full source/version history and FR-H03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a caregiver relationships fixture for Citizen; change Jamie and make Pending request unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review caregiver authority” reaches H04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H04 — Caregiver authorization

**Context:** configuration · **Role:** Privacy officer · **FR:** FR-H04

**Primary visual:** Subject-caregiver scope comparison with authorization expiry

**Primary question:** For caregiver authorization, what do Subject, Caregiver establish, and is “Approve scoped relationship” available to Privacy officer in this scope?

**Primary action:** Approve scoped relationship → H03

**Secondary disclosure:** Keep Subject, Caregiver in the decision layer. Put the supporting details for Authority, Scope, Expires, full source/version history and FR-H04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a caregiver authorization fixture for Privacy officer; change Subject and make Expires unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve scoped relationship” reaches H03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H05 — Dependent person profile

**Context:** configuration · **Role:** Authorized caregiver · **FR:** FR-H05

**Primary visual:** Dependent profile with device link and review-age indicator

**Primary question:** For dependent person profile, what do Person, Mobility establish, and is “Request profile update” available to Authorized caregiver in this scope?

**Primary action:** Request profile update → H06

**Secondary disclosure:** Keep Person, Mobility in the decision layer. Put the supporting details for Device, Emergency note, Last reviewed, full source/version history and FR-H05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a dependent person profile fixture for Authorized caregiver; change Person and make Last reviewed unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Request profile update” reaches H06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H06 — Profile update & review

**Context:** configuration · **Role:** Authorized caregiver · **FR:** FR-H06

**Primary visual:** Profile version diff identifying source and review responsibility

**Primary question:** For profile update & review, what do Profile version, Change establish, and is “Submit profile update” available to Authorized caregiver in this scope?

**Primary action:** Submit profile update → H05

**Secondary disclosure:** Keep Profile version, Change in the decision layer. Put the supporting details for Source, Review status, Reason, full source/version history and FR-H06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a profile update & review fixture for Authorized caregiver; change Profile version and make Reason unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit profile update” reaches H05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H07 — People & assistance registry

**Context:** command · **Role:** Care coordinator · **FR:** FR-H07

**Primary visual:** Assistance registry with role-limited functional-needs columns

**Primary question:** For people & assistance registry, what do Alex, Jamie establish, and is “Open assistance case” available to Care coordinator in this scope?

**Primary action:** Open assistance case → H09

**Secondary disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Visibility, full source/version history and FR-H07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a people & assistance registry fixture for Care coordinator; change Alex and make Visibility unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open assistance case” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H08 — Proactive rescue queue

**Context:** command · **Role:** Dispatcher · **FR:** FR-H08

**Primary visual:** Proactive rescue queue with explainable priority reasons

**Primary question:** For proactive rescue queue, what do Alex, Morgan establish, and is “Review priority reasons” available to Dispatcher in this scope?

**Primary action:** Review priority reasons → H09

**Secondary disclosure:** Keep Alex, Morgan in the decision layer. Put the supporting details for Jamie, Priority policy, full source/version history and FR-H08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a proactive rescue queue fixture for Dispatcher; change Alex and make Priority policy unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review priority reasons” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H09 — Priority evidence & decision

**Context:** command · **Role:** Dispatcher · **FR:** FR-H09

**Primary visual:** Exposure and self-evacuation evidence beside human priority decision

**Primary question:** For priority evidence & decision, what do Exposure, Self-evacuation establish, and is “Assign proactive assistance” available to Dispatcher in this scope?

**Primary action:** Assign proactive assistance → O09

**Secondary disclosure:** Keep Exposure, Self-evacuation in the decision layer. Put the supporting details for SOS, Reason, Priority, full source/version history and FR-H09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a priority evidence & decision fixture for Dispatcher; change Exposure and make Priority unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Assign proactive assistance” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H10 — Presence & accountability

**Context:** command · **Role:** Operator · **FR:** FR-H10

**Primary visual:** Presence evidence matrix separating observed, expected and unknown

**Primary question:** For presence & accountability, what do Observed present, Expected attendance establish, and is “Open proactive queue” available to Operator in this scope?

**Primary action:** Open proactive queue → H08

**Secondary disclosure:** Keep Observed present, Expected attendance in the decision layer. Put the supporting details for Presence unknown, Last-seen sources, Safe inference, full source/version history and FR-H10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Expected attendance and last seen are not live presence; never infer safety from absence of a distress signal.

**Validation:** Use a presence & accountability fixture for Operator; change Observed present and make Safe inference unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open proactive queue” reaches H08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H11 — Restricted medical record

**Context:** configuration · **Role:** Authorized medical role · **FR:** FR-H11

**Primary visual:** Restricted medical record with access purpose and disclosure log

**Primary question:** For restricted medical record, what do Person, Record establish, and is “Return to assistance” available to Authorized medical role in this scope?

**Primary action:** Return to assistance → H09

**Secondary disclosure:** Keep Person, Record in the decision layer. Put the supporting details for Source, Access reason, Disclosure, full source/version history and FR-H11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a restricted medical record fixture for Authorized medical role; change Person and make Disclosure unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Return to assistance” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### H12 — Welfare check outcome

**Context:** field · **Role:** Responder · **FR:** FR-H12

**Primary visual:** Welfare observation with contact outcome and next responsible actor

**Primary question:** For welfare check outcome, what do Case, Person establish, and is “Save welfare observation” available to Responder in this scope?

**Primary action:** Save welfare observation → R06

**Secondary disclosure:** Keep Case, Person in the decision layer. Put the supporting details for Contact, Assistance, Location, Next, full source/version history and FR-H12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**Validation:** Use a welfare check outcome fixture for Responder; change Case and make Next unavailable. Verify the visual and warning update, all 6 source fields remain reachable, and “Save welfare observation” reaches R06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q01 — Positioning source health

**Context:** command · **Role:** Positioning admin · **FR:** FR-Q01

**Primary visual:** Position-source coverage and health comparison by GNSS/BLE/UWB/QR

**Primary question:** For positioning source health, what do GNSS, BLE establish, and is “Inspect location quality” available to Positioning admin in this scope?

**Primary action:** Inspect location quality → Q02

**Secondary disclosure:** Keep GNSS, BLE in the decision layer. Put the supporting details for UWB, QR anchors, full source/version history and FR-Q01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a positioning source health fixture for Positioning admin; change GNSS and make QR anchors unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect location quality” reaches Q02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q02 — Position quality & history

**Context:** command · **Role:** Operator · **FR:** FR-Q02

**Primary visual:** Location history with floor confidence and conflicting-source markers

**Primary question:** For position quality & history, what do Current source, Floor confidence establish, and is “Open assistance context” available to Operator in this scope?

**Primary action:** Open assistance context → H09

**Secondary disclosure:** Keep Current source, Floor confidence in the decision layer. Put the supporting details for Observed, Heading, Conflicting source, full source/version history and FR-Q02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a position quality & history fixture for Operator; change Current source and make Conflicting source unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open assistance context” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q03 — Indoor calibration editor

**Context:** configuration · **Role:** Positioning admin · **FR:** FR-Q03

**Primary visual:** Calibration reference geometry with residual-error preview

**Primary question:** For indoor calibration editor, what do Coordinate frame, Reference points establish, and is “Review route graph” available to Positioning admin in this scope?

**Primary action:** Review route graph → S15

**Secondary disclosure:** Keep Coordinate frame, Reference points in the decision layer. Put the supporting details for Floor, Calibration error, Publish, full source/version history and FR-Q03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a indoor calibration editor fixture for Positioning admin; change Coordinate frame and make Publish unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review route graph” reaches S15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q04 — Evacuation optimization

**Context:** command · **Role:** Incident commander · **FR:** FR-Q04

**Primary visual:** Candidate-route comparison with excluded options and constraints

**Primary question:** For evacuation optimization, what do Primary, Alternative establish, and is “Review route comparison” available to Incident commander in this scope?

**Primary action:** Review route comparison → Q05

**Secondary disclosure:** Keep Primary, Alternative in the decision layer. Put the supporting details for Excluded, Objective, full source/version history and FR-Q04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a evacuation optimization fixture for Incident commander; change Primary and make Objective unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review route comparison” reaches Q05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q05 — Route comparison & decision

**Context:** command · **Role:** Safety reviewer · **FR:** FR-Q05

**Primary visual:** Route trade-off matrix showing uncertainty and human approval

**Primary question:** For route comparison & decision, what do Option A, Option B establish, and is “Publish guidance version” available to Safety reviewer in this scope?

**Primary action:** Publish guidance version → O36

**Secondary disclosure:** Keep Option A, Option B in the decision layer. Put the supporting details for Option C, Uncertainty, Approval, full source/version history and FR-Q05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a route comparison & decision fixture for Safety reviewer; change Option A and make Approval unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish guidance version” reaches O36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q06 — AI incident copilot

**Context:** command · **Role:** Operator · **FR:** FR-Q06

**Primary visual:** Evidence-linked AI summary with cutoff and authority boundary

**Primary question:** For ai incident copilot, what do Summary, Sources establish, and is “Review AI recommendation” available to Operator in this scope?

**Primary action:** Review AI recommendation → Q07

**Secondary disclosure:** Keep Summary, Sources in the decision layer. Put the supporting details for Data cutoff, Authority, full source/version history and FR-Q06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a ai incident copilot fixture for Operator; change Summary and make Authority unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review AI recommendation” reaches Q07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q07 — AI evidence & approval

**Context:** command · **Role:** Supervisor · **FR:** FR-Q07

**Primary visual:** Claim-evidence-unknown comparison before human decision

**Primary question:** For ai evidence & approval, what do Claim, Evidence establish, and is “Review route decision” available to Supervisor in this scope?

**Primary action:** Review route decision → Q05

**Secondary disclosure:** Keep Claim, Evidence in the decision layer. Put the supporting details for Unknown, Guard, Action, full source/version history and FR-Q07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a ai evidence & approval fixture for Supervisor; change Claim and make Action unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review route decision” reaches Q05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q08 — AI policies & model evaluation

**Context:** configuration · **Role:** AI governance lead · **FR:** FR-Q08

**Primary visual:** Evaluation results for grounding, injection and data exposure

**Primary question:** For ai policies & model evaluation, what do Model, Grounding test establish, and is “Open model governance” available to AI governance lead in this scope?

**Primary action:** Open model governance → Q09

**Secondary disclosure:** Keep Model, Grounding test in the decision layer. Put the supporting details for Prompt injection, Health data, Control tools, full source/version history and FR-Q08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a ai policies & model evaluation fixture for AI governance lead; change Model and make Control tools unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open model governance” reaches Q09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q09 — AI deployment governance

**Context:** configuration · **Role:** AI governance lead · **FR:** FR-Q09

**Primary visual:** Model/prompt version deployment preview with regional fallback

**Primary question:** For ai deployment governance, what do Region, Model version establish, and is “Save deployment draft” available to AI governance lead in this scope?

**Primary action:** Save deployment draft → Q08

**Secondary disclosure:** Keep Region, Model version in the decision layer. Put the supporting details for Prompt version, Data retention, Fallback, full source/version history and FR-Q09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a ai deployment governance fixture for AI governance lead; change Region and make Fallback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save deployment draft” reaches Q08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### Q10 — Simulation & crowd scenarios

**Context:** configuration · **Role:** Safety planner · **FR:** FR-Q10

**Primary visual:** Simulated crowd and blocked-exit scenario with mobility cohorts

**Primary question:** For simulation & crowd scenarios, what do Mode, Occupancy establish, and is “Review route validation” available to Safety planner in this scope?

**Primary action:** Review route validation → S16

**Secondary disclosure:** Keep Mode, Occupancy in the decision layer. Put the supporting details for Blocked exit, Mobility support, Result, full source/version history and FR-Q10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**Validation:** Use a simulation & crowd scenarios fixture for Safety planner; change Mode and make Result unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review route validation” reaches S16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F01 — Physical systems overview

**Context:** command · **Role:** Physical supervisor · **FR:** FR-F01

**Primary visual:** Physical-system topology showing controller authority and evidence age

**Primary question:** For physical systems overview, what do Controller health, Zone status establish, and is “Review F07” available to Physical supervisor in this scope?

**Primary action:** Review F07 → F07

**Secondary disclosure:** Keep Controller health, Zone status in the decision layer. Put the supporting details for Evidence freshness, Local authority, Control permission, full source/version history and FR-F01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a physical systems overview fixture for Physical supervisor; change Controller health and make Control permission unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F07” reaches F07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F02 — Controller inventory

**Context:** configuration · **Role:** Integration engineer · **FR:** FR-F02

**Primary visual:** Controller inventory with model, protocol and verified capability

**Primary question:** For controller inventory, what do Controller model, Protocol binding establish, and is “Review F03” available to Integration engineer in this scope?

**Primary action:** Review F03 → F03

**Secondary disclosure:** Keep Controller model, Protocol binding in the decision layer. Put the supporting details for Operating mode, Site assignment, Capability evidence, full source/version history and FR-F02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a controller inventory fixture for Integration engineer; change Controller model and make Capability evidence unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F03” reaches F03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F03 — Controller capability detail

**Context:** configuration · **Role:** Integration engineer · **FR:** FR-F03

**Primary visual:** Allowed/forbidden operation matrix beside local override status

**Primary question:** For controller capability detail, what do Controller model, Allowed operations establish, and is “Review F04” available to Integration engineer in this scope?

**Primary action:** Review F04 → F04

**Secondary disclosure:** Keep Controller model, Allowed operations in the decision layer. Put the supporting details for Forbidden operations, Capability evidence, Local override, full source/version history and FR-F03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a controller capability detail fixture for Integration engineer; change Controller model and make Local override unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F04” reaches F04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F04 — Signal point mapping

**Context:** configuration · **Role:** Integration engineer · **FR:** FR-F04

**Primary visual:** Signal-address-to-meaning mapping with polarity and quality states

**Primary question:** For signal point mapping, what do Signal address, Signal meaning establish, and is “Review F05” available to Integration engineer in this scope?

**Primary action:** Review F05 → F05

**Secondary disclosure:** Keep Signal address, Signal meaning in the decision layer. Put the supporting details for Normal polarity, Quality mapping, Mapping revision, full source/version history and FR-F04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a signal point mapping fixture for Integration engineer; change Signal address and make Mapping revision unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F05” reaches F05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F05 — Physical zone mapping

**Context:** configuration · **Role:** Site engineer · **FR:** FR-F05

**Primary visual:** Physical/source zone overlay showing coordinate and coverage mismatch

**Primary question:** For physical zone mapping, what do Source zone, Target zone establish, and is “Review F06” available to Site engineer in this scope?

**Primary action:** Review F06 → F06

**Secondary disclosure:** Keep Source zone, Target zone in the decision layer. Put the supporting details for Coordinate frame, Coverage boundary, Mapping revision, full source/version history and FR-F05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a physical zone mapping fixture for Site engineer; change Source zone and make Mapping revision unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F06” reaches F06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F06 — Cause-and-effect matrix

**Context:** configuration · **Role:** Fire systems engineer · **FR:** FR-F06

**Primary visual:** Cause-to-effect graph with authority and inhibit gates

**Primary question:** For cause-and-effect matrix, what do Cause input, Approved effect establish, and is “Review F15” available to Fire systems engineer in this scope?

**Primary action:** Review F15 → F15

**Secondary disclosure:** Keep Cause input, Approved effect in the decision layer. Put the supporting details for Authority record, Inhibit condition, Change impact, full source/version history and FR-F06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a cause-and-effect matrix fixture for Fire systems engineer; change Cause input and make Change impact unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F15” reaches F15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F07 — Physical event detail

**Context:** command · **Role:** Physical supervisor · **FR:** FR-F07

**Primary visual:** Physical event provenance card linking observed evidence and incident

**Primary question:** For physical event detail, what do Source event, Signal meaning establish, and is “Review F08” available to Physical supervisor in this scope?

**Primary action:** Review F08 → F08

**Secondary disclosure:** Keep Source event, Signal meaning in the decision layer. Put the supporting details for Observed time, Evidence quality, Incident linkage, full source/version history and FR-F07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a physical event detail fixture for Physical supervisor; change Source event and make Incident linkage unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F08” reaches F08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F08 — Fire-water status

**Context:** command · **Role:** Physical supervisor · **FR:** FR-F08

**Primary visual:** Water-system schematic separating pump, pressure and valve feedback

**Primary question:** For fire-water status, what do Pump feedback, Pressure observation establish, and is “Review F09” available to Physical supervisor in this scope?

**Primary action:** Review F09 → F09

**Secondary disclosure:** Keep Pump feedback, Pressure observation in the decision layer. Put the supporting details for Valve feedback, Water availability, Equipment impairment, full source/version history and FR-F08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a fire-water status fixture for Physical supervisor; change Pump feedback and make Equipment impairment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F09” reaches F09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F09 — Controlled release review

**Context:** command · **Role:** Authorized fire officer · **FR:** FR-F09

**Primary visual:** Release-prerequisite gate against exact equipment and expiring request

**Primary question:** For controlled release review, what do Requested operation, Target equipment establish, and is “Review F10” available to Authorized fire officer in this scope?

**Primary action:** Review F10 → F10

**Secondary disclosure:** Keep Requested operation, Target equipment in the decision layer. Put the supporting details for Capability evidence, Release prerequisites, Command expiry, full source/version history and FR-F09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a controlled release review fixture for Authorized fire officer; change Requested operation and make Command expiry unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F10” reaches F10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F10 — Command authorization

**Context:** command · **Role:** Independent command approver · **FR:** FR-F10

**Primary visual:** Immutable command digest with requester/approver and execution boundary

**Primary question:** For command authorization, what do Exact command digest, Requester identity establish, and is “Review F11” available to Independent command approver in this scope?

**Primary action:** Review F11 → F11

**Secondary disclosure:** Keep Exact command digest, Requester identity in the decision layer. Put the supporting details for Approver identity, Approval state, Execution boundary, full source/version history and FR-F10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a command authorization fixture for Independent command approver; change Exact command digest and make Execution boundary unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F11” reaches F11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F11 — Execution feedback

**Context:** command · **Role:** Physical supervisor · **FR:** FR-F11

**Primary visual:** Receipt-versus-physical-feedback timeline with unknown outcome

**Primary question:** For execution feedback, what do Command receipt, Physical feedback establish, and is “Review F12” available to Physical supervisor in this scope?

**Primary action:** Review F12 → F12

**Secondary disclosure:** Keep Command receipt, Physical feedback in the decision layer. Put the supporting details for Outcome state, Execution correlation, Retry permission, full source/version history and FR-F11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Accepted command and physical actuation are separate states; unknown outcome disables blind retry and opens reconciliation F12.

**Validation:** Use a execution feedback fixture for Physical supervisor; change Command receipt and make Retry permission unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F12” reaches F12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F12 — Unknown-result reconciliation

**Context:** command · **Role:** Physical supervisor · **FR:** FR-F12

**Primary visual:** Unknown-result reconciliation comparing readback and field evidence

**Primary question:** For unknown-result reconciliation, what do Command reference, Readback evidence establish, and is “Review F13” available to Physical supervisor in this scope?

**Primary action:** Review F13 → F13

**Secondary disclosure:** Keep Command reference, Readback evidence in the decision layer. Put the supporting details for Field confirmation, Reconciliation decision, Decision reason, full source/version history and FR-F12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Keep outcome unknown until correlated readback or authorized field evidence resolves it; retain contradictory evidence and reason.

**Validation:** Use a unknown-result reconciliation fixture for Physical supervisor; change Command reference and make Decision reason unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F13” reaches F13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F13 — Local override & handover

**Context:** command · **Role:** Site incident commander · **FR:** FR-F13

**Primary visual:** Local-control handover showing remote lease and receiving operator

**Primary question:** For local override & handover, what do Local controller state, Remote lease establish, and is “Review F01” available to Site incident commander in this scope?

**Primary action:** Review F01 → F01

**Secondary disclosure:** Keep Local controller state, Remote lease in the decision layer. Put the supporting details for Receiving operator, Handover scope, Return-to-remote gate, full source/version history and FR-F13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Loss of remote lease cannot take control back from the local controller; returning remote requires the documented handover gate.

**Validation:** Use a local override & handover fixture for Site incident commander; change Local controller state and make Return-to-remote gate unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F01” reaches F01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F14 — Impairment & test mode

**Context:** command · **Role:** Maintenance coordinator · **FR:** FR-F14

**Primary visual:** Impairment map with compensating measures, permit and expiry

**Primary question:** For impairment & test mode, what do Impairment scope, Permit reference establish, and is “Review F18” available to Maintenance coordinator in this scope?

**Primary action:** Review F18 → F18

**Secondary disclosure:** Keep Impairment scope, Permit reference in the decision layer. Put the supporting details for Compensating measure, Test isolation, Expiry and escalation, full source/version history and FR-F14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a impairment & test mode fixture for Maintenance coordinator; change Impairment scope and make Expiry and escalation unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F18” reaches F18 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F15 — Commissioning plan

**Context:** configuration · **Role:** Commissioning lead · **FR:** FR-F15

**Primary visual:** Commissioning sequence with test isolation and witness checkpoints

**Primary question:** For commissioning plan, what do Test configuration, Test scope establish, and is “Review F16” available to Commissioning lead in this scope?

**Primary action:** Review F16 → F16

**Secondary disclosure:** Keep Test configuration, Test scope in the decision layer. Put the supporting details for Test prerequisites, Witnesses, Evidence requirement, full source/version history and FR-F15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a commissioning plan fixture for Commissioning lead; change Test configuration and make Evidence requirement unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F16” reaches F16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F16 — Test-run evidence

**Context:** configuration · **Role:** Commissioning witness · **FR:** FR-F16

**Primary visual:** Expected/observed physical-effect comparison with fault injections

**Primary question:** For test-run evidence, what do Test run, Expected effect establish, and is “Review F17” available to Commissioning witness in this scope?

**Primary action:** Review F17 → F17

**Secondary disclosure:** Keep Test run, Expected effect in the decision layer. Put the supporting details for Observed effect, Fault injection, Result status, full source/version history and FR-F16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a test-run evidence fixture for Commissioning witness; change Test run and make Result status unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F17” reaches F17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F17 — Compatibility & certificate dossier

**Context:** configuration · **Role:** Compliance reviewer · **FR:** FR-F17

**Primary visual:** Certificate scope mapped to installed bill of materials and limitations

**Primary question:** For compatibility & certificate dossier, what do Installed bill of materials, Certificate scope establish, and is “Review F20” available to Compliance reviewer in this scope?

**Primary action:** Review F20 → F20

**Secondary disclosure:** Keep Installed bill of materials, Certificate scope in the decision layer. Put the supporting details for Interface limitation, Evidence validity, Release decision, full source/version history and FR-F17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a compatibility & certificate dossier fixture for Compliance reviewer; change Installed bill of materials and make Release decision unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F20” reaches F20 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F18 — Maintenance & restoration

**Context:** configuration · **Role:** Maintenance coordinator · **FR:** FR-F18

**Primary visual:** Restoration checklist with residual impairment and approval evidence

**Primary question:** For maintenance & restoration, what do Maintenance scope, Repair evidence establish, and is “Review F01” available to Maintenance coordinator in this scope?

**Primary action:** Review F01 → F01

**Secondary disclosure:** Keep Maintenance scope, Repair evidence in the decision layer. Put the supporting details for Restoration test, Closure approval, Residual impairment, full source/version history and FR-F18 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a maintenance & restoration fixture for Maintenance coordinator; change Maintenance scope and make Residual impairment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F01” reaches F01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F19 — Rescue equipment mission

**Context:** command · **Role:** Rescue mission commander · **FR:** FR-F19

**Primary visual:** Rescue-equipment mission envelope with qualified operator and limits

**Primary question:** For rescue equipment mission, what do Equipment configuration, Control interface establish, and is “Review F11” available to Rescue mission commander in this scope?

**Primary action:** Review F11 → F11

**Secondary disclosure:** Keep Equipment configuration, Control interface in the decision layer. Put the supporting details for Operator qualification, Mission constraints, Mission evidence, full source/version history and FR-F19 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a rescue equipment mission fixture for Rescue mission commander; change Equipment configuration and make Mission evidence unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F11” reaches F11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.

### F20 — Physical connector onboarding

**Context:** configuration · **Role:** Integration engineer · **FR:** FR-F20

**Primary visual:** Vendor connector onboarding gates for credentials, import and activation

**Primary question:** For physical connector onboarding, what do Vendor interface, Transport security establish, and is “Review F02” available to Integration engineer in this scope?

**Primary action:** Review F02 → F02

**Secondary disclosure:** Keep Vendor interface, Transport security in the decision layer. Put the supporting details for Credential custody, Import scope, Activation gate, full source/version history and FR-F20 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**Validation:** Use a physical connector onboarding fixture for Integration engineer; change Vendor interface and make Activation gate unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F02” reaches F02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.
