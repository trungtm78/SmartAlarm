# SmartAlarm — Functional Requirements Document

![SmartAlarm — sơ đồ giải thích](assets/03-Proactive-Rescue.svg)


Version 3.0 · 24/10/2026 · Thiết kế đề xuất. Các ID WF là yêu cầu xuyên màn hình; FR-<screen ID> là đặc tả giao diện chi tiết trong Screen-Specifications.md. Cả hai tạo thành FRD đầy đủ của baseline.

Revision 3.0 là baseline thiết kế đầy đủ, không phải sản phẩm đã triển khai/chứng nhận. WF-01–WF-20 bên dưới, phụ lục bắt buộc WF-21–WF-27 workflow vật lý WF-28–WF-33 và BMS WF-34–WF-37 tạo thành 37 workflow. Danh mục có 241 màn, gồm F01–F20. Tích hợp vật lý phải dùng bằng chứng theo cấu hình từ [Danh mục thiết bị vật lý](Physical-Device-Catalog.md); yêu cầu chức năng bên dưới không khẳng định capability hãng chưa hỗ trợ.

## 1. Thuật ngữ và mô hình trạng thái

**Signal/Event:** quan sát từ nguồn, immutable; có observed_at và received_at. **Incident:** hồ sơ vận hành tập hợp bằng chứng, có severity và owner. **SOS:** yêu cầu trợ giúp theo người/nhóm, có trạng thái riêng và có thể liên kết incident. **Warning:** thông điệp phát hành theo version và audience. **Delivery:** một lần gửi qua một kênh. **Task:** nhiệm vụ của đơn vị. **Personal status:** lời khai/trạng thái có nguồn, không phải suy luận an toàn tuyệt đối. **Command:** lệnh đến thiết bị, tách khỏi event.

| Object | Trạng thái hợp lệ | Điều kiện chuyển / actor |
|---|---|---|
| Signal | received → validated → correlated / quarantined / rejected | Gateway xác thực schema/source/tenant; invalid không vào live workflow |
| Incident | new → triaging → active → contained → resolved → closed | Operator triage; supervisor đóng khi checklist hoàn tất; có reopen với reason |
| Incident exception | new/triaging → dismissed; bất kỳ incident chưa closed → linked | Dismiss phải có reason; linking không xóa ID hoặc evidence |
| SOS | submitted → acknowledged → assigned → assisting → resolved | Server receipt khác operator ACK; responder chỉ cập nhật task được giao |
| SOS cancel | submitted/acknowledged/assigned → cancellation_requested → canceled hoặc tiếp tục | Sau dispatch cần operator quyết định; citizen không xóa hồ sơ |
| Person status | unknown, in_danger, help_requested, self_reported_safe, responder_confirmed_assisted | Append observation với timestamp/source; có thể đổi lại danger; safe không đóng incident |
| Warning | draft → review → approved → sending → active → expired / canceled | Version mới cần duyệt lại; tác giả không duyệt chính mình khi policy yêu cầu |
| Task | offered → accepted → en_route → on_scene → completed | Hết hạn offer → expired → reassign; decline có reason; task có một owner hiện hành |
| Command | requested → approved → dispatched → accepted → executing → succeeded / failed / unknown / expired | Device acceptance không đủ chứng minh success; timeout không tự coi failed vật lý |

**Tài sản vật lý:** controller, bơm, van, hệ xả hoặc thiết bị cứu hộ đang lắp, ràng buộc cấu hình. **Capability:** quyền quan sát/điều khiển được duyệt riêng cho thao tác chính xác. **Phản hồi vật lý:** bằng chứng quan sát, khác acknowledgment truyền tải/thiết bị. **Impairment:** giảm bảo vệ có thẩm quyền, cần biện pháp bù và khôi phục xác minh. **Mission:** vận hành thiết bị có giám sát, quyền tại chỗ và bàn giao. Nhãn UI UNKNOWN ánh xạ trạng thái máy `unknown` hiện có, không phải trạng thái kết thúc thành công/thất bại mới. Vòng đời impairment: requested → approved → active → restoration_pending → verified_closed; hết hạn chưa khôi phục giữ restoration_pending và escalation. Vòng đời mission: draft → review → approved → locally_accepted → executing → completed / aborted / unknown; hoàn tất cần bằng chứng kết quả.

## 2. Phân quyền và kiểm soát chung

Mọi endpoint kiểm tra principal, tenant membership, region, site scope, object ownership và action permission ở server. Frontend ẩn nút không phải kiểm soát bảo mật. Người thân chỉ thấy trường được chia sẻ; operator xem thông tin phục vụ incident; platform admin không mặc nhiên đọc data. Warning approver và command approver có quyền riêng. Break-glass yêu cầu lý do, thời hạn, audit và thông báo người giám sát; không bỏ tenant boundary. Từ chối truy cập object ngoài scope trả 404 hoặc lỗi không tiết lộ tồn tại.

Danh sách phân trang cursor, sort ổn định (created_at,id), tối đa 100 bản ghi/trang. Tất cả mutation có validation, idempotency khi tạo tác động và optimistic concurrency khi cập nhật. Các màn list có search/filter theo trường phù hợp, trạng thái loading/empty/error/denied; form có required/invalid/conflict/unsaved; detail có stale/not-found. Dữ liệu prototype không phải telemetry thật.

Điều khiển vật lý kiểm tra thêm capability site/controller, quyền hãng, policy truy cập OT, impairment/lockout hiện tại, thẩm quyền tại chỗ và phê duyệt theo thao tác. UI phân biệt chỉ giám sát, đủ điều kiện điều khiển, bị khóa, cũ và UNKNOWN. Quyền kỹ thuật không mặc nhiên là quyền chỉ huy sự cố. Phân đoạn OT khỏi mạng công cộng; allowlist endpoint/thao tác hỗ trợ, kiểm soát truy cập bảo trì, giữ audit credential/thay đổi. Phát hiện, khởi động bơm và bảo vệ xả tự động cục bộ không phụ thuộc duyệt/kết nối cloud.

## 3. Yêu cầu chức năng xuyên suốt

### WF-01 — Onboarding và định danh (BR-06)
Actor admin tạo tenant với immutable home_region; chọn locale/timezone, thiết lập SSO/MFA, mời membership theo site. User chọn workspace trước khi vào console. Email chưa tồn tại và tồn tại trả cùng thông điệp recovery để giảm enumeration. Invite dùng một lần, TTL, đúng email/domain policy. SSO không khả dụng có break-glass account được kiểm soát ở tenant phù hợp; không tự bypass MFA.

**AC:** invite hết hạn bị từ chối; role đã revoke không được dùng token cũ sau hạn revocation propagation 60 s đề xuất; switch workspace không hiển thị cache tenant cũ. Màn A01–A10, T02–T04.

### WF-02 — Đăng ký vị trí và bản đồ (BR-01)
Site admin tạo graph country/region/site/building/floor/zone/road-segment/geofence. Không bắt buộc mọi site có tầng. Device binding kiểm tra thuộc cùng tenant. Floor plan có revision, scale, exits, accessibility và người duyệt. Mỗi incident lưu plan revision đã sử dụng. Vị trí mang method, accuracy, age; GPS không tự suy ra tầng. Không có định vị thì user nhập vị trí thủ công và gửi SOS.

**AC:** không publish plan thiếu reviewer; zone có incident active không hard-delete; route thiếu freshness hiện “not verified”, không hiển thị là tuyến chắc chắn an toàn. Màn S01–S05, C03, C06.

### WF-03 — Tiếp nhận event đa nguồn (BR-01,05)
Adapter kiểm tra credential, tenant binding, schema, clock skew, payload limit rồi ghi event bền vững trước receipt. Duplicate key (tenant,source,event_id) trả receipt cũ. Event trễ vẫn lưu để audit nhưng rule live xét TTL theo hazard. Unknown source/quyền/unit/location bị quarantine. Input hỗ trợ HTTPS/CloudEvents, MQTT adapter, CAP, camera metadata, wearable, telematics và manual.

**AC:** replay 100 lần cùng ID tạo một event; hai tenant cùng event ID không collision; source có tenant spoof bị chặn; event stale không khởi động command. Màn O03,O05,I01–I06.

### WF-04 — Xác minh và tương quan (BR-01,02)
Rule versioned cung cấp candidate incident theo khoảng thời gian, zone, hazard và source. Operator xem evidence và confidence, tạo hoặc liên kết; split giữ audit và liên kết nguồn. Không gom khác hazard chỉ vì gần nhau; cross-hazard relationship có type (caused_by/nearby/possible_duplicate). Camera detection được gọi “possible fire”; fire panel policy có thể lập tức mở response theo site-approved workflow, không phải đợi AI.

