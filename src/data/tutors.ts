export interface Tutor {
  name: string;
  fullName?: string;
  school: string;
  university: string;
  subjects: string[];
  image?: string;
  bio?: string;
  funFacts?: { food?: string; hobby?: string; place?: string; dream?: string };
}

export const tutors: Tutor[] = [
  {
    name: 'AI.O',
    fullName: '折井美紀',
    school: '玉川学園IB',
    university: 'テンプル大学ジャパンキャンパス',
    subjects: ['English', 'History', 'Japanese', 'MYP科目'],
    image: '/images/tutors/ai-o.jpg',
  },
  {
    name: 'MASATO',
    school: '玉川学園IB',
    university: '立教大学 経営学部',
    subjects: ['Math AI', 'Economics', 'Business Management', 'Japanese A', 'English B', 'TOK', 'EE', 'IA', 'CAS'],
    image: '/images/tutors/masato.jpeg',
    bio: 'IBでは主体的に学ぶ力が求められますが、その分、一人で抱え込んでしまうことも少なくありません。私たちは思考整理や課題へのアプローチをサポートし、皆さんが本来の力を最大限発揮できるよう伴走します！',
    funFacts: { food: 'アジの刺身', hobby: 'テニス', place: 'Black Diamond', dream: 'グローバル人材として活躍すること' },
  },
  {
    name: 'CYNTHIA',
    fullName: 'Momoko C. Reames',
    school: '三田国際学園高等学校',
    university: '立教大学 GLAP',
    subjects: ['Japanese A', 'English A', 'English B'],
    image: '/images/tutors/cynthia.jpeg',
    bio: '難しくても大丈夫！一歩一歩、着実に進んでいきましょう。発音指導もお任せください！',
    funFacts: { food: 'お寿司', hobby: '映画鑑賞・読書・写真', place: '本屋', dream: '教育者やコンサルなどの人を支援する仕事' },
  },
  {
    name: 'SUZU',
    fullName: 'Kamimura',
    school: '玉川学園IB',
    university: 'University of Sydney',
    subjects: ['Math AA', 'ESS', 'Economics'],
    image: '/images/tutors/suzu.jpeg',
  },
  {
    name: 'LUKA',
    fullName: 'Takagi',
    school: '横浜国際高校IB',
    university: '京都工芸繊維大学 デザイン建築学課程',
    subjects: ['Math AA', 'Physics', 'History', 'Chemistry', 'TOK'],
    image: '/images/tutors/luka.jpg',
  },
  {
    name: 'AI.W',
    school: '玉川学園IB',
    university: '立教大学 GLAP',
    subjects: ['Japanese', 'English', 'Economics', 'ESS', 'Art'],
  },
];
