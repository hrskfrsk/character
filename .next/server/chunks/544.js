"use strict";exports.id=544,exports.ids=[544],exports.modules={1544:(a,t,e)=>{function l(a,t,e){let l=a.character_name||"キャラクター",o=e||{skillOutput:"all",rollCommand:"CCB",memoOptions:{blank:!1,name:!0,kana:!0,job:!0,sex:!0,age:!0,height:!0,skills:!1,items:!1,features:!1,jobSpecial:!1}},n=a=>({dodge:"回避",grapple:"組み付き",throw:"投擲",handgun:"拳銃",submachine_gun:"サブマシンガン",shotgun:"ショットガン",machine_gun:"マシンガン",rifle:"ライフル",martial_arts:"マーシャルアーツ",kick:"キック",punch:"こぶし",headbutt:"頭突き",first_aid:"応急手当",locksmith:"鍵開け",hide:"隠す",sneak:"隠れる",listen:"聞き耳",photography:"写真術",psychoanalysis:"精神分析",track:"追跡",climb:"登攀",library_use:"図書館",spot_hidden:"目星",drive:"運転",mechanical_repair:"機械修理",heavy_machinery:"重機械操作",ride:"乗馬",swim:"水泳",craft:"制作",pilot:"操縦",jump:"跳躍",electrical_repair:"電気修理",navigate:"ナビゲート",disguise:"変装",fast_talk:"言いくるめ",credit_rating:"信用",persuade:"説得",bargain:"値切り",mother_tongue:"母国語",medicine:"医学",occult:"オカルト",chemistry:"化学",cthulhu_mythos:"クトゥルフ神話",art:"芸術",accounting:"経理",archaeology:"考古学",computer_use:"コンピューター",psychology:"心理学",anthropology:"人類学",biology:"生物学",geology:"地質学",electronics:"電子工学",astronomy:"天文学",natural_history:"博物学",physics:"物理学",law:"法律",pharmacy:"薬学",history:"歴史"})[a]||a,i=(()=>{if(o.memoOptions.blank)return"";let t=[],e=[];o.memoOptions.name&&o.memoOptions.kana?e.push(`${a.character_name||"キャラクター"}(${a.character_name_kana||""})`):o.memoOptions.name?e.push(a.character_name||"キャラクター"):o.memoOptions.kana&&e.push(a.character_name_kana||a.character_name||"キャラクター"),e.length>0&&t.push(e.join(""));let l=[];if(o.memoOptions.job&&l.push(a.job||"職業"),o.memoOptions.sex){let t=a.gender_custom||a.sex||a.gender||"性別";l.push(t)}if(o.memoOptions.age&&l.push(a.age||"年齢"),o.memoOptions.height&&l.push(a.height||"身長"),l.length>0&&t.push(l.join(" | ")),t.push(`(PL:${a.player_name||"プレイヤー"})`),o.memoOptions.skills){let e=[];Object.entries({dodge:30,grapple:25,throw:25,handgun:20,submachine_gun:15,shotgun:30,machine_gun:15,rifle:25,martial_arts:1,kick:25,punch:50,headbutt:10,first_aid:30,locksmith:1,hide:15,sneak:10,listen:25,photography:10,psychoanalysis:1,track:10,climb:40,library_use:25,spot_hidden:25,drive:20,mechanical_repair:20,heavy_machinery:1,ride:5,swim:25,craft:5,pilot:1,jump:25,electrical_repair:10,navigate:10,disguise:1,fast_talk:5,credit_rating:15,persuade:15,bargain:5,mother_tongue:0,medicine:5,occult:5,chemistry:1,cthulhu_mythos:0,art:5,accounting:10,archaeology:1,computer_use:1,psychology:5,anthropology:1,biology:1,geology:1,electronics:1,astronomy:1,natural_history:10,physics:1,law:5,pharmacy:1,history:20}).forEach(([t,l])=>{let o=a[`${t}_total`]||0;if(o>l){let a=n(t);e.push(`${a}:${o}%`)}}),["combat","exploration","action","negotiation","knowledge"].forEach(t=>{for(let l=1;l<=50;l++){let o=a[`additional_${t}_${l}_name`];if(o){let n=(parseInt(a[`additional_${t}_${l}_initial`])||1)+(parseInt(a[`additional_${t}_${l}_job`])||0)+(parseInt(a[`additional_${t}_${l}_interest`])||0)+(parseInt(a[`additional_${t}_${l}_growth`])||0)+(parseInt(a[`additional_${t}_${l}_other`])||0);n>1&&e.push(`${o}:${n}%`)}}}),e.length>0&&t.push("\n【所持技能】\n"+e.join(" | "))}if(o.memoOptions.items){let e=[];for(let t=1;t<=50;t++){let l=a[`item_${t}_name`],o=a[`item_${t}_count`]||1;l&&e.push(`${l}\xd7${o}`)}e.length>0&&t.push("\n【所持品】\n"+e.join(", "))}if(o.memoOptions.features){let e=[];for(let t=1;t<=10;t++){let l=a[`trait_${t}_name`],o=a[`trait_${t}_description`],n=a[`trait_${t}_number`];if(l&&""!==l.trim()){let a="";a=n?`<${n}:${l}>`:`<${l}>`,o&&""!==o.trim()&&(a+=`
${o}`),e.push(a)}}e.length>0&&t.push("\n【特徴表】\n"+e.join("\n"))}if(o.memoOptions.jobSpecial){let e=a.job_special_notes||a.job_notes||a.job_special||a.occupation_notes||a.special_notes||a.job_memo||a.occupation_special;e&&t.push("\n【職業特記】\n"+e)}return t.join("\n")})(),r=`${window.location.origin}/character/${t}`,_=a.character_color_code||a.ui_theme_color||"#22c6d8",s={dodge:30,grapple:25,throw:25,handgun:20,submachine_gun:15,shotgun:30,machine_gun:15,rifle:25,martial_arts:1,kick:25,punch:50,headbutt:10,first_aid:30,locksmith:1,hide:15,sneak:10,listen:25,photography:10,psychoanalysis:1,track:10,climb:40,library_use:25,spot_hidden:25,drive:20,mechanical_repair:20,heavy_machinery:1,ride:5,swim:25,craft:5,pilot:1,jump:25,electrical_repair:10,navigate:10,disguise:1,fast_talk:5,credit_rating:15,persuade:15,bargain:5,mother_tongue:0,medicine:5,occult:5,chemistry:1,cthulhu_mythos:0,art:5,accounting:10,archaeology:1,computer_use:1,psychology:5,anthropology:1,biology:1,geology:1,electronics:1,astronomy:1,natural_history:10,physics:1,law:5,pharmacy:1,history:20},u=(a,t)=>t>(s[a]||1),m=parseInt(a.dex_total||a.dex||"10"),c=[{label:"HP",value:parseInt(a.hp_total||"0"),max:parseInt(a.hp_total||"0")},{label:"MP",value:parseInt(a.mp_total||"0"),max:parseInt(a.mp_total||"0")},{label:"SAN",value:parseInt(a.current_san||a.max_san_value||"0"),max:parseInt(a.max_san_value||"0")}],p=[{label:"STR",value:String(a.str_total||a.str||"10")},{label:"CON",value:String(a.con_total||a.con||"10")},{label:"POW",value:String(a.pow_total||a.pow||"10")},{label:"DEX",value:String(a.dex_total||a.dex||"10")},{label:"APP",value:String(a.app_total||a.app||"10")},{label:"SIZ",value:String(a.siz_total||a.siz||"10")},{label:"INT",value:String(a.int_total||a.int||"10")},{label:"EDU",value:String(a.edu_total||a.edu||"10")},{label:"DB",value:String(a.damage_bonus||"0")}];return{kind:"character",data:{name:l,memo:i,externalUrl:r,color:_,commands:(()=>{let t=o.rollCommand,e=`${t}<=
${t}<={SAN} SANチェック
${t}<=${a.idea_total||0} アイデア
${t}<=${a.luck_total||0} 幸運
${t}<=${a.knowledge_total||0} 知識

▼戦闘技能-------------------------------------`;[{name:"dodge",value:a.dodge_total||0,label:"回避"},{name:"grapple",value:a.grapple_total||0,label:"組み付き"},{name:"throw",value:a.throw_total||0,label:"投擲"},{name:"handgun",value:a.handgun_total||0,label:"拳銃"},{name:"submachine_gun",value:a.submachine_gun_total||0,label:"サブマシンガン"},{name:"shotgun",value:a.shotgun_total||0,label:"ショットガン"},{name:"machine_gun",value:a.machine_gun_total||0,label:"マシンガン"},{name:"rifle",value:a.rifle_total||0,label:"ライフル"},{name:"martial_arts",value:a.martial_arts_total||0,label:"マーシャルアーツ"},{name:"kick",value:a.kick_total||0,label:"キック"},{name:"punch",value:a.punch_total||0,label:"こぶし"},{name:"headbutt",value:a.headbutt_total||0,label:"頭突き"}].forEach(a=>{("all"===o.skillOutput||u(a.name,a.value))&&(e+=`
${t}<=${a.value} ${a.label}`)}),("all"===o.skillOutput||u("kick",a.kick_total||0)||u("martial_arts",a.martial_arts_total||0))&&(e+=`
CBRB(${a.kick_total||0},${a.martial_arts_total||0}) キック+MA`),("all"===o.skillOutput||u("punch",a.punch_total||0)||u("martial_arts",a.martial_arts_total||0))&&(e+=`
CBRB(${a.punch_total||0},${a.martial_arts_total||0}) こぶし+MA`),("all"===o.skillOutput||u("headbutt",a.headbutt_total||0)||u("martial_arts",a.martial_arts_total||0))&&(e+=`
CBRB(${a.headbutt_total||0},${a.martial_arts_total||0}) 頭突き+MA`);for(let l=1;l<=50;l++){let n=a[`additional_combat_${l}_name`];if(n){let i=(parseInt(a[`additional_combat_${l}_initial`])||1)+(parseInt(a[`additional_combat_${l}_job`])||0)+(parseInt(a[`additional_combat_${l}_interest`])||0)+(parseInt(a[`additional_combat_${l}_growth`])||0)+(parseInt(a[`additional_combat_${l}_other`])||0);("all"===o.skillOutput||i>1)&&(e+=`
${t}<=${i} ${n}`)}}e+=`

▼探索技能-------------------------------------`,[{name:"first_aid",value:a.first_aid_total||0,label:"応急手当"},{name:"locksmith",value:a.locksmith_total||0,label:"鍵開け"},{name:"hide",value:a.hide_total||0,label:"隠す"},{name:"sneak",value:a.sneak_total||0,label:"隠れる"},{name:"listen",value:a.listen_total||0,label:"聞き耳"},{name:"photography",value:a.photography_total||0,label:"写真術"},{name:"psychoanalysis",value:a.psychoanalysis_total||0,label:"精神分析"},{name:"track",value:a.track_total||0,label:"追跡"},{name:"climb",value:a.climb_total||0,label:"登攀"},{name:"library_use",value:a.library_use_total||0,label:"図書館"},{name:"spot_hidden",value:a.spot_hidden_total||0,label:"目星"}].forEach(a=>{("all"===o.skillOutput||u(a.name,a.value))&&(e+=`
${t}<=${a.value} ${a.label}`)});for(let l=1;l<=50;l++){let n=a[`additional_exploration_${l}_name`];if(n){let i=(parseInt(a[`additional_exploration_${l}_initial`])||1)+(parseInt(a[`additional_exploration_${l}_job`])||0)+(parseInt(a[`additional_exploration_${l}_interest`])||0)+(parseInt(a[`additional_exploration_${l}_growth`])||0)+(parseInt(a[`additional_exploration_${l}_other`])||0);("all"===o.skillOutput||i>1)&&(e+=`
${t}<=${i} ${n}`)}}e+=`

▼行動技能-------------------------------------`,[{name:"drive",value:a.drive_total||0,label:"運転"},{name:"mechanical_repair",value:a.mechanical_repair_total||0,label:"機械修理"},{name:"heavy_machinery",value:a.heavy_machinery_total||0,label:"重機械操作"},{name:"ride",value:a.ride_total||0,label:"乗馬"},{name:"swim",value:a.swim_total||0,label:"水泳"},{name:"craft",value:a.craft_total||0,label:"制作"},{name:"pilot",value:a.pilot_total||0,label:"操縦"},{name:"jump",value:a.jump_total||0,label:"跳躍"},{name:"electrical_repair",value:a.electrical_repair_total||0,label:"電気修理"},{name:"navigate",value:a.navigate_total||0,label:"ナビゲート"},{name:"disguise",value:a.disguise_total||0,label:"変装"}].forEach(a=>{("all"===o.skillOutput||u(a.name,a.value))&&(e+=`
${t}<=${a.value} ${a.label}`)});for(let l=1;l<=50;l++){let n=a[`additional_action_${l}_name`];if(n){let i=(parseInt(a[`additional_action_${l}_initial`])||1)+(parseInt(a[`additional_action_${l}_job`])||0)+(parseInt(a[`additional_action_${l}_interest`])||0)+(parseInt(a[`additional_action_${l}_growth`])||0)+(parseInt(a[`additional_action_${l}_other`])||0);("all"===o.skillOutput||i>1)&&(e+=`
${t}<=${i} ${n}`)}}e+=`

▼交渉技能-------------------------------------`,[{name:"fast_talk",value:a.fast_talk_total||0,label:"言いくるめ"},{name:"credit_rating",value:a.credit_rating_total||0,label:"信用"},{name:"persuade",value:a.persuade_total||0,label:"説得"},{name:"bargain",value:a.bargain_total||0,label:"値切り"},{name:"mother_tongue",value:a.mother_tongue_total||0,label:"母国語"}].forEach(a=>{("all"===o.skillOutput||u(a.name,a.value))&&(e+=`
${t}<=${a.value} ${a.label}`)});for(let l=1;l<=50;l++){let n=a[`additional_negotiation_${l}_name`];if(n){let i=(parseInt(a[`additional_negotiation_${l}_initial`])||1)+(parseInt(a[`additional_negotiation_${l}_job`])||0)+(parseInt(a[`additional_negotiation_${l}_interest`])||0)+(parseInt(a[`additional_negotiation_${l}_growth`])||0)+(parseInt(a[`additional_negotiation_${l}_other`])||0);("all"===o.skillOutput||i>1)&&(e+=`
${t}<=${i} ${n}`)}}e+=`

▼知識技能-------------------------------------`,[{name:"medicine",value:a.medicine_total||0,label:"医学"},{name:"occult",value:a.occult_total||0,label:"オカルト"},{name:"chemistry",value:a.chemistry_total||0,label:"化学"},{name:"cthulhu_mythos",value:a.cthulhu_mythos_total||0,label:"クトゥルフ神話"},{name:"art",value:a.art_total||0,label:"芸術"},{name:"accounting",value:a.accounting_total||0,label:"経理"},{name:"archaeology",value:a.archaeology_total||0,label:"考古学"},{name:"computer_use",value:a.computer_use_total||0,label:"コンピューター"},{name:"psychology",value:a.psychology_total||0,label:"心理学"},{name:"anthropology",value:a.anthropology_total||0,label:"人類学"},{name:"biology",value:a.biology_total||0,label:"生物学"},{name:"geology",value:a.geology_total||0,label:"地質学"},{name:"electronics",value:a.electronics_total||0,label:"電子工学"},{name:"astronomy",value:a.astronomy_total||0,label:"天文学"},{name:"natural_history",value:a.natural_history_total||0,label:"博物学"},{name:"physics",value:a.physics_total||0,label:"物理学"},{name:"law",value:a.law_total||0,label:"法律"},{name:"pharmacy",value:a.pharmacy_total||0,label:"薬学"},{name:"history",value:a.history_total||0,label:"歴史"}].forEach(a=>{("all"===o.skillOutput||u(a.name,a.value))&&(e+=`
${t}<=${a.value} ${a.label}`)});for(let l=1;l<=50;l++){let n=a[`additional_knowledge_${l}_name`];if(n){let i=(parseInt(a[`additional_knowledge_${l}_initial`])||1)+(parseInt(a[`additional_knowledge_${l}_job`])||0)+(parseInt(a[`additional_knowledge_${l}_interest`])||0)+(parseInt(a[`additional_knowledge_${l}_growth`])||0)+(parseInt(a[`additional_knowledge_${l}_other`])||0);("all"===o.skillOutput||i>1)&&(e+=`
${t}<=${i} ${n}`)}}e+=`
▼\xd75-------------------------------------
${t}<=({STR}*5) STR*5
${t}<=({CON}*5) CON*5
${t}<=({POW}*5) POW*5
${t}<=({DEX}*5) DEX*5
${t}<=({APP}*5) APP*5
${t}<=({SIZ}*5) SIZ*5
${t}<=({INT}*5) INT*5
${t}<=({EDU}*5) EDU*5
▼\xd74-------------------------------------
${t}<=({STR}*4) STR*4
${t}<=({CON}*4) CON*4
${t}<=({POW}*4) POW*4
${t}<=({DEX}*4) DEX*4
${t}<=({APP}*4) APP*4
${t}<=({SIZ}*4) SIZ*4
${t}<=({INT}*4) INT*4
${t}<=({EDU}*4) EDU*4
▼\xd73-------------------------------------
${t}<=({STR}*3) STR*3
${t}<=({CON}*3) CON*3
${t}<=({POW}*3) POW*3
${t}<=({DEX}*3) DEX*3
${t}<=({APP}*3) APP*3
${t}<=({SIZ}*3) SIZ*3
${t}<=({INT}*3) INT*3
${t}<=({EDU}*3) EDU*3
▼\xd72-------------------------------------
${t}<=({STR}*2) STR*2
${t}<=({CON}*2) CON*2
${t}<=({POW}*2) POW*2
${t}<=({DEX}*2) DEX*2
${t}<=({APP}*2) APP*2
${t}<=({SIZ}*2) SIZ*2
${t}<=({INT}*2) INT*2
${t}<=({EDU}*2) EDU*2

▼対抗-------------------------------------
RESB({STR}-対抗値) STR対抗
RESB({CON}-対抗値) CON対抗
RESB({POW}-対抗値) POW対抗
RESB({DEX}-対抗値) DEX対抗
RESB({APP}-対抗値) APP対抗
RESB({SIZ}-対抗値) SIZ対抗
RESB({INT}-対抗値) INT対抗
RESB({EDU}-対抗値) EDU対抗

▼ダメ―ジ-------------------------------------
1D3{DB} こぶしダメージ
2D3{DB} こぶし+MAダメージ
1D6{DB} キックダメージ
2D6{DB} キック+MAダメージ
1D4{DB} 頭突きダメージ
2D4{DB} 頭突き+MAダメージ
1Dn{DB}/2 投擲ダメージ`;for(let t=1;t<=50;t++){let l=a[`weapon_${t}_name`],o=a[`weapon_${t}_damage`];l&&o&&(e+=`
${o} ${l} ダメ―ジ`)}return e+=`

▼回復-------------------------------------
1D3応急手当回復
1D3 SAN回復

▼コマンド-------------------------------------
:SAN+
:SAN-
:HP+
:HP-
:MP+
:MP-`})(),initiative:m,status:c,params:p}}}function o(a,t){let e=l(a,t),o=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(o),n.download=`${e.data.name}_ccfolia.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(n.href)}function n(a,t){let e=JSON.stringify(l(a,t));navigator.clipboard.writeText(e).then(()=>{alert("ココフォリア用のコマデータをクリップボードにコピーしました！\nココフォリアの「コマ」→「JSONインポート」で貼り付けてください。")},()=>{let a=document.createElement("textarea");a.value=e,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),alert("ココフォリア用のコマデータをクリップボードにコピーしました！\nココフォリアの「コマ」→「JSONインポート」で貼り付けてください。")})}e.r(t),e.d(t,{copyToCcfoliaClipboard:()=>n,exportToCcfolia:()=>o,generateCcfoliaCharacterData:()=>l})}};