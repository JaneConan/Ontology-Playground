// zh-CN overlay for catalogue entry display text (name + description).
// Keyed by catalogue entry id. Keeps the upstream catalogue.json pristine:
// brand / proper-noun names are preserved, generic titles are localized.
// Entity/relationship type names (e.g. Customer, Order) stay English because
// they are referenced consistently inside the graph and summary views.

export interface CatalogueZh {
  name: string;
  description: string;
}

export const CATALOGUE_ZH: Record<string, CatalogueZh> = {
  'official/cosmic-coffee': {
    name: 'Fourth Coffee',
    description: '一套示例本体，描述现代咖啡连锁店，涵盖供应商、产品、门店、顾客与订单。',
  },
  'official/cosmic-coffee-step-1': {
    name: 'Fourth Coffee — 第 1 步：核心订单',
    description: 'Customer、Order、Product —— 核心商业实体。',
  },
  'official/cosmic-coffee-step-2': {
    name: 'Fourth Coffee — 第 2 步：门店',
    description: '新增处理订单的 Store（门店）地点。',
  },
  'official/cosmic-coffee-step-3': {
    name: 'Fourth Coffee — 第 3 步：供应链',
    description: '补全 Supplier（供应商）与 Shipment（物流）体系。',
  },
  'official/ecommerce': {
    name: '电商平台',
    description: '线上零售，涵盖买家、商品、购物车、订单与评论。',
  },
  'official/ecommerce-step-1': {
    name: '电商 — 第 1 步：买家与商品',
    description: 'Buyer（买家）与 Product（商品）—— 商城基础。',
  },
  'official/ecommerce-step-2': {
    name: '电商 — 第 2 步：购物车与订单',
    description: 'Shopping-Cart（购物车）与 Order（订单）补全购买流程。',
  },
  'official/ecommerce-step-3': {
    name: '电商 — 第 3 步：评论',
    description: '补全客户评价与评分模型。',
  },
  'official/fibo-loans-step-1': {
    name: 'FIBO 贷款实验 — 第 1 步：贷款、借款人、贷款人',
    description:
      'FIBO 核心贷款三角 —— Loan（贷款）、Borrower（借款人）、Lender（贷款人），改编自 EDM Council FIBO LOAN/LoansGeneral/Loans。',
  },
  'official/fibo-loans-step-2': {
    name: 'FIBO 贷款实验 — 第 2 步：抵押与还款计划',
    description: '新增抵押与还款计划语义 —— 改编自 FIBO FBC/DebtAndEquities 与 LOAN/LoansGeneral。',
  },
  'official/fibo-loans-step-3': {
    name: 'FIBO 贷款实验 — 第 3 步：服务与还款记录',
    description: '服务机构与可审计的还款历史 —— 改编自 FIBO LOAN/LoansGeneral 与 FBC/ProductsAndServices。',
  },
  'official/fibo-loans-step-4': {
    name: 'FIBO 贷款实验 — 第 4 步：风险分类器',
    description: '用于风险与承销的留置权顺位与所有者权益分类器 —— 改编自 FIBO FBC/DebtAndEquities。',
  },
  'official/fibo-risk-step-1': {
    name: 'FIBO 风险实验 — 第 1 步：行业分类',
    description: '经济部门、子部门与 NAICS 行业分组 —— 集中度风险分析的基础。',
  },
  'official/fibo-risk-step-2': {
    name: 'FIBO 风险实验 — 第 2 步：地理层级',
    description: '新增区域、国家与司法辖区，并标注灾区标志以进行地理风险分析。',
  },
  'official/fibo-risk-step-3': {
    name: 'FIBO 风险实验 — 第 3 步：贷款分类',
    description: '新增贷款类型，含巴塞尔风险权重、抵押类别与 OCC/FDIC 集中度分组。',
  },
  'official/fibo-risk-step-4': {
    name: 'FIBO 风险实验 — 第 4 步：监管背景',
    description: '补全风险模型，纳入银行监管、集中度上限与跨域关联。',
  },
  'official/finance': {
    name: '银行与金融',
    description: '金融服务，涵盖账户、交易、贷款与投资。',
  },
  'official/finance-step-1': {
    name: '银行 — 第 1 步：客户与账户',
    description: 'Customer（客户）与 Account（账户）—— 银行基础。',
  },
  'official/finance-step-2': {
    name: '银行 — 第 2 步：交易',
    description: '新增 Transaction（交易）记录以追踪账户活动。',
  },
  'official/finance-step-3': {
    name: '银行 — 第 3 步：贷款与投资',
    description: '补全 Loan（贷款）与 Investment（投资）产品模型。',
  },
  'official/healthcare': {
    name: '医疗健康系统',
    description: '患者诊疗，涵盖医护人员、预约、诊断与处方。',
  },
  'official/healthcare-step-1': {
    name: '医疗 — 第 1 步：患者与预约',
    description: 'Patient（患者）、Provider（医护人员）、Appointment（预约）—— 排期诊疗。',
  },
  'official/healthcare-step-2': {
    name: '医疗 — 第 2 步：诊断',
    description: '新增 Diagnosis（诊断）以追踪病症。',
  },
  'official/healthcare-step-3': {
    name: '医疗 — 第 3 步：处方',
    description: '补全 Prescription（处方）用药医嘱。',
  },
  'official/iq-lab-retail-step-1': {
    name: '零售供应链 — 第 1 步：核心商业',
    description: 'Customer（客户）、Order（订单）、Product（商品）—— 基础实体。',
  },
  'official/iq-lab-retail-step-2': {
    name: '零售供应链 — 第 2 步：订单明细与分类',
    description: 'OrderLine（订单行）与 ProductCategory（商品分类）增加明细与分组。',
  },
  'official/iq-lab-retail-step-3': {
    name: '零售供应链 — 第 3 步：地理',
    description: 'Region（区域）与 Store（门店）建模订单履约地点。',
  },
  'official/iq-lab-retail-step-4': {
    name: '零售供应链 — 第 4 步：履约与物流',
    description: 'Shipment（运输）、Carrier（承运商）、Warehouse（仓库）建模配送链路。',
  },
  'official/iq-lab-retail-step-5': {
    name: '零售供应链 — 第 5 步：库存与需求',
    description: 'Inventory（库存）、Forecast（预测）、DemandSignal（需求信号）追踪库存与预测。',
  },
  'official/iq-lab-retail-step-6': {
    name: '零售供应链 — 第 6 步：完整模型',
    description: 'Promotion（促销）与 Return（退货）补全完整零售供应链本体。',
  },
  'official/manufacturing': {
    name: '智能制造',
    description: '生产制造，涵盖机器、传感器、工单与质检。',
  },
  'official/manufacturing-step-1': {
    name: '制造 — 第 1 步：机器与传感器',
    description: 'Machine（机器）与 Sensor（传感器）—— IoT 监控基础。',
  },
  'official/manufacturing-step-2': {
    name: '制造 — 第 2 步：工单与零件',
    description: 'Work-Order（工单）与 Part（零件）用于生产追踪。',
  },
  'official/manufacturing-step-3': {
    name: '制造 — 第 3 步：质量控制',
    description: '补全 Quality-Check（质检）检验。',
  },
  'official/university': {
    name: '大学系统',
    description: '学术机构，涵盖学生、教授、课程与院系。',
  },
  'official/university-step-1': {
    name: '大学 — 第 1 步：学生与课程',
    description: 'Student（学生）、Course（课程）、Enrollment（选课）—— 学术核心。',
  },
  'official/university-step-2': {
    name: '大学 — 第 2 步：师资',
    description: '新增 Professor（教授）以授课并指导学生。',
  },
  'official/university-step-3': {
    name: '大学 — 第 3 步：院系',
    description: '补全 Department（院系）组织结构。',
  },
  'official/zava-grove-to-shelf': {
    name: 'Zava 从果园到货架',
    description:
      'Zava 从果园到货架的完整本体 —— 多源采购、四阶段质检、冷链物流、零售订单与可持续发展，共 12 个实体、13 条关系。',
  },
  'official/zava-grove-to-shelf-step-1': {
    name: 'Zava 从果园到货架 — 第 1 步：果园基础',
    description: 'Grower（种植者）、Farm（农场）、Plot（地块）、FruitVariety（水果品种）—— 多源采购的基础实体。',
  },
  'official/zava-grove-to-shelf-step-2': {
    name: 'Zava 从果园到货架 — 第 2 步：采收与质量',
    description: '新增 HarvestLot（采收批次）与 QualityCheck（质检），记录每次采收与四阶段质量体系。',
  },
  'official/zava-grove-to-shelf-step-3': {
    name: 'Zava 从果园到货架 — 第 3 步：冷链物流',
    description: '新增 Shipment（运输）与 ColdChainSensor（冷链传感器），建模生鲜物流与实时温控遥测。',
  },
  'official/zava-grove-to-shelf-step-4': {
    name: 'Zava 从果园到货架 — 第 4 步：零售履约',
    description: '新增 RetailDC（零售配送中心）、Store（门店）与 Order（订单），将供应链对接零售伙伴与营收。',
  },
  'official/zava-grove-to-shelf-step-5': {
    name: 'Zava 从果园到货架 — 第 5 步：完整模型',
    description: '新增 SustainabilityProgram（可持续发展项目），以 Zava 的可持续计划收尾果园到货架模型。',
  },
  'community/1010yab/university-class-search': {
    name: '大学课程检索本体',
    description:
      '学术课程检索模型，涵盖课程、开课、教学班、学期、课次、教师、排课模式、教室、校区、先修要求与名额预留规则。',
  },
  'community/4iurchenko/preventive-healthcare': {
    name: '预防性健康体检',
    description: '面向美国直接面向消费者的在职成人健康体检订阅服务的领域本体。',
  },
  'community/a-villarruel/cruise-company-ontology': {
    name: '邮轮公司',
    description: '涵盖船舶、航次、预订、舱房、港口、岸上游、船员与会员等级的邮轮运营与宾客体验本体。',
  },
  'community/a-villarruel/incident-management-ontology': {
    name: '事件管理',
    description: '对齐 ITIL 的服务事件管理模型，涵盖事件、问题、配置项与支持责任。',
  },
  'community/bbreugel/emergency-management-agency': {
    name: '应急管理机构本体',
    description:
      '该本体描述一个应急管理与调度系统，展示真实突发事件从首次接报到最终处置的全流程：来电报警、调度员评估、响应单位出动、资源转移、事件记录，直至事件解决并关闭。',
  },
  'community/demonjd2026-afk/devops-value-stream-release-intelligence': {
    name: 'DevOps 价值流与发布智能',
    description:
      '建模完整的软件交付链：从需求、工作项、CI/CD 构建流水线，到部署发布、生产事故与事后复盘，使 AI 智能体可追溯是哪条需求导致了生产故障并明确责任归属。',
  },
  'community/demonjd2026-afk/incident-management': {
    name: '事件管理',
    description: '建模企业事件管理工作流中涉及的人员、系统与制品 —— 从检测到解决与部署。',
  },
  'community/intech01/sales-analytics-that-speaks-business': {
    name: '用业务语言说话的销售分析（基于 Fabric IQ 本体）',
    description:
      '一套由 Fabric IQ 驱动的销售本体，将交易型销售数据转化为有意义的业务关系，让用户用自然语言（而非 SQL 查询）探索客户、订单、发票、退货、营收、商品与销售绩效等概念。',
  },
  'community/marshall3366/service-order-management': {
    name: '服务订单管理',
    description: '服务订单管理本体，涵盖客户、服务订单、零件、运输、付款、仓库与现场服务工程师。',
  },
  'community/mudassar-data-ai/learning-ontology': {
    name: '学习本体',
    description: '定义 HR/学习领域业务实体、关键属性、必需非键属性与核心关系的规范学习本体。',
  },
  'community/ravi-chandu/hr-system': {
    name: '人力资源系统',
    description: '人力资源本体，涵盖员工、部门、岗位、分配与绩效评估。',
  },
  'community/ravi-chandu/supply-chain-disruption-risk-propagation': {
    name: '供应链中断与风险传播',
    description: '用于建模供应商中断、组件级连锁风险、产品线暴露与缓释措施的本体，支撑前瞻性运营决策。',
  },
  'community/sandervandevelde/productionline-ontology-sample': {
    name: '生产线本体示例',
    description: '生产线运营模型，含操作员、技术员、排程、工单、传感器与产线状态追踪。',
  },
  'community/taylorsamy/discord-server-ontology': {
    name: 'Discord 服务器本体',
    description: '描述 Fabric 社区 Discord 服务器的本体，含成员、角色、频道、消息、活动与审核操作。',
  },
  'community/vaibhavius/baby-routine-tracking': {
    name: '婴儿作息记录',
    description:
      '通过记录看护人录入的活动（睡眠、喂养、换尿布）及其观察与规律，建模婴儿的日常作息，从而实现结构化追踪并洞察其行为。',
  },
  'community/vaibhavius/fabric-data-quality': {
    name: 'Fabric 数据质量本体',
    description:
      '建模 Microsoft Fabric 环境中数据质量问题的生命周期：问题上报、根因分析、责任归属、解决措施、校验流程，以及跨数据流水线、湖仓、语义模型与报表资产的下游业务影响。',
  },
  'community/zamsam6931/clinical-supply-chain-management': {
    name: '临床试验供应链本体',
    description:
      '建模企业临床试验执行中的临床试验运营、药品供应链、患者入组生命周期、生产流程、库存管理与全球物流。该本体连接研究、患者、化合物、生产、仓储、运输、库存与地理区域，以实现语义智能、运营可视化与 AI 驱动的临床试验供应链分析。',
  },
  'external/fibo/geographic-hierarchy': {
    name: 'FIBO 地理层级',
    description: '区域、国家与司法辖区，并标注飓风、洪水、地震与野火风险灾区标志 —— 改编自 EDM Council FIBO 地理模块。',
  },
  'external/fibo/industry-classification': {
    name: 'FIBO 行业分类',
    description: '经济部门、子部门与 NAICS 行业分组，含气候敏感度与周期性属性 —— 改编自 EDM Council FIBO 分类模块。',
  },
  'external/fibo/loan-classification': {
    name: 'FIBO 贷款分类',
    description: '含巴塞尔风险权重的贷款类型、含回收预期的抵押类别，以及 OCC/FDIC 集中度分组 —— 改编自 EDM Council FIBO 债务与分类模块。',
  },
  'external/fibo/loans-general': {
    name: 'FIBO 贷款通则（改编子集）',
    description: '从 EDM Council FIBO LOAN/LoansGeneral/Loans 模块改编而来、适合课堂的精选子集 —— 涵盖贷款、抵押、服务与还款语义。',
  },
  'external/fibo/regulatory-context': {
    name: 'FIBO 监管背景',
    description: '银行监管（OCC、FDIC、巴塞尔 III）与投资组合风险管理的量化集中度上限 —— 改编自 EDM Council FIBO 监管模块。',
  },
  'external/pizza-ontology/pizza': {
    name: '披萨本体',
    description: '经典的 OWL 教学本体 —— 披萨种类、配料与饼底。改编自曼彻斯特大学全球本体课程使用的 Pizza 教程。',
  },
  'external/schema-org/creative-work': {
    name: 'Schema.org — 创意作品',
    description: '图书、电影、文章等创意作品 —— 基于 Schema.org 建模作者、出版与受众评分。',
  },
  'external/schema-org/event': {
    name: 'Schema.org — 活动',
    description: '活动、场馆、表演者与票务 —— Schema.org 描述活动、售票与排期词汇的子集。',
  },
  'external/schema-org/local-business': {
    name: 'Schema.org — 本地商家',
    description: '本地商家、营业时间、评论与邮政地址 —— 用于描述实体商家及其服务的 Schema.org 子集。',
  },
  'external/schema-org/medical-entity': {
    name: 'Schema.org — 医疗实体',
    description: '疾病、药物、诊疗程序与医疗服务提供者 —— Schema.org 的健康领域子集。',
  },
};