**AC:** merge không mất SOS/task; split không nhân dispatch; rule thay đổi không sửa lịch sử; có reason khi dismiss. Màn O03–O07,S11–S14.

### WF-05 — SOS đa nghĩa (BR-03)
User chọn category hoặc Other/Unknown; nhập/cập nhật vị trí, ghi chú và số người. Emergency flow không buộc điền hết profile. Server trả SOS ID và received_at sau commit. Client hiển thị pending khi chỉ lưu local. Lệnh gửi lại dùng client_request_id, TTL và trạng thái đã reconcile. Với threat/discreet, mặc định không âm thanh và không fan-out nhóm; với hỗ trợ thông thường severity theo rule, không coi mọi SOS là P1.

**AC:** mất mạng không hiện “đã nhận”; gửi lại không tạo SOS thứ hai; người không cấp GPS vẫn gửi vị trí bằng tay; đổi category không mất ID. Màn C05–C10,C26–C27,X01–X02.

### WF-06 — Phát hiện té ngã và check-in (BR-03)
Detector được phê duyệt phát possible_fall; app hiện check-in 30 s đề xuất, có “I'm OK” và “Get help now”. Nếu không có phản hồi, server timer tiếp tục kể cả app bị đóng; tạo yêu cầu operator/caregiver theo consent. Thiết bị offline tạo trạng thái unknown, không kết luận người đã té. Thời gian check-in được cấu hình theo dịch vụ/nhóm, có accessibility alternative; không tự dùng làm chẩn đoán.

**AC:** app bị kill vẫn escalation; late “I'm OK” cập nhật chứ không rút task đang xử lý âm thầm; false positive lưu review reason. Màn C24–C25,T07–T08.

### WF-07 — Road incident (BR-03)
Report/telematics cung cấp position, heading nếu có, road segment, vehicle count và injuries=unknown. Correlation phân biệt hai chiều đường hoặc tầng cầu. User có thể gửi nhanh tối thiểu, bổ sung sau. Điều phối tới đơn vị được cấu hình; chưa có hợp đồng không tự gọi emergency public endpoint.

**AC:** thiếu injury data được chấp nhận dưới dạng unknown; không auto-confirm collision từ một mẫu gia tốc; dữ liệu nhạy cảm chỉ vào assigned team. Màn C26,O04,O08.

### WF-08 — Disaster và CAP (BR-01,06)
Connector allowlist issuer, kiểm tra XML/schema, identifiers, sent, status, scope, info/area và expiry. Dedupe sender+identifier; Update/Cancel tham chiếu bản trước và phải giữ lineage. Official warning và local response là hai object. Warning hết hạn không tiếp tục live broadcast; cancel không xóa bản đã gửi. Polygon dùng đúng thứ tự tọa độ của CAP, chuyển explicit sang GeoJSON; không đảo lat/lon ngầm.

**AC:** Test/Exercise không vào luồng Actual; issuer không cho phép bị quarantine; Update thay active version nhưng lưu trước; user ngoài polygon không bị chọn do lỗi tọa độ. Màn O28–O29,C14–C17.

### WF-09 — Warning và audience (BR-02,06)
Author chọn incident, vùng/site/group, severity, ngôn ngữ, nội dung và expiry. Preview audience là snapshot gồm recipients đủ điều kiện và lý do loại trừ; approver độc lập ký version. Thay nội dung/audience sau approval bắt buộc duyệt lại. Break-glass phát nhanh chỉ theo quyền đặc biệt và audit; không yêu cầu mọi P1 phải chờ duyệt nếu site playbook cho phép template preapproved. Translation máy chỉ draft, nội dung an toàn phải reviewed.

**AC:** approve v3 không cho send v4; gửi nhầm tenant bằng audience ID bị chặn; scheduled warning tái kiểm tra expiry và permission lúc phát. Màn O13–O15,T06.

### WF-10 — Delivery và escalation (BR-02,04)
Notification tạo từng delivery attempt theo recipient/channel/version; trạng thái queued/submitted/provider_accepted/delivered/read/human_ack/failed/unknown không bị gộp. Provider callback xác thực và chống replay. Deadline không ACK kích hoạt escalation bền vững, có owner và max steps. Channel fallback không tự gửi nội dung riêng tư qua SMS; template SMS tối thiểu, link xác thực khi cần. Push không bảo đảm vượt chế độ im lặng của hệ điều hành.

**AC:** provider accepted không tăng human ACK count; callback trùng không nhân escalation; provider lỗi có retry bounded và alternate provider, 429 tôn trọng retry_after. Màn O16–O17,T05.

### WF-11 — Dispatch và phản ứng (BR-02)
Dispatcher lọc unit theo capability, availability, site authorization và vị trí mới nhất. ETA chỉ là ước tính có timestamp. Offer có deadline; unit accept atomically bằng version. Không ai nhận thì escalate; không tự đánh dấu dispatched hoàn thành. Responder chuyển en_route/on_scene, ghi observations, handover, task complete; task completion không đóng incident.

**AC:** hai dispatcher không gán hai owner cho một task; offline acceptance chưa server confirm phải ghi pending; reassignment giữ note của responder cũ dưới observation. Màn O08–O10,R01–R12.

### WF-12 — Personal safety và nhóm (BR-03)
Safety report lưu status, person, incident scope, observed_at, reporter và location precision. Fan-out đến tất cả nhóm đăng ký đủ điều kiện tại thời điểm báo, cộng contacts đã xác minh; mỗi recipient được dedupe. Mỗi nhóm nhận status, vị trí chi tiết chỉ khi consent cụ thể. Revoked membership/consent được kiểm tra lại trước delivery. Group chat có membership, report abuse, block cá nhân cho social; block không được tắt mandatory site warning theo policy đã công bố.

**AC:** 3 nhóm cùng một contact không gửi 3 SMS giống nhau; consent location off không rò tọa độ; safe report không đóng building incident; unknown không đếm safe. Màn C11–C23,O11–O12.

### WF-13 — Shelter và guidance (BR-03,04)
Operator duy trì shelter status, capacity estimate, timestamp, accessibility và valid_until. Offline pack lưu plan/guidance/contact có version và expiry, không đảm bảo live route. Voice dùng cùng approved text với transcript, có pause/replay; không autoplay gây lộ discreet mode. Không có route verified thì chỉ trình bày plan và hướng dẫn được phê duyệt, không tự vẽ tuyến tối ưu tránh cháy.

**AC:** shelter hết valid_until thành unknown; capacity không có dữ liệu không hiện 0; offline plan hiển thị age. Màn C03–C04,C16–C18,O26–O27.

### WF-14 — Thiết bị và bảo trì (BR-01,04)
Enrollment token một lần; device certificate có rotate/revoke. Heartbeat thresholds theo device class; stale/disconnected khác trạng thái an toàn của khu vực. Maintenance suppression có start/end, reason, approver và coverage thay thế; luôn hiển thị khoảng mù. Hết maintenance tự phục hồi monitoring và log.

**AC:** cert revoked không ingest; hết maintenance không tiếp tục suppress; firmware upgrade không tự động đồng loạt trong active incident. Màn S06–S10.

Bảo trì vật lý áp dụng thêm WF-31: hết cửa sổ suppress phần mềm không chứng minh bảo vệ vật lý đã khôi phục; vẫn bắt buộc kiểm tra tại chỗ và acknowledgment cần thiết.

### WF-15 — Physical command (BR-05)
Command chỉ cho capability đã khai báo; parameter schema, zone, expiry, interlock, authorized approver và local controller policy đều bắt buộc. Không gửi raw arbitrary command từ web. Gateway receipt, device accepted, executing và verified result riêng. Timeout unknown không blind retry lệnh không idempotent. Actuation cloud không thay vòng bảo vệ cục bộ được chứng nhận. Sprinkler đầu kín thường hoạt động nhiệt; prototype không giả định phần mềm mở từng đầu phun.

**AC:** command hết TTL không execute sau reconnect; zone mismatch reject; accepted mà không feedback giữ unknown/awaiting confirmation; simulator không có credential live. Màn O18–O19.

WF-30 chi tiết hóa workflow lệnh này cho thiết bị chữa cháy/cứu hộ đang lắp. Giám sát wet-pipe, yêu cầu tủ xả, yêu cầu bơm và tác động thiết bị di động là capability riêng; dùng ràng buộc WF-28 và nghiệm thu WF-32 trước khi bật điều khiển.

