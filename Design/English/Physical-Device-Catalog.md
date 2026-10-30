# SmartAlarm — Physical device compatibility catalog

Research date: **2026-10-23**. Status: **document-verified candidates; no hardware integration, procurement, or field acceptance completed**. This catalog supplements WF-03, WF-14, WF-15, and WF-17. The Vietnamese and English editions contain the same scope and conclusions.

## 1. Deployment decision

Use manufacturer-supported interfaces to observe existing fire panels, pump controllers, and releasing panels. Keep their local automatic protection functions operational independently of SmartAlarm. A protocol connection, a writable BACnet property, a pump-running signal, and confirmed water discharge are four different capabilities. None alone demonstrates that SmartAlarm may safely initiate suppression or that water reaches the protected hazard.

The six candidates below are alternatives or complementary components, not a single certified assembly. Availability, exact firmware, regional approval, optional parts, and permitted actions require project-specific vendor confirmation. A manufacturer's listing of its own component does not certify the complete SmartAlarm installation.

## 2. Six concrete candidates

| ID / product binding | Documented interface and feedback | Command boundary and unresolved items | Proposed SmartAlarm use |
|---|---|---|---|
| PHY-01 — Siemens Cerberus PRO FC922 / FC924; FCA2034-A1 S2 or FCA2035-A1 S3 | FC922/FC924 are identified in the [panel datasheet A6V10349710](https://sid.siemens.com/v/u/A6V10349710). The US [accessory datasheet A6V10349679](https://support.industry.siemens.com/cs/attachments/109789153/A6V10349679.pdf) describes S2 BACnet as monitoring-only; S3 retains monitoring-only BACnet while adding separate remote-viewer control. | Do not equate remote-viewer control with BACnet actuation. Obtain regional SKU, firmware, license scope, PICS/object export, and supported event states. No suppression-release capability is established here. | Read event/state data through a site edge adapter; preserve panel/point identifiers and communication quality. |
| PHY-02 — Honeywell NOTIFIER BACNET-GW-3 with NFS-320 / NFS2-640 / NFS2-3030 and appropriate NFN interface | [DN-6877:C, 2014-08-04](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/literature-and-specs/datasheets/notifier-us/hon-ba-fire-dn-6877.pdf?download=false): BACnet/IP event objects; up to 14 NFN nodes and 15,000 objects; NCM/HS-NCM connection and browser configuration. | The [listing C6, 2019-02-21](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/regulatory-documents/fire-listings/notifier-us/ba-fire-LS10014-051NF-E.pdf) restricts use to supplementary functions and excludes triggering mass-notification announcements. Confirm current supply/support, firmware, chassis, power, and exact panel compatibility. | Supplementary monitoring; never treat this gateway as a replacement for the primary alarm or as a proven suppression command path. |
| PHY-03 — Simplex BACpac 4100-6111 with 4100ES / 4100U | [S4100-0051 Rev.6, 10/2020, pp.1–4](https://docs.johnsoncontrols.com/simplex/api/khub/documents/c9ua0rLXB39jxpiKI54Hsw/content): 15,000-point variant; separate 4100-6038 RS-232 module; BACnet IP/MS/TP or Modbus TCP/RTU. Supplementary status interface. | Its PICS includes WriteProperty support; this does not establish an authorized panel-release command. Obtain the actual point mapping and permitted write semantics. Confirm software and separately ordered hardware. | Read-only status adapter for a specifically bound panel configuration. |
| PHY-04 — Tornatech GPX electric fire-pump controller, V2 communication profile | The [GPx-V2 Modbus bulletin](https://www.tornatech.com/wp-content/uploads/2018/08/GPx-V2.pdf) maps motor-run, voltage/current, pressure, and fault feedback. It also names remote/manual and automatic-start entries. | That short map does not fully specify write functions, enable conditions, persistence, or retry behavior. Do not automatically apply its V2 map to V2.1/current firmware. Exact controller suffix, options, and current register contract remain required. | Pump health and demand monitoring; command capability stays disabled until vendor-supported, project-approved validation. |
| PHY-05 — Tornatech GPD diesel fire-pump controller, V2 communication profile | The separate [GPD-V2 Modbus bulletin](https://www.tornatech.com/wp-content/uploads/2018/08/GPD-V2.pdf) maps engine-run, batteries, pressure, and diesel faults, plus named start entries. | GPX and GPD maps are not interchangeable. Confirm firmware, engine interface, installed sensors, writable registers, and automatic/manual mode behavior. Missing sensors must remain unknown. | Diesel readiness and pump-state monitoring with a dedicated adapter profile. |
| PHY-06 — Potter PFC-4410G3, stock 3006735 | [5401600 Rev.B, 4/23](https://www.pottersignal.com/product/datasheet/5401600_PFC-4410G3.pdf): pre-action/deluge releasing panel; alarm, trouble, supervisory, and waterflow/discharge-confirmation relays; Ethernet programming; proprietary RS-485 P-Link. | Ethernet/P-Link does not prove a public release API. Confirm output ratings, chosen program, compatible solenoid, feedback wiring, and optional relay modules. Do not assume releasing output equals waterflow confirmation. | Read approved relay indications through a supervised interface; local releasing panel owns suppression sequencing. |

No additional interface license is established for PHY-02–06 by this review; this is not a claim that all configurations or engineering tools are free or included. Obtain a complete bill of materials and license statement.

## 3. Version and lifecycle findings that change implementation

**Siemens regional distinction.** The [2018 Siemens FC72x catalog](https://sid.siemens.com/api/khub/documents/IFS6rQE0Z_N43rKnuiSpCg/content) describes FCA2034-A1 with basic and FCA2035-A1 with extended third-party BACnet commands. This differs from the US accessory wording above. Therefore the adapter key must include regional panel family and firmware, not just “Cerberus PRO” or the license label. The exact commands available at a particular site remain unverified.

**NOTIFIER network constraints.** [Manual LS10014-000NF-E:D2, 2019-04-30, p.9](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/manuals-and-guides/installation-guides/notifier-us/ba-fire-LS10014-000NF-E.pdf) specifies a static IP and no NAT support. Proposed topology: keep the BACnet client in the permitted site network and export normalized events outward; do not assume a cloud VPN/NAT arrangement is supported.

**Real pump start interfaces exist.** Tornatech's current [GPX manual V2026.09 r0, p.16](https://www.tornatech.com/pdf/Manuals/en/GPX-EN.pdf) documents remote manual-start contact closure and remote automatic/deluge-start contact opening. These are physical controller inputs, not evidence of a cloud command API. Its [GPX product page](https://www.tornatech.com/product/gpx-series-electric-fire-pump-controllers-3/) also identifies remote alarm contacts. Obtain the job-specific wiring diagram, contact ratings, supervision, and fail-state behavior before designing an I/O interface.

The [GPD manual V2026.09 r0, pp.13–15](https://www.tornatech.com/pdf/Manuals/en/GPD-EN.pdf) separately documents contact-based remote starts. Automatic stopping is not enabled by default and requires authority-having-jurisdiction authorization; commissioning requires an authorized provider. SmartAlarm must not introduce an unvalidated remote-stop function.

**Select the current releasing panel deliberately.** Potter's [official releasing-panel catalog](https://www.pottersignal.com/special-hazard/releasing-panels) marks PFC-4410RC obsolete. The G3 is the candidate for new procurement, subject to vendor confirmation. Its [product page](https://www.pottersignal.com/sprinkler/4410-conventional-releasing-panel) explicitly identifies email monitoring as a non-UL-listed feature; it is not the safety event transport. Use the [G3 manual 5403751 Rev.G, 11/25](https://www.pottersignal.com/product/manual/5403751_PFC-4410G3.pdf) and the manufacturer's [compatible releasing-device list](https://www.pottersignal.com/product/manual/5403615_Compatible_Releasing_Device_List.pdf) to request confirmation of the exact panel/solenoid/valve assembly. No valve pairing is approved by this catalog.

## 4. Proposed integration contract — SmartAlarm design, not manufacturer claims

For each installation, bind `manufacturer + regional_model + controller_serial + firmware + gateway_model + gateway_firmware + license + point_map_revision`. Store every observed point with source address, semantic type, engineering unit, source timestamp where available, receive timestamp, quality, and communication status. A point-map revision must be reviewable and rollback-capable.

| Proposed semantic | Required evidence | Must not be inferred |
|---|---|---|
| `fire_alarm_active` | Valid panel point/state mapping | Camera confidence alone is not a panel alarm |
| `pump_start_demand` | Documented demand contact/register | Motor actually running |
| `pump_running` | Valid controller run feedback | Adequate pressure, flow, or extinguishment |
| `system_pressure` | Installed transducer, unit/scaling, calibration | Flow at a specific protected zone |
| `release_output_active` | Documented releasing circuit/output feedback | Valve movement or water discharge |
| `waterflow_confirmed` | Commissioned waterflow/pressure feedback and zone binding | Fire extinguished or every nozzle operating |
| `communication_lost` | Link supervision and timeout | Normal, safe, pump stopped, or failed actuation |

The default adapter capability is `observe`. A potential `request_start` or other command requires a distinct signed capability record describing authority, exact operation, conditions, local interlocks, TTL, duplicate handling, feedback, and recovery. An uncertain response stays `unknown`; reconnection must not replay expired physical requests. Do not add reset/silence/disable/stop actions merely because a protocol supports writing.

## 5. Vendor RFI before procurement

| RFI | Required written answer/evidence |
|---|---|
| RFI-01 — Identity and lifecycle | Regional SKU, orderable status, end-of-support date, firmware matrix, substitutions, and spare-part availability |
| RFI-02 — Complete package | Gateway/modules, licenses, engineering tools, power/backup, enclosure, isolation, protection, and authorized commissioning scope |
| RFI-03 — Read contract | Current PICS/register map, supported event/state types, polling/subscription limits, address conventions, scaling, sequence/time behavior, and communication-loss semantics |
| RFI-04 — Command contract | Explicit allowed/prohibited operations; write function/property; enabling configuration; physical input semantics; local priority; TTL/replay behavior; confirmation and rollback limits |
| RFI-05 — Physical assembly | Approved valve/solenoid/controller combinations, electrical loads, hydraulic design responsibility, pressure/flow sensor placement, cause-and-effect matrix, and supervision |
| RFI-06 — Regional acceptance | Applicable adopted codes and editions, component listings and limitations, system designer approval, AHJ/site acceptance requirements; no blanket international-compliance assertion |
| RFI-07 — Cybersecurity/support | Network segmentation, credentials, supported updates, vulnerability process, maintenance access, logging, outage behavior, and recovery procedures |

## 6. Commissioning evidence and release gate

The following are proposed SmartAlarm acceptance requirements, not a replacement for manufacturer or local mandatory tests.

1. Record serial numbers, firmware, license proof, approved drawings, point map, and baseline controller configuration. Obtain approval of the complete cause-and-effect matrix.
2. In a controlled test arrangement, verify each mapped alarm, supervisory, fault, pump demand/run, pressure, releasing-output, and waterflow indication against the physical system. Record expected versus observed states and timestamps.
3. Test broken links, adapter restart, stale data, duplicate events, power/backup changes, and reconnect. Verify that local automatic protection continues and no stale event creates an unintended command.
4. If any command is authorized, test its approved preconditions, denial paths, local override, feedback loss, and recovery with the qualified site team. Do not perform live discharge merely to validate software connectivity.
5. Obtain signed factory/site acceptance records, calibration records, operator training, maintenance ownership, and an approved impairment/restoration procedure. Mark the adapter `field_accepted` only for that exact configuration.

Procurement recommendation: first bind to the installed panel/controller family, then buy the supported interface and required options. For a greenfield water-suppression installation, have the fire-protection designer specify the physical hydraulic and releasing system before selecting the SmartAlarm adapter. No purchase or vendor contact has been made.

## 7. Evidence register and access limits

All sources below were reviewed on **2026-10-23**. Document dates are publisher revision dates, not retrieval dates. Online presence does not establish current stock or support. Only manufacturer sources support product claims; no reseller claim is used.

| Evidence | Publisher document / date | Access and scope |
|---|---|---|
| E01 | [Siemens A6V10349710](https://sid.siemens.com/v/u/A6V10349710); [A6V10349679](https://support.industry.siemens.com/cs/attachments/109789153/A6V10349679.pdf) | Official indexed title/accessory passages; direct PDF retrieval was blocked. Revision must be obtained with the quotation. |
| E02 | [Siemens FC72x catalog](https://sid.siemens.com/api/khub/documents/IFS6rQE0Z_N43rKnuiSpCg/content), ©2018 | Official indexed license passage; full download exceeded browser size limit. Regional distinction only; not a current command contract. |
| E03 | [NOTIFIER DN-6877:C](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/literature-and-specs/datasheets/notifier-us/hon-ba-fire-dn-6877.pdf?download=false), 2014-08-04 | Official indexed datasheet passages. |
| E04 | [NOTIFIER listing C6](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/regulatory-documents/fire-listings/notifier-us/ba-fire-LS10014-051NF-E.pdf), 2019-02-21; [manual D2](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/manuals-and-guides/installation-guides/notifier-us/ba-fire-LS10014-000NF-E.pdf), 2019-04-30 | Official indexed limitation/configuration passages; direct retrieval unavailable. Request controlled copies and current revisions. |
| E05 | [Simplex S4100-0051 Rev.6](https://docs.johnsoncontrols.com/simplex/api/khub/documents/c9ua0rLXB39jxpiKI54Hsw/content), 10/2020 | Official six-page PDF read; selection and PICS tables examined. |
| E06 | [Tornatech GPx-V2](https://www.tornatech.com/wp-content/uploads/2018/08/GPx-V2.pdf); [GPD-V2](https://www.tornatech.com/wp-content/uploads/2018/08/GPD-V2.pdf) | Official two-page maps read; V2 identity verified, no printed revision date established. URL upload path is not a revision guarantee. |
| E07 | [Tornatech GPX](https://www.tornatech.com/pdf/Manuals/en/GPX-EN.pdf); [GPD](https://www.tornatech.com/pdf/Manuals/en/GPD-EN.pdf), both V2026.09 r0 | Official manuals read, particularly starting/stopping and commissioning; current manuals do not by themselves validate the older V2 register maps. |
| E08 | [Potter 5401600 Rev.B](https://www.pottersignal.com/product/datasheet/5401600_PFC-4410G3.pdf), 4/23; [5403751 Rev.G](https://www.pottersignal.com/product/manual/5403751_PFC-4410G3.pdf), 11/25 | Official datasheet and manual retrieved; interfaces and revision verified. |
| E09 | [Potter G3 product page](https://www.pottersignal.com/sprinkler/4410-conventional-releasing-panel); [releasing-panel catalog](https://www.pottersignal.com/special-hazard/releasing-panels); [device compatibility list](https://www.pottersignal.com/product/manual/5403615_Compatible_Releasing_Device_List.pdf) | Live manufacturer pages reviewed; compatibility-list link retrieved but subsequent fetch timed out, so no specific valve/solenoid pairing is asserted. |

Open evidence gaps remain procurement gates, not proof of incompatibility. This research demonstrates feasible integration paths and specific restrictions; it does not report completed interoperability or certify a deployment.


## UX2-PHYSICAL · Visual supervision and physical feedback

The v2 console uses a pipe/valve/pump mimic, zone coverage and explicit device state. A requested command, gateway acknowledgement and observed physical effect are separate states. Unknown or stale feedback must use a labeled pattern and timestamp, never a green success state. Review-only actions in the prototype do not operate equipment. Local fire protection authority, interlocks and commissioning requirements in this document remain binding.

Verify F08–F20 with communication loss, conflicting local state and delayed feedback. Operator access to the schematic must not bypass command authorization. PA playback feedback is not proof of audibility to every occupant. Drone/robot task acceptance is not proof of arrival or rescue.

See [UI/UX design](UIUX-Design.html), [screen specifications](Screen-Specifications.html) and [redesign audit](UX-Redesign-Audit.html).
