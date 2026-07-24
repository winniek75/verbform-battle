// ============================================================
// 英検４級レベル 関係詞＆分詞 問題データベース
// ============================================================

export const QUESTIONS = [

  // ============================
  // 関係代名詞 who（主格）
  // ============================
  {
    id: "who01", level: "grade3", type: "multiple",
    category: "関係代名詞 who",
    sentence: "The boy _____ plays soccer is Ken.",
    options: ["who", "which", "what", "it"],
    answer: "who",
    explanation: "boy は「人」→ 人の説明をするときは who！「サッカーをする男の子はケンです」という意味だよ。",
  },
  {
    id: "who02", level: "grade3", type: "multiple",
    category: "関係代名詞 who",
    sentence: "I have a friend _____ can sing well.",
    options: ["who", "which", "whose", "where"],
    answer: "who",
    explanation: "friend は「人」→ 人のうしろに説明をつけるときは who！「上手に歌える友達がいる」という意味。",
  },
  {
    id: "who03", level: "grade3", type: "multiple",
    category: "関係代名詞 who",
    sentence: "The girl _____ likes dogs is my friend.",
    options: ["who", "which", "what", "when"],
    answer: "who",
    explanation: "girl は「人」→ who！「犬が好きな女の子は私の友達です」。人 = who、物・動物 = which と覚えよう！",
  },
  {
    id: "who04", level: "grade3", type: "multiple",
    category: "関係代名詞 who",
    sentence: "The man _____ lives next door is kind.",
    options: ["who", "which", "where", "what"],
    answer: "who",
    explanation: "man は「人」→ who！「隣に住んでいる男の人は親切だ」。that を使ってもOKだよ！",
  },
  {
    id: "who05", level: "grade3", type: "fill",
    category: "関係代名詞 who",
    sentence: "She is the woman _____ helped me.",
    answer: "who",
    hint: "「人（woman）」のあとに使う関係代名詞は？",
    explanation: "woman は「人」→ 人の説明をするときは who を使うよ！「私を助けてくれた女性」という意味になる。that でもOK！",
  },
  {
    id: "who06", level: "grade3", type: "multiple",
    category: "関係代名詞 who",
    sentence: "Do you know the boy _____ runs very fast?",
    options: ["who", "which", "whose", "what"],
    answer: "who",
    explanation: "boy は「人」→ who！「すごく速く走る男の子を知ってる？」という意味。which は物・動物にしか使えないよ。",
  },
  {
    id: "who07", level: "grade3", type: "multiple",
    category: "関係代名詞 who",
    sentence: "The student _____ got 100 points is Tom.",
    options: ["who", "which", "it", "he"],
    answer: "who",
    explanation: "student は「人」→ who！「100点を取った生徒はトムです」。it や he では2つの文をつなげないよ。",
  },

  // ============================
  // 関係代名詞 which（主格・目的格）
  // ============================
  {
    id: "wh01", level: "grade3", type: "multiple",
    category: "関係代名詞 which",
    sentence: "I have a dog _____ runs very fast.",
    options: ["which", "who", "whose", "what"],
    answer: "which",
    explanation: "dog は「動物」→ 物・動物の説明は which！「すごく速く走る犬を飼っている」。that でもOK！",
  },
  {
    id: "wh02", level: "grade3", type: "multiple",
    category: "関係代名詞 which",
    sentence: "The bag _____ is on the desk is mine.",
    options: ["which", "who", "whom", "where"],
    answer: "which",
    explanation: "bag は「物」→ which！「机の上にあるカバンは私のです」。物・動物の説明は which を使うよ。",
  },
  {
    id: "wh03", level: "grade3", type: "fill",
    category: "関係代名詞 which",
    sentence: "I like the cake _____ my mom made.",
    answer: "which",
    hint: "「物（cake）」のあとに使う関係代名詞は？（that も OK）",
    explanation: "cake は「物」→ 物の説明をするときは which を使うよ！「お母さんが作ったケーキ」。that でもOK。目的格なので省略もできる！",
  },
  {
    id: "wh04", level: "grade3", type: "multiple",
    category: "関係代名詞 which",
    sentence: "The bird _____ is singing now is beautiful.",
    options: ["which", "who", "what", "when"],
    answer: "which",
    explanation: "bird は「動物」→ which！「今歌っている鳥はきれいだ」。動物も物と同じく which を使うよ。",
  },
  {
    id: "wh05", level: "grade3", type: "multiple",
    category: "関係代名詞 which",
    sentence: "This is the book _____ I want to read.",
    options: ["which", "who", "what", "whose"],
    answer: "which",
    explanation: "book は「物」→ which！「これは私が読みたい本です」。I want to read の目的語なので省略もできるよ。",
  },
  {
    id: "wh06", level: "grade3", type: "multiple",
    category: "関係代名詞 which",
    sentence: "The red car _____ my dad drives is cool.",
    options: ["that", "who", "what", "whose"],
    answer: "that",
    explanation: "car は「物」→ that か which！「お父さんが運転する赤い車はカッコいい」。that は人にも物にも使える万能選手だよ。",
  },

  // ============================
  // who vs which（ひっかけ）
  // ============================
  {
    id: "wvw01", level: "grade3", type: "multiple",
    category: "who か which か？（ひっかけ）", tricky: true,
    sentence: "I know the girl _____ has a white cat.",
    options: ["who", "which", "what", "whose"],
    answer: "who",
    explanation: "「girl」は人 → who！which は物・動物に使うよ",
  },
  {
    id: "wvw02", level: "grade3", type: "multiple",
    category: "who か which か？（ひっかけ）", tricky: true,
    sentence: "Look at the cat _____ is sleeping on the sofa.",
    options: ["which", "who", "what", "whose"],
    answer: "which",
    explanation: "「cat」は動物 → which！who は人に使うよ",
  },
  {
    id: "wvw03", level: "grade3", type: "multiple",
    category: "who か which か？（ひっかけ）", tricky: true,
    sentence: "She is the teacher _____ teaches English.",
    options: ["who", "which", "what", "when"],
    answer: "who",
    explanation: "「teacher」は人 → who！which は人には使えないよ",
  },
  {
    id: "wvw04", level: "grade3", type: "multiple",
    category: "who か which か？（ひっかけ）", tricky: true,
    sentence: "The juice _____ is in the fridge is cold.",
    options: ["which", "who", "whose", "whom"],
    answer: "which",
    explanation: "「juice」は物 → which！who は人にしか使えないよ",
  },
  {
    id: "wvw05", level: "grade3", type: "fill",
    category: "who か which か？（ひっかけ）", tricky: true,
    sentence: "I met a boy _____ can swim very fast.",
    answer: "who",
    hint: "「boy」は人？ 物？ 人なら who、物なら which！",
    explanation: "boy は「人」→ who！「すごく速く泳げる男の子に会った」という意味。人の説明は who、物・動物の説明は which だよ！",
  },

  // ============================
  // what vs that（ひっかけ）
  // ============================
  {
    id: "wt01", level: "grade3", type: "multiple",
    category: "what か that か？（ひっかけ）", tricky: true,
    sentence: "This is _____ I want.",
    options: ["what", "that", "which", "who"],
    answer: "what",
    explanation: "what ＝「〜なもの」。前に名詞がないときは what！",
  },
  {
    id: "wt02", level: "grade3", type: "multiple",
    category: "what か that か？（ひっかけ）", tricky: true,
    sentence: "I know _____ you like.",
    options: ["what", "that", "which", "who"],
    answer: "what",
    explanation: "「あなたが好きなもの」。前に名詞がないときは what！",
  },
  {
    id: "wt03", level: "grade3", type: "multiple",
    category: "what か that か？（ひっかけ）", tricky: true,
    sentence: "The cake _____ she made is sweet.",
    options: ["that", "what", "who", "whose"],
    answer: "that",
    explanation: "前に「the cake」があるから that！what は前に名詞がいらないよ",
  },
  {
    id: "wt04", level: "grade3", type: "multiple",
    category: "what か that か？（ひっかけ）", tricky: true,
    sentence: "Tell me _____ you want to eat.",
    options: ["what", "that", "which", "it"],
    answer: "what",
    explanation: "「食べたいもの」→ 前に名詞なし → what！",
  },
  {
    id: "wt05", level: "grade3", type: "fill",
    category: "what か that か？（ひっかけ）", tricky: true,
    sentence: "Show me _____ you got at the store.",
    answer: "what",
    hint: "「あなたが買ったもの」→ 前に名詞はある？ない？",
    explanation: "「お店で手に入れたもの」→ 前に名詞がない！what = 「〜したもの」の意味が入っているので what を使うよ。前に the bag などがあれば that になる！",
  },
  {
    id: "wt06", level: "grade3", type: "multiple",
    category: "what か that か？（ひっかけ）", tricky: true,
    sentence: "The dog _____ I like is very cute.",
    options: ["that", "what", "which", "who"],
    answer: "that",
    explanation: "前に「the dog」があるから that！（which も OK）",
  },

  // ============================
  // 現在分詞（前置・後置修飾）
  // ============================
  {
    id: "pp01", level: "grade3", type: "multiple",
    category: "現在分詞（〜している）",
    sentence: "Look at the _____ dog over there!",
    options: ["running", "run", "ran", "runs"],
    answer: "running",
    explanation: "「走っている犬」→ 犬は自分で走っている（能動）→ running！1語だけなので名詞 dog の前に置くよ。",
  },
  {
    id: "pp02", level: "grade3", type: "multiple",
    category: "現在分詞（〜している）",
    sentence: "The _____ baby is so cute.",
    options: ["sleeping", "slept", "sleeps", "sleep"],
    answer: "sleeping",
    explanation: "「眠っている赤ちゃん」→ 赤ちゃんは自分で眠っている（能動）→ sleeping！1語だけなので baby の前に置くよ。",
  },
  {
    id: "pp03", level: "grade3", type: "fill",
    category: "現在分詞（〜している）",
    sentence: "I can hear a _____ (sing) bird.",
    answer: "singing",
    hint: "「歌っている鳥」→ sing に -ing をつけて！",
    explanation: "鳥が「自分で歌っている」→ -ing のかたち！singing 1語だけなので名詞（bird）の前に置くよ。",
  },
  {
    id: "post01", level: "grade3", type: "multiple",
    category: "現在分詞（〜している）",
    sentence: "The girl _____ the piano is my sister.",
    options: ["playing", "played", "plays", "play"],
    answer: "playing",
    explanation: "「ピアノを弾いている少女」→ 少女は自分で弾いている（能動）→ playing！the piano と続くので名詞 girl の後ろに置くよ。",
  },
  {
    id: "post02", level: "grade3", type: "multiple",
    category: "現在分詞（〜している）",
    sentence: "Do you know the boy _____ near the door?",
    options: ["standing", "stood", "stands", "stand"],
    answer: "standing",
    explanation: "「ドアの近くに立っている少年」→ 自分で立っている（能動）→ standing！near the door と続くので後ろに置くよ。",
  },
  {
    id: "post03", level: "grade3", type: "fill",
    category: "現在分詞（〜している）",
    sentence: "The woman _____ (wear) a red hat is my aunt.",
    answer: "wearing",
    hint: "「赤い帽子をかぶっている女性」→ wear に -ing をつけて！",
    explanation: "女性が「自分でかぶっている」→ wearing！a red hat と続くので、名詞（woman）の後ろに置くよ。",
  },

  // ============================
  // 過去分詞（前置・後置修飾）
  // ============================
  {
    id: "pa01", level: "grade3", type: "multiple",
    category: "過去分詞（〜された）",
    sentence: "I found a _____ window.",
    options: ["broken", "breaking", "break", "broke"],
    answer: "broken",
    explanation: "「壊れた窓」→ 窓は誰かに壊された（受け身）→ broken！break の過去分詞。1語だけなので名詞 window の前に置くよ。",
  },
  {
    id: "pa02", level: "grade3", type: "multiple",
    category: "過去分詞（〜された）",
    sentence: "I ate the _____ pizza.",
    options: ["made", "making", "make", "makes"],
    answer: "made",
    explanation: "「作られたピザ」→ ピザは誰かに作られた（受け身）→ made！make の過去分詞。1語だけなので pizza の前に置くよ。",
  },
  {
    id: "pa03", level: "grade3", type: "multiple",
    category: "過去分詞（〜された）",
    sentence: "She read a book _____ in English.",
    options: ["written", "writing", "write", "writes"],
    answer: "written",
    explanation: "「英語で書かれた本」→ 本は書かれた（受け身）→ written！in English と続くので book の後ろに置くよ。",
  },
  {
    id: "post04", level: "grade3", type: "multiple",
    category: "過去分詞（〜された）",
    sentence: "The cake _____ by mom is very good.",
    options: ["made", "making", "make", "makes"],
    answer: "made",
    explanation: "「お母さんが作ったケーキ」→ ケーキは作られた（受け身）→ made！by mom と続くので後ろに置くよ。",
  },
  {
    id: "post05", level: "grade3", type: "multiple",
    category: "過去分詞（〜された）",
    sentence: "The pictures _____ by him are beautiful.",
    options: ["taken", "taking", "take", "takes"],
    answer: "taken",
    explanation: "「彼が撮った写真」→ 写真は撮られた（受け身）→ taken！take の過去分詞。by him と続くので後ろに置くよ。",
  },

  // ============================
  // -ing vs -ed（感情動詞・ひっかけ）
  // ============================
  {
    id: "emo01", level: "grade3", type: "multiple",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "The game was very _____.",
    options: ["exciting", "excited", "excite", "excites"],
    answer: "exciting",
    explanation: "ゲーム（物）が主語 → exciting（ドキドキさせる）！人なら excited",
  },
  {
    id: "emo02", level: "grade3", type: "multiple",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "I was very _____ by the news.",
    options: ["surprised", "surprising", "surprise", "surprises"],
    answer: "surprised",
    explanation: "「私（人）」が主語 → surprised（びっくりした）！",
  },
  {
    id: "emo03", level: "grade3", type: "multiple",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "The movie was very _____.",
    options: ["boring", "bored", "bore", "bores"],
    answer: "boring",
    explanation: "映画（物）が主語 → boring（つまらない）！人なら bored",
  },
  {
    id: "emo04", level: "grade3", type: "multiple",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "She was _____ by the show.",
    options: ["surprised", "surprising", "surprise", "surprises"],
    answer: "surprised",
    explanation: "「彼女（人）」が主語 → surprised（びっくりした）！",
  },
  {
    id: "emo05", level: "grade3", type: "multiple",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "The story was very _____.",
    options: ["interesting", "interested", "interest", "interests"],
    answer: "interesting",
    explanation: "話（物）が主語 → interesting（面白い）！人なら interested",
  },
  {
    id: "emo06", level: "grade3", type: "multiple",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "He was _____ in soccer.",
    options: ["interested", "interesting", "interest", "interests"],
    answer: "interested",
    explanation: "「彼（人）」が主語で be interested in「〜に興味がある」→ interested！",
  },
  {
    id: "emo07", level: "grade3", type: "fill",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "The new park is so _____. (excite)",
    answer: "exciting",
    hint: "公園（物）が主語 → -ing と -ed どっち？",
    explanation: "公園（物・場所）が主語 → 「わくわくさせる側」→ exciting！人が主語なら excited（わくわくしている）になるよ。",
  },
  {
    id: "emo08", level: "grade3", type: "fill",
    category: "-ing と -ed どっち？（ひっかけ）", tricky: true,
    sentence: "We were all _____ by the fireworks. (surprise)",
    answer: "surprised",
    hint: "「私たち（人）」が主語 → -ing と -ed どっち？",
    explanation: "「私たち（人）」が主語 → 「びっくりした側」→ surprised！花火（物）が主語なら surprising（びっくりさせる）になるよ。",
  },

  // ============================
  // 準２級 whose
  // ============================
  {
    id: "p2_wh01", level: "pre2", type: "multiple",
    category: "関係代名詞 whose（〜の）",
    sentence: "She is the girl _____ bag is red.",
    options: ["whose", "who", "which", "that"],
    answer: "whose",
    explanation: "「〜の」という所有を表すときは whose！「whose bag ＝ その子のカバン」",
  },
  {
    id: "p2_wh02", level: "pre2", type: "multiple",
    category: "関係代名詞 whose（〜の）",
    sentence: "He is the boy _____ dog is very big.",
    options: ["whose", "who", "which", "that"],
    answer: "whose",
    explanation: "「〜の」という所有 → whose！「whose dog ＝ その子の犬」",
  },
  {
    id: "p2_wh03", level: "pre2", type: "fill",
    category: "関係代名詞 whose（〜の）",
    sentence: "I know the girl _____ name is Yuki.",
    answer: "whose",
    hint: "「名前が Yuki の女の子」→「〜の」を表す関係詞は？",
    explanation: "「名前がユキの女の子」→「〜の」という所有を表すときは whose！whose name = その子の名前。who は「〜が」、whose は「〜の」だよ。",
  },
  {
    id: "p2_wh04", level: "pre2", type: "multiple",
    category: "関係代名詞 whose（〜の）", tricky: true,
    sentence: "This is the house _____ roof is blue.",
    options: ["whose", "which", "that", "where"],
    answer: "whose",
    explanation: "物（house）でも「〜の」なら whose！「屋根が青い家」",
  },
  {
    id: "p2_wh05", level: "pre2", type: "multiple",
    category: "関係代名詞 whose（〜の）",
    sentence: "I have a friend _____ father is a doctor.",
    options: ["whose", "who", "which", "that"],
    answer: "whose",
    explanation: "「お父さんが医者の友達」→ whose！",
  },

  // ============================
  // 準２級 関係副詞 where
  // ============================
  {
    id: "p2_wr01", level: "pre2", type: "multiple",
    category: "関係副詞 where（場所）",
    sentence: "This is the park _____ I play every day.",
    options: ["where", "which", "that", "when"],
    answer: "where",
    explanation: "「場所（park）」のあとで「そこで〜する」→ where！",
  },
  {
    id: "p2_wr02", level: "pre2", type: "multiple",
    category: "関係副詞 where（場所）",
    sentence: "That is the school _____ my mom works.",
    options: ["where", "which", "who", "when"],
    answer: "where",
    explanation: "「場所（school）」のあとで「そこで〜する」→ where！",
  },
  {
    id: "p2_wr03", level: "pre2", type: "fill",
    category: "関係副詞 where（場所）",
    sentence: "I want to go to the town _____ my friend lives.",
    answer: "where",
    hint: "「友達が住んでいる町」→「場所」のあとは where！",
    explanation: "town は「場所」→「そこに友達が住んでいる」→ where！場所を説明するときは where、時を説明するときは when を使うよ。",
  },
  {
    id: "p2_wr04", level: "pre2", type: "multiple",
    category: "which か where か？（ひっかけ）", tricky: true,
    sentence: "This is the hotel _____ we stayed.",
    options: ["where", "which", "when", "whose"],
    answer: "where",
    explanation: "「泊まったホテル」→ we stayed（そこに泊まった）→ where！",
  },
  {
    id: "p2_wr05", level: "pre2", type: "multiple",
    category: "which か where か？（ひっかけ）", tricky: true,
    sentence: "The park _____ I saw was beautiful.",
    options: ["which", "where", "when", "whose"],
    answer: "which",
    explanation: "「I saw the park（公園を見た）」→ 目的語 → which！",
  },
  {
    id: "p2_wr06", level: "pre2", type: "multiple",
    category: "which か where か？（ひっかけ）", tricky: true,
    sentence: "The park _____ I run every morning is beautiful.",
    options: ["where", "which", "who", "when"],
    answer: "where",
    explanation: "「I run in the park（公園で走る）」→ 前置詞なし → where！",
  },

  // ============================
  // 準２級 関係副詞 when
  // ============================
  {
    id: "p2_wn01", level: "pre2", type: "multiple",
    category: "関係副詞 when（時）",
    sentence: "I remember the day _____ we first met.",
    options: ["when", "where", "which", "whose"],
    answer: "when",
    explanation: "「時（day）」のあとで「そのとき〜した」→ when！",
  },
  {
    id: "p2_wn02", level: "pre2", type: "fill",
    category: "関係副詞 when（時）",
    sentence: "That was the year _____ I started playing tennis.",
    answer: "when",
    hint: "「時（year）」のあとは when！",
    explanation: "year は「時」→「その年にテニスを始めた」→ when！場所なら where、時なら when だよ。",
  },
  {
    id: "p2_wn03", level: "pre2", type: "multiple",
    category: "関係副詞 when（時）",
    sentence: "Do you remember the day _____ it snowed a lot?",
    options: ["when", "where", "which", "that"],
    answer: "when",
    explanation: "「時（day）」のあとで「そのとき〜した」→ when！",
  },

  // ============================
  // 準２級 分詞構文（基礎）
  // ============================
  {
    id: "p2_pc01", level: "pre2", type: "multiple",
    category: "分詞構文（〜しながら）",
    sentence: "_____ her homework, she listened to music.",
    options: ["Doing", "Done", "Do", "Does"],
    answer: "Doing",
    explanation: "「宿題をしながら」→ 能動（自分でする）→ Doing！",
  },
  {
    id: "p2_pc02", level: "pre2", type: "multiple",
    category: "分詞構文（〜しながら）",
    sentence: "_____ TV, he fell asleep.",
    options: ["Watching", "Watched", "Watch", "Watches"],
    answer: "Watching",
    explanation: "「テレビを見ながら」→ 能動 → Watching！",
  },
  {
    id: "p2_pc03", level: "pre2", type: "multiple",
    category: "分詞構文（〜なので）",
    sentence: "_____ tired, she went to bed early.",
    options: ["Feeling", "Felt", "Feel", "Feels"],
    answer: "Feeling",
    explanation: "「疲れを感じていたので」→ 能動 → Feeling！",
  },
  {
    id: "p2_pc04", level: "pre2", type: "fill",
    category: "分詞構文（〜なので）",
    sentence: "_____ (not know) the way, he asked a woman.",
    answer: "Not knowing",
    hint: "「道を知らなかったので」→ 否定は Not を前に！",
    explanation: "「道を知らなかったので」→ 分詞構文の否定は Not + -ing！主語（he）が自分で知らない → 能動なので Not knowing。",
  },
  {
    id: "p2_pc05", level: "pre2", type: "multiple",
    category: "分詞構文（〜されて）",
    sentence: "_____ in Japan, this bag is very good.",
    options: ["Made", "Making", "Make", "Makes"],
    answer: "Made",
    explanation: "「日本で作られた（受け身）」→ 過去分詞（Made）！",
  },
  {
    id: "p2_pc06", level: "pre2", type: "multiple",
    category: "分詞構文（〜されて）",
    sentence: "_____ in 2000, the school is very old now.",
    options: ["Built", "Building", "Build", "Builds"],
    answer: "Built",
    explanation: "「2000年に建てられた（受け身）」→ 過去分詞（Built）！",
  },

  // ============================
  // 準２級 with＋分詞
  // ============================
  {
    id: "p2_wi01", level: "pre2", type: "multiple",
    category: "with＋分詞（ひっかけ）", tricky: true,
    sentence: "She sat with her eyes _____.",
    options: ["closed", "closing", "close", "closes"],
    answer: "closed",
    explanation: "目は「閉じられている」状態（受け身）→ closed！",
  },
  {
    id: "p2_wi02", level: "pre2", type: "multiple",
    category: "with＋分詞（ひっかけ）", tricky: true,
    sentence: "He slept with the light _____ on.",
    options: ["left", "leaving", "leave", "leaves"],
    answer: "left",
    explanation: "ライトが「つけっぱなし」状態（受け身）→ left！",
  },
  {
    id: "p2_wi03", level: "pre2", type: "multiple",
    category: "with＋分詞（ひっかけ）", tricky: true,
    sentence: "She was talking with her dog _____ beside her.",
    options: ["sitting", "sat", "sit", "sits"],
    answer: "sitting",
    explanation: "犬が「座っている」状態（能動）→ sitting！",
  },

  // ============================
  // 準２級 非制限用法（ひっかけ）
  // ============================
  {
    id: "p2_nr01", level: "pre2", type: "multiple",
    category: "コンマあり → that は使えない！（ひっかけ）", tricky: true,
    sentence: "My cat, _____ is white, is very cute.",
    options: ["which", "that", "who", "what"],
    answer: "which",
    explanation: "コンマのあとでは that は使えない！物（cat）→ which！",
  },
  {
    id: "p2_nr02", level: "pre2", type: "multiple",
    category: "コンマあり → that は使えない！（ひっかけ）", tricky: true,
    sentence: "My brother, _____ lives in Tokyo, is a teacher.",
    options: ["who", "that", "which", "whose"],
    answer: "who",
    explanation: "コンマのあとでは that は使えない！人（brother）→ who！",
  },
  {
    id: "p2_nr03", level: "pre2", type: "multiple",
    category: "コンマあり → that は使えない！（ひっかけ）", tricky: true,
    sentence: "She got 100 points, _____ made her very happy.",
    options: ["which", "that", "what", "who"],
    answer: "which",
    explanation: "コンマのあとで前の文全体を指すとき → which！（that は不可）",
  },

  // ============================
  // 準２級 総合
  // ============================
  {
    id: "p2_mix01", level: "pre2", type: "multiple",
    category: "総合問題",
    sentence: "The city _____ I was born is far from here.",
    options: ["where", "which", "that", "when"],
    answer: "where",
    explanation: "「生まれた場所（city）」→ where！",
  },
  {
    id: "p2_mix02", level: "pre2", type: "multiple",
    category: "総合問題",
    sentence: "I remember the day _____ I got my first dog.",
    options: ["when", "where", "which", "whose"],
    answer: "when",
    explanation: "「〜した日（day）」→ when！",
  },
  {
    id: "p2_mix03", level: "pre2", type: "multiple",
    category: "総合問題",
    sentence: "She is the girl _____ hair is very long.",
    options: ["whose", "who", "which", "that"],
    answer: "whose",
    explanation: "「女の子の髪（所有）」→ whose！",
  },
  {
    id: "p2_mix04", level: "pre2", type: "multiple",
    category: "総合問題",
    sentence: "The man _____ next to me was very tall.",
    options: ["sitting", "sat", "sit", "sits"],
    answer: "sitting",
    explanation: "「私の隣に座っていた男性」→ 能動 → sitting！",
  },
  {
    id: "p2_mix05", level: "pre2", type: "multiple",
    category: "総合問題",
    sentence: "This is the bag _____ I want to buy.",
    options: ["that", "who", "whose", "where"],
    answer: "that",
    explanation: "「物（bag）」のあと → that（which も OK）！",
  },
  {
    id: "p2_mix06", level: "pre2", type: "multiple",
    category: "総合問題",
    sentence: "Do you know the girl _____ hair is very long?",
    options: ["whose", "who", "which", "that"],
    answer: "whose",
    explanation: "「髪が長い女の子」→「〜の」は whose！",
  },
];

