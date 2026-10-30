# SmartAlarm — Business Requirements Document

![SmartAlarm — sơ đồ giải thích](assets/01-All-in-One.svg)


**Phiên bản:** 3.0 · 24/10/2026 · Hồ sơ thiết kế để review, chưa phải yêu cầu đã ký duyệt.  
**Định hướng đã xác nhận:** quốc tế, đa ngành ngay từ đầu; thiết kế production đầy đủ ngay từ đầu; không xây kiến trúc tạm để demo; Việt–Anh–Nhật là phạm vi bắt buộc.  
**Ngôn ngữ hồ sơ:** tiếng Việt; giao diện có bộ chuyển Việt–Anh–Nhật; bản ghi minh họa giữ ngôn ngữ nguồn khi là nội dung nhập liệu.

## 1. Quyết định sản phẩm

SmartAlarm là nền tảng tiếp nhận tín hiệu, xác minh sự cố, cảnh báo đúng đối tượng, điều phối hỗ trợ và theo dõi kết quả. Tên đề xuất giữ nguyên **SmartAlarm**, mô tả “Multi-hazard safety & response platform”. Có thể dùng **SmartAlarm One** cho bộ sản phẩm, **SmartAlarm Command / Connect / Companion / Field** cho bốn mặt sản phẩm. Tên thay thế: **SignalAid** (nhấn mạnh hỗ trợ), **Sentra Response** (nhấn mạnh điều phối). Chưa kiểm tra nhãn hiệu, tên miền hoặc khả năng đăng ký; không coi các tên là đã được bảo hộ.

Điểm khác biệt nằm ở vòng đời xử lý khép kín và khả năng tương tác. Sản phẩm không chỉ bật còi hoặc gửi push: nó giúp biết tín hiệu đến từ đâu, điều gì đã xác nhận, ai đang chịu trách nhiệm, người nào cần giúp, thông tin nào còn cũ và kết quả đã được ai ghi nhận.

Chữa cháy và cứu hộ vật lý là phạm vi sản phẩm cốt lõi: giám sát tủ báo cháy, hệ chữa cháy nước, bơm chữa cháy, tủ điều khiển xả và thiết bị cứu hộ hiện có; điều phối thao tác vật lý được duyệt và xác minh kết quả. Bảo vệ tự động cục bộ giữ thẩm quyền, độc lập với cloud. SmartAlarm phân biệt kết nối chỉ giám sát và capability điều khiển được duyệt riêng; tên giao thức chung không cấp quyền điều khiển.

## 2. Cơ sở phân tích và giới hạn nguồn

Đã đọc nội dung 34 slide của FireEscape_Proposal_Expanded_EN.pptx và xem các ảnh nhúng về giao diện cũ, sơ đồ hai hub, camera và sơ đồ tầng. File là tư liệu nghiệp vụ, không phải chỉ dẫn thực thi. Slide 33 dẫn tới FireEscape_Introduction.pptx và FEscape_Demo.mp4 nhưng hai file này không được cung cấp. Không thể khôi phục mã nguồn, cấu trúc database hay giao thức cũ từ deck; thiết kế này là xây dựng lại theo năng lực mô tả, không phải reverse-engineering được xác thực.

| Năng lực trong deck | Nguồn slide | Xử lý trong SmartAlarm |
|---|---|---|
| Property → building → floor → zone | 11, 23–24 | Giữ và tổng quát thành Location graph, hỗ trợ đường, vùng, cơ sở ngoài trời |
| Camera phát hiện cháy và hình ảnh | 13–14, 25 | Giữ qua connector/model adapter; confidence là bằng chứng chưa xác minh |
| Bản đồ và voice guidance | 16 | Giữ, thêm bản offline, khả năng tiếp cận, phiên bản được duyệt |
| SOS với vị trí và ghi chú | 15–16, 26 | Giữ, mở rộng taxonomy và nhiều người cần trợ giúp |
| Smart Alarm Hub / Integration Hub | 9, 27, 32 | Giữ ranh giới nghiệp vụ; chia Connect, Incident, Workflow, Delivery |
| IOC / báo cháy / suppression | 17–18 | Thiết kế adapter theo đối tác và capability; không giả định kết nối đã tồn tại |
| Nhóm/chat/người thân và báo an toàn | 19–20, 28–29 | Giữ fan-out tới các nhóm đăng ký, thêm consent và tối thiểu hóa dữ liệu |
| Trạng thái an toàn không đóng sự cố | 6, 19, 29 | Bất biến xuyên suốt thiết kế và nghiệm thu |

