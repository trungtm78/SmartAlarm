/* Supplemental exact-value translations. Source records and identifiers remain unchanged. */
(()=>{'use strict';
const rows=[
['3 connected; 1 stale','3 đã kết nối; 1 dữ liệu cũ','3台接続・1台の情報が古い'],
['A05 alarm; B02 impaired','A05 báo động; B02 suy giảm bảo vệ','A05警報・B02保護機能低下'],
['8 s; source controller C01','8 giây; nguồn: bộ điều khiển C01','8秒・情報源：制御盤C01'],
['Site fire officer','Người phụ trách PCCC tại cơ sở','施設の消防責任者'],
['Read-only until approved capability','Chỉ đọc cho đến khi năng lực được phê duyệt','機能承認までは読み取り専用'],
['PRA-SCL; exact firmware pending verification','PRA-SCL; chờ xác minh đúng phiên bản firmware','PRA-SCL・正確なファームウェアの検証待ち'],
['Vendor Open Interface; revision required','Giao diện mở của hãng; cần xác định phiên bản','メーカー公開インターフェース・版の確認が必要'],
['Supervision only','Chỉ giám sát','監視のみ'],
['Harbor / Building A','Harbor / Tòa A','Harbor / A棟'],
['Supplier dossier pending','Chờ hồ sơ nhà cung cấp','供給業者の資料待ち'],
['C01 / vendor-approved configuration','C01 / cấu hình được hãng phê duyệt','C01 / メーカー承認済み構成'],
['Read status only','Chỉ đọc trạng thái','状態の読み取りのみ'],
['Release; reset; silence until approved','Kích hoạt xả; đặt lại; tắt âm khi chưa được phê duyệt','承認前の放出・リセット・消音'],
['Interface specification + signed FAT','Đặc tả giao diện + FAT có chữ ký','インターフェース仕様＋署名済みFAT'],
['Hardwired local authority retained','Giữ quyền điều khiển tại chỗ qua mạch cứng','ハードワイヤードの現地制御権を維持'],
['C01 / point 017','C01 / điểm 017','C01 / ポイント017'],
['Valve supervisory state; not flow','Trạng thái giám sát van; không phải lưu lượng','弁の監視状態・流量ではない'],
['Normally closed; verify wiring','Thường đóng; cần kiểm tra đấu dây','常閉・配線の確認が必要'],
['Fault / stale / unknown remain distinct','Phân biệt lỗi / dữ liệu cũ / chưa rõ','故障・古い情報・不明を区別'],
['Draft 3; dual review required','Bản nháp 3; cần hai bên rà soát','下書き3・二者による確認が必要'],
['C01-Z05','C01-Z05','C01-Z05'],
['Building A / Floor 05','Tòa A / Tầng 05','A棟 / 5階'],
['Approved plan revision 12','Mặt bằng phiên bản 12 đã được duyệt','承認済み平面図・第12版'],
['No cross-floor inference','Không suy diễn giữa các tầng','階をまたぐ推定は禁止'],
['Draft 3; site walkdown pending','Bản nháp 3; chờ kiểm tra thực địa','下書き3・現地確認待ち'],
['Zone A05 alarm evidence','Bằng chứng báo động vùng A05','A05区域の警報証拠'],
['Notify operator; no automatic release','Thông báo người vận hành; không tự kích hoạt xả','運用担当へ通知・自動放出なし'],
['Site cause-and-effect revision CE-03','Ma trận nguyên nhân–tác động tại cơ sở CE-03','施設の原因・動作マトリクスCE-03'],
['Test / impaired / local lockout','Thử nghiệm / suy giảm / khóa tại chỗ','試験・機能低下・現地ロックアウト'],
['Requires reviewed commissioning plan','Cần kế hoạch nghiệm thu đã rà soát','確認済み試運転計画が必要'],
['C01 / sequence 28017','C01 / số thứ tự 28017','C01 / シーケンス28017'],
['Flow switch active; source evidence','Công tắc dòng chảy kích hoạt; bằng chứng từ nguồn','流水スイッチ作動・機器側の証拠'],
['10:42:08 UTC+07','10:42:08 UTC+07','10:42:08 UTC+07'],
['Current; source-bound','Hiện thời; gắn với nguồn','最新・情報源に紐付け済み'],
['INC-041; operator verification pending','INC-041; chờ người vận hành xác minh','INC-041・運用担当の確認待ち'],
['Run contact active; discharge unverified','Tiếp điểm báo chạy đang tác động; chưa xác minh nước xả','運転接点が作動・放水は未確認'],
['6.0 bar; PT-01; calibrated reference required','6,0 bar; PT-01; cần tham chiếu đã hiệu chuẩn','6.0 bar・PT-01・校正済み基準が必要'],
['Open limit active; flow not implied','Tiếp điểm giới hạn mở đang tác động; không suy ra có dòng chảy','開限界接点が作動・流水を意味しない'],
['Reservoir level unknown','Chưa rõ mực nước bể','貯水槽の水位は不明'],
['Line B02 isolated under permit','Tuyến B02 được cách ly theo giấy phép','B02系統は許可に基づき隔離中'],
['Release request; illustrative only','Yêu cầu kích hoạt xả; chỉ minh họa','放出要求・例示のみ'],
['Approved controller / zone A05','Bộ điều khiển được duyệt / vùng A05','承認済み制御盤 / A05区域'],
['Unverified: execution blocked','Chưa xác minh: chặn thực thi','未検証：実行をブロック'],
['Local authority; occupancy; interlocks; site permit','Thẩm quyền tại chỗ; người hiện diện; liên động; giấy phép cơ sở','現地権限・在場者・インターロック・施設許可'],
['30 s example; approved policy determines TTL','Ví dụ 30 giây; thời hạn do chính sách được duyệt quy định','30秒は例・有効期間は承認済み方針で決定'],
['CMD-041 / revision 3 / zone A05','CMD-041 / phiên bản 3 / vùng A05','CMD-041 / 第3版 / A05区域'],
['Fire officer A; verified scope','Cán bộ PCCC A; phạm vi đã xác minh','消防担当A・権限範囲を確認済み'],
['Officer B; distinct identity required','Cán bộ B; phải là danh tính riêng biệt','担当B・別の本人識別が必要'],
['Blocked: capability dossier incomplete','Đã chặn: hồ sơ năng lực chưa đầy đủ','ブロック中：機能資料が未完備'],
['No browser-to-controller connection','Không có kết nối trình duyệt đến bộ điều khiển','ブラウザーから制御盤への接続なし'],
['Controller accepted; not completed','Bộ điều khiển đã nhận; chưa hoàn tất','制御盤が受理・完了ではない'],
['No independent feedback received','Chưa nhận được phản hồi độc lập','独立したフィードバックは未受信'],
['Unknown; reconcile required','Chưa rõ; cần đối soát','不明・照合が必要'],
['CMD-041 / controller sequence pending','CMD-041 / chờ số thứ tự từ bộ điều khiển','CMD-041 / 制御盤のシーケンス待ち'],
['No blind retry of non-idempotent operation','Không thử lại mù thao tác có thể gây tác động lặp','非冪等操作を確認なしに再試行しない'],
['CMD-041; acceptance seen','CMD-041; đã thấy bằng chứng tiếp nhận','CMD-041・受理の証拠あり'],
['Read-only query; latest source timestamp','Truy vấn chỉ đọc; thời điểm nguồn mới nhất','読み取り専用照会・情報源の最新時刻'],
['Qualified responder observation pending','Chờ quan sát của người cứu hộ đủ năng lực','資格のある対応者による観察待ち'],
['Remain unknown; no release retry','Giữ trạng thái chưa rõ; không thử lại kích hoạt xả','不明を維持・放出の再試行なし'],
['Independent physical effect not verified','Chưa xác minh độc lập tác động vật lý','物理的効果を独立に確認できていない'],
['Local control active','Điều khiển tại chỗ đang có hiệu lực','現地制御が有効'],
['Revoked; stale intents invalidated','Đã thu hồi; ý định cũ bị vô hiệu','失効済み・古い操作意図を無効化'],
['Site fire officer; verified acceptance required','Người phụ trách PCCC cơ sở; cần xác minh việc tiếp nhận','施設消防責任者・受諾の確認が必要'],
['Zone A05; command CMD-041','Vùng A05; lệnh CMD-041','A05区域・コマンドCMD-041'],
['Explicit local release + fresh authorization','Chủ động nhả quyền tại chỗ + cấp quyền mới','明示的な現地制御解除＋新たな承認'],
['Line B02; no adjacent zone changes','Tuyến B02; không thay đổi vùng liền kề','B02系統・隣接区域の変更なし'],
['IMP-014; site approval pending','IMP-014; chờ cơ sở phê duyệt','IMP-014・施設承認待ち'],
['Fire watch; responsible team assigned','Trực giám sát cháy; đã phân đội chịu trách nhiệm','火災監視・担当チームを割当済み'],
['Exercise partition; physical output inhibited','Phân vùng diễn tập; ngõ ra vật lý bị khóa','訓練用領域・物理出力を抑止'],
['16:00 local; overdue remains impaired','16:00 giờ địa phương; quá hạn vẫn giữ trạng thái suy giảm','現地16:00・期限超過後も機能低下状態を維持'],
['Controller C01 / firmware / mappings pinned','Cố định bộ điều khiển C01 / firmware / ánh xạ','制御盤C01・ファームウェア・マッピングを固定'],
['FAT then SAT; signed local procedure','FAT rồi SAT; quy trình tại chỗ có chữ ký','FAT後にSAT・署名済み現地手順'],
['Isolation; fire watch; emergency abort','Cách ly; trực giám sát cháy; dừng khẩn cấp','隔離・火災監視・緊急中止'],
['Integrator + site authority','Đơn vị tích hợp + thẩm quyền cơ sở','インテグレーター＋施設責任者'],
['Point-by-point result; timestamp; signed attachments','Kết quả từng điểm; thời điểm; tài liệu đính kèm có chữ ký','各ポイントの結果・時刻・署名済み添付資料'],
['SAT-041 / approved plan revision 2','SAT-041 / kế hoạch phiên bản 2 đã duyệt','SAT-041 / 承認済み計画第2版'],
['Selected zone only; local priority retained','Chỉ vùng được chọn; giữ ưu tiên tại chỗ','選択区域のみ・現地優先を維持'],
['Pending witnessed measurement','Chờ đo có người chứng kiến','立会い測定待ち'],
['Power loss / link loss / stuck feedback','Mất nguồn / mất kết nối / phản hồi bị kẹt','電源断・通信断・フィードバック固着'],
['Not executed; not a passed certificate','Chưa thực hiện; không phải chứng nhận đạt','未実施・合格証明ではない'],
['Controller + modules + PSU + firmware','Bộ điều khiển + mô-đun + bộ nguồn + firmware','制御盤＋モジュール＋電源装置＋ファームウェア'],
['Exact assembly and jurisdiction to verify','Cần xác minh đúng tổ hợp và thẩm quyền pháp lý','正確な構成と管轄の確認が必要'],
['Unknown capabilities remain read-only','Năng lực chưa rõ vẫn chỉ được đọc','未確認の機能は読み取り専用を維持'],
['Supplier document revision; expiry tracked','Phiên bản tài liệu nhà cung cấp; theo dõi hết hạn','供給業者の文書版・有効期限を追跡'],
['Blocked until FAT / SAT / authority acceptance','Chặn cho đến khi FAT / SAT / thẩm quyền nghiệm thu','FAT・SAT・責任者受入れまでブロック'],
['Line B02 isolation IMP-014','Cách ly tuyến B02 theo IMP-014','B02系統の隔離IMP-014'],
['Technician report; component serial','Báo cáo kỹ thuật viên; số sê-ri linh kiện','技術者報告・部品シリアル番号'],
['Independent feedback + local panel check','Phản hồi độc lập + kiểm tra tủ tại chỗ','独立フィードバック＋現地盤の確認'],
['Site authority; not technician alone','Thẩm quyền cơ sở; không chỉ kỹ thuật viên','施設責任者・技術者単独では不可'],
['Unknown until witnessed restoration','Chưa rõ cho đến khi khôi phục có chứng kiến','立会い復旧確認までは不明'],
['Colossus water monitor / stretcher as approved','Súng phun nước / cáng Colossus theo cấu hình được duyệt','承認構成のColossus放水銃／担架'],
['Vendor console; public API unverified','Bàn điều khiển của hãng; API công khai chưa xác minh','メーカー操作盤・公開APIは未検証'],
['Trained operator; task acceptance pending','Người vận hành đã đào tạo; chờ nhận nhiệm vụ','訓練済み操作者・任務受諾待ち'],
['Water supply; access; load; local stop; casualty procedure','Nguồn nước; đường tiếp cận; tải; dừng tại chỗ; quy trình xử lý nạn nhân','給水・進入路・荷重・現地停止・傷病者対応手順'],
['Operator report + supported telemetry; not automatic success','Báo cáo vận hành + telemetry được hỗ trợ; không tự coi là thành công','操作者報告＋対応テレメトリー・自動的な成功判定なし'],
['Exact published model / firmware / protocol','Đúng mẫu thiết bị / firmware / giao thức đã công bố','公開された正確な型式・ファームウェア・プロトコル'],
['Certificate and OT allowlist verified before connection','Xác minh chứng chỉ và danh sách OT được phép trước khi kết nối','接続前に証明書とOT許可リストを検証'],
['Secret reference only; never display secret','Chỉ tham chiếu bí mật; không bao giờ hiển thị bí mật','秘密情報は参照のみ・値は表示しない'],
['Read-only points; no discovered write grant','Điểm chỉ đọc; phát hiện không cấp quyền ghi','読み取り専用ポイント・検出による書込み許可なし'],
['Sandbox test + mapping review + signed capability dossier','Thử sandbox + rà soát ánh xạ + hồ sơ năng lực có chữ ký','サンドボックス試験＋マッピング確認＋署名済み機能資料']
];
const extra=`
Europe · EU|Châu Âu · EU|欧州・EU
Standard|Tiêu chuẩn|標準
Passkey or enterprise SSO|Passkey hoặc SSO doanh nghiệp|パスキーまたは企業SSO
Authenticator|Ứng dụng xác thực|認証アプリ
Off|Tắt|オフ
On|Bật|オン
EU · Operator|EU · Người vận hành|EU・運用担当
APAC · Responder|APAC · Người cứu hộ|APAC・対応者
Personal|Cá nhân|個人
EU · Citizen|EU · Công dân|EU・市民
Verified recovery contact|Liên hệ khôi phục đã xác minh|確認済み復旧連絡先
One active request|Một yêu cầu đang hoạt động|有効な依頼1件
Expires in 24 hours|Hết hạn sau 24 giờ|24時間後に期限切れ
Enable|Bật|有効化
While using app|Khi sử dụng ứng dụng|アプリ使用中
Selected contacts|Liên hệ được chọn|選択した連絡先
Ask when attaching|Hỏi khi đính kèm|添付時に確認
This device|Thiết bị này|この端末
Active · Berlin|Đang hoạt động · Berlin|有効・Berlin
Work tablet|Máy tính bảng công việc|業務用タブレット
Last active 2 hours ago|Hoạt động lần cuối 2 giờ trước|最終利用2時間前
Old phone|Điện thoại cũ|以前のスマートフォン
Revoked|Đã thu hồi|失効済み
Sign-in required again|Cần đăng nhập lại|再ログインが必要
Device replaced|Đã thay thiết bị|端末交換済み
Large|Lớn|大
Fire · Building A|Cháy · Tòa A|火災・A棟
3 checked in · 1 unknown|3 đã báo tình trạng · 1 chưa rõ|3人が状況報告・1人不明
Online|Trực tuyến|オンライン
Severe|Nghiêm trọng|重大
Campus command · Verified|Điều hành cơ sở · Đã xác minh|施設指令・確認済み
Follow the approved site evacuation procedure|Làm theo quy trình sơ tán đã duyệt của cơ sở|承認済み施設避難手順に従う
Building A · Floor 05|Tòa A · Tầng 05|A棟・5階
Revision 12 · Approved|Phiên bản 12 · Đã duyệt|第12版・承認済み
Not verified in real time|Chưa xác minh theo thời gian thực|リアルタイムでは未確認
Refuge zone B|Vùng lánh nạn B|待避区域B
Manual play|Phát theo thao tác|手動再生
Follow the approved evacuation plan|Làm theo phương án sơ tán đã duyệt|承認済み避難計画に従う
Enabled|Đã bật|有効
Urgent assistance|Trợ giúp khẩn cấp|緊急支援
Care assistance|Hỗ trợ chăm sóc|ケア支援
Traffic assistance|Trợ giúp giao thông|交通支援
Discreet help|Trợ giúp kín đáo|目立たない支援
Describe your situation|Mô tả tình trạng của bạn|状況を説明
Building A / 05 / Room 505|Tòa A / Tầng 05 / Phòng 505|A棟 / 5階 / 505号室
User-entered · unverified|Người dùng nhập · chưa xác minh|利用者入力・未確認
Cannot reach the corridor|Không thể ra hành lang|廊下に出られない
Room 505|Phòng 505|505号室
Campus command|Điều hành cơ sở|施設指令
Location and note|Vị trí và ghi chú|位置とメモ
Received by server|Máy chủ đã nhận|サーバー受信済み
Operator acknowledged|Người vận hành đã xác nhận tiếp nhận|運用担当が確認済み
Team assigned|Đã phân công đội|チーム割当済み
Awaiting team contact|Chờ đội liên lạc|チームの連絡待ち
We received your location|Chúng tôi đã nhận vị trí của bạn|位置情報を受信しました
I am in room 505|Tôi đang ở phòng 505|505号室にいます
Attachments are visible to assigned responders|Người cứu hộ được phân công xem được tệp đính kèm|添付は担当対応者が閲覧可能
Request cancellation|Yêu cầu hủy|取消しを依頼
Help arrived|Người trợ giúp đã đến|支援者が到着
Operator will review the change|Người vận hành sẽ xem xét thay đổi|運用担当が変更を確認します
I am safe|Tôi an toàn|私は安全です
Assembly point North|Điểm tập kết phía Bắc|北集合場所
Family + Campus group|Gia đình + Nhóm cơ sở|家族＋施設グループ
Status only outside response team|Ngoài đội xử lý chỉ chia sẻ tình trạng|対応チーム外には状況のみ共有
2 updates queued|2 cập nhật đang chờ gửi|更新2件が送信待ち
3 delivery attempts|3 lần thử giao nhận|配信試行3回
Still active|Vẫn đang hoạt động|引き続き有効
Fire alert|Cảnh báo cháy|火災警報
Read · 10:42|Đã đọc · 10:42|既読・10:42
Safety confirmation|Xác nhận tình trạng an toàn|安全状況の確認
Saved · 10:45|Đã lưu · 10:45|保存済み・10:45
Family update|Cập nhật gia đình|家族の更新
Delivered · 10:45|Đã giao · 10:45|配信済み・10:45
Flood watch|Theo dõi lũ lụt|洪水注意情報
2 km · official feed|2 km · nguồn chính thức|2 km・公式情報
Road closure|Đóng đường|通行止め
500 m · verified operator|500 m · người vận hành đã xác minh|500 m・確認済み運用担当
Campus A · active|Cơ sở A · đang có hiệu lực|施設A・有効
Approved authority feed|Nguồn cơ quan có thẩm quyền được duyệt|承認済み機関情報
Likely|Có khả năng|可能性が高い
Riverside polygon|Vùng đa giác Riverside|Riverside区域ポリゴン
North shelter|Nơi trú ẩn phía Bắc|北避難所
Open · updated 5 min ago|Đang mở · cập nhật 5 phút trước|開設中・5分前更新
West center|Trung tâm phía Tây|西センター
Capacity unknown|Chưa rõ sức chứa|受入可能数不明
Campus North|Phía Bắc cơ sở|施設北側
Assembly point|Điểm tập kết|集合場所
Open · confirmed by operator|Đang mở · người vận hành xác nhận|開設中・運用担当が確認
Step-free entrance|Lối vào không bậc|段差のない入口
80 available · estimate|Còn 80 chỗ · ước tính|空き80人分・推定
Campus plan|Mặt bằng cơ sở|施設平面図
Revision 12 · downloaded|Phiên bản 12 · đã tải xuống|第12版・ダウンロード済み
3 saved|Đã lưu 3 mục|3件保存済み
Guidance|Hướng dẫn|案内
English · version 4|Tiếng Anh · phiên bản 4|英語・第4版
Today 09:00|Hôm nay 09:00|本日09:00
4 members|4 thành viên|4人
Campus|Cơ sở|施設
24 members|24 thành viên|24人
Travel team|Nhóm di chuyển|旅行グループ
6 members|6 thành viên|6人
Alex reported safe at 10:45|Alex tự báo an toàn lúc 10:45|Alexが10:45に安全と申告
Thank you for letting us know|Cảm ơn bạn đã báo tình trạng|ご報告ありがとうございます
My status is unknown|Tình trạng của tôi chưa rõ|私の状況は不明です
Invite only|Chỉ qua lời mời|招待のみ
Off by default|Mặc định tắt|初期設定はオフ
Self-reported safe · 10:45|Tự báo an toàn · 10:45|本人の安全申告・10:45
Self-reported safe · 10:40|Tự báo an toàn · 10:40|本人の安全申告・10:40
Unknown · no recent report|Chưa rõ · chưa có báo cáo gần đây|不明・最近の報告なし
Jamie · verified|Jamie · đã xác minh|Jamie・確認済み
Morgan · pending|Morgan · đang chờ|Morgan・保留中
Push then SMS|Thông báo đẩy rồi SMS|プッシュ通知後にSMS
Status only|Chỉ tình trạng|状況のみ
WR-401 · paired|WR-401 · đã ghép nối|WR-401・ペアリング済み
30 seconds|30 giây|30秒
Care team then campus command|Đội chăm sóc rồi điều hành cơ sở|ケアチーム後に施設指令
Wearable signal · unverified|Tín hiệu thiết bị đeo · chưa xác minh|ウェアラブル信号・未確認
Notify care team|Thông báo đội chăm sóc|ケアチームへ通知
Get help now|Yêu cầu giúp ngay|今すぐ支援を依頼
User-confirmed map pin|Điểm bản đồ do người dùng xác nhận|利用者が確認した地図ピン
Northbound|Hướng Bắc|北向き
Unknown|Chưa rõ|不明
Optional photo|Ảnh không bắt buộc|写真は任意
Assigned operator only|Chỉ người vận hành được phân công|担当運用者のみ
Approximate · 40 m|Ước tính · 40 m|概算・40 m
Active · fire assistance|Đang xử lý · trợ giúp cháy|対応中・火災支援
Closed · road incident|Đã đóng · sự cố đường bộ|終了・道路事故
Check-in|Báo tình trạng|状況報告
Safe · yesterday|An toàn · hôm qua|安全・昨日
Request a copy|Yêu cầu bản sao|コピーを申請
Subject to incident retention review|Cần xem xét chính sách lưu giữ sự cố|事案保存方針の審査対象
Export personal data|Xuất dữ liệu cá nhân|個人データを出力
Profile and eligible records|Hồ sơ và bản ghi đủ điều kiện|プロフィールと対象記録
Verification pending|Chờ xác minh|確認待ち
Secure download link after review|Liên kết tải bảo mật sau khi xem xét|審査後に安全なダウンロードリンク
Fire · assisted evacuation|Cháy · sơ tán có hỗ trợ|火災・支援付き避難
Available|Sẵn sàng|対応可能
Fire · Building A · P1|Cháy · Tòa A · P1|火災・A棟・P1
Welfare check · P2|Kiểm tra an sinh · P2|安否確認・P2
Campus east|Phía Đông cơ sở|施設東側
User-reported · 05 / 505|Người dùng tự báo · 05 / 505|本人申告・5階 / 505号室
Smoke report · not confirmed|Báo có khói · chưa xác minh|煙の報告・未確認
Accepted|Đã tiếp nhận|受理済み
Entrance E2|Lối vào E2|入口E2
8 seconds|8 giây|8秒
Operator-approved access plan|Phương án tiếp cận được người vận hành duyệt|運用担当承認済み進入計画
East corridor · reported|Hành lang Đông · theo báo cáo|東廊下・報告あり
Revision 12|Phiên bản 12|第12版
Established|Đã thiết lập|確立済み
Needs mobility assistance|Cần hỗ trợ di chuyển|移動支援が必要
Assisting to assembly point|Đang hỗ trợ đến điểm tập kết|集合場所への移動を支援中
Assistance completed|Đã hoàn tất hỗ trợ|支援完了
Assembly team North|Đội tập kết phía Bắc|北集合場所チーム
10:48 · responder report|10:48 · báo cáo người cứu hộ|10:48・対応者報告
Responder-confirmed assisted|Người cứu hộ xác nhận đã hỗ trợ|対応者が支援済みと確認
Return to availability|Trở lại sẵn sàng|対応可能に戻る
Use entrance E2|Dùng lối vào E2|入口E2を使用
At floor 05|Ở tầng 05|5階にいる
Only assigned teams can view this channel|Chỉ đội được phân công xem được kênh này|担当チームのみ閲覧可能
Photo|Ảnh|写真
Corridor condition at arrival|Tình trạng hành lang khi đến|到着時の廊下の状態
Restricted incident evidence|Bằng chứng sự cố hạn chế truy cập|閲覧制限付き事案証拠
Observation|Quan sát|観察
Queued · 10:47|Đang chờ · 10:47|待機中・10:47
Queued · 2 MB|Đang chờ · 2 MB|待機中・2 MB
Status update|Cập nhật tình trạng|状況更新
Conflict requires review|Xung đột cần xem xét|競合の確認が必要
Task in progress · 10:47|Đang thực hiện nhiệm vụ · 10:47|任務実行中・10:47
Task reassigned · 10:48|Đã phân công lại · 10:48|再割当済み・10:48
Preserved as observation|Giữ lại dưới dạng quan sát|観察として保存
Refresh task ownership|Cập nhật người phụ trách nhiệm vụ|任務担当を更新
Building A · P1|Tòa A · P1|A棟・P1
River district · P2|Khu ven sông · P2|河川地区・P2
Harbor Road · P1|Đường Harbor · P1|Harbor通り・P1
12 seconds|12 giây|12秒
Camera flame · confidence 0.82|Camera phát hiện lửa · độ tin cậy 0,82|カメラ火炎検出・信頼度0.82
Smoke sensor · threshold exceeded|Cảm biến khói · vượt ngưỡng|煙センサー・閾値超過
Wearable fall · unverified|Thiết bị đeo phát hiện ngã · chưa xác minh|ウェアラブル転倒検出・未確認
P1 · response active|P1 · đang ứng phó|P1・対応中
0.82 · model v3|0,82 · mô hình v3|0.82・モデルv3
Same zone within 60 seconds|Cùng vùng trong 60 giây|同じ区域で60秒以内
Link without deleting source|Liên kết nhưng không xóa nguồn|ソースを削除せず関連付け
Available · fire capable|Sẵn sàng · đủ năng lực chữa cháy|対応可能・消防対応可
Assigned · care capable|Đã phân công · đủ năng lực chăm sóc|割当済み・ケア対応可
Available · perimeter|Sẵn sàng · vành đai|対応可能・周辺警戒
Assist SOS-041|Hỗ trợ SOS-041|SOS-041を支援
Assist person in Room 505|Hỗ trợ người tại phòng 505|505号室の人を支援
60 seconds|60 giây|60秒
Signal received|Đã nhận tín hiệu|信号受信済み
Incident confirmed|Đã xác nhận sự cố|事案確認済み
SOS acknowledged|Đã xác nhận tiếp nhận SOS|SOS確認済み
Rescue 02 assigned|Đã phân công Rescue 02|Rescue 02を割当済み
SOS · Room 505 · 10:42|SOS · Phòng 505 · 10:42|SOS・505号室・10:42
Unknown · last seen 09:50|Chưa rõ · lần cuối thấy lúc 09:50|不明・最終確認09:50
24 registered occupants|24 người đăng ký hiện diện|登録在場者24人
User-submitted room 505|Người dùng báo phòng 505|利用者申告505号室
Response team only|Chỉ đội ứng phó|対応チームのみ
Assistance requested|Đã yêu cầu trợ giúp|支援依頼済み
3 minutes old|Dữ liệu 3 phút trước|3分前の情報
Building A|Tòa A|A棟
Follow approved evacuation plan|Làm theo phương án sơ tán đã duyệt|承認済み避難計画に従う
480 eligible subscriptions|480 đăng ký đủ điều kiện|対象登録480件
Push · SMS · PA|Thông báo đẩy · SMS · Loa|プッシュ・SMS・構内放送
English approved · Japanese pending|Tiếng Anh đã duyệt · Tiếng Nhật đang chờ|英語承認済み・日本語は保留
Outside Building A|Bên ngoài tòa A|A棟の外
Operator A|Người vận hành A|運用担当A
Supervisor B|Giám sát viên B|監督者B
Verified incident in occupied zone|Sự cố đã xác minh trong vùng có người|在場者のいる区域で確認済み事案
Push|Thông báo đẩy|プッシュ通知
402 delivered · 78 unknown|402 đã giao · 78 chưa rõ|402件配信済み・78件不明
60 delivered · 18 pending|60 đã giao · 18 đang chờ|60件配信済み・18件保留
SMS provider B|Nhà cung cấp SMS B|SMS事業者B
Rate limit · retryable|Giới hạn tốc độ · có thể thử lại|レート制限・再試行可能
18 recipients|18 người nhận|受信者18人
Voice provider C|Nhà cung cấp thoại C|音声事業者C
PA controller · zone A05|Bộ điều khiển loa · vùng A05|放送制御盤・A05区域
Play approved evacuation message|Phát bản tin sơ tán đã duyệt|承認済み避難案内を再生
Test passed|Thử nghiệm đạt|試験合格
30 seconds after approval|30 giây sau phê duyệt|承認後30秒
Requested|Đã yêu cầu|要求済み
Approved|Đã duyệt|承認済み
Gateway accepted|Gateway đã tiếp nhận|ゲートウェイ受理済み
Completion not yet confirmed|Chưa xác nhận hoàn tất|完了は未確認
3 · handover documented|3 · đã ghi nhận bàn giao|3・引継ぎ記録あり
Released|Đã giải phóng|解放済み
Transferred to authority|Đã bàn giao cơ quan có thẩm quyền|担当機関へ引継ぎ済み
Supervisor|Giám sát viên|監督者
7 seconds|7 giây|7秒
42 seconds|42 giây|42秒
18 SMS attempts|18 lần thử SMS|SMS試行18回
Review provider capacity|Rà soát năng lực nhà cung cấp|事業者の容量を確認
Increase tested SMS capacity|Tăng năng lực SMS đã kiểm thử|検証済みSMS容量を増加
Platform operations|Vận hành nền tảng|プラットフォーム運用
Building A evacuation|Sơ tán tòa A|A棟避難
Exercise only|Chỉ diễn tập|訓練のみ
Test cohort|Nhóm thử nghiệm|試験対象群
Exercise|Diễn tập|訓練
Disconnected|Mất kết nối|切断
3 of 5|3 trên 5|5件中3件
Operator B|Người vận hành B|運用担当B
Required|Bắt buộc|必須
Open · 80 spaces|Đang mở · 80 chỗ|開設中・80人分
Status unverified|Trạng thái chưa xác minh|状態未確認
South shelter|Nơi trú ẩn phía Nam|南避難所
Closed|Đã đóng|終了
North|Bắc|北
Open|Đang mở|開設中
Step-free|Không bậc|段差なし
Flood watch · Update|Theo dõi lũ · Cập nhật|洪水注意情報・更新
Wind alert · expired|Cảnh báo gió · hết hạn|強風警報・期限切れ
Storm warning · canceled|Cảnh báo bão · đã hủy|暴風警報・取消済み
Configured authority|Cơ quan có thẩm quyền được cấu hình|設定済み機関
Update|Cập nhật|更新
Create|Tạo|作成
Operator A · 10:40|Người vận hành A · 10:40|運用担当A・10:40
Dispatch|Điều phối|派遣
Dispatcher B · 10:43|Điều phối viên B · 10:43|配車担当B・10:43
Auditor C · 11:20|Kiểm toán viên C · 11:20|監査者C・11:20
`.trim().split('\n').map(x=>x.split('|'));
const admin=`
Buildings · EU|Các tòa nhà · EU|建物・EU
Geofence · EU|Vùng địa lý · EU|ジオフェンス・EU
North highway|Đường cao tốc phía Bắc|北高速道路
Road segment · EU|Đoạn đường · EU|道路区間・EU
Floors 01–08|Tầng 01–08|1～8階
Floor 05|Tầng 05|5階
Zones A05-01 to A05-06|Vùng A05-01 đến A05-06|区域A05-01～A05-06
Zone A05-03|Vùng A05-03|A05-03区域
Camera + smoke detector|Camera + đầu báo khói|カメラ＋煙感知器
Assembly|Tập kết|集合
North court|Sân phía Bắc|北広場
East corridor|Hành lang Đông|東廊下
13 draft|Bản nháp 13|下書き13
Zone B|Vùng B|B区域
Operator controlled|Người vận hành kiểm soát|運用担当が制御
Revision 13|Phiên bản 13|第13版
Draft · accessibility review pending|Bản nháp · chờ rà soát trợ năng|下書き・アクセシビリティ確認待ち
Published · 2026-09-02|Đã công bố · 2026-09-02|公開済み・2026-09-02
Revision 11|Phiên bản 11|第11版
Archived|Đã lưu trữ|アーカイブ済み
Camera · healthy|Camera · hoạt động tốt|カメラ・正常
Smoke sensor · healthy|Cảm biến khói · hoạt động tốt|煙センサー・正常
Gateway · stale|Gateway · dữ liệu cũ|ゲートウェイ・情報が古い
Wearable · paired|Thiết bị đeo · đã ghép nối|ウェアラブル・ペアリング済み
Valid · 48 days remaining|Hợp lệ · còn 48 ngày|有効・残り48日
8 seconds ago|8 giây trước|8秒前
3.2 · approved|3.2 · đã duyệt|3.2・承認済み
Single-use · masked|Dùng một lần · đã che|使い捨て・マスク済み
Video + detection metadata|Video + siêu dữ liệu phát hiện|映像＋検出メタデータ
Lobby · online|Sảnh · trực tuyến|ロビー・オンライン
West corridor · online|Hành lang Tây · trực tuyến|西廊下・オンライン
East corridor · stale frame|Hành lang Đông · khung hình cũ|東廊下・古いフレーム
Incident-scoped|Giới hạn theo sự cố|事案範囲に限定
Patrol confirmed|Đã xác nhận tuần tra|巡回確認済み
Site supervisor|Giám sát viên cơ sở|施設監督者
Fire rule v4|Quy tắc cháy v4|火災ルールv4
Published|Đã công bố|公開済み
Fall rule v2|Quy tắc té ngã v2|転倒ルールv2
Road collision v1|Va chạm đường bộ v1|道路衝突v1
Flood threshold v3|Ngưỡng lũ v3|洪水閾値v3
Fire corroboration|Đối chứng cháy|火災の裏付け
Camera event + smoke event|Sự kiện camera + sự kiện khói|カメライベント＋煙イベント
Create P1 incident|Tạo sự cố P1|P1事案を作成
Simulation|Mô phỏng|シミュレーション
24 passed · 2 need review|24 đạt · 2 cần xem xét|24件合格・2件要確認
0 in test set|0 trong bộ thử|試験セット内0件
5 draft|Bản nháp 5|下書き5
Independent supervisor|Giám sát viên độc lập|独立した監督者
Flame v3|Mô hình lửa v3|火炎モデルv3
120 events|120 sự kiện|120イベント
8 cases|8 trường hợp|8件
Lighting shift detected|Phát hiện thay đổi ánh sáng|照明変化を検出
MQTT sensors|Cảm biến MQTT|MQTTセンサー
Telemetry|Dữ liệu đo từ xa|テレメトリー
CAP authority|Cơ quan CAP|CAP機関
Public warning|Cảnh báo công cộng|公衆警報
MAVLink gateway|Gateway MAVLink|MAVLinkゲートウェイ
Drone telemetry|Dữ liệu đo drone|ドローンテレメトリー
IOC bridge|Cầu nối IOC|IOCブリッジ
Incident exchange|Trao đổi sự cố|事案情報交換
device registry binding|Liên kết sổ đăng ký thiết bị|機器台帳への紐付け
Quarantine|Cách ly|隔離
Deduplicated|Đã loại trùng|重複排除済み
Rejected|Đã từ chối|拒否済み
MQTT bridge|Cầu nối MQTT|MQTTブリッジ
Connected · 0 queue lag|Đã kết nối · độ trễ hàng đợi 0|接続済み・キュー遅延0
Degraded · retrying|Suy giảm · đang thử lại|機能低下・再試行中
CAP feed|Nguồn CAP|CAPフィード
Healthy · last poll 30 s|Hoạt động tốt · truy vấn lần cuối 30 giây trước|正常・最終取得30秒前
Drone bridge|Cầu nối drone|ドローンブリッジ
Telemetry only|Chỉ dữ liệu đo từ xa|テレメトリーのみ
Unknown location mapping|Ánh xạ vị trí chưa rõ|位置マッピング不明
Bind device to zone|Gắn thiết bị vào vùng|機器を区域に紐付け
Preserve original event ID|Giữ ID sự kiện gốc|元のイベントIDを保持
Partner IOC|IOC đối tác|連携先IOC
Stored in vault · not shown|Lưu trong kho bí mật · không hiển thị|秘密保管庫に保存・非表示
90 days|90 ngày|90日
HMAC + timestamp|HMAC + thời điểm|HMAC＋タイムスタンプ
Exponential · max 24 h|Tăng theo hàm mũ · tối đa 24 giờ|指数バックオフ・最大24時間
City command|Điều hành thành phố|都市指令
Incident response|Ứng phó sự cố|事案対応
Location + pseudonymous SOS|Vị trí + SOS dùng định danh giả|位置＋仮名化SOS
30 days|30 ngày|30日
Both organizations required|Cần cả hai tổ chức|両組織の承認が必要
Sent · application ACK received|Đã gửi · đã nhận ACK ứng dụng|送信済み・アプリACK受信
Sent · ACK pending|Đã gửi · chờ ACK|送信済み・ACK待ち
Update 4|Cập nhật 4|更新4
Rejected · schema mismatch|Bị từ chối · sai schema|拒否・スキーマ不一致
Ready · battery 92%|Sẵn sàng · pin 92%|準備完了・電池92%
Maintenance|Bảo trì|保守
Offline|Ngoại tuyến|オフライン
Certified local operator|Người vận hành tại chỗ có chứng nhận|認定済み現地操作者
Situation assessment|Đánh giá tình huống|状況評価
Campus perimeter|Vành đai cơ sở|施設外周
Assigned|Đã phân công|割当済み
Requires local verification|Cần xác minh tại chỗ|現地確認が必要
Pending clearance|Chờ cấp phép|許可待ち
Verified role|Vai trò đã xác minh|確認済み役割
Validated|Đã kiểm chứng|検証済み
Evidence attached|Đã đính kèm bằng chứng|証拠を添付済み
Local controller policy|Chính sách bộ điều khiển tại chỗ|現地制御装置の方針
Simulated · in progress|Mô phỏng · đang diễn ra|シミュレーション・進行中
30 m AGL|30 m so với mặt đất|地上高30 m
2 seconds|2 giây|2秒
Accepted · completion unconfirmed|Đã nhận · chưa xác nhận hoàn tất|受理済み・完了未確認
Stored in regional evidence vault|Lưu tại kho bằng chứng của vùng|リージョンの証拠保管庫に保存
Observation complete|Đã hoàn tất quan sát|観察完了
Signed off|Đã ký xác nhận|署名確認済み
Degraded connector|Kết nối tích hợp suy giảm|コネクター機能低下
Disabled|Đã tắt|無効
Operator · active|Người vận hành · đang hoạt động|運用担当・有効
Responder · active|Người cứu hộ · đang hoạt động|対応者・有効
Invite pending|Lời mời đang chờ|招待待ち
Service client|Ứng dụng dịch vụ|サービスクライアント
IOC · scoped|IOC · giới hạn phạm vi|IOC・範囲限定
Warning approver|Người duyệt cảnh báo|警報承認者
Cannot approve own draft|Không được duyệt bản nháp của chính mình|自分の下書きは承認不可
Campus duty operator|Người trực điều hành cơ sở|施設当直運用担当
After 60 seconds|Sau 60 giây|60秒後
Shift supervisor|Giám sát ca|シフト監督者
After 120 seconds|Sau 120 giây|120秒後
Regional backup|Dự phòng khu vực|リージョンのバックアップ
Fire evacuation|Sơ tán do cháy|火災避難
Approved v4|v4 đã duyệt|v4承認済み
Review required|Cần rà soát|確認が必要
Approved English|Tiếng Anh đã duyệt|承認済み英語
Personal safety / welfare check|An toàn cá nhân / kiểm tra an sinh|個人の安全／安否確認
Contact then dispatch|Liên lạc rồi điều phối|連絡後に派遣
Restricted|Hạn chế|制限付き
Welfare v2|An sinh v2|安否確認v2
Manual SOS or detector|SOS thủ công hoặc bộ phát hiện|手動SOSまたは検出器
Check-in → operator → dispatch|Báo tình trạng → người vận hành → điều phối|状況報告→運用担当→派遣
Care supervisor|Giám sát chăm sóc|ケア監督者
30 days proposed|Đề xuất 30 ngày|30日を提案
365 days proposed|Đề xuất 365 ngày|365日を提案
90 days proposed|Đề xuất 90 ngày|90日を提案
Overrides deletion|Ưu tiên hơn việc xóa|削除より優先
Verified|Đã xác minh|確認済み
Profile + eligible history|Hồ sơ + lịch sử đủ điều kiện|プロフィール＋対象履歴
Hold applied|Đã áp dụng lưu giữ bắt buộc|保全措置適用済み
Export allowed subset|Xuất phần dữ liệu được phép|許可された範囲を出力
EU ingestion|Tiếp nhận dữ liệu EU|EUデータ取込
Healthy|Hoạt động tốt|正常
Degraded|Suy giảm|機能低下
Lag 0.4 s|Trễ 0,4 giây|遅延0.4秒
Passed in test environment|Đạt trong môi trường thử|試験環境で合格
Step 1|Bước 1|手順1
Fence the failed writer|Cô lập tiến trình ghi bị lỗi|障害書込みノードを隔離
Step 2|Bước 2|手順2
Promote verified replica|Nâng bản sao đã xác minh thành chính|検証済みレプリカを昇格
Step 3|Bước 3|手順3
Replay durable outbox|Phát lại hộp gửi lưu bền vững|永続送信キューを再実行
Step 4|Bước 4|手順4
Reconcile delivery and command receipts|Đối soát biên nhận giao tin và lệnh|配信とコマンドの受領を照合
Enterprise regional|Doanh nghiệp theo vùng|リージョン別企業プラン
24 of 30|24 trên 30|30中24
480 of 600|480 trên 600|600中480
72% consumed|Đã dùng 72%|72%使用済み
No silent incident drop|Không âm thầm loại bỏ sự cố|事案を通知なく破棄しない
Allowed under overload|Được phép khi quá tải|過負荷時に許可
Reserved capacity|Năng lực dự trữ|予約容量
Visible degraded mode|Hiển thị rõ chế độ suy giảm|機能低下モードを明示
Last 30 days|30 ngày qua|過去30日
18 seconds · demo|18 giây · minh họa|18秒・例
61 seconds · demo|61 giây · minh họa|61秒・例
3.4% · demo|3,4% · minh họa|3.4%・例
De-identified|Đã khử định danh|非識別化済み
Monthly readiness|Mức sẵn sàng hằng tháng|月次準備状況
Tenant supervisors|Giám sát viên tổ chức|テナント監督者
First Monday · 09:00|Thứ Hai đầu tháng · 09:00|第1月曜日・09:00
Saved on this device|Đã lưu trên thiết bị này|この端末に保存済み
Not received|Chưa nhận|未受信
When connection returns|Khi kết nối trở lại|接続復帰時
Use configured local emergency calling option|Dùng phương án gọi khẩn cấp địa phương đã cấu hình|設定済みの地域緊急通報手段を使用
Unavailable|Không khả dụng|利用不可
Enter building and room|Nhập tòa nhà và phòng|建物と部屋を入力
Permission remains your choice|Quyền truy cập vẫn do bạn chọn|権限は利用者が選択
Manual location supported|Hỗ trợ nhập vị trí thủ công|位置の手動入力に対応
Harbor Campus · active|Cơ sở Harbor · đang có hiệu lực|Harbor施設・有効
Only authorized sites|Chỉ cơ sở được phép|許可済み施設のみ
10 seconds ago|10 giây trước|10秒前
Still listed in health|Vẫn liệt kê trong tình trạng thiết bị|機器状態一覧に引き続き表示
Restricted incident|Sự cố hạn chế truy cập|制限付き事案
Not disclosed|Không tiết lộ|非開示
Ask your tenant administrator|Liên hệ quản trị viên tổ chức|テナント管理者へ問い合わせ
Access attempt recorded|Đã ghi nhận lần truy cập|アクセス試行を記録済み
Regional API degraded|API vùng suy giảm|リージョンAPI機能低下
May be stale|Có thể đã cũ|古い可能性あり
Not confirmed|Chưa xác nhận|未確認
Retry without creating duplicates|Thử lại mà không tạo bản trùng|重複を作らず再試行
Preserved locally|Giữ lại trên thiết bị|ローカルに保存
Review before resubmitting|Xem lại trước khi gửi lại|再送信前に確認
Today|Hôm nay|本日
Check identifier or reset filters|Kiểm tra mã hoặc đặt lại bộ lọc|識別子を確認するかフィルターをリセット
Preserved without submitting|Giữ lại nhưng chưa gửi|未送信のまま保存
Expired|Hết hạn|期限切れ
Hidden|Đã ẩn|非表示
Re-authenticate|Xác thực lại|再認証
Cached · 2 minutes old|Bản lưu tạm · cũ 2 phút|キャッシュ・2分前
Reconnecting|Đang kết nối lại|再接続中
Disabled while stale|Vô hiệu khi dữ liệu cũ|情報が古い間は無効
Confirm fresh state|Xác nhận trạng thái mới|最新状態を確認
Observation clip|Đoạn video quan sát|観察動画
Exceeds 20 MB|Vượt quá 20 MB|20 MB超過
Choose a smaller file|Chọn tệp nhỏ hơn|小さいファイルを選択
EU cell|Cụm vùng EU|EUセル
Healthy · 3 availability zones|Hoạt động tốt · 3 vùng sẵn sàng|正常・3つの可用性ゾーン
APAC cell|Cụm vùng APAC|APACセル
Global directory|Danh mục toàn cầu|グローバルディレクトリ
Enforced|Được thực thi|強制適用
Primary + verified replicas|Bản chính + các bản sao đã xác minh|プライマリー＋検証済みレプリカ
Approved EU destination|Đích EU đã được duyệt|承認済みEU宛先
Isolated recovery exercise|Diễn tập khôi phục cách ly|隔離復旧訓練
Verified snapshot|Bản chụp đã xác minh|検証済みスナップショット
5 minutes|5 phút|5分
60 minutes|60 phút|60分
Reconciled|Đã đối soát|照合済み
Replayed without duplicate effects|Phát lại không tạo tác động trùng|重複効果なしで再実行
EU only|Chỉ EU|EUのみ
Dedicated database|Cơ sở dữ liệu riêng|専用データベース
Enterprise|Doanh nghiệp|企業
Reviewed baseline|Baseline đã rà soát|確認済み基準版
Active|Đang hoạt động|有効
Retention workflow required|Cần quy trình lưu giữ|保存ワークフローが必要
Not granted|Chưa được cấp|未許可
Connector diagnostics metadata|Siêu dữ liệu chẩn đoán kết nối|コネクター診断メタデータ
Investigate IOC delay|Điều tra độ trễ IOC|IOC遅延を調査
30 minutes|30 phút|30分
Platform support|Hỗ trợ nền tảng|プラットフォームサポート
Diagnostics metadata|Siêu dữ liệu chẩn đoán|診断メタデータ
All access recorded|Ghi lại mọi truy cập|全アクセスを記録
Incident service|Dịch vụ sự cố|事案サービス
2.4 · canary|2.4 · triển khai thăm dò|2.4・カナリア展開
Event schema|Schema sự kiện|イベントスキーマ
v1.3 additive|v1.3 chỉ bổ sung|v1.3・追加変更のみ
Mobile API|API di động|モバイルAPI
v1 supported|Hỗ trợ v1|v1対応
Rollback|Hoàn tác phiên bản|ロールバック
Previous image available|Có image phiên bản trước|以前のイメージあり
Passed|Đạt|合格
Within gate|Trong ngưỡng cho phép|ゲート範囲内
Expand phase only|Chỉ giai đoạn mở rộng|拡張フェーズのみ
Device certificate|Chứng chỉ thiết bị|機器証明書
Revoked · investigation|Đã thu hồi · đang điều tra|失効済み・調査中
Webhook replay|Phát lại webhook|Webhookリプレイ
Blocked|Đã chặn|ブロック中
Support session|Phiên hỗ trợ|サポートセッション
Upload scan|Quét tệp tải lên|アップロード検査
Quarantined|Đã cách ly|隔離済み
Revoke certificate|Thu hồi chứng chỉ|証明書を失効
Site supervisor notified|Đã thông báo giám sát viên cơ sở|施設監督者へ通知済み
Preserved|Được giữ lại|保存済み
API reference|Tài liệu tham chiếu API|APIリファレンス
Version 1|Phiên bản 1|第1版
Event schemas|Schema sự kiện|イベントスキーマ
CloudEvents + domain v1|CloudEvents + miền nghiệp vụ v1|CloudEvents＋ドメインv1
SDK examples|Ví dụ SDK|SDK例
Sandbox|Môi trường thử cách ly|サンドボックス
Exercise isolated|Diễn tập được cách ly|訓練を隔離
Source + event ID|Nguồn + ID sự kiện|ソース＋イベントID
202 durable receipt|202 biên nhận đã lưu bền vững|202 永続受領
HTTP status|Trạng thái HTTP|HTTPステータス
Committed|Đã ghi bền vững|コミット済み
Not yet confirmed|Chưa được xác nhận|まだ未確認
v1 · active|v1 · đang hoạt động|v1・有効
v1 · restricted|v1 · hạn chế|v1・制限付き
Deprecated versions|Phiên bản ngừng khuyến nghị|非推奨バージョン
None|Không có|なし
Partner sensor bridge|Cầu nối cảm biến đối tác|連携先センサーブリッジ
Idempotent ingest|Tiếp nhận không tạo tác động trùng|冪等な取込
Flagged|Đã đánh dấu|フラグ付き
Queued|Đang chờ|キュー待ち
Partner returned 503|Đối tác trả về 503|連携先が503を返却
Retry scheduled|Đã lên lịch thử lại|再試行を予約済み
Application ACK received|Đã nhận ACK ứng dụng|アプリACK受信済み
Expires in 10 days|Hết hạn sau 10 ngày|10日後に期限切れ
24 hours|24 giờ|24時間
Vault reference only|Chỉ tham chiếu kho bí mật|秘密保管庫への参照のみ
Review required before publish|Cần rà soát trước khi công bố|公開前に確認が必要
Fire evacuation v4|Sơ tán do cháy v4|火災避難v4
Matched|Khớp|一致
Independent language reviewer|Người rà soát ngôn ngữ độc lập|独立した言語レビュー担当
Approved Japanese voice|Giọng tiếng Nhật đã duyệt|承認済み日本語音声
Approved template v4|Mẫu v4 đã duyệt|承認済みテンプレートv4
Reviewed|Đã rà soát|確認済み
Text transcript|Bản chữ|テキスト原稿
Explicit profile choice|Lựa chọn rõ ràng trong hồ sơ|プロフィールで明示的に選択
Approved fallback only|Chỉ bản dự phòng đã duyệt|承認済み代替のみ
Safe|An toàn|安全
Member|Thành viên|メンバー
7 days|7 ngày|7日
Not included|Không bao gồm|含まない
Unwanted messages|Tin nhắn không mong muốn|望まないメッセージ
Report and block sender|Báo cáo và chặn người gửi|送信者を報告・ブロック
Remain governed by safety policy|Vẫn tuân theo chính sách an toàn|引き続き安全方針を適用
Profile language|Ngôn ngữ hồ sơ|プロフィール言語
Quiet hours enabled|Đã bật giờ yên lặng|静音時間が有効
Site policy applies|Áp dụng chính sách cơ sở|施設方針を適用
No sound|Không âm thanh|音なし
Verified contact required|Cần liên hệ đã xác minh|確認済み連絡先が必要
Closed · documented handover|Đã đóng · bàn giao có hồ sơ|終了・引継ぎ記録あり
Dismissed · false detection|Đã loại bỏ · phát hiện sai|却下・誤検出
Closed · all tasks resolved|Đã đóng · tất cả nhiệm vụ hoàn tất|終了・全任務解決済み
New related evidence|Bằng chứng liên quan mới|新たな関連証拠
Incident location + pseudonymous SOS|Vị trí sự cố + SOS dùng định danh giả|事案位置＋仮名化SOS
Local incident owner retained|Giữ người phụ trách sự cố tại chỗ|現地事案担当を維持
Version 3 approved|Phiên bản 3 đã duyệt|第3版承認済み
`.trim().split('\n').map(x=>x.split('|'));
const care=`
Mobility assistance · Room 505|Hỗ trợ di chuyển · Phòng 505|移動支援・505号室
Text communication preferred|Ưu tiên giao tiếp bằng chữ|文字での連絡を優先
Assistance type unknown|Chưa rõ loại trợ giúp|支援の種類は不明
Self-reported needs|Nhu cầu tự báo|本人申告のニーズ
Proceed to the marked west stairwell|Đến cầu thang Tây có biển đánh dấu|表示のある西階段へ進む
QR anchor confirmed|Đã xác nhận mốc QR|QR基準点を確認済み
Updated 8 seconds ago|Cập nhật 8 giây trước|8秒前に更新
2 of 5|2 trên 5|5件中2件
Continue to the WEST STAIR sign|Tiếp tục đến biển CẦU THANG TÂY|西階段の標識まで進む
Uncertain · landmark guidance|Chưa chắc chắn · hướng dẫn theo mốc|不確実・目印による案内
Assistance refuge B|Điểm lánh nạn có hỗ trợ B|支援待避場所B
New hazard reported on corridor E|Có báo cáo nguy hiểm mới tại hành lang E|E廊下で新たな危険情報
Withdrawn|Đã thu hồi|取消済み
Follow the newly reviewed west route|Theo tuyến Tây vừa được rà soát|新たに確認した西経路に従う
Unreliable indoors|Không đáng tin cậy trong nhà|屋内では信頼性不足
Identify a marked location or request help|Xác định mốc vị trí hoặc yêu cầu giúp|位置マーカーを確認するか支援を依頼
Location uncertainty announced|Đã thông báo vị trí chưa chắc chắn|位置の不確実性を通知済み
Riverside flood polygon|Vùng lũ Riverside|Riverside洪水区域
North assembly point|Điểm tập kết phía Bắc|北集合場所
Verified segments only|Chỉ đoạn đã xác minh|確認済み区間のみ
Vietnamese / English / Japanese|Tiếng Việt / Tiếng Anh / Tiếng Nhật|ベトナム語／英語／日本語
Device-supported reviewed voice|Giọng đã rà soát được thiết bị hỗ trợ|端末対応の確認済み音声
Normal|Bình thường|通常
Respected|Được tôn trọng|尊重
Floors 01–08 · 24 speakers|Tầng 01–08 · 24 loa|1～8階・スピーカー24台
Outdoor campus|Ngoài trời trong cơ sở|施設屋外
6 speakers|6 loa|スピーカー6台
West loading bay|Khu bốc dỡ phía Tây|西荷捌き場
A05 + stairwell W|A05 + cầu thang W|A05＋階段W
Emergency|Khẩn cấp|緊急
Approved rescue template|Mẫu cứu hộ đã duyệt|承認済み救助テンプレート
60 seconds after approval|60 giây sau phê duyệt|承認後60秒
Vietnamese → English → Japanese|Tiếng Việt → Tiếng Anh → Tiếng Nhật|ベトナム語→英語→日本語
2 cycles|2 chu kỳ|2サイクル
7 playing · 1 unknown|7 đang phát · 1 chưa rõ|7台再生中・1台不明
Not available|Không khả dụng|利用不可
Inspect unavailable speaker|Kiểm tra loa không khả dụng|利用不可のスピーカーを点検
Connected|Đã kết nối|接続済み
Fault detected|Phát hiện lỗi|故障検出
Yesterday|Hôm qua|昨日
Patrol announcement|Thông báo tuần tra|巡回放送
Permission required|Cần cấp quyền|許可が必要
120 seconds|120 giây|120秒
Policy-controlled|Theo chính sách|方針により制御
DR-01 speaker payload|Thiết bị loa trên DR-01|DR-01搭載スピーカー
Requires payload feedback|Cần phản hồi từ thiết bị mang theo|搭載機器のフィードバックが必要
Reviewed recording|Bản ghi âm đã rà soát|確認済み録音
TTS reviewed|TTS đã rà soát|音声合成を確認済み
Site names verified|Địa danh đã xác minh|施設名を確認済み
Local certified emergency controller|Bộ điều khiển khẩn cấp tại chỗ có chứng nhận|認定済み現地緊急制御盤
Approved priority tier|Cấp ưu tiên đã duyệt|承認済み優先順位
Preemptible|Có thể bị ngắt bởi ưu tiên cao hơn|上位優先による割込み可能
Explicit decision|Quyết định rõ ràng|明示的な判断
Doors · stairs · refuges · exits|Cửa · cầu thang · nơi lánh nạn · lối thoát|扉・階段・待避場所・出口
Direction + width + accessibility|Hướng + chiều rộng + khả năng tiếp cận|方向＋幅＋アクセシビリティ
Excluded unless approved evacuation use|Loại trừ trừ khi được duyệt dùng để sơ tán|避難使用承認がない限り除外
No turn-by-turn route|Không có hướng dẫn từng bước|詳細経路案内なし
No stair-only route|Không dùng tuyến chỉ có cầu thang|階段のみの経路は使用しない
Guidance degraded|Hướng dẫn suy giảm|案内機能低下
Site safety specialist|Chuyên gia an toàn cơ sở|施設安全専門家
East corridor smoke report|Báo cáo khói tại hành lang Đông|東廊下の煙の報告
Operator verified|Người vận hành đã xác minh|運用担当が確認済み
Recheck in 2 minutes|Kiểm tra lại sau 2 phút|2分後に再確認
3 invalidated|3 mục bị vô hiệu|3件無効化
312 updated · 28 unknown|312 đã cập nhật · 28 chưa rõ|312件更新済み・28件不明
Version 18 accepted|Đã tiếp nhận phiên bản 18|第18版を受理済み
Fallback action required|Cần phương án thay thế|代替対応が必要
Wheelchair user|Người dùng xe lăn|車椅子利用者
Assistance required|Cần trợ giúp|支援が必要
Text preferred|Ưu tiên văn bản|文字を優先
Self-reported|Tự báo|本人申告
Assigned rescue team|Đội cứu hộ được phân công|担当救助チーム
Authorized medical role only|Chỉ vai trò y tế được cấp quyền|許可済み医療担当のみ
Not shared|Không chia sẻ|非共有
Version 3|Phiên bản 3|第3版
Verified caregiver · assistance profile only|Người chăm sóc đã xác minh · chỉ hồ sơ hỗ trợ|確認済み介護者・支援プロフィールのみ
Emergency contact · no profile access|Liên hệ khẩn cấp · không truy cập hồ sơ|緊急連絡先・プロフィール閲覧不可
Verified authorization record|Bản ghi cấp quyền đã xác minh|確認済み権限記録
Assistance profile|Hồ sơ hỗ trợ|支援プロフィール
Assisted evacuation|Sơ tán có hỗ trợ|支援付き避難
Wheelchair|Xe lăn|車椅子
Restricted medical record|Hồ sơ y tế hạn chế truy cập|閲覧制限付き医療記録
Updated mobility assistance need|Đã cập nhật nhu cầu hỗ trợ di chuyển|移動支援ニーズを更新済み
Authorized caregiver|Người chăm sóc được cấp quyền|許可済み介護者
Subject review pending|Chờ chủ thể rà soát|本人確認待ち
Support needs changed|Nhu cầu hỗ trợ đã thay đổi|支援ニーズが変更
Mobility assistance · profile reviewed|Hỗ trợ di chuyển · hồ sơ đã rà soát|移動支援・プロフィール確認済み
No assistance data|Không có dữ liệu hỗ trợ|支援情報なし
Communication assistance · review overdue|Hỗ trợ giao tiếp · quá hạn rà soát|意思疎通支援・確認期限超過
Functional needs only|Chỉ nhu cầu chức năng|機能上のニーズのみ
Exposed zone · mobility support · no SOS|Vùng phơi nhiễm · cần hỗ trợ di chuyển · chưa SOS|危険区域・移動支援・SOSなし
Possible exposure · stale position|Có thể phơi nhiễm · vị trí cũ|影響の可能性・古い位置
Presence unknown · check-in needed|Chưa rõ hiện diện · cần báo tình trạng|在場不明・状況報告が必要
Version 3 · explainable|Phiên bản 3 · có thể giải thích|第3版・説明可能
Inside impacted zone · QR 2 min ago|Trong vùng ảnh hưởng · QR 2 phút trước|影響区域内・QR確認2分前
None received|Chưa nhận được|未受信
Approved assistance policy|Chính sách hỗ trợ đã duyệt|承認済み支援方針
P1 · operator review|P1 · người vận hành rà soát|P1・運用担当が確認
QR + access control|QR + kiểm soát ra vào|QR＋入退室管理
Never automatic|Không bao giờ tự động|自動実行しない
Encrypted · restricted|Đã mã hóa · hạn chế|暗号化済み・制限付き
Self-reported · not clinically verified|Tự báo · chưa được xác minh lâm sàng|本人申告・臨床的確認なし
Assigned emergency task|Nhiệm vụ khẩn cấp được phân công|割当済み緊急任務
Minimum necessary|Tối thiểu cần thiết|必要最小限
Confirmed by responder|Người cứu hộ đã xác nhận|対応者が確認済み
Assisted evacuation task|Nhiệm vụ sơ tán có hỗ trợ|支援付き避難任務
Outdoor coverage|Phủ ngoài trời|屋外カバレッジ
Floor 05 degraded|Tầng 05 suy giảm|5階で機能低下
Calibrated zones only|Chỉ vùng đã hiệu chuẩn|校正済み区域のみ
QR anchors|Mốc QR|QR基準点
Approved revision 12|Phiên bản 12 đã duyệt|承認済み第12版
QR anchor|Mốc QR|QR基準点
Confirmed by user scan|Xác nhận qua người dùng quét|利用者のスキャンで確認
2 minutes ago|2 phút trước|2分前
BLE floor estimate rejected|Đã loại ước tính tầng từ BLE|BLEの階推定を却下
Building A local|Hệ tọa độ cục bộ tòa A|A棟ローカル座標
4 surveyed anchors|4 mốc đã khảo sát|測量済み基準点4か所
Requires field measurement|Cần đo thực địa|現地測定が必要
Safety review required|Cần rà soát an toàn|安全確認が必要
West stairs · reviewed graph|Cầu thang Tây · đồ thị đã rà soát|西階段・確認済みグラフ
North refuge + assisted transfer|Nơi lánh nạn Bắc + di chuyển có hỗ trợ|北待避場所＋支援付き移動
East corridor · hazard|Hành lang Đông · nguy hiểm|東廊下・危険
Exposure constraints before travel time|Ràng buộc phơi nhiễm ưu tiên hơn thời gian đi|移動時間より危険曝露の制約を優先
West route · longer · feasible|Tuyến Tây · dài hơn · khả thi|西経路・長い・実行可能
East route · shorter · blocked|Tuyến Đông · ngắn hơn · bị chặn|東経路・短い・通行不可
Refuge assistance · mobility profile|Hỗ trợ tại nơi lánh nạn · hồ sơ di chuyển|待避支援・移動プロフィール
Congestion estimate|Ước tính ùn tắc|混雑推定
Required for zone strategy|Bắt buộc với chiến lược vùng|区域方針に必要
Fire evidence and one proactive assistance need|Bằng chứng cháy và một nhu cầu hỗ trợ chủ động|火災証拠と先行支援ニーズ1件
Recommendation only|Chỉ đề xuất|提案のみ
West route remains feasible|Tuyến Tây vẫn khả thi|西経路は引き続き実行可能
Route engine result R-18|Kết quả bộ định tuyến R-18|経路エンジン結果R-18
Current corridor congestion|Mức ùn tắc hành lang hiện tại|現在の廊下混雑
No unsupported exit nodes|Không tạo nút thoát thiếu bằng chứng|根拠のない出口ノード禁止
Draft guidance only|Chỉ soạn hướng dẫn nháp|案内の下書きのみ
Region-approved deployment|Triển khai được vùng phê duyệt|リージョン承認済み配備
Release gate|Cổng phát hành|リリースゲート
Adversarial fixtures|Bộ tình huống đối kháng|敵対的テストケース
Minimized|Đã tối thiểu hóa|最小化済み
Not available to model|Mô hình không được truy cập|モデルは利用不可
Approved candidate|Ứng viên đã duyệt|承認済み候補
Regional policy|Chính sách vùng|リージョン方針
Deterministic workflows remain active|Quy trình xác định vẫn hoạt động|決定的ワークフローを継続
Scenario simulation|Mô phỏng kịch bản|シナリオシミュレーション
Estimated cohort|Nhóm ước tính|推定対象群
4 people|4 người|4人
Assumptions require site validation|Giả định cần cơ sở kiểm chứng|仮定は施設での検証が必要
`.trim().split('\n').map(x=>x.split('|'));
const localTimes=['10:42:08','18:00','11:30','10:46','2026-11-02 09:00','10:40','12:00','14:00–14:30','10:44:08'].map(t=>[t+' local',t+' giờ địa phương',t+' 現地時間']);
window.SA_LOCALE_V2=Object.fromEntries([...rows,...extra,...admin,...care,...localTimes].map(([en,vi,ja])=>[en,{en,vi,ja}]));
})();
