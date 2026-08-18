import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);

const tripStats = [
  { label: "旅伴", value: "2 大 1 小（4.5 歲）" },
  { label: "住宿", value: "江南 4 晚 + 孔德 2 晚" },
  { label: "主題樂園", value: "Seoul Land + Everland" },
  { label: "這次調整", value: "Lotte World → Seoul Land" },
];

const overviewCards = [
  {
    tag: "為什麼換掉樂天世界",
    title: "Seoul Land 更適合學齡前小孩",
    body:
      "對 4.5 歲來說，Seoul Land 的設施刺激度更溫和、排隊通常更短，也比較不會有一直被身高限制卡住的落差感。",
  },
  {
    tag: "主菜要留給誰",
    title: "Everland 仍然是整趟最值得留的樂園",
    body:
      "動物區、花園、親子設施與整體園區感最完整。它是這趟旅行最有記憶點的主題樂園，不建議刪。",
  },
  {
    tag: "行程節奏",
    title: "前半段不再連兩天硬打大型樂園",
    body:
      "Day 2 COEX、Day 3 Seoul Land、Day 4 Everland，節奏會比 COEX + Lotte World + Everland 更順，也更適合親子。",
  },
  {
    tag: "雨天備案",
    title: "只有 Day 3 遇大雨才重新考慮室內替代",
    body:
      "如果 5/11 天氣明顯不好，再考慮拉長 COEX 或切成購物日；否則照這版走，整體更均衡。",
  },
];

const hotels = [
  {
    label: "5/9–5/13",
    name: "Dormy Inn SEOUL Gangnam",
    details: [
      "地址：서울특별시 강남구 봉은사로 425",
      "最近地鐵：新論峴站（Line 9），步行約 400m",
      "最適合：COEX、Seoul Land、Everland 這四天",
      "提醒：大浴場男女分開，適合爸媽輪流泡",
    ],
  },
  {
    label: "5/13–5/15",
    name: "GLAD Mapo",
    details: [
      "地址：서울특별시 마포구 마포대로 86",
      "最近地鐵：孔德站直結（AREX / 5 / 6 / 京義中央線）",
      "最適合：景福宮、仁寺洞、聖水 / 首爾林、機場返程",
      "優勢：到金浦只要 15–18 分鐘",
    ],
  },
  {
    label: "換飯店動線",
    name: "最省力做法",
    details: [
      "10:00 Dormy Inn Checkout",
      "10:30 Kakao Taxi 到 GLAD Mapo 寄放行李",
      "11:00 之後輕裝去光化門 / 景福宮",
      "好處：不用帶著行李轉線，親子體感差很多",
    ],
  },
];