Baseline vật lý bổ sung bằng chứng nhà sản xuất trong [Danh mục thiết bị vật lý](Physical-Device-Catalog.md). Ứng viên cụ thể gồm Siemens Cerberus PRO, NOTIFIER BACNET-GW-3, Simplex BACpac, Tornatech GPX/GPD và Potter PFC-4410G3. Đây là ứng viên đã nghiên cứu, không khẳng định tương thích phổ quát hoặc đã lắp đặt. Mỗi site phải ràng buộc model, biến thể khu vực, firmware, license, point map, thao tác được phép và nghiệm thu hiện trường.

## 3. Vấn đề kinh doanh và kết quả cần đạt

BR-01: hợp nhất tín hiệu đa nguồn nhưng giữ provenance và mức tin cậy. BR-02: giảm khoảng trống từ cảnh báo tới người nhận trách nhiệm. BR-03: cung cấp SOS phù hợp nhiều tình huống và khả năng tiếp cận. BR-04: duy trì nhận thức tình huống khi mạng hoặc nhà cung cấp lỗi. BR-05: cung cấp khả năng tích hợp nhanh qua adapter có hợp đồng rõ ràng. BR-06: mở rộng quốc tế với ranh giới dữ liệu và quyền hạn. BR-07: giữ được bằng chứng kiểm toán, học từ diễn tập và sự cố. BR-08: xây nền tảng production đầy đủ, có khả năng mở rộng lâu dài. BR-09: cứu hộ bằng loa và voice navigation. BR-10: định vị hợp nhất và tối ưu thoát hiểm. BR-11: AI phân tích realtime có căn cứ. BR-12: chủ động cứu hộ người cần hỗ trợ dù chưa có SOS.

| Chỉ số thành công | Cách đo | Mục tiêu đề xuất để nghiệm thu, chưa phải số đo thực tế |
|---|---|---|
| Thời gian hệ thống ghi nhận SOS | server accepted_at − ingress_at; không gồm mạng thiết bị | p95 ≤ 2 s ở tải tham chiếu |
| Thời gian cảnh báo sẵn sàng để gửi | delivery job created_at − incident committed_at | p95 ≤ 5 s ở tải tham chiếu |
| Tín hiệu trùng tạo sự cố trùng | Replay cùng source + event ID | 0 sự cố mới do replay cùng ID |
| Truy vết quyết định | Incident → source → rule version → actor → dispatch | 100% ca nghiệm thu có đủ liên kết |
| Phát hiện thiếu acknowledgment | Hết deadline không người nhận | 100% tình huống thử tạo escalation đúng một lần mỗi bước |
| Thời gian tích hợp adapter mới | Sau khi có sandbox, spec và credential của đối tác | Mục tiêu 5–10 ngày công cho adapter telemetry đơn giản, cần đo qua pilot |
| Khả dụng | Phút API lõi hoạt động / phút trong tháng | Production mục tiêu 99.95%; prototype không chứng minh SLA |

Không đặt mục tiêu giảm thương vong hoặc cam kết thời gian cứu hộ khi chưa có nghiên cứu và dữ liệu vận hành. Độ chính xác detector được đánh giá theo hazard/site/model với dữ liệu gán nhãn, không dùng một tỷ lệ quảng cáo chung.

BR-13: cung cấp khả năng quan sát đáng tin cậy về vùng bảo vệ vật lý, mức sẵn sàng bơm, waterflow và impairment. BR-14: chỉ thực hiện yêu cầu vật lý có thẩm quyền, đối soát kết quả chưa chắc chắn bằng phản hồi độc lập. BR-15: duy trì bằng chứng tương thích, FAT/SAT, commissioning và khôi phục suốt vòng đời thiết bị. BR-16: điều phối nhiệm vụ robot cứu hộ/water-monitor có giám sát, thẩm quyền vận hành cục bộ và bàn giao cho người.

