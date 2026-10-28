/**
 * 根据 PR #7 校园图片手绘的校园示意图，仅表达建筑与场地的相对位置。
 * 坐标是各校区 SVG viewBox 内的绘图单位，不是经纬度，也不用于导航测距。
 * 建筑以矩形概括；保留稳定地点 ID，便于搜索、分享与继续校订。
 */
export const mapCategories = [
	{
		id: 'study',
		label: '教学科研',
		color: '#2563eb',
	},
	{
		id: 'dining',
		label: '食堂餐饮',
		color: '#b45309',
	},
	{
		id: 'dorm',
		label: '宿舍公寓',
		color: '#047857',
	},
	{
		id: 'sports',
		label: '体育场馆',
		color: '#0e7490',
	},
	{
		id: 'service',
		label: '生活服务',
		color: '#be185d',
	},
	{
		id: 'admin',
		label: '行政办公',
		color: '#64748b',
	},
	{
		id: 'gate',
		label: '出入口与交通',
		color: '#7c3aed',
	},
	{
		id: 'landmark',
		label: '校园景观',
		color: '#4d7c0f',
	},
] as const

export type MapCategory = typeof mapCategories[number]['id']
export interface CampusPoi {
	id: string
	name: string
	category: MapCategory
	x: number
	y: number
	major?: boolean
	label?: string
}

export interface CampusArea {
	id: string
	name: string
	width: number
	height: number
	boundary: string
	roads: { d: string, name?: string, x?: number, y?: number, rotate?: number, kind?: 'street' | 'bridge' }[]
	zones: { d: string, kind: 'green' | 'water' | 'plaza', poiId?: string }[]
	buildings: { x: number, y: number, width: number, height: number, kind: 'building' | 'field' | 'track', rotate?: number, poiId?: string }[]
	pois: CampusPoi[]
	sections?: { id: string, name: string, x: number, y: number }[]
}

// 楼号与排列来自 docs/public/xupt-map-changan.drawio 中的家属院标注。
// 南侧四排从西到东依次为 3/2/1、6/5/4、9/8/7、12/11/10；
// E 段两栋为北侧 14 号、南侧 13 号，属于教工公寓而非教学楼。
// E 段用途参见 https://jijian.xupt.edu.cn/ 的《长安校区东区教工公寓E段简述》。
const eastFamilyBuildings = [
	{ number: 14, x: 200, y: 1110, width: 140, height: 70 },
	{ number: 13, x: 200, y: 1220, width: 140, height: 70 },
	{ number: 3, x: 180, y: 1490, width: 150, height: 70 },
	{ number: 2, x: 355, y: 1490, width: 150, height: 70 },
	{ number: 1, x: 530, y: 1490, width: 165, height: 70 },
	{ number: 6, x: 175, y: 1690, width: 145, height: 70 },
	{ number: 5, x: 345, y: 1690, width: 145, height: 70 },
	{ number: 4, x: 515, y: 1690, width: 160, height: 70 },
	{ number: 9, x: 150, y: 1890, width: 140, height: 60 },
	{ number: 8, x: 315, y: 1890, width: 140, height: 60 },
	{ number: 7, x: 480, y: 1890, width: 155, height: 60 },
	{ number: 12, x: 140, y: 1970, width: 140, height: 35 },
	{ number: 11, x: 305, y: 1970, width: 140, height: 35 },
	{ number: 10, x: 470, y: 1970, width: 150, height: 35 },
]

// 兼容拆分前的 E 段及教师公寓整体链接，定位到原标点附近的楼栋。
export const campusPoiAliases: Record<string, string> = {
	'changan-east-15': 'changan-east-family-13',
	'changan-east-22': 'changan-east-family-5',
}

