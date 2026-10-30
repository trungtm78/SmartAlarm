# SmartAlarm — Danh mục tương thích thiết bị vật lý

Ngày nghiên cứu: **2026-10-23**. Trạng thái: **ứng viên đã đối chiếu tài liệu; chưa tích hợp phần cứng, mua sắm hoặc nghiệm thu hiện trường**. Danh mục bổ sung WF-03, WF-14, WF-15 và WF-17. Bản tiếng Việt và tiếng Anh có cùng phạm vi và kết luận.

**Baseline thiết kế hiện tại: 3.0 · Tích hợp BMS: 24/10/2026. Giữ nguyên ngày nghiên cứu/yêu cầu gốc phía trên.**

## 1. Quyết định triển khai

Dùng giao diện được nhà sản xuất hỗ trợ để giám sát tủ báo cháy, bộ điều khiển bơm và tủ điều khiển xả hiện có. Giữ chức năng bảo vệ tự động cục bộ hoạt động độc lập với SmartAlarm. Kết nối giao thức, thuộc tính BACnet cho phép ghi, tín hiệu bơm chạy và xác nhận nước xả là bốn năng lực khác nhau. Không năng lực riêng lẻ nào chứng minh SmartAlarm được phép kích hoạt chữa cháy an toàn hoặc nước đã tới vùng nguy hiểm được bảo vệ.

Sáu ứng viên dưới đây là phương án thay thế hoặc thành phần bổ trợ, không phải một tổ hợp đã được chứng nhận. Tình trạng cung ứng, firmware chính xác, phê duyệt theo khu vực, phụ kiện và thao tác được phép cần hãng xác nhận theo dự án. Chứng nhận thành phần của hãng không chứng nhận toàn bộ hệ thống SmartAlarm lắp đặt.

## 2. Sáu ứng viên cụ thể