const days = [
  {
    id: "day1",
    label: "D1",
    kicker: "Day 1 · 5/9（六）",
    title: "抵達首爾 + 奉恩寺 / COEX 外圍散步",
    summary:
      "抵達日只做輕量散步，先讓孩子與爸媽一起切進首爾節奏。若班機延誤，奉恩寺可直接刪掉，不影響整體旅程。",
    meta: [
      { title: "交通", value: "金浦機場 → Line 9 → 新論峴站，約 35–40 分鐘" },
      { title: "主軸", value: "先休息、早吃飯、不硬塞景點" },
      { title: "體力強度", value: "低，作為暖身日剛好" },
    ],
    timeline: [
      { time: "14:00 前後", title: "抵達金浦", text: "入境、提領行李、整理交通卡與網路。" },
      { time: "15:00–16:00", title: "前往飯店", text: "到 Dormy Inn Check-in，讓孩子先休息與喝水。" },
      { time: "16:30–18:00", title: "奉恩寺 / COEX 外圍", text: "只選一個散步點即可，目標是舒服，不是收集景點。" },
      { time: "18:30–20:00", title: "江南晚餐", text: "就近吃，吃完直接回飯店，為 Day 2 保留狀態。" },
    ],
    chips: ["不要排滿", "行李日只求穩", "江南晚餐就近解決"],
    hashtags: ["#DormyInnCheckIn", "#奉恩寺", "#COEX夜散步", "#蔘雞湯首餐"],
    restaurants: [
      {
        name: "Jiho Hanbang Samgyetang",
        price: "中價位",
        why: "蔘雞湯溫和不辣，對孩子最友善，也很適合剛抵達首爾的第一餐。",
        dishes: "蔘雞湯、糯米雞湯、海鮮煎餅",
      },
      {
        name: "Yeongdonggeujip（영동그집）",
        price: "中高價位",
        why: "想把第一晚吃得有旅行感，這家韓牛 / 烤肉的品質與份量平衡不錯。",
        dishes: "韓牛烤肉、牛排肉、小菜拼盤",
      },
    ],
    notes: [
      "如果孩子在飛機上睡不好，Day 1 晚上越早回飯店越值得。",
      "奉恩寺與 COEX 外圍只要擇一，不要兩個都硬排。",
    ],
  },
  {
    id: "day2",
    label: "D2",
    kicker: "Day 2 · 5/10（日）",
    title: "COEX 水族館 + Starfield + COEX Mall",
    summary:
      "第二天安排成室內舒適日，假日也能穩穩玩。COEX 很適合慢慢走，不需要額外塞其他重景點。",
    meta: [
      { title: "門票", value: "COEX 水族館建議先網路購票" },
      { title: "主軸", value: "海洋生物、拍照、舒服吃飯與逛街" },
      { title: "雨天適性", value: "高，整天都很穩" },
    ],
    timeline: [
      { time: "09:00", title: "早餐", text: "不要太晚出門，目標 10 點前到 COEX。" },
      { time: "10:00–12:30", title: "COEX 水族館", text: "先進水族館，避開越晚越擁擠的人潮。" },
      { time: "12:30–14:00", title: "午餐", text: "在 COEX Mall 內解決最方便，孩子也比較好補水休息。" },
      { time: "14:00–15:00", title: "Starfield 圖書館", text: "拍照、休息、喝咖啡，30–60 分鐘很夠。" },
      { time: "15:00–17:30", title: "COEX Mall 散步", text: "玩具店、品牌店、超市，這段保持彈性就好。" },
    ],
    chips: ["室內舒適日", "先買票", "下午留給慢逛"],
    hashtags: ["#COEX水族館", "#Starfield圖書館", "#COEXMall", "#韓牛冷麵"],
    restaurants: [
      {
        name: "Woo Do Ok（우도옥）",
        price: "中高價位",
        why: "韓牛搭配平壤冷麵很有代表性，適合大人想吃得更精緻一點的晚餐。",
        dishes: "韓牛套餐、平壤冷麵、烤牛肉拼盤",
      },
      {
        name: "Gombawi（곰바위）",
        price: "中高價位",
        why: "在 COEX / 奉恩寺附近算是穩定、稍微有質感的韓式烤肉選擇。",
        dishes: "牛肉、湯品、烤肉套餐",
      },
      {
        name: "COEX Food Hall",
        price: "平價到中價位",
        why: "如果孩子累或情緒不穩，直接在商場內吃最有效率，也最不容易翻車。",
        dishes: "拌飯、炸雞、飯捲、湯飯",
      },
    ],
    notes: [
      "這天不必貪多，COEX 本身就足夠撐滿一天。",
      "若買很多東西，晚餐前可先回飯店卸貨再出門。",
    ],
  },
  {
    id: "day3",
    label: "D3",
    kicker: "Day 3 · 5/11（一）",
    title: "Seoul Land + 首爾大公園",
    summary:
      "這是替換 Lotte World 之後的關鍵日。Seoul Land 的節奏更溫和，搭配首爾大公園外圍散步，對 4.5 歲很加分。",
    meta: [
      { title: "交通", value: "新論峴站 → Dongjak 轉 Line 4 → 首爾大公園站 Exit 2" },
      { title: "加分點", value: "Elephant Train 對孩子很有記憶點" },
      { title: "門票", value: "成人 KRW 52,000 / 兒童 KRW 43,000，外國旅客常有折扣" },
    ],
    timeline: [
      { time: "09:00", title: "早餐後出發", text: "抓早一點出門，避開之後的通勤人潮。" },
      { time: "10:15–10:30", title: "抵達首爾大公園站", text: "步行到 Elephant Train 搭乘處，讓孩子先有儀式感。" },
      { time: "11:00–13:00", title: "親子核心區", text: "優先玩 Kids Zone / Fantasy Land，不要先去刺激設施。" },
      { time: "13:00–14:00", title: "午餐", text: "園內簡單吃，或出園轉附近餐廳都可。" },
      { time: "14:00–16:00", title: "補玩 + 公園散步", text: "用輕鬆節奏收尾，不要玩到太硬，留體力給明天 Everland。" },
      { time: "17:00–18:00", title: "返回江南", text: "建議早點回去，晚餐也盡量吃得輕鬆。" },
    ],
    chips: ["比樂天世界更幼兒友善", "排隊通常較短", "為 Everland 留體力"],
    hashtags: ["#SeoulLand", "#ElephantTrain", "#KidsZone", "#果川韓牛"],
    restaurants: [
      {
        name: "Dongsung Hall（동성회관）",
        price: "中價位",
        why: "果川附近口碑穩的韓式家常店，吃起來不會過重，對樂園日中段很實用。",
        dishes: "水煮豬肉片、韓式湯品、家常小菜",
      },
      {
        name: "Ppalgan Tteokbokki（빨간떡볶이）",
        price: "平價高 CP",
        why: "如果只想快速補給一餐，這種道地 떡볶이 老店最有韓國街頭感。",
        dishes: "辣炒年糕、魚板、炸物拼盤",
      },
      {
        name: "Munwon Hanwoo Maeul",
        price: "稍高價位",
        why: "若想把 Day 3 晚餐吃得更有質感，果川周邊的韓牛餐廳比觀光區更划算。",
        dishes: "韓牛烤肉、牛排部位、韓牛套餐",
      },
    ],
    notes: [
      "推薦設施：Tiki Tok Train、Carousel、Mini Bumper Cars、Super Wings、Tobot Train、Peter Pan。",
      "若 5/11 大雨，這一天才需要重新評估是否改室內備案。",
    ],
  },
  {
    id: "day4",
    label: "D4",
    kicker: "Day 4 · 5/12（二）",
    title: "Everland 親子主菜日",
    summary:
      "Everland 是最值得保留的主題樂園，但順序一定要改成『先動物、再親子區』，不要一早衝大人向設施。",
    meta: [
      { title: "重點", value: "先 Lost Valley / Safari / Panda World" },
      { title: "門票", value: "成人 KRW 68,000 / 兒童 KRW 58,000（A season）" },
      { title: "節奏", value: "孩子累了就提前回程，不必硬撐夜秀" },
    ],
    timeline: [
      { time: "08:30", title: "早餐後出發", text: "若有接駁套票可省很多腦力，親子旅行值得。" },
      { time: "10:00–12:00", title: "先攻動物區", text: "Lost Valley、Safari World、Panda World 是最值得優先的內容。" },
      { time: "12:00–13:00", title: "午餐", text: "避開最尖峰時段，有位置就先吃。" },
      { time: "13:00–15:30", title: "Magic Land / Aesop Village", text: "下午轉去親子設施，讓孩子成為真正主角。" },
      { time: "15:30–17:00", title: "花園與補拍照", text: "用較鬆的節奏收尾，讓整天體感更完整。" },
    ],
    chips: ["主菜日", "先動物區", "別被 T Express 帶偏"],
    hashtags: ["#LostValley", "#SafariWorld", "#PandaWorld", "#MagicLand", "#嫩豆腐鍋"],
    restaurants: [
      {
        name: "Dubu Madang（두부마당）",
        price: "中價位・強推",
        why: "Everland 周邊非常實用的好店，豆腐新鮮、份量穩、吃完也不會太膩。",
        dishes: "嫩豆腐鍋、豆腐火鍋、烤豆腐",
      },
      {
        name: "Sammidang Makguksu",
        price: "中價位",
        why: "如果天氣偏熱或玩到下午想吃清爽一點，蕎麥冷麵是很聰明的選擇。",
        dishes: "Makguksu 蕎麥冷麵、餃子鍋",
      },
      {
        name: "Jajak Namu Galbi Yongin",
        price: "中高價位",
        why: "想在 Everland 當天安排一頓有旅行感的韓式烤排骨，這家比園內餐廳更值得。",
        dishes: "豬排骨、炭烤肉、韓式湯品",
      },
    ],
    notes: [
      "4.5 歲推薦：Royal Jubilee Carousel、Flying Elephant、Robot Car、Boong Boong Car、Car Kingdom、Lily Dance、Play Yard。",
      "T Express 與長排隊刺激設施不適合當這天主軸。",
    ],
  },
  {
    id: "day5",
    label: "D5",
    kicker: "Day 5 · 5/13（三）",
    title: "換飯店 + 景福宮 + 韓服 + 仁寺洞",
    summary:
      "這天的流程本來就很成熟。唯一原則是：先把行李處理乾淨，之後整段行程都用輕裝移動。",
    meta: [
      { title: "換飯店", value: "Kakao Taxi 直送 GLAD Mapo 寄放行李最省力" },
      { title: "主軸", value: "拍照、散步、文化感，不趕景點數" },
      { title: "適合度", value: "高，穿韓服進景福宮對孩子很加分" },
    ],
    timeline: [
      { time: "10:00", title: "Dormy Inn Checkout", text: "先把行李收好，不讓 Day 5 變成拖行李日。" },
      { time: "10:30", title: "Taxi 到 GLAD Mapo", text: "寄放行李後，整天都會舒服很多。" },
      { time: "11:30–14:00", title: "韓服 + 景福宮", text: "留出更衣與還衣時間，不要把時間壓太緊。" },
      { time: "14:00–15:00", title: "午餐", text: "名店可以吃，但不要為了排隊拖垮孩子體力。" },
      { time: "15:30–17:30", title: "仁寺洞 / Ssamziegil", text: "用散步與小逛街收尾，保留餘裕。" },
      { time: "18:00 後", title: "回 GLAD Mapo", text: "Check-in 後再找孔德 / 麻浦晚餐。" },
    ],
    chips: ["換飯店日先寄行李", "韓服拍照日", "午餐不要卡死名店"],
    hashtags: ["#DormyInnCheckout", "#GLADMapo寄行李", "#景福宮", "#韓服體驗", "#土俗村蔘雞湯"],
    restaurants: [
      {
        name: "Tosokchon Samgyetang（토속촌 삼계탕）",
        price: "中價位・經典",
        why: "你原本就排這家很合理，名氣大但也確實好吃，而且蔘雞湯對大人小孩都很穩。",
        dishes: "蔘雞湯、烏骨雞蔘雞湯、海鮮煎餅",
      },
      {
        name: "Bukchon Son Mandu",
        price: "平價高 CP",
        why: "餃子通常是親子旅行最不容易出錯的選擇，出餐快，萬一不想排土俗村時非常好用。",
        dishes: "蒸餃、煎餃、餃子湯、麵食",
      },
      {
        name: "Gogung（고궁）",
        price: "中價位",
        why: "全州拌飯顏值與接受度都高，也可以要求不要太辣，對孩子更友善。",
        dishes: "全州石鍋拌飯、韓式煎餅、小菜拼盤",
      },
    ],
    notes: [
      "若景福宮拍照拍得很順，北村反而不必硬加。",
      "這天適合穿好走的鞋，因為韓服拍照也會走不少路。",
    ],
  },
  {
    id: "day6",
    label: "D6",
    kicker: "Day 6 · 5/14（四）",
    title: "聖水洞 + 首爾林：成熟系購物約會日",
    summary:
      "把原本弘大 + 明洞換成聖水更適合 30 多歲的夫妻 / 情侶：比明洞少觀光壓力、比弘大少學生感，設計與生活風格店更集中，也更像舒服的約會日。這版也先把 5 間值得優先逛的品牌整理好，走起來不會像漫無目的繞圈。",
    meta: [
      { title: "為什麼換", value: "比明洞少觀光壓力、比弘大更成熟" },
      { title: "交通", value: "孔德 → 首爾林 / 聖水約 25–30 分鐘" },
      { title: "核心", value: "設計選物、生活風格店、咖啡與約會感" },
    ],
    timeline: [
      { time: "10:30–11:30", title: "首爾林慢走", text: "先用公園與綠地把步調放慢，這也是聖水比明洞舒服的原因：一開始就不是被人潮推著走。" },
      { time: "11:30–13:30", title: "聖水主街 / 旗艦店", text: "先看 ADERERROR、NONFICTION 這種旗艦與香氛空間，把今天想買的方向定下來；這區比弘大更成熟，也更適合兩位大人一起慢慢看。" },
      { time: "13:30–14:30", title: "午餐", text: "找一間能坐下來聊天的店，不把這天做成掃貨競賽。" },
      { time: "14:30–16:00", title: "咖啡 + 巷弄第二輪", text: "逛累就進咖啡館，再補看獨立品牌與 pop-up，維持像約會而不是衝行程的節奏。" },
      { time: "16:00–18:30", title: "鎖定真正想買的店", text: "第二輪再回 Matin Kim、Fennec 或 New Balance 試穿 / 試背 / 試鞋，買得更準，也不用像明洞那樣一口氣補貨。" },
      { time: "18:30 後", title: "聖水 / 首爾林晚餐", text: "直接在附近吃完再回孔德，讓最後一晚保持輕鬆。" },
    ],
    chips: ["成熟系購物日", "5 間品牌先鎖定", "比明洞更舒服"],
    hashtags: ["#首爾林", "#聖水品牌巡店", "#設計旗艦店", "#香氛伴手禮", "#大成갈비"],
    brandGuide: {
      title: "品牌推薦清單",
      intro:
        "如果 Day 6 不想走成漫無目的亂逛，先把這 5 間當第一輪核心清單：先看空間、再聞香、再試穿，最後才決定包夾或球鞋。",
      picks: [
        {
          name: "ADERERROR Seongsu Space",
          category: "設計服飾 / 旗艦空間",
          why: "想把聖水的「只有這裡才有」感一次看滿，先去這裡最有感；空間本身就像展覽，逛完今天的審美方向會立刻定下來。",
          bestFor: "第一輪先看空間、拍照與設計細節",
        },
        {
          name: "NONFICTION Seongsu",
          category: "香氛 / 生活風格 / 伴手禮",
          why: "味道乾淨、包裝也穩，買給自己或帶回去送人都不太踩雷；逛街中段進來，也很適合把節奏放慢一點。",
          bestFor: "護手霜、香水或一份好送的質感禮物",
        },
        {
          name: "Matin Kim",
          category: "成熟 K-fashion / 好搭單品",
          why: "版型比可愛系街頭牌更成熟，試穿後很容易直接決定；如果想買一件回台灣也真的會穿的單品，這間優先度很高。",
          bestFor: "外套、上衣或一套不用想太多的日常穿搭",
        },
        {
          name: "Fennec Seongsu",
          category: "極簡包夾 / 實用禮物",
          why: "比大件戰利品更不佔行李，價格與實用度也更容易下手；很適合在 Day 6 尾段補一份送人或自己每天會用的東西。",
          bestFor: "卡夾、短夾、小包這種不容易失手的實用禮",
        },
        {
          name: "New Balance Seongsu",
          category: "球鞋 / MADE 線可留意",
          why: "如果本來就會看 NB，來聖水這間比在百貨隨便逛更值得；鞋款陳列常更有看頭，也可順手看看 MADE 或高階線。",
          bestFor: "想認真試穿一雙能帶回家長穿的鞋",
        },
      ],
    },
    restaurants: [
      {
        name: "Chamanda Seoul Forest（차만다 서울숲 본점）",
        price: "中高價位・約會感強",
        why: "靠近首爾林、空間安靜，適合把 Day 6 午餐或早晚餐吃成一段完整約會。",
        dishes: "Risotto、義大利麵、排餐",
      },
      {
        name: "Somunnan Seongsu Gamjatang（소문난성수감자탕）",
        price: "中價位・在地經典",
        why: "如果想吃一間真正有聖水感的老店，這家比觀光區餐廳更有記憶點，也很適合逛街中段補體力。",
        dishes: "감자탕、볶음밥",
      },
      {
        name: "Daesung Galbi（대성갈비）",
        price: "中高價位",
        why: "買完東西後來一頓炭火烤肉，很像大人版的最後一晚收尾，比在明洞邊走邊吃更舒服。",
        dishes: "豬排骨、生排骨、冷麵",
      },
    ],
    notes: [
      "這天不是比誰買得多，而是用舒服節奏挑真正想買的東西。",
      "若戰利品偏多，中途回 GLAD Mapo 放一輪再出門也完全合理。",
    ],
  },
  {
    id: "day7",
    label: "D7",
    kicker: "Day 7 · 5/15（五）",
    title: "睡晚一點 + 孔德早餐 + 金浦返程",
    summary:
      "最後一天只保留整理行李、飯店附近早餐與機場動線。節奏更乾淨，也比較不會把返程變成趕場。",
    meta: [
      { title: "返程節奏", value: "11:00 前後到金浦很充裕" },
      { title: "交通", value: "孔德站搭 AREX 直達金浦，約 15–18 分鐘" },
      { title: "關鍵", value: "最後一天不再加任何補貨行程" },
    ],
    timeline: [
      { time: "07:30–08:30", title: "起床 + 最後整理", text: "把護照、退稅單、充電線與液體一次確認，最後一天就不用邊走邊想。" },
      { time: "08:30–09:30", title: "孔德 / 麻浦早餐", text: "在飯店附近慢慢吃，不再特地跑任何景點，體感會乾淨很多。" },
      { time: "09:30–10:00", title: "回飯店取行李 / Checkout", text: "確認戰利品、易碎物與托運分配，避免到機場才重整。" },
      { time: "10:15–10:30", title: "孔德站搭 AREX", text: "GLAD Mapo 最大優勢就在最後一天完整發揮。" },
      { time: "10:45–11:00", title: "抵達金浦", text: "慢慢 Check-in、安檢、處理最後補給或退稅。" },
    ],
    chips: ["早餐就近解決", "GLAD Mapo 到機場很順", "把餘裕留給機場"],
    hashtags: ["#孔德早餐", "#GLADMapoCheckout", "#AREX直達", "#FritzCoffee", "#金浦返程"],
    restaurants: [
      {
        name: "Mapo Yangji Seolleongtang（마포양지설렁탕）",
        price: "中價位",
        why: "離孔德 / 麻浦不遠，暖胃、出餐快，很適合最後一天的低壓早餐或早午餐。",
        dishes: "雪濃湯、牛肉湯飯、白切肉",
      },
      {
        name: "Guldari Sikdang（굴다리식당）",
        price: "平價高 CP",
        why: "如果想把最後一晚留在孔德附近舒服收尾，這家夠家常、夠近，也不用再多繞路。",
        dishes: "泡菜鍋、辣炒豬肉、蛋捲",
      },
      {
        name: "Fritz Coffee Company Dohwa（프릳츠 도화점）",
        price: "平價到中價位",
        why: "若最後一天只想吃麵包配咖啡，這種節奏比再衝一個市場舒服很多。",
        dishes: "酸種麵包、可頌、手沖咖啡",
      },
    ],
    notes: [
      "最後一天的重點是準時、舒服、腦袋輕，不是再多收一站。",
      "若前一晚已把退稅與托運整理好，Day 7 幾乎會變成純收尾。",
    ],
  },
];