// 保留各参考图的局部坐标，合图时统一转换，后续仍可逐图核对与校订。
const sourceCampusAreas: CampusArea[] = [
	{
		id: 'changan-west',
		name: '长安校区 · 西区',
		width: 1000,
		height: 1674,
		boundary: 'M 50 65 H 920 V 1030 L 900 1420 L 880 1660 H 40 Z',
		roads: [
			{ d: 'M 550 80 V 280 M 550 450 L 530 790', name: '乐水大道', x: 552, y: 565, rotate: 90 },
			{ d: 'M 50 1010 H 925', name: '耕学路', x: 635, y: 1000 },
			{ d: 'M 380 1010 V 1430 L 350 1470 V 1650', name: '致远路', x: 390, y: 1230, rotate: 90 },
			{ d: 'M 50 1470 H 870', name: '笃学路', x: 345, y: 1460 },
			{ d: 'M 175 220 L 430 260 L 480 300 M 640 400 L 840 555 L 880 1010' },
			{ d: 'M 450 440 V 620 L 410 740 L 385 960 M 155 480 L 500 535 M 150 745 H 395 L 500 795' },
		],
		zones: [
			// PR #7 的 2.jpg：沿活动中心南侧可见湖岸描绘；北岸被图标遮挡处作平滑连接。
			{
				d: 'M 674 737 C 704 735 736 754 751 784 C 764 810 771 839 768 865 C 765 889 747 909 717 920 C 701 924 688 917 675 902 C 664 887 659 868 657 845 C 654 826 644 814 626 802 C 612 790 607 774 614 759 C 626 744 647 737 674 737 Z',
				kind: 'water',
				poiId: 'changan-west-15',
			},
		],
		buildings: [
			{ x: 100, y: 110, width: 150, height: 100, kind: 'building', poiId: 'changan-west-04' },
			{ x: 680, y: 185, width: 210, height: 90, kind: 'building', poiId: 'changan-west-06' },
			{ x: 70, y: 230, width: 65, height: 150, kind: 'building', poiId: 'changan-west-07' },
			{ x: 205, y: 290, width: 185, height: 120, kind: 'building', poiId: 'changan-west-08' },
			{ x: 70, y: 580, width: 70, height: 140, kind: 'building', poiId: 'changan-west-10' },
			{ x: 190, y: 535, width: 240, height: 70, kind: 'building', poiId: 'changan-west-11' },
			{ x: 170, y: 645, width: 220, height: 80, kind: 'building', poiId: 'changan-west-12' },
			{ x: 80, y: 770, width: 290, height: 80, kind: 'building', poiId: 'changan-west-13' },
			{ x: 640, y: 640, width: 190, height: 80, kind: 'building', poiId: 'changan-west-14' },
			{ x: 70, y: 875, width: 150, height: 70, kind: 'building', poiId: 'changan-west-16' },
			{ x: 440, y: 835, width: 180, height: 130, kind: 'building', poiId: 'changan-west-18' },
			{ x: 70, y: 970, width: 110, height: 55, kind: 'building', poiId: 'changan-west-19' },
			{ x: 760, y: 950, width: 100, height: 60, kind: 'building', poiId: 'changan-west-20' },
			{ x: 70, y: 1035, width: 90, height: 35, kind: 'building', poiId: 'changan-west-23' },
			{ x: 70, y: 1080, width: 90, height: 50, kind: 'building', poiId: 'changan-west-24' },
			{ x: 190, y: 1020, width: 155, height: 90, kind: 'field', poiId: 'changan-west-25' },
			{ x: 410, y: 1030, width: 70, height: 170, kind: 'field', poiId: 'changan-west-26' },
			{ x: 510, y: 1030, width: 110, height: 60, kind: 'field', poiId: 'changan-west-27' },
			{ x: 510, y: 1105, width: 110, height: 50, kind: 'field', poiId: 'changan-west-28' },
			{ x: 60, y: 1150, width: 75, height: 190, kind: 'building', poiId: 'changan-west-29' },
			{ x: 150, y: 1165, width: 70, height: 50, kind: 'field', poiId: 'changan-west-30' },
			{ x: 150, y: 1225, width: 70, height: 50, kind: 'field', poiId: 'changan-west-31' },
			{ x: 150, y: 1285, width: 70, height: 50, kind: 'field', poiId: 'changan-west-32' },
			{ x: 235, y: 1160, width: 125, height: 230, kind: 'track', poiId: 'changan-west-33' },
			{ x: 500, y: 1175, width: 120, height: 170, kind: 'building', poiId: 'changan-west-34' },
			{ x: 650, y: 1105, width: 180, height: 300, kind: 'track', poiId: 'changan-west-35' },
			{ x: 400, y: 1345, width: 105, height: 65, kind: 'field', poiId: 'changan-west-36' },
			{ x: 70, y: 1355, width: 70, height: 50, kind: 'building', poiId: 'changan-west-37' },
			{ x: 860, y: 1290, width: 35, height: 100, kind: 'building', poiId: 'changan-west-38' },
			{ x: 490, y: 1430, width: 350, height: 45, kind: 'building', poiId: 'changan-west-39' },
			{ x: 70, y: 1420, width: 280, height: 40, kind: 'building', poiId: 'changan-west-40' },
			{ x: 190, y: 1485, width: 150, height: 45, kind: 'building', poiId: 'changan-west-41' },
			{ x: 55, y: 1485, width: 115, height: 45, kind: 'building', poiId: 'changan-west-42' },
			{ x: 195, y: 1545, width: 150, height: 45, kind: 'building', poiId: 'changan-west-43' },
			{ x: 55, y: 1545, width: 115, height: 45, kind: 'building', poiId: 'changan-west-44' },
			{ x: 55, y: 1610, width: 270, height: 35, kind: 'building', poiId: 'changan-west-45' },
			{ x: 365, y: 1485, width: 110, height: 110, kind: 'building', poiId: 'changan-west-46' },
			{ x: 510, y: 1490, width: 130, height: 40, kind: 'building', poiId: 'changan-west-47' },
			{ x: 690, y: 1490, width: 160, height: 40, kind: 'building', poiId: 'changan-west-48' },
			{ x: 510, y: 1550, width: 130, height: 40, kind: 'building', poiId: 'changan-west-49' },
			{ x: 695, y: 1550, width: 160, height: 40, kind: 'building', poiId: 'changan-west-50' },
			{ x: 495, y: 1610, width: 110, height: 40, kind: 'building', poiId: 'changan-west-51' },
			{ x: 625, y: 1610, width: 110, height: 40, kind: 'building', poiId: 'changan-west-52' },
			{ x: 755, y: 1610, width: 110, height: 40, kind: 'building', poiId: 'changan-west-53' },
			{ x: 365, y: 1610, width: 110, height: 40, kind: 'building', poiId: 'changan-west-54' },
		],
		pois: [
			{ id: 'changan-west-01', name: '北1门', category: 'gate', x: 150, y: 80 },
			{ id: 'changan-west-02', name: '北2门（正门）', category: 'gate', x: 550, y: 80, major: true, label: '北2门' },
			{ id: 'changan-west-03', name: '邮电大学地铁站', category: 'gate', x: 790, y: 100, major: true, label: '地铁站' },
			{ id: 'changan-west-04', name: '西邮宾馆 / 学术交流中心', category: 'service', x: 175, y: 160 },
			{ id: 'changan-west-05', name: '溯源广场', category: 'landmark', x: 550, y: 190 },
			{ id: 'changan-west-06', name: '行政楼', category: 'admin', x: 785, y: 230 },
			{ id: 'changan-west-07', name: '后勤楼', category: 'admin', x: 102.5, y: 305 },
			{ id: 'changan-west-08', name: '基础教学楼 A、B 段', category: 'study', x: 297.5, y: 350, major: true, label: '基础教学楼' },
			{ id: 'changan-west-09', name: '腾飞西邮', category: 'landmark', x: 550, y: 365 },
			{ id: 'changan-west-10', name: '动力中心', category: 'service', x: 105, y: 650 },
			{ id: 'changan-west-11', name: '1号实验楼', category: 'study', x: 310, y: 570, major: true, label: '1号实验楼' },
			{ id: 'changan-west-12', name: '2号实验楼', category: 'study', x: 280, y: 685 },
			{ id: 'changan-west-13', name: '3号实验楼', category: 'study', x: 225, y: 810 },
			{ id: 'changan-west-14', name: '大学生活动中心', category: 'service', x: 735, y: 680, major: true, label: '活动中心' },
			{ id: 'changan-west-15', name: '播云湖', category: 'landmark', x: 720, y: 850, major: true, label: '播云湖' },
			{ id: 'changan-west-16', name: '大学生创新创业基地', category: 'study', x: 145, y: 910 },
			{ id: 'changan-west-17', name: '校友林', category: 'landmark', x: 350, y: 915 },
			{ id: 'changan-west-18', name: '图书馆', category: 'study', x: 530, y: 900, major: true, label: '图书馆' },
			{ id: 'changan-west-19', name: '洗浴中心', category: 'service', x: 125, y: 997.5 },
			{ id: 'changan-west-20', name: '基建处', category: 'admin', x: 810, y: 980 },
			{ id: 'changan-west-21', name: '校内天桥', category: 'gate', x: 930, y: 990, major: true, label: '校内天桥' },
			{ id: 'changan-west-22', name: '东门', category: 'gate', x: 925, y: 1030, major: true, label: '东门' },
			{ id: 'changan-west-23', name: '校医院', category: 'service', x: 115, y: 1052.5 },
			{ id: 'changan-west-24', name: '校团委', category: 'admin', x: 115, y: 1105 },
			{ id: 'changan-west-25', name: '篮球场（北）', category: 'sports', x: 267.5, y: 1065 },
			{ id: 'changan-west-26', name: '停车场', category: 'service', x: 445, y: 1115 },
			{ id: 'changan-west-27', name: '网球场', category: 'sports', x: 565, y: 1060 },
			{ id: 'changan-west-28', name: '羽毛球场', category: 'sports', x: 565, y: 1130 },
			{ id: 'changan-west-29', name: '美食广场', category: 'dining', x: 97.5, y: 1245 },
			{ id: 'changan-west-30', name: '篮球场（南）', category: 'sports', x: 185, y: 1190 },
			{ id: 'changan-west-31', name: '排球场', category: 'sports', x: 185, y: 1250 },
			{ id: 'changan-west-32', name: '乒乓球场', category: 'sports', x: 185, y: 1310 },
			{ id: 'changan-west-33', name: '小操场', category: 'sports', x: 297.5, y: 1275 },
			{ id: 'changan-west-34', name: '体育馆', category: 'sports', x: 560, y: 1260, major: true, label: '体育馆' },
			{ id: 'changan-west-35', name: '田径场', category: 'sports', x: 740, y: 1255, major: true, label: '田径场' },
			{ id: 'changan-west-36', name: '匹克球场', category: 'sports', x: 452.5, y: 1377.5 },
			{ id: 'changan-west-37', name: '通信机房', category: 'service', x: 105, y: 1380 },
			{ id: 'changan-west-38', name: '垃圾站', category: 'service', x: 877.5, y: 1340 },
			{ id: 'changan-west-39', name: '7号学生公寓（图中标注在建）', category: 'dorm', x: 665, y: 1452.5, major: true, label: '7号公寓' },
			{ id: 'changan-west-40', name: '长智1', category: 'dorm', x: 210, y: 1440, major: true, label: '长智1' },
			{ id: 'changan-west-41', name: '长智2', category: 'dorm', x: 265, y: 1507.5 },
			{ id: 'changan-west-42', name: '长智3', category: 'dorm', x: 112.5, y: 1507.5 },
			{ id: 'changan-west-43', name: '长智4', category: 'dorm', x: 270, y: 1567.5 },
			{ id: 'changan-west-44', name: '长智5', category: 'dorm', x: 112.5, y: 1567.5 },
			{ id: 'changan-west-45', name: '长智6', category: 'dorm', x: 190, y: 1627.5 },
			{ id: 'changan-west-46', name: '旭日苑餐厅', category: 'dining', x: 420, y: 1540, major: true, label: '旭日苑' },
			{ id: 'changan-west-47', name: '长思1', category: 'dorm', x: 575, y: 1510, major: true, label: '长思1' },
			{ id: 'changan-west-48', name: '长思2', category: 'dorm', x: 770, y: 1510 },
			{ id: 'changan-west-49', name: '长思3', category: 'dorm', x: 575, y: 1570 },
			{ id: 'changan-west-50', name: '长思4', category: 'dorm', x: 775, y: 1570 },
			{ id: 'changan-west-51', name: '长思5', category: 'dorm', x: 550, y: 1630 },
			{ id: 'changan-west-52', name: '长思6', category: 'dorm', x: 680, y: 1630 },
			{ id: 'changan-west-53', name: '长思7', category: 'dorm', x: 810, y: 1630 },
			{ id: 'changan-west-54', name: '超市 / 菜鸟驿站', category: 'service', x: 420, y: 1630, major: true, label: '超市 / 驿站' },
		],
	},
	{
		id: 'changan-east',
		name: '长安校区 · 东区',
		width: 1000,
		height: 2049,
		boundary: 'M 75 80 H 950 L 825 1090 L 740 1440 L 625 2020 H 75 Z',
		roads: [
			{ d: 'M 80 510 H 440 M 80 1410 H 735' },
			{ d: 'M 610 370 V 1420 H 100 V 1980' },
			{ d: 'M 350 390 V 1040 M 125 1035 H 610 M 350 1040 V 1410' },
			{ d: 'M 100 1600 H 680 M 100 1800 H 645' },
		],
		zones: [],
		buildings: [
			{ x: 530, y: 160, width: 210, height: 180, kind: 'track', poiId: 'changan-east-02' },
			{ x: 770, y: 180, width: 130, height: 50, kind: 'field', poiId: 'changan-east-03' },
			{ x: 770, y: 240, width: 130, height: 50, kind: 'field', poiId: 'changan-east-04' },
			{ x: 770, y: 300, width: 130, height: 50, kind: 'field', poiId: 'changan-east-05' },
			{ x: 450, y: 410, width: 400, height: 200, kind: 'building', poiId: 'changan-east-07' },
			{ x: 650, y: 690, width: 185, height: 60, kind: 'building', poiId: 'changan-east-08' },
			{ x: 650, y: 790, width: 185, height: 60, kind: 'building', poiId: 'changan-east-09' },
			{ x: 645, y: 900, width: 185, height: 60, kind: 'building', poiId: 'changan-east-10' },
			{ x: 645, y: 1010, width: 185, height: 60, kind: 'building', poiId: 'changan-east-11' },
			{ x: 395, y: 1070, width: 90, height: 50, kind: 'building', poiId: 'changan-east-13' },
			{ x: 720, y: 1100, width: 60, height: 60, kind: 'building', poiId: 'changan-east-14' },
			{ x: 680, y: 1170, width: 60, height: 60, kind: 'building', poiId: 'changan-east-16' },
			{ x: 630, y: 1190, width: 40, height: 100, kind: 'building', poiId: 'changan-east-17' },
			{ x: 410, y: 1250, width: 180, height: 120, kind: 'building', poiId: 'changan-east-19' },
			{ x: 680, y: 1350, width: 50, height: 50, kind: 'building', poiId: 'changan-east-20' },
			...eastFamilyBuildings.map(({ number, ...bounds }) => ({ ...bounds, kind: 'building' as const, poiId: `changan-east-family-${number}` })),
		],
		pois: [
			{ id: 'changan-east-01', name: '邮电大学地铁站', category: 'gate', x: 210, y: 120, major: true, label: '地铁站' },
			{ id: 'changan-east-02', name: '田径场', category: 'sports', x: 635, y: 250, major: true, label: '田径场' },
			{ id: 'changan-east-03', name: '乒乓球场', category: 'sports', x: 835, y: 205 },
			{ id: 'changan-east-04', name: '羽毛球场', category: 'sports', x: 835, y: 265 },
			{ id: 'changan-east-05', name: '篮球场', category: 'sports', x: 835, y: 325 },
			{ id: 'changan-east-06', name: '西2门', category: 'gate', x: 80, y: 510, major: true, label: '西2门' },
			{ id: 'changan-east-07', name: '东区教学实验大楼（逸夫楼）', category: 'study', x: 650, y: 510, major: true, label: '逸夫楼' },
			{ id: 'changan-east-08', name: '安美北', category: 'dorm', x: 742.5, y: 720, major: true, label: '安美北' },
			{ id: 'changan-east-09', name: '安美南', category: 'dorm', x: 742.5, y: 820, major: true, label: '安美南' },
			{ id: 'changan-east-10', name: '安悦北', category: 'dorm', x: 737.5, y: 930, major: true, label: '安悦北' },
			{ id: 'changan-east-11', name: '安悦南', category: 'dorm', x: 737.5, y: 1040, major: true, label: '安悦南' },
			{ id: 'changan-east-12', name: '东门', category: 'gate', x: 820, y: 1095, major: true, label: '东门' },
			{ id: 'changan-east-13', name: '垃圾站', category: 'service', x: 440, y: 1095 },
			{ id: 'changan-east-14', name: '菜鸟驿站', category: 'service', x: 750, y: 1130, major: true, label: '菜鸟驿站' },
			{ id: 'changan-east-16', name: '老锅炉房', category: 'service', x: 710, y: 1200 },
			{ id: 'changan-east-17', name: '老浴室', category: 'service', x: 650, y: 1240 },
			{ id: 'changan-east-18', name: '校内天桥', category: 'gate', x: 80, y: 1275, major: true, label: '校内天桥' },
			{ id: 'changan-east-19', name: '东升苑餐厅', category: 'dining', x: 500, y: 1310, major: true, label: '东升苑' },
			{ id: 'changan-east-20', name: '动力中心', category: 'service', x: 705, y: 1375 },
			{ id: 'changan-east-21', name: '西1门', category: 'gate', x: 80, y: 1410, major: true, label: '西1门' },
			...eastFamilyBuildings.map(building => ({
				id: `changan-east-family-${building.number}`,
				name: `家属院${building.number}号楼${building.number >= 13 ? '（E段）' : ''}`,
				category: 'dorm' as const,
				x: building.x + building.width / 2,
				y: building.y + building.height / 2,
			})),
		],
	},
	{
		id: 'yanta',
		name: '雁塔校区',
		width: 1000,
		height: 1025,
		boundary: 'M 445 115 L 825 120 V 925 H 960 V 1000 H 150 V 870 H 280 L 290 665 H 565 L 650 585 L 655 340 H 445 Z',
		roads: [
			{ d: 'M 555 115 V 125 H 690 V 335 H 680 V 590 L 575 680 V 945' },
			{ d: 'M 275 985 V 925 H 950 M 450 665 V 925' },
		],
		zones: [],
		buildings: [
			{ x: 385, y: 130, width: 55, height: 80, kind: 'building', poiId: 'yanta-02' },
			{ x: 455, y: 185, width: 75, height: 65, kind: 'building', poiId: 'yanta-03' },
			{ x: 540, y: 135, width: 140, height: 70, kind: 'building', poiId: 'yanta-04' },
			{ x: 715, y: 135, width: 60, height: 18, kind: 'building', poiId: 'yanta-05' },
			{ x: 715, y: 175, width: 60, height: 60, kind: 'building', poiId: 'yanta-06' },
			{ x: 695, y: 260, width: 100, height: 70, kind: 'building', poiId: 'yanta-07' },
			{ x: 460, y: 285, width: 110, height: 50, kind: 'building', poiId: 'yanta-08' },
			{ x: 705, y: 350, width: 95, height: 60, kind: 'building', poiId: 'yanta-09' },
			{ x: 695, y: 415, width: 100, height: 90, kind: 'building', poiId: 'yanta-10' },
			{ x: 730, y: 540, width: 50, height: 30, kind: 'building', poiId: 'yanta-11' },
			{ x: 600, y: 670, width: 170, height: 250, kind: 'track', poiId: 'yanta-13' },
			{ x: 455, y: 710, width: 75, height: 200, kind: 'building', poiId: 'yanta-14' },
			{ x: 310, y: 680, width: 100, height: 65, kind: 'field', poiId: 'yanta-15' },
			{ x: 310, y: 760, width: 130, height: 60, kind: 'building', poiId: 'yanta-16' },
			{ x: 310, y: 840, width: 130, height: 60, kind: 'building', poiId: 'yanta-17' },
			{ x: 170, y: 880, width: 80, height: 40, kind: 'building', poiId: 'yanta-18' },
			{ x: 170, y: 930, width: 80, height: 30, kind: 'field', poiId: 'yanta-19' },
			{ x: 310, y: 950, width: 130, height: 45, kind: 'building', poiId: 'yanta-21' },
			{ x: 455, y: 945, width: 120, height: 50, kind: 'building', poiId: 'yanta-22' },
			{ x: 855, y: 945, width: 85, height: 45, kind: 'building', poiId: 'yanta-23' },
			{ x: 230, y: 145, width: 140, height: 180, kind: 'building', poiId: 'yanta-27' },
			{ x: 440, y: 30, width: 180, height: 50, kind: 'building', poiId: 'yanta-29' },
		],
		pois: [
			{ id: 'yanta-01', name: '北正门', category: 'gate', x: 555, y: 115, major: true, label: '北正门' },
			{ id: 'yanta-02', name: '臻美餐厅', category: 'dining', x: 412.5, y: 170, major: true, label: '臻美餐厅' },
			{ id: 'yanta-03', name: '溢香餐厅', category: 'dining', x: 492.5, y: 217.5 },
			{ id: 'yanta-04', name: '综合实验楼（图中标注在建）', category: 'study', x: 610, y: 170, major: true, label: '综合实验楼' },
			{ id: 'yanta-05', name: '卫生所', category: 'service', x: 745, y: 144 },
			{ id: 'yanta-06', name: '科技公寓', category: 'dorm', x: 745, y: 205 },
			{ id: 'yanta-07', name: '十八层图科楼', category: 'study', x: 745, y: 295, major: true, label: '图科楼' },
			{ id: 'yanta-08', name: '办公楼', category: 'admin', x: 515, y: 310, major: true, label: '办公楼' },
			{ id: 'yanta-09', name: '阶梯教室', category: 'study', x: 752.5, y: 380 },
			{ id: 'yanta-10', name: '图书馆', category: 'study', x: 745, y: 460, major: true, label: '图书馆' },
			{ id: 'yanta-11', name: '花房', category: 'landmark', x: 755, y: 555 },
			{ id: 'yanta-12', name: '地下通道', category: 'gate', x: 635, y: 625, major: true, label: '地下通道' },
			{ id: 'yanta-13', name: '田径场', category: 'sports', x: 685, y: 795, major: true, label: '田径场' },
			{ id: 'yanta-14', name: '体育中心', category: 'sports', x: 492.5, y: 810, major: true, label: '体育中心' },
			{ id: 'yanta-15', name: '小体育场（北）', category: 'sports', x: 360, y: 712.5 },
			{ id: 'yanta-16', name: '锐志公寓', category: 'dorm', x: 375, y: 790, major: true, label: '锐志公寓' },
			{ id: 'yanta-17', name: '笃志公寓', category: 'dorm', x: 375, y: 870, major: true, label: '笃志公寓' },
			{ id: 'yanta-18', name: '员工用房', category: 'admin', x: 210, y: 900 },
			{ id: 'yanta-19', name: '小体育场（南）', category: 'sports', x: 210, y: 945 },
			{ id: 'yanta-20', name: '南门', category: 'gate', x: 275, y: 985, major: true, label: '南门' },
			{ id: 'yanta-21', name: '明志公寓', category: 'dorm', x: 375, y: 972.5 },
			{ id: 'yanta-22', name: '尚志公寓', category: 'dorm', x: 515, y: 970 },
			{ id: 'yanta-23', name: '信息大厦', category: 'admin', x: 897.5, y: 967.5, major: true, label: '信息大厦' },
			{ id: 'yanta-24', name: '八里村地铁站', category: 'gate', x: 50, y: 910, major: true, label: '地铁站' },
			{ id: 'yanta-25', name: '老西门', category: 'gate', x: 65, y: 315 },
			{ id: 'yanta-26', name: '绿园遗址', category: 'landmark', x: 140, y: 230 },
			{ id: 'yanta-27', name: '陕西省教育厅（原十层教学楼）', category: 'admin', x: 300, y: 235 },
			{ id: 'yanta-28', name: '东八里村遗址', category: 'landmark', x: 240, y: 530 },
			{ id: 'yanta-29', name: '红砖南路家属院', category: 'dorm', x: 530, y: 55 },
		],
	},
]