### WF-16 — Drone (BR-05)
Fleet adapter trước hết cung cấp telemetry/media và health. Mission draft có purpose, incident, route/geofence, altitude reference, pilot, clearance, weather check và lost-link policy. Local pilot quyết định triển khai theo năng lực hệ thống được tích hợp. Approval không đồng nghĩa đã cất cánh. Không tự động phát TAKEOFF dựa trên AI detector. Lệnh abort/return phải có capability và xác nhận của flight stack; UI không hứa cancel phổ quát.

**AC:** thiếu pilot/clearance không approve; stale telemetry vô hiệu command phụ thuộc vị trí; mất link hiện unknown và local policy tiếp tục; mission evidence có hash/provenance. Màn I11–I15.

### WF-17 — Connector lifecycle (BR-05)
Install manifest → configure secret reference → map → sandbox test → approve → activate → monitor → rotate/deprecate. Connector chạy quyền tối thiểu, allowlist outbound, quota/backpressure và kill switch. Replay DLQ cần reason, schema đúng và giữ original ID; replay command bị chặn mặc định. Cross-tenant exchange chỉ qua agreement và payload allowlist.

**AC:** adapter lỗi không ngăn SOS trực tiếp; payload quá lớn reject 413; incompatible major schema quarantine; secret không lộ trong logs/export. Màn I01–I10.

### WF-18 — Quốc tế và dữ liệu (BR-06)
UTC cho lưu trữ, IANA timezone cho hiển thị/lịch, BCP47 locale, Unicode, E.164 cho số điện thoại theo quốc gia. UI có RTL layout test, pluralization và pseudo-localization. Không hardcode số emergency toàn cầu; emergency contact registry được xác minh theo quốc gia/site. Residency áp dụng DB, object store, backup, logs, support và export; global routing không mang raw SOS.

**AC:** lịch qua DST không gửi hai lần nhờ schedule occurrence ID; locale dài không che CTA; changing region là migration có review, không chỉ sửa dropdown. Màn A01,A10,T02,T06.

### WF-19 — Retention, audit và privacy (BR-06,07)
Data class có retention policy, legal hold và delete job có report. Export/deletion phải xác minh requester, scope và ngoại lệ; không xóa evidence có hold. Audit append-only với actor, action, object/version, reason, time, correlation, before/after digest. Không nhúng token, raw secret hoặc toàn bộ medical note vào audit.

**AC:** truy cập precise location được log; delete không xóa record held; export không chứa tenant khác; break-glass hết TTL tự revoke. Màn C29–C30,T09–T11.

### WF-20 — Closure, analytics, exercise và handover (BR-07)
Closure cần open SOS/task check, unknown-person disposition, partner handover, reason và supervisor. “All clear” warning là hành động riêng. Drill có environment+mode isolation ở broker, credentials và recipient directory; banner alone không đủ. Báo cáo tách transport latency, operator latency và response latency; mẫu thiếu dữ liệu ghi denominator rõ.

**AC:** safety check-in không close; drill không gọi live webhook/actuator; shift handover có incoming acknowledgment; report chỉ deidentified nếu user không có quyền PII. Màn O20–O25,T16–T17.

### WF-28 — Onboard vật lý và mapping điểm/zone (BR-13,15)
Ràng buộc model khu vực đang lắp, serial, firmware, gateway, license, quyền hãng và hồ sơ tương thích trước khi bật adapter. Nhập và review độc lập địa chỉ điểm, trạng thái ngữ nghĩa, đơn vị/scaling, site/zone và revision cause-and-effect. Phân biệt tài sản wet-pipe, pre-action/deluge, bơm và cứu hộ di động. Capability chưa biết mặc định chỉ giám sát; onboarding không tạo quyền điều khiển.

**FR-PHY-01:** giữ định danh thiết bị/giao diện chính xác và revision bằng chứng được duyệt. **FR-PHY-02:** xác thực mapping điểm/zone với nhãn vật lý, từ chối khác tenant, trùng hoặc chưa giải quyết. **FR-PHY-03:** version cause-and-effect và hợp đồng capability đọc/điều khiển; thay đổi phải review tác động và nghiệm thu lại phần ảnh hưởng.

**AC:** thay firmware/license chưa ràng buộc đình chỉ điều khiển phụ thuộc; mapping sai zone không được bật; đầu wet-pipe không được đưa ra như output điều khiển riêng. Màn F02–F06,F20.

### WF-29 — Telemetry vật lý và giám sát (BR-01,13)
Nhận trạng thái tủ, bơm, van, xả, waterflow, nguồn và link được hãng hỗ trợ, có provenance/chất lượng. Giữ ưu tiên cảnh báo controller và bảo vệ cục bộ khi cloud/edge không hoạt động. Tách nhu cầu, motor chạy, output xả, vị trí van, waterflow và quan sát hiện trường đã xác nhận. Giá trị thiếu/cũ giữ unknown; không biến lỗi link thành chỉ thị an toàn.

**FR-PHY-04:** lưu thời gian nguồn/nhận, địa chỉ nguồn, đơn vị, chất lượng, revision mapping và tham chiếu bằng chứng gốc cho mỗi quan sát. **FR-PHY-05:** giám sát freshness/sức khỏe link bằng ngưỡng thiết bị/site được duyệt, hiển thị khoảng trống bảo vệ và biện pháp bù. **FR-PHY-06:** tương quan không ngăn bảo vệ cục bộ; dedupe replay truyền tải nhưng giữ chuyển trạng thái và bằng chứng phục hồi.

**AC:** dữ liệu bơm chạy cũ hiện chưa chắc chắn; áp suất riêng lẻ không xác nhận xả; mất cloud vẫn có bảo vệ tự động tại chỗ; telemetry trùng không tạo incident trùng. Màn F01,F07–F08.

### WF-30 — Tác động có thẩm quyền, phản hồi và đối soát UNKNOWN (BR-14)
Chỉ thao tác đã nghiệm thu site, được xác định rõ có quyền điều khiển mới tạo yêu cầu vật lý. Kiểm tra thẩm quyền actor, incident/site/zone, giới hạn tham số được duyệt, mức sẵn sàng vật lý hiện tại, interlock cục bộ, expiry lệnh và yêu cầu phê duyệt độc lập theo policy. Thẩm quyền site/controller ưu tiên. Không giả định ghi BACnet/Modbus, relay hay ACK mạng cấp quyền hoặc chứng minh chữa cháy. AI không tự khởi tạo tác động xả/khởi động/chuyển động.

**FR-PHY-07:** từ chối thao tác chỉ giám sát hoặc thiếu tài liệu ở server và edge; giữ yêu cầu đã duyệt và version policy lệnh. **FR-PHY-08:** thực thi TTL, request ID duy nhất, chống tác động trùng và truyền có giới hạn; không replay yêu cầu hết hạn sau reconnect hoặc blind retry thao tác không idempotent. **FR-PHY-09:** tách receipt truyền tải, thiết bị chấp nhận, thực thi và phản hồi vật lý; chỉ đánh giá thành công theo bằng chứng được duyệt riêng cho thao tác. **FR-PHY-10:** hiện UNKNOWN khi kết quả thiếu/mâu thuẫn; giao đối soát cho người có tên, hỗ trợ ưu tiên cục bộ và bàn giao thủ công có acknowledgment, không xóa lịch sử.

**AC:** ACK thiếu phản hồi bắt buộc không thành succeeded; yêu cầu trùng/hết hạn không tạo tác động mới; mất phản hồi mở đối soát; local override chặn điều khiển từ xa xung đột. Màn F09–F13; WF-15 vẫn áp dụng.

### WF-31 — Impairment, thử và khôi phục (BR-13,15)
Impairment được phép xác định thiết bị, zone ảnh hưởng, cửa sổ thời gian, lý do, chủ sở hữu, bảo vệ bù và bố trí test/lockout tại chỗ. Tách credential, route và output test/production; banner UI không đủ. Hết hạn yêu cầu xác minh khôi phục và escalation, không tự tuyên bố bảo vệ đã trở lại. Trách nhiệm an toàn tại chỗ luôn rõ khi bàn giao ca.

**FR-PHY-11:** yêu cầu impairment được duyệt và bằng chứng cách ly/lockout vật lý trước thử liên quan; chặn lệnh production không được phép, giữ bố trí bảo vệ cục bộ đã thỏa thuận. **FR-PHY-12:** chỉ đóng impairment sau kiểm tra trạng thái vật lý, bằng chứng khôi phục và xác nhận người chịu trách nhiệm; theo dõi khôi phục quá hạn/khoảng trống còn lại.