const budgetCards = [
  { label: "住宿", value: "TWD 24,000–26,000", note: "Dormy Inn 4 晚 + GLAD Mapo 2 晚" },
  { label: "主要景點", value: "約 KRW 423,000", note: "COEX + Seoul Land + Everland" },
  { label: "市區交通", value: "TWD 2,500–3,500", note: "含換飯店與購物日彈性叫車" },
  { label: "餐飲預算", value: "TWD 7,000–12,000", note: "取決於韓牛 / 烤肉次數" },
];

const prepCards = [
  {
    title: "先買 / 先訂",
    items: ["COEX 水族館門票", "Everland 門票或接駁", "韓服租借預約", "Seoul Land 外國旅客優惠截圖"],
  },
  {
    title: "手機必裝 App",
    items: ["Kakao T：叫車", "Naver Map：路線最準", "Papago：韓文翻譯", "Klook：票券與接駁"],
  },
  {
    title: "親子裝備",
    items: ["防曬乳與輕便雨衣", "孩子愛吃的小點心", "行動電源", "真的好走的鞋"],
  },
];

const pageOrder = [
  { id: "overview", label: "總覽", kind: "overview" },
  { id: "stay", label: "住宿", kind: "stay" },
  ...days.map((day) => ({ id: day.id, label: day.label, kind: "day", day })),
  { id: "budget", label: "預算", kind: "budget" },
  { id: "prep", label: "準備", kind: "prep" },
];