const roundCoordinate = (value: number) => Math.round(value * 100) / 100

/** 转换源图使用的绝对 SVG 路径命令，保持曲线控制点与地点同步缩放。 */
function placePath(path: string, scale: number, offsetX: number, offsetY: number) {
	return path.replace(/([MLHVCSQTZ])([^MLHVCSQTZ]*)/g, (_match, command: string, values: string) => {
		const coordinates = values.trim().split(/[\s,]+/).filter(Boolean).map(Number)
		return `${command} ${coordinates.map((value, index) => {
			const isX = command === 'H' || (command !== 'V' && index % 2 === 0)
			return roundCoordinate(value * scale + (isX ? offsetX : offsetY))
		}).join(' ')} `
	}).trim()
}

function placeGeometry(source: CampusArea, scale: number, offsetX: number, offsetY: number) {
	const x = (value: number) => roundCoordinate(value * scale + offsetX)
	const y = (value: number) => roundCoordinate(value * scale + offsetY)
	return {
		boundary: placePath(source.boundary, scale, offsetX, offsetY),
		roads: source.roads.map(road => ({ ...road, d: placePath(road.d, scale, offsetX, offsetY), x: road.x === undefined ? undefined : x(road.x), y: road.y === undefined ? undefined : y(road.y) })),
		zones: source.zones.map(zone => ({ ...zone, d: placePath(zone.d, scale, offsetX, offsetY) })),
		buildings: source.buildings.map(building => ({ ...building, x: x(building.x), y: y(building.y), width: roundCoordinate(building.width * scale), height: roundCoordinate(building.height * scale) })),
		pois: source.pois.map(poi => ({ ...poi, x: x(poi.x), y: y(poi.y) })),
	}
}

