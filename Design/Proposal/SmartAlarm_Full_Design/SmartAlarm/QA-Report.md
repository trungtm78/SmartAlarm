# SmartAlarm — Bộ thiết kế 3.0

Cập nhật 24/10/2026. Tích hợp BMS trực tiếp vào BRD, FRD, Basic Design, Detail Design, UI/UX và các đặc tả liên quan hiện có.

- 241 màn hình; 37 workflow; giao diện Việt/Anh/Nhật.
- 40 yêu cầu BMS; 11 hồ sơ kỹ thuật connector theo sản phẩm.
- 67 API operation, gồm 23 operation BMS; 7 BMS event có schema.
- 354 đặc tả nghiệm thu mỗi ngôn ngữ.
- Proposal 188 slide; 590 dòng truy vết qua workflow, màn hình và chức năng hệ thống (không phải 590 chức năng độc lập).

[BRD](BRD.html) · [FRD](FRD.html) · [Basic Design](Basic-Design.html) · [Detail Design](Detail-Design.html) · [UI/UX](UIUX-Design.html) · [Screen specifications](Screen-Specifications.html) · [Proposal](Proposal.html) · [Function appendix](Functional-Inventory.html)

[Prototype](Prototype.html) · [BMS research](BMS/index.html) · [API](API-Contract.json) · [Events](Event-Schemas.json)

Kiểm tra: 723 lượt màn hình/ngôn ngữ không ghi nhận lỗi JavaScript hoặc tràn ngang; 48 kiểm tra trạng thái tuyến và 60 kiểm tra bố cục di động. Riêng BMS: 24 bản desktop, 24 bản mobile và 15 tương tác cục bộ. Contract kỹ thuật: 397/397 đạt. Ma trận nghiệm thu là đặc tả kiểm thử cần thực hiện, không phải kết quả nghiệm thu hiện trường.

Đây là bộ đặc tả triển khai. Driver, kết nối BMS thật, tác động vật lý và FAT/SAT cần được phát triển, kiểm chứng theo phiên bản và từng công trình. Bằng chứng audit v2 được giữ với phạm vi lịch sử ban đầu.