| ID / cấu hình sản phẩm | Giao diện và phản hồi có tài liệu | Ranh giới lệnh và điểm chưa xác nhận | Cách dùng SmartAlarm đề xuất |
|---|---|---|---|
| PHY-01 — Siemens Cerberus PRO FC922 / FC924; FCA2034-A1 S2 hoặc FCA2035-A1 S3 | FC922/FC924 được xác định trong [datasheet A6V10349710](https://sid.siemens.com/v/u/A6V10349710). [Datasheet phụ kiện Mỹ A6V10349679](https://support.industry.siemens.com/cs/attachments/109789153/A6V10349679.pdf) mô tả S2 BACnet chỉ giám sát; S3 vẫn chỉ giám sát BACnet, thêm điều khiển qua remote viewer riêng. | Không đồng nhất điều khiển remote viewer với điều khiển BACnet. Cần SKU khu vực, firmware, phạm vi license, PICS/export object và trạng thái hỗ trợ. Chưa chứng minh năng lực kích hoạt xả chữa cháy. | Đọc sự kiện/trạng thái qua edge adapter tại site; giữ ID tủ/điểm và chất lượng truyền thông. |
| PHY-02 — Honeywell NOTIFIER BACNET-GW-3 với NFS-320 / NFS2-640 / NFS2-3030 và giao diện NFN phù hợp | [DN-6877:C, 2014-08-04](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/literature-and-specs/datasheets/notifier-us/hon-ba-fire-dn-6877.pdf?download=false): object sự kiện BACnet/IP; tối đa 14 node NFN, 15,000 object; kết nối NCM/HS-NCM và cấu hình trình duyệt. | [Listing C6, 2019-02-21](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/regulatory-documents/fire-listings/notifier-us/ba-fire-LS10014-051NF-E.pdf) giới hạn chức năng bổ trợ, không dùng kích hoạt thông báo đại chúng. Xác nhận cung ứng/hỗ trợ hiện tại, firmware, chassis, nguồn và tủ tương thích chính xác. | Giám sát bổ trợ; không thay báo cháy chính hoặc coi đây là đường lệnh chữa cháy đã kiểm chứng. |
| PHY-03 — Simplex BACpac 4100-6111 với 4100ES / 4100U | [S4100-0051 Rev.6, 10/2020, trang 1–4](https://docs.johnsoncontrols.com/simplex/api/khub/documents/c9ua0rLXB39jxpiKI54Hsw/content): bản 15,000 điểm; module RS-232 4100-6038 mua riêng; BACnet IP/MS/TP hoặc Modbus TCP/RTU. Giao diện trạng thái bổ trợ. | PICS có WriteProperty; không chứng minh quyền ra lệnh xả tại tủ. Cần mapping điểm thực tế và ý nghĩa thao tác ghi được phép. Xác nhận phần mềm và phần cứng mua riêng. | Adapter chỉ đọc trạng thái cho cấu hình tủ đã ràng buộc cụ thể. |
| PHY-04 — Tornatech GPX điều khiển bơm chữa cháy điện, profile truyền thông V2 | [Bulletin Modbus GPx-V2](https://www.tornatech.com/wp-content/uploads/2018/08/GPx-V2.pdf) có phản hồi motor chạy, điện áp/dòng điện, áp suất và lỗi; cũng có mục mang tên khởi động từ xa/thủ công và tự động. | Map ngắn chưa mô tả đủ hàm ghi, điều kiện bật, tính lưu giữ hoặc retry. Không tự áp map V2 cho V2.1/firmware hiện tại. Cần hậu tố model, tùy chọn và hợp đồng register hiện hành. | Giám sát sức khỏe và nhu cầu bơm; tắt năng lực ra lệnh tới khi được hãng hỗ trợ và dự án duyệt kiểm chứng. |
| PHY-05 — Tornatech GPD điều khiển bơm chữa cháy diesel, profile truyền thông V2 | [Bulletin Modbus GPD-V2](https://www.tornatech.com/wp-content/uploads/2018/08/GPD-V2.pdf) riêng có động cơ chạy, ắc quy, áp suất, lỗi diesel và mục khởi động. | Không hoán đổi map GPX/GPD. Xác nhận firmware, giao diện động cơ, cảm biến lắp thực tế, register ghi và hành vi chế độ tự động/thủ công. Cảm biến thiếu phải giữ unknown. | Giám sát mức sẵn sàng diesel và trạng thái bơm bằng profile adapter riêng. |
| PHY-06 — Potter PFC-4410G3, mã hàng 3006735 | [5401600 Rev.B, 4/23](https://www.pottersignal.com/product/datasheet/5401600_PFC-4410G3.pdf): tủ xả pre-action/deluge; relay alarm, trouble, supervisory và xác nhận waterflow/discharge; lập trình Ethernet; P-Link RS-485 độc quyền. | Ethernet/P-Link không chứng minh API xả công khai. Xác nhận định mức output, chương trình chọn, solenoid tương thích, dây phản hồi và module relay tùy chọn. Không coi output xả là xác nhận nước chảy. | Đọc chỉ thị relay được duyệt qua giao diện có giám sát; tủ xả cục bộ làm chủ trình tự chữa cháy. |

Nghiên cứu chưa xác lập license giao diện bổ sung cho PHY-02–06; điều này không có nghĩa mọi cấu hình hoặc công cụ kỹ thuật đều miễn phí hay đã bao gồm. Cần BOM và xác nhận license đầy đủ.

## 3. Phát hiện về phiên bản và vòng đời ảnh hưởng triển khai

**Khác biệt khu vực Siemens.** [Catalog Siemens FC72x năm 2018](https://sid.siemens.com/api/khub/documents/IFS6rQE0Z_N43rKnuiSpCg/content) mô tả FCA2034-A1 có lệnh BACnet bên thứ ba cơ bản và FCA2035-A1 có lệnh mở rộng. Khác cách diễn đạt phụ kiện Mỹ phía trên. Vì vậy khóa adapter phải gồm họ tủ theo khu vực và firmware, không chỉ “Cerberus PRO” hoặc nhãn license. Chưa xác minh lệnh chính xác tại một site cụ thể.

**Ràng buộc mạng NOTIFIER.** [Manual LS10014-000NF-E:D2, 2019-04-30, trang 9](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/manuals-and-guides/installation-guides/notifier-us/ba-fire-LS10014-000NF-E.pdf) yêu cầu IP tĩnh, không hỗ trợ NAT. Topology đề xuất: đặt BACnet client trong mạng site được phép, xuất sự kiện chuẩn hóa ra ngoài; không giả định cấu hình cloud VPN/NAT được hỗ trợ.

**Có giao diện khởi động bơm vật lý thật.** [Manual GPX V2026.09 r0, trang 16](https://www.tornatech.com/pdf/Manuals/en/GPX-EN.pdf) của Tornatech mô tả đóng tiếp điểm khởi động thủ công từ xa và mở tiếp điểm khởi động tự động/deluge từ xa. Đây là đầu vào vật lý của controller, không chứng minh API cloud. [Trang GPX](https://www.tornatech.com/product/gpx-series-electric-fire-pump-controllers-3/) cũng nêu tiếp điểm cảnh báo từ xa. Cần bản vẽ đấu dây của công trình, định mức tiếp điểm, giám sát và hành vi khi lỗi trước khi thiết kế I/O.

[Manual GPD V2026.09 r0, trang 13–15](https://www.tornatech.com/pdf/Manuals/en/GPD-EN.pdf) riêng cũng mô tả khởi động từ xa bằng tiếp điểm. Dừng tự động mặc định không bật và cần cơ quan có thẩm quyền cho phép; commissioning phải do đơn vị được ủy quyền thực hiện. SmartAlarm không được thêm chức năng dừng từ xa chưa kiểm chứng.

**Chọn đúng thế hệ tủ xả.** [Catalog tủ xả chính thức Potter](https://www.pottersignal.com/special-hazard/releasing-panels) đánh dấu PFC-4410RC ngừng vòng đời sản phẩm. G3 là ứng viên mua mới, cần hãng xác nhận. [Trang sản phẩm](https://www.pottersignal.com/sprinkler/4410-conventional-releasing-panel) nêu giám sát email là tính năng không thuộc UL listing; không dùng làm đường truyền sự kiện an toàn. Dùng [manual G3 5403751 Rev.G, 11/25](https://www.pottersignal.com/product/manual/5403751_PFC-4410G3.pdf) và [danh sách thiết bị xả tương thích](https://www.pottersignal.com/product/manual/5403615_Compatible_Releasing_Device_List.pdf) để yêu cầu xác nhận tổ hợp tủ/solenoid/van chính xác. Danh mục này không phê duyệt cặp van nào.

## 4. Hợp đồng tích hợp đề xuất — thiết kế SmartAlarm, không phải tuyên bố hãng

Mỗi lắp đặt ràng buộc `manufacturer + regional_model + controller_serial + firmware + gateway_model + gateway_firmware + license + point_map_revision`. Mỗi điểm quan sát lưu địa chỉ nguồn, loại ngữ nghĩa, đơn vị kỹ thuật, timestamp nguồn nếu có, timestamp nhận, chất lượng và trạng thái truyền thông. Revision point map phải review và rollback được.

| Ngữ nghĩa đề xuất | Bằng chứng cần có | Không được suy ra |
|---|---|---|
| `fire_alarm_active` | Mapping điểm/trạng thái tủ hợp lệ | Confidence camera riêng lẻ không phải báo động của tủ |
| `pump_start_demand` | Tiếp điểm/register nhu cầu có tài liệu | Motor thực sự đang chạy |
| `pump_running` | Phản hồi chạy hợp lệ của controller | Đủ áp suất, lưu lượng hoặc đã dập cháy |
| `system_pressure` | Transducer lắp thực tế, đơn vị/scaling, hiệu chuẩn | Lưu lượng tại một vùng bảo vệ cụ thể |
| `release_output_active` | Phản hồi mạch/output xả có tài liệu | Van đã chuyển động hoặc nước đã xả |
| `waterflow_confirmed` | Phản hồi waterflow/áp suất đã commissioning và gắn zone | Đã dập cháy hoặc mọi vòi phun đều hoạt động |
| `communication_lost` | Giám sát link và timeout | Normal, safe, bơm dừng hoặc tác động vật lý thất bại |

Năng lực adapter mặc định là `observe`. Khả năng `request_start` hoặc lệnh khác cần hồ sơ capability ký duyệt riêng, mô tả thẩm quyền, thao tác chính xác, điều kiện, interlock cục bộ, TTL, chống trùng, phản hồi và khôi phục. Phản hồi chưa chắc chắn giữ `unknown`; reconnect không phát lại yêu cầu vật lý hết hạn. Không thêm reset/silence/disable/stop chỉ vì giao thức cho phép ghi.

## 5. RFI gửi hãng trước mua sắm

| RFI | Trả lời/bằng chứng bằng văn bản cần có |
|---|---|
| RFI-01 — Định danh và vòng đời | SKU khu vực, còn đặt hàng được không, ngày hết hỗ trợ, ma trận firmware, thay thế và phụ tùng |
| RFI-02 — Bộ cung cấp đầy đủ | Gateway/module, license, công cụ kỹ thuật, nguồn/backup, tủ, cách ly, bảo vệ và phạm vi commissioning được ủy quyền |
| RFI-03 — Hợp đồng đọc | PICS/register map hiện hành, loại sự kiện/trạng thái, giới hạn polling/subscription, quy ước địa chỉ, scaling, thứ tự/thời gian và ngữ nghĩa mất kết nối |
| RFI-04 — Hợp đồng lệnh | Thao tác cho phép/cấm rõ ràng; hàm/thuộc tính ghi; cấu hình bật; ngữ nghĩa đầu vào vật lý; ưu tiên cục bộ; TTL/replay; xác nhận và giới hạn rollback |
| RFI-05 — Tổ hợp vật lý | Tổ hợp van/solenoid/controller được duyệt, tải điện, trách nhiệm thiết kế thủy lực, vị trí cảm biến áp/lưu lượng, ma trận cause-and-effect và giám sát |
| RFI-06 — Nghiệm thu theo khu vực | Quy chuẩn/tiêu chuẩn và phiên bản được áp dụng, listing thành phần và giới hạn, phê duyệt của đơn vị thiết kế, yêu cầu AHJ/site; không tuyên bố tuân thủ quốc tế chung |
| RFI-07 — An ninh mạng/hỗ trợ | Phân đoạn mạng, credential, cập nhật được hỗ trợ, xử lý lỗ hổng, truy cập bảo trì, logging, hành vi khi gián đoạn và quy trình khôi phục |

## 6. Bằng chứng commissioning và cổng đưa vào sử dụng

Dưới đây là yêu cầu nghiệm thu SmartAlarm đề xuất, không thay kiểm thử bắt buộc của hãng hoặc địa phương.

1. Ghi serial, firmware, bằng chứng license, bản vẽ được duyệt, point map và cấu hình controller baseline. Phê duyệt toàn bộ ma trận cause-and-effect.
2. Trong bố trí thử được kiểm soát, xác minh từng chỉ thị alarm, supervisory, fault, nhu cầu/bơm chạy, áp suất, output xả và waterflow với hệ thống vật lý. Ghi trạng thái dự kiến/thực tế và timestamp.
3. Thử đứt link, restart adapter, dữ liệu cũ, sự kiện trùng, thay đổi nguồn/backup và reconnect. Xác minh bảo vệ tự động cục bộ vẫn hoạt động, sự kiện cũ không tạo lệnh ngoài ý muốn.
4. Nếu có lệnh được phép, kiểm tra điều kiện, đường từ chối, quyền ưu tiên cục bộ, mất phản hồi và khôi phục đã duyệt với đội hiện trường đủ năng lực. Không xả thật chỉ để kiểm tra kết nối phần mềm.
5. Có biên bản nghiệm thu nhà máy/site ký duyệt, hồ sơ hiệu chuẩn, đào tạo vận hành, chủ bảo trì và quy trình suy giảm/khôi phục bảo vệ được duyệt. Chỉ đánh dấu adapter `field_accepted` cho cấu hình chính xác đó.

Khuyến nghị mua sắm: trước hết ràng buộc với họ tủ/controller đang lắp, rồi mua giao diện được hỗ trợ và tùy chọn cần thiết. Với hệ thống chữa cháy nước xây mới, đơn vị thiết kế PCCC phải đặc tả hệ thủy lực và điều khiển xả trước khi chọn adapter SmartAlarm. Chưa mua hàng hoặc liên hệ hãng.

## 7. Sổ bằng chứng và giới hạn truy cập

Tất cả nguồn dưới đây được xem ngày **2026-10-23**. Ngày tài liệu là ngày revision của nhà xuất bản, không phải ngày truy cập. Có tài liệu trực tuyến không chứng minh còn hàng hoặc còn hỗ trợ. Chỉ nguồn nhà sản xuất hỗ trợ các tuyên bố sản phẩm; không dùng tuyên bố đại lý.

| Bằng chứng | Tài liệu / ngày của hãng | Truy cập và phạm vi |
|---|---|---|
| E01 | [Siemens A6V10349710](https://sid.siemens.com/v/u/A6V10349710); [A6V10349679](https://support.industry.siemens.com/cs/attachments/109789153/A6V10349679.pdf) | Tiêu đề/đoạn phụ kiện chính thức được lập chỉ mục; tải PDF trực tiếp bị chặn. Cần lấy revision cùng báo giá. |
| E02 | [Catalog Siemens FC72x](https://sid.siemens.com/api/khub/documents/IFS6rQE0Z_N43rKnuiSpCg/content), ©2018 | Đoạn license chính thức được lập chỉ mục; toàn bộ file vượt giới hạn trình duyệt. Chỉ chứng minh khác biệt khu vực, không phải hợp đồng lệnh hiện hành. |
| E03 | [NOTIFIER DN-6877:C](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/literature-and-specs/datasheets/notifier-us/hon-ba-fire-dn-6877.pdf?download=false), 2014-08-04 | Các đoạn datasheet chính thức được lập chỉ mục. |
| E04 | [NOTIFIER listing C6](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/regulatory-documents/fire-listings/notifier-us/ba-fire-LS10014-051NF-E.pdf), 2019-02-21; [manual D2](https://prod-edam.honeywell.com/content/dam/honeywell-edam/hbt/en-us/documents/manuals-and-guides/installation-guides/notifier-us/ba-fire-LS10014-000NF-E.pdf), 2019-04-30 | Đoạn giới hạn/cấu hình chính thức được lập chỉ mục; không tải trực tiếp được. Yêu cầu bản kiểm soát và revision hiện hành. |
| E05 | [Simplex S4100-0051 Rev.6](https://docs.johnsoncontrols.com/simplex/api/khub/documents/c9ua0rLXB39jxpiKI54Hsw/content), 10/2020 | Đọc PDF chính thức sáu trang; kiểm tra bảng lựa chọn và PICS. |
| E06 | [Tornatech GPx-V2](https://www.tornatech.com/wp-content/uploads/2018/08/GPx-V2.pdf); [GPD-V2](https://www.tornatech.com/wp-content/uploads/2018/08/GPD-V2.pdf) | Đọc map chính thức hai trang; xác minh V2, chưa xác lập ngày revision in trên tài liệu. Thư mục upload trong URL không bảo đảm revision. |
| E07 | [Tornatech GPX](https://www.tornatech.com/pdf/Manuals/en/GPX-EN.pdf); [GPD](https://www.tornatech.com/pdf/Manuals/en/GPD-EN.pdf), cùng V2026.09 r0 | Đọc manual chính thức, đặc biệt khởi động/dừng và commissioning; manual hiện tại tự nó không xác nhận map V2 cũ. |
| E08 | [Potter 5401600 Rev.B](https://www.pottersignal.com/product/datasheet/5401600_PFC-4410G3.pdf), 4/23; [5403751 Rev.G](https://www.pottersignal.com/product/manual/5403751_PFC-4410G3.pdf), 11/25 | Truy xuất datasheet/manual chính thức; xác minh giao diện và revision. |
| E09 | [Trang Potter G3](https://www.pottersignal.com/sprinkler/4410-conventional-releasing-panel); [catalog tủ xả](https://www.pottersignal.com/special-hazard/releasing-panels); [danh sách tương thích](https://www.pottersignal.com/product/manual/5403615_Compatible_Releasing_Device_List.pdf) | Đọc trang hãng hiện hành; link danh sách tương thích đã truy xuất nhưng lần tải tiếp bị timeout, nên không khẳng định cặp van/solenoid cụ thể. |

Khoảng trống bằng chứng là cổng mua sắm, không phải chứng minh không tương thích. Nghiên cứu xác định đường tích hợp khả thi và giới hạn cụ thể; không báo cáo đã hoàn thành interoperability hoặc chứng nhận triển khai.


## UX2-PHYSICAL · Giám sát trực quan và phản hồi vật lý

Console v2 dùng sơ đồ đường ống, van, bơm, vùng phủ và trạng thái thiết bị có nhãn. Yêu cầu lệnh, gateway tiếp nhận và hiệu ứng vật lý quan sát được là ba trạng thái riêng. Phản hồi chưa rõ hoặc đã cũ phải có ký hiệu, thời điểm; không hiển thị thành công màu xanh. Thao tác xem xét trong prototype không vận hành thiết bị. Quyền ưu tiên tại chỗ, liên động và điều kiện nghiệm thu thiết bị trong tài liệu này tiếp tục áp dụng.

Kiểm tra F08–F20 khi mất liên lạc, trạng thái tại chỗ xung đột hoặc phản hồi trễ. Truy cập sơ đồ không được bỏ qua quyền điều khiển. Loa báo phát không chứng minh mọi người đã nghe. Drone/robot nhận nhiệm vụ không chứng minh đã đến hoặc cứu được người.

Tham chiếu [thiết kế UI/UX](UIUX-Design.html), [đặc tả màn hình](Screen-Specifications.html) và [rà soát thiết kế](UX-Redesign-Audit.html).


<!-- BMS-INTEGRATED-3.0-BEGIN -->
## 8. Thiết bị qua BMS — phương án triển khai và qualification

Nguồn BMS là một đường quan sát/điều phối tới hệ vật lý, không thay thế hồ sơ tương thích controller. Đăng ký cả native device identity và BMS mirror path; một panel được đọc trực tiếp và qua BMS vẫn là một nguồn vật lý. F01/F07/F08 hiển thị đường nguồn, thời điểm, quality và mapping revision; BMS03 giữ lineage khi alarm qua nhiều đường.

### Profile theo hãng được đưa vào catalog hiện hữu

| Profile | Sản phẩm và giao diện | Dữ kiện và điều kiện |
|---|---|---|
| `bms.siemens.desigo-wsi` | Desigo CC<br>REST / WSI subscriptions | Specification V8 nêu REST đọc/ghi, event và history. WSI auth có session/heartbeat theo phiên bản; northbound OPC được xác minh là DA, không phải UA. Cần project/extension, HTTPS, PICS nếu chọn BACnet. [Siemens WSI](https://sid.siemens.com/r/A6V14948151/29540941067___en-US_29542478475?contentId=l64oBrPVORrEbx6beXKzjw) |
| `bms.schneider.ebo-ews` | EcoStruxure Building Operation<br>SOAP EWS / SmartConnector REST | Guide SmartConnector2.6/EWS1.2 kiểm với EBO7.1.2: EBO từ3 dùng SoapEwsRestProvider. Không giả định root discovery/bulk. ACK áp dụng alarm event; không đồng nghĩa đổi toàn bộ trạng thái alarm. [EBO EWS](https://github.com/SchneiderElectricBuildings/SmartConnector/blob/main/docs/developer-guide/smartconnector-restful-ews-gateway.md) |
| `bms.jci.metasys-rest` | Metasys<br>Version-pinned REST / SSE | API v6 mô tả objects, command schema, alarms, histories và SSE. Phải kiểm từng kết quả batch, không chỉ HTTP200. Monitoring and Commanding cần license riêng; không suy API tương thích từ tên Metasys. [Metasys API](https://jci-metasys.github.io/api-landing/api/v6-16) |
| `bms.honeywell.ebi-api` | Enterprise Buildings Integrator<br>Vendor SDK / web services | EBI2025 giới thiệu enterprise web services nhưng trang public chưa đủ contract triển khai. Guide-spec R600 cũ có OPC DA/A&E/HDA và API; không dùng để khẳng định EBI2025 có REST hoặc UA tương đương. [EBI](https://buildings.honeywell.com/gb/en/solutions/integrated-operations/ebi) |
| `bms.honeywell.webs-niagara` | WEBs N4<br>Niagara OEM station interface | WEBs dựa trên Niagara và phải dùng profile OEM riêng. Module, station exports, quyền và license quyết định capability; không tái sử dụng EBI API. [WEBs N4](https://www.honeywellbuildings.com/bms/building-control-system/honeywell-webs) |
| `bms.tridium.niagara-local` | Niagara local station / Supervisor<br>Qualified oBIX / licensed module | Tài liệu Supervisor4.6 và catalog driver2025 có oBIX. Module REST marketplace là capability riêng, không phải REST phổ quát mặc định. Alarm ACK phải có contract đã xác minh. [Niagara local](https://pages1.tridium.com/rs/808-SGM-271/images/Niagara%204.6%20Supervisor_DataSheet_VYKON.pdf) |
| `bms.tridium.nds-cloud` | Niagara Data Service<br>Cloud API | NDS là dịch vụ cloud riêng: histories/tags, live read/write và alarm queries. Prerequisites gồm SMA và reseller. Chưa xác nhận API alarm ACK; không dùng WAN cloud làm đường dự phòng cho điều khiển critical tại chỗ. [Niagara Data Service](https://www.tridium.com/us/en/Products/niagara-cloud-suite/niagara-data-service) |
| `bms.delta.enteliweb` | enteliWEB<br>Vendor API / BACnet Web Services | Catalog4.23, cập nhật11/2022, có add-on -API. Phải xác nhận entitlement hiện tại; brochure không đủ authentication, endpoint và lifecycle contract để viết driver. [enteliWEB](https://deltacontrols.com/wp-content/uploads/enteliWEB-Catalog-Sheet.pdf) |
| `bms.alc.webctrl-events` | WebCTRL event/telemetry integration<br>Outbound GET/POST / MQTT add-on | Sheet2025 nêu alarm REST và outbound GET/POST khi alarm xảy ra; MQTT là add-on. Không suy từ outbound event rằng có REST command point hoặc native ACK. Scope khởi đầu là nhận alarm/telemetry. [WebCTRL](https://www.automatedlogic.com/en/media/WebCTRL%20Open%20Integrations%20Platform_110325_tcm702-284058.pdf) |
| `bms.alc.webctrl-soap-sdk` | WebCTRL SOAP / SDK<br>SOAP / licensed Java SDK | SOAP cần method contract đúng phiên bản; license JavaSDK được xác định theo từng trường hợp. Đọc, ACK, command và lịch sử phải kiểm theo method và scope tài khoản. [WebCTRL SDK](https://www.automatedlogic.com/en/media/WebCTRL%20Open%20Integrations%20Platform_110325_tcm702-284058.pdf) |
| `bms.distech.ecnet-niagara` | EC-Net Facilities / EC-Net4<br>Niagara OEM station interface | EC-Net Facilities là tên mới của EC-Net4, dựa trên Niagara. ECLYPSE REST thuộc dòng controller; không coi là EC-Net Supervisor API. Cần xác minh OEM module và station access. [EC-Net](https://www.distech-controls.com/de-de/products/detail/947839/distech-controls/ec-net-facilities) |

### Quy tắc cho các hệ cơ điện

| Phân hệ | Dữ liệu cần map | Ranh giới điều khiển và nghiệm thu |
|---|---|---|
| Fire panel / releasing | Alarm/trouble/supervisory, occurrence, zone, inhibit, local state | BMS mirror không được biến thành quyền reset/silence/release. Chỉ giao diện, model và cause-and-effect đã duyệt mới xét command. |
| Bơm/van/bể/flow | Run contact, pressure, valve limit, tank level, waterflow, quality/source time | Run/valve-open không chứng minh đủ lưu lượng. Dùng quan sát độc lập và expected effect; unknown phải giữ unknown. |
| HVAC / smoke control | Fan command vs run, damper command vs limit, smoke zone, override | Comfort HVAC và smoke-control mode có quyền khác. Không tự tắt/bật quạt theo alarm bằng rule chưa được kỹ sư site duyệt. |
| Door / access / lift | Door contact, lock state, accessibility, lift availability/recall status | Door-open không chứng minh route an toàn; lift available không chứng minh dùng được khi cháy. Không bypass controller interlocks. |
| PA / exit signage | Zone/group, emergency priority, device report, playback/fault | BMS signal là trigger đủ điều kiện theo rule, không thay PA supervision hoặc intelligibility acceptance. |

### Hồ sơ bắt buộc để triển khai một đường BMS

Lưu manufacturer/model/firmware của controller vật lý, BMS product/build, interface/provider và license, endpoint/principal scope, raw address và byte order nếu có, units/enum/status mapping, topology, update semantics, latency/freshness budgets, read-only fixtures, command allowlist nếu có, local priority/override, expected feedback và test permits. F17 giữ bundle hash/revision và sign-off. JSON profiles nghiên cứu là design-only; runtime admission phải gắn evidence cho đúng tổ hợp này. Không dùng brochure hoặc BTL listing để suy quyền command theo method.
<!-- BMS-INTEGRATED-3.0-END -->

