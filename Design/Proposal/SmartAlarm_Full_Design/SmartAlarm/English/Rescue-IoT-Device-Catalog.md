# SmartAlarm — Rescue, firefighting and IoT device catalog

Research snapshot: **2026-10-23**. Six deployment candidates researched against official manufacturer documentation. Published capability is not proof of integration with SmartAlarm; all adapters remain proposed until bench and site acceptance. This catalog adds physical intervention to sensing, warning, positioning and dispatch. No equipment has been purchased or commissioned.

**Current design baseline: 3.0 · BMS integration: 24 October 2026. Original research/requirement dates above are preserved.**

## 1. Evidence and deployment decision

| ID | Exact candidate | Physical role | Integration evidence | Proposed pilot disposition |
|---|---|---|---|---|
| DEV-01 | AXIS C1310-E Mk II Network Horn Speaker | Fixed-site audible instructions | Published VAPIX and SIP interfaces | Bench adapter, then acoustic site test |
| DEV-02 | Bosch PRAESENSA with PRA-SCL system controller | Supervised public address / emergency voice system | Published Open Interface | Accredited integrator review before any emergency control |
| DEV-03 | DJI Matrice 4T + DJI AS1 Speaker | Mobile aerial instructions and search support | Operator features verified; exact AS1 command API unverified | Operator-assisted workflow initially |
| DEV-04 | DJI Matrice 400 + Zenmuse V1 | Aerial voice delivery with developer integration path | Official PSDK V1 widget control and MSDK product statement | SDK proof of concept, then flight exercise |
| DEV-05 | Shark Robotics Colossus, water/foam monitor and casualty-evacuation configuration | Physical suppression, reconnaissance and casualty transport | Vendor remote control; public integration API unknown | Task dispatch with trained vendor-console operator |
| DEV-06 | FLIR A700 with Smart Sensor configuration | Thermal observation and early-warning evidence | Published MQTT, Modbus TCP and REST | Read-only sensor gateway pilot |

## 2. DEV-01 — Fixed network horn

