// 中文覆盖层: 仅作用于「摘要」页渲染, 不修改全局 currentOntology, 避免影响图谱/设计器/查询引擎。
// 数据本体 (Fourth Coffee) 的英文名称/描述为示例数据, 按 id/属性名映射到中文展示。
import type { Ontology } from './ontology';

const ZH_ONTOLOGY_NAME = '第四咖啡';
const ZH_ONTOLOGY_DESC =
  '一个示例本体，描述现代咖啡连锁店及其供应商、商品、门店、客户与订单。';

const ZH_ENTITY: Record<string, { name: string; description: string }> = {
  customer: { name: '客户', description: '在我们的门店购买咖啡商品的人' },
  order: { name: '订单', description: '客户在门店的一次购买交易' },
  product: { name: '商品', description: '可供销售的咖啡产品或商品' },
  store: { name: '门店', description: '实体咖啡店位置' },
  supplier: { name: '供应商', description: '咖啡豆或货物的供应商伙伴' },
  shipment: { name: '货运', description: '从供应商发往门店的货物配送' },
};

const ZH_REL: Record<string, { name: string; description: string }> = {
  customer_places_order: { name: '下单', description: '一个客户会下一个或多个订单' },
  order_contains_product: { name: '包含', description: '一笔订单包含一种或多种商品' },
  order_processed_at_store: { name: '在门店处理', description: '一笔订单在指定门店处理' },
  product_sourced_from_supplier: { name: '采购自', description: '商品的原料采购自某供应商' },
  shipment_from_supplier: { name: '由…发出', description: '一批货运由某供应商发出' },
  shipment_to_store: { name: '送达', description: '一批货运送达某门店' },
  shipment_contains_product: { name: '运送', description: '一批货运运送商品' },
};

// 属性显示名 (按属性名映射, 跨实体通用)
const ZH_PROP_NAME: Record<string, string> = {
  customerId: '客户编号',
  orderId: '订单编号',
  productId: '商品编号',
  storeId: '门店编号',
  supplierId: '供应商编号',
  shipmentId: '货运编号',
  name: '名称',
  email: '电子邮箱',
  loyaltyTier: '会员等级',
  joinDate: '注册日期',
  totalSpend: '累计消费',
  timestamp: '下单时间',
  total: '订单金额',
  status: '状态',
  paymentMethod: '支付方式',
  category: '类别',
  price: '单价',
  origin: '产地',
  isOrganic: '是否有机',
  city: '城市',
  state: '省/州',
  openDate: '开业日期',
  capacity: '座位数',
  country: '国家',
  certification: '认证',
  rating: '评分',
  dispatchDate: '发货日期',
  arrivalDate: '到达日期',
  weight: '重量',
};

const ZH_PROP_DESC: Record<string, string> = {
  customerId: '客户的唯一标识',
  name: '客户全名',
  email: '联系电子邮箱',
  loyaltyTier: '会员计划等级',
  joinDate: '客户注册日期',
  totalSpend: '累计消费金额',
  orderId: '订单的唯一标识',
  timestamp: '下单时间',
  total: '订单总金额',
  status: '当前订单状态',
  paymentMethod: '使用的支付方式',
  productId: '商品的唯一标识',
  category: '商品类别',
  price: '单价',
  origin: '咖啡豆原产国',
  isOrganic: '是否通过有机认证',
  storeId: '门店的唯一标识',
  city: '所在城市',
  state: '省/州',
  openDate: '门店开业日期',
  capacity: '座位容量',
  supplierId: '供应商的唯一标识',
  country: '运营国家',
  certification: '可持续性认证',
  rating: '质量评分（1-5）',
  shipmentId: '货运的唯一标识',
  dispatchDate: '从供应商发货日期',
  arrivalDate: '到达门店日期',
  weight: '货运总重量',
};

const PROP_TYPE_ZH: Record<string, string> = {
  string: '字符串',
  integer: '整数',
  decimal: '小数',
  double: '双精度',
  date: '日期',
  datetime: '日期时间',
  boolean: '布尔',
  enum: '枚举',
};

const CARD_ZH: Record<string, string> = {
  'one-to-one': '一对一',
  'one-to-many': '一对多',
  'many-to-one': '多对一',
  'many-to-many': '多对多',
};

export function localizeOntologySummary(o: Ontology, lang: string): Ontology {
  if (lang !== 'zh-CN') return o;
  return {
    name: ZH_ONTOLOGY_NAME,
    description: ZH_ONTOLOGY_DESC,
    entityTypes: o.entityTypes.map((e) => ({
      ...e,
      name: ZH_ENTITY[e.id]?.name ?? e.name,
      description: ZH_ENTITY[e.id]?.description ?? e.description,
      properties: e.properties.map((p) => ({
        ...p,
        name: ZH_PROP_NAME[p.name] ?? p.name,
        description: ZH_PROP_DESC[p.name] ?? p.description,
      })),
    })),
    relationships: o.relationships.map((r) => ({
      ...r,
      name: ZH_REL[r.id]?.name ?? r.name,
      description: ZH_REL[r.id]?.description ?? r.description,
    })),
  };
}

export function localizePropType(type: string, lang: string): string {
  if (lang !== 'zh-CN') return type;
  return PROP_TYPE_ZH[type] ?? type;
}

export function localizeCardinality(c: string, lang: string): string {
  if (lang !== 'zh-CN') return c;
  return CARD_ZH[c] ?? c;
}