Nghiệm thu vật lý thêm chỉ số theo cấu hình: mọi điểm và lệnh bật phải truy vết tới mapping/bằng chứng được duyệt; mọi link cũ hoặc mất phải hiện trạng thái chưa chắc chắn trong ngưỡng site ký duyệt; yêu cầu hết hạn hoặc trùng không tạo tác động vật lý mới khi nghiệm thu. Đo riêng độ trễ từ phát hiện tới quan sát, phê duyệt tới yêu cầu và yêu cầu tới phản hồi vật lý. Ngưỡng phụ thuộc thiết bị/thiết kế site được duyệt, không phải cam kết thời gian cứu hộ phổ quát.

## 4. Người dùng và mô hình tổ chức

| Nhóm | Công việc | Quyền trọng yếu |
|---|---|---|
| Citizen / occupant / worker / traveler | Nhận hướng dẫn, SOS, check-in | Dữ liệu cá nhân, nhóm được mời và cảnh báo công khai phù hợp vùng |
| Family / caregiver | Theo dõi trạng thái được chia sẻ, hỗ trợ | Không mặc nhiên xem vị trí chính xác hoặc hồ sơ sức khỏe |
| Operator | Phân loại, xác minh, điều phối sự cố | Các địa điểm trong phạm vi ca trực và tenant |
| Dispatcher / responder | Giao việc, tiếp nhận, đến nơi, bàn giao | Incident được phân công; dữ liệu cần thiết theo nhiệm vụ |
| Supervisor / incident commander | Duyệt cảnh báo, lệnh, đóng sự cố | Phân tách người soạn và người duyệt theo policy |
| Site/device/integration admin | Cấu hình tài sản và tích hợp | Không tự có quyền xem nội dung nhạy cảm của SOS |
| Privacy officer / auditor | Yêu cầu dữ liệu, kiểm toán | Đọc có kiểm soát; audit không cho sửa lịch sử |
| Platform operator | Sức khỏe hạ tầng, khôi phục | Mặc định không đọc payload tenant; break-glass có hạn và audit |
| Partner / city IOC | Tiếp nhận trường thông tin được thỏa thuận | Service identity, field-level scope và application ACK |

Tenant là biên giới bảo mật và thương mại; một tổ chức có nhiều site và người dùng. Một người có membership tại nhiều tenant nhưng mỗi thao tác phải có tenant context rõ ràng. Liên minh ứng cứu không đồng nghĩa chia sẻ toàn bộ database. Dữ liệu cá nhân thuộc regional cell đã chọn; chỉ số vận hành liên vùng được tổng hợp và loại định danh.

Stakeholder vận hành bổ sung gồm đơn vị thiết kế PCCC, chủ OT, đơn vị commissioning/bảo trì được ủy quyền, người vận hành bơm/hệ xả tại chỗ, người điều khiển robot/water-monitor và cơ quan có thẩm quyền (AHJ) khi áp dụng. Đơn vị thiết kế chịu trách nhiệm cause-and-effect và thủy lực; chủ OT duyệt truy cập mạng; người tại chỗ chịu trách nhiệm điều khiển vật lý tức thời và khôi phục; chỉ huy sự cố điều phối thẩm quyền vận hành. Quản trị phần mềm không tự cấp quyền tác động vật lý. Mua sắm phải có quyền từ hãng, điều khoản hỗ trợ, phê duyệt khu vực và bằng chứng tổ hợp chính xác.

## 5. Phạm vi toàn bộ giải pháp

Gồm các miền Access, Companion, Field, Command, Sites & Detection, Connect & Drone, Administration, Platform, Developer, Localization, Public Address, Care, Intelligence và System states. Danh mục chính thức nằm trong Screen-Catalog.csv; mỗi ID có một mockup và một đặc tả tương ứng trong Screen-Specifications.md. “Toàn bộ màn hình” nghĩa là toàn bộ danh mục baseline này, không khẳng định đã bao phủ các yêu cầu chưa khám phá của mọi quốc gia/nhà cung cấp. Modal/state dùng chung được ghi trong UIUX và trạng thái X; không nhân số lượng màn hình bằng cách đếm các màu hoặc viewport.

