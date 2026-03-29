export interface IBerType {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  color: string;
}

export const iberTypes: IBerType[] = [
  {
    id: 'inquirer',
    name: 'Inquirer',
    nameJa: '探究する人',
    description: '好奇心旺盛で、自ら問いを立てて学びを深めるタイプ。リサーチやEEで力を発揮します。',
    color: '#F9A825',
  },
  {
    id: 'knowledgeable',
    name: 'Knowledgeable',
    nameJa: '知識のある人',
    description: '幅広い知識を持ち、それを活用して問題解決に挑むタイプ。TOKで深い議論ができます。',
    color: '#7B1FA2',
  },
  {
    id: 'thinker',
    name: 'Thinker',
    nameJa: '考える人',
    description: '論理的思考が得意で、複雑な問題を分析し解決策を導くタイプ。数学やサイエンスが得意。',
    color: '#1565C0',
  },
  {
    id: 'communicator',
    name: 'Communicator',
    nameJa: 'コミュニケーションができる人',
    description: '自分の考えを効果的に伝え、他者の意見にも耳を傾けるタイプ。プレゼンやIOが得意。',
    color: '#FF7043',
  },
  {
    id: 'principled',
    name: 'Principled',
    nameJa: '信念をもつ人',
    description: '誠実で倫理観が強く、正しいことのために行動するタイプ。CAS活動で力を発揮します。',
    color: '#5D4037',
  },
  {
    id: 'open-minded',
    name: 'Open-minded',
    nameJa: '心を開く人',
    description: '異なる文化や価値観を理解し、尊重するタイプ。国際的な視野でTOKに取り組めます。',
    color: '#8D6E63',
  },
  {
    id: 'caring',
    name: 'Caring',
    nameJa: '思いやりのある人',
    description: '他者への共感力が高く、社会貢献に情熱を持つタイプ。CASプロジェクトで真価を発揮。',
    color: '#D81B60',
  },
  {
    id: 'risk-taker',
    name: 'Risk-taker',
    nameJa: '挑戦する人',
    description: '新しいことに果敢に挑戦し、失敗を恐れないタイプ。難しい科目や課題にも積極的。',
    color: '#F4511E',
  },
  {
    id: 'balanced',
    name: 'Balanced',
    nameJa: 'バランスのとれた人',
    description: '学業・課外活動・健康のバランスを大切にするタイプ。IBの多忙なスケジュールを上手に管理。',
    color: '#7CB342',
  },
  {
    id: 'reflective',
    name: 'Reflective',
    nameJa: '振り返りができる人',
    description: '自分の学びや行動を振り返り、成長につなげるタイプ。EEやIAの改善プロセスが得意。',
    color: '#5E35B1',
  },
];