const west = sourceCampusAreas[0]!
// 两张参考图比例不同：以北侧西长安街和校内天桥为共同参照。
// 东区缩至 0.78 倍后北侧基本齐平，天桥两端均位于 y=990；中间留出子午大道。
const east = placeGeometry(sourceCampusAreas[1]!, 0.78, 1040, -4.5)
const westBridge = west.pois.find(poi => poi.id === 'changan-west-21')!
const eastBridge = east.pois.find(poi => poi.id === 'changan-east-18')!

export const campusAreas: CampusArea[] = [
	{
		id: 'changan',
		name: '长安校区（东区 · 西区）',
		width: 1840,
		height: 1674,
		boundary: `${west.boundary} ${east.boundary}`,
		sections: [
			{ id: 'changan-west', name: '西区', x: 450, y: 30 },
			{ id: 'changan-east', name: '东区', x: 1450, y: 30 },
		],
		roads: [
			...west.roads,
			...east.roads,
			{ d: 'M 1015 55 V 1630', name: '子午大道', x: 1034, y: 1260, rotate: 90, kind: 'street' },
			{ d: `M ${westBridge.x} ${westBridge.y} H ${eastBridge.x}`, kind: 'bridge' },
		],
		zones: [...west.zones, ...east.zones],
		buildings: [...west.buildings, ...east.buildings],
		pois: [...west.pois, ...east.pois].map((poi) => {
			// 两端标签使用普通字号，仍保留原 ID 和名称供旧链接与搜索使用。
			if (poi.id === westBridge.id)
				return { ...poi, major: false, label: '天桥西端' }
			if (poi.id === eastBridge.id)
				return { ...poi, major: false, label: '天桥东端' }
			return poi
		}),
	},
	sourceCampusAreas[2]!,
]
