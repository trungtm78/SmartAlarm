# SmartAlarm — Functional Requirements Document

![SmartAlarm — sơ đồ giải thích](assets/03-Proactive-Rescue.svg)


Version 1.0 · 23/10/2026 · Thiết kế đề xuất. Các ID WF là yêu cầu xuyên màn hình; FR-<screen ID> là đặc tả giao diện chi tiết trong Screen-Specifications.md. Cả hai tạo thành FRD đầy đủ của baseline.

Revision 1.0 là baseline thiết kế đầy đủ, không phải sản phẩm đã triển khai/chứng nhận. WF-01–WF-20 bên dưới, phụ lục bắt buộc WF-21–WF-27 và workflow vật lý WF-28–WF-33 tạo thành 33 workflow. Danh mục có 233 màn, gồm F01–F20. Tích hợp vật lý phải dùng bằng chứng theo cấu hình từ [Danh mục thiết bị vật lý](Physical-Device-Catalog.md); yêu cầu chức năng bên dưới không khẳng định capability hãng chưa hỗ trợ.

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


Cổng vật lý thực thi thêm PHY-01–PHY-16 và AC-F01–AC-F20, kiểm đủ FR-PHY-01–FR-PHY-16, cần bố trí thử vật lý được duyệt và đội site được ủy quyền. Acceptance-Matrix.csv có 65 ca xuyên hệ thống và 233 ca màn hình (tổng 298). Ca thiết kế không phải bằng chứng thực thi. Hỗ trợ hãng, giấy phép vật lý, người tại chỗ sẵn sàng và FAT/SAT ký duyệt là phụ thuộc để bật điều khiển production; thiếu bằng chứng giữ capability liên quan không khả dụng hoặc chỉ giám sát.

## Phụ lục bắt buộc trong cùng baseline

[Loa cứu hộ và voice navigation](Voice-Rescue-Design.md) bổ sung WF-21–22. [Định vị, tối ưu, AI và hồ sơ hỗ trợ](Positioning-AI-Care-Design.md) bổ sung WF-23–27. Hai tài liệu này là thành phần của full design, không phải tính năng tùy chọn cho giai đoạn sau. [Đặc tả màn hình](Screen-Specifications.md) cung cấp FR theo từng screen ID.
