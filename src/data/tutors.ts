export interface Tutor {
  name: string;
  fullName?: string;
  school: string;
  university: string;
  subjects: string[];
  image?: string;
  bio?: string;
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
    subjects: ['Math AI', 'Economics', 'Japanese A', 'English B', 'TOK', 'EE', 'IA', 'CAS'],
    image: '/images/tutors/masato.jpeg',
  },
  {
    name: 'CYNTHIA',
    fullName: 'Momoko C. Reames',
    school: '三田国際学園高等学校',
    university: '立教大学 GLAP',
    subjects: ['Japanese', 'English'],
    image: '/images/tutors/cynthia.jpeg',
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
    image: '/images/tutors/ai-w.jpg',
  },
];
