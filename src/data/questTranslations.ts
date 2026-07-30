import type { Quest } from './quests';
import type { Ontology } from './ontology';

// zh-CN localization for quest narrative content.
// - Static quests (quests.ts) are covered by the ZH overlay keyed by id.
// - Dynamically generated quests (generateQuestsForOntology) are reconstructed
//   at render time from their structured data + the current ontology, so they
//   translate correctly for ANY ontology and update instantly on language switch.
// English id/targetId values are kept intact (logic-critical); only the
// user-facing prose is translated.

type StepTr = { instruction: string; hint?: string };

// ---- Static quest overlay (quests.ts) -------------------------------------
const ZH: Record<string, {
  title: string;
  description: string;
  badge: string;
  steps: Record<string, StepTr>;
}> = {
  'quest-1': {
    title: '认识实体',
    description: '通过探索各类实体类型，了解 Fourth Coffee 本体的核心构成模块。',
    badge: '实体探索者',
    steps: {
      'step-1-1': { instruction: '点击 Customer（客户）实体，了解客户的概念', hint: '在图谱中寻找 👤 图标' },
      'step-1-2': { instruction: '接着探索 Product（产品）实体', hint: '找到 ☕ 咖啡杯图标' },
      'step-1-3': { instruction: '最后，查看 Store（门店）实体', hint: '定位 🏪 门店图标' },
    },
  },
  'quest-2': {
    title: '咖啡豆之旅',
    description: '沿着关系链，追溯一颗咖啡豆从供应商到客户的完整旅程。',
    badge: '线索侦探',
    steps: {
      'step-2-1': { instruction: '从 Supplier（供应商）实体开始 —— 咖啡豆的源头', hint: '找到 🚚 卡车图标' },
      'step-2-2': { instruction: '沿着 "sourcedFrom"（采购自）关系前往 Product（产品）', hint: '点击连接 Supplier 与 Product 的连线' },
      'step-2-3': { instruction: '探索 "contains"（包含）关系，了解产品如何出现在订单中', hint: '查看 Order 与 Product 之间的连接' },
      'step-2-4': { instruction: '最后，查看 "places"（下单）关系，了解是谁下的订单', hint: '找到从 Customer 指向 Order 的关系' },
    },
  },
  'quest-3': {
    title: '供应链导航',
    description: '了解货运如何把供应商与门店连接起来。',
    badge: '供应链达人',
    steps: {
      'step-3-1': { instruction: '点击 Shipment（货运）实体', hint: '找到 📦 包裹图标' },
      'step-3-2': { instruction: '探索 "sentBy"（由…发出）关系前往 Supplier（供应商）', hint: '查看货运的来源' },
      'step-3-3': { instruction: '沿着 "deliveredTo"（送达至）关系前往 Store（门店）', hint: '查看货运的去向' },
    },
  },
  'quest-4': {
    title: '查询探索',
    description: '学习如何使用自然语言提出查询问题。',
    badge: '查询向导',
    steps: {
      'step-4-1': { instruction: '试着提问："Show me all Gold tier customers"（显示所有黄金等级客户）', hint: '在查询工作台中输入' },
      'step-4-2': { instruction: '接着提问："Which products come from Ethiopia?"（哪些产品来自埃塞俄比亚？）', hint: '使用自然语言按产地筛选' },
      'step-4-3': { instruction: '尝试一个遍历查询："What orders did Arif Ramadhan place?"（Arif Ramadhan 下了哪些订单？）', hint: '这会沿着 Customer → Order 关系进行查询' },
    },
  },
  'quest-5': {
    title: '数据绑定探索',
    description: '了解本体概念如何连接到真实的数据平台来源。',
    badge: '绑定专家',
    steps: {
      'step-5-1': { instruction: '选择 Customer（客户）实体并查看其数据绑定', hint: '在检视器中找到 "Data Bindings"（数据绑定）区域' },
      'step-5-2': { instruction: '检查 Customer 的属性如何映射到源数据列', hint: '注意 "name" 映射到源中的 "full_name"' },
      'step-5-3': { instruction: '查看 Product（产品）实体的绑定，记录其来源与表', hint: '查看 Product 下方的 Data Bindings 卡片' },
    },
  },
};