**AC:** thử mô phỏng không tới output thật; hết hạn chưa xác minh vẫn impaired/awaiting restoration; bàn giao bảo trì có người nhận trách nhiệm. Màn F14,F18.

### WF-32 — FAT/SAT và bằng chứng tương thích (BR-15)
Duy trì hồ sơ theo cấu hình gồm tài liệu hãng, quyền giao diện, listing/giới hạn khu vực, point map, phụ thuộc điện/thủy lực, cause-and-effect được duyệt, FAT, SAT, commissioning, hiệu chuẩn và đào tạo. Nghiên cứu hãng/kết quả simulator không phải nghiệm thu hiện trường. Không suy chứng nhận toàn hệ từ listing thành phần.

**FR-PHY-13:** theo dõi revision tài liệu, provenance, reviewer, expiry khi áp dụng và phạm vi nghiệm thu theo model/firmware/site/capability. **FR-PHY-14:** chặn bật capability production tới khi có kiểm thử/phê duyệt bắt buộc ký duyệt; thay thiết bị, firmware, mapping hoặc policy kích hoạt đánh giá tác động, làm mất hiệu lực nghiệm thu phần ảnh hưởng tới khi kiểm chứng lại.

**AC:** thiếu SAT chặn điều khiển production dù simulator PASS; chứng nhận site khác không vượt cổng; firmware thay đổi chỉ giữ capability đọc không ảnh hưởng nếu hợp đồng còn hợp lệ. Màn F15–F17.

### WF-33 — Nhiệm vụ robot cứu hộ và water-monitor (BR-16)
Nhiệm vụ ràng buộc giao diện robot/water-monitor được hỗ trợ thực tế, mục đích, incident, người điều khiển đủ năng lực, vùng vận hành, tuyến/vùng cấm, nguồn nước/năng lượng, freshness telemetry và policy mất link/khẩn cấp cục bộ. Thiết bị chỉ quan sát vẫn chỉ quan sát. Phê duyệt không phải đã chuyển động/xả. Người tại chỗ quyết định triển khai và tiếp quản theo thiết kế được hãng hỗ trợ; không hứa chức năng stop/return phổ quát.

**FR-PHY-15:** yêu cầu thẩm quyền theo nhiệm vụ, bằng chứng capability, giới hạn vận hành và kiểm tra sẵn sàng; tách quyền chuyển động, ngắm và xả nước. **FR-PHY-16:** ghi telemetry/phản hồi tác động, thực thi hành vi mất link đã duyệt tại chỗ, có bàn giao thủ công được xác nhận và bằng chứng kết quả; không suy hoàn tất cứu hộ từ lệnh được nhận.

**AC:** thiếu điều khiển được hãng hỗ trợ hoặc người điều khiển chặn phát tác động vật lý; vị trí cũ chặn ngắm/chuyển động phụ thuộc; mất link hiện UNKNOWN và policy cục bộ đã duyệt; bàn giao giữ trách nhiệm/bằng chứng. Màn F19, dùng F11–F13 cho thực thi/đối soát.



<!-- BMS-INTEGRATED-3.0-BEGIN -->
## 3A. Tích hợp BMS hiện hữu — hợp đồng triển khai

Phần này là yêu cầu chính thức của baseline thiết kế 3.0, thay cho việc chỉ tham chiếu phụ lục nghiên cứu. Giữ nguyên WF-01–33, FR-PHY và các FR màn hình; thêm WF-34–37 và FR-BMS-01–40. Đây là đặc tả để phát triển và nghiệm thu, chưa phải bằng chứng phần mềm đã triển khai.

### WF-34 — BMS onboarding → discovery/import → mapping → qualification (BR-17,18)

Màn hình: BMS01, BMS02, BMS05, I01–I04, F03–F05, F15–F17. Yêu cầu FR-BMS liên quan: 01–10, 31–32, 35–36, 39.

### WF-35 — BMS alarm → native lifecycle → correlation → rescue → reconciliation (BR-17,18)

Màn hình: BMS03, BMS08, O03–O17, H08–H11, Q04–Q09. Yêu cầu FR-BMS liên quan: 11–21, 30, 33, 38.

### WF-36 — Preview → authorize → dispatch → observe → reconcile / hand over (BR-19)

Màn hình: BMS04, BMS07, F09–F13. Yêu cầu FR-BMS liên quan: 22–27.

### WF-37 — Operate → degrade/recover → upgrade → retire (BR-20)

Màn hình: BMS01, BMS05–BMS08, I05, G02–G10. Yêu cầu FR-BMS liên quan: 28–29, 31–37, 40.

**Hợp đồng chung bắt buộc.** Mọi mutation có tenant/site scope, actor, authorization result, correlation ID, request ID, expected revision và idempotency key khi có side effect. Cùng key và cùng payload trả lại kết quả trước; cùng key khác payload bị conflict. Backend xác minh quyền độc lập UI. Point identity dùng tenant/site/connection/native namespace/native ID; tên hiển thị không phải khóa. BMS observation không tự xác nhận con người an toàn. ACK BMS là capability riêng, không đóng incident SmartAlarm. Không có API raw write-any-point.

**Phân loại lỗi.** 400 schema/type/enum không hợp lệ; 403 thiếu scope/capability; 409 revision hoặc idempotency conflict; 422 mapping/điều kiện nghiệp vụ không đạt; 429 vượt budget; 503 nguồn/edge không khả dụng. Timeout có side effect không được mô tả là failed có thể retry: trả intent ID và trạng thái chưa rõ để readback. Native status phải giữ nguyên trong evidence, không thay bằng mã HTTP nội bộ.

#### FR-BMS-01 — Hồ sơ BMS theo công trình

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.connection.create |
| Đầu vào | tenant/site, product/build, profile ID, endpoint, evidence refs, secretRef |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Tạo BmsSystem ở draft; kiểm endpoint allowlist, scope tài khoản và evidence; probe chỉ đọc theo kế hoạch; lưu build/license/interface được quan sát. |
| Đầu ra và lỗi | BMSConnection qualification revision; thiếu evidence giữ unavailable, không tự nhận tương thích theo tên hãng. |
| Nghiệm thu | Thiếu build, interface hoặc evidence thì chưa kích hoạt. |
| Màn hình / liên kết | BMS01, I01–I02, F17 |

#### FR-BMS-02 — Phân quyền từng capability

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | IAM security administrator; capability-policy reviewer |
| Đầu vào | requested capabilities, role policy, vendor evidence, license, FAT/SAT refs |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Tính quyền hiệu lực bằng giao các tập implemented/vendor/licensed/authorized/tested; phân quyền read/history/ACK/command/release riêng; đánh giá lại khi revoke hoặc đổi cấu hình. |
| Đầu ra và lỗi | CapabilitySnapshot có revision và lý do denied; UI chỉ là projection, API phải từ chối thao tác ngoài tập. |
| Nghiệm thu | Read, history, ACK và command có quyền riêng ở server. |
| Màn hình / liên kết | I02, I07, F03 |

#### FR-BMS-03 — Discovery có phạm vi và budget

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.discovery.run |
| Đầu vào | connection ID, approved roots/subnets/object classes, request budget, cancel token |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Tạo discovery job, duyệt phạm vi, browse có phân trang và rate limit; không tự active scan toàn mạng; cho cancel, lưu checkpoint và partial results tách riêng. |
| Đầu ra và lỗi | DiscoveryJob complete/partial/cancelled/failed; throttle ưu tiên thấp hơn alarm intake. |
| Nghiệm thu | Chỉ quét phạm vi duyệt; hủy được; không nghẽn alarm. |
| Màn hình / liên kết | I02, S08, BMS01 |

#### FR-BMS-04 — Import point và object

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.mapping.edit |
| Đầu vào | CSV/API export, content hash, source namespace, encoding, expected revision |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Parse vào staging; kiểm duplicate native key, type, unit và thiếu trường; hiển thị lỗi từng dòng; commit nguyên revision sau xác nhận, không cập nhật live theo từng dòng. |
| Đầu ra và lỗi | ImportPreview + immutable ImportRevision; lỗi parsing không tạo point một phần. |
| Nghiệm thu | Preview lỗi từng dòng, trùng ID, encoding; commit có revision. |
| Màn hình / liên kết | F04, S06 |