Gói nghiệp vụ dùng cùng lõi:

| Gói | Input | Điều phối | Khác biệt bắt buộc |
|---|---|---|---|
| Fire & evacuation | Camera, smoke/heat controller, báo thủ công | Xác minh, hướng dẫn site, SOS, accountability | Sơ đồ tầng có phiên bản; không suy ra tuyến an toàn từ camera đơn lẻ |
| Disaster | CAP/feed được cho phép, sensor, báo thủ công | Vùng ảnh hưởng, shelter, check-in, broadcast | Giữ người phát hành, thời hạn, Update/Cancel; không thay nội dung nguồn bằng AI |
| Personal & care | Wearable, camera được phép, SOS, timer | Check-in, caregiver, operator, responder | Phân biệt nghi té ngã và đã xác minh; không chẩn đoán y khoa |
| Road safety | Telematics, camera, báo người dùng | Xác minh vị trí/hướng đường, dispatch, perimeter | Tốc độ/phanh gấp không tự xác nhận tai nạn; tránh yêu cầu thao tác khi đang lái |
| General SOS | Fire, medical, threat, lost, welfare, assistance, custom | Playbook theo tenant và mức nhạy cảm | Có lối “không biết loại”; threat hỗ trợ discreet mode, không đăng nhóm mặc định |

Ngoài phạm vi tự động hóa không kiểm soát: điều khiển suppression không qua bộ điều khiển tương thích/được phép, tự lái drone không có authority và kiểm chứng, thay thế hệ thống báo cháy được chứng nhận, tự gọi cơ quan công quyền khi chưa có thỏa thuận, chứng nhận y tế, AI tự quyết định tuyến thoát nạn, nhận diện khuôn mặt toàn diện, thanh toán thật. Tất cả tích hợp cần thiết đều thuộc thiết kế sản phẩm; mockup mô phỏng chỉ phục vụ review. Phần cứng thật cần vendor binding và acceptance hiện trường.

Miền vật lý gồm WF-28–WF-33 và màn F01–F20, mở baseline từ 213 lên 233 màn và từ 27 lên 33 workflow. Các workflow/yêu cầu màn hình ban đầu vẫn có hiệu lực. Phạm vi vật lý gồm onboard thiết bị được duyệt, mapping điểm/zone, giám sát telemetry, tác động có thẩm quyền, đối soát kết quả vật lý, impairment/test/khôi phục, bằng chứng FAT/SAT và nhiệm vụ không người lái có giám sát.

Sprinkler wet-pipe và hệ pre-action/deluge điều khiển xả phải có loại tài sản và mô hình vận hành riêng. SmartAlarm không giả định đầu sprinkler nhiệt thông thường có địa chỉ phần mềm riêng. Tủ xả được hỗ trợ vẫn chịu trách nhiệm trình tự xả cục bộ đã duyệt. Nhu cầu khởi động bơm, bơm chạy, output xả bật, vị trí van và xác nhận waterflow là các quan sát khác nhau; không quan sát riêng lẻ nào chứng minh dập cháy. Cho phép retrofit chỉ giám sát khi cấm điều khiển từ xa. Thử xả nước và chuyển động thật cần bố trí thử site được duyệt, nhân sự đủ năng lực và kế hoạch impairment/khôi phục có hồ sơ.

## 6. Hành trình trước – trong – sau

Trước: onboard tổ chức và region; nhập site và floor plan; cấp device identity; kiểm thử connector; cấu hình playbook và roster; mời người dùng; xác định consent; diễn tập. Trong: nhận event → đánh giá → incident → cảnh báo/dispatch → người dân SOS/check-in → đội ứng cứu cập nhật → đồng bộ đối tác. Sau: hoàn tất từng task, xác nhận trạng thái có provenance, supervisor đóng hoặc chuyển giao incident, báo cáo, hành động cải tiến. Không suy ra “mọi người an toàn” từ danh sách người đã đăng ký: người không đăng ký, khách và thiết bị mất kết nối là khoảng trống cần hiển thị.

