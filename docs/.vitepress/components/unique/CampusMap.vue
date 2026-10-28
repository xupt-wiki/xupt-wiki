<script setup lang="ts">
import type { CampusPoi } from '../../data/campus-map'
import type { ViewBox } from '../../utils/campus-map-view'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { campusAreas, campusPoiAliases, mapCategories } from '../../data/campus-map'
import { layoutCampusLabels } from '../../utils/campus-map-labels'
import { constrainView, fitView, zoomView } from '../../utils/campus-map-view'

const areaId = ref(campusAreas[0]!.id)
const category = ref('all')
const query = ref('')
const selectedId = ref('')
const svg = ref<SVGSVGElement>()
const resultsOpen = ref(false)
const helpOpen = ref(false)
const stageSize = ref({ width: 640, height: 640 })
const area = computed(() => campusAreas.find(item => item.id === areaId.value)!)
const topInset = computed(() => stageSize.value.width > 1300 ? 64 : stageSize.value.width > 900 ? 104 : stageSize.value.height <= 500 && stageSize.value.width >= 600 ? 144 : 176)
const overview = computed(() => {
	const { width, height } = stageSize.value
	const top = topInset.value
	const content = fitView(area.value.width, area.value.height, width / Math.max(100, height - top - 16))
	const unitsPerPixel = content.width / width
	return { ...content, y: content.y - top * unitsPerPixel, height: height * unitsPerPixel }
})
const view = ref<ViewBox>(overview.value)
const zoom = computed(() => overview.value.width / view.value.width)
const viewBox = computed(() => `${view.value.x} ${view.value.y} ${view.value.width} ${view.value.height}`)
const points = computed(() => area.value.pois.filter(poi =>
	(category.value === 'all' || poi.category === category.value)
	&& poi.name.toLowerCase().includes(query.value.trim().toLowerCase()),
))
const visibleIds = computed(() => new Set(points.value.map(poi => poi.id)))
const selected = computed(() => area.value.pois.find(poi => poi.id === selectedId.value))
const poiById = computed(() => new Map(area.value.pois.map(poi => [poi.id, poi])))
const buildings = computed(() => area.value.buildings.map((building, index) => ({ ...building, index, poi: poiById.value.get(building.poiId ?? '') })))
const zones = computed(() => area.value.zones.map((zone, index) => ({ ...zone, index, poi: poiById.value.get(zone.poiId ?? '') })))
const shapeIds = computed(() => new Set([...area.value.buildings, ...area.value.zones].map(shape => shape.poiId)))
const loosePoints = computed(() => area.value.pois.filter(poi => !shapeIds.value.has(poi.id)))
const mapScale = computed(() => stageSize.value.width / view.value.width)
const labels = computed(() => {
	const units = overview.value.width / stageSize.value.width
	const controlHeight = stageSize.value.height <= 500 && stageSize.value.width >= 600 ? 210 : 242
	const space = {
		bounds: { x: overview.value.x + 12 * units, y: overview.value.y + (topInset.value + 8) * units, width: overview.value.width - 24 * units, height: overview.value.height - (topInset.value + 24) * units },
		obstacles: [{ x: overview.value.x + overview.value.width - 76 * units, y: overview.value.y + overview.value.height - controlHeight * units, width: 76 * units, height: controlHeight * units }],
	}
	return layoutCampusLabels(area.value, mapScale.value, zoom.value, space)
})
const categoryInfo = (id: string) => mapCategories.find(item => item.id === id)!
const pointers = new Map<number, { x: number, y: number }>()
let observer: ResizeObserver | undefined
let gesture: { view: ViewBox, x: number, y: number, distance: number } | undefined
let down: { x: number, y: number, poi?: string } | undefined
let moved = false

function syncUrl() {
	const url = new URL(window.location.href)
	url.searchParams.set('area', areaId.value)
	if (selectedId.value)
		url.searchParams.set('focus', selectedId.value)
	else
		url.searchParams.delete('focus')
	window.history.replaceState(window.history.state, '', url)
}

