(function(){
  'use strict';
  const patterns={};
  const assign=(kind,ids)=>ids.split(' ').forEach(id=>patterns[id]=kind);
  assign('access','A01 A02 A03 A05 A06 A09 A10');
  assign('permissions','A04 A07 A08 T03 T04 T09 T10 G07 G08 I07 I09 D08');
  assign('site','S01 S02 S03 S04 S06 S07 S09 S15 S16 Q01 Q02 Q03 Q04 Q05 Q10 F05');
  assign('plant','F01 F07 F08 F14 F18 F19');
  assign('mapping','F04 F06 I03 S11 S12 T07');
  assign('evidence','F02 F03 F17 S05 S13 I10 I15 T08 T11 G04 G09 G10 G11 G12 D06 D07');
  assign('command','F09 F10 F11 F12 F13 I12 I13 I14');
  assign('commission','F15 F16 F20 S08 S10 G03 G05 G06 T13');
  assign('connection','I01 I02 I04 I05 I06 I08 I11 T12');
  assign('api','D01 D02 D03 D04 D05');
  assign('language','L01 L02 L03 L04 L05 L06 T06');
  assign('analytics','T01 T05 T14 T15 T16 T17');
  assign('intelligence','Q06 Q07 Q08 Q09 S14');
  assign('region','G01 G02 T02');
  assign('exception','X01 X02 X03 X04 X05 X06 X07 X08 X09 X10');
  function render(s,c){
    const kind=patterns[s.id]; if(!kind)return '';
    const {L,e,loc,scene,fields,action}=c;
    const tx=(a,b,j)=>L(a,b,j);
    const head=(a,b,j)=>`<h3>${tx(a,b,j)}</h3>`;
    const note=(a,b,j)=>`<p class="ent-note">${tx(a,b,j)}</p>`;
    const data=()=>`<section class="ent-record">${head('Bản ghi nguồn','Source record','ソース記録')}${fields(s)}</section>`;
    const visual=(type,cls='')=>`<div class="ent-visual ${cls}">${scene(type,{screen:s.id})}</div>`;
    const details=()=>`<details class="ent-details"><summary>${tx('Xem toàn bộ dữ liệu nguồn','Inspect full source record','ソース記録をすべて表示')}</summary>${fields(s)}</details>`;
    const go=(id,label)=>`<button type="button" class="ent-link" data-go="${id}">${label}</button>`;
    const sample=()=>note('Bản mẫu tương tác · dữ liệu minh họa','Interactive prototype · illustrative data','操作可能なプロトタイプ・サンプルデータ');
    const rows=(fs=s.fields)=>fs.map(([k,v],i)=>`<tr><th scope="row">${e(loc(k))}</th><td>${e(loc(v))}</td><td class="ent-index">${String(i+1).padStart(2,'0')}</td></tr>`).join('');
    const table=()=>`<div class="ent-table-wrap"><table class="ent-table"><thead><tr><th>${tx('Thuộc tính','Attribute','項目')}</th><th>${tx('Giá trị nguồn','Source value','ソース値')}</th><th>#</th></tr></thead><tbody>${rows()}</tbody></table></div>`;
    const stepper=(steps)=>`<ol class="ent-steps">${steps.map((x,i)=>`<li><span>${i+1}</span><strong>${x}</strong></li>`).join('')}</ol>`;
    const safety=()=>`<aside class="ent-authority"><strong>${tx('Quyền điều khiển tại chỗ','Local control has priority','現地制御を優先')}</strong>${note('Chỉ xem bằng chứng. Không gửi lệnh đến thiết bị.','Review evidence only. No command is sent to equipment.','証拠の確認のみ。機器へコマンドは送信されません。')}</aside>`;
    const field=(i)=>s.fields[i]||['',''];
    const detailRow=(i)=>`<div class="ent-fact"><span>${e(loc(field(i)[0]))}</span><strong>${e(loc(field(i)[1]))}</strong></div>`;
    let body='';
    if(kind==='access'){
      body=`<div class="ent-auth"><div class="ent-auth-art">${visual(s.id==='A01'?'campus':'identity')}${head('Kết nối đúng nơi, đúng quyền','The right place. The right access.','適切な場所とアクセス権')}${note('Chọn ngữ cảnh trước khi tiếp tục vào không gian làm việc.','Confirm your context before entering the workspace.','ワークスペースに入る前に利用条件を確認してください。')}</div><div class="ent-auth-form">${data()}${s.id==='A02'?`<label class="ent-input">${tx('Email mẫu','Example email','サンプルメール')}<input type="email" value="alex@example.test" autocomplete="off"></label>`:''}${s.id==='A03'?`<label class="ent-input">${tx('Mã minh họa','Example code','サンプルコード')}<input inputmode="numeric" maxlength="6" value="123456" autocomplete="off"></label>`:''}${action(s)}${sample()}</div></div>`;
    }else if(kind==='permissions'){
      body=`<div class="ent-permissions"><div>${head('Phạm vi được xem xét','Scope under review','確認する権限範囲')}${table()}${note('Các giá trị bên dưới mô tả hồ sơ; thay đổi trong bản mẫu không cấp quyền thực.','These values describe the record; prototype changes do not grant real access.','記録内容を表示しています。プロトタイプの変更は実際の権限を付与しません。')}</div><aside class="ent-side">${visual('identity')}${head('Xem trước phạm vi','Preview scope','範囲をプレビュー')}<label class="ent-check"><input type="checkbox">${tx('Đánh dấu để rà soát','Mark for review','確認対象にする')}</label>${action(s)}</aside></div>`;
    }else if(kind==='site'){
      const isRoute=/S15|S16|Q04|Q05|Q10/.test(s.id);
      body=`<div class="ent-workbench"><div class="ent-maphead"><span>${tx('Harbor · Tòa A · Tầng 05','Harbor · Building A · Floor 05','Harbor・A棟・5階')}</span><span class="ent-chip">${tx('Sơ đồ minh họa','Illustrative plan','参考平面図')}</span></div><div class="ent-workbody"><div>${visual(isRoute?'evacuation':s.id==='S01'?'campus':'floor')}<div class="ent-legend"><span class="ent-dot green">${tx('Lối thoát','Exit','出口')}</span><span class="ent-dot red">${tx('Khu vực hạn chế','Restricted zone','制限区域')}</span><span class="ent-dot blue">${tx('Điểm tham chiếu','Reference point','基準点')}</span></div></div><aside>${head('Lớp thông tin','Information layers','情報レイヤー')}<details open><summary>${tx('Ngữ cảnh vị trí','Location context','位置情報')}</summary>${detailRow(0)}${detailRow(1)}</details><details><summary>${tx('Ràng buộc & chất lượng','Constraints & quality','制約と品質')}</summary>${s.fields.slice(2).map((_,i)=>detailRow(i+2)).join('')}</details>${action(s)}</aside></div>${details()}</div>`;
    }else if(kind==='plant'){
      body=`${safety()}<div class="ent-instrument">${visual(s.id==='F19'?'rescue':'firewater')}<div class="ent-instrument-label">${tx('Tín hiệu phản hồi không chứng minh hiệu quả vật lý','Feedback signals do not prove physical effect','フィードバック信号は物理的効果の証明ではありません')}</div></div><div class="ent-observations">${s.fields.map((_,i)=>detailRow(i)).join('')}</div><div class="ent-footer">${action(s)}</div>`;
    }else if(kind==='mapping'){
      body=`<div class="ent-mapping"><div class="ent-map-source"><span>${tx('Nguồn','Source','ソース')}</span><strong>${e(loc(field(0)[1]))}</strong></div><div class="ent-map-join" aria-hidden="true">⟶</div><div class="ent-map-target"><span>${tx('Ý nghĩa / đích','Meaning / target','意味・宛先')}</span><strong>${e(loc(field(1)[1]))}</strong></div></div><div class="ent-split">${visual(s.id.startsWith('F')?'firewater':'topology')}<div>${table()}${note('Giữ nguyên trạng thái lỗi, cũ và chưa rõ; không suy diễn từ tín hiệu.','Preserve fault, stale and unknown states; do not infer from a signal.','障害・古い値・不明の状態を区別し、信号から推測しません。')}${action(s)}</div></div>`;
    }else if(kind==='evidence'){
      body=`<div class="ent-evidence"><section>${head('Chuỗi bằng chứng','Evidence trail','証拠の履歴')}<ol class="ent-timeline">${s.fields.map(([k,v],i)=>`<li><span class="ent-time-node">${i+1}</span><div><h4>${e(loc(k))}</h4><p>${e(loc(v))}</p></div></li>`).join('')}</ol></section><aside>${visual(s.id.startsWith('F')?'firewater':'topology')}${head('Kiểm tra trước quyết định','Review before a decision','判断前の確認')}${note('Phạm vi, phiên bản và bằng chứng phải khớp hồ sơ đang xem.','Scope, version and evidence must match the record under review.','対象範囲・バージョン・証拠を現在の記録と照合してください。')}${action(s)}</aside></div>`;
    }else if(kind==='command'){
      body=`${safety()}<div class="ent-command"><section class="ent-command-gate"><div class="ent-lock">${c.icon('lock',36)}</div>${head('Chỉ xem xét','Review only','確認専用')}${note('Giao diện này không thực thi thao tác vật lý.','This interface does not execute physical operations.','この画面では物理操作を実行しません。')}${detailRow(0)}${detailRow(1)}${go(s.id.startsWith('F')?'F17':'I15',tx('Mở hồ sơ bằng chứng','Open evidence record','証拠記録を開く'))}</section><div>${visual(s.id.startsWith('I')?'drone':'firewater')}${table()}</div></div>`;
    }else if(kind==='commission'){
      body=`${stepper([tx('Khóa cấu hình','Pin configuration','構成を固定'),tx('Xem điều kiện','Review prerequisites','前提条件を確認'),tx('Thu thập bằng chứng','Collect evidence','証拠を収集'),tx('Duyệt độc lập','Independent review','独立した審査')])}<div class="ent-split"><div>${data()}${action(s)}</div><div>${visual(s.id.startsWith('F')?'firewater':'topology')}<details class="ent-checklist" open><summary>${tx('Danh sách rà soát cục bộ','Local review checklist','ローカル確認リスト')}</summary>${[tx('Đúng phiên bản','Version matches','バージョンが一致'),tx('Có người chứng kiến','Witness identified','立会者を指定'),tx('Ghi nhận phần chưa rõ','Unknowns recorded','不明点を記録')].map(t=>`<label class="ent-check"><input type="checkbox">${t}</label>`).join('')}</details>${sample()}</div></div>`;
    }else if(kind==='connection'){
      body=`<div class="ent-network">${visual(s.id==='I11'?'drone':'topology')}<div class="ent-network-caption"><span>${tx('Thiết bị','Device','機器')}</span><span>${tx('Cổng kết nối','Gateway','ゲートウェイ')}</span><span>${tx('Không gian làm việc','Workspace','ワークスペース')}</span></div></div><div class="ent-split"><div>${table()}</div><div>${head('Ranh giới tích hợp','Integration boundary','統合境界')}${note('Xác minh danh tính, phạm vi và vùng dữ liệu trước khi kích hoạt.','Verify identity, scope and data region before activation.','有効化の前にID・スコープ・データリージョンを確認してください。')}${action(s)}</div></div>`;
    }else if(kind==='api'){
      body=`<div class="ent-api"><section><div class="ent-code-head"><b>POST</b> /events</div><pre><code>{\n  "specversion": "1.0",\n  "id": "event-041",\n  "source": "sandbox",\n  "type": "signal.fire.observed",\n  "data": { "zone": "A05" }\n}</code></pre>${note('Ví dụ cố định, không gửi yêu cầu mạng.','Static example; no network request is sent.','固定サンプル。ネットワークリクエストは送信されません。')}</section><section><div class="ent-code-head">${tx('Phản hồi mẫu','Example response','応答例')}</div><pre><code>{\n  "receipt": "event-041",\n  "http_status": 202,\n  "incident_confirmed": false\n}</code></pre>${note('Biên nhận không phải xác nhận sự cố.','A receipt is not incident confirmation.','受領はインシデントの確認を意味しません。')}</section></div>${table()}${action(s)}`;
    }else if(kind==='language'){
      body=`<div class="ent-language"><section><div class="ent-locale">EN <span>${tx('Nguồn','Source','原文')}</span></div><blockquote>Leave the building using the nearest safe exit. Do not use lifts.</blockquote><div class="ent-token">{site_name} &nbsp; {issued_at}</div></section><section><div class="ent-locale">${c.lang==='vi'?'VI':'JA'} <span>${tx('Bản xem trước','Preview','プレビュー')}</span></div><blockquote>${c.lang==='vi'?'Rời tòa nhà bằng lối thoát an toàn gần nhất. Không dùng thang máy.':'最寄りの安全な出口から避難してください。エレベーターは使用しないでください。'}</blockquote><div class="ent-token">{site_name} &nbsp; {issued_at}</div></section></div><details class="ent-transcript"><summary>${tx('Lời đọc & cách phát âm','Transcript & pronunciation','読み上げ原稿と発音')}</summary>${note('Đối chiếu lời đọc với bản dịch đã duyệt. Bản mẫu không phát âm thanh.','Compare the transcript with the approved translation. This prototype has no audio playback.','承認済み翻訳と原稿を照合してください。このプロトタイプには音声再生はありません。')}</details>${table()}${action(s)}`;
    }else if(kind==='analytics'){
      body=`<div class="ent-analytics"><div>${head('Phân bố minh họa','Illustrative distribution','サンプル分布')}<div class="ent-chart" role="img" aria-label="${tx('Biểu đồ cột dữ liệu minh họa','Illustrative bar chart','サンプル棒グラフ')}">${[42,68,54,88,61,75,48].map((h,i)=>`<div><i style="height:${h}%"></i><span>${i+1}</span></div>`).join('')}</div>${sample()}</div><aside>${data()}${action(s)}</aside></div>`;
    }else if(kind==='intelligence'){
      body=`<div class="ent-ai"><section class="ent-ai-claim">${head('Đề xuất cần kiểm chứng','Recommendation to verify','検証が必要な提案')}${detailRow(0)}${detailRow(1)}<div class="ent-ai-boundary">${tx('Con người quyết định','Human decision required','人による判断が必要')}</div>${note('Không cấp quyền điều khiển thiết bị cho mô hình.','The model has no equipment control authority.','モデルに機器の制御権限はありません。')}</section><div>${visual(s.id==='S14'?'analytics':'evacuation')}<details open><summary>${tx('Nguồn & phần chưa rõ','Sources & unknowns','情報源と不明点')}</summary>${s.fields.slice(2).map((_,i)=>detailRow(i+2)).join('')}</details>${action(s)}</div></div>`;
    }else if(kind==='region'){
      body=`<div class="ent-region">${visual('topology')}<div class="ent-region-pair"><section><strong>EU</strong><span>${tx('Vùng dữ liệu gốc','Home data region','ホームリージョン')}</span></section><div class="ent-region-divider">${c.icon('lock',24)}</div><section><strong>APAC</strong><span>${tx('Ranh giới cư trú dữ liệu','Data residency boundary','データ所在地境界')}</span></section></div></div><div class="ent-split">${data()}<aside>${head('Chính sách vùng','Regional policy','リージョンポリシー')}${note('Không suy ra quyền chuyển dữ liệu từ trạng thái kết nối.','Connectivity does not imply permission to transfer data.','接続状態はデータ転送の許可を意味しません。')}${action(s)}</aside></div>`;
    }else if(kind==='exception'){
      body=`<div class="ent-exception"><div class="ent-exception-symbol">${c.icon(/X04|X08/.test(s.id)?'lock':s.id==='X03'?'check':'alert',70)}<div class="ent-broken-line"></div><span>${s.id}</span></div><section>${head('Trạng thái cần chú ý','State to review','確認が必要な状態')}${detailRow(0)}${detailRow(1)}${note('Đọc phương án tiếp theo trước khi thử lại.','Review the next available step before retrying.','再試行する前に次の手順を確認してください。')}${action(s)}</section></div><div class="ent-recovery">${s.fields.slice(2).map((_,i)=>detailRow(i+2)).join('')}</div>${details()}`;
    }
    return `<div class="ent-screen ent-${kind}" data-enterprise-pattern="${kind}">${body}</div>`;
  }
  window.SAEnterprise={render,patterns};
})();