#### FR-BMS-05 — Ánh xạ units và semantics

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.mapping.edit + independent qualification reviewer |
| Đầu vào | raw address/object ID, data type, scale/offset, unit, enum, endian, quality mapping |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Chạy golden fixtures cho giá trị thường, zero, missing, biên, NaN và enum lạ; round-trip kiểm đơn vị; giữ raw value; publish chỉ khi reviewer duyệt kết quả. |
| Đầu ra và lỗi | PointMapping revision + test evidence; overflow/type mismatch bị quarantine thay vì ép kiểu im lặng. |
| Nghiệm thu | Golden fixture xác nhận scale, enum, type và byte order. |
| Màn hình / liên kết | I03, F04 |

#### FR-BMS-06 — Topology thiết bị và vùng

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.mapping.edit + site engineer |
| Đầu vào | equipment ID, point ID, room, HVAC zone, fire compartment, route-edge IDs |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Tạo quan hệ có loại locatedIn/serves/observes/affects; kiểm tenant/site và dependency; cho nhiều zone với vai trò rõ; không dùng một nhãn zone thay tất cả đồ thị. |
| Đầu ra và lỗi | TopologyRevision; dangling/cross-tenant edge bị reject, chưa ánh xạ không tham gia route tự động. |
| Nghiệm thu | Không đồng nhất phòng, HVAC zone, fire compartment và route edge. |
| Màn hình / liên kết | BMS02, F05, S02–S04 |

#### FR-BMS-07 — Publish mapping có impact review

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.mapping.validate; bms.qualification.submit; separate bms.connection.activate |
| Đầu vào | candidate revision, expected current version, impact graph, fixtures, approval |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Hiển thị alarm rules, tuyến, PA zone và quyền command bị ảnh hưởng; yêu cầu If-Match; publish revision một lần; giữ rollback mapping và audit, không rollback tác động vật lý. |
| Đầu ra và lỗi | MappingPublished; conflict trả version mới và bắt review lại, không last-write-wins. |
| Nghiệm thu | Hiện dependency, duyệt revision; rollback không đảo tác động vật lý. |
| Màn hình / liên kết | BMS05, F04, F17 |

#### FR-BMS-08 — Chất lượng và độ mới dữ liệu

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | connector runtime; bms.point.read |
| Đầu vào | source value/status, source time quality, receivedAt, sequence/epoch, freshness policy |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Chuẩn hóa quality độc lập với value; tính age theo clock đủ tin cậy; lưu late observation vào lịch sử nhưng không ghi đè current projection mới hơn; phát sự kiện đổi freshness. |
| Đầu ra và lỗi | Observation + current projection; unknown/bad/stale không trở thành false/zero/normal. |
| Nghiệm thu | Zero khác missing; dữ liệu trễ không ghi đè quan sát mới. |
| Màn hình / liên kết | F01, F07, S07 |

#### FR-BMS-09 — Subscription và polling

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | connector runtime; bms.lifecycle.change |
| Đầu vào | subscription ID/lease, supported COV/SSE/events, approved poll groups/budget |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Renew trước hết lease theo contract hãng; phát hiện silent gaps; reconcile trước trở lại healthy; polling fallback chỉ dùng profile đã duyệt và cùng identity, không tự chuyển protocol. |
| Đầu ra và lỗi | SubscriptionHealth + reconciliation job; rate-limit/quota errors back off có jitter, alarm queue không bị history chiếm. |
| Nghiệm thu | Renew/reconcile khi mất COV; polling theo budget đã đo. |
| Màn hình / liên kết | I05, BMS06 |

#### FR-BMS-10 — Lịch sử và điều tra

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | qualified history reader / investigator |
| Đầu vào | point IDs, bounded UTC interval, source timezone, aggregation, cursor |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Truy vấn history theo quota; giữ raw/interpolated/aggregate và gap flags; khử duplicate theo native key; không bơm historical values vào luồng điều khiển live. |
| Đầu ra và lỗi | HistoryPage + continuation + coverage; partial/backfill gaps hiển thị, không nội suy thành bằng chứng an toàn. |
| Nghiệm thu | Giữ UTC, timezone, gaps và raw/interpolated distinction. |
| Màn hình / liên kết | F07, O21–O22 |

#### FR-BMS-11 — Vòng đời alarm nguồn

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | connector runtime; bms.alarm.read |
| Đầu vào | native alarm key, occurrence/branch, active, ACK, confirmed, retained/suppressed, quality |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Lưu native transition bất biến; giữ từng chiều trạng thái độc lập và unsupported=null; tạo projection có version; active false không tự đánh dấu ACK hay closed incident. |
| Đầu ra và lỗi | BmsAlarmProjection + alarm.transitioned; mất occurrence identity chuyển reconcile-required, không ghép theo text. |
| Nghiệm thu | Active, ACK, confirmed, suppressed là các chiều riêng; unsupported=null. |
| Màn hình / liên kết | BMS03, O03, F07 |

#### FR-BMS-12 — Mapping mức ưu tiên

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | site safety engineer + qualification reviewer |
| Đầu vào | native priority/severity range, class, source context, approved response matrix |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Map theo từng source class; test min/max và thứ tự ưu tiên; giữ native severity; đổi mapping phải impact review các escalation đang chạy. |
| Đầu ra và lỗi | SeverityMapping revision; unmapped class là needs-review với raw priority, không mặc định low. |
| Nghiệm thu | Không đảo số priority bằng quy tắc chung; test theo source. |
| Màn hình / liên kết | S11–S13, O05 |

#### FR-BMS-13 — Tương quan và lineage

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | correlation service + incident operator |
| Đầu vào | panel/native provenance, source path, occurrence, zone, timing uncertainty |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Giữ canonical observation và mọi receipt path; xác định mirror lineage trước đánh giá độ tin cậy; correlation có evidence và undo; không coi BMS mirror + direct panel là hai bằng chứng độc lập. |
| Đầu ra và lỗi | CorrelationDecision + lineage links; ambiguity giữ separate/pending, không mất alarm gốc. |
| Nghiệm thu | BMS mirror và panel trực tiếp không tính thành hai nguồn độc lập. |
| Màn hình / liên kết | O05–O07, BMS03 |

#### FR-BMS-14 — ACK BMS có kiểm soát

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.alarm.ack_native |
| Đầu vào | alarm ID, expected occurrence/version, native ACK token, actor, comment, idempotency key |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Kiểm quyền và khả năng ACK nguồn; re-read khi version thay đổi; ghi intent bền vững rồi gửi ACK đúng occurrence; chờ receipt/native state; không ACK history. |
| Đầu ra và lỗi | AcknowledgementIntent pending/confirmed/failed/unknown; timeout không tạo local confirmed, incident vẫn mở. |
| Nghiệm thu | Đúng occurrence/version; thất bại giữ trạng thái pending. |
| Màn hình / liên kết | BMS03, O03, F07 |

#### FR-BMS-15 — Nhận ACK ngoài hệ thống

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | connector runtime; bms.alarm.read |
| Đầu vào | native ACK transition, actor/time, occurrence, provenance |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Ghi actor nguồn riêng actor SmartAlarm; liên kết intent nếu có cùng correlation ID; cập nhật acknowledgement projection; giữ checklist cứu hộ/closure không đổi. |
| Đầu ra và lỗi | acknowledgement_changed; không biết actor thì null/unknown, không tự gán người đang đăng nhập. |
| Nghiệm thu | Giữ actor nguồn; ACK không đóng incident cứu hộ. |
| Màn hình / liên kết | BMS03, O04 |

#### FR-BMS-16 — Đưa incident sang BMS

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | approved integration writeback service + operator |
| Đầu vào | incident summary schema, permitted BMS namespace, correlation/causation IDs, minimal audience fields |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Tạo projection tối thiểu; loại thông tin bệnh án/định danh không cần thiết; ghi lineage và origin; reject echo bằng source+causation; không mirror raw SOS/chat. |
| Đầu ra và lỗi | WritebackReceipt + loop ledger; lặp vượt budget circuit-breaker riêng chiều writeback, alarm intake vẫn chạy. |
| Nghiệm thu | Namespace duyệt, dữ liệu tối thiểu, chống echo; không đưa bệnh án. |
| Màn hình / liên kết | BMS08, I08–I10 |

