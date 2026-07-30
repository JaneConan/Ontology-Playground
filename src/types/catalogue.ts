import type { Ontology, DataBinding } from '../data/ontology';

export interface CatalogueEntry {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: string;
  tags: string[];
  author: string;
  source: 'official' | 'community' | 'external';
  ontology: Ontology;
  bindings: DataBinding[];
}

export interface Catalogue {
  generatedAt: string;
  count: number;
  entries: CatalogueEntry[];
}

export const CATEGORY_LABELS: Record<string, string> = {
  retail: 'Retail',
  healthcare: 'Healthcare',
  finance: 'Finance',
  manufacturing: 'Manufacturing',
  education: 'Education',
  food: 'Food & Beverage',
  media: 'Media & Publishing',
  events: 'Events & Entertainment',
  technology: 'Technology',
  general: 'General',
  school: 'Ontology School: Get Started',
  fibo: 'FIBO (EDM Council)',
};

export const CATEGORY_LABELS_ZH: Record<string, string> = {
  retail: '零售',
  healthcare: '医疗健康',
  finance: '金融',
  manufacturing: '制造',
  education: '教育',
  food: '食品饮料',
  media: '媒体与出版',
  events: '活动与娱乐',
  technology: '科技',
  general: '通用',
  school: '本体学院：入门',
  fibo: 'FIBO（EDM 委员会）',
};

// Resolve a human-readable category label for the active UI language.
export function categoryLabel(code: string, lang?: string): string {
  if (lang?.startsWith('zh')) return CATEGORY_LABELS_ZH[code] ?? code;
  return CATEGORY_LABELS[code] ?? code;
}

export const CATEGORY_COLORS: Record<string, string> = {
  retail: '#0078D4',
  healthcare: '#D13438',
  finance: '#107C10',
  manufacturing: '#FFB900',
  education: '#8764B8',
  food: '#E74C3C',
  media: '#9B59B6',
  events: '#00A9E0',
  technology: '#008272',
  general: '#6B7280',
  school: '#E67E22',
  fibo: '#1A5276',
};
