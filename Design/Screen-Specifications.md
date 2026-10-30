# SmartAlarm — Đặc tả toàn bộ màn hình

Phiên bản 2.0 · 233 màn hình định danh; Việt–Anh–Nhật. Mỗi màn có mockup tương ứng, không tính các state variations thành màn mới.

Các bản ghi mẫu không phải dữ liệu người thật. Các luồng có tác động thật dùng review/approval/receipt trong sản phẩm; prototype chỉ mô phỏng điều hướng. Tên role là capability nghiệp vụ, không phải role toàn quyền.

## Quy ước interaction chung

Focus đi theo thứ tự nội dung, CTA ≥ 44 px thiết kế; lỗi field giữ input; Enter không tự phát command ở dialog xác nhận; Escape đóng modal không lưu. Form system fields read-only. Mutation dùng idempotency + version; successful UI chỉ sau server receipt. Sensitive details không được cache ngoài scope. Quay lại giữ draft trong scope cùng tenant, xóa khi đổi membership.

## Đặc tả từng màn


## Hợp đồng bố cục V2

Thiết kế thị giác dưới đây quy định bố cục và thứ bậc thông tin. Giữ nguyên mục đích, vai trò, trường, quy tắc, luồng, điều hướng và điều kiện nghiệm thu gốc. Nhãn Layout cũ là metadata danh mục, không bắt buộc renderer chung. Đây là yêu cầu thiết kế, không tuyên bố đã thử người dùng từng trạng thái. Xem [kiểm toán UX](UX-Redesign-Audit.md).

<a id="a01"></a>
## A01 — Chọn vùng và ngôn ngữ

**EN:** Welcome & region · **JA:** 地域と言語の選択  
**Yêu cầu:** FR-A01 / WF-01 · **Actor:** Citizen · **Surface:** Access · **Layout:** welcome

**Mục đích:** Choose your safety region.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Continue → A02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A01) · [EN](Prototype.html?lang=en#A01) · [JA](Prototype.html?lang=ja#A01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vùng dữ liệu | Europe · EU | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ngôn ngữ | English | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khả năng tiếp cận | Standard | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A02 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Chọn vùng và ngôn ngữ”, Vùng dữ liệu, Ngôn ngữ cho biết điều gì và vai trò Citizen có thể thực hiện “Continue” trong phạm vi này không?

**Hình chính:** Bộ chọn vùng với mẫu ngôn ngữ và xem trước cỡ chữ

**Hành động chính:** Tiếp tục → A02

**Mở dần chi tiết:** Giữ Vùng dữ liệu, Ngôn ngữ ở lớp quyết định. Đưa chi tiết hỗ trợ của Khả năng tiếp cận, lịch sử nguồn, phiên bản và quy tắc FR-A01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chọn vùng và ngôn ngữ” cho Citizen; đổi Vùng dữ liệu và làm Khả năng tiếp cận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Continue” chỉ tới A02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a02"></a>
## A02 — Đăng nhập

**EN:** Sign in · **JA:** サインイン  
**Yêu cầu:** FR-A02 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Mục đích:** Your workspace, securely connected.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** A01, A05, X08.  
**Đầu ra:** Sign in → A03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A02) · [EN](Prototype.html?lang=en#A02) · [JA](Prototype.html?lang=ja#A02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Email | alex@example.test | Email hợp lệ; không tiết lộ tài khoản tồn tại qua lỗi. |
| Không gian làm việc | Northstar | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phương thức | Passkey or enterprise SSO | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A03 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A02 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Đăng nhập”, Email, Không gian làm việc cho biết điều gì và vai trò All roles có thể thực hiện “Sign in” trong phạm vi này không?

**Hình chính:** Nhận diện tổ chức cạnh lối vào passkey và SSO

**Hành động chính:** Đăng nhập → A03

**Mở dần chi tiết:** Giữ Email, Không gian làm việc ở lớp quyết định. Đưa chi tiết hỗ trợ của Phương thức, lịch sử nguồn, phiên bản và quy tắc FR-A02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đăng nhập” cho All roles; đổi Email và làm Phương thức không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Sign in” chỉ tới A03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a03"></a>
## A03 — Xác minh danh tính

**EN:** Verify identity · **JA:** 本人確認  
**Yêu cầu:** FR-A03 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Mục đích:** Confirm this sign-in.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** A02.  
**Đầu ra:** Verify → A04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A03) · [EN](Prototype.html?lang=en#A03) · [JA](Prototype.html?lang=ja#A03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phương thức | Authenticator | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Mã xác minh | 123456 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thiết bị tin cậy | Off | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A04 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A03 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Xác minh danh tính”, Phương thức, Mã xác minh cho biết điều gì và vai trò All roles có thể thực hiện “Verify” trong phạm vi này không?

**Hình chính:** Phương thức xác minh và ô mã với phản hồi số lần thử

**Hành động chính:** Xác minh → A04

**Mở dần chi tiết:** Giữ Phương thức, Mã xác minh ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị tin cậy, lịch sử nguồn, phiên bản và quy tắc FR-A03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xác minh danh tính” cho All roles; đổi Phương thức và làm Thiết bị tin cậy không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Verify” chỉ tới A04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a04"></a>
## A04 — Chọn không gian làm việc

**EN:** Workspace switcher · **JA:** ワークスペースの選択  
**Yêu cầu:** FR-A04 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** cards

**Mục đích:** Choose an organization.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** A03, X04.  
**Đầu ra:** Enter workspace → O01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A04) · [EN](Prototype.html?lang=en#A04) · [JA](Prototype.html?lang=ja#A04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Northstar | EU · Operator | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Harbor Campus | APAC · Responder | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Personal | EU · Citizen | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O01 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A04 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Chọn không gian làm việc”, Northstar, Harbor Campus cho biết điều gì và vai trò All roles có thể thực hiện “Enter workspace” trong phạm vi này không?

**Hình chính:** Thẻ tổ chức ghi vùng dữ liệu và vai trò trước khi vào

**Hành động chính:** Vào tổ chức → O01

**Mở dần chi tiết:** Giữ Northstar, Harbor Campus ở lớp quyết định. Đưa chi tiết hỗ trợ của Personal, lịch sử nguồn, phiên bản và quy tắc FR-A04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chọn không gian làm việc” cho All roles; đổi Northstar và làm Personal không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Enter workspace” chỉ tới O01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a05"></a>
## A05 — Khôi phục truy cập

**EN:** Recover access · **JA:** アクセスの復旧  
**Yêu cầu:** FR-A05 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Mục đích:** Restore access without exposing account existence.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Send recovery link → A02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A05) · [EN](Prototype.html?lang=en#A05) · [JA](Prototype.html?lang=ja#A05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Email | alex@example.test | Email hợp lệ; không tiết lộ tài khoản tồn tại qua lỗi. |
| Phương thức khôi phục | Verified recovery contact | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Yêu cầu | One active request | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A02 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A05 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Khôi phục truy cập”, Email, Phương thức khôi phục cho biết điều gì và vai trò All roles có thể thực hiện “Send recovery link” trong phạm vi này không?

**Hình chính:** Chọn cách khôi phục và biên nhận đích đã che

**Hành động chính:** Gửi liên kết khôi phục → A02

**Mở dần chi tiết:** Giữ Email, Phương thức khôi phục ở lớp quyết định. Đưa chi tiết hỗ trợ của Yêu cầu, lịch sử nguồn, phiên bản và quy tắc FR-A05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Khôi phục truy cập” cho All roles; đổi Email và làm Yêu cầu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send recovery link” chỉ tới A02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a06"></a>
## A06 — Chấp nhận lời mời

**EN:** Accept invitation · **JA:** 招待の承認  
**Yêu cầu:** FR-A06 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Mục đích:** Review your organization invitation.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Accept invitation → A07.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A06) · [EN](Prototype.html?lang=en#A06) · [JA](Prototype.html?lang=ja#A06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tổ chức | Northstar | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vai trò | Responder | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Vùng dữ liệu | EU | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Lời mời | Expires in 24 hours | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A07 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A06 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Chấp nhận lời mời”, Tổ chức, Vai trò cho biết điều gì và vai trò All roles có thể thực hiện “Accept invitation” trong phạm vi này không?

**Hình chính:** Danh tính lời mời, phạm vi vai trò và hạn dùng

**Hành động chính:** Nhận lời mời → A07

**Mở dần chi tiết:** Giữ Tổ chức, Vai trò ở lớp quyết định. Đưa chi tiết hỗ trợ của Vùng dữ liệu, Lời mời, lịch sử nguồn, phiên bản và quy tắc FR-A06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chấp nhận lời mời” cho All roles; đổi Tổ chức và làm Lời mời không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Accept invitation” chỉ tới A07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a07"></a>
## A07 — Quyền truy cập và đồng ý

**EN:** Permissions & consent · **JA:** 権限と同意  
**Yêu cầu:** FR-A07 / WF-01 · **Actor:** Citizen · **Surface:** Access · **Layout:** form

**Mục đích:** Choose how SmartAlarm supports you.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** A06.  
**Đầu ra:** Save choices → C01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A07) · [EN](Prototype.html?lang=en#A07) · [JA](Prototype.html?lang=ja#A07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Thông báo | Enable | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vị trí | While using app | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Chia sẻ khẩn cấp | Selected contacts | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Camera | Ask when attaching | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C01 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A07 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Quyền truy cập và đồng ý”, Thông báo, Vị trí cho biết điều gì và vai trò Citizen có thể thực hiện “Save choices” trong phạm vi này không?

**Hình chính:** Các công tắc quyền riêng biệt kèm biểu tượng mục đích

**Hành động chính:** Lưu lựa chọn → C01

**Mở dần chi tiết:** Giữ Thông báo, Vị trí ở lớp quyết định. Đưa chi tiết hỗ trợ của Chia sẻ khẩn cấp, Camera, lịch sử nguồn, phiên bản và quy tắc FR-A07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Quyền truy cập và đồng ý” cho Citizen; đổi Thông báo và làm Camera không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save choices” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a08"></a>
## A08 — Phiên và thiết bị đăng nhập

**EN:** Session & device security · **JA:** セッションと端末  
**Yêu cầu:** FR-A08 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** list

**Mục đích:** Review devices with access.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** A09.  
**Đầu ra:** Review session → A09.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A08) · [EN](Prototype.html?lang=en#A08) · [JA](Prototype.html?lang=ja#A08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| This device | Active · Berlin | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Work tablet | Last active 2 hours ago | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Old phone | Revoked | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A09 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A08 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Phiên và thiết bị đăng nhập”, This device, Work tablet cho biết điều gì và vai trò All roles có thể thực hiện “Review session” trong phạm vi này không?

**Hình chính:** Hình thiết bị với nhãn phiên hiện tại và hoạt động cuối

**Hành động chính:** Xem phiên → A09

**Mở dần chi tiết:** Giữ This device, Work tablet ở lớp quyết định. Đưa chi tiết hỗ trợ của Old phone, lịch sử nguồn, phiên bản và quy tắc FR-A08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phiên và thiết bị đăng nhập” cho All roles; đổi This device và làm Old phone không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review session” chỉ tới A09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a09"></a>
## A09 — Thu hồi phiên đăng nhập

**EN:** Revoke session · **JA:** セッションの取り消し  
**Yêu cầu:** FR-A09 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Mục đích:** End access on the selected device.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** A08.  
**Đầu ra:** Revoke selected session → A08.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A09) · [EN](Prototype.html?lang=en#A09) · [JA](Prototype.html?lang=ja#A09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Thiết bị | Work tablet | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tác động | Sign-in required again | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lý do | Device replaced | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A08 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A09 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Thu hồi phiên đăng nhập”, Thiết bị, Tác động cho biết điều gì và vai trò All roles có thể thực hiện “Revoke selected session” trong phạm vi này không?

**Hình chính:** Thiết bị được chọn và xác nhận tác động thu hồi

**Hành động chính:** Thu hồi phiên đã chọn → A08

**Mở dần chi tiết:** Giữ Thiết bị, Tác động ở lớp quyết định. Đưa chi tiết hỗ trợ của Lý do, lịch sử nguồn, phiên bản và quy tắc FR-A09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thu hồi phiên đăng nhập” cho All roles; đổi Thiết bị và làm Lý do không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Revoke selected session” chỉ tới A08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="a10"></a>
## A10 — Hồ sơ và khả năng tiếp cận

**EN:** Profile & accessibility · **JA:** プロフィールとアクセシビリティ  
**Yêu cầu:** FR-A10 / WF-01 · **Actor:** All roles · **Surface:** Access · **Layout:** form

**Mục đích:** Make the interface work for you.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save profile → C01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#A10) · [EN](Prototype.html?lang=en#A10) · [JA](Prototype.html?lang=ja#A10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tên | Alex Morgan | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ngôn ngữ | English | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Cỡ chữ | Large | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Giảm chuyển động | On | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Múi giờ | Europe/Berlin | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-A10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C01 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### A10 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Hồ sơ và khả năng tiếp cận”, Tên, Ngôn ngữ cho biết điều gì và vai trò All roles có thể thực hiện “Save profile” trong phạm vi này không?

**Hình chính:** Xem trước trợ năng cạnh ngôn ngữ và chuyển động

**Hành động chính:** Lưu hồ sơ → C01

**Mở dần chi tiết:** Giữ Tên, Ngôn ngữ ở lớp quyết định. Đưa chi tiết hỗ trợ của Cỡ chữ, Giảm chuyển động, Múi giờ, lịch sử nguồn, phiên bản và quy tắc FR-A10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không lộ tổ chức đã chọn trước xác minh danh tính và thành viên; giữ phương thức đã chọn nhưng không ngụ ý truy cập thành công.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ và khả năng tiếp cận” cho All roles; đổi Tên và làm Múi giờ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save profile” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c01"></a>
## C01 — An toàn của bạn

**EN:** Safety home · **JA:** あなたの安全  
**Yêu cầu:** FR-C01 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** home

**Mục đích:** A clear next step, when it matters.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** A07, A10, C23, C34.  
**Đầu ra:** View active alert → C02.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C01) · [EN](Prototype.html?lang=en#C01) · [JA](Prototype.html?lang=ja#C01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Khu vực của bạn | Harbor Campus | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cảnh báo đang mở | Fire · Building A | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Gia đình | 3 checked in · 1 unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kết nối | Online | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C02 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “An toàn của bạn”, Khu vực của bạn, Cảnh báo đang mở cho biết điều gì và vai trò Citizen có thể thực hiện “View active alert” trong phạm vi này không?

**Hình chính:** Tóm tắt nguy cơ tại khu vực trên báo an gia đình và kết nối

**Hành động chính:** Xem cảnh báo đang có → C02

**Mở dần chi tiết:** Giữ Khu vực của bạn, Cảnh báo đang mở ở lớp quyết định. Đưa chi tiết hỗ trợ của Gia đình, Kết nối, lịch sử nguồn, phiên bản và quy tắc FR-C01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “An toàn của bạn” cho Citizen; đổi Khu vực của bạn và làm Kết nối không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View active alert” chỉ tới C02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c02"></a>
## C02 — Chi tiết cảnh báo

**EN:** Alert detail · **JA:** 警報の詳細  
**Yêu cầu:** FR-C02 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Mục đích:** Fire reported in Building A.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** C01, C13.  
**Đầu ra:** View guidance → C03.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C02) · [EN](Prototype.html?lang=en#C02) · [JA](Prototype.html?lang=ja#C02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Mức độ | Severe | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nguồn | Campus command · Verified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cập nhật | 10:42:08 local | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hướng dẫn | Follow the approved site evacuation procedure | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C03 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C02 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Chi tiết cảnh báo”, Mức độ, Nguồn cho biết điều gì và vai trò Citizen có thể thực hiện “View guidance” trong phạm vi này không?

**Hình chính:** Biểu tượng nguy cơ, nơi ảnh hưởng và một chỉ dẫn có nguồn

**Hành động chính:** Xem chỉ dẫn → C03

**Mở dần chi tiết:** Giữ Mức độ, Nguồn ở lớp quyết định. Đưa chi tiết hỗ trợ của Cập nhật, Hướng dẫn, lịch sử nguồn, phiên bản và quy tắc FR-C02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chi tiết cảnh báo” cho Citizen; đổi Mức độ và làm Hướng dẫn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View guidance” chỉ tới C03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c03"></a>
## C03 — Hướng dẫn sơ tán

**EN:** Evacuation guidance · **JA:** 避難案内  
**Yêu cầu:** FR-C03 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** floor

**Mục đích:** Use the published evacuation plan.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** C02, C04, C18.  
**Đầu ra:** I need assistance → C05.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C03) · [EN](Prototype.html?lang=en#C03) · [JA](Prototype.html?lang=ja#C03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vị trí | Building A · Floor 05 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sơ đồ / kế hoạch | Revision 12 · Approved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Trạng thái tuyến | Not verified in real time | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tuyến hỗ trợ tiếp cận | Refuge zone B | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C05 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C03 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Hướng dẫn sơ tán”, Vị trí, Sơ đồ / kế hoạch cho biết điều gì và vai trò Citizen có thể thực hiện “I need assistance” trong phạm vi này không?

**Hình chính:** Sơ đồ tầng có vùng bất định vị trí, hành lang chặn và nơi lánh nạn

**Hành động chính:** Tôi cần trợ giúp → C05

**Mở dần chi tiết:** Giữ Vị trí, Sơ đồ / kế hoạch ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái tuyến, Tuyến hỗ trợ tiếp cận, lịch sử nguồn, phiên bản và quy tắc FR-C03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nếu duyệt tuyến, tầng hoặc độ mới nguy cơ mất hiệu lực, thu hồi đường tuyến và hiện lựa chọn trợ giúp, lánh nạn đã xác minh theo cơ sở.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hướng dẫn sơ tán” cho Citizen; đổi Vị trí và làm Tuyến hỗ trợ tiếp cận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “I need assistance” chỉ tới C05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c04"></a>
## C04 — Hướng dẫn bằng giọng nói

**EN:** Voice & accessible guidance · **JA:** 音声案内  
**Yêu cầu:** FR-C04 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Read or listen to the same instruction.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Return to plan → C03.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C04) · [EN](Prototype.html?lang=en#C04) · [JA](Prototype.html?lang=ja#C04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ngôn ngữ | English | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Âm thanh | Manual play | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Văn bản giọng đọc | Follow the approved evacuation plan | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Rung | Enabled | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C03 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C04 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Hướng dẫn bằng giọng nói”, Ngôn ngữ, Âm thanh cho biết điều gì và vai trò Citizen có thể thực hiện “Return to plan” trong phạm vi này không?

**Hình chính:** Điều khiển âm thanh lớn cạnh bản chữ dễ đọc

**Hành động chính:** Về mặt bằng → C03

**Mở dần chi tiết:** Giữ Ngôn ngữ, Âm thanh ở lớp quyết định. Đưa chi tiết hỗ trợ của Văn bản giọng đọc, Rung, lịch sử nguồn, phiên bản và quy tắc FR-C04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hướng dẫn bằng giọng nói” cho Citizen; đổi Ngôn ngữ và làm Rung không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Return to plan” chỉ tới C03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c05"></a>
## C05 — Chọn loại trợ giúp

**EN:** SOS type · **JA:** 救援の種類を選択  
**Yêu cầu:** FR-C05 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** choices

**Mục đích:** What kind of help do you need?.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** C03, C38.  
**Đầu ra:** Continue with selected need → C06.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C05) · [EN](Prototype.html?lang=en#C05) · [JA](Prototype.html?lang=ja#C05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Cháy hoặc mắc kẹt | Urgent assistance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sức khỏe hoặc té ngã | Care assistance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Va chạm giao thông | Traffic assistance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đe dọa cá nhân | Discreet help | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Trợ giúp khác | Describe your situation | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C06 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C05 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Chọn loại trợ giúp”, Cháy hoặc mắc kẹt, Sức khỏe hoặc té ngã cho biết điều gì và vai trò Citizen có thể thực hiện “Continue with selected need” trong phạm vi này không?

**Hình chính:** Biểu tượng cháy, y tế, va chạm và đe dọa kèm nhãn ngắn

**Hành động chính:** Tiếp tục với nhu cầu đã chọn → C06

**Mở dần chi tiết:** Giữ Cháy hoặc mắc kẹt, Sức khỏe hoặc té ngã ở lớp quyết định. Đưa chi tiết hỗ trợ của Va chạm giao thông, Đe dọa cá nhân, Trợ giúp khác, lịch sử nguồn, phiên bản và quy tắc FR-C05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chọn loại trợ giúp” cho Citizen; đổi Cháy hoặc mắc kẹt và làm Trợ giúp khác không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Continue with selected need” chỉ tới C06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c06"></a>
## C06 — Vị trí và nội dung SOS

**EN:** SOS location & details · **JA:** SOSの位置と詳細  
**Yêu cầu:** FR-C06 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Tell responders where to find you.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** C05, X02.  
**Đầu ra:** Review SOS → C07.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C06) · [EN](Prototype.html?lang=en#C06) · [JA](Prototype.html?lang=ja#C06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vị trí | Building A / 05 / Room 505 | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Độ chính xác | User-entered · unverified | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Số người cần giúp | 1 | Số nguyên trong giới hạn policy; unknown là giá trị riêng, không ép thành 0. |
| Ghi chú | Cannot reach the corridor | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C07 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C06 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Vị trí và nội dung SOS”, Vị trí, Độ chính xác cho biết điều gì và vai trò Citizen có thể thực hiện “Review SOS” trong phạm vi này không?

**Hình chính:** Ghim vị trí có biên sai số và chỉnh sửa thủ công

**Hành động chính:** Xem lại SOS → C07

**Mở dần chi tiết:** Giữ Vị trí, Độ chính xác ở lớp quyết định. Đưa chi tiết hỗ trợ của Số người cần giúp, Ghi chú, lịch sử nguồn, phiên bản và quy tắc FR-C06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Vị trí và nội dung SOS” cho Citizen; đổi Vị trí và làm Ghi chú không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review SOS” chỉ tới C07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c07"></a>
## C07 — Xác nhận gửi SOS

**EN:** Confirm SOS · **JA:** SOS送信の確認  
**Yêu cầu:** FR-C07 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Mục đích:** Send this request to campus command?.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** C06, C26.  
**Đầu ra:** Send SOS — demo → C08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C07) · [EN](Prototype.html?lang=en#C07) · [JA](Prototype.html?lang=ja#C07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Loại sự cố | Fire or trapped | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Vị trí | Room 505 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người nhận | Campus command | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chia sẻ | Location and note | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C08 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C07 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Xác nhận gửi SOS”, Loại sự cố, Vị trí cho biết điều gì và vai trò Citizen có thể thực hiện “Send SOS — demo” trong phạm vi này không?

**Hình chính:** Xem lại SOS với nhu cầu, vị trí và người nhận trước gửi

**Hành động chính:** Gửi SOS · mô phỏng → C08

**Mở dần chi tiết:** Giữ Loại sự cố, Vị trí ở lớp quyết định. Đưa chi tiết hỗ trợ của Người nhận, Chia sẻ, lịch sử nguồn, phiên bản và quy tắc FR-C07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Gửi có thể vẫn chờ cục bộ; hiện biên nhận máy chủ riêng và giữ liên hệ thay thế an toàn, không nhân SOS trùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xác nhận gửi SOS” cho Citizen; đổi Loại sự cố và làm Chia sẻ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Send SOS — demo” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c08"></a>
## C08 — Theo dõi yêu cầu trợ giúp

**EN:** SOS tracking · **JA:** 救援要請の状況  
**Yêu cầu:** FR-C08 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** timeline

**Mục đích:** Your request has been received.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** C07, C10, C25, C27, C28.  
**Đầu ra:** Contact assigned team → C09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C08) · [EN](Prototype.html?lang=en#C08) · [JA](Prototype.html?lang=ja#C08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| 10:42:12 | Received by server | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:42:18 | Operator acknowledged | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:43:02 | Team assigned | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hiện tại | Awaiting team contact | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C09 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C08 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Theo dõi yêu cầu trợ giúp”, 10:42:12, 10:42:18 cho biết điều gì và vai trò Citizen có thể thực hiện “Contact assigned team” trong phạm vi này không?

**Hình chính:** Các bước biên nhận tách chờ gửi, máy chủ nhận và người tiếp nhận

**Hành động chính:** Liên hệ đội được giao → C09

**Mở dần chi tiết:** Giữ 10:42:12, 10:42:18 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:43:02, Hiện tại, lịch sử nguồn, phiên bản và quy tắc FR-C08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Theo dõi yêu cầu trợ giúp” cho Citizen; đổi 10:42:12 và làm Hiện tại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Contact assigned team” chỉ tới C09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c09"></a>
## C09 — Trao đổi với đội ứng cứu

**EN:** Incident conversation · **JA:** 対応チームとの会話  
**Yêu cầu:** FR-C09 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** chat

**Mục đích:** Stay connected to the response team.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** C08, C09.  
**Đầu ra:** Send demo message → C09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C09) · [EN](Prototype.html?lang=en#C09) · [JA](Prototype.html?lang=ja#C09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Điều hành viên | We received your location | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bạn | I am in room 505 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hệ thống | Attachments are visible to assigned responders | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C09 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C09 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Trao đổi với đội ứng cứu”, Điều hành viên, Bạn cho biết điều gì và vai trò Citizen có thể thực hiện “Send demo message” trong phạm vi này không?

**Hình chính:** Hội thoại sự cố hiển thị vai trò người gửi và trạng thái từng tin

**Hành động chính:** Gửi tin · mô phỏng → C09

**Mở dần chi tiết:** Giữ Điều hành viên, Bạn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hệ thống, lịch sử nguồn, phiên bản và quy tắc FR-C09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trao đổi với đội ứng cứu” cho Citizen; đổi Điều hành viên và làm Hệ thống không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send demo message” chỉ tới C09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c10"></a>
## C10 — Cập nhật hoặc đề nghị hủy SOS

**EN:** Update or cancel SOS · **JA:** SOSの更新・取り消し申請  
**Yêu cầu:** FR-C10 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Update your situation.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Submit update → C08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C10) · [EN](Prototype.html?lang=en#C10) · [JA](Prototype.html?lang=ja#C10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Yêu cầu | SOS-041 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hành động | Request cancellation | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lý do | Help arrived | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Lưu ý | Operator will review the change | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C08 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C10 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Cập nhật hoặc đề nghị hủy SOS”, Yêu cầu, Hành động cho biết điều gì và vai trò Citizen có thể thực hiện “Submit update” trong phạm vi này không?

**Hình chính:** SOS hiện có cạnh cập nhật đề xuất và tác động hủy

**Hành động chính:** Gửi cập nhật → C08

**Mở dần chi tiết:** Giữ Yêu cầu, Hành động ở lớp quyết định. Đưa chi tiết hỗ trợ của Lý do, Lưu ý, lịch sử nguồn, phiên bản và quy tắc FR-C10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Cập nhật hoặc đề nghị hủy SOS” cho Citizen; đổi Yêu cầu và làm Lưu ý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit update” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c11"></a>
## C11 — Báo trạng thái an toàn

**EN:** Confirm personal safety · **JA:** 安全状況を報告  
**Yêu cầu:** FR-C11 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Let your circle know your status.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Confirm my safety → C12.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C11) · [EN](Prototype.html?lang=en#C11) · [JA](Prototype.html?lang=ja#C11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Trạng thái | I am safe | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vị trí | Assembly point North | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Chia sẻ với | Family + Campus group | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Mức chi tiết | Status only outside response team | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C12 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C11 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Báo trạng thái an toàn”, Trạng thái, Vị trí cho biết điều gì và vai trò Citizen có thể thực hiện “Confirm my safety” trong phạm vi này không?

**Hình chính:** Ba lựa chọn trạng thái cá nhân rõ ràng kèm độ chính xác chia sẻ

**Hành động chính:** Báo tôi đã an toàn → C12

**Mở dần chi tiết:** Giữ Trạng thái, Vị trí ở lớp quyết định. Đưa chi tiết hỗ trợ của Chia sẻ với, Mức chi tiết, lịch sử nguồn, phiên bản và quy tắc FR-C11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Xác nhận cá nhân là tự báo, theo nhóm nhận và có thời điểm; không đánh dấu cả gia đình hay sự cố an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Báo trạng thái an toàn” cho Citizen; đổi Trạng thái và làm Mức chi tiết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Confirm my safety” chỉ tới C12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c12"></a>
## C12 — Biên nhận báo an toàn

**EN:** Safety receipt · **JA:** 安全報告の受領確認  
**Yêu cầu:** FR-C12 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** success

**Mục đích:** Your safety update was saved.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** C11.  
**Đầu ra:** View delivery details → C13.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C12) · [EN](Prototype.html?lang=en#C12) · [JA](Prototype.html?lang=ja#C12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Trạng thái cá nhân | Self-reported safe | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nhóm | 2 updates queued | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Liên hệ | 3 delivery attempts | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sự cố | Still active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C13 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C12 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Biên nhận báo an toàn”, Trạng thái cá nhân, Nhóm cho biết điều gì và vai trò Citizen có thể thực hiện “View delivery details” trong phạm vi này không?

**Hình chính:** Báo cáo cá nhân và biên nhận riêng theo nhóm nhận

**Hành động chính:** Xem giao nhận → C13

**Mở dần chi tiết:** Giữ Trạng thái cá nhân, Nhóm ở lớp quyết định. Đưa chi tiết hỗ trợ của Liên hệ, Sự cố, lịch sử nguồn, phiên bản và quy tắc FR-C12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Biên nhận báo an toàn” cho Citizen; đổi Trạng thái cá nhân và làm Sự cố không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View delivery details” chỉ tới C13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c13"></a>
## C13 — Hộp thông báo

**EN:** Notification inbox · **JA:** 通知一覧  
**Yêu cầu:** FR-C13 / WF-10 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Mục đích:** Updates that need your attention.  
**Quy tắc chính:** Đã gửi không có nghĩa đã nhận, đã đọc hoặc đã có người phản hồi.  
**Đầu vào:** C12.  
**Đầu ra:** Open alert → C02.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C13) · [EN](Prototype.html?lang=en#C13) · [JA](Prototype.html?lang=ja#C13)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Fire alert | Read · 10:42 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Safety confirmation | Saved · 10:45 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Family update | Delivered · 10:45 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C13:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C02 với payload/version hợp lệ, bị chặn khi guard của WF-10 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C13 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Hộp thông báo”, Fire alert, Safety confirmation cho biết điều gì và vai trò Citizen có thể thực hiện “Open alert” trong phạm vi này không?

**Hình chính:** Hộp cảnh báo theo mức khẩn có nguồn và hết hạn

**Hành động chính:** Mở cảnh báo → C02

**Mở dần chi tiết:** Giữ Fire alert, Safety confirmation ở lớp quyết định. Đưa chi tiết hỗ trợ của Family update, lịch sử nguồn, phiên bản và quy tắc FR-C13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hộp thông báo” cho Citizen; đổi Fire alert và làm Family update không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open alert” chỉ tới C02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c14"></a>
## C14 — Nguy cơ gần bạn

**EN:** Nearby hazards · **JA:** 周辺の危険情報  
**Yêu cầu:** FR-C14 / WF-08 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** map

**Mục đích:** Know what is happening nearby.  
**Quy tắc chính:** Giữ nguồn phát, thời hạn và lịch sử cập nhật hoặc hủy cảnh báo.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** View hazard → C15.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C14) · [EN](Prototype.html?lang=en#C14) · [JA](Prototype.html?lang=ja#C14)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Flood watch | 2 km · official feed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Road closure | 500 m · verified operator | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cháy | Campus A · active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C14:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C15 với payload/version hợp lệ, bị chặn khi guard của WF-08 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C14 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Nguy cơ gần bạn”, Flood watch, Road closure cho biết điều gì và vai trò Citizen có thể thực hiện “View hazard” trong phạm vi này không?

**Hình chính:** Bản đồ nguy cơ gần kèm danh sách và bất định khoảng cách

**Hành động chính:** Xem nguy cơ → C15

**Mở dần chi tiết:** Giữ Flood watch, Road closure ở lớp quyết định. Đưa chi tiết hỗ trợ của Cháy, lịch sử nguồn, phiên bản và quy tắc FR-C14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Nguy cơ gần bạn” cho Citizen; đổi Flood watch và làm Cháy không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “View hazard” chỉ tới C15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c15"></a>
## C15 — Thông tin thiên tai

**EN:** Disaster advisory · **JA:** 災害情報  
**Yêu cầu:** FR-C15 / WF-08 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Mục đích:** Flood watch for Riverside district.  
**Quy tắc chính:** Giữ nguồn phát, thời hạn và lịch sử cập nhật hoặc hủy cảnh báo.  
**Đầu vào:** C14.  
**Đầu ra:** View shelter information → C16.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C15) · [EN](Prototype.html?lang=en#C15) · [JA](Prototype.html?lang=ja#C15)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nguồn | Approved authority feed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mức chắc chắn | Likely | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hiệu lực đến | 18:00 local | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khu vực | Riverside polygon | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C15:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C16 với payload/version hợp lệ, bị chặn khi guard của WF-08 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C15 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Thông tin thiên tai”, Nguồn, Mức chắc chắn cho biết điều gì và vai trò Citizen có thể thực hiện “View shelter information” trong phạm vi này không?

**Hình chính:** Ranh giới khuyến cáo và thời hạn cạnh độ chắc chắn nguồn

**Hành động chính:** Xem nơi trú → C16

**Mở dần chi tiết:** Giữ Nguồn, Mức chắc chắn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hiệu lực đến, Khu vực, lịch sử nguồn, phiên bản và quy tắc FR-C15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thông tin thiên tai” cho Citizen; đổi Nguồn và làm Khu vực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View shelter information” chỉ tới C16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c16"></a>
## C16 — Nơi trú ẩn và điểm tập kết

**EN:** Shelters & assembly points · **JA:** 避難所と集合場所  
**Yêu cầu:** FR-C16 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** map

**Mục đích:** Find a designated assistance point.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** C15.  
**Đầu ra:** Open shelter details → C17.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C16) · [EN](Prototype.html?lang=en#C16) · [JA](Prototype.html?lang=ja#C16)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| North shelter | Open · updated 5 min ago | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| West center | Capacity unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Campus North | Assembly point | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C16:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C17 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C16 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Nơi trú ẩn và điểm tập kết”, North shelter, West center cho biết điều gì và vai trò Citizen có thể thực hiện “Open shelter details” trong phạm vi này không?

**Hình chính:** Thẻ nơi trú so sánh trợ năng, chỗ hiện có và khoảng cách

**Hành động chính:** Mở chi tiết nơi trú → C17

**Mở dần chi tiết:** Giữ North shelter, West center ở lớp quyết định. Đưa chi tiết hỗ trợ của Campus North, lịch sử nguồn, phiên bản và quy tắc FR-C16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Nơi trú ẩn và điểm tập kết” cho Citizen; đổi North shelter và làm Campus North không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open shelter details” chỉ tới C17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c17"></a>
## C17 — Chi tiết nơi trú ẩn

**EN:** Shelter details · **JA:** 避難所の詳細  
**Yêu cầu:** FR-C17 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** detail

**Mục đích:** North shelter.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** C16.  
**Đầu ra:** Save shelter offline → C18.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C17) · [EN](Prototype.html?lang=en#C17) · [JA](Prototype.html?lang=ja#C17)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Trạng thái | Open · confirmed by operator | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khả năng tiếp cận | Step-free entrance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sức chứa | 80 available · estimate | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Địa chỉ | 12 Harbor Road | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C17:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C18 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C17 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Chi tiết nơi trú ẩn”, Trạng thái, Khả năng tiếp cận cho biết điều gì và vai trò Citizen có thể thực hiện “Save shelter offline” trong phạm vi này không?

**Hình chính:** Sơ đồ lối vào nơi trú và trạng thái tiếp cận, sức chứa

**Hành động chính:** Lưu nơi trú ngoại tuyến → C18

**Mở dần chi tiết:** Giữ Trạng thái, Khả năng tiếp cận ở lớp quyết định. Đưa chi tiết hỗ trợ của Sức chứa, Địa chỉ, lịch sử nguồn, phiên bản và quy tắc FR-C17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chi tiết nơi trú ẩn” cho Citizen; đổi Trạng thái và làm Địa chỉ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save shelter offline” chỉ tới C18 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c18"></a>
## C18 — Thông tin an toàn ngoại tuyến

**EN:** Offline safety pack · **JA:** オフライン安全情報  
**Yêu cầu:** FR-C18 / WF-13 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Mục đích:** Essential information on your device.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** C17, X05.  
**Đầu ra:** Review cached plan → C03.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C18) · [EN](Prototype.html?lang=en#C18) · [JA](Prototype.html?lang=ja#C18)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Campus plan | Revision 12 · downloaded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Liên hệ | 3 saved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Guidance | English · version 4 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đồng bộ gần nhất | Today 09:00 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C18:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C03 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C18 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Thông tin an toàn ngoại tuyến”, Campus plan, Liên hệ cho biết điều gì và vai trò Citizen có thể thực hiện “Review cached plan” trong phạm vi này không?

**Hình chính:** Nội dung gói ngoại tuyến có phiên bản và tuổi đồng bộ

**Hành động chính:** Xem mặt bằng đã lưu → C03

**Mở dần chi tiết:** Giữ Campus plan, Liên hệ ở lớp quyết định. Đưa chi tiết hỗ trợ của Guidance, Đồng bộ gần nhất, lịch sử nguồn, phiên bản và quy tắc FR-C18 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thông tin an toàn ngoại tuyến” cho Citizen; đổi Campus plan và làm Đồng bộ gần nhất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review cached plan” chỉ tới C03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c19"></a>
## C19 — Các nhóm của tôi

**EN:** My circles · **JA:** マイグループ  
**Yêu cầu:** FR-C19 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** cards

**Mục đích:** The people who should hear from you.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** C21, C33.  
**Đầu ra:** Open family → C20.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C19) · [EN](Prototype.html?lang=en#C19) · [JA](Prototype.html?lang=ja#C19)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Gia đình | 4 members | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Campus | 24 members | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Travel team | 6 members | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C19:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C20 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C19 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Các nhóm của tôi”, Gia đình, Campus cho biết điều gì và vai trò Citizen có thể thực hiện “Open family” trong phạm vi này không?

**Hình chính:** Tóm tắt thành viên nhóm và số chưa báo an

**Hành động chính:** Mở gia đình → C20

**Mở dần chi tiết:** Giữ Gia đình, Campus ở lớp quyết định. Đưa chi tiết hỗ trợ của Travel team, lịch sử nguồn, phiên bản và quy tắc FR-C19 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Các nhóm của tôi” cho Citizen; đổi Gia đình và làm Travel team không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open family” chỉ tới C20 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c20"></a>
## C20 — Trò chuyện trong nhóm

**EN:** Circle conversation · **JA:** グループチャット  
**Yêu cầu:** FR-C20 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** chat

**Mục đích:** Family.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** C19, C22.  
**Đầu ra:** View member status → C22.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C20) · [EN](Prototype.html?lang=en#C20) · [JA](Prototype.html?lang=ja#C20)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hệ thống | Alex reported safe at 10:45 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Jamie | Thank you for letting us know | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | My status is unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C20:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C22 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C20 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Trò chuyện trong nhóm”, Hệ thống, Jamie cho biết điều gì và vai trò Citizen có thể thực hiện “View member status” trong phạm vi này không?

**Hình chính:** Hội thoại nhóm kèm bối cảnh báo an thành viên

**Hành động chính:** Xem trạng thái thành viên → C22

**Mở dần chi tiết:** Giữ Hệ thống, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, lịch sử nguồn, phiên bản và quy tắc FR-C20 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trò chuyện trong nhóm” cho Citizen; đổi Hệ thống và làm Morgan không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “View member status” chỉ tới C22 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c21"></a>
## C21 — Tạo hoặc sửa nhóm

**EN:** Create or edit circle · **JA:** グループの作成・編集  
**Yêu cầu:** FR-C21 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Choose members and sharing rules.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save circle → C19.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C21) · [EN](Prototype.html?lang=en#C21) · [JA](Prototype.html?lang=ja#C21)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tên | Family | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thành viên | Invite only | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Cập nhật an toàn | Enabled | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chia sẻ vị trí | Off by default | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C21:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C19 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C21 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Tạo hoặc sửa nhóm”, Tên, Thành viên cho biết điều gì và vai trò Citizen có thể thực hiện “Save circle” trong phạm vi này không?

**Hình chính:** Xem trước thành viên và phạm vi chia sẻ nhóm

**Hành động chính:** Lưu nhóm → C19

**Mở dần chi tiết:** Giữ Tên, Thành viên ở lớp quyết định. Đưa chi tiết hỗ trợ của Cập nhật an toàn, Chia sẻ vị trí, lịch sử nguồn, phiên bản và quy tắc FR-C21 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tạo hoặc sửa nhóm” cho Citizen; đổi Tên và làm Chia sẻ vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save circle” chỉ tới C19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c22"></a>
## C22 — Trạng thái thành viên

**EN:** Circle member status · **JA:** メンバーの状況  
**Yêu cầu:** FR-C22 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Mục đích:** A status is a report, not a guarantee.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** C20.  
**Đầu ra:** Send check-in request → C20.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C22) · [EN](Prototype.html?lang=en#C22) · [JA](Prototype.html?lang=ja#C22)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Alex | Self-reported safe · 10:45 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Jamie | Self-reported safe · 10:40 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | Unknown · no recent report | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C22:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C20 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C22 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Trạng thái thành viên”, Alex, Jamie cho biết điều gì và vai trò Citizen có thể thực hiện “Send check-in request” trong phạm vi này không?

**Hình chính:** Bảng thành viên tách tự báo an và chưa rõ

**Hành động chính:** Gửi yêu cầu báo an → C20

**Mở dần chi tiết:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, lịch sử nguồn, phiên bản và quy tắc FR-C22 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trạng thái thành viên” cho Citizen; đổi Alex và làm Morgan không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send check-in request” chỉ tới C20 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c23"></a>
## C23 — Liên hệ khẩn cấp

**EN:** Emergency contacts · **JA:** 緊急連絡先  
**Yêu cầu:** FR-C23 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Who should receive your updates?.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save contacts → C01.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C23) · [EN](Prototype.html?lang=en#C23) · [JA](Prototype.html?lang=ja#C23)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chính | Jamie · verified | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Dự phòng | Morgan · pending | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Kênh | Push then SMS | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phạm vi chia sẻ | Status only | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C23:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C01 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C23 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Liên hệ khẩn cấp”, Chính, Dự phòng cho biết điều gì và vai trò Citizen có thể thực hiện “Save contacts” trong phạm vi này không?

**Hình chính:** Thứ tự liên hệ với biểu tượng kênh và xem trước chia sẻ

**Hành động chính:** Lưu liên hệ → C01

**Mở dần chi tiết:** Giữ Chính, Dự phòng ở lớp quyết định. Đưa chi tiết hỗ trợ của Kênh, Phạm vi chia sẻ, lịch sử nguồn, phiên bản và quy tắc FR-C23 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Liên hệ khẩn cấp” cho Citizen; đổi Chính và làm Phạm vi chia sẻ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save contacts” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c24"></a>
## C24 — Chăm sóc và phát hiện té ngã

**EN:** Care & fall detection · **JA:** 見守りと転倒検知  
**Yêu cầu:** FR-C24 / WF-06 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Configure a supported fall detector.  
**Quy tắc chính:** Không phản hồi cần chuyển cấp; không tự kết luận tình trạng y tế.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review test alert → C25.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C24) · [EN](Prototype.html?lang=en#C24) · [JA](Prototype.html?lang=ja#C24)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Thiết bị đeo | WR-401 · paired | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phát hiện | Enabled | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thời gian phản hồi | 30 seconds | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |
| Chuyển cấp | Care team then campus command | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C24:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C25 với payload/version hợp lệ, bị chặn khi guard của WF-06 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C24 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Chăm sóc và phát hiện té ngã”, Thiết bị đeo, Phát hiện cho biết điều gì và vai trò Citizen có thể thực hiện “Review test alert” trong phạm vi này không?

**Hình chính:** Kết nối thiết bị đeo và chuỗi tăng cấp kiểm tra té ngã

**Hành động chính:** Xem cảnh báo thử → C25

**Mở dần chi tiết:** Giữ Thiết bị đeo, Phát hiện ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời gian phản hồi, Chuyển cấp, lịch sử nguồn, phiên bản và quy tắc FR-C24 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chăm sóc và phát hiện té ngã” cho Citizen; đổi Thiết bị đeo và làm Chuyển cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review test alert” chỉ tới C25 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c25"></a>
## C25 — Kiểm tra sau nghi ngờ té ngã

**EN:** Possible fall check-in · **JA:** 転倒の可能性を確認  
**Yêu cầu:** FR-C25 / WF-06 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** countdown

**Mục đích:** A possible fall was detected.  
**Quy tắc chính:** Không phản hồi cần chuyển cấp; không tự kết luận tình trạng y tế.  
**Đầu vào:** C24.  
**Đầu ra:** I need help now → C08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C25) · [EN](Prototype.html?lang=en#C25) · [JA](Prototype.html?lang=ja#C25)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Bằng chứng | Wearable signal · unverified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thời gian phản hồi | 30 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Không phản hồi | Notify care team | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phương án khác | Get help now | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C25:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C08 với payload/version hợp lệ, bị chặn khi guard của WF-06 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C25 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Kiểm tra sau nghi ngờ té ngã”, Bằng chứng, Thời gian phản hồi cho biết điều gì và vai trò Citizen có thể thực hiện “I need help now” trong phạm vi này không?

**Hình chính:** Kiểm tra té ngã có nút cần giúp, bỏ qua lớn và thời gian còn

**Hành động chính:** Tôi cần giúp ngay → C08

**Mở dần chi tiết:** Giữ Bằng chứng, Thời gian phản hồi ở lớp quyết định. Đưa chi tiết hỗ trợ của Không phản hồi, Phương án khác, lịch sử nguồn, phiên bản và quy tắc FR-C25 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không đáp vẫn là chưa xác nhận; dừng bộ đếm không phải biên nhận giúp đỡ, và trợ năng không phụ thuộc giữ nút.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm tra sau nghi ngờ té ngã” cho Citizen; đổi Bằng chứng và làm Phương án khác không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “I need help now” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c26"></a>
## C26 — Báo sự cố giao thông

**EN:** Road incident report · **JA:** 交通事故の報告  
**Yêu cầu:** FR-C26 / WF-07 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Report a road incident safely.  
**Quy tắc chính:** Vị trí và hướng đường cần được xác minh; thương tích có thể chưa rõ.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review SOS → C07.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C26) · [EN](Prototype.html?lang=en#C26) · [JA](Prototype.html?lang=ja#C26)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vị trí | User-confirmed map pin | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Hướng | Northbound | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phương tiện | 2 | Số nguyên trong giới hạn policy; unknown là giá trị riêng, không ép thành 0. |
| Thương tích | Unknown | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tệp đính kèm | Optional photo | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C26:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C07 với payload/version hợp lệ, bị chặn khi guard của WF-07 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C26 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Báo sự cố giao thông”, Vị trí, Hướng cho biết điều gì và vai trò Citizen có thể thực hiện “Review SOS” trong phạm vi này không?

**Hình chính:** Phác họa hướng đường với nhập hướng và thương tích thủ công

**Hành động chính:** Xem lại SOS → C07

**Mở dần chi tiết:** Giữ Vị trí, Hướng ở lớp quyết định. Đưa chi tiết hỗ trợ của Phương tiện, Thương tích, Tệp đính kèm, lịch sử nguồn, phiên bản và quy tắc FR-C26 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Báo sự cố giao thông” cho Citizen; đổi Vị trí và làm Tệp đính kèm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review SOS” chỉ tới C07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c27"></a>
## C27 — Yêu cầu trợ giúp kín đáo

**EN:** Discreet assistance · **JA:** 目立たない救援要請  
**Yêu cầu:** FR-C27 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Mục đích:** Request help with a quiet interface.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Send discreet request — demo → C08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C27) · [EN](Prototype.html?lang=en#C27) · [JA](Prototype.html?lang=ja#C27)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Âm thanh | Off | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Rung | Off | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chia sẻ | Assigned operator only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Vị trí | Approximate · 40 m | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C27:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C08 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C27 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Yêu cầu trợ giúp kín đáo”, Âm thanh, Rung cho biết điều gì và vai trò Citizen có thể thực hiện “Send discreet request — demo” trong phạm vi này không?

**Hình chính:** Điều khiển trợ giúp kín đáo rõ trạng thái âm thanh và rung

**Hành động chính:** Gửi yêu cầu kín đáo · mô phỏng → C08

**Mở dần chi tiết:** Giữ Âm thanh, Rung ở lớp quyết định. Đưa chi tiết hỗ trợ của Chia sẻ, Vị trí, lịch sử nguồn, phiên bản và quy tắc FR-C27 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không tự phát lời hoặc rung trái lựa chọn kín đáo; phân biệt chờ và đã nhận mà không hiệu ứng gây chú ý.

**Tình huống nghiệm thu V2:** Dùng tình huống “Yêu cầu trợ giúp kín đáo” cho Citizen; đổi Âm thanh và làm Vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Send discreet request — demo” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c28"></a>
## C28 — Lịch sử yêu cầu

**EN:** My reports & history · **JA:** 要請履歴  
**Yêu cầu:** FR-C28 / WF-05 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Mục đích:** Your previous requests.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** View request → C08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C28) · [EN](Prototype.html?lang=en#C28) · [JA](Prototype.html?lang=ja#C28)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| SOS-041 | Active · fire assistance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS-028 | Closed · road incident | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Check-in | Safe · yesterday | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C28:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C08 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C28 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Lịch sử yêu cầu”, SOS-041, SOS-028 cho biết điều gì và vai trò Citizen có thể thực hiện “View request” trong phạm vi này không?

**Hình chính:** Lịch sử yêu cầu tách đang mở, đã xử lý và chờ biên nhận

**Hành động chính:** Xem yêu cầu → C08

**Mở dần chi tiết:** Giữ SOS-041, SOS-028 ở lớp quyết định. Đưa chi tiết hỗ trợ của Check-in, lịch sử nguồn, phiên bản và quy tắc FR-C28 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lịch sử yêu cầu” cho Citizen; đổi SOS-041 và làm Check-in không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “View request” chỉ tới C08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c29"></a>
## C29 — Quyền riêng tư và dữ liệu

**EN:** Privacy & data requests · **JA:** プライバシーとデータ  
**Yêu cầu:** FR-C29 / WF-19 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Control optional sharing.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** C30.  
**Đầu ra:** Review data request → C30.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C29) · [EN](Prototype.html?lang=en#C29) · [JA](Prototype.html?lang=ja#C29)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vị trí trực tiếp | Off | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hiển thị trong nhóm | Status only | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Xuất dữ liệu | Request a copy | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Xóa dữ liệu | Subject to incident retention review | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C29:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C30 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C29 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Quyền riêng tư và dữ liệu”, Vị trí trực tiếp, Hiển thị trong nhóm cho biết điều gì và vai trò Citizen có thể thực hiện “Review data request” trong phạm vi này không?

**Hình chính:** Xem trước phạm vi riêng tư với vị trí trực tiếp và xuất, xóa

**Hành động chính:** Xem yêu cầu dữ liệu → C30

**Mở dần chi tiết:** Giữ Vị trí trực tiếp, Hiển thị trong nhóm ở lớp quyết định. Đưa chi tiết hỗ trợ của Xuất dữ liệu, Xóa dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-C29 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Quyền riêng tư và dữ liệu” cho Citizen; đổi Vị trí trực tiếp và làm Xóa dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review data request” chỉ tới C30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c30"></a>
## C30 — Biên nhận yêu cầu dữ liệu

**EN:** Data request receipt · **JA:** データ申請の受領確認  
**Yêu cầu:** FR-C30 / WF-19 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** detail

**Mục đích:** Request DR-202 received.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** C29, T10.  
**Đầu ra:** Back to privacy → C29.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C30) · [EN](Prototype.html?lang=en#C30) · [JA](Prototype.html?lang=ja#C30)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Loại | Export personal data | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi | Profile and eligible records | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Trạng thái | Verification pending | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chuyển tin | Secure download link after review | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C30:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C29 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C30 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Biên nhận yêu cầu dữ liệu”, Loại, Phạm vi cho biết điều gì và vai trò Citizen có thể thực hiện “Back to privacy” trong phạm vi này không?

**Hình chính:** Tiến trình yêu cầu dữ liệu và đích nhận đã xác minh

**Hành động chính:** Về quyền riêng tư → C29

**Mở dần chi tiết:** Giữ Loại, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái, Chuyển tin, lịch sử nguồn, phiên bản và quy tắc FR-C30 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Biên nhận yêu cầu dữ liệu” cho Citizen; đổi Loại và làm Chuyển tin không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Back to privacy” chỉ tới C29 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r01"></a>
## R01 — Ca trực và trạng thái sẵn sàng

**EN:** Shift & readiness · **JA:** 勤務と対応準備  
**Yêu cầu:** FR-R01 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** home

**Mục đích:** Ready for your next assignment.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R08.  
**Đầu ra:** View assignments → R02.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R01) · [EN](Prototype.html?lang=en#R01) · [JA](Prototype.html?lang=ja#R01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Đơn vị | Rescue 02 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ca trực | 10:00–18:00 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Năng lực | Fire · assisted evacuation | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sẵn sàng | Available | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R02 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R01 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Ca trực và trạng thái sẵn sàng”, Đơn vị, Ca trực cho biết điều gì và vai trò Responder có thể thực hiện “View assignments” trong phạm vi này không?

**Hình chính:** Danh mục sẵn sàng của đội với năng lực và ca trực

**Hành động chính:** Xem nhiệm vụ → R02

**Mở dần chi tiết:** Giữ Đơn vị, Ca trực ở lớp quyết định. Đưa chi tiết hỗ trợ của Năng lực, Sẵn sàng, lịch sử nguồn, phiên bản và quy tắc FR-R01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ca trực và trạng thái sẵn sàng” cho Responder; đổi Đơn vị và làm Sẵn sàng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View assignments” chỉ tới R02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r02"></a>
## R02 — Nhiệm vụ được giao

**EN:** Assignment inbox · **JA:** 担当任務  
**Yêu cầu:** FR-R02 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** list

**Mục đích:** Assignments for Rescue 02.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R01, R12.  
**Đầu ra:** Open assignment → R03.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R02) · [EN](Prototype.html?lang=en#R02) · [JA](Prototype.html?lang=ja#R02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| INC-2041 | Fire · Building A · P1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| INC-2037 | Welfare check · P2 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi bao phủ | Campus east | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R03 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R02 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Nhiệm vụ được giao”, INC-2041, INC-2037 cho biết điều gì và vai trò Responder có thể thực hiện “Open assignment” trong phạm vi này không?

**Hình chính:** Hàng đợi nhiệm vụ theo khẩn cấp và hạn tiếp nhận

**Hành động chính:** Mở nhiệm vụ → R03

**Mở dần chi tiết:** Giữ INC-2041, INC-2037 ở lớp quyết định. Đưa chi tiết hỗ trợ của Phạm vi bao phủ, lịch sử nguồn, phiên bản và quy tắc FR-R02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Nhiệm vụ được giao” cho Responder; đổi INC-2041 và làm Phạm vi bao phủ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open assignment” chỉ tới R03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r03"></a>
## R03 — Tiếp nhận nhiệm vụ

**EN:** Accept or decline task · **JA:** 任務の受諾  
**Yêu cầu:** FR-R03 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** detail

**Mục đích:** Assist person at Room 505.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R02.  
**Đầu ra:** Accept assignment → R04.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R03) · [EN](Prototype.html?lang=en#R03) · [JA](Prototype.html?lang=ja#R03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sự cố | INC-2041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người | Alex · SOS-041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Vị trí | User-reported · 05 / 505 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nguy cơ | Smoke report · not confirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R04 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R03 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Tiếp nhận nhiệm vụ”, Sự cố, Người cho biết điều gì và vai trò Responder có thể thực hiện “Accept assignment” trong phạm vi này không?

**Hình chính:** Danh tính nhiệm vụ, vị trí người và nguy cơ trên nhận, từ chối

**Hành động chính:** Nhận nhiệm vụ → R04

**Mở dần chi tiết:** Giữ Sự cố, Người ở lớp quyết định. Đưa chi tiết hỗ trợ của Vị trí, Nguy cơ, lịch sử nguồn, phiên bản và quy tắc FR-R03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tiếp nhận nhiệm vụ” cho Responder; đổi Sự cố và làm Nguy cơ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Accept assignment” chỉ tới R04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r04"></a>
## R04 — Đường tiếp cận và đến nơi

**EN:** Navigation & arrival · **JA:** 進入経路と現場到着  
**Yêu cầu:** FR-R04 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** map

**Mục đích:** Building A · East access.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R03.  
**Đầu ra:** Report arrival → R05.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R04) · [EN](Prototype.html?lang=en#R04) · [JA](Prototype.html?lang=ja#R04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phân công | Accepted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điểm đến | Entrance E2 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ mới vị trí | 8 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tuyến đường | Operator-approved access plan | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R05 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R04 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Đường tiếp cận và đến nơi”, Phân công, Điểm đến cho biết điều gì và vai trò Responder có thể thực hiện “Report arrival” trong phạm vi này không?

**Hình chính:** Bản đồ tiếp cận đích có hiệu lực tuyến và thao tác báo đến

**Hành động chính:** Báo đã đến → R05

**Mở dần chi tiết:** Giữ Phân công, Điểm đến ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ mới vị trí, Tuyến đường, lịch sử nguồn, phiên bản và quy tắc FR-R04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đường tiếp cận và đến nơi” cho Responder; đổi Phân công và làm Tuyến đường không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Report arrival” chỉ tới R05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r05"></a>
## R05 — Tình hình hiện trường

**EN:** Field situation · **JA:** 現場の状況  
**Yêu cầu:** FR-R05 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** floor

**Mục đích:** Floor 05 response context.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R04.  
**Đầu ra:** Open assistance record → R06.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R05) · [EN](Prototype.html?lang=en#R05) · [JA](Prototype.html?lang=ja#R05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| SOS đang mở | 1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khu vực bị chặn | East corridor · reported | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sơ đồ / kế hoạch | Revision 12 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đội | Rescue 02 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R06 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R05 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Tình hình hiện trường”, SOS đang mở, Khu vực bị chặn cho biết điều gì và vai trò Responder có thể thực hiện “Open assistance record” trong phạm vi này không?

**Hình chính:** Sơ đồ hiện trường có vùng chặn, SOS mở và vị trí đồng đội

**Hành động chính:** Mở hồ sơ trợ giúp → R06

**Mở dần chi tiết:** Giữ SOS đang mở, Khu vực bị chặn ở lớp quyết định. Đưa chi tiết hỗ trợ của Sơ đồ / kế hoạch, Đội, lịch sử nguồn, phiên bản và quy tắc FR-R05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tình hình hiện trường” cho Responder; đổi SOS đang mở và làm Đội không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open assistance record” chỉ tới R06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r06"></a>
## R06 — Hồ sơ hỗ trợ tại hiện trường

**EN:** Assistance & triage record · **JA:** 現場支援の記録  
**Yêu cầu:** FR-R06 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** form

**Mục đích:** Record observations, not diagnosis.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R05, H12.  
**Đầu ra:** Save observation → R07.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R06) · [EN](Prototype.html?lang=en#R06) · [JA](Prototype.html?lang=ja#R06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Người | Alex Morgan | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Liên hệ | Established | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tình trạng | Needs mobility assistance | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hành động | Assisting to assembly point | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R07 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R06 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Hồ sơ hỗ trợ tại hiện trường”, Người, Liên hệ cho biết điều gì và vai trò Responder có thể thực hiện “Save observation” trong phạm vi này không?

**Hình chính:** Phiếu quan sát theo người với tình trạng và hỗ trợ

**Hành động chính:** Lưu quan sát → R07

**Mở dần chi tiết:** Giữ Người, Liên hệ ở lớp quyết định. Đưa chi tiết hỗ trợ của Tình trạng, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-R06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ hỗ trợ tại hiện trường” cho Responder; đổi Người và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save observation” chỉ tới R07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r07"></a>
## R07 — Trạng thái và bàn giao nhiệm vụ

**EN:** Task status & handover · **JA:** 任務状況と引き継ぎ  
**Yêu cầu:** FR-R07 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** form

**Mục đích:** Hand over with a clear record.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R06.  
**Đầu ra:** Submit handover → R08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R07) · [EN](Prototype.html?lang=en#R07) · [JA](Prototype.html?lang=ja#R07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nhiệm vụ | Rescue-112 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Trạng thái | Assistance completed | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Bên nhận | Assembly team North | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Bằng chứng | 10:48 · responder report | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R08 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R07 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Trạng thái và bàn giao nhiệm vụ”, Nhiệm vụ, Trạng thái cho biết điều gì và vai trò Responder có thể thực hiện “Submit handover” trong phạm vi này không?

**Hình chính:** Dòng bàn giao nhiệm vụ tách người nhận chấp thuận

**Hành động chính:** Gửi bàn giao → R08

**Mở dần chi tiết:** Giữ Nhiệm vụ, Trạng thái ở lớp quyết định. Đưa chi tiết hỗ trợ của Bên nhận, Bằng chứng, lịch sử nguồn, phiên bản và quy tắc FR-R07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trạng thái và bàn giao nhiệm vụ” cho Responder; đổi Nhiệm vụ và làm Bằng chứng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit handover” chỉ tới R08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r08"></a>
## R08 — Hoàn tất nhiệm vụ

**EN:** Task completion · **JA:** 任務の完了  
**Yêu cầu:** FR-R08 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** success

**Mục đích:** Assignment completed.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R07.  
**Đầu ra:** Back to shift → R01.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R08) · [EN](Prototype.html?lang=en#R08) · [JA](Prototype.html?lang=ja#R08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Người | Responder-confirmed assisted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bàn giao | Assembly team North | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sự cố | Still active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tiếp theo | Return to availability | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R01 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R08 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Hoàn tất nhiệm vụ”, Người, Bàn giao cho biết điều gì và vai trò Responder có thể thực hiện “Back to shift” trong phạm vi này không?

**Hình chính:** Bằng chứng hoàn thành và xác nhận đội tiếp nhận

**Hành động chính:** Về ca trực → R01

**Mở dần chi tiết:** Giữ Người, Bàn giao ở lớp quyết định. Đưa chi tiết hỗ trợ của Sự cố, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-R08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hoàn tất nhiệm vụ” cho Responder; đổi Người và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Back to shift” chỉ tới R01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r09"></a>
## R09 — Trao đổi trong đội

**EN:** Team communications · **JA:** チーム連絡  
**Yêu cầu:** FR-R09 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** chat

**Mục đích:** Incident channel · INC-2041.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R09.  
**Đầu ra:** Send demo message → R09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R09) · [EN](Prototype.html?lang=en#R09) · [JA](Prototype.html?lang=ja#R09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Điều hành | Use entrance E2 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Rescue 02 | At floor 05 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hệ thống | Only assigned teams can view this channel | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R09 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R09 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Trao đổi trong đội”, Điều hành, Rescue 02 cho biết điều gì và vai trò Responder có thể thực hiện “Send demo message” trong phạm vi này không?

**Hình chính:** Kênh đội có danh tính chỉ huy và dấu tin chờ gửi

**Hành động chính:** Gửi tin · mô phỏng → R09

**Mở dần chi tiết:** Giữ Điều hành, Rescue 02 ở lớp quyết định. Đưa chi tiết hỗ trợ của Hệ thống, lịch sử nguồn, phiên bản và quy tắc FR-R09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trao đổi trong đội” cho Responder; đổi Điều hành và làm Hệ thống không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Send demo message” chỉ tới R09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r10"></a>
## R10 — Ghi nhận bằng chứng

**EN:** Evidence capture · **JA:** 証拠の記録  
**Yêu cầu:** FR-R10 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** form

**Mục đích:** Attach a field observation.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** X10.  
**Đầu ra:** Queue attachment → R11.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R10) · [EN](Prototype.html?lang=en#R10) · [JA](Prototype.html?lang=ja#R10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Loại | Photo | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Sự cố | INC-2041 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chú thích | Corridor condition at arrival | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Quyền riêng tư | Restricted incident evidence | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R11 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R10 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Ghi nhận bằng chứng”, Loại, Sự cố cho biết điều gì và vai trò Responder có thể thực hiện “Queue attachment” trong phạm vi này không?

**Hình chính:** Xem trước bằng chứng gắn sự cố và che thông tin riêng

**Hành động chính:** Đưa tệp vào hàng chờ → R11

**Mở dần chi tiết:** Giữ Loại, Sự cố ở lớp quyết định. Đưa chi tiết hỗ trợ của Chú thích, Quyền riêng tư, lịch sử nguồn, phiên bản và quy tắc FR-R10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ghi nhận bằng chứng” cho Responder; đổi Loại và làm Quyền riêng tư không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Queue attachment” chỉ tới R11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r11"></a>
## R11 — Dữ liệu chờ đồng bộ

**EN:** Offline outbox · **JA:** 同期待ちデータ  
**Yêu cầu:** FR-R11 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** list

**Mục đích:** Updates waiting to sync.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R10, X01.  
**Đầu ra:** Resolve sync conflict → R12.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R11) · [EN](Prototype.html?lang=en#R11) · [JA](Prototype.html?lang=ja#R11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Observation | Queued · 10:47 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Photo | Queued · 2 MB | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Status update | Conflict requires review | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R12 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R11 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Dữ liệu chờ đồng bộ”, Observation, Photo cho biết điều gì và vai trò Responder có thể thực hiện “Resolve sync conflict” trong phạm vi này không?

**Hình chính:** Hộp chờ gửi nhóm theo chờ, thử lại và xung đột

**Hành động chính:** Giải quyết xung đột đồng bộ → R12

**Mở dần chi tiết:** Giữ Observation, Photo ở lớp quyết định. Đưa chi tiết hỗ trợ của Status update, lịch sử nguồn, phiên bản và quy tắc FR-R11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Dữ liệu chờ đồng bộ” cho Responder; đổi Observation và làm Status update không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Resolve sync conflict” chỉ tới R12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="r12"></a>
## R12 — Xử lý xung đột đồng bộ

**EN:** Resolve field conflict · **JA:** 同期競合の解決  
**Yêu cầu:** FR-R12 / WF-11 · **Actor:** Responder · **Surface:** Responder · **Layout:** detail

**Mục đích:** A newer assignment state exists.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** R11.  
**Đầu ra:** Keep note and refresh → R02.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#R12) · [EN](Prototype.html?lang=en#R12) · [JA](Prototype.html?lang=ja#R12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Cục bộ | Task in progress · 10:47 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Máy chủ | Task reassigned · 10:48 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ghi chú của bạn | Preserved as observation | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hành động | Refresh task ownership | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-R12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R02 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### R12 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Xử lý xung đột đồng bộ”, Cục bộ, Máy chủ cho biết điều gì và vai trò Responder có thể thực hiện “Keep note and refresh” trong phạm vi này không?

**Hình chính:** Quan sát cục bộ cạnh thay đổi máy chủ và giữ ghi chú

**Hành động chính:** Giữ ghi chú và tải lại → R02

**Mở dần chi tiết:** Giữ Cục bộ, Máy chủ ở lớp quyết định. Đưa chi tiết hỗ trợ của Ghi chú của bạn, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-R12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ quan sát cục bộ gắn đúng sự cố; không báo nhận việc hay bàn giao xong khi chưa có biên nhận của người nhận.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xử lý xung đột đồng bộ” cho Responder; đổi Cục bộ và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Keep note and refresh” chỉ tới R02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o01"></a>
## O01 — Tổng quan điều hành

**EN:** Command overview · **JA:** 指令ダッシュボード  
**Yêu cầu:** FR-O01 / WF-20 · **Actor:** Operator · **Surface:** Command · **Layout:** dashboard

**Mục đích:** Every signal. One coordinated response..  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** A04, O25, X09.  
**Đầu ra:** Open priority incident → O04.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O01) · [EN](Prototype.html?lang=en#O01) · [JA](Prototype.html?lang=ja#O01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sự cố đang mở | 12 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| P1 chưa tiếp nhận | 2 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS đang mở | 7 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đội sẵn sàng | 18 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O04 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O01 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Tổng quan điều hành”, Sự cố đang mở, P1 chưa tiếp nhận cho biết điều gì và vai trò Operator có thể thực hiện “Open priority incident” trong phạm vi này không?

**Hình chính:** Dải sự cố ưu tiên, bảng năng lực và bản đồ khu vực

**Hành động chính:** Mở sự cố ưu tiên → O04

**Mở dần chi tiết:** Giữ Sự cố đang mở, P1 chưa tiếp nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của SOS đang mở, Đội sẵn sàng, lịch sử nguồn, phiên bản và quy tắc FR-O01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tổng quan điều hành” cho Operator; đổi Sự cố đang mở và làm Đội sẵn sàng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open priority incident” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o02"></a>
## O02 — Bản đồ tình hình

**EN:** Live situation map · **JA:** 状況マップ  
**Yêu cầu:** FR-O02 / WF-20 · **Actor:** Operator · **Surface:** Command · **Layout:** map

**Mục đích:** See incidents across your authorized region.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open incident → O04.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O02) · [EN](Prototype.html?lang=en#O02) · [JA](Prototype.html?lang=ja#O02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Cháy | Building A · P1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ngập lụt | River district · P2 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Va chạm giao thông | Harbor Road · P1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ mới bản đồ | 12 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O04 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O02 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Bản đồ tình hình”, Cháy, Ngập lụt cho biết điều gì và vai trò Operator có thể thực hiện “Open incident” trong phạm vi này không?

**Hình chính:** Bản đồ nhiều sự cố với độ mới từng lớp

**Hành động chính:** Mở sự cố → O04

**Mở dần chi tiết:** Giữ Cháy, Ngập lụt ở lớp quyết định. Đưa chi tiết hỗ trợ của Va chạm giao thông, Độ mới bản đồ, lịch sử nguồn, phiên bản và quy tắc FR-O02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bản đồ tình hình” cho Operator; đổi Cháy và làm Độ mới bản đồ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open incident” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o03"></a>
## O03 — Hàng đợi xác minh tín hiệu

**EN:** Signal triage queue · **JA:** 信号の確認待ち  
**Yêu cầu:** FR-O03 / WF-03 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Mục đích:** Separate evidence from assumptions.  
**Quy tắc chính:** Giữ nguồn, thời điểm và ID; sự kiện trùng không tạo tác động mới.  
**Đầu vào:** S14.  
**Đầu ra:** Inspect signal → O05.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O03) · [EN](Prototype.html?lang=en#O03) · [JA](Prototype.html?lang=ja#O03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| EV-3101 | Camera flame · confidence 0.82 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| EV-3102 | Smoke sensor · threshold exceeded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| EV-3103 | Wearable fall · unverified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O05 với payload/version hợp lệ, bị chặn khi guard của WF-03 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O03 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Hàng đợi xác minh tín hiệu”, EV-3101, EV-3102 cho biết điều gì và vai trò Operator có thể thực hiện “Inspect signal” trong phạm vi này không?

**Hình chính:** Hàng đợi bằng chứng tín hiệu có nghi trùng và chất lượng nguồn

**Hành động chính:** Kiểm tra tín hiệu → O05

**Mở dần chi tiết:** Giữ EV-3101, EV-3102 ở lớp quyết định. Đưa chi tiết hỗ trợ của EV-3103, lịch sử nguồn, phiên bản và quy tắc FR-O03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hàng đợi xác minh tín hiệu” cho Operator; đổi EV-3101 và làm EV-3103 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Inspect signal” chỉ tới O05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o04"></a>
## O04 — Không gian xử lý sự cố

**EN:** Incident workspace · **JA:** インシデント対応  
**Yêu cầu:** FR-O04 / WF-20 · **Actor:** Operator · **Surface:** Command · **Layout:** incident

**Mục đích:** Fire · Building A / Floor 05.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** O01, O02, O06, O07, O32.  
**Đầu ra:** Open dispatch → O08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O04) · [EN](Prototype.html?lang=en#O04) · [JA](Prototype.html?lang=ja#O04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| INC-2041 | P1 · response active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS đang mở | 1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tự báo an toàn | 20 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người chưa xác nhận | 3 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O08 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O04 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Không gian xử lý sự cố”, INC-2041, SOS đang mở cho biết điều gì và vai trò Operator có thể thực hiện “Open dispatch” trong phạm vi này không?

**Hình chính:** Bản đồ sự cố cạnh SOS mở, người chưa rõ và người phụ trách

**Hành động chính:** Mở điều phối → O08

**Mở dần chi tiết:** Giữ INC-2041, SOS đang mở ở lớp quyết định. Đưa chi tiết hỗ trợ của Tự báo an toàn, Người chưa xác nhận, lịch sử nguồn, phiên bản và quy tắc FR-O04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Không gian xử lý sự cố” cho Operator; đổi INC-2041 và làm Người chưa xác nhận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open dispatch” chỉ tới O08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o05"></a>
## O05 — Kiểm tra bằng chứng

**EN:** Signal evidence review · **JA:** 証拠の確認  
**Yêu cầu:** FR-O05 / WF-04 · **Actor:** Operator · **Surface:** Command · **Layout:** evidence

**Mục đích:** Camera and sensor evidence.  
**Quy tắc chính:** Bằng chứng phát hiện chưa đồng nghĩa sự cố đã được xác minh.  
**Đầu vào:** O03, S09.  
**Đầu ra:** Create incident from signal → O06.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O05) · [EN](Prototype.html?lang=en#O05) · [JA](Prototype.html?lang=ja#O05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nguồn | CAM-A05-03 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thời điểm ghi nhận | 10:40:12 UTC+02 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ tin cậy mô hình | 0.82 · model v3 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Vị trí | Building A / Floor 05 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O06 với payload/version hợp lệ, bị chặn khi guard của WF-04 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O05 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Kiểm tra bằng chứng”, Nguồn, Thời điểm ghi nhận cho biết điều gì và vai trò Operator có thể thực hiện “Create incident from signal” trong phạm vi này không?

**Hình chính:** Khung bằng chứng có thời điểm, độ tin cậy và vị trí

**Hành động chính:** Tạo sự cố từ tín hiệu → O06

**Mở dần chi tiết:** Giữ Nguồn, Thời điểm ghi nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ tin cậy mô hình, Vị trí, lịch sử nguồn, phiên bản và quy tắc FR-O05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm tra bằng chứng” cho Operator; đổi Nguồn và làm Vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Create incident from signal” chỉ tới O06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o06"></a>
## O06 — Tạo sự cố

**EN:** Create incident · **JA:** インシデントの作成  
**Yêu cầu:** FR-O06 / WF-04 · **Actor:** Operator · **Surface:** Command · **Layout:** form

**Mục đích:** Establish the incident record.  
**Quy tắc chính:** Bằng chứng phát hiện chưa đồng nghĩa sự cố đã được xác minh.  
**Đầu vào:** O05, O29.  
**Đầu ra:** Create demo incident → O04.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O06) · [EN](Prototype.html?lang=en#O06) · [JA](Prototype.html?lang=ja#O06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Loại sự cố | Fire | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Mức độ | P1 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vị trí | Building A / Floor 05 | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Bằng chứng | EV-3101 | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Người phụ trách | Campus command | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O04 với payload/version hợp lệ, bị chặn khi guard của WF-04 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O06 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Tạo sự cố”, Loại sự cố, Mức độ cho biết điều gì và vai trò Operator có thể thực hiện “Create demo incident” trong phạm vi này không?

**Hình chính:** Xem trước tạo sự cố nối loại, mức độ và người phụ trách

**Hành động chính:** Tạo sự cố · mô phỏng → O04

**Mở dần chi tiết:** Giữ Loại sự cố, Mức độ ở lớp quyết định. Đưa chi tiết hỗ trợ của Vị trí, Bằng chứng, Người phụ trách, lịch sử nguồn, phiên bản và quy tắc FR-O06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tạo sự cố” cho Operator; đổi Loại sự cố và làm Người phụ trách không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Create demo incident” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o07"></a>
## O07 — Liên kết hoặc tách sự cố

**EN:** Correlate or split incidents · **JA:** インシデントの関連付け・分割  
**Yêu cầu:** FR-O07 / WF-04 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Mục đích:** Review possible duplicate reports.  
**Quy tắc chính:** Bằng chứng phát hiện chưa đồng nghĩa sự cố đã được xác minh.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save correlation → O04.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O07) · [EN](Prototype.html?lang=en#O07) · [JA](Prototype.html?lang=ja#O07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chính | INC-2041 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Liên quan | INC-2042 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Bằng chứng | Same zone within 60 seconds | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Quyết định | Link without deleting source | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O04 với payload/version hợp lệ, bị chặn khi guard của WF-04 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O07 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Liên kết hoặc tách sự cố”, Chính, Liên quan cho biết điều gì và vai trò Supervisor có thể thực hiện “Save correlation” trong phạm vi này không?

**Hình chính:** Phả hệ sự cố đối chiếu với tác động gộp, tách

**Hành động chính:** Lưu liên kết → O04

**Mở dần chi tiết:** Giữ Chính, Liên quan ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng, Quyết định, lịch sử nguồn, phiên bản và quy tắc FR-O07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Liên kết hoặc tách sự cố” cho Supervisor; đổi Chính và làm Quyết định không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save correlation” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o08"></a>
## O08 — Bảng điều phối

**EN:** Dispatch board · **JA:** 配備ボード  
**Yêu cầu:** FR-O08 / WF-11 · **Actor:** Dispatcher · **Surface:** Command · **Layout:** dispatch

**Mục đích:** Match the task to a capable team.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** O04.  
**Đầu ra:** Review assignment → O09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O08) · [EN](Prototype.html?lang=en#O08) · [JA](Prototype.html?lang=ja#O08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Rescue 02 | Available · fire capable | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Medical 01 | Assigned · care capable | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Security 03 | Available · perimeter | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nhiệm vụ | Assist SOS-041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O09 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O08 — Bố cục thị giác V2

**Context:** command · **Role:** Dispatcher

**Câu hỏi chính:** Trong “Bảng điều phối”, Rescue 02, Medical 01 cho biết điều gì và vai trò Dispatcher có thể thực hiện “Review assignment” trong phạm vi này không?

**Hình chính:** Các làn đội thể hiện năng lực, nhiệm vụ và trạng thái nhận

**Hành động chính:** Xem phân công → O09

**Mở dần chi tiết:** Giữ Rescue 02, Medical 01 ở lớp quyết định. Đưa chi tiết hỗ trợ của Security 03, Nhiệm vụ, lịch sử nguồn, phiên bản và quy tắc FR-O08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bảng điều phối” cho Dispatcher; đổi Rescue 02 và làm Nhiệm vụ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review assignment” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o09"></a>
## O09 — Phân công đội ứng cứu

**EN:** Assign responder · **JA:** 対応チームの割り当て  
**Yêu cầu:** FR-O09 / WF-11 · **Actor:** Dispatcher · **Surface:** Command · **Layout:** form

**Mục đích:** Confirm ownership of the task.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** O08, O12, O34, H09.  
**Đầu ra:** Assign team — demo → O10.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O09) · [EN](Prototype.html?lang=en#O09) · [JA](Prototype.html?lang=ja#O09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sự cố | INC-2041 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Đơn vị | Rescue 02 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Nhiệm vụ | Assist person in Room 505 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hạn nhận nhiệm vụ | 60 seconds | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O10 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O09 — Bố cục thị giác V2

**Context:** command · **Role:** Dispatcher

**Câu hỏi chính:** Trong “Phân công đội ứng cứu”, Sự cố, Đơn vị cho biết điều gì và vai trò Dispatcher có thể thực hiện “Assign team — demo” trong phạm vi này không?

**Hình chính:** Xem trước phân công gắn đúng đội, nhiệm vụ và hạn đáp

**Hành động chính:** Phân đội · mô phỏng → O10

**Mở dần chi tiết:** Giữ Sự cố, Đơn vị ở lớp quyết định. Đưa chi tiết hỗ trợ của Nhiệm vụ, Hạn nhận nhiệm vụ, lịch sử nguồn, phiên bản và quy tắc FR-O09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phân công đội ứng cứu” cho Dispatcher; đổi Sự cố và làm Hạn nhận nhiệm vụ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Assign team — demo” chỉ tới O10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o10"></a>
## O10 — Dòng thời gian ứng cứu

**EN:** Response timeline · **JA:** 対応タイムライン  
**Yêu cầu:** FR-O10 / WF-11 · **Actor:** Operator · **Surface:** Command · **Layout:** timeline

**Mục đích:** A shared record of decisions.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** O09.  
**Đầu ra:** Review people status → O11.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O10) · [EN](Prototype.html?lang=en#O10) · [JA](Prototype.html?lang=ja#O10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| 10:40:12 | Signal received | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:40:19 | Incident confirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:42:18 | SOS acknowledged | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:43:02 | Rescue 02 assigned | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O11 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O10 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Dòng thời gian ứng cứu”, 10:40:12, 10:40:19 cho biết điều gì và vai trò Operator có thể thực hiện “Review people status” trong phạm vi này không?

**Hình chính:** Mốc phản ứng theo thời gian với biên nhận từng nguồn

**Hành động chính:** Xem trạng thái người → O11

**Mở dần chi tiết:** Giữ 10:40:12, 10:40:19 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:42:18, 10:43:02, lịch sử nguồn, phiên bản và quy tắc FR-O10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Dòng thời gian ứng cứu” cho Operator; đổi 10:40:12 và làm 10:43:02 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review people status” chỉ tới O11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o11"></a>
## O11 — Theo dõi trạng thái con người

**EN:** People accountability · **JA:** 安否確認一覧  
**Yêu cầu:** FR-O11 / WF-12 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Mục đích:** Know what is reported and what is unknown.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** O10.  
**Đầu ra:** Open person → O12.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O11) · [EN](Prototype.html?lang=en#O11) · [JA](Prototype.html?lang=ja#O11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Alex | SOS · Room 505 · 10:42 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Jamie | Self-reported safe · 10:45 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | Unknown · last seen 09:50 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi | 24 registered occupants | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O12 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O11 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Theo dõi trạng thái con người”, Alex, Jamie cho biết điều gì và vai trò Operator có thể thực hiện “Open person” trong phạm vi này không?

**Hình chính:** Bảng người tách chưa rõ, được giúp và tự báo an

**Hành động chính:** Mở hồ sơ người → O12

**Mở dần chi tiết:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Phạm vi, lịch sử nguồn, phiên bản và quy tắc FR-O11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Theo dõi trạng thái con người” cho Operator; đổi Alex và làm Phạm vi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open person” chỉ tới O12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o12"></a>
## O12 — Chi tiết yêu cầu hỗ trợ

**EN:** Person assistance detail · **JA:** 支援要請の詳細  
**Yêu cầu:** FR-O12 / WF-12 · **Actor:** Operator · **Surface:** Command · **Layout:** detail

**Mục đích:** Alex Morgan · SOS-041.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** O11.  
**Đầu ra:** Assign assistance → O09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O12) · [EN](Prototype.html?lang=en#O12) · [JA](Prototype.html?lang=ja#O12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vị trí | User-submitted room 505 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sự đồng ý | Response team only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Trạng thái | Assistance requested | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ mới | 3 minutes old | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O09 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O12 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Chi tiết yêu cầu hỗ trợ”, Vị trí, Sự đồng ý cho biết điều gì và vai trò Operator có thể thực hiện “Assign assistance” trong phạm vi này không?

**Hình chính:** Nhu cầu trợ giúp, phạm vi đồng ý và vị trí cuối

**Hành động chính:** Phân trợ giúp → O09

**Mở dần chi tiết:** Giữ Vị trí, Sự đồng ý ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái, Độ mới, lịch sử nguồn, phiên bản và quy tắc FR-O12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chi tiết yêu cầu hỗ trợ” cho Operator; đổi Vị trí và làm Độ mới không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Assign assistance” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o13"></a>
## O13 — Soạn cảnh báo

**EN:** Compose warning · **JA:** 警報の作成  
**Yêu cầu:** FR-O13 / WF-09 · **Actor:** Warning author · **Surface:** Command · **Layout:** form

**Mục đích:** Prepare a targeted warning.  
**Quy tắc chính:** Phê duyệt áp dụng đúng phiên bản nội dung và phạm vi người nhận.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Preview audience → O14.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O13) · [EN](Prototype.html?lang=en#O13) · [JA](Prototype.html?lang=ja#O13)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Loại sự cố | Fire | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Khu vực | Building A | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ngôn ngữ | English | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Hướng dẫn | Follow approved evacuation plan | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hết hạn | 11:30 local | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O13:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O14 với payload/version hợp lệ, bị chặn khi guard của WF-09 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O13 — Bố cục thị giác V2

**Context:** command · **Role:** Warning author

**Câu hỏi chính:** Trong “Soạn cảnh báo”, Loại sự cố, Khu vực cho biết điều gì và vai trò Warning author có thể thực hiện “Preview audience” trong phạm vi này không?

**Hình chính:** Soạn cảnh báo cạnh vùng ảnh hưởng và xem trước chỉ dẫn

**Hành động chính:** Xem trước người nhận → O14

**Mở dần chi tiết:** Giữ Loại sự cố, Khu vực ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ, Hướng dẫn, Hết hạn, lịch sử nguồn, phiên bản và quy tắc FR-O13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Soạn cảnh báo” cho Warning author; đổi Loại sự cố và làm Hết hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Preview audience” chỉ tới O14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o14"></a>
## O14 — Xem trước nội dung và người nhận

**EN:** Warning preview & audience · **JA:** 内容と対象者のプレビュー  
**Yêu cầu:** FR-O14 / WF-09 · **Actor:** Warning author · **Surface:** Command · **Layout:** detail

**Mục đích:** Review message and recipients.  
**Quy tắc chính:** Phê duyệt áp dụng đúng phiên bản nội dung và phạm vi người nhận.  
**Đầu vào:** O13, T06.  
**Đầu ra:** Submit for approval → O15.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O14) · [EN](Prototype.html?lang=en#O14) · [JA](Prototype.html?lang=ja#O14)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Đối tượng nhận | 480 eligible subscriptions | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Các kênh | Push · SMS · PA | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bản dịch | English approved · Japanese pending | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đối tượng loại trừ | Outside Building A | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O14:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O15 với payload/version hợp lệ, bị chặn khi guard của WF-09 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O14 — Bố cục thị giác V2

**Context:** command · **Role:** Warning author

**Câu hỏi chính:** Trong “Xem trước nội dung và người nhận”, Đối tượng nhận, Các kênh cho biết điều gì và vai trò Warning author có thể thực hiện “Submit for approval” trong phạm vi này không?

**Hình chính:** Phạm vi người nhận và so sánh độ phủ kênh, ngôn ngữ

**Hành động chính:** Gửi duyệt → O15

**Mở dần chi tiết:** Giữ Đối tượng nhận, Các kênh ở lớp quyết định. Đưa chi tiết hỗ trợ của Bản dịch, Đối tượng loại trừ, lịch sử nguồn, phiên bản và quy tắc FR-O14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xem trước nội dung và người nhận” cho Warning author; đổi Đối tượng nhận và làm Đối tượng loại trừ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit for approval” chỉ tới O15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o15"></a>
## O15 — Duyệt cảnh báo

**EN:** Approve warning · **JA:** 警報の承認  
**Yêu cầu:** FR-O15 / WF-09 · **Actor:** Warning approver · **Surface:** Command · **Layout:** form

**Mục đích:** Independent approval before broadcast.  
**Quy tắc chính:** Phê duyệt áp dụng đúng phiên bản nội dung và phạm vi người nhận.  
**Đầu vào:** O14.  
**Đầu ra:** Approve demo warning → O16.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O15) · [EN](Prototype.html?lang=en#O15) · [JA](Prototype.html?lang=ja#O15)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Người soạn | Operator A | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Người duyệt | Supervisor B | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Phiên bản | 3 | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Lý do | Verified incident in occupied zone | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O15:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O16 với payload/version hợp lệ, bị chặn khi guard của WF-09 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O15 — Bố cục thị giác V2

**Context:** command · **Role:** Warning approver

**Câu hỏi chính:** Trong “Duyệt cảnh báo”, Người soạn, Người duyệt cho biết điều gì và vai trò Warning approver có thể thực hiện “Approve demo warning” trong phạm vi này không?

**Hình chính:** Đúng phiên bản cảnh báo và tách người soạn, duyệt

**Hành động chính:** Duyệt cảnh báo · mô phỏng → O16

**Mở dần chi tiết:** Giữ Người soạn, Người duyệt ở lớp quyết định. Đưa chi tiết hỗ trợ của Phiên bản, Lý do, lịch sử nguồn, phiên bản và quy tắc FR-O15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Duyệt cảnh báo” cho Warning approver; đổi Người soạn và làm Lý do không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve demo warning” chỉ tới O16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o16"></a>
## O16 — Gửi tin và chuyển cấp

**EN:** Delivery & escalation · **JA:** 配信とエスカレーション  
**Yêu cầu:** FR-O16 / WF-10 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Mục đích:** Sending does not mean received.  
**Quy tắc chính:** Đã gửi không có nghĩa đã nhận, đã đọc hoặc đã có người phản hồi.  
**Đầu vào:** O15, O17.  
**Đầu ra:** Review failed deliveries → O17.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O16) · [EN](Prototype.html?lang=en#O16) · [JA](Prototype.html?lang=ja#O16)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Push | 402 delivered · 78 unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SMS | 60 delivered · 18 pending | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người đã xác nhận | 211 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lần chuyển cấp tiếp | 10:46 local | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O16:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O17 với payload/version hợp lệ, bị chặn khi guard của WF-10 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O16 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Gửi tin và chuyển cấp”, Push, SMS cho biết điều gì và vai trò Operator có thể thực hiện “Review failed deliveries” trong phạm vi này không?

**Hình chính:** Phễu giao nhận tách nhà cung cấp nhận và con người xác nhận

**Hành động chính:** Xem giao nhận lỗi → O17

**Mở dần chi tiết:** Giữ Push, SMS ở lớp quyết định. Đưa chi tiết hỗ trợ của Người đã xác nhận, Lần chuyển cấp tiếp, lịch sử nguồn, phiên bản và quy tắc FR-O16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Gửi tin và chuyển cấp” cho Operator; đổi Push và làm Lần chuyển cấp tiếp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review failed deliveries” chỉ tới O17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o17"></a>
## O17 — Xử lý gửi tin thất bại

**EN:** Delivery failure review · **JA:** 配信失敗への対応  
**Yêu cầu:** FR-O17 / WF-10 · **Actor:** Operator · **Surface:** Command · **Layout:** detail

**Mục đích:** Resolve notification gaps.  
**Quy tắc chính:** Đã gửi không có nghĩa đã nhận, đã đọc hoặc đã có người phản hồi.  
**Đầu vào:** O16.  
**Đầu ra:** Queue fallback — demo → O16.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O17) · [EN](Prototype.html?lang=en#O17) · [JA](Prototype.html?lang=ja#O17)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nhà cung cấp | SMS provider B | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lỗi | Rate limit · retryable | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bị ảnh hưởng | 18 recipients | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dự phòng | Voice provider C | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O17:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O16 với payload/version hợp lệ, bị chặn khi guard của WF-10 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O17 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Xử lý gửi tin thất bại”, Nhà cung cấp, Lỗi cho biết điều gì và vai trò Operator có thể thực hiện “Queue fallback — demo” trong phạm vi này không?

**Hình chính:** Nhóm nhận lỗi cạnh đề xuất kênh dự phòng

**Hành động chính:** Xếp kênh dự phòng · mô phỏng → O16

**Mở dần chi tiết:** Giữ Nhà cung cấp, Lỗi ở lớp quyết định. Đưa chi tiết hỗ trợ của Bị ảnh hưởng, Dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-O17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xử lý gửi tin thất bại” cho Operator; đổi Nhà cung cấp và làm Dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Queue fallback — demo” chỉ tới O16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o18"></a>
## O18 — Duyệt lệnh thiết bị

**EN:** Physical command approval · **JA:** 機器コマンドの承認  
**Yêu cầu:** FR-O18 / WF-15 · **Actor:** Authorized controller · **Surface:** Command · **Layout:** form

**Mục đích:** Review a proposed equipment action.  
**Quy tắc chính:** Lệnh được nhận chưa có nghĩa đã thực thi; kiểm tra TTL và liên động.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Approve simulated command → O19.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O18) · [EN](Prototype.html?lang=en#O18) · [JA](Prototype.html?lang=ja#O18)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Đích | PA controller · zone A05 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Điều hành | Play approved evacuation message | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Liên động an toàn | Test passed | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Hết hiệu lực | 30 seconds after approval | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O18:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O19 với payload/version hợp lệ, bị chặn khi guard của WF-15 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O18 — Bố cục thị giác V2

**Context:** command · **Role:** Authorized controller

**Câu hỏi chính:** Trong “Duyệt lệnh thiết bị”, Đích, Điều hành cho biết điều gì và vai trò Authorized controller có thể thực hiện “Approve simulated command” trong phạm vi này không?

**Hình chính:** Sơ đồ thiết bị đích với liên động và bản lệnh có hạn

**Hành động chính:** Duyệt lệnh mô phỏng → O19

**Mở dần chi tiết:** Giữ Đích, Điều hành ở lớp quyết định. Đưa chi tiết hỗ trợ của Liên động an toàn, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-O18 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Lệnh hết hạn, liên động lỗi hoặc đích đổi làm mất duyệt; phải xem lại đúng phiên bản lệnh.

**Tình huống nghiệm thu V2:** Dùng tình huống “Duyệt lệnh thiết bị” cho Authorized controller; đổi Đích và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve simulated command” chỉ tới O19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o19"></a>
## O19 — Trạng thái thực thi lệnh

**EN:** Physical command status · **JA:** コマンドの実行状況  
**Yêu cầu:** FR-O19 / WF-15 · **Actor:** Authorized controller · **Surface:** Command · **Layout:** timeline

**Mục đích:** Track controller evidence.  
**Quy tắc chính:** Lệnh được nhận chưa có nghĩa đã thực thi; kiểm tra TTL và liên động.  
**Đầu vào:** O18, O19.  
**Đầu ra:** Refresh command evidence → O19.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O19) · [EN](Prototype.html?lang=en#O19) · [JA](Prototype.html?lang=ja#O19)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| 10:44:00 | Requested | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:44:03 | Approved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:44:04 | Gateway accepted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hiện tại | Completion not yet confirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O19:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O19 với payload/version hợp lệ, bị chặn khi guard của WF-15 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O19 — Bố cục thị giác V2

**Context:** command · **Role:** Authorized controller

**Câu hỏi chính:** Trong “Trạng thái thực thi lệnh”, 10:44:00, 10:44:03 cho biết điều gì và vai trò Authorized controller có thể thực hiện “Refresh command evidence” trong phạm vi này không?

**Hình chính:** Dòng lệnh tách biên nhận truyền tải và tác động vật lý

**Hành động chính:** Cập nhật bằng chứng lệnh → O19

**Mở dần chi tiết:** Giữ 10:44:00, 10:44:03 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:44:04, Hiện tại, lịch sử nguồn, phiên bản và quy tắc FR-O19 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Bộ điều khiển nhận nhưng thiếu phản hồi vật lý vẫn chưa rõ; hiện đối soát thay vì thành công khi lặp lệnh.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trạng thái thực thi lệnh” cho Authorized controller; đổi 10:44:00 và làm Hiện tại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Refresh command evidence” chỉ tới O19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o20"></a>
## O20 — Kiểm tra trước khi đóng sự cố

**EN:** Incident closure review · **JA:** 終結前の確認  
**Yêu cầu:** FR-O20 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Mục đích:** Resolve outstanding obligations.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Close demo incident → O21.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O20) · [EN](Prototype.html?lang=en#O20) · [JA](Prototype.html?lang=ja#O20)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| SOS đang mở | 0 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Người chưa xác nhận | 3 · handover documented | Số nguyên trong giới hạn policy; unknown là giá trị riêng, không ép thành 0. |
| Các đội | Released | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lý do | Transferred to authority | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Người duyệt | Supervisor | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O20:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O21 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O20 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Kiểm tra trước khi đóng sự cố”, SOS đang mở, Người chưa xác nhận cho biết điều gì và vai trò Supervisor có thể thực hiện “Close demo incident” trong phạm vi này không?

**Hình chính:** Điều kiện chặn đóng nêu SOS mở và người chưa xác minh

**Hành động chính:** Đóng sự cố · mô phỏng → O21

**Mở dần chi tiết:** Giữ SOS đang mở, Người chưa xác nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Các đội, Lý do, Người duyệt, lịch sử nguồn, phiên bản và quy tắc FR-O20 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** SOS mở và người chưa xác minh vẫn là chặn hoặc cần quyết định có quản trị; đóng màn không phải đóng sự cố.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm tra trước khi đóng sự cố” cho Supervisor; đổi SOS đang mở và làm Người duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Close demo incident” chỉ tới O21 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o21"></a>
## O21 — Đánh giá sau sự cố

**EN:** After-action review · **JA:** 対応後の振り返り  
**Yêu cầu:** FR-O21 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** detail

**Mục đích:** Learn from the response.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** O20, O22, O24.  
**Đầu ra:** Create improvement action → O22.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O21) · [EN](Prototype.html?lang=en#O21) · [JA](Prototype.html?lang=ja#O21)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tiếp nhận đầu tiên | 7 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nhận nhiệm vụ | 42 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khoảng trống gửi tin | 18 SMS attempts | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cải tiến | Review provider capacity | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O21:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O22 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O21 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Đánh giá sau sự cố”, Tiếp nhận đầu tiên, Nhận nhiệm vụ cho biết điều gì và vai trò Supervisor có thể thực hiện “Create improvement action” trong phạm vi này không?

**Hình chính:** Biểu đồ thời gian phản ứng, thiếu giao nhận và người cải tiến

**Hành động chính:** Tạo việc cải tiến → O22

**Mở dần chi tiết:** Giữ Tiếp nhận đầu tiên, Nhận nhiệm vụ ở lớp quyết định. Đưa chi tiết hỗ trợ của Khoảng trống gửi tin, Cải tiến, lịch sử nguồn, phiên bản và quy tắc FR-O21 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đánh giá sau sự cố” cho Supervisor; đổi Tiếp nhận đầu tiên và làm Cải tiến không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Create improvement action” chỉ tới O22 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o22"></a>
## O22 — Hành động cải tiến

**EN:** Improvement action · **JA:** 改善アクション  
**Yêu cầu:** FR-O22 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Mục đích:** Give follow-up work an owner.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** O21.  
**Đầu ra:** Save action → O21.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O22) · [EN](Prototype.html?lang=en#O22) · [JA](Prototype.html?lang=ja#O22)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hành động | Increase tested SMS capacity | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Người phụ trách | Platform operations | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hạn hoàn thành | 2026-11-06 | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |
| Sự cố liên kết | INC-2041 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O22:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O21 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O22 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Hành động cải tiến”, Hành động, Người phụ trách cho biết điều gì và vai trò Supervisor có thể thực hiện “Save action” trong phạm vi này không?

**Hình chính:** Việc cải tiến với người chịu trách nhiệm và hạn

**Hành động chính:** Lưu việc → O21

**Mở dần chi tiết:** Giữ Hành động, Người phụ trách ở lớp quyết định. Đưa chi tiết hỗ trợ của Hạn hoàn thành, Sự cố liên kết, lịch sử nguồn, phiên bản và quy tắc FR-O22 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hành động cải tiến” cho Supervisor; đổi Hành động và làm Sự cố liên kết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save action” chỉ tới O21 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o23"></a>
## O23 — Lập lịch diễn tập

**EN:** Drill scheduler · **JA:** 訓練の計画  
**Yêu cầu:** FR-O23 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Mục đích:** Practice without contacting live recipients.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open drill control → O24.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O23) · [EN](Prototype.html?lang=en#O23) · [JA](Prototype.html?lang=ja#O23)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Kịch bản | Building A evacuation | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Môi trường | Exercise only | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Người tham gia | Test cohort | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Bắt đầu | 2026-11-02 09:00 local | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O23:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O24 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O23 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Lập lịch diễn tập”, Kịch bản, Môi trường cho biết điều gì và vai trò Supervisor có thể thực hiện “Open drill control” trong phạm vi này không?

**Hình chính:** Lịch diễn tập tách rõ môi trường thực

**Hành động chính:** Mở điều khiển diễn tập → O24

**Mở dần chi tiết:** Giữ Kịch bản, Môi trường ở lớp quyết định. Đưa chi tiết hỗ trợ của Người tham gia, Bắt đầu, lịch sử nguồn, phiên bản và quy tắc FR-O23 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lập lịch diễn tập” cho Supervisor; đổi Kịch bản và làm Bắt đầu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open drill control” chỉ tới O24 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o24"></a>
## O24 — Điều hành diễn tập

**EN:** Drill control room · **JA:** 訓練の指揮  
**Yêu cầu:** FR-O24 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** dashboard

**Mục đích:** EXERCISE · Building A evacuation.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** O23.  
**Đầu ra:** Review drill report → O21.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O24) · [EN](Prototype.html?lang=en#O24) · [JA](Prototype.html?lang=ja#O24)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chế độ | Exercise | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thiết bị điều khiển thật | Disconnected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người nhận thử | 24 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bước hoàn tất | 3 of 5 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O24:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O21 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O24 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Điều hành diễn tập”, Chế độ, Thiết bị điều khiển thật cho biết điều gì và vai trò Supervisor có thể thực hiện “Review drill report” trong phạm vi này không?

**Hình chính:** Bảng tiến trình diễn tập có trạng thái cách ly thiết bị

**Hành động chính:** Xem báo cáo diễn tập → O21

**Mở dần chi tiết:** Giữ Chế độ, Thiết bị điều khiển thật ở lớp quyết định. Đưa chi tiết hỗ trợ của Người nhận thử, Bước hoàn tất, lịch sử nguồn, phiên bản và quy tắc FR-O24 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Điều hành diễn tập” cho Supervisor; đổi Chế độ và làm Bước hoàn tất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review drill report” chỉ tới O21 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o25"></a>
## O25 — Bàn giao ca trực

**EN:** Shift handover · **JA:** 勤務の引き継ぎ  
**Yêu cầu:** FR-O25 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Mục đích:** Transfer active operational responsibility.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Record handover → O01.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O25) · [EN](Prototype.html?lang=en#O25) · [JA](Prototype.html?lang=ja#O25)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ca bàn giao | Operator A | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ca tiếp nhận | Operator B | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Sự cố đang mở | 12 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Việc còn lại | 4 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Xác nhận tiếp nhận | Required | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O25:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O01 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O25 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Bàn giao ca trực”, Ca bàn giao, Ca tiếp nhận cho biết điều gì và vai trò Supervisor có thể thực hiện “Record handover” trong phạm vi này không?

**Hình chính:** Chuyển trách nhiệm ca với việc chưa hoàn tất

**Hành động chính:** Ghi bàn giao → O01

**Mở dần chi tiết:** Giữ Ca bàn giao, Ca tiếp nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Sự cố đang mở, Việc còn lại, Xác nhận tiếp nhận, lịch sử nguồn, phiên bản và quy tắc FR-O25 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bàn giao ca trực” cho Supervisor; đổi Ca bàn giao và làm Xác nhận tiếp nhận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Record handover” chỉ tới O01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o26"></a>
## O26 — Vận hành nơi trú ẩn

**EN:** Shelter operations · **JA:** 避難所の運営  
**Yêu cầu:** FR-O26 / WF-13 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Mục đích:** Publish fresh shelter information.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** O27.  
**Đầu ra:** Edit shelter → O27.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O26) · [EN](Prototype.html?lang=en#O26) · [JA](Prototype.html?lang=ja#O26)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| North shelter | Open · 80 spaces | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| West center | Status unverified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| South shelter | Closed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lần cập nhật gần nhất | 10:40 local | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O26:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O27 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O26 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Vận hành nơi trú ẩn”, North shelter, West center cho biết điều gì và vai trò Operator có thể thực hiện “Edit shelter” trong phạm vi này không?

**Hình chính:** Bảng sức chứa nơi trú gồm chưa rõ và báo cáo hết hạn

**Hành động chính:** Sửa nơi trú → O27

**Mở dần chi tiết:** Giữ North shelter, West center ở lớp quyết định. Đưa chi tiết hỗ trợ của South shelter, Lần cập nhật gần nhất, lịch sử nguồn, phiên bản và quy tắc FR-O26 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Vận hành nơi trú ẩn” cho Operator; đổi North shelter và làm Lần cập nhật gần nhất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit shelter” chỉ tới O27 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o27"></a>
## O27 — Cập nhật nơi trú ẩn

**EN:** Edit shelter status · **JA:** 避難所情報の更新  
**Yêu cầu:** FR-O27 / WF-13 · **Actor:** Operator · **Surface:** Command · **Layout:** form

**Mục đích:** Update a designated shelter.  
**Quy tắc chính:** Hướng dẫn và điểm đến phải hiển thị nguồn, phiên bản và độ mới.  
**Đầu vào:** O26.  
**Đầu ra:** Publish demo update → O26.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O27) · [EN](Prototype.html?lang=en#O27) · [JA](Prototype.html?lang=ja#O27)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nơi trú ẩn | North | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Trạng thái | Open | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chỗ còn lại | 80 | Số nguyên trong giới hạn policy; unknown là giá trị riêng, không ép thành 0. |
| Khả năng tiếp cận | Step-free | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hiệu lực đến | 12:00 local | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O27:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O26 với payload/version hợp lệ, bị chặn khi guard của WF-13 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O27 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Cập nhật nơi trú ẩn”, Nơi trú ẩn, Trạng thái cho biết điều gì và vai trò Operator có thể thực hiện “Publish demo update” trong phạm vi này không?

**Hình chính:** Sửa nơi trú cạnh xem trước sức chứa và hiệu lực

**Hành động chính:** Công bố cập nhật · mô phỏng → O26

**Mở dần chi tiết:** Giữ Nơi trú ẩn, Trạng thái ở lớp quyết định. Đưa chi tiết hỗ trợ của Chỗ còn lại, Khả năng tiếp cận, Hiệu lực đến, lịch sử nguồn, phiên bản và quy tắc FR-O27 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Cập nhật nơi trú ẩn” cho Operator; đổi Nơi trú ẩn và làm Hiệu lực đến không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish demo update” chỉ tới O26 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o28"></a>
## O28 — Nguồn cảnh báo thiên tai

**EN:** Regional disaster feed · **JA:** 災害警報フィード  
**Yêu cầu:** FR-O28 / WF-08 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Mục đích:** Review trusted public advisories.  
**Quy tắc chính:** Giữ nguồn phát, thời hạn và lịch sử cập nhật hoặc hủy cảnh báo.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Inspect advisory → O29.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O28) · [EN](Prototype.html?lang=en#O28) · [JA](Prototype.html?lang=ja#O28)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| CAP-041 | Flood watch · Update | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| CAP-039 | Wind alert · expired | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| CAP-038 | Storm warning · canceled | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O28:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O29 với payload/version hợp lệ, bị chặn khi guard của WF-08 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O28 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Nguồn cảnh báo thiên tai”, CAP-041, CAP-039 cho biết điều gì và vai trò Operator có thể thực hiện “Inspect advisory” trong phạm vi này không?

**Hình chính:** Hàng đợi khuyến cáo vùng có nguồn và bản thay thế

**Hành động chính:** Kiểm tra khuyến cáo → O29

**Mở dần chi tiết:** Giữ CAP-041, CAP-039 ở lớp quyết định. Đưa chi tiết hỗ trợ của CAP-038, lịch sử nguồn, phiên bản và quy tắc FR-O28 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Nguồn cảnh báo thiên tai” cho Operator; đổi CAP-041 và làm CAP-038 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Inspect advisory” chỉ tới O29 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o29"></a>
## O29 — Kiểm tra thông điệp CAP

**EN:** CAP advisory review · **JA:** CAP情報の確認  
**Yêu cầu:** FR-O29 / WF-08 · **Actor:** Operator · **Surface:** Command · **Layout:** detail

**Mục đích:** Preserve the issuing authority's context.  
**Quy tắc chính:** Giữ nguồn phát, thời hạn và lịch sử cập nhật hoặc hủy cảnh báo.  
**Đầu vào:** O28.  
**Đầu ra:** Create local response → O06.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O29) · [EN](Prototype.html?lang=en#O29) · [JA](Prototype.html?lang=ja#O29)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Bên phát | Configured authority | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Định danh | CAP-041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Loại thông điệp | Update | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tham chiếu | CAP-040 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hết hiệu lực | 18:00 local | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O29:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O06 với payload/version hợp lệ, bị chặn khi guard của WF-08 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O29 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Kiểm tra thông điệp CAP”, Bên phát, Định danh cho biết điều gì và vai trò Operator có thể thực hiện “Create local response” trong phạm vi này không?

**Hình chính:** Chuỗi thông điệp CAP có tham chiếu sửa, hủy và hết hạn

**Hành động chính:** Tạo phản ứng địa phương → O06

**Mở dần chi tiết:** Giữ Bên phát, Định danh ở lớp quyết định. Đưa chi tiết hỗ trợ của Loại thông điệp, Tham chiếu, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-O29 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm tra thông điệp CAP” cho Operator; đổi Bên phát và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Create local response” chỉ tới O06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o30"></a>
## O30 — Tìm kiếm và lịch sử kiểm toán

**EN:** Search & audit timeline · **JA:** 検索と監査履歴  
**Yêu cầu:** FR-O30 / WF-19 · **Actor:** Auditor · **Surface:** Command · **Layout:** list

**Mục đích:** Find an event without changing history.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** T11, X07.  
**Đầu ra:** Inspect audit entry → T11.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O30) · [EN](Prototype.html?lang=en#O30) · [JA](Prototype.html?lang=ja#O30)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Truy vấn | INC-2041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Create | Operator A · 10:40 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dispatch | Dispatcher B · 10:43 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Xuất dữ liệu | Auditor C · 11:20 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O30:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T11 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O30 — Bố cục thị giác V2

**Context:** command · **Role:** Auditor

**Câu hỏi chính:** Trong “Tìm kiếm và lịch sử kiểm toán”, Truy vấn, Create cho biết điều gì và vai trò Auditor có thể thực hiện “Inspect audit entry” trong phạm vi này không?

**Hình chính:** Dòng kiểm toán có người thao tác, phạm vi và sự kiện

**Hành động chính:** Kiểm tra nhật ký → T11

**Mở dần chi tiết:** Giữ Truy vấn, Create ở lớp quyết định. Đưa chi tiết hỗ trợ của Dispatch, Xuất dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-O30 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tìm kiếm và lịch sử kiểm toán” cho Auditor; đổi Truy vấn và làm Xuất dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect audit entry” chỉ tới T11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s01"></a>
## S01 — Danh mục địa điểm

**EN:** Site directory · **JA:** 拠点一覧  
**Yêu cầu:** FR-S01 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** cards

**Mục đích:** One location model across industries.  
**Quy tắc chính:** Vị trí và sơ đồ có phiên bản; bản mới phải được duyệt trước khi dùng.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open site → S02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S01) · [EN](Prototype.html?lang=en#S01) · [JA](Prototype.html?lang=ja#S01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Harbor Campus | Buildings · EU | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Riverside | Geofence · EU | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| North highway | Road segment · EU | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S02 với payload/version hợp lệ, bị chặn khi guard của WF-02 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Site admin

**Câu hỏi chính:** Trong “Danh mục địa điểm”, Harbor Campus, Riverside cho biết điều gì và vai trò Site admin có thể thực hiện “Open site” trong phạm vi này không?

**Hình chính:** Bản đồ và danh bạ cơ sở có ranh giới vùng

**Hành động chính:** Mở cơ sở → S02

**Mở dần chi tiết:** Giữ Harbor Campus, Riverside ở lớp quyết định. Đưa chi tiết hỗ trợ của North highway, lịch sử nguồn, phiên bản và quy tắc FR-S01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Danh mục địa điểm” cho Site admin; đổi Harbor Campus và làm North highway không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Open site” chỉ tới S02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s02"></a>
## S02 — Cấu trúc địa điểm

**EN:** Site structure · **JA:** 拠点の構造  
**Yêu cầu:** FR-S02 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** tree

**Mục đích:** Harbor Campus / Building A.  
**Quy tắc chính:** Vị trí và sơ đồ có phiên bản; bản mới phải được duyệt trước khi dùng.  
**Đầu vào:** S01, S03.  
**Đầu ra:** Edit location → S03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S02) · [EN](Prototype.html?lang=en#S02) · [JA](Prototype.html?lang=ja#S02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Building A | Floors 01–08 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Floor 05 | Zones A05-01 to A05-06 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Zone A05-03 | Camera + smoke detector | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Assembly | North court | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S03 với payload/version hợp lệ, bị chặn khi guard của WF-02 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Site admin

**Câu hỏi chính:** Trong “Cấu trúc địa điểm”, Building A, Floor 05 cho biết điều gì và vai trò Site admin có thể thực hiện “Edit location” trong phạm vi này không?

**Hình chính:** Cây tòa, tầng, vùng với bối cảnh không gian được chọn

**Hành động chính:** Sửa vị trí → S03

**Mở dần chi tiết:** Giữ Building A, Floor 05 ở lớp quyết định. Đưa chi tiết hỗ trợ của Zone A05-03, Assembly, lịch sử nguồn, phiên bản và quy tắc FR-S02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Cấu trúc địa điểm” cho Site admin; đổi Building A và làm Assembly không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit location” chỉ tới S03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s03"></a>
## S03 — Chỉnh sửa vị trí

**EN:** Location editor · **JA:** 位置情報の編集  
**Yêu cầu:** FR-S03 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** form

**Mục đích:** Link physical and geographic context.  
**Quy tắc chính:** Vị trí và sơ đồ có phiên bản; bản mới phải được duyệt trước khi dùng.  
**Đầu vào:** S02.  
**Đầu ra:** Save location → S02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S03) · [EN](Prototype.html?lang=en#S03) · [JA](Prototype.html?lang=ja#S03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tên | East corridor | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vị trí cha | Floor 05 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tọa độ | 52.5200 / 13.4050 | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Mã tầng | 05 | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Múi giờ | Europe/Berlin | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S02 với payload/version hợp lệ, bị chặn khi guard của WF-02 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Site admin

**Câu hỏi chính:** Trong “Chỉnh sửa vị trí”, Tên, Vị trí cha cho biết điều gì và vai trò Site admin có thể thực hiện “Save location” trong phạm vi này không?

**Hình chính:** Đường dẫn vị trí cha cạnh tọa độ và xem trước tầng

**Hành động chính:** Lưu vị trí → S02

**Mở dần chi tiết:** Giữ Tên, Vị trí cha ở lớp quyết định. Đưa chi tiết hỗ trợ của Tọa độ, Mã tầng, Múi giờ, lịch sử nguồn, phiên bản và quy tắc FR-S03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chỉnh sửa vị trí” cho Site admin; đổi Tên và làm Múi giờ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save location” chỉ tới S02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s04"></a>
## S04 — Biên tập sơ đồ tầng

**EN:** Floor plan editor · **JA:** フロア図の編集  
**Yêu cầu:** FR-S04 / WF-02 · **Actor:** Site admin · **Surface:** Sites · **Layout:** floor

**Mục đích:** Publish a reviewed evacuation map.  
**Quy tắc chính:** Vị trí và sơ đồ có phiên bản; bản mới phải được duyệt trước khi dùng.  
**Đầu vào:** S05.  
**Đầu ra:** Review plan publication → S05.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S04) · [EN](Prototype.html?lang=en#S04) · [JA](Prototype.html?lang=ja#S04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sơ đồ / kế hoạch | Building A / Floor 05 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bản sửa đổi | 13 draft | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lối thoát | 2 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điểm chờ hỗ trợ | Zone B | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lớp nguy cơ | Operator controlled | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S05 với payload/version hợp lệ, bị chặn khi guard của WF-02 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Site admin

**Câu hỏi chính:** Trong “Biên tập sơ đồ tầng”, Sơ đồ / kế hoạch, Bản sửa đổi cho biết điều gì và vai trò Site admin có thể thực hiện “Review plan publication” trong phạm vi này không?

**Hình chính:** Khung mặt bằng có lối ra, nơi lánh nạn và khác biệt phiên bản

**Hành động chính:** Xem công bố mặt bằng → S05

**Mở dần chi tiết:** Giữ Sơ đồ / kế hoạch, Bản sửa đổi ở lớp quyết định. Đưa chi tiết hỗ trợ của Lối thoát, Điểm chờ hỗ trợ, Lớp nguy cơ, lịch sử nguồn, phiên bản và quy tắc FR-S04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Biên tập sơ đồ tầng” cho Site admin; đổi Sơ đồ / kế hoạch và làm Lớp nguy cơ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review plan publication” chỉ tới S05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s05"></a>
## S05 — Phê duyệt và phiên bản sơ đồ

**EN:** Plan approval & versions · **JA:** 図面の承認と版管理  
**Yêu cầu:** FR-S05 / WF-02 · **Actor:** Supervisor · **Surface:** Sites · **Layout:** list

**Mục đích:** Keep published guidance traceable.  
**Quy tắc chính:** Vị trí và sơ đồ có phiên bản; bản mới phải được duyệt trước khi dùng.  
**Đầu vào:** S04, X06.  
**Đầu ra:** Publish reviewed draft — demo → S04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S05) · [EN](Prototype.html?lang=en#S05) · [JA](Prototype.html?lang=ja#S05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Revision 13 | Draft · accessibility review pending | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Revision 12 | Published · 2026-09-02 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Revision 11 | Archived | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S04 với payload/version hợp lệ, bị chặn khi guard của WF-02 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Supervisor

**Câu hỏi chính:** Trong “Phê duyệt và phiên bản sơ đồ”, Revision 13, Revision 12 cho biết điều gì và vai trò Supervisor có thể thực hiện “Publish reviewed draft — demo” trong phạm vi này không?

**Hình chính:** So sánh phiên bản mặt bằng với trạng thái công bố, nháp

**Hành động chính:** Công bố nháp đã duyệt · mô phỏng → S04

**Mở dần chi tiết:** Giữ Revision 13, Revision 12 ở lớp quyết định. Đưa chi tiết hỗ trợ của Revision 11, lịch sử nguồn, phiên bản và quy tắc FR-S05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phê duyệt và phiên bản sơ đồ” cho Supervisor; đổi Revision 13 và làm Revision 11 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Publish reviewed draft — demo” chỉ tới S04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s06"></a>
## S06 — Danh mục thiết bị

**EN:** Device inventory · **JA:** 機器一覧  
**Yêu cầu:** FR-S06 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** list

**Mục đích:** Know which devices can be trusted.  
**Quy tắc chính:** Thiết bị online không chứng minh khu vực an toàn hoặc chức năng vật lý tốt.  
**Đầu vào:** S10, X03.  
**Đầu ra:** Open device → S07.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S06) · [EN](Prototype.html?lang=en#S06) · [JA](Prototype.html?lang=ja#S06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| CAM-A05-03 | Camera · healthy | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SMK-A05-03 | Smoke sensor · healthy | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| GW-012 | Gateway · stale | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| WR-401 | Wearable · paired | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S07 với payload/version hợp lệ, bị chặn khi guard của WF-14 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Device admin

**Câu hỏi chính:** Trong “Danh mục thiết bị”, CAM-A05-03, SMK-A05-03 cho biết điều gì và vai trò Device admin có thể thực hiện “Open device” trong phạm vi này không?

**Hình chính:** Danh mục thiết bị theo chức năng vật lý và sức khỏe

**Hành động chính:** Mở thiết bị → S07

**Mở dần chi tiết:** Giữ CAM-A05-03, SMK-A05-03 ở lớp quyết định. Đưa chi tiết hỗ trợ của GW-012, WR-401, lịch sử nguồn, phiên bản và quy tắc FR-S06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Danh mục thiết bị” cho Device admin; đổi CAM-A05-03 và làm WR-401 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open device” chỉ tới S07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s07"></a>
## S07 — Chi tiết và sức khỏe thiết bị

**EN:** Device detail & health · **JA:** 機器の詳細と稼働状態  
**Yêu cầu:** FR-S07 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** detail

**Mục đích:** CAM-A05-03.  
**Quy tắc chính:** Thiết bị online không chứng minh khu vực an toàn hoặc chức năng vật lý tốt.  
**Đầu vào:** S06, S08.  
**Đầu ra:** Review device configuration → S08.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S07) · [EN](Prototype.html?lang=en#S07) · [JA](Prototype.html?lang=ja#S07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chứng thư | Valid · 48 days remaining | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Heartbeat gần nhất | 8 seconds ago | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Firmware | 3.2 · approved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Vị trí | Zone A05-03 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S08 với payload/version hợp lệ, bị chặn khi guard của WF-14 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S07 — Bố cục thị giác V2

**Context:** configuration · **Role:** Device admin

**Câu hỏi chính:** Trong “Chi tiết và sức khỏe thiết bị”, Chứng thư, Heartbeat gần nhất cho biết điều gì và vai trò Device admin có thể thực hiện “Review device configuration” trong phạm vi này không?

**Hình chính:** Sơ đồ thiết bị với bằng chứng nhịp sống, chứng chỉ, firmware

**Hành động chính:** Xem cấu hình thiết bị → S08

**Mở dần chi tiết:** Giữ Chứng thư, Heartbeat gần nhất ở lớp quyết định. Đưa chi tiết hỗ trợ của Firmware, Vị trí, lịch sử nguồn, phiên bản và quy tắc FR-S07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chi tiết và sức khỏe thiết bị” cho Device admin; đổi Chứng thư và làm Vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review device configuration” chỉ tới S08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s08"></a>
## S08 — Đăng ký thiết bị

**EN:** Provision device · **JA:** 機器の登録  
**Yêu cầu:** FR-S08 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** form

**Mục đích:** Bind a device to an authorized tenant.  
**Quy tắc chính:** Thiết bị online không chứng minh khu vực an toàn hoặc chức năng vật lý tốt.  
**Đầu vào:** S07.  
**Đầu ra:** Enroll simulated device → S07.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S08) · [EN](Prototype.html?lang=en#S08) · [JA](Prototype.html?lang=ja#S08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Số seri | CAM-009182 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Mã đăng ký | Single-use · masked | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Vị trí | Zone A05-03 | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Năng lực | Video + detection metadata | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S07 với payload/version hợp lệ, bị chặn khi guard của WF-14 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S08 — Bố cục thị giác V2

**Context:** configuration · **Role:** Device admin

**Câu hỏi chính:** Trong “Đăng ký thiết bị”, Số seri, Mã đăng ký cho biết điều gì và vai trò Device admin có thể thực hiện “Enroll simulated device” trong phạm vi này không?

**Hình chính:** Chuỗi đăng ký nối số máy, cơ sở và năng lực khai báo

**Hành động chính:** Đăng ký thiết bị mô phỏng → S07

**Mở dần chi tiết:** Giữ Số seri, Mã đăng ký ở lớp quyết định. Đưa chi tiết hỗ trợ của Vị trí, Năng lực, lịch sử nguồn, phiên bản và quy tắc FR-S08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đăng ký thiết bị” cho Device admin; đổi Số seri và làm Năng lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Enroll simulated device” chỉ tới S07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s09"></a>
## S09 — Giám sát camera

**EN:** Camera wall · **JA:** カメラ監視  
**Yêu cầu:** FR-S09 / WF-14 · **Actor:** Operator · **Surface:** Sites · **Layout:** evidence

**Mục đích:** Review selected camera sources.  
**Quy tắc chính:** Thiết bị online không chứng minh khu vực an toàn hoặc chức năng vật lý tốt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open detection evidence → O05.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S09) · [EN](Prototype.html?lang=en#S09) · [JA](Prototype.html?lang=ja#S09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| CAM-A05-01 | Lobby · online | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| CAM-A05-02 | West corridor · online | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| CAM-A05-03 | East corridor · stale frame | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Truy cập | Incident-scoped | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O05 với payload/version hợp lệ, bị chặn khi guard của WF-14 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S09 — Bố cục thị giác V2

**Context:** configuration · **Role:** Operator

**Câu hỏi chính:** Trong “Giám sát camera”, CAM-A05-01, CAM-A05-02 cho biết điều gì và vai trò Operator có thể thực hiện “Open detection evidence” trong phạm vi này không?

**Hình chính:** Ô camera có kiểm quyền, thời điểm và trạng thái mất nguồn

**Hành động chính:** Mở bằng chứng phát hiện → O05

**Mở dần chi tiết:** Giữ CAM-A05-01, CAM-A05-02 ở lớp quyết định. Đưa chi tiết hỗ trợ của CAM-A05-03, Truy cập, lịch sử nguồn, phiên bản và quy tắc FR-S09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Giám sát camera” cho Operator; đổi CAM-A05-01 và làm Truy cập không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open detection evidence” chỉ tới O05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s10"></a>
## S10 — Bảo trì và hiệu chuẩn

**EN:** Maintenance & calibration · **JA:** 保守と校正  
**Yêu cầu:** FR-S10 / WF-14 · **Actor:** Device admin · **Surface:** Sites · **Layout:** form

**Mục đích:** Keep suppression visible during maintenance.  
**Quy tắc chính:** Thiết bị online không chứng minh khu vực an toàn hoặc chức năng vật lý tốt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Schedule maintenance → S06.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S10) · [EN](Prototype.html?lang=en#S10) · [JA](Prototype.html?lang=ja#S10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Thiết bị | SMK-A05-03 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Khoảng thời gian | 14:00–14:30 local | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |
| Bao phủ thay thế | Patrol confirmed | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Người duyệt | Site supervisor | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S06 với payload/version hợp lệ, bị chặn khi guard của WF-14 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S10 — Bố cục thị giác V2

**Context:** configuration · **Role:** Device admin

**Câu hỏi chính:** Trong “Bảo trì và hiệu chuẩn”, Thiết bị, Khoảng thời gian cho biết điều gì và vai trò Device admin có thể thực hiện “Schedule maintenance” trong phạm vi này không?

**Hình chính:** Cửa sổ bảo trì cạnh bản đồ phủ dự phòng

**Hành động chính:** Lên lịch bảo trì → S06

**Mở dần chi tiết:** Giữ Thiết bị, Khoảng thời gian ở lớp quyết định. Đưa chi tiết hỗ trợ của Bao phủ thay thế, Người duyệt, lịch sử nguồn, phiên bản và quy tắc FR-S10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bảo trì và hiệu chuẩn” cho Device admin; đổi Thiết bị và làm Người duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Schedule maintenance” chỉ tới S06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s11"></a>
## S11 — Thư viện quy tắc

**EN:** Rule library · **JA:** ルール一覧  
**Yêu cầu:** FR-S11 / WF-04 · **Actor:** Rule author · **Surface:** Sites · **Layout:** list

**Mục đích:** Detection policies by hazard and site.  
**Quy tắc chính:** Bằng chứng phát hiện chưa đồng nghĩa sự cố đã được xác minh.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Edit rule → S12.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S11) · [EN](Prototype.html?lang=en#S11) · [JA](Prototype.html?lang=ja#S11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Fire rule v4 | Published | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Fall rule v2 | Published | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Road collision v1 | Draft | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Flood threshold v3 | Published | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S12 với payload/version hợp lệ, bị chặn khi guard của WF-04 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S11 — Bố cục thị giác V2

**Context:** configuration · **Role:** Rule author

**Câu hỏi chính:** Trong “Thư viện quy tắc”, Fire rule v4, Fall rule v2 cho biết điều gì và vai trò Rule author có thể thực hiện “Edit rule” trong phạm vi này không?

**Hình chính:** Danh sách quy tắc có phiên bản, loại nguy cơ và phạm vi

**Hành động chính:** Sửa quy tắc → S12

**Mở dần chi tiết:** Giữ Fire rule v4, Fall rule v2 ở lớp quyết định. Đưa chi tiết hỗ trợ của Road collision v1, Flood threshold v3, lịch sử nguồn, phiên bản và quy tắc FR-S11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thư viện quy tắc” cho Rule author; đổi Fire rule v4 và làm Flood threshold v3 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit rule” chỉ tới S12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s12"></a>
## S12 — Biên tập và mô phỏng quy tắc

**EN:** Rule editor & simulation · **JA:** ルール編集とシミュレーション  
**Yêu cầu:** FR-S12 / WF-04 · **Actor:** Rule author · **Surface:** Sites · **Layout:** form

**Mục đích:** Test a rule against recorded events.  
**Quy tắc chính:** Bằng chứng phát hiện chưa đồng nghĩa sự cố đã được xác minh.  
**Đầu vào:** S11, S13.  
**Đầu ra:** View simulation results → S13.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S12) · [EN](Prototype.html?lang=en#S12) · [JA](Prototype.html?lang=ja#S12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Quy tắc | Fire corroboration | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tình trạng | Camera event + smoke event | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Khoảng thời gian | 60 seconds | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |
| Hành động | Create P1 incident | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chế độ | Simulation | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S13 với payload/version hợp lệ, bị chặn khi guard của WF-04 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S12 — Bố cục thị giác V2

**Context:** configuration · **Role:** Rule author

**Câu hỏi chính:** Trong “Biên tập và mô phỏng quy tắc”, Quy tắc, Tình trạng cho biết điều gì và vai trò Rule author có thể thực hiện “View simulation results” trong phạm vi này không?

**Hình chính:** Luồng điều kiện, hành động cạnh nhãn chỉ mô phỏng

**Hành động chính:** Xem kết quả mô phỏng → S13

**Mở dần chi tiết:** Giữ Quy tắc, Tình trạng ở lớp quyết định. Đưa chi tiết hỗ trợ của Khoảng thời gian, Hành động, Chế độ, lịch sử nguồn, phiên bản và quy tắc FR-S12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Biên tập và mô phỏng quy tắc” cho Rule author; đổi Quy tắc và làm Chế độ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “View simulation results” chỉ tới S13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s13"></a>
## S13 — Kiểm thử và duyệt quy tắc

**EN:** Rule test & approval · **JA:** ルールのテストと承認  
**Yêu cầu:** FR-S13 / WF-04 · **Actor:** Rule approver · **Surface:** Sites · **Layout:** detail

**Mục đích:** Review behavioral changes before release.  
**Quy tắc chính:** Bằng chứng phát hiện chưa đồng nghĩa sự cố đã được xác minh.  
**Đầu vào:** S12.  
**Đầu ra:** Return rule for changes → S12.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S13) · [EN](Prototype.html?lang=en#S13) · [JA](Prototype.html?lang=ja#S13)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ca thử | 24 passed · 2 need review | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Gộp nhầm | 0 in test set | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phiên bản | 5 draft | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người kiểm tra | Independent supervisor | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S13:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S12 với payload/version hợp lệ, bị chặn khi guard của WF-04 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S13 — Bố cục thị giác V2

**Context:** configuration · **Role:** Rule approver

**Câu hỏi chính:** Trong “Kiểm thử và duyệt quy tắc”, Ca thử, Gộp nhầm cho biết điều gì và vai trò Rule approver có thể thực hiện “Return rule for changes” trong phạm vi này không?

**Hình chính:** Lưới kết quả ca thử có bằng chứng gộp sai

**Hành động chính:** Trả quy tắc để sửa → S12

**Mở dần chi tiết:** Giữ Ca thử, Gộp nhầm ở lớp quyết định. Đưa chi tiết hỗ trợ của Phiên bản, Người kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-S13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm thử và duyệt quy tắc” cho Rule approver; đổi Ca thử và làm Người kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Return rule for changes” chỉ tới S12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s14"></a>
## S14 — Giám sát mô hình AI

**EN:** AI model monitoring · **JA:** AIモデルの監視  
**Yêu cầu:** FR-S14 / WF-04 · **Actor:** Model operator · **Surface:** Sites · **Layout:** detail

**Mục đích:** Track detector behavior by site.  
**Quy tắc chính:** Bằng chứng phát hiện chưa đồng nghĩa sự cố đã được xác minh.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open review queue → O03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S14) · [EN](Prototype.html?lang=en#S14) · [JA](Prototype.html?lang=ja#S14)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Mô hình | Flame v3 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mẫu được gán nhãn | 120 events | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kiểm tra báo nhầm | 8 cases | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sai lệch dữ liệu | Lighting shift detected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S14:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O03 với payload/version hợp lệ, bị chặn khi guard của WF-04 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S14 — Bố cục thị giác V2

**Context:** configuration · **Role:** Model operator

**Câu hỏi chính:** Trong “Giám sát mô hình AI”, Mô hình, Mẫu được gán nhãn cho biết điều gì và vai trò Model operator có thể thực hiện “Open review queue” trong phạm vi này không?

**Hình chính:** Xu hướng chất lượng mô hình có nguồn mẫu và sai lệch

**Hành động chính:** Mở hàng đợi đánh giá → O03

**Mở dần chi tiết:** Giữ Mô hình, Mẫu được gán nhãn ở lớp quyết định. Đưa chi tiết hỗ trợ của Kiểm tra báo nhầm, Sai lệch dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-S14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Giám sát mô hình AI” cho Model operator; đổi Mô hình và làm Sai lệch dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open review queue” chỉ tới O03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i01"></a>
## I01 — Danh mục kết nối

**EN:** Connector catalog · **JA:** コネクター一覧  
**Yêu cầu:** FR-I01 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** cards

**Mục đích:** Connect systems through declared capabilities.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** D06.  
**Đầu ra:** Configure connector → I02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I01) · [EN](Prototype.html?lang=en#I01) · [JA](Prototype.html?lang=ja#I01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| MQTT sensors | Telemetry | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| CAP authority | Public warning | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| MAVLink gateway | Drone telemetry | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| IOC bridge | Incident exchange | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I02 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration admin

**Câu hỏi chính:** Trong “Danh mục kết nối”, MQTT sensors, CAP authority cho biết điều gì và vai trò Integration admin có thể thực hiện “Configure connector” trong phạm vi này không?

**Hình chính:** Danh mục kết nối theo năng lực sự kiện, khuyến cáo, điều khiển

**Hành động chính:** Cấu hình kết nối → I02

**Mở dần chi tiết:** Giữ MQTT sensors, CAP authority ở lớp quyết định. Đưa chi tiết hỗ trợ của MAVLink gateway, IOC bridge, lịch sử nguồn, phiên bản và quy tắc FR-I01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Danh mục kết nối” cho Integration admin; đổi MQTT sensors và làm IOC bridge không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Configure connector” chỉ tới I02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i02"></a>
## I02 — Thiết lập kết nối

**EN:** Connector setup · **JA:** コネクターの設定  
**Yêu cầu:** FR-I02 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Mục đích:** Create a scoped connection.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** I01.  
**Đầu ra:** Test connection → I03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I02) · [EN](Prototype.html?lang=en#I02) · [JA](Prototype.html?lang=ja#I02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Loại | MQTT 5 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Địa chỉ kết nối | mqtts://broker.example.test | HTTPS/mTLS profile; allowlist host, chặn loopback/private SSRF theo connector policy. |
| Vùng dữ liệu | EU | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Xác thực | mTLS | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Năng lực | telemetry.read | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I03 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration admin

**Câu hỏi chính:** Trong “Thiết lập kết nối”, Loại, Địa chỉ kết nối cho biết điều gì và vai trò Integration admin có thể thực hiện “Test connection” trong phạm vi này không?

**Hình chính:** Luồng cấu hình nối điểm cuối, vùng và năng lực

**Hành động chính:** Thử kết nối → I03

**Mở dần chi tiết:** Giữ Loại, Địa chỉ kết nối ở lớp quyết định. Đưa chi tiết hỗ trợ của Vùng dữ liệu, Xác thực, Năng lực, lịch sử nguồn, phiên bản và quy tắc FR-I02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thiết lập kết nối” cho Integration admin; đổi Loại và làm Năng lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Test connection” chỉ tới I03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i03"></a>
## I03 — Ánh xạ dữ liệu

**EN:** Schema mapping · **JA:** データマッピング  
**Yêu cầu:** FR-I03 / WF-03 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Mục đích:** Map source data into a versioned event.  
**Quy tắc chính:** Giữ nguồn, thời điểm và ID; sự kiện trùng không tạo tác động mới.  
**Đầu vào:** I02.  
**Đầu ra:** Run contract tests → I04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I03) · [EN](Prototype.html?lang=en#I03) · [JA](Prototype.html?lang=ja#I03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Trường nguồn | temperature_c | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Đích | data.measurement.value | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Đơn vị | Cel | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vị trí | device registry binding | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Trường chưa biết | Quarantine | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I04 với payload/version hợp lệ, bị chặn khi guard của WF-03 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration admin

**Câu hỏi chính:** Trong “Ánh xạ dữ liệu”, Trường nguồn, Đích cho biết điều gì và vai trò Integration admin có thể thực hiện “Run contract tests” trong phạm vi này không?

**Hình chính:** Ánh xạ nguồn, đích có đơn vị và làn trường chưa rõ

**Hành động chính:** Chạy thử hợp đồng → I04

**Mở dần chi tiết:** Giữ Trường nguồn, Đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Đơn vị, Vị trí, Trường chưa biết, lịch sử nguồn, phiên bản và quy tắc FR-I03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ánh xạ dữ liệu” cho Integration admin; đổi Trường nguồn và làm Trường chưa biết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Run contract tests” chỉ tới I04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i04"></a>
## I04 — Kiểm thử kết nối

**EN:** Connector test console · **JA:** 接続テスト  
**Yêu cầu:** FR-I04 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** detail

**Mục đích:** Prove behavior before enabling traffic.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** I03, I08, I10.  
**Đầu ra:** Enable demo connector → I05.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I04) · [EN](Prototype.html?lang=en#I04) · [JA](Prototype.html?lang=ja#I04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sự kiện hợp lệ | Accepted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sự kiện trùng | Deduplicated | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sai tổ chức | Rejected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chứng thư hết hạn | Rejected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I05 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration admin

**Câu hỏi chính:** Trong “Kiểm thử kết nối”, Sự kiện hợp lệ, Sự kiện trùng cho biết điều gì và vai trò Integration admin có thể thực hiện “Enable demo connector” trong phạm vi này không?

**Hình chính:** Ma trận thử hợp đồng tách mẫu được nhận và bị từ chối

**Hành động chính:** Bật kết nối · mô phỏng → I05

**Mở dần chi tiết:** Giữ Sự kiện hợp lệ, Sự kiện trùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Sai tổ chức, Chứng thư hết hạn, lịch sử nguồn, phiên bản và quy tắc FR-I04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm thử kết nối” cho Integration admin; đổi Sự kiện hợp lệ và làm Chứng thư hết hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Enable demo connector” chỉ tới I05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i05"></a>
## I05 — Sức khỏe các kết nối

**EN:** Connector health · **JA:** 接続の稼働状態  
**Yêu cầu:** FR-I05 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** list

**Mục đích:** Monitor transport and processing separately.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** I04, I06.  
**Đầu ra:** Inspect dead letters → I06.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I05) · [EN](Prototype.html?lang=en#I05) · [JA](Prototype.html?lang=ja#I05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| MQTT bridge | Connected · 0 queue lag | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| IOC bridge | Degraded · retrying | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| CAP feed | Healthy · last poll 30 s | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Drone bridge | Telemetry only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I06 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration admin

**Câu hỏi chính:** Trong “Sức khỏe các kết nối”, MQTT bridge, IOC bridge cho biết điều gì và vai trò Integration admin có thể thực hiện “Inspect dead letters” trong phạm vi này không?

**Hình chính:** Làn sức khỏe kết nối có trễ, lỗi và tuổi dữ liệu

**Hành động chính:** Kiểm tra thư lỗi → I06

**Mở dần chi tiết:** Giữ MQTT bridge, IOC bridge ở lớp quyết định. Đưa chi tiết hỗ trợ của CAP feed, Drone bridge, lịch sử nguồn, phiên bản và quy tắc FR-I05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Sức khỏe các kết nối” cho Integration admin; đổi MQTT bridge và làm Drone bridge không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect dead letters” chỉ tới I06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i06"></a>
## I06 — Xử lý lỗi và phát lại sự kiện

**EN:** Dead-letter & replay · **JA:** 失敗イベントと再処理  
**Yêu cầu:** FR-I06 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Mục đích:** Replay only after inspecting the failure.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** I05.  
**Đầu ra:** Replay simulated event → I05.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I06) · [EN](Prototype.html?lang=en#I06) · [JA](Prototype.html?lang=ja#I06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sự kiện | EV-3090 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lỗi | Unknown location mapping | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hiệu chỉnh | Bind device to zone | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phát lại | Preserve original event ID | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I05 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration admin

**Câu hỏi chính:** Trong “Xử lý lỗi và phát lại sự kiện”, Sự kiện, Lỗi cho biết điều gì và vai trò Integration admin có thể thực hiện “Replay simulated event” trong phạm vi này không?

**Hình chính:** Đối chiếu payload lỗi và điều kiện phát lại

**Hành động chính:** Phát lại sự kiện mô phỏng → I05

**Mở dần chi tiết:** Giữ Sự kiện, Lỗi ở lớp quyết định. Đưa chi tiết hỗ trợ của Hiệu chỉnh, Phát lại, lịch sử nguồn, phiên bản và quy tắc FR-I06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xử lý lỗi và phát lại sự kiện” cho Integration admin; đổi Sự kiện và làm Phát lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Replay simulated event” chỉ tới I05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i07"></a>
## I07 — API client và phạm vi quyền

**EN:** API clients & scopes · **JA:** APIクライアントと権限  
**Yêu cầu:** FR-I07 / WF-17 · **Actor:** Tenant admin · **Surface:** Integrations · **Layout:** form

**Mục đích:** Grant only required API access.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** D08.  
**Đầu ra:** Save client → I08.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I07) · [EN](Prototype.html?lang=en#I07) · [JA](Prototype.html?lang=ja#I07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ứng dụng kết nối | Partner IOC | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phạm vi quyền | incident.read + incident.ack | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Vùng dữ liệu | EU | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Thông tin bí mật | Stored in vault · not shown | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Hết hạn | 90 days | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I08 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I07 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “API client và phạm vi quyền”, Ứng dụng kết nối, Phạm vi quyền cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save client” trong phạm vi này không?

**Hình chính:** Lưới phạm vi API với thông tin bí mật che và hết hạn

**Hành động chính:** Lưu client → I08

**Mở dần chi tiết:** Giữ Ứng dụng kết nối, Phạm vi quyền ở lớp quyết định. Đưa chi tiết hỗ trợ của Vùng dữ liệu, Thông tin bí mật, Hết hạn, lịch sử nguồn, phiên bản và quy tắc FR-I07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “API client và phạm vi quyền” cho Tenant admin; đổi Ứng dụng kết nối và làm Hết hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save client” chỉ tới I08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i08"></a>
## I08 — Đăng ký webhook

**EN:** Webhook subscriptions · **JA:** Webhookの登録  
**Yêu cầu:** FR-I08 / WF-17 · **Actor:** Integration admin · **Surface:** Integrations · **Layout:** form

**Mục đích:** Deliver filtered incident updates.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** I07, D07.  
**Đầu ra:** Send test payload → I04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I08) · [EN](Prototype.html?lang=en#I08) · [JA](Prototype.html?lang=ja#I08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| URL | https://partner.example.test/hooks | HTTPS/mTLS profile; allowlist host, chặn loopback/private SSRF theo connector policy. |
| Sự kiện | incident.updated | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chữ ký | HMAC + timestamp | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thử lại | Exponential · max 24 h | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I04 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I08 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration admin

**Câu hỏi chính:** Trong “Đăng ký webhook”, URL, Sự kiện cho biết điều gì và vai trò Integration admin có thể thực hiện “Send test payload” trong phạm vi này không?

**Hình chính:** Sơ đồ webhook có chữ ký và chính sách thử lại

**Hành động chính:** Gửi payload thử → I04

**Mở dần chi tiết:** Giữ URL, Sự kiện ở lớp quyết định. Đưa chi tiết hỗ trợ của Chữ ký, Thử lại, lịch sử nguồn, phiên bản và quy tắc FR-I08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đăng ký webhook” cho Integration admin; đổi URL và làm Thử lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Send test payload” chỉ tới I04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i09"></a>
## I09 — Thỏa thuận trao đổi dữ liệu

**EN:** Partner exchange agreements · **JA:** データ共有契約  
**Yêu cầu:** FR-I09 / WF-17 · **Actor:** Tenant admin · **Surface:** Integrations · **Layout:** form

**Mục đích:** Define cross-organization sharing.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save agreement draft → I10.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I09) · [EN](Prototype.html?lang=en#I09) · [JA](Prototype.html?lang=ja#I09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Đối tác | City command | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Mục đích | Incident response | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Trường dữ liệu | Location + pseudonymous SOS | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thời gian lưu | 30 days | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phê duyệt | Both organizations required | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I10 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I09 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Thỏa thuận trao đổi dữ liệu”, Đối tác, Mục đích cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save agreement draft” trong phạm vi này không?

**Hình chính:** Ranh giới chia sẻ đối tác với lưu giữ và trạng thái duyệt

**Hành động chính:** Lưu nháp thỏa thuận → I10

**Mở dần chi tiết:** Giữ Đối tác, Mục đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Trường dữ liệu, Thời gian lưu, Phê duyệt, lịch sử nguồn, phiên bản và quy tắc FR-I09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thỏa thuận trao đổi dữ liệu” cho Tenant admin; đổi Đối tác và làm Phê duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save agreement draft” chỉ tới I10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i10"></a>
## I10 — Lịch sử trao đổi IOC

**EN:** IOC exchange history · **JA:** IOC連携履歴  
**Yêu cầu:** FR-I10 / WF-17 · **Actor:** Operator · **Surface:** Integrations · **Layout:** list

**Mục đích:** Verify what a partner actually received.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** I09, O33.  
**Đầu ra:** Inspect payload → I04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I10) · [EN](Prototype.html?lang=en#I10) · [JA](Prototype.html?lang=ja#I10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| INC-2041 | Sent · application ACK received | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS-041 | Sent · ACK pending | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Update 4 | Rejected · schema mismatch | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I04 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I10 — Bố cục thị giác V2

**Context:** configuration · **Role:** Operator

**Câu hỏi chính:** Trong “Lịch sử trao đổi IOC”, INC-2041, SOS-041 cho biết điều gì và vai trò Operator có thể thực hiện “Inspect payload” trong phạm vi này không?

**Hình chính:** Dòng trao đổi có phạm vi payload và mã biên nhận

**Hành động chính:** Kiểm tra payload → I04

**Mở dần chi tiết:** Giữ INC-2041, SOS-041 ở lớp quyết định. Đưa chi tiết hỗ trợ của Update 4, lịch sử nguồn, phiên bản và quy tắc FR-I10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lịch sử trao đổi IOC” cho Operator; đổi INC-2041 và làm Update 4 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Inspect payload” chỉ tới I04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i11"></a>
## I11 — Đội drone

**EN:** Drone fleet · **JA:** ドローン一覧  
**Yêu cầu:** FR-I11 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** cards

**Mục đích:** Mission readiness at a glance.  
**Quy tắc chính:** Phi công và bộ điều khiển cục bộ giữ quyền quyết định vận hành.  
**Đầu vào:** I15.  
**Đầu ra:** Plan mission → I12.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I11) · [EN](Prototype.html?lang=en#I11) · [JA](Prototype.html?lang=ja#I11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| DR-01 | Ready · battery 92% | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| DR-02 | Maintenance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| DR-03 | Offline | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điều khiển | Certified local operator | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I12 với payload/version hợp lệ, bị chặn khi guard của WF-16 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I11 — Bố cục thị giác V2

**Context:** configuration · **Role:** Drone operator

**Câu hỏi chính:** Trong “Đội drone”, DR-01, DR-02 cho biết điều gì và vai trò Drone operator có thể thực hiện “Plan mission” trong phạm vi này không?

**Hình chính:** Thẻ sẵn sàng đội bay có pin, khả dụng và quyền phi công

**Hành động chính:** Lập nhiệm vụ → I12

**Mở dần chi tiết:** Giữ DR-01, DR-02 ở lớp quyết định. Đưa chi tiết hỗ trợ của DR-03, Điều khiển, lịch sử nguồn, phiên bản và quy tắc FR-I11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đội drone” cho Drone operator; đổi DR-01 và làm Điều khiển không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Plan mission” chỉ tới I12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i12"></a>
## I12 — Lập nhiệm vụ drone

**EN:** Drone mission planning · **JA:** ドローン任務の計画  
**Yêu cầu:** FR-I12 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** map

**Mục đích:** Observe the perimeter of Building A.  
**Quy tắc chính:** Phi công và bộ điều khiển cục bộ giữ quyền quyết định vận hành.  
**Đầu vào:** I11.  
**Đầu ra:** Review mission approval → I13.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I12) · [EN](Prototype.html?lang=en#I12) · [JA](Prototype.html?lang=ja#I12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Mục đích | Situation assessment | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ranh giới địa lý | Campus perimeter | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phi công | Assigned | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thời tiết | Requires local verification | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thẩm quyền | Pending clearance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I13 với payload/version hợp lệ, bị chặn khi guard của WF-16 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I12 — Bố cục thị giác V2

**Context:** configuration · **Role:** Drone operator

**Câu hỏi chính:** Trong “Lập nhiệm vụ drone”, Mục đích, Ranh giới địa lý cho biết điều gì và vai trò Drone operator có thể thực hiện “Review mission approval” trong phạm vi này không?

**Hình chính:** Rào địa lý nhiệm vụ với phi công, thời tiết và thẩm quyền

**Hành động chính:** Xem duyệt nhiệm vụ → I13

**Mở dần chi tiết:** Giữ Mục đích, Ranh giới địa lý ở lớp quyết định. Đưa chi tiết hỗ trợ của Phi công, Thời tiết, Thẩm quyền, lịch sử nguồn, phiên bản và quy tắc FR-I12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lập nhiệm vụ drone” cho Drone operator; đổi Mục đích và làm Thẩm quyền không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review mission approval” chỉ tới I13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i13"></a>
## I13 — Kiểm tra trước bay và phê duyệt

**EN:** Drone preflight & approval · **JA:** 飛行前確認と承認  
**Yêu cầu:** FR-I13 / WF-16 · **Actor:** Drone supervisor · **Surface:** Integrations · **Layout:** form

**Mục đích:** Local authority remains with the pilot.  
**Quy tắc chính:** Phi công và bộ điều khiển cục bộ giữ quyền quyết định vận hành.  
**Đầu vào:** I12, P07.  
**Đầu ra:** Approve simulated mission → I14.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I13) · [EN](Prototype.html?lang=en#I13) · [JA](Prototype.html?lang=ja#I13)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phi công | Verified role | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Pin | 92% | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ranh giới địa lý | Validated | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Cho phép hoạt động | Evidence attached | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phương án mất liên lạc | Local controller policy | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I13:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I14 với payload/version hợp lệ, bị chặn khi guard của WF-16 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I13 — Bố cục thị giác V2

**Context:** configuration · **Role:** Drone supervisor

**Câu hỏi chính:** Trong “Kiểm tra trước bay và phê duyệt”, Phi công, Pin cho biết điều gì và vai trò Drone supervisor có thể thực hiện “Approve simulated mission” trong phạm vi này không?

**Hình chính:** Cổng trước bay có kế hoạch mất nối và duyệt phi công

**Hành động chính:** Duyệt nhiệm vụ mô phỏng → I14

**Mở dần chi tiết:** Giữ Phi công, Pin ở lớp quyết định. Đưa chi tiết hỗ trợ của Ranh giới địa lý, Cho phép hoạt động, Phương án mất liên lạc, lịch sử nguồn, phiên bản và quy tắc FR-I13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm tra trước bay và phê duyệt” cho Drone supervisor; đổi Phi công và làm Phương án mất liên lạc không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve simulated mission” chỉ tới I14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i14"></a>
## I14 — Theo dõi nhiệm vụ drone

**EN:** Drone mission telemetry · **JA:** ドローン任務の監視  
**Yêu cầu:** FR-I14 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** map

**Mục đích:** DR-01 · observation mission.  
**Quy tắc chính:** Phi công và bộ điều khiển cục bộ giữ quyền quyết định vận hành.  
**Đầu vào:** I13.  
**Đầu ra:** Review mission record → I15.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I14) · [EN](Prototype.html?lang=en#I14) · [JA](Prototype.html?lang=ja#I14)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Trạng thái bay | Simulated · in progress | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ cao | 30 m AGL | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Pin | 86% | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ cũ telemetry | 2 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điều hành | Accepted · completion unconfirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I14:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I15 với payload/version hợp lệ, bị chặn khi guard của WF-16 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I14 — Bố cục thị giác V2

**Context:** command · **Role:** Drone operator

**Câu hỏi chính:** Trong “Theo dõi nhiệm vụ drone”, Trạng thái bay, Độ cao cho biết điều gì và vai trò Drone operator có thể thực hiện “Review mission record” trong phạm vi này không?

**Hình chính:** Dải đo xa có cảnh báo cũ và chủ quyền điều khiển cục bộ

**Hành động chính:** Xem hồ sơ nhiệm vụ → I15

**Mở dần chi tiết:** Giữ Trạng thái bay, Độ cao ở lớp quyết định. Đưa chi tiết hỗ trợ của Pin, Độ cũ telemetry, Điều hành, lịch sử nguồn, phiên bản và quy tắc FR-I14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Theo dõi nhiệm vụ drone” cho Drone operator; đổi Trạng thái bay và làm Điều hành không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review mission record” chỉ tới I15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="i15"></a>
## I15 — Hồ sơ nhiệm vụ drone

**EN:** Drone mission record · **JA:** ドローン任務の記録  
**Yêu cầu:** FR-I15 / WF-16 · **Actor:** Drone operator · **Surface:** Integrations · **Layout:** detail

**Mục đích:** Preserve mission evidence.  
**Quy tắc chính:** Phi công và bộ điều khiển cục bộ giữ quyền quyết định vận hành.  
**Đầu vào:** I14.  
**Đầu ra:** Return to fleet → I11.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#I15) · [EN](Prototype.html?lang=en#I15) · [JA](Prototype.html?lang=ja#I15)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nhiệm vụ bay | MS-0041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sự cố | INC-2041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nhật ký bay | Stored in regional evidence vault | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kết quả | Observation complete | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phi công | Signed off | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-I15:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I11 với payload/version hợp lệ, bị chặn khi guard của WF-16 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### I15 — Bố cục thị giác V2

**Context:** configuration · **Role:** Drone operator

**Câu hỏi chính:** Trong “Hồ sơ nhiệm vụ drone”, Nhiệm vụ bay, Sự cố cho biết điều gì và vai trò Drone operator có thể thực hiện “Return to fleet” trong phạm vi này không?

**Hình chính:** Dòng bằng chứng nhiệm vụ có nhật ký bay và phi công

**Hành động chính:** Về đội bay → I11

**Mở dần chi tiết:** Giữ Nhiệm vụ bay, Sự cố ở lớp quyết định. Đưa chi tiết hỗ trợ của Nhật ký bay, Kết quả, Phi công, lịch sử nguồn, phiên bản và quy tắc FR-I15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ coi xác nhận truyền tải là bằng chứng truyền tải; hiện payload bị từ chối và đo xa cũ, không báo điều khiển thành công suy đoán.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ nhiệm vụ drone” cho Drone operator; đổi Nhiệm vụ bay và làm Phi công không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Return to fleet” chỉ tới I11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t01"></a>
## T01 — Tổng quan tổ chức

**EN:** Tenant overview · **JA:** 組織の概要  
**Yêu cầu:** FR-T01 / WF-20 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** dashboard

**Mục đích:** Operate across regions with clear boundaries.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T02, T05.  
**Đầu ra:** Manage organization → T02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T01) · [EN](Prototype.html?lang=en#T01) · [JA](Prototype.html?lang=ja#T01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vùng dữ liệu | EU | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Địa điểm | 24 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thiết bị theo gói | 480 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sức khỏe vận hành | Degraded connector | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T02 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Tổng quan tổ chức”, Vùng dữ liệu, Địa điểm cho biết điều gì và vai trò Tenant admin có thể thực hiện “Manage organization” trong phạm vi này không?

**Hình chính:** Tóm tắt sức khỏe tổ chức với vùng và phân bổ năng lực

**Hành động chính:** Quản lý tổ chức → T02

**Mở dần chi tiết:** Giữ Vùng dữ liệu, Địa điểm ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị theo gói, Sức khỏe vận hành, lịch sử nguồn, phiên bản và quy tắc FR-T01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tổng quan tổ chức” cho Tenant admin; đổi Vùng dữ liệu và làm Sức khỏe vận hành không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Manage organization” chỉ tới T02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t02"></a>
## T02 — Tổ chức và vùng dữ liệu

**EN:** Organization & regions · **JA:** 組織とデータ地域  
**Yêu cầu:** FR-T02 / WF-18 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** form

**Mục đích:** Choose residency and local defaults.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** T01.  
**Đầu ra:** Save settings → T01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T02) · [EN](Prototype.html?lang=en#T02) · [JA](Prototype.html?lang=ja#T02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tổ chức | Northstar | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vùng chính | EU | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Ngôn ngữ / vùng | en-GB | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Múi giờ | Europe/Berlin | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chuyển dữ liệu liên vùng | Disabled | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T01 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Tổ chức và vùng dữ liệu”, Tổ chức, Vùng chính cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save settings” trong phạm vi này không?

**Hình chính:** Ranh giới vùng tổ chức cạnh ngôn ngữ và múi giờ

**Hành động chính:** Lưu cấu hình → T01

**Mở dần chi tiết:** Giữ Tổ chức, Vùng chính ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ / vùng, Múi giờ, Chuyển dữ liệu liên vùng, lịch sử nguồn, phiên bản và quy tắc FR-T02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tổ chức và vùng dữ liệu” cho Tenant admin; đổi Tổ chức và làm Chuyển dữ liệu liên vùng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save settings” chỉ tới T01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t03"></a>
## T03 — Người dùng và lời mời

**EN:** Users & invitations · **JA:** ユーザーと招待  
**Yêu cầu:** FR-T03 / WF-01 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** list

**Mục đích:** Review access across the organization.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** T04.  
**Đầu ra:** Edit membership → T04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T03) · [EN](Prototype.html?lang=en#T03) · [JA](Prototype.html?lang=ja#T03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Alex | Operator · active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Jamie | Responder · active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | Invite pending | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Service client | IOC · scoped | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T04 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Người dùng và lời mời”, Alex, Jamie cho biết điều gì và vai trò Tenant admin có thể thực hiện “Edit membership” trong phạm vi này không?

**Hình chính:** Danh sách thành viên có vòng đời lời mời và vai trò

**Hành động chính:** Sửa thành viên → T04

**Mở dần chi tiết:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Service client, lịch sử nguồn, phiên bản và quy tắc FR-T03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Người dùng và lời mời” cho Tenant admin; đổi Alex và làm Service client không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit membership” chỉ tới T04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t04"></a>
## T04 — Vai trò và phạm vi quyền

**EN:** Role & scope editor · **JA:** ロールと権限範囲  
**Yêu cầu:** FR-T04 / WF-01 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** form

**Mục đích:** Separate operational duties.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** T03.  
**Đầu ra:** Save role → T03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T04) · [EN](Prototype.html?lang=en#T04) · [JA](Prototype.html?lang=ja#T04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vai trò | Warning approver | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Địa điểm | Harbor Campus | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Quyền | warning.approve | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Giới hạn | Cannot approve own draft | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T03 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Vai trò và phạm vi quyền”, Vai trò, Địa điểm cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save role” trong phạm vi này không?

**Hình chính:** Ma trận quyền theo cơ sở có năng lực bị cấm rõ

**Hành động chính:** Lưu vai trò → T03

**Mở dần chi tiết:** Giữ Vai trò, Địa điểm ở lớp quyết định. Đưa chi tiết hỗ trợ của Quyền, Giới hạn, lịch sử nguồn, phiên bản và quy tắc FR-T04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Vai trò và phạm vi quyền” cho Tenant admin; đổi Vai trò và làm Giới hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save role” chỉ tới T03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t05"></a>
## T05 — Lịch trực và chuyển cấp

**EN:** On-call & escalation · **JA:** 当番とエスカレーション  
**Yêu cầu:** FR-T05 / WF-10 · **Actor:** Supervisor · **Surface:** Administration · **Layout:** form

**Mục đích:** Escalate when acknowledgment is missing.  
**Quy tắc chính:** Đã gửi không có nghĩa đã nhận, đã đọc hoặc đã có người phản hồi.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save escalation → T01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T05) · [EN](Prototype.html?lang=en#T05) · [JA](Prototype.html?lang=ja#T05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chính | Campus duty operator | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| After 60 seconds | Shift supervisor | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| After 120 seconds | Regional backup | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lịch | Europe/Berlin | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T01 với payload/version hợp lệ, bị chặn khi guard của WF-10 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Supervisor

**Câu hỏi chính:** Trong “Lịch trực và chuyển cấp”, Chính, After 60 seconds cho biết điều gì và vai trò Supervisor có thể thực hiện “Save escalation” trong phạm vi này không?

**Hình chính:** Thang tăng cấp có thời điểm đổi người và độ phủ lịch

**Hành động chính:** Lưu tăng cấp → T01

**Mở dần chi tiết:** Giữ Chính, After 60 seconds ở lớp quyết định. Đưa chi tiết hỗ trợ của After 120 seconds, Lịch, lịch sử nguồn, phiên bản và quy tắc FR-T05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lịch trực và chuyển cấp” cho Supervisor; đổi Chính và làm Lịch không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save escalation” chỉ tới T01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t06"></a>
## T06 — Mẫu nội dung và ngôn ngữ

**EN:** Message templates & languages · **JA:** メッセージと言語  
**Yêu cầu:** FR-T06 / WF-09 · **Actor:** Content editor · **Surface:** Administration · **Layout:** form

**Mục đích:** Publish reviewed instructions per locale.  
**Quy tắc chính:** Phê duyệt áp dụng đúng phiên bản nội dung và phạm vi người nhận.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Preview template → O14.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T06) · [EN](Prototype.html?lang=en#T06) · [JA](Prototype.html?lang=ja#T06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Mẫu nội dung | Fire evacuation | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tiếng Anh | Approved v4 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tiếng Nhật | Review required | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Dự phòng | Approved English | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Biến nội dung | site_name + issued_at | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O14 với payload/version hợp lệ, bị chặn khi guard của WF-09 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Content editor

**Câu hỏi chính:** Trong “Mẫu nội dung và ngôn ngữ”, Mẫu nội dung, Tiếng Anh cho biết điều gì và vai trò Content editor có thể thực hiện “Preview template” trong phạm vi này không?

**Hình chính:** Xem trước tin đa ngôn ngữ với biến và dự phòng

**Hành động chính:** Xem mẫu tin → O14

**Mở dần chi tiết:** Giữ Mẫu nội dung, Tiếng Anh ở lớp quyết định. Đưa chi tiết hỗ trợ của Tiếng Nhật, Dự phòng, Biến nội dung, lịch sử nguồn, phiên bản và quy tắc FR-T06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Mẫu nội dung và ngôn ngữ” cho Content editor; đổi Mẫu nội dung và làm Biến nội dung không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Preview template” chỉ tới O14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t07"></a>
## T07 — Phân loại nguy cơ và quy trình

**EN:** Hazard taxonomy & playbooks · **JA:** 危険分類と対応手順  
**Yêu cầu:** FR-T07 / WF-20 · **Actor:** Tenant admin · **Surface:** Administration · **Layout:** form

**Mục đích:** Extend categories without changing the core.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T08.  
**Đầu ra:** Save draft playbook → T08.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T07) · [EN](Prototype.html?lang=en#T07) · [JA](Prototype.html?lang=ja#T07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Loại sự cố | Personal safety / welfare check | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Mức độ mặc định | P2 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Quy trình ứng phó | Contact then dispatch | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Độ nhạy cảm | Restricted | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T08 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T07 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Phân loại nguy cơ và quy trình”, Loại sự cố, Mức độ mặc định cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save draft playbook” trong phạm vi này không?

**Hình chính:** Cây loại nguy cơ nối bước kịch bản nháp

**Hành động chính:** Lưu nháp kịch bản → T08

**Mở dần chi tiết:** Giữ Loại sự cố, Mức độ mặc định ở lớp quyết định. Đưa chi tiết hỗ trợ của Quy trình ứng phó, Độ nhạy cảm, lịch sử nguồn, phiên bản và quy tắc FR-T07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phân loại nguy cơ và quy trình” cho Tenant admin; đổi Loại sự cố và làm Độ nhạy cảm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save draft playbook” chỉ tới T08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t08"></a>
## T08 — Phê duyệt quy trình

**EN:** Playbook approval · **JA:** 対応手順の承認  
**Yêu cầu:** FR-T08 / WF-20 · **Actor:** Supervisor · **Surface:** Administration · **Layout:** detail

**Mục đích:** Approve the operational sequence.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T07.  
**Đầu ra:** Publish demo playbook → T07.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T08) · [EN](Prototype.html?lang=en#T08) · [JA](Prototype.html?lang=ja#T08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phiên bản | Welfare v2 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điều kiện kích hoạt | Manual SOS or detector | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Các bước | Check-in → operator → dispatch | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thời hạn chờ | 60 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người phụ trách | Care supervisor | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T07 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T08 — Bố cục thị giác V2

**Context:** configuration · **Role:** Supervisor

**Câu hỏi chính:** Trong “Phê duyệt quy trình”, Phiên bản, Điều kiện kích hoạt cho biết điều gì và vai trò Supervisor có thể thực hiện “Publish demo playbook” trong phạm vi này không?

**Hình chính:** Chuỗi bước kịch bản có phiên bản, timeout và trách nhiệm

**Hành động chính:** Công bố kịch bản · mô phỏng → T07

**Mở dần chi tiết:** Giữ Phiên bản, Điều kiện kích hoạt ở lớp quyết định. Đưa chi tiết hỗ trợ của Các bước, Thời hạn chờ, Người phụ trách, lịch sử nguồn, phiên bản và quy tắc FR-T08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phê duyệt quy trình” cho Supervisor; đổi Phiên bản và làm Người phụ trách không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish demo playbook” chỉ tới T07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t09"></a>
## T09 — Lưu trữ và bảo toàn pháp lý

**EN:** Retention & legal holds · **JA:** 保存とリーガルホールド  
**Yêu cầu:** FR-T09 / WF-19 · **Actor:** Privacy officer · **Surface:** Administration · **Layout:** form

**Mục đích:** Apply policies by data class and region.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save policy draft → T10.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T09) · [EN](Prototype.html?lang=en#T09) · [JA](Prototype.html?lang=ja#T09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vị trí chính xác | 30 days proposed | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hồ sơ sự cố | 365 days proposed | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Bằng chứng | 90 days proposed | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Bảo toàn pháp lý | Overrides deletion | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T10 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T09 — Bố cục thị giác V2

**Context:** configuration · **Role:** Privacy officer

**Câu hỏi chính:** Trong “Lưu trữ và bảo toàn pháp lý”, Vị trí chính xác, Hồ sơ sự cố cho biết điều gì và vai trò Privacy officer có thể thực hiện “Save policy draft” trong phạm vi này không?

**Hình chính:** Dòng lưu giữ có ngoại lệ giữ pháp lý

**Hành động chính:** Lưu nháp chính sách → T10

**Mở dần chi tiết:** Giữ Vị trí chính xác, Hồ sơ sự cố ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng, Bảo toàn pháp lý, lịch sử nguồn, phiên bản và quy tắc FR-T09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lưu trữ và bảo toàn pháp lý” cho Privacy officer; đổi Vị trí chính xác và làm Bảo toàn pháp lý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save policy draft” chỉ tới T10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t10"></a>
## T10 — Xử lý yêu cầu quyền riêng tư

**EN:** Privacy request review · **JA:** プライバシー申請の審査  
**Yêu cầu:** FR-T10 / WF-19 · **Actor:** Privacy officer · **Surface:** Administration · **Layout:** detail

**Mục đích:** Review request DR-202.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** T09.  
**Đầu ra:** Approve demo export → C30.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T10) · [EN](Prototype.html?lang=en#T10) · [JA](Prototype.html?lang=ja#T10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Danh tính | Verified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Loại dữ liệu | Profile + eligible history | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bằng chứng sự cố | Hold applied | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Quyết định | Export allowed subset | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C30 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T10 — Bố cục thị giác V2

**Context:** configuration · **Role:** Privacy officer

**Câu hỏi chính:** Trong “Xử lý yêu cầu quyền riêng tư”, Danh tính, Loại dữ liệu cho biết điều gì và vai trò Privacy officer có thể thực hiện “Approve demo export” trong phạm vi này không?

**Hình chính:** Xem trước xuất dữ liệu có xác minh và loại trừ bằng chứng

**Hành động chính:** Duyệt xuất · mô phỏng → C30

**Mở dần chi tiết:** Giữ Danh tính, Loại dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng sự cố, Quyết định, lịch sử nguồn, phiên bản và quy tắc FR-T10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xử lý yêu cầu quyền riêng tư” cho Privacy officer; đổi Danh tính và làm Quyết định không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve demo export” chỉ tới C30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t11"></a>
## T11 — Bản ghi kiểm toán

**EN:** Audit record · **JA:** 監査記録  
**Yêu cầu:** FR-T11 / WF-19 · **Actor:** Auditor · **Surface:** Administration · **Layout:** detail

**Mục đích:** Immutable decision evidence.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** O30.  
**Đầu ra:** Return to audit search → O30.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T11) · [EN](Prototype.html?lang=en#T11) · [JA](Prototype.html?lang=ja#T11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chủ thể thực hiện | Supervisor B | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hành động | warning.approved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đối tượng | WARN-03 v3 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thời gian | 2026-10-23T08:44:03Z | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mã truy vết | tr-9041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O30 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T11 — Bố cục thị giác V2

**Context:** configuration · **Role:** Auditor

**Câu hỏi chính:** Trong “Bản ghi kiểm toán”, Chủ thể thực hiện, Hành động cho biết điều gì và vai trò Auditor có thể thực hiện “Return to audit search” trong phạm vi này không?

**Hình chính:** Sự kiện kiểm toán bất biến nối người, đối tượng và trace

**Hành động chính:** Về tìm kiểm toán → O30

**Mở dần chi tiết:** Giữ Chủ thể thực hiện, Hành động ở lớp quyết định. Đưa chi tiết hỗ trợ của Đối tượng, Thời gian, Mã truy vết, lịch sử nguồn, phiên bản và quy tắc FR-T11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bản ghi kiểm toán” cho Auditor; đổi Chủ thể thực hiện và làm Mã truy vết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Return to audit search” chỉ tới O30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t12"></a>
## T12 — Sức khỏe dịch vụ và khôi phục

**EN:** Service health & recovery · **JA:** サービス状態と復旧  
**Yêu cầu:** FR-T12 / WF-20 · **Actor:** Platform operator · **Surface:** Administration · **Layout:** dashboard

**Mục đích:** Separate degraded service from silent failure.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T13.  
**Đầu ra:** Open recovery runbook → T13.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T12) · [EN](Prototype.html?lang=en#T12) · [JA](Prototype.html?lang=ja#T12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| EU ingestion | Healthy | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nhà cung cấp thông báo | Degraded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bản sao dữ liệu | Lag 0.4 s | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lần thử khôi phục | Passed in test environment | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T13 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T12 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform operator

**Câu hỏi chính:** Trong “Sức khỏe dịch vụ và khôi phục”, EU ingestion, Nhà cung cấp thông báo cho biết điều gì và vai trò Platform operator có thể thực hiện “Open recovery runbook” trong phạm vi này không?

**Hình chính:** Sơ đồ sức khỏe phụ thuộc và sẵn sàng khôi phục

**Hành động chính:** Mở hướng dẫn khôi phục → T13

**Mở dần chi tiết:** Giữ EU ingestion, Nhà cung cấp thông báo ở lớp quyết định. Đưa chi tiết hỗ trợ của Bản sao dữ liệu, Lần thử khôi phục, lịch sử nguồn, phiên bản và quy tắc FR-T12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Sức khỏe dịch vụ và khôi phục” cho Platform operator; đổi EU ingestion và làm Lần thử khôi phục không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open recovery runbook” chỉ tới T13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t13"></a>
## T13 — Quy trình khôi phục

**EN:** Recovery runbook · **JA:** 復旧手順  
**Yêu cầu:** FR-T13 / WF-20 · **Actor:** Platform operator · **Surface:** Administration · **Layout:** detail

**Mục đích:** Regional incident data recovery.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T12.  
**Đầu ra:** Record drill outcome → T12.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T13) · [EN](Prototype.html?lang=en#T13) · [JA](Prototype.html?lang=ja#T13)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Step 1 | Fence the failed writer | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Step 2 | Promote verified replica | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Step 3 | Replay durable outbox | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Step 4 | Reconcile delivery and command receipts | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T13:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T12 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T13 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform operator

**Câu hỏi chính:** Trong “Quy trình khôi phục”, Step 1, Step 2 cho biết điều gì và vai trò Platform operator có thể thực hiện “Record drill outcome” trong phạm vi này không?

**Hình chính:** Danh mục khôi phục với bằng chứng xác minh từng bước

**Hành động chính:** Ghi kết quả diễn tập → T12

**Mở dần chi tiết:** Giữ Step 1, Step 2 ở lớp quyết định. Đưa chi tiết hỗ trợ của Step 3, Step 4, lịch sử nguồn, phiên bản và quy tắc FR-T13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Quy trình khôi phục” cho Platform operator; đổi Step 1 và làm Step 4 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Record drill outcome” chỉ tới T12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t14"></a>
## T14 — Sử dụng và gói dịch vụ

**EN:** Usage & subscription · **JA:** 利用状況と契約  
**Yêu cầu:** FR-T14 / WF-20 · **Actor:** Billing admin · **Surface:** Administration · **Layout:** detail

**Mục đích:** Capacity and commercial visibility.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T15.  
**Đầu ra:** Review capacity policy → T15.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T14) · [EN](Prototype.html?lang=en#T14) · [JA](Prototype.html?lang=ja#T14)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sơ đồ / kế hoạch | Enterprise regional | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Địa điểm | 24 of 30 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thiết bị | 480 of 600 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ngân sách SMS | 72% consumed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Xử lý khẩn cấp | No silent incident drop | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T14:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T15 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T14 — Bố cục thị giác V2

**Context:** configuration · **Role:** Billing admin

**Câu hỏi chính:** Trong “Sử dụng và gói dịch vụ”, Sơ đồ / kế hoạch, Địa điểm cho biết điều gì và vai trò Billing admin có thể thực hiện “Review capacity policy” trong phạm vi này không?

**Hình chính:** Biểu đồ dùng năng lực với phần dành khẩn cấp

**Hành động chính:** Xem chính sách năng lực → T15

**Mở dần chi tiết:** Giữ Sơ đồ / kế hoạch, Địa điểm ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị, Ngân sách SMS, Xử lý khẩn cấp, lịch sử nguồn, phiên bản và quy tắc FR-T14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Sử dụng và gói dịch vụ” cho Billing admin; đổi Sơ đồ / kế hoạch và làm Xử lý khẩn cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review capacity policy” chỉ tới T15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t15"></a>
## T15 — Dung lượng và giới hạn

**EN:** Capacity & quota policy · **JA:** 容量と制限  
**Yêu cầu:** FR-T15 / WF-20 · **Actor:** Platform operator · **Surface:** Administration · **Layout:** form

**Mục đích:** Protect emergency traffic during bursts.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T14.  
**Đầu ra:** Save capacity draft → T14.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T15) · [EN](Prototype.html?lang=en#T15) · [JA](Prototype.html?lang=ja#T15)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hàng đợi dự phòng P1 | Enabled | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lấy mẫu telemetry | Allowed under overload | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tiếp nhận SOS | Reserved capacity | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ngưỡng cảnh báo | 80% | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Xử lý khi chạm giới hạn | Visible degraded mode | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T15:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T14 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T15 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform operator

**Câu hỏi chính:** Trong “Dung lượng và giới hạn”, Hàng đợi dự phòng P1, Lấy mẫu telemetry cho biết điều gì và vai trò Platform operator có thể thực hiện “Save capacity draft” trong phạm vi này không?

**Hình chính:** So sánh chính sách hàng đợi với dự trữ P1 và tác động giới hạn

**Hành động chính:** Lưu nháp năng lực → T14

**Mở dần chi tiết:** Giữ Hàng đợi dự phòng P1, Lấy mẫu telemetry ở lớp quyết định. Đưa chi tiết hỗ trợ của Tiếp nhận SOS, Ngưỡng cảnh báo, Xử lý khi chạm giới hạn, lịch sử nguồn, phiên bản và quy tắc FR-T15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Dung lượng và giới hạn” cho Platform operator; đổi Hàng đợi dự phòng P1 và làm Xử lý khi chạm giới hạn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save capacity draft” chỉ tới T14 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t16"></a>
## T16 — Phân tích và xuất báo cáo

**EN:** Analytics & export · **JA:** 分析とレポート出力  
**Yêu cầu:** FR-T16 / WF-20 · **Actor:** Analyst · **Surface:** Administration · **Layout:** detail

**Mục đích:** Measure response without hiding gaps.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T17.  
**Đầu ra:** Prepare demo report → T17.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T16) · [EN](Prototype.html?lang=en#T16) · [JA](Prototype.html?lang=ja#T16)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Kỳ báo cáo | Last 30 days | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Trung vị thời gian tiếp nhận | 18 seconds · demo | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| P95 thời gian tiếp nhận | 61 seconds · demo | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Gửi chưa xác nhận | 3.4% · demo | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Xuất dữ liệu | De-identified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T16:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T17 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T16 — Bố cục thị giác V2

**Context:** configuration · **Role:** Analyst

**Câu hỏi chính:** Trong “Phân tích và xuất báo cáo”, Kỳ báo cáo, Trung vị thời gian tiếp nhận cho biết điều gì và vai trò Analyst có thể thực hiện “Prepare demo report” trong phạm vi này không?

**Hình chính:** Biểu đồ phân bố tách trung vị, P95 và thiếu biên nhận

**Hành động chính:** Chuẩn bị báo cáo · mô phỏng → T17

**Mở dần chi tiết:** Giữ Kỳ báo cáo, Trung vị thời gian tiếp nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của P95 thời gian tiếp nhận, Gửi chưa xác nhận, Xuất dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-T16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phân tích và xuất báo cáo” cho Analyst; đổi Kỳ báo cáo và làm Xuất dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Prepare demo report” chỉ tới T17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="t17"></a>
## T17 — Lập lịch báo cáo

**EN:** Report schedule · **JA:** レポートのスケジュール  
**Yêu cầu:** FR-T17 / WF-20 · **Actor:** Analyst · **Surface:** Administration · **Layout:** form

**Mục đích:** Deliver an authorized operational report.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** T16.  
**Đầu ra:** Save schedule draft → T16.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#T17) · [EN](Prototype.html?lang=en#T17) · [JA](Prototype.html?lang=ja#T17)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Báo cáo | Monthly readiness | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Đối tượng nhận | Tenant supervisors | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Múi giờ | Europe/Berlin | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lịch | First Monday · 09:00 | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |
| PII | Excluded | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-T17:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến T16 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### T17 — Bố cục thị giác V2

**Context:** configuration · **Role:** Analyst

**Câu hỏi chính:** Trong “Lập lịch báo cáo”, Báo cáo, Đối tượng nhận cho biết điều gì và vai trò Analyst có thể thực hiện “Save schedule draft” trong phạm vi này không?

**Hình chính:** Xem trước lịch báo cáo với múi giờ và chia sẻ người nhận

**Hành động chính:** Lưu nháp lịch → T16

**Mở dần chi tiết:** Giữ Báo cáo, Đối tượng nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Múi giờ, Lịch, PII, lịch sử nguồn, phiên bản và quy tắc FR-T17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi và chính sách nháp khi kiểm tra lỗi; không âm thầm áp dụng thay đổi toàn tổ chức hoặc xuyên vùng.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lập lịch báo cáo” cho Analyst; đổi Báo cáo và làm PII không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save schedule draft” chỉ tới T16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x01"></a>
## X01 — Mất mạng · SOS chưa gửi

**EN:** No connection / SOS pending · **JA:** オフライン・SOS未送信  
**Yêu cầu:** FR-X01 / WF-05 · **Actor:** Citizen · **Surface:** System states · **Layout:** alert

**Mục đích:** Your SOS has not reached the server.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** View offline outbox → R11.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X01) · [EN](Prototype.html?lang=en#X01) · [JA](Prototype.html?lang=ja#X01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Bản ghi trên thiết bị | Saved on this device | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Biên nhận máy chủ | Not received | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thử lại | When connection returns | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phương án khác | Use configured local emergency calling option | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R11 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X01 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Mất mạng · SOS chưa gửi”, Bản ghi trên thiết bị, Biên nhận máy chủ cho biết điều gì và vai trò Citizen có thể thực hiện “View offline outbox” trong phạm vi này không?

**Hình chính:** Biên nhận SOS lưu cục bộ nêu rõ chưa có máy chủ nhận

**Hành động chính:** Xem hộp chờ ngoại tuyến → R11

**Mở dần chi tiết:** Giữ Bản ghi trên thiết bị, Biên nhận máy chủ ở lớp quyết định. Đưa chi tiết hỗ trợ của Thử lại, Phương án khác, lịch sử nguồn, phiên bản và quy tắc FR-X01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Mất mạng · SOS chưa gửi” cho Citizen; đổi Bản ghi trên thiết bị và làm Phương án khác không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View offline outbox” chỉ tới R11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x02"></a>
## X02 — Không có quyền vị trí

**EN:** Permission unavailable · **JA:** 位置情報の権限なし  
**Yêu cầu:** FR-X02 / WF-05 · **Actor:** Citizen · **Surface:** System states · **Layout:** detail

**Mục đích:** Location permission is off.  
**Quy tắc chính:** Biên nhận máy chủ và người tiếp nhận là hai trạng thái khác nhau.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Enter location manually → C06.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X02) · [EN](Prototype.html?lang=en#X02) · [JA](Prototype.html?lang=ja#X02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Định vị tự động | Unavailable | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phương án khác | Enter building and room | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Quyền riêng tư | Permission remains your choice | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS | Manual location supported | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C06 với payload/version hợp lệ, bị chặn khi guard của WF-05 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X02 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Không có quyền vị trí”, Định vị tự động, Phương án khác cho biết điều gì và vai trò Citizen có thể thực hiện “Enter location manually” trong phạm vi này không?

**Hình chính:** Nhập vị trí thủ công cạnh giải thích quyền chưa có

**Hành động chính:** Nhập vị trí thủ công → C06

**Mở dần chi tiết:** Giữ Định vị tự động, Phương án khác ở lớp quyết định. Đưa chi tiết hỗ trợ của Quyền riêng tư, SOS, lịch sử nguồn, phiên bản và quy tắc FR-X02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Không có quyền vị trí” cho Citizen; đổi Định vị tự động và làm SOS không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Enter location manually” chỉ tới C06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x03"></a>
## X03 — Không có sự cố đang mở

**EN:** No active incidents · **JA:** 対応中のインシデントなし  
**Yêu cầu:** FR-X03 / WF-20 · **Actor:** Operator · **Surface:** System states · **Layout:** success

**Mục đích:** No active incidents in this view.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review device health → S06.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X03) · [EN](Prototype.html?lang=en#X03) · [JA](Prototype.html?lang=ja#X03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Bộ lọc | Harbor Campus · active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi bao phủ | Only authorized sites | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đồng bộ gần nhất | 10 seconds ago | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thiết bị chưa rõ | Still listed in health | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S06 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Operator

**Câu hỏi chính:** Trong “Không có sự cố đang mở”, Bộ lọc, Phạm vi bao phủ cho biết điều gì và vai trò Operator có thể thực hiện “Review device health” trong phạm vi này không?

**Hình chính:** Màn không sự cố kèm bằng chứng độ phủ và thiết bị chưa rõ

**Hành động chính:** Xem sức khỏe thiết bị → S06

**Mở dần chi tiết:** Giữ Bộ lọc, Phạm vi bao phủ ở lớp quyết định. Đưa chi tiết hỗ trợ của Đồng bộ gần nhất, Thiết bị chưa rõ, lịch sử nguồn, phiên bản và quy tắc FR-X03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Không có sự cố đang mở” cho Operator; đổi Bộ lọc và làm Thiết bị chưa rõ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review device health” chỉ tới S06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x04"></a>
## X04 — Không có quyền truy cập

**EN:** Access denied · **JA:** アクセス権限なし  
**Yêu cầu:** FR-X04 / WF-01 · **Actor:** All roles · **Surface:** System states · **Layout:** detail

**Mục đích:** This record is outside your access scope.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Choose workspace → A04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X04) · [EN](Prototype.html?lang=en#X04) · [JA](Prototype.html?lang=ja#X04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Yêu cầu | Restricted incident | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dữ liệu | Not disclosed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bước tiếp theo | Ask your tenant administrator | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kiểm toán | Access attempt recorded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A04 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X04 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Không có quyền truy cập”, Yêu cầu, Dữ liệu cho biết điều gì và vai trò All roles có thể thực hiện “Choose workspace” trong phạm vi này không?

**Hình chính:** Chọn lại tổ chức mà không lộ đối tượng bị từ chối

**Hành động chính:** Chọn tổ chức → A04

**Mở dần chi tiết:** Giữ Yêu cầu, Dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Bước tiếp theo, Kiểm toán, lịch sử nguồn, phiên bản và quy tắc FR-X04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Không có quyền truy cập” cho All roles; đổi Yêu cầu và làm Kiểm toán không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Choose workspace” chỉ tới A04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x05"></a>
## X05 — Dịch vụ tạm gián đoạn

**EN:** Service unavailable · **JA:** サービスの一時停止  
**Yêu cầu:** FR-X05 / WF-20 · **Actor:** All roles · **Surface:** System states · **Layout:** alert

**Mục đích:** This service is temporarily unavailable.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open offline pack → C18.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X05) · [EN](Prototype.html?lang=en#X05) · [JA](Prototype.html?lang=ja#X05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Trạng thái | Regional API degraded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nội dung lưu tạm | May be stale | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Gửi yêu cầu | Not confirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khôi phục | Retry without creating duplicates | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C18 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X05 — Bố cục thị giác V2

**Context:** emergency · **Role:** All roles

**Câu hỏi chính:** Trong “Dịch vụ tạm gián đoạn”, Trạng thái, Nội dung lưu tạm cho biết điều gì và vai trò All roles có thể thực hiện “Open offline pack” trong phạm vi này không?

**Hình chính:** Bảng mất dịch vụ với tuổi nội dung lưu và đường thay thế

**Hành động chính:** Mở gói ngoại tuyến → C18

**Mở dần chi tiết:** Giữ Trạng thái, Nội dung lưu tạm ở lớp quyết định. Đưa chi tiết hỗ trợ của Gửi yêu cầu, Khôi phục, lịch sử nguồn, phiên bản và quy tắc FR-X05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Dịch vụ tạm gián đoạn” cho All roles; đổi Trạng thái và làm Khôi phục không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open offline pack” chỉ tới C18 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x06"></a>
## X06 — Thay đổi chưa lưu và xung đột

**EN:** Unsaved changes & conflict · **JA:** 未保存の変更と競合  
**Yêu cầu:** FR-X06 / WF-02 · **Actor:** Site admin · **Surface:** System states · **Layout:** detail

**Mục đích:** A newer version was published.  
**Quy tắc chính:** Vị trí và sơ đồ có phiên bản; bản mới phải được duyệt trước khi dùng.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review latest version → S05.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X06) · [EN](Prototype.html?lang=en#X06) · [JA](Prototype.html?lang=ja#X06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phiên bản của bạn | 12 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phiên bản hiện tại | 13 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thay đổi của bạn | Preserved locally | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cách xử lý | Review before resubmitting | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S05 với payload/version hợp lệ, bị chặn khi guard của WF-02 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Site admin

**Câu hỏi chính:** Trong “Thay đổi chưa lưu và xung đột”, Phiên bản của bạn, Phiên bản hiện tại cho biết điều gì và vai trò Site admin có thể thực hiện “Review latest version” trong phạm vi này không?

**Hình chính:** So sánh bản cục bộ, máy chủ giữ sửa chưa lưu

**Hành động chính:** Xem phiên bản mới nhất → S05

**Mở dần chi tiết:** Giữ Phiên bản của bạn, Phiên bản hiện tại ở lớp quyết định. Đưa chi tiết hỗ trợ của Thay đổi của bạn, Cách xử lý, lịch sử nguồn, phiên bản và quy tắc FR-X06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thay đổi chưa lưu và xung đột” cho Site admin; đổi Phiên bản của bạn và làm Cách xử lý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review latest version” chỉ tới S05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x07"></a>
## X07 — Không có kết quả tìm kiếm

**EN:** Empty search & filter reset · **JA:** 検索結果なし  
**Yêu cầu:** FR-X07 / WF-20 · **Actor:** Operator · **Surface:** System states · **Layout:** detail

**Mục đích:** No matches for these filters.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Reset search → O30.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X07) · [EN](Prototype.html?lang=en#X07) · [JA](Prototype.html?lang=ja#X07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Truy vấn | INC-9999 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi | Harbor Campus | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kỳ báo cáo | Today | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Gợi ý | Check identifier or reset filters | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O30 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X07 — Bố cục thị giác V2

**Context:** configuration · **Role:** Operator

**Câu hỏi chính:** Trong “Không có kết quả tìm kiếm”, Truy vấn, Phạm vi cho biết điều gì và vai trò Operator có thể thực hiện “Reset search” trong phạm vi này không?

**Hình chính:** Truy vấn và bộ lọc đang dùng cạnh nút đặt lại

**Hành động chính:** Đặt lại tìm kiếm → O30

**Mở dần chi tiết:** Giữ Truy vấn, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Kỳ báo cáo, Gợi ý, lịch sử nguồn, phiên bản và quy tắc FR-X07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Không có kết quả tìm kiếm” cho Operator; đổi Truy vấn và làm Gợi ý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Reset search” chỉ tới O30 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x08"></a>
## X08 — Phiên đăng nhập hết hạn

**EN:** Expired session · **JA:** セッションの有効期限切れ  
**Yêu cầu:** FR-X08 / WF-01 · **Actor:** All roles · **Surface:** System states · **Layout:** alert

**Mục đích:** Sign in again to continue.  
**Quy tắc chính:** Xác minh danh tính và phạm vi tổ chức trước khi hiển thị dữ liệu.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Sign in → A02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X08) · [EN](Prototype.html?lang=en#X08) · [JA](Prototype.html?lang=ja#X08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Bản nháp | Preserved without submitting | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phiên | Expired | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dữ liệu nhạy cảm | Hidden | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tiếp theo | Re-authenticate | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến A02 với payload/version hợp lệ, bị chặn khi guard của WF-01 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X08 — Bố cục thị giác V2

**Context:** configuration · **Role:** All roles

**Câu hỏi chính:** Trong “Phiên đăng nhập hết hạn”, Bản nháp, Phiên cho biết điều gì và vai trò All roles có thể thực hiện “Sign in” trong phạm vi này không?

**Hình chính:** Bảng hết phiên giải thích khôi phục nháp được bảo vệ

**Hành động chính:** Đăng nhập → A02

**Mở dần chi tiết:** Giữ Bản nháp, Phiên ở lớp quyết định. Đưa chi tiết hỗ trợ của Dữ liệu nhạy cảm, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-X08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phiên đăng nhập hết hạn” cho All roles; đổi Bản nháp và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Sign in” chỉ tới A02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x09"></a>
## X09 — Đang tải và dữ liệu cũ

**EN:** Loading & stale data · **JA:** 読み込み中・古いデータ  
**Yêu cầu:** FR-X09 / WF-20 · **Actor:** Operator · **Surface:** System states · **Layout:** detail

**Mục đích:** Refreshing the situation view.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Return to command → O01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X09) · [EN](Prototype.html?lang=en#X09) · [JA](Prototype.html?lang=ja#X09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Dữ liệu đang xem | Cached · 2 minutes old | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kết nối | Reconnecting | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lệnh | Disabled while stale | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tiếp theo | Confirm fresh state | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O01 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X09 — Bố cục thị giác V2

**Context:** emergency · **Role:** Operator

**Câu hỏi chính:** Trong “Đang tải và dữ liệu cũ”, Dữ liệu đang xem, Kết nối cho biết điều gì và vai trò Operator có thể thực hiện “Return to command” trong phạm vi này không?

**Hình chính:** Dải dữ liệu cũ ghi tuổi nguồn và lệnh không khả dụng

**Hành động chính:** Về chỉ huy → O01

**Mở dần chi tiết:** Giữ Dữ liệu đang xem, Kết nối ở lớp quyết định. Đưa chi tiết hỗ trợ của Lệnh, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-X09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đang tải và dữ liệu cũ” cho Operator; đổi Dữ liệu đang xem và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Return to command” chỉ tới O01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="x10"></a>
## X10 — Tệp đính kèm bị từ chối

**EN:** Attachment rejected · **JA:** 添付ファイルの拒否  
**Yêu cầu:** FR-X10 / WF-11 · **Actor:** Responder · **Surface:** System states · **Layout:** detail

**Mục đích:** This attachment could not be accepted.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Choose another attachment → R10.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#X10) · [EN](Prototype.html?lang=en#X10) · [JA](Prototype.html?lang=ja#X10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tệp | Observation clip | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lý do | Exceeds 20 MB | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Được phép | JPEG PNG MP4 PDF | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hành động | Choose a smaller file | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-X10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R10 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### X10 — Bố cục thị giác V2

**Context:** configuration · **Role:** Responder

**Câu hỏi chính:** Trong “Tệp đính kèm bị từ chối”, Tệp, Lý do cho biết điều gì và vai trò Responder có thể thực hiện “Choose another attachment” trong phạm vi này không?

**Hình chính:** Xem trước tệp bị từ chối với lý do và thay thế hợp lệ

**Hành động chính:** Chọn tệp khác → R10

**Mở dần chi tiết:** Giữ Tệp, Lý do ở lớp quyết định. Đưa chi tiết hỗ trợ của Được phép, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-X10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Nêu đúng năng lực không có và cách khôi phục hợp lệ, giữ bối cảnh cục bộ an toàn; chuyển màn khôi phục không phải bằng chứng đã phục hồi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tệp đính kèm bị từ chối” cho Responder; đổi Tệp và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Choose another attachment” chỉ tới R10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g01"></a>
## G01 — Vận hành các vùng dữ liệu

**EN:** Regional operations · **JA:** 地域別運用  
**Yêu cầu:** FR-G01 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** dashboard

**Mục đích:** Production cells, independently operated.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** G04.  
**Đầu ra:** Inspect regional cell → G02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G01) · [EN](Prototype.html?lang=en#G01) · [JA](Prototype.html?lang=ja#G01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| EU cell | Healthy · 3 availability zones | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| APAC cell | Healthy · 3 availability zones | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Global directory | Healthy | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nơi lưu dữ liệu | Enforced | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G02 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform operator

**Câu hỏi chính:** Trong “Vận hành các vùng dữ liệu”, EU cell, APAC cell cho biết điều gì và vai trò Platform operator có thể thực hiện “Inspect regional cell” trong phạm vi này không?

**Hình chính:** Sơ đồ vùng vận hành với ranh giới cư trú dữ liệu

**Hành động chính:** Kiểm tra vùng → G02

**Mở dần chi tiết:** Giữ EU cell, APAC cell ở lớp quyết định. Đưa chi tiết hỗ trợ của Global directory, Nơi lưu dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-G01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Vận hành các vùng dữ liệu” cho Platform operator; đổi EU cell và làm Nơi lưu dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect regional cell” chỉ tới G02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g02"></a>
## G02 — Chi tiết regional cell

**EN:** Regional cell detail · **JA:** リージョナルセルの詳細  
**Yêu cầu:** FR-G02 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** detail

**Mục đích:** EU cell · operational readiness.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** G01.  
**Đầu ra:** Review recovery readiness → G03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G02) · [EN](Prototype.html?lang=en#G02) · [JA](Prototype.html?lang=ja#G02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Thế hệ ghi dữ liệu | 42 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ trễ broker | 120 ms | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cơ sở dữ liệu | Primary + verified replicas | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đích khôi phục | Approved EU destination | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G03 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform operator

**Câu hỏi chính:** Trong “Chi tiết regional cell”, Thế hệ ghi dữ liệu, Độ trễ broker cho biết điều gì và vai trò Platform operator có thể thực hiện “Review recovery readiness” trong phạm vi này không?

**Hình chính:** Trạng thái sao chép và kỷ nguyên writer của vùng

**Hành động chính:** Xem sẵn sàng khôi phục → G03

**Mở dần chi tiết:** Giữ Thế hệ ghi dữ liệu, Độ trễ broker ở lớp quyết định. Đưa chi tiết hỗ trợ của Cơ sở dữ liệu, Đích khôi phục, lịch sử nguồn, phiên bản và quy tắc FR-G02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chi tiết regional cell” cho Platform operator; đổi Thế hệ ghi dữ liệu và làm Đích khôi phục không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review recovery readiness” chỉ tới G03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g03"></a>
## G03 — Diễn tập khôi phục thảm họa

**EN:** Disaster recovery drill · **JA:** 災害復旧訓練  
**Yêu cầu:** FR-G03 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** form

**Mục đích:** Validate recovery with recorded evidence.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** G02.  
**Đầu ra:** Record drill evidence → G04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G03) · [EN](Prototype.html?lang=en#G03) · [JA](Prototype.html?lang=ja#G03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Cell | EU | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chế độ | Isolated recovery exercise | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Bản sao lưu | Verified snapshot | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| RPO mục tiêu | 5 minutes | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| RTO mục tiêu | 60 minutes | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G04 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform operator

**Câu hỏi chính:** Trong “Diễn tập khôi phục thảm họa”, Cell, Chế độ cho biết điều gì và vai trò Platform operator có thể thực hiện “Record drill evidence” trong phạm vi này không?

**Hình chính:** Dòng diễn tập khôi phục với RPO, RTO mục tiêu và bằng chứng

**Hành động chính:** Ghi bằng chứng diễn tập → G04

**Mở dần chi tiết:** Giữ Cell, Chế độ ở lớp quyết định. Đưa chi tiết hỗ trợ của Bản sao lưu, RPO mục tiêu, RTO mục tiêu, lịch sử nguồn, phiên bản và quy tắc FR-G03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Diễn tập khôi phục thảm họa” cho Platform operator; đổi Cell và làm RTO mục tiêu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Record drill evidence” chỉ tới G04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g04"></a>
## G04 — Xác minh khôi phục

**EN:** Recovery verification · **JA:** 復旧の検証  
**Yêu cầu:** FR-G04 / WF-20 · **Actor:** Platform operator · **Surface:** Platform · **Layout:** detail

**Mục đích:** Verify data and ownership before routing.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** G03.  
**Đầu ra:** Review regional operations → G01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G04) · [EN](Prototype.html?lang=en#G04) · [JA](Prototype.html?lang=ja#G04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Cô lập writer cũ | Verified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bản ghi SOS | Reconciled | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hộp gửi bền vững | Replayed without duplicate effects | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nơi lưu dữ liệu | EU only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G01 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform operator

**Câu hỏi chính:** Trong “Xác minh khôi phục”, Cô lập writer cũ, Bản ghi SOS cho biết điều gì và vai trò Platform operator có thể thực hiện “Review regional operations” trong phạm vi này không?

**Hình chính:** Lưới chứng minh khôi phục tách fencing và bền vững dữ liệu

**Hành động chính:** Xem vận hành vùng → G01

**Mở dần chi tiết:** Giữ Cô lập writer cũ, Bản ghi SOS ở lớp quyết định. Đưa chi tiết hỗ trợ của Hộp gửi bền vững, Nơi lưu dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-G04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xác minh khôi phục” cho Platform operator; đổi Cô lập writer cũ và làm Nơi lưu dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review regional operations” chỉ tới G01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g05"></a>
## G05 — Khởi tạo tổ chức

**EN:** Tenant provisioning · **JA:** テナントの作成  
**Yêu cầu:** FR-G05 / WF-18 · **Actor:** Platform admin · **Surface:** Platform · **Layout:** form

**Mục đích:** Provision a production tenant boundary.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review provisioning plan → G06.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G05) · [EN](Prototype.html?lang=en#G05) · [JA](Prototype.html?lang=ja#G05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tổ chức | Northstar | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vùng chính | EU | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Cách ly | Dedicated database | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Sơ đồ / kế hoạch | Enterprise | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Bộ chính sách | Reviewed baseline | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G06 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform admin

**Câu hỏi chính:** Trong “Khởi tạo tổ chức”, Tổ chức, Vùng chính cho biết điều gì và vai trò Platform admin có thể thực hiện “Review provisioning plan” trong phạm vi này không?

**Hình chính:** Kế hoạch phụ thuộc cấp tổ chức và ranh giới cách ly

**Hành động chính:** Xem kế hoạch cấp tổ chức → G06

**Mở dần chi tiết:** Giữ Tổ chức, Vùng chính ở lớp quyết định. Đưa chi tiết hỗ trợ của Cách ly, Sơ đồ / kế hoạch, Bộ chính sách, lịch sử nguồn, phiên bản và quy tắc FR-G05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Khởi tạo tổ chức” cho Platform admin; đổi Tổ chức và làm Bộ chính sách không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review provisioning plan” chỉ tới G06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g06"></a>
## G06 — Vòng đời tổ chức

**EN:** Tenant lifecycle · **JA:** テナントのライフサイクル  
**Yêu cầu:** FR-G06 / WF-18 · **Actor:** Platform admin · **Surface:** Platform · **Layout:** detail

**Mục đích:** Northstar · lifecycle controls.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** G05, G08.  
**Đầu ra:** Request support access → G07.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G06) · [EN](Prototype.html?lang=en#G06) · [JA](Prototype.html?lang=ja#G06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Trạng thái | Active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chuyển vùng | Review required | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Xóa dữ liệu | Retention workflow required | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Truy cập hỗ trợ | Not granted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G07 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Platform admin

**Câu hỏi chính:** Trong “Vòng đời tổ chức”, Trạng thái, Chuyển vùng cho biết điều gì và vai trò Platform admin có thể thực hiện “Request support access” trong phạm vi này không?

**Hình chính:** Sơ đồ vòng đời tổ chức với cổng di chuyển, xóa

**Hành động chính:** Yêu cầu truy cập hỗ trợ → G07

**Mở dần chi tiết:** Giữ Trạng thái, Chuyển vùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Xóa dữ liệu, Truy cập hỗ trợ, lịch sử nguồn, phiên bản và quy tắc FR-G06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Vòng đời tổ chức” cho Platform admin; đổi Trạng thái và làm Truy cập hỗ trợ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Request support access” chỉ tới G07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g07"></a>
## G07 — Truy cập hỗ trợ có thời hạn

**EN:** Time-bound support access · **JA:** 期限付きサポートアクセス  
**Yêu cầu:** FR-G07 / WF-19 · **Actor:** Security operator · **Surface:** Platform · **Layout:** form

**Mục đích:** Request the smallest support scope.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** G06.  
**Đầu ra:** Submit access request → G08.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G07) · [EN](Prototype.html?lang=en#G07) · [JA](Prototype.html?lang=ja#G07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tổ chức | Northstar | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phạm vi | Connector diagnostics metadata | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Lý do | Investigate IOC delay | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Thời hạn | 30 minutes | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Truy cập dữ liệu cá nhân | Excluded | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G08 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G07 — Bố cục thị giác V2

**Context:** configuration · **Role:** Security operator

**Câu hỏi chính:** Trong “Truy cập hỗ trợ có thời hạn”, Tổ chức, Phạm vi cho biết điều gì và vai trò Security operator có thể thực hiện “Submit access request” trong phạm vi này không?

**Hình chính:** Yêu cầu hỗ trợ hiện phạm vi tối thiểu và hết hạn

**Hành động chính:** Gửi yêu cầu quyền → G08

**Mở dần chi tiết:** Giữ Tổ chức, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Lý do, Thời hạn, Truy cập dữ liệu cá nhân, lịch sử nguồn, phiên bản và quy tắc FR-G07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Truy cập hỗ trợ có thời hạn” cho Security operator; đổi Tổ chức và làm Truy cập dữ liệu cá nhân không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit access request” chỉ tới G08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g08"></a>
## G08 — Duyệt quyền hỗ trợ

**EN:** Support access approval · **JA:** サポートアクセスの承認  
**Yêu cầu:** FR-G08 / WF-19 · **Actor:** Tenant admin · **Surface:** Platform · **Layout:** detail

**Mục đích:** Approve a scoped support session.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** G07.  
**Đầu ra:** Approve scoped access — sample → G06.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G08) · [EN](Prototype.html?lang=en#G08) · [JA](Prototype.html?lang=ja#G08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Người yêu cầu | Platform support | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi | Diagnostics metadata | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hết hạn | 30 minutes | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kiểm toán | All access recorded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G06 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G08 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Duyệt quyền hỗ trợ”, Người yêu cầu, Phạm vi cho biết điều gì và vai trò Tenant admin có thể thực hiện “Approve scoped access — sample” trong phạm vi này không?

**Hình chính:** Duyệt hỗ trợ đối chiếu người yêu cầu và phạm vi cấp

**Hành động chính:** Duyệt quyền có phạm vi · mẫu → G06

**Mở dần chi tiết:** Giữ Người yêu cầu, Phạm vi ở lớp quyết định. Đưa chi tiết hỗ trợ của Hết hạn, Kiểm toán, lịch sử nguồn, phiên bản và quy tắc FR-G08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Duyệt quyền hỗ trợ” cho Tenant admin; đổi Người yêu cầu và làm Kiểm toán không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Approve scoped access — sample” chỉ tới G06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g09"></a>
## G09 — Phát hành và tương thích schema

**EN:** Release & schema compatibility · **JA:** リリースとスキーマ互換性  
**Yêu cầu:** FR-G09 / WF-20 · **Actor:** Release manager · **Surface:** Platform · **Layout:** list

**Mục đích:** Release only compatible contracts.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** G10.  
**Đầu ra:** Review release gate → G10.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G09) · [EN](Prototype.html?lang=en#G09) · [JA](Prototype.html?lang=ja#G09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Incident service | 2.4 · canary | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Event schema | v1.3 additive | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mobile API | v1 supported | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Rollback | Previous image available | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G10 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G09 — Bố cục thị giác V2

**Context:** configuration · **Role:** Release manager

**Câu hỏi chính:** Trong “Phát hành và tương thích schema”, Incident service, Event schema cho biết điều gì và vai trò Release manager có thể thực hiện “Review release gate” trong phạm vi này không?

**Hình chính:** Ma trận tương thích bản phát hành, schema và phiên bản mobile

**Hành động chính:** Xem cổng phát hành → G10

**Mở dần chi tiết:** Giữ Incident service, Event schema ở lớp quyết định. Đưa chi tiết hỗ trợ của Mobile API, Rollback, lịch sử nguồn, phiên bản và quy tắc FR-G09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phát hành và tương thích schema” cho Release manager; đổi Incident service và làm Rollback không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review release gate” chỉ tới G10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g10"></a>
## G10 — Cổng phát hành và rollback

**EN:** Release gate & rollback · **JA:** リリース判定とロールバック  
**Yêu cầu:** FR-G10 / WF-20 · **Actor:** Release manager · **Surface:** Platform · **Layout:** detail

**Mục đích:** Verify behavior before promotion.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** G09.  
**Đầu ra:** Record release decision → G09.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G10) · [EN](Prototype.html?lang=en#G10) · [JA](Prototype.html?lang=ja#G10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Kiểm thử hợp đồng | Passed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cách ly tổ chức | Passed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mức tiêu hao SLO | Within gate | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chuyển đổi dữ liệu | Expand phase only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G09 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G10 — Bố cục thị giác V2

**Context:** configuration · **Role:** Release manager

**Câu hỏi chính:** Trong “Cổng phát hành và rollback”, Kiểm thử hợp đồng, Cách ly tổ chức cho biết điều gì và vai trò Release manager có thể thực hiện “Record release decision” trong phạm vi này không?

**Hình chính:** Danh mục cổng phát hành với khả năng quay lui và xu hướng SLO

**Hành động chính:** Ghi quyết định phát hành → G09

**Mở dần chi tiết:** Giữ Kiểm thử hợp đồng, Cách ly tổ chức ở lớp quyết định. Đưa chi tiết hỗ trợ của Mức tiêu hao SLO, Chuyển đổi dữ liệu, lịch sử nguồn, phiên bản và quy tắc FR-G10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Cổng phát hành và rollback” cho Release manager; đổi Kiểm thử hợp đồng và làm Chuyển đổi dữ liệu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Record release decision” chỉ tới G09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g11"></a>
## G11 — Sự cố an ninh nền tảng

**EN:** Security incidents · **JA:** セキュリティインシデント  
**Yêu cầu:** FR-G11 / WF-19 · **Actor:** Security operator · **Surface:** Platform · **Layout:** list

**Mục đích:** Respond to platform threats.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** G12.  
**Đầu ra:** Open security case → G12.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G11) · [EN](Prototype.html?lang=en#G11) · [JA](Prototype.html?lang=ja#G11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Device certificate | Revoked · investigation | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Webhook replay | Blocked | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Support session | Expired | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Upload scan | Quarantined | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G12 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G11 — Bố cục thị giác V2

**Context:** configuration · **Role:** Security operator

**Câu hỏi chính:** Trong “Sự cố an ninh nền tảng”, Device certificate, Webhook replay cho biết điều gì và vai trò Security operator có thể thực hiện “Open security case” trong phạm vi này không?

**Hình chính:** Hàng đợi tín hiệu bảo mật với ranh giới tin cậy ảnh hưởng

**Hành động chính:** Mở vụ bảo mật → G12

**Mở dần chi tiết:** Giữ Device certificate, Webhook replay ở lớp quyết định. Đưa chi tiết hỗ trợ của Support session, Upload scan, lịch sử nguồn, phiên bản và quy tắc FR-G11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Sự cố an ninh nền tảng” cho Security operator; đổi Device certificate và làm Upload scan không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open security case” chỉ tới G12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="g12"></a>
## G12 — Hồ sơ an ninh và cô lập

**EN:** Security case & containment · **JA:** セキュリティ対応と封じ込め  
**Yêu cầu:** FR-G12 / WF-19 · **Actor:** Security operator · **Surface:** Platform · **Layout:** form

**Mục đích:** Contain the source without hiding coverage gaps.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** G11.  
**Đầu ra:** Record containment → G11.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#G12) · [EN](Prototype.html?lang=en#G12) · [JA](Prototype.html?lang=ja#G12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hồ sơ | SEC-041 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Nguồn | GW-012 | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Hành động | Revoke certificate | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phạm vi bao phủ | Site supervisor notified | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Bằng chứng | Preserved | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-G12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến G11 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### G12 — Bố cục thị giác V2

**Context:** configuration · **Role:** Security operator

**Câu hỏi chính:** Trong “Hồ sơ an ninh và cô lập”, Hồ sơ, Nguồn cho biết điều gì và vai trò Security operator có thể thực hiện “Record containment” trong phạm vi này không?

**Hình chính:** Dòng ngăn chặn thể hiện phơi nhiễm còn lại và bằng chứng

**Hành động chính:** Ghi ngăn chặn → G11

**Mở dần chi tiết:** Giữ Hồ sơ, Nguồn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hành động, Phạm vi bao phủ, Bằng chứng, lịch sử nguồn, phiên bản và quy tắc FR-G12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ ranh giới dữ liệu tổ chức và quyền writer vùng rõ; metadata vận hành cũ không cho phép khôi phục hoặc truy cập hỗ trợ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ an ninh và cô lập” cho Security operator; đổi Hồ sơ và làm Bằng chứng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Record containment” chỉ tới G11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d01"></a>
## D01 — Không gian nhà phát triển

**EN:** Developer workspace · **JA:** 開発者ワークスペース  
**Yêu cầu:** FR-D01 / WF-17 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** cards

**Mục đích:** Build against explicit contracts.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open API explorer → D02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D01) · [EN](Prototype.html?lang=en#D01) · [JA](Prototype.html?lang=ja#D01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| API reference | Version 1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Event schemas | CloudEvents + domain v1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SDK examples | HTTPS + MQTT | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sandbox | Exercise isolated | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến D02 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Partner developer

**Câu hỏi chính:** Trong “Không gian nhà phát triển”, API reference, Event schemas cho biết điều gì và vai trò Partner developer có thể thực hiện “Open API explorer” trong phạm vi này không?

**Hình chính:** Sơ đồ tài nguyên lập trình tách sandbox và thực

**Hành động chính:** Mở trình API → D02

**Mở dần chi tiết:** Giữ API reference, Event schemas ở lớp quyết định. Đưa chi tiết hỗ trợ của SDK examples, Sandbox, lịch sử nguồn, phiên bản và quy tắc FR-D01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Không gian nhà phát triển” cho Partner developer; đổi API reference và làm Sandbox không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open API explorer” chỉ tới D02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d02"></a>
## D02 — Khám phá API

**EN:** API explorer · **JA:** APIエクスプローラー  
**Yêu cầu:** FR-D02 / WF-03 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** detail

**Mục đích:** POST /v1/events.  
**Quy tắc chính:** Giữ nguồn, thời điểm và ID; sự kiện trùng không tạo tác động mới.  
**Đầu vào:** D01.  
**Đầu ra:** Run sandbox request → D03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D02) · [EN](Prototype.html?lang=en#D02) · [JA](Prototype.html?lang=ja#D02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Xác thực | event.ingest | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nội dung dữ liệu | CloudEvent v1 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chống tác động trùng | Source + event ID | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phản hồi | 202 durable receipt | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến D03 với payload/version hợp lệ, bị chặn khi guard của WF-03 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Partner developer

**Câu hỏi chính:** Trong “Khám phá API”, Xác thực, Nội dung dữ liệu cho biết điều gì và vai trò Partner developer có thể thực hiện “Run sandbox request” trong phạm vi này không?

**Hình chính:** Hai khung yêu cầu, phản hồi với phạm vi và idempotency

**Hành động chính:** Chạy yêu cầu sandbox → D03

**Mở dần chi tiết:** Giữ Xác thực, Nội dung dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Chống tác động trùng, Phản hồi, lịch sử nguồn, phiên bản và quy tắc FR-D02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Khám phá API” cho Partner developer; đổi Xác thực và làm Phản hồi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Run sandbox request” chỉ tới D03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d03"></a>
## D03 — Kết quả yêu cầu sandbox

**EN:** Sandbox request results · **JA:** サンドボックスの実行結果  
**Yêu cầu:** FR-D03 / WF-03 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** detail

**Mục đích:** Inspect the complete receipt.  
**Quy tắc chính:** Giữ nguồn, thời điểm và ID; sự kiện trùng không tạo tác động mới.  
**Đầu vào:** D02.  
**Đầu ra:** Open schema registry → D04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D03) · [EN](Prototype.html?lang=en#D03) · [JA](Prototype.html?lang=ja#D03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| HTTP status | 202 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Biên nhận | event-041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ bền ghi nhận | Committed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sự cố | Not yet confirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mã truy vết | tr-9041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến D04 với payload/version hợp lệ, bị chặn khi guard của WF-03 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Partner developer

**Câu hỏi chính:** Trong “Kết quả yêu cầu sandbox”, HTTP status, Biên nhận cho biết điều gì và vai trò Partner developer có thể thực hiện “Open schema registry” trong phạm vi này không?

**Hình chính:** Kết quả sandbox tách HTTP, biên nhận bền vững và trace

**Hành động chính:** Mở danh mục schema → D04

**Mở dần chi tiết:** Giữ HTTP status, Biên nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ bền ghi nhận, Sự cố, Mã truy vết, lịch sử nguồn, phiên bản và quy tắc FR-D03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kết quả yêu cầu sandbox” cho Partner developer; đổi HTTP status và làm Mã truy vết không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open schema registry” chỉ tới D04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d04"></a>
## D04 — Danh mục schema

**EN:** Schema registry · **JA:** スキーマレジストリー  
**Yêu cầu:** FR-D04 / WF-03 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** list

**Mục đích:** Track compatibility before upgrading.  
**Quy tắc chính:** Giữ nguồn, thời điểm và ID; sự kiện trùng không tạo tác động mới.  
**Đầu vào:** D03.  
**Đầu ra:** View schema contract → D05.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D04) · [EN](Prototype.html?lang=en#D04) · [JA](Prototype.html?lang=ja#D04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| signal.fire.observed | v1 · active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| incident.updated | v1 · active | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| command.result | v1 · restricted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Deprecated versions | None | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến D05 với payload/version hợp lệ, bị chặn khi guard của WF-03 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Partner developer

**Câu hỏi chính:** Trong “Danh mục schema”, signal.fire.observed, incident.updated cho biết điều gì và vai trò Partner developer có thể thực hiện “View schema contract” trong phạm vi này không?

**Hình chính:** Cây phiên bản schema có tương thích và đánh dấu bỏ dùng

**Hành động chính:** Xem hợp đồng schema → D05

**Mở dần chi tiết:** Giữ signal.fire.observed, incident.updated ở lớp quyết định. Đưa chi tiết hỗ trợ của command.result, Deprecated versions, lịch sử nguồn, phiên bản và quy tắc FR-D04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Danh mục schema” cho Partner developer; đổi signal.fire.observed và làm Deprecated versions không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View schema contract” chỉ tới D05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d05"></a>
## D05 — Biên tập manifest kết nối

**EN:** Connector manifest editor · **JA:** コネクターマニフェストの編集  
**Yêu cầu:** FR-D05 / WF-17 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** form

**Mục đích:** Declare capabilities explicitly.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** D04.  
**Đầu ra:** Submit for conformance → D06.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D05) · [EN](Prototype.html?lang=en#D05) · [JA](Prototype.html?lang=ja#D05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Bộ kết nối | Partner sensor bridge | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phiên bản | 1.0.0 | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Năng lực | telemetry.read | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Xác thực | mTLS | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Loại thử lại | Idempotent ingest | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến D06 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Partner developer

**Câu hỏi chính:** Trong “Biên tập manifest kết nối”, Bộ kết nối, Phiên bản cho biết điều gì và vai trò Partner developer có thể thực hiện “Submit for conformance” trong phạm vi này không?

**Hình chính:** Manifest năng lực kết nối với đối chiếu kiểm tra

**Hành động chính:** Gửi kiểm tra tuân thủ → D06

**Mở dần chi tiết:** Giữ Bộ kết nối, Phiên bản ở lớp quyết định. Đưa chi tiết hỗ trợ của Năng lực, Xác thực, Loại thử lại, lịch sử nguồn, phiên bản và quy tắc FR-D05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Biên tập manifest kết nối” cho Partner developer; đổi Bộ kết nối và làm Loại thử lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit for conformance” chỉ tới D06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d06"></a>
## D06 — Kiểm tra tính tương thích

**EN:** Conformance certification · **JA:** 適合性の審査  
**Yêu cầu:** FR-D06 / WF-17 · **Actor:** Integration reviewer · **Surface:** Developer · **Layout:** detail

**Mục đích:** Review adapter behavior under failure.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** D05.  
**Đầu ra:** Approve adapter version → I01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D06) · [EN](Prototype.html?lang=en#D06) · [JA](Prototype.html?lang=ja#D06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Gửi trùng | Passed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Giả mạo tổ chức | Rejected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lệch đồng hồ | Flagged | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Xác thực hết hạn | Rejected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điều tiết tải | Preserved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I01 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration reviewer

**Câu hỏi chính:** Trong “Kiểm tra tính tương thích”, Gửi trùng, Giả mạo tổ chức cho biết điều gì và vai trò Integration reviewer có thể thực hiện “Approve adapter version” trong phạm vi này không?

**Hình chính:** Ma trận tình huống tuân thủ có bảo mật và quá tải

**Hành động chính:** Duyệt phiên bản adapter → I01

**Mở dần chi tiết:** Giữ Gửi trùng, Giả mạo tổ chức ở lớp quyết định. Đưa chi tiết hỗ trợ của Lệch đồng hồ, Xác thực hết hạn, Điều tiết tải, lịch sử nguồn, phiên bản và quy tắc FR-D06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kiểm tra tính tương thích” cho Integration reviewer; đổi Gửi trùng và làm Điều tiết tải không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve adapter version” chỉ tới I01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d07"></a>
## D07 — Truy vết gửi webhook

**EN:** Webhook delivery trace · **JA:** Webhook配信の追跡  
**Yêu cầu:** FR-D07 / WF-10 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** timeline

**Mục đích:** Understand every delivery attempt.  
**Quy tắc chính:** Đã gửi không có nghĩa đã nhận, đã đọc hoặc đã có người phản hồi.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review subscription → I08.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D07) · [EN](Prototype.html?lang=en#D07) · [JA](Prototype.html?lang=ja#D07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| 10:40:00 | Queued | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:40:01 | Partner returned 503 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:40:03 | Retry scheduled | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| 10:40:07 | Application ACK received | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I08 với payload/version hợp lệ, bị chặn khi guard của WF-10 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D07 — Bố cục thị giác V2

**Context:** configuration · **Role:** Partner developer

**Câu hỏi chính:** Trong “Truy vết gửi webhook”, 10:40:00, 10:40:01 cho biết điều gì và vai trò Partner developer có thể thực hiện “Review subscription” trong phạm vi này không?

**Hình chính:** Dòng thử lại webhook có kết quả giao chính xác

**Hành động chính:** Xem đăng ký → I08

**Mở dần chi tiết:** Giữ 10:40:00, 10:40:01 ở lớp quyết định. Đưa chi tiết hỗ trợ của 10:40:03, 10:40:07, lịch sử nguồn, phiên bản và quy tắc FR-D07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Truy vết gửi webhook” cho Partner developer; đổi 10:40:00 và làm 10:40:07 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review subscription” chỉ tới I08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="d08"></a>
## D08 — Luân chuyển thông tin xác thực

**EN:** Credential rotation · **JA:** 認証情報のローテーション  
**Yêu cầu:** FR-D08 / WF-17 · **Actor:** Partner developer · **Surface:** Developer · **Layout:** form

**Mục đích:** Rotate credentials without exposing secrets.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Create rotation request → I07.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#D08) · [EN](Prototype.html?lang=en#D08) · [JA](Prototype.html?lang=ja#D08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ứng dụng kết nối | Partner IOC | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Khóa hiện tại | Expires in 10 days | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thời gian chồng lấn | 24 hours | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |
| Khóa mới | Vault reference only | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-D08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I07 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### D08 — Bố cục thị giác V2

**Context:** configuration · **Role:** Partner developer

**Câu hỏi chính:** Trong “Luân chuyển thông tin xác thực”, Ứng dụng kết nối, Khóa hiện tại cho biết điều gì và vai trò Partner developer có thể thực hiện “Create rotation request” trong phạm vi này không?

**Hình chính:** Dòng chồng lấp khóa với xem trước xoay không lộ bí mật

**Hành động chính:** Tạo yêu cầu xoay khóa → I07

**Mở dần chi tiết:** Giữ Ứng dụng kết nối, Khóa hiện tại ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời gian chồng lấn, Khóa mới, lịch sử nguồn, phiên bản và quy tắc FR-D08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Phân biệt yêu cầu sandbox với thực; không lộ khóa thô trong xem trước, trace hoặc ví dụ sao chép.

**Tình huống nghiệm thu V2:** Dùng tình huống “Luân chuyển thông tin xác thực” cho Partner developer; đổi Ứng dụng kết nối và làm Khóa mới không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Create rotation request” chỉ tới I07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="l01"></a>
## L01 — Mức độ hoàn thiện ngôn ngữ

**EN:** Language coverage · **JA:** 言語対応状況  
**Yêu cầu:** FR-L01 / WF-18 · **Actor:** Localization manager · **Surface:** Localization · **Layout:** dashboard

**Mục đích:** Three languages, one product meaning.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** L03, L04, L05.  
**Đầu ra:** Open translation workspace → L02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#L01) · [EN](Prototype.html?lang=en#L01) · [JA](Prototype.html?lang=ja#L01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tiếng Việt | vi-VN | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tiếng Anh | en | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tiếng Nhật | ja-JP | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mẫu khẩn cấp | Review required before publish | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-L01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến L02 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### L01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Localization manager

**Câu hỏi chính:** Trong “Mức độ hoàn thiện ngôn ngữ”, Tiếng Việt, Tiếng Anh cho biết điều gì và vai trò Localization manager có thể thực hiện “Open translation workspace” trong phạm vi này không?

**Hình chính:** Lưới độ phủ ngôn ngữ nêu nội dung khẩn còn thiếu

**Hành động chính:** Mở không gian dịch → L02

**Mở dần chi tiết:** Giữ Tiếng Việt, Tiếng Anh ở lớp quyết định. Đưa chi tiết hỗ trợ của Tiếng Nhật, Mẫu khẩn cấp, lịch sử nguồn, phiên bản và quy tắc FR-L01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Tình huống nghiệm thu V2:** Dùng tình huống “Mức độ hoàn thiện ngôn ngữ” cho Localization manager; đổi Tiếng Việt và làm Mẫu khẩn cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open translation workspace” chỉ tới L02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="l02"></a>
## L02 — Biên tập bản dịch

**EN:** Translation editor · **JA:** 翻訳エディター  
**Yêu cầu:** FR-L02 / WF-18 · **Actor:** Translator · **Surface:** Localization · **Layout:** form

**Mục đích:** Translate a versioned message.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** L01, L06.  
**Đầu ra:** Submit translation review → L03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#L02) · [EN](Prototype.html?lang=en#L02) · [JA](Prototype.html?lang=ja#L02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Mẫu nội dung | Fire evacuation v4 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ngôn ngữ gốc | English | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Ngôn ngữ đích | Japanese | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Biến nội dung | site_name + issued_at | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Kiểm tra | Required | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-L02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến L03 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### L02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Translator

**Câu hỏi chính:** Trong “Biên tập bản dịch”, Mẫu nội dung, Ngôn ngữ gốc cho biết điều gì và vai trò Translator có thể thực hiện “Submit translation review” trong phạm vi này không?

**Hình chính:** Bộ soạn nguồn, dịch song song có biến được bảo vệ

**Hành động chính:** Gửi duyệt bản dịch → L03

**Mở dần chi tiết:** Giữ Mẫu nội dung, Ngôn ngữ gốc ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ đích, Biến nội dung, Kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-L02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Tình huống nghiệm thu V2:** Dùng tình huống “Biên tập bản dịch” cho Translator; đổi Mẫu nội dung và làm Kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit translation review” chỉ tới L03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="l03"></a>
## L03 — Phê duyệt bản dịch

**EN:** Translation review · **JA:** 翻訳のレビュー  
**Yêu cầu:** FR-L03 / WF-18 · **Actor:** Language reviewer · **Surface:** Localization · **Layout:** detail

**Mục đích:** Review terminology and emergency meaning.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** L02.  
**Đầu ra:** Approve translation version → L01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#L03) · [EN](Prototype.html?lang=en#L03) · [JA](Prototype.html?lang=ja#L03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phiên bản gốc | 4 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ngôn ngữ đích | ja-JP | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đối chiếu biến | Passed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Văn bản giọng đọc | Matched | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người kiểm tra | Independent language reviewer | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-L03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến L01 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### L03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Language reviewer

**Câu hỏi chính:** Trong “Phê duyệt bản dịch”, Phiên bản gốc, Ngôn ngữ đích cho biết điều gì và vai trò Language reviewer có thể thực hiện “Approve translation version” trong phạm vi này không?

**Hình chính:** Kiểm tra khớp phiên bản văn bản, biến và bản chữ giọng

**Hành động chính:** Duyệt phiên bản dịch → L01

**Mở dần chi tiết:** Giữ Phiên bản gốc, Ngôn ngữ đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Đối chiếu biến, Văn bản giọng đọc, Người kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-L03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phê duyệt bản dịch” cho Language reviewer; đổi Phiên bản gốc và làm Người kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve translation version” chỉ tới L01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="l04"></a>
## L04 — Giọng đọc và phát âm

**EN:** Voice & pronunciation · **JA:** 音声と発音  
**Yêu cầu:** FR-L04 / WF-18 · **Actor:** Content editor · **Surface:** Localization · **Layout:** form

**Mục đích:** Keep speech aligned with reviewed text.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** P08.  
**Đầu ra:** Save voice configuration → L01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#L04) · [EN](Prototype.html?lang=en#L04) · [JA](Prototype.html?lang=ja#L04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ngôn ngữ / vùng | ja-JP | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Giọng đọc | Approved Japanese voice | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Văn bản giọng đọc | Approved template v4 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phát âm địa điểm | Reviewed | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Dự phòng | Text transcript | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-L04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến L01 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### L04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Content editor

**Câu hỏi chính:** Trong “Giọng đọc và phát âm”, Ngôn ngữ / vùng, Giọng đọc cho biết điều gì và vai trò Content editor có thể thực hiện “Save voice configuration” trong phạm vi này không?

**Hình chính:** Mẫu phát âm cạnh bản chữ chính xác và dự phòng

**Hành động chính:** Lưu cấu hình giọng → L01

**Mở dần chi tiết:** Giữ Ngôn ngữ / vùng, Giọng đọc ở lớp quyết định. Đưa chi tiết hỗ trợ của Văn bản giọng đọc, Phát âm địa điểm, Dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-L04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Tình huống nghiệm thu V2:** Dùng tình huống “Giọng đọc và phát âm” cho Content editor; đổi Ngôn ngữ / vùng và làm Dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save voice configuration” chỉ tới L01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="l05"></a>
## L05 — Quy tắc ngôn ngữ dự phòng

**EN:** Locale fallback policy · **JA:** 言語フォールバック設定  
**Yêu cầu:** FR-L05 / WF-18 · **Actor:** Tenant admin · **Surface:** Localization · **Layout:** form

**Mục đích:** Make missing translations visible.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save language policy → L01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#L05) · [EN](Prototype.html?lang=en#L05) · [JA](Prototype.html?lang=ja#L05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Được hỗ trợ | vi-VN / en / ja-JP | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lựa chọn người dùng | Explicit profile choice | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thiếu nội dung khẩn cấp | Approved fallback only | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ngôn ngữ dự phòng | English | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-L05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến L01 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### L05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Tenant admin

**Câu hỏi chính:** Trong “Quy tắc ngôn ngữ dự phòng”, Được hỗ trợ, Lựa chọn người dùng cho biết điều gì và vai trò Tenant admin có thể thực hiện “Save language policy” trong phạm vi này không?

**Hình chính:** Cây dự phòng ngôn ngữ nêu hành vi khi thiếu nội dung khẩn

**Hành động chính:** Lưu chính sách ngôn ngữ → L01

**Mở dần chi tiết:** Giữ Được hỗ trợ, Lựa chọn người dùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiếu nội dung khẩn cấp, Ngôn ngữ dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-L05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Tình huống nghiệm thu V2:** Dùng tình huống “Quy tắc ngôn ngữ dự phòng” cho Tenant admin; đổi Được hỗ trợ và làm Ngôn ngữ dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Save language policy” chỉ tới L01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="l06"></a>
## L06 — Thuật ngữ khẩn cấp

**EN:** Emergency terminology · **JA:** 緊急対応用語  
**Yêu cầu:** FR-L06 / WF-18 · **Actor:** Language reviewer · **Surface:** Localization · **Layout:** list

**Mục đích:** Keep terms consistent across channels.  
**Quy tắc chính:** Việt–Anh–Nhật có phiên bản nội dung riêng và fallback được duyệt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review translation editor → L02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#L06) · [EN](Prototype.html?lang=en#L06) · [JA](Prototype.html?lang=ja#L06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| SOS | Yêu cầu trợ giúp / Assistance request / 救援要請 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Safe | Tự báo an toàn / Self-reported safe / 本人の安全報告 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Unknown | Chưa rõ / Unknown / 不明 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-L06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến L02 với payload/version hợp lệ, bị chặn khi guard của WF-18 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### L06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Language reviewer

**Câu hỏi chính:** Trong “Thuật ngữ khẩn cấp”, SOS, Safe cho biết điều gì và vai trò Language reviewer có thể thực hiện “Review translation editor” trong phạm vi này không?

**Hình chính:** So sánh thuật ngữ tách an toàn, chưa rõ và SOS

**Hành động chính:** Xem trình dịch → L02

**Mở dần chi tiết:** Giữ SOS, Safe ở lớp quyết định. Đưa chi tiết hỗ trợ của Unknown, lịch sử nguồn, phiên bản và quy tắc FR-L06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chặn công bố khi biến quan trọng, phiên bản nguồn hoặc nghĩa giọng duyệt lệch; hiện rõ bản dịch thiếu.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thuật ngữ khẩn cấp” cho Language reviewer; đổi SOS và làm Unknown không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review translation editor” chỉ tới L02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c31"></a>
## C31 — Thành viên và lời mời nhóm

**EN:** Circle membership & invitations · **JA:** グループメンバーと招待  
**Yêu cầu:** FR-C31 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** list

**Mục đích:** Control who receives your updates.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** C32.  
**Đầu ra:** Manage invitation → C32.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C31) · [EN](Prototype.html?lang=en#C31) · [JA](Prototype.html?lang=ja#C31)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Alex | Owner | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Jamie | Member | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | Invite pending | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chia sẻ | Status only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C31:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C32 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C31 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Thành viên và lời mời nhóm”, Alex, Jamie cho biết điều gì và vai trò Citizen có thể thực hiện “Manage invitation” trong phạm vi này không?

**Hình chính:** Danh sách nhóm với trạng thái lời mời và quyền chia sẻ

**Hành động chính:** Quản lý lời mời → C32

**Mở dần chi tiết:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Chia sẻ, lịch sử nguồn, phiên bản và quy tắc FR-C31 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thành viên và lời mời nhóm” cho Citizen; đổi Alex và làm Chia sẻ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Manage invitation” chỉ tới C32 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c32"></a>
## C32 — Mời thành viên nhóm

**EN:** Invite circle member · **JA:** メンバーの招待  
**Yêu cầu:** FR-C32 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Invite someone you trust.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** C31.  
**Đầu ra:** Create invitation — sample → C31.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C32) · [EN](Prototype.html?lang=en#C32) · [JA](Prototype.html?lang=ja#C32)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nhóm | Family | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Liên hệ | jamie@example.test | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vai trò | Member | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Hạn lời mời | 7 days | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |
| Quyền xem vị trí | Not included | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C32:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C31 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C32 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Mời thành viên nhóm”, Nhóm, Liên hệ cho biết điều gì và vai trò Citizen có thể thực hiện “Create invitation — sample” trong phạm vi này không?

**Hình chính:** Xem trước lời mời với người nhận, vai trò và quyền vị trí

**Hành động chính:** Tạo lời mời · mẫu → C31

**Mở dần chi tiết:** Giữ Nhóm, Liên hệ ở lớp quyết định. Đưa chi tiết hỗ trợ của Vai trò, Hạn lời mời, Quyền xem vị trí, lịch sử nguồn, phiên bản và quy tắc FR-C32 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Mời thành viên nhóm” cho Citizen; đổi Nhóm và làm Quyền xem vị trí không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Create invitation — sample” chỉ tới C31 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c33"></a>
## C33 — Báo cáo hoặc chặn hội thoại

**EN:** Report or block conversation · **JA:** 会話の報告・ブロック  
**Yêu cầu:** FR-C33 / WF-12 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Control unwanted social contact.  
**Quy tắc chính:** Báo an toàn là trạng thái của một người, không tự đóng sự cố.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Submit report — sample → C19.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C33) · [EN](Prototype.html?lang=en#C33) · [JA](Prototype.html?lang=ja#C33)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hội thoại | Travel team | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lý do | Unwanted messages | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Hành động | Report and block sender | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Cảnh báo địa điểm | Remain governed by safety policy | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C33:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C19 với payload/version hợp lệ, bị chặn khi guard của WF-12 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C33 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Báo cáo hoặc chặn hội thoại”, Hội thoại, Lý do cho biết điều gì và vai trò Citizen có thể thực hiện “Submit report — sample” trong phạm vi này không?

**Hình chính:** Phạm vi báo cáo hội thoại và tác động chặn lên cảnh báo

**Hành động chính:** Gửi báo cáo · mẫu → C19

**Mở dần chi tiết:** Giữ Hội thoại, Lý do ở lớp quyết định. Đưa chi tiết hỗ trợ của Hành động, Cảnh báo địa điểm, lịch sử nguồn, phiên bản và quy tắc FR-C33 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Báo cáo hoặc chặn hội thoại” cho Citizen; đổi Hội thoại và làm Cảnh báo địa điểm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Submit report — sample” chỉ tới C19 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c34"></a>
## C34 — Tùy chọn thông báo

**EN:** Notification preferences · **JA:** 通知設定  
**Yêu cầu:** FR-C34 / WF-10 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Choose channels and quiet hours.  
**Quy tắc chính:** Đã gửi không có nghĩa đã nhận, đã đọc hoặc đã có người phản hồi.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save preferences → C01.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C34) · [EN](Prototype.html?lang=en#C34) · [JA](Prototype.html?lang=ja#C34)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ngôn ngữ | Profile language | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Tin nhắn nhóm | Quiet hours enabled | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Cảnh báo an toàn | Site policy applies | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Yêu cầu kín đáo | No sound | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| SMS | Verified contact required | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C34:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C01 với payload/version hợp lệ, bị chặn khi guard của WF-10 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C34 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Tùy chọn thông báo”, Ngôn ngữ, Tin nhắn nhóm cho biết điều gì và vai trò Citizen có thể thực hiện “Save preferences” trong phạm vi này không?

**Hình chính:** Tùy chọn thông báo xã hội, an toàn và kín đáo riêng

**Hành động chính:** Lưu tùy chọn → C01

**Mở dần chi tiết:** Giữ Ngôn ngữ, Tin nhắn nhóm ở lớp quyết định. Đưa chi tiết hỗ trợ của Cảnh báo an toàn, Yêu cầu kín đáo, SMS, lịch sử nguồn, phiên bản và quy tắc FR-C34 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tùy chọn thông báo” cho Citizen; đổi Ngôn ngữ và làm SMS không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save preferences” chỉ tới C01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o31"></a>
## O31 — Lưu trữ và mở lại sự cố

**EN:** Incident archive & reopen · **JA:** 過去のインシデント  
**Yêu cầu:** FR-O31 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** list

**Mục đích:** Review closed incidents with full history.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review reopening → O32.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O31) · [EN](Prototype.html?lang=en#O31) · [JA](Prototype.html?lang=ja#O31)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| INC-2032 | Closed · documented handover | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| INC-2028 | Dismissed · false detection | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| INC-2010 | Closed · all tasks resolved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O31:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O32 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O31 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Lưu trữ và mở lại sự cố”, INC-2032, INC-2028 cho biết điều gì và vai trò Supervisor có thể thực hiện “Review reopening” trong phạm vi này không?

**Hình chính:** Kho sự cố đóng giữ nguyên lịch sử gốc

**Hành động chính:** Xem mở lại → O32

**Mở dần chi tiết:** Giữ INC-2032, INC-2028 ở lớp quyết định. Đưa chi tiết hỗ trợ của INC-2010, lịch sử nguồn, phiên bản và quy tắc FR-O31 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Lưu trữ và mở lại sự cố” cho Supervisor; đổi INC-2032 và làm INC-2010 không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review reopening” chỉ tới O32 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o32"></a>
## O32 — Mở lại sự cố

**EN:** Reopen incident · **JA:** インシデントの再開  
**Yêu cầu:** FR-O32 / WF-20 · **Actor:** Supervisor · **Surface:** Command · **Layout:** form

**Mục đích:** Record why response needs to resume.  
**Quy tắc chính:** Mỗi quyết định cần có chủ thể, bằng chứng, thời điểm và quy trình khôi phục.  
**Đầu vào:** O31.  
**Đầu ra:** Reopen incident — sample → O04.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O32) · [EN](Prototype.html?lang=en#O32) · [JA](Prototype.html?lang=ja#O32)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Sự cố | INC-2032 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lý do | New related evidence | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Người phụ trách | Campus command | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Mức độ | P1 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lịch sử | Preserved | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O32:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O04 với payload/version hợp lệ, bị chặn khi guard của WF-20 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O32 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Mở lại sự cố”, Sự cố, Lý do cho biết điều gì và vai trò Supervisor có thể thực hiện “Reopen incident — sample” trong phạm vi này không?

**Hình chính:** Xem trước mở lại với người phụ trách mới và bằng chứng giữ

**Hành động chính:** Mở lại sự cố · mẫu → O04

**Mở dần chi tiết:** Giữ Sự cố, Lý do ở lớp quyết định. Đưa chi tiết hỗ trợ của Người phụ trách, Mức độ, Lịch sử, lịch sử nguồn, phiên bản và quy tắc FR-O32 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Mở lại sự cố” cho Supervisor; đổi Sự cố và làm Lịch sử không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Reopen incident — sample” chỉ tới O04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o33"></a>
## O33 — Chia sẻ sự cố liên tổ chức

**EN:** Federated incident sharing · **JA:** 組織間のインシデント共有  
**Yêu cầu:** FR-O33 / WF-17 · **Actor:** Supervisor · **Surface:** Command · **Layout:** detail

**Mục đích:** Share a controlled incident projection.  
**Quy tắc chính:** Chỉ kết nối năng lực đã khai báo và kiểm thử; không phát lại lệnh vật lý.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review partner exchange → I10.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O33) · [EN](Prototype.html?lang=en#O33) · [JA](Prototype.html?lang=ja#O33)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Đối tác | City command | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Trường dữ liệu | Incident location + pseudonymous SOS | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thẩm quyền | Local incident owner retained | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thỏa thuận | Version 3 approved | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O33:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I10 với payload/version hợp lệ, bị chặn khi guard của WF-17 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O33 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Chia sẻ sự cố liên tổ chức”, Đối tác, Trường dữ liệu cho biết điều gì và vai trò Supervisor có thể thực hiện “Review partner exchange” trong phạm vi này không?

**Hình chính:** Xem trước trao đổi đối tác có trường chia sẻ và thẩm quyền

**Hành động chính:** Xem trao đổi đối tác → I10

**Mở dần chi tiết:** Giữ Đối tác, Trường dữ liệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Thẩm quyền, Thỏa thuận, lịch sử nguồn, phiên bản và quy tắc FR-O33 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chia sẻ sự cố liên tổ chức” cho Supervisor; đổi Đối tác và làm Thỏa thuận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review partner exchange” chỉ tới I10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o34"></a>
## O34 — Hàng đợi hỗ trợ tiếp cận

**EN:** Accessibility assistance queue · **JA:** 配慮が必要な方への支援  
**Yêu cầu:** FR-O34 / WF-11 · **Actor:** Dispatcher · **Surface:** Command · **Layout:** list

**Mục đích:** Assign support based on reported needs.  
**Quy tắc chính:** Một nhiệm vụ có một chủ thể nhận trách nhiệm; giữ lịch sử bàn giao.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Assign capable unit → O09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O34) · [EN](Prototype.html?lang=en#O34) · [JA](Prototype.html?lang=ja#O34)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| SOS-041 | Mobility assistance · Room 505 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS-044 | Text communication preferred | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS-046 | Assistance type unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nguồn | Self-reported needs | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O34:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O09 với payload/version hợp lệ, bị chặn khi guard của WF-11 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O34 — Bố cục thị giác V2

**Context:** command · **Role:** Dispatcher

**Câu hỏi chính:** Trong “Hàng đợi hỗ trợ tiếp cận”, SOS-041, SOS-044 cho biết điều gì và vai trò Dispatcher có thể thực hiện “Assign capable unit” trong phạm vi này không?

**Hình chính:** Hàng đợi trợ năng ghép nhu cầu chức năng với đội đủ năng lực

**Hành động chính:** Phân đội đủ năng lực → O09

**Mở dần chi tiết:** Giữ SOS-041, SOS-044 ở lớp quyết định. Đưa chi tiết hỗ trợ của SOS-046, Nguồn, lịch sử nguồn, phiên bản và quy tắc FR-O34 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ phạm vi sự cố, tuổi bằng chứng và người phụ trách hiện rõ; chặn tác động khi thiếu thẩm quyền hoặc bằng chứng hiện hành cần thiết.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hàng đợi hỗ trợ tiếp cận” cho Dispatcher; đổi SOS-041 và làm Nguồn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Assign capable unit” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c35"></a>
## C35 — Dẫn đường thoát hiểm bằng giọng nói

**EN:** Voice evacuation navigation · **JA:** 音声による避難ナビゲーション  
**Yêu cầu:** FR-C35 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** navigation

**Mục đích:** Follow reviewed steps away from the danger area.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** C37, C40.  
**Đầu ra:** Show next instruction → C36.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C35) · [EN](Prototype.html?lang=en#C35) · [JA](Prototype.html?lang=ja#C35)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vị trí | Building A · Floor 05 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chỉ dẫn tiếp theo | Proceed to the marked west stairwell | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chất lượng định vị | QR anchor confirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dữ liệu nguy hiểm | Updated 8 seconds ago | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C35:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C36 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C35 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Dẫn đường thoát hiểm bằng giọng nói”, Vị trí, Chỉ dẫn tiếp theo cho biết điều gì và vai trò Citizen có thể thực hiện “Show next instruction” trong phạm vi này không?

**Hình chính:** Chỉ dẫn mốc tiếp theo trên tuyến tầng và dải chất lượng vị trí

**Hành động chính:** Hiện chỉ dẫn tiếp theo → C36

**Mở dần chi tiết:** Giữ Vị trí, Chỉ dẫn tiếp theo ở lớp quyết định. Đưa chi tiết hỗ trợ của Chất lượng định vị, Dữ liệu nguy hiểm, lịch sử nguồn, phiên bản và quy tắc FR-C35 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Dừng lời đọc cũ khi phiên bản chỉ dẫn đổi; vị trí cũ không được tự chuyển mốc tiếp theo.

**Tình huống nghiệm thu V2:** Dùng tình huống “Dẫn đường thoát hiểm bằng giọng nói” cho Citizen; đổi Vị trí và làm Dữ liệu nguy hiểm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Show next instruction” chỉ tới C36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c36"></a>
## C36 — Chặng dẫn đường và phương hướng

**EN:** Navigation step & orientation · **JA:** 経路案内と方向確認  
**Yêu cầu:** FR-C36 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** navigation

**Mục đích:** Use the WEST STAIR sign as your landmark.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** C35, C36, C39.  
**Đầu ra:** Repeat voice instruction → C36.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C36) · [EN](Prototype.html?lang=en#C36) · [JA](Prototype.html?lang=ja#C36)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chặng | 2 of 5 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hướng dẫn | Continue to the WEST STAIR sign | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hướng | Uncertain · landmark guidance | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tuyến hỗ trợ tiếp cận | Assistance refuge B | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C36:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C36 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C36 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Chặng dẫn đường và phương hướng”, Chặng, Hướng dẫn cho biết điều gì và vai trò Citizen có thể thực hiện “Repeat voice instruction” trong phạm vi này không?

**Hình chính:** Một bước điều hướng có hình mốc và nhãn tin cậy hướng

**Hành động chính:** Nghe lại chỉ dẫn → C36

**Mở dần chi tiết:** Giữ Chặng, Hướng dẫn ở lớp quyết định. Đưa chi tiết hỗ trợ của Hướng, Tuyến hỗ trợ tiếp cận, lịch sử nguồn, phiên bản và quy tắc FR-C36 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Hướng chưa rõ phải bỏ mũi tên chỉ hướng; dùng mốc xác minh và định hướng thủ công thay vì bịa trái, phải.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chặng dẫn đường và phương hướng” cho Citizen; đổi Chặng và làm Tuyến hỗ trợ tiếp cận không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Repeat voice instruction” chỉ tới C36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c37"></a>
## C37 — Thông báo thay đổi tuyến

**EN:** Route change notification · **JA:** 経路変更のお知らせ  
**Yêu cầu:** FR-C37 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Mục đích:** The previous route is no longer recommended.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review updated route → C35.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C37) · [EN](Prototype.html?lang=en#C37) · [JA](Prototype.html?lang=ja#C37)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Lý do | New hazard reported on corridor E | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tuyến cũ | Withdrawn | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chỉ dẫn mới | Follow the newly reviewed west route | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phiên bản hướng dẫn | 18 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C37:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C35 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C37 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Thông báo thay đổi tuyến”, Lý do, Tuyến cũ cho biết điều gì và vai trò Citizen có thể thực hiện “Review updated route” trong phạm vi này không?

**Hình chính:** Tuyến cũ bị thu hồi cạnh tuyến thay thế được duyệt và lý do

**Hành động chính:** Xem tuyến cập nhật → C35

**Mở dần chi tiết:** Giữ Lý do, Tuyến cũ ở lớp quyết định. Đưa chi tiết hỗ trợ của Chỉ dẫn mới, Phiên bản hướng dẫn, lịch sử nguồn, phiên bản và quy tắc FR-C37 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Thu hồi hình tuyến cũ và lời đọc chờ cùng lúc; không hiện tuyến thay thế được duyệt trước nhận phiên bản.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thông báo thay đổi tuyến” cho Citizen; đổi Lý do và làm Phiên bản hướng dẫn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review updated route” chỉ tới C35 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c38"></a>
## C38 — Chưa rõ vị trí hoặc không có tuyến

**EN:** Position uncertain / no route · **JA:** 位置不明・経路なし  
**Yêu cầu:** FR-C38 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** alert

**Mục đích:** We cannot verify a route from your position.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Request assistance → C05.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C38) · [EN](Prototype.html?lang=en#C38) · [JA](Prototype.html?lang=ja#C38)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tầng | Not confirmed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hướng | Unreliable indoors | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bước tiếp theo | Identify a marked location or request help | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Giọng đọc | Location uncertainty announced | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C38:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C05 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C38 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Chưa rõ vị trí hoặc không có tuyến”, Tầng, Hướng cho biết điều gì và vai trò Citizen có thể thực hiện “Request assistance” trong phạm vi này không?

**Hình chính:** Bảng tầng, hướng chưa rõ với nhập vị trí và yêu cầu hỗ trợ

**Hành động chính:** Yêu cầu trợ giúp → C05

**Mở dần chi tiết:** Giữ Tầng, Hướng ở lớp quyết định. Đưa chi tiết hỗ trợ của Bước tiếp theo, Giọng đọc, lịch sử nguồn, phiên bản và quy tắc FR-C38 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Không bịa tuyến hoặc hướng. Giữ chỉnh vị trí và trợ giúp truy cập được mà không buộc khôi phục quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chưa rõ vị trí hoặc không có tuyến” cho Citizen; đổi Tầng và làm Giọng đọc không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Request assistance” chỉ tới C05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c39"></a>
## C39 — Di chuyển khỏi vùng nguy hiểm

**EN:** Outdoor hazard avoidance · **JA:** 危険区域からの移動  
**Yêu cầu:** FR-C39 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** navigation

**Mục đích:** Leave the affected area using reviewed guidance.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** View next route step → C36.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C39) · [EN](Prototype.html?lang=en#C39) · [JA](Prototype.html?lang=ja#C39)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Khu vực | Riverside flood polygon | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điểm đến | North assembly point | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tình trạng đường | Verified segments only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đoạn chưa xác minh | Excluded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C39:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C36 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C39 — Bố cục thị giác V2

**Context:** emergency · **Role:** Citizen

**Câu hỏi chính:** Trong “Di chuyển khỏi vùng nguy hiểm”, Khu vực, Điểm đến cho biết điều gì và vai trò Citizen có thể thực hiện “View next route step” trong phạm vi này không?

**Hình chính:** Ranh giới nguy cơ ngoài trời, đích đến và đoạn đường chưa rõ

**Hành động chính:** Xem bước tiếp theo → C36

**Mở dần chi tiết:** Giữ Khu vực, Điểm đến ở lớp quyết định. Đưa chi tiết hỗ trợ của Tình trạng đường, Đoạn chưa xác minh, lịch sử nguồn, phiên bản và quy tắc FR-C39 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Di chuyển khỏi vùng nguy hiểm” cho Citizen; đổi Khu vực và làm Đoạn chưa xác minh không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “View next route step” chỉ tới C36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="c40"></a>
## C40 — Ngôn ngữ và tùy chọn giọng đọc

**EN:** Voice language & guidance settings · **JA:** 音声案内の設定  
**Yêu cầu:** FR-C40 / WF-22 · **Actor:** Citizen · **Surface:** Citizen · **Layout:** form

**Mục đích:** Choose how guidance reaches you.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save guidance preferences → C35.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#C40) · [EN](Prototype.html?lang=en#C40) · [JA](Prototype.html?lang=ja#C40)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ngôn ngữ | Vietnamese / English / Japanese | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Giọng đọc | Device-supported reviewed voice | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Tốc độ giọng đọc | Normal | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Rung | On | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Chế độ kín đáo | Respected | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-C40:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến C35 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### C40 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Ngôn ngữ và tùy chọn giọng đọc”, Ngôn ngữ, Giọng đọc cho biết điều gì và vai trò Citizen có thể thực hiện “Save guidance preferences” trong phạm vi này không?

**Hình chính:** Mẫu giọng đọc, tốc độ và xem trước chế độ kín đáo

**Hành động chính:** Lưu tùy chọn chỉ dẫn → C35

**Mở dần chi tiết:** Giữ Ngôn ngữ, Giọng đọc ở lớp quyết định. Đưa chi tiết hỗ trợ của Tốc độ giọng đọc, Rung, Chế độ kín đáo, lịch sử nguồn, phiên bản và quy tắc FR-C40 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách ý định cục bộ khỏi giao nhận xác nhận và ghi nguồn xác minh cuối; thiếu quan sát không được chuyển thành an toàn.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ngôn ngữ và tùy chọn giọng đọc” cho Citizen; đổi Ngôn ngữ và làm Chế độ kín đáo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save guidance preferences” chỉ tới C35 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p01"></a>
## P01 — Vùng loa và độ bao phủ

**EN:** Speaker zones & coverage · **JA:** 放送区域とカバレッジ  
**Yêu cầu:** FR-P01 / WF-21 · **Actor:** PA operator · **Surface:** Public address · **Layout:** map

**Mục đích:** Reach people without a smartphone.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** P05, P09, O36.  
**Đầu ra:** Select broadcast zones → P02.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P01) · [EN](Prototype.html?lang=en#P01) · [JA](Prototype.html?lang=ja#P01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Building A | Floors 01–08 · 24 speakers | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Outdoor campus | 6 speakers | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khoảng trống bao phủ | West loading bay | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sự cố đang xử lý | INC-2041 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P02 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P01 — Bố cục thị giác V2

**Context:** command · **Role:** PA operator

**Câu hỏi chính:** Trong “Vùng loa và độ bao phủ”, Building A, Outdoor campus cho biết điều gì và vai trò PA operator có thể thực hiện “Select broadcast zones” trong phạm vi này không?

**Hình chính:** Bản đồ phủ loa có vùng thiếu và bối cảnh sự cố

**Hành động chính:** Chọn vùng phát → P02

**Mở dần chi tiết:** Giữ Building A, Outdoor campus ở lớp quyết định. Đưa chi tiết hỗ trợ của Khoảng trống bao phủ, Sự cố đang xử lý, lịch sử nguồn, phiên bản và quy tắc FR-P01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Vùng loa và độ bao phủ” cho PA operator; đổi Building A và làm Sự cố đang xử lý không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Select broadcast zones” chỉ tới P02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p02"></a>
## P02 — Soạn thông báo cứu hộ

**EN:** Compose rescue announcement · **JA:** 救援放送の作成  
**Yêu cầu:** FR-P02 / WF-21 · **Actor:** PA author · **Surface:** Public address · **Layout:** form

**Mục đích:** Prepare an announcement for the right area.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** P01.  
**Đầu ra:** Preview announcement → P03.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P02) · [EN](Prototype.html?lang=en#P02) · [JA](Prototype.html?lang=ja#P02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Các vùng | A05 + stairwell W | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ưu tiên | Emergency | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ngôn ngữ | vi-VN / en / ja-JP | Locale được hỗ trợ vi-VN/en/ja-JP; nội dung critical cần approved version. |
| Nguồn | Approved rescue template | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Hết hiệu lực | 60 seconds after approval | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P03 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P02 — Bố cục thị giác V2

**Context:** command · **Role:** PA author

**Câu hỏi chính:** Trong “Soạn thông báo cứu hộ”, Các vùng, Ưu tiên cho biết điều gì và vai trò PA author có thể thực hiện “Preview announcement” trong phạm vi này không?

**Hình chính:** Xem trước chữ, âm thanh thông báo gắn vùng và hết hạn

**Hành động chính:** Xem trước thông báo → P03

**Mở dần chi tiết:** Giữ Các vùng, Ưu tiên ở lớp quyết định. Đưa chi tiết hỗ trợ của Ngôn ngữ, Nguồn, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-P02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Soạn thông báo cứu hộ” cho PA author; đổi Các vùng và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Preview announcement” chỉ tới P03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p03"></a>
## P03 — Nghe thử và duyệt thông báo

**EN:** Preview & approve announcement · **JA:** 放送の確認と承認  
**Yêu cầu:** FR-P03 / WF-21 · **Actor:** PA approver · **Surface:** Public address · **Layout:** detail

**Mục đích:** Check message, zones and playback behavior.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** P02.  
**Đầu ra:** Approve sample playback → P04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P03) · [EN](Prototype.html?lang=en#P03) · [JA](Prototype.html?lang=ja#P03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phiên bản thông điệp | PA-04 v3 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Loa được chọn | 8 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thứ tự ngôn ngữ | Vietnamese → English → Japanese | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Số lần lặp | 2 cycles | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người duyệt | Independent supervisor | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P04 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P03 — Bố cục thị giác V2

**Context:** command · **Role:** PA approver

**Câu hỏi chính:** Trong “Nghe thử và duyệt thông báo”, Phiên bản thông điệp, Loa được chọn cho biết điều gì và vai trò PA approver có thể thực hiện “Approve sample playback” trong phạm vi này không?

**Hình chính:** Đúng phiên bản tin với loa chọn và thứ tự ngôn ngữ

**Hành động chính:** Duyệt phát mẫu → P04

**Mở dần chi tiết:** Giữ Phiên bản thông điệp, Loa được chọn ở lớp quyết định. Đưa chi tiết hỗ trợ của Thứ tự ngôn ngữ, Số lần lặp, Người duyệt, lịch sử nguồn, phiên bản và quy tắc FR-P03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Nghe thử và duyệt thông báo” cho PA approver; đổi Phiên bản thông điệp và làm Người duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve sample playback” chỉ tới P04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p04"></a>
## P04 — Giám sát phát loa

**EN:** Speaker playback monitoring · **JA:** 放送状況の監視  
**Yêu cầu:** FR-P04 / WF-21 · **Actor:** PA operator · **Surface:** Public address · **Layout:** timeline

**Mục đích:** Track playback separately from command receipt.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** P03, P06.  
**Đầu ra:** Inspect speaker health → P05.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P04) · [EN](Prototype.html?lang=en#P04) · [JA](Prototype.html?lang=ja#P04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Bộ điều khiển | Accepted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Loa | 7 playing · 1 unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Xác minh âm thanh thực tế | Not available | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tiếp theo | Inspect unavailable speaker | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P05 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P04 — Bố cục thị giác V2

**Context:** command · **Role:** PA operator

**Câu hỏi chính:** Trong “Giám sát phát loa”, Bộ điều khiển, Loa cho biết điều gì và vai trò PA operator có thể thực hiện “Inspect speaker health” trong phạm vi này không?

**Hình chính:** Tiến trình phát tách bộ điều khiển nhận và nghe được

**Hành động chính:** Kiểm tra sức khỏe loa → P05

**Mở dần chi tiết:** Giữ Bộ điều khiển, Loa ở lớp quyết định. Đưa chi tiết hỗ trợ của Xác minh âm thanh thực tế, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-P04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Loa nhận không chứng minh người trong vùng nghe được; vùng thiếu phủ và bằng chứng âm học chưa rõ phải nổi bật.

**Tình huống nghiệm thu V2:** Dùng tình huống “Giám sát phát loa” cho PA operator; đổi Bộ điều khiển và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect speaker health” chỉ tới P05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p05"></a>
## P05 — Thiết bị loa và tự kiểm tra

**EN:** Speaker device & self-test · **JA:** スピーカーと自己診断  
**Yêu cầu:** FR-P05 / WF-21 · **Actor:** Device admin · **Surface:** Public address · **Layout:** detail

**Mục đích:** SPK-A05-08 · playback unknown.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** P04.  
**Đầu ra:** Open coverage fallback → P01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P05) · [EN](Prototype.html?lang=en#P05) · [JA](Prototype.html?lang=ja#P05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nguồn điện | Online | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mạng | Connected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bộ khuếch đại | Fault detected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tự kiểm tra gần nhất | Yesterday | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bao phủ thay thế | Patrol announcement | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P01 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P05 — Bố cục thị giác V2

**Context:** command · **Role:** Device admin

**Câu hỏi chính:** Trong “Thiết bị loa và tự kiểm tra”, Nguồn điện, Mạng cho biết điều gì và vai trò Device admin có thể thực hiện “Open coverage fallback” trong phạm vi này không?

**Hình chính:** Chuỗi nguồn, mạng, ampli loa với tuổi tự kiểm

**Hành động chính:** Mở dự phòng phủ âm → P01

**Mở dần chi tiết:** Giữ Nguồn điện, Mạng ở lớp quyết định. Đưa chi tiết hỗ trợ của Bộ khuếch đại, Tự kiểm tra gần nhất, Bao phủ thay thế, lịch sử nguồn, phiên bản và quy tắc FR-P05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thiết bị loa và tự kiểm tra” cho Device admin; đổi Nguồn điện và làm Bao phủ thay thế không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open coverage fallback” chỉ tới P01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p06"></a>
## P06 — Micro cứu hộ trực tiếp

**EN:** Live rescue microphone · **JA:** 救援用ライブマイク  
**Yêu cầu:** FR-P06 / WF-21 · **Actor:** Authorized announcer · **Surface:** Public address · **Layout:** livevoice

**Mục đích:** Announce live to approved rescue zones.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review live session — sample → P04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P06) · [EN](Prototype.html?lang=en#P06) · [JA](Prototype.html?lang=ja#P06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Các vùng | A05 + stairwell W | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Micro | Permission required | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ưu tiên | Emergency | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thời lượng tối đa | 120 seconds | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ghi âm | Policy-controlled | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P04 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P06 — Bố cục thị giác V2

**Context:** command · **Role:** Authorized announcer

**Câu hỏi chính:** Trong “Micro cứu hộ trực tiếp”, Các vùng, Micro cho biết điều gì và vai trò Authorized announcer có thể thực hiện “Review live session — sample” trong phạm vi này không?

**Hình chính:** Phiên micro trực tiếp với vùng chọn và dừng rõ ràng

**Hành động chính:** Xem phiên trực tiếp · mẫu → P04

**Mở dần chi tiết:** Giữ Các vùng, Micro ở lớp quyết định. Đưa chi tiết hỗ trợ của Ưu tiên, Thời lượng tối đa, Ghi âm, lịch sử nguồn, phiên bản và quy tắc FR-P06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Micro cứu hộ trực tiếp” cho Authorized announcer; đổi Các vùng và làm Ghi âm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review live session — sample” chỉ tới P04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p07"></a>
## P07 — Loa trên drone hoặc phương tiện

**EN:** Drone / vehicle speaker mission · **JA:** ドローン・車両の拡声放送  
**Yêu cầu:** FR-P07 / WF-21 · **Actor:** Drone operator · **Surface:** Public address · **Layout:** form

**Mục đích:** Coordinate mobile public-address support.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review mission → I13.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P07) · [EN](Prototype.html?lang=en#P07) · [JA](Prototype.html?lang=ja#P07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nền tảng | DR-01 speaker payload | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thông điệp | Approved rescue template | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phi công | Assigned | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vùng phát | Campus perimeter | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phát âm thanh | Requires payload feedback | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến I13 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P07 — Bố cục thị giác V2

**Context:** command · **Role:** Drone operator

**Câu hỏi chính:** Trong “Loa trên drone hoặc phương tiện”, Nền tảng, Thông điệp cho biết điều gì và vai trò Drone operator có thể thực hiện “Review mission” trong phạm vi này không?

**Hình chính:** Phạm vi nhiệm vụ loa di động với quyền phi công

**Hành động chính:** Xem nhiệm vụ → I13

**Mở dần chi tiết:** Giữ Nền tảng, Thông điệp ở lớp quyết định. Đưa chi tiết hỗ trợ của Phi công, Vùng phát, Phát âm thanh, lịch sử nguồn, phiên bản và quy tắc FR-P07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Loa trên drone hoặc phương tiện” cho Drone operator; đổi Nền tảng và làm Phát âm thanh không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review mission” chỉ tới I13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p08"></a>
## P08 — Thư viện âm thanh và duyệt TTS

**EN:** Audio library & TTS review · **JA:** 音声ライブラリーとTTS審査  
**Yêu cầu:** FR-P08 / WF-21 · **Actor:** Content editor · **Surface:** Public address · **Layout:** list

**Mục đích:** Use approved speech in every supported language.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Edit voice content → L04.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P08) · [EN](Prototype.html?lang=en#P08) · [JA](Prototype.html?lang=ja#P08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| PA-04 vi-VN | Reviewed recording | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| PA-04 en | Reviewed recording | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| PA-04 ja-JP | TTS reviewed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phát âm | Site names verified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến L04 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P08 — Bố cục thị giác V2

**Context:** configuration · **Role:** Content editor

**Câu hỏi chính:** Trong “Thư viện âm thanh và duyệt TTS”, PA-04 vi-VN, PA-04 en cho biết điều gì và vai trò Content editor có thể thực hiện “Edit voice content” trong phạm vi này không?

**Hình chính:** Thư viện âm ngôn ngữ với duyệt phát âm và bản chữ

**Hành động chính:** Sửa nội dung giọng → L04

**Mở dần chi tiết:** Giữ PA-04 vi-VN, PA-04 en ở lớp quyết định. Đưa chi tiết hỗ trợ của PA-04 ja-JP, Phát âm, lịch sử nguồn, phiên bản và quy tắc FR-P08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Thư viện âm thanh và duyệt TTS” cho Content editor; đổi PA-04 vi-VN và làm Phát âm không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Edit voice content” chỉ tới L04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="p09"></a>
## P09 — Ưu tiên và điều phối phát loa

**EN:** PA priority & arbitration · **JA:** 放送の優先順位と調整  
**Yêu cầu:** FR-P09 / WF-21 · **Actor:** PA admin · **Surface:** Public address · **Layout:** form

**Mục đích:** Avoid competing announcements.  
**Quy tắc chính:** Theo dõi từng loa; đã phát xong không chứng minh mọi người đã nghe.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save arbitration policy → P01.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#P09) · [EN](Prototype.html?lang=en#P09) · [JA](Prototype.html?lang=ja#P09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ưu tiên cao nhất | Local certified emergency controller | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thông báo cứu hộ từ cloud | Approved priority tier | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Âm thanh thường ngày | Preemptible | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Mất kết nối | Local controller policy | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Phát tiếp | Explicit decision | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-P09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P01 với payload/version hợp lệ, bị chặn khi guard của WF-21 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### P09 — Bố cục thị giác V2

**Context:** configuration · **Role:** PA admin

**Câu hỏi chính:** Trong “Ưu tiên và điều phối phát loa”, Ưu tiên cao nhất, Thông báo cứu hộ từ cloud cho biết điều gì và vai trò PA admin có thể thực hiện “Save arbitration policy” trong phạm vi này không?

**Hình chính:** Ngăn ưu tiên phân xử thể hiện ưu tiên cục bộ và mất nối

**Hành động chính:** Lưu chính sách phân xử → P01

**Mở dần chi tiết:** Giữ Ưu tiên cao nhất, Thông báo cứu hộ từ cloud ở lớp quyết định. Đưa chi tiết hỗ trợ của Âm thanh thường ngày, Mất kết nối, Phát tiếp, lịch sử nguồn, phiên bản và quy tắc FR-P09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách bộ điều khiển nhận, phản hồi phát và xác minh âm học; giữ ưu tiên cục bộ và dừng, hết hạn khi mất nối.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ưu tiên và điều phối phát loa” cho PA admin; đổi Ưu tiên cao nhất và làm Phát tiếp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save arbitration policy” chỉ tới P01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s15"></a>
## S15 — Biên tập mạng lưới thoát hiểm

**EN:** Evacuation graph editor · **JA:** 避難経路グラフの編集  
**Yêu cầu:** FR-S15 / WF-22 · **Actor:** Route designer · **Surface:** Sites · **Layout:** floor

**Mục đích:** Build a versioned indoor and outdoor route graph.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** S16, Q03.  
**Đầu ra:** Review route validation → S16.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S15) · [EN](Prototype.html?lang=en#S15) · [JA](Prototype.html?lang=ja#S15)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nút mạng lưới | Doors · stairs · refuges · exits | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Cạnh kết nối | Direction + width + accessibility | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thang máy | Excluded unless approved evacuation use | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phiên bản bản đồ | 13 draft | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S15:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S16 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S15 — Bố cục thị giác V2

**Context:** configuration · **Role:** Route designer

**Câu hỏi chính:** Trong “Biên tập mạng lưới thoát hiểm”, Nút mạng lưới, Cạnh kết nối cho biết điều gì và vai trò Route designer có thể thực hiện “Review route validation” trong phạm vi này không?

**Hình chính:** Đồ thị thoát hiểm có loại nút, cạnh và đường không tiếp cận

**Hành động chính:** Xem kiểm tra tuyến → S16

**Mở dần chi tiết:** Giữ Nút mạng lưới, Cạnh kết nối ở lớp quyết định. Đưa chi tiết hỗ trợ của Thang máy, Phiên bản bản đồ, lịch sử nguồn, phiên bản và quy tắc FR-S15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Biên tập mạng lưới thoát hiểm” cho Route designer; đổi Nút mạng lưới và làm Phiên bản bản đồ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review route validation” chỉ tới S16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="s16"></a>
## S16 — Mô phỏng và phê duyệt tuyến

**EN:** Route simulation & approval · **JA:** 経路の検証と承認  
**Yêu cầu:** FR-S16 / WF-22 · **Actor:** Safety reviewer · **Surface:** Sites · **Layout:** detail

**Mục đích:** Test hazards, accessibility and uncertainty.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** S15, Q10.  
**Đầu ra:** Publish reviewed graph → S15.  
**Dữ liệu:** Cấu hình/vận hành; không xuất credential hoặc secret.

[Mockup VI](Prototype.html?lang=vi#S16) · [EN](Prototype.html?lang=en#S16) · [JA](Prototype.html?lang=ja#S16)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hành lang bị chặn | Excluded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chưa xác định tầng | No turn-by-turn route | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hồ sơ dùng xe lăn | No stair-only route | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dữ liệu nguy hiểm hết hạn | Guidance degraded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người kiểm tra | Site safety specialist | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-S16:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S15 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### S16 — Bố cục thị giác V2

**Context:** configuration · **Role:** Safety reviewer

**Câu hỏi chính:** Trong “Mô phỏng và phê duyệt tuyến”, Hành lang bị chặn, Chưa xác định tầng cho biết điều gì và vai trò Safety reviewer có thể thực hiện “Publish reviewed graph” trong phạm vi này không?

**Hình chính:** So sánh kịch bản tuyến chặn, chưa rõ và xe lăn

**Hành động chính:** Công bố đồ thị đã duyệt → S15

**Mở dần chi tiết:** Giữ Hành lang bị chặn, Chưa xác định tầng ở lớp quyết định. Đưa chi tiết hỗ trợ của Hồ sơ dùng xe lăn, Dữ liệu nguy hiểm hết hạn, Người kiểm tra, lịch sử nguồn, phiên bản và quy tắc FR-S16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách hình học, cấu hình nháp khỏi dữ liệu vận hành công bố; vô hiệu tuyến hoặc quy tắc phụ thuộc khi phiên bản tham chiếu đổi.

**Tình huống nghiệm thu V2:** Dùng tình huống “Mô phỏng và phê duyệt tuyến” cho Safety reviewer; đổi Hành lang bị chặn và làm Người kiểm tra không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish reviewed graph” chỉ tới S15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o35"></a>
## O35 — Vùng nguy hiểm và hạn chế di chuyển

**EN:** Hazard zones & route restrictions · **JA:** 危険区域と移動制限  
**Yêu cầu:** FR-O35 / WF-22 · **Actor:** Incident commander · **Surface:** Command · **Layout:** map

**Mục đích:** Publish time-bounded movement restrictions.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review guidance impact → O36.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O35) · [EN](Prototype.html?lang=en#O35) · [JA](Prototype.html?lang=ja#O35)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nguy cơ | East corridor smoke report | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hình học vùng | Zone A05-03 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mức chắc chắn | Operator verified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hết hiệu lực | Recheck in 2 minutes | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tuyến bị ảnh hưởng | 3 invalidated | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O35:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O36 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O35 — Bố cục thị giác V2

**Context:** command · **Role:** Incident commander

**Câu hỏi chính:** Trong “Vùng nguy hiểm và hạn chế di chuyển”, Nguy cơ, Hình học vùng cho biết điều gì và vai trò Incident commander có thể thực hiện “Review guidance impact” trong phạm vi này không?

**Hình chính:** Sửa đa giác nguy cơ với đoạn tuyến ảnh hưởng và hết hạn

**Hành động chính:** Xem tác động chỉ dẫn → O36

**Mở dần chi tiết:** Giữ Nguy cơ, Hình học vùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Mức chắc chắn, Hết hiệu lực, Tuyến bị ảnh hưởng, lịch sử nguồn, phiên bản và quy tắc FR-O35 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Hình học hết hạn mất hiệu lực; hạn chế đổi phải chỉ ra phiên bản chỉ dẫn ảnh hưởng trước công bố.

**Tình huống nghiệm thu V2:** Dùng tình huống “Vùng nguy hiểm và hạn chế di chuyển” cho Incident commander; đổi Nguy cơ và làm Tuyến bị ảnh hưởng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review guidance impact” chỉ tới O36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="o36"></a>
## O36 — Phân phối hướng dẫn và biên nhận

**EN:** Guidance distribution & receipts · **JA:** 案内の配信と受領確認  
**Yêu cầu:** FR-O36 / WF-22 · **Actor:** Operator · **Surface:** Command · **Layout:** list

**Mục đích:** Keep app and speaker instructions consistent.  
**Quy tắc chính:** Chỉ dẫn theo mốc nếu hướng không tin cậy; rút tuyến khi dữ liệu hết hạn.  
**Đầu vào:** O35, Q05.  
**Đầu ra:** Open speaker operations → P01.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#O36) · [EN](Prototype.html?lang=en#O36) · [JA](Prototype.html?lang=ja#O36)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phiên bản hướng dẫn | 18 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điện thoại | 312 updated · 28 unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bộ điều khiển loa | Version 18 accepted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tuyến cũ | Withdrawn | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Người chưa liên lạc được | Fallback action required | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-O36:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến P01 với payload/version hợp lệ, bị chặn khi guard của WF-22 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### O36 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Phân phối hướng dẫn và biên nhận”, Phiên bản hướng dẫn, Điện thoại cho biết điều gì và vai trò Operator có thể thực hiện “Open speaker operations” trong phạm vi này không?

**Hình chính:** Phân phối phiên bản chỉ dẫn tách thu hồi và biên nhận

**Hành động chính:** Mở vận hành loa → P01

**Mở dần chi tiết:** Giữ Phiên bản hướng dẫn, Điện thoại ở lớp quyết định. Đưa chi tiết hỗ trợ của Bộ điều khiển loa, Tuyến cũ, Người chưa liên lạc được, lịch sử nguồn, phiên bản và quy tắc FR-O36 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Thu hồi tuyến cũ và giao bản mới có biên nhận riêng; người không liên lạc được vẫn hiện và cần kênh khác.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phân phối hướng dẫn và biên nhận” cho Operator; đổi Phiên bản hướng dẫn và làm Người chưa liên lạc được không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open speaker operations” chỉ tới P01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h01"></a>
## H01 — Hồ sơ hỗ trợ cứu hộ của tôi

**EN:** My rescue assistance profile · **JA:** 自分の救援支援プロフィール  
**Yêu cầu:** FR-H01 / WF-26 · **Actor:** Citizen · **Surface:** Care profiles · **Layout:** form

**Mục đích:** Tell responders what support you may need.  
**Quy tắc chính:** Hồ sơ hỗ trợ có nguồn, ngày rà soát và quyền xem theo từng trường.  
**Đầu vào:** H02.  
**Đầu ra:** Review emergency sharing → H02.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H01) · [EN](Prototype.html?lang=en#H01) · [JA](Prototype.html?lang=ja#H01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nhóm tuổi | 65–74 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Khả năng vận động | Wheelchair user | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Sử dụng cầu thang | Assistance required | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Giao tiếp | Text preferred | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Nguồn | Self-reported | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H02 với payload/version hợp lệ, bị chặn khi guard của WF-26 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H01 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Hồ sơ hỗ trợ cứu hộ của tôi”, Nhóm tuổi, Khả năng vận động cho biết điều gì và vai trò Citizen có thể thực hiện “Review emergency sharing” trong phạm vi này không?

**Hình chính:** Hồ sơ nhu cầu chức năng với biểu tượng di chuyển, giao tiếp

**Hành động chính:** Xem chia sẻ khẩn → H02

**Mở dần chi tiết:** Giữ Nhóm tuổi, Khả năng vận động ở lớp quyết định. Đưa chi tiết hỗ trợ của Sử dụng cầu thang, Giao tiếp, Nguồn, lịch sử nguồn, phiên bản và quy tắc FR-H01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ hỗ trợ cứu hộ của tôi” cho Citizen; đổi Nhóm tuổi và làm Nguồn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review emergency sharing” chỉ tới H02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h02"></a>
## H02 — Chia sẻ thông tin hỗ trợ và sức khỏe

**EN:** Health & assistance sharing · **JA:** 支援・健康情報の共有  
**Yêu cầu:** FR-H02 / WF-26 · **Actor:** Citizen · **Surface:** Care profiles · **Layout:** form

**Mục đích:** Share only what the response team needs.  
**Quy tắc chính:** Hồ sơ hỗ trợ có nguồn, ngày rà soát và quyền xem theo từng trường.  
**Đầu vào:** H01.  
**Đầu ra:** Save sharing preferences → H01.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H02) · [EN](Prototype.html?lang=en#H02) · [JA](Prototype.html?lang=ja#H02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nhu cầu hỗ trợ | Assigned rescue team | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Ghi chú y tế | Authorized medical role only | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Nhóm gia đình | Not shared | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Sự đồng ý | Version 3 | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Ngày rà soát | 2027-01-23 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H01 với payload/version hợp lệ, bị chặn khi guard của WF-26 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Chia sẻ thông tin hỗ trợ và sức khỏe”, Nhu cầu hỗ trợ, Ghi chú y tế cho biết điều gì và vai trò Citizen có thể thực hiện “Save sharing preferences” trong phạm vi này không?

**Hình chính:** Xem trước chia sẻ nhu cầu chức năng và ghi chú y tế riêng

**Hành động chính:** Lưu tùy chọn chia sẻ → H01

**Mở dần chi tiết:** Giữ Nhu cầu hỗ trợ, Ghi chú y tế ở lớp quyết định. Đưa chi tiết hỗ trợ của Nhóm gia đình, Sự đồng ý, Ngày rà soát, lịch sử nguồn, phiên bản và quy tắc FR-H02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chia sẻ thông tin hỗ trợ và sức khỏe” cho Citizen; đổi Nhu cầu hỗ trợ và làm Ngày rà soát không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save sharing preferences” chỉ tới H01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h03"></a>
## H03 — Người chăm sóc được ủy quyền

**EN:** Caregiver relationships · **JA:** 介護者・支援者の権限  
**Yêu cầu:** FR-H03 / WF-26 · **Actor:** Citizen · **Surface:** Care profiles · **Layout:** list

**Mục đích:** Review who can help manage your profile.  
**Quy tắc chính:** Hồ sơ hỗ trợ có nguồn, ngày rà soát và quyền xem theo từng trường.  
**Đầu vào:** H04.  
**Đầu ra:** Review caregiver authority → H04.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H03) · [EN](Prototype.html?lang=en#H03) · [JA](Prototype.html?lang=ja#H03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Jamie | Verified caregiver · assistance profile only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | Emergency contact · no profile access | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Yêu cầu đang chờ | None | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H04 với payload/version hợp lệ, bị chặn khi guard của WF-26 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Citizen

**Câu hỏi chính:** Trong “Người chăm sóc được ủy quyền”, Jamie, Morgan cho biết điều gì và vai trò Citizen có thể thực hiện “Review caregiver authority” trong phạm vi này không?

**Hình chính:** Sơ đồ quan hệ người chăm sóc với quyền chờ và hết hạn

**Hành động chính:** Xem quyền chăm sóc → H04

**Mở dần chi tiết:** Giữ Jamie, Morgan ở lớp quyết định. Đưa chi tiết hỗ trợ của Yêu cầu đang chờ, lịch sử nguồn, phiên bản và quy tắc FR-H03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Người chăm sóc được ủy quyền” cho Citizen; đổi Jamie và làm Yêu cầu đang chờ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 3 trường gốc truy cập được, và “Review caregiver authority” chỉ tới H04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h04"></a>
## H04 — Xác minh quyền người chăm sóc

**EN:** Caregiver authorization · **JA:** 支援者権限の確認  
**Yêu cầu:** FR-H04 / WF-26 · **Actor:** Privacy officer · **Surface:** Care profiles · **Layout:** form

**Mục đích:** Verify authority before granting access.  
**Quy tắc chính:** Hồ sơ hỗ trợ có nguồn, ngày rà soát và quyền xem theo từng trường.  
**Đầu vào:** H03.  
**Đầu ra:** Approve scoped relationship → H03.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H04) · [EN](Prototype.html?lang=en#H04) · [JA](Prototype.html?lang=ja#H04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Người được hỗ trợ | Alex Morgan | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Người chăm sóc | Jamie | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Thẩm quyền | Verified authorization record | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Phạm vi | Assistance profile | Chọn trong tập quyền được cấp; server chặn mở rộng quyền vượt actor. |
| Hết hiệu lực | 2027-01-23 | Datetime UTC + IANA timezone; kiểm tra tương lai, TTL và DST theo workflow. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H03 với payload/version hợp lệ, bị chặn khi guard của WF-26 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Privacy officer

**Câu hỏi chính:** Trong “Xác minh quyền người chăm sóc”, Người được hỗ trợ, Người chăm sóc cho biết điều gì và vai trò Privacy officer có thể thực hiện “Approve scoped relationship” trong phạm vi này không?

**Hình chính:** Đối chiếu chủ thể, người chăm sóc và phạm vi hết hạn

**Hành động chính:** Duyệt quan hệ có phạm vi → H03

**Mở dần chi tiết:** Giữ Người được hỗ trợ, Người chăm sóc ở lớp quyết định. Đưa chi tiết hỗ trợ của Thẩm quyền, Phạm vi, Hết hiệu lực, lịch sử nguồn, phiên bản và quy tắc FR-H04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xác minh quyền người chăm sóc” cho Privacy officer; đổi Người được hỗ trợ và làm Hết hiệu lực không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Approve scoped relationship” chỉ tới H03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h05"></a>
## H05 — Hồ sơ người được chăm sóc

**EN:** Dependent person profile · **JA:** 支援対象者のプロフィール  
**Yêu cầu:** FR-H05 / WF-26 · **Actor:** Authorized caregiver · **Surface:** Care profiles · **Layout:** detail

**Mục đích:** Review the assistance plan with the person.  
**Quy tắc chính:** Hồ sơ hỗ trợ có nguồn, ngày rà soát và quyền xem theo từng trường.  
**Đầu vào:** H06.  
**Đầu ra:** Request profile update → H06.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H05) · [EN](Prototype.html?lang=en#H05) · [JA](Prototype.html?lang=ja#H05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Người | Alex Morgan | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khả năng vận động | Assisted evacuation | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thiết bị | Wheelchair | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ghi chú khẩn cấp | Restricted medical record | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Rà soát gần nhất | 2026-10-01 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H06 với payload/version hợp lệ, bị chặn khi guard của WF-26 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Authorized caregiver

**Câu hỏi chính:** Trong “Hồ sơ người được chăm sóc”, Người, Khả năng vận động cho biết điều gì và vai trò Authorized caregiver có thể thực hiện “Request profile update” trong phạm vi này không?

**Hình chính:** Hồ sơ người phụ thuộc có liên kết thiết bị và tuổi xem xét

**Hành động chính:** Yêu cầu cập nhật hồ sơ → H06

**Mở dần chi tiết:** Giữ Người, Khả năng vận động ở lớp quyết định. Đưa chi tiết hỗ trợ của Thiết bị, Ghi chú khẩn cấp, Rà soát gần nhất, lịch sử nguồn, phiên bản và quy tắc FR-H05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ người được chăm sóc” cho Authorized caregiver; đổi Người và làm Rà soát gần nhất không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Request profile update” chỉ tới H06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h06"></a>
## H06 — Cập nhật và kiểm tra hồ sơ

**EN:** Profile update & review · **JA:** プロフィールの更新と確認  
**Yêu cầu:** FR-H06 / WF-26 · **Actor:** Authorized caregiver · **Surface:** Care profiles · **Layout:** form

**Mục đích:** Keep assistance information current.  
**Quy tắc chính:** Hồ sơ hỗ trợ có nguồn, ngày rà soát và quyền xem theo từng trường.  
**Đầu vào:** H05.  
**Đầu ra:** Submit profile update → H05.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H06) · [EN](Prototype.html?lang=en#H06) · [JA](Prototype.html?lang=ja#H06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phiên bản hồ sơ | 4 | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Thay đổi | Updated mobility assistance need | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |
| Nguồn | Authorized caregiver | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Trạng thái rà soát | Subject review pending | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Lý do | Support needs changed | Unicode tối đa 2.000 ký tự, escape output; reason bắt buộc cho quyết định thay đổi trạng thái. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H05 với payload/version hợp lệ, bị chặn khi guard của WF-26 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Authorized caregiver

**Câu hỏi chính:** Trong “Cập nhật và kiểm tra hồ sơ”, Phiên bản hồ sơ, Thay đổi cho biết điều gì và vai trò Authorized caregiver có thể thực hiện “Submit profile update” trong phạm vi này không?

**Hình chính:** Đối chiếu hồ sơ chỉ nguồn và trách nhiệm duyệt

**Hành động chính:** Gửi cập nhật hồ sơ → H05

**Mở dần chi tiết:** Giữ Phiên bản hồ sơ, Thay đổi ở lớp quyết định. Đưa chi tiết hỗ trợ của Nguồn, Trạng thái rà soát, Lý do, lịch sử nguồn, phiên bản và quy tắc FR-H06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Cập nhật và kiểm tra hồ sơ” cho Authorized caregiver; đổi Phiên bản hồ sơ và làm Lý do không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Submit profile update” chỉ tới H05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h07"></a>
## H07 — Danh mục người cần hỗ trợ

**EN:** People & assistance registry · **JA:** 支援対象者一覧  
**Yêu cầu:** FR-H07 / WF-26 · **Actor:** Care coordinator · **Surface:** Care profiles · **Layout:** list

**Mục đích:** Find people who may need proactive help.  
**Quy tắc chính:** Hồ sơ hỗ trợ có nguồn, ngày rà soát và quyền xem theo từng trường.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open assistance case → H09.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H07) · [EN](Prototype.html?lang=en#H07) · [JA](Prototype.html?lang=ja#H07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Alex | Mobility assistance · profile reviewed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Jamie | No assistance data | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | Communication assistance · review overdue | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi xem | Functional needs only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H09 với payload/version hợp lệ, bị chặn khi guard của WF-26 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H07 — Bố cục thị giác V2

**Context:** command · **Role:** Care coordinator

**Câu hỏi chính:** Trong “Danh mục người cần hỗ trợ”, Alex, Jamie cho biết điều gì và vai trò Care coordinator có thể thực hiện “Open assistance case” trong phạm vi này không?

**Hình chính:** Danh bạ hỗ trợ với cột nhu cầu chức năng giới hạn theo vai trò

**Hành động chính:** Mở vụ trợ giúp → H09

**Mở dần chi tiết:** Giữ Alex, Jamie ở lớp quyết định. Đưa chi tiết hỗ trợ của Morgan, Phạm vi xem, lịch sử nguồn, phiên bản và quy tắc FR-H07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Danh mục người cần hỗ trợ” cho Care coordinator; đổi Alex và làm Phạm vi xem không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Open assistance case” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h08"></a>
## H08 — Chủ động ưu tiên cứu hộ

**EN:** Proactive rescue queue · **JA:** 先行的な救援対応  
**Yêu cầu:** FR-H08 / WF-27 · **Actor:** Dispatcher · **Surface:** Care profiles · **Layout:** priority

**Mục đích:** No SOS does not mean no need for help.  
**Quy tắc chính:** Ưu tiên theo phơi nhiễm và khả năng tự thoát, kể cả khi chưa có SOS.  
**Đầu vào:** H10.  
**Đầu ra:** Review priority reasons → H09.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H08) · [EN](Prototype.html?lang=en#H08) · [JA](Prototype.html?lang=ja#H08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Alex | Exposed zone · mobility support · no SOS | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Morgan | Possible exposure · stale position | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Jamie | Presence unknown · check-in needed | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chính sách ưu tiên | Version 3 · explainable | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H09 với payload/version hợp lệ, bị chặn khi guard của WF-27 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H08 — Bố cục thị giác V2

**Context:** command · **Role:** Dispatcher

**Câu hỏi chính:** Trong “Chủ động ưu tiên cứu hộ”, Alex, Morgan cho biết điều gì và vai trò Dispatcher có thể thực hiện “Review priority reasons” trong phạm vi này không?

**Hình chính:** Hàng đợi cứu hộ chủ động với lý do ưu tiên giải thích được

**Hành động chính:** Xem lý do ưu tiên → H09

**Mở dần chi tiết:** Giữ Alex, Morgan ở lớp quyết định. Đưa chi tiết hỗ trợ của Jamie, Chính sách ưu tiên, lịch sử nguồn, phiên bản và quy tắc FR-H08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chủ động ưu tiên cứu hộ” cho Dispatcher; đổi Alex và làm Chính sách ưu tiên không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review priority reasons” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h09"></a>
## H09 — Căn cứ ưu tiên và quyết định

**EN:** Priority evidence & decision · **JA:** 優先度の根拠と判断  
**Yêu cầu:** FR-H09 / WF-27 · **Actor:** Dispatcher · **Surface:** Care profiles · **Layout:** detail

**Mục đích:** Review why assistance was recommended.  
**Quy tắc chính:** Ưu tiên theo phơi nhiễm và khả năng tự thoát, kể cả khi chưa có SOS.  
**Đầu vào:** H07, H08, H11, Q02.  
**Đầu ra:** Assign proactive assistance → O09.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H09) · [EN](Prototype.html?lang=en#H09) · [JA](Prototype.html?lang=ja#H09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Mức phơi nhiễm nguy hiểm | Inside impacted zone · QR 2 min ago | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Khả năng tự thoát | Assistance required | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| SOS | None received | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lý do | Approved assistance policy | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Ưu tiên | P1 · operator review | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O09 với payload/version hợp lệ, bị chặn khi guard của WF-27 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H09 — Bố cục thị giác V2

**Context:** command · **Role:** Dispatcher

**Câu hỏi chính:** Trong “Căn cứ ưu tiên và quyết định”, Mức phơi nhiễm nguy hiểm, Khả năng tự thoát cho biết điều gì và vai trò Dispatcher có thể thực hiện “Assign proactive assistance” trong phạm vi này không?

**Hình chính:** Bằng chứng phơi nhiễm, tự thoát cạnh quyết định ưu tiên con người

**Hành động chính:** Phân trợ giúp chủ động → O09

**Mở dần chi tiết:** Giữ Mức phơi nhiễm nguy hiểm, Khả năng tự thoát ở lớp quyết định. Đưa chi tiết hỗ trợ của SOS, Lý do, Ưu tiên, lịch sử nguồn, phiên bản và quy tắc FR-H09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Căn cứ ưu tiên và quyết định” cho Dispatcher; đổi Mức phơi nhiễm nguy hiểm và làm Ưu tiên không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Assign proactive assistance” chỉ tới O09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h10"></a>
## H10 — Hiện diện và kiểm đếm

**EN:** Presence & accountability · **JA:** 在場状況と安否確認  
**Yêu cầu:** FR-H10 / WF-23 · **Actor:** Operator · **Surface:** Care profiles · **Layout:** map

**Mục đích:** Distinguish presence from registration.  
**Quy tắc chính:** Hiện diện và vị trí có độ chắc chắn riêng; đăng ký không đồng nghĩa có mặt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Open proactive queue → H08.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H10) · [EN](Prototype.html?lang=en#H10) · [JA](Prototype.html?lang=ja#H10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Ghi nhận có mặt | 21 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dự kiến có mặt | 30 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Chưa rõ hiện diện | 9 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nguồn ghi nhận gần nhất | QR + access control | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Suy luận an toàn | Never automatic | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H08 với payload/version hợp lệ, bị chặn khi guard của WF-23 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H10 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Hiện diện và kiểm đếm”, Ghi nhận có mặt, Dự kiến có mặt cho biết điều gì và vai trò Operator có thể thực hiện “Open proactive queue” trong phạm vi này không?

**Hình chính:** Ma trận hiện diện tách quan sát, dự kiến và chưa rõ

**Hành động chính:** Mở hàng đợi chủ động → H08

**Mở dần chi tiết:** Giữ Ghi nhận có mặt, Dự kiến có mặt ở lớp quyết định. Đưa chi tiết hỗ trợ của Chưa rõ hiện diện, Nguồn ghi nhận gần nhất, Suy luận an toàn, lịch sử nguồn, phiên bản và quy tắc FR-H10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Danh sách dự kiến và lần thấy cuối không là hiện diện trực tiếp; không suy an toàn từ thiếu tín hiệu nguy cấp.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hiện diện và kiểm đếm” cho Operator; đổi Ghi nhận có mặt và làm Suy luận an toàn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open proactive queue” chỉ tới H08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h11"></a>
## H11 — Hồ sơ y tế hạn chế truy cập

**EN:** Restricted medical record · **JA:** 制限付き医療情報  
**Yêu cầu:** FR-H11 / WF-19 · **Actor:** Authorized medical role · **Surface:** Care profiles · **Layout:** detail

**Mục đích:** Emergency medical subset · audited access.  
**Quy tắc chính:** Chỉ xem dữ liệu tối thiểu theo quyền; mọi truy cập nhạy cảm có kiểm toán.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Return to assistance → H09.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H11) · [EN](Prototype.html?lang=en#H11) · [JA](Prototype.html?lang=ja#H11)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Người | Alex Morgan | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hồ sơ | Encrypted · restricted | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nguồn | Self-reported · not clinically verified | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lý do truy cập | Assigned emergency task | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phạm vi tiết lộ | Minimum necessary | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H11:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H09 với payload/version hợp lệ, bị chặn khi guard của WF-19 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H11 — Bố cục thị giác V2

**Context:** configuration · **Role:** Authorized medical role

**Câu hỏi chính:** Trong “Hồ sơ y tế hạn chế truy cập”, Người, Hồ sơ cho biết điều gì và vai trò Authorized medical role có thể thực hiện “Return to assistance” trong phạm vi này không?

**Hình chính:** Hồ sơ y tế hạn chế có mục đích truy cập và nhật ký chia sẻ

**Hành động chính:** Về trợ giúp → H09

**Mở dần chi tiết:** Giữ Người, Hồ sơ ở lớp quyết định. Đưa chi tiết hỗ trợ của Nguồn, Lý do truy cập, Phạm vi tiết lộ, lịch sử nguồn, phiên bản và quy tắc FR-H11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ y tế hạn chế truy cập” cho Authorized medical role; đổi Người và làm Phạm vi tiết lộ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Return to assistance” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="h12"></a>
## H12 — Kết quả chủ động kiểm tra

**EN:** Welfare check outcome · **JA:** 安否確認の結果  
**Yêu cầu:** FR-H12 / WF-27 · **Actor:** Responder · **Surface:** Care profiles · **Layout:** form

**Mục đích:** Record contact even without an SOS.  
**Quy tắc chính:** Ưu tiên theo phơi nhiễm và khả năng tự thoát, kể cả khi chưa có SOS.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Save welfare observation → R06.  
**Dữ liệu:** Nhạy cảm: health/functional needs; field-level scope và access audit.

[Mockup VI](Prototype.html?lang=vi#H12) · [EN](Prototype.html?lang=en#H12) · [JA](Prototype.html?lang=ja#H12)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hồ sơ | PC-041 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Người | Alex Morgan | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Liên hệ | Established | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Hỗ trợ | Required | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Vị trí | Confirmed by responder | Kiểm tra cùng tenant, hệ tọa độ/tầng, nguồn và thời điểm; không suy diễn tầng từ GPS. |
| Tiếp theo | Assisted evacuation task | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-H12:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến R06 với payload/version hợp lệ, bị chặn khi guard của WF-27 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### H12 — Bố cục thị giác V2

**Context:** field · **Role:** Responder

**Câu hỏi chính:** Trong “Kết quả chủ động kiểm tra”, Hồ sơ, Người cho biết điều gì và vai trò Responder có thể thực hiện “Save welfare observation” trong phạm vi này không?

**Hình chính:** Quan sát an sinh có kết quả liên hệ và người tiếp theo

**Hành động chính:** Lưu quan sát an sinh → R06

**Mở dần chi tiết:** Giữ Hồ sơ, Người ở lớp quyết định. Đưa chi tiết hỗ trợ của Liên hệ, Hỗ trợ, Vị trí, Tiếp theo, lịch sử nguồn, phiên bản và quy tắc FR-H12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Chỉ hiện nhu cầu hỗ trợ chức năng trong phạm vi cho phép; thiếu hiện diện hoặc khai người chăm sóc không ngụ ý an toàn hay thẩm quyền.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kết quả chủ động kiểm tra” cho Responder; đổi Hồ sơ và làm Tiếp theo không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 6 trường gốc truy cập được, và “Save welfare observation” chỉ tới R06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q01"></a>
## Q01 — Sức khỏe nguồn định vị

**EN:** Positioning source health · **JA:** 測位ソースの状態  
**Yêu cầu:** FR-Q01 / WF-23 · **Actor:** Positioning admin · **Surface:** Intelligence · **Layout:** dashboard

**Mục đích:** Know where location can be trusted.  
**Quy tắc chính:** Hiện diện và vị trí có độ chắc chắn riêng; đăng ký không đồng nghĩa có mặt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Inspect location quality → Q02.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q01) · [EN](Prototype.html?lang=en#Q01) · [JA](Prototype.html?lang=ja#Q01)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| GNSS | Outdoor coverage | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| BLE | Floor 05 degraded | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| UWB | Calibrated zones only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| QR anchors | Approved revision 12 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q01:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến Q02 với payload/version hợp lệ, bị chặn khi guard của WF-23 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q01 — Bố cục thị giác V2

**Context:** command · **Role:** Positioning admin

**Câu hỏi chính:** Trong “Sức khỏe nguồn định vị”, GNSS, BLE cho biết điều gì và vai trò Positioning admin có thể thực hiện “Inspect location quality” trong phạm vi này không?

**Hình chính:** So sánh độ phủ, sức khỏe nguồn GNSS, BLE, UWB, QR

**Hành động chính:** Kiểm tra chất lượng vị trí → Q02

**Mở dần chi tiết:** Giữ GNSS, BLE ở lớp quyết định. Đưa chi tiết hỗ trợ của UWB, QR anchors, lịch sử nguồn, phiên bản và quy tắc FR-Q01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Sức khỏe nguồn định vị” cho Positioning admin; đổi GNSS và làm QR anchors không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Inspect location quality” chỉ tới Q02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q02"></a>
## Q02 — Chất lượng và lịch sử vị trí

**EN:** Position quality & history · **JA:** 位置情報の品質と履歴  
**Yêu cầu:** FR-Q02 / WF-23 · **Actor:** Operator · **Surface:** Intelligence · **Layout:** detail

**Mục đích:** Alex · position is evidence, not certainty.  
**Quy tắc chính:** Hiện diện và vị trí có độ chắc chắn riêng; đăng ký không đồng nghĩa có mặt.  
**Đầu vào:** Q01.  
**Đầu ra:** Open assistance context → H09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q02) · [EN](Prototype.html?lang=en#Q02) · [JA](Prototype.html?lang=ja#Q02)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nguồn hiện tại | QR anchor | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Độ tin cậy xác định tầng | Confirmed by user scan | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thời điểm ghi nhận | 2 minutes ago | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hướng | Unknown | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nguồn mâu thuẫn | BLE floor estimate rejected | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q02:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến H09 với payload/version hợp lệ, bị chặn khi guard của WF-23 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q02 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Chất lượng và lịch sử vị trí”, Nguồn hiện tại, Độ tin cậy xác định tầng cho biết điều gì và vai trò Operator có thể thực hiện “Open assistance context” trong phạm vi này không?

**Hình chính:** Lịch sử vị trí có độ tin cậy tầng và dấu nguồn mâu thuẫn

**Hành động chính:** Mở bối cảnh trợ giúp → H09

**Mở dần chi tiết:** Giữ Nguồn hiện tại, Độ tin cậy xác định tầng ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời điểm ghi nhận, Hướng, Nguồn mâu thuẫn, lịch sử nguồn, phiên bản và quy tắc FR-Q02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chất lượng và lịch sử vị trí” cho Operator; đổi Nguồn hiện tại và làm Nguồn mâu thuẫn không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open assistance context” chỉ tới H09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q03"></a>
## Q03 — Hiệu chuẩn định vị trong nhà

**EN:** Indoor calibration editor · **JA:** 屋内測位の校正  
**Yêu cầu:** FR-Q03 / WF-23 · **Actor:** Positioning admin · **Surface:** Intelligence · **Layout:** floor

**Mục đích:** Align anchors to a versioned floor plan.  
**Quy tắc chính:** Hiện diện và vị trí có độ chắc chắn riêng; đăng ký không đồng nghĩa có mặt.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review route graph → S15.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q03) · [EN](Prototype.html?lang=en#Q03) · [JA](Prototype.html?lang=ja#Q03)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Hệ tọa độ | Building A local | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điểm tham chiếu | 4 surveyed anchors | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tầng | 05 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Sai số hiệu chuẩn | Requires field measurement | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Công bố | Safety review required | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q03:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S15 với payload/version hợp lệ, bị chặn khi guard của WF-23 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Positioning admin

**Câu hỏi chính:** Trong “Hiệu chuẩn định vị trong nhà”, Hệ tọa độ, Điểm tham chiếu cho biết điều gì và vai trò Positioning admin có thể thực hiện “Review route graph” trong phạm vi này không?

**Hình chính:** Hình tham chiếu hiệu chuẩn có xem trước sai số dư

**Hành động chính:** Xem đồ thị tuyến → S15

**Mở dần chi tiết:** Giữ Hệ tọa độ, Điểm tham chiếu ở lớp quyết định. Đưa chi tiết hỗ trợ của Tầng, Sai số hiệu chuẩn, Công bố, lịch sử nguồn, phiên bản và quy tắc FR-Q03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hiệu chuẩn định vị trong nhà” cho Positioning admin; đổi Hệ tọa độ và làm Công bố không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review route graph” chỉ tới S15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q04"></a>
## Q04 — Tối ưu phương án thoát hiểm

**EN:** Evacuation optimization · **JA:** 避難戦略の最適化  
**Yêu cầu:** FR-Q04 / WF-24 · **Actor:** Incident commander · **Surface:** Intelligence · **Layout:** optimization

**Mục đích:** Compare feasible evacuation strategies.  
**Quy tắc chính:** Loại tuyến vi phạm ràng buộc trước khi tối ưu thời gian và tắc nghẽn.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review route comparison → Q05.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q04) · [EN](Prototype.html?lang=en#Q04) · [JA](Prototype.html?lang=ja#Q04)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chính | West stairs · reviewed graph | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phương án khác | North refuge + assisted transfer | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Đã loại trừ | East corridor · hazard | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mục tiêu | Exposure constraints before travel time | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q04:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến Q05 với payload/version hợp lệ, bị chặn khi guard của WF-24 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q04 — Bố cục thị giác V2

**Context:** command · **Role:** Incident commander

**Câu hỏi chính:** Trong “Tối ưu phương án thoát hiểm”, Chính, Phương án khác cho biết điều gì và vai trò Incident commander có thể thực hiện “Review route comparison” trong phạm vi này không?

**Hình chính:** So sánh tuyến ứng viên với phương án loại và ràng buộc

**Hành động chính:** Xem so sánh tuyến → Q05

**Mở dần chi tiết:** Giữ Chính, Phương án khác ở lớp quyết định. Đưa chi tiết hỗ trợ của Đã loại trừ, Mục tiêu, lịch sử nguồn, phiên bản và quy tắc FR-Q04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tối ưu phương án thoát hiểm” cho Incident commander; đổi Chính và làm Mục tiêu không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review route comparison” chỉ tới Q05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q05"></a>
## Q05 — So sánh và chọn tuyến

**EN:** Route comparison & decision · **JA:** 経路の比較と判断  
**Yêu cầu:** FR-Q05 / WF-24 · **Actor:** Safety reviewer · **Surface:** Intelligence · **Layout:** detail

**Mục đích:** Understand the trade-offs before publishing.  
**Quy tắc chính:** Loại tuyến vi phạm ràng buộc trước khi tối ưu thời gian và tắc nghẽn.  
**Đầu vào:** Q04, Q07.  
**Đầu ra:** Publish guidance version → O36.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q05) · [EN](Prototype.html?lang=en#Q05) · [JA](Prototype.html?lang=ja#Q05)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Phương án A | West route · longer · feasible | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phương án B | East route · shorter · blocked | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phương án C | Refuge assistance · mobility profile | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Điểm chưa chắc chắn | Congestion estimate | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Phê duyệt | Required for zone strategy | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q05:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến O36 với payload/version hợp lệ, bị chặn khi guard của WF-24 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q05 — Bố cục thị giác V2

**Context:** command · **Role:** Safety reviewer

**Câu hỏi chính:** Trong “So sánh và chọn tuyến”, Phương án A, Phương án B cho biết điều gì và vai trò Safety reviewer có thể thực hiện “Publish guidance version” trong phạm vi này không?

**Hình chính:** Ma trận đánh đổi tuyến nêu bất định và duyệt con người

**Hành động chính:** Công bố phiên bản chỉ dẫn → O36

**Mở dần chi tiết:** Giữ Phương án A, Phương án B ở lớp quyết định. Đưa chi tiết hỗ trợ của Phương án C, Điểm chưa chắc chắn, Phê duyệt, lịch sử nguồn, phiên bản và quy tắc FR-Q05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “So sánh và chọn tuyến” cho Safety reviewer; đổi Phương án A và làm Phê duyệt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Publish guidance version” chỉ tới O36 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q06"></a>
## Q06 — Trợ lý AI xử lý sự cố

**EN:** AI incident copilot · **JA:** インシデントAI支援  
**Yêu cầu:** FR-Q06 / WF-25 · **Actor:** Operator · **Surface:** Intelligence · **Layout:** copilot

**Mục đích:** A grounded summary with visible uncertainty.  
**Quy tắc chính:** AI phải dẫn nguồn, nêu điều chưa biết và không tự điều khiển thiết bị.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review AI recommendation → Q07.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q06) · [EN](Prototype.html?lang=en#Q06) · [JA](Prototype.html?lang=ja#Q06)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Tóm tắt | Fire evidence and one proactive assistance need | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Nguồn bằng chứng | EV-3101 + PC-041 + SOP v4 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dữ liệu tính đến | 10:44:08 local | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Thẩm quyền | Recommendation only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q06:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến Q07 với payload/version hợp lệ, bị chặn khi guard của WF-25 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q06 — Bố cục thị giác V2

**Context:** command · **Role:** Operator

**Câu hỏi chính:** Trong “Trợ lý AI xử lý sự cố”, Tóm tắt, Nguồn bằng chứng cho biết điều gì và vai trò Operator có thể thực hiện “Review AI recommendation” trong phạm vi này không?

**Hình chính:** Tóm tắt AI nối bằng chứng với thời điểm và ranh giới quyền

**Hành động chính:** Xem đề xuất AI → Q07

**Mở dần chi tiết:** Giữ Tóm tắt, Nguồn bằng chứng ở lớp quyết định. Đưa chi tiết hỗ trợ của Dữ liệu tính đến, Thẩm quyền, lịch sử nguồn, phiên bản và quy tắc FR-Q06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trợ lý AI xử lý sự cố” cho Operator; đổi Tóm tắt và làm Thẩm quyền không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 4 trường gốc truy cập được, và “Review AI recommendation” chỉ tới Q07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q07"></a>
## Q07 — Bằng chứng và duyệt đề xuất AI

**EN:** AI evidence & approval · **JA:** AI提案の根拠と承認  
**Yêu cầu:** FR-Q07 / WF-25 · **Actor:** Supervisor · **Surface:** Intelligence · **Layout:** detail

**Mục đích:** Approve an action, not a fluent paragraph.  
**Quy tắc chính:** AI phải dẫn nguồn, nêu điều chưa biết và không tự điều khiển thiết bị.  
**Đầu vào:** Q06.  
**Đầu ra:** Review route decision → Q05.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q07) · [EN](Prototype.html?lang=en#Q07) · [JA](Prototype.html?lang=ja#Q07)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Nhận định | West route remains feasible | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Bằng chứng | Route engine result R-18 | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Unknown | Current corridor congestion | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kiểm soát | No unsupported exit nodes | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hành động | Draft guidance only | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q07:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến Q05 với payload/version hợp lệ, bị chặn khi guard của WF-25 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q07 — Bố cục thị giác V2

**Context:** command · **Role:** Supervisor

**Câu hỏi chính:** Trong “Bằng chứng và duyệt đề xuất AI”, Nhận định, Bằng chứng cho biết điều gì và vai trò Supervisor có thể thực hiện “Review route decision” trong phạm vi này không?

**Hình chính:** Đối chiếu tuyên bố, bằng chứng, chưa rõ trước quyết định

**Hành động chính:** Xem quyết định tuyến → Q05

**Mở dần chi tiết:** Giữ Nhận định, Bằng chứng ở lớp quyết định. Đưa chi tiết hỗ trợ của Unknown, Kiểm soát, Hành động, lịch sử nguồn, phiên bản và quy tắc FR-Q07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bằng chứng và duyệt đề xuất AI” cho Supervisor; đổi Nhận định và làm Hành động không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review route decision” chỉ tới Q05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q08"></a>
## Q08 — Chính sách AI và đánh giá mô hình

**EN:** AI policies & model evaluation · **JA:** AIポリシーとモデル評価  
**Yêu cầu:** FR-Q08 / WF-25 · **Actor:** AI governance lead · **Surface:** Intelligence · **Layout:** detail

**Mục đích:** Keep model behavior measurable.  
**Quy tắc chính:** AI phải dẫn nguồn, nêu điều chưa biết và không tự điều khiển thiết bị.  
**Đầu vào:** Q09.  
**Đầu ra:** Open model governance → Q09.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q08) · [EN](Prototype.html?lang=en#Q08) · [JA](Prototype.html?lang=ja#Q08)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Mô hình | Region-approved deployment | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kiểm thử căn cứ | Release gate | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Tấn công chỉ dẫn | Adversarial fixtures | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Dữ liệu sức khỏe | Minimized | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Công cụ điều khiển | Not available to model | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q08:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến Q09 với payload/version hợp lệ, bị chặn khi guard của WF-25 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q08 — Bố cục thị giác V2

**Context:** configuration · **Role:** AI governance lead

**Câu hỏi chính:** Trong “Chính sách AI và đánh giá mô hình”, Mô hình, Kiểm thử căn cứ cho biết điều gì và vai trò AI governance lead có thể thực hiện “Open model governance” trong phạm vi này không?

**Hình chính:** Kết quả đánh giá căn cứ, chèn lệnh và lộ dữ liệu

**Hành động chính:** Mở quản trị mô hình → Q09

**Mở dần chi tiết:** Giữ Mô hình, Kiểm thử căn cứ ở lớp quyết định. Đưa chi tiết hỗ trợ của Tấn công chỉ dẫn, Dữ liệu sức khỏe, Công cụ điều khiển, lịch sử nguồn, phiên bản và quy tắc FR-Q08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chính sách AI và đánh giá mô hình” cho AI governance lead; đổi Mô hình và làm Công cụ điều khiển không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Open model governance” chỉ tới Q09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q09"></a>
## Q09 — Quản trị triển khai AI

**EN:** AI deployment governance · **JA:** AI導入のガバナンス  
**Yêu cầu:** FR-Q09 / WF-25 · **Actor:** AI governance lead · **Surface:** Intelligence · **Layout:** form

**Mục đích:** Publish a reviewed model and prompt version.  
**Quy tắc chính:** AI phải dẫn nguồn, nêu điều chưa biết và không tự điều khiển thiết bị.  
**Đầu vào:** Q08.  
**Đầu ra:** Save deployment draft → Q08.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q09) · [EN](Prototype.html?lang=en#Q09) · [JA](Prototype.html?lang=ja#Q09)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Vùng dữ liệu | EU | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Phiên bản mô hình | Approved candidate | Chỉ đọc từ nguồn/phiên bản có thẩm quyền; không sửa bằng form này. |
| Phiên bản chỉ dẫn | 7 | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Lưu trữ dữ liệu | Regional policy | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |
| Dự phòng | Deterministic workflows remain active | Required khi thuộc payload nghiệp vụ; enum/format theo schema và policy version; dữ liệu context chỉ đọc. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q09:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến Q08 với payload/version hợp lệ, bị chặn khi guard của WF-25 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.

### Q09 — Bố cục thị giác V2

**Context:** configuration · **Role:** AI governance lead

**Câu hỏi chính:** Trong “Quản trị triển khai AI”, Vùng dữ liệu, Phiên bản mô hình cho biết điều gì và vai trò AI governance lead có thể thực hiện “Save deployment draft” trong phạm vi này không?

**Hình chính:** Xem trước triển khai phiên bản mô hình, prompt với dự phòng vùng

**Hành động chính:** Lưu nháp triển khai → Q08

**Mở dần chi tiết:** Giữ Vùng dữ liệu, Phiên bản mô hình ở lớp quyết định. Đưa chi tiết hỗ trợ của Phiên bản chỉ dẫn, Lưu trữ dữ liệu, Dự phòng, lịch sử nguồn, phiên bản và quy tắc FR-Q09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Quản trị triển khai AI” cho AI governance lead; đổi Vùng dữ liệu và làm Dự phòng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Save deployment draft” chỉ tới Q08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="q10"></a>
## Q10 — Mô phỏng dòng người và kịch bản

**EN:** Simulation & crowd scenarios · **JA:** 群集とシナリオのシミュレーション  
**Yêu cầu:** FR-Q10 / WF-24 · **Actor:** Safety planner · **Surface:** Intelligence · **Layout:** optimization

**Mục đích:** Test strategy without asserting real-world certainty.  
**Quy tắc chính:** Loại tuyến vi phạm ràng buộc trước khi tối ưu thời gian và tắc nghẽn.  
**Đầu vào:** Menu theo role / deep link sau authorization.  
**Đầu ra:** Review route validation → S16.  
**Dữ liệu:** Nhạy cảm: vị trí/incident; tối thiểu hóa theo role.

[Mockup VI](Prototype.html?lang=vi#Q10) · [EN](Prototype.html?lang=en#Q10) · [JA](Prototype.html?lang=ja#Q10)

| Trường / thành phần | Giá trị minh họa | Validation / quyền sửa |
|---|---|---|
| Chế độ | Scenario simulation | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Mức hiện diện | Estimated cohort | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Lối thoát bị chặn | East corridor | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Hỗ trợ vận động | 4 people | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |
| Kết quả | Assumptions require site validation | Chỉ đọc theo object scope; hiển thị source/time khi ảnh hưởng quyết định. |

**Hành động và phản hồi:** CTA chính kiểm tra actor/scope/version/required inputs trước khi tạo request; pending giữ nút chống bấm lặp. Receipt hiển thị object ID và trạng thái thực, không coi thao tác thiết kế là side effect đã thực hiện. Các màn list hỗ trợ filter và empty result; evidence/media yêu cầu quyền trước khi mở. Các panel chỉ đọc điều hướng sang bước review tương ứng.

**States:** loading (không giả dữ liệu mới); empty (nói rõ phạm vi/bộ lọc); invalid (lỗi tại field, giữ draft); denied (không lộ record); stale (age + nguồn); offline (queued ≠ received); conflict (so sánh version, không overwrite); success (receipt thật). Khi state không áp dụng, sản phẩm không tạo thao tác giả để hiển thị nó. Prototype state selector là công cụ review dùng chung.

**AC-Q10:** actor đúng scope mở được màn và thấy các trường trên; actor ngoài scope không thấy dữ liệu. Kiểm tra CTA đến S16 với payload/version hợp lệ, bị chặn khi guard của WF-24 không đạt. Kiểm tra vi/en/ja không che CTA hoặc mất ý nghĩa; screen reader đọc label và state; không truyền nhầm tenant khi quay lại/deep-link.
<!-- PHYSICAL_BASELINE_1_0 -->

## Chữa cháy và cứu hộ vật lý — baseline 1.0

### Q10 — Bố cục thị giác V2

**Context:** configuration · **Role:** Safety planner

**Câu hỏi chính:** Trong “Mô phỏng dòng người và kịch bản”, Chế độ, Mức hiện diện cho biết điều gì và vai trò Safety planner có thể thực hiện “Review route validation” trong phạm vi này không?

**Hình chính:** Kịch bản đám đông, lối chặn mô phỏng theo nhóm di chuyển

**Hành động chính:** Xem kiểm tra tuyến → S16

**Mở dần chi tiết:** Giữ Chế độ, Mức hiện diện ở lớp quyết định. Đưa chi tiết hỗ trợ của Lối thoát bị chặn, Hỗ trợ vận động, Kết quả, lịch sử nguồn, phiên bản và quy tắc FR-Q10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Tách quan sát, bất định và quyết định con người; nguồn cũ hoặc mâu thuẫn phải thu hồi đề xuất thiếu căn cứ.

**Tình huống nghiệm thu V2:** Dùng tình huống “Mô phỏng dòng người và kịch bản” cho Safety planner; đổi Chế độ và làm Kết quả không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review route validation” chỉ tới S16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f01"></a>
## F01 — Tổng quan hệ thống vật lý

**EN:** Physical systems overview · **JA:** 物理システム概要  
**FR:** FR-F01 / WF-29 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** dashboard

**Mục đích / guard thiết bị:** Không gộp hệ thống cũ/suy giảm thành xanh an toàn; mỗi vùng giữ controller và thời điểm.

**Đầu vào:** F13, F18. **Đầu ra:** Review F07 → F07.

[Mockup VI](Prototype.html?lang=vi#F01) · [EN](Prototype.html?lang=en#F01) · [JA](Prototype.html?lang=ja#F01)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Sức khỏe bộ điều khiển | 3 connected; 1 stale | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Trạng thái vùng | A05 alarm; B02 impaired | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Độ mới bằng chứng | 8 s; source controller C01 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Thẩm quyền cục bộ | Site fire officer | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Quyền điều khiển | Read-only until approved capability | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F01:** Actor đúng quyền thấy đủ trường và đến F07; ngoài scope không đọc/sửa object. Thử guard riêng: Không gộp hệ thống cũ/suy giảm thành xanh an toàn; mỗi vùng giữ controller và thời điểm. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F01 — Bố cục thị giác V2

**Context:** command · **Role:** Physical supervisor

**Câu hỏi chính:** Trong “Tổng quan hệ thống vật lý”, Sức khỏe bộ điều khiển, Trạng thái vùng cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F07” trong phạm vi này không?

**Hình chính:** Sơ đồ hệ vật lý thể hiện thẩm quyền bộ điều khiển và tuổi chứng cứ

**Hành động chính:** Xem F07 → F07

**Mở dần chi tiết:** Giữ Sức khỏe bộ điều khiển, Trạng thái vùng ở lớp quyết định. Đưa chi tiết hỗ trợ của Độ mới bằng chứng, Thẩm quyền cục bộ, Quyền điều khiển, lịch sử nguồn, phiên bản và quy tắc FR-F01 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Tổng quan hệ thống vật lý” cho Physical supervisor; đổi Sức khỏe bộ điều khiển và làm Quyền điều khiển không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F07” chỉ tới F07 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f02"></a>
## F02 — Danh mục bộ điều khiển

**EN:** Controller inventory · **JA:** 制御装置一覧  
**FR:** FR-F02 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** list

**Mục đích / guard thiết bị:** Discovery không cấp quyền ghi; gắn đúng model, firmware, site và bằng chứng interface trước đăng ký.

**Đầu vào:** F20. **Đầu ra:** Review F03 → F03.

[Mockup VI](Prototype.html?lang=vi#F02) · [EN](Prototype.html?lang=en#F02) · [JA](Prototype.html?lang=ja#F02)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Model bộ điều khiển | PRA-SCL; exact firmware pending verification | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Liên kết giao thức | Vendor Open Interface; revision required | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Chế độ vận hành | Supervision only | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Site được gán | Harbor / Building A | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Bằng chứng khả năng | Supplier dossier pending | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F02:** Actor đúng quyền thấy đủ trường và đến F03; ngoài scope không đọc/sửa object. Thử guard riêng: Discovery không cấp quyền ghi; gắn đúng model, firmware, site và bằng chứng interface trước đăng ký. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F02 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration engineer

**Câu hỏi chính:** Trong “Danh mục bộ điều khiển”, Model bộ điều khiển, Liên kết giao thức cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F03” trong phạm vi này không?

**Hình chính:** Danh mục bộ điều khiển có model, giao thức và năng lực xác minh

**Hành động chính:** Xem F03 → F03

**Mở dần chi tiết:** Giữ Model bộ điều khiển, Liên kết giao thức ở lớp quyết định. Đưa chi tiết hỗ trợ của Chế độ vận hành, Site được gán, Bằng chứng khả năng, lịch sử nguồn, phiên bản và quy tắc FR-F02 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Danh mục bộ điều khiển” cho Integration engineer; đổi Model bộ điều khiển và làm Bằng chứng khả năng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F03” chỉ tới F03 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f03"></a>
## F03 — Chi tiết khả năng bộ điều khiển

**EN:** Controller capability detail · **JA:** 制御装置の機能詳細  
**FR:** FR-F03 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Khả năng không rõ/không có tài liệu chỉ đọc; chứng nhận và tương thích API là hai bằng chứng riêng.

**Đầu vào:** F02. **Đầu ra:** Review F04 → F04.

[Mockup VI](Prototype.html?lang=vi#F03) · [EN](Prototype.html?lang=en#F03) · [JA](Prototype.html?lang=ja#F03)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Model bộ điều khiển | C01 / vendor-approved configuration | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Thao tác được phép | Read status only | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Thao tác bị cấm | Release; reset; silence until approved | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Bằng chứng khả năng | Interface specification + signed FAT | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ưu tiên cục bộ | Hardwired local authority retained | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F03:** Actor đúng quyền thấy đủ trường và đến F04; ngoài scope không đọc/sửa object. Thử guard riêng: Khả năng không rõ/không có tài liệu chỉ đọc; chứng nhận và tương thích API là hai bằng chứng riêng. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F03 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration engineer

**Câu hỏi chính:** Trong “Chi tiết khả năng bộ điều khiển”, Model bộ điều khiển, Thao tác được phép cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F04” trong phạm vi này không?

**Hình chính:** Ma trận thao tác cho phép, cấm cạnh ghi đè cục bộ

**Hành động chính:** Xem F04 → F04

**Mở dần chi tiết:** Giữ Model bộ điều khiển, Thao tác được phép ở lớp quyết định. Đưa chi tiết hỗ trợ của Thao tác bị cấm, Bằng chứng khả năng, Ưu tiên cục bộ, lịch sử nguồn, phiên bản và quy tắc FR-F03 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chi tiết khả năng bộ điều khiển” cho Integration engineer; đổi Model bộ điều khiển và làm Ưu tiên cục bộ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F04” chỉ tới F04 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f04"></a>
## F04 — Ánh xạ điểm tín hiệu

**EN:** Signal point mapping · **JA:** 信号点マッピング  
**FR:** FR-F04 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Kiểm cực tính/ý nghĩa theo sơ đồ dây và kiểm thử chứng kiến; tiếp điểm van không chứng minh nước chảy.

**Đầu vào:** F03. **Đầu ra:** Review F05 → F05.

[Mockup VI](Prototype.html?lang=vi#F04) · [EN](Prototype.html?lang=en#F04) · [JA](Prototype.html?lang=ja#F04)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Địa chỉ tín hiệu | C01 / point 017 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ý nghĩa tín hiệu | Valve supervisory state; not flow | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Cực tính bình thường | Normally closed; verify wiring | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ánh xạ chất lượng | Fault / stale / unknown remain distinct | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phiên bản ánh xạ | Draft 3; dual review required | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F04:** Actor đúng quyền thấy đủ trường và đến F05; ngoài scope không đọc/sửa object. Thử guard riêng: Kiểm cực tính/ý nghĩa theo sơ đồ dây và kiểm thử chứng kiến; tiếp điểm van không chứng minh nước chảy. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F04 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration engineer

**Câu hỏi chính:** Trong “Ánh xạ điểm tín hiệu”, Địa chỉ tín hiệu, Ý nghĩa tín hiệu cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F05” trong phạm vi này không?

**Hình chính:** Ánh xạ địa chỉ tín hiệu sang nghĩa với cực tính và chất lượng

**Hành động chính:** Xem F05 → F05

**Mở dần chi tiết:** Giữ Địa chỉ tín hiệu, Ý nghĩa tín hiệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Cực tính bình thường, Ánh xạ chất lượng, Phiên bản ánh xạ, lịch sử nguồn, phiên bản và quy tắc FR-F04 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ánh xạ điểm tín hiệu” cho Integration engineer; đổi Địa chỉ tín hiệu và làm Phiên bản ánh xạ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F05” chỉ tới F05 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f05"></a>
## F05 — Ánh xạ vùng vật lý

**EN:** Physical zone mapping · **JA:** 物理ゾーンマッピング  
**FR:** FR-F05 / WF-28 · **Actor:** Site engineer · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Từ chối ánh xạ mơ hồ tầng hoặc khác tenant; cần phiên bản sơ đồ ký duyệt và khảo sát site.

**Đầu vào:** F04. **Đầu ra:** Review F06 → F06.

[Mockup VI](Prototype.html?lang=vi#F05) · [EN](Prototype.html?lang=en#F05) · [JA](Prototype.html?lang=ja#F05)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Vùng nguồn | C01-Z05 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Vùng đích | Building A / Floor 05 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Hệ tọa độ | Approved plan revision 12 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ranh giới bao phủ | No cross-floor inference | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phiên bản ánh xạ | Draft 3; site walkdown pending | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F05:** Actor đúng quyền thấy đủ trường và đến F06; ngoài scope không đọc/sửa object. Thử guard riêng: Từ chối ánh xạ mơ hồ tầng hoặc khác tenant; cần phiên bản sơ đồ ký duyệt và khảo sát site. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F05 — Bố cục thị giác V2

**Context:** configuration · **Role:** Site engineer

**Câu hỏi chính:** Trong “Ánh xạ vùng vật lý”, Vùng nguồn, Vùng đích cho biết điều gì và vai trò Site engineer có thể thực hiện “Review F06” trong phạm vi này không?

**Hình chính:** Chồng vùng vật lý, nguồn nêu sai khác tọa độ và độ phủ

**Hành động chính:** Xem F06 → F06

**Mở dần chi tiết:** Giữ Vùng nguồn, Vùng đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Hệ tọa độ, Ranh giới bao phủ, Phiên bản ánh xạ, lịch sử nguồn, phiên bản và quy tắc FR-F05 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ánh xạ vùng vật lý” cho Site engineer; đổi Vùng nguồn và làm Phiên bản ánh xạ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F06” chỉ tới F06 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f06"></a>
## F06 — Ma trận nguyên nhân–tác động

**EN:** Cause-and-effect matrix · **JA:** 原因・動作マトリクス  
**FR:** FR-F06 / WF-28 · **Actor:** Fire systems engineer · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Chỉ ma trận nguyên nhân–tác động cục bộ được duyệt quyết định tác động; cloud không âm thầm sửa logic controller.

**Đầu vào:** F05. **Đầu ra:** Review F15 → F15.

[Mockup VI](Prototype.html?lang=vi#F06) · [EN](Prototype.html?lang=en#F06) · [JA](Prototype.html?lang=ja#F06)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Đầu vào nguyên nhân | Zone A05 alarm evidence | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Tác động được duyệt | Notify operator; no automatic release | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Hồ sơ phê duyệt | Site cause-and-effect revision CE-03 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Điều kiện khóa | Test / impaired / local lockout | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ảnh hưởng thay đổi | Requires reviewed commissioning plan | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F06:** Actor đúng quyền thấy đủ trường và đến F15; ngoài scope không đọc/sửa object. Thử guard riêng: Chỉ ma trận nguyên nhân–tác động cục bộ được duyệt quyết định tác động; cloud không âm thầm sửa logic controller. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F06 — Bố cục thị giác V2

**Context:** configuration · **Role:** Fire systems engineer

**Câu hỏi chính:** Trong “Ma trận nguyên nhân–tác động”, Đầu vào nguyên nhân, Tác động được duyệt cho biết điều gì và vai trò Fire systems engineer có thể thực hiện “Review F15” trong phạm vi này không?

**Hình chính:** Đồ thị nguyên nhân, tác động có thẩm quyền và cổng ngăn

**Hành động chính:** Xem F15 → F15

**Mở dần chi tiết:** Giữ Đầu vào nguyên nhân, Tác động được duyệt ở lớp quyết định. Đưa chi tiết hỗ trợ của Hồ sơ phê duyệt, Điều kiện khóa, Ảnh hưởng thay đổi, lịch sử nguồn, phiên bản và quy tắc FR-F06 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ma trận nguyên nhân–tác động” cho Fire systems engineer; đổi Đầu vào nguyên nhân và làm Ảnh hưởng thay đổi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F15” chỉ tới F15 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f07"></a>
## F07 — Chi tiết sự kiện vật lý

**EN:** Physical event detail · **JA:** 物理イベント詳細  
**FR:** FR-F07 / WF-29 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Dedupe sequence nguồn; giữ bằng chứng gốc, phân biệt alarm, supervisory, trouble, test và incident suy luận.

**Đầu vào:** F01. **Đầu ra:** Review F08 → F08.

[Mockup VI](Prototype.html?lang=vi#F07) · [EN](Prototype.html?lang=en#F07) · [JA](Prototype.html?lang=ja#F07)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Sự kiện nguồn | C01 / sequence 28017 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ý nghĩa tín hiệu | Flow switch active; source evidence | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Thời điểm quan sát | 10:42:08 UTC+07 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Chất lượng bằng chứng | Current; source-bound | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Liên kết sự cố | INC-041; operator verification pending | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F07:** Actor đúng quyền thấy đủ trường và đến F08; ngoài scope không đọc/sửa object. Thử guard riêng: Dedupe sequence nguồn; giữ bằng chứng gốc, phân biệt alarm, supervisory, trouble, test và incident suy luận. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F07 — Bố cục thị giác V2

**Context:** command · **Role:** Physical supervisor

**Câu hỏi chính:** Trong “Chi tiết sự kiện vật lý”, Sự kiện nguồn, Ý nghĩa tín hiệu cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F08” trong phạm vi này không?

**Hình chính:** Thẻ nguồn sự kiện vật lý nối bằng chứng quan sát và sự cố

**Hành động chính:** Xem F08 → F08

**Mở dần chi tiết:** Giữ Sự kiện nguồn, Ý nghĩa tín hiệu ở lớp quyết định. Đưa chi tiết hỗ trợ của Thời điểm quan sát, Chất lượng bằng chứng, Liên kết sự cố, lịch sử nguồn, phiên bản và quy tắc FR-F07 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Chi tiết sự kiện vật lý” cho Physical supervisor; đổi Sự kiện nguồn và làm Liên kết sự cố không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F08” chỉ tới F08 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f08"></a>
## F08 — Trạng thái nước chữa cháy

**EN:** Fire-water status · **JA:** 消防用水状態  
**FR:** FR-F08 / WF-29 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Bơm chạy, áp suất, vị trí van và flow là tín hiệu độc lập; nước chưa rõ chặn kết luận sẵn sàng.

**Đầu vào:** F07. **Đầu ra:** Review F09 → F09.

[Mockup VI](Prototype.html?lang=vi#F08) · [EN](Prototype.html?lang=en#F08) · [JA](Prototype.html?lang=ja#F08)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Phản hồi bơm | Run contact active; discharge unverified | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Quan sát áp suất | 6.0 bar; PT-01; calibrated reference required | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phản hồi van | Open limit active; flow not implied | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Khả năng cấp nước | Reservoir level unknown | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Suy giảm thiết bị | Line B02 isolated under permit | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F08:** Actor đúng quyền thấy đủ trường và đến F09; ngoài scope không đọc/sửa object. Thử guard riêng: Bơm chạy, áp suất, vị trí van và flow là tín hiệu độc lập; nước chưa rõ chặn kết luận sẵn sàng. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F08 — Bố cục thị giác V2

**Context:** command · **Role:** Physical supervisor

**Câu hỏi chính:** Trong “Trạng thái nước chữa cháy”, Phản hồi bơm, Quan sát áp suất cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F09” trong phạm vi này không?

**Hình chính:** Sơ đồ hệ nước tách phản hồi bơm, áp lực và van

**Hành động chính:** Xem F09 → F09

**Mở dần chi tiết:** Giữ Phản hồi bơm, Quan sát áp suất ở lớp quyết định. Đưa chi tiết hỗ trợ của Phản hồi van, Khả năng cấp nước, Suy giảm thiết bị, lịch sử nguồn, phiên bản và quy tắc FR-F08 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Trạng thái nước chữa cháy” cho Physical supervisor; đổi Phản hồi bơm và làm Suy giảm thiết bị không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F09” chỉ tới F09 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f09"></a>
## F09 — Xem xét kích hoạt có kiểm soát

**EN:** Controlled release review · **JA:** 制御放出の審査  
**FR:** FR-F09 / WF-30 · **Actor:** Authorized fire officer · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Chặn kích hoạt nếu thiếu thao tác được phép, chứng nhận lắp đặt, điều kiện mới, phép cục bộ và interlock controller.

**Đầu vào:** F08. **Đầu ra:** Review F10 → F10.

[Mockup VI](Prototype.html?lang=vi#F09) · [EN](Prototype.html?lang=en#F09) · [JA](Prototype.html?lang=ja#F09)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Thao tác yêu cầu | Release request; illustrative only | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Thiết bị đích | Approved controller / zone A05 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Bằng chứng khả năng | Unverified: execution blocked | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Điều kiện kích hoạt | Local authority; occupancy; interlocks; site permit | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Hết hạn lệnh | 30 s example; approved policy determines TTL | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F09:** Actor đúng quyền thấy đủ trường và đến F10; ngoài scope không đọc/sửa object. Thử guard riêng: Chặn kích hoạt nếu thiếu thao tác được phép, chứng nhận lắp đặt, điều kiện mới, phép cục bộ và interlock controller. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F09 — Bố cục thị giác V2

**Context:** command · **Role:** Authorized fire officer

**Câu hỏi chính:** Trong “Xem xét kích hoạt có kiểm soát”, Thao tác yêu cầu, Thiết bị đích cho biết điều gì và vai trò Authorized fire officer có thể thực hiện “Review F10” trong phạm vi này không?

**Hình chính:** Cổng điều kiện nhả với đúng thiết bị và yêu cầu hết hạn

**Hành động chính:** Xem F10 → F10

**Mở dần chi tiết:** Giữ Thao tác yêu cầu, Thiết bị đích ở lớp quyết định. Đưa chi tiết hỗ trợ của Bằng chứng khả năng, Điều kiện kích hoạt, Hết hạn lệnh, lịch sử nguồn, phiên bản và quy tắc FR-F09 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Xem xét kích hoạt có kiểm soát” cho Authorized fire officer; đổi Thao tác yêu cầu và làm Hết hạn lệnh không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F10” chỉ tới F10 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f10"></a>
## F10 — Phê duyệt lệnh thiết bị

**EN:** Command authorization · **JA:** 装置コマンド承認  
**FR:** FR-F10 / WF-30 · **Actor:** Independent command approver · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Gắn người yêu cầu/người duyệt độc lập với đúng thiết bị, thao tác, tham số, vùng, phiên bản và expiry; thay đổi làm mất duyệt.

**Đầu vào:** F09. **Đầu ra:** Review F11 → F11.

[Mockup VI](Prototype.html?lang=vi#F10) · [EN](Prototype.html?lang=en#F10) · [JA](Prototype.html?lang=ja#F10)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Digest chính xác của lệnh | CMD-041 / revision 3 / zone A05 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Danh tính người yêu cầu | Fire officer A; verified scope | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Danh tính người duyệt | Officer B; distinct identity required | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Trạng thái phê duyệt | Blocked: capability dossier incomplete | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ranh giới thực thi | No browser-to-controller connection | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F10:** Actor đúng quyền thấy đủ trường và đến F11; ngoài scope không đọc/sửa object. Thử guard riêng: Gắn người yêu cầu/người duyệt độc lập với đúng thiết bị, thao tác, tham số, vùng, phiên bản và expiry; thay đổi làm mất duyệt. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F10 — Bố cục thị giác V2

**Context:** command · **Role:** Independent command approver

**Câu hỏi chính:** Trong “Phê duyệt lệnh thiết bị”, Digest chính xác của lệnh, Danh tính người yêu cầu cho biết điều gì và vai trò Independent command approver có thể thực hiện “Review F11” trong phạm vi này không?

**Hình chính:** Bản lệnh bất biến với người yêu cầu, duyệt và ranh giới thực thi

**Hành động chính:** Xem F11 → F11

**Mở dần chi tiết:** Giữ Digest chính xác của lệnh, Danh tính người yêu cầu ở lớp quyết định. Đưa chi tiết hỗ trợ của Danh tính người duyệt, Trạng thái phê duyệt, Ranh giới thực thi, lịch sử nguồn, phiên bản và quy tắc FR-F10 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phê duyệt lệnh thiết bị” cho Independent command approver; đổi Digest chính xác của lệnh và làm Ranh giới thực thi không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F11” chỉ tới F11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f11"></a>
## F11 — Phản hồi thực thi

**EN:** Execution feedback · **JA:** 実行フィードバック  
**FR:** FR-F11 / WF-30 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** timeline

**Mục đích / guard thiết bị:** Controller nhận không phải hoàn tất vật lý; thiếu phản hồi độc lập thành unknown, không retry mù.

**Đầu vào:** F10, F19. **Đầu ra:** Review F12 → F12.

[Mockup VI](Prototype.html?lang=vi#F11) · [EN](Prototype.html?lang=en#F11) · [JA](Prototype.html?lang=ja#F11)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Biên nhận lệnh | Controller accepted; not completed | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phản hồi vật lý | No independent feedback received | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Trạng thái kết quả | Unknown; reconcile required | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Tương quan thực thi | CMD-041 / controller sequence pending | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Quyền thử lại | No blind retry of non-idempotent operation | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F11:** Actor đúng quyền thấy đủ trường và đến F12; ngoài scope không đọc/sửa object. Thử guard riêng: Controller nhận không phải hoàn tất vật lý; thiếu phản hồi độc lập thành unknown, không retry mù. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F11 — Bố cục thị giác V2

**Context:** command · **Role:** Physical supervisor

**Câu hỏi chính:** Trong “Phản hồi thực thi”, Biên nhận lệnh, Phản hồi vật lý cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F12” trong phạm vi này không?

**Hình chính:** Dòng biên nhận so với phản hồi vật lý có kết quả chưa rõ

**Hành động chính:** Xem F12 → F12

**Mở dần chi tiết:** Giữ Biên nhận lệnh, Phản hồi vật lý ở lớp quyết định. Đưa chi tiết hỗ trợ của Trạng thái kết quả, Tương quan thực thi, Quyền thử lại, lịch sử nguồn, phiên bản và quy tắc FR-F11 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Lệnh được nhận và tác động vật lý là trạng thái riêng; kết quả chưa rõ chặn thử lại mù và mở đối soát F12.

**Tình huống nghiệm thu V2:** Dùng tình huống “Phản hồi thực thi” cho Physical supervisor; đổi Biên nhận lệnh và làm Quyền thử lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F12” chỉ tới F12 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f12"></a>
## F12 — Đối soát kết quả chưa rõ

**EN:** Unknown-result reconciliation · **JA:** 結果不明の照合  
**FR:** FR-F12 / WF-30 · **Actor:** Physical supervisor · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Đối soát bằng đọc lại được hỗ trợ và quan sát đủ năng lực; không gửi lại release không idempotent để tìm kết quả.

**Đầu vào:** F11. **Đầu ra:** Review F13 → F13.

[Mockup VI](Prototype.html?lang=vi#F12) · [EN](Prototype.html?lang=en#F12) · [JA](Prototype.html?lang=ja#F12)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Tham chiếu lệnh | CMD-041; acceptance seen | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Bằng chứng đọc lại | Read-only query; latest source timestamp | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Xác nhận hiện trường | Qualified responder observation pending | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Quyết định đối soát | Remain unknown; no release retry | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Lý do quyết định | Independent physical effect not verified | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F12:** Actor đúng quyền thấy đủ trường và đến F13; ngoài scope không đọc/sửa object. Thử guard riêng: Đối soát bằng đọc lại được hỗ trợ và quan sát đủ năng lực; không gửi lại release không idempotent để tìm kết quả. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F12 — Bố cục thị giác V2

**Context:** command · **Role:** Physical supervisor

**Câu hỏi chính:** Trong “Đối soát kết quả chưa rõ”, Tham chiếu lệnh, Bằng chứng đọc lại cho biết điều gì và vai trò Physical supervisor có thể thực hiện “Review F13” trong phạm vi này không?

**Hình chính:** Đối soát kết quả chưa rõ bằng đọc lại và bằng chứng hiện trường

**Hành động chính:** Xem F13 → F13

**Mở dần chi tiết:** Giữ Tham chiếu lệnh, Bằng chứng đọc lại ở lớp quyết định. Đưa chi tiết hỗ trợ của Xác nhận hiện trường, Quyết định đối soát, Lý do quyết định, lịch sử nguồn, phiên bản và quy tắc FR-F12 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ kết quả chưa rõ tới khi đọc lại liên kết đúng hoặc bằng chứng hiện trường có quyền giải quyết; giữ bằng chứng mâu thuẫn và lý do.

**Tình huống nghiệm thu V2:** Dùng tình huống “Đối soát kết quả chưa rõ” cho Physical supervisor; đổi Tham chiếu lệnh và làm Lý do quyết định không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F13” chỉ tới F13 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f13"></a>
## F13 — Ưu tiên cục bộ và bàn giao

**EN:** Local override & handover · **JA:** 現地優先制御と引継ぎ  
**FR:** FR-F13 / WF-30 · **Actor:** Site incident commander · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Ưu tiên cục bộ thu hồi quyền từ xa; reconnect không phát lại lệnh hoặc phục hồi lease đã thu hồi.

**Đầu vào:** F12. **Đầu ra:** Review F01 → F01.

[Mockup VI](Prototype.html?lang=vi#F13) · [EN](Prototype.html?lang=en#F13) · [JA](Prototype.html?lang=ja#F13)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Trạng thái bộ điều khiển cục bộ | Local control active | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Lease điều khiển từ xa | Revoked; stale intents invalidated | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Người tiếp nhận | Site fire officer; verified acceptance required | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phạm vi bàn giao | Zone A05; command CMD-041 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Điều kiện trả quyền từ xa | Explicit local release + fresh authorization | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F13:** Actor đúng quyền thấy đủ trường và đến F01; ngoài scope không đọc/sửa object. Thử guard riêng: Ưu tiên cục bộ thu hồi quyền từ xa; reconnect không phát lại lệnh hoặc phục hồi lease đã thu hồi. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F13 — Bố cục thị giác V2

**Context:** command · **Role:** Site incident commander

**Câu hỏi chính:** Trong “Ưu tiên cục bộ và bàn giao”, Trạng thái bộ điều khiển cục bộ, Lease điều khiển từ xa cho biết điều gì và vai trò Site incident commander có thể thực hiện “Review F01” trong phạm vi này không?

**Hình chính:** Bàn giao điều khiển cục bộ thể hiện lease xa và người nhận

**Hành động chính:** Xem F01 → F01

**Mở dần chi tiết:** Giữ Trạng thái bộ điều khiển cục bộ, Lease điều khiển từ xa ở lớp quyết định. Đưa chi tiết hỗ trợ của Người tiếp nhận, Phạm vi bàn giao, Điều kiện trả quyền từ xa, lịch sử nguồn, phiên bản và quy tắc FR-F13 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Mất lease xa không được lấy lại quyền từ điều khiển cục bộ; trở lại từ xa cần cổng bàn giao đã quy định.

**Tình huống nghiệm thu V2:** Dùng tình huống “Ưu tiên cục bộ và bàn giao” cho Site incident commander; đổi Trạng thái bộ điều khiển cục bộ và làm Điều kiện trả quyền từ xa không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F01” chỉ tới F01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f14"></a>
## F14 — Suy giảm và chế độ kiểm thử

**EN:** Impairment & test mode · **JA:** 機能障害と試験モード  
**FR:** FR-F14 / WF-31 · **Actor:** Maintenance coordinator · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Test mode cần cách ly giới hạn và biện pháp bù; giấy phép hết hạn chuyển cấp nhưng không khẳng định đã khôi phục.

**Đầu vào:** Authorized physical-systems menu. **Đầu ra:** Review F18 → F18.

[Mockup VI](Prototype.html?lang=vi#F14) · [EN](Prototype.html?lang=en#F14) · [JA](Prototype.html?lang=ja#F14)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Phạm vi suy giảm | Line B02; no adjacent zone changes | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Tham chiếu giấy phép | IMP-014; site approval pending | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Biện pháp bù trừ | Fire watch; responsible team assigned | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Cách ly kiểm thử | Exercise partition; physical output inhibited | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Hết hạn và chuyển cấp | 16:00 local; overdue remains impaired | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F14:** Actor đúng quyền thấy đủ trường và đến F18; ngoài scope không đọc/sửa object. Thử guard riêng: Test mode cần cách ly giới hạn và biện pháp bù; giấy phép hết hạn chuyển cấp nhưng không khẳng định đã khôi phục. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F14 — Bố cục thị giác V2

**Context:** command · **Role:** Maintenance coordinator

**Câu hỏi chính:** Trong “Suy giảm và chế độ kiểm thử”, Phạm vi suy giảm, Tham chiếu giấy phép cho biết điều gì và vai trò Maintenance coordinator có thể thực hiện “Review F18” trong phạm vi này không?

**Hình chính:** Bản đồ suy giảm với biện pháp bù, giấy phép và hết hạn

**Hành động chính:** Xem F18 → F18

**Mở dần chi tiết:** Giữ Phạm vi suy giảm, Tham chiếu giấy phép ở lớp quyết định. Đưa chi tiết hỗ trợ của Biện pháp bù trừ, Cách ly kiểm thử, Hết hạn và chuyển cấp, lịch sử nguồn, phiên bản và quy tắc FR-F14 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Suy giảm và chế độ kiểm thử” cho Maintenance coordinator; đổi Phạm vi suy giảm và làm Hết hạn và chuyển cấp không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F18” chỉ tới F18 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f15"></a>
## F15 — Kế hoạch nghiệm thu

**EN:** Commissioning plan · **JA:** 試運転計画  
**FR:** FR-F15 / WF-32 · **Actor:** Commissioning lead · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Khóa BOM, firmware, mapping và matrix; thử vật lý cần phép site, người chứng kiến, cách ly và dừng cục bộ.

**Đầu vào:** F06. **Đầu ra:** Review F16 → F16.

[Mockup VI](Prototype.html?lang=vi#F15) · [EN](Prototype.html?lang=en#F15) · [JA](Prototype.html?lang=ja#F15)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Cấu hình kiểm thử | Controller C01 / firmware / mappings pinned | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phạm vi kiểm thử | FAT then SAT; signed local procedure | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Điều kiện kiểm thử | Isolation; fire watch; emergency abort | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Người chứng kiến | Integrator + site authority | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Yêu cầu bằng chứng | Point-by-point result; timestamp; signed attachments | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F15:** Actor đúng quyền thấy đủ trường và đến F16; ngoài scope không đọc/sửa object. Thử guard riêng: Khóa BOM, firmware, mapping và matrix; thử vật lý cần phép site, người chứng kiến, cách ly và dừng cục bộ. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F15 — Bố cục thị giác V2

**Context:** configuration · **Role:** Commissioning lead

**Câu hỏi chính:** Trong “Kế hoạch nghiệm thu”, Cấu hình kiểm thử, Phạm vi kiểm thử cho biết điều gì và vai trò Commissioning lead có thể thực hiện “Review F16” trong phạm vi này không?

**Hình chính:** Chuỗi nghiệm thu có cách ly thử và điểm chứng kiến

**Hành động chính:** Xem F16 → F16

**Mở dần chi tiết:** Giữ Cấu hình kiểm thử, Phạm vi kiểm thử ở lớp quyết định. Đưa chi tiết hỗ trợ của Điều kiện kiểm thử, Người chứng kiến, Yêu cầu bằng chứng, lịch sử nguồn, phiên bản và quy tắc FR-F15 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kế hoạch nghiệm thu” cho Commissioning lead; đổi Cấu hình kiểm thử và làm Yêu cầu bằng chứng không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F16” chỉ tới F16 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f16"></a>
## F16 — Bằng chứng lần kiểm thử

**EN:** Test-run evidence · **JA:** 試験実施証跡  
**FR:** FR-F16 / WF-32 · **Actor:** Commissioning witness · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Không lấy dự kiến điền quan sát; test fail/chưa chạy chặn phát hành và giữ attachment.

**Đầu vào:** F15. **Đầu ra:** Review F17 → F17.

[Mockup VI](Prototype.html?lang=vi#F16) · [EN](Prototype.html?lang=en#F16) · [JA](Prototype.html?lang=ja#F16)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Lần kiểm thử | SAT-041 / approved plan revision 2 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Tác động dự kiến | Selected zone only; local priority retained | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Tác động quan sát | Pending witnessed measurement | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Tạo lỗi có kiểm soát | Power loss / link loss / stuck feedback | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Trạng thái kết quả thử | Not executed; not a passed certificate | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F16:** Actor đúng quyền thấy đủ trường và đến F17; ngoài scope không đọc/sửa object. Thử guard riêng: Không lấy dự kiến điền quan sát; test fail/chưa chạy chặn phát hành và giữ attachment. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F16 — Bố cục thị giác V2

**Context:** configuration · **Role:** Commissioning witness

**Câu hỏi chính:** Trong “Bằng chứng lần kiểm thử”, Lần kiểm thử, Tác động dự kiến cho biết điều gì và vai trò Commissioning witness có thể thực hiện “Review F17” trong phạm vi này không?

**Hình chính:** So sánh tác động vật lý dự kiến, quan sát và lỗi chèn

**Hành động chính:** Xem F17 → F17

**Mở dần chi tiết:** Giữ Lần kiểm thử, Tác động dự kiến ở lớp quyết định. Đưa chi tiết hỗ trợ của Tác động quan sát, Tạo lỗi có kiểm soát, Trạng thái kết quả thử, lịch sử nguồn, phiên bản và quy tắc FR-F16 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bằng chứng lần kiểm thử” cho Commissioning witness; đổi Lần kiểm thử và làm Trạng thái kết quả thử không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F17” chỉ tới F17 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f17"></a>
## F17 — Hồ sơ tương thích và chứng nhận

**EN:** Compatibility & certificate dossier · **JA:** 互換性・証明書台帳  
**FR:** FR-F17 / WF-32 · **Actor:** Compliance reviewer · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** Chứng nhận sản phẩm không chứng nhận lắp đặt hoặc cloud adapter; scope, revision và bằng chứng nghiệm thu phải khớp.

**Đầu vào:** F16. **Đầu ra:** Review F20 → F20.

[Mockup VI](Prototype.html?lang=vi#F17) · [EN](Prototype.html?lang=en#F17) · [JA](Prototype.html?lang=ja#F17)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| BOM đã lắp đặt | Controller + modules + PSU + firmware | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phạm vi chứng nhận | Exact assembly and jurisdiction to verify | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Giới hạn interface | Unknown capabilities remain read-only | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Hiệu lực bằng chứng | Supplier document revision; expiry tracked | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Quyết định đưa vào vận hành | Blocked until FAT / SAT / authority acceptance | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F17:** Actor đúng quyền thấy đủ trường và đến F20; ngoài scope không đọc/sửa object. Thử guard riêng: Chứng nhận sản phẩm không chứng nhận lắp đặt hoặc cloud adapter; scope, revision và bằng chứng nghiệm thu phải khớp. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F17 — Bố cục thị giác V2

**Context:** configuration · **Role:** Compliance reviewer

**Câu hỏi chính:** Trong “Hồ sơ tương thích và chứng nhận”, BOM đã lắp đặt, Phạm vi chứng nhận cho biết điều gì và vai trò Compliance reviewer có thể thực hiện “Review F20” trong phạm vi này không?

**Hình chính:** Phạm vi chứng chỉ đối chiếu vật tư lắp và giới hạn

**Hành động chính:** Xem F20 → F20

**Mở dần chi tiết:** Giữ BOM đã lắp đặt, Phạm vi chứng nhận ở lớp quyết định. Đưa chi tiết hỗ trợ của Giới hạn interface, Hiệu lực bằng chứng, Quyết định đưa vào vận hành, lịch sử nguồn, phiên bản và quy tắc FR-F17 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Hồ sơ tương thích và chứng nhận” cho Compliance reviewer; đổi BOM đã lắp đặt và làm Quyết định đưa vào vận hành không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F20” chỉ tới F20 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f18"></a>
## F18 — Bảo trì và khôi phục

**EN:** Maintenance & restoration · **JA:** 保守と復旧  
**FR:** FR-F18 / WF-31 · **Actor:** Maintenance coordinator · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Chỉ kiểm thử khôi phục có chứng kiến và site duyệt mới xóa suy giảm; hết thời gian/đóng ticket không đủ.

**Đầu vào:** F14. **Đầu ra:** Review F01 → F01.

[Mockup VI](Prototype.html?lang=vi#F18) · [EN](Prototype.html?lang=en#F18) · [JA](Prototype.html?lang=ja#F18)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Phạm vi bảo trì | Line B02 isolation IMP-014 | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Bằng chứng sửa chữa | Technician report; component serial | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Kiểm thử khôi phục | Independent feedback + local panel check | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phê duyệt đóng | Site authority; not technician alone | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Suy giảm còn lại | Unknown until witnessed restoration | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F18:** Actor đúng quyền thấy đủ trường và đến F01; ngoài scope không đọc/sửa object. Thử guard riêng: Chỉ kiểm thử khôi phục có chứng kiến và site duyệt mới xóa suy giảm; hết thời gian/đóng ticket không đủ. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F18 — Bố cục thị giác V2

**Context:** configuration · **Role:** Maintenance coordinator

**Câu hỏi chính:** Trong “Bảo trì và khôi phục”, Phạm vi bảo trì, Bằng chứng sửa chữa cho biết điều gì và vai trò Maintenance coordinator có thể thực hiện “Review F01” trong phạm vi này không?

**Hình chính:** Danh mục phục hồi có suy giảm còn lại và bằng chứng duyệt

**Hành động chính:** Xem F01 → F01

**Mở dần chi tiết:** Giữ Phạm vi bảo trì, Bằng chứng sửa chữa ở lớp quyết định. Đưa chi tiết hỗ trợ của Kiểm thử khôi phục, Phê duyệt đóng, Suy giảm còn lại, lịch sử nguồn, phiên bản và quy tắc FR-F18 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Bảo trì và khôi phục” cho Maintenance coordinator; đổi Phạm vi bảo trì và làm Suy giảm còn lại không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F01” chỉ tới F01 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f19"></a>
## F19 — Nhiệm vụ thiết bị cứu hộ

**EN:** Rescue equipment mission · **JA:** 救助機材ミッション  
**FR:** FR-F19 / WF-33 · **Actor:** Rescue mission commander · **Surface:** PhysicalSystems · **Layout:** detail

**Mục đích / guard thiết bị:** API điều khiển Colossus chưa xác minh: giao operator console hãng; không điều khiển di chuyển/vòi/nạn nhân từ cloud.

**Đầu vào:** Authorized physical-systems menu. **Đầu ra:** Review F11 → F11.

[Mockup VI](Prototype.html?lang=vi#F19) · [EN](Prototype.html?lang=en#F19) · [JA](Prototype.html?lang=ja#F19)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Cấu hình thiết bị | Colossus water monitor / stretcher as approved | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Interface điều khiển | Vendor console; public API unverified | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Năng lực operator | Trained operator; task acceptance pending | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Ràng buộc nhiệm vụ | Water supply; access; load; local stop; casualty procedure | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Bằng chứng nhiệm vụ | Operator report + supported telemetry; not automatic success | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F19:** Actor đúng quyền thấy đủ trường và đến F11; ngoài scope không đọc/sửa object. Thử guard riêng: API điều khiển Colossus chưa xác minh: giao operator console hãng; không điều khiển di chuyển/vòi/nạn nhân từ cloud. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F19 — Bố cục thị giác V2

**Context:** command · **Role:** Rescue mission commander

**Câu hỏi chính:** Trong “Nhiệm vụ thiết bị cứu hộ”, Cấu hình thiết bị, Interface điều khiển cho biết điều gì và vai trò Rescue mission commander có thể thực hiện “Review F11” trong phạm vi này không?

**Hình chính:** Phạm vi nhiệm vụ thiết bị cứu hộ có người đủ chuẩn và giới hạn

**Hành động chính:** Xem F11 → F11

**Mở dần chi tiết:** Giữ Cấu hình thiết bị, Interface điều khiển ở lớp quyết định. Đưa chi tiết hỗ trợ của Năng lực operator, Ràng buộc nhiệm vụ, Bằng chứng nhiệm vụ, lịch sử nguồn, phiên bản và quy tắc FR-F19 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Nhiệm vụ thiết bị cứu hộ” cho Rescue mission commander; đổi Cấu hình thiết bị và làm Bằng chứng nhiệm vụ không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F11” chỉ tới F11 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


<a id="f20"></a>
## F20 — Kết nối hệ thống vật lý

**EN:** Physical connector onboarding · **JA:** 物理コネクタ登録  
**FR:** FR-F20 / WF-28 · **Actor:** Integration engineer · **Surface:** PhysicalSystems · **Layout:** form

**Mục đích / guard thiết bị:** Kích hoạt connector bắt đầu chỉ đọc; credential trong vault, chỉ policy capability ký duyệt mở thao tác ghi được phép.

**Đầu vào:** F17. **Đầu ra:** Review F02 → F02.

[Mockup VI](Prototype.html?lang=vi#F20) · [EN](Prototype.html?lang=en#F20) · [JA](Prototype.html?lang=ja#F20)

| Trường / thành phần | Giá trị minh họa | Validation / thẩm quyền |
|---|---|---|
| Interface nhà sản xuất | Exact published model / firmware / protocol | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Bảo mật truyền dẫn | Certificate and OT allowlist verified before connection | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Quản lý credential | Secret reference only; never display secret | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Phạm vi nhập | Read-only points; no discovered write grant | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |
| Điều kiện kích hoạt | Sandbox test + mapping review + signed capability dossier | Bằng chứng nguồn chỉ đọc; giữ thời điểm và chất lượng. Sửa kế hoạch/quyết định cần scope actor, expected version, reason và review độc lập; không sửa phản hồi vật lý. |

**Hành động và phản hồi:** CTA mở màn review liên kết; prototype không gửi lệnh thiết bị. Mutation production dùng idempotency theo scope và expected version; điều khiển cần capability chính xác đã duyệt, thẩm quyền site và authorization còn hạn. Telemetry/hồ sơ chỉ đọc. Tách request ID, biên nhận controller và bằng chứng vật lý độc lập.

**States:** loading: không tạo telemetry giả; empty: chưa gán thiết bị; denied: không lộ object; stale: hiện age/source, chặn lệnh phụ thuộc; offline: cache chỉ đọc, không queue actuation; conflict: so revision, mất duyệt cũ; impaired/test: scope và biện pháp bù rõ; local override: thu hồi remote; unknown: chỉ đối soát; success: bản ghi durable hoặc bằng chứng vật lý phù hợp, không suy từ ACK.

**AC-F20:** Actor đúng quyền thấy đủ trường và đến F02; ngoài scope không đọc/sửa object. Thử guard riêng: Kích hoạt connector bắt đầu chỉ đọc; credential trong vault, chỉ policy capability ký duyệt mở thao tác ghi được phép. Thử bằng chứng cũ, point ID khác tenant, đổi mapping/version, authorization hết hạn và mất thẩm quyền cục bộ. Không ghi trái phép tới adapter; giữ audit/correlation sự kiện nguồn. Kiểm nhãn vi/en/ja, focus bàn phím, screen reader, draft và phục hồi unknown/error rõ ràng.

### F20 — Bố cục thị giác V2

**Context:** configuration · **Role:** Integration engineer

**Câu hỏi chính:** Trong “Kết nối hệ thống vật lý”, Interface nhà sản xuất, Bảo mật truyền dẫn cho biết điều gì và vai trò Integration engineer có thể thực hiện “Review F02” trong phạm vi này không?

**Hình chính:** Cổng tiếp nhận kết nối hãng về khóa, nhập và kích hoạt

**Hành động chính:** Xem F02 → F02

**Mở dần chi tiết:** Giữ Interface nhà sản xuất, Bảo mật truyền dẫn ở lớp quyết định. Đưa chi tiết hỗ trợ của Quản lý credential, Phạm vi nhập, Điều kiện kích hoạt, lịch sử nguồn, phiên bản và quy tắc FR-F20 vào mục mở rộng có nhãn; không giấu ràng buộc an toàn.

**Hành vi lỗi trọng yếu:** Giữ thẩm quyền bộ điều khiển cục bộ; thiếu phản hồi vật lý là chưa rõ, không thành công, và cấm lặp thực thi mù.

**Tình huống nghiệm thu V2:** Dùng tình huống “Kết nối hệ thống vật lý” cho Integration engineer; đổi Interface nhà sản xuất và làm Điều kiện kích hoạt không khả dụng. Kiểm tra hình, cảnh báo cập nhật, đủ 5 trường gốc truy cập được, và “Review F02” chỉ tới F02 khi đạt điều kiện gốc. Lặp bằng VI/EN, bàn phím và reflow 320 CSS px; ghi kết quả quan sát riêng khỏi đặc tả.


