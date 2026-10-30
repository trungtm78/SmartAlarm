# SmartAlarm — Design baseline 3.0

Updated 24 October 2026. BMS integration is incorporated directly into the existing BRD, FRD, Basic Design, Detail Design, UI/UX and related specifications.

- 241 screens; 37 workflows; VI/EN/JA interface.
- 40 BMS requirements; 11 vendor connector engineering profiles.
- 67 API operations, including 23 BMS operations; 7 typed BMS events.
- 354 acceptance specifications per language.
- 188 slides per proposal; 590 traceability rows across workflow, screen and system layers (not 590 distinct features).

[BRD](BRD.html) · [FRD](FRD.html) · [Basic Design](Basic-Design.html) · [Detail Design](Detail-Design.html) · [UI/UX](UIUX-Design.html) · [Screen specifications](Screen-Specifications.html) · [Proposal](Proposal.html) · [Function appendix](Functional-Inventory.html)

[Prototype](../Prototype.html) · [BMS research](../BMS/index.html) · [API](../API-Contract.json) · [Events](../Event-Schemas.json)

Verification: 723 browser screen/locale views with no recorded JavaScript errors or horizontal overflow; 48 route-state checks and 60 mobile layout checks. New BMS scope: 24 desktop views, 24 mobile views and 15 local interactions. Technical contract checks: 397/397 passed. All acceptance matrices specify future operational acceptance; they are not field test results.

This package specifies implementation. Vendor drivers, live BMS connectivity, physical actuation and FAT/SAT remain to be implemented and qualified against each site/version. Historical v2 audit evidence is retained with its original scope.