function resetView() {
	view.value = { ...overview.value }
}

function select(poi: CampusPoi) {
	if (!visibleIds.value.has(poi.id))
		return
	resultsOpen.value = false
	selectedId.value = poi.id
	const target = zoomView(overview.value, Math.max(2, zoom.value))
	view.value = constrainView({ ...target, x: poi.x - target.width / 2, y: poi.y - target.height / 2 }, area.value.width, area.value.height, overview.value)
	syncUrl()
}

function closeSelection() {
	selectedId.value = ''
	syncUrl()
}

function changeArea() {
	resultsOpen.value = false
	selectedId.value = ''
	query.value = ''
	category.value = 'all'
	resetView()
	syncUrl()
}

function changeZoom(factor: number, x = 0.5, y = 0.5) {
	const targetZoom = Math.max(1, Math.min(5, zoom.value * factor))
	view.value = constrainView(zoomView(view.value, targetZoom / zoom.value, x, y), area.value.width, area.value.height, overview.value)
}

function wheel(event: WheelEvent) {
	if (!event.deltaY)
		return
	const rect = svg.value!.getBoundingClientRect()
	changeZoom(event.deltaY < 0 ? 1.15 : 1 / 1.15, (event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height)
}

function startGesture() {
	const [first, second] = [...pointers.values()]
	if (!first) {
		gesture = undefined
		return
	}
	gesture = {
		view: { ...view.value },
		x: second ? (first.x + second.x) / 2 : first.x,
		y: second ? (first.y + second.y) / 2 : first.y,
		distance: second ? Math.hypot(second.x - first.x, second.y - first.y) : 0,
	}
}

function pointerDown(event: PointerEvent) {
	resultsOpen.value = false
	helpOpen.value = false
	if (event.button !== 0)
		return
	pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
	if (pointers.size === 1) {
		moved = false
		down = { x: event.clientX, y: event.clientY, poi: (event.target as Element).closest('[data-poi]')?.getAttribute('data-poi') ?? undefined }
	}
	else {
		moved = true
	}
	svg.value!.setPointerCapture(event.pointerId)
	startGesture()
}

function pointerMove(event: PointerEvent) {
	if (!pointers.has(event.pointerId) || !gesture)
		return
	pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
	if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5)
		moved = true
	const [first, second] = [...pointers.values()]
	if (!first)
		return
	const rect = svg.value!.getBoundingClientRect()
	const x = second ? (first.x + second.x) / 2 : first.x
	const y = second ? (first.y + second.y) / 2 : first.y
	let next = { ...gesture.view }
	if (second && gesture.distance > 0) {
		const factor = Math.hypot(second.x - first.x, second.y - first.y) / gesture.distance
		const initialZoom = overview.value.width / gesture.view.width
		const clamped = Math.max(1, Math.min(5, initialZoom * factor)) / initialZoom
		next = zoomView(next, clamped, (gesture.x - rect.left) / rect.width, (gesture.y - rect.top) / rect.height)
	}
	next.x -= (x - gesture.x) / rect.width * next.width
	next.y -= (y - gesture.y) / rect.height * next.height
	view.value = constrainView(next, area.value.width, area.value.height, overview.value)
}

function pointerUp(event: PointerEvent) {
	if (!pointers.has(event.pointerId))
		return
	const poi = !moved && down?.poi ? poiById.value.get(down.poi) : undefined
	pointers.delete(event.pointerId)
	if (svg.value?.hasPointerCapture(event.pointerId))
		svg.value.releasePointerCapture(event.pointerId)
	if (poi)
		select(poi)
	startGesture()
}

function cancelGesture(event: PointerEvent) {
	pointers.delete(event.pointerId)
	moved = true
	startGesture()
}