// ─── utils ───────────────────────────────────────────────────

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestions(level, count) {
  let pool = level === "all"
    ? QUESTIONS
    : QUESTIONS.filter((q) => q.level === level);

  const tricky = pool.filter((q) => q.tricky);
  const normal = pool.filter((q) => !q.tricky);

  const trickyTarget = Math.min(Math.ceil(count * 0.35), tricky.length);
  const normalTarget = Math.min(count - trickyTarget, normal.length);

  const selected = [
    ...shuffle(tricky).slice(0, trickyTarget),
    ...shuffle(normal).slice(0, normalTarget),
  ];

  if (selected.length < count) {
    const used = new Set(selected.map((q) => q.id));
    const rest = shuffle(pool.filter((q) => !used.has(q.id)));
    selected.push(...rest.slice(0, count - selected.length));
  }

  return shuffle(selected).slice(0, count);
}

export const LEVEL_INFO = {
  grade3: { label: "３級", emoji: "🌊", color: "#2563eb", light: "#dbeafe", border: "#93c5fd", dark: "#1d4ed8" },
  pre2:   { label: "準２級", emoji: "⚡", color: "#d97706", light: "#fef3c7", border: "#fcd34d", dark: "#b45309" },
  all:    { label: "全レベル", emoji: "🔥", color: "#db2777", light: "#fce7f3", border: "#f9a8d4", dark: "#be185d" },
};