const essentialPages = pageOrder.filter((page) => page.kind !== "day");
const itineraryPages = pageOrder.filter((page) => page.kind === "day");
const PAGE_STORAGE_KEY = "seoul-family-trip-last-page";

const staticPageSummaries = {
  overview: {
    title: "整趟節奏總覽",
    description: "先理解為什麼 Seoul Land 會比 Lotte World 更適合這趟親子節奏，再決定每天看哪一頁。",
    callout: "先抓前半段 COEX → Seoul Land → Everland",
    meta: ["7 天 6 夜", "節奏先行", "第一次進站先看"],
  },
  stay: {
    title: "住宿與換飯店策略",
    description: "江南四晚配孔德兩晚的骨架很合理，這頁把 Day 5 的轉場拆成最好走的順序。",
    callout: "Day 5 先寄行李再去景福宮",
    meta: ["2 間飯店", "1 次轉場", "機場回程更輕鬆"],
  },
  budget: {
    title: "預算抓法與彈性範圍",
    description: "把住宿、票券、交通與餐飲抓成舒服區間，不必每天都算到最細。",
    callout: "真正波動最大的是餐飲與購物",
    meta: ["4 組預算卡", "先抓範圍", "方便旅途中調整"],
  },
  prep: {
    title: "出發前清單",
    description: "把票券、App 和親子裝備先整理好，旅行當天就能直接照著頁面走。",
    callout: "先買票、先裝 App、先備好雨具",
    meta: ["3 組待辦", "出發前先做", "手機上隨時可對照"],
  },
};

function goToHash(id) {
  const nextHash = `#${id}`;
  if (window.location.hash === nextHash) return false;
  window.location.hash = id;
  return true;
}

function getPageAnchorId(pageId) {
  const activePage = pageOrder.find((page) => page.id === pageId);
  return activePage?.kind === "day" ? `${pageId}-intro` : "page-content";
}