#### FR-BMS-17 — Giảm nhiễu alarm cho operator

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | incident operator; bms.alarm.read |
| Đầu vào | alarm flood group keys, severity, acknowledgement state, raw event references |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Nhóm hiển thị theo rule có version và time window; hiện số lượng/mới nhất/cũ nhất và drill-down; pin P1 chưa nhận biết; không sửa hoặc xóa raw history. |
| Đầu ra và lỗi | GroupedAlarmView; operator có thể ungroup; suppression thực phải workflow bảo trì riêng. |
| Nghiệm thu | Giữ raw events, số bị nhóm; không ẩn P1 chưa nhận biết. |
| Màn hình / liên kết | O03, BMS03 |

#### FR-BMS-18 — Bảo trì và suppression

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | maintenance authority + site operator |
| Đầu vào | asset/zone scope, reason, permit, owner, start/end, alternative protection |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Phê duyệt impairment; đánh dấu những rule/route bị ảnh hưởng; điều chỉnh presentation theo policy; khi hết lịch yêu cầu kiểm tra phục hồi, không tự coi thiết bị healthy. |
| Đầu ra và lỗi | ImpairmentRecord active/restoration-pending/closed; quá hạn escalation và người chịu trách nhiệm rõ. |
| Nghiệm thu | Reason, owner, expiry; hết lịch chưa chứng minh bảo vệ phục hồi. |
| Màn hình / liên kết | F14, F18 |

#### FR-BMS-19 — BMS evidence cho tuyến thoát hiểm

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | route service + site safety engineer |
| Đầu vào | door/fan/lift observation, topology revision, freshness, capability and approved route policy |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Xác định edge bị ảnh hưởng; chỉ dùng evidence đủ chất lượng; stale/contradictory làm giảm tin cậy hoặc thu hồi route revision và voice cùng phiên; không tự suy cửa mở là lối an toàn. |
| Đầu ra và lỗi | RouteConstraintEvidence + guidance revision; unknown route đưa người dùng sang hỗ trợ, không sinh hướng giả. |
| Nghiệm thu | Door/fan/lift data cũ làm giảm tin cậy hoặc thu hồi tuyến. |
| Màn hình / liên kết | Q04–Q05, C35–C38 |

#### FR-BMS-20 — Cứu hộ chủ động

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | care triage operator + authorized responder |
| Đầu vào | functional needs with consent, identity presence evidence, zone exposure, observation ages |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Kết hợp presence đủ scope với nhu cầu chức năng; occupancy count chỉ tạo nhiệm vụ kiểm tra khu vực; giải thích lý do ưu tiên; người có thẩm quyền xét và phân đội. |
| Đầu ra và lỗi | ProactiveRescueCandidate + evidence; không có SOS/presence không chứng minh an toàn hay tử vong. |
| Nghiệm thu | Kết hợp nhu cầu và presence có độ mới; occupancy count không định danh. |
| Màn hình / liên kết | H08–H11, O11–O12 |

#### FR-BMS-21 — PA và app theo quy tắc duyệt

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | warning authority + PA operator |
| Đầu vào | qualified BMS alarm, approved cause/effect, message revision/locale, audience/PA zones |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Deterministic rules tạo đề nghị warning; kiểm actual/exercise và dedup trước fan-out; không chờ LLM; phát approved content và tách delivery/playback/human acknowledgement. |
| Đầu ra và lỗi | WarningIntent + per-channel receipts; replay/echo không phát lại, bản dịch chưa duyệt không tự broadcast. |
| Nghiệm thu | Không chờ LLM; không phát lại do echo hoặc historical replay. |
| Màn hình / liên kết | O13–O17, P01–P09 |

#### FR-BMS-22 — Xem trước tác động điều khiển

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.command.preview |
| Đầu vào | target, desired effect, expected state/version, affected zones, local owner/priority, current policy |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Hiển thị cause/effect, hậu quả và điều kiện feedback trước khi submit; không có raw-write editor; target ngoài allowlist hoặc state stale phải bị chặn. |
| Đầu ra và lỗi | CommandPreview bound to payload hash/revisions; thay target/value buộc tạo preview/approval mới. |
| Nghiệm thu | Hiện target, owner, priority, điều kiện và vùng ảnh hưởng. |
| Màn hình / liên kết | F09–F10, BMS04 |

#### FR-BMS-23 — Lệnh có approval và TTL

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.command.submit + separate authorized physical-command approver |
| Đầu vào | CommandPreview hash, requester/approver, TTL, live state, interlocks |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Tái dùng physical Command aggregate; tách duties theo risk; revalidate tại edge trước dispatch; approval hết hạn hoặc payload khác bị reject; không dispatch khi local override. |
| Đầu ra và lỗi | Command intent/audit; TTL là hạn cho phép dispatch, không hứa xóa retained BMS state sau mất điện. |
| Nghiệm thu | Đổi tham số làm vô hiệu approval; override tại chỗ vẫn thắng. |
| Màn hình / liên kết | F10, BMS04 |

#### FR-BMS-24 — Priority lease và relinquish

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | authorized physical-command approver + local authority |
| Đầu vào | approved priority slot, ownership proof, expected current slot value, release intent |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Chỉ dùng priority được site cấp; ghi lease/owner và current value; relinquish qua cùng command guard sau readback; không xóa slot của tác nhân khác; kế hoạch watchdog/manual cleanup riêng. |
| Đầu ra và lỗi | OwnershipProjection + ReleaseIntent; ownership không chứng minh được chuyển local handover. |
| Nghiệm thu | Chỉ slot được phép; không xóa slot không chứng minh được ownership. |
| Màn hình / liên kết | BMS04, F13 |

#### FR-BMS-25 — Đối soát hiệu ứng vật lý

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | command reconciler + authorized site observer |
| Đầu vào | transport receipt, controller execution status, independent feedback points, time bounds |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Theo dõi ba lớp evidence riêng; so expected effect với feedback có chất lượng; một HTTP200/accepted không đủ completed; discrepancy tạo task và giữ raw evidence. |
| Đầu ra và lỗi | PhysicalOutcome verified/contradictory/unknown theo aggregate hiện hữu; không tạo completion giả. |
| Nghiệm thu | Tách transport receipt, controller report và feedback độc lập. |
| Màn hình / liên kết | F11–F12 |

#### FR-BMS-26 — Timeout và kết quả chưa rõ

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.command.reconcile |
| Đầu vào | command ID, last receipt/sequence, source availability, readback plan |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Khi timeout đánh dấu outcome unknown; query status/readback trước; chỉ retry request nếu adapter chứng minh semantics an toàn trong plan duyệt, không blanket retry physical effect. |
| Đầu ra và lỗi | ReconciliationCase; không chắc kết quả phải escalation tại chỗ và giữ dispatch fence. |
| Nghiệm thu | Không tự gửi lại tác động không biết kết quả; query/readback trước. |
| Màn hình / liên kết | F12, BMS07 |

#### FR-BMS-27 — Local override và bàn giao

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | site operator + command authority |
| Đầu vào | local override status, open intents/leases, handover owner, cleanup evidence |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Thu hồi remote eligibility ngay khi override; bàn giao danh sách tác động còn tồn; reconnect chỉ reconcile, không khôi phục lệnh cũ; local owner xác nhận release trước cấp quyền lại. |
| Đầu ra và lỗi | HandoverRecord + blocked capabilities; mất thông tin override coi không đủ điều kiện ghi. |
| Nghiệm thu | Không khôi phục lệnh cũ khi reconnect; cleanup có người chịu trách nhiệm. |
| Màn hình / liên kết | F13, BMS04, BMS07 |

#### FR-BMS-28 — Journal và offline

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | edge runtime + operations |
| Đầu vào | durable journal quota, sequence/checkpoint, offline policy, disk thresholds |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Commit incoming event trước khi báo durable intake; ưu tiên alarm/control evidence; backpressure history trước; khi disk pressure tới ngưỡng không giả nhận thành công; replay gắn mode replay. |
| Đầu ra và lỗi | JournalCheckpoint + gap/backpressure alarm; bảo vệ cục bộ tiếp tục độc lập. |
| Nghiệm thu | Không xác nhận tiếp nhận transport trước durable commit; việc này khác ACK alarm của người/nguồn. Bảo vệ tại chỗ độc lập. |
| Màn hình / liên kết | I05, G02, BMS07 |

#### FR-BMS-29 — HA và single writer

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | edge operations + security |
| Đầu vào | leader epoch, egress fence, lease health, standby credentials, failover approval |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Chỉ active writer có quyền tại điểm phát lệnh thật; lease cache không đủ; failover phải revoke/fence writer cũ; nếu BMS không hỗ trợ chứng minh fencing, disable automatic write failover. |
| Đầu ra và lỗi | WriterEpoch/Health evidence; split brain chạy observe-only và escalation. |
| Nghiệm thu | Fencing hiệu lực tại điểm phát lệnh; standby không ghi. |
| Màn hình / liên kết | G03–G04, BMS07 |

