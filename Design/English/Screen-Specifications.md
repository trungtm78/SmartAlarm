# SmartAlarm — Complete screen specifications

Revision 2.0 · 233 identified screens; Vietnamese–English–Japanese. Each screen has a corresponding mockup; state variations do not count as additional screens.

Sample records are not real personal data. Flows with real effects use review/approval/receipt in the product; the prototype only simulates navigation. Role names describe business capabilities, not unrestricted roles.

## Shared interaction conventions

Focus follows content order; CTA design size ≥ 44 px; field errors preserve input; Enter does not automatically issue a command in confirmation dialogs; Escape closes a modal without saving. Form system fields are read-only. Mutations use idempotency + version; the UI shows success only after a server receipt. Sensitive details cannot be cached outside scope. Back navigation retains drafts within the same tenant scope and clears them when membership changes.

## Individual screen specifications


## V2 composition contract

The visual treatment below is normative for layout and information hierarchy. Existing purpose, role, fields, rules, workflow, navigation and acceptance contracts remain unchanged. Legacy Layout labels describe original inventory metadata and do not prescribe a generic renderer. These are design requirements, not a claim that each state has been user-tested. See [UX redesign audit](UX-Redesign-Audit.md).

<a id="a01"></a>
## A01 — Welcome & region

**EN:** Welcome & region · **JA:** 地域と言語の選択  
**Requirement:** FR-A01 / WF-01 · **Actor:** Citizen · **Surface:** Access · **Layout:** welcome