Hành trình vật lý thêm khảo sát thiết bị được duyệt và hồ sơ tương thích trước onboarding; giám sát có bằng chứng và yêu cầu được người vận hành duyệt trong sự cố; sau đó xác minh kết quả độc lập, bàn giao thủ công, khôi phục và ký hồ sơ. Mất phản hồi phải hiện UNKNOWN và liên hệ site chịu trách nhiệm, không tạo thành công/thất bại giả. Mất cloud không được ngắt phát hiện, khởi động bơm tự động hoặc logic xả cục bộ đã duyệt. Impairment tạo khoảng trống bảo vệ và biện pháp bù hiển thị rõ, không âm thầm che cảnh báo.

## 7. Kiến trúc được chọn theo yêu cầu đã xác nhận

**Full production domain services + regional cells + edge adapters.** Thiết kế đầy đủ từ đầu, có HA, event streaming, workflow durable, database ownership, field-level access, AI governance, PA, positioning và proactive assistance. Modular monolith hoặc microservice chỉ cho phần demo không còn là baseline. Chấp nhận đầu tư SRE, test contracts và vận hành cao hơn để có ranh giới phát triển độc lập lâu dài. Các trade-off và topology nằm trong Basic Design.

Tích hợp vật lý dùng edge adapter tại site và mạng OT phân đoạn. Cloud ghi ý định, thẩm quyền và bằng chứng; controller cục bộ thực thi interlock/chức năng bảo vệ đã duyệt. Đọc và điều khiển là hợp đồng capability riêng. AI có thể tóm tắt bằng chứng vật lý nhưng không được bịa thao tác hỗ trợ, vượt quyền tại chỗ hoặc tự phát lệnh xả/khởi động/chuyển động. Regional cell giữ ranh giới sở hữu thiết bị/site và kiểm toán.

## 8. Kế hoạch phát triển toàn bộ theo cổng chất lượng

Phạm vi chức năng đầy đủ được giữ nguyên. Chia workstream để thực thi và kiểm chứng, không chia sản phẩm thành demo/MVP bị cắt tính năng.

| Cổng | Kết quả | Điều kiện hoàn thành |
|---|---|---|
| G0 — Architecture & product baseline | BRD/FRD/Basic/Detail/UX/contracts | Stakeholder review, domain safety review, xác nhận assumptions |
| G1 — Production foundations | IAM/tenant/regions/event/workflow/data/edge/security | Contract tests, tenant isolation, HA, observability |
| G2 — Full domain workflows | Fire/disaster/personal/road/SOS/care/voice/PA/AI | Đủ flows, roles, vi/en/ja và error states |
| G3 — Integration & resilience | Vendor adapters, localization, HIL, load/DR/security | Site acceptance, measured SLO và recovery evidence |
| G4 — Operational readiness | Training, support, runbooks, contracts, go-live controls | Independent UAT, approved operating ownership |

Chưa có ngân sách và đội ngũ để cam kết lịch hoàn thành. Cần ước lượng theo workstream, quy mô tải và vendor sau khi review baseline. Đội cần product/domain, architecture, backend/integration, web/mobile, UX/localization, QA, security/privacy, SRE và site safety/hardware specialists.

Mỗi cổng phải có bằng chứng vật lý: G0 duyệt ranh giới hệ thống/cause-and-effect; G1 kiểm chứng phân tách OT và resilience edge; G2 đủ WF-28–WF-33 cùng role/error state vật lý; G3 cần kiểm thử tương thích và FAT/SAT cho từng tổ hợp bật; G4 cần đào tạo người tại chỗ, chủ bảo trì, fallback thủ công và quy trình khôi phục. Simulator thành công không đủ đưa phần vật lý vào vận hành.

## 9. Thương mại và vận hành

Đơn vị thương mại đề xuất: tenant/region, số site, thiết bị, người dùng được bảo vệ, connector và mức hỗ trợ; SMS/voice/video là usage có ngân sách. Không silent-drop SOS do hết quota: reserve emergency capacity, cảnh báo vận hành và ghi degraded status. Người mua phải chỉ định người tiếp nhận 24/7 hoặc lịch dịch vụ rõ ràng; một app không tạo ra đội cứu hộ. Contract phải phân biệt thời gian xử lý phần mềm với thời gian phản ứng con người.

