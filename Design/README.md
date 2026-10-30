# SmartAlarm — Bản thiết kế UI/UX 2.0

Cập nhật 24/10/2026. Thiết kế trực quan được đồng bộ với bộ tài liệu và proposal Việt–Anh.

- 233 màn hình, 33 workflow; giao diện Việt/Anh/Nhật.
- 699 lượt màn hình/ngôn ngữ trên trình duyệt; không ghi nhận lỗi JavaScript hoặc tràn ngang.
- Ghi riêng 48 kiểm tra trạng thái tuyến và 60 kiểm tra bố cục di động.
- 21 kiểm tra tương tác: sửa/xác nhận SOS, bàn phím hộp thoại, lớp bản đồ, thu hồi tuyến/voice và chế độ kín đáo.
- 233 đặc tả nghiệm thu UX theo màn hình; đây là kế hoạch kiểm chứng với người dùng, chưa phải nghiên cứu đã thực hiện.
- Mỗi proposal 166 slide, giữ đầy đủ phụ lục chức năng.

Prototype sử dụng dữ liệu minh họa. Kiểm tra trình duyệt không chứng minh mức độ hiểu của người dùng, gửi tin thật, hiệu quả chữa cháy vật lý hoặc sẵn sàng vận hành hiện trường.

[Visual review](UX-Review.html) · [Gallery](Gallery.html) · [UI/UX](UIUX-Design.html) · [Screen specifications](Screen-Specifications.html) · [Audit](UX-Redesign-Audit.html)

---

# SmartAlarm — Hướng dẫn bộ hồ sơ

Baseline 2.0 · 23/10/2026 · Tiếng Việt

## Bắt đầu

Mở `index.html` để đọc hồ sơ, `Proposal.html` để xem proposal được render trực tiếp từ PowerPoint, hoặc `Gallery.html` để tra cứu toàn bộ 233 màn hình. Bộ tiếng Anh nằm trong thư mục `English` và liên kết từ trang chủ.

## Phạm vi đã thiết kế

Nền tảng quốc tế, đa tổ chức và đa ngành; cảnh báo cháy, thiên tai, té ngã, tai nạn giao thông và nhiều loại SOS; định vị trong/ngoài nhà; tuyến thoát hiểm theo nguy cơ, năng lực di chuyển và độ tin cậy dữ liệu; hướng dẫn VI/EN/JA bằng giọng nói; PA, drone và thiết bị cứu hộ; hồ sơ sức khỏe/chức năng và cứu hộ chủ động khi chưa có SOS; AI có bằng chứng và kiểm soát con người.

Tích hợp vật lý gồm tủ báo cháy, nguồn nước, bơm/tủ bơm, van, waterflow, sprinkler, deluge/pre-action, releasing controller, hút khói, cửa/biển thoát hiểm, loa khẩn cấp và robot/vòi phun. Tài liệu phân biệt giám sát, lệnh được cho phép và phản hồi vật lý; automation tại chỗ, local override, UNKNOWN, impairment và FAT/SAT.

## Nội dung bàn giao

- 12 tài liệu chuyên biệt có Markdown, HTML và PDF; master tổng hợp 11 tài liệu (đặc tả màn hình là tập riêng).
- Proposal PowerPoint và PDF tiếng Việt/Anh, có phụ lục toàn bộ chức năng, luồng và các yêu cầu nền.
- 233 màn hình, 33 workflow, 466 ảnh mockup VI/EN; prototype có lựa chọn VI/EN/JA.
- 298 tiêu chí nghiệm thu được thiết kế: 65 tiêu chí xuyên hệ thống và 233 tiêu chí theo màn hình.
- API, sự kiện, connector manifest, design tokens và danh mục màn hình dạng dữ liệu.
- Hai catalog nghiên cứu thiết bị và hồ sơ tiêu chuẩn/triển khai có nguồn hãng, giới hạn, RFI và tiêu chí kiểm chứng.

## Sử dụng để triển khai

Đọc BRD → FRD → Basic Design → Detail Design. Đối chiếu ID workflow và FR với Screen Specifications và Acceptance Matrix. Chọn cấu hình thiết bị theo catalog, khảo sát site, xác minh capability với nhà cung cấp, chốt cause-and-effect và thực hiện FAT/SAT trước khi bật điều khiển. Các giá trị năng lực/SLO là mục tiêu thiết kế, cần kiểm chứng bằng triển khai và đo tải thực tế.

Hình toàn cảnh là minh họa đề xuất, không phải bản vẽ lắp đặt hoặc ảnh nghiệm thu. Nội dung chữ, sơ đồ và UI native trong PPTX có thể sửa; cảnh phối là ảnh raster. Giữ logo và phong cách AIPOWER từ file gốc theo yêu cầu.

## Trạng thái kiểm chứng

Đã kiểm tra tài liệu, bản xuất, liên kết và prototype. Chưa xây dựng backend production, chưa kết nối thiết bị thật, chưa chạy FAT/SAT hoặc chứng nhận hiện trường. Danh sách chức năng là baseline thiết kế đầy đủ của phạm vi hiện tại, không hàm ý mọi connector đã triển khai.