function keydown(event: KeyboardEvent) {
	if (event.key === 'Escape') {
		closeSelection()
		return
	}
	if (event.key === '+' || event.key === '=') {
		event.preventDefault()
		changeZoom(1.25)
	}
	else if (event.key === '-') {
		event.preventDefault()
		changeZoom(0.8)
	}
	else if (event.target === svg.value && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) {
		event.preventDefault()
		if (event.key === 'Home') {
			resetView()
			return
		}
		const step = view.value.width * 0.12
		view.value = constrainView({ ...view.value, x: view.value.x + (event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0), y: view.value.y + (event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0) }, area.value.width, area.value.height, overview.value)
	}
}

function readUrl() {
	const params = new URLSearchParams(window.location.search)
	const requestedArea = params.get('area')?.replace(/^changan-(west|east)$/, 'changan')
	areaId.value = campusAreas.find(item => item.id === requestedArea)?.id ?? campusAreas[0]!.id
	category.value = 'all'
	query.value = ''
	const requestedFocus = params.get('focus') ?? ''
	const focusId = campusPoiAliases[requestedFocus] ?? requestedFocus
	selectedId.value = area.value.pois.find(poi => poi.id === focusId)?.id ?? ''
	resetView()
	if (selected.value)
		select(selected.value)
}

watch(points, () => {
	if (selectedId.value && !visibleIds.value.has(selectedId.value))
		closeSelection()
})
onMounted(() => {
	observer = new ResizeObserver(([entry]) => {
		if (!entry?.contentRect.width || !entry.contentRect.height)
			return
		const previousZoom = zoom.value
		const centerX = view.value.x + view.value.width / 2
		const centerY = view.value.y + view.value.height / 2
		stageSize.value = { width: entry.contentRect.width, height: entry.contentRect.height }
		const next = zoomView(overview.value, previousZoom)
		view.value = constrainView({ ...next, x: centerX - next.width / 2, y: centerY - next.height / 2 }, area.value.width, area.value.height, overview.value)
	})
	if (svg.value) {
		const rect = svg.value.getBoundingClientRect()
		stageSize.value = { width: rect.width, height: rect.height }
		observer.observe(svg.value)
	}
	readUrl()
	window.addEventListener('popstate', readUrl)
})
onBeforeUnmount(() => {
	observer?.disconnect()
	window.removeEventListener('popstate', readUrl)
})
</script>