**Purpose:** Choose your safety region.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Continue → A02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A01) · [EN](../Prototype.html?lang=en#A01) · [JA](../Prototype.html?lang=ja#A01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Region | Europe · EU | Read-only within object scope; display source/time when they affect decisions. |
| Language | English | Read-only within object scope; display source/time when they affect decisions. |
| Accessibility | Standard | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A02 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A01 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For welcome & region, what do Region, Language establish, and is “Continue” available to Citizen in this scope?

**Primary visual:** Region selector with language samples and readable text-size preview

**Primary action:** Continue → A02

**Progressive disclosure:** Keep Region, Language in the decision layer. Put the supporting details for Accessibility, full source/version history and FR-A01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a welcome & region fixture for Citizen; change Region and make Accessibility unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Continue” reaches A02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a02"></a>
## A02 — Sign in

**EN:** Sign in · **JA:** サインイン  
**Requirement:** FR-A02 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Purpose:** Your workspace, securely connected.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** A01, A05, X08.  
**Output:** Sign in → A03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A02) · [EN](../Prototype.html?lang=en#A02) · [JA](../Prototype.html?lang=ja#A02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Email | alex@example.test | Valid email; errors must not reveal whether an account exists. |
| Workspace | Northstar | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Method | Passkey or enterprise SSO | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A03 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A02 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For sign in, what do Email, Workspace establish, and is “Sign in” available to All roles in this scope?

**Primary visual:** Workspace identity beside passkey and SSO entry

**Primary action:** Sign in → A03

**Progressive disclosure:** Keep Email, Workspace in the decision layer. Put the supporting details for Method, full source/version history and FR-A02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a sign in fixture for All roles; change Email and make Method unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Sign in” reaches A03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a03"></a>
## A03 — Verify identity

**EN:** Verify identity · **JA:** 本人確認  
**Requirement:** FR-A03 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Purpose:** Confirm this sign-in.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** A02.  
**Output:** Verify → A04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A03) · [EN](../Prototype.html?lang=en#A03) · [JA](../Prototype.html?lang=ja#A03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Method | Authenticator | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Verification code | 123456 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Trusted device | Off | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A04 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A03 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For verify identity, what do Method, Verification code establish, and is “Verify” available to All roles in this scope?

**Primary visual:** Verification method and code slots with remaining attempt feedback

**Primary action:** Verify → A04

**Progressive disclosure:** Keep Method, Verification code in the decision layer. Put the supporting details for Trusted device, full source/version history and FR-A03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a verify identity fixture for All roles; change Method and make Trusted device unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Verify” reaches A04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a04"></a>
## A04 — Workspace switcher

**EN:** Workspace switcher · **JA:** ワークスペースの選択  
**Requirement:** FR-A04 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** cards

**Purpose:** Choose an organization.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** A03, X04.  
**Output:** Enter workspace → O01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A04) · [EN](../Prototype.html?lang=en#A04) · [JA](../Prototype.html?lang=ja#A04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Northstar | EU · Operator | Read-only within object scope; display source/time when they affect decisions. |
| Harbor Campus | APAC · Responder | Read-only within object scope; display source/time when they affect decisions. |
| Personal | EU · Citizen | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O01 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A04 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For workspace switcher, what do Northstar, Harbor Campus establish, and is “Enter workspace” available to All roles in this scope?

**Primary visual:** Organization tiles showing region and effective role before entry

**Primary action:** Enter workspace → O01

**Progressive disclosure:** Keep Northstar, Harbor Campus in the decision layer. Put the supporting details for Personal, full source/version history and FR-A04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a workspace switcher fixture for All roles; change Northstar and make Personal unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Enter workspace” reaches O01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a05"></a>
## A05 — Recover access

**EN:** Recover access · **JA:** アクセスの復旧  
**Requirement:** FR-A05 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Purpose:** Restore access without exposing account existence.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Send recovery link → A02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A05) · [EN](../Prototype.html?lang=en#A05) · [JA](../Prototype.html?lang=ja#A05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Email | alex@example.test | Valid email; errors must not reveal whether an account exists. |
| Recovery method | Verified recovery contact | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Request | One active request | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A02 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A05 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For recover access, what do Email, Recovery method establish, and is “Send recovery link” available to All roles in this scope?

**Primary visual:** Recovery method selector and masked destination receipt

**Primary action:** Send recovery link → A02

**Progressive disclosure:** Keep Email, Recovery method in the decision layer. Put the supporting details for Request, full source/version history and FR-A05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a recover access fixture for All roles; change Email and make Request unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send recovery link” reaches A02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a06"></a>
## A06 — Accept invitation

**EN:** Accept invitation · **JA:** 招待の承認  
**Requirement:** FR-A06 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Purpose:** Review your organization invitation.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Accept invitation → A07.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A06) · [EN](../Prototype.html?lang=en#A06) · [JA](../Prototype.html?lang=ja#A06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Organization | Northstar | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Role | Responder | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Region | EU | Read-only from the authoritative source/version; cannot be edited in this form. |
| Invitation | Expires in 24 hours | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A07 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A06 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For accept invitation, what do Organization, Role establish, and is “Accept invitation” available to All roles in this scope?

**Primary visual:** Invitation identity, role scope and expiry comparison

**Primary action:** Accept invitation → A07

**Progressive disclosure:** Keep Organization, Role in the decision layer. Put the supporting details for Region, Invitation, full source/version history and FR-A06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a accept invitation fixture for All roles; change Organization and make Invitation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Accept invitation” reaches A07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a07"></a>
## A07 — Permissions & consent

**EN:** Permissions & consent · **JA:** 権限と同意  
**Requirement:** FR-A07 / WF-01 · **Actor:** Citizen · **Surface:** Access · **Layout:** form

**Purpose:** Choose how SmartAlarm supports you.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** A06.  
**Output:** Save choices → C01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A07) · [EN](../Prototype.html?lang=en#A07) · [JA](../Prototype.html?lang=ja#A07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Notifications | Enable | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Location | While using app | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Emergency sharing | Selected contacts | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Camera | Ask when attaching | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C01 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A07 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For permissions & consent, what do Notifications, Location establish, and is “Save choices” available to Citizen in this scope?

**Primary visual:** Separate permission switches with purpose pictograms

**Primary action:** Save choices → C01

**Progressive disclosure:** Keep Notifications, Location in the decision layer. Put the supporting details for Emergency sharing, Camera, full source/version history and FR-A07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a permissions & consent fixture for Citizen; change Notifications and make Camera unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save choices” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a08"></a>
## A08 — Session & device security

**EN:** Session & device security · **JA:** セッションと端末  
**Requirement:** FR-A08 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** list

**Purpose:** Review devices with access.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** A09.  
**Output:** Review session → A09.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A08) · [EN](../Prototype.html?lang=en#A08) · [JA](../Prototype.html?lang=ja#A08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| This device | Active · Berlin | Read-only within object scope; display source/time when they affect decisions. |
| Work tablet | Last active 2 hours ago | Read-only within object scope; display source/time when they affect decisions. |
| Old phone | Revoked | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A09 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A08 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For session & device security, what do This device, Work tablet establish, and is “Review session” available to All roles in this scope?

**Primary visual:** Device silhouettes with current-session badge and last activity

**Primary action:** Review session → A09

**Progressive disclosure:** Keep This device, Work tablet in the decision layer. Put the supporting details for Old phone, full source/version history and FR-A08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a session & device security fixture for All roles; change This device and make Old phone unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review session” reaches A09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a09"></a>
## A09 — Revoke session

**EN:** Revoke session · **JA:** セッションの取り消し  
**Requirement:** FR-A09 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Purpose:** End access on the selected device.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** A08.  
**Output:** Revoke selected session → A08.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A09) · [EN](../Prototype.html?lang=en#A09) · [JA](../Prototype.html?lang=ja#A09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Device | Work tablet | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Effect | Sign-in required again | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Reason | Device replaced | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A08 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A09 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For revoke session, what do Device, Effect establish, and is “Revoke selected session” available to All roles in this scope?

**Primary visual:** Selected device and revocation impact confirmation

**Primary action:** Revoke selected session → A08

**Progressive disclosure:** Keep Device, Effect in the decision layer. Put the supporting details for Reason, full source/version history and FR-A09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a revoke session fixture for All roles; change Device and make Reason unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Revoke selected session” reaches A08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="a10"></a>
## A10 — Profile & accessibility

**EN:** Profile & accessibility · **JA:** プロフィールとアクセシビリティ  
**Requirement:** FR-A10 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Purpose:** Make the interface work for you.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save profile → C01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#A10) · [EN](../Prototype.html?lang=en#A10) · [JA](../Prototype.html?lang=ja#A10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Name | Alex Morgan | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Language | English | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Text size | Large | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Reduce motion | On | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Timezone | Europe/Berlin | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-A10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C01 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### A10 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For profile & accessibility, what do Name, Language establish, and is “Save profile” available to All roles in this scope?

**Primary visual:** Live accessibility preview beside language and motion settings

**Primary action:** Save profile → C01

**Progressive disclosure:** Keep Name, Language in the decision layer. Put the supporting details for Text size, Reduce motion, Timezone, full source/version history and FR-A10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not reveal the selected workspace before identity and membership are verified; retain the chosen method without implying successful access.

**V2 acceptance scenario:** Use a profile & accessibility fixture for All roles; change Name and make Timezone unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save profile” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c01"></a>
## C01 — Safety home

**EN:** Safety home · **JA:** あなたの安全  
**Requirement:** FR-C01 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** home

**Purpose:** A clear next step, when it matters.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** A07, A10, C23, C34.  
**Output:** View active alert → C02.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C01) · [EN](../Prototype.html?lang=en#C01) · [JA](../Prototype.html?lang=ja#C01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Your area | Harbor Campus | Read-only within object scope; display source/time when they affect decisions. |
| Active alert | Fire · Building A | Read-only within object scope; display source/time when they affect decisions. |
| Family | 3 checked in · 1 unknown | Read-only within object scope; display source/time when they affect decisions. |
| Connection | Online | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C02 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C01 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For safety home, what do Your area, Active alert establish, and is “View active alert” available to Citizen in this scope?

**Primary visual:** Local hazard summary above family check-in and connection state

**Primary action:** View active alert → C02

**Progressive disclosure:** Keep Your area, Active alert in the decision layer. Put the supporting details for Family, Connection, full source/version history and FR-C01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a safety home fixture for Citizen; change Your area and make Connection unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View active alert” reaches C02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c02"></a>
## C02 — Alert detail

**EN:** Alert detail · **JA:** 警報の詳細  
**Requirement:** FR-C02 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Purpose:** Fire reported in Building A.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** C01, C13.  
**Output:** View guidance → C03.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C02) · [EN](../Prototype.html?lang=en#C02) · [JA](../Prototype.html?lang=ja#C02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Severity | Severe | Read-only within object scope; display source/time when they affect decisions. |
| Source | Campus command · Verified | Read-only within object scope; display source/time when they affect decisions. |
| Updated | 10:42:08 local | Read-only within object scope; display source/time when they affect decisions. |
| Instruction | Follow the approved site evacuation procedure | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C03 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C02 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For alert detail, what do Severity, Source establish, and is “View guidance” available to Citizen in this scope?

**Primary visual:** Hazard pictogram, affected place and one authoritative instruction

**Primary action:** View guidance → C03

**Progressive disclosure:** Keep Severity, Source in the decision layer. Put the supporting details for Updated, Instruction, full source/version history and FR-C02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a alert detail fixture for Citizen; change Severity and make Instruction unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View guidance” reaches C03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c03"></a>
## C03 — Evacuation guidance

**EN:** Evacuation guidance · **JA:** 避難案内  
**Requirement:** FR-C03 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** floor

**Purpose:** Use the published evacuation plan.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** C02, C04, C18.  
**Output:** I need assistance → C05.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C03) · [EN](../Prototype.html?lang=en#C03) · [JA](../Prototype.html?lang=ja#C03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Location | Building A · Floor 05 | Read-only within object scope; display source/time when they affect decisions. |
| Plan | Revision 12 · Approved | Read-only within object scope; display source/time when they affect decisions. |
| Route status | Not verified in real time | Read-only within object scope; display source/time when they affect decisions. |
| Accessible route | Refuge zone B | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C05 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C03 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For evacuation guidance, what do Location, Plan establish, and is “I need assistance” available to Citizen in this scope?

**Primary visual:** Floor schematic with current position uncertainty, blocked corridor and accessible refuge

**Primary action:** I need assistance → C05

**Progressive disclosure:** Keep Location, Plan in the decision layer. Put the supporting details for Route status, Accessible route, full source/version history and FR-C03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** If route approval, floor or hazard freshness becomes invalid, withdraw the route line and show assistance/refuge options validated for the site.

**V2 acceptance scenario:** Use a evacuation guidance fixture for Citizen; change Location and make Accessible route unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “I need assistance” reaches C05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c04"></a>
## C04 — Voice & accessible guidance

**EN:** Voice & accessible guidance · **JA:** 音声案内  
**Requirement:** FR-C04 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Read or listen to the same instruction.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Return to plan → C03.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C04) · [EN](../Prototype.html?lang=en#C04) · [JA](../Prototype.html?lang=ja#C04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Language | English | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Audio | Manual play | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Transcript | Follow the approved evacuation plan | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Haptics | Enabled | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C03 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C04 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For voice & accessible guidance, what do Language, Audio establish, and is “Return to plan” available to Citizen in this scope?

**Primary visual:** Large audio controls paired with synchronized readable transcript

**Primary action:** Return to plan → C03

**Progressive disclosure:** Keep Language, Audio in the decision layer. Put the supporting details for Transcript, Haptics, full source/version history and FR-C04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a voice & accessible guidance fixture for Citizen; change Language and make Haptics unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Return to plan” reaches C03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c05"></a>
## C05 — SOS type

**EN:** SOS type · **JA:** 救援の種類を選択  
**Requirement:** FR-C05 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** choices

**Purpose:** What kind of help do you need?.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** C03, C38.  
**Output:** Continue with selected need → C06.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C05) · [EN](../Prototype.html?lang=en#C05) · [JA](../Prototype.html?lang=ja#C05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Fire or trapped | Urgent assistance | Read-only within object scope; display source/time when they affect decisions. |
| Medical or fall | Care assistance | Read-only within object scope; display source/time when they affect decisions. |
| Road collision | Traffic assistance | Read-only within object scope; display source/time when they affect decisions. |
| Personal threat | Discreet help | Read-only within object scope; display source/time when they affect decisions. |
| Other need | Describe your situation | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C06 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C05 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For sos type, what do Fire or trapped, Medical or fall establish, and is “Continue with selected need” available to Citizen in this scope?

**Primary visual:** Distinct fire, medical, collision and threat pictograms with short labels

**Primary action:** Continue with selected need → C06

**Progressive disclosure:** Keep Fire or trapped, Medical or fall in the decision layer. Put the supporting details for Road collision, Personal threat, Other need, full source/version history and FR-C05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a sos type fixture for Citizen; change Fire or trapped and make Other need unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Continue with selected need” reaches C06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c06"></a>
## C06 — SOS location & details

**EN:** SOS location & details · **JA:** SOSの位置と詳細  
**Requirement:** FR-C06 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Tell responders where to find you.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** C05, X02.  
**Output:** Review SOS → C07.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C06) · [EN](../Prototype.html?lang=en#C06) · [JA](../Prototype.html?lang=ja#C06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Location | Building A / 05 / Room 505 | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Accuracy | User-entered · unverified | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| People needing help | 1 | Integer within policy limits; unknown is a separate value, not coerced to 0. |
| Note | Cannot reach the corridor | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C07 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C06 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For sos location & details, what do Location, Accuracy establish, and is “Review SOS” available to Citizen in this scope?

**Primary visual:** Location pin with accuracy boundary and manual correction

**Primary action:** Review SOS → C07

**Progressive disclosure:** Keep Location, Accuracy in the decision layer. Put the supporting details for People needing help, Note, full source/version history and FR-C06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a sos location & details fixture for Citizen; change Location and make Note unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review SOS” reaches C07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c07"></a>
## C07 — Confirm SOS

**EN:** Confirm SOS · **JA:** SOS送信の確認  
**Requirement:** FR-C07 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Purpose:** Send this request to campus command?.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** C06, C26.  
**Output:** Send SOS — demo → C08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C07) · [EN](../Prototype.html?lang=en#C07) · [JA](../Prototype.html?lang=ja#C07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Category | Fire or trapped | Read-only within object scope; display source/time when they affect decisions. |
| Location | Room 505 | Read-only within object scope; display source/time when they affect decisions. |
| Recipients | Campus command | Read-only within object scope; display source/time when they affect decisions. |
| Sharing | Location and note | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C08 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C07 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For confirm sos, what do Category, Location establish, and is “Send SOS — demo” available to Citizen in this scope?

**Primary visual:** SOS review showing need, location and recipients before sending

**Primary action:** Send SOS — demo → C08

**Progressive disclosure:** Keep Category, Location in the decision layer. Put the supporting details for Recipients, Sharing, full source/version history and FR-C07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Sending may remain local pending; display server receipt separately and keep a safe alternate contact path, without repeated duplicate SOS.

**V2 acceptance scenario:** Use a confirm sos fixture for Citizen; change Category and make Sharing unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Send SOS — demo” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c08"></a>
## C08 — SOS tracking

**EN:** SOS tracking · **JA:** 救援要請の状況  
**Requirement:** FR-C08 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** timeline

**Purpose:** Your request has been received.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** C07, C10, C25, C27, C28.  
**Output:** Contact assigned team → C09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C08) · [EN](../Prototype.html?lang=en#C08) · [JA](../Prototype.html?lang=ja#C08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| 10:42:12 | Received by server | Read-only within object scope; display source/time when they affect decisions. |
| 10:42:18 | Operator acknowledged | Read-only within object scope; display source/time when they affect decisions. |
| 10:43:02 | Team assigned | Read-only within object scope; display source/time when they affect decisions. |
| Current | Awaiting team contact | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C09 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C08 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For sos tracking, what do 10:42:12, 10:42:18 establish, and is “Contact assigned team” available to Citizen in this scope?

**Primary visual:** Receipt ladder distinguishing queued, server-received and human-accepted

**Primary action:** Contact assigned team → C09

**Progressive disclosure:** Keep 10:42:12, 10:42:18 in the decision layer. Put the supporting details for 10:43:02, Current, full source/version history and FR-C08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a sos tracking fixture for Citizen; change 10:42:12 and make Current unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Contact assigned team” reaches C09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c09"></a>
## C09 — Incident conversation

**EN:** Incident conversation · **JA:** 対応チームとの会話  
**Requirement:** FR-C09 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** chat

**Purpose:** Stay connected to the response team.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** C08, C09.  
**Output:** Send demo message → C09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C09) · [EN](../Prototype.html?lang=en#C09) · [JA](../Prototype.html?lang=ja#C09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Operator | We received your location | Read-only within object scope; display source/time when they affect decisions. |
| You | I am in room 505 | Read-only within object scope; display source/time when they affect decisions. |
| System | Attachments are visible to assigned responders | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C09 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C09 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For incident conversation, what do Operator, You establish, and is “Send demo message” available to Citizen in this scope?

**Primary visual:** Incident conversation showing sender role and delivery state per message

**Primary action:** Send demo message → C09

**Progressive disclosure:** Keep Operator, You in the decision layer. Put the supporting details for System, full source/version history and FR-C09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a incident conversation fixture for Citizen; change Operator and make System unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send demo message” reaches C09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c10"></a>
## C10 — Update or cancel SOS

**EN:** Update or cancel SOS · **JA:** SOSの更新・取り消し申請  
**Requirement:** FR-C10 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Update your situation.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Submit update → C08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C10) · [EN](../Prototype.html?lang=en#C10) · [JA](../Prototype.html?lang=ja#C10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Request | SOS-041 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Action | Request cancellation | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Reason | Help arrived | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Notice | Operator will review the change | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C08 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C10 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For update or cancel sos, what do Request, Action establish, and is “Submit update” available to Citizen in this scope?

**Primary visual:** Existing SOS beside proposed update and cancellation effect

**Primary action:** Submit update → C08

**Progressive disclosure:** Keep Request, Action in the decision layer. Put the supporting details for Reason, Notice, full source/version history and FR-C10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a update or cancel sos fixture for Citizen; change Request and make Notice unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit update” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c11"></a>
## C11 — Confirm personal safety

**EN:** Confirm personal safety · **JA:** 安全状況を報告  
**Requirement:** FR-C11 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Let your circle know your status.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Confirm my safety → C12.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C11) · [EN](../Prototype.html?lang=en#C11) · [JA](../Prototype.html?lang=ja#C11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Status | I am safe | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Location | Assembly point North | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Share with | Family + Campus group | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Precision | Status only outside response team | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C12 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C11 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For confirm personal safety, what do Status, Location establish, and is “Confirm my safety” available to Citizen in this scope?

**Primary visual:** Three explicit personal-status choices with sharing precision

**Primary action:** Confirm my safety → C12

**Progressive disclosure:** Keep Status, Location in the decision layer. Put the supporting details for Share with, Precision, full source/version history and FR-C11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Personal confirmation is self-reported, audience-scoped and timestamped; it must not mark an entire household or incident safe.

**V2 acceptance scenario:** Use a confirm personal safety fixture for Citizen; change Status and make Precision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Confirm my safety” reaches C12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c12"></a>
## C12 — Safety receipt

**EN:** Safety receipt · **JA:** 安全報告の受領確認  
**Requirement:** FR-C12 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** success

**Purpose:** Your safety update was saved.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** C11.  
**Output:** View delivery details → C13.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C12) · [EN](../Prototype.html?lang=en#C12) · [JA](../Prototype.html?lang=ja#C12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Personal status | Self-reported safe | Read-only within object scope; display source/time when they affect decisions. |
| Groups | 2 updates queued | Read-only within object scope; display source/time when they affect decisions. |
| Contacts | 3 delivery attempts | Read-only within object scope; display source/time when they affect decisions. |
| Incident | Still active | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C13 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C12 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For safety receipt, what do Personal status, Groups establish, and is “View delivery details” available to Citizen in this scope?

**Primary visual:** Personal report and separate delivery receipts for each audience

**Primary action:** View delivery details → C13

**Progressive disclosure:** Keep Personal status, Groups in the decision layer. Put the supporting details for Contacts, Incident, full source/version history and FR-C12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a safety receipt fixture for Citizen; change Personal status and make Incident unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View delivery details” reaches C13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c13"></a>
## C13 — Notification inbox

**EN:** Notification inbox · **JA:** 通知一覧  
**Requirement:** FR-C13 / WF-10 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Purpose:** Updates that need your attention.  
**Key rule:** Sent does not mean delivered, read or acknowledged by a person.  
**Entry:** C12.  
**Output:** Open alert → C02.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C13) · [EN](../Prototype.html?lang=en#C13) · [JA](../Prototype.html?lang=ja#C13)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Fire alert | Read · 10:42 | Read-only within object scope; display source/time when they affect decisions. |
| Safety confirmation | Saved · 10:45 | Read-only within object scope; display source/time when they affect decisions. |
| Family update | Delivered · 10:45 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C13:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C02 with a valid payload/version, and verify that it is blocked when the guard for WF-10 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C13 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For notification inbox, what do Fire alert, Safety confirmation establish, and is “Open alert” available to Citizen in this scope?

**Primary visual:** Alert inbox ordered by urgency with source and expiration

**Primary action:** Open alert → C02

**Progressive disclosure:** Keep Fire alert, Safety confirmation in the decision layer. Put the supporting details for Family update, full source/version history and FR-C13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a notification inbox fixture for Citizen; change Fire alert and make Family update unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open alert” reaches C02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c14"></a>
## C14 — Nearby hazards

**EN:** Nearby hazards · **JA:** 周辺の危険情報  
**Requirement:** FR-C14 / WF-08 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** map

**Purpose:** Know what is happening nearby.  
**Key rule:** Preserve issuer, validity and warning update or cancellation history.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** View hazard → C15.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C14) · [EN](../Prototype.html?lang=en#C14) · [JA](../Prototype.html?lang=ja#C14)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Flood watch | 2 km · official feed | Read-only within object scope; display source/time when they affect decisions. |
| Road closure | 500 m · verified operator | Read-only within object scope; display source/time when they affect decisions. |
| Fire | Campus A · active | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C14:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C15 with a valid payload/version, and verify that it is blocked when the guard for WF-08 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C14 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For nearby hazards, what do Flood watch, Road closure establish, and is “View hazard” available to Citizen in this scope?

**Primary visual:** Nearby hazard map with list equivalent and measured distance uncertainty

**Primary action:** View hazard → C15

**Progressive disclosure:** Keep Flood watch, Road closure in the decision layer. Put the supporting details for Fire, full source/version history and FR-C14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a nearby hazards fixture for Citizen; change Flood watch and make Fire unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “View hazard” reaches C15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c15"></a>
## C15 — Disaster advisory

**EN:** Disaster advisory · **JA:** 災害情報  
**Requirement:** FR-C15 / WF-08 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Purpose:** Flood watch for Riverside district.  
**Key rule:** Preserve issuer, validity and warning update or cancellation history.  
**Entry:** C14.  
**Output:** View shelter information → C16.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C15) · [EN](../Prototype.html?lang=en#C15) · [JA](../Prototype.html?lang=ja#C15)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Source | Approved authority feed | Read-only within object scope; display source/time when they affect decisions. |
| Certainty | Likely | Read-only within object scope; display source/time when they affect decisions. |
| Valid until | 18:00 local | Read-only within object scope; display source/time when they affect decisions. |
| Area | Riverside polygon | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C15:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C16 with a valid payload/version, and verify that it is blocked when the guard for WF-08 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C15 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For disaster advisory, what do Source, Certainty establish, and is “View shelter information” available to Citizen in this scope?

**Primary visual:** Advisory boundary and validity band beside source certainty

**Primary action:** View shelter information → C16

**Progressive disclosure:** Keep Source, Certainty in the decision layer. Put the supporting details for Valid until, Area, full source/version history and FR-C15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a disaster advisory fixture for Citizen; change Source and make Area unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View shelter information” reaches C16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c16"></a>
## C16 — Shelters & assembly points

**EN:** Shelters & assembly points · **JA:** 避難所と集合場所  
**Requirement:** FR-C16 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** map

**Purpose:** Find a designated assistance point.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** C15.  
**Output:** Open shelter details → C17.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C16) · [EN](../Prototype.html?lang=en#C16) · [JA](../Prototype.html?lang=ja#C16)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| North shelter | Open · updated 5 min ago | Read-only within object scope; display source/time when they affect decisions. |
| West center | Capacity unknown | Read-only within object scope; display source/time when they affect decisions. |
| Campus North | Assembly point | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C16:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C17 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C16 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For shelters & assembly points, what do North shelter, West center establish, and is “Open shelter details” available to Citizen in this scope?

**Primary visual:** Shelter cards comparing accessibility, current availability and distance

**Primary action:** Open shelter details → C17

**Progressive disclosure:** Keep North shelter, West center in the decision layer. Put the supporting details for Campus North, full source/version history and FR-C16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a shelters & assembly points fixture for Citizen; change North shelter and make Campus North unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open shelter details” reaches C17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c17"></a>
## C17 — Shelter details

**EN:** Shelter details · **JA:** 避難所の詳細  
**Requirement:** FR-C17 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** detail

**Purpose:** North shelter.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** C16.  
**Output:** Save shelter offline → C18.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C17) · [EN](../Prototype.html?lang=en#C17) · [JA](../Prototype.html?lang=ja#C17)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Status | Open · confirmed by operator | Read-only within object scope; display source/time when they affect decisions. |
| Accessibility | Step-free entrance | Read-only within object scope; display source/time when they affect decisions. |
| Capacity | 80 available · estimate | Read-only within object scope; display source/time when they affect decisions. |
| Address | 12 Harbor Road | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C17:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C18 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C17 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For shelter details, what do Status, Accessibility establish, and is “Save shelter offline” available to Citizen in this scope?

**Primary visual:** Shelter entrance diagram and verified access/capacity status

**Primary action:** Save shelter offline → C18

**Progressive disclosure:** Keep Status, Accessibility in the decision layer. Put the supporting details for Capacity, Address, full source/version history and FR-C17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a shelter details fixture for Citizen; change Status and make Address unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save shelter offline” reaches C18 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c18"></a>
## C18 — Offline safety pack

**EN:** Offline safety pack · **JA:** オフライン安全情報  
**Requirement:** FR-C18 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Purpose:** Essential information on your device.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** C17, X05.  
**Output:** Review cached plan → C03.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C18) · [EN](../Prototype.html?lang=en#C18) · [JA](../Prototype.html?lang=ja#C18)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Campus plan | Revision 12 · downloaded | Read-only within object scope; display source/time when they affect decisions. |
| Contacts | 3 saved | Read-only within object scope; display source/time when they affect decisions. |
| Guidance | English · version 4 | Read-only within object scope; display source/time when they affect decisions. |
| Last sync | Today 09:00 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C18:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C03 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C18 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For offline safety pack, what do Campus plan, Contacts establish, and is “Review cached plan” available to Citizen in this scope?

**Primary visual:** Offline pack contents with version and last synchronization age

**Primary action:** Review cached plan → C03

**Progressive disclosure:** Keep Campus plan, Contacts in the decision layer. Put the supporting details for Guidance, Last sync, full source/version history and FR-C18 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a offline safety pack fixture for Citizen; change Campus plan and make Last sync unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review cached plan” reaches C03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c19"></a>
## C19 — My circles

**EN:** My circles · **JA:** マイグループ  
**Requirement:** FR-C19 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** cards

**Purpose:** The people who should hear from you.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** C21, C33.  
**Output:** Open family → C20.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C19) · [EN](../Prototype.html?lang=en#C19) · [JA](../Prototype.html?lang=ja#C19)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Family | 4 members | Read-only within object scope; display source/time when they affect decisions. |
| Campus | 24 members | Read-only within object scope; display source/time when they affect decisions. |
| Travel team | 6 members | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C19:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C20 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C19 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For my circles, what do Family, Campus establish, and is “Open family” available to Citizen in this scope?

**Primary visual:** Circle membership summary with outstanding check-in count

**Primary action:** Open family → C20

**Progressive disclosure:** Keep Family, Campus in the decision layer. Put the supporting details for Travel team, full source/version history and FR-C19 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a my circles fixture for Citizen; change Family and make Travel team unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open family” reaches C20 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c20"></a>
## C20 — Circle conversation

**EN:** Circle conversation · **JA:** グループチャット  
**Requirement:** FR-C20 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** chat

**Purpose:** Family.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** C19, C22.  
**Output:** View member status → C22.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C20) · [EN](../Prototype.html?lang=en#C20) · [JA](../Prototype.html?lang=ja#C20)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| System | Alex reported safe at 10:45 | Read-only within object scope; display source/time when they affect decisions. |
| Jamie | Thank you for letting us know | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | My status is unknown | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C20:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C22 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C20 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For circle conversation, what do System, Jamie establish, and is “View member status” available to Citizen in this scope?

**Primary visual:** Group conversation with member check-in context

**Primary action:** View member status → C22

**Progressive disclosure:** Keep System, Jamie in the decision layer. Put the supporting details for Morgan, full source/version history and FR-C20 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a circle conversation fixture for Citizen; change System and make Morgan unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “View member status” reaches C22 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c21"></a>
## C21 — Create or edit circle

**EN:** Create or edit circle · **JA:** グループの作成・編集  
**Requirement:** FR-C21 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Choose members and sharing rules.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save circle → C19.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C21) · [EN](../Prototype.html?lang=en#C21) · [JA](../Prototype.html?lang=ja#C21)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Name | Family | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Membership | Invite only | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Safety updates | Enabled | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Location sharing | Off by default | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C21:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C19 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C21 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For create or edit circle, what do Name, Membership establish, and is “Save circle” available to Citizen in this scope?

**Primary visual:** Circle membership and sharing scope preview

**Primary action:** Save circle → C19

**Progressive disclosure:** Keep Name, Membership in the decision layer. Put the supporting details for Safety updates, Location sharing, full source/version history and FR-C21 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a create or edit circle fixture for Citizen; change Name and make Location sharing unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save circle” reaches C19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c22"></a>
## C22 — Circle member status

**EN:** Circle member status · **JA:** メンバーの状況  
**Requirement:** FR-C22 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Purpose:** A status is a report, not a guarantee.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** C20.  
**Output:** Send check-in request → C20.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C22) · [EN](../Prototype.html?lang=en#C22) · [JA](../Prototype.html?lang=ja#C22)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Alex | Self-reported safe · 10:45 | Read-only within object scope; display source/time when they affect decisions. |
| Jamie | Self-reported safe · 10:40 | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | Unknown · no recent report | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C22:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C20 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C22 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For circle member status, what do Alex, Jamie establish, and is “Send check-in request” available to Citizen in this scope?

**Primary visual:** Member status board separating reported safe from unknown

**Primary action:** Send check-in request → C20

**Progressive disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, full source/version history and FR-C22 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a circle member status fixture for Citizen; change Alex and make Morgan unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send check-in request” reaches C20 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c23"></a>
## C23 — Emergency contacts

**EN:** Emergency contacts · **JA:** 緊急連絡先  
**Requirement:** FR-C23 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Who should receive your updates?.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save contacts → C01.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C23) · [EN](../Prototype.html?lang=en#C23) · [JA](../Prototype.html?lang=ja#C23)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Primary | Jamie · verified | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Secondary | Morgan · pending | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Channel | Push then SMS | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Share | Status only | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C23:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C01 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C23 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For emergency contacts, what do Primary, Secondary establish, and is “Save contacts” available to Citizen in this scope?

**Primary visual:** Contact order with channel pictograms and disclosure preview

**Primary action:** Save contacts → C01

**Progressive disclosure:** Keep Primary, Secondary in the decision layer. Put the supporting details for Channel, Share, full source/version history and FR-C23 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a emergency contacts fixture for Citizen; change Primary and make Share unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save contacts” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c24"></a>
## C24 — Care & fall detection

**EN:** Care & fall detection · **JA:** 見守りと転倒検知  
**Requirement:** FR-C24 / WF-06 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Configure a supported fall detector.  
**Key rule:** No response requires escalation, not an automatic medical conclusion.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review test alert → C25.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C24) · [EN](../Prototype.html?lang=en#C24) · [JA](../Prototype.html?lang=ja#C24)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Wearable | WR-401 · paired | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Detection | Enabled | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Check-in window | 30 seconds | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |
| Escalation | Care team then campus command | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C24:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C25 with a valid payload/version, and verify that it is blocked when the guard for WF-06 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C24 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For care & fall detection, what do Wearable, Detection establish, and is “Review test alert” available to Citizen in this scope?

**Primary visual:** Wearable connection and fall-check-in escalation sequence

**Primary action:** Review test alert → C25

**Progressive disclosure:** Keep Wearable, Detection in the decision layer. Put the supporting details for Check-in window, Escalation, full source/version history and FR-C24 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a care & fall detection fixture for Citizen; change Wearable and make Escalation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review test alert” reaches C25 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c25"></a>
## C25 — Possible fall check-in

**EN:** Possible fall check-in · **JA:** 転倒の可能性を確認  
**Requirement:** FR-C25 / WF-06 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** countdown

**Purpose:** A possible fall was detected.  
**Key rule:** No response requires escalation, not an automatic medical conclusion.  
**Entry:** C24.  
**Output:** I need help now → C08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C25) · [EN](../Prototype.html?lang=en#C25) · [JA](../Prototype.html?lang=ja#C25)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Evidence | Wearable signal · unverified | Read-only within object scope; display source/time when they affect decisions. |
| Check-in window | 30 seconds | Read-only within object scope; display source/time when they affect decisions. |
| No response | Notify care team | Read-only within object scope; display source/time when they affect decisions. |
| Alternative | Get help now | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C25:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C08 with a valid payload/version, and verify that it is blocked when the guard for WF-06 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C25 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For possible fall check-in, what do Evidence, Check-in window establish, and is “I need help now” available to Citizen in this scope?

**Primary visual:** Fall check-in with large help and dismiss controls and time remaining

**Primary action:** I need help now → C08

**Progressive disclosure:** Keep Evidence, Check-in window in the decision layer. Put the supporting details for No response, Alternative, full source/version history and FR-C25 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** No response remains unconfirmed; a stopped timer is not a help receipt, and accessibility must not depend on a press-and-hold gesture.

**V2 acceptance scenario:** Use a possible fall check-in fixture for Citizen; change Evidence and make Alternative unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “I need help now” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c26"></a>
## C26 — Road incident report

**EN:** Road incident report · **JA:** 交通事故の報告  
**Requirement:** FR-C26 / WF-07 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Report a road incident safely.  
**Key rule:** Verify location and road direction; injury status may remain unknown.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review SOS → C07.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C26) · [EN](../Prototype.html?lang=en#C26) · [JA](../Prototype.html?lang=ja#C26)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Position | User-confirmed map pin | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Direction | Northbound | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Vehicles | 2 | Integer within policy limits; unknown is a separate value, not coerced to 0. |
| Injuries | Unknown | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Attachment | Optional photo | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C26:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C07 with a valid payload/version, and verify that it is blocked when the guard for WF-07 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C26 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For road incident report, what do Position, Direction establish, and is “Review SOS” available to Citizen in this scope?

**Primary visual:** Road orientation sketch with manual direction and injury entry

**Primary action:** Review SOS → C07

**Progressive disclosure:** Keep Position, Direction in the decision layer. Put the supporting details for Vehicles, Injuries, Attachment, full source/version history and FR-C26 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a road incident report fixture for Citizen; change Position and make Attachment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review SOS” reaches C07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c27"></a>
## C27 — Discreet assistance

**EN:** Discreet assistance · **JA:** 目立たない救援要請  
**Requirement:** FR-C27 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Purpose:** Request help with a quiet interface.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Send discreet request — demo → C08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C27) · [EN](../Prototype.html?lang=en#C27) · [JA](../Prototype.html?lang=ja#C27)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Sound | Off | Read-only within object scope; display source/time when they affect decisions. |
| Haptics | Off | Read-only within object scope; display source/time when they affect decisions. |
| Sharing | Assigned operator only | Read-only within object scope; display source/time when they affect decisions. |
| Location | Approximate · 40 m | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C27:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C08 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C27 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For discreet assistance, what do Sound, Haptics establish, and is “Send discreet request — demo” available to Citizen in this scope?

**Primary visual:** Quiet high-contrast assistance controls showing sound and vibration state

**Primary action:** Send discreet request — demo → C08

**Progressive disclosure:** Keep Sound, Haptics in the decision layer. Put the supporting details for Sharing, Location, full source/version history and FR-C27 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Never autoplay speech or vibration against the discreet selection; reveal pending versus received without a conspicuous success animation.

**V2 acceptance scenario:** Use a discreet assistance fixture for Citizen; change Sound and make Location unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Send discreet request — demo” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c28"></a>
## C28 — My reports & history

**EN:** My reports & history · **JA:** 要請履歴  
**Requirement:** FR-C28 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Purpose:** Your previous requests.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** View request → C08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C28) · [EN](../Prototype.html?lang=en#C28) · [JA](../Prototype.html?lang=ja#C28)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| SOS-041 | Active · fire assistance | Read-only within object scope; display source/time when they affect decisions. |
| SOS-028 | Closed · road incident | Read-only within object scope; display source/time when they affect decisions. |
| Check-in | Safe · yesterday | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C28:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C08 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C28 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For my reports & history, what do SOS-041, SOS-028 establish, and is “View request” available to Citizen in this scope?

**Primary visual:** Personal request history showing open, resolved and pending receipts

**Primary action:** View request → C08

**Progressive disclosure:** Keep SOS-041, SOS-028 in the decision layer. Put the supporting details for Check-in, full source/version history and FR-C28 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a my reports & history fixture for Citizen; change SOS-041 and make Check-in unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “View request” reaches C08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c29"></a>
## C29 — Privacy & data requests

**EN:** Privacy & data requests · **JA:** プライバシーとデータ  
**Requirement:** FR-C29 / WF-19 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Control optional sharing.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** C30.  
**Output:** Review data request → C30.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C29) · [EN](../Prototype.html?lang=en#C29) · [JA](../Prototype.html?lang=ja#C29)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Live location | Off | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Circle visibility | Status only | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Export | Request a copy | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Deletion | Subject to incident retention review | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C29:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C30 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C29 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For privacy & data requests, what do Live location, Circle visibility establish, and is “Review data request” available to Citizen in this scope?

**Primary visual:** Privacy scope preview showing live location and export/deletion choices

**Primary action:** Review data request → C30

**Progressive disclosure:** Keep Live location, Circle visibility in the decision layer. Put the supporting details for Export, Deletion, full source/version history and FR-C29 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a privacy & data requests fixture for Citizen; change Live location and make Deletion unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review data request” reaches C30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c30"></a>
## C30 — Data request receipt

**EN:** Data request receipt · **JA:** データ申請の受領確認  
**Requirement:** FR-C30 / WF-19 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** detail

**Purpose:** Request DR-202 received.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** C29, T10.  
**Output:** Back to privacy → C29.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C30) · [EN](../Prototype.html?lang=en#C30) · [JA](../Prototype.html?lang=ja#C30)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Type | Export personal data | Read-only within object scope; display source/time when they affect decisions. |
| Scope | Profile and eligible records | Read-only within object scope; display source/time when they affect decisions. |
| Status | Verification pending | Read-only within object scope; display source/time when they affect decisions. |
| Delivery | Secure download link after review | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C30:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C29 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C30 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For data request receipt, what do Type, Scope establish, and is “Back to privacy” available to Citizen in this scope?

**Primary visual:** Data request progress and verified delivery destination

**Primary action:** Back to privacy → C29

**Progressive disclosure:** Keep Type, Scope in the decision layer. Put the supporting details for Status, Delivery, full source/version history and FR-C30 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a data request receipt fixture for Citizen; change Type and make Delivery unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Back to privacy” reaches C29 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r01"></a>
## R01 — Shift & readiness

**EN:** Shift & readiness · **JA:** 勤務と対応準備  
**Requirement:** FR-R01 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** home

**Purpose:** Ready for your next assignment.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R08.  
**Output:** View assignments → R02.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R01) · [EN](../Prototype.html?lang=en#R01) · [JA](../Prototype.html?lang=ja#R01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Unit | Rescue 02 | Read-only within object scope; display source/time when they affect decisions. |
| Shift | 10:00–18:00 | Read-only within object scope; display source/time when they affect decisions. |
| Capabilities | Fire · assisted evacuation | Read-only within object scope; display source/time when they affect decisions. |
| Readiness | Available | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R02 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R01 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For shift & readiness, what do Unit, Shift establish, and is “View assignments” available to Responder in this scope?

**Primary visual:** Unit readiness checklist with capability and shift status

**Primary action:** View assignments → R02

**Progressive disclosure:** Keep Unit, Shift in the decision layer. Put the supporting details for Capabilities, Readiness, full source/version history and FR-R01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a shift & readiness fixture for Responder; change Unit and make Readiness unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View assignments” reaches R02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r02"></a>
## R02 — Assignment inbox

**EN:** Assignment inbox · **JA:** 担当任務  
**Requirement:** FR-R02 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** list

**Purpose:** Assignments for Rescue 02.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R01, R12.  
**Output:** Open assignment → R03.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R02) · [EN](../Prototype.html?lang=en#R02) · [JA](../Prototype.html?lang=ja#R02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| INC-2041 | Fire · Building A · P1 | Read-only within object scope; display source/time when they affect decisions. |
| INC-2037 | Welfare check · P2 | Read-only within object scope; display source/time when they affect decisions. |
| Coverage | Campus east | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R03 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R02 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For assignment inbox, what do INC-2041, INC-2037 establish, and is “Open assignment” available to Responder in this scope?

**Primary visual:** Assignment queue ranked by urgency and acceptance deadline

**Primary action:** Open assignment → R03

**Progressive disclosure:** Keep INC-2041, INC-2037 in the decision layer. Put the supporting details for Coverage, full source/version history and FR-R02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a assignment inbox fixture for Responder; change INC-2041 and make Coverage unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open assignment” reaches R03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r03"></a>
## R03 — Accept or decline task

**EN:** Accept or decline task · **JA:** 任務の受諾  
**Requirement:** FR-R03 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** detail

**Purpose:** Assist person at Room 505.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R02.  
**Output:** Accept assignment → R04.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R03) · [EN](../Prototype.html?lang=en#R03) · [JA](../Prototype.html?lang=ja#R03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Incident | INC-2041 | Read-only within object scope; display source/time when they affect decisions. |
| Person | Alex · SOS-041 | Read-only within object scope; display source/time when they affect decisions. |
| Location | User-reported · 05 / 505 | Read-only within object scope; display source/time when they affect decisions. |
| Hazards | Smoke report · not confirmed | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R04 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R03 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For accept or decline task, what do Incident, Person establish, and is “Accept assignment” available to Responder in this scope?

**Primary visual:** Task identity, person location and hazard summary above accept/decline

**Primary action:** Accept assignment → R04

**Progressive disclosure:** Keep Incident, Person in the decision layer. Put the supporting details for Location, Hazards, full source/version history and FR-R03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a accept or decline task fixture for Responder; change Incident and make Hazards unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Accept assignment” reaches R04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r04"></a>
## R04 — Navigation & arrival

**EN:** Navigation & arrival · **JA:** 進入経路と現場到着  
**Requirement:** FR-R04 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** map

**Purpose:** Building A · East access.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R03.  
**Output:** Report arrival → R05.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R04) · [EN](../Prototype.html?lang=en#R04) · [JA](../Prototype.html?lang=ja#R04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Assignment | Accepted | Read-only within object scope; display source/time when they affect decisions. |
| Destination | Entrance E2 | Read-only within object scope; display source/time when they affect decisions. |
| Location freshness | 8 seconds | Read-only within object scope; display source/time when they affect decisions. |
| Route | Operator-approved access plan | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R05 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R04 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For navigation & arrival, what do Assignment, Destination establish, and is “Report arrival” available to Responder in this scope?

**Primary visual:** Destination and approach map showing route validity and arrival action

**Primary action:** Report arrival → R05

**Progressive disclosure:** Keep Assignment, Destination in the decision layer. Put the supporting details for Location freshness, Route, full source/version history and FR-R04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a navigation & arrival fixture for Responder; change Assignment and make Route unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Report arrival” reaches R05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r05"></a>
## R05 — Field situation

**EN:** Field situation · **JA:** 現場の状況  
**Requirement:** FR-R05 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** floor

**Purpose:** Floor 05 response context.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R04.  
**Output:** Open assistance record → R06.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R05) · [EN](../Prototype.html?lang=en#R05) · [JA](../Prototype.html?lang=ja#R05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Open SOS | 1 | Read-only within object scope; display source/time when they affect decisions. |
| Blocked area | East corridor · reported | Read-only within object scope; display source/time when they affect decisions. |
| Plan | Revision 12 | Read-only within object scope; display source/time when they affect decisions. |
| Team | Rescue 02 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R06 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R05 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For field situation, what do Open SOS, Blocked area establish, and is “Open assistance record” available to Responder in this scope?

**Primary visual:** Field floor map with blocked zones, open SOS and teammate locations

**Primary action:** Open assistance record → R06

**Progressive disclosure:** Keep Open SOS, Blocked area in the decision layer. Put the supporting details for Plan, Team, full source/version history and FR-R05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a field situation fixture for Responder; change Open SOS and make Team unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open assistance record” reaches R06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r06"></a>
## R06 — Assistance & triage record

**EN:** Assistance & triage record · **JA:** 現場支援の記録  
**Requirement:** FR-R06 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** form

**Purpose:** Record observations, not diagnosis.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R05, H12.  
**Output:** Save observation → R07.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R06) · [EN](../Prototype.html?lang=en#R06) · [JA](../Prototype.html?lang=ja#R06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Person | Alex Morgan | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Contact | Established | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Condition | Needs mobility assistance | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Action | Assisting to assembly point | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R07 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R06 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For assistance & triage record, what do Person, Contact establish, and is “Save observation” available to Responder in this scope?

**Primary visual:** Person-centered observation form with condition and assistance actions

**Primary action:** Save observation → R07

**Progressive disclosure:** Keep Person, Contact in the decision layer. Put the supporting details for Condition, Action, full source/version history and FR-R06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a assistance & triage record fixture for Responder; change Person and make Action unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save observation” reaches R07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r07"></a>
## R07 — Task status & handover

**EN:** Task status & handover · **JA:** 任務状況と引き継ぎ  
**Requirement:** FR-R07 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** form

**Purpose:** Hand over with a clear record.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R06.  
**Output:** Submit handover → R08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R07) · [EN](../Prototype.html?lang=en#R07) · [JA](../Prototype.html?lang=ja#R07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Task | Rescue-112 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| State | Assistance completed | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Receiver | Assembly team North | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Evidence | 10:48 · responder report | Read-only from the authoritative source/version; cannot be edited in this form. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R08 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R07 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For task status & handover, what do Task, State establish, and is “Submit handover” available to Responder in this scope?

**Primary visual:** Task handover timeline showing receiver acceptance separately

**Primary action:** Submit handover → R08

**Progressive disclosure:** Keep Task, State in the decision layer. Put the supporting details for Receiver, Evidence, full source/version history and FR-R07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a task status & handover fixture for Responder; change Task and make Evidence unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit handover” reaches R08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r08"></a>
## R08 — Task completion

**EN:** Task completion · **JA:** 任務の完了  
**Requirement:** FR-R08 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** success

**Purpose:** Assignment completed.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R07.  
**Output:** Back to shift → R01.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R08) · [EN](../Prototype.html?lang=en#R08) · [JA](../Prototype.html?lang=ja#R08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Person | Responder-confirmed assisted | Read-only within object scope; display source/time when they affect decisions. |
| Handover | Assembly team North | Read-only within object scope; display source/time when they affect decisions. |
| Incident | Still active | Read-only within object scope; display source/time when they affect decisions. |
| Next | Return to availability | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R01 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R08 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For task completion, what do Person, Handover establish, and is “Back to shift” available to Responder in this scope?

**Primary visual:** Completion evidence and receiving team acknowledgment

**Primary action:** Back to shift → R01

**Progressive disclosure:** Keep Person, Handover in the decision layer. Put the supporting details for Incident, Next, full source/version history and FR-R08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a task completion fixture for Responder; change Person and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Back to shift” reaches R01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r09"></a>
## R09 — Team communications

**EN:** Team communications · **JA:** チーム連絡  
**Requirement:** FR-R09 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** chat

**Purpose:** Incident channel · INC-2041.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R09.  
**Output:** Send demo message → R09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R09) · [EN](../Prototype.html?lang=en#R09) · [JA](../Prototype.html?lang=ja#R09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Command | Use entrance E2 | Read-only within object scope; display source/time when they affect decisions. |
| Rescue 02 | At floor 05 | Read-only within object scope; display source/time when they affect decisions. |
| System | Only assigned teams can view this channel | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R09 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R09 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For team communications, what do Command, Rescue 02 establish, and is “Send demo message” available to Responder in this scope?

**Primary visual:** Team channel with command identity and pending message markers

**Primary action:** Send demo message → R09

**Progressive disclosure:** Keep Command, Rescue 02 in the decision layer. Put the supporting details for System, full source/version history and FR-R09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a team communications fixture for Responder; change Command and make System unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Send demo message” reaches R09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r10"></a>
## R10 — Evidence capture

**EN:** Evidence capture · **JA:** 証拠の記録  
**Requirement:** FR-R10 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** form

**Purpose:** Attach a field observation.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** X10.  
**Output:** Queue attachment → R11.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R10) · [EN](../Prototype.html?lang=en#R10) · [JA](../Prototype.html?lang=ja#R10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Type | Photo | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Incident | INC-2041 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Caption | Corridor condition at arrival | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Privacy | Restricted incident evidence | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R11 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R10 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For evidence capture, what do Type, Incident establish, and is “Queue attachment” available to Responder in this scope?

**Primary visual:** Evidence preview with incident binding and privacy redaction

**Primary action:** Queue attachment → R11

**Progressive disclosure:** Keep Type, Incident in the decision layer. Put the supporting details for Caption, Privacy, full source/version history and FR-R10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a evidence capture fixture for Responder; change Type and make Privacy unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Queue attachment” reaches R11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r11"></a>
## R11 — Offline outbox

**EN:** Offline outbox · **JA:** 同期待ちデータ  
**Requirement:** FR-R11 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** list

**Purpose:** Updates waiting to sync.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R10, X01.  
**Output:** Resolve sync conflict → R12.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R11) · [EN](../Prototype.html?lang=en#R11) · [JA](../Prototype.html?lang=ja#R11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Observation | Queued · 10:47 | Read-only within object scope; display source/time when they affect decisions. |
| Photo | Queued · 2 MB | Read-only within object scope; display source/time when they affect decisions. |
| Status update | Conflict requires review | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R12 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R11 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For offline outbox, what do Observation, Photo establish, and is “Resolve sync conflict” available to Responder in this scope?

**Primary visual:** Outbox grouped by queued, retryable and conflicting items

**Primary action:** Resolve sync conflict → R12

**Progressive disclosure:** Keep Observation, Photo in the decision layer. Put the supporting details for Status update, full source/version history and FR-R11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a offline outbox fixture for Responder; change Observation and make Status update unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Resolve sync conflict” reaches R12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="r12"></a>
## R12 — Resolve field conflict

**EN:** Resolve field conflict · **JA:** 同期競合の解決  
**Requirement:** FR-R12 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** detail

**Purpose:** A newer assignment state exists.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** R11.  
**Output:** Keep note and refresh → R02.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#R12) · [EN](../Prototype.html?lang=en#R12) · [JA](../Prototype.html?lang=ja#R12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Local | Task in progress · 10:47 | Read-only within object scope; display source/time when they affect decisions. |
| Server | Task reassigned · 10:48 | Read-only within object scope; display source/time when they affect decisions. |
| Your note | Preserved as observation | Read-only within object scope; display source/time when they affect decisions. |
| Action | Refresh task ownership | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-R12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R02 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### R12 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For resolve field conflict, what do Local, Server establish, and is “Keep note and refresh” available to Responder in this scope?

**Primary visual:** Local observation beside server change with preserve-note option

**Primary action:** Keep note and refresh → R02

**Progressive disclosure:** Keep Local, Server in the decision layer. Put the supporting details for Your note, Action, full source/version history and FR-R12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain the field observation locally with its incident binding; do not show task acceptance or handover completion without the receiving actor’s receipt.

**V2 acceptance scenario:** Use a resolve field conflict fixture for Responder; change Local and make Action unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Keep note and refresh” reaches R02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o01"></a>
## O01 — Command overview

**EN:** Command overview · **JA:** 指令ダッシュボード  
**Requirement:** FR-O01 / WF-20 · **Actor:** Operator · **Surface:** Command · **Layout:** dashboard

**Purpose:** Every signal. One coordinated response..  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** A04, O25, X09.  
**Output:** Open priority incident → O04.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O01) · [EN](../Prototype.html?lang=en#O01) · [JA](../Prototype.html?lang=ja#O01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Active incidents | 12 | Read-only within object scope; display source/time when they affect decisions. |
| Unacknowledged P1 | 2 | Read-only within object scope; display source/time when they affect decisions. |
| Open SOS | 7 | Read-only within object scope; display source/time when they affect decisions. |
| Available units | 18 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O04 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O01 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For command overview, what do Active incidents, Unacknowledged P1 establish, and is “Open priority incident” available to Operator in this scope?

**Primary visual:** Priority incident strip, capacity board and site situation map

**Primary action:** Open priority incident → O04

**Progressive disclosure:** Keep Active incidents, Unacknowledged P1 in the decision layer. Put the supporting details for Open SOS, Available units, full source/version history and FR-O01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a command overview fixture for Operator; change Active incidents and make Available units unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open priority incident” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o02"></a>
## O02 — Live situation map

**EN:** Live situation map · **JA:** 状況マップ  
**Requirement:** FR-O02 / WF-20 · **Actor:** Operator · **Surface:** Command · **Layout:** map

**Purpose:** See incidents across your authorized region.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open incident → O04.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O02) · [EN](../Prototype.html?lang=en#O02) · [JA](../Prototype.html?lang=ja#O02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Fire | Building A · P1 | Read-only within object scope; display source/time when they affect decisions. |
| Flood | River district · P2 | Read-only within object scope; display source/time when they affect decisions. |
| Road collision | Harbor Road · P1 | Read-only within object scope; display source/time when they affect decisions. |
| Map freshness | 12 seconds | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O04 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O02 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For live situation map, what do Fire, Flood establish, and is “Open incident” available to Operator in this scope?

**Primary visual:** Multi-incident geographic map with event freshness by layer

**Primary action:** Open incident → O04

**Progressive disclosure:** Keep Fire, Flood in the decision layer. Put the supporting details for Road collision, Map freshness, full source/version history and FR-O02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a live situation map fixture for Operator; change Fire and make Map freshness unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open incident” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o03"></a>
## O03 — Signal triage queue

**EN:** Signal triage queue · **JA:** 信号の確認待ち  
**Requirement:** FR-O03 / WF-03 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Purpose:** Separate evidence from assumptions.  
**Key rule:** Preserve source, time and ID; duplicates do not create new effects.  
**Entry:** S14.  
**Output:** Inspect signal → O05.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O03) · [EN](../Prototype.html?lang=en#O03) · [JA](../Prototype.html?lang=ja#O03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| EV-3101 | Camera flame · confidence 0.82 | Read-only within object scope; display source/time when they affect decisions. |
| EV-3102 | Smoke sensor · threshold exceeded | Read-only within object scope; display source/time when they affect decisions. |
| EV-3103 | Wearable fall · unverified | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O05 with a valid payload/version, and verify that it is blocked when the guard for WF-03 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O03 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For signal triage queue, what do EV-3101, EV-3102 establish, and is “Inspect signal” available to Operator in this scope?

**Primary visual:** Signal evidence queue showing duplicate suspicion and source quality

**Primary action:** Inspect signal → O05

**Progressive disclosure:** Keep EV-3101, EV-3102 in the decision layer. Put the supporting details for EV-3103, full source/version history and FR-O03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a signal triage queue fixture for Operator; change EV-3101 and make EV-3103 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Inspect signal” reaches O05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o04"></a>
## O04 — Incident workspace

**EN:** Incident workspace · **JA:** インシデント対応  
**Requirement:** FR-O04 / WF-20 · **Actor:** Operator · **Surface:** Command · **Layout:** incident

**Purpose:** Fire · Building A / Floor 05.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** O01, O02, O06, O07, O32.  
**Output:** Open dispatch → O08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O04) · [EN](../Prototype.html?lang=en#O04) · [JA](../Prototype.html?lang=ja#O04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| INC-2041 | P1 · response active | Read-only within object scope; display source/time when they affect decisions. |
| Open SOS | 1 | Read-only within object scope; display source/time when they affect decisions. |
| Self-reported safe | 20 | Read-only within object scope; display source/time when they affect decisions. |
| Unconfirmed people | 3 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O08 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O04 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For incident workspace, what do INC-2041, Open SOS establish, and is “Open dispatch” available to Operator in this scope?

**Primary visual:** Incident map beside open SOS, unconfirmed people and action ownership

**Primary action:** Open dispatch → O08

**Progressive disclosure:** Keep INC-2041, Open SOS in the decision layer. Put the supporting details for Self-reported safe, Unconfirmed people, full source/version history and FR-O04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a incident workspace fixture for Operator; change INC-2041 and make Unconfirmed people unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open dispatch” reaches O08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o05"></a>
## O05 — Signal evidence review

**EN:** Signal evidence review · **JA:** 証拠の確認  
**Requirement:** FR-O05 / WF-04 · **Actor:** Operator · **Surface:** Command · **Layout:** evidence

**Purpose:** Camera and sensor evidence.  
**Key rule:** Detection evidence is not the same as a verified incident.  
**Entry:** O03, S09.  
**Output:** Create incident from signal → O06.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O05) · [EN](../Prototype.html?lang=en#O05) · [JA](../Prototype.html?lang=ja#O05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Source | CAM-A05-03 | Read-only within object scope; display source/time when they affect decisions. |
| Observed | 10:40:12 UTC+02 | Read-only within object scope; display source/time when they affect decisions. |
| Confidence | 0.82 · model v3 | Read-only within object scope; display source/time when they affect decisions. |
| Location | Building A / Floor 05 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O06 with a valid payload/version, and verify that it is blocked when the guard for WF-04 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O05 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For signal evidence review, what do Source, Observed establish, and is “Create incident from signal” available to Operator in this scope?

**Primary visual:** Evidence frame with observed time, confidence and mapped location

**Primary action:** Create incident from signal → O06

**Progressive disclosure:** Keep Source, Observed in the decision layer. Put the supporting details for Confidence, Location, full source/version history and FR-O05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a signal evidence review fixture for Operator; change Source and make Location unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Create incident from signal” reaches O06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o06"></a>
## O06 — Create incident

**EN:** Create incident · **JA:** インシデントの作成  
**Requirement:** FR-O06 / WF-04 · **Actor:** Operator · **Surface:** Command · **Layout:** form

**Purpose:** Establish the incident record.  
**Key rule:** Detection evidence is not the same as a verified incident.  
**Entry:** O05, O29.  
**Output:** Create demo incident → O04.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O06) · [EN](../Prototype.html?lang=en#O06) · [JA](../Prototype.html?lang=ja#O06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Category | Fire | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Severity | P1 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Location | Building A / Floor 05 | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Evidence | EV-3101 | Read-only from the authoritative source/version; cannot be edited in this form. |
| Owner | Campus command | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O04 with a valid payload/version, and verify that it is blocked when the guard for WF-04 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O06 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For create incident, what do Category, Severity establish, and is “Create demo incident” available to Operator in this scope?

**Primary visual:** Incident creation preview linking category, severity and owner

**Primary action:** Create demo incident → O04

**Progressive disclosure:** Keep Category, Severity in the decision layer. Put the supporting details for Location, Evidence, Owner, full source/version history and FR-O06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a create incident fixture for Operator; change Category and make Owner unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Create demo incident” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o07"></a>
## O07 — Correlate or split incidents

**EN:** Correlate or split incidents · **JA:** インシデントの関連付け・分割  
**Requirement:** FR-O07 / WF-04 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Purpose:** Review possible duplicate reports.  
**Key rule:** Detection evidence is not the same as a verified incident.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save correlation → O04.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O07) · [EN](../Prototype.html?lang=en#O07) · [JA](../Prototype.html?lang=ja#O07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Primary | INC-2041 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Related | INC-2042 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Evidence | Same zone within 60 seconds | Read-only from the authoritative source/version; cannot be edited in this form. |
| Decision | Link without deleting source | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O04 with a valid payload/version, and verify that it is blocked when the guard for WF-04 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O07 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For correlate or split incidents, what do Primary, Related establish, and is “Save correlation” available to Supervisor in this scope?

**Primary visual:** Side-by-side incident lineage with merge/split impact

**Primary action:** Save correlation → O04

**Progressive disclosure:** Keep Primary, Related in the decision layer. Put the supporting details for Evidence, Decision, full source/version history and FR-O07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a correlate or split incidents fixture for Supervisor; change Primary and make Decision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save correlation” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o08"></a>
## O08 — Dispatch board

**EN:** Dispatch board · **JA:** 配備ボード  
**Requirement:** FR-O08 / WF-11 · **Actor:** Dispatcher · **Surface:** Command · **Layout:** dispatch

**Purpose:** Match the task to a capable team.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** O04.  
**Output:** Review assignment → O09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O08) · [EN](../Prototype.html?lang=en#O08) · [JA](../Prototype.html?lang=ja#O08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Rescue 02 | Available · fire capable | Read-only within object scope; display source/time when they affect decisions. |
| Medical 01 | Assigned · care capable | Read-only within object scope; display source/time when they affect decisions. |
| Security 03 | Available · perimeter | Read-only within object scope; display source/time when they affect decisions. |
| Task | Assist SOS-041 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O09 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O08 — V2 visual composition

**Context:** command · **Role:** Dispatcher

**Primary question:** For dispatch board, what do Rescue 02, Medical 01 establish, and is “Review assignment” available to Dispatcher in this scope?

**Primary visual:** Unit lanes showing capabilities, tasks and acceptance state

**Primary action:** Review assignment → O09

**Progressive disclosure:** Keep Rescue 02, Medical 01 in the decision layer. Put the supporting details for Security 03, Task, full source/version history and FR-O08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a dispatch board fixture for Dispatcher; change Rescue 02 and make Task unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review assignment” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o09"></a>
## O09 — Assign responder

**EN:** Assign responder · **JA:** 対応チームの割り当て  
**Requirement:** FR-O09 / WF-11 · **Actor:** Dispatcher · **Surface:** Command · **Layout:** form

**Purpose:** Confirm ownership of the task.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** O08, O12, O34, H09.  
**Output:** Assign team — demo → O10.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O09) · [EN](../Prototype.html?lang=en#O09) · [JA](../Prototype.html?lang=ja#O09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Incident | INC-2041 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Unit | Rescue 02 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Task | Assist person in Room 505 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Acceptance deadline | 60 seconds | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O10 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O09 — V2 visual composition

**Context:** command · **Role:** Dispatcher

**Primary question:** For assign responder, what do Incident, Unit establish, and is “Assign team — demo” available to Dispatcher in this scope?

**Primary visual:** Assignment preview binding exact unit, task and response deadline

**Primary action:** Assign team — demo → O10

**Progressive disclosure:** Keep Incident, Unit in the decision layer. Put the supporting details for Task, Acceptance deadline, full source/version history and FR-O09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a assign responder fixture for Dispatcher; change Incident and make Acceptance deadline unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Assign team — demo” reaches O10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o10"></a>
## O10 — Response timeline

**EN:** Response timeline · **JA:** 対応タイムライン  
**Requirement:** FR-O10 / WF-11 · **Actor:** Operator · **Surface:** Command · **Layout:** timeline

**Purpose:** A shared record of decisions.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** O09.  
**Output:** Review people status → O11.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O10) · [EN](../Prototype.html?lang=en#O10) · [JA](../Prototype.html?lang=ja#O10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| 10:40:12 | Signal received | Read-only within object scope; display source/time when they affect decisions. |
| 10:40:19 | Incident confirmed | Read-only within object scope; display source/time when they affect decisions. |
| 10:42:18 | SOS acknowledged | Read-only within object scope; display source/time when they affect decisions. |
| 10:43:02 | Rescue 02 assigned | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O11 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O10 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For response timeline, what do 10:40:12, 10:40:19 establish, and is “Review people status” available to Operator in this scope?

**Primary visual:** Chronological response milestones with source-specific receipts

**Primary action:** Review people status → O11

**Progressive disclosure:** Keep 10:40:12, 10:40:19 in the decision layer. Put the supporting details for 10:42:18, 10:43:02, full source/version history and FR-O10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a response timeline fixture for Operator; change 10:40:12 and make 10:43:02 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review people status” reaches O11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o11"></a>
## O11 — People accountability

**EN:** People accountability · **JA:** 安否確認一覧  
**Requirement:** FR-O11 / WF-12 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Purpose:** Know what is reported and what is unknown.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** O10.  
**Output:** Open person → O12.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O11) · [EN](../Prototype.html?lang=en#O11) · [JA](../Prototype.html?lang=ja#O11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Alex | SOS · Room 505 · 10:42 | Read-only within object scope; display source/time when they affect decisions. |
| Jamie | Self-reported safe · 10:45 | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | Unknown · last seen 09:50 | Read-only within object scope; display source/time when they affect decisions. |
| Scope | 24 registered occupants | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O12 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O11 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For people accountability, what do Alex, Jamie establish, and is “Open person” available to Operator in this scope?

**Primary visual:** People board separating unconfirmed, assisted and self-reported safe

**Primary action:** Open person → O12

**Progressive disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Scope, full source/version history and FR-O11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a people accountability fixture for Operator; change Alex and make Scope unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open person” reaches O12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o12"></a>
## O12 — Person assistance detail

**EN:** Person assistance detail · **JA:** 支援要請の詳細  
**Requirement:** FR-O12 / WF-12 · **Actor:** Operator · **Surface:** Command · **Layout:** detail

**Purpose:** Alex Morgan · SOS-041.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** O11.  
**Output:** Assign assistance → O09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O12) · [EN](../Prototype.html?lang=en#O12) · [JA](../Prototype.html?lang=ja#O12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Location | User-submitted room 505 | Read-only within object scope; display source/time when they affect decisions. |
| Consent | Response team only | Read-only within object scope; display source/time when they affect decisions. |
| Status | Assistance requested | Read-only within object scope; display source/time when they affect decisions. |
| Freshness | 3 minutes old | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O09 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O12 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For person assistance detail, what do Location, Consent establish, and is “Assign assistance” available to Operator in this scope?

**Primary visual:** Assistance need, consent scope and last-known location

**Primary action:** Assign assistance → O09

**Progressive disclosure:** Keep Location, Consent in the decision layer. Put the supporting details for Status, Freshness, full source/version history and FR-O12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a person assistance detail fixture for Operator; change Location and make Freshness unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Assign assistance” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o13"></a>
## O13 — Compose warning

**EN:** Compose warning · **JA:** 警報の作成  
**Requirement:** FR-O13 / WF-09 · **Actor:** Warning author · **Surface:** Command · **Layout:** form

**Purpose:** Prepare a targeted warning.  
**Key rule:** Approval binds to an exact content version and recipient scope.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Preview audience → O14.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O13) · [EN](../Prototype.html?lang=en#O13) · [JA](../Prototype.html?lang=ja#O13)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Category | Fire | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Area | Building A | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Language | English | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Instruction | Follow approved evacuation plan | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Expiry | 11:30 local | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O13:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O14 with a valid payload/version, and verify that it is blocked when the guard for WF-09 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O13 — V2 visual composition

**Context:** command · **Role:** Warning author

**Primary question:** For compose warning, what do Category, Area establish, and is “Preview audience” available to Warning author in this scope?

**Primary visual:** Warning composer beside affected-area and instruction preview

**Primary action:** Preview audience → O14

**Progressive disclosure:** Keep Category, Area in the decision layer. Put the supporting details for Language, Instruction, Expiry, full source/version history and FR-O13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a compose warning fixture for Warning author; change Category and make Expiry unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Preview audience” reaches O14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o14"></a>
## O14 — Warning preview & audience

**EN:** Warning preview & audience · **JA:** 内容と対象者のプレビュー  
**Requirement:** FR-O14 / WF-09 · **Actor:** Warning author · **Surface:** Command · **Layout:** detail

**Purpose:** Review message and recipients.  
**Key rule:** Approval binds to an exact content version and recipient scope.  
**Entry:** O13, T06.  
**Output:** Submit for approval → O15.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O14) · [EN](../Prototype.html?lang=en#O14) · [JA](../Prototype.html?lang=ja#O14)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Audience | 480 eligible subscriptions | Read-only within object scope; display source/time when they affect decisions. |
| Channels | Push · SMS · PA | Read-only within object scope; display source/time when they affect decisions. |
| Translations | English approved · Japanese pending | Read-only within object scope; display source/time when they affect decisions. |
| Exclusions | Outside Building A | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O14:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O15 with a valid payload/version, and verify that it is blocked when the guard for WF-09 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O14 — V2 visual composition

**Context:** command · **Role:** Warning author

**Primary question:** For warning preview & audience, what do Audience, Channels establish, and is “Submit for approval” available to Warning author in this scope?

**Primary visual:** Audience footprint and channel/language coverage comparison

**Primary action:** Submit for approval → O15

**Progressive disclosure:** Keep Audience, Channels in the decision layer. Put the supporting details for Translations, Exclusions, full source/version history and FR-O14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a warning preview & audience fixture for Warning author; change Audience and make Exclusions unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit for approval” reaches O15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o15"></a>
## O15 — Approve warning

**EN:** Approve warning · **JA:** 警報の承認  
**Requirement:** FR-O15 / WF-09 · **Actor:** Warning approver · **Surface:** Command · **Layout:** form

**Purpose:** Independent approval before broadcast.  
**Key rule:** Approval binds to an exact content version and recipient scope.  
**Entry:** O14.  
**Output:** Approve demo warning → O16.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O15) · [EN](../Prototype.html?lang=en#O15) · [JA](../Prototype.html?lang=ja#O15)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Author | Operator A | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Approver | Supervisor B | Read-only from the authoritative source/version; cannot be edited in this form. |
| Version | 3 | Read-only from the authoritative source/version; cannot be edited in this form. |
| Reason | Verified incident in occupied zone | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O15:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O16 with a valid payload/version, and verify that it is blocked when the guard for WF-09 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O15 — V2 visual composition

**Context:** command · **Role:** Warning approver

**Primary question:** For approve warning, what do Author, Approver establish, and is “Approve demo warning” available to Warning approver in this scope?

**Primary visual:** Exact warning version and author/approver separation

**Primary action:** Approve demo warning → O16

**Progressive disclosure:** Keep Author, Approver in the decision layer. Put the supporting details for Version, Reason, full source/version history and FR-O15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a approve warning fixture for Warning approver; change Author and make Reason unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve demo warning” reaches O16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o16"></a>
## O16 — Delivery & escalation

**EN:** Delivery & escalation · **JA:** 配信とエスカレーション  
**Requirement:** FR-O16 / WF-10 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Purpose:** Sending does not mean received.  
**Key rule:** Sent does not mean delivered, read or acknowledged by a person.  
**Entry:** O15, O17.  
**Output:** Review failed deliveries → O17.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O16) · [EN](../Prototype.html?lang=en#O16) · [JA](../Prototype.html?lang=ja#O16)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Push | 402 delivered · 78 unknown | Read-only within object scope; display source/time when they affect decisions. |
| SMS | 60 delivered · 18 pending | Read-only within object scope; display source/time when they affect decisions. |
| Human acknowledgments | 211 | Read-only within object scope; display source/time when they affect decisions. |
| Next escalation | 10:46 local | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O16:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O17 with a valid payload/version, and verify that it is blocked when the guard for WF-10 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O16 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For delivery & escalation, what do Push, SMS establish, and is “Review failed deliveries” available to Operator in this scope?

**Primary visual:** Delivery funnel separating provider receipt and human acknowledgment

**Primary action:** Review failed deliveries → O17

**Progressive disclosure:** Keep Push, SMS in the decision layer. Put the supporting details for Human acknowledgments, Next escalation, full source/version history and FR-O16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a delivery & escalation fixture for Operator; change Push and make Next escalation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review failed deliveries” reaches O17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o17"></a>
## O17 — Delivery failure review

**EN:** Delivery failure review · **JA:** 配信失敗への対応  
**Requirement:** FR-O17 / WF-10 · **Actor:** Operator · **Surface:** Command · **Layout:** detail

**Purpose:** Resolve notification gaps.  
**Key rule:** Sent does not mean delivered, read or acknowledged by a person.  
**Entry:** O16.  
**Output:** Queue fallback — demo → O16.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O17) · [EN](../Prototype.html?lang=en#O17) · [JA](../Prototype.html?lang=ja#O17)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Provider | SMS provider B | Read-only within object scope; display source/time when they affect decisions. |
| Failure | Rate limit · retryable | Read-only within object scope; display source/time when they affect decisions. |
| Affected | 18 recipients | Read-only within object scope; display source/time when they affect decisions. |
| Fallback | Voice provider C | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O17:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O16 with a valid payload/version, and verify that it is blocked when the guard for WF-10 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O17 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For delivery failure review, what do Provider, Failure establish, and is “Queue fallback — demo” available to Operator in this scope?

**Primary visual:** Failed-recipient cohort beside fallback-channel proposal

**Primary action:** Queue fallback — demo → O16

**Progressive disclosure:** Keep Provider, Failure in the decision layer. Put the supporting details for Affected, Fallback, full source/version history and FR-O17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a delivery failure review fixture for Operator; change Provider and make Fallback unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Queue fallback — demo” reaches O16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o18"></a>
## O18 — Physical command approval

**EN:** Physical command approval · **JA:** 機器コマンドの承認  
**Requirement:** FR-O18 / WF-15 · **Actor:** Authorized controller · **Surface:** Command · **Layout:** form

**Purpose:** Review a proposed equipment action.  
**Key rule:** Accepted commands are not completed actions; enforce TTL and interlocks.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Approve simulated command → O19.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O18) · [EN](../Prototype.html?lang=en#O18) · [JA](../Prototype.html?lang=ja#O18)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Target | PA controller · zone A05 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Command | Play approved evacuation message | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Interlocks | Test passed | Read-only from the authoritative source/version; cannot be edited in this form. |
| Expires | 30 seconds after approval | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O18:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O19 with a valid payload/version, and verify that it is blocked when the guard for WF-15 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O18 — V2 visual composition

**Context:** command · **Role:** Authorized controller

**Primary question:** For physical command approval, what do Target, Command establish, and is “Approve simulated command” available to Authorized controller in this scope?

**Primary visual:** Equipment target schematic with interlocks and expiring command digest

**Primary action:** Approve simulated command → O19

**Progressive disclosure:** Keep Target, Command in the decision layer. Put the supporting details for Interlocks, Expires, full source/version history and FR-O18 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Expired command, failed interlock or changed target invalidates approval; require review of the exact command version.

**V2 acceptance scenario:** Use a physical command approval fixture for Authorized controller; change Target and make Expires unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve simulated command” reaches O19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o19"></a>
## O19 — Physical command status

**EN:** Physical command status · **JA:** コマンドの実行状況  
**Requirement:** FR-O19 / WF-15 · **Actor:** Authorized controller · **Surface:** Command · **Layout:** timeline

**Purpose:** Track controller evidence.  
**Key rule:** Accepted commands are not completed actions; enforce TTL and interlocks.  
**Entry:** O18, O19.  
**Output:** Refresh command evidence → O19.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O19) · [EN](../Prototype.html?lang=en#O19) · [JA](../Prototype.html?lang=ja#O19)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| 10:44:00 | Requested | Read-only within object scope; display source/time when they affect decisions. |
| 10:44:03 | Approved | Read-only within object scope; display source/time when they affect decisions. |
| 10:44:04 | Gateway accepted | Read-only within object scope; display source/time when they affect decisions. |
| Current | Completion not yet confirmed | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O19:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O19 with a valid payload/version, and verify that it is blocked when the guard for WF-15 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O19 — V2 visual composition

**Context:** command · **Role:** Authorized controller

**Primary question:** For physical command status, what do 10:44:00, 10:44:03 establish, and is “Refresh command evidence” available to Authorized controller in this scope?

**Primary visual:** Command timeline separating transport receipt and physical effect

**Primary action:** Refresh command evidence → O19

**Progressive disclosure:** Keep 10:44:00, 10:44:03 in the decision layer. Put the supporting details for 10:44:04, Current, full source/version history and FR-O19 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Controller acknowledgment without physical feedback remains unknown; show reconciliation rather than repeat-command success.

**V2 acceptance scenario:** Use a physical command status fixture for Authorized controller; change 10:44:00 and make Current unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Refresh command evidence” reaches O19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o20"></a>
## O20 — Incident closure review

**EN:** Incident closure review · **JA:** 終結前の確認  
**Requirement:** FR-O20 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Purpose:** Resolve outstanding obligations.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Close demo incident → O21.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O20) · [EN](../Prototype.html?lang=en#O20) · [JA](../Prototype.html?lang=ja#O20)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Open SOS | 0 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Unconfirmed people | 3 · handover documented | Integer within policy limits; unknown is a separate value, not coerced to 0. |
| Units | Released | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Reason | Transferred to authority | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Approver | Supervisor | Read-only from the authoritative source/version; cannot be edited in this form. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O20:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O21 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O20 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For incident closure review, what do Open SOS, Unconfirmed people establish, and is “Close demo incident” available to Supervisor in this scope?

**Primary visual:** Closure blockers highlighting open SOS and unresolved people

**Primary action:** Close demo incident → O21

**Progressive disclosure:** Keep Open SOS, Unconfirmed people in the decision layer. Put the supporting details for Units, Reason, Approver, full source/version history and FR-O20 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Open SOS and unresolved people remain visible blockers or require explicit governed disposition; closing the view is not incident closure.

**V2 acceptance scenario:** Use a incident closure review fixture for Supervisor; change Open SOS and make Approver unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Close demo incident” reaches O21 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o21"></a>
## O21 — After-action review

**EN:** After-action review · **JA:** 対応後の振り返り  
**Requirement:** FR-O21 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** detail

**Purpose:** Learn from the response.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** O20, O22, O24.  
**Output:** Create improvement action → O22.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O21) · [EN](../Prototype.html?lang=en#O21) · [JA](../Prototype.html?lang=ja#O21)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| First acknowledgment | 7 seconds | Read-only within object scope; display source/time when they affect decisions. |
| Assignment acceptance | 42 seconds | Read-only within object scope; display source/time when they affect decisions. |
| Delivery gaps | 18 SMS attempts | Read-only within object scope; display source/time when they affect decisions. |
| Improvement | Review provider capacity | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O21:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O22 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O21 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For after-action review, what do First acknowledgment, Assignment acceptance establish, and is “Create improvement action” available to Supervisor in this scope?

**Primary visual:** Response interval chart with delivery gaps and improvement owners

**Primary action:** Create improvement action → O22

**Progressive disclosure:** Keep First acknowledgment, Assignment acceptance in the decision layer. Put the supporting details for Delivery gaps, Improvement, full source/version history and FR-O21 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a after-action review fixture for Supervisor; change First acknowledgment and make Improvement unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Create improvement action” reaches O22 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o22"></a>
## O22 — Improvement action

**EN:** Improvement action · **JA:** 改善アクション  
**Requirement:** FR-O22 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Purpose:** Give follow-up work an owner.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** O21.  
**Output:** Save action → O21.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O22) · [EN](../Prototype.html?lang=en#O22) · [JA](../Prototype.html?lang=ja#O22)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Action | Increase tested SMS capacity | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Owner | Platform operations | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Due date | 2026-11-06 | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |
| Linked incident | INC-2041 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O22:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O21 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O22 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For improvement action, what do Action, Owner establish, and is “Save action” available to Supervisor in this scope?

**Primary visual:** Improvement task with accountable owner and due-date progress

**Primary action:** Save action → O21

**Progressive disclosure:** Keep Action, Owner in the decision layer. Put the supporting details for Due date, Linked incident, full source/version history and FR-O22 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a improvement action fixture for Supervisor; change Action and make Linked incident unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save action” reaches O21 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o23"></a>
## O23 — Drill scheduler

**EN:** Drill scheduler · **JA:** 訓練の計画  
**Requirement:** FR-O23 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Purpose:** Practice without contacting live recipients.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open drill control → O24.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O23) · [EN](../Prototype.html?lang=en#O23) · [JA](../Prototype.html?lang=ja#O23)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Scenario | Building A evacuation | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Environment | Exercise only | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Participants | Test cohort | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Start | 2026-11-02 09:00 local | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O23:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O24 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O23 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For drill scheduler, what do Scenario, Environment establish, and is “Open drill control” available to Supervisor in this scope?

**Primary visual:** Drill scenario schedule clearly separated from live environment

**Primary action:** Open drill control → O24

**Progressive disclosure:** Keep Scenario, Environment in the decision layer. Put the supporting details for Participants, Start, full source/version history and FR-O23 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a drill scheduler fixture for Supervisor; change Scenario and make Start unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open drill control” reaches O24 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o24"></a>
## O24 — Drill control room

**EN:** Drill control room · **JA:** 訓練の指揮  
**Requirement:** FR-O24 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** dashboard

**Purpose:** EXERCISE · Building A evacuation.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** O23.  
**Output:** Review drill report → O21.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O24) · [EN](../Prototype.html?lang=en#O24) · [JA](../Prototype.html?lang=ja#O24)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Mode | Exercise | Read-only within object scope; display source/time when they affect decisions. |
| Live actuators | Disconnected | Read-only within object scope; display source/time when they affect decisions. |
| Test recipients | 24 | Read-only within object scope; display source/time when they affect decisions. |
| Completed steps | 3 of 5 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O24:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O21 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O24 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For drill control room, what do Mode, Live actuators establish, and is “Review drill report” available to Supervisor in this scope?

**Primary visual:** Drill progress board with explicit actuator isolation state

**Primary action:** Review drill report → O21

**Progressive disclosure:** Keep Mode, Live actuators in the decision layer. Put the supporting details for Test recipients, Completed steps, full source/version history and FR-O24 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a drill control room fixture for Supervisor; change Mode and make Completed steps unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review drill report” reaches O21 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o25"></a>
## O25 — Shift handover

**EN:** Shift handover · **JA:** 勤務の引き継ぎ  
**Requirement:** FR-O25 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Purpose:** Transfer active operational responsibility.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Record handover → O01.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O25) · [EN](../Prototype.html?lang=en#O25) · [JA](../Prototype.html?lang=ja#O25)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Outgoing | Operator A | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Incoming | Operator B | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Active incidents | 12 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Outstanding actions | 4 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Acknowledgment | Required | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O25:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O01 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O25 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For shift handover, what do Outgoing, Incoming establish, and is “Record handover” available to Supervisor in this scope?

**Primary visual:** Outgoing/incoming responsibility transfer with unresolved actions

**Primary action:** Record handover → O01

**Progressive disclosure:** Keep Outgoing, Incoming in the decision layer. Put the supporting details for Open incidents, Outstanding actions, Acknowledgment, full source/version history and FR-O25 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a shift handover fixture for Supervisor; change Outgoing and make Acknowledgment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Record handover” reaches O01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o26"></a>
## O26 — Shelter operations

**EN:** Shelter operations · **JA:** 避難所の運営  
**Requirement:** FR-O26 / WF-13 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Purpose:** Publish fresh shelter information.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** O27.  
**Output:** Edit shelter → O27.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O26) · [EN](../Prototype.html?lang=en#O26) · [JA](../Prototype.html?lang=ja#O26)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| North shelter | Open · 80 spaces | Read-only within object scope; display source/time when they affect decisions. |
| West center | Status unverified | Read-only within object scope; display source/time when they affect decisions. |
| South shelter | Closed | Read-only within object scope; display source/time when they affect decisions. |
| Last refresh | 10:40 local | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O26:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O27 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O26 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For shelter operations, what do North shelter, West center establish, and is “Edit shelter” available to Operator in this scope?

**Primary visual:** Shelter capacity board including unknown and expired reports

**Primary action:** Edit shelter → O27

**Progressive disclosure:** Keep North shelter, West center in the decision layer. Put the supporting details for South shelter, Last refresh, full source/version history and FR-O26 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a shelter operations fixture for Operator; change North shelter and make Last refresh unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit shelter” reaches O27 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o27"></a>
## O27 — Edit shelter status

**EN:** Edit shelter status · **JA:** 避難所情報の更新  
**Requirement:** FR-O27 / WF-13 · **Actor:** Operator · **Surface:** Command · **Layout:** form

**Purpose:** Update a designated shelter.  
**Key rule:** Guidance and destinations expose source, version and freshness.  
**Entry:** O26.  
**Output:** Publish demo update → O26.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O27) · [EN](../Prototype.html?lang=en#O27) · [JA](../Prototype.html?lang=ja#O27)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Shelter | North | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Status | Open | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Available capacity | 80 | Integer within policy limits; unknown is a separate value, not coerced to 0. |
| Accessibility | Step-free | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Valid until | 12:00 local | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O27:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O26 with a valid payload/version, and verify that it is blocked when the guard for WF-13 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O27 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For edit shelter status, what do Shelter, Status establish, and is “Publish demo update” available to Operator in this scope?

**Primary visual:** Shelter status editor beside capacity and validity preview

**Primary action:** Publish demo update → O26

**Progressive disclosure:** Keep Shelter, Status in the decision layer. Put the supporting details for Available capacity, Accessibility, Valid until, full source/version history and FR-O27 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a edit shelter status fixture for Operator; change Shelter and make Valid until unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish demo update” reaches O26 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o28"></a>
## O28 — Regional disaster feed

**EN:** Regional disaster feed · **JA:** 災害警報フィード  
**Requirement:** FR-O28 / WF-08 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Purpose:** Review trusted public advisories.  
**Key rule:** Preserve issuer, validity and warning update or cancellation history.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Inspect advisory → O29.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O28) · [EN](../Prototype.html?lang=en#O28) · [JA](../Prototype.html?lang=ja#O28)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| CAP-041 | Flood watch · Update | Read-only within object scope; display source/time when they affect decisions. |
| CAP-039 | Wind alert · expired | Read-only within object scope; display source/time when they affect decisions. |
| CAP-038 | Storm warning · canceled | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O28:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O29 with a valid payload/version, and verify that it is blocked when the guard for WF-08 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O28 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For regional disaster feed, what do CAP-041, CAP-039 establish, and is “Inspect advisory” available to Operator in this scope?

**Primary visual:** Regional advisory queue with source identity and supersession

**Primary action:** Inspect advisory → O29

**Progressive disclosure:** Keep CAP-041, CAP-039 in the decision layer. Put the supporting details for CAP-038, full source/version history and FR-O28 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a regional disaster feed fixture for Operator; change CAP-041 and make CAP-038 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Inspect advisory” reaches O29 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o29"></a>
## O29 — CAP advisory review

**EN:** CAP advisory review · **JA:** CAP情報の確認  
**Requirement:** FR-O29 / WF-08 · **Actor:** Operator · **Surface:** Command · **Layout:** detail

**Purpose:** Preserve the issuing authority's context.  
**Key rule:** Preserve issuer, validity and warning update or cancellation history.  
**Entry:** O28.  
**Output:** Create local response → O06.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O29) · [EN](../Prototype.html?lang=en#O29) · [JA](../Prototype.html?lang=ja#O29)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Sender | Configured authority | Read-only within object scope; display source/time when they affect decisions. |
| Identifier | CAP-041 | Read-only within object scope; display source/time when they affect decisions. |
| Message type | Update | Read-only within object scope; display source/time when they affect decisions. |
| References | CAP-040 | Read-only within object scope; display source/time when they affect decisions. |
| Expires | 18:00 local | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O29:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O06 with a valid payload/version, and verify that it is blocked when the guard for WF-08 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O29 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For cap advisory review, what do Sender, Identifier establish, and is “Create local response” available to Operator in this scope?

**Primary visual:** CAP message lineage with update/cancel references and expiry

**Primary action:** Create local response → O06

**Progressive disclosure:** Keep Sender, Identifier in the decision layer. Put the supporting details for Message type, References, Expires, full source/version history and FR-O29 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a cap advisory review fixture for Operator; change Sender and make Expires unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Create local response” reaches O06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o30"></a>
## O30 — Search & audit timeline

**EN:** Search & audit timeline · **JA:** 検索と監査履歴  
**Requirement:** FR-O30 / WF-19 · **Actor:** Auditor · **Surface:** Command · **Layout:** list

**Purpose:** Find an event without changing history.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** T11, X07.  
**Output:** Inspect audit entry → T11.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O30) · [EN](../Prototype.html?lang=en#O30) · [JA](../Prototype.html?lang=ja#O30)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Query | INC-2041 | Read-only within object scope; display source/time when they affect decisions. |
| Create | Operator A · 10:40 | Read-only within object scope; display source/time when they affect decisions. |
| Dispatch | Dispatcher B · 10:43 | Read-only within object scope; display source/time when they affect decisions. |
| Export | Auditor C · 11:20 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O30:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T11 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O30 — V2 visual composition

**Context:** command · **Role:** Auditor

**Primary question:** For search & audit timeline, what do Query, Create establish, and is “Inspect audit entry” available to Auditor in this scope?

**Primary visual:** Audit timeline with actor, scope and immutable event details

**Primary action:** Inspect audit entry → T11

**Progressive disclosure:** Keep Query, Create in the decision layer. Put the supporting details for Dispatch, Export, full source/version history and FR-O30 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a search & audit timeline fixture for Auditor; change Query and make Export unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect audit entry” reaches T11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s01"></a>
## S01 — Site directory

**EN:** Site directory · **JA:** 拠点一覧  
**Requirement:** FR-S01 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** cards

**Purpose:** One location model across industries.  
**Key rule:** Location and plans are versioned; new revisions require approval.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open site → S02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S01) · [EN](../Prototype.html?lang=en#S01) · [JA](../Prototype.html?lang=ja#S01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Harbor Campus | Buildings · EU | Read-only within object scope; display source/time when they affect decisions. |
| Riverside | Geofence · EU | Read-only within object scope; display source/time when they affect decisions. |
| North highway | Road segment · EU | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S02 with a valid payload/version, and verify that it is blocked when the guard for WF-02 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S01 — V2 visual composition

**Context:** configuration · **Role:** Site admin

**Primary question:** For site directory, what do Harbor Campus, Riverside establish, and is “Open site” available to Site admin in this scope?

**Primary visual:** Site map and directory with region boundary

**Primary action:** Open site → S02

**Progressive disclosure:** Keep Harbor Campus, Riverside in the decision layer. Put the supporting details for North highway, full source/version history and FR-S01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a site directory fixture for Site admin; change Harbor Campus and make North highway unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Open site” reaches S02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s02"></a>
## S02 — Site structure

**EN:** Site structure · **JA:** 拠点の構造  
**Requirement:** FR-S02 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** tree

**Purpose:** Harbor Campus / Building A.  
**Key rule:** Location and plans are versioned; new revisions require approval.  
**Entry:** S01, S03.  
**Output:** Edit location → S03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S02) · [EN](../Prototype.html?lang=en#S02) · [JA](../Prototype.html?lang=ja#S02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Building A | Floors 01–08 | Read-only within object scope; display source/time when they affect decisions. |
| Floor 05 | Zones A05-01 to A05-06 | Read-only within object scope; display source/time when they affect decisions. |
| Zone A05-03 | Camera + smoke detector | Read-only within object scope; display source/time when they affect decisions. |
| Assembly | North court | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S03 with a valid payload/version, and verify that it is blocked when the guard for WF-02 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S02 — V2 visual composition

**Context:** configuration · **Role:** Site admin

**Primary question:** For site structure, what do Building A, Floor 05 establish, and is “Edit location” available to Site admin in this scope?

**Primary visual:** Building-floor-zone tree with selected spatial context

**Primary action:** Edit location → S03

**Progressive disclosure:** Keep Building A, Floor 05 in the decision layer. Put the supporting details for Zone A05-03, Assembly, full source/version history and FR-S02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a site structure fixture for Site admin; change Building A and make Assembly unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit location” reaches S03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s03"></a>
## S03 — Location editor

**EN:** Location editor · **JA:** 位置情報の編集  
**Requirement:** FR-S03 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** form

**Purpose:** Link physical and geographic context.  
**Key rule:** Location and plans are versioned; new revisions require approval.  
**Entry:** S02.  
**Output:** Save location → S02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S03) · [EN](../Prototype.html?lang=en#S03) · [JA](../Prototype.html?lang=ja#S03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Name | East corridor | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Parent | Floor 05 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Coordinates | 52.5200 / 13.4050 | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Floor reference | 05 | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Timezone | Europe/Berlin | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S02 with a valid payload/version, and verify that it is blocked when the guard for WF-02 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S03 — V2 visual composition

**Context:** configuration · **Role:** Site admin

**Primary question:** For location editor, what do Name, Parent establish, and is “Save location” available to Site admin in this scope?

**Primary visual:** Parent-location path beside coordinate and floor preview

**Primary action:** Save location → S02

**Progressive disclosure:** Keep Name, Parent in the decision layer. Put the supporting details for Coordinates, Floor reference, Timezone, full source/version history and FR-S03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a location editor fixture for Site admin; change Name and make Timezone unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save location” reaches S02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s04"></a>
## S04 — Floor plan editor

**EN:** Floor plan editor · **JA:** フロア図の編集  
**Requirement:** FR-S04 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** floor

**Purpose:** Publish a reviewed evacuation map.  
**Key rule:** Location and plans are versioned; new revisions require approval.  
**Entry:** S05.  
**Output:** Review plan publication → S05.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S04) · [EN](../Prototype.html?lang=en#S04) · [JA](../Prototype.html?lang=ja#S04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Plan | Building A / Floor 05 | Read-only within object scope; display source/time when they affect decisions. |
| Revision | 13 draft | Read-only within object scope; display source/time when they affect decisions. |
| Exits | 2 | Read-only within object scope; display source/time when they affect decisions. |
| Accessible refuge | Zone B | Read-only within object scope; display source/time when they affect decisions. |
| Hazard overlay | Operator controlled | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S05 with a valid payload/version, and verify that it is blocked when the guard for WF-02 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S04 — V2 visual composition

**Context:** configuration · **Role:** Site admin

**Primary question:** For floor plan editor, what do Plan, Revision establish, and is “Review plan publication” available to Site admin in this scope?

**Primary visual:** Plan canvas showing exits, refuges and revision differences

**Primary action:** Review plan publication → S05

**Progressive disclosure:** Keep Plan, Revision in the decision layer. Put the supporting details for Exits, Accessible refuge, Hazard overlay, full source/version history and FR-S04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a floor plan editor fixture for Site admin; change Plan and make Hazard overlay unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review plan publication” reaches S05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s05"></a>
## S05 — Plan approval & versions

**EN:** Plan approval & versions · **JA:** 図面の承認と版管理  
**Requirement:** FR-S05 / WF-02 · **Actor:** Supervisor · **Surface:** Sites · **Layout:** list

**Purpose:** Keep published guidance traceable.  
**Key rule:** Location and plans are versioned; new revisions require approval.  
**Entry:** S04, X06.  
**Output:** Publish reviewed draft — demo → S04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S05) · [EN](../Prototype.html?lang=en#S05) · [JA](../Prototype.html?lang=ja#S05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Revision 13 | Draft · accessibility review pending | Read-only within object scope; display source/time when they affect decisions. |
| Revision 12 | Published · 2026-09-02 | Read-only within object scope; display source/time when they affect decisions. |
| Revision 11 | Archived | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S04 with a valid payload/version, and verify that it is blocked when the guard for WF-02 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S05 — V2 visual composition

**Context:** configuration · **Role:** Supervisor

**Primary question:** For plan approval & versions, what do Revision 13, Revision 12 establish, and is “Publish reviewed draft — demo” available to Supervisor in this scope?

**Primary visual:** Plan revision comparison with published/draft state

**Primary action:** Publish reviewed draft — demo → S04

**Progressive disclosure:** Keep Revision 13, Revision 12 in the decision layer. Put the supporting details for Revision 11, full source/version history and FR-S05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a plan approval & versions fixture for Supervisor; change Revision 13 and make Revision 11 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Publish reviewed draft — demo” reaches S04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s06"></a>
## S06 — Device inventory

**EN:** Device inventory · **JA:** 機器一覧  
**Requirement:** FR-S06 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** list

**Purpose:** Know which devices can be trusted.  
**Key rule:** Online status does not prove area safety or physical device health.  
**Entry:** S10, X03.  
**Output:** Open device → S07.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S06) · [EN](../Prototype.html?lang=en#S06) · [JA](../Prototype.html?lang=ja#S06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| CAM-A05-03 | Camera · healthy | Read-only within object scope; display source/time when they affect decisions. |
| SMK-A05-03 | Smoke sensor · healthy | Read-only within object scope; display source/time when they affect decisions. |
| GW-012 | Gateway · stale | Read-only within object scope; display source/time when they affect decisions. |
| WR-401 | Wearable · paired | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S07 with a valid payload/version, and verify that it is blocked when the guard for WF-14 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S06 — V2 visual composition

**Context:** configuration · **Role:** Device admin

**Primary question:** For device inventory, what do CAM-A05-03, SMK-A05-03 establish, and is “Open device” available to Device admin in this scope?

**Primary visual:** Device inventory grouped by physical function and health

**Primary action:** Open device → S07

**Progressive disclosure:** Keep CAM-A05-03, SMK-A05-03 in the decision layer. Put the supporting details for GW-012, WR-401, full source/version history and FR-S06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a device inventory fixture for Device admin; change CAM-A05-03 and make WR-401 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open device” reaches S07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s07"></a>
## S07 — Device detail & health

**EN:** Device detail & health · **JA:** 機器の詳細と稼働状態  
**Requirement:** FR-S07 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** detail

**Purpose:** CAM-A05-03.  
**Key rule:** Online status does not prove area safety or physical device health.  
**Entry:** S06, S08.  
**Output:** Review device configuration → S08.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S07) · [EN](../Prototype.html?lang=en#S07) · [JA](../Prototype.html?lang=ja#S07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Certificate | Valid · 48 days remaining | Read-only within object scope; display source/time when they affect decisions. |
| Last heartbeat | 8 seconds ago | Read-only within object scope; display source/time when they affect decisions. |
| Firmware | 3.2 · approved | Read-only within object scope; display source/time when they affect decisions. |
| Location | Zone A05-03 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S08 with a valid payload/version, and verify that it is blocked when the guard for WF-14 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S07 — V2 visual composition

**Context:** configuration · **Role:** Device admin

**Primary question:** For device detail & health, what do Certificate, Last heartbeat establish, and is “Review device configuration” available to Device admin in this scope?

**Primary visual:** Device diagram with heartbeat, certificate and firmware evidence

**Primary action:** Review device configuration → S08

**Progressive disclosure:** Keep Certificate, Last heartbeat in the decision layer. Put the supporting details for Firmware, Location, full source/version history and FR-S07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a device detail & health fixture for Device admin; change Certificate and make Location unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review device configuration” reaches S08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s08"></a>
## S08 — Provision device

**EN:** Provision device · **JA:** 機器の登録  
**Requirement:** FR-S08 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** form

**Purpose:** Bind a device to an authorized tenant.  
**Key rule:** Online status does not prove area safety or physical device health.  
**Entry:** S07.  
**Output:** Enroll simulated device → S07.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S08) · [EN](../Prototype.html?lang=en#S08) · [JA](../Prototype.html?lang=ja#S08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Serial | CAM-009182 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Enrollment token | Single-use · masked | Read-only from the authoritative source/version; cannot be edited in this form. |
| Location | Zone A05-03 | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Capabilities | Video + detection metadata | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S07 with a valid payload/version, and verify that it is blocked when the guard for WF-14 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S08 — V2 visual composition

**Context:** configuration · **Role:** Device admin

**Primary question:** For provision device, what do Serial, Enrollment token establish, and is “Enroll simulated device” available to Device admin in this scope?

**Primary visual:** Enrollment sequence tying serial, site and capability claim

**Primary action:** Enroll simulated device → S07

**Progressive disclosure:** Keep Serial, Enrollment token in the decision layer. Put the supporting details for Location, Capabilities, full source/version history and FR-S08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a provision device fixture for Device admin; change Serial and make Capabilities unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Enroll simulated device” reaches S07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s09"></a>
## S09 — Camera wall

**EN:** Camera wall · **JA:** カメラ監視  
**Requirement:** FR-S09 / WF-14 · **Actor:** Operator · **Surface:** Sites · **Layout:** evidence

**Purpose:** Review selected camera sources.  
**Key rule:** Online status does not prove area safety or physical device health.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open detection evidence → O05.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S09) · [EN](../Prototype.html?lang=en#S09) · [JA](../Prototype.html?lang=ja#S09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| CAM-A05-01 | Lobby · online | Read-only within object scope; display source/time when they affect decisions. |
| CAM-A05-02 | West corridor · online | Read-only within object scope; display source/time when they affect decisions. |
| CAM-A05-03 | East corridor · stale frame | Read-only within object scope; display source/time when they affect decisions. |
| Access | Incident-scoped | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O05 with a valid payload/version, and verify that it is blocked when the guard for WF-14 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S09 — V2 visual composition

**Context:** configuration · **Role:** Operator

**Primary question:** For camera wall, what do CAM-A05-01, CAM-A05-02 establish, and is “Open detection evidence” available to Operator in this scope?

**Primary visual:** Permission-gated camera tiles with timestamp and missing-feed state

**Primary action:** Open detection evidence → O05

**Progressive disclosure:** Keep CAM-A05-01, CAM-A05-02 in the decision layer. Put the supporting details for CAM-A05-03, Access, full source/version history and FR-S09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a camera wall fixture for Operator; change CAM-A05-01 and make Access unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open detection evidence” reaches O05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s10"></a>
## S10 — Maintenance & calibration

**EN:** Maintenance & calibration · **JA:** 保守と校正  
**Requirement:** FR-S10 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** form

**Purpose:** Keep suppression visible during maintenance.  
**Key rule:** Online status does not prove area safety or physical device health.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Schedule maintenance → S06.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S10) · [EN](../Prototype.html?lang=en#S10) · [JA](../Prototype.html?lang=ja#S10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Device | SMK-A05-03 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Window | 14:00–14:30 local | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |
| Backup coverage | Patrol confirmed | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Approver | Site supervisor | Read-only from the authoritative source/version; cannot be edited in this form. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S06 with a valid payload/version, and verify that it is blocked when the guard for WF-14 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S10 — V2 visual composition

**Context:** configuration · **Role:** Device admin

**Primary question:** For maintenance & calibration, what do Device, Window establish, and is “Schedule maintenance” available to Device admin in this scope?

**Primary visual:** Maintenance window alongside backup-coverage map

**Primary action:** Schedule maintenance → S06

**Progressive disclosure:** Keep Device, Window in the decision layer. Put the supporting details for Backup coverage, Approver, full source/version history and FR-S10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a maintenance & calibration fixture for Device admin; change Device and make Approver unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Schedule maintenance” reaches S06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s11"></a>
## S11 — Rule library

**EN:** Rule library · **JA:** ルール一覧  
**Requirement:** FR-S11 / WF-04 · **Actor:** Rule author · **Surface:** Sites · **Layout:** list

**Purpose:** Detection policies by hazard and site.  
**Key rule:** Detection evidence is not the same as a verified incident.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Edit rule → S12.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S11) · [EN](../Prototype.html?lang=en#S11) · [JA](../Prototype.html?lang=ja#S11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Fire rule v4 | Published | Read-only within object scope; display source/time when they affect decisions. |
| Fall rule v2 | Published | Read-only within object scope; display source/time when they affect decisions. |
| Road collision v1 | Draft | Read-only within object scope; display source/time when they affect decisions. |
| Flood threshold v3 | Published | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S12 with a valid payload/version, and verify that it is blocked when the guard for WF-04 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S11 — V2 visual composition

**Context:** configuration · **Role:** Rule author

**Primary question:** For rule library, what do Fire rule v4, Fall rule v2 establish, and is “Edit rule” available to Rule author in this scope?

**Primary visual:** Versioned rule list showing hazard family and enabled scope

**Primary action:** Edit rule → S12

**Progressive disclosure:** Keep Fire rule v4, Fall rule v2 in the decision layer. Put the supporting details for Road collision v1, Flood threshold v3, full source/version history and FR-S11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a rule library fixture for Rule author; change Fire rule v4 and make Flood threshold v3 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit rule” reaches S12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s12"></a>
## S12 — Rule editor & simulation

**EN:** Rule editor & simulation · **JA:** ルール編集とシミュレーション  
**Requirement:** FR-S12 / WF-04 · **Actor:** Rule author · **Surface:** Sites · **Layout:** form

**Purpose:** Test a rule against recorded events.  
**Key rule:** Detection evidence is not the same as a verified incident.  
**Entry:** S11, S13.  
**Output:** View simulation results → S13.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S12) · [EN](../Prototype.html?lang=en#S12) · [JA](../Prototype.html?lang=ja#S12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Rule | Fire corroboration | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Condition | Camera event + smoke event | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Window | 60 seconds | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |
| Action | Create P1 incident | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Mode | Simulation | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S13 with a valid payload/version, and verify that it is blocked when the guard for WF-04 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S12 — V2 visual composition

**Context:** configuration · **Role:** Rule author

**Primary question:** For rule editor & simulation, what do Rule, Condition establish, and is “View simulation results” available to Rule author in this scope?

**Primary visual:** Condition-action flow beside simulation-only indicator

**Primary action:** View simulation results → S13

**Progressive disclosure:** Keep Rule, Condition in the decision layer. Put the supporting details for Window, Action, Mode, full source/version history and FR-S12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a rule editor & simulation fixture for Rule author; change Rule and make Mode unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “View simulation results” reaches S13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s13"></a>
## S13 — Rule test & approval

**EN:** Rule test & approval · **JA:** ルールのテストと承認  
**Requirement:** FR-S13 / WF-04 · **Actor:** Rule approver · **Surface:** Sites · **Layout:** detail

**Purpose:** Review behavioral changes before release.  
**Key rule:** Detection evidence is not the same as a verified incident.  
**Entry:** S12.  
**Output:** Return rule for changes → S12.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S13) · [EN](../Prototype.html?lang=en#S13) · [JA](../Prototype.html?lang=ja#S13)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Fixture cases | 24 passed · 2 need review | Read-only within object scope; display source/time when they affect decisions. |
| False merges | 0 in test set | Read-only within object scope; display source/time when they affect decisions. |
| Version | 5 draft | Read-only within object scope; display source/time when they affect decisions. |
| Reviewer | Independent supervisor | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S13:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S12 with a valid payload/version, and verify that it is blocked when the guard for WF-04 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S13 — V2 visual composition

**Context:** configuration · **Role:** Rule approver

**Primary question:** For rule test & approval, what do Fixture cases, False merges establish, and is “Return rule for changes” available to Rule approver in this scope?

**Primary visual:** Test-case outcome grid with false-merge evidence

**Primary action:** Return rule for changes → S12

**Progressive disclosure:** Keep Fixture cases, False merges in the decision layer. Put the supporting details for Version, Reviewer, full source/version history and FR-S13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a rule test & approval fixture for Rule approver; change Fixture cases and make Reviewer unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Return rule for changes” reaches S12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s14"></a>
## S14 — AI model monitoring

**EN:** AI model monitoring · **JA:** AIモデルの監視  
**Requirement:** FR-S14 / WF-04 · **Actor:** Model operator · **Surface:** Sites · **Layout:** detail

**Purpose:** Track detector behavior by site.  
**Key rule:** Detection evidence is not the same as a verified incident.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open review queue → O03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S14) · [EN](../Prototype.html?lang=en#S14) · [JA](../Prototype.html?lang=ja#S14)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Model | Flame v3 | Read-only within object scope; display source/time when they affect decisions. |
| Labeled sample | 120 events | Read-only within object scope; display source/time when they affect decisions. |
| False-positive review | 8 cases | Read-only within object scope; display source/time when they affect decisions. |
| Drift | Lighting shift detected | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S14:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O03 with a valid payload/version, and verify that it is blocked when the guard for WF-04 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S14 — V2 visual composition

**Context:** configuration · **Role:** Model operator

**Primary question:** For ai model monitoring, what do Model, Labeled sample establish, and is “Open review queue” available to Model operator in this scope?

**Primary visual:** Model quality trend with sample provenance and drift

**Primary action:** Open review queue → O03

**Progressive disclosure:** Keep Model, Labeled sample in the decision layer. Put the supporting details for False-positive review, Drift, full source/version history and FR-S14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a ai model monitoring fixture for Model operator; change Model and make Drift unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open review queue” reaches O03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i01"></a>
## I01 — Connector catalog

**EN:** Connector catalog · **JA:** コネクター一覧  
**Requirement:** FR-I01 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** cards

**Purpose:** Connect systems through declared capabilities.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** D06.  
**Output:** Configure connector → I02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I01) · [EN](../Prototype.html?lang=en#I01) · [JA](../Prototype.html?lang=ja#I01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| MQTT sensors | Telemetry | Read-only within object scope; display source/time when they affect decisions. |
| CAP authority | Public warning | Read-only within object scope; display source/time when they affect decisions. |
| MAVLink gateway | Drone telemetry | Read-only within object scope; display source/time when they affect decisions. |
| IOC bridge | Incident exchange | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I02 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I01 — V2 visual composition

**Context:** configuration · **Role:** Integration admin

**Primary question:** For connector catalog, what do MQTT sensors, CAP authority establish, and is “Configure connector” available to Integration admin in this scope?

**Primary visual:** Connector catalog grouped by event, advisory and control capability

**Primary action:** Configure connector → I02

**Progressive disclosure:** Keep MQTT sensors, CAP authority in the decision layer. Put the supporting details for MAVLink gateway, IOC bridge, full source/version history and FR-I01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a connector catalog fixture for Integration admin; change MQTT sensors and make IOC bridge unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Configure connector” reaches I02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i02"></a>
## I02 — Connector setup

**EN:** Connector setup · **JA:** コネクターの設定  
**Requirement:** FR-I02 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Purpose:** Create a scoped connection.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** I01.  
**Output:** Test connection → I03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I02) · [EN](../Prototype.html?lang=en#I02) · [JA](../Prototype.html?lang=ja#I02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Type | MQTT 5 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Endpoint | mqtts://broker.example.test | HTTPS/mTLS profile; allowlist hosts and block loopback/private SSRF under connector policy. |
| Region | EU | Read-only from the authoritative source/version; cannot be edited in this form. |
| Auth | mTLS | Read-only from the authoritative source/version; cannot be edited in this form. |
| Capabilities | telemetry.read | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I03 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I02 — V2 visual composition

**Context:** configuration · **Role:** Integration admin

**Primary question:** For connector setup, what do Type, Endpoint establish, and is “Test connection” available to Integration admin in this scope?

**Primary visual:** Connector setup flow with endpoint-region-capability preview

**Primary action:** Test connection → I03

**Progressive disclosure:** Keep Type, Endpoint in the decision layer. Put the supporting details for Region, Auth, Capabilities, full source/version history and FR-I02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a connector setup fixture for Integration admin; change Type and make Capabilities unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Test connection” reaches I03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i03"></a>
## I03 — Schema mapping

**EN:** Schema mapping · **JA:** データマッピング  
**Requirement:** FR-I03 / WF-03 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Purpose:** Map source data into a versioned event.  
**Key rule:** Preserve source, time and ID; duplicates do not create new effects.  
**Entry:** I02.  
**Output:** Run contract tests → I04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I03) · [EN](../Prototype.html?lang=en#I03) · [JA](../Prototype.html?lang=ja#I03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Source field | temperature_c | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Target | data.measurement.value | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Unit | Cel | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Location | device registry binding | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Unknown fields | Quarantine | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I04 with a valid payload/version, and verify that it is blocked when the guard for WF-03 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I03 — V2 visual composition

**Context:** configuration · **Role:** Integration admin

**Primary question:** For schema mapping, what do Source field, Target establish, and is “Run contract tests” available to Integration admin in this scope?

**Primary visual:** Source-to-target field mapping with units and unknown-field lane

**Primary action:** Run contract tests → I04

**Progressive disclosure:** Keep Source field, Target in the decision layer. Put the supporting details for Unit, Location, Unknown fields, full source/version history and FR-I03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a schema mapping fixture for Integration admin; change Source field and make Unknown fields unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Run contract tests” reaches I04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i04"></a>
## I04 — Connector test console

**EN:** Connector test console · **JA:** 接続テスト  
**Requirement:** FR-I04 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** detail

**Purpose:** Prove behavior before enabling traffic.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** I03, I08, I10.  
**Output:** Enable demo connector → I05.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I04) · [EN](../Prototype.html?lang=en#I04) · [JA](../Prototype.html?lang=ja#I04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Valid event | Accepted | Read-only within object scope; display source/time when they affect decisions. |
| Duplicate event | Deduplicated | Read-only within object scope; display source/time when they affect decisions. |
| Wrong tenant | Rejected | Read-only within object scope; display source/time when they affect decisions. |
| Expired certificate | Rejected | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I05 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I04 — V2 visual composition

**Context:** configuration · **Role:** Integration admin

**Primary question:** For connector test console, what do Valid event, Duplicate event establish, and is “Enable demo connector” available to Integration admin in this scope?

**Primary visual:** Contract-test matrix separating accepted and rejected fixtures

**Primary action:** Enable demo connector → I05

**Progressive disclosure:** Keep Valid event, Duplicate event in the decision layer. Put the supporting details for Wrong tenant, Expired certificate, full source/version history and FR-I04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a connector test console fixture for Integration admin; change Valid event and make Expired certificate unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Enable demo connector” reaches I05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i05"></a>
## I05 — Connector health

**EN:** Connector health · **JA:** 接続の稼働状態  
**Requirement:** FR-I05 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** list

**Purpose:** Monitor transport and processing separately.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** I04, I06.  
**Output:** Inspect dead letters → I06.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I05) · [EN](../Prototype.html?lang=en#I05) · [JA](../Prototype.html?lang=ja#I05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| MQTT bridge | Connected · 0 queue lag | Read-only within object scope; display source/time when they affect decisions. |
| IOC bridge | Degraded · retrying | Read-only within object scope; display source/time when they affect decisions. |
| CAP feed | Healthy · last poll 30 s | Read-only within object scope; display source/time when they affect decisions. |
| Drone bridge | Telemetry only | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I06 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I05 — V2 visual composition

**Context:** configuration · **Role:** Integration admin

**Primary question:** For connector health, what do MQTT bridge, IOC bridge establish, and is “Inspect dead letters” available to Integration admin in this scope?

**Primary visual:** Connector health lanes showing lag, failure and data age

**Primary action:** Inspect dead letters → I06

**Progressive disclosure:** Keep MQTT bridge, IOC bridge in the decision layer. Put the supporting details for CAP feed, Drone bridge, full source/version history and FR-I05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a connector health fixture for Integration admin; change MQTT bridge and make Drone bridge unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect dead letters” reaches I06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i06"></a>
## I06 — Dead-letter & replay

**EN:** Dead-letter & replay · **JA:** 失敗イベントと再処理  
**Requirement:** FR-I06 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Purpose:** Replay only after inspecting the failure.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** I05.  
**Output:** Replay simulated event → I05.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I06) · [EN](../Prototype.html?lang=en#I06) · [JA](../Prototype.html?lang=ja#I06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Event | EV-3090 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Error | Unknown location mapping | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Correction | Bind device to zone | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Replay | Preserve original event ID | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I05 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I06 — V2 visual composition

**Context:** configuration · **Role:** Integration admin

**Primary question:** For dead-letter & replay, what do Event, Error establish, and is “Replay simulated event” available to Integration admin in this scope?

**Primary visual:** Dead-letter payload diff and replay eligibility

**Primary action:** Replay simulated event → I05

**Progressive disclosure:** Keep Event, Error in the decision layer. Put the supporting details for Correction, Replay, full source/version history and FR-I06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a dead-letter & replay fixture for Integration admin; change Event and make Replay unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Replay simulated event” reaches I05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i07"></a>
## I07 — API clients & scopes

**EN:** API clients & scopes · **JA:** APIクライアントと権限  
**Requirement:** FR-I07 / WF-17 · **Actor:** Tenant admin · **Surface:** Integrations · **Layout:** form

**Purpose:** Grant only required API access.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** D08.  
**Output:** Save client → I08.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I07) · [EN](../Prototype.html?lang=en#I07) · [JA](../Prototype.html?lang=ja#I07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Client | Partner IOC | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Scopes | incident.read + incident.ack | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Region | EU | Read-only from the authoritative source/version; cannot be edited in this form. |
| Secret | Stored in vault · not shown | Read-only from the authoritative source/version; cannot be edited in this form. |
| Expiry | 90 days | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I08 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I07 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For api clients & scopes, what do Client, Scopes establish, and is “Save client” available to Tenant admin in this scope?

**Primary visual:** API scope grid with masked credentials and expiry

**Primary action:** Save client → I08

**Progressive disclosure:** Keep Client, Scopes in the decision layer. Put the supporting details for Region, Secret, Expiry, full source/version history and FR-I07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a api clients & scopes fixture for Tenant admin; change Client and make Expiry unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save client” reaches I08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i08"></a>
## I08 — Webhook subscriptions

**EN:** Webhook subscriptions · **JA:** Webhookの登録  
**Requirement:** FR-I08 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Purpose:** Deliver filtered incident updates.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** I07, D07.  
**Output:** Send test payload → I04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I08) · [EN](../Prototype.html?lang=en#I08) · [JA](../Prototype.html?lang=ja#I08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| URL | https://partner.example.test/hooks | HTTPS/mTLS profile; allowlist hosts and block loopback/private SSRF under connector policy. |
| Events | incident.updated | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Signature | HMAC + timestamp | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Retries | Exponential · max 24 h | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I04 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I08 — V2 visual composition

**Context:** configuration · **Role:** Integration admin

**Primary question:** For webhook subscriptions, what do URL, Events establish, and is “Send test payload” available to Integration admin in this scope?

**Primary visual:** Webhook route diagram showing signature and retry policy

**Primary action:** Send test payload → I04

**Progressive disclosure:** Keep URL, Events in the decision layer. Put the supporting details for Signature, Retries, full source/version history and FR-I08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a webhook subscriptions fixture for Integration admin; change URL and make Retries unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Send test payload” reaches I04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i09"></a>
## I09 — Partner exchange agreements

**EN:** Partner exchange agreements · **JA:** データ共有契約  
**Requirement:** FR-I09 / WF-17 · **Actor:** Tenant admin · **Surface:** Integrations · **Layout:** form

**Purpose:** Define cross-organization sharing.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save agreement draft → I10.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I09) · [EN](../Prototype.html?lang=en#I09) · [JA](../Prototype.html?lang=ja#I09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Partner | City command | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Purpose | Incident response | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Fields | Location + pseudonymous SOS | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Retention | 30 days | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Approval | Both organizations required | Read-only from the authoritative source/version; cannot be edited in this form. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I10 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I09 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For partner exchange agreements, what do Partner, Purpose establish, and is “Save agreement draft” available to Tenant admin in this scope?

**Primary visual:** Partner disclosure boundary with retention and approval state

**Primary action:** Save agreement draft → I10

**Progressive disclosure:** Keep Partner, Purpose in the decision layer. Put the supporting details for Fields, Retention, Approval, full source/version history and FR-I09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a partner exchange agreements fixture for Tenant admin; change Partner and make Approval unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save agreement draft” reaches I10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i10"></a>
## I10 — IOC exchange history

**EN:** IOC exchange history · **JA:** IOC連携履歴  
**Requirement:** FR-I10 / WF-17 · **Actor:** Operator · **Surface:** Integrations · **Layout:** list

**Purpose:** Verify what a partner actually received.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** I09, O33.  
**Output:** Inspect payload → I04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I10) · [EN](../Prototype.html?lang=en#I10) · [JA](../Prototype.html?lang=ja#I10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| INC-2041 | Sent · application ACK received | Read-only within object scope; display source/time when they affect decisions. |
| SOS-041 | Sent · ACK pending | Read-only within object scope; display source/time when they affect decisions. |
| Update 4 | Rejected · schema mismatch | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I04 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I10 — V2 visual composition

**Context:** configuration · **Role:** Operator

**Primary question:** For ioc exchange history, what do INC-2041, SOS-041 establish, and is “Inspect payload” available to Operator in this scope?

**Primary visual:** Exchange timeline with payload scope and receipt identity

**Primary action:** Inspect payload → I04

**Progressive disclosure:** Keep INC-2041, SOS-041 in the decision layer. Put the supporting details for Update 4, full source/version history and FR-I10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a ioc exchange history fixture for Operator; change INC-2041 and make Update 4 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Inspect payload” reaches I04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i11"></a>
## I11 — Drone fleet

**EN:** Drone fleet · **JA:** ドローン一覧  
**Requirement:** FR-I11 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** cards

**Purpose:** Mission readiness at a glance.  
**Key rule:** The local pilot and controller retain operational authority.  
**Entry:** I15.  
**Output:** Plan mission → I12.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I11) · [EN](../Prototype.html?lang=en#I11) · [JA](../Prototype.html?lang=ja#I11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| DR-01 | Ready · battery 92% | Read-only within object scope; display source/time when they affect decisions. |
| DR-02 | Maintenance | Read-only within object scope; display source/time when they affect decisions. |
| DR-03 | Offline | Read-only within object scope; display source/time when they affect decisions. |
| Control | Certified local operator | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I12 with a valid payload/version, and verify that it is blocked when the guard for WF-16 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I11 — V2 visual composition

**Context:** configuration · **Role:** Drone operator

**Primary question:** For drone fleet, what do DR-01, DR-02 establish, and is “Plan mission” available to Drone operator in this scope?

**Primary visual:** Fleet readiness cards showing battery, availability and pilot control

**Primary action:** Plan mission → I12

**Progressive disclosure:** Keep DR-01, DR-02 in the decision layer. Put the supporting details for DR-03, Control, full source/version history and FR-I11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a drone fleet fixture for Drone operator; change DR-01 and make Control unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Plan mission” reaches I12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i12"></a>
## I12 — Drone mission planning

**EN:** Drone mission planning · **JA:** ドローン任務の計画  
**Requirement:** FR-I12 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** map

**Purpose:** Observe the perimeter of Building A.  
**Key rule:** The local pilot and controller retain operational authority.  
**Entry:** I11.  
**Output:** Review mission approval → I13.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I12) · [EN](../Prototype.html?lang=en#I12) · [JA](../Prototype.html?lang=ja#I12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Purpose | Situation assessment | Read-only within object scope; display source/time when they affect decisions. |
| Geofence | Campus perimeter | Read-only within object scope; display source/time when they affect decisions. |
| Pilot | Assigned | Read-only within object scope; display source/time when they affect decisions. |
| Weather | Requires local verification | Read-only within object scope; display source/time when they affect decisions. |
| Authority | Pending clearance | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I13 with a valid payload/version, and verify that it is blocked when the guard for WF-16 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I12 — V2 visual composition

**Context:** configuration · **Role:** Drone operator

**Primary question:** For drone mission planning, what do Purpose, Geofence establish, and is “Review mission approval” available to Drone operator in this scope?

**Primary visual:** Mission geofence with pilot, weather and authority checklist

**Primary action:** Review mission approval → I13

**Progressive disclosure:** Keep Purpose, Geofence in the decision layer. Put the supporting details for Pilot, Weather, Authority, full source/version history and FR-I12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a drone mission planning fixture for Drone operator; change Purpose and make Authority unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review mission approval” reaches I13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i13"></a>
## I13 — Drone preflight & approval

**EN:** Drone preflight & approval · **JA:** 飛行前確認と承認  
**Requirement:** FR-I13 / WF-16 · **Actor:** Drone supervisor · **Surface:** Integrations · **Layout:** form

**Purpose:** Local authority remains with the pilot.  
**Key rule:** The local pilot and controller retain operational authority.  
**Entry:** I12, P07.  
**Output:** Approve simulated mission → I14.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I13) · [EN](../Prototype.html?lang=en#I13) · [JA](../Prototype.html?lang=ja#I13)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Pilot | Verified role | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Battery | 92% | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Geofence | Validated | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Clearance | Evidence attached | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Lost-link plan | Local controller policy | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I13:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I14 with a valid payload/version, and verify that it is blocked when the guard for WF-16 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I13 — V2 visual composition

**Context:** configuration · **Role:** Drone supervisor

**Primary question:** For drone preflight & approval, what do Pilot, Battery establish, and is “Approve simulated mission” available to Drone supervisor in this scope?

**Primary visual:** Preflight gate showing lost-link plan and explicit pilot approval

**Primary action:** Approve simulated mission → I14

**Progressive disclosure:** Keep Pilot, Battery in the decision layer. Put the supporting details for Geofence, Clearance, Lost-link plan, full source/version history and FR-I13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a drone preflight & approval fixture for Drone supervisor; change Pilot and make Lost-link plan unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve simulated mission” reaches I14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i14"></a>
## I14 — Drone mission telemetry

**EN:** Drone mission telemetry · **JA:** ドローン任務の監視  
**Requirement:** FR-I14 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** map

**Purpose:** DR-01 · observation mission.  
**Key rule:** The local pilot and controller retain operational authority.  
**Entry:** I13.  
**Output:** Review mission record → I15.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I14) · [EN](../Prototype.html?lang=en#I14) · [JA](../Prototype.html?lang=ja#I14)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Flight state | Simulated · in progress | Read-only within object scope; display source/time when they affect decisions. |
| Altitude | 30 m AGL | Read-only within object scope; display source/time when they affect decisions. |
| Battery | 86% | Read-only within object scope; display source/time when they affect decisions. |
| Telemetry age | 2 seconds | Read-only within object scope; display source/time when they affect decisions. |
| Command | Accepted · completion unconfirmed | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I14:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I15 with a valid payload/version, and verify that it is blocked when the guard for WF-16 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I14 — V2 visual composition

**Context:** command · **Role:** Drone operator

**Primary question:** For drone mission telemetry, what do Flight state, Altitude establish, and is “Review mission record” available to Drone operator in this scope?

**Primary visual:** Telemetry strip with stale-data warning and local-control ownership

**Primary action:** Review mission record → I15

**Progressive disclosure:** Keep Flight state, Altitude in the decision layer. Put the supporting details for Battery, Telemetry age, Command, full source/version history and FR-I14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a drone mission telemetry fixture for Drone operator; change Flight state and make Command unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review mission record” reaches I15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="i15"></a>
## I15 — Drone mission record

**EN:** Drone mission record · **JA:** ドローン任務の記録  
**Requirement:** FR-I15 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** detail

**Purpose:** Preserve mission evidence.  
**Key rule:** The local pilot and controller retain operational authority.  
**Entry:** I14.  
**Output:** Return to fleet → I11.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#I15) · [EN](../Prototype.html?lang=en#I15) · [JA](../Prototype.html?lang=ja#I15)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Mission | MS-0041 | Read-only within object scope; display source/time when they affect decisions. |
| Incident | INC-2041 | Read-only within object scope; display source/time when they affect decisions. |
| Flight log | Stored in regional evidence vault | Read-only within object scope; display source/time when they affect decisions. |
| Outcome | Observation complete | Read-only within object scope; display source/time when they affect decisions. |
| Pilot | Signed off | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-I15:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I11 with a valid payload/version, and verify that it is blocked when the guard for WF-16 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### I15 — V2 visual composition

**Context:** configuration · **Role:** Drone operator

**Primary question:** For drone mission record, what do Mission, Incident establish, and is “Return to fleet” available to Drone operator in this scope?

**Primary visual:** Mission evidence timeline with flight log and accountable pilot

**Primary action:** Return to fleet → I11

**Progressive disclosure:** Keep Mission, Incident in the decision layer. Put the supporting details for Flight log, Outcome, Pilot, full source/version history and FR-I15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Treat transport acknowledgment as transport evidence only; show rejected payloads and stale telemetry without optimistic control success.

**V2 acceptance scenario:** Use a drone mission record fixture for Drone operator; change Mission and make Pilot unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Return to fleet” reaches I11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t01"></a>
## T01 — Tenant overview

**EN:** Tenant overview · **JA:** 組織の概要  
**Requirement:** FR-T01 / WF-20 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** dashboard

**Purpose:** Operate across regions with clear boundaries.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T02, T05.  
**Output:** Manage organization → T02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T01) · [EN](../Prototype.html?lang=en#T01) · [JA](../Prototype.html?lang=ja#T01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Region | EU | Read-only within object scope; display source/time when they affect decisions. |
| Sites | 24 | Read-only within object scope; display source/time when they affect decisions. |
| Licensed devices | 480 | Read-only within object scope; display source/time when they affect decisions. |
| Operational health | Degraded connector | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T02 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T01 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For tenant overview, what do Region, Sites establish, and is “Manage organization” available to Tenant admin in this scope?

**Primary visual:** Tenant health summary with region and capacity allocation

**Primary action:** Manage organization → T02

**Progressive disclosure:** Keep Region, Sites in the decision layer. Put the supporting details for Licensed devices, Operational health, full source/version history and FR-T01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a tenant overview fixture for Tenant admin; change Region and make Operational health unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Manage organization” reaches T02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t02"></a>
## T02 — Organization & regions

**EN:** Organization & regions · **JA:** 組織とデータ地域  
**Requirement:** FR-T02 / WF-18 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** form

**Purpose:** Choose residency and local defaults.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** T01.  
**Output:** Save settings → T01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T02) · [EN](../Prototype.html?lang=en#T02) · [JA](../Prototype.html?lang=ja#T02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Organization | Northstar | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Home region | EU | Read-only from the authoritative source/version; cannot be edited in this form. |
| Locale | en-GB | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Timezone | Europe/Berlin | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Cross-region transfer | Disabled | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T01 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T02 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For organization & regions, what do Organization, Home region establish, and is “Save settings” available to Tenant admin in this scope?

**Primary visual:** Organization region boundary beside locale and timezone controls

**Primary action:** Save settings → T01

**Progressive disclosure:** Keep Organization, Home region in the decision layer. Put the supporting details for Locale, Timezone, Cross-region transfer, full source/version history and FR-T02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a organization & regions fixture for Tenant admin; change Organization and make Cross-region transfer unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save settings” reaches T01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t03"></a>
## T03 — Users & invitations

**EN:** Users & invitations · **JA:** ユーザーと招待  
**Requirement:** FR-T03 / WF-01 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** list

**Purpose:** Review access across the organization.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** T04.  
**Output:** Edit membership → T04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T03) · [EN](../Prototype.html?lang=en#T03) · [JA](../Prototype.html?lang=ja#T03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Alex | Operator · active | Read-only within object scope; display source/time when they affect decisions. |
| Jamie | Responder · active | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | Invite pending | Read-only within object scope; display source/time when they affect decisions. |
| Service client | IOC · scoped | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T04 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T03 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For users & invitations, what do Alex, Jamie establish, and is “Edit membership” available to Tenant admin in this scope?

**Primary visual:** Membership roster with invitation lifecycle and role badges

**Primary action:** Edit membership → T04

**Progressive disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Service client, full source/version history and FR-T03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a users & invitations fixture for Tenant admin; change Alex and make Service client unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit membership” reaches T04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t04"></a>
## T04 — Role & scope editor

**EN:** Role & scope editor · **JA:** ロールと権限範囲  
**Requirement:** FR-T04 / WF-01 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** form

**Purpose:** Separate operational duties.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** T03.  
**Output:** Save role → T03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T04) · [EN](../Prototype.html?lang=en#T04) · [JA](../Prototype.html?lang=ja#T04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Role | Warning approver | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Sites | Harbor Campus | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Permission | warning.approve | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Restriction | Cannot approve own draft | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T03 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T04 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For role & scope editor, what do Role, Sites establish, and is “Save role” available to Tenant admin in this scope?

**Primary visual:** Permission-by-site matrix with explicit denied capabilities

**Primary action:** Save role → T03

**Progressive disclosure:** Keep Role, Sites in the decision layer. Put the supporting details for Permission, Restriction, full source/version history and FR-T04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a role & scope editor fixture for Tenant admin; change Role and make Restriction unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save role” reaches T03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t05"></a>
## T05 — On-call & escalation

**EN:** On-call & escalation · **JA:** 当番とエスカレーション  
**Requirement:** FR-T05 / WF-10 · **Actor:** Supervisor · **Surface:** Administration · **Layout:** form

**Purpose:** Escalate when acknowledgment is missing.  
**Key rule:** Sent does not mean delivered, read or acknowledged by a person.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save escalation → T01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T05) · [EN](../Prototype.html?lang=en#T05) · [JA](../Prototype.html?lang=ja#T05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Primary | Campus duty operator | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| After 60 seconds | Shift supervisor | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| After 120 seconds | Regional backup | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Calendar | Europe/Berlin | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T01 with a valid payload/version, and verify that it is blocked when the guard for WF-10 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T05 — V2 visual composition

**Context:** configuration · **Role:** Supervisor

**Primary question:** For on-call & escalation, what do Primary, After 60 seconds establish, and is “Save escalation” available to Supervisor in this scope?

**Primary visual:** Escalation ladder with timed owner changes and calendar coverage

**Primary action:** Save escalation → T01

**Progressive disclosure:** Keep Primary, After 60 seconds in the decision layer. Put the supporting details for After 120 seconds, Calendar, full source/version history and FR-T05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a on-call & escalation fixture for Supervisor; change Primary and make Calendar unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save escalation” reaches T01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t06"></a>
## T06 — Message templates & languages

**EN:** Message templates & languages · **JA:** メッセージと言語  
**Requirement:** FR-T06 / WF-09 · **Actor:** Content editor · **Surface:** Administration · **Layout:** form

**Purpose:** Publish reviewed instructions per locale.  
**Key rule:** Approval binds to an exact content version and recipient scope.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Preview template → O14.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T06) · [EN](../Prototype.html?lang=en#T06) · [JA](../Prototype.html?lang=ja#T06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Template | Fire evacuation | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| English | Approved v4 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Japanese | Review required | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Fallback | Approved English | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Variables | site_name + issued_at | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O14 with a valid payload/version, and verify that it is blocked when the guard for WF-09 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T06 — V2 visual composition

**Context:** configuration · **Role:** Content editor

**Primary question:** For message templates & languages, what do Template, English establish, and is “Preview template” available to Content editor in this scope?

**Primary visual:** Multilingual message preview with variable and fallback status

**Primary action:** Preview template → O14

**Progressive disclosure:** Keep Template, English in the decision layer. Put the supporting details for Japanese, Fallback, Variables, full source/version history and FR-T06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a message templates & languages fixture for Content editor; change Template and make Variables unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Preview template” reaches O14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t07"></a>
## T07 — Hazard taxonomy & playbooks

**EN:** Hazard taxonomy & playbooks · **JA:** 危険分類と対応手順  
**Requirement:** FR-T07 / WF-20 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** form

**Purpose:** Extend categories without changing the core.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T08.  
**Output:** Save draft playbook → T08.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T07) · [EN](../Prototype.html?lang=en#T07) · [JA](../Prototype.html?lang=ja#T07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Category | Personal safety / welfare check | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Severity default | P2 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Playbook | Contact then dispatch | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Sensitivity | Restricted | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T08 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T07 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For hazard taxonomy & playbooks, what do Category, Severity default establish, and is “Save draft playbook” available to Tenant admin in this scope?

**Primary visual:** Hazard taxonomy tree connected to draft playbook steps

**Primary action:** Save draft playbook → T08

**Progressive disclosure:** Keep Category, Severity default in the decision layer. Put the supporting details for Playbook, Sensitivity, full source/version history and FR-T07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a hazard taxonomy & playbooks fixture for Tenant admin; change Category and make Sensitivity unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save draft playbook” reaches T08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t08"></a>
## T08 — Playbook approval

**EN:** Playbook approval · **JA:** 対応手順の承認  
**Requirement:** FR-T08 / WF-20 · **Actor:** Supervisor · **Surface:** Administration · **Layout:** detail

**Purpose:** Approve the operational sequence.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T07.  
**Output:** Publish demo playbook → T07.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T08) · [EN](../Prototype.html?lang=en#T08) · [JA](../Prototype.html?lang=ja#T08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Version | Welfare v2 | Read-only within object scope; display source/time when they affect decisions. |
| Trigger | Manual SOS or detector | Read-only within object scope; display source/time when they affect decisions. |
| Steps | Check-in → operator → dispatch | Read-only within object scope; display source/time when they affect decisions. |
| Timeout | 60 seconds | Read-only within object scope; display source/time when they affect decisions. |
| Owner | Care supervisor | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T07 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T08 — V2 visual composition

**Context:** configuration · **Role:** Supervisor

**Primary question:** For playbook approval, what do Version, Trigger establish, and is “Publish demo playbook” available to Supervisor in this scope?

**Primary visual:** Versioned playbook step sequence and timeout responsibilities

**Primary action:** Publish demo playbook → T07

**Progressive disclosure:** Keep Version, Trigger in the decision layer. Put the supporting details for Steps, Timeout, Owner, full source/version history and FR-T08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a playbook approval fixture for Supervisor; change Version and make Owner unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish demo playbook” reaches T07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t09"></a>
## T09 — Retention & legal holds

**EN:** Retention & legal holds · **JA:** 保存とリーガルホールド  
**Requirement:** FR-T09 / WF-19 · **Actor:** Privacy officer · **Surface:** Administration · **Layout:** form

**Purpose:** Apply policies by data class and region.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save policy draft → T10.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T09) · [EN](../Prototype.html?lang=en#T09) · [JA](../Prototype.html?lang=ja#T09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Precise location | 30 days proposed | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Incident record | 365 days proposed | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Evidence | 90 days proposed | Read-only from the authoritative source/version; cannot be edited in this form. |
| Legal hold | Overrides deletion | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T10 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T09 — V2 visual composition

**Context:** configuration · **Role:** Privacy officer

**Primary question:** For retention & legal holds, what do Precise location, Incident record establish, and is “Save policy draft” available to Privacy officer in this scope?

**Primary visual:** Retention timeline with legal-hold overrides

**Primary action:** Save policy draft → T10

**Progressive disclosure:** Keep Precise location, Incident record in the decision layer. Put the supporting details for Evidence, Legal hold, full source/version history and FR-T09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a retention & legal holds fixture for Privacy officer; change Precise location and make Legal hold unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save policy draft” reaches T10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t10"></a>
## T10 — Privacy request review

**EN:** Privacy request review · **JA:** プライバシー申請の審査  
**Requirement:** FR-T10 / WF-19 · **Actor:** Privacy officer · **Surface:** Administration · **Layout:** detail

**Purpose:** Review request DR-202.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** T09.  
**Output:** Approve demo export → C30.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T10) · [EN](../Prototype.html?lang=en#T10) · [JA](../Prototype.html?lang=ja#T10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Identity | Verified | Read-only within object scope; display source/time when they affect decisions. |
| Data classes | Profile + eligible history | Read-only within object scope; display source/time when they affect decisions. |
| Incident evidence | Hold applied | Read-only within object scope; display source/time when they affect decisions. |
| Decision | Export allowed subset | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C30 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T10 — V2 visual composition

**Context:** configuration · **Role:** Privacy officer

**Primary question:** For privacy request review, what do Identity, Data classes establish, and is “Approve demo export” available to Privacy officer in this scope?

**Primary visual:** Data export preview showing identity proof and evidence exclusions

**Primary action:** Approve demo export → C30

**Progressive disclosure:** Keep Identity, Data classes in the decision layer. Put the supporting details for Incident evidence, Decision, full source/version history and FR-T10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a privacy request review fixture for Privacy officer; change Identity and make Decision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve demo export” reaches C30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t11"></a>
## T11 — Audit record

**EN:** Audit record · **JA:** 監査記録  
**Requirement:** FR-T11 / WF-19 · **Actor:** Auditor · **Surface:** Administration · **Layout:** detail

**Purpose:** Immutable decision evidence.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** O30.  
**Output:** Return to audit search → O30.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T11) · [EN](../Prototype.html?lang=en#T11) · [JA](../Prototype.html?lang=ja#T11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Actor | Supervisor B | Read-only within object scope; display source/time when they affect decisions. |
| Action | warning.approved | Read-only within object scope; display source/time when they affect decisions. |
| Object | WARN-03 v3 | Read-only within object scope; display source/time when they affect decisions. |
| Time | 2026-10-23T08:44:03Z | Read-only within object scope; display source/time when they affect decisions. |
| Trace | tr-9041 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O30 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T11 — V2 visual composition

**Context:** configuration · **Role:** Auditor

**Primary question:** For audit record, what do Actor, Action establish, and is “Return to audit search” available to Auditor in this scope?

**Primary visual:** Immutable audit event linking actor, object and trace

**Primary action:** Return to audit search → O30

**Progressive disclosure:** Keep Actor, Action in the decision layer. Put the supporting details for Object, Time, Trace, full source/version history and FR-T11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a audit record fixture for Auditor; change Actor and make Trace unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Return to audit search” reaches O30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t12"></a>
## T12 — Service health & recovery

**EN:** Service health & recovery · **JA:** サービス状態と復旧  
**Requirement:** FR-T12 / WF-20 · **Actor:** Platform operator · **Surface:** Administration · **Layout:** dashboard

**Purpose:** Separate degraded service from silent failure.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T13.  
**Output:** Open recovery runbook → T13.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T12) · [EN](../Prototype.html?lang=en#T12) · [JA](../Prototype.html?lang=ja#T12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| EU ingestion | Healthy | Read-only within object scope; display source/time when they affect decisions. |
| Notification provider | Degraded | Read-only within object scope; display source/time when they affect decisions. |
| Database replica | Lag 0.4 s | Read-only within object scope; display source/time when they affect decisions. |
| Last restore drill | Passed in test environment | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T13 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T12 — V2 visual composition

**Context:** configuration · **Role:** Platform operator

**Primary question:** For service health & recovery, what do EU ingestion, Notification provider establish, and is “Open recovery runbook” available to Platform operator in this scope?

**Primary visual:** Dependency-health topology with recovery readiness

**Primary action:** Open recovery runbook → T13

**Progressive disclosure:** Keep EU ingestion, Notification provider in the decision layer. Put the supporting details for Database replica, Last restore drill, full source/version history and FR-T12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a service health & recovery fixture for Platform operator; change EU ingestion and make Last restore drill unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open recovery runbook” reaches T13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t13"></a>
## T13 — Recovery runbook

**EN:** Recovery runbook · **JA:** 復旧手順  
**Requirement:** FR-T13 / WF-20 · **Actor:** Platform operator · **Surface:** Administration · **Layout:** detail

**Purpose:** Regional incident data recovery.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T12.  
**Output:** Record drill outcome → T12.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T13) · [EN](../Prototype.html?lang=en#T13) · [JA](../Prototype.html?lang=ja#T13)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Step 1 | Fence the failed writer | Read-only within object scope; display source/time when they affect decisions. |
| Step 2 | Promote verified replica | Read-only within object scope; display source/time when they affect decisions. |
| Step 3 | Replay durable outbox | Read-only within object scope; display source/time when they affect decisions. |
| Step 4 | Reconcile delivery and command receipts | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T13:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T12 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T13 — V2 visual composition

**Context:** configuration · **Role:** Platform operator

**Primary question:** For recovery runbook, what do Step 1, Step 2 establish, and is “Record drill outcome” available to Platform operator in this scope?

**Primary visual:** Recovery checklist with verified completion evidence per step

**Primary action:** Record drill outcome → T12

**Progressive disclosure:** Keep Step 1, Step 2 in the decision layer. Put the supporting details for Step 3, Step 4, full source/version history and FR-T13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a recovery runbook fixture for Platform operator; change Step 1 and make Step 4 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Record drill outcome” reaches T12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t14"></a>
## T14 — Usage & subscription

**EN:** Usage & subscription · **JA:** 利用状況と契約  
**Requirement:** FR-T14 / WF-20 · **Actor:** Billing admin · **Surface:** Administration · **Layout:** detail

**Purpose:** Capacity and commercial visibility.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T15.  
**Output:** Review capacity policy → T15.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T14) · [EN](../Prototype.html?lang=en#T14) · [JA](../Prototype.html?lang=ja#T14)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Plan | Enterprise regional | Read-only within object scope; display source/time when they affect decisions. |
| Sites | 24 of 30 | Read-only within object scope; display source/time when they affect decisions. |
| Devices | 480 of 600 | Read-only within object scope; display source/time when they affect decisions. |
| SMS budget | 72% consumed | Read-only within object scope; display source/time when they affect decisions. |
| Emergency behavior | No silent incident drop | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T14:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T15 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T14 — V2 visual composition

**Context:** configuration · **Role:** Billing admin

**Primary question:** For usage & subscription, what do Plan, Sites establish, and is “Review capacity policy” available to Billing admin in this scope?

**Primary visual:** Capacity consumption chart with emergency reservation

**Primary action:** Review capacity policy → T15

**Progressive disclosure:** Keep Plan, Sites in the decision layer. Put the supporting details for Devices, SMS budget, Emergency behavior, full source/version history and FR-T14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a usage & subscription fixture for Billing admin; change Plan and make Emergency behavior unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review capacity policy” reaches T15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t15"></a>
## T15 — Capacity & quota policy

**EN:** Capacity & quota policy · **JA:** 容量と制限  
**Requirement:** FR-T15 / WF-20 · **Actor:** Platform operator · **Surface:** Administration · **Layout:** form

**Purpose:** Protect emergency traffic during bursts.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T14.  
**Output:** Save capacity draft → T14.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T15) · [EN](../Prototype.html?lang=en#T15) · [JA](../Prototype.html?lang=ja#T15)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| P1 reserved queue | Enabled | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Telemetry sampling | Allowed under overload | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| SOS ingestion | Reserved capacity | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Warning threshold | 80% | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Hard limit behavior | Visible degraded mode | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T15:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T14 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T15 — V2 visual composition

**Context:** configuration · **Role:** Platform operator

**Primary question:** For capacity & quota policy, what do P1 reserved queue, Telemetry sampling establish, and is “Save capacity draft” available to Platform operator in this scope?

**Primary visual:** Queue policy comparison showing P1 reserves and hard-limit effects

**Primary action:** Save capacity draft → T14

**Progressive disclosure:** Keep P1 reserved queue, Telemetry sampling in the decision layer. Put the supporting details for SOS ingestion, Warning threshold, Hard limit behavior, full source/version history and FR-T15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a capacity & quota policy fixture for Platform operator; change P1 reserved queue and make Hard limit behavior unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save capacity draft” reaches T14 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t16"></a>
## T16 — Analytics & export

**EN:** Analytics & export · **JA:** 分析とレポート出力  
**Requirement:** FR-T16 / WF-20 · **Actor:** Analyst · **Surface:** Administration · **Layout:** detail

**Purpose:** Measure response without hiding gaps.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T17.  
**Output:** Prepare demo report → T17.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T16) · [EN](../Prototype.html?lang=en#T16) · [JA](../Prototype.html?lang=ja#T16)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Period | Last 30 days | Read-only within object scope; display source/time when they affect decisions. |
| Median acknowledgment | 18 seconds · demo | Read-only within object scope; display source/time when they affect decisions. |
| P95 acknowledgment | 61 seconds · demo | Read-only within object scope; display source/time when they affect decisions. |
| Unconfirmed delivery | 3.4% · demo | Read-only within object scope; display source/time when they affect decisions. |
| Export | De-identified | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T16:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T17 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T16 — V2 visual composition

**Context:** configuration · **Role:** Analyst

**Primary question:** For analytics & export, what do Period, Median acknowledgment establish, and is “Prepare demo report” available to Analyst in this scope?

**Primary visual:** Distribution chart separating median, P95 and missing receipts

**Primary action:** Prepare demo report → T17

**Progressive disclosure:** Keep Period, Median acknowledgment in the decision layer. Put the supporting details for P95 acknowledgment, Unconfirmed delivery, Export, full source/version history and FR-T16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a analytics & export fixture for Analyst; change Period and make Export unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Prepare demo report” reaches T17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="t17"></a>
## T17 — Report schedule

**EN:** Report schedule · **JA:** レポートのスケジュール  
**Requirement:** FR-T17 / WF-20 · **Actor:** Analyst · **Surface:** Administration · **Layout:** form

**Purpose:** Deliver an authorized operational report.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** T16.  
**Output:** Save schedule draft → T16.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#T17) · [EN](../Prototype.html?lang=en#T17) · [JA](../Prototype.html?lang=ja#T17)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Report | Monthly readiness | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Audience | Tenant supervisors | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Timezone | Europe/Berlin | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Schedule | First Monday · 09:00 | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |
| PII | Excluded | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-T17:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to T16 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### T17 — V2 visual composition

**Context:** configuration · **Role:** Analyst

**Primary question:** For report schedule, what do Report, Audience establish, and is “Save schedule draft” available to Analyst in this scope?

**Primary visual:** Report schedule preview with timezone and recipient disclosure

**Primary action:** Save schedule draft → T16

**Progressive disclosure:** Keep Report, Audience in the decision layer. Put the supporting details for Timezone, Schedule, PII, full source/version history and FR-T17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Preserve scope and draft policy on validation failure; never silently apply a tenant-wide or cross-region change.

**V2 acceptance scenario:** Use a report schedule fixture for Analyst; change Report and make PII unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save schedule draft” reaches T16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x01"></a>
## X01 — No connection / SOS pending

**EN:** No connection / SOS pending · **JA:** オフライン・SOS未送信  
**Requirement:** FR-X01 / WF-05 · **Actor:** Citizen · **Surface:** System states · **Layout:** alert

**Purpose:** Your SOS has not reached the server.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** View offline outbox → R11.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X01) · [EN](../Prototype.html?lang=en#X01) · [JA](../Prototype.html?lang=ja#X01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Local record | Saved on this device | Read-only within object scope; display source/time when they affect decisions. |
| Server receipt | Not received | Read-only within object scope; display source/time when they affect decisions. |
| Retry | When connection returns | Read-only within object scope; display source/time when they affect decisions. |
| Alternative | Use configured local emergency calling option | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R11 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X01 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For no connection / sos pending, what do Local record, Server receipt establish, and is “View offline outbox” available to Citizen in this scope?

**Primary visual:** Locally saved SOS receipt with server-receipt absence prominent

**Primary action:** View offline outbox → R11

**Progressive disclosure:** Keep Local record, Server receipt in the decision layer. Put the supporting details for Retry, Alternative, full source/version history and FR-X01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a no connection / sos pending fixture for Citizen; change Local record and make Alternative unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View offline outbox” reaches R11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x02"></a>
## X02 — Permission unavailable

**EN:** Permission unavailable · **JA:** 位置情報の権限なし  
**Requirement:** FR-X02 / WF-05 · **Actor:** Citizen · **Surface:** System states · **Layout:** detail

**Purpose:** Location permission is off.  
**Key rule:** Server receipt and human acknowledgment are separate states.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Enter location manually → C06.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X02) · [EN](../Prototype.html?lang=en#X02) · [JA](../Prototype.html?lang=ja#X02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Automatic location | Unavailable | Read-only within object scope; display source/time when they affect decisions. |
| Alternative | Enter building and room | Read-only within object scope; display source/time when they affect decisions. |
| Privacy | Permission remains your choice | Read-only within object scope; display source/time when they affect decisions. |
| SOS | Manual location supported | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C06 with a valid payload/version, and verify that it is blocked when the guard for WF-05 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X02 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For permission unavailable, what do Automatic location, Alternative establish, and is “Enter location manually” available to Citizen in this scope?

**Primary visual:** Manual location entry beside unavailable-permission explanation

**Primary action:** Enter location manually → C06

**Progressive disclosure:** Keep Automatic location, Alternative in the decision layer. Put the supporting details for Privacy, SOS, full source/version history and FR-X02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a permission unavailable fixture for Citizen; change Automatic location and make SOS unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Enter location manually” reaches C06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x03"></a>
## X03 — No active incidents

**EN:** No active incidents · **JA:** 対応中のインシデントなし  
**Requirement:** FR-X03 / WF-20 · **Actor:** Operator · **Surface:** System states · **Layout:** success

**Purpose:** No active incidents in this view.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review device health → S06.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X03) · [EN](../Prototype.html?lang=en#X03) · [JA](../Prototype.html?lang=ja#X03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Filters | Harbor Campus · active | Read-only within object scope; display source/time when they affect decisions. |
| Coverage | Only authorized sites | Read-only within object scope; display source/time when they affect decisions. |
| Last sync | 10 seconds ago | Read-only within object scope; display source/time when they affect decisions. |
| Unknown devices | Still listed in health | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S06 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X03 — V2 visual composition

**Context:** configuration · **Role:** Operator

**Primary question:** For no active incidents, what do Filters, Coverage establish, and is “Review device health” available to Operator in this scope?

**Primary visual:** Empty incident view with coverage and unknown-device evidence

**Primary action:** Review device health → S06

**Progressive disclosure:** Keep Filters, Coverage in the decision layer. Put the supporting details for Last sync, Unknown devices, full source/version history and FR-X03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a no active incidents fixture for Operator; change Filters and make Unknown devices unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review device health” reaches S06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x04"></a>
## X04 — Access denied

**EN:** Access denied · **JA:** アクセス権限なし  
**Requirement:** FR-X04 / WF-01 · **Actor:** All roles · **Surface:** System states · **Layout:** detail

**Purpose:** This record is outside your access scope.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Choose workspace → A04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X04) · [EN](../Prototype.html?lang=en#X04) · [JA](../Prototype.html?lang=ja#X04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Request | Restricted incident | Read-only within object scope; display source/time when they affect decisions. |
| Data | Not disclosed | Read-only within object scope; display source/time when they affect decisions. |
| Next step | Ask your tenant administrator | Read-only within object scope; display source/time when they affect decisions. |
| Audit | Access attempt recorded | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A04 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X04 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For access denied, what do Request, Data establish, and is “Choose workspace” available to All roles in this scope?

**Primary visual:** Workspace selection recovery without disclosing denied object

**Primary action:** Choose workspace → A04

**Progressive disclosure:** Keep Request, Data in the decision layer. Put the supporting details for Next step, Audit, full source/version history and FR-X04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a access denied fixture for All roles; change Request and make Audit unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Choose workspace” reaches A04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x05"></a>
## X05 — Service unavailable

**EN:** Service unavailable · **JA:** サービスの一時停止  
**Requirement:** FR-X05 / WF-20 · **Actor:** All roles · **Surface:** System states · **Layout:** alert

**Purpose:** This service is temporarily unavailable.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open offline pack → C18.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X05) · [EN](../Prototype.html?lang=en#X05) · [JA](../Prototype.html?lang=ja#X05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Status | Regional API degraded | Read-only within object scope; display source/time when they affect decisions. |
| Cached content | May be stale | Read-only within object scope; display source/time when they affect decisions. |
| Submission | Not confirmed | Read-only within object scope; display source/time when they affect decisions. |
| Recovery | Retry without creating duplicates | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C18 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X05 — V2 visual composition

**Context:** emergency · **Role:** All roles

**Primary question:** For service unavailable, what do Status, Cached content establish, and is “Open offline pack” available to All roles in this scope?

**Primary visual:** Service outage panel with cached-content age and alternate path

**Primary action:** Open offline pack → C18

**Progressive disclosure:** Keep Status, Cached content in the decision layer. Put the supporting details for Submission, Recovery, full source/version history and FR-X05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a service unavailable fixture for All roles; change Status and make Recovery unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open offline pack” reaches C18 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x06"></a>
## X06 — Unsaved changes & conflict

**EN:** Unsaved changes & conflict · **JA:** 未保存の変更と競合  
**Requirement:** FR-X06 / WF-02 · **Actor:** Site admin · **Surface:** System states · **Layout:** detail

**Purpose:** A newer version was published.  
**Key rule:** Location and plans are versioned; new revisions require approval.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review latest version → S05.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X06) · [EN](../Prototype.html?lang=en#X06) · [JA](../Prototype.html?lang=ja#X06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Your version | 12 | Read-only within object scope; display source/time when they affect decisions. |
| Current version | 13 | Read-only within object scope; display source/time when they affect decisions. |
| Your changes | Preserved locally | Read-only within object scope; display source/time when they affect decisions. |
| Resolution | Review before resubmitting | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S05 with a valid payload/version, and verify that it is blocked when the guard for WF-02 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X06 — V2 visual composition

**Context:** configuration · **Role:** Site admin

**Primary question:** For unsaved changes & conflict, what do Your version, Current version establish, and is “Review latest version” available to Site admin in this scope?

**Primary visual:** Local/server version comparison preserving unsaved edits

**Primary action:** Review latest version → S05

**Progressive disclosure:** Keep Your version, Current version in the decision layer. Put the supporting details for Your changes, Resolution, full source/version history and FR-X06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a unsaved changes & conflict fixture for Site admin; change Your version and make Resolution unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review latest version” reaches S05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x07"></a>
## X07 — Empty search & filter reset

**EN:** Empty search & filter reset · **JA:** 検索結果なし  
**Requirement:** FR-X07 / WF-20 · **Actor:** Operator · **Surface:** System states · **Layout:** detail

**Purpose:** No matches for these filters.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Reset search → O30.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X07) · [EN](../Prototype.html?lang=en#X07) · [JA](../Prototype.html?lang=ja#X07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Query | INC-9999 | Read-only within object scope; display source/time when they affect decisions. |
| Scope | Harbor Campus | Read-only within object scope; display source/time when they affect decisions. |
| Period | Today | Read-only within object scope; display source/time when they affect decisions. |
| Suggestion | Check identifier or reset filters | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O30 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X07 — V2 visual composition

**Context:** configuration · **Role:** Operator

**Primary question:** For empty search & filter reset, what do Query, Scope establish, and is “Reset search” available to Operator in this scope?

**Primary visual:** Search query and active filters beside reset control

**Primary action:** Reset search → O30

**Progressive disclosure:** Keep Query, Scope in the decision layer. Put the supporting details for Period, Suggestion, full source/version history and FR-X07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a empty search & filter reset fixture for Operator; change Query and make Suggestion unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Reset search” reaches O30 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x08"></a>
## X08 — Expired session

**EN:** Expired session · **JA:** セッションの有効期限切れ  
**Requirement:** FR-X08 / WF-01 · **Actor:** All roles · **Surface:** System states · **Layout:** alert

**Purpose:** Sign in again to continue.  
**Key rule:** Verify identity and organization scope before exposing data.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Sign in → A02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X08) · [EN](../Prototype.html?lang=en#X08) · [JA](../Prototype.html?lang=ja#X08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Draft | Preserved without submitting | Read-only within object scope; display source/time when they affect decisions. |
| Session | Expired | Read-only within object scope; display source/time when they affect decisions. |
| Sensitive data | Hidden | Read-only within object scope; display source/time when they affect decisions. |
| Next | Re-authenticate | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to A02 with a valid payload/version, and verify that it is blocked when the guard for WF-01 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X08 — V2 visual composition

**Context:** configuration · **Role:** All roles

**Primary question:** For expired session, what do Draft, Session establish, and is “Sign in” available to All roles in this scope?

**Primary visual:** Session-expired panel explaining protected draft recovery

**Primary action:** Sign in → A02

**Progressive disclosure:** Keep Draft, Session in the decision layer. Put the supporting details for Sensitive data, Next, full source/version history and FR-X08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a expired session fixture for All roles; change Draft and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Sign in” reaches A02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x09"></a>
## X09 — Loading & stale data

**EN:** Loading & stale data · **JA:** 読み込み中・古いデータ  
**Requirement:** FR-X09 / WF-20 · **Actor:** Operator · **Surface:** System states · **Layout:** detail

**Purpose:** Refreshing the situation view.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Return to command → O01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X09) · [EN](../Prototype.html?lang=en#X09) · [JA](../Prototype.html?lang=ja#X09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Current view | Cached · 2 minutes old | Read-only within object scope; display source/time when they affect decisions. |
| Connection | Reconnecting | Read-only within object scope; display source/time when they affect decisions. |
| Commands | Disabled while stale | Read-only within object scope; display source/time when they affect decisions. |
| Next | Confirm fresh state | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O01 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X09 — V2 visual composition

**Context:** emergency · **Role:** Operator

**Primary question:** For loading & stale data, what do Current view, Connection establish, and is “Return to command” available to Operator in this scope?

**Primary visual:** Stale-data band showing source age and unavailable commands

**Primary action:** Return to command → O01

**Progressive disclosure:** Keep Current view, Connection in the decision layer. Put the supporting details for Commands, Next, full source/version history and FR-X09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a loading & stale data fixture for Operator; change Current view and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Return to command” reaches O01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="x10"></a>
## X10 — Attachment rejected

**EN:** Attachment rejected · **JA:** 添付ファイルの拒否  
**Requirement:** FR-X10 / WF-11 · **Actor:** Responder · **Surface:** System states · **Layout:** detail

**Purpose:** This attachment could not be accepted.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Choose another attachment → R10.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#X10) · [EN](../Prototype.html?lang=en#X10) · [JA](../Prototype.html?lang=ja#X10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| File | Observation clip | Read-only within object scope; display source/time when they affect decisions. |
| Reason | Exceeds 20 MB | Read-only within object scope; display source/time when they affect decisions. |
| Allowed | JPEG PNG MP4 PDF | Read-only within object scope; display source/time when they affect decisions. |
| Action | Choose a smaller file | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-X10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R10 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### X10 — V2 visual composition

**Context:** configuration · **Role:** Responder

**Primary question:** For attachment rejected, what do File, Reason establish, and is “Choose another attachment” available to Responder in this scope?

**Primary visual:** Rejected attachment preview with reason and allowed replacement

**Primary action:** Choose another attachment → R10

**Progressive disclosure:** Keep File, Reason in the decision layer. Put the supporting details for Allowed, Action, full source/version history and FR-X10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Show the exact unavailable capability and a valid recovery action while preserving safe local context; recovery navigation is not recovery evidence.

**V2 acceptance scenario:** Use a attachment rejected fixture for Responder; change File and make Action unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Choose another attachment” reaches R10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g01"></a>
## G01 — Regional operations

**EN:** Regional operations · **JA:** 地域別運用  
**Requirement:** FR-G01 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** dashboard

**Purpose:** Production cells, independently operated.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** G04.  
**Output:** Inspect regional cell → G02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G01) · [EN](../Prototype.html?lang=en#G01) · [JA](../Prototype.html?lang=ja#G01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| EU cell | Healthy · 3 availability zones | Read-only within object scope; display source/time when they affect decisions. |
| APAC cell | Healthy · 3 availability zones | Read-only within object scope; display source/time when they affect decisions. |
| Global directory | Healthy | Read-only within object scope; display source/time when they affect decisions. |
| Residency | Enforced | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G02 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G01 — V2 visual composition

**Context:** configuration · **Role:** Platform operator

**Primary question:** For regional operations, what do EU cell, APAC cell establish, and is “Inspect regional cell” available to Platform operator in this scope?

**Primary visual:** Regional cell topology with residency boundaries

**Primary action:** Inspect regional cell → G02

**Progressive disclosure:** Keep EU cell, APAC cell in the decision layer. Put the supporting details for Global directory, Residency, full source/version history and FR-G01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a regional operations fixture for Platform operator; change EU cell and make Residency unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect regional cell” reaches G02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g02"></a>
## G02 — Regional cell detail

**EN:** Regional cell detail · **JA:** リージョナルセルの詳細  
**Requirement:** FR-G02 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** detail

**Purpose:** EU cell · operational readiness.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** G01.  
**Output:** Review recovery readiness → G03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G02) · [EN](../Prototype.html?lang=en#G02) · [JA](../Prototype.html?lang=ja#G02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Writer epoch | 42 | Read-only within object scope; display source/time when they affect decisions. |
| Broker lag | 120 ms | Read-only within object scope; display source/time when they affect decisions. |
| Database | Primary + verified replicas | Read-only within object scope; display source/time when they affect decisions. |
| DR target | Approved EU destination | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G03 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G02 — V2 visual composition

**Context:** configuration · **Role:** Platform operator

**Primary question:** For regional cell detail, what do Writer epoch, Broker lag establish, and is “Review recovery readiness” available to Platform operator in this scope?

**Primary visual:** Cell replication and writer-epoch status

**Primary action:** Review recovery readiness → G03

**Progressive disclosure:** Keep Writer epoch, Broker lag in the decision layer. Put the supporting details for Database, DR target, full source/version history and FR-G02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a regional cell detail fixture for Platform operator; change Writer epoch and make DR target unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review recovery readiness” reaches G03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g03"></a>
## G03 — Disaster recovery drill

**EN:** Disaster recovery drill · **JA:** 災害復旧訓練  
**Requirement:** FR-G03 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** form

**Purpose:** Validate recovery with recorded evidence.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** G02.  
**Output:** Record drill evidence → G04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G03) · [EN](../Prototype.html?lang=en#G03) · [JA](../Prototype.html?lang=ja#G03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Cell | EU | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Mode | Isolated recovery exercise | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Backup | Verified snapshot | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Target RPO | 5 minutes | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Target RTO | 60 minutes | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G04 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G03 — V2 visual composition

**Context:** configuration · **Role:** Platform operator

**Primary question:** For disaster recovery drill, what do Cell, Mode establish, and is “Record drill evidence” available to Platform operator in this scope?

**Primary visual:** Recovery drill timeline with target RPO/RTO and evidence

**Primary action:** Record drill evidence → G04

**Progressive disclosure:** Keep Cell, Mode in the decision layer. Put the supporting details for Backup, Target RPO, Target RTO, full source/version history and FR-G03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a disaster recovery drill fixture for Platform operator; change Cell and make Target RTO unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Record drill evidence” reaches G04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g04"></a>
## G04 — Recovery verification

**EN:** Recovery verification · **JA:** 復旧の検証  
**Requirement:** FR-G04 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** detail

**Purpose:** Verify data and ownership before routing.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** G03.  
**Output:** Review regional operations → G01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G04) · [EN](../Prototype.html?lang=en#G04) · [JA](../Prototype.html?lang=ja#G04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Writer fencing | Verified | Read-only within object scope; display source/time when they affect decisions. |
| SOS records | Reconciled | Read-only within object scope; display source/time when they affect decisions. |
| Outbox | Replayed without duplicate effects | Read-only within object scope; display source/time when they affect decisions. |
| Residency | EU only | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G01 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G04 — V2 visual composition

**Context:** configuration · **Role:** Platform operator

**Primary question:** For recovery verification, what do Writer fencing, SOS records establish, and is “Review regional operations” available to Platform operator in this scope?

**Primary visual:** Recovery proof grid separating fencing and record durability

**Primary action:** Review regional operations → G01

**Progressive disclosure:** Keep Writer fencing, SOS records in the decision layer. Put the supporting details for Outbox, Residency, full source/version history and FR-G04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a recovery verification fixture for Platform operator; change Writer fencing and make Residency unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review regional operations” reaches G01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g05"></a>
## G05 — Tenant provisioning

**EN:** Tenant provisioning · **JA:** テナントの作成  
**Requirement:** FR-G05 / WF-18 · **Actor:** Platform admin · **Surface:** Platform · **Layout:** form

**Purpose:** Provision a production tenant boundary.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review provisioning plan → G06.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G05) · [EN](../Prototype.html?lang=en#G05) · [JA](../Prototype.html?lang=ja#G05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Organization | Northstar | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Home region | EU | Read-only from the authoritative source/version; cannot be edited in this form. |
| Isolation | Dedicated database | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Plan | Enterprise | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Policy set | Reviewed baseline | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G06 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G05 — V2 visual composition

**Context:** configuration · **Role:** Platform admin

**Primary question:** For tenant provisioning, what do Tenant, Home region establish, and is “Review provisioning plan” available to Platform admin in this scope?

**Primary visual:** Tenant provisioning dependency plan and isolation boundary

**Primary action:** Review provisioning plan → G06

**Progressive disclosure:** Keep Tenant, Home region in the decision layer. Put the supporting details for Isolation, Plan, Policy set, full source/version history and FR-G05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a tenant provisioning fixture for Platform admin; change Tenant and make Policy set unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review provisioning plan” reaches G06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g06"></a>
## G06 — Tenant lifecycle

**EN:** Tenant lifecycle · **JA:** テナントのライフサイクル  
**Requirement:** FR-G06 / WF-18 · **Actor:** Platform admin · **Surface:** Platform · **Layout:** detail

**Purpose:** Northstar · lifecycle controls.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** G05, G08.  
**Output:** Request support access → G07.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G06) · [EN](../Prototype.html?lang=en#G06) · [JA](../Prototype.html?lang=ja#G06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Status | Active | Read-only within object scope; display source/time when they affect decisions. |
| Region migration | Review required | Read-only within object scope; display source/time when they affect decisions. |
| Deletion | Retention workflow required | Read-only within object scope; display source/time when they affect decisions. |
| Support access | Not granted | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G07 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G06 — V2 visual composition

**Context:** configuration · **Role:** Platform admin

**Primary question:** For tenant lifecycle, what do Status, Region migration establish, and is “Request support access” available to Platform admin in this scope?

**Primary visual:** Tenant lifecycle state diagram with migration/deletion gates

**Primary action:** Request support access → G07

**Progressive disclosure:** Keep Status, Region migration in the decision layer. Put the supporting details for Deletion, Support access, full source/version history and FR-G06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a tenant lifecycle fixture for Platform admin; change Status and make Support access unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Request support access” reaches G07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g07"></a>
## G07 — Time-bound support access

**EN:** Time-bound support access · **JA:** 期限付きサポートアクセス  
**Requirement:** FR-G07 / WF-19 · **Actor:** Security operator · **Surface:** Platform · **Layout:** form

**Purpose:** Request the smallest support scope.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** G06.  
**Output:** Submit access request → G08.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G07) · [EN](../Prototype.html?lang=en#G07) · [JA](../Prototype.html?lang=ja#G07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Organization | Northstar | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Scope | Connector diagnostics metadata | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Reason | Investigate IOC delay | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Duration | 30 minutes | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| PII access | Excluded | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G08 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G07 — V2 visual composition

**Context:** configuration · **Role:** Security operator

**Primary question:** For time-bound support access, what do Tenant, Scope establish, and is “Submit access request” available to Security operator in this scope?

**Primary visual:** Support request showing minimal scope and access expiry

**Primary action:** Submit access request → G08

**Progressive disclosure:** Keep Tenant, Scope in the decision layer. Put the supporting details for Reason, Duration, PII access, full source/version history and FR-G07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a time-bound support access fixture for Security operator; change Tenant and make PII access unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit access request” reaches G08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g08"></a>
## G08 — Support access approval

**EN:** Support access approval · **JA:** サポートアクセスの承認  
**Requirement:** FR-G08 / WF-19 · **Actor:** Tenant admin · **Surface:** Platform · **Layout:** detail

**Purpose:** Approve a scoped support session.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** G07.  
**Output:** Approve scoped access — sample → G06.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G08) · [EN](../Prototype.html?lang=en#G08) · [JA](../Prototype.html?lang=ja#G08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Requester | Platform support | Read-only within object scope; display source/time when they affect decisions. |
| Scope | Diagnostics metadata | Read-only within object scope; display source/time when they affect decisions. |
| Expiry | 30 minutes | Read-only within object scope; display source/time when they affect decisions. |
| Audit | All access recorded | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G06 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G08 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For support access approval, what do Requester, Scope establish, and is “Approve scoped access — sample” available to Tenant admin in this scope?

**Primary visual:** Support authorization comparing requester and approved scope

**Primary action:** Approve scoped access — sample → G06

**Progressive disclosure:** Keep Requester, Scope in the decision layer. Put the supporting details for Expiry, Audit, full source/version history and FR-G08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a support access approval fixture for Tenant admin; change Requester and make Audit unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Approve scoped access — sample” reaches G06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g09"></a>
## G09 — Release & schema compatibility

**EN:** Release & schema compatibility · **JA:** リリースとスキーマ互換性  
**Requirement:** FR-G09 / WF-20 · **Actor:** Release manager · **Surface:** Platform · **Layout:** list

**Purpose:** Release only compatible contracts.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** G10.  
**Output:** Review release gate → G10.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G09) · [EN](../Prototype.html?lang=en#G09) · [JA](../Prototype.html?lang=ja#G09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Incident service | 2.4 · canary | Read-only within object scope; display source/time when they affect decisions. |
| Event schema | v1.3 additive | Read-only within object scope; display source/time when they affect decisions. |
| Mobile API | v1 supported | Read-only within object scope; display source/time when they affect decisions. |
| Rollback | Previous image available | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G10 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G09 — V2 visual composition

**Context:** configuration · **Role:** Release manager

**Primary question:** For release & schema compatibility, what do Incident service, Event schema establish, and is “Review release gate” available to Release manager in this scope?

**Primary visual:** Release compatibility matrix across schema and mobile versions

**Primary action:** Review release gate → G10

**Progressive disclosure:** Keep Incident service, Event schema in the decision layer. Put the supporting details for Mobile API, Rollback, full source/version history and FR-G09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a release & schema compatibility fixture for Release manager; change Incident service and make Rollback unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review release gate” reaches G10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g10"></a>
## G10 — Release gate & rollback

**EN:** Release gate & rollback · **JA:** リリース判定とロールバック  
**Requirement:** FR-G10 / WF-20 · **Actor:** Release manager · **Surface:** Platform · **Layout:** detail

**Purpose:** Verify behavior before promotion.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** G09.  
**Output:** Record release decision → G09.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G10) · [EN](../Prototype.html?lang=en#G10) · [JA](../Prototype.html?lang=ja#G10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Contract tests | Passed | Read-only within object scope; display source/time when they affect decisions. |
| Tenant isolation | Passed | Read-only within object scope; display source/time when they affect decisions. |
| SLO burn rate | Within gate | Read-only within object scope; display source/time when they affect decisions. |
| Migration | Expand phase only | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G09 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G10 — V2 visual composition

**Context:** configuration · **Role:** Release manager

**Primary question:** For release gate & rollback, what do Contract tests, Tenant isolation establish, and is “Record release decision” available to Release manager in this scope?

**Primary visual:** Release gate checklist with rollback viability and SLO trend

**Primary action:** Record release decision → G09

**Progressive disclosure:** Keep Contract tests, Tenant isolation in the decision layer. Put the supporting details for SLO burn rate, Migration, full source/version history and FR-G10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a release gate & rollback fixture for Release manager; change Contract tests and make Migration unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Record release decision” reaches G09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g11"></a>
## G11 — Security incidents

**EN:** Security incidents · **JA:** セキュリティインシデント  
**Requirement:** FR-G11 / WF-19 · **Actor:** Security operator · **Surface:** Platform · **Layout:** list

**Purpose:** Respond to platform threats.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** G12.  
**Output:** Open security case → G12.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G11) · [EN](../Prototype.html?lang=en#G11) · [JA](../Prototype.html?lang=ja#G11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Device certificate | Revoked · investigation | Read-only within object scope; display source/time when they affect decisions. |
| Webhook replay | Blocked | Read-only within object scope; display source/time when they affect decisions. |
| Support session | Expired | Read-only within object scope; display source/time when they affect decisions. |
| Upload scan | Quarantined | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G12 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G11 — V2 visual composition

**Context:** configuration · **Role:** Security operator

**Primary question:** For security incidents, what do Device certificate, Webhook replay establish, and is “Open security case” available to Security operator in this scope?

**Primary visual:** Security signal queue with affected trust boundary

**Primary action:** Open security case → G12

**Progressive disclosure:** Keep Device certificate, Webhook replay in the decision layer. Put the supporting details for Support session, Upload scan, full source/version history and FR-G11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a security incidents fixture for Security operator; change Device certificate and make Upload scan unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open security case” reaches G12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="g12"></a>
## G12 — Security case & containment

**EN:** Security case & containment · **JA:** セキュリティ対応と封じ込め  
**Requirement:** FR-G12 / WF-19 · **Actor:** Security operator · **Surface:** Platform · **Layout:** form

**Purpose:** Contain the source without hiding coverage gaps.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** G11.  
**Output:** Record containment → G11.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#G12) · [EN](../Prototype.html?lang=en#G12) · [JA](../Prototype.html?lang=ja#G12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Case | SEC-041 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Source | GW-012 | Read-only from the authoritative source/version; cannot be edited in this form. |
| Action | Revoke certificate | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Coverage | Site supervisor notified | Read-only from the authoritative source/version; cannot be edited in this form. |
| Evidence | Preserved | Read-only from the authoritative source/version; cannot be edited in this form. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-G12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to G11 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### G12 — V2 visual composition

**Context:** configuration · **Role:** Security operator

**Primary question:** For security case & containment, what do Case, Source establish, and is “Record containment” available to Security operator in this scope?

**Primary visual:** Containment timeline showing residual exposure and evidence

**Primary action:** Record containment → G11

**Progressive disclosure:** Keep Case, Source in the decision layer. Put the supporting details for Action, Coverage, Evidence, full source/version history and FR-G12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep tenant data boundaries and regional writer authority explicit; stale operational metadata cannot authorize recovery or support access.

**V2 acceptance scenario:** Use a security case & containment fixture for Security operator; change Case and make Evidence unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Record containment” reaches G11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d01"></a>
## D01 — Developer workspace

**EN:** Developer workspace · **JA:** 開発者ワークスペース  
**Requirement:** FR-D01 / WF-17 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** cards

**Purpose:** Build against explicit contracts.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open API explorer → D02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D01) · [EN](../Prototype.html?lang=en#D01) · [JA](../Prototype.html?lang=ja#D01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| API reference | Version 1 | Read-only within object scope; display source/time when they affect decisions. |
| Event schemas | CloudEvents + domain v1 | Read-only within object scope; display source/time when they affect decisions. |
| SDK examples | HTTPS + MQTT | Read-only within object scope; display source/time when they affect decisions. |
| Sandbox | Exercise isolated | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to D02 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D01 — V2 visual composition

**Context:** configuration · **Role:** Partner developer

**Primary question:** For developer workspace, what do API reference, Event schemas establish, and is “Open API explorer” available to Partner developer in this scope?

**Primary visual:** Developer resource map separating sandbox and production

**Primary action:** Open API explorer → D02

**Progressive disclosure:** Keep API reference, Event schemas in the decision layer. Put the supporting details for SDK examples, Sandbox, full source/version history and FR-D01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a developer workspace fixture for Partner developer; change API reference and make Sandbox unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open API explorer” reaches D02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d02"></a>
## D02 — API explorer

**EN:** API explorer · **JA:** APIエクスプローラー  
**Requirement:** FR-D02 / WF-03 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** detail

**Purpose:** POST /v1/events.  
**Key rule:** Preserve source, time and ID; duplicates do not create new effects.  
**Entry:** D01.  
**Output:** Run sandbox request → D03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D02) · [EN](../Prototype.html?lang=en#D02) · [JA](../Prototype.html?lang=ja#D02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Auth | event.ingest | Read-only within object scope; display source/time when they affect decisions. |
| Payload | CloudEvent v1 | Read-only within object scope; display source/time when they affect decisions. |
| Idempotency | Source + event ID | Read-only within object scope; display source/time when they affect decisions. |
| Response | 202 durable receipt | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to D03 with a valid payload/version, and verify that it is blocked when the guard for WF-03 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D02 — V2 visual composition

**Context:** configuration · **Role:** Partner developer

**Primary question:** For api explorer, what do Auth, Payload establish, and is “Run sandbox request” available to Partner developer in this scope?

**Primary visual:** Request/response split pane with scope and idempotency preview

**Primary action:** Run sandbox request → D03

**Progressive disclosure:** Keep Auth, Payload in the decision layer. Put the supporting details for Idempotency, Response, full source/version history and FR-D02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a api explorer fixture for Partner developer; change Auth and make Response unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Run sandbox request” reaches D03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d03"></a>
## D03 — Sandbox request results

**EN:** Sandbox request results · **JA:** サンドボックスの実行結果  
**Requirement:** FR-D03 / WF-03 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** detail

**Purpose:** Inspect the complete receipt.  
**Key rule:** Preserve source, time and ID; duplicates do not create new effects.  
**Entry:** D02.  
**Output:** Open schema registry → D04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D03) · [EN](../Prototype.html?lang=en#D03) · [JA](../Prototype.html?lang=ja#D03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| HTTP status | 202 | Read-only within object scope; display source/time when they affect decisions. |
| Receipt | event-041 | Read-only within object scope; display source/time when they affect decisions. |
| Durability | Committed | Read-only within object scope; display source/time when they affect decisions. |
| Incident | Not yet confirmed | Read-only within object scope; display source/time when they affect decisions. |
| Trace | tr-9041 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to D04 with a valid payload/version, and verify that it is blocked when the guard for WF-03 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D03 — V2 visual composition

**Context:** configuration · **Role:** Partner developer

**Primary question:** For sandbox request results, what do HTTP status, Receipt establish, and is “Open schema registry” available to Partner developer in this scope?

**Primary visual:** Sandbox response showing HTTP, durable receipt and trace separately

**Primary action:** Open schema registry → D04

**Progressive disclosure:** Keep HTTP status, Receipt in the decision layer. Put the supporting details for Durability, Incident, Trace, full source/version history and FR-D03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a sandbox request results fixture for Partner developer; change HTTP status and make Trace unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open schema registry” reaches D04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d04"></a>
## D04 — Schema registry

**EN:** Schema registry · **JA:** スキーマレジストリー  
**Requirement:** FR-D04 / WF-03 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** list

**Purpose:** Track compatibility before upgrading.  
**Key rule:** Preserve source, time and ID; duplicates do not create new effects.  
**Entry:** D03.  
**Output:** View schema contract → D05.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D04) · [EN](../Prototype.html?lang=en#D04) · [JA](../Prototype.html?lang=ja#D04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| signal.fire.observed | v1 · active | Read-only within object scope; display source/time when they affect decisions. |
| incident.updated | v1 · active | Read-only within object scope; display source/time when they affect decisions. |
| command.result | v1 · restricted | Read-only within object scope; display source/time when they affect decisions. |
| Deprecated versions | None | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to D05 with a valid payload/version, and verify that it is blocked when the guard for WF-03 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D04 — V2 visual composition

**Context:** configuration · **Role:** Partner developer

**Primary question:** For schema registry, what do signal.fire.observed, incident.updated establish, and is “View schema contract” available to Partner developer in this scope?

**Primary visual:** Schema version tree with compatibility and deprecation markers

**Primary action:** View schema contract → D05

**Progressive disclosure:** Keep signal.fire.observed, incident.updated in the decision layer. Put the supporting details for command.result, Deprecated versions, full source/version history and FR-D04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a schema registry fixture for Partner developer; change signal.fire.observed and make Deprecated versions unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View schema contract” reaches D05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d05"></a>
## D05 — Connector manifest editor

**EN:** Connector manifest editor · **JA:** コネクターマニフェストの編集  
**Requirement:** FR-D05 / WF-17 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** form

**Purpose:** Declare capabilities explicitly.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** D04.  
**Output:** Submit for conformance → D06.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D05) · [EN](../Prototype.html?lang=en#D05) · [JA](../Prototype.html?lang=ja#D05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Connector | Partner sensor bridge | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Version | 1.0.0 | Read-only from the authoritative source/version; cannot be edited in this form. |
| Capabilities | telemetry.read | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Auth | mTLS | Read-only from the authoritative source/version; cannot be edited in this form. |
| Retry class | Idempotent ingest | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to D06 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D05 — V2 visual composition

**Context:** configuration · **Role:** Partner developer

**Primary question:** For connector manifest editor, what do Connector, Version establish, and is “Submit for conformance” available to Partner developer in this scope?

**Primary visual:** Connector capability manifest with validation diff

**Primary action:** Submit for conformance → D06

**Progressive disclosure:** Keep Connector, Version in the decision layer. Put the supporting details for Capabilities, Auth, Retry class, full source/version history and FR-D05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a connector manifest editor fixture for Partner developer; change Connector and make Retry class unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit for conformance” reaches D06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d06"></a>
## D06 — Conformance certification

**EN:** Conformance certification · **JA:** 適合性の審査  
**Requirement:** FR-D06 / WF-17 · **Actor:** Integration reviewer · **Surface:** Developer · **Layout:** detail

**Purpose:** Review adapter behavior under failure.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** D05.  
**Output:** Approve adapter version → I01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D06) · [EN](../Prototype.html?lang=en#D06) · [JA](../Prototype.html?lang=ja#D06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Duplicate delivery | Passed | Read-only within object scope; display source/time when they affect decisions. |
| Tenant spoof | Rejected | Read-only within object scope; display source/time when they affect decisions. |
| Clock skew | Flagged | Read-only within object scope; display source/time when they affect decisions. |
| Expired credentials | Rejected | Read-only within object scope; display source/time when they affect decisions. |
| Backpressure | Preserved | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I01 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D06 — V2 visual composition

**Context:** configuration · **Role:** Integration reviewer

**Primary question:** For conformance certification, what do Duplicate delivery, Tenant spoof establish, and is “Approve adapter version” available to Integration reviewer in this scope?

**Primary visual:** Conformance scenario matrix with security and backpressure results

**Primary action:** Approve adapter version → I01

**Progressive disclosure:** Keep Duplicate delivery, Tenant spoof in the decision layer. Put the supporting details for Clock skew, Expired credentials, Backpressure, full source/version history and FR-D06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a conformance certification fixture for Integration reviewer; change Duplicate delivery and make Backpressure unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve adapter version” reaches I01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d07"></a>
## D07 — Webhook delivery trace

**EN:** Webhook delivery trace · **JA:** Webhook配信の追跡  
**Requirement:** FR-D07 / WF-10 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** timeline

**Purpose:** Understand every delivery attempt.  
**Key rule:** Sent does not mean delivered, read or acknowledged by a person.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review subscription → I08.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D07) · [EN](../Prototype.html?lang=en#D07) · [JA](../Prototype.html?lang=ja#D07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| 10:40:00 | Queued | Read-only within object scope; display source/time when they affect decisions. |
| 10:40:01 | Partner returned 503 | Read-only within object scope; display source/time when they affect decisions. |
| 10:40:03 | Retry scheduled | Read-only within object scope; display source/time when they affect decisions. |
| 10:40:07 | Application ACK received | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I08 with a valid payload/version, and verify that it is blocked when the guard for WF-10 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D07 — V2 visual composition

**Context:** configuration · **Role:** Partner developer

**Primary question:** For webhook delivery trace, what do 10:40:00, 10:40:01 establish, and is “Review subscription” available to Partner developer in this scope?

**Primary visual:** Webhook retry timeline with exact delivery outcome

**Primary action:** Review subscription → I08

**Progressive disclosure:** Keep 10:40:00, 10:40:01 in the decision layer. Put the supporting details for 10:40:03, 10:40:07, full source/version history and FR-D07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a webhook delivery trace fixture for Partner developer; change 10:40:00 and make 10:40:07 unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review subscription” reaches I08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="d08"></a>
## D08 — Credential rotation

**EN:** Credential rotation · **JA:** 認証情報のローテーション  
**Requirement:** FR-D08 / WF-17 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** form

**Purpose:** Rotate credentials without exposing secrets.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Create rotation request → I07.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#D08) · [EN](../Prototype.html?lang=en#D08) · [JA](../Prototype.html?lang=ja#D08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Client | Partner IOC | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Current key | Expires in 10 days | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Overlap window | 24 hours | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |
| New key | Vault reference only | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-D08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I07 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### D08 — V2 visual composition

**Context:** configuration · **Role:** Partner developer

**Primary question:** For credential rotation, what do Client, Current key establish, and is “Create rotation request” available to Partner developer in this scope?

**Primary visual:** Credential overlap timeline with secret-free rotation preview

**Primary action:** Create rotation request → I07

**Progressive disclosure:** Keep Client, Current key in the decision layer. Put the supporting details for Overlap window, New key, full source/version history and FR-D08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep sandbox requests distinguishable from production; never expose raw credentials in previews, traces or copied examples.

**V2 acceptance scenario:** Use a credential rotation fixture for Partner developer; change Client and make New key unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Create rotation request” reaches I07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="l01"></a>
## L01 — Language coverage

**EN:** Language coverage · **JA:** 言語対応状況  
**Requirement:** FR-L01 / WF-18 · **Actor:** Localization manager · **Surface:** Localization · **Layout:** dashboard

**Purpose:** Three languages, one product meaning.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** L03, L04, L05.  
**Output:** Open translation workspace → L02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#L01) · [EN](../Prototype.html?lang=en#L01) · [JA](../Prototype.html?lang=ja#L01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Vietnamese | vi-VN | Read-only within object scope; display source/time when they affect decisions. |
| English | en | Read-only within object scope; display source/time when they affect decisions. |
| Japanese | ja-JP | Read-only within object scope; display source/time when they affect decisions. |
| Critical templates | Review required before publish | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-L01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to L02 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### L01 — V2 visual composition

**Context:** configuration · **Role:** Localization manager

**Primary question:** For language coverage, what do Vietnamese, English establish, and is “Open translation workspace” available to Localization manager in this scope?

**Primary visual:** Language coverage grid highlighting critical missing content

**Primary action:** Open translation workspace → L02

**Progressive disclosure:** Keep Vietnamese, English in the decision layer. Put the supporting details for Japanese, Critical templates, full source/version history and FR-L01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**V2 acceptance scenario:** Use a language coverage fixture for Localization manager; change Vietnamese and make Critical templates unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open translation workspace” reaches L02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="l02"></a>
## L02 — Translation editor

**EN:** Translation editor · **JA:** 翻訳エディター  
**Requirement:** FR-L02 / WF-18 · **Actor:** Translator · **Surface:** Localization · **Layout:** form

**Purpose:** Translate a versioned message.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** L01, L06.  
**Output:** Submit translation review → L03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#L02) · [EN](../Prototype.html?lang=en#L02) · [JA](../Prototype.html?lang=ja#L02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Template | Fire evacuation v4 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Source language | English | Read-only from the authoritative source/version; cannot be edited in this form. |
| Target language | Japanese | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Variables | site_name + issued_at | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Review | Required | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-L02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to L03 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### L02 — V2 visual composition

**Context:** configuration · **Role:** Translator

**Primary question:** For translation editor, what do Template, Source language establish, and is “Submit translation review” available to Translator in this scope?

**Primary visual:** Source/translation paired editor with protected variables

**Primary action:** Submit translation review → L03

**Progressive disclosure:** Keep Template, Source language in the decision layer. Put the supporting details for Target language, Variables, Review, full source/version history and FR-L02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**V2 acceptance scenario:** Use a translation editor fixture for Translator; change Template and make Review unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit translation review” reaches L03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="l03"></a>
## L03 — Translation review

**EN:** Translation review · **JA:** 翻訳のレビュー  
**Requirement:** FR-L03 / WF-18 · **Actor:** Language reviewer · **Surface:** Localization · **Layout:** detail

**Purpose:** Review terminology and emergency meaning.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** L02.  
**Output:** Approve translation version → L01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#L03) · [EN](../Prototype.html?lang=en#L03) · [JA](../Prototype.html?lang=ja#L03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Source version | 4 | Read-only within object scope; display source/time when they affect decisions. |
| Target locale | ja-JP | Read-only within object scope; display source/time when they affect decisions. |
| Variable parity | Passed | Read-only within object scope; display source/time when they affect decisions. |
| Voice transcript | Matched | Read-only within object scope; display source/time when they affect decisions. |
| Reviewer | Independent language reviewer | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-L03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to L01 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### L03 — V2 visual composition

**Context:** configuration · **Role:** Language reviewer

**Primary question:** For translation review, what do Source version, Target locale establish, and is “Approve translation version” available to Language reviewer in this scope?

**Primary visual:** Version-parity review showing text, variables and voice transcript

**Primary action:** Approve translation version → L01

**Progressive disclosure:** Keep Source version, Target locale in the decision layer. Put the supporting details for Variable parity, Voice transcript, Reviewer, full source/version history and FR-L03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**V2 acceptance scenario:** Use a translation review fixture for Language reviewer; change Source version and make Reviewer unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve translation version” reaches L01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="l04"></a>
## L04 — Voice & pronunciation

**EN:** Voice & pronunciation · **JA:** 音声と発音  
**Requirement:** FR-L04 / WF-18 · **Actor:** Content editor · **Surface:** Localization · **Layout:** form

**Purpose:** Keep speech aligned with reviewed text.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** P08.  
**Output:** Save voice configuration → L01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#L04) · [EN](../Prototype.html?lang=en#L04) · [JA](../Prototype.html?lang=ja#L04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Locale | ja-JP | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Voice | Approved Japanese voice | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Transcript | Approved template v4 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Site pronunciation | Reviewed | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Fallback | Text transcript | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-L04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to L01 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### L04 — V2 visual composition

**Context:** configuration · **Role:** Content editor

**Primary question:** For voice & pronunciation, what do Locale, Voice establish, and is “Save voice configuration” available to Content editor in this scope?

**Primary visual:** Pronunciation samples paired with exact transcript and fallback

**Primary action:** Save voice configuration → L01

**Progressive disclosure:** Keep Locale, Voice in the decision layer. Put the supporting details for Transcript, Site pronunciation, Fallback, full source/version history and FR-L04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**V2 acceptance scenario:** Use a voice & pronunciation fixture for Content editor; change Locale and make Fallback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save voice configuration” reaches L01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="l05"></a>
## L05 — Locale fallback policy

**EN:** Locale fallback policy · **JA:** 言語フォールバック設定  
**Requirement:** FR-L05 / WF-18 · **Actor:** Tenant admin · **Surface:** Localization · **Layout:** form

**Purpose:** Make missing translations visible.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save language policy → L01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#L05) · [EN](../Prototype.html?lang=en#L05) · [JA](../Prototype.html?lang=ja#L05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Supported | vi-VN / en / ja-JP | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| User preference | Explicit profile choice | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Missing critical content | Approved fallback only | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Fallback language | English | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-L05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to L01 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### L05 — V2 visual composition

**Context:** configuration · **Role:** Tenant admin

**Primary question:** For locale fallback policy, what do Supported, User preference establish, and is “Save language policy” available to Tenant admin in this scope?

**Primary visual:** Locale fallback tree showing missing-critical-content behavior

**Primary action:** Save language policy → L01

**Progressive disclosure:** Keep Supported, User preference in the decision layer. Put the supporting details for Missing critical content, Fallback language, full source/version history and FR-L05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**V2 acceptance scenario:** Use a locale fallback policy fixture for Tenant admin; change Supported and make Fallback language unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Save language policy” reaches L01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="l06"></a>
## L06 — Emergency terminology

**EN:** Emergency terminology · **JA:** 緊急対応用語  
**Requirement:** FR-L06 / WF-18 · **Actor:** Language reviewer · **Surface:** Localization · **Layout:** list

**Purpose:** Keep terms consistent across channels.  
**Key rule:** Vietnamese, English and Japanese content is versioned with approved fallback.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review translation editor → L02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#L06) · [EN](../Prototype.html?lang=en#L06) · [JA](../Prototype.html?lang=ja#L06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| SOS | Yêu cầu trợ giúp / Assistance request / 救援要請 | Read-only within object scope; display source/time when they affect decisions. |
| Safe | Tự báo an toàn / Self-reported safe / 本人の安全報告 | Read-only within object scope; display source/time when they affect decisions. |
| Unknown | Chưa rõ / Unknown / 不明 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-L06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to L02 with a valid payload/version, and verify that it is blocked when the guard for WF-18 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### L06 — V2 visual composition

**Context:** configuration · **Role:** Language reviewer

**Primary question:** For emergency terminology, what do SOS, Safe establish, and is “Review translation editor” available to Language reviewer in this scope?

**Primary visual:** Emergency term comparison distinguishing safe, unknown and SOS

**Primary action:** Review translation editor → L02

**Progressive disclosure:** Keep SOS, Safe in the decision layer. Put the supporting details for Unknown, full source/version history and FR-L06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Block publication when critical variables, source version or approved voice meaning diverge; show missing translations explicitly.

**V2 acceptance scenario:** Use a emergency terminology fixture for Language reviewer; change SOS and make Unknown unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review translation editor” reaches L02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c31"></a>
## C31 — Circle membership & invitations

**EN:** Circle membership & invitations · **JA:** グループメンバーと招待  
**Requirement:** FR-C31 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Purpose:** Control who receives your updates.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** C32.  
**Output:** Manage invitation → C32.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C31) · [EN](../Prototype.html?lang=en#C31) · [JA](../Prototype.html?lang=ja#C31)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Alex | Owner | Read-only within object scope; display source/time when they affect decisions. |
| Jamie | Member | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | Invite pending | Read-only within object scope; display source/time when they affect decisions. |
| Sharing | Status only | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C31:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C32 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C31 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For circle membership & invitations, what do Alex, Jamie establish, and is “Manage invitation” available to Citizen in this scope?

**Primary visual:** Circle roster with invitation state and sharing privileges

**Primary action:** Manage invitation → C32

**Progressive disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Sharing, full source/version history and FR-C31 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a circle membership & invitations fixture for Citizen; change Alex and make Sharing unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Manage invitation” reaches C32 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c32"></a>
## C32 — Invite circle member

**EN:** Invite circle member · **JA:** メンバーの招待  
**Requirement:** FR-C32 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Invite someone you trust.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** C31.  
**Output:** Create invitation — sample → C31.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C32) · [EN](../Prototype.html?lang=en#C32) · [JA](../Prototype.html?lang=ja#C32)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Circle | Family | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Contact | jamie@example.test | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Role | Member | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Invitation expiry | 7 days | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |
| Location access | Not included | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C32:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C31 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C32 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For invite circle member, what do Circle, Contact establish, and is “Create invitation — sample” available to Citizen in this scope?

**Primary visual:** Invitation preview with recipient, role and location access

**Primary action:** Create invitation — sample → C31

**Progressive disclosure:** Keep Circle, Contact in the decision layer. Put the supporting details for Role, Invitation expiry, Location access, full source/version history and FR-C32 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a invite circle member fixture for Citizen; change Circle and make Location access unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Create invitation — sample” reaches C31 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c33"></a>
## C33 — Report or block conversation

**EN:** Report or block conversation · **JA:** 会話の報告・ブロック  
**Requirement:** FR-C33 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Control unwanted social contact.  
**Key rule:** A personal safety report does not close the incident.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Submit report — sample → C19.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C33) · [EN](../Prototype.html?lang=en#C33) · [JA](../Prototype.html?lang=ja#C33)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Conversation | Travel team | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Reason | Unwanted messages | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Action | Report and block sender | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Site warnings | Remain governed by safety policy | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C33:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C19 with a valid payload/version, and verify that it is blocked when the guard for WF-12 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C33 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For report or block conversation, what do Conversation, Reason establish, and is “Submit report — sample” available to Citizen in this scope?

**Primary visual:** Conversation report scope and block effect on safety warnings

**Primary action:** Submit report — sample → C19

**Progressive disclosure:** Keep Conversation, Reason in the decision layer. Put the supporting details for Action, Site warnings, full source/version history and FR-C33 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a report or block conversation fixture for Citizen; change Conversation and make Site warnings unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Submit report — sample” reaches C19 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c34"></a>
## C34 — Notification preferences

**EN:** Notification preferences · **JA:** 通知設定  
**Requirement:** FR-C34 / WF-10 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Choose channels and quiet hours.  
**Key rule:** Sent does not mean delivered, read or acknowledged by a person.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save preferences → C01.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C34) · [EN](../Prototype.html?lang=en#C34) · [JA](../Prototype.html?lang=ja#C34)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Language | Profile language | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Social messages | Quiet hours enabled | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Safety alerts | Site policy applies | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Discreet requests | No sound | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| SMS | Verified contact required | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C34:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C01 with a valid payload/version, and verify that it is blocked when the guard for WF-10 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C34 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For notification preferences, what do Language, Social messages establish, and is “Save preferences” available to Citizen in this scope?

**Primary visual:** Separate social, safety and discreet notification preferences

**Primary action:** Save preferences → C01

**Progressive disclosure:** Keep Language, Social messages in the decision layer. Put the supporting details for Safety alerts, Discreet requests, SMS, full source/version history and FR-C34 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a notification preferences fixture for Citizen; change Language and make SMS unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save preferences” reaches C01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o31"></a>
## O31 — Incident archive & reopen

**EN:** Incident archive & reopen · **JA:** 過去のインシデント  
**Requirement:** FR-O31 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** list

**Purpose:** Review closed incidents with full history.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review reopening → O32.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O31) · [EN](../Prototype.html?lang=en#O31) · [JA](../Prototype.html?lang=ja#O31)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| INC-2032 | Closed · documented handover | Read-only within object scope; display source/time when they affect decisions. |
| INC-2028 | Dismissed · false detection | Read-only within object scope; display source/time when they affect decisions. |
| INC-2010 | Closed · all tasks resolved | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O31:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O32 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O31 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For incident archive & reopen, what do INC-2032, INC-2028 establish, and is “Review reopening” available to Supervisor in this scope?

**Primary visual:** Closed-incident archive preserving original chronology

**Primary action:** Review reopening → O32

**Progressive disclosure:** Keep INC-2032, INC-2028 in the decision layer. Put the supporting details for INC-2010, full source/version history and FR-O31 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a incident archive & reopen fixture for Supervisor; change INC-2032 and make INC-2010 unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review reopening” reaches O32 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o32"></a>
## O32 — Reopen incident

**EN:** Reopen incident · **JA:** インシデントの再開  
**Requirement:** FR-O32 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Purpose:** Record why response needs to resume.  
**Key rule:** Every decision needs an owner, evidence, time and recovery path.  
**Entry:** O31.  
**Output:** Reopen incident — sample → O04.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O32) · [EN](../Prototype.html?lang=en#O32) · [JA](../Prototype.html?lang=ja#O32)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Incident | INC-2032 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Reason | New related evidence | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Owner | Campus command | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Severity | P1 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| History | Preserved | Read-only from the authoritative source/version; cannot be edited in this form. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O32:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O04 with a valid payload/version, and verify that it is blocked when the guard for WF-20 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O32 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For reopen incident, what do Incident, Reason establish, and is “Reopen incident — sample” available to Supervisor in this scope?

**Primary visual:** Reopening preview showing new owner and retained evidence

**Primary action:** Reopen incident — sample → O04

**Progressive disclosure:** Keep Incident, Reason in the decision layer. Put the supporting details for Owner, Severity, History, full source/version history and FR-O32 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a reopen incident fixture for Supervisor; change Incident and make History unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Reopen incident — sample” reaches O04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o33"></a>
## O33 — Federated incident sharing

**EN:** Federated incident sharing · **JA:** 組織間のインシデント共有  
**Requirement:** FR-O33 / WF-17 · **Actor:** Supervisor · **Surface:** Command · **Layout:** detail

**Purpose:** Share a controlled incident projection.  
**Key rule:** Enable only tested declared capabilities; do not replay physical commands.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review partner exchange → I10.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O33) · [EN](../Prototype.html?lang=en#O33) · [JA](../Prototype.html?lang=ja#O33)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Partner | City command | Read-only within object scope; display source/time when they affect decisions. |
| Fields | Incident location + pseudonymous SOS | Read-only within object scope; display source/time when they affect decisions. |
| Authority | Local incident owner retained | Read-only within object scope; display source/time when they affect decisions. |
| Agreement | Version 3 approved | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O33:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I10 with a valid payload/version, and verify that it is blocked when the guard for WF-17 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O33 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For federated incident sharing, what do Partner, Fields establish, and is “Review partner exchange” available to Supervisor in this scope?

**Primary visual:** Partner exchange preview showing disclosed fields and authority

**Primary action:** Review partner exchange → I10

**Progressive disclosure:** Keep Partner, Fields in the decision layer. Put the supporting details for Authority, Agreement, full source/version history and FR-O33 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a federated incident sharing fixture for Supervisor; change Partner and make Agreement unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review partner exchange” reaches I10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o34"></a>
## O34 — Accessibility assistance queue

**EN:** Accessibility assistance queue · **JA:** 配慮が必要な方への支援  
**Requirement:** FR-O34 / WF-11 · **Actor:** Dispatcher · **Surface:** Command · **Layout:** list

**Purpose:** Assign support based on reported needs.  
**Key rule:** Each task has one accountable owner; preserve handover history.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Assign capable unit → O09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O34) · [EN](../Prototype.html?lang=en#O34) · [JA](../Prototype.html?lang=ja#O34)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| SOS-041 | Mobility assistance · Room 505 | Read-only within object scope; display source/time when they affect decisions. |
| SOS-044 | Text communication preferred | Read-only within object scope; display source/time when they affect decisions. |
| SOS-046 | Assistance type unknown | Read-only within object scope; display source/time when they affect decisions. |
| Source | Self-reported needs | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O34:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O09 with a valid payload/version, and verify that it is blocked when the guard for WF-11 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O34 — V2 visual composition

**Context:** command · **Role:** Dispatcher

**Primary question:** For accessibility assistance queue, what do SOS-041, SOS-044 establish, and is “Assign capable unit” available to Dispatcher in this scope?

**Primary visual:** Accessibility queue matching functional needs to capable units

**Primary action:** Assign capable unit → O09

**Progressive disclosure:** Keep SOS-041, SOS-044 in the decision layer. Put the supporting details for SOS-046, Source, full source/version history and FR-O34 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep incident scope, evidence age and accountable owner visible; block consequential action when required authority or current evidence is unavailable.

**V2 acceptance scenario:** Use a accessibility assistance queue fixture for Dispatcher; change SOS-041 and make Source unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Assign capable unit” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c35"></a>
## C35 — Voice evacuation navigation

**EN:** Voice evacuation navigation · **JA:** 音声による避難ナビゲーション  
**Requirement:** FR-C35 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** navigation

**Purpose:** Follow reviewed steps away from the danger area.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** C37, C40.  
**Output:** Show next instruction → C36.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C35) · [EN](../Prototype.html?lang=en#C35) · [JA](../Prototype.html?lang=ja#C35)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Location | Building A · Floor 05 | Read-only within object scope; display source/time when they affect decisions. |
| Next instruction | Proceed to the marked west stairwell | Read-only within object scope; display source/time when they affect decisions. |
| Position quality | QR anchor confirmed | Read-only within object scope; display source/time when they affect decisions. |
| Hazard data | Updated 8 seconds ago | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C35:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C36 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C35 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For voice evacuation navigation, what do Location, Next instruction establish, and is “Show next instruction” available to Citizen in this scope?

**Primary visual:** Next landmark instruction above floor route and position-quality band

**Primary action:** Show next instruction → C36

**Progressive disclosure:** Keep Location, Next instruction in the decision layer. Put the supporting details for Position quality, Hazard data, full source/version history and FR-C35 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Stop obsolete speech when guidance version changes; stale position must not advance the next landmark.

**V2 acceptance scenario:** Use a voice evacuation navigation fixture for Citizen; change Location and make Hazard data unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Show next instruction” reaches C36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c36"></a>
## C36 — Navigation step & orientation

**EN:** Navigation step & orientation · **JA:** 経路案内と方向確認  
**Requirement:** FR-C36 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** navigation

**Purpose:** Use the WEST STAIR sign as your landmark.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** C35, C36, C39.  
**Output:** Repeat voice instruction → C36.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C36) · [EN](../Prototype.html?lang=en#C36) · [JA](../Prototype.html?lang=ja#C36)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Step | 2 of 5 | Read-only within object scope; display source/time when they affect decisions. |
| Instruction | Continue to the WEST STAIR sign | Read-only within object scope; display source/time when they affect decisions. |
| Heading | Uncertain · landmark guidance | Read-only within object scope; display source/time when they affect decisions. |
| Accessible route | Assistance refuge B | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C36:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C36 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C36 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For navigation step & orientation, what do Step, Instruction establish, and is “Repeat voice instruction” available to Citizen in this scope?

**Primary visual:** Single navigation step with landmark picture and heading-confidence label

**Primary action:** Repeat voice instruction → C36

**Progressive disclosure:** Keep Step, Instruction in the decision layer. Put the supporting details for Heading, Accessible route, full source/version history and FR-C36 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Unknown heading removes directional arrows; use a verified landmark and manual orientation instead of fabricated left/right.

**V2 acceptance scenario:** Use a navigation step & orientation fixture for Citizen; change Step and make Accessible route unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Repeat voice instruction” reaches C36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c37"></a>
## C37 — Route change notification

**EN:** Route change notification · **JA:** 経路変更のお知らせ  
**Requirement:** FR-C37 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Purpose:** The previous route is no longer recommended.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review updated route → C35.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C37) · [EN](../Prototype.html?lang=en#C37) · [JA](../Prototype.html?lang=ja#C37)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Reason | New hazard reported on corridor E | Read-only within object scope; display source/time when they affect decisions. |
| Old route | Withdrawn | Read-only within object scope; display source/time when they affect decisions. |
| New instruction | Follow the newly reviewed west route | Read-only within object scope; display source/time when they affect decisions. |
| Guidance version | 18 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C37:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C35 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C37 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For route change notification, what do Reason, Old route establish, and is “Review updated route” available to Citizen in this scope?

**Primary visual:** Withdrawn old route beside approved replacement and change reason

**Primary action:** Review updated route → C35

**Progressive disclosure:** Keep Reason, Old route in the decision layer. Put the supporting details for New instruction, Guidance version, full source/version history and FR-C37 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Withdraw old-route visuals and queued speech atomically; do not display replacement as approved before its version is accepted.

**V2 acceptance scenario:** Use a route change notification fixture for Citizen; change Reason and make Guidance version unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review updated route” reaches C35 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c38"></a>
## C38 — Position uncertain / no route

**EN:** Position uncertain / no route · **JA:** 位置不明・経路なし  
**Requirement:** FR-C38 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Purpose:** We cannot verify a route from your position.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Request assistance → C05.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C38) · [EN](../Prototype.html?lang=en#C38) · [JA](../Prototype.html?lang=ja#C38)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Floor | Not confirmed | Read-only within object scope; display source/time when they affect decisions. |
| Heading | Unreliable indoors | Read-only within object scope; display source/time when they affect decisions. |
| Next step | Identify a marked location or request help | Read-only within object scope; display source/time when they affect decisions. |
| Voice | Location uncertainty announced | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C38:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C05 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C38 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For position uncertain / no route, what do Floor, Heading establish, and is “Request assistance” available to Citizen in this scope?

**Primary visual:** Unknown floor/heading panel with manual location and assistance controls

**Primary action:** Request assistance → C05

**Progressive disclosure:** Keep Floor, Heading in the decision layer. Put the supporting details for Next step, Voice, full source/version history and FR-C38 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Do not invent a route or heading. Keep location correction and assistance reachable without permission recovery.

**V2 acceptance scenario:** Use a position uncertain / no route fixture for Citizen; change Floor and make Voice unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Request assistance” reaches C05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c39"></a>
## C39 — Outdoor hazard avoidance

**EN:** Outdoor hazard avoidance · **JA:** 危険区域からの移動  
**Requirement:** FR-C39 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** navigation

**Purpose:** Leave the affected area using reviewed guidance.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** View next route step → C36.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C39) · [EN](../Prototype.html?lang=en#C39) · [JA](../Prototype.html?lang=ja#C39)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Area | Riverside flood polygon | Read-only within object scope; display source/time when they affect decisions. |
| Destination | North assembly point | Read-only within object scope; display source/time when they affect decisions. |
| Road condition | Verified segments only | Read-only within object scope; display source/time when they affect decisions. |
| Unknown segments | Excluded | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C39:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C36 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C39 — V2 visual composition

**Context:** emergency · **Role:** Citizen

**Primary question:** For outdoor hazard avoidance, what do Area, Destination establish, and is “View next route step” available to Citizen in this scope?

**Primary visual:** Outdoor hazard boundary, destination and unknown road segments

**Primary action:** View next route step → C36

**Progressive disclosure:** Keep Area, Destination in the decision layer. Put the supporting details for Road condition, Unknown segments, full source/version history and FR-C39 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a outdoor hazard avoidance fixture for Citizen; change Area and make Unknown segments unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “View next route step” reaches C36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="c40"></a>
## C40 — Voice language & guidance settings

**EN:** Voice language & guidance settings · **JA:** 音声案内の設定  
**Requirement:** FR-C40 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Purpose:** Choose how guidance reaches you.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save guidance preferences → C35.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#C40) · [EN](../Prototype.html?lang=en#C40) · [JA](../Prototype.html?lang=ja#C40)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Language | Vietnamese / English / Japanese | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Voice | Device-supported reviewed voice | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Speech rate | Normal | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Haptics | On | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Discreet mode | Respected | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-C40:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to C35 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### C40 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For voice language & guidance settings, what do Language, Voice establish, and is “Save guidance preferences” available to Citizen in this scope?

**Primary visual:** Voice sample, rate control and discreet-mode preview

**Primary action:** Save guidance preferences → C35

**Progressive disclosure:** Keep Language, Voice in the decision layer. Put the supporting details for Speech rate, Haptics, Discreet mode, full source/version history and FR-C40 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Separate local intent from confirmed delivery and show the last verified source; an unavailable observation must not become a safe status.

**V2 acceptance scenario:** Use a voice language & guidance settings fixture for Citizen; change Language and make Discreet mode unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save guidance preferences” reaches C35 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p01"></a>
## P01 — Speaker zones & coverage

**EN:** Speaker zones & coverage · **JA:** 放送区域とカバレッジ  
**Requirement:** FR-P01 / WF-21 · **Actor:** PA operator · **Surface:** Public address · **Layout:** map

**Purpose:** Reach people without a smartphone.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** P05, P09, O36.  
**Output:** Select broadcast zones → P02.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P01) · [EN](../Prototype.html?lang=en#P01) · [JA](../Prototype.html?lang=ja#P01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Building A | Floors 01–08 · 24 speakers | Read-only within object scope; display source/time when they affect decisions. |
| Outdoor campus | 6 speakers | Read-only within object scope; display source/time when they affect decisions. |
| Coverage gaps | West loading bay | Read-only within object scope; display source/time when they affect decisions. |
| Live incident | INC-2041 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P02 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P01 — V2 visual composition

**Context:** command · **Role:** PA operator

**Primary question:** For speaker zones & coverage, what do Building A, Outdoor campus establish, and is “Select broadcast zones” available to PA operator in this scope?

**Primary visual:** Speaker coverage map with uncovered zones and incident context

**Primary action:** Select broadcast zones → P02

**Progressive disclosure:** Keep Building A, Outdoor campus in the decision layer. Put the supporting details for Coverage gaps, Live incident, full source/version history and FR-P01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a speaker zones & coverage fixture for PA operator; change Building A and make Live incident unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Select broadcast zones” reaches P02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p02"></a>
## P02 — Compose rescue announcement

**EN:** Compose rescue announcement · **JA:** 救援放送の作成  
**Requirement:** FR-P02 / WF-21 · **Actor:** PA author · **Surface:** Public address · **Layout:** form

**Purpose:** Prepare an announcement for the right area.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** P01.  
**Output:** Preview announcement → P03.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P02) · [EN](../Prototype.html?lang=en#P02) · [JA](../Prototype.html?lang=ja#P02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Zones | A05 + stairwell W | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Priority | Emergency | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Languages | vi-VN / en / ja-JP | Supported locale vi-VN/en/ja-JP; critical content requires an approved version. |
| Source | Approved rescue template | Read-only from the authoritative source/version; cannot be edited in this form. |
| Expires | 60 seconds after approval | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P03 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P02 — V2 visual composition

**Context:** command · **Role:** PA author

**Primary question:** For compose rescue announcement, what do Zones, Priority establish, and is “Preview announcement” available to PA author in this scope?

**Primary visual:** Announcement text/audio preview tied to zones and expiry

**Primary action:** Preview announcement → P03

**Progressive disclosure:** Keep Zones, Priority in the decision layer. Put the supporting details for Languages, Source, Expires, full source/version history and FR-P02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a compose rescue announcement fixture for PA author; change Zones and make Expires unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Preview announcement” reaches P03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p03"></a>
## P03 — Preview & approve announcement

**EN:** Preview & approve announcement · **JA:** 放送の確認と承認  
**Requirement:** FR-P03 / WF-21 · **Actor:** PA approver · **Surface:** Public address · **Layout:** detail

**Purpose:** Check message, zones and playback behavior.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** P02.  
**Output:** Approve sample playback → P04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P03) · [EN](../Prototype.html?lang=en#P03) · [JA](../Prototype.html?lang=ja#P03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Message version | PA-04 v3 | Read-only within object scope; display source/time when they affect decisions. |
| Selected speakers | 8 | Read-only within object scope; display source/time when they affect decisions. |
| Language sequence | Vietnamese → English → Japanese | Read-only within object scope; display source/time when they affect decisions. |
| Repetition | 2 cycles | Read-only within object scope; display source/time when they affect decisions. |
| Approver | Independent supervisor | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P04 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P03 — V2 visual composition

**Context:** command · **Role:** PA approver

**Primary question:** For preview & approve announcement, what do Message version, Selected speakers establish, and is “Approve sample playback” available to PA approver in this scope?

**Primary visual:** Exact message version with selected speakers and language sequence

**Primary action:** Approve sample playback → P04

**Progressive disclosure:** Keep Message version, Selected speakers in the decision layer. Put the supporting details for Language sequence, Repetition, Approver, full source/version history and FR-P03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a preview & approve announcement fixture for PA approver; change Message version and make Approver unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve sample playback” reaches P04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p04"></a>
## P04 — Speaker playback monitoring

**EN:** Speaker playback monitoring · **JA:** 放送状況の監視  
**Requirement:** FR-P04 / WF-21 · **Actor:** PA operator · **Surface:** Public address · **Layout:** timeline

**Purpose:** Track playback separately from command receipt.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** P03, P06.  
**Output:** Inspect speaker health → P05.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P04) · [EN](../Prototype.html?lang=en#P04) · [JA](../Prototype.html?lang=ja#P04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Controller | Accepted | Read-only within object scope; display source/time when they affect decisions. |
| Speakers | 7 playing · 1 unknown | Read-only within object scope; display source/time when they affect decisions. |
| Acoustic verification | Not available | Read-only within object scope; display source/time when they affect decisions. |
| Next | Inspect unavailable speaker | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P05 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P04 — V2 visual composition

**Context:** command · **Role:** PA operator

**Primary question:** For speaker playback monitoring, what do Controller, Speakers establish, and is “Inspect speaker health” available to PA operator in this scope?

**Primary visual:** Playback progress distinguishing controller receipt from audibility

**Primary action:** Inspect speaker health → P05

**Progressive disclosure:** Keep Controller, Speakers in the decision layer. Put the supporting details for Acoustic verification, Next, full source/version history and FR-P04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Speaker receipt cannot prove occupants heard the message; coverage gaps and unknown acoustic evidence remain prominent.

**V2 acceptance scenario:** Use a speaker playback monitoring fixture for PA operator; change Controller and make Next unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect speaker health” reaches P05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p05"></a>
## P05 — Speaker device & self-test

**EN:** Speaker device & self-test · **JA:** スピーカーと自己診断  
**Requirement:** FR-P05 / WF-21 · **Actor:** Device admin · **Surface:** Public address · **Layout:** detail

**Purpose:** SPK-A05-08 · playback unknown.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** P04.  
**Output:** Open coverage fallback → P01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P05) · [EN](../Prototype.html?lang=en#P05) · [JA](../Prototype.html?lang=ja#P05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Power | Online | Read-only within object scope; display source/time when they affect decisions. |
| Network | Connected | Read-only within object scope; display source/time when they affect decisions. |
| Amplifier | Fault detected | Read-only within object scope; display source/time when they affect decisions. |
| Last self-test | Yesterday | Read-only within object scope; display source/time when they affect decisions. |
| Coverage fallback | Patrol announcement | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P01 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P05 — V2 visual composition

**Context:** command · **Role:** Device admin

**Primary question:** For speaker device & self-test, what do Power, Network establish, and is “Open coverage fallback” available to Device admin in this scope?

**Primary visual:** Speaker power-network-amplifier chain with self-test age

**Primary action:** Open coverage fallback → P01

**Progressive disclosure:** Keep Power, Network in the decision layer. Put the supporting details for Amplifier, Last self-test, Coverage fallback, full source/version history and FR-P05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a speaker device & self-test fixture for Device admin; change Power and make Coverage fallback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open coverage fallback” reaches P01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p06"></a>
## P06 — Live rescue microphone

**EN:** Live rescue microphone · **JA:** 救援用ライブマイク  
**Requirement:** FR-P06 / WF-21 · **Actor:** Authorized announcer · **Surface:** Public address · **Layout:** livevoice

**Purpose:** Announce live to approved rescue zones.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review live session — sample → P04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P06) · [EN](../Prototype.html?lang=en#P06) · [JA](../Prototype.html?lang=ja#P06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Zones | A05 + stairwell W | Read-only within object scope; display source/time when they affect decisions. |
| Microphone | Permission required | Read-only within object scope; display source/time when they affect decisions. |
| Priority | Emergency | Read-only within object scope; display source/time when they affect decisions. |
| Maximum session | 120 seconds | Read-only within object scope; display source/time when they affect decisions. |
| Recording | Policy-controlled | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P04 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P06 — V2 visual composition

**Context:** command · **Role:** Authorized announcer

**Primary question:** For live rescue microphone, what do Zones, Microphone establish, and is “Review live session — sample” available to Authorized announcer in this scope?

**Primary visual:** Live microphone session with selected zones and explicit stop control

**Primary action:** Review live session — sample → P04

**Progressive disclosure:** Keep Zones, Microphone in the decision layer. Put the supporting details for Priority, Maximum session, Recording, full source/version history and FR-P06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a live rescue microphone fixture for Authorized announcer; change Zones and make Recording unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review live session — sample” reaches P04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p07"></a>
## P07 — Drone / vehicle speaker mission

**EN:** Drone / vehicle speaker mission · **JA:** ドローン・車両の拡声放送  
**Requirement:** FR-P07 / WF-21 · **Actor:** Drone operator · **Surface:** Public address · **Layout:** form

**Purpose:** Coordinate mobile public-address support.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review mission → I13.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P07) · [EN](../Prototype.html?lang=en#P07) · [JA](../Prototype.html?lang=ja#P07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Platform | DR-01 speaker payload | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Message | Approved rescue template | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Pilot | Assigned | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Broadcast area | Campus perimeter | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Playback | Requires payload feedback | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to I13 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P07 — V2 visual composition

**Context:** command · **Role:** Drone operator

**Primary question:** For drone / vehicle speaker mission, what do Platform, Message establish, and is “Review mission” available to Drone operator in this scope?

**Primary visual:** Mobile speaker mission footprint with pilot ownership

**Primary action:** Review mission → I13

**Progressive disclosure:** Keep Platform, Message in the decision layer. Put the supporting details for Pilot, Broadcast area, Playback, full source/version history and FR-P07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a drone / vehicle speaker mission fixture for Drone operator; change Platform and make Playback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review mission” reaches I13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p08"></a>
## P08 — Audio library & TTS review

**EN:** Audio library & TTS review · **JA:** 音声ライブラリーとTTS審査  
**Requirement:** FR-P08 / WF-21 · **Actor:** Content editor · **Surface:** Public address · **Layout:** list

**Purpose:** Use approved speech in every supported language.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Edit voice content → L04.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P08) · [EN](../Prototype.html?lang=en#P08) · [JA](../Prototype.html?lang=ja#P08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| PA-04 vi-VN | Reviewed recording | Read-only within object scope; display source/time when they affect decisions. |
| PA-04 en | Reviewed recording | Read-only within object scope; display source/time when they affect decisions. |
| PA-04 ja-JP | TTS reviewed | Read-only within object scope; display source/time when they affect decisions. |
| Pronunciation | Site names verified | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to L04 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P08 — V2 visual composition

**Context:** configuration · **Role:** Content editor

**Primary question:** For audio library & tts review, what do PA-04 vi-VN, PA-04 en establish, and is “Edit voice content” available to Content editor in this scope?

**Primary visual:** Language audio library with pronunciation review and transcript

**Primary action:** Edit voice content → L04

**Progressive disclosure:** Keep PA-04 vi-VN, PA-04 en in the decision layer. Put the supporting details for PA-04 ja-JP, Pronunciation, full source/version history and FR-P08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a audio library & tts review fixture for Content editor; change PA-04 vi-VN and make Pronunciation unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Edit voice content” reaches L04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="p09"></a>
## P09 — PA priority & arbitration

**EN:** PA priority & arbitration · **JA:** 放送の優先順位と調整  
**Requirement:** FR-P09 / WF-21 · **Actor:** PA admin · **Surface:** Public address · **Layout:** form

**Purpose:** Avoid competing announcements.  
**Key rule:** Track each speaker; playback completion does not prove people heard it.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save arbitration policy → P01.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#P09) · [EN](../Prototype.html?lang=en#P09) · [JA](../Prototype.html?lang=ja#P09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Highest priority | Local certified emergency controller | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Cloud rescue message | Approved priority tier | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Routine audio | Preemptible | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Lost link | Local controller policy | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Resume | Explicit decision | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-P09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P01 with a valid payload/version, and verify that it is blocked when the guard for WF-21 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### P09 — V2 visual composition

**Context:** configuration · **Role:** PA admin

**Primary question:** For pa priority & arbitration, what do Highest priority, Cloud rescue message establish, and is “Save arbitration policy” available to PA admin in this scope?

**Primary visual:** Priority arbitration stack showing local priority and lost-link behavior

**Primary action:** Save arbitration policy → P01

**Progressive disclosure:** Keep Highest priority, Cloud rescue message in the decision layer. Put the supporting details for Routine audio, Lost link, Resume, full source/version history and FR-P09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Distinguish controller receipt, playback feedback and acoustic verification; retain local priority and stop/expiry behavior on lost link.

**V2 acceptance scenario:** Use a pa priority & arbitration fixture for PA admin; change Highest priority and make Resume unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save arbitration policy” reaches P01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s15"></a>
## S15 — Evacuation graph editor

**EN:** Evacuation graph editor · **JA:** 避難経路グラフの編集  
**Requirement:** FR-S15 / WF-22 · **Actor:** Route designer · **Surface:** Sites · **Layout:** floor

**Purpose:** Build a versioned indoor and outdoor route graph.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** S16, Q03.  
**Output:** Review route validation → S16.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S15) · [EN](../Prototype.html?lang=en#S15) · [JA](../Prototype.html?lang=ja#S15)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Nodes | Doors · stairs · refuges · exits | Read-only within object scope; display source/time when they affect decisions. |
| Edges | Direction + width + accessibility | Read-only within object scope; display source/time when they affect decisions. |
| Elevators | Excluded unless approved evacuation use | Read-only within object scope; display source/time when they affect decisions. |
| Map revision | 13 draft | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S15:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S16 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S15 — V2 visual composition

**Context:** configuration · **Role:** Route designer

**Primary question:** For evacuation graph editor, what do Nodes, Edges establish, and is “Review route validation” available to Route designer in this scope?

**Primary visual:** Evacuation graph with node/edge types and inaccessible links

**Primary action:** Review route validation → S16

**Progressive disclosure:** Keep Nodes, Edges in the decision layer. Put the supporting details for Elevators, Map revision, full source/version history and FR-S15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a evacuation graph editor fixture for Route designer; change Nodes and make Map revision unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review route validation” reaches S16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="s16"></a>
## S16 — Route simulation & approval

**EN:** Route simulation & approval · **JA:** 経路の検証と承認  
**Requirement:** FR-S16 / WF-22 · **Actor:** Safety reviewer · **Surface:** Sites · **Layout:** detail

**Purpose:** Test hazards, accessibility and uncertainty.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** S15, Q10.  
**Output:** Publish reviewed graph → S15.  
**Data:** Configuration/operations; do not expose credentials or secrets.

[Mockup VI](../Prototype.html?lang=vi#S16) · [EN](../Prototype.html?lang=en#S16) · [JA](../Prototype.html?lang=ja#S16)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Blocked corridor | Excluded | Read-only within object scope; display source/time when they affect decisions. |
| Unknown floor | No turn-by-turn route | Read-only within object scope; display source/time when they affect decisions. |
| Wheelchair profile | No stair-only route | Read-only within object scope; display source/time when they affect decisions. |
| Expired hazard data | Guidance degraded | Read-only within object scope; display source/time when they affect decisions. |
| Reviewer | Site safety specialist | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-S16:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S15 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### S16 — V2 visual composition

**Context:** configuration · **Role:** Safety reviewer

**Primary question:** For route simulation & approval, what do Blocked corridor, Unknown floor establish, and is “Publish reviewed graph” available to Safety reviewer in this scope?

**Primary visual:** Scenario comparison showing blocked, unknown and wheelchair routes

**Primary action:** Publish reviewed graph → S15

**Progressive disclosure:** Keep Blocked corridor, Unknown floor in the decision layer. Put the supporting details for Wheelchair profile, Expired hazard data, Reviewer, full source/version history and FR-S16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep draft geometry/configuration separate from published operational data; invalidate dependent routes or rules when their referenced version changes.

**V2 acceptance scenario:** Use a route simulation & approval fixture for Safety reviewer; change Blocked corridor and make Reviewer unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish reviewed graph” reaches S15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o35"></a>
## O35 — Hazard zones & route restrictions

**EN:** Hazard zones & route restrictions · **JA:** 危険区域と移動制限  
**Requirement:** FR-O35 / WF-22 · **Actor:** Incident commander · **Surface:** Command · **Layout:** map

**Purpose:** Publish time-bounded movement restrictions.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review guidance impact → O36.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O35) · [EN](../Prototype.html?lang=en#O35) · [JA](../Prototype.html?lang=ja#O35)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Hazard | East corridor smoke report | Read-only within object scope; display source/time when they affect decisions. |
| Geometry | Zone A05-03 | Read-only within object scope; display source/time when they affect decisions. |
| Certainty | Operator verified | Read-only within object scope; display source/time when they affect decisions. |
| Expires | Recheck in 2 minutes | Read-only within object scope; display source/time when they affect decisions. |
| Affected routes | 3 invalidated | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O35:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O36 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O35 — V2 visual composition

**Context:** command · **Role:** Incident commander

**Primary question:** For hazard zones & route restrictions, what do Hazard, Geometry establish, and is “Review guidance impact” available to Incident commander in this scope?

**Primary visual:** Hazard polygon editor with affected route segments and expiry

**Primary action:** Review guidance impact → O36

**Progressive disclosure:** Keep Hazard, Geometry in the decision layer. Put the supporting details for Certainty, Expires, Affected routes, full source/version history and FR-O35 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Expired geometry removes its authority; changed restrictions identify affected guidance versions before publication.

**V2 acceptance scenario:** Use a hazard zones & route restrictions fixture for Incident commander; change Hazard and make Affected routes unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review guidance impact” reaches O36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="o36"></a>
## O36 — Guidance distribution & receipts

**EN:** Guidance distribution & receipts · **JA:** 案内の配信と受領確認  
**Requirement:** FR-O36 / WF-22 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Purpose:** Keep app and speaker instructions consistent.  
**Key rule:** Use landmarks when heading is uncertain; withdraw expired guidance.  
**Entry:** O35, Q05.  
**Output:** Open speaker operations → P01.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#O36) · [EN](../Prototype.html?lang=en#O36) · [JA](../Prototype.html?lang=ja#O36)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Guidance version | 18 | Read-only within object scope; display source/time when they affect decisions. |
| Smartphones | 312 updated · 28 unknown | Read-only within object scope; display source/time when they affect decisions. |
| Speaker controller | Version 18 accepted | Read-only within object scope; display source/time when they affect decisions. |
| Old route | Withdrawn | Read-only within object scope; display source/time when they affect decisions. |
| Unreachable users | Fallback action required | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-O36:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to P01 with a valid payload/version, and verify that it is blocked when the guard for WF-22 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### O36 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For guidance distribution & receipts, what do Guidance version, Smartphones establish, and is “Open speaker operations” available to Operator in this scope?

**Primary visual:** Guidance version distribution separating withdrawal and delivery receipts

**Primary action:** Open speaker operations → P01

**Progressive disclosure:** Keep Guidance version, Smartphones in the decision layer. Put the supporting details for Speaker controller, Old route, Unreachable users, full source/version history and FR-O36 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Old-route withdrawal and new-version delivery have separate receipts; unreachable people remain visible and require alternate channels.

**V2 acceptance scenario:** Use a guidance distribution & receipts fixture for Operator; change Guidance version and make Unreachable users unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open speaker operations” reaches P01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h01"></a>
## H01 — My rescue assistance profile

**EN:** My rescue assistance profile · **JA:** 自分の救援支援プロフィール  
**Requirement:** FR-H01 / WF-26 · **Actor:** Citizen · **Surface:** Care profiles · **Layout:** form

**Purpose:** Tell responders what support you may need.  
**Key rule:** Assistance profiles have provenance, review dates and field-level access.  
**Entry:** H02.  
**Output:** Review emergency sharing → H02.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H01) · [EN](../Prototype.html?lang=en#H01) · [JA](../Prototype.html?lang=ja#H01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Age group | 65–74 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Mobility | Wheelchair user | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Stairs | Assistance required | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Communication | Text preferred | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Source | Self-reported | Read-only from the authoritative source/version; cannot be edited in this form. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H02 with a valid payload/version, and verify that it is blocked when the guard for WF-26 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H01 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For my rescue assistance profile, what do Age group, Mobility establish, and is “Review emergency sharing” available to Citizen in this scope?

**Primary visual:** Functional assistance profile with mobility and communication pictograms

**Primary action:** Review emergency sharing → H02

**Progressive disclosure:** Keep Age group, Mobility in the decision layer. Put the supporting details for Stairs, Communication, Source, full source/version history and FR-H01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a my rescue assistance profile fixture for Citizen; change Age group and make Source unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review emergency sharing” reaches H02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h02"></a>
## H02 — Health & assistance sharing

**EN:** Health & assistance sharing · **JA:** 支援・健康情報の共有  
**Requirement:** FR-H02 / WF-26 · **Actor:** Citizen · **Surface:** Care profiles · **Layout:** form

**Purpose:** Share only what the response team needs.  
**Key rule:** Assistance profiles have provenance, review dates and field-level access.  
**Entry:** H01.  
**Output:** Save sharing preferences → H01.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H02) · [EN](../Prototype.html?lang=en#H02) · [JA](../Prototype.html?lang=ja#H02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Functional needs | Assigned rescue team | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Medical notes | Authorized medical role only | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Family groups | Not shared | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Consent | Version 3 | Read-only from the authoritative source/version; cannot be edited in this form. |
| Review date | 2027-01-23 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H01 with a valid payload/version, and verify that it is blocked when the guard for WF-26 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H02 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For health & assistance sharing, what do Functional needs, Medical notes establish, and is “Save sharing preferences” available to Citizen in this scope?

**Primary visual:** Separate functional-needs and medical-note disclosure previews

**Primary action:** Save sharing preferences → H01

**Progressive disclosure:** Keep Functional needs, Medical notes in the decision layer. Put the supporting details for Family groups, Consent, Review date, full source/version history and FR-H02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a health & assistance sharing fixture for Citizen; change Functional needs and make Review date unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save sharing preferences” reaches H01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h03"></a>
## H03 — Caregiver relationships

**EN:** Caregiver relationships · **JA:** 介護者・支援者の権限  
**Requirement:** FR-H03 / WF-26 · **Actor:** Citizen · **Surface:** Care profiles · **Layout:** list

**Purpose:** Review who can help manage your profile.  
**Key rule:** Assistance profiles have provenance, review dates and field-level access.  
**Entry:** H04.  
**Output:** Review caregiver authority → H04.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H03) · [EN](../Prototype.html?lang=en#H03) · [JA](../Prototype.html?lang=ja#H03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Jamie | Verified caregiver · assistance profile only | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | Emergency contact · no profile access | Read-only within object scope; display source/time when they affect decisions. |
| Pending request | None | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H04 with a valid payload/version, and verify that it is blocked when the guard for WF-26 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H03 — V2 visual composition

**Context:** configuration · **Role:** Citizen

**Primary question:** For caregiver relationships, what do Jamie, Morgan establish, and is “Review caregiver authority” available to Citizen in this scope?

**Primary visual:** Caregiver relationship graph with pending and expired authority

**Primary action:** Review caregiver authority → H04

**Progressive disclosure:** Keep Jamie, Morgan in the decision layer. Put the supporting details for Pending request, full source/version history and FR-H03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a caregiver relationships fixture for Citizen; change Jamie and make Pending request unavailable. Verify the visual and warning update, all 3 source fields remain reachable, and “Review caregiver authority” reaches H04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h04"></a>
## H04 — Caregiver authorization

**EN:** Caregiver authorization · **JA:** 支援者権限の確認  
**Requirement:** FR-H04 / WF-26 · **Actor:** Privacy officer · **Surface:** Care profiles · **Layout:** form

**Purpose:** Verify authority before granting access.  
**Key rule:** Assistance profiles have provenance, review dates and field-level access.  
**Entry:** H03.  
**Output:** Approve scoped relationship → H03.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H04) · [EN](../Prototype.html?lang=en#H04) · [JA](../Prototype.html?lang=ja#H04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Subject | Alex Morgan | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Caregiver | Jamie | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Authority | Verified authorization record | Read-only from the authoritative source/version; cannot be edited in this form. |
| Scope | Assistance profile | Select within granted permissions; the server blocks escalation beyond the actor’s rights. |
| Expires | 2027-01-23 | UTC datetime + IANA timezone; validate future time, TTL and DST according to the workflow. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H03 with a valid payload/version, and verify that it is blocked when the guard for WF-26 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H04 — V2 visual composition

**Context:** configuration · **Role:** Privacy officer

**Primary question:** For caregiver authorization, what do Subject, Caregiver establish, and is “Approve scoped relationship” available to Privacy officer in this scope?

**Primary visual:** Subject-caregiver scope comparison with authorization expiry

**Primary action:** Approve scoped relationship → H03

**Progressive disclosure:** Keep Subject, Caregiver in the decision layer. Put the supporting details for Authority, Scope, Expires, full source/version history and FR-H04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a caregiver authorization fixture for Privacy officer; change Subject and make Expires unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Approve scoped relationship” reaches H03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h05"></a>
## H05 — Dependent person profile

**EN:** Dependent person profile · **JA:** 支援対象者のプロフィール  
**Requirement:** FR-H05 / WF-26 · **Actor:** Authorized caregiver · **Surface:** Care profiles · **Layout:** detail

**Purpose:** Review the assistance plan with the person.  
**Key rule:** Assistance profiles have provenance, review dates and field-level access.  
**Entry:** H06.  
**Output:** Request profile update → H06.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H05) · [EN](../Prototype.html?lang=en#H05) · [JA](../Prototype.html?lang=ja#H05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Person | Alex Morgan | Read-only within object scope; display source/time when they affect decisions. |
| Mobility | Assisted evacuation | Read-only within object scope; display source/time when they affect decisions. |
| Device | Wheelchair | Read-only within object scope; display source/time when they affect decisions. |
| Emergency note | Restricted medical record | Read-only within object scope; display source/time when they affect decisions. |
| Last reviewed | 2026-10-01 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H06 with a valid payload/version, and verify that it is blocked when the guard for WF-26 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H05 — V2 visual composition

**Context:** configuration · **Role:** Authorized caregiver

**Primary question:** For dependent person profile, what do Person, Mobility establish, and is “Request profile update” available to Authorized caregiver in this scope?

**Primary visual:** Dependent profile with device link and review-age indicator

**Primary action:** Request profile update → H06

**Progressive disclosure:** Keep Person, Mobility in the decision layer. Put the supporting details for Device, Emergency note, Last reviewed, full source/version history and FR-H05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a dependent person profile fixture for Authorized caregiver; change Person and make Last reviewed unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Request profile update” reaches H06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h06"></a>
## H06 — Profile update & review

**EN:** Profile update & review · **JA:** プロフィールの更新と確認  
**Requirement:** FR-H06 / WF-26 · **Actor:** Authorized caregiver · **Surface:** Care profiles · **Layout:** form

**Purpose:** Keep assistance information current.  
**Key rule:** Assistance profiles have provenance, review dates and field-level access.  
**Entry:** H05.  
**Output:** Submit profile update → H05.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H06) · [EN](../Prototype.html?lang=en#H06) · [JA](../Prototype.html?lang=ja#H06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Profile version | 4 | Read-only from the authoritative source/version; cannot be edited in this form. |
| Change | Updated mobility assistance need | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |
| Source | Authorized caregiver | Read-only from the authoritative source/version; cannot be edited in this form. |
| Review status | Subject review pending | Read-only from the authoritative source/version; cannot be edited in this form. |
| Reason | Support needs changed | Unicode, maximum 2,000 characters; escape output; a reason is mandatory for state-changing decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H05 with a valid payload/version, and verify that it is blocked when the guard for WF-26 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H06 — V2 visual composition

**Context:** configuration · **Role:** Authorized caregiver

**Primary question:** For profile update & review, what do Profile version, Change establish, and is “Submit profile update” available to Authorized caregiver in this scope?

**Primary visual:** Profile version diff identifying source and review responsibility

**Primary action:** Submit profile update → H05

**Progressive disclosure:** Keep Profile version, Change in the decision layer. Put the supporting details for Source, Review status, Reason, full source/version history and FR-H06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a profile update & review fixture for Authorized caregiver; change Profile version and make Reason unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Submit profile update” reaches H05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h07"></a>
## H07 — People & assistance registry

**EN:** People & assistance registry · **JA:** 支援対象者一覧  
**Requirement:** FR-H07 / WF-26 · **Actor:** Care coordinator · **Surface:** Care profiles · **Layout:** list

**Purpose:** Find people who may need proactive help.  
**Key rule:** Assistance profiles have provenance, review dates and field-level access.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open assistance case → H09.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H07) · [EN](../Prototype.html?lang=en#H07) · [JA](../Prototype.html?lang=ja#H07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Alex | Mobility assistance · profile reviewed | Read-only within object scope; display source/time when they affect decisions. |
| Jamie | No assistance data | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | Communication assistance · review overdue | Read-only within object scope; display source/time when they affect decisions. |
| Visibility | Functional needs only | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H09 with a valid payload/version, and verify that it is blocked when the guard for WF-26 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H07 — V2 visual composition

**Context:** command · **Role:** Care coordinator

**Primary question:** For people & assistance registry, what do Alex, Jamie establish, and is “Open assistance case” available to Care coordinator in this scope?

**Primary visual:** Assistance registry with role-limited functional-needs columns

**Primary action:** Open assistance case → H09

**Progressive disclosure:** Keep Alex, Jamie in the decision layer. Put the supporting details for Morgan, Visibility, full source/version history and FR-H07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a people & assistance registry fixture for Care coordinator; change Alex and make Visibility unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Open assistance case” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h08"></a>
## H08 — Proactive rescue queue

**EN:** Proactive rescue queue · **JA:** 先行的な救援対応  
**Requirement:** FR-H08 / WF-27 · **Actor:** Dispatcher · **Surface:** Care profiles · **Layout:** priority

**Purpose:** No SOS does not mean no need for help.  
**Key rule:** Prioritize exposure and ability to self-evacuate, even without an SOS.  
**Entry:** H10.  
**Output:** Review priority reasons → H09.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H08) · [EN](../Prototype.html?lang=en#H08) · [JA](../Prototype.html?lang=ja#H08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Alex | Exposed zone · mobility support · no SOS | Read-only within object scope; display source/time when they affect decisions. |
| Morgan | Possible exposure · stale position | Read-only within object scope; display source/time when they affect decisions. |
| Jamie | Presence unknown · check-in needed | Read-only within object scope; display source/time when they affect decisions. |
| Priority policy | Version 3 · explainable | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H09 with a valid payload/version, and verify that it is blocked when the guard for WF-27 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H08 — V2 visual composition

**Context:** command · **Role:** Dispatcher

**Primary question:** For proactive rescue queue, what do Alex, Morgan establish, and is “Review priority reasons” available to Dispatcher in this scope?

**Primary visual:** Proactive rescue queue with explainable priority reasons

**Primary action:** Review priority reasons → H09

**Progressive disclosure:** Keep Alex, Morgan in the decision layer. Put the supporting details for Jamie, Priority policy, full source/version history and FR-H08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a proactive rescue queue fixture for Dispatcher; change Alex and make Priority policy unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review priority reasons” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h09"></a>
## H09 — Priority evidence & decision

**EN:** Priority evidence & decision · **JA:** 優先度の根拠と判断  
**Requirement:** FR-H09 / WF-27 · **Actor:** Dispatcher · **Surface:** Care profiles · **Layout:** detail

**Purpose:** Review why assistance was recommended.  
**Key rule:** Prioritize exposure and ability to self-evacuate, even without an SOS.  
**Entry:** H07, H08, H11, Q02.  
**Output:** Assign proactive assistance → O09.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H09) · [EN](../Prototype.html?lang=en#H09) · [JA](../Prototype.html?lang=ja#H09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Exposure | Inside impacted zone · QR 2 min ago | Read-only within object scope; display source/time when they affect decisions. |
| Self-evacuation | Assistance required | Read-only within object scope; display source/time when they affect decisions. |
| SOS | None received | Read-only within object scope; display source/time when they affect decisions. |
| Reason | Approved assistance policy | Read-only within object scope; display source/time when they affect decisions. |
| Priority | P1 · operator review | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O09 with a valid payload/version, and verify that it is blocked when the guard for WF-27 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H09 — V2 visual composition

**Context:** command · **Role:** Dispatcher

**Primary question:** For priority evidence & decision, what do Exposure, Self-evacuation establish, and is “Assign proactive assistance” available to Dispatcher in this scope?

**Primary visual:** Exposure and self-evacuation evidence beside human priority decision

**Primary action:** Assign proactive assistance → O09

**Progressive disclosure:** Keep Exposure, Self-evacuation in the decision layer. Put the supporting details for SOS, Reason, Priority, full source/version history and FR-H09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a priority evidence & decision fixture for Dispatcher; change Exposure and make Priority unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Assign proactive assistance” reaches O09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h10"></a>
## H10 — Presence & accountability

**EN:** Presence & accountability · **JA:** 在場状況と安否確認  
**Requirement:** FR-H10 / WF-23 · **Actor:** Operator · **Surface:** Care profiles · **Layout:** map

**Purpose:** Distinguish presence from registration.  
**Key rule:** Presence and position have distinct uncertainty; registration is not presence.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Open proactive queue → H08.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H10) · [EN](../Prototype.html?lang=en#H10) · [JA](../Prototype.html?lang=ja#H10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Observed present | 21 | Read-only within object scope; display source/time when they affect decisions. |
| Expected attendance | 30 | Read-only within object scope; display source/time when they affect decisions. |
| Presence unknown | 9 | Read-only within object scope; display source/time when they affect decisions. |
| Last-seen sources | QR + access control | Read-only within object scope; display source/time when they affect decisions. |
| Safe inference | Never automatic | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H08 with a valid payload/version, and verify that it is blocked when the guard for WF-23 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H10 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For presence & accountability, what do Observed present, Expected attendance establish, and is “Open proactive queue” available to Operator in this scope?

**Primary visual:** Presence evidence matrix separating observed, expected and unknown

**Primary action:** Open proactive queue → H08

**Progressive disclosure:** Keep Observed present, Expected attendance in the decision layer. Put the supporting details for Presence unknown, Last-seen sources, Safe inference, full source/version history and FR-H10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Expected attendance and last seen are not live presence; never infer safety from absence of a distress signal.

**V2 acceptance scenario:** Use a presence & accountability fixture for Operator; change Observed present and make Safe inference unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open proactive queue” reaches H08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h11"></a>
## H11 — Restricted medical record

**EN:** Restricted medical record · **JA:** 制限付き医療情報  
**Requirement:** FR-H11 / WF-19 · **Actor:** Authorized medical role · **Surface:** Care profiles · **Layout:** detail

**Purpose:** Emergency medical subset · audited access.  
**Key rule:** Expose minimum authorized data and audit sensitive access.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Return to assistance → H09.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H11) · [EN](../Prototype.html?lang=en#H11) · [JA](../Prototype.html?lang=ja#H11)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Person | Alex Morgan | Read-only within object scope; display source/time when they affect decisions. |
| Record | Encrypted · restricted | Read-only within object scope; display source/time when they affect decisions. |
| Source | Self-reported · not clinically verified | Read-only within object scope; display source/time when they affect decisions. |
| Access reason | Assigned emergency task | Read-only within object scope; display source/time when they affect decisions. |
| Disclosure | Minimum necessary | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H11:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H09 with a valid payload/version, and verify that it is blocked when the guard for WF-19 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H11 — V2 visual composition

**Context:** configuration · **Role:** Authorized medical role

**Primary question:** For restricted medical record, what do Person, Record establish, and is “Return to assistance” available to Authorized medical role in this scope?

**Primary visual:** Restricted medical record with access purpose and disclosure log

**Primary action:** Return to assistance → H09

**Progressive disclosure:** Keep Person, Record in the decision layer. Put the supporting details for Source, Access reason, Disclosure, full source/version history and FR-H11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a restricted medical record fixture for Authorized medical role; change Person and make Disclosure unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Return to assistance” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="h12"></a>
## H12 — Welfare check outcome

**EN:** Welfare check outcome · **JA:** 安否確認の結果  
**Requirement:** FR-H12 / WF-27 · **Actor:** Responder · **Surface:** Care profiles · **Layout:** form

**Purpose:** Record contact even without an SOS.  
**Key rule:** Prioritize exposure and ability to self-evacuate, even without an SOS.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Save welfare observation → R06.  
**Data:** Sensitive: health/functional needs; field-level scope and access audit.

[Mockup VI](../Prototype.html?lang=vi#H12) · [EN](../Prototype.html?lang=en#H12) · [JA](../Prototype.html?lang=ja#H12)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Case | PC-041 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Person | Alex Morgan | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Contact | Established | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Assistance | Required | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Location | Confirmed by responder | Validate the same tenant, coordinate system/floor, source and timestamp; do not infer floor from GPS. |
| Next | Assisted evacuation task | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-H12:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to R06 with a valid payload/version, and verify that it is blocked when the guard for WF-27 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### H12 — V2 visual composition

**Context:** field · **Role:** Responder

**Primary question:** For welfare check outcome, what do Case, Person establish, and is “Save welfare observation” available to Responder in this scope?

**Primary visual:** Welfare observation with contact outcome and next responsible actor

**Primary action:** Save welfare observation → R06

**Progressive disclosure:** Keep Case, Person in the decision layer. Put the supporting details for Contact, Assistance, Location, Next, full source/version history and FR-H12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Display functional assistance needs only within authorized scope; missing presence or a caregiver claim must not imply safety or legal authority.

**V2 acceptance scenario:** Use a welfare check outcome fixture for Responder; change Case and make Next unavailable. Verify the visual and warning update, all 6 source fields remain reachable, and “Save welfare observation” reaches R06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q01"></a>
## Q01 — Positioning source health

**EN:** Positioning source health · **JA:** 測位ソースの状態  
**Requirement:** FR-Q01 / WF-23 · **Actor:** Positioning admin · **Surface:** Intelligence · **Layout:** dashboard

**Purpose:** Know where location can be trusted.  
**Key rule:** Presence and position have distinct uncertainty; registration is not presence.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Inspect location quality → Q02.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q01) · [EN](../Prototype.html?lang=en#Q01) · [JA](../Prototype.html?lang=ja#Q01)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| GNSS | Outdoor coverage | Read-only within object scope; display source/time when they affect decisions. |
| BLE | Floor 05 degraded | Read-only within object scope; display source/time when they affect decisions. |
| UWB | Calibrated zones only | Read-only within object scope; display source/time when they affect decisions. |
| QR anchors | Approved revision 12 | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q01:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to Q02 with a valid payload/version, and verify that it is blocked when the guard for WF-23 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q01 — V2 visual composition

**Context:** command · **Role:** Positioning admin

**Primary question:** For positioning source health, what do GNSS, BLE establish, and is “Inspect location quality” available to Positioning admin in this scope?

**Primary visual:** Position-source coverage and health comparison by GNSS/BLE/UWB/QR

**Primary action:** Inspect location quality → Q02

**Progressive disclosure:** Keep GNSS, BLE in the decision layer. Put the supporting details for UWB, QR anchors, full source/version history and FR-Q01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a positioning source health fixture for Positioning admin; change GNSS and make QR anchors unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Inspect location quality” reaches Q02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q02"></a>
## Q02 — Position quality & history

**EN:** Position quality & history · **JA:** 位置情報の品質と履歴  
**Requirement:** FR-Q02 / WF-23 · **Actor:** Operator · **Surface:** Intelligence · **Layout:** detail

**Purpose:** Alex · position is evidence, not certainty.  
**Key rule:** Presence and position have distinct uncertainty; registration is not presence.  
**Entry:** Q01.  
**Output:** Open assistance context → H09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q02) · [EN](../Prototype.html?lang=en#Q02) · [JA](../Prototype.html?lang=ja#Q02)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Current source | QR anchor | Read-only within object scope; display source/time when they affect decisions. |
| Floor confidence | Confirmed by user scan | Read-only within object scope; display source/time when they affect decisions. |
| Observed | 2 minutes ago | Read-only within object scope; display source/time when they affect decisions. |
| Heading | Unknown | Read-only within object scope; display source/time when they affect decisions. |
| Conflicting source | BLE floor estimate rejected | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q02:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to H09 with a valid payload/version, and verify that it is blocked when the guard for WF-23 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q02 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For position quality & history, what do Current source, Floor confidence establish, and is “Open assistance context” available to Operator in this scope?

**Primary visual:** Location history with floor confidence and conflicting-source markers

**Primary action:** Open assistance context → H09

**Progressive disclosure:** Keep Current source, Floor confidence in the decision layer. Put the supporting details for Observed, Heading, Conflicting source, full source/version history and FR-Q02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a position quality & history fixture for Operator; change Current source and make Conflicting source unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open assistance context” reaches H09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q03"></a>
## Q03 — Indoor calibration editor

**EN:** Indoor calibration editor · **JA:** 屋内測位の校正  
**Requirement:** FR-Q03 / WF-23 · **Actor:** Positioning admin · **Surface:** Intelligence · **Layout:** floor

**Purpose:** Align anchors to a versioned floor plan.  
**Key rule:** Presence and position have distinct uncertainty; registration is not presence.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review route graph → S15.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q03) · [EN](../Prototype.html?lang=en#Q03) · [JA](../Prototype.html?lang=ja#Q03)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Coordinate frame | Building A local | Read-only within object scope; display source/time when they affect decisions. |
| Reference points | 4 surveyed anchors | Read-only within object scope; display source/time when they affect decisions. |
| Floor | 05 | Read-only within object scope; display source/time when they affect decisions. |
| Calibration error | Requires field measurement | Read-only within object scope; display source/time when they affect decisions. |
| Publish | Safety review required | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q03:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S15 with a valid payload/version, and verify that it is blocked when the guard for WF-23 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q03 — V2 visual composition

**Context:** configuration · **Role:** Positioning admin

**Primary question:** For indoor calibration editor, what do Coordinate frame, Reference points establish, and is “Review route graph” available to Positioning admin in this scope?

**Primary visual:** Calibration reference geometry with residual-error preview

**Primary action:** Review route graph → S15

**Progressive disclosure:** Keep Coordinate frame, Reference points in the decision layer. Put the supporting details for Floor, Calibration error, Publish, full source/version history and FR-Q03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a indoor calibration editor fixture for Positioning admin; change Coordinate frame and make Publish unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review route graph” reaches S15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q04"></a>
## Q04 — Evacuation optimization

**EN:** Evacuation optimization · **JA:** 避難戦略の最適化  
**Requirement:** FR-Q04 / WF-24 · **Actor:** Incident commander · **Surface:** Intelligence · **Layout:** optimization

**Purpose:** Compare feasible evacuation strategies.  
**Key rule:** Exclude unsafe or unsuitable routes before optimizing travel and congestion.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review route comparison → Q05.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q04) · [EN](../Prototype.html?lang=en#Q04) · [JA](../Prototype.html?lang=ja#Q04)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Primary | West stairs · reviewed graph | Read-only within object scope; display source/time when they affect decisions. |
| Alternative | North refuge + assisted transfer | Read-only within object scope; display source/time when they affect decisions. |
| Excluded | East corridor · hazard | Read-only within object scope; display source/time when they affect decisions. |
| Objective | Exposure constraints before travel time | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q04:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to Q05 with a valid payload/version, and verify that it is blocked when the guard for WF-24 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q04 — V2 visual composition

**Context:** command · **Role:** Incident commander

**Primary question:** For evacuation optimization, what do Primary, Alternative establish, and is “Review route comparison” available to Incident commander in this scope?

**Primary visual:** Candidate-route comparison with excluded options and constraints

**Primary action:** Review route comparison → Q05

**Progressive disclosure:** Keep Primary, Alternative in the decision layer. Put the supporting details for Excluded, Objective, full source/version history and FR-Q04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a evacuation optimization fixture for Incident commander; change Primary and make Objective unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review route comparison” reaches Q05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q05"></a>
## Q05 — Route comparison & decision

**EN:** Route comparison & decision · **JA:** 経路の比較と判断  
**Requirement:** FR-Q05 / WF-24 · **Actor:** Safety reviewer · **Surface:** Intelligence · **Layout:** detail

**Purpose:** Understand the trade-offs before publishing.  
**Key rule:** Exclude unsafe or unsuitable routes before optimizing travel and congestion.  
**Entry:** Q04, Q07.  
**Output:** Publish guidance version → O36.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q05) · [EN](../Prototype.html?lang=en#Q05) · [JA](../Prototype.html?lang=ja#Q05)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Option A | West route · longer · feasible | Read-only within object scope; display source/time when they affect decisions. |
| Option B | East route · shorter · blocked | Read-only within object scope; display source/time when they affect decisions. |
| Option C | Refuge assistance · mobility profile | Read-only within object scope; display source/time when they affect decisions. |
| Uncertainty | Congestion estimate | Read-only within object scope; display source/time when they affect decisions. |
| Approval | Required for zone strategy | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q05:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to O36 with a valid payload/version, and verify that it is blocked when the guard for WF-24 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q05 — V2 visual composition

**Context:** command · **Role:** Safety reviewer

**Primary question:** For route comparison & decision, what do Option A, Option B establish, and is “Publish guidance version” available to Safety reviewer in this scope?

**Primary visual:** Route trade-off matrix showing uncertainty and human approval

**Primary action:** Publish guidance version → O36

**Progressive disclosure:** Keep Option A, Option B in the decision layer. Put the supporting details for Option C, Uncertainty, Approval, full source/version history and FR-Q05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a route comparison & decision fixture for Safety reviewer; change Option A and make Approval unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Publish guidance version” reaches O36 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q06"></a>
## Q06 — AI incident copilot

**EN:** AI incident copilot · **JA:** インシデントAI支援  
**Requirement:** FR-Q06 / WF-25 · **Actor:** Operator · **Surface:** Intelligence · **Layout:** copilot

**Purpose:** A grounded summary with visible uncertainty.  
**Key rule:** AI cites evidence, exposes unknowns and cannot control equipment autonomously.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review AI recommendation → Q07.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q06) · [EN](../Prototype.html?lang=en#Q06) · [JA](../Prototype.html?lang=ja#Q06)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Summary | Fire evidence and one proactive assistance need | Read-only within object scope; display source/time when they affect decisions. |
| Sources | EV-3101 + PC-041 + SOP v4 | Read-only within object scope; display source/time when they affect decisions. |
| Data cutoff | 10:44:08 local | Read-only within object scope; display source/time when they affect decisions. |
| Authority | Recommendation only | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q06:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to Q07 with a valid payload/version, and verify that it is blocked when the guard for WF-25 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q06 — V2 visual composition

**Context:** command · **Role:** Operator

**Primary question:** For ai incident copilot, what do Summary, Sources establish, and is “Review AI recommendation” available to Operator in this scope?

**Primary visual:** Evidence-linked AI summary with cutoff and authority boundary

**Primary action:** Review AI recommendation → Q07

**Progressive disclosure:** Keep Summary, Sources in the decision layer. Put the supporting details for Data cutoff, Authority, full source/version history and FR-Q06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a ai incident copilot fixture for Operator; change Summary and make Authority unavailable. Verify the visual and warning update, all 4 source fields remain reachable, and “Review AI recommendation” reaches Q07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q07"></a>
## Q07 — AI evidence & approval

**EN:** AI evidence & approval · **JA:** AI提案の根拠と承認  
**Requirement:** FR-Q07 / WF-25 · **Actor:** Supervisor · **Surface:** Intelligence · **Layout:** detail

**Purpose:** Approve an action, not a fluent paragraph.  
**Key rule:** AI cites evidence, exposes unknowns and cannot control equipment autonomously.  
**Entry:** Q06.  
**Output:** Review route decision → Q05.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q07) · [EN](../Prototype.html?lang=en#Q07) · [JA](../Prototype.html?lang=ja#Q07)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Claim | West route remains feasible | Read-only within object scope; display source/time when they affect decisions. |
| Evidence | Route engine result R-18 | Read-only within object scope; display source/time when they affect decisions. |
| Unknown | Current corridor congestion | Read-only within object scope; display source/time when they affect decisions. |
| Guard | No unsupported exit nodes | Read-only within object scope; display source/time when they affect decisions. |
| Action | Draft guidance only | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q07:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to Q05 with a valid payload/version, and verify that it is blocked when the guard for WF-25 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q07 — V2 visual composition

**Context:** command · **Role:** Supervisor

**Primary question:** For ai evidence & approval, what do Claim, Evidence establish, and is “Review route decision” available to Supervisor in this scope?

**Primary visual:** Claim-evidence-unknown comparison before human decision

**Primary action:** Review route decision → Q05

**Progressive disclosure:** Keep Claim, Evidence in the decision layer. Put the supporting details for Unknown, Guard, Action, full source/version history and FR-Q07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a ai evidence & approval fixture for Supervisor; change Claim and make Action unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review route decision” reaches Q05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q08"></a>
## Q08 — AI policies & model evaluation

**EN:** AI policies & model evaluation · **JA:** AIポリシーとモデル評価  
**Requirement:** FR-Q08 / WF-25 · **Actor:** AI governance lead · **Surface:** Intelligence · **Layout:** detail

**Purpose:** Keep model behavior measurable.  
**Key rule:** AI cites evidence, exposes unknowns and cannot control equipment autonomously.  
**Entry:** Q09.  
**Output:** Open model governance → Q09.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q08) · [EN](../Prototype.html?lang=en#Q08) · [JA](../Prototype.html?lang=ja#Q08)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Model | Region-approved deployment | Read-only within object scope; display source/time when they affect decisions. |
| Grounding test | Release gate | Read-only within object scope; display source/time when they affect decisions. |
| Prompt injection | Adversarial fixtures | Read-only within object scope; display source/time when they affect decisions. |
| Health data | Minimized | Read-only within object scope; display source/time when they affect decisions. |
| Control tools | Not available to model | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q08:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to Q09 with a valid payload/version, and verify that it is blocked when the guard for WF-25 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q08 — V2 visual composition

**Context:** configuration · **Role:** AI governance lead

**Primary question:** For ai policies & model evaluation, what do Model, Grounding test establish, and is “Open model governance” available to AI governance lead in this scope?

**Primary visual:** Evaluation results for grounding, injection and data exposure

**Primary action:** Open model governance → Q09

**Progressive disclosure:** Keep Model, Grounding test in the decision layer. Put the supporting details for Prompt injection, Health data, Control tools, full source/version history and FR-Q08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a ai policies & model evaluation fixture for AI governance lead; change Model and make Control tools unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Open model governance” reaches Q09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q09"></a>
## Q09 — AI deployment governance

**EN:** AI deployment governance · **JA:** AI導入のガバナンス  
**Requirement:** FR-Q09 / WF-25 · **Actor:** AI governance lead · **Surface:** Intelligence · **Layout:** form

**Purpose:** Publish a reviewed model and prompt version.  
**Key rule:** AI cites evidence, exposes unknowns and cannot control equipment autonomously.  
**Entry:** Q08.  
**Output:** Save deployment draft → Q08.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q09) · [EN](../Prototype.html?lang=en#Q09) · [JA](../Prototype.html?lang=ja#Q09)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Region | EU | Read-only from the authoritative source/version; cannot be edited in this form. |
| Model version | Approved candidate | Read-only from the authoritative source/version; cannot be edited in this form. |
| Prompt version | 7 | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Data retention | Regional policy | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |
| Fallback | Deterministic workflows remain active | Required when part of the business payload; enum/format follow the schema and policy version; contextual data is read-only. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q09:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to Q08 with a valid payload/version, and verify that it is blocked when the guard for WF-25 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.

### Q09 — V2 visual composition

**Context:** configuration · **Role:** AI governance lead

**Primary question:** For ai deployment governance, what do Region, Model version establish, and is “Save deployment draft” available to AI governance lead in this scope?

**Primary visual:** Model/prompt version deployment preview with regional fallback

**Primary action:** Save deployment draft → Q08

**Progressive disclosure:** Keep Region, Model version in the decision layer. Put the supporting details for Prompt version, Data retention, Fallback, full source/version history and FR-Q09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a ai deployment governance fixture for AI governance lead; change Region and make Fallback unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Save deployment draft” reaches Q08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="q10"></a>
## Q10 — Simulation & crowd scenarios

**EN:** Simulation & crowd scenarios · **JA:** 群集とシナリオのシミュレーション  
**Requirement:** FR-Q10 / WF-24 · **Actor:** Safety planner · **Surface:** Intelligence · **Layout:** optimization

**Purpose:** Test strategy without asserting real-world certainty.  
**Key rule:** Exclude unsafe or unsuitable routes before optimizing travel and congestion.  
**Entry:** Role-based menu / deep link after authorization.  
**Output:** Review route validation → S16.  
**Data:** Sensitive: location/incident; minimize by role.

[Mockup VI](../Prototype.html?lang=vi#Q10) · [EN](../Prototype.html?lang=en#Q10) · [JA](../Prototype.html?lang=ja#Q10)

| Field / component | Sample value | Validation / editing permission |
|---|---|---|
| Mode | Scenario simulation | Read-only within object scope; display source/time when they affect decisions. |
| Occupancy | Estimated cohort | Read-only within object scope; display source/time when they affect decisions. |
| Blocked exit | East corridor | Read-only within object scope; display source/time when they affect decisions. |
| Mobility support | 4 people | Read-only within object scope; display source/time when they affect decisions. |
| Result | Assumptions require site validation | Read-only within object scope; display source/time when they affect decisions. |

**Actions and feedback:** The primary CTA checks actor/scope/version/required inputs before creating a request; while pending, the button prevents repeated submissions. Receipts show the object ID and actual state, without treating a design interaction as an executed side effect. List screens support filters and empty results; evidence/media require permission before opening. Read-only panels navigate to the corresponding review step.

**States:** loading (do not fabricate fresh data); empty (clarify scope/filter); invalid (field-level error, retain draft); denied (do not reveal the record); stale (age + source); offline (queued ≠ received); conflict (compare versions, no overwrite); success (actual receipt). When a state does not apply, the product does not invent an action to display it. The prototype state selector is a shared review tool.

**AC-Q10:** An actor within scope can open the screen and see the fields above; an out-of-scope actor cannot see the data. Test the CTA to S16 with a valid payload/version, and verify that it is blocked when the guard for WF-24 fails. Verify that vi/en/ja neither obscure the CTA nor lose meaning; the screen reader reads labels and states; back navigation/deep links never pass the wrong tenant.
<!-- PHYSICAL_BASELINE_1_0 -->

## Physical firefighting and rescue — baseline 1.0

### Q10 — V2 visual composition

**Context:** configuration · **Role:** Safety planner

**Primary question:** For simulation & crowd scenarios, what do Mode, Occupancy establish, and is “Review route validation” available to Safety planner in this scope?

**Primary visual:** Simulated crowd and blocked-exit scenario with mobility cohorts

**Primary action:** Review route validation → S16

**Progressive disclosure:** Keep Mode, Occupancy in the decision layer. Put the supporting details for Blocked exit, Mobility support, Result, full source/version history and FR-Q10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep observations, uncertainty and human decisions separate; stale or conflicting source data must withdraw unsupported recommendations.

**V2 acceptance scenario:** Use a simulation & crowd scenarios fixture for Safety planner; change Mode and make Result unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review route validation” reaches S16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f01"></a>
## F01 — Physical systems overview

**EN:** Physical systems overview · **JA:** 物理システム概要  
**FR:** FR-F01 / WF-29 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** dashboard

**Purpose / device guard:** Never aggregate stale or impaired systems into a green all-clear; each zone retains its controller and observation time.

**Entry:** F13, F18. **Output:** Review F07 → F07.

[Mockup VI](../Prototype.html?lang=vi#F01) · [EN](../Prototype.html?lang=en#F01) · [JA](../Prototype.html?lang=ja#F01)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Controller health | 3 connected; 1 stale | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Zone status | A05 alarm; B02 impaired | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Evidence freshness | 8 s; source controller C01 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Local authority | Site fire officer | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Control permission | Read-only until approved capability | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F01:** An authorized actor sees every field above and reaches F07; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Never aggregate stale or impaired systems into a green all-clear; each zone retains its controller and observation time. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F01 — V2 visual composition

**Context:** command · **Role:** Physical supervisor

**Primary question:** For physical systems overview, what do Controller health, Zone status establish, and is “Review F07” available to Physical supervisor in this scope?

**Primary visual:** Physical-system topology showing controller authority and evidence age

**Primary action:** Review F07 → F07

**Progressive disclosure:** Keep Controller health, Zone status in the decision layer. Put the supporting details for Evidence freshness, Local authority, Control permission, full source/version history and FR-F01 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a physical systems overview fixture for Physical supervisor; change Controller health and make Control permission unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F07” reaches F07 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f02"></a>
## F02 — Controller inventory

**EN:** Controller inventory · **JA:** 制御装置一覧  
**FR:** FR-F02 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** list

**Purpose / device guard:** Inventory discovery grants no write rights; bind exact model, firmware, site and interface evidence before enrollment.

**Entry:** F20. **Output:** Review F03 → F03.

[Mockup VI](../Prototype.html?lang=vi#F02) · [EN](../Prototype.html?lang=en#F02) · [JA](../Prototype.html?lang=ja#F02)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Controller model | PRA-SCL; exact firmware pending verification | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Protocol binding | Vendor Open Interface; revision required | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Operating mode | Supervision only | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Site assignment | Harbor / Building A | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Capability evidence | Supplier dossier pending | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F02:** An authorized actor sees every field above and reaches F03; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Inventory discovery grants no write rights; bind exact model, firmware, site and interface evidence before enrollment. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F02 — V2 visual composition

**Context:** configuration · **Role:** Integration engineer

**Primary question:** For controller inventory, what do Controller model, Protocol binding establish, and is “Review F03” available to Integration engineer in this scope?

**Primary visual:** Controller inventory with model, protocol and verified capability

**Primary action:** Review F03 → F03

**Progressive disclosure:** Keep Controller model, Protocol binding in the decision layer. Put the supporting details for Operating mode, Site assignment, Capability evidence, full source/version history and FR-F02 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a controller inventory fixture for Integration engineer; change Controller model and make Capability evidence unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F03” reaches F03 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f03"></a>
## F03 — Controller capability detail

**EN:** Controller capability detail · **JA:** 制御装置の機能詳細  
**FR:** FR-F03 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Unknown or undocumented capability is read-only; certification and API compatibility are separate evidence.

**Entry:** F02. **Output:** Review F04 → F04.

[Mockup VI](../Prototype.html?lang=vi#F03) · [EN](../Prototype.html?lang=en#F03) · [JA](../Prototype.html?lang=ja#F03)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Controller model | C01 / vendor-approved configuration | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Allowed operations | Read status only | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Forbidden operations | Release; reset; silence until approved | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Capability evidence | Interface specification + signed FAT | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Local override | Hardwired local authority retained | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F03:** An authorized actor sees every field above and reaches F04; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Unknown or undocumented capability is read-only; certification and API compatibility are separate evidence. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F03 — V2 visual composition

**Context:** configuration · **Role:** Integration engineer

**Primary question:** For controller capability detail, what do Controller model, Allowed operations establish, and is “Review F04” available to Integration engineer in this scope?

**Primary visual:** Allowed/forbidden operation matrix beside local override status

**Primary action:** Review F04 → F04

**Progressive disclosure:** Keep Controller model, Allowed operations in the decision layer. Put the supporting details for Forbidden operations, Capability evidence, Local override, full source/version history and FR-F03 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a controller capability detail fixture for Integration engineer; change Controller model and make Local override unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F04” reaches F04 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f04"></a>
## F04 — Signal point mapping

**EN:** Signal point mapping · **JA:** 信号点マッピング  
**FR:** FR-F04 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Verify point polarity and meaning against wiring and witnessed tests; a valve contact is not proof of water flow.

**Entry:** F03. **Output:** Review F05 → F05.

[Mockup VI](../Prototype.html?lang=vi#F04) · [EN](../Prototype.html?lang=en#F04) · [JA](../Prototype.html?lang=ja#F04)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Signal address | C01 / point 017 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Signal meaning | Valve supervisory state; not flow | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Normal polarity | Normally closed; verify wiring | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Quality mapping | Fault / stale / unknown remain distinct | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Mapping revision | Draft 3; dual review required | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F04:** An authorized actor sees every field above and reaches F05; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Verify point polarity and meaning against wiring and witnessed tests; a valve contact is not proof of water flow. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F04 — V2 visual composition

**Context:** configuration · **Role:** Integration engineer

**Primary question:** For signal point mapping, what do Signal address, Signal meaning establish, and is “Review F05” available to Integration engineer in this scope?

**Primary visual:** Signal-address-to-meaning mapping with polarity and quality states

**Primary action:** Review F05 → F05

**Progressive disclosure:** Keep Signal address, Signal meaning in the decision layer. Put the supporting details for Normal polarity, Quality mapping, Mapping revision, full source/version history and FR-F04 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a signal point mapping fixture for Integration engineer; change Signal address and make Mapping revision unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F05” reaches F05 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f05"></a>
## F05 — Physical zone mapping

**EN:** Physical zone mapping · **JA:** 物理ゾーンマッピング  
**FR:** FR-F05 / WF-28 · **Actor:** Site engineer · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Reject ambiguous floor or cross-tenant zone mappings; require signed plan revision and site walkdown.

**Entry:** F04. **Output:** Review F06 → F06.

[Mockup VI](../Prototype.html?lang=vi#F05) · [EN](../Prototype.html?lang=en#F05) · [JA](../Prototype.html?lang=ja#F05)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Source zone | C01-Z05 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Target zone | Building A / Floor 05 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Coordinate frame | Approved plan revision 12 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Coverage boundary | No cross-floor inference | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Mapping revision | Draft 3; site walkdown pending | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F05:** An authorized actor sees every field above and reaches F06; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Reject ambiguous floor or cross-tenant zone mappings; require signed plan revision and site walkdown. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F05 — V2 visual composition

**Context:** configuration · **Role:** Site engineer

**Primary question:** For physical zone mapping, what do Source zone, Target zone establish, and is “Review F06” available to Site engineer in this scope?

**Primary visual:** Physical/source zone overlay showing coordinate and coverage mismatch

**Primary action:** Review F06 → F06

**Progressive disclosure:** Keep Source zone, Target zone in the decision layer. Put the supporting details for Coordinate frame, Coverage boundary, Mapping revision, full source/version history and FR-F05 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a physical zone mapping fixture for Site engineer; change Source zone and make Mapping revision unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F06” reaches F06 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f06"></a>
## F06 — Cause-and-effect matrix

**EN:** Cause-and-effect matrix · **JA:** 原因・動作マトリクス  
**FR:** FR-F06 / WF-28 · **Actor:** Fire systems engineer · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Only the locally approved cause-and-effect matrix governs physical effects; cloud edits cannot silently rewrite controller logic.

**Entry:** F05. **Output:** Review F15 → F15.

[Mockup VI](../Prototype.html?lang=vi#F06) · [EN](../Prototype.html?lang=en#F06) · [JA](../Prototype.html?lang=ja#F06)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Cause input | Zone A05 alarm evidence | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Approved effect | Notify operator; no automatic release | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Authority record | Site cause-and-effect revision CE-03 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Inhibit condition | Test / impaired / local lockout | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Change impact | Requires reviewed commissioning plan | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F06:** An authorized actor sees every field above and reaches F15; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Only the locally approved cause-and-effect matrix governs physical effects; cloud edits cannot silently rewrite controller logic. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F06 — V2 visual composition

**Context:** configuration · **Role:** Fire systems engineer

**Primary question:** For cause-and-effect matrix, what do Cause input, Approved effect establish, and is “Review F15” available to Fire systems engineer in this scope?

**Primary visual:** Cause-to-effect graph with authority and inhibit gates

**Primary action:** Review F15 → F15

**Progressive disclosure:** Keep Cause input, Approved effect in the decision layer. Put the supporting details for Authority record, Inhibit condition, Change impact, full source/version history and FR-F06 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a cause-and-effect matrix fixture for Fire systems engineer; change Cause input and make Change impact unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F15” reaches F15 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f07"></a>
## F07 — Physical event detail

**EN:** Physical event detail · **JA:** 物理イベント詳細  
**FR:** FR-F07 / WF-29 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Deduplicate source sequence; retain raw evidence and distinguish alarm, supervisory, trouble, test and inferred incident.

**Entry:** F01. **Output:** Review F08 → F08.

[Mockup VI](../Prototype.html?lang=vi#F07) · [EN](../Prototype.html?lang=en#F07) · [JA](../Prototype.html?lang=ja#F07)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Source event | C01 / sequence 28017 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Signal meaning | Flow switch active; source evidence | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Observed time | 10:42:08 UTC+07 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Evidence quality | Current; source-bound | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Incident linkage | INC-041; operator verification pending | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F07:** An authorized actor sees every field above and reaches F08; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Deduplicate source sequence; retain raw evidence and distinguish alarm, supervisory, trouble, test and inferred incident. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F07 — V2 visual composition

**Context:** command · **Role:** Physical supervisor

**Primary question:** For physical event detail, what do Source event, Signal meaning establish, and is “Review F08” available to Physical supervisor in this scope?

**Primary visual:** Physical event provenance card linking observed evidence and incident

**Primary action:** Review F08 → F08

**Progressive disclosure:** Keep Source event, Signal meaning in the decision layer. Put the supporting details for Observed time, Evidence quality, Incident linkage, full source/version history and FR-F07 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a physical event detail fixture for Physical supervisor; change Source event and make Incident linkage unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F08” reaches F08 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f08"></a>
## F08 — Fire-water status

**EN:** Fire-water status · **JA:** 消防用水状態  
**FR:** FR-F08 / WF-29 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Pump-running, pressure, valve position and flow are independent signals; unknown water availability blocks readiness claims.

**Entry:** F07. **Output:** Review F09 → F09.

[Mockup VI](../Prototype.html?lang=vi#F08) · [EN](../Prototype.html?lang=en#F08) · [JA](../Prototype.html?lang=ja#F08)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Pump feedback | Run contact active; discharge unverified | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Pressure observation | 6.0 bar; PT-01; calibrated reference required | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Valve feedback | Open limit active; flow not implied | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Water availability | Reservoir level unknown | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Equipment impairment | Line B02 isolated under permit | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F08:** An authorized actor sees every field above and reaches F09; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Pump-running, pressure, valve position and flow are independent signals; unknown water availability blocks readiness claims. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F08 — V2 visual composition

**Context:** command · **Role:** Physical supervisor

**Primary question:** For fire-water status, what do Pump feedback, Pressure observation establish, and is “Review F09” available to Physical supervisor in this scope?

**Primary visual:** Water-system schematic separating pump, pressure and valve feedback

**Primary action:** Review F09 → F09

**Progressive disclosure:** Keep Pump feedback, Pressure observation in the decision layer. Put the supporting details for Valve feedback, Water availability, Equipment impairment, full source/version history and FR-F08 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a fire-water status fixture for Physical supervisor; change Pump feedback and make Equipment impairment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F09” reaches F09 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f09"></a>
## F09 — Controlled release review

**EN:** Controlled release review · **JA:** 制御放出の審査  
**FR:** FR-F09 / WF-30 · **Actor:** Authorized fire officer · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Release is blocked without documented allowed operation, installed certification, fresh prerequisites, local permit and controller interlocks.

**Entry:** F08. **Output:** Review F10 → F10.

[Mockup VI](../Prototype.html?lang=vi#F09) · [EN](../Prototype.html?lang=en#F09) · [JA](../Prototype.html?lang=ja#F09)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Requested operation | Release request; illustrative only | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Target equipment | Approved controller / zone A05 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Capability evidence | Unverified: execution blocked | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Release prerequisites | Local authority; occupancy; interlocks; site permit | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Command expiry | 30 s example; approved policy determines TTL | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F09:** An authorized actor sees every field above and reaches F10; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Release is blocked without documented allowed operation, installed certification, fresh prerequisites, local permit and controller interlocks. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F09 — V2 visual composition

**Context:** command · **Role:** Authorized fire officer

**Primary question:** For controlled release review, what do Requested operation, Target equipment establish, and is “Review F10” available to Authorized fire officer in this scope?

**Primary visual:** Release-prerequisite gate against exact equipment and expiring request

**Primary action:** Review F10 → F10

**Progressive disclosure:** Keep Requested operation, Target equipment in the decision layer. Put the supporting details for Capability evidence, Release prerequisites, Command expiry, full source/version history and FR-F09 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a controlled release review fixture for Authorized fire officer; change Requested operation and make Command expiry unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F10” reaches F10 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f10"></a>
## F10 — Command authorization

**EN:** Command authorization · **JA:** 装置コマンド承認  
**FR:** FR-F10 / WF-30 · **Actor:** Independent command approver · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Bind distinct requester/approver to exact equipment, operation, parameters, zone, version and expiry; any change invalidates approval.

**Entry:** F09. **Output:** Review F11 → F11.

[Mockup VI](../Prototype.html?lang=vi#F10) · [EN](../Prototype.html?lang=en#F10) · [JA](../Prototype.html?lang=ja#F10)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Exact command digest | CMD-041 / revision 3 / zone A05 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Requester identity | Fire officer A; verified scope | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Approver identity | Officer B; distinct identity required | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Approval state | Blocked: capability dossier incomplete | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Execution boundary | No browser-to-controller connection | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F10:** An authorized actor sees every field above and reaches F11; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Bind distinct requester/approver to exact equipment, operation, parameters, zone, version and expiry; any change invalidates approval. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F10 — V2 visual composition

**Context:** command · **Role:** Independent command approver

**Primary question:** For command authorization, what do Exact command digest, Requester identity establish, and is “Review F11” available to Independent command approver in this scope?

**Primary visual:** Immutable command digest with requester/approver and execution boundary

**Primary action:** Review F11 → F11

**Progressive disclosure:** Keep Exact command digest, Requester identity in the decision layer. Put the supporting details for Approver identity, Approval state, Execution boundary, full source/version history and FR-F10 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a command authorization fixture for Independent command approver; change Exact command digest and make Execution boundary unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F11” reaches F11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f11"></a>
## F11 — Execution feedback

**EN:** Execution feedback · **JA:** 実行フィードバック  
**FR:** FR-F11 / WF-30 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** timeline

**Purpose / device guard:** Controller acceptance is not physical completion; missing independent feedback becomes unknown with no blind retry.

**Entry:** F10, F19. **Output:** Review F12 → F12.

[Mockup VI](../Prototype.html?lang=vi#F11) · [EN](../Prototype.html?lang=en#F11) · [JA](../Prototype.html?lang=ja#F11)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Command receipt | Controller accepted; not completed | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Physical feedback | No independent feedback received | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Outcome state | Unknown; reconcile required | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Execution correlation | CMD-041 / controller sequence pending | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Retry permission | No blind retry of non-idempotent operation | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F11:** An authorized actor sees every field above and reaches F12; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Controller acceptance is not physical completion; missing independent feedback becomes unknown with no blind retry. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F11 — V2 visual composition

**Context:** command · **Role:** Physical supervisor

**Primary question:** For execution feedback, what do Command receipt, Physical feedback establish, and is “Review F12” available to Physical supervisor in this scope?

**Primary visual:** Receipt-versus-physical-feedback timeline with unknown outcome

**Primary action:** Review F12 → F12

**Progressive disclosure:** Keep Command receipt, Physical feedback in the decision layer. Put the supporting details for Outcome state, Execution correlation, Retry permission, full source/version history and FR-F11 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Accepted command and physical actuation are separate states; unknown outcome disables blind retry and opens reconciliation F12.

**V2 acceptance scenario:** Use a execution feedback fixture for Physical supervisor; change Command receipt and make Retry permission unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F12” reaches F12 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f12"></a>
## F12 — Unknown-result reconciliation

**EN:** Unknown-result reconciliation · **JA:** 結果不明の照合  
**FR:** FR-F12 / WF-30 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Reconcile through supported readback and qualified observation; never resend a non-idempotent release to discover the outcome.

**Entry:** F11. **Output:** Review F13 → F13.

[Mockup VI](../Prototype.html?lang=vi#F12) · [EN](../Prototype.html?lang=en#F12) · [JA](../Prototype.html?lang=ja#F12)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Command reference | CMD-041; acceptance seen | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Readback evidence | Read-only query; latest source timestamp | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Field confirmation | Qualified responder observation pending | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Reconciliation decision | Remain unknown; no release retry | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Decision reason | Independent physical effect not verified | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F12:** An authorized actor sees every field above and reaches F13; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Reconcile through supported readback and qualified observation; never resend a non-idempotent release to discover the outcome. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F12 — V2 visual composition

**Context:** command · **Role:** Physical supervisor

**Primary question:** For unknown-result reconciliation, what do Command reference, Readback evidence establish, and is “Review F13” available to Physical supervisor in this scope?

**Primary visual:** Unknown-result reconciliation comparing readback and field evidence

**Primary action:** Review F13 → F13

**Progressive disclosure:** Keep Command reference, Readback evidence in the decision layer. Put the supporting details for Field confirmation, Reconciliation decision, Decision reason, full source/version history and FR-F12 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Keep outcome unknown until correlated readback or authorized field evidence resolves it; retain contradictory evidence and reason.

**V2 acceptance scenario:** Use a unknown-result reconciliation fixture for Physical supervisor; change Command reference and make Decision reason unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F13” reaches F13 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f13"></a>
## F13 — Local override & handover

**EN:** Local override & handover · **JA:** 現地優先制御と引継ぎ  
**FR:** FR-F13 / WF-30 · **Actor:** Site incident commander · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Local override revokes remote authority; reconnection cannot replay commands or restore a revoked lease.

**Entry:** F12. **Output:** Review F01 → F01.

[Mockup VI](../Prototype.html?lang=vi#F13) · [EN](../Prototype.html?lang=en#F13) · [JA](../Prototype.html?lang=ja#F13)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Local controller state | Local control active | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Remote lease | Revoked; stale intents invalidated | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Receiving operator | Site fire officer; verified acceptance required | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Handover scope | Zone A05; command CMD-041 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Return-to-remote gate | Explicit local release + fresh authorization | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F13:** An authorized actor sees every field above and reaches F01; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Local override revokes remote authority; reconnection cannot replay commands or restore a revoked lease. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F13 — V2 visual composition

**Context:** command · **Role:** Site incident commander

**Primary question:** For local override & handover, what do Local controller state, Remote lease establish, and is “Review F01” available to Site incident commander in this scope?

**Primary visual:** Local-control handover showing remote lease and receiving operator

**Primary action:** Review F01 → F01

**Progressive disclosure:** Keep Local controller state, Remote lease in the decision layer. Put the supporting details for Receiving operator, Handover scope, Return-to-remote gate, full source/version history and FR-F13 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Loss of remote lease cannot take control back from the local controller; returning remote requires the documented handover gate.

**V2 acceptance scenario:** Use a local override & handover fixture for Site incident commander; change Local controller state and make Return-to-remote gate unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F01” reaches F01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f14"></a>
## F14 — Impairment & test mode

**EN:** Impairment & test mode · **JA:** 機能障害と試験モード  
**FR:** FR-F14 / WF-31 · **Actor:** Maintenance coordinator · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Test mode requires bounded isolation and compensating measures; permit expiry escalates but does not assert restoration.

**Entry:** Authorized physical-systems menu. **Output:** Review F18 → F18.

[Mockup VI](../Prototype.html?lang=vi#F14) · [EN](../Prototype.html?lang=en#F14) · [JA](../Prototype.html?lang=ja#F14)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Impairment scope | Line B02; no adjacent zone changes | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Permit reference | IMP-014; site approval pending | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Compensating measure | Fire watch; responsible team assigned | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Test isolation | Exercise partition; physical output inhibited | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Expiry and escalation | 16:00 local; overdue remains impaired | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F14:** An authorized actor sees every field above and reaches F18; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Test mode requires bounded isolation and compensating measures; permit expiry escalates but does not assert restoration. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F14 — V2 visual composition

**Context:** command · **Role:** Maintenance coordinator

**Primary question:** For impairment & test mode, what do Impairment scope, Permit reference establish, and is “Review F18” available to Maintenance coordinator in this scope?

**Primary visual:** Impairment map with compensating measures, permit and expiry

**Primary action:** Review F18 → F18

**Progressive disclosure:** Keep Impairment scope, Permit reference in the decision layer. Put the supporting details for Compensating measure, Test isolation, Expiry and escalation, full source/version history and FR-F14 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a impairment & test mode fixture for Maintenance coordinator; change Impairment scope and make Expiry and escalation unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F18” reaches F18 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f15"></a>
## F15 — Commissioning plan

**EN:** Commissioning plan · **JA:** 試運転計画  
**FR:** FR-F15 / WF-32 · **Actor:** Commissioning lead · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Freeze BOM, firmware, mappings and matrix; physical tests require site permit, witnesses, isolation and local abort.

**Entry:** F06. **Output:** Review F16 → F16.

[Mockup VI](../Prototype.html?lang=vi#F15) · [EN](../Prototype.html?lang=en#F15) · [JA](../Prototype.html?lang=ja#F15)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Test configuration | Controller C01 / firmware / mappings pinned | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Test scope | FAT then SAT; signed local procedure | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Test prerequisites | Isolation; fire watch; emergency abort | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Witnesses | Integrator + site authority | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Evidence requirement | Point-by-point result; timestamp; signed attachments | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F15:** An authorized actor sees every field above and reaches F16; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Freeze BOM, firmware, mappings and matrix; physical tests require site permit, witnesses, isolation and local abort. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F15 — V2 visual composition

**Context:** configuration · **Role:** Commissioning lead

**Primary question:** For commissioning plan, what do Test configuration, Test scope establish, and is “Review F16” available to Commissioning lead in this scope?

**Primary visual:** Commissioning sequence with test isolation and witness checkpoints

**Primary action:** Review F16 → F16

**Progressive disclosure:** Keep Test configuration, Test scope in the decision layer. Put the supporting details for Test prerequisites, Witnesses, Evidence requirement, full source/version history and FR-F15 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a commissioning plan fixture for Commissioning lead; change Test configuration and make Evidence requirement unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F16” reaches F16 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f16"></a>
## F16 — Test-run evidence

**EN:** Test-run evidence · **JA:** 試験実施証跡  
**FR:** FR-F16 / WF-32 · **Actor:** Commissioning witness · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Expected results cannot populate observed results; failed or unexecuted tests block release and preserve attachments.

**Entry:** F15. **Output:** Review F17 → F17.

[Mockup VI](../Prototype.html?lang=vi#F16) · [EN](../Prototype.html?lang=en#F16) · [JA](../Prototype.html?lang=ja#F16)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Test run | SAT-041 / approved plan revision 2 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Expected effect | Selected zone only; local priority retained | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Observed effect | Pending witnessed measurement | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Fault injection | Power loss / link loss / stuck feedback | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Result status | Not executed; not a passed certificate | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F16:** An authorized actor sees every field above and reaches F17; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Expected results cannot populate observed results; failed or unexecuted tests block release and preserve attachments. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F16 — V2 visual composition

**Context:** configuration · **Role:** Commissioning witness

**Primary question:** For test-run evidence, what do Test run, Expected effect establish, and is “Review F17” available to Commissioning witness in this scope?

**Primary visual:** Expected/observed physical-effect comparison with fault injections

**Primary action:** Review F17 → F17

**Progressive disclosure:** Keep Test run, Expected effect in the decision layer. Put the supporting details for Observed effect, Fault injection, Result status, full source/version history and FR-F16 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a test-run evidence fixture for Commissioning witness; change Test run and make Result status unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F17” reaches F17 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f17"></a>
## F17 — Compatibility & certificate dossier

**EN:** Compatibility & certificate dossier · **JA:** 互換性・証明書台帳  
**FR:** FR-F17 / WF-32 · **Actor:** Compliance reviewer · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** A product certificate does not certify the installation or cloud adapter; exact scope, revisions and acceptance evidence must match.

**Entry:** F16. **Output:** Review F20 → F20.

[Mockup VI](../Prototype.html?lang=vi#F17) · [EN](../Prototype.html?lang=en#F17) · [JA](../Prototype.html?lang=ja#F17)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Installed bill of materials | Controller + modules + PSU + firmware | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Certificate scope | Exact assembly and jurisdiction to verify | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Interface limitation | Unknown capabilities remain read-only | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Evidence validity | Supplier document revision; expiry tracked | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Release decision | Blocked until FAT / SAT / authority acceptance | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F17:** An authorized actor sees every field above and reaches F20; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: A product certificate does not certify the installation or cloud adapter; exact scope, revisions and acceptance evidence must match. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F17 — V2 visual composition

**Context:** configuration · **Role:** Compliance reviewer

**Primary question:** For compatibility & certificate dossier, what do Installed bill of materials, Certificate scope establish, and is “Review F20” available to Compliance reviewer in this scope?

**Primary visual:** Certificate scope mapped to installed bill of materials and limitations

**Primary action:** Review F20 → F20

**Progressive disclosure:** Keep Installed bill of materials, Certificate scope in the decision layer. Put the supporting details for Interface limitation, Evidence validity, Release decision, full source/version history and FR-F17 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a compatibility & certificate dossier fixture for Compliance reviewer; change Installed bill of materials and make Release decision unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F20” reaches F20 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f18"></a>
## F18 — Maintenance & restoration

**EN:** Maintenance & restoration · **JA:** 保守と復旧  
**FR:** FR-F18 / WF-31 · **Actor:** Maintenance coordinator · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Only witnessed restoration and site approval clear impairment; time elapsed or technician closure alone cannot restore availability.

**Entry:** F14. **Output:** Review F01 → F01.

[Mockup VI](../Prototype.html?lang=vi#F18) · [EN](../Prototype.html?lang=en#F18) · [JA](../Prototype.html?lang=ja#F18)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Maintenance scope | Line B02 isolation IMP-014 | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Repair evidence | Technician report; component serial | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Restoration test | Independent feedback + local panel check | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Closure approval | Site authority; not technician alone | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Residual impairment | Unknown until witnessed restoration | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F18:** An authorized actor sees every field above and reaches F01; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Only witnessed restoration and site approval clear impairment; time elapsed or technician closure alone cannot restore availability. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F18 — V2 visual composition

**Context:** configuration · **Role:** Maintenance coordinator

**Primary question:** For maintenance & restoration, what do Maintenance scope, Repair evidence establish, and is “Review F01” available to Maintenance coordinator in this scope?

**Primary visual:** Restoration checklist with residual impairment and approval evidence

**Primary action:** Review F01 → F01

**Progressive disclosure:** Keep Maintenance scope, Repair evidence in the decision layer. Put the supporting details for Restoration test, Closure approval, Residual impairment, full source/version history and FR-F18 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a maintenance & restoration fixture for Maintenance coordinator; change Maintenance scope and make Residual impairment unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F01” reaches F01 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f19"></a>
## F19 — Rescue equipment mission

**EN:** Rescue equipment mission · **JA:** 救助機材ミッション  
**FR:** FR-F19 / WF-33 · **Actor:** Rescue mission commander · **Surface:** PhysicalSystems · **Layout:** detail

**Purpose / device guard:** Colossus control API is unverified: dispatch to trained vendor-console operator; no cloud movement, nozzle or casualty actuation.

**Entry:** Authorized physical-systems menu. **Output:** Review F11 → F11.

[Mockup VI](../Prototype.html?lang=vi#F19) · [EN](../Prototype.html?lang=en#F19) · [JA](../Prototype.html?lang=ja#F19)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Equipment configuration | Colossus water monitor / stretcher as approved | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Control interface | Vendor console; public API unverified | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Operator qualification | Trained operator; task acceptance pending | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Mission constraints | Water supply; access; load; local stop; casualty procedure | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Mission evidence | Operator report + supported telemetry; not automatic success | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F19:** An authorized actor sees every field above and reaches F11; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Colossus control API is unverified: dispatch to trained vendor-console operator; no cloud movement, nozzle or casualty actuation. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F19 — V2 visual composition

**Context:** command · **Role:** Rescue mission commander

**Primary question:** For rescue equipment mission, what do Equipment configuration, Control interface establish, and is “Review F11” available to Rescue mission commander in this scope?

**Primary visual:** Rescue-equipment mission envelope with qualified operator and limits

**Primary action:** Review F11 → F11

**Progressive disclosure:** Keep Equipment configuration, Control interface in the decision layer. Put the supporting details for Operator qualification, Mission constraints, Mission evidence, full source/version history and FR-F19 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a rescue equipment mission fixture for Rescue mission commander; change Equipment configuration and make Mission evidence unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F11” reaches F11 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


<a id="f20"></a>
## F20 — Physical connector onboarding

**EN:** Physical connector onboarding · **JA:** 物理コネクタ登録  
**FR:** FR-F20 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** form

**Purpose / device guard:** Connector activation starts read-only; credentials stay in vault and only signed capability policy can enable an approved write operation.

**Entry:** F17. **Output:** Review F02 → F02.

[Mockup VI](../Prototype.html?lang=vi#F20) · [EN](../Prototype.html?lang=en#F20) · [JA](../Prototype.html?lang=ja#F20)

| Field / component | Sample value | Validation / authority |
|---|---|---|
| Vendor interface | Exact published model / firmware / protocol | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Transport security | Certificate and OT allowlist verified before connection | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Credential custody | Secret reference only; never display secret | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Import scope | Read-only points; no discovered write grant | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |
| Activation gate | Sandbox test + mapping review + signed capability dossier | Source-bound read-only evidence; retain observation time and quality. Edits to plans/decisions require actor scope, expected version, reason and independent review; never edit physical feedback. |

**Actions and feedback:** The CTA opens the linked review screen; prototype navigation never sends device commands. Production mutations use scoped idempotency and expected version; control additionally requires the exact approved capability, site authority and unexpired authorization. Fields from telemetry and dossiers remain read-only. Display request ID, controller receipt and independent physical evidence separately.

**States:** loading: no fabricated telemetry; empty: no assigned equipment; denied: no object leakage; stale: show age/source and block dependent control; offline: read-only cached evidence, no queued actuation; conflict: compare revisions, invalidate prior approval; impaired/test: explicit scope and compensating measure; local override: remote authority revoked; unknown outcome: reconciliation only; success: appropriate durable record or verified physical evidence, never inference from ACK.

**AC-F20:** An authorized actor sees every field above and reaches F02; an out-of-scope actor cannot read or mutate the object. Exercise the specific guard: Connector activation starts read-only; credentials stay in vault and only signed capability policy can enable an approved write operation. Test stale evidence, cross-tenant point IDs, changed mapping/version, expired authorization and loss of local authority. Verify no prohibited write reaches the adapter; preserve audit and source event correlation. Check vi/en/ja labels, keyboard focus, screen-reader state, retained draft and explicit unknown/error recovery.

### F20 — V2 visual composition

**Context:** configuration · **Role:** Integration engineer

**Primary question:** For physical connector onboarding, what do Vendor interface, Transport security establish, and is “Review F02” available to Integration engineer in this scope?

**Primary visual:** Vendor connector onboarding gates for credentials, import and activation

**Primary action:** Review F02 → F02

**Progressive disclosure:** Keep Vendor interface, Transport security in the decision layer. Put the supporting details for Credential custody, Import scope, Activation gate, full source/version history and FR-F20 rules in labeled expandable sections; never hide a safety-critical constraint.

**Critical failure behavior:** Retain local controller authority; absent physical feedback means unknown outcome, never success, and forbids blind repeat execution.

**V2 acceptance scenario:** Use a physical connector onboarding fixture for Integration engineer; change Vendor interface and make Activation gate unavailable. Verify the visual and warning update, all 5 source fields remain reachable, and “Review F02” reaches F02 only under its original guards. Repeat in VI/EN, keyboard and 320 CSS-pixel reflow; record observed results separately from this specification.