#### FR-BMS-30 — Đối soát alarm sau mất dữ liệu

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.reconciliation.run |
| Đầu vào | last cursor/source epoch, paginated active snapshot, transition gaps |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Đọc active snapshot theo contract nguồn; ConditionRefresh/active list không thay historical replay; commit completion marker rồi mới đánh giá missing; giữ alarm chưa xác minh trong gap. |
| Đầu ra và lỗi | SnapshotReconciliation complete/partial/gapped; không clear do thiếu trong một page hoặc snapshot lỗi. |
| Nghiệm thu | Snapshot/cursor không chắc chắn phải hiện gap; không clear theo một trang. |
| Màn hình / liên kết | BMS03, BMS07 |

#### FR-BMS-31 — Schema drift và nâng cấp

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.mapping.edit + bms.lifecycle.change + qualification reviewer |
| Đầu vào | native schema diff, connector/mapping version, dependency impact, rollback artifact |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Rename giữ stable key; type/unit/enum/capability đổi tạo quarantine; shadow/test adapter mới bằng fixture; drain trước cutover; rollback version không hồi sinh lệnh cũ. |
| Đầu ra và lỗi | DriftDecision + rollout record; affected routes/commands bị invalidated đến khi requalified. |
| Nghiệm thu | Rename giữ ID; đổi type/unit quarantine và vô hiệu capability bị ảnh hưởng. |
| Màn hình / liên kết | BMS05, G09–G10 |

#### FR-BMS-32 — License, chứng thư, tài khoản

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | security administrator + site integrator |
| Đầu vào | secretRef, certificate fingerprint/expiry, license entitlement, rotation/revoke plan |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Dùng secret store; test principal mới với quyền tối thiểu; overlap chứng thư theo policy; revoke làm capability unavailable; không ghi token/password vào log hoặc export. |
| Đầu ra và lỗi | Credential/LicenseEvidence revision; expiry escalation trước hạn và ngừng capability liên quan. |
| Nghiệm thu | Rotation có test; revoke chặn quyền; không log secret. |
| Màn hình / liên kết | I05, I07, F17 |

#### FR-BMS-33 — Health theo dữ liệu và vùng

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.health.read |
| Đầu vào | point freshness distribution, source latency, queue age, source clock quality, edge connectivity |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Tổng hợp theo zone/source và criticality; heartbeat healthy không che stale points; đo timestamps đủ tin cậy; hiện gap và dữ liệu quality xấu; cảnh báo theo budget site. |
| Đầu ra và lỗi | ConnectorHealth + affected zones; không báo all-clear vì gateway online. |
| Nghiệm thu | Gateway online không che points stale; đo riêng alarm latency. |
| Màn hình / liên kết | I05, F01, BMS01 |

#### FR-BMS-34 — Capacity, backfill và retention

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | platform operations + site integrator |
| Đầu vào | point groups, intervals, batch limits, change/burst rate, retention/offline window |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Tính tải theo samples và request/batch riêng; benchmark nguồn thật; tách alarm/history queues; điều tiết backfill và quota perBMS; autoscale cloud không nâng năng lực BMS. |
| Đầu ra và lỗi | ApprovedCapacityPlan + measured thresholds; vượt budget degrade có thông báo, không drop alarm im lặng. |
| Nghiệm thu | Quota theo BMS; historian không chiếm alarm queue. |
| Màn hình / liên kết | BMS06, G02 |

#### FR-BMS-35 — Cách ly actual và exercise

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | exercise controller + site commissioning authority |
| Đầu vào | mode actual/exercise/commissioning, isolated namespace, approved test plan |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Exercise dùng simulator và synthetic identities; chặn ACK/write ra production; commissioning thật dùng permit và người tại chỗ; mode transition cần audit và đối soát queue. |
| Đầu ra và lỗi | ModeBoundSession; không thể đổi UI flag để bỏ qua server isolation. |
| Nghiệm thu | Simulation không ACK/write thật; commissioning có plan riêng. |
| Màn hình / liên kết | I04, F15–F16 |

#### FR-BMS-36 — FAT/SAT đúng cấu hình

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.qualification.submit + independent FAT/SAT witness |
| Đầu vào | exact build/license/profile/map versions, fixtures, expected outcomes, measured evidence |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Chạy tests theo capability và actual configuration; lưu raw evidence, observer, pass/fail, deviations; read PASS không cấp ACK/write; ký SAT riêng tại site. |
| Đầu ra và lỗi | AcceptanceEvidence and capability admission; failing/untested capability stays disabled. |
| Nghiệm thu | Signoff theo capability; read PASS không cấp command. |
| Màn hình / liên kết | F15–F17, BMS01 |

#### FR-BMS-37 — Support và forensic export

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | scoped support investigator |
| Đầu vào | incident/connection IDs, bounded time range, export purpose, redaction policy |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | Tạo timeline có source/revision/actor/quality; redact secret và health details; kiểm quyền cả export async/download; có expiry và audit; tách original evidence khỏi presentation. |
| Đầu ra và lỗi | ForensicExport manifest/hash/expiry; scope violation reject, không dùng support role vượt tenant. |
| Nghiệm thu | Timeline có revision/source; redact secret và dữ liệu sức khỏe. |
| Màn hình / liên kết | O21–O22, G07–G08 |

#### FR-BMS-38 — AI phân tích evidence BMS

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | AI analyst + incident commander |
| Đầu vào | scoped observations, provenance, quality/freshness, authorized tools, model/prompt version |
| Tiền điều kiện | Tenant/site hợp lệ; nguồn và profile/mapping revision áp dụng được xác định; scope read hoặc action và capability đã đủ điều kiện; actual/exercise được phân biệt. Thiếu qualification chặn tác động ra nguồn nhưng vẫn cho xem evidence theo quyền. |
| Luồng xử lý | LLM tạo bản phân tích có evidence refs và uncertainty; source text là dữ liệu không phải chỉ thị; deterministic policy quyết định eligibility; AI không có tool rawwrite/ACK. |
| Đầu ra và lỗi | AdvisoryAnalysis with revision/citations; mất nguồn/LLM lỗi không chặn alarm/routing core. |
| Nghiệm thu | LLM đọc dữ liệu có scope và nguồn; không điều khiển trực tiếp. |
| Màn hình / liên kết | Q06–Q09 |

#### FR-BMS-39 — Đa tenant/site và residency

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | tenant/site administrator + regional security |
| Đầu vào | tenant/site/region IDs, native namespace, connection principal, allowed projections |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Partition registry, cache, journal, events và query theo composite scope; kiểm cross-site/region projection; data residency áp dụng cả backup/export; ID native trùng không collision. |
| Đầu ra và lỗi | Scoped resource identities + audit; unauthorized scope returns denied/not-found per policy without leakage. |
| Nghiệm thu | ID native trùng vẫn tách; cross-site chỉ qua projection được phép. |
| Màn hình / liên kết | G01, T02–T04, BMS01 |

#### FR-BMS-40 — Ngừng kết nối có bàn giao

| Mục | Hợp đồng |
|---|---|
| Chủ thể / quyền | bms.lifecycle.change + local owner + security administrator |
| Đầu vào | connection ID, active alarms/intents/leases, retention plan, handover acceptance |
| Tiền điều kiện | Tenant/site và quyền cấu hình hợp lệ; profile/map ứng viên có thể ở draft. Qualification bắt buộc trước activation, không phải trước khi soạn cấu hình. Mọi thao tác ra nguồn chỉ dùng capability hiện hành đã đủ điều kiện. |
| Luồng xử lý | Freeze new commands; drain/check outstanding effects; hand over local ownership; revoke credentials/subscriptions; verify no egress; retain evidence/tombstones under policy. |
| Đầu ra và lỗi | RetirementRecord complete only after handover/revoke verification; unresolved effect blocks retirement completion. |
| Nghiệm thu | Kiểm open alarm/lease, bàn giao, revoke, verify và giữ audit. |
| Màn hình / liên kết | BMS01, F13, G06 |

### Gate BMS trước phát hành