<template>
<section class="campus-map" aria-label="校园建筑示意图" @keydown.esc="resultsOpen = false; helpOpen = false">
	<div class="map-stage">
		<svg ref="svg" class="map-viewport" :viewBox="viewBox" tabindex="0" :aria-label="`${area.name}建筑示意图，可拖动、缩放或使用方向键移动`" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="cancelGesture" @lostpointercapture="cancelGesture" @wheel.prevent="wheel" @keydown="keydown">
			<path class="campus-boundary" :d="area.boundary" />
			<path v-for="zone in zones" :key="zone.index" class="map-zone" :class="[zone.kind, { muted: zone.poi && !visibleIds.has(zone.poi.id), selected: zone.poi?.id === selectedId }]" :d="zone.d" :data-poi="zone.poi?.id" :tabindex="zone.poi && visibleIds.has(zone.poi.id) ? 0 : undefined" :role="zone.poi ? 'button' : undefined" :aria-label="zone.poi?.name" :aria-pressed="zone.poi ? zone.poi.id === selectedId : undefined" @keydown.enter.prevent.stop="zone.poi && select(zone.poi)" @keydown.space.prevent.stop="zone.poi && select(zone.poi)" @click="($event.detail === 0) && zone.poi && select(zone.poi)" />
			<g aria-hidden="true">
				<path v-for="(road, index) in area.roads" :key="index" class="campus-road" :class="road.kind" :d="road.d" />
				<text v-for="(road, index) in area.roads.filter(item => item.name)" :key="index" class="road-label" :x="road.x" :y="road.y" :transform="road.rotate ? `rotate(${road.rotate} ${road.x} ${road.y})` : undefined">{{ road.name }}</text>
				<text v-for="section in area.sections" :key="section.id" class="section-label" :x="section.x" :y="section.y" :style="{ fontSize: `${18 / mapScale}px` }">{{ section.name }}</text>
			</g>
			<g v-for="building in buildings" :key="building.index" class="building" :class="{ muted: building.poi && !visibleIds.has(building.poi.id), selected: building.poi?.id === selectedId }" :style="{ '--category-color': categoryInfo(building.poi?.category ?? 'admin').color }" :data-poi="building.poi?.id" :tabindex="building.poi && visibleIds.has(building.poi.id) ? 0 : -1" role="button" :aria-label="building.poi?.name" :aria-pressed="building.poi?.id === selectedId" @keydown.enter.prevent.stop="building.poi && select(building.poi)" @keydown.space.prevent.stop="building.poi && select(building.poi)" @click="($event.detail === 0) && building.poi && select(building.poi)">
				<title>{{ building.poi?.name }}</title>
				<rect :x="building.x" :y="building.y" :width="building.width" :height="building.height" rx="4" />
			</g>
			<g v-for="poi in loosePoints" :key="poi.id" class="loose-point" :class="{ selected: poi.id === selectedId, muted: !visibleIds.has(poi.id) }" :style="{ '--category-color': categoryInfo(poi.category).color }" :data-poi="poi.id" :tabindex="visibleIds.has(poi.id) ? 0 : -1" role="button" :aria-label="poi.name" :aria-pressed="poi.id === selectedId" @keydown.enter.prevent.stop="select(poi)" @keydown.space.prevent.stop="select(poi)" @click="($event.detail === 0) && select(poi)">
				<title>{{ poi.name }}</title>
				<circle :cx="poi.x" :cy="poi.y" :r="4 / mapScale" />
			</g>
			<g class="map-labels" aria-hidden="true">
				<g v-for="label in labels" :key="label.poi.id" class="map-label" :class="{ muted: !visibleIds.has(label.poi.id), selected: label.poi.id === selectedId }" :data-poi="label.poi.id">
					<path v-if="label.leader" class="label-leader" :d="`M ${label.poi.x} ${label.poi.y} L ${label.x} ${label.y}`" />
					<text :x="label.x" :y="label.y" :style="{ fontSize: `${label.fontSize}px` }">
						<tspan v-for="(line, index) in label.lines" :key="index" :x="label.x" :dy="index === 0 ? -(label.lines.length - 1) * label.lineHeight / 2 : label.lineHeight">{{ line }}</tspan>
					</text>
				</g>
			</g>
		</svg>
	</div>

	<div class="map-toolbar map-surface" @focusout="!($event.currentTarget as HTMLElement).contains($event.relatedTarget as Node | null) && (resultsOpen = false)">
		<label class="map-area">
			<span class="sr-only">校区</span>
			<select v-model="areaId" aria-label="校区" @change="changeArea">
				<option v-for="item in campusAreas" :key="item.id" :value="item.id">{{ item.name }}</option>
			</select>
		</label>
		<div class="map-search">
			<label class="sr-only" for="campus-map-search">搜索地点</label>
			<input id="campus-map-search" v-model="query" type="search" placeholder="搜索图书馆、餐厅、公寓…" aria-controls="campus-map-results" :aria-expanded="resultsOpen" @focus="resultsOpen = true" @input="resultsOpen = true" @keydown.down.prevent="resultsOpen = true" @keydown.esc.stop="resultsOpen = false">
		</div>
		<div v-if="resultsOpen" id="campus-map-results" class="map-results" aria-label="地点搜索结果">
			<p class="map-count" role="status">
				{{ points.length }} 个地点
			</p>
			<button v-for="poi in points" :key="poi.id" :aria-pressed="selectedId === poi.id" @click="select(poi)">
				<span class="category-dot" :style="{ '--category-color': categoryInfo(poi.category).color }" />{{ poi.name }}
			</button>
			<p v-if="!points.length" class="map-empty">
				没有匹配的地点，试试其他关键词或分类。
			</p>
		</div>
	</div>

	<div class="map-categories" aria-label="地点分类">
		<button class="map-surface" :aria-pressed="category === 'all'" @click="category = 'all'">
			全部
		</button>
		<button v-for="item in mapCategories" :key="item.id" class="map-surface" :aria-pressed="category === item.id" :style="{ '--category-color': item.color }" @click="category = item.id">
			<span class="category-dot" />{{ item.label }}
		</button>
	</div>

	<div class="map-controls map-surface" aria-label="地图控制">
		<span class="map-north" aria-hidden="true">↑ 北</span>
		<button aria-label="放大地图" title="放大" :disabled="zoom >= 4.99" @click="changeZoom(1.25)">
			＋
		</button>
		<output class="map-zoom" aria-label="缩放比例">{{ Math.round(zoom * 100) }}%</output>
		<button aria-label="缩小地图" title="缩小" :disabled="zoom <= 1.01" @click="changeZoom(0.8)">
			−
		</button>
		<button class="map-overview" @click="resetView">
			全览
		</button>
		<button class="map-help-button" :aria-expanded="helpOpen" aria-controls="campus-map-help" @click="helpOpen = !helpOpen">
			说明
		</button>
	</div>

	<section v-if="selected" class="map-detail map-surface" aria-label="地点详情" aria-live="polite">
		<button class="detail-close" aria-label="关闭地点详情" @click="closeSelection">
			×
		</button>
		<span class="detail-category"><span class="category-dot" :style="{ '--category-color': categoryInfo(selected.category).color }" />{{ categoryInfo(selected.category).label }}</span>
		<h2>{{ selected.name }}</h2>
		<p>{{ area.name }}</p>
		<p v-if="/在建|遗址|原十层|老/.test(selected.name)">
			名称保留参考图中的历史或建设状态，现状以现场为准。
		</p>
		<a :href="`?area=${area.id}&focus=${selected.id}`">此地点的分享链接 ↗</a>
	</section>

	<section v-if="helpOpen" id="campus-map-help" class="map-help map-surface" aria-label="地图使用说明">
		<button class="detail-close" aria-label="关闭地图使用说明" @click="helpOpen = false">
			×
		</button>
		<h2>校园建筑示意图</h2>
		<p>点击楼栋查看地点；拖动平移，滚轮或双指缩放。</p>
		<p>地图获得焦点后，可用方向键平移、加减键缩放、Home 键全览。</p>
		<p>仅表示大致方位和相邻关系，不按实际比例绘制。名称与布局参考 <a href="https://github.com/xupt-wiki/xupt-wiki/pull/7" target="_blank" rel="noopener">校园图片 PR #7</a>。</p>
	</section>