const DIFFICULTY_ZH: Record<string, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

const CATEGORY_ZH: Record<string, string> = {
  exploration: '探索',
  traversal: '遍历',
  query: '查询',
};

const GENERATED_BADGE_ZH: Record<string, string> = {
  'quest-1': '实体探索者',
  'quest-2': '连接大师',
  'quest-3': '枢纽侦探',
  'quest-4': '数据学者',
  'quest-5': '查询向导',
  'quest-6': '路径先锋',
};

// ---- Generated quest reconstructor ----------------------------------------
function ent(o: Ontology | undefined, id?: string) {
  return o?.entityTypes.find((e) => e.id === id);
}
function rel(o: Ontology | undefined, id?: string) {
  return o?.relationships.find((r) => r.id === id);
}

function localizeGeneratedQuest(quest: Quest, o: Ontology | undefined): Quest {
  const oName = o?.name ?? '';
  switch (quest.id) {
    case 'quest-1': {
      const steps = quest.steps.map((s) => {
        const e = ent(o, s.targetId);
        return { ...s, instruction: `点击 ${e?.name ?? ''} 实体，了解它的属性`, hint: `在图谱中查找 ${e?.icon ?? ''} 图标` };
      });
      return { ...quest, title: '认识实体', description: `通过探索各类实体类型，了解 ${oName} 本体的核心构成模块。`, reward: { ...quest.reward, badge: GENERATED_BADGE_ZH['quest-1'] }, steps };
    }
    case 'quest-2': {
      const steps = quest.steps.map((s) => {
        if (s.targetType === 'entity') {
          const e = ent(o, s.targetId);
          return { ...s, instruction: `从 ${e?.name ?? ''} 实体开始`, hint: `找到 ${e?.icon ?? ''} 图标` };
        }
        const r = rel(o, s.targetId);
        const toE = r ? ent(o, r.to) : null;
        return { ...s, instruction: `沿着 "${r?.name ?? ''}" 关系${toE ? `前往 ${toE.name}` : ''}`, hint: `点击标注为 "${r?.name ?? ''}" 的关系连线` };
      });
      return { ...quest, title: '关系导航', description: `梳理 ${oName} 中各实体之间的连接关系。`, reward: { ...quest.reward, badge: GENERATED_BADGE_ZH['quest-2'] }, steps };
    }
    case 'quest-3': {
      const hubId = quest.steps[0]?.targetId;
      const steps = quest.steps.map((s, i) => {
        if (i === 0) {
          const e = ent(o, s.targetId);
          const count = o ? o.relationships.filter((r) => r.from === e?.id || r.to === e?.id).length : 0;
          return { ...s, instruction: `找到 ${e?.name ?? ''} 实体 —— 它是本本体中连接最多的实体！`, hint: `${e?.name ?? ''} 共有 ${count} 条连接` };
        }
        const r = rel(o, s.targetId);
        const hubName = ent(o, hubId)?.name ?? '';
        const fromHub = r ? r.from === hubId : false;
        return { ...s, instruction: `探索 "${r?.name ?? ''}" 关系`, hint: `该关系${fromHub ? '源自' : '连接到'} ${hubName}` };
      });
      return { ...quest, title: '寻找枢纽', description: `找出 ${oName} 中连接最多的实体。`, reward: { ...quest.reward, badge: GENERATED_BADGE_ZH['quest-3'] }, steps };
    }
    case 'quest-4': {
      const steps = quest.steps.map((s) => {
        if (s.targetType === 'entity') {
          const e = ent(o, s.targetId);
          return { ...s, instruction: `选中 ${e?.name ?? ''} 实体，查看其 ${e?.properties?.length ?? 0} 个属性`, hint: '在检视器面板中查看属性详情' };
        }
        const propName = s.targetId ?? '';
        const e = o?.entityTypes.find((en) => en.properties?.some((p) => p.name === propName));
        return { ...s, instruction: `在 ${e?.name ?? ''} 中找到标识符属性 "${propName}"`, hint: '留意标记标识符的钥匙图标 🔑' };
      });
      return { ...quest, title: '属性侦探', description: '了解定义每个实体类型的属性。', reward: { ...quest.reward, badge: GENERATED_BADGE_ZH['quest-4'] }, steps };
    }
    case 'quest-5': {
      const es = o?.entityTypes ?? [];
      const e0 = es[0];
      const e1 = es[1];
      const r0 = o?.relationships?.[0];
      const fromE = r0 ? ent(o, r0.from) : null;
      const toE = r0 ? ent(o, r0.to) : null;
      const steps = quest.steps.map((s) => {
        if (s.id === 'step-5-1') return { ...s, instruction: `试着问："${e0?.name ?? '某个实体'} 是什么？"`, hint: '在「自然语言查询」工作台中输入' };
        if (s.id === 'step-5-2') return { ...s, instruction: `再问："${e0?.name} 与 ${e1?.name} 之间有什么关系？"`, hint: '探索实体之间的关系' };
        return {
          ...s,
          instruction: fromE && toE ? `试着做一个遍历查询："${fromE.name} 如何连接到 ${toE.name}？"` : `试着做一个关于 "${r0?.name ?? ''}" 关系的遍历查询`,
          hint: `这会沿着 "${r0?.name ?? ''}" 关系路径进行`,
        };
      });
      return { ...quest, title: '查询探索', description: '学习如何使用自然语言提出查询问题。', reward: { ...quest.reward, badge: GENERATED_BADGE_ZH['quest-5'] }, steps };
    }
    case 'quest-6': {
      const entSteps = quest.steps.filter((s) => s.targetType === 'entity');
      const relSteps = quest.steps.filter((s) => s.targetType === 'relationship');
      const es = entSteps.map((s) => ent(o, s.targetId));
      const rs = relSteps.map((s) => rel(o, s.targetId));
      const steps = quest.steps.map((s) => {
        if (s.targetType === 'entity') {
          const idx = entSteps.indexOf(s);
          const en = es[idx];
          if (idx === 0) return { ...s, instruction: `从 ${en?.name ?? ''} 开始你的旅程`, hint: `找到 ${en?.icon ?? ''} 图标` };
          if (idx === entSteps.length - 1) return { ...s, instruction: `你做到了！探索 ${en?.name ?? ''}`, hint: `旅程完成！${en?.icon ?? ''}` };
          return { ...s, instruction: `探索 ${en?.name ?? ''} 实体`, hint: '这是你旅程的中途' };
        }
        const idx = relSteps.indexOf(s);
        const r = rs[idx];
        const nextE = es[idx + 1];
        if (idx === relSteps.length - 1) return { ...s, instruction: `继续经由 "${r?.name ?? ''}" 关系前往 ${nextE?.name ?? ''}`, hint: '还剩最后一跳！' };
        return { ...s, instruction: `沿着 "${r?.name ?? ''}" 关系前往 ${nextE?.name ?? ''}`, hint: '点击连接边' };
      });
      const first = es[0]?.name ?? '';
      const last = es[es.length - 1]?.name ?? '';
      return { ...quest, title: '完整旅程', description: `从 ${first} 一路遍历到 ${last}。`, reward: { ...quest.reward, badge: GENERATED_BADGE_ZH['quest-6'] }, steps };
    }
    default:
      return quest;
  }
}

export function localizeQuest(quest: Quest, lang?: string, ontology?: Ontology): Quest {
  if (!lang?.startsWith('zh')) return quest;
  if (quest.source === 'generated') return localizeGeneratedQuest(quest, ontology);
  const tr = ZH[quest.id];
  if (!tr) return quest;
  return {
    ...quest,
    title: tr.title,
    description: tr.description,
    reward: { ...quest.reward, badge: tr.badge },
    steps: quest.steps.map((s) => {
      const st = tr.steps[s.id];
      return st ? { ...s, instruction: st.instruction, hint: st.hint ?? s.hint } : s;
    }),
  };
}

export function localizeDifficulty(d: string, lang?: string): string {
  return lang?.startsWith('zh') ? (DIFFICULTY_ZH[d] ?? d) : d;
}

export function localizeCategory(c: string, lang?: string): string {
  return lang?.startsWith('zh') ? (CATEGORY_ZH[c] ?? c) : c;
}