function getScrollOffset() {
  const navShellHeight = document.querySelector(".nav-shell")?.getBoundingClientRect().height ?? 0;
  return navShellHeight + (window.innerWidth <= 640 ? 18 : 32);
}

function scrollToElementWithOffset(element, behavior = "auto") {
  if (!element) return;

  const top = window.scrollY + element.getBoundingClientRect().top - getScrollOffset();
  window.scrollTo({
    top: Math.max(top, 0),
    behavior,
  });
}

function scrollToPageAnchor(pageId, behavior = "auto") {
  const target =
    document.getElementById(getPageAnchorId(pageId)) ?? document.getElementById("page-content");
  scrollToElementWithOffset(target, behavior);
}

function getSavedPage() {
  try {
    const savedPage = window.localStorage.getItem(PAGE_STORAGE_KEY);
    return pageOrder.some((page) => page.id === savedPage) ? savedPage : null;
  } catch (error) {
    return null;
  }
}

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  if (pageOrder.some((page) => page.id === hash)) return hash;
  return getSavedPage() ?? "overview";
}

function shortenText(text, max = 88) {
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
}

function normalizeHashtag(tag) {
  const compactTag = `${tag ?? ""}`.trim().replace(/\s+/g, "");
  if (!compactTag) return "";
  return compactTag.startsWith("#") ? compactTag : `#${compactTag}`;
}

function getDayHashtags(day) {
  const rawTags = day.hashtags?.length ? day.hashtags : day.chips ?? [];
  return [...new Set(rawTags.map(normalizeHashtag).filter(Boolean))];
}

function getDayBrandGuide(day) {
  const picks = Array.isArray(day.brandGuide?.picks)
    ? day.brandGuide.picks.filter((item) => item?.name && item?.why)
    : [];

  if (!picks.length) return null;

  return {
    title: day.brandGuide?.title ?? "品牌推薦",
    intro: day.brandGuide?.intro ?? `如果這天想把購物逛得更準，先從這 ${picks.length} 間開始。`,
    picks,
  };
}

function getPageSummary(page) {
  if (page.kind === "day") {
    const firstStop = page.day.timeline[0];
    const brandGuide = getDayBrandGuide(page.day);
    const meta = [
      `${page.day.timeline.length} 個時段`,
      `${page.day.restaurants.length} 間餐廳`,
      ...(brandGuide ? [`${brandGuide.picks.length} 間品牌`] : []),
      page.day.chips?.[0],
    ].filter(Boolean);

    return {
      title: page.day.title,
      description: page.day.summary,
      callout: `${firstStop.time} · ${firstStop.title}`,
      meta,
    };
  }

  return staticPageSummaries[page.id];
}

function getSectionLinks(page) {
  if (page.kind === "day") {
    const brandGuide = getDayBrandGuide(page.day);
    return [
      { label: "時程", target: `${page.id}-timeline` },
      ...(brandGuide ? [{ label: "品牌", target: `${page.id}-brands` }] : []),
      { label: "餐廳", target: `${page.id}-restaurants` },
      { label: "提醒", target: `${page.id}-notes` },
    ];
  }

  const sectionMap = {
    overview: [
      { label: "七天節奏", target: "overview-journey" },
      { label: "調整原因", target: "overview-reasons" },
    ],
    stay: [{ label: "住宿細節", target: "stay-plan" }],
    budget: [{ label: "預算卡片", target: "budget-cards" }],
    prep: [{ label: "出發清單", target: "prep-checks" }],
  };

  return sectionMap[page.id] ?? [];
}

function scrollToSection(targetId) {
  scrollToElementWithOffset(document.getElementById(targetId), "smooth");
}