</section>
</template>

<style scoped>
.campus-map {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px));
	height: calc(100dvh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px));
	background: var(--vp-c-bg-soft);
	isolation: isolate;
}
.sr-only {
	position: absolute;
	overflow: hidden;
	width: 1px;
	height: 1px;
	padding: 0;
	clip-path: inset(50%);
	white-space: nowrap;
}
.map-stage {
	position: absolute;
	inset: 0;
}
.map-viewport {
	display: block;
	width: 100%;
	height: 100%;
	cursor: grab;
	touch-action: none;
	user-select: none;
}
.map-viewport:active { cursor: grabbing; }
.map-surface {
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	box-shadow: 0 3px 14px #0000000D;
	background: var(--vp-c-bg);
}
.map-toolbar {
	position: absolute;
	top: 16px;
	left: 16px;
	width: 340px;
	max-width: calc(100% - 32px);
	z-index: 3;
}
.map-area {
	display: block;
	padding: 5px 8px;
	border-bottom: 1px solid var(--vp-c-divider);
}
select, input {
	display: block;
	width: 100%;
	padding: 10px;
	border: 0;
	border-radius: 6px;
	background: transparent;
	font: inherit;
	font-size: 14px;
	color: var(--vp-c-text-1);
}
select {
	font-weight: 600;
	cursor: pointer;
}
.map-search { padding: 4px 8px; }
.map-results {
	overflow: auto;
	max-height: min(42dvh, 340px);
	padding: 0 8px 8px;
	border-top: 1px solid var(--vp-c-divider);
	overscroll-behavior: contain;
}
.map-count, .map-empty {
	margin: 0;
	padding: 10px;
	font-size: 12px;
	color: var(--vp-c-text-2);
}
button {
	font: inherit;
	cursor: pointer;
}
button[aria-pressed="true"] {
	background: var(--vp-c-brand-soft);
	color: var(--vp-c-brand-1);
}
button:disabled {
	opacity: 0.4;
	cursor: default;
}
button:focus-visible, select:focus-visible, input:focus-visible, .map-viewport:focus-visible {
	outline: 2px solid var(--vp-c-brand-1);
	outline-offset: -2px;
}
.category-dot {
	display: inline-block;
	flex-shrink: 0;
	width: 8px;
	height: 8px;
	margin-inline-end: 6px;
	border-radius: 50%;
	background: var(--category-color);
}
.map-categories {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	gap: 6px;
	position: absolute;
	top: 16px;
	right: 16px;
	left: 372px;
	pointer-events: none;
	z-index: 2;
}
.map-categories button {
	flex-shrink: 0;
	padding: 8px 12px;
	border-radius: 24px;
	font-size: 13px;
	white-space: nowrap;
	pointer-events: auto;
}
.map-categories button[aria-pressed="true"] {
	border-color: var(--vp-c-brand-1);
	background: var(--vp-c-bg);
}
.map-results button {
	display: flex;
	align-items: center;
	width: 100%;
	padding: 10px;
	border-radius: 6px;
	font-size: 13px;
	line-height: 1.5;
	text-align: start;
}
.map-results button:hover { background: var(--vp-c-bg-soft); }
.map-controls {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	position: absolute;
	overflow: hidden;
	right: max(16px, env(safe-area-inset-right));
	bottom: max(16px, env(safe-area-inset-bottom));
	width: 52px;
	text-align: center;
	z-index: 2;
}
.map-north {
	padding: 10px 0 6px;
	font-size: 12px;
	color: var(--vp-c-text-2);
}
.map-controls button {
	min-height: 40px;
	font-size: 22px;
}
.map-controls button:hover { background: var(--vp-c-bg-soft); }
.map-zoom {
	font-size: 11px;
	color: var(--vp-c-text-2);
}
.map-controls .map-overview, .map-controls .map-help-button {
	border-top: 1px solid var(--vp-c-divider);
	font-size: 12px;
}
.map-detail, .map-help {
	position: absolute;
	overflow: auto;
	padding: 18px;
	font-size: 13px;
	line-height: 1.7;
	overscroll-behavior: contain;
	z-index: 2;
}
.map-detail {
	bottom: max(16px, env(safe-area-inset-bottom));
	left: max(16px, env(safe-area-inset-left));
	width: 320px;
	max-width: calc(100% - 100px);
	max-height: min(40%, 320px);
}
.detail-close {
	position: absolute;
	top: 6px;
	right: 8px;
	width: 32px;
	height: 32px;
	font-size: 22px;
}
.detail-category {
	font-size: 12px;
	color: var(--vp-c-text-2);
}
.map-detail h2, .map-help h2 {
	margin: 4px 24px 8px 0;
	font-size: 18px;
	font-weight: 600;
}
.map-detail p, .map-help p { margin: 8px 0; }
.map-detail a, .map-help a {
	text-decoration: underline;
	color: var(--vp-c-brand-1);
	text-underline-offset: 3px;
}
.map-help {
	right: 80px;
	bottom: max(16px, env(safe-area-inset-bottom));
	width: 320px;
	max-width: calc(100% - 96px);
	max-height: 60%;
	z-index: 4;
}
.campus-boundary {
	fill: var(--vp-c-bg);
	stroke: var(--vp-c-divider);
	stroke-width: 2;
	stroke-dasharray: 8 6;
	vector-effect: non-scaling-stroke;
}
.campus-road {
	fill: none;
	stroke: var(--vp-c-divider);
	stroke-width: 13;
	stroke-linecap: round;
	stroke-linejoin: round;
}
.campus-road.bridge {
	stroke: var(--vp-c-text-3);
	stroke-width: 8;
}
.map-zone {
	fill: var(--vp-c-bg-soft);
	stroke: var(--vp-c-divider);
	stroke-width: 1.5;
	vector-effect: non-scaling-stroke;
}
.map-zone.water {
	fill: color-mix(in srgb, #38BDF8 26%, var(--vp-c-bg));
	stroke: #38A3C8;
}
.map-zone[data-poi] { cursor: pointer; }
.map-zone.selected, .map-zone[data-poi]:hover, .map-zone:focus-visible {
	outline: none;
	stroke: var(--vp-c-brand-1);
	stroke-width: 3;
}
.road-label {
	fill: var(--vp-c-text-3);
	font-size: 20px;
	text-anchor: middle;
}
.section-label {
	fill: var(--vp-c-text-2);
	font-weight: 600;
	text-anchor: middle;
}
.building, .loose-point {
	outline: none;
	cursor: pointer;
}
.building rect {
	fill: color-mix(in srgb, var(--category-color) 13%, var(--vp-c-bg));
	stroke: color-mix(in srgb, var(--category-color) 65%, var(--vp-c-divider));
	stroke-width: 1;
	vector-effect: non-scaling-stroke;
}
.building.selected rect, .building:hover rect, .building:focus-visible rect {
	fill: color-mix(in srgb, var(--category-color) 28%, var(--vp-c-bg));
	stroke: var(--category-color);
	stroke-width: 3;
}
.muted {
	opacity: 0.35;
	pointer-events: none;
}
.map-label text {
	cursor: pointer;
	paint-order: stroke;
	fill: var(--vp-c-text-1);
	stroke: var(--vp-c-bg);
	stroke-width: 3px;
	stroke-linejoin: round;
	text-anchor: middle;
	dominant-baseline: central;
	vector-effect: non-scaling-stroke;
}
.map-label.selected text {
	fill: var(--vp-c-brand-1);
	font-weight: 700;
}
.label-leader {
	fill: none;
	stroke: var(--vp-c-text-3);
	stroke-width: 1;
	vector-effect: non-scaling-stroke;
	pointer-events: none;
}
.loose-point circle {
	fill: var(--category-color);
	stroke: var(--vp-c-bg);
	stroke-width: 2;
	vector-effect: non-scaling-stroke;
}
.loose-point.selected circle, .loose-point:hover circle, .loose-point:focus-visible circle {
	stroke: var(--vp-c-text-1);
	stroke-width: 4;
}
@media (max-width: 900px) {
	.map-toolbar {
		top: 12px;
		left: 12px;
		width: 300px;
		max-width: calc(100% - 24px);
	}
	.map-categories {
		flex-wrap: nowrap;
		justify-content: flex-start;
		overflow-x: auto;
		top: 124px;
		right: 12px;
		left: 12px;
		padding-bottom: 6px;
		scrollbar-width: thin;
		pointer-events: auto;
	}
	.map-categories button { padding: 7px 10px; }
}
@media (max-width: 480px) {
	.map-toolbar { width: calc(100% - 24px); }
	.map-controls {
		right: 12px;
		bottom: max(12px, env(safe-area-inset-bottom));
		width: 44px;
	}
	.map-detail {
		bottom: max(12px, env(safe-area-inset-bottom));
		left: 12px;
		max-width: calc(100% - 80px);
	}
	.map-help {
		right: 68px;
		max-width: calc(100% - 80px);
	}
}
@media (max-height: 500px) and (min-width: 600px) {
	.map-toolbar { width: 240px; }
	.map-categories {
		flex-wrap: wrap;
		justify-content: flex-end;
		top: 12px;
		left: 268px;
	}
	.map-detail { max-height: 45%; }
	.map-help { max-height: 80%; }
	.map-controls button { min-height: 32px; }
}
</style>
