export interface GlossaryTerm {
  en: string;
  ja: string;
  abbr?: string;
  definition: string;
  category: string;
  link?: string;
}

export const glossaryCategories = [
  'IB Core',
  'DP Core',
  'DP Subjects',
  'Assessment',
  'MYP',
  'PYP',
  'General',
] as const;

export type GlossaryCategory = (typeof glossaryCategories)[number];

export const glossaryTerms: GlossaryTerm[] = [
  // ── IB Core ──
  {
    en: 'International Baccalaureate',
    ja: '国際バカロレア',
    abbr: 'IB',
    definition: 'スイス・ジュネーブに本部を置く国際教育プログラム。PYP・MYP・DPの3つのプログラムで構成され、世界160カ国以上の学校で採用されている。',
    category: 'IB Core',
  },
  {
    en: 'Primary Years Programme',
    ja: '初等教育プログラム',
    abbr: 'PYP',
    definition: '3歳から12歳を対象としたIBの初等教育プログラム。教科横断的な探究学習を通じて、生徒の好奇心と学びへの意欲を育てる。',
    category: 'IB Core',
    link: '/ib-pyp/',
  },
  {
    en: 'Middle Years Programme',
    ja: '中等教育プログラム',
    abbr: 'MYP',
    definition: '11歳から16歳を対象としたIBの中等教育プログラム。8つの教科群と学際的な学習を通じ、学問的・社会的なスキルを発展させる。',
    category: 'IB Core',
    link: '/ib-myp/',
  },
  {
    en: 'Diploma Programme',
    ja: 'ディプロマプログラム',
    abbr: 'DP',
    definition: '16歳から19歳を対象としたIBの高等教育プログラム。6科目+コア3要素（TOK・EE・CAS）を2年間で履修し、最大45点のスコアで評価される。',
    category: 'IB Core',
    link: '/ib-dp/',
  },
  {
    en: 'Learner Profile',
    ja: '学習者像',
    definition: 'IBが掲げる10の理想的な学習者の特性。「探究する人」「知識のある人」「考える人」など、IB教育全体の基盤となる価値観。',
    category: 'IB Core',
    link: '/ib-learner-profile/',
  },

  // ── DP Core ──
  {
    en: 'Theory of Knowledge',
    ja: '知の理論',
    abbr: 'TOK',
    definition: '「私たちはどのように知識を得るのか？」を探究する哲学的な科目。エッセイ（1,600語）と展示（Exhibition）の2つの評価がある。DP必修コア科目。',
    category: 'DP Core',
  },
  {
    en: 'Extended Essay',
    ja: '課題論文',
    abbr: 'EE',
    definition: '生徒が自ら選んだテーマについて執筆する4,000語の学術論文。大学レベルの研究スキルを身につけるためのDP必修コア要素。',
    category: 'DP Core',
  },
  {
    en: 'Creativity, Activity, Service',
    ja: '創造性・活動・奉仕',
    abbr: 'CAS',
    definition: '創造的な活動、身体的な活動、社会奉仕の3分野でバランスよく経験を積むDP必修コア要素。18カ月以上にわたり活動を記録する。',
    category: 'DP Core',
  },
  {
    en: 'Internal Assessment',
    ja: '内部評価',
    abbr: 'IA',
    definition: '各科目ごとに実施される学校内部での評価。実験レポート・分析レポート・口頭発表など科目によって形式が異なり、最終スコアの一定割合を占める。',
    category: 'DP Core',
  },

  // ── DP Subjects ──
  {
    en: 'Group 1: Studies in Language and Literature',
    ja: '言語と文学',
    definition: 'DP科目グループ1。母国語または最も得意な言語での文学・言語分析を学ぶ。文学作品の批評的な分析力を養う。',
    category: 'DP Subjects',
  },
  {
    en: 'Group 2: Language Acquisition',
    ja: '言語習得',
    definition: 'DP科目グループ2。第二言語の習得を目的とする科目群。Language B（既習言語）とLanguage ab initio（初習言語）がある。',
    category: 'DP Subjects',
  },
  {
    en: 'Group 3: Individuals and Societies',
    ja: '個人と社会',
    definition: 'DP科目グループ3。歴史・経済・地理・心理学・ビジネスなど社会科学系の科目群。批判的思考と分析力を培う。',
    category: 'DP Subjects',
  },
  {
    en: 'Group 4: Sciences',
    ja: '理科',
    definition: 'DP科目グループ4。物理・化学・生物・環境システムなど自然科学系の科目群。実験やIA（内部評価）が重要な評価要素。',
    category: 'DP Subjects',
  },
  {
    en: 'Group 5: Mathematics',
    ja: '数学',
    definition: 'DP科目グループ5。Mathematics: Analysis and Approaches（AA）とMathematics: Applications and Interpretation（AI）の2コースがある。',
    category: 'DP Subjects',
  },
  {
    en: 'Group 6: The Arts',
    ja: '芸術',
    definition: 'DP科目グループ6。ビジュアルアーツ・音楽・演劇・映画など芸術系の科目群。グループ6の代わりに他グループの追加科目を選択することも可能。',
    category: 'DP Subjects',
  },
  {
    en: 'Higher Level',
    ja: '上級レベル',
    abbr: 'HL',
    definition: 'DP科目の上級レベル。標準レベル（SL）より授業時間が多く（240時間）、より深い内容を扱う。3~4科目をHLで選択する。',
    category: 'DP Subjects',
  },
  {
    en: 'Standard Level',
    ja: '標準レベル',
    abbr: 'SL',
    definition: 'DP科目の標準レベル。授業時間は150時間。HLと組み合わせて合計6科目を履修する。',
    category: 'DP Subjects',
  },

  // ── Assessment ──
  {
    en: 'IB Score',
    ja: 'IBスコア',
    definition: 'DPの最終スコア。6科目各7点（計42点）+コアボーナス3点の合計45点満点。24点以上でディプロマ取得。世界平均は約30点前後。',
    category: 'Assessment',
  },
  {
    en: 'Predicted Grade',
    ja: '予測スコア',
    definition: '学校の教師が最終試験前に予測する生徒のスコア。大学出願時に使用される重要な数値で、IA・模試・授業の成績を基に決定される。',
    category: 'Assessment',
  },
  {
    en: 'Final Exam',
    ja: '最終試験',
    definition: 'DP最終年度の5月（北半球）または11月（南半球）に実施される外部評価試験。各科目Paper 1・2・3があり、世界共通の問題で実施される。',
    category: 'Assessment',
  },
  {
    en: 'Mark Scheme',
    ja: '採点基準',
    definition: 'IBが公開する試験の採点ガイドライン。各問題に対してどのような回答でどの程度の点数が与えられるかが詳細に定められている。',
    category: 'Assessment',
  },
  {
    en: 'Grade Boundary',
    ja: '成績区分',
    definition: '各科目の点数を1~7のグレードに変換する際の境界値。試験ごとに調整され、IBOが試験後に公表する。',
    category: 'Assessment',
  },
  {
    en: 'Moderation',
    ja: '調整（モデレーション）',
    definition: 'IAの採点が学校間で公平になるようIBOが行う調整プロセス。サンプルを抽出して外部採点者が再評価し、必要に応じてスコアを調整する。',
    category: 'Assessment',
  },
  {
    en: 'External Assessment',
    ja: '外部評価',
    abbr: 'EA',
    definition: 'IBOが管理する試験による評価。最終試験（Paper 1・2・3）が主で、科目成績の大部分を占める。',
    category: 'Assessment',
  },
  {
    en: 'Criterion-Referenced Assessment',
    ja: '規準参照評価',
    definition: 'IB独自の評価方式。他の生徒との相対評価ではなく、あらかじめ定められた評価規準に基づいて到達度を測る。',
    category: 'Assessment',
  },

  // ── MYP ──
  {
    en: 'Personal Project',
    ja: 'パーソナルプロジェクト',
    definition: 'MYP最終年度に取り組む個人研究プロジェクト。自分が情熱を持つテーマを選び、プロセスジャーナルに記録しながらゴールを達成する。',
    category: 'MYP',
  },
  {
    en: 'Approaches to Learning',
    ja: '学習のアプローチ',
    abbr: 'ATL',
    definition: 'MYPの5つの学習スキル群：コミュニケーション・社会性・自己管理・リサーチ・思考スキル。全教科を通じて育成される。',
    category: 'MYP',
  },
  {
    en: 'Global Contexts',
    ja: 'グローバルな文脈',
    definition: 'MYPの学習を現実世界と結びつける6つのテーマ。「アイデンティティと関係性」「時間・空間・場所の中での方向づけ」などがある。',
    category: 'MYP',
  },
  {
    en: 'Service as Action',
    ja: '行動としての奉仕',
    definition: 'MYPで生徒が地域社会に貢献する活動。学んだことを実際の行動に移し、社会的責任と国際感覚を育てる。DPのCASに接続する概念。',
    category: 'MYP',
  },
  {
    en: 'eAssessment',
    ja: '電子評価',
    definition: 'MYP最終年度にオンラインで実施される評価。2-hour on-screen examで、思考力・分析力を測る。学校の選択制で導入される。',
    category: 'MYP',
  },
  {
    en: 'Interdisciplinary Unit',
    ja: '学際的単元',
    abbr: 'IDU',
    definition: 'MYPで2つ以上の教科を横断して学ぶ単元。異なる分野の知識を統合し、複雑な問題に取り組む力を育てる。',
    category: 'MYP',
  },
  {
    en: 'Community Project',
    ja: 'コミュニティプロジェクト',
    definition: 'MYP3年目または4年目に取り組む地域貢献プロジェクト。Service as Actionの一環として、チームで社会課題に取り組む。',
    category: 'MYP',
  },

  // ── PYP ──
  {
    en: 'Exhibition',
    ja: 'エキシビション',
    definition: 'PYP最終学年で行う集大成の探究活動。グループで社会的課題を調査し、成果を発表する。PYPの学びの総まとめ。',
    category: 'PYP',
  },
  {
    en: 'Transdisciplinary Themes',
    ja: '教科横断テーマ',
    definition: 'PYPの6つの探究テーマ。「私たちは誰なのか」「世界はどのような仕組みになっているのか」など、教科の枠を超えた探究の核となる。',
    category: 'PYP',
  },
  {
    en: 'Inquiry-based Learning',
    ja: '探究型学習',
    definition: '生徒自身が疑問を持ち、調べ、考え、行動するPYPの中心的な学習アプローチ。教師は知識を教え込むのではなく、探究の導き手となる。',
    category: 'PYP',
  },
  {
    en: 'Unit of Inquiry',
    ja: '探究の単元',
    abbr: 'UOI',
    definition: 'PYPの各学年で取り組む6つの探究単元。教科横断テーマに基づき、数週間かけて一つのテーマを深く探究する。',
    category: 'PYP',
  },
  {
    en: 'Programme of Inquiry',
    ja: '探究プログラム',
    abbr: 'POI',
    definition: 'PYP各学年の6つの探究単元を一覧にした学校全体のカリキュラムマップ。教科横断テーマとの対応を示す。',
    category: 'PYP',
  },
  {
    en: 'Agency',
    ja: 'エージェンシー（主体性）',
    definition: 'PYPで重視される、生徒が自らの学びに主体的に関わる姿勢。「声（voice）」「選択（choice）」「責任（ownership）」の3要素で構成される。',
    category: 'PYP',
  },

  // ── General ──
  {
    en: 'IB World School',
    ja: 'IBワールドスクール',
    definition: 'IBOの認定を受けてIBプログラムを提供する学校。世界で5,700校以上、日本国内では約200校が認定されている。',
    category: 'General',
  },
  {
    en: 'International Baccalaureate Organization',
    ja: '国際バカロレア機構',
    abbr: 'IBO',
    definition: 'IBプログラムを開発・運営する国際教育団体。1968年設立、本部はスイス・ジュネーブ。カリキュラム設計・試験実施・学校認定を行う。',
    category: 'General',
  },
  {
    en: 'Diploma',
    ja: 'ディプロマ',
    definition: 'DPの全要件を満たした生徒に授与される国際的な卒業資格。24点以上の取得が条件。世界中の大学入学資格として広く認められている。',
    category: 'General',
  },
  {
    en: 'Bilingual Diploma',
    ja: 'バイリンガルディプロマ',
    definition: '2つの異なる言語でGroup 1科目を履修し、条件を満たした場合に授与される特別なディプロマ。高い言語能力の証明となる。',
    category: 'General',
  },
  {
    en: 'Dual Language',
    ja: 'デュアルランゲージ',
    definition: '2つの言語で授業を行う教育形態。IB校の多くが英語と現地語のデュアルランゲージで運営されている。',
    category: 'General',
  },
  {
    en: 'Academic Honesty',
    ja: 'アカデミック・オネスティ',
    definition: 'IBが厳格に求める学問的誠実さ。剽窃・不正行為は厳しく処分され、ディプロマ取消になる場合もある。全生徒が遵守すべき基本原則。',
    category: 'General',
  },
  {
    en: 'Criterion',
    ja: '評価規準',
    definition: 'IBの評価で使用される基準項目。各科目・各評価課題に複数のCriterionが設定され、それぞれ0~8点などで段階評価される。',
    category: 'General',
  },
  {
    en: 'Rubric',
    ja: 'ルーブリック',
    definition: '各評価規準の達成レベルを具体的に記述した評価表。生徒は事前にルーブリックを確認することで、求められる水準を把握できる。',
    category: 'General',
  },
  {
    en: 'Reflection',
    ja: '振り返り',
    definition: 'IB教育全体で重視される自己省察のプロセス。CASやパーソナルプロジェクトなど多くの場面で、学びと成長を振り返ることが求められる。',
    category: 'General',
  },
  {
    en: 'Viva Voce',
    ja: '口頭試問',
    definition: 'EE完成後に行われる担当教師との面談。研究プロセスを振り返り、学んだことを口頭で説明する。評価の一部として点数化される。',
    category: 'General',
  },
  {
    en: 'Research Question',
    ja: 'リサーチクエスチョン',
    abbr: 'RQ',
    definition: 'EEやIAで設定する研究の問い。明確で焦点の絞られたRQを立てることが、質の高い研究の出発点となる。',
    category: 'General',
  },
  {
    en: 'Bibliography',
    ja: '参考文献',
    definition: '論文やレポートで引用・参照した文献の一覧。IBではアカデミック・オネスティの観点から正確な文献引用が必須。',
    category: 'General',
  },
  {
    en: 'Turnitin',
    ja: '剽窃チェックツール',
    definition: '多くのIB校が導入している文章の類似性チェックツール。生徒の提出物を既存のデータベースと照合し、剽窃の有無を検出する。',
    category: 'General',
  },
  {
    en: 'ManageBac',
    ja: 'IB学校管理システム',
    definition: '世界中のIB校で広く使われている学習管理プラットフォーム。課題の提出・成績管理・CASの記録・スケジュール管理などをオンラインで行う。',
    category: 'General',
  },
  {
    en: 'Approaches to Teaching',
    ja: '指導のアプローチ',
    abbr: 'ATT',
    definition: 'IB教育の6つの指導原則。「探究に基づく」「概念に焦点を当てた」「文脈の中での」「協働的な」「差別化された」「評価情報に基づく」指導を重視する。',
    category: 'General',
  },
  {
    en: 'Concurrency of Learning',
    ja: '学習の同時性',
    definition: 'IB独自の教育理念。生徒が複数の科目を同時並行で学ぶことで、知識や思考の相互連関を体験し、総合的な理解を深める。',
    category: 'General',
  },
  {
    en: 'International Mindedness',
    ja: '国際的な視野',
    definition: 'IB教育が育成を目指す核心的な資質。多様な文化・価値観を理解し尊重する姿勢で、全プログラムの学習に通底する。',
    category: 'General',
  },
  {
    en: 'Coordinator',
    ja: 'コーディネーター',
    definition: '学校でIBプログラムの運営を統括する教職員。DPコーディネーター・MYPコーディネーターなど、プログラムごとに配置される。',
    category: 'General',
  },
  {
    en: 'Subject Guide',
    ja: 'サブジェクトガイド',
    definition: 'IBOが各科目について発行する公式の指導要領文書。シラバス・評価基準・指導方法が詳細に記載されている。教師と生徒の必携資料。',
    category: 'General',
  },
  {
    en: 'Process Journal',
    ja: 'プロセスジャーナル',
    definition: 'MYPのパーソナルプロジェクトやコミュニティプロジェクトで使う活動記録。計画・実行・振り返りの過程を継続的に記録する。',
    category: 'General',
  },
];