Triển khai vật lý phụ thuộc giao diện có license, gateway, firmware được hỗ trợ, thiết kế thủy lực/điện, nhà thầu đủ năng lực, đơn vị commissioning và phê duyệt địa phương. Báo giá phải tách tích hợp phần mềm, thiết bị, lắp đặt, FAT/SAT, bảo trì định kỳ, kết nối và hỗ trợ hãng. Người mua phải chỉ định ai được phép duyệt khởi động/xả/chuyển động, ai hiện diện tại chỗ và ai khôi phục hệ bị suy giảm; hỗ trợ phần mềm không thay các vai trò đó.

## 10. Rủi ro và quyết định còn mở

| ID | Rủi ro / quyết định | Giả định trong baseline | Chủ xác nhận |
|---|---|---|---|
| Q01 | Quốc gia/region đầu tiên chưa chọn | Chứng minh EU và APAC bằng dữ liệu giả; region pinning | Product + pháp chế |
| Q02 | Quyền phát public warning | Chỉ nguồn/issuer được cấu hình và ủy quyền | Đối tác vận hành |
| Q03 | Quyền điều khiển suppression/drone | Read-only trước; command theo capability và phê duyệt | Site engineer / pilot |
| Q04 | Detector và thiết bị chưa chọn | Adapter simulator; không cam kết độ chính xác | Integration + domain lead |
| Q05 | Retention và dữ liệu trẻ em/người phụ thuộc | Giá trị trong thiết kế là đề xuất, consent có version | Privacy owner |
| Q06 | Cấp độ bảo đảm và certification | Chưa tuyên bố tuân thủ/chứng nhận | Compliance + engineering |
| Q07 | Bản đồ indoor và vị trí | User-entered/QR trước; chưa giả định GPS biết tầng | Site owner |
| Q08 | Roster coverage | Tách registered/estimated/unknown, không suy diễn tổng người hiện diện | Command owner |

Các quyết định này không ngăn tạo hồ sơ và mockup review, nhưng là cổng trước khi triển khai thật. Chưa thực hiện thẩm định pháp lý theo từng nước; kiến trúc cung cấp điểm cấu hình và audit chứ không tự bảo đảm tuân thủ.

| ID | Rủi ro / quyết định vật lý | Xử lý baseline | Chủ xác nhận |
|---|---|---|---|
| Q09 | Chưa biết chính xác thiết bị/firmware/quyền giao diện đang lắp | Chỉ giám sát tới khi có capability ký duyệt và bằng chứng tương thích | Hãng + kỹ sư site |
| Q10 | Không có hoặc mâu thuẫn kết quả lệnh vật lý | UNKNOWN, đối soát, bàn giao thủ công; không blind retry | Người tại chỗ + chỉ huy sự cố |
| Q11 | Test/bảo trì giảm bảo vệ | Impairment được phép, bảo vệ bù, khôi phục đã xác minh | Chủ an toàn site |
| Q12 | Chưa kiểm chứng giao diện/phạm vi vận hành robot/water-monitor | Duyệt nhiệm vụ, điều khiển ràng buộc hãng; không tuyên bố tự triển khai | Hãng thiết bị + người vận hành đủ năng lực |

Các cổng áp dụng riêng cho từng quốc gia, site, model, firmware và thao tác được phép. Bằng chứng nghiên cứu không chứng nhận SmartAlarm hoặc cho phép thay đổi hệ được bảo vệ.



<!-- BMS-INTEGRATED-3.0-BEGIN -->
## 10A. BMS hiện hữu là năng lực sản phẩm cốt lõi

BMS giữ vai trò quản lý cơ điện và các chuỗi bảo vệ tại chỗ. SmartAlarm bổ sung quan sát đa hệ, tương quan sự cố, cảnh báo con người, hỗ trợ thoát hiểm và điều phối cứu hộ. Không yêu cầu thay BMS, cũng không bán một cam kết plug-and-play theo tên hãng. Đơn vị triển khai xác nhận tổ hợp product/build/interface/license/adapter/mapping/site trước khi mở capability.

