# SmartAlarm — Danh mục thiết bị cứu hộ, chữa cháy và IoT

Thời điểm nghiên cứu: **2026-10-23**. Sáu ứng viên triển khai được đối chiếu với tài liệu chính thức của nhà sản xuất. Có tính năng công bố không đồng nghĩa đã tích hợp SmartAlarm; mọi adapter vẫn là đề xuất cho đến khi kiểm thử bàn và nghiệm thu hiện trường. Danh mục bổ sung can thiệp vật lý bên cạnh cảm biến, cảnh báo, định vị và điều phối. Chưa mua sắm hoặc đưa thiết bị vào vận hành.

**Baseline thiết kế hiện tại: 3.0 · Tích hợp BMS: 24/10/2026. Giữ nguyên ngày nghiên cứu/yêu cầu gốc phía trên.**

## 1. Bằng chứng và quyết định triển khai

| ID | Ứng viên chính xác | Vai trò vật lý | Bằng chứng tích hợp | Hướng thí điểm đề xuất |
|---|---|---|---|---|
| DEV-01 | AXIS C1310-E Mk II Network Horn Speaker | Hướng dẫn âm thanh cố định tại site | Công bố VAPIX và SIP | Adapter bàn thử, sau đó đo âm học tại site |
| DEV-02 | Bosch PRAESENSA với system controller PRA-SCL | PA / cảnh báo bằng giọng nói có giám sát | Open Interface được công bố | Đơn vị tích hợp đủ năng lực duyệt trước điều khiển khẩn cấp |
| DEV-03 | DJI Matrice 4T + DJI AS1 Speaker | Hướng dẫn trên không, hỗ trợ tìm kiếm | Xác minh thao tác operator; chưa xác minh API lệnh AS1 cụ thể | Ban đầu vận hành qua phi công |
| DEV-04 | DJI Matrice 400 + Zenmuse V1 | Loa trên không có hướng tích hợp SDK | PSDK điều khiển V1 bằng widget; hãng công bố MSDK | Chứng minh SDK rồi diễn tập bay |
| DEV-05 | Shark Robotics Colossus, cấu hình vòi phun nước/bọt và vận chuyển nạn nhân | Chữa cháy thực, trinh sát và vận chuyển nạn nhân | Điều khiển từ xa của hãng; API tích hợp công khai chưa rõ | Giao nhiệm vụ cho operator được huấn luyện, dùng console hãng |
| DEV-06 | FLIR A700 với Smart Sensor configuration | Quan sát nhiệt, bằng chứng cảnh báo sớm | Công bố MQTT, Modbus TCP và REST | Thí điểm gateway cảm biến chỉ đọc |

## 2. DEV-01 — Loa mạng cố định