function App() {
  const [pageId, setPageId] = useState(getPageFromHash);
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState("");
  const tabStripRef = React.useRef(null);
  const pageScrollPositionsRef = React.useRef({});
  const pendingPageScrollRef = React.useRef(null);
  const currentPageIdRef = React.useRef(pageId);
  const firstPageRenderRef = React.useRef(true);

  const activeIndex = useMemo(
    () => pageOrder.findIndex((page) => page.id === pageId),
    [pageId]
  );
  const activePage = pageOrder[activeIndex] ?? pageOrder[0];
  const prevPage = pageOrder[activeIndex - 1];
  const nextPage = pageOrder[activeIndex + 1];
  const prevSummary = prevPage ? getPageSummary(prevPage) : null;
  const nextSummary = nextPage ? getPageSummary(nextPage) : null;
  const pageSummary = getPageSummary(activePage);
  const sectionLinks = getSectionLinks(activePage);
  const progressPercent = `${((activeIndex + 1) / pageOrder.length) * 100}%`;

  useEffect(() => {
    currentPageIdRef.current = pageId;
  }, [pageId]);

  useEffect(() => {
    const onHashChange = () => {
      const nextPageId = getPageFromHash();
      const currentPageId = currentPageIdRef.current;

      if (nextPageId === currentPageId) return;

      pageScrollPositionsRef.current[currentPageId] = window.scrollY;
      if (!pendingPageScrollRef.current || pendingPageScrollRef.current.pageId !== nextPageId) {
        pendingPageScrollRef.current = { mode: "restore", pageId: nextPageId };
      }
      setPageId(nextPageId);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    setNavOpen(false);

    const pendingScroll = pendingPageScrollRef.current;
    let frameId;
    let settleTimer;
    if (firstPageRenderRef.current) {
      firstPageRenderRef.current = false;
    } else if (pendingScroll?.pageId === pageId) {
      frameId = window.requestAnimationFrame(() => {
        if (pendingScroll.mode === "page-anchor") {
          scrollToPageAnchor(pageId);
          settleTimer = window.setTimeout(() => scrollToPageAnchor(pageId), 90);
          return;
        }

        const savedScroll = pageScrollPositionsRef.current[pageId];
        if (typeof savedScroll === "number") {
          window.scrollTo({ top: savedScroll, behavior: "auto" });
          return;
        }

        scrollToPageAnchor(pageId);
      });
    }

    pendingPageScrollRef.current = null;

    try {
      window.localStorage.setItem(PAGE_STORAGE_KEY, pageId);
    } catch (error) {
      // Ignore localStorage restrictions on private browsers.
    }

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, [pageId]);

  useEffect(() => {
    if (!window.location.hash && pageId !== "overview") {
      window.history.replaceState(null, "", `#${pageId}`);
    }
  }, [pageId]);

  useEffect(() => {
    document.title = `${pageSummary.title} · 首爾親子七日行程`;
  }, [pageSummary.title]);

  useEffect(() => {
    const activeTab = tabStripRef.current?.querySelector(`[data-page-id="${pageId}"]`);
    activeTab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [pageId]);

  useEffect(() => {
    if (!navOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setNavOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
    return () => document.body.classList.remove("nav-open");
  }, [navOpen]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openPage = (id) => {
    setNavOpen(false);
    if (id === pageId) {
      scrollToPageAnchor(pageId, "smooth");
      return;
    }

    pageScrollPositionsRef.current[pageId] = window.scrollY;
    pendingPageScrollRef.current = { mode: "page-anchor", pageId: id };
    goToHash(id);
  };

  const handleShare = async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.hash = pageId;

    try {
      if (navigator.share) {
        await navigator.share({
          title: pageSummary.title,
          text: pageSummary.description,
          url: shareUrl.toString(),
        });
        setToast("已開啟分享面板");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl.toString());
        setToast("已複製這頁連結");
        return;
      }

      window.prompt("請手動複製這個連結", shareUrl.toString());
      setToast("請手動複製連結");
    } catch (error) {
      if (error?.name === "AbortError") return;
      setToast("分享暫時失敗，請稍後再試");
    }
  };

  return html`
    <div className="app-shell">
      <nav className="sub-header-nav" style=${{ background: '#0e1f33', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: '14px', borderRadius: '8px', marginBottom: '16px' }}>
        <span>韓國行程規劃專區：</span>
        <div style=${{ display: 'flex', gap: '12px' }}>
          <a href="./" style=${{ color: '#7dd3fc', textDecoration: 'none', fontWeight: 'bold' }}>🇰🇷 首爾 7 日親子行程</a>
          <a href="./haeundae.html" style=${{ color: '#fca5a5', textDecoration: 'none', fontWeight: 'bold' }}>🏖️ 海雲台飯店 3 選 1 比較</a>
        </div>
      </nav>
      <header className="hero">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Seoul family trip · 2026/05/09–05/15</p>
            <h1>首爾親子七日行程</h1>
            <p>
              這份頁面是專門為 <strong>2 大 1 小、4.5 歲孩子</strong> 做的手機版旅遊計畫書。
              核心調整是把 <strong>Lotte World</strong> 改成 <strong>Seoul Land + 首爾大公園</strong>，
              再保留 <strong>Everland</strong> 當整趟最有記憶點的主題樂園日。
            </p>
          </div>

          <aside className="hero-focus-card">
            <p className="eyebrow">目前頁面</p>
            <h2>${pageSummary.title}</h2>
            <p>${shortenText(pageSummary.description, 112)}</p>

            <div className="focus-meta-row">
              ${pageSummary.meta.map(
                (item) => html`<span key=${item} className="hero-chip subtle">${item}</span>`
              )}
            </div>

            <div className="focus-callout">
              <span>快速提示</span>
              <strong>${pageSummary.callout}</strong>
            </div>

            <div className="focus-actions">
              <button
                className="mini-action"
                onClick=${() => prevPage && openPage(prevPage.id)}
                disabled=${!prevPage}
              >
                ${prevPage ? `← ${prevPage.label}` : "已是第一頁"}
              </button>
              <button
                className="mini-action"
                onClick=${() => nextPage && openPage(nextPage.id)}
                disabled=${!nextPage}
              >
                ${nextPage ? `${nextPage.label} →` : "已是最後頁"}
              </button>
            </div>
          </aside>
        </div>

        <div className="hero-chip-row">
          <span className="hero-chip">7 天 6 夜</span>
          <span className="hero-chip">金浦進出</span>
          <span className="hero-chip">江南 4 晚 + 孔德 2 晚</span>
          <span className="hero-chip">每天都附附近餐廳</span>
        </div>

        <div className="stat-grid">
          ${tripStats.map(
            (stat) => html`
              <article key=${stat.label} className="stat-card">
                <span>${stat.label}</span>
                <strong>${stat.value}</strong>
              </article>
            `
          )}
        </div>

        <div className="cta-row">
          <button className="hero-button primary" onClick=${() => setNavOpen(true)}>打開全頁導航</button>
          <button className="hero-button ghost" onClick=${() => openPage("day3")}>先看 Seoul Land</button>
          <button className="hero-button ghost" onClick=${() => openPage("day4")}>先看 Everland</button>
          <a className="hero-button ghost" href="./首爾親子景點地圖.kml">下載 KML 地圖</a>
        </div>
      </header>

      <div className="nav-shell">
        <div className="navigator-top">
          <div className="navigator-current">
            <span className="soft-label">${activePage.label}</span>
            <div className="navigator-current-copy">
              <strong>${pageSummary.title}</strong>
              <p>${pageSummary.callout}</p>
            </div>
          </div>
          <button className="navigator-open" onClick=${() => setNavOpen(true)}>全部頁面</button>
        </div>

        <div className="navigator-progress-track">
          <span style=${{ width: progressPercent }}></span>
        </div>

        <div
          ref=${tabStripRef}
          className="tab-strip"
          role="tablist"
          aria-label="Itinerary page navigator"
        >
          ${pageOrder.map(
            (page) => html`
              <button
                key=${page.id}
                className=${`tab-button ${page.id === pageId ? "active" : ""}`}
                data-page-id=${page.id}
                id=${`tab-${page.id}`}
                onClick=${() => openPage(page.id)}
                role="tab"
                aria-selected=${page.id === pageId}
                aria-controls="page-content"
                tabIndex=${page.id === pageId ? 0 : -1}
              >
                ${page.label}
              </button>
            `
          )}
        </div>

        <div className="navigator-shortcuts">
          ${sectionLinks.map(
            (link) => html`
              <button key=${link.target} className="shortcut-button" onClick=${() => scrollToSection(link.target)}>
                ${link.label}
              </button>
            `
          )}
          <button className="shortcut-button secondary" onClick=${handleShare}>分享這頁</button>
        </div>
      </div>

      <${NavigatorDrawer}
        open=${navOpen}
        activeIndex=${activeIndex}
        activePageId=${pageId}
        onClose=${() => setNavOpen(false)}
        onOpenPage=${openPage}
      />

      <main
        key=${pageId}
        id="page-content"
        className="page-panel"
        role="tabpanel"
        aria-labelledby=${`tab-${pageId}`}
      >
        <${PageRenderer} page=${activePage} onOpenPage=${openPage} />
      </main>

      <footer className="pager">
        <button onClick=${() => prevPage && openPage(prevPage.id)} disabled=${!prevPage}>
          <span className="pager-eyebrow">上一頁</span>
          <strong>${prevPage?.label ?? "最前頁"}</strong>
          <span className="pager-caption">${prevSummary?.title ?? "沒有更前面的頁面了"}</span>
        </button>
        <div className="pager-status">
          <strong>${activeIndex + 1} / ${pageOrder.length}</strong>
          <span>${pageSummary.callout}</span>
        </div>
        <button onClick=${() => nextPage && openPage(nextPage.id)} disabled=${!nextPage}>
          <span className="pager-eyebrow">下一頁</span>
          <strong>${nextPage?.label ?? "最後頁"}</strong>
          <span className="pager-caption">${nextSummary?.title ?? "你已看到最後一頁"}</span>
        </button>
      </footer>

      ${toast
        ? html`<div className="floating-toast" role="status" aria-live="polite">${toast}</div>`
        : null}
    </div>
  `;
}

function DrawerCard({ page, activeIndex, activePageId, onOpenPage }) {
  const pageIndex = pageOrder.findIndex((item) => item.id === page.id);
  const pageSummary = getPageSummary(page);
  const stateClass =
    page.id === activePageId ? "active" : pageIndex < activeIndex ? "done" : "upcoming";
  const stateLabel =
    page.id === activePageId ? "目前頁面" : pageIndex < activeIndex ? "已看過" : "接下來";

  return html`
    <button type="button" className=${`drawer-card ${stateClass}`} onClick=${() => onOpenPage(page.id)}>
      <div className="drawer-card-top">
        <span className="soft-label">${page.label}</span>
        <span className="drawer-status">${stateLabel}</span>
      </div>
      <strong>${pageSummary.title}</strong>
      <p>${shortenText(pageSummary.description, 82)}</p>
      <div className="drawer-meta">
        <span>${pageSummary.callout}</span>
        <span>${pageSummary.meta[0]}</span>
      </div>
    </button>
  `;
}

function NavigatorDrawer({ open, activeIndex, activePageId, onClose, onOpenPage }) {
  const progressPercent = `${((activeIndex + 1) / pageOrder.length) * 100}%`;

  return html`
    <div
      className=${`nav-drawer-backdrop ${open ? "open" : ""}`}
      onClick=${onClose}
      aria-hidden=${!open}
    ></div>

    <aside
      className=${`nav-drawer ${open ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden=${!open}
      aria-label="Trip page navigator"
    >
      <div className="nav-drawer-header">
        <div>
          <p className="page-kicker">Trip navigator</p>
          <h2>手機上直接切頁</h2>
          <p>先選全程資訊，再切每天的行程卡。每一頁都保留 hash，方便直接分享給同行家人。</p>
        </div>
        <button className="icon-button" onClick=${onClose} aria-label="關閉全頁導航">✕</button>
      </div>

      <div className="drawer-progress">
        <span>目前看到第 ${activeIndex + 1} 頁，共 ${pageOrder.length} 頁</span>
        <div className="progress-track">
          <span style=${{ width: progressPercent }}></span>
        </div>
      </div>

      <section className="drawer-section">
        <div className="section-head compact">
          <div>
            <h3>全程資訊</h3>
            <p>先看總覽、住宿、預算與出發前清單，再切到每一天。</p>
          </div>
        </div>
        <div className="drawer-grid">
          ${essentialPages.map(
            (page) => html`
              <${DrawerCard}
                key=${page.id}
                page=${page}
                activeIndex=${activeIndex}
                activePageId=${activePageId}
                onOpenPage=${onOpenPage}
              />
            `
          )}
        </div>
      </section>

      <section className="drawer-section">
        <div className="section-head compact">
          <div>
            <h3>每日 itinerary</h3>
            <p>用卡片快速找今天要看的那一天，比左右翻頁更省腦力。</p>
          </div>
        </div>
        <div className="drawer-grid">
          ${itineraryPages.map(
            (page) => html`
              <${DrawerCard}
                key=${page.id}
                page=${page}
                activeIndex=${activeIndex}
                activePageId=${activePageId}
                onOpenPage=${onOpenPage}
              />
            `
          )}
        </div>
      </section>
    </aside>
  `;
}

function PageRenderer({ page, onOpenPage }) {
  if (page.kind === "overview") return html`<${OverviewPage} onOpenPage=${onOpenPage} />`;
  if (page.kind === "stay") return html`<${StayPage} />`;
  if (page.kind === "budget") return html`<${BudgetPage} />`;
  if (page.kind === "prep") return html`<${PrepPage} />`;
  return html`<${DayPage} day=${page.day} />`;
}

function OverviewPage({ onOpenPage }) {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Overview</p>
        <h2>這版行程為什麼更適合你們</h2>
        <p>
          你原本的骨架其實很好，只是把 Day 3 換成 Seoul Land 之後，整體節奏會更像親子旅行，而不是連續打卡兩個大型樂園。
        </p>
      </header>

      <div className="summary-banner">
        <strong>一句話結論：</strong>
        前半段改成 <strong>COEX → Seoul Land → Everland</strong>，比原本的
          <strong>COEX → Lotte World → Everland</strong> 更不重複，也更符合 4.5 歲孩子的可玩性與體力。
        </div>

      <section className="section-block" id="overview-reasons">
        <div className="overview-grid">
          ${overviewCards.map(
            (card) => html`
              <article key=${card.title} className="overview-card">
                <span className="soft-label">${card.tag}</span>
                <h3>${card.title}</h3>
                <p>${card.body}</p>
              </article>
            `
          )}
        </div>
      </section>

      <section className="section-block" id="overview-journey">
        <div className="section-head">
          <div>
            <h3>七天節奏快切導航</h3>
            <p>每張卡片都能直接跳到該日，手機上更像一個可切頁的旅遊小 App。</p>
          </div>
          <button className="text-link" onClick=${() => onOpenPage("day1")}>從 Day 1 開始</button>
        </div>

        <div className="journey-grid">
          ${itineraryPages.map(
            (page) => html`
              <button key=${page.id} type="button" className="journey-card" onClick=${() => onOpenPage(page.id)}>
                <span className="soft-label">${page.day.kicker}</span>
                <h3>${page.day.title}</h3>
                <p>${shortenText(page.day.summary, 92)}</p>
                <div className="journey-meta">
                  <span>${page.day.timeline[0].time} 出發</span>
                  <span>${page.day.restaurants.length} 間餐廳</span>
                  <span>${page.day.chips[0]}</span>
                </div>
              </button>
            `
          )}
        </div>
      </section>
    </section>
  `;
}

function StayPage() {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Stay plan</p>
        <h2>住宿與換飯店動線</h2>
        <p>前半段住江南、後半段住孔德，這個策略很對。真正需要做的只是把換飯店日做到夠輕鬆。</p>
      </header>

      <div id="stay-plan" className="stay-grid">
        ${hotels.map(
          (hotel) => html`
            <article key=${hotel.name} className="stay-card">
              <span className="soft-label">${hotel.label}</span>
              <h3>${hotel.name}</h3>
              <div className="mini-stack">
                ${hotel.details.map((detail) => html`<p key=${detail}>${detail}</p>`)}
              </div>
            </article>
          `
        )}
      </div>
    </section>
  `;
}

function DayPage({ day }) {
  const firstStop = day.timeline[0];
  const lastStop = day.timeline[day.timeline.length - 1];
  const spotlightTags = getDayHashtags(day);
  const brandGuide = getDayBrandGuide(day);

  return html`
    <section>
      <header className="page-header page-anchor" id=${`${day.id}-intro`}>
        <p className="page-kicker">${day.kicker}</p>
        <h2>${day.title}</h2>
        <p>${day.summary}</p>
      </header>

      <div className="day-spotlight">
        <div className="day-spotlight-copy">
          <span className="soft-label">今天先做這件事</span>
          <strong>${firstStop.time} · ${firstStop.title}</strong>
          <p>${firstStop.text}</p>
          ${spotlightTags.length
            ? html`
                <div className="spotlight-hashtag-field">
                  <span className="spotlight-hashtag-label">熱門 Hashtag</span>
                  <div className="spotlight-hashtag-row">
                    ${spotlightTags.map(
                      (tag) =>
                        html`<span key=${`${day.id}-${tag}`} className="spotlight-hashtag">${tag}</span>`
                    )}
                  </div>
                </div>
              `
            : null}
        </div>

        <div className="day-pulse-grid">
          <article className="pulse-card">
            <span>出發時間</span>
            <strong>${firstStop.time}</strong>
          </article>
          <article className="pulse-card">
            <span>收尾節奏</span>
            <strong>${lastStop.time}</strong>
          </article>
          <article className="pulse-card">
            <span>餐廳備案</span>
            <strong>${day.restaurants.length} 間</strong>
          </article>
          ${brandGuide
            ? html`
                <article className="pulse-card brand-pulse-card">
                  <span>品牌清單</span>
                  <strong>${brandGuide.picks.length} 間</strong>
                </article>
              `
            : null}
        </div>
      </div>

      <div className="section-chip-row day-chip-row">
        ${day.chips.map((chip) => html`<span key=${chip} className="section-chip">${chip}</span>`)}
      </div>

      <div className="meta-grid">
        ${day.meta.map(
          (item) => html`
            <article key=${item.title} className="meta-card">
              <strong>${item.title}</strong>
              <span>${item.value}</span>
            </article>
          `
        )}
      </div>

      <section className="section-block" id=${`${day.id}-timeline`}>
        <div className="section-head">
          <div>
            <h3>今日時程</h3>
            <p>照這個順序走，能把體力消耗與移動成本壓在比較舒服的範圍。</p>
          </div>
        </div>
        <div className="timeline">
          ${day.timeline.map(
            (item, index) => html`
              <article key=${`${day.id}-${item.time}`} className="timeline-card">
                <div className="timeline-step">${String(index + 1).padStart(2, "0")}</div>
                <div className="timeline-time">${item.time}</div>
                <div className="timeline-body">
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                </div>
              </article>
            `
          )}
        </div>
      </section>

      ${brandGuide
        ? html`
            <section className="section-block" id=${`${day.id}-brands`}>
              <div className="section-head">
                <div>
                  <h3>${brandGuide.title}</h3>
                  <p>${brandGuide.intro}</p>
                </div>
              </div>
              <div className="brand-grid">
                ${brandGuide.picks.map(
                  (brand, index) => html`
                    <article key=${brand.name} className="brand-card">
                      <div className="brand-card-top">
                        <div className="brand-card-heading">
                          <span className="brand-index">品牌 ${String(index + 1).padStart(2, "0")}</span>
                          <h4>${brand.name}</h4>
                        </div>
                        <span className="soft-label">${brand.category ?? "品牌推薦"}</span>
                      </div>
                      <p className="brand-copy">
                        <strong>為什麼值得去：</strong>${brand.why}
                      </p>
                      ${brand.bestFor
                        ? html`
                            <div className="brand-note">
                              <strong>最適合：</strong>${brand.bestFor}
                            </div>
                          `
                        : null}
                    </article>
                  `
                )}
              </div>
            </section>
          `
        : null}

      <section className="section-block" id=${`${day.id}-restaurants`}>
        <div className="section-head">
          <div>
            <h3>附近餐廳推薦</h3>
            <p>${day.restaurants.length} 間備案可依排隊、孩子情緒與回程時間彈性切換。</p>
          </div>
        </div>
        <div className="restaurant-grid">
          ${day.restaurants.map(
            (restaurant, index) => html`
              <article key=${restaurant.name} className="restaurant-card">
                <div className="restaurant-head">
                  <div>
                    <span className="soft-label">${index === 0 ? "優先考慮" : "備用選擇"}</span>
                    <h4>${restaurant.name}</h4>
                  </div>
                  <span className="price-badge">${restaurant.price}</span>
                </div>
                <p className="restaurant-copy">
                  <strong>推薦說明：</strong>${restaurant.why}
                </p>
                <div className="dish-panel">
                  <strong>推薦菜色：</strong>${restaurant.dishes}
                </div>
              </article>
            `
          )}
        </div>
      </section>

      <section className="section-block" id=${`${day.id}-notes`}>
        <div className="section-head">
          <div>
            <h3>關鍵提醒</h3>
            <p>出門前快速掃一遍，最能避免旅途中臨時改線或孩子突然累掉。</p>
          </div>
        </div>
        <div className="tip-stack">
          ${day.notes.map(
            (note, index) => html`
              <article key=${note} className="tip-card">
                <span className="tip-index">提醒 ${index + 1}</span>
                <p>${note}</p>
              </article>
            `
          )}
        </div>
      </section>
    </section>
  `;
}

function BudgetPage() {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Budget</p>
        <h2>預算抓法</h2>
        <p>先抓一個舒服範圍就好，不必把每一筆都算到極準。真正波動最大的通常是餐飲與購物。</p>
      </header>

      <div id="budget-cards" className="budget-grid">
        ${budgetCards.map(
          (card) => html`
            <article key=${card.label} className="budget-card">
              <span className="soft-label">${card.label}</span>
              <strong>${card.value}</strong>
              <p>${card.note}</p>
            </article>
          `
        )}
      </div>
    </section>
  `;
}

function PrepPage() {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Preparation</p>
        <h2>出發前要先做的事</h2>
        <p>把這些前置工作先做好，真正出發時你就只剩下「照著頁面走」這件事。</p>
      </header>

      <div id="prep-checks" className="prep-grid">
        ${prepCards.map(
          (card) => html`
            <article key=${card.title} className="prep-card">
              <h3>${card.title}</h3>
              <ul className="check-list">
                ${card.items.map((item) => html`<li key=${item}>${item}</li>`)}
              </ul>
            </article>
          `
        )}
      </div>

      <section className="section-block">
        <h3>最後提醒</h3>
        <div className="summary-banner">
          <strong>如果 5/11 明顯下大雨：</strong>
          再考慮把 Seoul Land 變成室內備案；否則這版就是目前最平衡、最好走、也最好吃的版本。
        </div>
      </section>
    </section>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
