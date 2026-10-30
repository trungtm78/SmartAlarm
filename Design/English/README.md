# SmartAlarm — UI/UX revision 2.0

Updated 2026-10-24. Full visual redesign synchronized with bilingual design documentation and customer proposals.

- 233 screens, 33 workflows; VI/EN/JA interface.
- 699 screen/locale browser views; no recorded JavaScript errors or horizontal overflow.
- 48 route-state checks and 60 mobile layout checks recorded separately.
- 21 interaction checks: SOS review/edit, modal keyboard focus, map layers, route/speech withdrawal and discreet mode.
- 233 additional screen-specific UX acceptance specifications; these are planned human validation, not executed user studies.
- 166 slides per proposal, including the preserved complete function appendix.

The prototype uses illustrative data. Browser checks do not establish user comprehension, live delivery, physical firefighting effect or field readiness.

[Visual review](../UX-Review-EN.html) · [Gallery](Gallery.html) · [UI/UX](UIUX-Design.html) · [Screen specifications](Screen-Specifications.html) · [Audit](UX-Redesign-Audit.html)

---

# SmartAlarm — Package guide

Baseline 2.0 · 23 October 2026 · English

## Start here

Open `index.html` for the design library, `Proposal.html` for the native PowerPoint-rendered proposal, or `Gallery.html` for all 233 screens. The Vietnamese library is in the parent directory. Keep the package directory structure intact: English pages share images, prototype and machine-readable contracts with the parent folder.

## Designed scope

International, multi-tenant and multi-industry operation; fire, natural hazards, falls, road accidents and multiple SOS types; indoor/outdoor positioning; evacuation routes using hazard exposure, mobility needs and evidence quality; VI/EN/JA voice guidance; PA, drones and rescue equipment; health/functional profiles and proactive assistance without SOS; evidence-grounded AI with human oversight.

Physical integration covers fire panels, water supply, pumps/controllers, valves, waterflow, sprinklers, deluge/pre-action, releasing controllers, smoke control, doors/exit signage, emergency PA and robots/water monitors. The design distinguishes monitoring, permitted commands and physical feedback, with local automation/override, UNKNOWN reconciliation, impairment and FAT/SAT.

## Deliverables

- 12 specialist documents in Markdown, HTML and PDF, plus a master containing ten chapters (screen specifications are a separate volume).
- English and Vietnamese PowerPoint/PDF proposals with a complete appendix of functions, workflows and background requirements.
- 233 screens, 33 workflows and 466 VI/EN mockup captures; prototype language choices VI/EN/JA.
- 298 designed acceptance cases: 65 cross-system and 233 screen cases.
- Machine-readable API, events, connector manifest, design tokens and screen registry.
- Two device research catalogs and a standards/deployment dossier with manufacturer references, limitations, RFIs and validation criteria.

## Implementation use

Read BRD → FRD → Basic Design → Detail Design. Trace workflow/FR IDs through Screen Specifications and the Acceptance Matrix. Select equipment configurations from the catalogs, survey the site, verify vendor capabilities, approve cause-and-effect and execute FAT/SAT before enabling control. Capacity/SLO values are design targets requiring implementation and measured validation.

All-in-one scenes illustrate the proposed solution; they are not installation drawings or acceptance photographs. Native text, diagrams and UI in the PPTX are editable; pictorial scenes are raster images. The AIPOWER identity and style are retained from the supplied source as requested. Intentional Vietnamese/Japanese language examples remain in the English proposal.

## Verification status

Documents, exports, links and the design prototype were checked. No production backend, real-device connection, FAT/SAT or field certification has been executed. The complete functional list covers this design baseline; it does not assert every connector has been implemented.
