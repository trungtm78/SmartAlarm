# SmartAlarm — Kiểm toán UX và hợp đồng thiết kế lại

**Mốc quyết định: 23/10/2026 · Toàn bộ 233 màn hình · Tiếng Việt**

## Kết luận điều hành

SmartAlarm cần giao diện khác nhau cho người thoát hiểm, cứu hộ, chỉ huy và quản trị cấu hình. Thẻ dữ liệu cùng đoạn mô tả lặp lại không thể hiện công việc riêng. Thiết kế mới đặt nguy cơ, vị trí, bằng chứng và hành động lên trước chi tiết. Giữ toàn bộ mã, vai trò, trường, hành động và đích chuyển màn.

Đây là đặc tả thiết kế, **không phải kết quả thử người dùng**, chứng minh thoát hiểm an toàn, tuyên bố đạt WCAG hoặc vận hành thật. Nhận biết trong ba giây là **giả thuyết cần thử**, chưa đạt bằng chứng. Dữ liệu và biên nhận mô phỏng phải rõ. JSON có một bản ghi song ngữ cho mỗi màn cùng hợp đồng gốc. Bối cảnh không thay đổi phân quyền.

## 1. Bằng chứng và lỗi cụ thể

Đã đọc Screen-Registry.json, prototype.js, UIUX-Design.md và Screen-Specifications.md. Tài liệu gốc đã nêu phân vai và bất định; renderer cũ chưa hiện thực nhất quán.

| Bằng chứng | Hệ quả | Sửa bắt buộc |
|---|---|---|
| content(s) chủ yếu chọn bố cục theo s.type. | Công dân, chỉ huy, bảo trì dùng thẻ tương tự dù quyết định khác. | Bố cục theo vai trò, nhiệm vụ; tái dùng thành phần nhỏ. |
| floor(s), map(s) vẽ cùng tầng, tuyến, khuôn viên cố định. | Hình giống bản đồ có thể bị hiểu là dữ liệu tình huống. | Gắn hình học với nguồn, bối cảnh; ghi minh họa; có danh sách tương đương. |
| render() đưa quy tắc SMARTALARM.rules vào phụ đề bản dịch. | Quy tắc nội bộ cạnh tranh chỉ dẫn khẩn. | Đưa quy tắc vào đặc tả, inspector; sản phẩm nêu việc gì, ở đâu, làm gì. |
| ui.fresh cố định “Updated 8s ago”. | Dữ liệu có vẻ luôn mới. | Thời điểm mô phỏng rõ hoặc tuổi quan sát thật; tách lúc tải. |
| Ký hiệu chung và chấm màu lặp. | Buộc học mã tùy ý lúc áp lực. | Biểu tượng có nhãn cho người, chặn đường, lánh nạn, loa, điều khiển. |
| Mobile dùng chung điều hướng công dân, cứu hộ. | Nhiệm vụ, từ chối, trợ giúp, bản chữ, hộp chờ khó tìm. | Điều hướng theo vai trò; kiểm tra lựa chọn khẩn ở màn hẹp. |
| Một thông báo chung thay nội dung không sẵn sàng. | SOS ngoại tuyến, tuyến cũ, y tế bị từ chối giống nhau. | Nêu đúng năng lực mất, bằng chứng giữ và bước hợp lệ. |
| Thiếu thu hồi tuyến, hướng chưa rõ, đối soát vật lý. | Luồng thuận che quyết định quan trọng. | Thêm và thử chuyển trạng thái nghiệp vụ. |
| Nút chỉ báo mô phỏng rồi chuyển màn. | Có thể bị hiểu là giao nhận hoặc thực thi thật. | Tách ý định, máy chủ nhận, người tiếp nhận, tác động vật lý. |

Đây là quan sát mã và rủi ro thiết kế, không phải hậu quả đo được. Đọc mã không xác nhận hiểu nghĩa, thao tác chạm hay trình đọc màn hình.

## 2. Thứ bậc theo vai trò

| Giao diện | Nhìn trước | Hình chính | Hành động, chi tiết |
|---|---|---|---|
| Công dân nguy cấp | Nguy cơ, nơi, một chỉ dẫn | Mốc hoặc tầng liên quan có bất định | Trợ giúp, SOS hoặc bước xác minh; tiếng, chữ, nhập tay luôn tìm được |
| Công dân thường ngày | Cảnh báo và bản thân, gia đình | Tóm tắt khu vực, người có nhãn | Cảnh báo trước; nhóm và riêng tư ngoài luồng khẩn |
| Cứu hộ | Nhiệm vụ, đích, nguy cơ | Tiếp cận, tầng, người cần giúp | Nhận, từ chối, đến, quan sát, bàn giao; hộp chờ |
| Chỉ huy | Ưu tiên, chưa đáp, phụ trách | Bản đồ, hàng đợi, làn đội | Điều phối, cảnh báo theo sự cố; lịch sử mở rộng |
| Loa | Vùng, bản tin duyệt, ưu tiên | Phủ loa và chuỗi bằng chứng | Xem, duyệt, dừng theo quyền; ưu tiên cục bộ |
| Vật lý | Thiết bị, thẩm quyền, bằng chứng | Điều khiển và nguyên nhân, tác động | Cổng duyệt, đối soát; không bỏ liên động |
| Chăm sóc | Nhu cầu, phơi nhiễm, lần thấy cuối | Ghép năng lực, ma trận hiện diện | Phân giúp; y tế kiểm quyền riêng |
| Cơ sở, kết nối | Đối tượng, phiên bản, tác động | Đồ thị, ánh xạ, đối chiếu | Nháp, thử, duyệt, công bố |
| Nền tảng, lập trình, ngôn ngữ | Phạm vi, hiệu lực | Tương thích, trace, vùng, dịch song song | Cổng sandbox, phát hành, công bố; giữ bí mật |

Không phải mọi màn cần bản đồ: T04 cần ma trận quyền; D02 yêu cầu, phản hồi; L03 đối chiếu phiên bản.

## 3. Cấu trúc khẩn cấp và chính sách thị giác

Thứ tự: **việc gì → ở đâu → làm gì ngay → điều gì chưa chắc**. Khung đầu có hành động chính và lựa chọn thay thế cần thiết. Nút lớn không đẩy tầng hoặc hiệu lực tuyến xuống ngoài màn. Biểu tượng luôn kèm nhãn ngắn; màu không mang nghĩa duy nhất.

Dùng sơ đồ cho không gian và thiết bị; không ảnh trang trí, lửa kịch tính hay nền điện ảnh trong thao tác khẩn. Camera bằng chứng cần quyền, thời điểm, nguồn, chú thích. Bản vẽ prototype chỉ minh họa, không phải khảo sát.

Vị trí có nguồn, thời điểm, sai số. Hướng chưa rõ phải bỏ mũi tên; dùng mốc đã xác minh, mặt bằng không phụ thuộc hướng, chỉnh tay, trợ giúp. Tầng chưa rõ, đoạn chặn, nguy cơ cũ, tuyến thu hồi là các trạng thái riêng. Thu hồi hình tuyến và lời đọc cũ đồng thời; chỉ ghi tuyến thay thế duyệt khi đúng phiên bản được duyệt.

SOS cho phép vị trí chưa rõ, nhập tay. Lưu máy, máy chủ nhận, đội tiếp nhận, giải quyết khác nhau. Tự báo an chỉ theo người, nhóm nhận, thời điểm; không suy gia đình hoặc cả sự cố an toàn. Thẩm quyền cục bộ, liên động và bàn giao vẫn áp dụng khi cloud, mạng lỗi.

## 4. Phát hiện theo miền

- **A:** rõ vùng, tổ chức, vai trò; thu hồi nêu đúng thiết bị, tác động; xem trợ năng trước khẩn.
- **C:** tách home, cảnh báo, SOS, chỉ dẫn, nhóm. C35–C39 có trạng thái tuyến; C25 đáp té ngã rõ; C27 tôn trọng kín đáo.
- **R:** hạn nhận, chủ nhiệm trước điều hướng; quan sát, hộp chờ, bàn giao riêng; không mất ghi chú khi đồng bộ.
- **O:** SOS mở, người chưa rõ cạnh năng lực; nối đối tượng cảnh báo, phiên bản, giao nhận; O35/O36 có thu hồi và người mất liên lạc.
- **S:** bản công bố khác nháp; so mặt bằng, cạnh trợ năng, hiệu chuẩn, ca thử, thiếu phủ.
- **I:** năng lực và ranh giới tin cậy; thử giả tổ chức, trùng, chứng chỉ hết; drone thuộc phi công và an toàn cục bộ.
- **T:** ma trận quyền, thang tăng cấp, lưu giữ, năng lực; nêu phần dự trữ SOS.
- **X:** phục hồi riêng từng việc; X01 giữ SOS chờ, X02 nhập tay, X09 dữ liệu cũ và lệnh không có.
- **G:** vùng, writer rõ, không lộ tenant; khôi phục, quyền hỗ trợ, rollback là cổng riêng.
- **D:** yêu cầu, phản hồi, trace, phiên bản; sandbox rõ, không lộ khóa khi sao chép.
- **L:** nguồn, dịch, biến, lời đọc khớp; thiếu khẩn hoặc nguồn cũ chặn công bố.
- **P:** phủ, phiên bản, ưu tiên, dừng; nhận khác nghe; giữ ưu tiên cục bộ và mất nối.
- **H:** ghép nhu cầu chức năng; y tế riêng; dự kiến, quan sát và chưa rõ khác nhau.
- **Q:** bằng chứng, bất định cạnh đề xuất; cả tuyến loại; AI có nguồn, cutoff, quyền người.
- **F:** sơ đồ, lệnh chính xác, phản hồi thật; chưa rõ thì đối soát; năng lực không thành quyền điều khiển mọi thứ.

## 5. Trợ năng và ngôn ngữ