**Đã xác minh:** Datasheet C1310-E Mk II liệt kê VAPIX, SIP, SRTP/SIPS, kết quả speaker test và sự kiện đang phát audio clip. Đây là khả năng thiết bị, không chứng minh người đã nghe. [Datasheet chính thức](https://www.axis.com/dam/public/b5/cd/f9/datasheet-axis-c1310-e-mk-ii-network-horn-speaker-en-US-470491.pdf).

**Tích hợp đề xuất:** Adapter edge ánh xạ intent nội dung/vùng đã duyệt vào phiên bản VAPIX cố định; live audio qua SIP media gateway đã kiểm thử. Quản lý ánh xạ loa–vùng; tách biên nhận lệnh, bằng chứng phát và xác nhận của con người. Không suy ra coverage chỉ từ trạng thái online.

**RFI / giới hạn:** Yêu cầu firmware/API cụ thể, phương thức upload/play/stop, xác thực, dung lượng clip, ý nghĩa feedback, giấy phép quản lý và vòng đời hỗ trợ. Xác nhận riêng license audio-manager hoặc tích hợp bên thứ ba; không mặc định miễn phí. Không chỉ định loa mạng này thay thế hệ thống báo cháy bằng giọng nói bắt buộc khi chưa có chứng chỉ phù hợp và thiết kế được duyệt.

**SAT-01:** Phát bản ghi đã duyệt đúng vùng; thử từ chối sai vùng, lỗi amplifier/âm học, lỗi chứng chỉ, mất điện, mất WAN và reconnect với lệnh hết hạn. Đo độ nghe hiểu trong tiếng ồn/số người thực tế, gồm bản ghi Việt/Anh/Nhật.

## 3. DEV-02 — PA khẩn cấp có giám sát

**Đã xác minh:** PRA-SCL có Open Interface và bộ nhớ thông điệp được giám sát. [Sản phẩm PRA-SCL](https://commerce.keenfinity.tech/nlexp/en/System-controller-large/p/F.01U.325.042/). Hãng công bố tài liệu native protocol và C#/.NET. [Tài liệu lập trình](https://software-download.keenfinity-group.com/publicaddress/praesensa/manuals/PRAESENSA%20open%20interface%20programming%20intructions.pdf). Tài liệu cấu hình có TLS và tùy chọn chặn điều khiển khẩn cấp qua interface. [Tài liệu cấu hình](https://resources.keenfinity.tech/public/documents/PRAESENSA_Configurat_Configuration_Manual_enUS_18014473303379595.pdf).

**Ranh giới chứng nhận:** Hãng mô tả khả năng EN 54-16 của PRAESENSA; hiệu lực phụ thuộc hệ thống lắp đặt. [Trang hệ thống chính thức](https://www.keenfinity-group.com/it/it/soluzioni/soluzioni-per-la-comunicazione-pubblica/sistemi-di-comunicazione-al-pubblico-e-allarme-vocale/sistema-di-comunicazione-al-pubblico-basato-su-ip-praesensa/). Tài liệu cấu hình trước đây cảnh báo việc dùng Open Interface có thể làm mất tuân thủ tiêu chuẩn sơ tán. [Giới hạn tích hợp](https://resources.keenfinity.tech/public/documents/PRAESENSA_2.20_Configuration_Manual_enUS_100857072779.pdf).

**Tích hợp đề xuất:** Command policy SmartAlarm tại region → adapter cục bộ được duyệt → controller; bắt đầu từ health/events và thông báo thông thường được phép. Đường báo động cục bộ được chứng nhận giữ ưu tiên. Kích hoạt, xác nhận hoặc reset khẩn cấp phải có thiết kế được đơn vị tích hợp cho phép bằng văn bản; ACK API không phải hoàn tất âm thanh.

**RFI / giới hạn:** Lấy bộ firmware/manual/chứng chỉ hiện hành đúng cấu hình, lệnh được phép, arbitration vùng/ưu tiên, giám sát lỗi, redundancy, điện dự phòng và interface fire-panel được duyệt. Xác nhận controller, amplifier, PSU, call station, loa và license subsystem/phần mềm tùy chọn trong BOM đầy đủ. Một controller không tạo thành hệ thống được chứng nhận hoàn chỉnh. Link Bosch cũ có thể chuyển hướng; dùng portal hiện hành và khóa revision tài liệu khi mua sắm.

**SAT-02:** Thử ưu tiên báo cháy cục bộ khi SmartAlarm đang phát, mất adapter/mạng/controller, lỗi mạch có giám sát, hết hạn nội dung, failover và từ chối reset khẩn cấp trái phép. Đơn vị tích hợp và cơ quan quản lý site nghiệm thu toàn bộ cấu hình lắp đặt.

## 4. DEV-03 — Drone gọn nhẹ và AS1

**Đã xác minh:** DJI công bố AS1 tương thích Matrice 4 Series, có ghi âm, nhập media, TTS và phát trực tiếp. FAQ hiện ghi TTS AS1 hỗ trợ Quan thoại/Anh và nêu SDK của máy bay. Điều này chưa chứng minh từng thao tác AS1 có API SmartAlarm sử dụng được. [Hỗ trợ Matrice 4 chính thức](https://www.dji.com/support/product/matrice-4-series).

**Tích hợp đề xuất:** SmartAlarm chuẩn bị nhiệm vụ và audio đã duyệt; phi công thao tác bằng workflow hãng hỗ trợ, sau đó ghi nhận kết quả. Start/stop/upload/status loa và đưa live audio qua SDK là **CHƯA RÕ, cần tài liệu và trình diễn đúng model/firmware**. Không lấy lệnh loa PSDK hoặc Dock chung chỉ vì tên giống thao tác cần có.

**RFI / giới hạn:** Yêu cầu capability matrix SDK riêng AS1, điều kiện truy cập/license, firmware, giới hạn stream/codec/file, hủy phát và feedback. Với tiếng Việt/Nhật, kiểm thử bản ghi duyệt được nhập; không công bố có TTS tích hợp. Xác nhận thời gian bay theo payload, điều kiện vận hành hợp pháp, bảo trì và đào tạo.

**SAT-03:** Trình diễn đúng ngôn ngữ, độ hiểu dưới tiếng rotor, operator abort, mất liên kết, pin cạn, nhiệm vụ trùng và nội dung cũ trong queue. Cảnh báo không tự gây cất cánh. Chứng minh fallback thủ công khi tích hợp không hoạt động.

## 5. DEV-04 — Matrice 400 và Zenmuse V1

**Đã xác minh:** DJI công bố V1 tương thích Matrice 400, phát trực tiếp qua Pilot 2 và hướng tích hợp MSDK. [Sản phẩm V1](https://enterprise.dji.com/zenmuse-v1). Tài liệu PSDK nêu rõ điều khiển V1 trên Matrice 400 bằng widget values. [Interface PSDK](https://developer.dji.com/doc/payload-sdk-tutorial/en/function-overview/basic-function/custom-widget.html). Trang hỗ trợ có tiếng Nhật trong TTS Matrice 400, không liệt kê tiếng Việt. [Hỗ trợ V1](https://www.dji.com/support/product/zenmuse-v1).

**Tích hợp đề xuất:** Adapter mobile hoặc onboard khóa phiên bản chuyển lệnh voice đã duyệt thành thao tác SDK được tài liệu cho phép. Tách phê duyệt chuyến bay/nhiệm vụ khỏi phê duyệt phát loa. Có SDK không đồng nghĩa đầy đủ tính năng Pilot 2/FlightHub 2 và không chứng minh live streaming cloud-to-speaker không giới hạn.

**RFI / giới hạn:** Yêu cầu phiên bản SDK, key/activation, host tương thích, widget definitions, schema lệnh/trạng thái, media transport, permission và ý nghĩa callback. Xác nhận subscription FlightHub 2 riêng nếu chọn hướng đó. Kiểm thử bản ghi tiếng Việt được duyệt; xác nhận phát âm Nhật và TTS theo firmware. Yêu cầu BOM airframe/payload/mount/controller/battery đầy đủ.

**SAT-04:** Trên tổ hợp mua thực tế, thử upload/play/stop/repeat/volume và trạng thái ở những thao tác được API chính thức hỗ trợ. Thử operator đồng thời, hủy, mất link và phi công tiếp quản. Callback thành công không hiển thị “mọi người đã nghe”. Diễn tập ngoài trời có phép trước vận hành.

## 6. DEV-05 — Robot chữa cháy thực và cứu nạn

**Đã xác minh:** Colossus điều khiển từ xa, có cấu hình nước/bọt, thermal/video và cáng. Trang hiện hành công bố lưu lượng tối đa 3.000 L/phút; chữa cháy thực cần nguồn nước và thiết bị phù hợp. Trang chưa xác lập API điều khiển công khai cho bên thứ ba. [Colossus chính thức](https://www.shark-robotics.com/colossus-firefighting-robot/).

**Tích hợp đề xuất:** SmartAlarm giao nhiệm vụ robot cho đội được huấn luyện, theo dõi tiếp nhận/bằng chứng; chỉ nhập video/telemetry qua interface hãng hỗ trợ sau xác minh. Điều khiển di chuyển, ngắm vòi, phun nước và vận chuyển nạn nhân do operator đủ năng lực kiểm soát. **API, ROS, MQTT, ONVIF, E-stop từ xa và tự hành đều CHƯA RÕ nếu nhà cung cấp chưa công bố/cung cấp tài liệu áp dụng.** Không suy ra giao thức chỉ vì thiết bị có camera hoặc radio.

**RFI / giới hạn:** Yêu cầu thế hệ robot, SKU module, console đi kèm, API/SDK và điều kiện thương mại, xuất video, telemetry, hành vi mất link, emergency stop độc lập, interlock, giới hạn nhiệt, áp lực/lưu lượng nước, foam compatibility, vận chuyển và bảo trì. Xác nhận tải/cáng và quy trình di chuyển bệnh nhân. Đối chiếu sự khác nhau về số module/độ dốc giữa tài liệu hãng trước hợp đồng; danh mục không cam kết vận hành dựa trên các số chưa thống nhất.

**SAT-05:** Cùng cơ quan chữa cháy/cứu nạn thử bề rộng lối vào, tải sàn, dốc/vật cản, kéo vòi, mất nước, phản lực vòi, mất link, quãng dừng, giới hạn nhiệt và pin dự phòng. Diễn tập đưa/vận chuyển nạn nhân bằng hình nhân và quy trình đội được duyệt. SmartAlarm trùng lệnh hoặc mất dịch vụ không được kích hoạt di chuyển/phun.

## 7. DEV-06 — Cảm biến nhiệt IoT

**Đã xác minh:** Bảng Axxx công bố MQTT, Modbus TCP và REST cho cảnh báo/đọc dữ liệu họ A700 Smart Sensor. Dòng A500 khác, không thay thế chỉ dựa vào tên họ sản phẩm. [Bảng sản phẩm/cấu hình](https://www.flir.com/en-eu/products/axxx-series-smart-sensor/). FLIR liệt kê Advanced Smart Sensor và Wi-Fi/camera hình ảnh là tùy chọn riêng. [Hỗ trợ cấu hình](https://flir.custhelp.com/app/answers/detail/a_id/6493/~/flir---a50%252F-a70-%2526-a400%252F-a500%252F-a700--series---smart-sensor).

**Tích hợp đề xuất:** Bắt đầu chỉ đọc: edge gateway đọc nhiệt độ ROI/alarm, phát observation gắn nguồn với device time, receipt time, calibration/configuration version và quality. Vượt ngưỡng là bằng chứng xử lý theo alarm policy, không tự xác nhận đám cháy hoặc cho phép kích hoạt chữa cháy.

**RFI / giới hạn:** Yêu cầu SKU A700, Smart Sensor edition, lens, firmware cùng MQTT payload schema, Modbus register map và REST manual phù hợp. Xác nhận authentication/TLS cho từng interface; không giả định Modbus mã hóa. Xác nhận giới hạn ROI/analysis, calibration, vỏ bảo vệ môi trường và license tùy chọn. Số liệu nguồn không phải bảo đảm độ chính xác tại site.

**SAT-06:** Dùng mục tiêu tham chiếu kiểm soát; thử ảnh hưởng emissivity/phản xạ, che khuất, bẩn optics, threshold/hysteresis, lệch thời gian, mất mạng, observation trùng/replay và sensor fault. Dữ liệu suy giảm không được âm thầm biến thành kết luận không nguy hiểm.

## 8. Cổng mua sắm và phát hành chung

Với từng cấu hình mua, ghi model/serial, firmware, license, interface revision, chủ credential, network zone, lệnh được phép, role duyệt, local override, expiry, ý nghĩa receipt, chủ bảo trì và ngày hết hỗ trợ. Đính kèm bằng chứng hãng và kết quả bench/SAT. Không ứng viên nào được gọi “đã tích hợp production” trước khi hồ sơ và negative tests đạt.

Can thiệp vật lý đi theo **nhiệm vụ incident đã duyệt → operator/cơ quan đủ năng lực → interlock thiết bị → bằng chứng thực thi → đối soát**. SmartAlarm điều phối; hệ thống báo cháy được chứng nhận, phi công và operator cứu nạn giữ trách nhiệm điều khiển cục bộ tương ứng. API success, pixel nóng, ước lượng vị trí hoặc gợi ý AI không được độc lập xác nhận một người an toàn hay hành động cứu hộ thành công.


## UX2-PHYSICAL · Giám sát trực quan và phản hồi vật lý

Console v2 dùng sơ đồ đường ống, van, bơm, vùng phủ và trạng thái thiết bị có nhãn. Yêu cầu lệnh, gateway tiếp nhận và hiệu ứng vật lý quan sát được là ba trạng thái riêng. Phản hồi chưa rõ hoặc đã cũ phải có ký hiệu, thời điểm; không hiển thị thành công màu xanh. Thao tác xem xét trong prototype không vận hành thiết bị. Quyền ưu tiên tại chỗ, liên động và điều kiện nghiệm thu thiết bị trong tài liệu này tiếp tục áp dụng.

Kiểm tra F08–F20 khi mất liên lạc, trạng thái tại chỗ xung đột hoặc phản hồi trễ. Truy cập sơ đồ không được bỏ qua quyền điều khiển. Loa báo phát không chứng minh mọi người đã nghe. Drone/robot nhận nhiệm vụ không chứng minh đã đến hoặc cứu được người.

Tham chiếu [thiết kế UI/UX](UIUX-Design.html), [đặc tả màn hình](Screen-Specifications.html) và [rà soát thiết kế](UX-Redesign-Audit.html).


<!-- BMS-INTEGRATED-3.0-BEGIN -->
## 9. Kết nối thiết bị cứu hộ qua BMS — routing thông tin và trách nhiệm

Thiết bị có thể xuất hiện qua nhiều đường: direct PA API, BMS mirror, drone gateway hoặc console hãng. EquipmentRegistry giữ một equipment identity và nhiều source endpoints; mỗi endpoint có capability/evidence riêng. BMS mirror của loa, robot hoặc water-monitor không được kế thừa quyền điều khiển từ direct connector. Mode actual/exercise được truyền suốt; dữ liệu exercise không tạo nhiệm vụ thiết bị thật.

| Thiết bị | Vai trò dữ liệu BMS | Cách tích hợp phải thực hiện | Acceptance |
|---|---|---|---|
| PA khẩn cấp | Ready/fault, zone, emergency priority, playback report nếu có | Map group theo site, direct PA adapter làm owner session; BMS chỉ trigger/evidence theo capability | Echo/replay không phát lại; local override thắng; playback không chứng minh audibility |
| Loa IP thông thường | Connection/playback status tùy model | Phân loại khác PA life-safety; không thay thiết kế giám sát nguồn/đường dây | Mất nguồn/loa offline phải hiện unknown/unavailable; không gọi là PA certified |
| Drone | Alarm/site coordinates/zone và task context | BMS không điều khiển bay; chuyển Task qua drone gateway và pilot authority, giữ geofence/no-fly/permit | Task accepted khác arrived; mất BMS không thay lost-link behavior của drone |
| Robot / water-monitor | Access constraints, water-supply observations, target zone | Chỉ command qua interface đã duyệt hoặc giao task người vận hành console hãng; readback riêng | BMS pump-run không chứng minh dòng nước tới robot; không tự fire suppression từ telemetry |
| IoT / wearable | Point observations, aggregate presence | Chuẩn hóa source time/quality và provenance; không double-count direct+mirror | Occupancy/wearable silence không chứng minh người an toàn |

**Runbook phối hợp.** Khi BMS cung cấp alarm, mở incident/correlation trước, chọn task và lực lượng theo năng lực, tạo context gồm vị trí cùng uncertainty, thiết bị/cause-and-effect liên quan và source age. Operator nhận nhiệm vụ phải xác nhận local access và trạng thái thực tế trước tác động. Bàn giao giữ task owner/time/evidence, không tự kết thúc do BMS alarm clear. Test tích hợp cùng FR-BMS-13/19/20/21/25/27 và WF-33/35/36; signed site permits vẫn là điều kiện triển khai.
<!-- BMS-INTEGRATED-3.0-END -->