| ID | Kết quả nghiệp vụ | Điều kiện chấp nhận | Chủ trách nhiệm |
|---|---|---|---|
| BR-17 | Dùng dữ liệu BMS hiện hữu để giảm điểm mù tình huống và giữ đầu tư cơ điện | Point/alarm quan trọng có nguồn, topology, quality và freshness; gateway online không đồng nghĩa mọi điểm healthy | Chủ công trình + BMS integrator |
| BR-18 | Mở rộng đa hãng bằng quy trình tương thích kiểm chứng được | 11 engineering profiles có version/evidence; quyền read/history/ACK/write được nghiệm thu riêng; không tự suy capability | Integration owner + security |
| BR-19 | Phối hợp thao tác được phép, tôn trọng quyền tại chỗ | Approval, interlock, ownership, feedback và handover được chứng minh; BMS ACK không đóng cứu hộ | Incident commander + local authority |
| BR-20 | Vận hành dài hạn qua mất kết nối, nâng cấp và ngừng sử dụng | Có offline journal, gap visibility, single-writer fencing, drift quarantine, retention và retirement sign-off | Platform operations + site owner |

**Các vai trò được bổ sung.** BMS integrator xác nhận product/build/interface và point dictionary; site safety engineer duyệt cause-and-effect và vùng ảnh hưởng; mapping engineer tạo mapping nhưng approver độc lập phê duyệt thay đổi có tác động; security admin quản lý principal/license/chứng thư; local authority có quyền ưu tiên tại chỗ; FAT/SAT witness ký bằng chứng theo capability. Một người có thể mang nhiều vai trò tại site nhỏ, nhưng các thao tác risk cao vẫn phải tuân thủ separation-of-duties đã duyệt.

**Phạm vi triển khai bắt buộc.** Bao gồm inventory, qualification, discovery/import có giới hạn, mapping units/semantics/topology, quality/freshness, alarm/native ACK, correlation và chống echo, incident writeback tối thiểu, tác động có quyền, feedback/readback, offline/HA, nâng cấp, hỗ trợ điều tra và retirement. Phạm vi read-only vẫn là cấu hình production hợp lệ; không phải demo. Những API/license không có tài liệu hoặc chưa được cấp không được tính là capability khả dụng.

**Bốn hành trình mới.** WF-34 đưa BMS và point map vào vận hành; WF-35 giữ alarm source, ACK và cứu hộ nhất quán mà không đồng nhất các trạng thái; WF-36 điều phối lệnh và chứng cứ vật lý; WF-37 duy trì, phục hồi, nâng cấp và bàn giao ngừng kết nối. 40 FR-BMS trong FRD là các yêu cầu cần thực hiện của bốn hành trình này. Các mã WF-01–33 vẫn giữ nguyên.

**Đo kết quả và nghiệm thu.** Thu baseline tại từng site cho tỷ lệ point quan trọng có map đã duyệt, tỷ lệ dữ liệu quá hạn, thời gian source→edge→operator, số alarm trùng/echo, số unknown outcomes chưa đối soát, thời gian khôi phục và người chưa được tiếp cận. Định nghĩa critical-point set, clock quality, mẫu đo, percentile và người ký trước khi cam kết SLA. Chưa có benchmark thì chỉ ghi planning assumption, không hứa một độ trễ chung cho mọi BMS. Read PASS không cấp command. Chi phí estimate tách adapter engineering, license hãng, gateway/OT network, mapping theo số lượng và độ phức tạp, FAT/SAT, vận hành và thay đổi phiên bản.

**Cổng đưa vào sử dụng.** (1) Site/interface evidence; (2) mappings và fixtures được duyệt; (3) read/health/alarm reconciliation FAT; (4) site SAT và runbook; (5) từng quyền ACK/write/release chỉ mở sau phê duyệt và bằng chứng riêng. Khi mất chứng thư, license, mapping phù hợp hoặc quyền tại chỗ, capability liên quan bị thu hồi; dữ liệu và lịch sử vẫn giữ theo policy. Không phụ thuộc LLM cho alarm intake, cảnh báo định trước hoặc bảo vệ cục bộ.
<!-- BMS-INTEGRATED-3.0-END -->