**Verified:** The C1310-E Mk II datasheet lists VAPIX, SIP, SRTP/SIPS, speaker-test results and audio-clip-playing events. These are device capabilities, not evidence that people heard the message. [Official datasheet](https://www.axis.com/dam/public/b5/cd/f9/datasheet-axis-c1310-e-mk-ii-network-horn-speaker-en-US-470491.pdf).

**Proposed integration:** Edge adapter maps approved message/zone intent to the pinned VAPIX API and routes live audio through a tested SIP media gateway. Maintain a speaker-to-zone inventory; distinguish command receipt, playback evidence and human acknowledgment. Never infer coverage from network-online status alone.

**RFI / limits:** Request exact firmware and API versions, audio upload/play/stop methods, authentication, clip capacity, feedback semantics, management licensing and lifecycle/support dates. Confirm whether the purchased package needs separate audio-manager or third-party integration licenses; no free entitlement is assumed. Do not specify this network horn as a certified replacement for the site's mandatory fire voice alarm without an applicable certificate and approved design.

**SAT-01:** Play an approved recording only in the selected zone; test wrong-zone rejection, amplifier/acoustic fault, certificate failure, power loss, WAN loss and expired-command reconnection. Measure intelligibility under actual noise and occupancy, including Vietnamese/English/Japanese recordings.

## 3. DEV-02 — Supervised emergency PA

**Verified:** PRA-SCL exposes an Open Interface and supervises stored messages; its official product record identifies the controller. [PRA-SCL product](https://commerce.keenfinity.tech/nlexp/en/System-controller-large/p/F.01U.325.042/). The vendor publishes native and C#/.NET Open Interface documentation. [Programming manual](https://software-download.keenfinity-group.com/publicaddress/praesensa/manuals/PRAESENSA%20open%20interface%20programming%20intructions.pdf). Configuration documentation includes TLS and an option to disable emergency control through the interface. [Configuration manual](https://resources.keenfinity.tech/public/documents/PRAESENSA_Configurat_Configuration_Manual_enUS_18014473303379595.pdf).

**Certification boundary:** The vendor describes PRAESENSA's EN 54-16 capability; applicability depends on the installed system. [Official system page](https://www.keenfinity-group.com/it/it/soluzioni/soluzioni-per-la-comunicazione-pubblica/sistemi-di-comunicazione-al-pubblico-e-allarme-vocale/sistema-di-comunicazione-al-pubblico-basato-su-ip-praesensa/). Earlier official configuration instructions explicitly warn that Open Interface use can compromise evacuation-standard compliance. [Integration restrictions](https://resources.keenfinity.tech/public/documents/PRAESENSA_2.20_Configuration_Manual_enUS_100857072779.pdf).

**Proposed integration:** Regional SmartAlarm command policy → local approved adapter → controller; start with health/events and authorized general announcements. The local certified alarm path retains priority. Emergency initiation, acknowledgment or reset requires the integrator's documented permitted design; a generic API acknowledgment is not acoustic completion.

**RFI / limits:** Obtain the exact current firmware/manual/certificate set, permitted interface commands, zone/priority arbitration, failure supervision, redundancy, power backup and approved fire-panel interface. Confirm required controller, amplifier, PSU, call station, loudspeaker and optional subsystem/software licenses in a complete bill of materials. A controller alone is not a complete certified installation. Older Bosch download links may redirect; use the current vendor documentation portal and pin downloaded revisions at procurement.

**SAT-02:** Test local fire priority during SmartAlarm announcements, loss of adapter/network/controller, supervised circuit faults, message expiry, redundant failover, and prohibited emergency-reset requests. The integrator and site authority must accept the complete installed configuration.

## 4. DEV-03 — Compact drone and AS1

**Verified:** DJI identifies AS1 compatibility with Matrice 4 Series and supports recording, imported media, TTS and live broadcasting. Its FAQ currently lists Mandarin and English for AS1 TTS and lists aircraft SDK support. These statements do not establish a supported SmartAlarm API for each AS1 action. [Official Matrice 4 support](https://www.dji.com/support/product/matrice-4-series).

**Proposed integration:** SmartAlarm prepares an approved mission and audio asset; the pilot uses DJI's supported operator workflow, then records the operational result. Treat SDK-based speaker start/stop/upload/status and live-audio injection as **UNKNOWN pending exact model/firmware documentation and demonstration**. Do not reuse a generic PSDK or Dock speaker command solely because its name resembles the required operation.

**RFI / limits:** Obtain an AS1-specific SDK capability matrix, SDK licensing/access conditions, supported firmware, stream/codec/file limits, cancellation behavior and feedback states. For Vietnamese/Japanese, validate approved imported recordings; do not claim native TTS support. Confirm payload-dependent flight endurance, legal operating conditions, maintenance and operator training.

**SAT-03:** Demonstrate correct-language playback, intelligibility under rotor noise, operator abort, lost radio link, depleted battery, duplicated mission requests and stale queued content. Verify no automatic takeoff follows an alert. Demonstrate manual fallback if integration is unavailable.

## 5. DEV-04 — Matrice 400 and Zenmuse V1

**Verified:** DJI documents V1 compatibility with Matrice 400, live broadcasting through Pilot 2 and an MSDK integration route. [Official V1 product](https://enterprise.dji.com/zenmuse-v1). Its PSDK documentation explicitly describes controlling the V1 on Matrice 400 through widget values. [PSDK custom-widget interface](https://developer.dji.com/doc/payload-sdk-tutorial/en/function-overview/basic-function/custom-widget.html). V1 support lists Japanese among Matrice 400 TTS languages, but not Vietnamese. [Official V1 support](https://www.dji.com/support/product/zenmuse-v1).

**Proposed integration:** A version-pinned mobile or onboard adapter translates approved voice commands into only the documented supported SDK operations. Separate mission/flight authorization from payload playback authorization. SDK availability does not establish parity with all Pilot 2 or FlightHub 2 functions, and does not prove unrestricted cloud-to-speaker live streaming.

**RFI / limits:** Require exact SDK versions, keys/activation, compatible host hardware, widget definitions, command/status schema, media transport, permissions and callback semantics. Confirm any FlightHub 2 subscriptions separately if that route is selected. Test approved Vietnamese recordings; confirm Japanese pronunciation and firmware-specific TTS. Request a complete airframe/payload/mount/controller/battery bill of materials.

**SAT-04:** On the purchased combination, exercise upload/play/stop/repeat/volume and reported state only where officially exposed. Test concurrent operators, cancellation, link loss and pilot takeover. A callback success must not be shown as “people heard”. Conduct a permitted outdoor exercise before operational use.

## 6. DEV-05 — Physical firefighting and casualty rescue robot

**Verified:** Colossus is remotely controlled and offers water/foam, thermal/video and stretcher configurations. The current page advertises flow up to 3,000 L/min; actual suppression requires the appropriate water supply and equipment. The page does not establish a public third-party control API. [Official Colossus](https://www.shark-robotics.com/colossus-firefighting-robot/).

**Proposed integration:** SmartAlarm dispatches a robot mission to a trained team, tracks operator acceptance and evidence, and imports video/telemetry only through a vendor-supported interface after verification. Keep driving, monitor aiming, water discharge and casualty movement under the qualified operator's control. **API, ROS, MQTT, ONVIF, remote E-stop and autonomous navigation compatibility are UNKNOWN unless the supplier publishes or supplies applicable documentation.** No protocol is inferred from a camera or radio being present.

**RFI / limits:** Request exact robot generation, module SKUs, supplied console, API/SDK availability and commercial terms, video export, telemetry, loss-link behavior, independent emergency stop, safety interlocks, heat-exposure limits, hose pressure/flow requirements, foam compatibility, transport and maintenance. Confirm payload/stretcher constraints and patient-handling procedure. Reconcile differing module counts and slope figures on vendor materials before contracting; this catalog makes no operational commitment from those figures.

**SAT-05:** With the fire/rescue authority, test access width, floor loading, ramps/debris, hose drag, water-supply failure, nozzle reaction, loss link, stop distance, thermal limits and battery reserve. Perform casualty loading/transport using a training manikin and approved crew procedure. Confirm that SmartAlarm duplicates or outages cannot initiate movement or discharge.

## 7. DEV-06 — Thermal IoT sensor

**Verified:** The official Axxx table lists MQTT, Modbus TCP and REST alarm/readout paths for the A700 Smart Sensor family. A500 rows differ, so A500 must not be substituted based on the family name. [Official product/configuration table](https://www.flir.com/en-eu/products/axxx-series-smart-sensor/). FLIR lists optional Advanced Smart Sensor configuration and separately purchased Wi-Fi/visual-camera options. [Official configuration support](https://flir.custhelp.com/app/answers/detail/a_id/6493/~/flir---a50%252F-a70-%2526-a400%252F-a500%252F-a700--series---smart-sensor).

**Proposed integration:** Start read-only: edge gateway reads ROI temperatures/alarms and emits source-bound observations with device time, receipt time, calibration/configuration version and quality. A threshold event is evidence requiring the relevant alarm policy, not automatic proof of a confirmed fire or authority to release suppression.

**RFI / limits:** Require exact A700 SKU, Smart Sensor edition, lens, firmware and the relevant MQTT payload schema, Modbus register map and REST manual. Confirm authentication/TLS availability per selected interface; do not assume Modbus is encrypted. Confirm ROI/analysis limits, calibration, environmental enclosure and optional licenses. Source values are not site accuracy guarantees.

**SAT-06:** Use a controlled reference target; test emissivity/reflection effects, occlusion, dirty optics, temperature threshold/hysteresis, timestamp drift, network interruption, duplicate/replayed observations and faulty-sensor states. Verify degraded sensor data cannot silently become a clear/no-hazard assertion.

## 8. Cross-device procurement and release gate

For each purchased configuration, record model/serial, firmware, licenses, interface revision, credential owner, network zone, allowed commands, approval role, local override, expiry, receipt semantics, maintenance owner and support end date. Attach vendor evidence and bench/SAT results. No candidate is “production integrated” until these records and negative tests pass.

Physical action follows **approved incident task → qualified operator/authority → device interlocks → execution evidence → reconciliation**. SmartAlarm coordinates the response; the certified fire system, pilot and rescue operator retain their respective local control responsibilities. An API success, a hot pixel, a location estimate or an AI recommendation must never independently establish that a person is safe or that a rescue action succeeded.


## UX2-PHYSICAL · Visual supervision and physical feedback

The v2 console uses a pipe/valve/pump mimic, zone coverage and explicit device state. A requested command, gateway acknowledgement and observed physical effect are separate states. Unknown or stale feedback must use a labeled pattern and timestamp, never a green success state. Review-only actions in the prototype do not operate equipment. Local fire protection authority, interlocks and commissioning requirements in this document remain binding.

Verify F08–F20 with communication loss, conflicting local state and delayed feedback. Operator access to the schematic must not bypass command authorization. PA playback feedback is not proof of audibility to every occupant. Drone/robot task acceptance is not proof of arrival or rescue.

See [UI/UX design](UIUX-Design.html), [screen specifications](Screen-Specifications.html) and [redesign audit](UX-Redesign-Audit.html).


<!-- BMS-INTEGRATED-3.0-BEGIN -->
## 9. Rescue equipment through BMS — information routing and ownership

Equipment may be visible through a direct PA API, BMS mirror, drone gateway or vendor console. EquipmentRegistry retains one equipment identity with multiple source endpoints, each with separate capability evidence. A BMS mirror of speakers, robots or water monitors cannot inherit direct-connector command authority. Actual/exercise mode propagates end-to-end; exercise data cannot create real equipment tasks.

| Equipment | BMS data role | Required integration | Acceptance |
|---|---|---|---|
| Emergency PA | Ready/fault, zone, emergency priority and available playback reports | Map site groups; the direct PA adapter owns sessions; BMS provides qualified triggers/evidence | Echo/replay cannot rebroadcast; local override wins; playback does not prove audibility |
| Ordinary IP speaker | Model-dependent connectivity/playback | Classify separately from life-safety PA; do not replace supervised power/wiring design | Power loss/offline is unknown/unavailable, never evidence of PA certification |
| Drone | Alarm/site coordinates/zone and task context | BMS does not fly drones; route tasks through the drone gateway and pilot authority with geofence/no-fly/permits | Accepted is not arrived; BMS loss does not change drone lost-link behavior |
| Robot / water monitor | Access constraints, water-supply observations and target zone | Commands use qualified interfaces or operator tasks at vendor consoles; separate readback | BMS pump-run does not establish water at the robot; telemetry cannot trigger arbitrary suppression |
| IoT / wearable | Point observations and aggregate presence | Normalize source time/quality/provenance; avoid direct-plus-mirror double counts | Occupancy/wearable silence does not establish personal safety |

**Coordination runbook.** BMS alarms first enter incident/correlation processing, then capability-based task/team selection. Task context includes location uncertainty, related equipment/cause-and-effect and source age. Responders confirm local access and observed state before effects. Handover preserves task owner/time/evidence and cannot complete automatically on BMS alarm clear. Test with FR-BMS-13/19/20/21/25/27 and WF-33/35/36; signed site permits remain deployment prerequisites.
<!-- BMS-INTEGRATED-3.0-END -->