Thiết kế test BMS-T01–20 (nghiệp vụ) và BMS-P-01–28 (giao thức) phải được thực thi theo profile/site; chúng có giao nhau nên không cộng thành chỉ số độ phủ độc lập. BMS01 thể hiện acceptance theo read/history/ACK/command/release riêng. Kết quả cần lưu exact build, adapter/profile/mapping revisions, môi trường, raw request/response đã redact, quan sát tại chỗ, actor và thời điểm. Đổi build, type/unit hoặc quyền làm mất hiệu lực evidence liên quan và yêu cầu đánh giá lại. [Bộ nghiên cứu BMS](BMS/BMS-Research-and-Design-VI.md) giữ nguồn hãng; [Detail Design](Detail-Design.md) quy định schema/API, state machine và giao dịch.
**API chuẩn của baseline.** Hợp đồng typed dùng họ tài nguyên `/bms/connections/{connection_id}/...` trong [API-Contract.json](API-Contract.json), gồm discovery, mapping revisions, qualification/activation, native acknowledgements, command preview/submission và lifecycle transitions. Các tên `/bms-systems`, `/bms-release-intents` trong nghiên cứu trước là draft alias, không phải endpoint production bổ sung. BMS command submission gọi executor của physical Command hiện hữu, không bypass policy.

<!-- BMS-INTEGRATED-3.0-END -->

## 4. NFR và môi trường nghiệm thu

| ID | Yêu cầu đề xuất | Kiểm chứng |
|---|---|---|
| NFR-01 | Production regional core 99.95% tháng | Synthetic + server metrics; tính cả lỗi dependency ảnh hưởng người dùng |
| NFR-02 | Ingest p95 ≤ 2 s; fan-out enqueue p95 ≤ 5 s | Tải 100 event/s steady, 1,000 event/s trong 60 s; 10,000 recipients/incident; payload metadata ≤ 64 KB |
| NFR-03 | Priority fairness | P1 reserved queues; tenant noisy-neighbor test; không để telemetry bulk chặn SOS |
| NFR-04 | Multi-AZ RPO mục tiêu 0 cho committed records, RTO ≤ 15 phút | Kill primary, verify durable commit và failover; chỉ cam kết sau test |
| NFR-05 | Regional disaster RPO ≤ 5 phút, RTO ≤ 60 phút | Restore/cold-region drill trong residency policy; immutable backup restore |
| NFR-06 | WCAG 2.2 AA target | Keyboard, screen reader, zoom, contrast và error announcements; chưa claim certified |
| NFR-07 | Web interactive p95 ≤ 3 s ở mạng tham chiếu | 4G simulation, representative low-end device; map loads tách core content |
| NFR-08 | Offline durable outbox và stale visibility | Airplane mode, app kill, reconnect, clock skew và reassignment conflict |
| NFR-09 | Security isolation | Tenant/object permission tests, upload validation, credential revocation, audit coverage |
| NFR-10 | Backward compatibility | API/event contract tests; additive minor changes; major versions song song có sunset |

Tải tham chiếu là mục tiêu engineering, không phải đo benchmark. Media upload qua object store tách khỏi critical event pipeline. Các mục NFR áp dụng sản phẩm cần xây, prototype tĩnh không chứng minh đạt các mục này.

| ID | Yêu cầu vật lý | Kiểm chứng |
|---|---|---|
| NFR-11 | Bảo vệ tự động cục bộ độc lập cloud/edge | Chứng kiến mất cloud/link/adapter không ngăn trình tự bảo vệ cục bộ được duyệt |
| NFR-12 | Thời gian/chất lượng telemetry và phản hồi theo cấu hình | Ký ngưỡng freshness, truyền và phản hồi theo thiết bị/site; đo riêng; UNKNOWN khi quá hạn |
| NFR-13 | Cách ly OT và lệnh | Chứng minh chỉ giám sát, từ chối ghi, quyền tối thiểu, truy cập bảo trì kiểm soát và không có đường test-to-live |
| NFR-14 | Bảo đảm vật lý theo cấu hình | Đủ provenance và FAT/SAT bắt buộc ký duyệt; thay đổi làm hết hiệu lực nghiệm thu capability bị ảnh hưởng |

NFR vật lý không dùng mục tiêu độ trễ phần mềm thay hiệu năng phản ứng vật lý/thủy lực. Thời gian và tiêu chí đạt theo thiết bị/site phải duyệt trước thử, kết quả ghi firmware, phần cứng và điều kiện vận hành.

## 5. Acceptance gate tổng

### Gate tương tác v2 gắn hợp đồng hiện có

Các tiêu chí sau bổ sung acceptance cho FR tương ứng, không đổi ID hoặc enum API.

| Hợp đồng / màn | Điều kiện và kết quả quan sát được |
|---|---|
| WF-05, FR-C06/C07/C08, FR-X01 | Khi thiếu mạng, lưu yêu cầu với trạng thái chờ tại máy; không hiện máy chủ/đội đã nhận. Khi kết nối lại, dùng định danh cũ để đối soát. Vị trí tự báo vẫn sửa được trước gửi. |
| WF-11, FR-R02/R03/R04, FR-O08/O09 | Chọn đội không đồng nghĩa đội nhận việc hoặc đã đến. Hiển thị người phụ trách, trạng thái có nguồn; ETA thiếu bằng chứng phải là chưa xác nhận, không dùng thời gian mẫu như cam kết. |
| WF-22/24, FR-C35/C36/C37/C38/C39 | Hướng chưa biết bỏ mũi tên rẽ; tầng chưa xác minh bỏ dẫn đường từng bước. Khi tuyến thu hồi, hủy hình tuyến và hàng đợi âm cũ trước khi cho mở bản mới. Chỉ dùng tuyến thay thế đã được duyệt đúng phiên bản. |
| WF-12, FR-C27 | Vào hoặc tải lại chế độ kín đáo không phát âm, rung hay lời đọc; có thoát nhanh và hành động hỗ trợ có nhãn rõ. |
| WF-21/30, FR-P04/P09/F11/F12 | Receipt, phát thực tế, ACK của người và tác động vật lý có thời điểm/nguồn riêng. Thiếu phản hồi độc lập giữ UNKNOWN; không tự retry thao tác không idempotent. |

Gate ngang: ở VI/EN/JA, sơ đồ có văn bản tương đương, biểu tượng kèm nhãn, nghĩa không chỉ bằng màu; bàn phím và focus sử dụng được; khung 320 CSS px và phóng chữ không làm mất hành động. Đo vùng chạm mục tiêu 48–56 px cho luồng khẩn/hiện trường, 44 px thường. Kiểm tra trên trình đọc màn hình và thiết bị thật; xem ảnh hoặc đọc CSS chưa đủ kết luận đạt.

Prototype v2 dùng nút chuyển cảnh và dữ liệu mẫu; sự chuyển sang C08 hoặc màn xác nhận không phải bằng chứng backend đã nhận. Các ca trên là gate triển khai, không được ghi PASS chỉ từ điều hướng prototype.


Phải chạy đủ flow Fire, Disaster, Fall, Road, discreet SOS và generic assistance; test duplicate, late data, out-of-order, expiry, network partition, unauthorized tenant, quota saturation, provider failure và restore. Với physical/drone, simulator PASS không thay acceptance hiện trường. Ma trận chi tiết trong Acceptance-Matrix.csv. Screen-level acceptance nằm trong Screen-Specifications.md và gắn từng mockup ID.


Cổng vật lý thực thi thêm PHY-01–PHY-16 và AC-F01–AC-F20, kiểm đủ FR-PHY-01–FR-PHY-16, cần bố trí thử vật lý được duyệt và đội site được ủy quyền. Acceptance-Matrix.csv giữ 298 ca baseline và thêm 48 ca BMS (346 ca thiết kế, chưa cộng các bổ sung nghiệm thu màn hình được quản lý riêng). Ca thiết kế không phải bằng chứng thực thi. Hỗ trợ hãng, giấy phép vật lý, người tại chỗ sẵn sàng và FAT/SAT ký duyệt là phụ thuộc để bật điều khiển production; thiếu bằng chứng giữ capability liên quan không khả dụng hoặc chỉ giám sát.

## Phụ lục bắt buộc trong cùng baseline

[Loa cứu hộ và voice navigation](Voice-Rescue-Design.md) bổ sung WF-21–22. [Định vị, tối ưu, AI và hồ sơ hỗ trợ](Positioning-AI-Care-Design.md) bổ sung WF-23–27. Hai tài liệu này là thành phần của full design, không phải tính năng tùy chọn cho giai đoạn sau. [Đặc tả màn hình](Screen-Specifications.md) cung cấp FR theo từng screen ID.