WCAG 2.2 là tham chiếu trợ năng. Mẫu nhận thức WAI hỗ trợ thiết kế, không tạo cấp tuân thủ. Nhãn rõ cạnh điều khiển giúp hiểu. Mục tiêu tối thiểu WCAG là 24 × 24 CSS px với ngoại lệ; dự án đặt 48–56 CSS px cho khẩn, hiện trường, 44 CSS px thường và phải đo thực. [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Kích thước tối thiểu](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [Nhãn nhìn thấy](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p06-clear-labels/).

Thử bàn phím, focus không che, tên lập trình khớp nhãn, báo trạng thái, phóng chữ, reflow 320 CSS px. Đo tương phản chữ thường 4,5:1; chữ lớn và phi văn bản áp dụng 3:1. Danh sách thay bản đồ có cùng thực thể, quyết định, không buộc nhìn hoặc kéo. Token không tự chứng minh đạt.

Thêm hình, họa tiết, chữ cạnh màu; thử đơn sắc, khiếm sắc. Giảm chuyển động bỏ phần không thiết yếu; không dựa nhấp nháy liên tục. Giọng có bản chữ, nghe lại, dừng. Thử một tay trên thiết bị chạm, khả năng với tới và bấm nhầm.

VI/EN có người thông thạo duyệt; giữ và hồi quy JA. Thử dịch dài, dấu Việt, vị trí nhiều hệ chữ. Thử biểu tượng nhỏ, lạ không nhãn để tìm mơ hồ rồi kèm nhãn trong nhiệm vụ. Không tuyên bố biểu tượng phổ quát, được chứng nhận khi thiếu bằng chứng.

## 6. Nghiên cứu có kiểm soát — đề xuất, chưa làm

Mời công dân, cứu hộ, điều phối, vận hành cơ sở, vật lý, gồm người lớn tuổi, thị lực yếu, nhu cầu nhận thức, một tay và ngôn ngữ thứ hai. Có đồng ý, mô phỏng không gây đau khổ, quyền dừng; không tạo nguy hiểm hoặc gửi cảnh báo thật.

Cân bằng thứ tự cũ, mới và kịch bản; giữ dữ kiện và lựa chọn tương đương. Đo thời gian, độ đúng nhận nguy cơ, nơi, bước tiếp; hoàn tất việc; hiểu nhầm chưa rõ, cũ, chờ thành an toàn, đã nhận; bấm nhầm tác động; phục hồi sau thu hồi tuyến, mất hướng, SOS ngoại tuyến, tác động chưa rõ. Báo trung vị, đuôi thời gian, lỗi, cỡ mẫu, khoảng tin cậy phù hợp; không che khác biệt vai trò trong trung bình.

Ba giây là mục tiêu xem ngắn, sau đó người dùng giải thích. Nhanh mà sai là không đạt. Chốt ngưỡng trước nghiên cứu cùng người trách nhiệm an toàn theo rủi ro, pilot. Hiểu nhầm nguy hiểm cần điều tra; không lỗi trong mẫu nhỏ không chứng minh an toàn.

So biểu tượng riêng, kèm nhãn; mobile, desktop; giảm chuyển động, chuẩn; tiếng mẹ đẻ, ngôn ngữ thứ hai. Thử công nghệ hỗ trợ và thao tác một tay thật. Xem ảnh không thay các phiên này.

## 7. Cổng kiểm chứng và nguồn

1. Đúng 233 mã duy nhất, giữ trường, vai trò, hành động, đích, quy tắc, luồng.
2. Chạy kiểm tra từng màn, ghi dữ liệu, viewport, ngôn ngữ, cách nhập, kỳ vọng, quan sát.
3. Thử C03/C35–C39 thu hồi; C07/X01 SOS chờ; O18/O19/F09–F13 quyền và chưa rõ; P04 âm học; H10 hiện diện.
4. Render VI/EN, màn hẹp, chữ lớn; thử focus, nhãn, tương phản, chạm; lưu ảnh, lỗi.
5. Thực hiện nghiên cứu trước tuyên bố thời gian nhận biết.
6. Nghiệm thu riêng phân quyền thật, liên động, kết nối, thời điểm, thiết bị. Chuyển màn prototype không chứng minh các hệ này.

HSE nhấn mạnh cảnh báo liên quan, phản ứng xác định và giới hạn con người; hỗ trợ ưu tiên hành động, trách nhiệm, kiểm soát ngập cảnh báo. Hướng dẫn công nghiệp không chứng nhận SmartAlarm hay thay đánh giá cơ sở. [HSE quản lý cảnh báo](https://www.hse.gov.uk/humanfactors/topics/alarm-management.htm). WAI khuyến khích làm rõ đối tượng, cách dùng; phân bố theo vai trò là diễn giải dự án. [WAI hiểu nội dung](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/).

Nguồn được kiểm tra cho đánh giá ngày **23/10/2026**. Không nguồn ngoài nào chứng minh khả dụng prototype này.

## 8. Ma trận thiết kế lại từng màn

Mỗi mục là nghĩa vụ thiết kế. JSON giữ trường, quy tắc, luồng, chuyển màn gốc. Chi tiết thu gọn phải tìm được, mở bằng bàn phím; ràng buộc khẩn ở lớp quyết định.


### A01 — Chọn vùng và ngôn ngữ

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-A01

**Hình chính:** Bộ chọn vùng với mẫu ngôn ngữ và xem trước cỡ chữ

**Câu hỏi chính:** Trong “Chọn vùng và ngôn ngữ”, Vùng dữ liệu, Ngôn ngữ cho biết điều gì và vai trò Citizen có thể thực hiện “Continue” trong phạm vi này không?

**Hành động chính:** Tiếp tục → A02

**Chi tiết mở rộng:** Giữ Vùng dữ liệu, Ngôn ngữ ở lớp quyết định. Đưa chi tiết hỗ trợ của Khả năng tiếp cận, lịch sử nguồn, phiên bản và quy tắc FR-A01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Chọn vùng và ngôn ngữ” cho Citizen; đổi Vùng dữ liệu và làm Khả năng tiếp cận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Continue” chỉ tới A02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A02 — Đăng nhập

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A02

**Hình chính:** Nhận diện tổ chức cạnh lối vào passkey và SSO

**Câu hỏi chính:** Trong “Đăng nhập”, Email, Không gian làm việc cho biết điều gì và vai trò All roles có thể thực hiện “Sign in” trong phạm vi này không?

**Hành động chính:** Đăng nhập → A03

**Chi tiết mở rộng:** Giữ Email, Không gian làm việc ở lớp quyết định. Đưa chi tiết hỗ trợ của Phương thức, lịch sử nguồn, phiên bản và quy tắc FR-A02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Đăng nhập” cho All roles; đổi Email và làm Phương thức không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Sign in” chỉ tới A03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A03 — Xác minh danh tính

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A03

**Hình chính:** Phương thức xác minh và ô mã với phản hồi số lần thử

**Câu hỏi chính:** Trong “Xác minh danh tính”, Phương thức, Mã xác minh cho biết điều gì và vai trò All roles có thể thực hiện “Verify” trong phạm vi này không?

**Hành động chính:** Xác minh → A04

**Chi tiết mở rộng:** Giữ Phương thức, Mã xác minh ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị tin cậy, lịch sử nguồn, phiên bản và quy tắc FR-A03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Xác minh danh tính” cho All roles; đổi Phương thức và làm Thiết bị tin cậy không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Verify” chỉ tới A04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A04 — Chọn không gian làm việc

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A04

**Hình chính:** Thẻ tổ chức ghi vùng dữ liệu và vai trò trước khi vào

**Câu hỏi chính:** Trong “Chọn không gian làm việc”, Northstar, Harbor Campus cho biết điều gì và vai trò All roles có thể thực hiện “Enter workspace” trong phạm vi này không?

**Hành động chính:** Vào tổ chức → O01

**Chi tiết mở rộng:** Giữ Northstar, Harbor Campus ở lớp quyết định. Đưa chi tiết hỗ trợ của Personal, lịch sử nguồn, phiên bản và quy tắc FR-A04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Chọn không gian làm việc” cho All roles; đổi Northstar và làm Personal không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Enter workspace” chỉ tới O01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A05 — Khôi phục truy cập

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A05

**Hình chính:** Chọn cách khôi phục và biên nhận đích đã che

**Câu hỏi chính:** Trong “Khôi phục truy cập”, Email, Phương thức khôi phục cho biết điều gì và vai trò All roles có thể thực hiện “Send recovery link” trong phạm vi này không?

**Hành động chính:** Gửi liên kết khôi phục → A02

**Chi tiết mở rộng:** Giữ Email, Phương thức khôi phục ở lớp quyết định. Đưa chi tiết hỗ trợ của Yêu cầu, lịch sử nguồn, phiên bản và quy tắc FR-A05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Khôi phục truy cập” cho All roles; đổi Email và làm Yêu cầu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send recovery link” chỉ tới A02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A06 — Chấp nhận lời mời

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A06

**Hình chính:** Danh tính lời mời, phạm vi vai trò và hạn dùng

**Câu hỏi chính:** Trong “Chấp nhận lời mời”, Tổ chức, Vai trò cho biết điều gì và vai trò All roles có thể thực hiện “Accept invitation” trong phạm vi này không?

**Hành động chính:** Nhận lời mời → A07

**Chi tiết mở rộng:** Giữ Tổ chức, Vai trò ở lớp quyết định. Đưa chi tiết hỗ trợ của Vùng dữ liệu, Lời mời, lịch sử nguồn, phiên bản và quy tắc FR-A06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Chấp nhận lời mời” cho All roles; đổi Tổ chức và làm Lời mời không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Accept invitation” chỉ tới A07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A07 — Quyền truy cập và đồng ý

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-A07

**Hình chính:** Các công tắc quyền riêng biệt kèm biểu tượng mục đích

**Câu hỏi chính:** Trong “Quyền truy cập và đồng ý”, Thông báo, Vị trí cho biết điều gì và vai trò Citizen có thể thực hiện “Save choices” trong phạm vi này không?

**Hành động chính:** Lưu lựa chọn → C01

**Chi tiết mở rộng:** Giữ Thông báo, Vị trí ở lớp quyết định. Đưa chi tiết hỗ trợ của Chia sẻ khẩn cấp, Camera, lịch sử nguồn, phiên bản và quy tắc FR-A07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Quyền truy cập và đồng ý” cho Citizen; đổi Thông báo và làm Camera không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save choices” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A08 — Phiên và thiết bị đăng nhập

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A08

**Hình chính:** Hình thiết bị với nhãn phiên hiện tại và hoạt động cuối

**Câu hỏi chính:** Trong “Phiên và thiết bị đăng nhập”, This device, Work tablet cho biết điều gì và vai trò All roles có thể thực hiện “Review session” trong phạm vi này không?

**Hành động chính:** Xem phiên → A09

**Chi tiết mở rộng:** Giữ This device, Work tablet ở lớp quyết định. Đưa chi tiết hỗ trợ của Old phone, lịch sử nguồn, phiên bản và quy tắc FR-A08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Phiên và thiết bị đăng nhập” cho All roles; đổi This device và làm Old phone không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review session” chỉ tới A09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A09 — Thu hồi phiên đăng nhập

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A09

**Hình chính:** Thiết bị được chọn và xác nhận tác động thu hồi

**Câu hỏi chính:** Trong “Thu hồi phiên đăng nhập”, Thiết bị, Tác động cho biết điều gì và vai trò All roles có thể thực hiện “Revoke selected session” trong phạm vi này không?

**Hành động chính:** Thu hồi phiên đã chọn → A08

**Chi tiết mở rộng:** Giữ Thiết bị, Tác động ở lớp quyết định. Đưa chi tiết hỗ trợ của Lý do, lịch sử nguồn, phiên bản và quy tắc FR-A09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Thu hồi phiên đăng nhập” cho All roles; đổi Thiết bị và làm Lý do không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Revoke selected session” chỉ tới A08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### A10 — Hồ sơ và khả năng tiếp cận

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-A10

**Hình chính:** Xem trước trợ năng cạnh ngôn ngữ và chuyển động

**Câu hỏi chính:** Trong “Hồ sơ và khả năng tiếp cận”, Tên, Ngôn ngữ cho biết điều gì và vai trò All roles có thể thực hiện “Save profile” trong phạm vi này không?

**Hành động chính:** Lưu hồ sơ → C01

**Chi tiết mở rộng:** Giữ Tên, Ngôn ngữ ở lớp quyết định. Đưa chi tiết hỗ trợ của Cỡ chữ, Giảm chuyển động, Múi giờ, lịch sử nguồn, phiên bản và quy tắc FR-A10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Kiểm chứng:** Dùng tình huống “Hồ sơ và khả năng tiếp cận” cho All roles; đổi Tên và làm Múi giờ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save profile” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C01 — An toàn của bạn

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C01

**Hình chính:** Tóm tắt nguy cơ tại khu vực trên báo an gia đình và kết nối

**Câu hỏi chính:** Trong “An toàn của bạn”, Khu vực của bạn, Cảnh báo đang mở cho biết điều gì và vai trò Citizen có thể thực hiện “View active alert” trong phạm vi này không?

**Hành động chính:** Xem cảnh báo đang có → C02

**Chi tiết mở rộng:** Giữ Khu vực của bạn, Cảnh báo đang mở ở lớp quyết định. Đưa chi tiết hỗ trợ của Gia đình, Kết nối, lịch sử nguồn, phiên bản và quy tắc FR-C01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “An toàn của bạn” cho Citizen; đổi Khu vực của bạn và làm Kết nối không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View active alert” chỉ tới C02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C02 — Chi tiết cảnh báo

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C02

**Hình chính:** Biểu tượng nguy cơ, nơi ảnh hưởng và một chỉ dẫn có nguồn

**Câu hỏi chính:** Trong “Chi tiết cảnh báo”, Mức độ, Nguồn cho biết điều gì và vai trò Citizen có thể thực hiện “View guidance” trong phạm vi này không?

**Hành động chính:** Xem chỉ dẫn → C03

**Chi tiết mở rộng:** Giữ Mức độ, Nguồn ở lớp quyết định. Đưa chi tiết hỗ trợ của Cập nhật, Hướng dẫn, lịch sử nguồn, phiên bản và quy tắc FR-C02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Chi tiết cảnh báo” cho Citizen; đổi Mức độ và làm Hướng dẫn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View guidance” chỉ tới C03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C03 — Hướng dẫn sơ tán

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C03

**Hình chính:** Sơ đồ tầng có vùng bất định vị trí, hành lang chặn và nơi lánh nạn

**Câu hỏi chính:** Trong “Hướng dẫn sơ tán”, Vị trí, Sơ đồ / kế hoạch cho biết điều gì và vai trò Citizen có thể thực hiện “I need assistance” trong phạm vi này không?

**Hành động chính:** Tôi cần trợ giúp → C05

**Chi tiết mở rộng:** Giữ Vị trí, Sơ đồ / kế hoạch ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái tuyến, Tuyến hỗ trợ tiếp cận, lịch sử nguồn, phiên bản và quy tắc FR-C03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nếu duyệt tuyến, tầng hoặc độ mới nguy cơ mất hiệu lực, thu hồi đường tuyến và hiện lựa chọn trợ giúp, lánh nạn đã xác minh theo cơ sở.

**Kiểm chứng:** Dùng tình huống “Hướng dẫn sơ tán” cho Citizen; đổi Vị trí và làm Tuyến hỗ trợ tiếp cận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “I need assistance” chỉ tới C05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C04 — Hướng dẫn bằng giọng nói

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C04

**Hình chính:** Điều khiển âm thanh lớn cạnh bản chữ dễ đọc

**Câu hỏi chính:** Trong “Hướng dẫn bằng giọng nói”, Ngôn ngữ, Âm thanh cho biết điều gì và vai trò Citizen có thể thực hiện “Return to plan” trong phạm vi này không?

**Hành động chính:** Về mặt bằng → C03

**Chi tiết mở rộng:** Giữ Ngôn ngữ, Âm thanh ở lớp quyết định. Đưa chi tiết hỗ trợ của Văn bản giọng đọc, Rung, lịch sử nguồn, phiên bản và quy tắc FR-C04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Hướng dẫn bằng giọng nói” cho Citizen; đổi Ngôn ngữ và làm Rung không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Return to plan” chỉ tới C03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C05 — Chọn loại trợ giúp

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C05

**Hình chính:** Biểu tượng cháy, y tế, va chạm và đe dọa kèm nhãn ngắn

**Câu hỏi chính:** Trong “Chọn loại trợ giúp”, Cháy hoặc mắc kẹt, Sức khỏe hoặc té ngã cho biết điều gì và vai trò Citizen có thể thực hiện “Continue with selected need” trong phạm vi này không?

**Hành động chính:** Tiếp tục với nhu cầu đã chọn → C06

**Chi tiết mở rộng:** Giữ Cháy hoặc mắc kẹt, Sức khỏe hoặc té ngã ở lớp quyết định. Đưa chi tiết hỗ trợ của Va chạm giao thông, Đe dọa cá nhân, Trợ giúp khác, lịch sử nguồn, phiên bản và quy tắc FR-C05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Chọn loại trợ giúp” cho Citizen; đổi Cháy hoặc mắc kẹt và làm Trợ giúp khác không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Continue with selected need” chỉ tới C06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C06 — Vị trí và nội dung SOS

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C06

**Hình chính:** Ghim vị trí có biên sai số và chỉnh sửa thủ công

**Câu hỏi chính:** Trong “Vị trí và nội dung SOS”, Vị trí, Độ chính xác cho biết điều gì và vai trò Citizen có thể thực hiện “Review SOS” trong phạm vi này không?

**Hành động chính:** Xem lại SOS → C07

**Chi tiết mở rộng:** Giữ Vị trí, Độ chính xác ở lớp quyết định. Đưa chi tiết hỗ trợ của Số người cần giúp, Ghi chú, lịch sử nguồn, phiên bản và quy tắc FR-C06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Vị trí và nội dung SOS” cho Citizen; đổi Vị trí và làm Ghi chú không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review SOS” chỉ tới C07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C07 — Xác nhận gửi SOS

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C07

**Hình chính:** Xem lại SOS với nhu cầu, vị trí và người nhận trước gửi

**Câu hỏi chính:** Trong “Xác nhận gửi SOS”, Loại sự cố, Vị trí cho biết điều gì và vai trò Citizen có thể thực hiện “Send SOS — demo” trong phạm vi này không?

**Hành động chính:** Gửi SOS · mô phỏng → C08

**Chi tiết mở rộng:** Giữ Loại sự cố, Vị trí ở lớp quyết định. Đưa chi tiết hỗ trợ của Người nhận, Chia sẻ, lịch sử nguồn, phiên bản và quy tắc FR-C07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Gửi có thể vẫn chờ cục bộ; hiện biên nhận máy chủ riêng và giữ liên hệ thay thế an toàn, không nhân SOS trùng.

**Kiểm chứng:** Dùng tình huống “Xác nhận gửi SOS” cho Citizen; đổi Loại sự cố và làm Chia sẻ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Send SOS — demo” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C08 — Theo dõi yêu cầu trợ giúp

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C08

**Hình chính:** Các bước biên nhận tách chờ gửi, máy chủ nhận và người tiếp nhận

**Câu hỏi chính:** Trong “Theo dõi yêu cầu trợ giúp”, 10:42:12, 10:42:18 cho biết điều gì và vai trò Citizen có thể thực hiện “Contact assigned team” trong phạm vi này không?

**Hành động chính:** Liên hệ đội được giao → C09

**Chi tiết mở rộng:** Giữ 10:42:12, 10:42:18 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:43:02, Hiện tại, lịch sử nguồn, phiên bản và quy tắc FR-C08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Theo dõi yêu cầu trợ giúp” cho Citizen; đổi 10:42:12 và làm Hiện tại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Contact assigned team” chỉ tới C09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C09 — Trao đổi với đội ứng cứu

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C09

**Hình chính:** Hội thoại sự cố hiển thị vai trò người gửi và trạng thái từng tin

**Câu hỏi chính:** Trong “Trao đổi với đội ứng cứu”, Điều hành viên, Bạn cho biết điều gì và vai trò Citizen có thể thực hiện “Send demo message” trong phạm vi này không?

**Hành động chính:** Gửi tin · mô phỏng → C09

**Chi tiết mở rộng:** Giữ Điều hành viên, Bạn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hệ thống, lịch sử nguồn, phiên bản và quy tắc FR-C09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Trao đổi với đội ứng cứu” cho Citizen; đổi Điều hành viên và làm Hệ thống không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send demo message” chỉ tới C09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C10 — Cập nhật hoặc đề nghị hủy SOS

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C10

**Hình chính:** SOS hiện có cạnh cập nhật đề xuất và tác động hủy

**Câu hỏi chính:** Trong “Cập nhật hoặc đề nghị hủy SOS”, Yêu cầu, Hành động cho biết điều gì và vai trò Citizen có thể thực hiện “Submit update” trong phạm vi này không?

**Hành động chính:** Gửi cập nhật → C08

**Chi tiết mở rộng:** Giữ Yêu cầu, Hành động ở lớp quyết định. Đưa chi tiết hỗ trợ của Lý do, Lưu ý, lịch sử nguồn, phiên bản và quy tắc FR-C10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Cập nhật hoặc đề nghị hủy SOS” cho Citizen; đổi Yêu cầu và làm Lưu ý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit update” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C11 — Báo trạng thái an toàn

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C11

**Hình chính:** Ba lựa chọn trạng thái cá nhân rõ ràng kèm độ chính xác chia sẻ

**Câu hỏi chính:** Trong “Báo trạng thái an toàn”, Trạng thái, Vị trí cho biết điều gì và vai trò Citizen có thể thực hiện “Confirm my safety” trong phạm vi này không?

**Hành động chính:** Báo tôi đã an toàn → C12

**Chi tiết mở rộng:** Giữ Trạng thái, Vị trí ở lớp quyết định. Đưa chi tiết hỗ trợ của Chia sẻ với, Mức chi tiết, lịch sử nguồn, phiên bản và quy tắc FR-C11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Xác nhận cá nhân là tự báo, theo nhóm nhận và có thời điểm; không đánh dấu cả gia đình hay sự cố an toàn.

**Kiểm chứng:** Dùng tình huống “Báo trạng thái an toàn” cho Citizen; đổi Trạng thái và làm Mức chi tiết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Confirm my safety” chỉ tới C12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C12 — Biên nhận báo an toàn

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C12

**Hình chính:** Báo cáo cá nhân và biên nhận riêng theo nhóm nhận

**Câu hỏi chính:** Trong “Biên nhận báo an toàn”, Trạng thái cá nhân, Nhóm cho biết điều gì và vai trò Citizen có thể thực hiện “View delivery details” trong phạm vi này không?

**Hành động chính:** Xem giao nhận → C13

**Chi tiết mở rộng:** Giữ Trạng thái cá nhân, Nhóm ở lớp quyết định. Đưa chi tiết hỗ trợ của Liên hệ, Sự cố, lịch sử nguồn, phiên bản và quy tắc FR-C12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Biên nhận báo an toàn” cho Citizen; đổi Trạng thái cá nhân và làm Sự cố không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View delivery details” chỉ tới C13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C13 — Hộp thông báo

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C13

**Hình chính:** Hộp cảnh báo theo mức khẩn có nguồn và hết hạn

**Câu hỏi chính:** Trong “Hộp thông báo”, Fire alert, Safety confirmation cho biết điều gì và vai trò Citizen có thể thực hiện “Open alert” trong phạm vi này không?

**Hành động chính:** Mở cảnh báo → C02

**Chi tiết mở rộng:** Giữ Fire alert, Safety confirmation ở lớp quyết định. Đưa chi tiết hỗ trợ của Family update, lịch sử nguồn, phiên bản và quy tắc FR-C13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Hộp thông báo” cho Citizen; đổi Fire alert và làm Family update không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open alert” chỉ tới C02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C14 — Nguy cơ gần bạn

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C14

**Hình chính:** Bản đồ nguy cơ gần kèm danh sách và bất định khoảng cách

**Câu hỏi chính:** Trong “Nguy cơ gần bạn”, Flood watch, Road closure cho biết điều gì và vai trò Citizen có thể thực hiện “View hazard” trong phạm vi này không?

**Hành động chính:** Xem nguy cơ → C15

**Chi tiết mở rộng:** Giữ Flood watch, Road closure ở lớp quyết định. Đưa chi tiết hỗ trợ của Cháy, lịch sử nguồn, phiên bản và quy tắc FR-C14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Nguy cơ gần bạn” cho Citizen; đổi Flood watch và làm Cháy không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “View hazard” chỉ tới C15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C15 — Thông tin thiên tai

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C15

**Hình chính:** Ranh giới khuyến cáo và thời hạn cạnh độ chắc chắn nguồn

**Câu hỏi chính:** Trong “Thông tin thiên tai”, Nguồn, Mức chắc chắn cho biết điều gì và vai trò Citizen có thể thực hiện “View shelter information” trong phạm vi này không?

**Hành động chính:** Xem nơi trú → C16

**Chi tiết mở rộng:** Giữ Nguồn, Mức chắc chắn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hiệu lực đến, Khu vực, lịch sử nguồn, phiên bản và quy tắc FR-C15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Thông tin thiên tai” cho Citizen; đổi Nguồn và làm Khu vực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View shelter information” chỉ tới C16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C16 — Nơi trú ẩn và điểm tập kết

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C16

**Hình chính:** Thẻ nơi trú so sánh trợ năng, chỗ hiện có và khoảng cách

**Câu hỏi chính:** Trong “Nơi trú ẩn và điểm tập kết”, North shelter, West center cho biết điều gì và vai trò Citizen có thể thực hiện “Open shelter details” trong phạm vi này không?

**Hành động chính:** Mở chi tiết nơi trú → C17

**Chi tiết mở rộng:** Giữ North shelter, West center ở lớp quyết định. Đưa chi tiết hỗ trợ của Campus North, lịch sử nguồn, phiên bản và quy tắc FR-C16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Nơi trú ẩn và điểm tập kết” cho Citizen; đổi North shelter và làm Campus North không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open shelter details” chỉ tới C17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C17 — Chi tiết nơi trú ẩn

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C17

**Hình chính:** Sơ đồ lối vào nơi trú và trạng thái tiếp cận, sức chứa

**Câu hỏi chính:** Trong “Chi tiết nơi trú ẩn”, Trạng thái, Khả năng tiếp cận cho biết điều gì và vai trò Citizen có thể thực hiện “Save shelter offline” trong phạm vi này không?

**Hành động chính:** Lưu nơi trú ngoại tuyến → C18

**Chi tiết mở rộng:** Giữ Trạng thái, Khả năng tiếp cận ở lớp quyết định. Đưa chi tiết hỗ trợ của Sức chứa, Địa chỉ, lịch sử nguồn, phiên bản và quy tắc FR-C17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Chi tiết nơi trú ẩn” cho Citizen; đổi Trạng thái và làm Địa chỉ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save shelter offline” chỉ tới C18 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C18 — Thông tin an toàn ngoại tuyến

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C18

**Hình chính:** Nội dung gói ngoại tuyến có phiên bản và tuổi đồng bộ

**Câu hỏi chính:** Trong “Thông tin an toàn ngoại tuyến”, Campus plan, Liên hệ cho biết điều gì và vai trò Citizen có thể thực hiện “Review cached plan” trong phạm vi này không?

**Hành động chính:** Xem mặt bằng đã lưu → C03

**Chi tiết mở rộng:** Giữ Campus plan, Liên hệ ở lớp quyết định. Đưa chi tiết hỗ trợ của Guidance, Đồng bộ gần nhất, lịch sử nguồn, phiên bản và quy tắc FR-C18 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Thông tin an toàn ngoại tuyến” cho Citizen; đổi Campus plan và làm Đồng bộ gần nhất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review cached plan” chỉ tới C03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C19 — Các nhóm của tôi

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C19

**Hình chính:** Tóm tắt thành viên nhóm và số chưa báo an

**Câu hỏi chính:** Trong “Các nhóm của tôi”, Gia đình, Campus cho biết điều gì và vai trò Citizen có thể thực hiện “Open family” trong phạm vi này không?

**Hành động chính:** Mở gia đình → C20

**Chi tiết mở rộng:** Giữ Gia đình, Campus ở lớp quyết định. Đưa chi tiết hỗ trợ của Travel team, lịch sử nguồn, phiên bản và quy tắc FR-C19 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Các nhóm của tôi” cho Citizen; đổi Gia đình và làm Travel team không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open family” chỉ tới C20 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C20 — Trò chuyện trong nhóm

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C20

**Hình chính:** Hội thoại nhóm kèm bối cảnh báo an thành viên

**Câu hỏi chính:** Trong “Trò chuyện trong nhóm”, Hệ thống, Jamie cho biết điều gì và vai trò Citizen có thể thực hiện “View member status” trong phạm vi này không?

**Hành động chính:** Xem trạng thái thành viên → C22

**Chi tiết mở rộng:** Giữ Hệ thống, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, lịch sử nguồn, phiên bản và quy tắc FR-C20 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Trò chuyện trong nhóm” cho Citizen; đổi Hệ thống và làm Morgan không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “View member status” chỉ tới C22 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C21 — Tạo hoặc sửa nhóm

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C21

**Hình chính:** Xem trước thành viên và phạm vi chia sẻ nhóm

**Câu hỏi chính:** Trong “Tạo hoặc sửa nhóm”, Tên, Thành viên cho biết điều gì và vai trò Citizen có thể thực hiện “Save circle” trong phạm vi này không?

**Hành động chính:** Lưu nhóm → C19

**Chi tiết mở rộng:** Giữ Tên, Thành viên ở lớp quyết định. Đưa chi tiết hỗ trợ của Cập nhật an toàn, Chia sẻ vị trí, lịch sử nguồn, phiên bản và quy tắc FR-C21 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Tạo hoặc sửa nhóm” cho Citizen; đổi Tên và làm Chia sẻ vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save circle” chỉ tới C19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C22 — Trạng thái thành viên

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C22

**Hình chính:** Bảng thành viên tách tự báo an và chưa rõ

**Câu hỏi chính:** Trong “Trạng thái thành viên”, Alex, Jamie cho biết điều gì và vai trò Citizen có thể thực hiện “Send check-in request” trong phạm vi này không?

**Hành động chính:** Gửi yêu cầu báo an → C20

**Chi tiết mở rộng:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, lịch sử nguồn, phiên bản và quy tắc FR-C22 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Trạng thái thành viên” cho Citizen; đổi Alex và làm Morgan không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send check-in request” chỉ tới C20 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C23 — Liên hệ khẩn cấp

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C23

**Hình chính:** Thứ tự liên hệ với biểu tượng kênh và xem trước chia sẻ

**Câu hỏi chính:** Trong “Liên hệ khẩn cấp”, Chính, Dự phòng cho biết điều gì và vai trò Citizen có thể thực hiện “Save contacts” trong phạm vi này không?

**Hành động chính:** Lưu liên hệ → C01

**Chi tiết mở rộng:** Giữ Chính, Dự phòng ở lớp quyết định. Đưa chi tiết hỗ trợ của Kênh, Phạm vi chia sẻ, lịch sử nguồn, phiên bản và quy tắc FR-C23 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Liên hệ khẩn cấp” cho Citizen; đổi Chính và làm Phạm vi chia sẻ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save contacts” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C24 — Chăm sóc và phát hiện té ngã

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C24

**Hình chính:** Kết nối thiết bị đeo và chuỗi tăng cấp kiểm tra té ngã

**Câu hỏi chính:** Trong “Chăm sóc và phát hiện té ngã”, Thiết bị đeo, Phát hiện cho biết điều gì và vai trò Citizen có thể thực hiện “Review test alert” trong phạm vi này không?

**Hành động chính:** Xem cảnh báo thử → C25

**Chi tiết mở rộng:** Giữ Thiết bị đeo, Phát hiện ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời gian phản hồi, Chuyển cấp, lịch sử nguồn, phiên bản và quy tắc FR-C24 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Chăm sóc và phát hiện té ngã” cho Citizen; đổi Thiết bị đeo và làm Chuyển cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review test alert” chỉ tới C25 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C25 — Kiểm tra sau nghi ngờ té ngã

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C25

**Hình chính:** Kiểm tra té ngã có nút cần giúp, bỏ qua lớn và thời gian còn

**Câu hỏi chính:** Trong “Kiểm tra sau nghi ngờ té ngã”, Bằng chứng, Thời gian phản hồi cho biết điều gì và vai trò Citizen có thể thực hiện “I need help now” trong phạm vi này không?

**Hành động chính:** Tôi cần giúp ngay → C08

**Chi tiết mở rộng:** Giữ Bằng chứng, Thời gian phản hồi ở lớp quyết định. Đưa chi tiết hỗ trợ của Không phản hồi, Phương án khác, lịch sử nguồn, phiên bản và quy tắc FR-C25 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không đáp vẫn là chưa xác nhận; dừng bộ đếm không phải biên nhận giúp đỡ, và trợ năng không phụ thuộc giữ nút.

**Kiểm chứng:** Dùng tình huống “Kiểm tra sau nghi ngờ té ngã” cho Citizen; đổi Bằng chứng và làm Phương án khác không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “I need help now” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C26 — Báo sự cố giao thông

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C26

**Hình chính:** Phác họa hướng đường với nhập hướng và thương tích thủ công

**Câu hỏi chính:** Trong “Báo sự cố giao thông”, Vị trí, Hướng cho biết điều gì và vai trò Citizen có thể thực hiện “Review SOS” trong phạm vi này không?

**Hành động chính:** Xem lại SOS → C07

**Chi tiết mở rộng:** Giữ Vị trí, Hướng ở lớp quyết định. Đưa chi tiết hỗ trợ của Phương tiện, Thương tích, Tệp đính kèm, lịch sử nguồn, phiên bản và quy tắc FR-C26 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Báo sự cố giao thông” cho Citizen; đổi Vị trí và làm Tệp đính kèm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review SOS” chỉ tới C07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C27 — Yêu cầu trợ giúp kín đáo

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C27

**Hình chính:** Điều khiển trợ giúp kín đáo rõ trạng thái âm thanh và rung

**Câu hỏi chính:** Trong “Yêu cầu trợ giúp kín đáo”, Âm thanh, Rung cho biết điều gì và vai trò Citizen có thể thực hiện “Send discreet request — demo” trong phạm vi này không?

**Hành động chính:** Gửi yêu cầu kín đáo · mô phỏng → C08

**Chi tiết mở rộng:** Giữ Âm thanh, Rung ở lớp quyết định. Đưa chi tiết hỗ trợ của Chia sẻ, Vị trí, lịch sử nguồn, phiên bản và quy tắc FR-C27 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không tự phát lời hoặc rung trái lựa chọn kín đáo; phân biệt chờ và đã nhận mà không hiệu ứng gây chú ý.

**Kiểm chứng:** Dùng tình huống “Yêu cầu trợ giúp kín đáo” cho Citizen; đổi Âm thanh và làm Vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Send discreet request — demo” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C28 — Lịch sử yêu cầu

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C28

**Hình chính:** Lịch sử yêu cầu tách đang mở, đã xử lý và chờ biên nhận

**Câu hỏi chính:** Trong “Lịch sử yêu cầu”, SOS-041, SOS-028 cho biết điều gì và vai trò Citizen có thể thực hiện “View request” trong phạm vi này không?

**Hành động chính:** Xem yêu cầu → C08

**Chi tiết mở rộng:** Giữ SOS-041, SOS-028 ở lớp quyết định. Đưa chi tiết hỗ trợ của Check-in, lịch sử nguồn, phiên bản và quy tắc FR-C28 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Lịch sử yêu cầu” cho Citizen; đổi SOS-041 và làm Check-in không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “View request” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C29 — Quyền riêng tư và dữ liệu

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C29

**Hình chính:** Xem trước phạm vi riêng tư với vị trí trực tiếp và xuất, xóa

**Câu hỏi chính:** Trong “Quyền riêng tư và dữ liệu”, Vị trí trực tiếp, Hiển thị trong nhóm cho biết điều gì và vai trò Citizen có thể thực hiện “Review data request” trong phạm vi này không?

**Hành động chính:** Xem yêu cầu dữ liệu → C30

**Chi tiết mở rộng:** Giữ Vị trí trực tiếp, Hiển thị trong nhóm ở lớp quyết định. Đưa chi tiết hỗ trợ của Xuất dữ liệu, Xóa dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-C29 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Quyền riêng tư và dữ liệu” cho Citizen; đổi Vị trí trực tiếp và làm Xóa dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review data request” chỉ tới C30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C30 — Biên nhận yêu cầu dữ liệu

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C30

**Hình chính:** Tiến trình yêu cầu dữ liệu và đích nhận đã xác minh

**Câu hỏi chính:** Trong “Biên nhận yêu cầu dữ liệu”, Loại, Phạm vi cho biết điều gì và vai trò Citizen có thể thực hiện “Back to privacy” trong phạm vi này không?

**Hành động chính:** Về quyền riêng tư → C29

**Chi tiết mở rộng:** Giữ Loại, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái, Chuyển tin, lịch sử nguồn, phiên bản và quy tắc FR-C30 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Biên nhận yêu cầu dữ liệu” cho Citizen; đổi Loại và làm Chuyển tin không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Back to privacy” chỉ tới C29 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R01 — Ca trực và trạng thái sẵn sàng

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R01

**Hình chính:** Danh mục sẵn sàng của đội với năng lực và ca trực

**Câu hỏi chính:** Trong “Ca trực và trạng thái sẵn sàng”, Đơn vị, Ca trực cho biết điều gì và vai trò Responder có thể thực hiện “View assignments” trong phạm vi này không?

**Hành động chính:** Xem nhiệm vụ → R02

**Chi tiết mở rộng:** Giữ Đơn vị, Ca trực ở lớp quyết định. Đưa chi tiết hỗ trợ của Năng lực, Sẵn sàng, lịch sử nguồn, phiên bản và quy tắc FR-R01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Ca trực và trạng thái sẵn sàng” cho Responder; đổi Đơn vị và làm Sẵn sàng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View assignments” chỉ tới R02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R02 — Nhiệm vụ được giao

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R02

**Hình chính:** Hàng đợi nhiệm vụ theo khẩn cấp và hạn tiếp nhận

**Câu hỏi chính:** Trong “Nhiệm vụ được giao”, INC-2041, INC-2037 cho biết điều gì và vai trò Responder có thể thực hiện “Open assignment” trong phạm vi này không?

**Hành động chính:** Mở nhiệm vụ → R03

**Chi tiết mở rộng:** Giữ INC-2041, INC-2037 ở lớp quyết định. Đưa chi tiết hỗ trợ của Phạm vi bao phủ, lịch sử nguồn, phiên bản và quy tắc FR-R02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Nhiệm vụ được giao” cho Responder; đổi INC-2041 và làm Phạm vi bao phủ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open assignment” chỉ tới R03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R03 — Tiếp nhận nhiệm vụ

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R03

**Hình chính:** Danh tính nhiệm vụ, vị trí người và nguy cơ trên nhận, từ chối

**Câu hỏi chính:** Trong “Tiếp nhận nhiệm vụ”, Sự cố, Người cho biết điều gì và vai trò Responder có thể thực hiện “Accept assignment” trong phạm vi này không?

**Hành động chính:** Nhận nhiệm vụ → R04

**Chi tiết mở rộng:** Giữ Sự cố, Người ở lớp quyết định. Đưa chi tiết hỗ trợ của Vị trí, Nguy cơ, lịch sử nguồn, phiên bản và quy tắc FR-R03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Tiếp nhận nhiệm vụ” cho Responder; đổi Sự cố và làm Nguy cơ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Accept assignment” chỉ tới R04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R04 — Đường tiếp cận và đến nơi

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R04

**Hình chính:** Bản đồ tiếp cận đích có hiệu lực tuyến và thao tác báo đến

**Câu hỏi chính:** Trong “Đường tiếp cận và đến nơi”, Phân công, Điểm đến cho biết điều gì và vai trò Responder có thể thực hiện “Report arrival” trong phạm vi này không?

**Hành động chính:** Báo đã đến → R05

**Chi tiết mở rộng:** Giữ Phân công, Điểm đến ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ mới vị trí, Tuyến đường, lịch sử nguồn, phiên bản và quy tắc FR-R04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Đường tiếp cận và đến nơi” cho Responder; đổi Phân công và làm Tuyến đường không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Report arrival” chỉ tới R05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R05 — Tình hình hiện trường

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R05

**Hình chính:** Sơ đồ hiện trường có vùng chặn, SOS mở và vị trí đồng đội

**Câu hỏi chính:** Trong “Tình hình hiện trường”, SOS đang mở, Khu vực bị chặn cho biết điều gì và vai trò Responder có thể thực hiện “Open assistance record” trong phạm vi này không?

**Hành động chính:** Mở hồ sơ trợ giúp → R06

**Chi tiết mở rộng:** Giữ SOS đang mở, Khu vực bị chặn ở lớp quyết định. Đưa chi tiết hỗ trợ của Sơ đồ / kế hoạch, Đội, lịch sử nguồn, phiên bản và quy tắc FR-R05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Tình hình hiện trường” cho Responder; đổi SOS đang mở và làm Đội không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open assistance record” chỉ tới R06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R06 — Hồ sơ hỗ trợ tại hiện trường

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R06

**Hình chính:** Phiếu quan sát theo người với tình trạng và hỗ trợ

**Câu hỏi chính:** Trong “Hồ sơ hỗ trợ tại hiện trường”, Người, Liên hệ cho biết điều gì và vai trò Responder có thể thực hiện “Save observation” trong phạm vi này không?

**Hành động chính:** Lưu quan sát → R07

**Chi tiết mở rộng:** Giữ Người, Liên hệ ở lớp quyết định. Đưa chi tiết hỗ trợ của Tình trạng, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-R06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Hồ sơ hỗ trợ tại hiện trường” cho Responder; đổi Người và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save observation” chỉ tới R07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R07 — Trạng thái và bàn giao nhiệm vụ

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R07

**Hình chính:** Dòng bàn giao nhiệm vụ tách người nhận chấp thuận

**Câu hỏi chính:** Trong “Trạng thái và bàn giao nhiệm vụ”, Nhiệm vụ, Trạng thái cho biết điều gì và vai trò Responder có thể thực hiện “Submit handover” trong phạm vi này không?

**Hành động chính:** Gửi bàn giao → R08

**Chi tiết mở rộng:** Giữ Nhiệm vụ, Trạng thái ở lớp quyết định. Đưa chi tiết hỗ trợ của Bên nhận, Bằng chứng, lịch sử nguồn, phiên bản và quy tắc FR-R07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Trạng thái và bàn giao nhiệm vụ” cho Responder; đổi Nhiệm vụ và làm Bằng chứng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit handover” chỉ tới R08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R08 — Hoàn tất nhiệm vụ

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R08

**Hình chính:** Bằng chứng hoàn thành và xác nhận đội tiếp nhận

**Câu hỏi chính:** Trong “Hoàn tất nhiệm vụ”, Người, Bàn giao cho biết điều gì và vai trò Responder có thể thực hiện “Back to shift” trong phạm vi này không?

**Hành động chính:** Về ca trực → R01

**Chi tiết mở rộng:** Giữ Người, Bàn giao ở lớp quyết định. Đưa chi tiết hỗ trợ của Sự cố, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-R08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Hoàn tất nhiệm vụ” cho Responder; đổi Người và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Back to shift” chỉ tới R01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R09 — Trao đổi trong đội

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R09

**Hình chính:** Kênh đội có danh tính chỉ huy và dấu tin chờ gửi

**Câu hỏi chính:** Trong “Trao đổi trong đội”, Điều hành, Rescue 02 cho biết điều gì và vai trò Responder có thể thực hiện “Send demo message” trong phạm vi này không?

**Hành động chính:** Gửi tin · mô phỏng → R09

**Chi tiết mở rộng:** Giữ Điều hành, Rescue 02 ở lớp quyết định. Đưa chi tiết hỗ trợ của Hệ thống, lịch sử nguồn, phiên bản và quy tắc FR-R09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Trao đổi trong đội” cho Responder; đổi Điều hành và làm Hệ thống không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send demo message” chỉ tới R09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R10 — Ghi nhận bằng chứng

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R10

**Hình chính:** Xem trước bằng chứng gắn sự cố và che thông tin riêng

**Câu hỏi chính:** Trong “Ghi nhận bằng chứng”, Loại, Sự cố cho biết điều gì và vai trò Responder có thể thực hiện “Queue attachment” trong phạm vi này không?

**Hành động chính:** Đưa tệp vào hàng chờ → R11

**Chi tiết mở rộng:** Giữ Loại, Sự cố ở lớp quyết định. Đưa chi tiết hỗ trợ của Chú thích, Quyền riêng tư, lịch sử nguồn, phiên bản và quy tắc FR-R10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Ghi nhận bằng chứng” cho Responder; đổi Loại và làm Quyền riêng tư không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Queue attachment” chỉ tới R11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R11 — Dữ liệu chờ đồng bộ

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R11

**Hình chính:** Hộp chờ gửi nhóm theo chờ, thử lại và xung đột

**Câu hỏi chính:** Trong “Dữ liệu chờ đồng bộ”, Observation, Photo cho biết điều gì và vai trò Responder có thể thực hiện “Resolve sync conflict” trong phạm vi này không?

**Hành động chính:** Giải quyết xung đột đồng bộ → R12

**Chi tiết mở rộng:** Giữ Observation, Photo ở lớp quyết định. Đưa chi tiết hỗ trợ của Status update, lịch sử nguồn, phiên bản và quy tắc FR-R11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Dữ liệu chờ đồng bộ” cho Responder; đổi Observation và làm Status update không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Resolve sync conflict” chỉ tới R12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### R12 — Xử lý xung đột đồng bộ

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-R12

**Hình chính:** Quan sát cục bộ cạnh thay đổi máy chủ và giữ ghi chú

**Câu hỏi chính:** Trong “Xử lý xung đột đồng bộ”, Cục bộ, Máy chủ cho biết điều gì và vai trò Responder có thể thực hiện “Keep note and refresh” trong phạm vi này không?

**Hành động chính:** Giữ ghi chú và tải lại → R02

**Chi tiết mở rộng:** Giữ Cục bộ, Máy chủ ở lớp quyết định. Đưa chi tiết hỗ trợ của Ghi chú của bạn, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-R12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Kiểm chứng:** Dùng tình huống “Xử lý xung đột đồng bộ” cho Responder; đổi Cục bộ và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Keep note and refresh” chỉ tới R02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O01 — Tổng quan điều hành

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O01

**Hình chính:** Dải sự cố ưu tiên, bảng năng lực và bản đồ khu vực

**Câu hỏi chính:** Trong “Tổng quan điều hành”, Sự cố đang mở, P1 chưa tiếp nhận cho biết điều gì và vai trò Operator có thể thực hiện “Open priority incident” trong phạm vi này không?

**Hành động chính:** Mở sự cố ưu tiên → O04

**Chi tiết mở rộng:** Giữ Sự cố đang mở, P1 chưa tiếp nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của SOS đang mở, Đội sẵn sàng, lịch sử nguồn, phiên bản và quy tắc FR-O01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Tổng quan điều hành” cho Operator; đổi Sự cố đang mở và làm Đội sẵn sàng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open priority incident” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O02 — Bản đồ tình hình

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O02

**Hình chính:** Bản đồ nhiều sự cố với độ mới từng lớp

**Câu hỏi chính:** Trong “Bản đồ tình hình”, Cháy, Ngập lụt cho biết điều gì và vai trò Operator có thể thực hiện “Open incident” trong phạm vi này không?

**Hành động chính:** Mở sự cố → O04

**Chi tiết mở rộng:** Giữ Cháy, Ngập lụt ở lớp quyết định. Đưa chi tiết hỗ trợ của Va chạm giao thông, Độ mới bản đồ, lịch sử nguồn, phiên bản và quy tắc FR-O02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Bản đồ tình hình” cho Operator; đổi Cháy và làm Độ mới bản đồ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open incident” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O03 — Hàng đợi xác minh tín hiệu

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O03

**Hình chính:** Hàng đợi bằng chứng tín hiệu có nghi trùng và chất lượng nguồn

**Câu hỏi chính:** Trong “Hàng đợi xác minh tín hiệu”, EV-3101, EV-3102 cho biết điều gì và vai trò Operator có thể thực hiện “Inspect signal” trong phạm vi này không?

**Hành động chính:** Kiểm tra tín hiệu → O05

**Chi tiết mở rộng:** Giữ EV-3101, EV-3102 ở lớp quyết định. Đưa chi tiết hỗ trợ của EV-3103, lịch sử nguồn, phiên bản và quy tắc FR-O03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Hàng đợi xác minh tín hiệu” cho Operator; đổi EV-3101 và làm EV-3103 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Inspect signal” chỉ tới O05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O04 — Không gian xử lý sự cố

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O04

**Hình chính:** Bản đồ sự cố cạnh SOS mở, người chưa rõ và người phụ trách

**Câu hỏi chính:** Trong “Không gian xử lý sự cố”, INC-2041, SOS đang mở cho biết điều gì và vai trò Operator có thể thực hiện “Open dispatch” trong phạm vi này không?

**Hành động chính:** Mở điều phối → O08

**Chi tiết mở rộng:** Giữ INC-2041, SOS đang mở ở lớp quyết định. Đưa chi tiết hỗ trợ của Tự báo an toàn, Người chưa xác nhận, lịch sử nguồn, phiên bản và quy tắc FR-O04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Không gian xử lý sự cố” cho Operator; đổi INC-2041 và làm Người chưa xác nhận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open dispatch” chỉ tới O08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O05 — Kiểm tra bằng chứng

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O05

**Hình chính:** Khung bằng chứng có thời điểm, độ tin cậy và vị trí

**Câu hỏi chính:** Trong “Kiểm tra bằng chứng”, Nguồn, Thời điểm ghi nhận cho biết điều gì và vai trò Operator có thể thực hiện “Create incident from signal” trong phạm vi này không?

**Hành động chính:** Tạo sự cố từ tín hiệu → O06

**Chi tiết mở rộng:** Giữ Nguồn, Thời điểm ghi nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ tin cậy mô hình, Vị trí, lịch sử nguồn, phiên bản và quy tắc FR-O05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Kiểm tra bằng chứng” cho Operator; đổi Nguồn và làm Vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Create incident from signal” chỉ tới O06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O06 — Tạo sự cố

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O06

**Hình chính:** Xem trước tạo sự cố nối loại, mức độ và người phụ trách

**Câu hỏi chính:** Trong “Tạo sự cố”, Loại sự cố, Mức độ cho biết điều gì và vai trò Operator có thể thực hiện “Create demo incident” trong phạm vi này không?

**Hành động chính:** Tạo sự cố · mô phỏng → O04

**Chi tiết mở rộng:** Giữ Loại sự cố, Mức độ ở lớp quyết định. Đưa chi tiết hỗ trợ của Vị trí, Bằng chứng, Người phụ trách, lịch sử nguồn, phiên bản và quy tắc FR-O06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Tạo sự cố” cho Operator; đổi Loại sự cố và làm Người phụ trách không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Create demo incident” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O07 — Liên kết hoặc tách sự cố

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O07

**Hình chính:** Phả hệ sự cố đối chiếu với tác động gộp, tách

**Câu hỏi chính:** Trong “Liên kết hoặc tách sự cố”, Chính, Liên quan cho biết điều gì và vai trò Supervisor có thể thực hiện “Save correlation” trong phạm vi này không?

**Hành động chính:** Lưu liên kết → O04

**Chi tiết mở rộng:** Giữ Chính, Liên quan ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng, Quyết định, lịch sử nguồn, phiên bản và quy tắc FR-O07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Liên kết hoặc tách sự cố” cho Supervisor; đổi Chính và làm Quyết định không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save correlation” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O08 — Bảng điều phối

**Bối cảnh:** command · **Vai trò:** Dispatcher · **FR:** FR-O08

**Hình chính:** Các làn đội thể hiện năng lực, nhiệm vụ và trạng thái nhận

**Câu hỏi chính:** Trong “Bảng điều phối”, Rescue 02, Medical 01 cho biết điều gì và vai trò Dispatcher có thể thực hiện “Review assignment” trong phạm vi này không?

**Hành động chính:** Xem phân công → O09

**Chi tiết mở rộng:** Giữ Rescue 02, Medical 01 ở lớp quyết định. Đưa chi tiết hỗ trợ của Security 03, Nhiệm vụ, lịch sử nguồn, phiên bản và quy tắc FR-O08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Bảng điều phối” cho Dispatcher; đổi Rescue 02 và làm Nhiệm vụ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review assignment” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O09 — Phân công đội ứng cứu

**Bối cảnh:** command · **Vai trò:** Dispatcher · **FR:** FR-O09

**Hình chính:** Xem trước phân công gắn đúng đội, nhiệm vụ và hạn đáp

**Câu hỏi chính:** Trong “Phân công đội ứng cứu”, Sự cố, Đơn vị cho biết điều gì và vai trò Dispatcher có thể thực hiện “Assign team — demo” trong phạm vi này không?

**Hành động chính:** Phân đội · mô phỏng → O10

**Chi tiết mở rộng:** Giữ Sự cố, Đơn vị ở lớp quyết định. Đưa chi tiết hỗ trợ của Nhiệm vụ, Hạn nhận nhiệm vụ, lịch sử nguồn, phiên bản và quy tắc FR-O09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Phân công đội ứng cứu” cho Dispatcher; đổi Sự cố và làm Hạn nhận nhiệm vụ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Assign team — demo” chỉ tới O10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O10 — Dòng thời gian ứng cứu

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O10

**Hình chính:** Mốc phản ứng theo thời gian với biên nhận từng nguồn

**Câu hỏi chính:** Trong “Dòng thời gian ứng cứu”, 10:40:12, 10:40:19 cho biết điều gì và vai trò Operator có thể thực hiện “Review people status” trong phạm vi này không?

**Hành động chính:** Xem trạng thái người → O11

**Chi tiết mở rộng:** Giữ 10:40:12, 10:40:19 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:42:18, 10:43:02, lịch sử nguồn, phiên bản và quy tắc FR-O10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Dòng thời gian ứng cứu” cho Operator; đổi 10:40:12 và làm 10:43:02 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review people status” chỉ tới O11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O11 — Theo dõi trạng thái con người

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O11

**Hình chính:** Bảng người tách chưa rõ, được giúp và tự báo an

**Câu hỏi chính:** Trong “Theo dõi trạng thái con người”, Alex, Jamie cho biết điều gì và vai trò Operator có thể thực hiện “Open person” trong phạm vi này không?

**Hành động chính:** Mở hồ sơ người → O12

**Chi tiết mở rộng:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Phạm vi, lịch sử nguồn, phiên bản và quy tắc FR-O11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Theo dõi trạng thái con người” cho Operator; đổi Alex và làm Phạm vi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open person” chỉ tới O12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O12 — Chi tiết yêu cầu hỗ trợ

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O12

**Hình chính:** Nhu cầu trợ giúp, phạm vi đồng ý và vị trí cuối

**Câu hỏi chính:** Trong “Chi tiết yêu cầu hỗ trợ”, Vị trí, Sự đồng ý cho biết điều gì và vai trò Operator có thể thực hiện “Assign assistance” trong phạm vi này không?

**Hành động chính:** Phân trợ giúp → O09

**Chi tiết mở rộng:** Giữ Vị trí, Sự đồng ý ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái, Độ mới, lịch sử nguồn, phiên bản và quy tắc FR-O12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Chi tiết yêu cầu hỗ trợ” cho Operator; đổi Vị trí và làm Độ mới không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Assign assistance” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O13 — Soạn cảnh báo

**Bối cảnh:** command · **Vai trò:** Warning author · **FR:** FR-O13

**Hình chính:** Soạn cảnh báo cạnh vùng ảnh hưởng và xem trước chỉ dẫn

**Câu hỏi chính:** Trong “Soạn cảnh báo”, Loại sự cố, Khu vực cho biết điều gì và vai trò Warning author có thể thực hiện “Preview audience” trong phạm vi này không?

**Hành động chính:** Xem trước người nhận → O14

**Chi tiết mở rộng:** Giữ Loại sự cố, Khu vực ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ, Hướng dẫn, Hết hạn, lịch sử nguồn, phiên bản và quy tắc FR-O13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Soạn cảnh báo” cho Warning author; đổi Loại sự cố và làm Hết hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Preview audience” chỉ tới O14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O14 — Xem trước nội dung và người nhận

**Bối cảnh:** command · **Vai trò:** Warning author · **FR:** FR-O14

**Hình chính:** Phạm vi người nhận và so sánh độ phủ kênh, ngôn ngữ

**Câu hỏi chính:** Trong “Xem trước nội dung và người nhận”, Đối tượng nhận, Các kênh cho biết điều gì và vai trò Warning author có thể thực hiện “Submit for approval” trong phạm vi này không?

**Hành động chính:** Gửi duyệt → O15

**Chi tiết mở rộng:** Giữ Đối tượng nhận, Các kênh ở lớp quyết định. Đưa chi tiết hỗ trợ của Bản dịch, Đối tượng loại trừ, lịch sử nguồn, phiên bản và quy tắc FR-O14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Xem trước nội dung và người nhận” cho Warning author; đổi Đối tượng nhận và làm Đối tượng loại trừ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit for approval” chỉ tới O15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O15 — Duyệt cảnh báo

**Bối cảnh:** command · **Vai trò:** Warning approver · **FR:** FR-O15

**Hình chính:** Đúng phiên bản cảnh báo và tách người soạn, duyệt

**Câu hỏi chính:** Trong “Duyệt cảnh báo”, Người soạn, Người duyệt cho biết điều gì và vai trò Warning approver có thể thực hiện “Approve demo warning” trong phạm vi này không?

**Hành động chính:** Duyệt cảnh báo · mô phỏng → O16

**Chi tiết mở rộng:** Giữ Người soạn, Người duyệt ở lớp quyết định. Đưa chi tiết hỗ trợ của Phiên bản, Lý do, lịch sử nguồn, phiên bản và quy tắc FR-O15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Duyệt cảnh báo” cho Warning approver; đổi Người soạn và làm Lý do không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve demo warning” chỉ tới O16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O16 — Gửi tin và chuyển cấp

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O16

**Hình chính:** Phễu giao nhận tách nhà cung cấp nhận và con người xác nhận

**Câu hỏi chính:** Trong “Gửi tin và chuyển cấp”, Push, SMS cho biết điều gì và vai trò Operator có thể thực hiện “Review failed deliveries” trong phạm vi này không?

**Hành động chính:** Xem giao nhận lỗi → O17

**Chi tiết mở rộng:** Giữ Push, SMS ở lớp quyết định. Đưa chi tiết hỗ trợ của Người đã xác nhận, Lần chuyển cấp tiếp, lịch sử nguồn, phiên bản và quy tắc FR-O16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Gửi tin và chuyển cấp” cho Operator; đổi Push và làm Lần chuyển cấp tiếp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review failed deliveries” chỉ tới O17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O17 — Xử lý gửi tin thất bại

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O17

**Hình chính:** Nhóm nhận lỗi cạnh đề xuất kênh dự phòng

**Câu hỏi chính:** Trong “Xử lý gửi tin thất bại”, Nhà cung cấp, Lỗi cho biết điều gì và vai trò Operator có thể thực hiện “Queue fallback — demo” trong phạm vi này không?

**Hành động chính:** Xếp kênh dự phòng · mô phỏng → O16

**Chi tiết mở rộng:** Giữ Nhà cung cấp, Lỗi ở lớp quyết định. Đưa chi tiết hỗ trợ của Bị ảnh hưởng, Dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-O17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Xử lý gửi tin thất bại” cho Operator; đổi Nhà cung cấp và làm Dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Queue fallback — demo” chỉ tới O16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O18 — Duyệt lệnh thiết bị

**Bối cảnh:** command · **Vai trò:** Authorized controller · **FR:** FR-O18

**Hình chính:** Sơ đồ thiết bị đích với liên động và bản lệnh có hạn

**Câu hỏi chính:** Trong “Duyệt lệnh thiết bị”, Đích, Điều hành cho biết điều gì và vai trò Authorized controller có thể thực hiện “Approve simulated command” trong phạm vi này không?

**Hành động chính:** Duyệt lệnh mô phỏng → O19

**Chi tiết mở rộng:** Giữ Đích, Điều hành ở lớp quyết định. Đưa chi tiết hỗ trợ của Liên động an toàn, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-O18 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Lệnh hết hạn, liên động lỗi hoặc đích đổi làm mất duyệt; phải xem lại đúng phiên bản lệnh.

**Kiểm chứng:** Dùng tình huống “Duyệt lệnh thiết bị” cho Authorized controller; đổi Đích và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve simulated command” chỉ tới O19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O19 — Trạng thái thực thi lệnh

**Bối cảnh:** command · **Vai trò:** Authorized controller · **FR:** FR-O19

**Hình chính:** Dòng lệnh tách biên nhận truyền tải và tác động vật lý

**Câu hỏi chính:** Trong “Trạng thái thực thi lệnh”, 10:44:00, 10:44:03 cho biết điều gì và vai trò Authorized controller có thể thực hiện “Refresh command evidence” trong phạm vi này không?

**Hành động chính:** Cập nhật bằng chứng lệnh → O19

**Chi tiết mở rộng:** Giữ 10:44:00, 10:44:03 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:44:04, Hiện tại, lịch sử nguồn, phiên bản và quy tắc FR-O19 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Bộ điều khiển nhận nhưng thiếu phản hồi vật lý vẫn chưa rõ; hiện đối soát thay vì thành công khi lặp lệnh.

**Kiểm chứng:** Dùng tình huống “Trạng thái thực thi lệnh” cho Authorized controller; đổi 10:44:00 và làm Hiện tại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Refresh command evidence” chỉ tới O19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O20 — Kiểm tra trước khi đóng sự cố

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O20

**Hình chính:** Điều kiện chặn đóng nêu SOS mở và người chưa xác minh

**Câu hỏi chính:** Trong “Kiểm tra trước khi đóng sự cố”, SOS đang mở, Người chưa xác nhận cho biết điều gì và vai trò Supervisor có thể thực hiện “Close demo incident” trong phạm vi này không?

**Hành động chính:** Đóng sự cố · mô phỏng → O21

**Chi tiết mở rộng:** Giữ SOS đang mở, Người chưa xác nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Các đội, Lý do, Người duyệt, lịch sử nguồn, phiên bản và quy tắc FR-O20 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** SOS mở và người chưa xác minh vẫn là chặn hoặc cần quyết định có quản trị; đóng màn không phải đóng sự cố.

**Kiểm chứng:** Dùng tình huống “Kiểm tra trước khi đóng sự cố” cho Supervisor; đổi SOS đang mở và làm Người duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Close demo incident” chỉ tới O21 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O21 — Đánh giá sau sự cố

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O21

**Hình chính:** Biểu đồ thời gian phản ứng, thiếu giao nhận và người cải tiến

**Câu hỏi chính:** Trong “Đánh giá sau sự cố”, Tiếp nhận đầu tiên, Nhận nhiệm vụ cho biết điều gì và vai trò Supervisor có thể thực hiện “Create improvement action” trong phạm vi này không?

**Hành động chính:** Tạo việc cải tiến → O22

**Chi tiết mở rộng:** Giữ Tiếp nhận đầu tiên, Nhận nhiệm vụ ở lớp quyết định. Đưa chi tiết hỗ trợ của Khoảng trống gửi tin, Cải tiến, lịch sử nguồn, phiên bản và quy tắc FR-O21 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Đánh giá sau sự cố” cho Supervisor; đổi Tiếp nhận đầu tiên và làm Cải tiến không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Create improvement action” chỉ tới O22 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O22 — Hành động cải tiến

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O22

**Hình chính:** Việc cải tiến với người chịu trách nhiệm và hạn

**Câu hỏi chính:** Trong “Hành động cải tiến”, Hành động, Người phụ trách cho biết điều gì và vai trò Supervisor có thể thực hiện “Save action” trong phạm vi này không?

**Hành động chính:** Lưu việc → O21

**Chi tiết mở rộng:** Giữ Hành động, Người phụ trách ở lớp quyết định. Đưa chi tiết hỗ trợ của Hạn hoàn thành, Sự cố liên kết, lịch sử nguồn, phiên bản và quy tắc FR-O22 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Hành động cải tiến” cho Supervisor; đổi Hành động và làm Sự cố liên kết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save action” chỉ tới O21 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O23 — Lập lịch diễn tập

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O23

**Hình chính:** Lịch diễn tập tách rõ môi trường thực

**Câu hỏi chính:** Trong “Lập lịch diễn tập”, Kịch bản, Môi trường cho biết điều gì và vai trò Supervisor có thể thực hiện “Open drill control” trong phạm vi này không?

**Hành động chính:** Mở điều khiển diễn tập → O24

**Chi tiết mở rộng:** Giữ Kịch bản, Môi trường ở lớp quyết định. Đưa chi tiết hỗ trợ của Người tham gia, Bắt đầu, lịch sử nguồn, phiên bản và quy tắc FR-O23 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Lập lịch diễn tập” cho Supervisor; đổi Kịch bản và làm Bắt đầu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open drill control” chỉ tới O24 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O24 — Điều hành diễn tập

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O24

**Hình chính:** Bảng tiến trình diễn tập có trạng thái cách ly thiết bị

**Câu hỏi chính:** Trong “Điều hành diễn tập”, Chế độ, Thiết bị điều khiển thật cho biết điều gì và vai trò Supervisor có thể thực hiện “Review drill report” trong phạm vi này không?

**Hành động chính:** Xem báo cáo diễn tập → O21

**Chi tiết mở rộng:** Giữ Chế độ, Thiết bị điều khiển thật ở lớp quyết định. Đưa chi tiết hỗ trợ của Người nhận thử, Bước hoàn tất, lịch sử nguồn, phiên bản và quy tắc FR-O24 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Điều hành diễn tập” cho Supervisor; đổi Chế độ và làm Bước hoàn tất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review drill report” chỉ tới O21 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O25 — Bàn giao ca trực

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O25

**Hình chính:** Chuyển trách nhiệm ca với việc chưa hoàn tất

**Câu hỏi chính:** Trong “Bàn giao ca trực”, Ca bàn giao, Ca tiếp nhận cho biết điều gì và vai trò Supervisor có thể thực hiện “Record handover” trong phạm vi này không?

**Hành động chính:** Ghi bàn giao → O01

**Chi tiết mở rộng:** Giữ Ca bàn giao, Ca tiếp nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Sự cố đang mở, Việc còn lại, Xác nhận tiếp nhận, lịch sử nguồn, phiên bản và quy tắc FR-O25 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Bàn giao ca trực” cho Supervisor; đổi Ca bàn giao và làm Xác nhận tiếp nhận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Record handover” chỉ tới O01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O26 — Vận hành nơi trú ẩn

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O26

**Hình chính:** Bảng sức chứa nơi trú gồm chưa rõ và báo cáo hết hạn

**Câu hỏi chính:** Trong “Vận hành nơi trú ẩn”, North shelter, West center cho biết điều gì và vai trò Operator có thể thực hiện “Edit shelter” trong phạm vi này không?

**Hành động chính:** Sửa nơi trú → O27

**Chi tiết mở rộng:** Giữ North shelter, West center ở lớp quyết định. Đưa chi tiết hỗ trợ của South shelter, Lần cập nhật gần nhất, lịch sử nguồn, phiên bản và quy tắc FR-O26 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Vận hành nơi trú ẩn” cho Operator; đổi North shelter và làm Lần cập nhật gần nhất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit shelter” chỉ tới O27 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O27 — Cập nhật nơi trú ẩn

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O27

**Hình chính:** Sửa nơi trú cạnh xem trước sức chứa và hiệu lực

**Câu hỏi chính:** Trong “Cập nhật nơi trú ẩn”, Nơi trú ẩn, Trạng thái cho biết điều gì và vai trò Operator có thể thực hiện “Publish demo update” trong phạm vi này không?

**Hành động chính:** Công bố cập nhật · mô phỏng → O26

**Chi tiết mở rộng:** Giữ Nơi trú ẩn, Trạng thái ở lớp quyết định. Đưa chi tiết hỗ trợ của Chỗ còn lại, Khả năng tiếp cận, Hiệu lực đến, lịch sử nguồn, phiên bản và quy tắc FR-O27 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Cập nhật nơi trú ẩn” cho Operator; đổi Nơi trú ẩn và làm Hiệu lực đến không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish demo update” chỉ tới O26 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O28 — Nguồn cảnh báo thiên tai

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O28

**Hình chính:** Hàng đợi khuyến cáo vùng có nguồn và bản thay thế

**Câu hỏi chính:** Trong “Nguồn cảnh báo thiên tai”, CAP-041, CAP-039 cho biết điều gì và vai trò Operator có thể thực hiện “Inspect advisory” trong phạm vi này không?

**Hành động chính:** Kiểm tra khuyến cáo → O29

**Chi tiết mở rộng:** Giữ CAP-041, CAP-039 ở lớp quyết định. Đưa chi tiết hỗ trợ của CAP-038, lịch sử nguồn, phiên bản và quy tắc FR-O28 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Nguồn cảnh báo thiên tai” cho Operator; đổi CAP-041 và làm CAP-038 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Inspect advisory” chỉ tới O29 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O29 — Kiểm tra thông điệp CAP

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O29

**Hình chính:** Chuỗi thông điệp CAP có tham chiếu sửa, hủy và hết hạn

**Câu hỏi chính:** Trong “Kiểm tra thông điệp CAP”, Bên phát, Định danh cho biết điều gì và vai trò Operator có thể thực hiện “Create local response” trong phạm vi này không?

**Hành động chính:** Tạo phản ứng địa phương → O06

**Chi tiết mở rộng:** Giữ Bên phát, Định danh ở lớp quyết định. Đưa chi tiết hỗ trợ của Loại thông điệp, Tham chiếu, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-O29 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Kiểm tra thông điệp CAP” cho Operator; đổi Bên phát và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Create local response” chỉ tới O06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O30 — Tìm kiếm và lịch sử kiểm toán

**Bối cảnh:** command · **Vai trò:** Auditor · **FR:** FR-O30

**Hình chính:** Dòng kiểm toán có người thao tác, phạm vi và sự kiện

**Câu hỏi chính:** Trong “Tìm kiếm và lịch sử kiểm toán”, Truy vấn, Create cho biết điều gì và vai trò Auditor có thể thực hiện “Inspect audit entry” trong phạm vi này không?

**Hành động chính:** Kiểm tra nhật ký → T11

**Chi tiết mở rộng:** Giữ Truy vấn, Create ở lớp quyết định. Đưa chi tiết hỗ trợ của Dispatch, Xuất dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-O30 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Tìm kiếm và lịch sử kiểm toán” cho Auditor; đổi Truy vấn và làm Xuất dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect audit entry” chỉ tới T11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S01 — Danh mục địa điểm

**Bối cảnh:** configuration · **Vai trò:** Site admin · **FR:** FR-S01

**Hình chính:** Bản đồ và danh bạ cơ sở có ranh giới vùng

**Câu hỏi chính:** Trong “Danh mục địa điểm”, Harbor Campus, Riverside cho biết điều gì và vai trò Site admin có thể thực hiện “Open site” trong phạm vi này không?

**Hành động chính:** Mở cơ sở → S02

**Chi tiết mở rộng:** Giữ Harbor Campus, Riverside ở lớp quyết định. Đưa chi tiết hỗ trợ của North highway, lịch sử nguồn, phiên bản và quy tắc FR-S01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Danh mục địa điểm” cho Site admin; đổi Harbor Campus và làm North highway không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open site” chỉ tới S02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S02 — Cấu trúc địa điểm

**Bối cảnh:** configuration · **Vai trò:** Site admin · **FR:** FR-S02

**Hình chính:** Cây tòa, tầng, vùng với bối cảnh không gian được chọn

**Câu hỏi chính:** Trong “Cấu trúc địa điểm”, Building A, Floor 05 cho biết điều gì và vai trò Site admin có thể thực hiện “Edit location” trong phạm vi này không?

**Hành động chính:** Sửa vị trí → S03

**Chi tiết mở rộng:** Giữ Building A, Floor 05 ở lớp quyết định. Đưa chi tiết hỗ trợ của Zone A05-03, Assembly, lịch sử nguồn, phiên bản và quy tắc FR-S02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Cấu trúc địa điểm” cho Site admin; đổi Building A và làm Assembly không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit location” chỉ tới S03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S03 — Chỉnh sửa vị trí

**Bối cảnh:** configuration · **Vai trò:** Site admin · **FR:** FR-S03

**Hình chính:** Đường dẫn vị trí cha cạnh tọa độ và xem trước tầng

**Câu hỏi chính:** Trong “Chỉnh sửa vị trí”, Tên, Vị trí cha cho biết điều gì và vai trò Site admin có thể thực hiện “Save location” trong phạm vi này không?

**Hành động chính:** Lưu vị trí → S02

**Chi tiết mở rộng:** Giữ Tên, Vị trí cha ở lớp quyết định. Đưa chi tiết hỗ trợ của Tọa độ, Mã tầng, Múi giờ, lịch sử nguồn, phiên bản và quy tắc FR-S03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Chỉnh sửa vị trí” cho Site admin; đổi Tên và làm Múi giờ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save location” chỉ tới S02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S04 — Biên tập sơ đồ tầng

**Bối cảnh:** configuration · **Vai trò:** Site admin · **FR:** FR-S04

**Hình chính:** Khung mặt bằng có lối ra, nơi lánh nạn và khác biệt phiên bản

**Câu hỏi chính:** Trong “Biên tập sơ đồ tầng”, Sơ đồ / kế hoạch, Bản sửa đổi cho biết điều gì và vai trò Site admin có thể thực hiện “Review plan publication” trong phạm vi này không?

**Hành động chính:** Xem công bố mặt bằng → S05

**Chi tiết mở rộng:** Giữ Sơ đồ / kế hoạch, Bản sửa đổi ở lớp quyết định. Đưa chi tiết hỗ trợ của Lối thoát, Điểm chờ hỗ trợ, Lớp nguy cơ, lịch sử nguồn, phiên bản và quy tắc FR-S04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Biên tập sơ đồ tầng” cho Site admin; đổi Sơ đồ / kế hoạch và làm Lớp nguy cơ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review plan publication” chỉ tới S05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S05 — Phê duyệt và phiên bản sơ đồ

**Bối cảnh:** configuration · **Vai trò:** Supervisor · **FR:** FR-S05

**Hình chính:** So sánh phiên bản mặt bằng với trạng thái công bố, nháp

**Câu hỏi chính:** Trong “Phê duyệt và phiên bản sơ đồ”, Revision 13, Revision 12 cho biết điều gì và vai trò Supervisor có thể thực hiện “Publish reviewed draft — demo” trong phạm vi này không?

**Hành động chính:** Công bố nháp đã duyệt · mô phỏng → S04

**Chi tiết mở rộng:** Giữ Revision 13, Revision 12 ở lớp quyết định. Đưa chi tiết hỗ trợ của Revision 11, lịch sử nguồn, phiên bản và quy tắc FR-S05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Phê duyệt và phiên bản sơ đồ” cho Supervisor; đổi Revision 13 và làm Revision 11 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Publish reviewed draft — demo” chỉ tới S04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S06 — Danh mục thiết bị

**Bối cảnh:** configuration · **Vai trò:** Device admin · **FR:** FR-S06

**Hình chính:** Danh mục thiết bị theo chức năng vật lý và sức khỏe

**Câu hỏi chính:** Trong “Danh mục thiết bị”, CAM-A05-03, SMK-A05-03 cho biết điều gì và vai trò Device admin có thể thực hiện “Open device” trong phạm vi này không?

**Hành động chính:** Mở thiết bị → S07

**Chi tiết mở rộng:** Giữ CAM-A05-03, SMK-A05-03 ở lớp quyết định. Đưa chi tiết hỗ trợ của GW-012, WR-401, lịch sử nguồn, phiên bản và quy tắc FR-S06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Danh mục thiết bị” cho Device admin; đổi CAM-A05-03 và làm WR-401 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open device” chỉ tới S07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S07 — Chi tiết và sức khỏe thiết bị

**Bối cảnh:** configuration · **Vai trò:** Device admin · **FR:** FR-S07

**Hình chính:** Sơ đồ thiết bị với bằng chứng nhịp sống, chứng chỉ, firmware

**Câu hỏi chính:** Trong “Chi tiết và sức khỏe thiết bị”, Chứng thư, Heartbeat gần nhất cho biết điều gì và vai trò Device admin có thể thực hiện “Review device configuration” trong phạm vi này không?

**Hành động chính:** Xem cấu hình thiết bị → S08

**Chi tiết mở rộng:** Giữ Chứng thư, Heartbeat gần nhất ở lớp quyết định. Đưa chi tiết hỗ trợ của Firmware, Vị trí, lịch sử nguồn, phiên bản và quy tắc FR-S07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Chi tiết và sức khỏe thiết bị” cho Device admin; đổi Chứng thư và làm Vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review device configuration” chỉ tới S08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S08 — Đăng ký thiết bị

**Bối cảnh:** configuration · **Vai trò:** Device admin · **FR:** FR-S08

**Hình chính:** Chuỗi đăng ký nối số máy, cơ sở và năng lực khai báo

**Câu hỏi chính:** Trong “Đăng ký thiết bị”, Số seri, Mã đăng ký cho biết điều gì và vai trò Device admin có thể thực hiện “Enroll simulated device” trong phạm vi này không?

**Hành động chính:** Đăng ký thiết bị mô phỏng → S07

**Chi tiết mở rộng:** Giữ Số seri, Mã đăng ký ở lớp quyết định. Đưa chi tiết hỗ trợ của Vị trí, Năng lực, lịch sử nguồn, phiên bản và quy tắc FR-S08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Đăng ký thiết bị” cho Device admin; đổi Số seri và làm Năng lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Enroll simulated device” chỉ tới S07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S09 — Giám sát camera

**Bối cảnh:** configuration · **Vai trò:** Operator · **FR:** FR-S09

**Hình chính:** Ô camera có kiểm quyền, thời điểm và trạng thái mất nguồn

**Câu hỏi chính:** Trong “Giám sát camera”, CAM-A05-01, CAM-A05-02 cho biết điều gì và vai trò Operator có thể thực hiện “Open detection evidence” trong phạm vi này không?

**Hành động chính:** Mở bằng chứng phát hiện → O05

**Chi tiết mở rộng:** Giữ CAM-A05-01, CAM-A05-02 ở lớp quyết định. Đưa chi tiết hỗ trợ của CAM-A05-03, Truy cập, lịch sử nguồn, phiên bản và quy tắc FR-S09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Giám sát camera” cho Operator; đổi CAM-A05-01 và làm Truy cập không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open detection evidence” chỉ tới O05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S10 — Bảo trì và hiệu chuẩn

**Bối cảnh:** configuration · **Vai trò:** Device admin · **FR:** FR-S10

**Hình chính:** Cửa sổ bảo trì cạnh bản đồ phủ dự phòng

**Câu hỏi chính:** Trong “Bảo trì và hiệu chuẩn”, Thiết bị, Khoảng thời gian cho biết điều gì và vai trò Device admin có thể thực hiện “Schedule maintenance” trong phạm vi này không?

**Hành động chính:** Lên lịch bảo trì → S06

**Chi tiết mở rộng:** Giữ Thiết bị, Khoảng thời gian ở lớp quyết định. Đưa chi tiết hỗ trợ của Bao phủ thay thế, Người duyệt, lịch sử nguồn, phiên bản và quy tắc FR-S10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Bảo trì và hiệu chuẩn” cho Device admin; đổi Thiết bị và làm Người duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Schedule maintenance” chỉ tới S06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S11 — Thư viện quy tắc

**Bối cảnh:** configuration · **Vai trò:** Rule author · **FR:** FR-S11

**Hình chính:** Danh sách quy tắc có phiên bản, loại nguy cơ và phạm vi

**Câu hỏi chính:** Trong “Thư viện quy tắc”, Fire rule v4, Fall rule v2 cho biết điều gì và vai trò Rule author có thể thực hiện “Edit rule” trong phạm vi này không?

**Hành động chính:** Sửa quy tắc → S12

**Chi tiết mở rộng:** Giữ Fire rule v4, Fall rule v2 ở lớp quyết định. Đưa chi tiết hỗ trợ của Road collision v1, Flood threshold v3, lịch sử nguồn, phiên bản và quy tắc FR-S11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Thư viện quy tắc” cho Rule author; đổi Fire rule v4 và làm Flood threshold v3 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit rule” chỉ tới S12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S12 — Biên tập và mô phỏng quy tắc

**Bối cảnh:** configuration · **Vai trò:** Rule author · **FR:** FR-S12

**Hình chính:** Luồng điều kiện, hành động cạnh nhãn chỉ mô phỏng

**Câu hỏi chính:** Trong “Biên tập và mô phỏng quy tắc”, Quy tắc, Tình trạng cho biết điều gì và vai trò Rule author có thể thực hiện “View simulation results” trong phạm vi này không?

**Hành động chính:** Xem kết quả mô phỏng → S13

**Chi tiết mở rộng:** Giữ Quy tắc, Tình trạng ở lớp quyết định. Đưa chi tiết hỗ trợ của Khoảng thời gian, Hành động, Chế độ, lịch sử nguồn, phiên bản và quy tắc FR-S12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Biên tập và mô phỏng quy tắc” cho Rule author; đổi Quy tắc và làm Chế độ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “View simulation results” chỉ tới S13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S13 — Kiểm thử và duyệt quy tắc

**Bối cảnh:** configuration · **Vai trò:** Rule approver · **FR:** FR-S13

**Hình chính:** Lưới kết quả ca thử có bằng chứng gộp sai

**Câu hỏi chính:** Trong “Kiểm thử và duyệt quy tắc”, Ca thử, Gộp nhầm cho biết điều gì và vai trò Rule approver có thể thực hiện “Return rule for changes” trong phạm vi này không?

**Hành động chính:** Trả quy tắc để sửa → S12

**Chi tiết mở rộng:** Giữ Ca thử, Gộp nhầm ở lớp quyết định. Đưa chi tiết hỗ trợ của Phiên bản, Người kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-S13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Kiểm thử và duyệt quy tắc” cho Rule approver; đổi Ca thử và làm Người kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Return rule for changes” chỉ tới S12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S14 — Giám sát mô hình AI

**Bối cảnh:** configuration · **Vai trò:** Model operator · **FR:** FR-S14

**Hình chính:** Xu hướng chất lượng mô hình có nguồn mẫu và sai lệch

**Câu hỏi chính:** Trong “Giám sát mô hình AI”, Mô hình, Mẫu được gán nhãn cho biết điều gì và vai trò Model operator có thể thực hiện “Open review queue” trong phạm vi này không?

**Hành động chính:** Mở hàng đợi đánh giá → O03

**Chi tiết mở rộng:** Giữ Mô hình, Mẫu được gán nhãn ở lớp quyết định. Đưa chi tiết hỗ trợ của Kiểm tra báo nhầm, Sai lệch dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-S14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Giám sát mô hình AI” cho Model operator; đổi Mô hình và làm Sai lệch dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open review queue” chỉ tới O03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I01 — Danh mục kết nối

**Bối cảnh:** configuration · **Vai trò:** Integration admin · **FR:** FR-I01

**Hình chính:** Danh mục kết nối theo năng lực sự kiện, khuyến cáo, điều khiển

**Câu hỏi chính:** Trong “Danh mục kết nối”, MQTT sensors, CAP authority cho biết điều gì và vai trò Integration admin có thể thực hiện “Configure connector” trong phạm vi này không?

**Hành động chính:** Cấu hình kết nối → I02

**Chi tiết mở rộng:** Giữ MQTT sensors, CAP authority ở lớp quyết định. Đưa chi tiết hỗ trợ của MAVLink gateway, IOC bridge, lịch sử nguồn, phiên bản và quy tắc FR-I01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Danh mục kết nối” cho Integration admin; đổi MQTT sensors và làm IOC bridge không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Configure connector” chỉ tới I02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I02 — Thiết lập kết nối

**Bối cảnh:** configuration · **Vai trò:** Integration admin · **FR:** FR-I02

**Hình chính:** Luồng cấu hình nối điểm cuối, vùng và năng lực

**Câu hỏi chính:** Trong “Thiết lập kết nối”, Loại, Địa chỉ kết nối cho biết điều gì và vai trò Integration admin có thể thực hiện “Test connection” trong phạm vi này không?

**Hành động chính:** Thử kết nối → I03

**Chi tiết mở rộng:** Giữ Loại, Địa chỉ kết nối ở lớp quyết định. Đưa chi tiết hỗ trợ của Vùng dữ liệu, Xác thực, Năng lực, lịch sử nguồn, phiên bản và quy tắc FR-I02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Thiết lập kết nối” cho Integration admin; đổi Loại và làm Năng lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Test connection” chỉ tới I03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I03 — Ánh xạ dữ liệu

**Bối cảnh:** configuration · **Vai trò:** Integration admin · **FR:** FR-I03

**Hình chính:** Ánh xạ nguồn, đích có đơn vị và làn trường chưa rõ

**Câu hỏi chính:** Trong “Ánh xạ dữ liệu”, Trường nguồn, Đích cho biết điều gì và vai trò Integration admin có thể thực hiện “Run contract tests” trong phạm vi này không?

**Hành động chính:** Chạy thử hợp đồng → I04

**Chi tiết mở rộng:** Giữ Trường nguồn, Đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Đơn vị, Vị trí, Trường chưa biết, lịch sử nguồn, phiên bản và quy tắc FR-I03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Ánh xạ dữ liệu” cho Integration admin; đổi Trường nguồn và làm Trường chưa biết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Run contract tests” chỉ tới I04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I04 — Kiểm thử kết nối

**Bối cảnh:** configuration · **Vai trò:** Integration admin · **FR:** FR-I04

**Hình chính:** Ma trận thử hợp đồng tách mẫu được nhận và bị từ chối

**Câu hỏi chính:** Trong “Kiểm thử kết nối”, Sự kiện hợp lệ, Sự kiện trùng cho biết điều gì và vai trò Integration admin có thể thực hiện “Enable demo connector” trong phạm vi này không?

**Hành động chính:** Bật kết nối · mô phỏng → I05

**Chi tiết mở rộng:** Giữ Sự kiện hợp lệ, Sự kiện trùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Sai tổ chức, Chứng thư hết hạn, lịch sử nguồn, phiên bản và quy tắc FR-I04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Kiểm thử kết nối” cho Integration admin; đổi Sự kiện hợp lệ và làm Chứng thư hết hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Enable demo connector” chỉ tới I05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I05 — Sức khỏe các kết nối

**Bối cảnh:** configuration · **Vai trò:** Integration admin · **FR:** FR-I05

**Hình chính:** Làn sức khỏe kết nối có trễ, lỗi và tuổi dữ liệu

**Câu hỏi chính:** Trong “Sức khỏe các kết nối”, MQTT bridge, IOC bridge cho biết điều gì và vai trò Integration admin có thể thực hiện “Inspect dead letters” trong phạm vi này không?

**Hành động chính:** Kiểm tra thư lỗi → I06

**Chi tiết mở rộng:** Giữ MQTT bridge, IOC bridge ở lớp quyết định. Đưa chi tiết hỗ trợ của CAP feed, Drone bridge, lịch sử nguồn, phiên bản và quy tắc FR-I05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Sức khỏe các kết nối” cho Integration admin; đổi MQTT bridge và làm Drone bridge không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect dead letters” chỉ tới I06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I06 — Xử lý lỗi và phát lại sự kiện

**Bối cảnh:** configuration · **Vai trò:** Integration admin · **FR:** FR-I06

**Hình chính:** Đối chiếu payload lỗi và điều kiện phát lại

**Câu hỏi chính:** Trong “Xử lý lỗi và phát lại sự kiện”, Sự kiện, Lỗi cho biết điều gì và vai trò Integration admin có thể thực hiện “Replay simulated event” trong phạm vi này không?

**Hành động chính:** Phát lại sự kiện mô phỏng → I05

**Chi tiết mở rộng:** Giữ Sự kiện, Lỗi ở lớp quyết định. Đưa chi tiết hỗ trợ của Hiệu chỉnh, Phát lại, lịch sử nguồn, phiên bản và quy tắc FR-I06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Xử lý lỗi và phát lại sự kiện” cho Integration admin; đổi Sự kiện và làm Phát lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Replay simulated event” chỉ tới I05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I07 — API client và phạm vi quyền

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-I07

**Hình chính:** Lưới phạm vi API với thông tin bí mật che và hết hạn

**Câu hỏi chính:** Trong “API client và phạm vi quyền”, Ứng dụng kết nối, Phạm vi quyền cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save client” trong phạm vi này không?

**Hành động chính:** Lưu client → I08

**Chi tiết mở rộng:** Giữ Ứng dụng kết nối, Phạm vi quyền ở lớp quyết định. Đưa chi tiết hỗ trợ của Vùng dữ liệu, Thông tin bí mật, Hết hạn, lịch sử nguồn, phiên bản và quy tắc FR-I07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “API client và phạm vi quyền” cho Tenant admin; đổi Ứng dụng kết nối và làm Hết hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save client” chỉ tới I08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I08 — Đăng ký webhook

**Bối cảnh:** configuration · **Vai trò:** Integration admin · **FR:** FR-I08

**Hình chính:** Sơ đồ webhook có chữ ký và chính sách thử lại

**Câu hỏi chính:** Trong “Đăng ký webhook”, URL, Sự kiện cho biết điều gì và vai trò Integration admin có thể thực hiện “Send test payload” trong phạm vi này không?

**Hành động chính:** Gửi payload thử → I04

**Chi tiết mở rộng:** Giữ URL, Sự kiện ở lớp quyết định. Đưa chi tiết hỗ trợ của Chữ ký, Thử lại, lịch sử nguồn, phiên bản và quy tắc FR-I08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Đăng ký webhook” cho Integration admin; đổi URL và làm Thử lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Send test payload” chỉ tới I04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I09 — Thỏa thuận trao đổi dữ liệu

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-I09

**Hình chính:** Ranh giới chia sẻ đối tác với lưu giữ và trạng thái duyệt

**Câu hỏi chính:** Trong “Thỏa thuận trao đổi dữ liệu”, Đối tác, Mục đích cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save agreement draft” trong phạm vi này không?

**Hành động chính:** Lưu nháp thỏa thuận → I10

**Chi tiết mở rộng:** Giữ Đối tác, Mục đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Trường dữ liệu, Thời gian lưu, Phê duyệt, lịch sử nguồn, phiên bản và quy tắc FR-I09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Thỏa thuận trao đổi dữ liệu” cho Tenant admin; đổi Đối tác và làm Phê duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save agreement draft” chỉ tới I10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I10 — Lịch sử trao đổi IOC

**Bối cảnh:** configuration · **Vai trò:** Operator · **FR:** FR-I10

**Hình chính:** Dòng trao đổi có phạm vi payload và mã biên nhận

**Câu hỏi chính:** Trong “Lịch sử trao đổi IOC”, INC-2041, SOS-041 cho biết điều gì và vai trò Operator có thể thực hiện “Inspect payload” trong phạm vi này không?

**Hành động chính:** Kiểm tra payload → I04

**Chi tiết mở rộng:** Giữ INC-2041, SOS-041 ở lớp quyết định. Đưa chi tiết hỗ trợ của Update 4, lịch sử nguồn, phiên bản và quy tắc FR-I10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Lịch sử trao đổi IOC” cho Operator; đổi INC-2041 và làm Update 4 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Inspect payload” chỉ tới I04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I11 — Đội drone

**Bối cảnh:** configuration · **Vai trò:** Drone operator · **FR:** FR-I11

**Hình chính:** Thẻ sẵn sàng đội bay có pin, khả dụng và quyền phi công

**Câu hỏi chính:** Trong “Đội drone”, DR-01, DR-02 cho biết điều gì và vai trò Drone operator có thể thực hiện “Plan mission” trong phạm vi này không?

**Hành động chính:** Lập nhiệm vụ → I12

**Chi tiết mở rộng:** Giữ DR-01, DR-02 ở lớp quyết định. Đưa chi tiết hỗ trợ của DR-03, Điều khiển, lịch sử nguồn, phiên bản và quy tắc FR-I11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Đội drone” cho Drone operator; đổi DR-01 và làm Điều khiển không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Plan mission” chỉ tới I12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I12 — Lập nhiệm vụ drone

**Bối cảnh:** configuration · **Vai trò:** Drone operator · **FR:** FR-I12

**Hình chính:** Rào địa lý nhiệm vụ với phi công, thời tiết và thẩm quyền

**Câu hỏi chính:** Trong “Lập nhiệm vụ drone”, Mục đích, Ranh giới địa lý cho biết điều gì và vai trò Drone operator có thể thực hiện “Review mission approval” trong phạm vi này không?

**Hành động chính:** Xem duyệt nhiệm vụ → I13

**Chi tiết mở rộng:** Giữ Mục đích, Ranh giới địa lý ở lớp quyết định. Đưa chi tiết hỗ trợ của Phi công, Thời tiết, Thẩm quyền, lịch sử nguồn, phiên bản và quy tắc FR-I12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Lập nhiệm vụ drone” cho Drone operator; đổi Mục đích và làm Thẩm quyền không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review mission approval” chỉ tới I13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I13 — Kiểm tra trước bay và phê duyệt

**Bối cảnh:** configuration · **Vai trò:** Drone supervisor · **FR:** FR-I13

**Hình chính:** Cổng trước bay có kế hoạch mất nối và duyệt phi công

**Câu hỏi chính:** Trong “Kiểm tra trước bay và phê duyệt”, Phi công, Pin cho biết điều gì và vai trò Drone supervisor có thể thực hiện “Approve simulated mission” trong phạm vi này không?

**Hành động chính:** Duyệt nhiệm vụ mô phỏng → I14

**Chi tiết mở rộng:** Giữ Phi công, Pin ở lớp quyết định. Đưa chi tiết hỗ trợ của Ranh giới địa lý, Cho phép hoạt động, Phương án mất liên lạc, lịch sử nguồn, phiên bản và quy tắc FR-I13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Kiểm tra trước bay và phê duyệt” cho Drone supervisor; đổi Phi công và làm Phương án mất liên lạc không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve simulated mission” chỉ tới I14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I14 — Theo dõi nhiệm vụ drone

**Bối cảnh:** command · **Vai trò:** Drone operator · **FR:** FR-I14

**Hình chính:** Dải đo xa có cảnh báo cũ và chủ quyền điều khiển cục bộ

**Câu hỏi chính:** Trong “Theo dõi nhiệm vụ drone”, Trạng thái bay, Độ cao cho biết điều gì và vai trò Drone operator có thể thực hiện “Review mission record” trong phạm vi này không?

**Hành động chính:** Xem hồ sơ nhiệm vụ → I15

**Chi tiết mở rộng:** Giữ Trạng thái bay, Độ cao ở lớp quyết định. Đưa chi tiết hỗ trợ của Pin, Độ cũ telemetry, Điều hành, lịch sử nguồn, phiên bản và quy tắc FR-I14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Theo dõi nhiệm vụ drone” cho Drone operator; đổi Trạng thái bay và làm Điều hành không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review mission record” chỉ tới I15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### I15 — Hồ sơ nhiệm vụ drone

**Bối cảnh:** configuration · **Vai trò:** Drone operator · **FR:** FR-I15

**Hình chính:** Dòng bằng chứng nhiệm vụ có nhật ký bay và phi công

**Câu hỏi chính:** Trong “Hồ sơ nhiệm vụ drone”, Nhiệm vụ bay, Sự cố cho biết điều gì và vai trò Drone operator có thể thực hiện “Return to fleet” trong phạm vi này không?

**Hành động chính:** Về đội bay → I11

**Chi tiết mở rộng:** Giữ Nhiệm vụ bay, Sự cố ở lớp quyết định. Đưa chi tiết hỗ trợ của Nhật ký bay, Kết quả, Phi công, lịch sử nguồn, phiên bản và quy tắc FR-I15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Kiểm chứng:** Dùng tình huống “Hồ sơ nhiệm vụ drone” cho Drone operator; đổi Nhiệm vụ bay và làm Phi công không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Return to fleet” chỉ tới I11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T01 — Tổng quan tổ chức

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-T01

**Hình chính:** Tóm tắt sức khỏe tổ chức với vùng và phân bổ năng lực

**Câu hỏi chính:** Trong “Tổng quan tổ chức”, Vùng dữ liệu, Địa điểm cho biết điều gì và vai trò Tenant admin có thể thực hiện “Manage organization” trong phạm vi này không?

**Hành động chính:** Quản lý tổ chức → T02

**Chi tiết mở rộng:** Giữ Vùng dữ liệu, Địa điểm ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị theo gói, Sức khỏe vận hành, lịch sử nguồn, phiên bản và quy tắc FR-T01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Tổng quan tổ chức” cho Tenant admin; đổi Vùng dữ liệu và làm Sức khỏe vận hành không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Manage organization” chỉ tới T02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T02 — Tổ chức và vùng dữ liệu

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-T02

**Hình chính:** Ranh giới vùng tổ chức cạnh ngôn ngữ và múi giờ

**Câu hỏi chính:** Trong “Tổ chức và vùng dữ liệu”, Tổ chức, Vùng chính cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save settings” trong phạm vi này không?

**Hành động chính:** Lưu cấu hình → T01

**Chi tiết mở rộng:** Giữ Tổ chức, Vùng chính ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ / vùng, Múi giờ, Chuyển dữ liệu liên vùng, lịch sử nguồn, phiên bản và quy tắc FR-T02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Tổ chức và vùng dữ liệu” cho Tenant admin; đổi Tổ chức và làm Chuyển dữ liệu liên vùng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save settings” chỉ tới T01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T03 — Người dùng và lời mời

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-T03

**Hình chính:** Danh sách thành viên có vòng đời lời mời và vai trò

**Câu hỏi chính:** Trong “Người dùng và lời mời”, Alex, Jamie cho biết điều gì và vai trò Tenant admin có thể thực hiện “Edit membership” trong phạm vi này không?

**Hành động chính:** Sửa thành viên → T04

**Chi tiết mở rộng:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Service client, lịch sử nguồn, phiên bản và quy tắc FR-T03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Người dùng và lời mời” cho Tenant admin; đổi Alex và làm Service client không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit membership” chỉ tới T04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T04 — Vai trò và phạm vi quyền

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-T04

**Hình chính:** Ma trận quyền theo cơ sở có năng lực bị cấm rõ

**Câu hỏi chính:** Trong “Vai trò và phạm vi quyền”, Vai trò, Địa điểm cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save role” trong phạm vi này không?

**Hành động chính:** Lưu vai trò → T03

**Chi tiết mở rộng:** Giữ Vai trò, Địa điểm ở lớp quyết định. Đưa chi tiết hỗ trợ của Quyền, Giới hạn, lịch sử nguồn, phiên bản và quy tắc FR-T04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Vai trò và phạm vi quyền” cho Tenant admin; đổi Vai trò và làm Giới hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save role” chỉ tới T03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T05 — Lịch trực và chuyển cấp

**Bối cảnh:** configuration · **Vai trò:** Supervisor · **FR:** FR-T05

**Hình chính:** Thang tăng cấp có thời điểm đổi người và độ phủ lịch

**Câu hỏi chính:** Trong “Lịch trực và chuyển cấp”, Chính, After 60 seconds cho biết điều gì và vai trò Supervisor có thể thực hiện “Save escalation” trong phạm vi này không?

**Hành động chính:** Lưu tăng cấp → T01

**Chi tiết mở rộng:** Giữ Chính, After 60 seconds ở lớp quyết định. Đưa chi tiết hỗ trợ của After 120 seconds, Lịch, lịch sử nguồn, phiên bản và quy tắc FR-T05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Lịch trực và chuyển cấp” cho Supervisor; đổi Chính và làm Lịch không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save escalation” chỉ tới T01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T06 — Mẫu nội dung và ngôn ngữ

**Bối cảnh:** configuration · **Vai trò:** Content editor · **FR:** FR-T06

**Hình chính:** Xem trước tin đa ngôn ngữ với biến và dự phòng

**Câu hỏi chính:** Trong “Mẫu nội dung và ngôn ngữ”, Mẫu nội dung, Tiếng Anh cho biết điều gì và vai trò Content editor có thể thực hiện “Preview template” trong phạm vi này không?

**Hành động chính:** Xem mẫu tin → O14

**Chi tiết mở rộng:** Giữ Mẫu nội dung, Tiếng Anh ở lớp quyết định. Đưa chi tiết hỗ trợ của Tiếng Nhật, Dự phòng, Biến nội dung, lịch sử nguồn, phiên bản và quy tắc FR-T06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Mẫu nội dung và ngôn ngữ” cho Content editor; đổi Mẫu nội dung và làm Biến nội dung không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Preview template” chỉ tới O14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T07 — Phân loại nguy cơ và quy trình

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-T07

**Hình chính:** Cây loại nguy cơ nối bước kịch bản nháp

**Câu hỏi chính:** Trong “Phân loại nguy cơ và quy trình”, Loại sự cố, Mức độ mặc định cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save draft playbook” trong phạm vi này không?

**Hành động chính:** Lưu nháp kịch bản → T08

**Chi tiết mở rộng:** Giữ Loại sự cố, Mức độ mặc định ở lớp quyết định. Đưa chi tiết hỗ trợ của Quy trình ứng phó, Độ nhạy cảm, lịch sử nguồn, phiên bản và quy tắc FR-T07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Phân loại nguy cơ và quy trình” cho Tenant admin; đổi Loại sự cố và làm Độ nhạy cảm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save draft playbook” chỉ tới T08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T08 — Phê duyệt quy trình

**Bối cảnh:** configuration · **Vai trò:** Supervisor · **FR:** FR-T08

**Hình chính:** Chuỗi bước kịch bản có phiên bản, timeout và trách nhiệm

**Câu hỏi chính:** Trong “Phê duyệt quy trình”, Phiên bản, Điều kiện kích hoạt cho biết điều gì và vai trò Supervisor có thể thực hiện “Publish demo playbook” trong phạm vi này không?

**Hành động chính:** Công bố kịch bản · mô phỏng → T07

**Chi tiết mở rộng:** Giữ Phiên bản, Điều kiện kích hoạt ở lớp quyết định. Đưa chi tiết hỗ trợ của Các bước, Thời hạn chờ, Người phụ trách, lịch sử nguồn, phiên bản và quy tắc FR-T08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Phê duyệt quy trình” cho Supervisor; đổi Phiên bản và làm Người phụ trách không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish demo playbook” chỉ tới T07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T09 — Lưu trữ và bảo toàn pháp lý

**Bối cảnh:** configuration · **Vai trò:** Privacy officer · **FR:** FR-T09

**Hình chính:** Dòng lưu giữ có ngoại lệ giữ pháp lý

**Câu hỏi chính:** Trong “Lưu trữ và bảo toàn pháp lý”, Vị trí chính xác, Hồ sơ sự cố cho biết điều gì và vai trò Privacy officer có thể thực hiện “Save policy draft” trong phạm vi này không?

**Hành động chính:** Lưu nháp chính sách → T10

**Chi tiết mở rộng:** Giữ Vị trí chính xác, Hồ sơ sự cố ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng, Bảo toàn pháp lý, lịch sử nguồn, phiên bản và quy tắc FR-T09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Lưu trữ và bảo toàn pháp lý” cho Privacy officer; đổi Vị trí chính xác và làm Bảo toàn pháp lý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save policy draft” chỉ tới T10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T10 — Xử lý yêu cầu quyền riêng tư

**Bối cảnh:** configuration · **Vai trò:** Privacy officer · **FR:** FR-T10

**Hình chính:** Xem trước xuất dữ liệu có xác minh và loại trừ bằng chứng

**Câu hỏi chính:** Trong “Xử lý yêu cầu quyền riêng tư”, Danh tính, Loại dữ liệu cho biết điều gì và vai trò Privacy officer có thể thực hiện “Approve demo export” trong phạm vi này không?

**Hành động chính:** Duyệt xuất · mô phỏng → C30

**Chi tiết mở rộng:** Giữ Danh tính, Loại dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng sự cố, Quyết định, lịch sử nguồn, phiên bản và quy tắc FR-T10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Xử lý yêu cầu quyền riêng tư” cho Privacy officer; đổi Danh tính và làm Quyết định không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve demo export” chỉ tới C30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T11 — Bản ghi kiểm toán

**Bối cảnh:** configuration · **Vai trò:** Auditor · **FR:** FR-T11

**Hình chính:** Sự kiện kiểm toán bất biến nối người, đối tượng và trace

**Câu hỏi chính:** Trong “Bản ghi kiểm toán”, Chủ thể thực hiện, Hành động cho biết điều gì và vai trò Auditor có thể thực hiện “Return to audit search” trong phạm vi này không?

**Hành động chính:** Về tìm kiểm toán → O30

**Chi tiết mở rộng:** Giữ Chủ thể thực hiện, Hành động ở lớp quyết định. Đưa chi tiết hỗ trợ của Đối tượng, Thời gian, Mã truy vết, lịch sử nguồn, phiên bản và quy tắc FR-T11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Bản ghi kiểm toán” cho Auditor; đổi Chủ thể thực hiện và làm Mã truy vết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Return to audit search” chỉ tới O30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T12 — Sức khỏe dịch vụ và khôi phục

**Bối cảnh:** configuration · **Vai trò:** Platform operator · **FR:** FR-T12

**Hình chính:** Sơ đồ sức khỏe phụ thuộc và sẵn sàng khôi phục

**Câu hỏi chính:** Trong “Sức khỏe dịch vụ và khôi phục”, EU ingestion, Nhà cung cấp thông báo cho biết điều gì và vai trò Platform operator có thể thực hiện “Open recovery runbook” trong phạm vi này không?

**Hành động chính:** Mở hướng dẫn khôi phục → T13

**Chi tiết mở rộng:** Giữ EU ingestion, Nhà cung cấp thông báo ở lớp quyết định. Đưa chi tiết hỗ trợ của Bản sao dữ liệu, Lần thử khôi phục, lịch sử nguồn, phiên bản và quy tắc FR-T12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Sức khỏe dịch vụ và khôi phục” cho Platform operator; đổi EU ingestion và làm Lần thử khôi phục không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open recovery runbook” chỉ tới T13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T13 — Quy trình khôi phục

**Bối cảnh:** configuration · **Vai trò:** Platform operator · **FR:** FR-T13

**Hình chính:** Danh mục khôi phục với bằng chứng xác minh từng bước

**Câu hỏi chính:** Trong “Quy trình khôi phục”, Step 1, Step 2 cho biết điều gì và vai trò Platform operator có thể thực hiện “Record drill outcome” trong phạm vi này không?

**Hành động chính:** Ghi kết quả diễn tập → T12

**Chi tiết mở rộng:** Giữ Step 1, Step 2 ở lớp quyết định. Đưa chi tiết hỗ trợ của Step 3, Step 4, lịch sử nguồn, phiên bản và quy tắc FR-T13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Quy trình khôi phục” cho Platform operator; đổi Step 1 và làm Step 4 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Record drill outcome” chỉ tới T12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T14 — Sử dụng và gói dịch vụ

**Bối cảnh:** configuration · **Vai trò:** Billing admin · **FR:** FR-T14

**Hình chính:** Biểu đồ dùng năng lực với phần dành khẩn cấp

**Câu hỏi chính:** Trong “Sử dụng và gói dịch vụ”, Sơ đồ / kế hoạch, Địa điểm cho biết điều gì và vai trò Billing admin có thể thực hiện “Review capacity policy” trong phạm vi này không?

**Hành động chính:** Xem chính sách năng lực → T15

**Chi tiết mở rộng:** Giữ Sơ đồ / kế hoạch, Địa điểm ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị, Ngân sách SMS, Xử lý khẩn cấp, lịch sử nguồn, phiên bản và quy tắc FR-T14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Sử dụng và gói dịch vụ” cho Billing admin; đổi Sơ đồ / kế hoạch và làm Xử lý khẩn cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review capacity policy” chỉ tới T15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T15 — Dung lượng và giới hạn

**Bối cảnh:** configuration · **Vai trò:** Platform operator · **FR:** FR-T15

**Hình chính:** So sánh chính sách hàng đợi với dự trữ P1 và tác động giới hạn

**Câu hỏi chính:** Trong “Dung lượng và giới hạn”, Hàng đợi dự phòng P1, Lấy mẫu telemetry cho biết điều gì và vai trò Platform operator có thể thực hiện “Save capacity draft” trong phạm vi này không?

**Hành động chính:** Lưu nháp năng lực → T14

**Chi tiết mở rộng:** Giữ Hàng đợi dự phòng P1, Lấy mẫu telemetry ở lớp quyết định. Đưa chi tiết hỗ trợ của Tiếp nhận SOS, Ngưỡng cảnh báo, Xử lý khi chạm giới hạn, lịch sử nguồn, phiên bản và quy tắc FR-T15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Dung lượng và giới hạn” cho Platform operator; đổi Hàng đợi dự phòng P1 và làm Xử lý khi chạm giới hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save capacity draft” chỉ tới T14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T16 — Phân tích và xuất báo cáo

**Bối cảnh:** configuration · **Vai trò:** Analyst · **FR:** FR-T16

**Hình chính:** Biểu đồ phân bố tách trung vị, P95 và thiếu biên nhận

**Câu hỏi chính:** Trong “Phân tích và xuất báo cáo”, Kỳ báo cáo, Trung vị thời gian tiếp nhận cho biết điều gì và vai trò Analyst có thể thực hiện “Prepare demo report” trong phạm vi này không?

**Hành động chính:** Chuẩn bị báo cáo · mô phỏng → T17

**Chi tiết mở rộng:** Giữ Kỳ báo cáo, Trung vị thời gian tiếp nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của P95 thời gian tiếp nhận, Gửi chưa xác nhận, Xuất dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-T16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Phân tích và xuất báo cáo” cho Analyst; đổi Kỳ báo cáo và làm Xuất dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Prepare demo report” chỉ tới T17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### T17 — Lập lịch báo cáo

**Bối cảnh:** configuration · **Vai trò:** Analyst · **FR:** FR-T17

**Hình chính:** Xem trước lịch báo cáo với múi giờ và chia sẻ người nhận

**Câu hỏi chính:** Trong “Lập lịch báo cáo”, Báo cáo, Đối tượng nhận cho biết điều gì và vai trò Analyst có thể thực hiện “Save schedule draft” trong phạm vi này không?

**Hành động chính:** Lưu nháp lịch → T16

**Chi tiết mở rộng:** Giữ Báo cáo, Đối tượng nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Múi giờ, Lịch, PII, lịch sử nguồn, phiên bản và quy tắc FR-T17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Kiểm chứng:** Dùng tình huống “Lập lịch báo cáo” cho Analyst; đổi Báo cáo và làm PII không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save schedule draft” chỉ tới T16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X01 — Mất mạng · SOS chưa gửi

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-X01

**Hình chính:** Biên nhận SOS lưu cục bộ nêu rõ chưa có máy chủ nhận

**Câu hỏi chính:** Trong “Mất mạng · SOS chưa gửi”, Bản ghi trên thiết bị, Biên nhận máy chủ cho biết điều gì và vai trò Citizen có thể thực hiện “View offline outbox” trong phạm vi này không?

**Hành động chính:** Xem hộp chờ ngoại tuyến → R11

**Chi tiết mở rộng:** Giữ Bản ghi trên thiết bị, Biên nhận máy chủ ở lớp quyết định. Đưa chi tiết hỗ trợ của Thử lại, Phương án khác, lịch sử nguồn, phiên bản và quy tắc FR-X01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Mất mạng · SOS chưa gửi” cho Citizen; đổi Bản ghi trên thiết bị và làm Phương án khác không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View offline outbox” chỉ tới R11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X02 — Không có quyền vị trí

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-X02

**Hình chính:** Nhập vị trí thủ công cạnh giải thích quyền chưa có

**Câu hỏi chính:** Trong “Không có quyền vị trí”, Định vị tự động, Phương án khác cho biết điều gì và vai trò Citizen có thể thực hiện “Enter location manually” trong phạm vi này không?

**Hành động chính:** Nhập vị trí thủ công → C06

**Chi tiết mở rộng:** Giữ Định vị tự động, Phương án khác ở lớp quyết định. Đưa chi tiết hỗ trợ của Quyền riêng tư, SOS, lịch sử nguồn, phiên bản và quy tắc FR-X02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Không có quyền vị trí” cho Citizen; đổi Định vị tự động và làm SOS không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Enter location manually” chỉ tới C06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X03 — Không có sự cố đang mở

**Bối cảnh:** configuration · **Vai trò:** Operator · **FR:** FR-X03

**Hình chính:** Màn không sự cố kèm bằng chứng độ phủ và thiết bị chưa rõ

**Câu hỏi chính:** Trong “Không có sự cố đang mở”, Bộ lọc, Phạm vi bao phủ cho biết điều gì và vai trò Operator có thể thực hiện “Review device health” trong phạm vi này không?

**Hành động chính:** Xem sức khỏe thiết bị → S06

**Chi tiết mở rộng:** Giữ Bộ lọc, Phạm vi bao phủ ở lớp quyết định. Đưa chi tiết hỗ trợ của Đồng bộ gần nhất, Thiết bị chưa rõ, lịch sử nguồn, phiên bản và quy tắc FR-X03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Không có sự cố đang mở” cho Operator; đổi Bộ lọc và làm Thiết bị chưa rõ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review device health” chỉ tới S06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X04 — Không có quyền truy cập

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-X04

**Hình chính:** Chọn lại tổ chức mà không lộ đối tượng bị từ chối

**Câu hỏi chính:** Trong “Không có quyền truy cập”, Yêu cầu, Dữ liệu cho biết điều gì và vai trò All roles có thể thực hiện “Choose workspace” trong phạm vi này không?

**Hành động chính:** Chọn tổ chức → A04

**Chi tiết mở rộng:** Giữ Yêu cầu, Dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Bước tiếp theo, Kiểm toán, lịch sử nguồn, phiên bản và quy tắc FR-X04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Không có quyền truy cập” cho All roles; đổi Yêu cầu và làm Kiểm toán không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Choose workspace” chỉ tới A04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X05 — Dịch vụ tạm gián đoạn

**Bối cảnh:** emergency · **Vai trò:** All roles · **FR:** FR-X05

**Hình chính:** Bảng mất dịch vụ với tuổi nội dung lưu và đường thay thế

**Câu hỏi chính:** Trong “Dịch vụ tạm gián đoạn”, Trạng thái, Nội dung lưu tạm cho biết điều gì và vai trò All roles có thể thực hiện “Open offline pack” trong phạm vi này không?

**Hành động chính:** Mở gói ngoại tuyến → C18

**Chi tiết mở rộng:** Giữ Trạng thái, Nội dung lưu tạm ở lớp quyết định. Đưa chi tiết hỗ trợ của Gửi yêu cầu, Khôi phục, lịch sử nguồn, phiên bản và quy tắc FR-X05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Dịch vụ tạm gián đoạn” cho All roles; đổi Trạng thái và làm Khôi phục không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open offline pack” chỉ tới C18 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X06 — Thay đổi chưa lưu và xung đột

**Bối cảnh:** configuration · **Vai trò:** Site admin · **FR:** FR-X06

**Hình chính:** So sánh bản cục bộ, máy chủ giữ sửa chưa lưu

**Câu hỏi chính:** Trong “Thay đổi chưa lưu và xung đột”, Phiên bản của bạn, Phiên bản hiện tại cho biết điều gì và vai trò Site admin có thể thực hiện “Review latest version” trong phạm vi này không?

**Hành động chính:** Xem phiên bản mới nhất → S05

**Chi tiết mở rộng:** Giữ Phiên bản của bạn, Phiên bản hiện tại ở lớp quyết định. Đưa chi tiết hỗ trợ của Thay đổi của bạn, Cách xử lý, lịch sử nguồn, phiên bản và quy tắc FR-X06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Thay đổi chưa lưu và xung đột” cho Site admin; đổi Phiên bản của bạn và làm Cách xử lý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review latest version” chỉ tới S05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X07 — Không có kết quả tìm kiếm

**Bối cảnh:** configuration · **Vai trò:** Operator · **FR:** FR-X07

**Hình chính:** Truy vấn và bộ lọc đang dùng cạnh nút đặt lại

**Câu hỏi chính:** Trong “Không có kết quả tìm kiếm”, Truy vấn, Phạm vi cho biết điều gì và vai trò Operator có thể thực hiện “Reset search” trong phạm vi này không?

**Hành động chính:** Đặt lại tìm kiếm → O30

**Chi tiết mở rộng:** Giữ Truy vấn, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Kỳ báo cáo, Gợi ý, lịch sử nguồn, phiên bản và quy tắc FR-X07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Không có kết quả tìm kiếm” cho Operator; đổi Truy vấn và làm Gợi ý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Reset search” chỉ tới O30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X08 — Phiên đăng nhập hết hạn

**Bối cảnh:** configuration · **Vai trò:** All roles · **FR:** FR-X08

**Hình chính:** Bảng hết phiên giải thích khôi phục nháp được bảo vệ

**Câu hỏi chính:** Trong “Phiên đăng nhập hết hạn”, Bản nháp, Phiên cho biết điều gì và vai trò All roles có thể thực hiện “Sign in” trong phạm vi này không?

**Hành động chính:** Đăng nhập → A02

**Chi tiết mở rộng:** Giữ Bản nháp, Phiên ở lớp quyết định. Đưa chi tiết hỗ trợ của Dữ liệu nhạy cảm, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-X08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Phiên đăng nhập hết hạn” cho All roles; đổi Bản nháp và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Sign in” chỉ tới A02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X09 — Đang tải và dữ liệu cũ

**Bối cảnh:** emergency · **Vai trò:** Operator · **FR:** FR-X09

**Hình chính:** Dải dữ liệu cũ ghi tuổi nguồn và lệnh không khả dụng

**Câu hỏi chính:** Trong “Đang tải và dữ liệu cũ”, Dữ liệu đang xem, Kết nối cho biết điều gì và vai trò Operator có thể thực hiện “Return to command” trong phạm vi này không?

**Hành động chính:** Về chỉ huy → O01

**Chi tiết mở rộng:** Giữ Dữ liệu đang xem, Kết nối ở lớp quyết định. Đưa chi tiết hỗ trợ của Lệnh, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-X09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Đang tải và dữ liệu cũ” cho Operator; đổi Dữ liệu đang xem và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Return to command” chỉ tới O01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### X10 — Tệp đính kèm bị từ chối

**Bối cảnh:** configuration · **Vai trò:** Responder · **FR:** FR-X10

**Hình chính:** Xem trước tệp bị từ chối với lý do và thay thế hợp lệ

**Câu hỏi chính:** Trong “Tệp đính kèm bị từ chối”, Tệp, Lý do cho biết điều gì và vai trò Responder có thể thực hiện “Choose another attachment” trong phạm vi này không?

**Hành động chính:** Chọn tệp khác → R10

**Chi tiết mở rộng:** Giữ Tệp, Lý do ở lớp quyết định. Đưa chi tiết hỗ trợ của Được phép, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-X10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Kiểm chứng:** Dùng tình huống “Tệp đính kèm bị từ chối” cho Responder; đổi Tệp và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Choose another attachment” chỉ tới R10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G01 — Vận hành các vùng dữ liệu

**Bối cảnh:** configuration · **Vai trò:** Platform operator · **FR:** FR-G01

**Hình chính:** Sơ đồ vùng vận hành với ranh giới cư trú dữ liệu

**Câu hỏi chính:** Trong “Vận hành các vùng dữ liệu”, EU cell, APAC cell cho biết điều gì và vai trò Platform operator có thể thực hiện “Inspect regional cell” trong phạm vi này không?

**Hành động chính:** Kiểm tra vùng → G02

**Chi tiết mở rộng:** Giữ EU cell, APAC cell ở lớp quyết định. Đưa chi tiết hỗ trợ của Global directory, Nơi lưu dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-G01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Vận hành các vùng dữ liệu” cho Platform operator; đổi EU cell và làm Nơi lưu dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect regional cell” chỉ tới G02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G02 — Chi tiết regional cell

**Bối cảnh:** configuration · **Vai trò:** Platform operator · **FR:** FR-G02

**Hình chính:** Trạng thái sao chép và kỷ nguyên writer của vùng

**Câu hỏi chính:** Trong “Chi tiết regional cell”, Thế hệ ghi dữ liệu, Độ trễ broker cho biết điều gì và vai trò Platform operator có thể thực hiện “Review recovery readiness” trong phạm vi này không?

**Hành động chính:** Xem sẵn sàng khôi phục → G03

**Chi tiết mở rộng:** Giữ Thế hệ ghi dữ liệu, Độ trễ broker ở lớp quyết định. Đưa chi tiết hỗ trợ của Cơ sở dữ liệu, Đích khôi phục, lịch sử nguồn, phiên bản và quy tắc FR-G02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Chi tiết regional cell” cho Platform operator; đổi Thế hệ ghi dữ liệu và làm Đích khôi phục không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review recovery readiness” chỉ tới G03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G03 — Diễn tập khôi phục thảm họa

**Bối cảnh:** configuration · **Vai trò:** Platform operator · **FR:** FR-G03

**Hình chính:** Dòng diễn tập khôi phục với RPO, RTO mục tiêu và bằng chứng

**Câu hỏi chính:** Trong “Diễn tập khôi phục thảm họa”, Cell, Chế độ cho biết điều gì và vai trò Platform operator có thể thực hiện “Record drill evidence” trong phạm vi này không?

**Hành động chính:** Ghi bằng chứng diễn tập → G04

**Chi tiết mở rộng:** Giữ Cell, Chế độ ở lớp quyết định. Đưa chi tiết hỗ trợ của Bản sao lưu, RPO mục tiêu, RTO mục tiêu, lịch sử nguồn, phiên bản và quy tắc FR-G03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Diễn tập khôi phục thảm họa” cho Platform operator; đổi Cell và làm RTO mục tiêu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Record drill evidence” chỉ tới G04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G04 — Xác minh khôi phục

**Bối cảnh:** configuration · **Vai trò:** Platform operator · **FR:** FR-G04

**Hình chính:** Lưới chứng minh khôi phục tách fencing và bền vững dữ liệu

**Câu hỏi chính:** Trong “Xác minh khôi phục”, Cô lập writer cũ, Bản ghi SOS cho biết điều gì và vai trò Platform operator có thể thực hiện “Review regional operations” trong phạm vi này không?

**Hành động chính:** Xem vận hành vùng → G01

**Chi tiết mở rộng:** Giữ Cô lập writer cũ, Bản ghi SOS ở lớp quyết định. Đưa chi tiết hỗ trợ của Hộp gửi bền vững, Nơi lưu dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-G04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Xác minh khôi phục” cho Platform operator; đổi Cô lập writer cũ và làm Nơi lưu dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review regional operations” chỉ tới G01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G05 — Khởi tạo tổ chức

**Bối cảnh:** configuration · **Vai trò:** Platform admin · **FR:** FR-G05

**Hình chính:** Kế hoạch phụ thuộc cấp tổ chức và ranh giới cách ly

**Câu hỏi chính:** Trong “Khởi tạo tổ chức”, Tổ chức, Vùng chính cho biết điều gì và vai trò Platform admin có thể thực hiện “Review provisioning plan” trong phạm vi này không?

**Hành động chính:** Xem kế hoạch cấp tổ chức → G06

**Chi tiết mở rộng:** Giữ Tổ chức, Vùng chính ở lớp quyết định. Đưa chi tiết hỗ trợ của Cách ly, Sơ đồ / kế hoạch, Bộ chính sách, lịch sử nguồn, phiên bản và quy tắc FR-G05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Khởi tạo tổ chức” cho Platform admin; đổi Tổ chức và làm Bộ chính sách không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review provisioning plan” chỉ tới G06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G06 — Vòng đời tổ chức

**Bối cảnh:** configuration · **Vai trò:** Platform admin · **FR:** FR-G06

**Hình chính:** Sơ đồ vòng đời tổ chức với cổng di chuyển, xóa

**Câu hỏi chính:** Trong “Vòng đời tổ chức”, Trạng thái, Chuyển vùng cho biết điều gì và vai trò Platform admin có thể thực hiện “Request support access” trong phạm vi này không?

**Hành động chính:** Yêu cầu truy cập hỗ trợ → G07

**Chi tiết mở rộng:** Giữ Trạng thái, Chuyển vùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Xóa dữ liệu, Truy cập hỗ trợ, lịch sử nguồn, phiên bản và quy tắc FR-G06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Vòng đời tổ chức” cho Platform admin; đổi Trạng thái và làm Truy cập hỗ trợ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Request support access” chỉ tới G07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G07 — Truy cập hỗ trợ có thời hạn

**Bối cảnh:** configuration · **Vai trò:** Security operator · **FR:** FR-G07

**Hình chính:** Yêu cầu hỗ trợ hiện phạm vi tối thiểu và hết hạn

**Câu hỏi chính:** Trong “Truy cập hỗ trợ có thời hạn”, Tổ chức, Phạm vi cho biết điều gì và vai trò Security operator có thể thực hiện “Submit access request” trong phạm vi này không?

**Hành động chính:** Gửi yêu cầu quyền → G08

**Chi tiết mở rộng:** Giữ Tổ chức, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Lý do, Thời hạn, Truy cập dữ liệu cá nhân, lịch sử nguồn, phiên bản và quy tắc FR-G07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Truy cập hỗ trợ có thời hạn” cho Security operator; đổi Tổ chức và làm Truy cập dữ liệu cá nhân không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit access request” chỉ tới G08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G08 — Duyệt quyền hỗ trợ

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-G08

**Hình chính:** Duyệt hỗ trợ đối chiếu người yêu cầu và phạm vi cấp

**Câu hỏi chính:** Trong “Duyệt quyền hỗ trợ”, Người yêu cầu, Phạm vi cho biết điều gì và vai trò Tenant admin có thể thực hiện “Approve scoped access — sample” trong phạm vi này không?

**Hành động chính:** Duyệt quyền có phạm vi · mẫu → G06

**Chi tiết mở rộng:** Giữ Người yêu cầu, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Hết hạn, Kiểm toán, lịch sử nguồn, phiên bản và quy tắc FR-G08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Duyệt quyền hỗ trợ” cho Tenant admin; đổi Người yêu cầu và làm Kiểm toán không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve scoped access — sample” chỉ tới G06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G09 — Phát hành và tương thích schema

**Bối cảnh:** configuration · **Vai trò:** Release manager · **FR:** FR-G09

**Hình chính:** Ma trận tương thích bản phát hành, schema và phiên bản mobile

**Câu hỏi chính:** Trong “Phát hành và tương thích schema”, Incident service, Event schema cho biết điều gì và vai trò Release manager có thể thực hiện “Review release gate” trong phạm vi này không?

**Hành động chính:** Xem cổng phát hành → G10

**Chi tiết mở rộng:** Giữ Incident service, Event schema ở lớp quyết định. Đưa chi tiết hỗ trợ của Mobile API, Rollback, lịch sử nguồn, phiên bản và quy tắc FR-G09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Phát hành và tương thích schema” cho Release manager; đổi Incident service và làm Rollback không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review release gate” chỉ tới G10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G10 — Cổng phát hành và rollback

**Bối cảnh:** configuration · **Vai trò:** Release manager · **FR:** FR-G10

**Hình chính:** Danh mục cổng phát hành với khả năng quay lui và xu hướng SLO

**Câu hỏi chính:** Trong “Cổng phát hành và rollback”, Kiểm thử hợp đồng, Cách ly tổ chức cho biết điều gì và vai trò Release manager có thể thực hiện “Record release decision” trong phạm vi này không?

**Hành động chính:** Ghi quyết định phát hành → G09

**Chi tiết mở rộng:** Giữ Kiểm thử hợp đồng, Cách ly tổ chức ở lớp quyết định. Đưa chi tiết hỗ trợ của Mức tiêu hao SLO, Chuyển đổi dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-G10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Cổng phát hành và rollback” cho Release manager; đổi Kiểm thử hợp đồng và làm Chuyển đổi dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Record release decision” chỉ tới G09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G11 — Sự cố an ninh nền tảng

**Bối cảnh:** configuration · **Vai trò:** Security operator · **FR:** FR-G11

**Hình chính:** Hàng đợi tín hiệu bảo mật với ranh giới tin cậy ảnh hưởng

**Câu hỏi chính:** Trong “Sự cố an ninh nền tảng”, Device certificate, Webhook replay cho biết điều gì và vai trò Security operator có thể thực hiện “Open security case” trong phạm vi này không?

**Hành động chính:** Mở vụ bảo mật → G12

**Chi tiết mở rộng:** Giữ Device certificate, Webhook replay ở lớp quyết định. Đưa chi tiết hỗ trợ của Support session, Upload scan, lịch sử nguồn, phiên bản và quy tắc FR-G11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Sự cố an ninh nền tảng” cho Security operator; đổi Device certificate và làm Upload scan không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open security case” chỉ tới G12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### G12 — Hồ sơ an ninh và cô lập

**Bối cảnh:** configuration · **Vai trò:** Security operator · **FR:** FR-G12

**Hình chính:** Dòng ngăn chặn thể hiện phơi nhiễm còn lại và bằng chứng

**Câu hỏi chính:** Trong “Hồ sơ an ninh và cô lập”, Hồ sơ, Nguồn cho biết điều gì và vai trò Security operator có thể thực hiện “Record containment” trong phạm vi này không?

**Hành động chính:** Ghi ngăn chặn → G11

**Chi tiết mở rộng:** Giữ Hồ sơ, Nguồn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hành động, Phạm vi bao phủ, Bằng chứng, lịch sử nguồn, phiên bản và quy tắc FR-G12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Kiểm chứng:** Dùng tình huống “Hồ sơ an ninh và cô lập” cho Security operator; đổi Hồ sơ và làm Bằng chứng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Record containment” chỉ tới G11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D01 — Không gian nhà phát triển

**Bối cảnh:** configuration · **Vai trò:** Partner developer · **FR:** FR-D01

**Hình chính:** Sơ đồ tài nguyên lập trình tách sandbox và thực

**Câu hỏi chính:** Trong “Không gian nhà phát triển”, API reference, Event schemas cho biết điều gì và vai trò Partner developer có thể thực hiện “Open API explorer” trong phạm vi này không?

**Hành động chính:** Mở trình API → D02

**Chi tiết mở rộng:** Giữ API reference, Event schemas ở lớp quyết định. Đưa chi tiết hỗ trợ của SDK examples, Sandbox, lịch sử nguồn, phiên bản và quy tắc FR-D01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Không gian nhà phát triển” cho Partner developer; đổi API reference và làm Sandbox không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open API explorer” chỉ tới D02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D02 — Khám phá API

**Bối cảnh:** configuration · **Vai trò:** Partner developer · **FR:** FR-D02

**Hình chính:** Hai khung yêu cầu, phản hồi với phạm vi và idempotency

**Câu hỏi chính:** Trong “Khám phá API”, Xác thực, Nội dung dữ liệu cho biết điều gì và vai trò Partner developer có thể thực hiện “Run sandbox request” trong phạm vi này không?

**Hành động chính:** Chạy yêu cầu sandbox → D03

**Chi tiết mở rộng:** Giữ Xác thực, Nội dung dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Chống tác động trùng, Phản hồi, lịch sử nguồn, phiên bản và quy tắc FR-D02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Khám phá API” cho Partner developer; đổi Xác thực và làm Phản hồi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Run sandbox request” chỉ tới D03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D03 — Kết quả yêu cầu sandbox

**Bối cảnh:** configuration · **Vai trò:** Partner developer · **FR:** FR-D03

**Hình chính:** Kết quả sandbox tách HTTP, biên nhận bền vững và trace

**Câu hỏi chính:** Trong “Kết quả yêu cầu sandbox”, HTTP status, Biên nhận cho biết điều gì và vai trò Partner developer có thể thực hiện “Open schema registry” trong phạm vi này không?

**Hành động chính:** Mở danh mục schema → D04

**Chi tiết mở rộng:** Giữ HTTP status, Biên nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ bền ghi nhận, Sự cố, Mã truy vết, lịch sử nguồn, phiên bản và quy tắc FR-D03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Kết quả yêu cầu sandbox” cho Partner developer; đổi HTTP status và làm Mã truy vết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open schema registry” chỉ tới D04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D04 — Danh mục schema

**Bối cảnh:** configuration · **Vai trò:** Partner developer · **FR:** FR-D04

**Hình chính:** Cây phiên bản schema có tương thích và đánh dấu bỏ dùng

**Câu hỏi chính:** Trong “Danh mục schema”, signal.fire.observed, incident.updated cho biết điều gì và vai trò Partner developer có thể thực hiện “View schema contract” trong phạm vi này không?

**Hành động chính:** Xem hợp đồng schema → D05

**Chi tiết mở rộng:** Giữ signal.fire.observed, incident.updated ở lớp quyết định. Đưa chi tiết hỗ trợ của command.result, Deprecated versions, lịch sử nguồn, phiên bản và quy tắc FR-D04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Danh mục schema” cho Partner developer; đổi signal.fire.observed và làm Deprecated versions không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View schema contract” chỉ tới D05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D05 — Biên tập manifest kết nối

**Bối cảnh:** configuration · **Vai trò:** Partner developer · **FR:** FR-D05

**Hình chính:** Manifest năng lực kết nối với đối chiếu kiểm tra

**Câu hỏi chính:** Trong “Biên tập manifest kết nối”, Bộ kết nối, Phiên bản cho biết điều gì và vai trò Partner developer có thể thực hiện “Submit for conformance” trong phạm vi này không?

**Hành động chính:** Gửi kiểm tra tuân thủ → D06

**Chi tiết mở rộng:** Giữ Bộ kết nối, Phiên bản ở lớp quyết định. Đưa chi tiết hỗ trợ của Năng lực, Xác thực, Loại thử lại, lịch sử nguồn, phiên bản và quy tắc FR-D05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Biên tập manifest kết nối” cho Partner developer; đổi Bộ kết nối và làm Loại thử lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit for conformance” chỉ tới D06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D06 — Kiểm tra tính tương thích

**Bối cảnh:** configuration · **Vai trò:** Integration reviewer · **FR:** FR-D06

**Hình chính:** Ma trận tình huống tuân thủ có bảo mật và quá tải

**Câu hỏi chính:** Trong “Kiểm tra tính tương thích”, Gửi trùng, Giả mạo tổ chức cho biết điều gì và vai trò Integration reviewer có thể thực hiện “Approve adapter version” trong phạm vi này không?

**Hành động chính:** Duyệt phiên bản adapter → I01

**Chi tiết mở rộng:** Giữ Gửi trùng, Giả mạo tổ chức ở lớp quyết định. Đưa chi tiết hỗ trợ của Lệch đồng hồ, Xác thực hết hạn, Điều tiết tải, lịch sử nguồn, phiên bản và quy tắc FR-D06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Kiểm tra tính tương thích” cho Integration reviewer; đổi Gửi trùng và làm Điều tiết tải không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve adapter version” chỉ tới I01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D07 — Truy vết gửi webhook

**Bối cảnh:** configuration · **Vai trò:** Partner developer · **FR:** FR-D07

**Hình chính:** Dòng thử lại webhook có kết quả giao chính xác

**Câu hỏi chính:** Trong “Truy vết gửi webhook”, 10:40:00, 10:40:01 cho biết điều gì và vai trò Partner developer có thể thực hiện “Review subscription” trong phạm vi này không?

**Hành động chính:** Xem đăng ký → I08

**Chi tiết mở rộng:** Giữ 10:40:00, 10:40:01 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:40:03, 10:40:07, lịch sử nguồn, phiên bản và quy tắc FR-D07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Truy vết gửi webhook” cho Partner developer; đổi 10:40:00 và làm 10:40:07 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review subscription” chỉ tới I08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### D08 — Luân chuyển thông tin xác thực

**Bối cảnh:** configuration · **Vai trò:** Partner developer · **FR:** FR-D08

**Hình chính:** Dòng chồng lấp khóa với xem trước xoay không lộ bí mật

**Câu hỏi chính:** Trong “Luân chuyển thông tin xác thực”, Ứng dụng kết nối, Khóa hiện tại cho biết điều gì và vai trò Partner developer có thể thực hiện “Create rotation request” trong phạm vi này không?

**Hành động chính:** Tạo yêu cầu xoay khóa → I07

**Chi tiết mở rộng:** Giữ Ứng dụng kết nối, Khóa hiện tại ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời gian chồng lấn, Khóa mới, lịch sử nguồn, phiên bản và quy tắc FR-D08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Kiểm chứng:** Dùng tình huống “Luân chuyển thông tin xác thực” cho Partner developer; đổi Ứng dụng kết nối và làm Khóa mới không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Create rotation request” chỉ tới I07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### L01 — Mức độ hoàn thiện ngôn ngữ

**Bối cảnh:** configuration · **Vai trò:** Localization manager · **FR:** FR-L01

**Hình chính:** Lưới độ phủ ngôn ngữ nêu nội dung khẩn còn thiếu

**Câu hỏi chính:** Trong “Mức độ hoàn thiện ngôn ngữ”, Tiếng Việt, Tiếng Anh cho biết điều gì và vai trò Localization manager có thể thực hiện “Open translation workspace” trong phạm vi này không?

**Hành động chính:** Mở không gian dịch → L02

**Chi tiết mở rộng:** Giữ Tiếng Việt, Tiếng Anh ở lớp quyết định. Đưa chi tiết hỗ trợ của Tiếng Nhật, Mẫu khẩn cấp, lịch sử nguồn, phiên bản và quy tắc FR-L01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Kiểm chứng:** Dùng tình huống “Mức độ hoàn thiện ngôn ngữ” cho Localization manager; đổi Tiếng Việt và làm Mẫu khẩn cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open translation workspace” chỉ tới L02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### L02 — Biên tập bản dịch

**Bối cảnh:** configuration · **Vai trò:** Translator · **FR:** FR-L02

**Hình chính:** Bộ soạn nguồn, dịch song song có biến được bảo vệ

**Câu hỏi chính:** Trong “Biên tập bản dịch”, Mẫu nội dung, Ngôn ngữ gốc cho biết điều gì và vai trò Translator có thể thực hiện “Submit translation review” trong phạm vi này không?

**Hành động chính:** Gửi duyệt bản dịch → L03

**Chi tiết mở rộng:** Giữ Mẫu nội dung, Ngôn ngữ gốc ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ đích, Biến nội dung, Kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-L02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Kiểm chứng:** Dùng tình huống “Biên tập bản dịch” cho Translator; đổi Mẫu nội dung và làm Kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit translation review” chỉ tới L03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### L03 — Phê duyệt bản dịch

**Bối cảnh:** configuration · **Vai trò:** Language reviewer · **FR:** FR-L03

**Hình chính:** Kiểm tra khớp phiên bản văn bản, biến và bản chữ giọng

**Câu hỏi chính:** Trong “Phê duyệt bản dịch”, Phiên bản gốc, Ngôn ngữ đích cho biết điều gì và vai trò Language reviewer có thể thực hiện “Approve translation version” trong phạm vi này không?

**Hành động chính:** Duyệt phiên bản dịch → L01

**Chi tiết mở rộng:** Giữ Phiên bản gốc, Ngôn ngữ đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Đối chiếu biến, Văn bản giọng đọc, Người kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-L03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Kiểm chứng:** Dùng tình huống “Phê duyệt bản dịch” cho Language reviewer; đổi Phiên bản gốc và làm Người kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve translation version” chỉ tới L01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### L04 — Giọng đọc và phát âm

**Bối cảnh:** configuration · **Vai trò:** Content editor · **FR:** FR-L04

**Hình chính:** Mẫu phát âm cạnh bản chữ chính xác và dự phòng

**Câu hỏi chính:** Trong “Giọng đọc và phát âm”, Ngôn ngữ / vùng, Giọng đọc cho biết điều gì và vai trò Content editor có thể thực hiện “Save voice configuration” trong phạm vi này không?

**Hành động chính:** Lưu cấu hình giọng → L01

**Chi tiết mở rộng:** Giữ Ngôn ngữ / vùng, Giọng đọc ở lớp quyết định. Đưa chi tiết hỗ trợ của Văn bản giọng đọc, Phát âm địa điểm, Dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-L04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Kiểm chứng:** Dùng tình huống “Giọng đọc và phát âm” cho Content editor; đổi Ngôn ngữ / vùng và làm Dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save voice configuration” chỉ tới L01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### L05 — Quy tắc ngôn ngữ dự phòng

**Bối cảnh:** configuration · **Vai trò:** Tenant admin · **FR:** FR-L05

**Hình chính:** Cây dự phòng ngôn ngữ nêu hành vi khi thiếu nội dung khẩn

**Câu hỏi chính:** Trong “Quy tắc ngôn ngữ dự phòng”, Được hỗ trợ, Lựa chọn người dùng cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save language policy” trong phạm vi này không?

**Hành động chính:** Lưu chính sách ngôn ngữ → L01

**Chi tiết mở rộng:** Giữ Được hỗ trợ, Lựa chọn người dùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiếu nội dung khẩn cấp, Ngôn ngữ dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-L05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Kiểm chứng:** Dùng tình huống “Quy tắc ngôn ngữ dự phòng” cho Tenant admin; đổi Được hỗ trợ và làm Ngôn ngữ dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save language policy” chỉ tới L01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### L06 — Thuật ngữ khẩn cấp

**Bối cảnh:** configuration · **Vai trò:** Language reviewer · **FR:** FR-L06

**Hình chính:** So sánh thuật ngữ tách an toàn, chưa rõ và SOS

**Câu hỏi chính:** Trong “Thuật ngữ khẩn cấp”, SOS, Safe cho biết điều gì và vai trò Language reviewer có thể thực hiện “Review translation editor” trong phạm vi này không?

**Hành động chính:** Xem trình dịch → L02

**Chi tiết mở rộng:** Giữ SOS, Safe ở lớp quyết định. Đưa chi tiết hỗ trợ của Unknown, lịch sử nguồn, phiên bản và quy tắc FR-L06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Kiểm chứng:** Dùng tình huống “Thuật ngữ khẩn cấp” cho Language reviewer; đổi SOS và làm Unknown không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review translation editor” chỉ tới L02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C31 — Thành viên và lời mời nhóm

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C31

**Hình chính:** Danh sách nhóm với trạng thái lời mời và quyền chia sẻ

**Câu hỏi chính:** Trong “Thành viên và lời mời nhóm”, Alex, Jamie cho biết điều gì và vai trò Citizen có thể thực hiện “Manage invitation” trong phạm vi này không?

**Hành động chính:** Quản lý lời mời → C32

**Chi tiết mở rộng:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Chia sẻ, lịch sử nguồn, phiên bản và quy tắc FR-C31 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Thành viên và lời mời nhóm” cho Citizen; đổi Alex và làm Chia sẻ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Manage invitation” chỉ tới C32 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C32 — Mời thành viên nhóm

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C32

**Hình chính:** Xem trước lời mời với người nhận, vai trò và quyền vị trí

**Câu hỏi chính:** Trong “Mời thành viên nhóm”, Nhóm, Liên hệ cho biết điều gì và vai trò Citizen có thể thực hiện “Create invitation — sample” trong phạm vi này không?

**Hành động chính:** Tạo lời mời · mẫu → C31

**Chi tiết mở rộng:** Giữ Nhóm, Liên hệ ở lớp quyết định. Đưa chi tiết hỗ trợ của Vai trò, Hạn lời mời, Quyền xem vị trí, lịch sử nguồn, phiên bản và quy tắc FR-C32 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Mời thành viên nhóm” cho Citizen; đổi Nhóm và làm Quyền xem vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Create invitation — sample” chỉ tới C31 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C33 — Báo cáo hoặc chặn hội thoại

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C33

**Hình chính:** Phạm vi báo cáo hội thoại và tác động chặn lên cảnh báo

**Câu hỏi chính:** Trong “Báo cáo hoặc chặn hội thoại”, Hội thoại, Lý do cho biết điều gì và vai trò Citizen có thể thực hiện “Submit report — sample” trong phạm vi này không?

**Hành động chính:** Gửi báo cáo · mẫu → C19

**Chi tiết mở rộng:** Giữ Hội thoại, Lý do ở lớp quyết định. Đưa chi tiết hỗ trợ của Hành động, Cảnh báo địa điểm, lịch sử nguồn, phiên bản và quy tắc FR-C33 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Báo cáo hoặc chặn hội thoại” cho Citizen; đổi Hội thoại và làm Cảnh báo địa điểm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit report — sample” chỉ tới C19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C34 — Tùy chọn thông báo

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C34

**Hình chính:** Tùy chọn thông báo xã hội, an toàn và kín đáo riêng

**Câu hỏi chính:** Trong “Tùy chọn thông báo”, Ngôn ngữ, Tin nhắn nhóm cho biết điều gì và vai trò Citizen có thể thực hiện “Save preferences” trong phạm vi này không?

**Hành động chính:** Lưu tùy chọn → C01

**Chi tiết mở rộng:** Giữ Ngôn ngữ, Tin nhắn nhóm ở lớp quyết định. Đưa chi tiết hỗ trợ của Cảnh báo an toàn, Yêu cầu kín đáo, SMS, lịch sử nguồn, phiên bản và quy tắc FR-C34 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Tùy chọn thông báo” cho Citizen; đổi Ngôn ngữ và làm SMS không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save preferences” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O31 — Lưu trữ và mở lại sự cố

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O31

**Hình chính:** Kho sự cố đóng giữ nguyên lịch sử gốc

**Câu hỏi chính:** Trong “Lưu trữ và mở lại sự cố”, INC-2032, INC-2028 cho biết điều gì và vai trò Supervisor có thể thực hiện “Review reopening” trong phạm vi này không?

**Hành động chính:** Xem mở lại → O32

**Chi tiết mở rộng:** Giữ INC-2032, INC-2028 ở lớp quyết định. Đưa chi tiết hỗ trợ của INC-2010, lịch sử nguồn, phiên bản và quy tắc FR-O31 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Lưu trữ và mở lại sự cố” cho Supervisor; đổi INC-2032 và làm INC-2010 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review reopening” chỉ tới O32 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O32 — Mở lại sự cố

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O32

**Hình chính:** Xem trước mở lại với người phụ trách mới và bằng chứng giữ

**Câu hỏi chính:** Trong “Mở lại sự cố”, Sự cố, Lý do cho biết điều gì và vai trò Supervisor có thể thực hiện “Reopen incident — sample” trong phạm vi này không?

**Hành động chính:** Mở lại sự cố · mẫu → O04

**Chi tiết mở rộng:** Giữ Sự cố, Lý do ở lớp quyết định. Đưa chi tiết hỗ trợ của Người phụ trách, Mức độ, Lịch sử, lịch sử nguồn, phiên bản và quy tắc FR-O32 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Mở lại sự cố” cho Supervisor; đổi Sự cố và làm Lịch sử không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Reopen incident — sample” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O33 — Chia sẻ sự cố liên tổ chức

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-O33

**Hình chính:** Xem trước trao đổi đối tác có trường chia sẻ và thẩm quyền

**Câu hỏi chính:** Trong “Chia sẻ sự cố liên tổ chức”, Đối tác, Trường dữ liệu cho biết điều gì và vai trò Supervisor có thể thực hiện “Review partner exchange” trong phạm vi này không?

**Hành động chính:** Xem trao đổi đối tác → I10

**Chi tiết mở rộng:** Giữ Đối tác, Trường dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Thẩm quyền, Thỏa thuận, lịch sử nguồn, phiên bản và quy tắc FR-O33 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Chia sẻ sự cố liên tổ chức” cho Supervisor; đổi Đối tác và làm Thỏa thuận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review partner exchange” chỉ tới I10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O34 — Hàng đợi hỗ trợ tiếp cận

**Bối cảnh:** command · **Vai trò:** Dispatcher · **FR:** FR-O34

**Hình chính:** Hàng đợi trợ năng ghép nhu cầu chức năng với đội đủ năng lực

**Câu hỏi chính:** Trong “Hàng đợi hỗ trợ tiếp cận”, SOS-041, SOS-044 cho biết điều gì và vai trò Dispatcher có thể thực hiện “Assign capable unit” trong phạm vi này không?

**Hành động chính:** Phân đội đủ năng lực → O09

**Chi tiết mở rộng:** Giữ SOS-041, SOS-044 ở lớp quyết định. Đưa chi tiết hỗ trợ của SOS-046, Nguồn, lịch sử nguồn, phiên bản và quy tắc FR-O34 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Kiểm chứng:** Dùng tình huống “Hàng đợi hỗ trợ tiếp cận” cho Dispatcher; đổi SOS-041 và làm Nguồn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Assign capable unit” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C35 — Dẫn đường thoát hiểm bằng giọng nói

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C35

**Hình chính:** Chỉ dẫn mốc tiếp theo trên tuyến tầng và dải chất lượng vị trí

**Câu hỏi chính:** Trong “Dẫn đường thoát hiểm bằng giọng nói”, Vị trí, Chỉ dẫn tiếp theo cho biết điều gì và vai trò Citizen có thể thực hiện “Show next instruction” trong phạm vi này không?

**Hành động chính:** Hiện chỉ dẫn tiếp theo → C36

**Chi tiết mở rộng:** Giữ Vị trí, Chỉ dẫn tiếp theo ở lớp quyết định. Đưa chi tiết hỗ trợ của Chất lượng định vị, Dữ liệu nguy hiểm, lịch sử nguồn, phiên bản và quy tắc FR-C35 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Dừng lời đọc cũ khi phiên bản chỉ dẫn đổi; vị trí cũ không được tự chuyển mốc tiếp theo.

**Kiểm chứng:** Dùng tình huống “Dẫn đường thoát hiểm bằng giọng nói” cho Citizen; đổi Vị trí và làm Dữ liệu nguy hiểm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Show next instruction” chỉ tới C36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C36 — Chặng dẫn đường và phương hướng

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C36

**Hình chính:** Một bước điều hướng có hình mốc và nhãn tin cậy hướng

**Câu hỏi chính:** Trong “Chặng dẫn đường và phương hướng”, Chặng, Hướng dẫn cho biết điều gì và vai trò Citizen có thể thực hiện “Repeat voice instruction” trong phạm vi này không?

**Hành động chính:** Nghe lại chỉ dẫn → C36

**Chi tiết mở rộng:** Giữ Chặng, Hướng dẫn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hướng, Tuyến hỗ trợ tiếp cận, lịch sử nguồn, phiên bản và quy tắc FR-C36 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Hướng chưa rõ phải bỏ mũi tên chỉ hướng; dùng mốc xác minh và định hướng thủ công thay vì bịa trái, phải.

**Kiểm chứng:** Dùng tình huống “Chặng dẫn đường và phương hướng” cho Citizen; đổi Chặng và làm Tuyến hỗ trợ tiếp cận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Repeat voice instruction” chỉ tới C36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C37 — Thông báo thay đổi tuyến

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C37

**Hình chính:** Tuyến cũ bị thu hồi cạnh tuyến thay thế được duyệt và lý do

**Câu hỏi chính:** Trong “Thông báo thay đổi tuyến”, Lý do, Tuyến cũ cho biết điều gì và vai trò Citizen có thể thực hiện “Review updated route” trong phạm vi này không?

**Hành động chính:** Xem tuyến cập nhật → C35

**Chi tiết mở rộng:** Giữ Lý do, Tuyến cũ ở lớp quyết định. Đưa chi tiết hỗ trợ của Chỉ dẫn mới, Phiên bản hướng dẫn, lịch sử nguồn, phiên bản và quy tắc FR-C37 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Thu hồi hình tuyến cũ và lời đọc chờ cùng lúc; không hiện tuyến thay thế được duyệt trước nhận phiên bản.

**Kiểm chứng:** Dùng tình huống “Thông báo thay đổi tuyến” cho Citizen; đổi Lý do và làm Phiên bản hướng dẫn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review updated route” chỉ tới C35 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C38 — Chưa rõ vị trí hoặc không có tuyến

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C38

**Hình chính:** Bảng tầng, hướng chưa rõ với nhập vị trí và yêu cầu hỗ trợ

**Câu hỏi chính:** Trong “Chưa rõ vị trí hoặc không có tuyến”, Tầng, Hướng cho biết điều gì và vai trò Citizen có thể thực hiện “Request assistance” trong phạm vi này không?

**Hành động chính:** Yêu cầu trợ giúp → C05

**Chi tiết mở rộng:** Giữ Tầng, Hướng ở lớp quyết định. Đưa chi tiết hỗ trợ của Bước tiếp theo, Giọng đọc, lịch sử nguồn, phiên bản và quy tắc FR-C38 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Không bịa tuyến hoặc hướng. Giữ chỉnh vị trí và trợ giúp truy cập được mà không buộc khôi phục quyền.

**Kiểm chứng:** Dùng tình huống “Chưa rõ vị trí hoặc không có tuyến” cho Citizen; đổi Tầng và làm Giọng đọc không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Request assistance” chỉ tới C05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C39 — Di chuyển khỏi vùng nguy hiểm

**Bối cảnh:** emergency · **Vai trò:** Citizen · **FR:** FR-C39

**Hình chính:** Ranh giới nguy cơ ngoài trời, đích đến và đoạn đường chưa rõ

**Câu hỏi chính:** Trong “Di chuyển khỏi vùng nguy hiểm”, Khu vực, Điểm đến cho biết điều gì và vai trò Citizen có thể thực hiện “View next route step” trong phạm vi này không?

**Hành động chính:** Xem bước tiếp theo → C36

**Chi tiết mở rộng:** Giữ Khu vực, Điểm đến ở lớp quyết định. Đưa chi tiết hỗ trợ của Tình trạng đường, Đoạn chưa xác minh, lịch sử nguồn, phiên bản và quy tắc FR-C39 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Di chuyển khỏi vùng nguy hiểm” cho Citizen; đổi Khu vực và làm Đoạn chưa xác minh không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View next route step” chỉ tới C36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### C40 — Ngôn ngữ và tùy chọn giọng đọc

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-C40

**Hình chính:** Mẫu giọng đọc, tốc độ và xem trước chế độ kín đáo

**Câu hỏi chính:** Trong “Ngôn ngữ và tùy chọn giọng đọc”, Ngôn ngữ, Giọng đọc cho biết điều gì và vai trò Citizen có thể thực hiện “Save guidance preferences” trong phạm vi này không?

**Hành động chính:** Lưu tùy chọn chỉ dẫn → C35

**Chi tiết mở rộng:** Giữ Ngôn ngữ, Giọng đọc ở lớp quyết định. Đưa chi tiết hỗ trợ của Tốc độ giọng đọc, Rung, Chế độ kín đáo, lịch sử nguồn, phiên bản và quy tắc FR-C40 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Kiểm chứng:** Dùng tình huống “Ngôn ngữ và tùy chọn giọng đọc” cho Citizen; đổi Ngôn ngữ và làm Chế độ kín đáo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save guidance preferences” chỉ tới C35 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P01 — Vùng loa và độ bao phủ

**Bối cảnh:** command · **Vai trò:** PA operator · **FR:** FR-P01

**Hình chính:** Bản đồ phủ loa có vùng thiếu và bối cảnh sự cố

**Câu hỏi chính:** Trong “Vùng loa và độ bao phủ”, Building A, Outdoor campus cho biết điều gì và vai trò PA operator có thể thực hiện “Select broadcast zones” trong phạm vi này không?

**Hành động chính:** Chọn vùng phát → P02

**Chi tiết mở rộng:** Giữ Building A, Outdoor campus ở lớp quyết định. Đưa chi tiết hỗ trợ của Khoảng trống bao phủ, Sự cố đang xử lý, lịch sử nguồn, phiên bản và quy tắc FR-P01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Vùng loa và độ bao phủ” cho PA operator; đổi Building A và làm Sự cố đang xử lý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Select broadcast zones” chỉ tới P02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P02 — Soạn thông báo cứu hộ

**Bối cảnh:** command · **Vai trò:** PA author · **FR:** FR-P02

**Hình chính:** Xem trước chữ, âm thanh thông báo gắn vùng và hết hạn

**Câu hỏi chính:** Trong “Soạn thông báo cứu hộ”, Các vùng, Ưu tiên cho biết điều gì và vai trò PA author có thể thực hiện “Preview announcement” trong phạm vi này không?

**Hành động chính:** Xem trước thông báo → P03

**Chi tiết mở rộng:** Giữ Các vùng, Ưu tiên ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ, Nguồn, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-P02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Soạn thông báo cứu hộ” cho PA author; đổi Các vùng và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Preview announcement” chỉ tới P03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P03 — Nghe thử và duyệt thông báo

**Bối cảnh:** command · **Vai trò:** PA approver · **FR:** FR-P03

**Hình chính:** Đúng phiên bản tin với loa chọn và thứ tự ngôn ngữ

**Câu hỏi chính:** Trong “Nghe thử và duyệt thông báo”, Phiên bản thông điệp, Loa được chọn cho biết điều gì và vai trò PA approver có thể thực hiện “Approve sample playback” trong phạm vi này không?

**Hành động chính:** Duyệt phát mẫu → P04

**Chi tiết mở rộng:** Giữ Phiên bản thông điệp, Loa được chọn ở lớp quyết định. Đưa chi tiết hỗ trợ của Thứ tự ngôn ngữ, Số lần lặp, Người duyệt, lịch sử nguồn, phiên bản và quy tắc FR-P03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Nghe thử và duyệt thông báo” cho PA approver; đổi Phiên bản thông điệp và làm Người duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve sample playback” chỉ tới P04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P04 — Giám sát phát loa

**Bối cảnh:** command · **Vai trò:** PA operator · **FR:** FR-P04

**Hình chính:** Tiến trình phát tách bộ điều khiển nhận và nghe được

**Câu hỏi chính:** Trong “Giám sát phát loa”, Bộ điều khiển, Loa cho biết điều gì và vai trò PA operator có thể thực hiện “Inspect speaker health” trong phạm vi này không?

**Hành động chính:** Kiểm tra sức khỏe loa → P05

**Chi tiết mở rộng:** Giữ Bộ điều khiển, Loa ở lớp quyết định. Đưa chi tiết hỗ trợ của Xác minh âm thanh thực tế, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-P04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Loa nhận không chứng minh người trong vùng nghe được; vùng thiếu phủ và bằng chứng âm học chưa rõ phải nổi bật.

**Kiểm chứng:** Dùng tình huống “Giám sát phát loa” cho PA operator; đổi Bộ điều khiển và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect speaker health” chỉ tới P05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P05 — Thiết bị loa và tự kiểm tra

**Bối cảnh:** command · **Vai trò:** Device admin · **FR:** FR-P05

**Hình chính:** Chuỗi nguồn, mạng, ampli loa với tuổi tự kiểm

**Câu hỏi chính:** Trong “Thiết bị loa và tự kiểm tra”, Nguồn điện, Mạng cho biết điều gì và vai trò Device admin có thể thực hiện “Open coverage fallback” trong phạm vi này không?

**Hành động chính:** Mở dự phòng phủ âm → P01

**Chi tiết mở rộng:** Giữ Nguồn điện, Mạng ở lớp quyết định. Đưa chi tiết hỗ trợ của Bộ khuếch đại, Tự kiểm tra gần nhất, Bao phủ thay thế, lịch sử nguồn, phiên bản và quy tắc FR-P05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Thiết bị loa và tự kiểm tra” cho Device admin; đổi Nguồn điện và làm Bao phủ thay thế không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open coverage fallback” chỉ tới P01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P06 — Micro cứu hộ trực tiếp

**Bối cảnh:** command · **Vai trò:** Authorized announcer · **FR:** FR-P06

**Hình chính:** Phiên micro trực tiếp với vùng chọn và dừng rõ ràng

**Câu hỏi chính:** Trong “Micro cứu hộ trực tiếp”, Các vùng, Micro cho biết điều gì và vai trò Authorized announcer có thể thực hiện “Review live session — sample” trong phạm vi này không?

**Hành động chính:** Xem phiên trực tiếp · mẫu → P04

**Chi tiết mở rộng:** Giữ Các vùng, Micro ở lớp quyết định. Đưa chi tiết hỗ trợ của Ưu tiên, Thời lượng tối đa, Ghi âm, lịch sử nguồn, phiên bản và quy tắc FR-P06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Micro cứu hộ trực tiếp” cho Authorized announcer; đổi Các vùng và làm Ghi âm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review live session — sample” chỉ tới P04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P07 — Loa trên drone hoặc phương tiện

**Bối cảnh:** command · **Vai trò:** Drone operator · **FR:** FR-P07

**Hình chính:** Phạm vi nhiệm vụ loa di động với quyền phi công

**Câu hỏi chính:** Trong “Loa trên drone hoặc phương tiện”, Nền tảng, Thông điệp cho biết điều gì và vai trò Drone operator có thể thực hiện “Review mission” trong phạm vi này không?

**Hành động chính:** Xem nhiệm vụ → I13

**Chi tiết mở rộng:** Giữ Nền tảng, Thông điệp ở lớp quyết định. Đưa chi tiết hỗ trợ của Phi công, Vùng phát, Phát âm thanh, lịch sử nguồn, phiên bản và quy tắc FR-P07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Loa trên drone hoặc phương tiện” cho Drone operator; đổi Nền tảng và làm Phát âm thanh không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review mission” chỉ tới I13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P08 — Thư viện âm thanh và duyệt TTS

**Bối cảnh:** configuration · **Vai trò:** Content editor · **FR:** FR-P08

**Hình chính:** Thư viện âm ngôn ngữ với duyệt phát âm và bản chữ

**Câu hỏi chính:** Trong “Thư viện âm thanh và duyệt TTS”, PA-04 vi-VN, PA-04 en cho biết điều gì và vai trò Content editor có thể thực hiện “Edit voice content” trong phạm vi này không?

**Hành động chính:** Sửa nội dung giọng → L04

**Chi tiết mở rộng:** Giữ PA-04 vi-VN, PA-04 en ở lớp quyết định. Đưa chi tiết hỗ trợ của PA-04 ja-JP, Phát âm, lịch sử nguồn, phiên bản và quy tắc FR-P08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Thư viện âm thanh và duyệt TTS” cho Content editor; đổi PA-04 vi-VN và làm Phát âm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit voice content” chỉ tới L04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### P09 — Ưu tiên và điều phối phát loa

**Bối cảnh:** configuration · **Vai trò:** PA admin · **FR:** FR-P09

**Hình chính:** Ngăn ưu tiên phân xử thể hiện ưu tiên cục bộ và mất nối

**Câu hỏi chính:** Trong “Ưu tiên và điều phối phát loa”, Ưu tiên cao nhất, Thông báo cứu hộ từ cloud cho biết điều gì và vai trò PA admin có thể thực hiện “Save arbitration policy” trong phạm vi này không?

**Hành động chính:** Lưu chính sách phân xử → P01

**Chi tiết mở rộng:** Giữ Ưu tiên cao nhất, Thông báo cứu hộ từ cloud ở lớp quyết định. Đưa chi tiết hỗ trợ của Âm thanh thường ngày, Mất kết nối, Phát tiếp, lịch sử nguồn, phiên bản và quy tắc FR-P09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Kiểm chứng:** Dùng tình huống “Ưu tiên và điều phối phát loa” cho PA admin; đổi Ưu tiên cao nhất và làm Phát tiếp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save arbitration policy” chỉ tới P01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S15 — Biên tập mạng lưới thoát hiểm

**Bối cảnh:** configuration · **Vai trò:** Route designer · **FR:** FR-S15

**Hình chính:** Đồ thị thoát hiểm có loại nút, cạnh và đường không tiếp cận

**Câu hỏi chính:** Trong “Biên tập mạng lưới thoát hiểm”, Nút mạng lưới, Cạnh kết nối cho biết điều gì và vai trò Route designer có thể thực hiện “Review route validation” trong phạm vi này không?

**Hành động chính:** Xem kiểm tra tuyến → S16

**Chi tiết mở rộng:** Giữ Nút mạng lưới, Cạnh kết nối ở lớp quyết định. Đưa chi tiết hỗ trợ của Thang máy, Phiên bản bản đồ, lịch sử nguồn, phiên bản và quy tắc FR-S15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Biên tập mạng lưới thoát hiểm” cho Route designer; đổi Nút mạng lưới và làm Phiên bản bản đồ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review route validation” chỉ tới S16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### S16 — Mô phỏng và phê duyệt tuyến

**Bối cảnh:** configuration · **Vai trò:** Safety reviewer · **FR:** FR-S16

**Hình chính:** So sánh kịch bản tuyến chặn, chưa rõ và xe lăn

**Câu hỏi chính:** Trong “Mô phỏng và phê duyệt tuyến”, Hành lang bị chặn, Chưa xác định tầng cho biết điều gì và vai trò Safety reviewer có thể thực hiện “Publish reviewed graph” trong phạm vi này không?

**Hành động chính:** Công bố đồ thị đã duyệt → S15

**Chi tiết mở rộng:** Giữ Hành lang bị chặn, Chưa xác định tầng ở lớp quyết định. Đưa chi tiết hỗ trợ của Hồ sơ dùng xe lăn, Dữ liệu nguy hiểm hết hạn, Người kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-S16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Kiểm chứng:** Dùng tình huống “Mô phỏng và phê duyệt tuyến” cho Safety reviewer; đổi Hành lang bị chặn và làm Người kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish reviewed graph” chỉ tới S15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O35 — Vùng nguy hiểm và hạn chế di chuyển

**Bối cảnh:** command · **Vai trò:** Incident commander · **FR:** FR-O35

**Hình chính:** Sửa đa giác nguy cơ với đoạn tuyến ảnh hưởng và hết hạn

**Câu hỏi chính:** Trong “Vùng nguy hiểm và hạn chế di chuyển”, Nguy cơ, Hình học vùng cho biết điều gì và vai trò Incident commander có thể thực hiện “Review guidance impact” trong phạm vi này không?

**Hành động chính:** Xem tác động chỉ dẫn → O36

**Chi tiết mở rộng:** Giữ Nguy cơ, Hình học vùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Mức chắc chắn, Hết hiệu lực, Tuyến bị ảnh hưởng, lịch sử nguồn, phiên bản và quy tắc FR-O35 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Hình học hết hạn mất hiệu lực; hạn chế đổi phải chỉ ra phiên bản chỉ dẫn ảnh hưởng trước công bố.

**Kiểm chứng:** Dùng tình huống “Vùng nguy hiểm và hạn chế di chuyển” cho Incident commander; đổi Nguy cơ và làm Tuyến bị ảnh hưởng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review guidance impact” chỉ tới O36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### O36 — Phân phối hướng dẫn và biên nhận

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-O36

**Hình chính:** Phân phối phiên bản chỉ dẫn tách thu hồi và biên nhận

**Câu hỏi chính:** Trong “Phân phối hướng dẫn và biên nhận”, Phiên bản hướng dẫn, Điện thoại cho biết điều gì và vai trò Operator có thể thực hiện “Open speaker operations” trong phạm vi này không?

**Hành động chính:** Mở vận hành loa → P01

**Chi tiết mở rộng:** Giữ Phiên bản hướng dẫn, Điện thoại ở lớp quyết định. Đưa chi tiết hỗ trợ của Bộ điều khiển loa, Tuyến cũ, Người chưa liên lạc được, lịch sử nguồn, phiên bản và quy tắc FR-O36 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Thu hồi tuyến cũ và giao bản mới có biên nhận riêng; người không liên lạc được vẫn hiện và cần kênh khác.

**Kiểm chứng:** Dùng tình huống “Phân phối hướng dẫn và biên nhận” cho Operator; đổi Phiên bản hướng dẫn và làm Người chưa liên lạc được không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open speaker operations” chỉ tới P01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H01 — Hồ sơ hỗ trợ cứu hộ của tôi

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-H01

**Hình chính:** Hồ sơ nhu cầu chức năng với biểu tượng di chuyển, giao tiếp

**Câu hỏi chính:** Trong “Hồ sơ hỗ trợ cứu hộ của tôi”, Nhóm tuổi, Khả năng vận động cho biết điều gì và vai trò Citizen có thể thực hiện “Review emergency sharing” trong phạm vi này không?

**Hành động chính:** Xem chia sẻ khẩn → H02

**Chi tiết mở rộng:** Giữ Nhóm tuổi, Khả năng vận động ở lớp quyết định. Đưa chi tiết hỗ trợ của Sử dụng cầu thang, Giao tiếp, Nguồn, lịch sử nguồn, phiên bản và quy tắc FR-H01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Hồ sơ hỗ trợ cứu hộ của tôi” cho Citizen; đổi Nhóm tuổi và làm Nguồn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review emergency sharing” chỉ tới H02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H02 — Chia sẻ thông tin hỗ trợ và sức khỏe

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-H02

**Hình chính:** Xem trước chia sẻ nhu cầu chức năng và ghi chú y tế riêng

**Câu hỏi chính:** Trong “Chia sẻ thông tin hỗ trợ và sức khỏe”, Nhu cầu hỗ trợ, Ghi chú y tế cho biết điều gì và vai trò Citizen có thể thực hiện “Save sharing preferences” trong phạm vi này không?

**Hành động chính:** Lưu tùy chọn chia sẻ → H01

**Chi tiết mở rộng:** Giữ Nhu cầu hỗ trợ, Ghi chú y tế ở lớp quyết định. Đưa chi tiết hỗ trợ của Nhóm gia đình, Sự đồng ý, Ngày rà soát, lịch sử nguồn, phiên bản và quy tắc FR-H02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Chia sẻ thông tin hỗ trợ và sức khỏe” cho Citizen; đổi Nhu cầu hỗ trợ và làm Ngày rà soát không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save sharing preferences” chỉ tới H01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H03 — Người chăm sóc được ủy quyền

**Bối cảnh:** configuration · **Vai trò:** Citizen · **FR:** FR-H03

**Hình chính:** Sơ đồ quan hệ người chăm sóc với quyền chờ và hết hạn

**Câu hỏi chính:** Trong “Người chăm sóc được ủy quyền”, Jamie, Morgan cho biết điều gì và vai trò Citizen có thể thực hiện “Review caregiver authority” trong phạm vi này không?

**Hành động chính:** Xem quyền chăm sóc → H04

**Chi tiết mở rộng:** Giữ Jamie, Morgan ở lớp quyết định. Đưa chi tiết hỗ trợ của Yêu cầu đang chờ, lịch sử nguồn, phiên bản và quy tắc FR-H03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Người chăm sóc được ủy quyền” cho Citizen; đổi Jamie và làm Yêu cầu đang chờ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review caregiver authority” chỉ tới H04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H04 — Xác minh quyền người chăm sóc

**Bối cảnh:** configuration · **Vai trò:** Privacy officer · **FR:** FR-H04

**Hình chính:** Đối chiếu chủ thể, người chăm sóc và phạm vi hết hạn

**Câu hỏi chính:** Trong “Xác minh quyền người chăm sóc”, Người được hỗ trợ, Người chăm sóc cho biết điều gì và vai trò Privacy officer có thể thực hiện “Approve scoped relationship” trong phạm vi này không?

**Hành động chính:** Duyệt quan hệ có phạm vi → H03

**Chi tiết mở rộng:** Giữ Người được hỗ trợ, Người chăm sóc ở lớp quyết định. Đưa chi tiết hỗ trợ của Thẩm quyền, Phạm vi, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-H04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Xác minh quyền người chăm sóc” cho Privacy officer; đổi Người được hỗ trợ và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve scoped relationship” chỉ tới H03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H05 — Hồ sơ người được chăm sóc

**Bối cảnh:** configuration · **Vai trò:** Authorized caregiver · **FR:** FR-H05

**Hình chính:** Hồ sơ người phụ thuộc có liên kết thiết bị và tuổi xem xét

**Câu hỏi chính:** Trong “Hồ sơ người được chăm sóc”, Người, Khả năng vận động cho biết điều gì và vai trò Authorized caregiver có thể thực hiện “Request profile update” trong phạm vi này không?

**Hành động chính:** Yêu cầu cập nhật hồ sơ → H06

**Chi tiết mở rộng:** Giữ Người, Khả năng vận động ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị, Ghi chú khẩn cấp, Rà soát gần nhất, lịch sử nguồn, phiên bản và quy tắc FR-H05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Hồ sơ người được chăm sóc” cho Authorized caregiver; đổi Người và làm Rà soát gần nhất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Request profile update” chỉ tới H06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H06 — Cập nhật và kiểm tra hồ sơ

**Bối cảnh:** configuration · **Vai trò:** Authorized caregiver · **FR:** FR-H06

**Hình chính:** Đối chiếu hồ sơ chỉ nguồn và trách nhiệm duyệt

**Câu hỏi chính:** Trong “Cập nhật và kiểm tra hồ sơ”, Phiên bản hồ sơ, Thay đổi cho biết điều gì và vai trò Authorized caregiver có thể thực hiện “Submit profile update” trong phạm vi này không?

**Hành động chính:** Gửi cập nhật hồ sơ → H05

**Chi tiết mở rộng:** Giữ Phiên bản hồ sơ, Thay đổi ở lớp quyết định. Đưa chi tiết hỗ trợ của Nguồn, Trạng thái rà soát, Lý do, lịch sử nguồn, phiên bản và quy tắc FR-H06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Cập nhật và kiểm tra hồ sơ” cho Authorized caregiver; đổi Phiên bản hồ sơ và làm Lý do không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit profile update” chỉ tới H05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H07 — Danh mục người cần hỗ trợ

**Bối cảnh:** command · **Vai trò:** Care coordinator · **FR:** FR-H07

**Hình chính:** Danh bạ hỗ trợ với cột nhu cầu chức năng giới hạn theo vai trò

**Câu hỏi chính:** Trong “Danh mục người cần hỗ trợ”, Alex, Jamie cho biết điều gì và vai trò Care coordinator có thể thực hiện “Open assistance case” trong phạm vi này không?

**Hành động chính:** Mở vụ trợ giúp → H09

**Chi tiết mở rộng:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Phạm vi xem, lịch sử nguồn, phiên bản và quy tắc FR-H07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Danh mục người cần hỗ trợ” cho Care coordinator; đổi Alex và làm Phạm vi xem không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open assistance case” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H08 — Chủ động ưu tiên cứu hộ

**Bối cảnh:** command · **Vai trò:** Dispatcher · **FR:** FR-H08

**Hình chính:** Hàng đợi cứu hộ chủ động với lý do ưu tiên giải thích được

**Câu hỏi chính:** Trong “Chủ động ưu tiên cứu hộ”, Alex, Morgan cho biết điều gì và vai trò Dispatcher có thể thực hiện “Review priority reasons” trong phạm vi này không?

**Hành động chính:** Xem lý do ưu tiên → H09

**Chi tiết mở rộng:** Giữ Alex, Morgan ở lớp quyết định. Đưa chi tiết hỗ trợ của Jamie, Chính sách ưu tiên, lịch sử nguồn, phiên bản và quy tắc FR-H08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Chủ động ưu tiên cứu hộ” cho Dispatcher; đổi Alex và làm Chính sách ưu tiên không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review priority reasons” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H09 — Căn cứ ưu tiên và quyết định

**Bối cảnh:** command · **Vai trò:** Dispatcher · **FR:** FR-H09

**Hình chính:** Bằng chứng phơi nhiễm, tự thoát cạnh quyết định ưu tiên con người

**Câu hỏi chính:** Trong “Căn cứ ưu tiên và quyết định”, Mức phơi nhiễm nguy hiểm, Khả năng tự thoát cho biết điều gì và vai trò Dispatcher có thể thực hiện “Assign proactive assistance” trong phạm vi này không?

**Hành động chính:** Phân trợ giúp chủ động → O09

**Chi tiết mở rộng:** Giữ Mức phơi nhiễm nguy hiểm, Khả năng tự thoát ở lớp quyết định. Đưa chi tiết hỗ trợ của SOS, Lý do, Ưu tiên, lịch sử nguồn, phiên bản và quy tắc FR-H09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Căn cứ ưu tiên và quyết định” cho Dispatcher; đổi Mức phơi nhiễm nguy hiểm và làm Ưu tiên không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Assign proactive assistance” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H10 — Hiện diện và kiểm đếm

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-H10

**Hình chính:** Ma trận hiện diện tách quan sát, dự kiến và chưa rõ

**Câu hỏi chính:** Trong “Hiện diện và kiểm đếm”, Ghi nhận có mặt, Dự kiến có mặt cho biết điều gì và vai trò Operator có thể thực hiện “Open proactive queue” trong phạm vi này không?

**Hành động chính:** Mở hàng đợi chủ động → H08

**Chi tiết mở rộng:** Giữ Ghi nhận có mặt, Dự kiến có mặt ở lớp quyết định. Đưa chi tiết hỗ trợ của Chưa rõ hiện diện, Nguồn ghi nhận gần nhất, Suy luận an toàn, lịch sử nguồn, phiên bản và quy tắc FR-H10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Danh sách dự kiến và lần thấy cuối không là hiện diện trực tiếp; không suy an toàn từ thiếu tín hiệu nguy cấp.

**Kiểm chứng:** Dùng tình huống “Hiện diện và kiểm đếm” cho Operator; đổi Ghi nhận có mặt và làm Suy luận an toàn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open proactive queue” chỉ tới H08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H11 — Hồ sơ y tế hạn chế truy cập

**Bối cảnh:** configuration · **Vai trò:** Authorized medical role · **FR:** FR-H11

**Hình chính:** Hồ sơ y tế hạn chế có mục đích truy cập và nhật ký chia sẻ

**Câu hỏi chính:** Trong “Hồ sơ y tế hạn chế truy cập”, Người, Hồ sơ cho biết điều gì và vai trò Authorized medical role có thể thực hiện “Return to assistance” trong phạm vi này không?

**Hành động chính:** Về trợ giúp → H09

**Chi tiết mở rộng:** Giữ Người, Hồ sơ ở lớp quyết định. Đưa chi tiết hỗ trợ của Nguồn, Lý do truy cập, Phạm vi tiết lộ, lịch sử nguồn, phiên bản và quy tắc FR-H11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Hồ sơ y tế hạn chế truy cập” cho Authorized medical role; đổi Người và làm Phạm vi tiết lộ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Return to assistance” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### H12 — Kết quả chủ động kiểm tra

**Bối cảnh:** field · **Vai trò:** Responder · **FR:** FR-H12

**Hình chính:** Quan sát an sinh có kết quả liên hệ và người tiếp theo

**Câu hỏi chính:** Trong “Kết quả chủ động kiểm tra”, Hồ sơ, Người cho biết điều gì và vai trò Responder có thể thực hiện “Save welfare observation” trong phạm vi này không?

**Hành động chính:** Lưu quan sát an sinh → R06

**Chi tiết mở rộng:** Giữ Hồ sơ, Người ở lớp quyết định. Đưa chi tiết hỗ trợ của Liên hệ, Hỗ trợ, Vị trí, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-H12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Kiểm chứng:** Dùng tình huống “Kết quả chủ động kiểm tra” cho Responder; đổi Hồ sơ và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 6 trường gốc truy cập được, và “Save welfare observation” chỉ tới R06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q01 — Sức khỏe nguồn định vị

**Bối cảnh:** command · **Vai trò:** Positioning admin · **FR:** FR-Q01

**Hình chính:** So sánh độ phủ, sức khỏe nguồn GNSS, BLE, UWB, QR

**Câu hỏi chính:** Trong “Sức khỏe nguồn định vị”, GNSS, BLE cho biết điều gì và vai trò Positioning admin có thể thực hiện “Inspect location quality” trong phạm vi này không?

**Hành động chính:** Kiểm tra chất lượng vị trí → Q02

**Chi tiết mở rộng:** Giữ GNSS, BLE ở lớp quyết định. Đưa chi tiết hỗ trợ của UWB, QR anchors, lịch sử nguồn, phiên bản và quy tắc FR-Q01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Sức khỏe nguồn định vị” cho Positioning admin; đổi GNSS và làm QR anchors không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect location quality” chỉ tới Q02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q02 — Chất lượng và lịch sử vị trí

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-Q02

**Hình chính:** Lịch sử vị trí có độ tin cậy tầng và dấu nguồn mâu thuẫn

**Câu hỏi chính:** Trong “Chất lượng và lịch sử vị trí”, Nguồn hiện tại, Độ tin cậy xác định tầng cho biết điều gì và vai trò Operator có thể thực hiện “Open assistance context” trong phạm vi này không?

**Hành động chính:** Mở bối cảnh trợ giúp → H09

**Chi tiết mở rộng:** Giữ Nguồn hiện tại, Độ tin cậy xác định tầng ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời điểm ghi nhận, Hướng, Nguồn mâu thuẫn, lịch sử nguồn, phiên bản và quy tắc FR-Q02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Chất lượng và lịch sử vị trí” cho Operator; đổi Nguồn hiện tại và làm Nguồn mâu thuẫn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open assistance context” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q03 — Hiệu chuẩn định vị trong nhà

**Bối cảnh:** configuration · **Vai trò:** Positioning admin · **FR:** FR-Q03

**Hình chính:** Hình tham chiếu hiệu chuẩn có xem trước sai số dư

**Câu hỏi chính:** Trong “Hiệu chuẩn định vị trong nhà”, Hệ tọa độ, Điểm tham chiếu cho biết điều gì và vai trò Positioning admin có thể thực hiện “Review route graph” trong phạm vi này không?

**Hành động chính:** Xem đồ thị tuyến → S15

**Chi tiết mở rộng:** Giữ Hệ tọa độ, Điểm tham chiếu ở lớp quyết định. Đưa chi tiết hỗ trợ của Tầng, Sai số hiệu chuẩn, Công bố, lịch sử nguồn, phiên bản và quy tắc FR-Q03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Hiệu chuẩn định vị trong nhà” cho Positioning admin; đổi Hệ tọa độ và làm Công bố không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review route graph” chỉ tới S15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q04 — Tối ưu phương án thoát hiểm

**Bối cảnh:** command · **Vai trò:** Incident commander · **FR:** FR-Q04

**Hình chính:** So sánh tuyến ứng viên với phương án loại và ràng buộc

**Câu hỏi chính:** Trong “Tối ưu phương án thoát hiểm”, Chính, Phương án khác cho biết điều gì và vai trò Incident commander có thể thực hiện “Review route comparison” trong phạm vi này không?

**Hành động chính:** Xem so sánh tuyến → Q05

**Chi tiết mở rộng:** Giữ Chính, Phương án khác ở lớp quyết định. Đưa chi tiết hỗ trợ của Đã loại trừ, Mục tiêu, lịch sử nguồn, phiên bản và quy tắc FR-Q04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Tối ưu phương án thoát hiểm” cho Incident commander; đổi Chính và làm Mục tiêu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review route comparison” chỉ tới Q05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q05 — So sánh và chọn tuyến

**Bối cảnh:** command · **Vai trò:** Safety reviewer · **FR:** FR-Q05

**Hình chính:** Ma trận đánh đổi tuyến nêu bất định và duyệt con người

**Câu hỏi chính:** Trong “So sánh và chọn tuyến”, Phương án A, Phương án B cho biết điều gì và vai trò Safety reviewer có thể thực hiện “Publish guidance version” trong phạm vi này không?

**Hành động chính:** Công bố phiên bản chỉ dẫn → O36

**Chi tiết mở rộng:** Giữ Phương án A, Phương án B ở lớp quyết định. Đưa chi tiết hỗ trợ của Phương án C, Điểm chưa chắc chắn, Phê duyệt, lịch sử nguồn, phiên bản và quy tắc FR-Q05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “So sánh và chọn tuyến” cho Safety reviewer; đổi Phương án A và làm Phê duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish guidance version” chỉ tới O36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q06 — Trợ lý AI xử lý sự cố

**Bối cảnh:** command · **Vai trò:** Operator · **FR:** FR-Q06

**Hình chính:** Tóm tắt AI nối bằng chứng với thời điểm và ranh giới quyền

**Câu hỏi chính:** Trong “Trợ lý AI xử lý sự cố”, Tóm tắt, Nguồn bằng chứng cho biết điều gì và vai trò Operator có thể thực hiện “Review AI recommendation” trong phạm vi này không?

**Hành động chính:** Xem đề xuất AI → Q07

**Chi tiết mở rộng:** Giữ Tóm tắt, Nguồn bằng chứng ở lớp quyết định. Đưa chi tiết hỗ trợ của Dữ liệu tính đến, Thẩm quyền, lịch sử nguồn, phiên bản và quy tắc FR-Q06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Trợ lý AI xử lý sự cố” cho Operator; đổi Tóm tắt và làm Thẩm quyền không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review AI recommendation” chỉ tới Q07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q07 — Bằng chứng và duyệt đề xuất AI

**Bối cảnh:** command · **Vai trò:** Supervisor · **FR:** FR-Q07

**Hình chính:** Đối chiếu tuyên bố, bằng chứng, chưa rõ trước quyết định

**Câu hỏi chính:** Trong “Bằng chứng và duyệt đề xuất AI”, Nhận định, Bằng chứng cho biết điều gì và vai trò Supervisor có thể thực hiện “Review route decision” trong phạm vi này không?

**Hành động chính:** Xem quyết định tuyến → Q05

**Chi tiết mở rộng:** Giữ Nhận định, Bằng chứng ở lớp quyết định. Đưa chi tiết hỗ trợ của Unknown, Kiểm soát, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-Q07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Bằng chứng và duyệt đề xuất AI” cho Supervisor; đổi Nhận định và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review route decision” chỉ tới Q05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q08 — Chính sách AI và đánh giá mô hình

**Bối cảnh:** configuration · **Vai trò:** AI governance lead · **FR:** FR-Q08

**Hình chính:** Kết quả đánh giá căn cứ, chèn lệnh và lộ dữ liệu

**Câu hỏi chính:** Trong “Chính sách AI và đánh giá mô hình”, Mô hình, Kiểm thử căn cứ cho biết điều gì và vai trò AI governance lead có thể thực hiện “Open model governance” trong phạm vi này không?

**Hành động chính:** Mở quản trị mô hình → Q09

**Chi tiết mở rộng:** Giữ Mô hình, Kiểm thử căn cứ ở lớp quyết định. Đưa chi tiết hỗ trợ của Tấn công chỉ dẫn, Dữ liệu sức khỏe, Công cụ điều khiển, lịch sử nguồn, phiên bản và quy tắc FR-Q08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Chính sách AI và đánh giá mô hình” cho AI governance lead; đổi Mô hình và làm Công cụ điều khiển không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open model governance” chỉ tới Q09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q09 — Quản trị triển khai AI

**Bối cảnh:** configuration · **Vai trò:** AI governance lead · **FR:** FR-Q09

**Hình chính:** Xem trước triển khai phiên bản mô hình, prompt với dự phòng vùng

**Câu hỏi chính:** Trong “Quản trị triển khai AI”, Vùng dữ liệu, Phiên bản mô hình cho biết điều gì và vai trò AI governance lead có thể thực hiện “Save deployment draft” trong phạm vi này không?

**Hành động chính:** Lưu nháp triển khai → Q08

**Chi tiết mở rộng:** Giữ Vùng dữ liệu, Phiên bản mô hình ở lớp quyết định. Đưa chi tiết hỗ trợ của Phiên bản chỉ dẫn, Lưu trữ dữ liệu, Dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-Q09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Quản trị triển khai AI” cho AI governance lead; đổi Vùng dữ liệu và làm Dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save deployment draft” chỉ tới Q08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### Q10 — Mô phỏng dòng người và kịch bản

**Bối cảnh:** configuration · **Vai trò:** Safety planner · **FR:** FR-Q10

**Hình chính:** Kịch bản đám đông, lối chặn mô phỏng theo nhóm di chuyển

**Câu hỏi chính:** Trong “Mô phỏng dòng người và kịch bản”, Chế độ, Mức hiện diện cho biết điều gì và vai trò Safety planner có thể thực hiện “Review route validation” trong phạm vi này không?

**Hành động chính:** Xem kiểm tra tuyến → S16

**Chi tiết mở rộng:** Giữ Chế độ, Mức hiện diện ở lớp quyết định. Đưa chi tiết hỗ trợ của Lối thoát bị chặn, Hỗ trợ vận động, Kết quả, lịch sử nguồn, phiên bản và quy tắc FR-Q10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Kiểm chứng:** Dùng tình huống “Mô phỏng dòng người và kịch bản” cho Safety planner; đổi Chế độ và làm Kết quả không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review route validation” chỉ tới S16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F01 — Tổng quan hệ thống vật lý

**Bối cảnh:** command · **Vai trò:** Physical supervisor · **FR:** FR-F01

**Hình chính:** Sơ đồ hệ vật lý thể hiện thẩm quyền bộ điều khiển và tuổi chứng cứ

**Câu hỏi chính:** Trong “Tổng quan hệ thống vật lý”, Sức khỏe bộ điều khiển, Trạng thái vùng cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F07” trong phạm vi này không?

**Hành động chính:** Xem F07 → F07

**Chi tiết mở rộng:** Giữ Sức khỏe bộ điều khiển, Trạng thái vùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ mới bằng chứng, Thẩm quyền cục bộ, Quyền điều khiển, lịch sử nguồn, phiên bản và quy tắc FR-F01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Tổng quan hệ thống vật lý” cho Physical supervisor; đổi Sức khỏe bộ điều khiển và làm Quyền điều khiển không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F07” chỉ tới F07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F02 — Danh mục bộ điều khiển

**Bối cảnh:** configuration · **Vai trò:** Integration engineer · **FR:** FR-F02

**Hình chính:** Danh mục bộ điều khiển có model, giao thức và năng lực xác minh

**Câu hỏi chính:** Trong “Danh mục bộ điều khiển”, Model bộ điều khiển, Liên kết giao thức cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F03” trong phạm vi này không?

**Hành động chính:** Xem F03 → F03

**Chi tiết mở rộng:** Giữ Model bộ điều khiển, Liên kết giao thức ở lớp quyết định. Đưa chi tiết hỗ trợ của Chế độ vận hành, Site được gán, Bằng chứng khả năng, lịch sử nguồn, phiên bản và quy tắc FR-F02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Danh mục bộ điều khiển” cho Integration engineer; đổi Model bộ điều khiển và làm Bằng chứng khả năng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F03” chỉ tới F03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F03 — Chi tiết khả năng bộ điều khiển

**Bối cảnh:** configuration · **Vai trò:** Integration engineer · **FR:** FR-F03

**Hình chính:** Ma trận thao tác cho phép, cấm cạnh ghi đè cục bộ

**Câu hỏi chính:** Trong “Chi tiết khả năng bộ điều khiển”, Model bộ điều khiển, Thao tác được phép cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F04” trong phạm vi này không?

**Hành động chính:** Xem F04 → F04

**Chi tiết mở rộng:** Giữ Model bộ điều khiển, Thao tác được phép ở lớp quyết định. Đưa chi tiết hỗ trợ của Thao tác bị cấm, Bằng chứng khả năng, Ưu tiên cục bộ, lịch sử nguồn, phiên bản và quy tắc FR-F03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Chi tiết khả năng bộ điều khiển” cho Integration engineer; đổi Model bộ điều khiển và làm Ưu tiên cục bộ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F04” chỉ tới F04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F04 — Ánh xạ điểm tín hiệu

**Bối cảnh:** configuration · **Vai trò:** Integration engineer · **FR:** FR-F04

**Hình chính:** Ánh xạ địa chỉ tín hiệu sang nghĩa với cực tính và chất lượng

**Câu hỏi chính:** Trong “Ánh xạ điểm tín hiệu”, Địa chỉ tín hiệu, Ý nghĩa tín hiệu cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F05” trong phạm vi này không?

**Hành động chính:** Xem F05 → F05

**Chi tiết mở rộng:** Giữ Địa chỉ tín hiệu, Ý nghĩa tín hiệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Cực tính bình thường, Ánh xạ chất lượng, Phiên bản ánh xạ, lịch sử nguồn, phiên bản và quy tắc FR-F04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Ánh xạ điểm tín hiệu” cho Integration engineer; đổi Địa chỉ tín hiệu và làm Phiên bản ánh xạ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F05” chỉ tới F05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F05 — Ánh xạ vùng vật lý

**Bối cảnh:** configuration · **Vai trò:** Site engineer · **FR:** FR-F05

**Hình chính:** Chồng vùng vật lý, nguồn nêu sai khác tọa độ và độ phủ

**Câu hỏi chính:** Trong “Ánh xạ vùng vật lý”, Vùng nguồn, Vùng đích cho biết điều gì và vai trò Site engineer có thể thực hiện “Review F06” trong phạm vi này không?

**Hành động chính:** Xem F06 → F06

**Chi tiết mở rộng:** Giữ Vùng nguồn, Vùng đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Hệ tọa độ, Ranh giới bao phủ, Phiên bản ánh xạ, lịch sử nguồn, phiên bản và quy tắc FR-F05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Ánh xạ vùng vật lý” cho Site engineer; đổi Vùng nguồn và làm Phiên bản ánh xạ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F06” chỉ tới F06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F06 — Ma trận nguyên nhân–tác động

**Bối cảnh:** configuration · **Vai trò:** Fire systems engineer · **FR:** FR-F06

**Hình chính:** Đồ thị nguyên nhân, tác động có thẩm quyền và cổng ngăn

**Câu hỏi chính:** Trong “Ma trận nguyên nhân–tác động”, Đầu vào nguyên nhân, Tác động được duyệt cho biết điều gì và vai trò Fire systems engineer có thể thực hiện “Review F15” trong phạm vi này không?

**Hành động chính:** Xem F15 → F15

**Chi tiết mở rộng:** Giữ Đầu vào nguyên nhân, Tác động được duyệt ở lớp quyết định. Đưa chi tiết hỗ trợ của Hồ sơ phê duyệt, Điều kiện khóa, Ảnh hưởng thay đổi, lịch sử nguồn, phiên bản và quy tắc FR-F06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Ma trận nguyên nhân–tác động” cho Fire systems engineer; đổi Đầu vào nguyên nhân và làm Ảnh hưởng thay đổi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F15” chỉ tới F15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F07 — Chi tiết sự kiện vật lý

**Bối cảnh:** command · **Vai trò:** Physical supervisor · **FR:** FR-F07

**Hình chính:** Thẻ nguồn sự kiện vật lý nối bằng chứng quan sát và sự cố

**Câu hỏi chính:** Trong “Chi tiết sự kiện vật lý”, Sự kiện nguồn, Ý nghĩa tín hiệu cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F08” trong phạm vi này không?

**Hành động chính:** Xem F08 → F08

**Chi tiết mở rộng:** Giữ Sự kiện nguồn, Ý nghĩa tín hiệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời điểm quan sát, Chất lượng bằng chứng, Liên kết sự cố, lịch sử nguồn, phiên bản và quy tắc FR-F07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Chi tiết sự kiện vật lý” cho Physical supervisor; đổi Sự kiện nguồn và làm Liên kết sự cố không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F08” chỉ tới F08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F08 — Trạng thái nước chữa cháy

**Bối cảnh:** command · **Vai trò:** Physical supervisor · **FR:** FR-F08

**Hình chính:** Sơ đồ hệ nước tách phản hồi bơm, áp lực và van

**Câu hỏi chính:** Trong “Trạng thái nước chữa cháy”, Phản hồi bơm, Quan sát áp suất cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F09” trong phạm vi này không?

**Hành động chính:** Xem F09 → F09

**Chi tiết mở rộng:** Giữ Phản hồi bơm, Quan sát áp suất ở lớp quyết định. Đưa chi tiết hỗ trợ của Phản hồi van, Khả năng cấp nước, Suy giảm thiết bị, lịch sử nguồn, phiên bản và quy tắc FR-F08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Trạng thái nước chữa cháy” cho Physical supervisor; đổi Phản hồi bơm và làm Suy giảm thiết bị không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F09” chỉ tới F09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F09 — Xem xét kích hoạt có kiểm soát

**Bối cảnh:** command · **Vai trò:** Authorized fire officer · **FR:** FR-F09

**Hình chính:** Cổng điều kiện nhả với đúng thiết bị và yêu cầu hết hạn

**Câu hỏi chính:** Trong “Xem xét kích hoạt có kiểm soát”, Thao tác yêu cầu, Thiết bị đích cho biết điều gì và vai trò Authorized fire officer có thể thực hiện “Review F10” trong phạm vi này không?

**Hành động chính:** Xem F10 → F10

**Chi tiết mở rộng:** Giữ Thao tác yêu cầu, Thiết bị đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng khả năng, Điều kiện kích hoạt, Hết hạn lệnh, lịch sử nguồn, phiên bản và quy tắc FR-F09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Xem xét kích hoạt có kiểm soát” cho Authorized fire officer; đổi Thao tác yêu cầu và làm Hết hạn lệnh không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F10” chỉ tới F10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F10 — Phê duyệt lệnh thiết bị

**Bối cảnh:** command · **Vai trò:** Independent command approver · **FR:** FR-F10

**Hình chính:** Bản lệnh bất biến với người yêu cầu, duyệt và ranh giới thực thi

**Câu hỏi chính:** Trong “Phê duyệt lệnh thiết bị”, Digest chính xác của lệnh, Danh tính người yêu cầu cho biết điều gì và vai trò Independent command approver có thể thực hiện “Review F11” trong phạm vi này không?

**Hành động chính:** Xem F11 → F11

**Chi tiết mở rộng:** Giữ Digest chính xác của lệnh, Danh tính người yêu cầu ở lớp quyết định. Đưa chi tiết hỗ trợ của Danh tính người duyệt, Trạng thái phê duyệt, Ranh giới thực thi, lịch sử nguồn, phiên bản và quy tắc FR-F10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Phê duyệt lệnh thiết bị” cho Independent command approver; đổi Digest chính xác của lệnh và làm Ranh giới thực thi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F11” chỉ tới F11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F11 — Phản hồi thực thi

**Bối cảnh:** command · **Vai trò:** Physical supervisor · **FR:** FR-F11

**Hình chính:** Dòng biên nhận so với phản hồi vật lý có kết quả chưa rõ

**Câu hỏi chính:** Trong “Phản hồi thực thi”, Biên nhận lệnh, Phản hồi vật lý cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F12” trong phạm vi này không?

**Hành động chính:** Xem F12 → F12

**Chi tiết mở rộng:** Giữ Biên nhận lệnh, Phản hồi vật lý ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái kết quả, Tương quan thực thi, Quyền thử lại, lịch sử nguồn, phiên bản và quy tắc FR-F11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Lệnh được nhận và tác động vật lý là trạng thái riêng; kết quả chưa rõ chặn thử lại mù và mở đối soát F12.

**Kiểm chứng:** Dùng tình huống “Phản hồi thực thi” cho Physical supervisor; đổi Biên nhận lệnh và làm Quyền thử lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F12” chỉ tới F12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F12 — Đối soát kết quả chưa rõ

**Bối cảnh:** command · **Vai trò:** Physical supervisor · **FR:** FR-F12

**Hình chính:** Đối soát kết quả chưa rõ bằng đọc lại và bằng chứng hiện trường

**Câu hỏi chính:** Trong “Đối soát kết quả chưa rõ”, Tham chiếu lệnh, Bằng chứng đọc lại cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F13” trong phạm vi này không?

**Hành động chính:** Xem F13 → F13

**Chi tiết mở rộng:** Giữ Tham chiếu lệnh, Bằng chứng đọc lại ở lớp quyết định. Đưa chi tiết hỗ trợ của Xác nhận hiện trường, Quyết định đối soát, Lý do quyết định, lịch sử nguồn, phiên bản và quy tắc FR-F12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ kết quả chưa rõ tới khi đọc lại liên kết đúng hoặc bằng chứng hiện trường có quyền giải quyết; giữ bằng chứng mâu thuẫn và lý do.

**Kiểm chứng:** Dùng tình huống “Đối soát kết quả chưa rõ” cho Physical supervisor; đổi Tham chiếu lệnh và làm Lý do quyết định không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F13” chỉ tới F13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F13 — Ưu tiên cục bộ và bàn giao

**Bối cảnh:** command · **Vai trò:** Site incident commander · **FR:** FR-F13

**Hình chính:** Bàn giao điều khiển cục bộ thể hiện lease xa và người nhận

**Câu hỏi chính:** Trong “Ưu tiên cục bộ và bàn giao”, Trạng thái bộ điều khiển cục bộ, Lease điều khiển từ xa cho biết điều gì và vai trò Site incident commander có thể thực hiện “Review F01” trong phạm vi này không?

**Hành động chính:** Xem F01 → F01

**Chi tiết mở rộng:** Giữ Trạng thái bộ điều khiển cục bộ, Lease điều khiển từ xa ở lớp quyết định. Đưa chi tiết hỗ trợ của Người tiếp nhận, Phạm vi bàn giao, Điều kiện trả quyền từ xa, lịch sử nguồn, phiên bản và quy tắc FR-F13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Mất lease xa không được lấy lại quyền từ điều khiển cục bộ; trở lại từ xa cần cổng bàn giao đã quy định.

**Kiểm chứng:** Dùng tình huống “Ưu tiên cục bộ và bàn giao” cho Site incident commander; đổi Trạng thái bộ điều khiển cục bộ và làm Điều kiện trả quyền từ xa không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F01” chỉ tới F01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F14 — Suy giảm và chế độ kiểm thử

**Bối cảnh:** command · **Vai trò:** Maintenance coordinator · **FR:** FR-F14

**Hình chính:** Bản đồ suy giảm với biện pháp bù, giấy phép và hết hạn

**Câu hỏi chính:** Trong “Suy giảm và chế độ kiểm thử”, Phạm vi suy giảm, Tham chiếu giấy phép cho biết điều gì và vai trò Maintenance coordinator có thể thực hiện “Review F18” trong phạm vi này không?

**Hành động chính:** Xem F18 → F18

**Chi tiết mở rộng:** Giữ Phạm vi suy giảm, Tham chiếu giấy phép ở lớp quyết định. Đưa chi tiết hỗ trợ của Biện pháp bù trừ, Cách ly kiểm thử, Hết hạn và chuyển cấp, lịch sử nguồn, phiên bản và quy tắc FR-F14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Suy giảm và chế độ kiểm thử” cho Maintenance coordinator; đổi Phạm vi suy giảm và làm Hết hạn và chuyển cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F18” chỉ tới F18 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F15 — Kế hoạch nghiệm thu

**Bối cảnh:** configuration · **Vai trò:** Commissioning lead · **FR:** FR-F15

**Hình chính:** Chuỗi nghiệm thu có cách ly thử và điểm chứng kiến

**Câu hỏi chính:** Trong “Kế hoạch nghiệm thu”, Cấu hình kiểm thử, Phạm vi kiểm thử cho biết điều gì và vai trò Commissioning lead có thể thực hiện “Review F16” trong phạm vi này không?

**Hành động chính:** Xem F16 → F16

**Chi tiết mở rộng:** Giữ Cấu hình kiểm thử, Phạm vi kiểm thử ở lớp quyết định. Đưa chi tiết hỗ trợ của Điều kiện kiểm thử, Người chứng kiến, Yêu cầu bằng chứng, lịch sử nguồn, phiên bản và quy tắc FR-F15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Kế hoạch nghiệm thu” cho Commissioning lead; đổi Cấu hình kiểm thử và làm Yêu cầu bằng chứng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F16” chỉ tới F16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F16 — Bằng chứng lần kiểm thử

**Bối cảnh:** configuration · **Vai trò:** Commissioning witness · **FR:** FR-F16

**Hình chính:** So sánh tác động vật lý dự kiến, quan sát và lỗi chèn

**Câu hỏi chính:** Trong “Bằng chứng lần kiểm thử”, Lần kiểm thử, Tác động dự kiến cho biết điều gì và vai trò Commissioning witness có thể thực hiện “Review F17” trong phạm vi này không?

**Hành động chính:** Xem F17 → F17

**Chi tiết mở rộng:** Giữ Lần kiểm thử, Tác động dự kiến ở lớp quyết định. Đưa chi tiết hỗ trợ của Tác động quan sát, Tạo lỗi có kiểm soát, Trạng thái kết quả thử, lịch sử nguồn, phiên bản và quy tắc FR-F16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Bằng chứng lần kiểm thử” cho Commissioning witness; đổi Lần kiểm thử và làm Trạng thái kết quả thử không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F17” chỉ tới F17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F17 — Hồ sơ tương thích và chứng nhận

**Bối cảnh:** configuration · **Vai trò:** Compliance reviewer · **FR:** FR-F17

**Hình chính:** Phạm vi chứng chỉ đối chiếu vật tư lắp và giới hạn

**Câu hỏi chính:** Trong “Hồ sơ tương thích và chứng nhận”, BOM đã lắp đặt, Phạm vi chứng nhận cho biết điều gì và vai trò Compliance reviewer có thể thực hiện “Review F20” trong phạm vi này không?

**Hành động chính:** Xem F20 → F20

**Chi tiết mở rộng:** Giữ BOM đã lắp đặt, Phạm vi chứng nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Giới hạn interface, Hiệu lực bằng chứng, Quyết định đưa vào vận hành, lịch sử nguồn, phiên bản và quy tắc FR-F17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Hồ sơ tương thích và chứng nhận” cho Compliance reviewer; đổi BOM đã lắp đặt và làm Quyết định đưa vào vận hành không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F20” chỉ tới F20 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F18 — Bảo trì và khôi phục

**Bối cảnh:** configuration · **Vai trò:** Maintenance coordinator · **FR:** FR-F18

**Hình chính:** Danh mục phục hồi có suy giảm còn lại và bằng chứng duyệt

**Câu hỏi chính:** Trong “Bảo trì và khôi phục”, Phạm vi bảo trì, Bằng chứng sửa chữa cho biết điều gì và vai trò Maintenance coordinator có thể thực hiện “Review F01” trong phạm vi này không?

**Hành động chính:** Xem F01 → F01

**Chi tiết mở rộng:** Giữ Phạm vi bảo trì, Bằng chứng sửa chữa ở lớp quyết định. Đưa chi tiết hỗ trợ của Kiểm thử khôi phục, Phê duyệt đóng, Suy giảm còn lại, lịch sử nguồn, phiên bản và quy tắc FR-F18 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Bảo trì và khôi phục” cho Maintenance coordinator; đổi Phạm vi bảo trì và làm Suy giảm còn lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F01” chỉ tới F01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F19 — Nhiệm vụ thiết bị cứu hộ

**Bối cảnh:** command · **Vai trò:** Rescue mission commander · **FR:** FR-F19

**Hình chính:** Phạm vi nhiệm vụ thiết bị cứu hộ có người đủ chuẩn và giới hạn

**Câu hỏi chính:** Trong “Nhiệm vụ thiết bị cứu hộ”, Cấu hình thiết bị, Interface điều khiển cho biết điều gì và vai trò Rescue mission commander có thể thực hiện “Review F11” trong phạm vi này không?

**Hành động chính:** Xem F11 → F11

**Chi tiết mở rộng:** Giữ Cấu hình thiết bị, Interface điều khiển ở lớp quyết định. Đưa chi tiết hỗ trợ của Năng lực operator, Ràng buộc nhiệm vụ, Bằng chứng nhiệm vụ, lịch sử nguồn, phiên bản và quy tắc FR-F19 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Nhiệm vụ thiết bị cứu hộ” cho Rescue mission commander; đổi Cấu hình thiết bị và làm Bằng chứng nhiệm vụ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F11” chỉ tới F11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.

### F20 — Kết nối hệ thống vật lý

**Bối cảnh:** configuration · **Vai trò:** Integration engineer · **FR:** FR-F20

**Hình chính:** Cổng tiếp nhận kết nối hãng về khóa, nhập và kích hoạt

**Câu hỏi chính:** Trong “Kết nối hệ thống vật lý”, Interface nhà sản xuất, Bảo mật truyền dẫn cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F02” trong phạm vi này không?

**Hành động chính:** Xem F02 → F02

**Chi tiết mở rộng:** Giữ Interface nhà sản xuất, Bảo mật truyền dẫn ở lớp quyết định. Đưa chi tiết hỗ trợ của Quản lý credential, Phạm vi nhập, Điều kiện kích hoạt, lịch sử nguồn, phiên bản và quy tắc FR-F20 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Kiểm chứng:** Dùng tình huống “Kết nối hệ thống vật lý” cho Integration engineer; đổi Interface nhà sản xuất và làm Điều kiện kích hoạt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F02” chỉ tới F02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


## BMS revision2.1 scope note

Báo cáo này ghi nhận đợt redesign233màn hình trước đó. Revision2.1 bổ sung8màn BMS, nâng catalog hiện tại lên241màn. Số liệu audit lịch sử được giữ nguyên có chủ đích. Đặc tả và bằng chứng trình duyệt cho BMS được quản lý riêng.

[Current screen specifications](Screen-Specifications.html) · [BMS UI evidence](verification/BMS-UI-QA.json)