## 11. Phê duyệt nghiệp vụ

### Điều kiện chấp nhận trải nghiệm v2

Baseline v2 giữ nguyên BR, WF, FR và 233 mã màn hình; thay đổi cách trình bày quyết định, không mở thêm quyền vận hành. Thứ tự trong tình huống khẩn là **nguy cơ → nơi → hành động ngay → bất định**. Sơ đồ tầng, mốc thoát hiểm, người cần hỗ trợ và thiết bị phải giúp quyết định; ảnh trang trí hoặc bảng chỉ số không được thay hành động. Quản trị dùng ma trận, trace và đối chiếu khi bản đồ không phù hợp.

| Kết quả nghiệp vụ phải kiểm chứng | Màn hình / tiêu chí nghiệm thu |
|---|---|
| Không hướng người đi theo dữ liệu không đủ | C35–C39, O35/O36: hướng chưa rõ không có mũi tên tương đối; tuyến bị thu hồi biến mất cùng lời đọc cũ; vẫn có nhập vị trí và yêu cầu hỗ trợ. |
| Không tạo kỳ vọng cứu hộ sai | C08, R02–R04, O08/O09: phân công, chấp nhận, tiếp cận và đến nơi là trạng thái riêng; không có ETA nếu chưa có nguồn xác nhận. |
| Không biến biên nhận thành kết quả | C07/C08/X01, P04, F11/F12: lưu tại máy, máy chủ nhận, người tiếp nhận, phát loa và hiệu quả vật lý phải phân biệt. |
| Người cần kín đáo hoặc trợ năng vẫn hoàn tất việc | C27 không tự phát âm/rung; luồng khẩn có nhãn chữ, bản chữ thay âm, bàn phím và reflow; thử một tay và người dùng thực trước nghiệm thu. |

Nhận biết trong ba giây là giả thuyết nghiên cứu của UX-Redesign-Audit, không phải thành tích đã đo. Nghiệm thu cần ghi đúng/sai, hiểu nhầm nguy hiểm và khả năng phục hồi theo vai trò/ngôn ngữ; không dùng tốc độ trung bình để che lỗi. Prototype v2 chỉ minh họa dữ liệu và tương tác cục bộ, chưa chứng minh an toàn thực địa, WCAG hoặc khả năng gửi cứu hộ.


Người review: product owner, command operator, responder, site engineer, privacy/security, integration partner và accessibility reviewer. Kịch bản review tối thiểu: cháy có người mắc kẹt, cảnh báo lũ cập nhật/hủy, té ngã không phản hồi, va chạm chưa xác minh, discreet SOS, mất mạng, nguồn gửi trùng, tenant khác truy cập, delivery provider lỗi. Kết quả ghi theo acceptance matrix; tài liệu chưa có chữ ký phê duyệt.


Reviewer vật lý thêm đơn vị thiết kế PCCC, chủ an ninh OT, hãng/nhà thầu được ủy quyền, đơn vị commissioning và người điều khiển nhiệm vụ đủ năng lực. Review phải có bảo vệ tại chỗ khi mất cloud, telemetry cũ/sai zone, điều khiển bị từ chối, yêu cầu hết hạn/trùng, ACK thiếu phản hồi vật lý, phản hồi mâu thuẫn, impairment hết hạn nhưng chưa chứng minh khôi phục và nhiệm vụ mất link. Acceptance-Matrix.csv thêm 16 ca vật lý xuyên hệ thống và 20 ca màn vật lý; chưa thực thi trên sản phẩm.

## Phụ lục bắt buộc trong cùng baseline

[Loa cứu hộ và voice navigation](Voice-Rescue-Design.md) bổ sung WF-21–22. [Định vị, tối ưu, AI và hồ sơ hỗ trợ](Positioning-AI-Care-Design.md) bổ sung WF-23–27. Hai tài liệu này là thành phần của full design, không phải tính năng tùy chọn cho giai đoạn sau. [Đặc tả màn hình](Screen-Specifications.md) cung cấp FR theo từng screen ID.
