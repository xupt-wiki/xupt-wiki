import type { CampusArea, CampusPoi } from '../data/campus-map'

interface LabelBox { x: number, y: number, width: number, height: number }

const characterWidth = (character: string) => character.codePointAt(0)! <= 0x7F ? 0.56 : 1
const textWidth = (text: string) => Array.from(text).reduce((width, character) => width + characterWidth(character), 0)

// Wrap the entire name, including parentheses and slashes. Building height never
// limits the number of lines: labels are allowed to extend beyond their outline.
function wrapName(name: string, width: number): string[] {
	const lines: string[] = []
	let line = ''
	let used = 0
	for (const character of Array.from(name)) {
		const next = characterWidth(character)
		const closing = /[）)】」』、，。：；！？]/.test(character)
		const opening = /[（(【「『]/.test(character)
		if (line && !closing && (used + next > width || (opening && used + next + 1 > width))) {
			lines.push(line)
			line = ''
			used = 0
		}
		line += character
		used += next
	}
	if (line)
		lines.push(line)
	return lines
}

function overlap(a: LabelBox, b: LabelBox) {
	return Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))
		* Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
}

export function layoutCampusLabels(area: CampusArea, scale: number, zoom: number, space?: { bounds: LabelBox, obstacles: LabelBox[] }) {
	const toScreen = (box: LabelBox) => ({ x: box.x * scale, y: box.y * scale, width: box.width * scale, height: box.height * scale })
	const bounds = space && toScreen(space.bounds)
	const occupied = space?.obstacles.map(toScreen) ?? []
	for (const section of area.sections ?? [])
		occupied.push({ x: section.x * scale - 22, y: section.y * scale - 20, width: 44, height: 24 })
	const buildingWidths = new Map<string, number>()
	for (const building of area.buildings) {
		if (building.poiId)
			buildingWidths.set(building.poiId, Math.max(building.width, buildingWidths.get(building.poiId) ?? 0))
	}
	const priority = (poi: CampusPoi) => poi.category === 'service' ? 0 : poi.major ? 2 : 1
	return [...area.pois].sort((a, b) => priority(b) - priority(a)).map((poi) => {
		const small = poi.category === 'service'
		const baseSize = small ? 11 : poi.major ? 14 : 13
		const minSize = small ? 6 : 7
		// A dense overview uses smaller text. Zooming gradually restores larger
		// sizes; individual crowded labels can shrink further instead of overlap.
		const density = Math.min(1, Math.sqrt(scale / Math.max(1, zoom) / 0.42))
		const preferredSize = Math.max(minSize, Math.min(baseSize + 4, baseSize * density * Math.max(1, zoom) ** 0.3))
		const x = poi.x * scale
		const y = poi.y * scale
		const availableWidth = (buildingWidths.get(poi.id) ?? 0) * scale
		const offsets = [[0, 0]]
		for (const distance of [4, 8, 12, 16, 20, 24, 30, 40, 50, 60]) {
			for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]])
				offsets.push([dx! * distance, dy! * distance])
		}
		let best: { box: LabelBox, lines: string[], fontSize: number, lineHeight: number } | undefined
		let bestCost = Number.POSITIVE_INFINITY
		const sizes = [preferredSize]
		for (let size = Math.floor(preferredSize * 2) / 2; size >= minSize; size -= 0.5)
			sizes.push(size)
		for (const fontSize of sizes) {
			const charactersPerLine = Math.max(small ? 4 : 5, Math.min(10, availableWidth / fontSize))
			const lines = wrapName(poi.name, charactersPerLine)
			const lineHeight = fontSize * 1.2
			// Extra padding includes the text halo and a gap between names.
			const width = Math.max(...lines.map(textWidth)) * fontSize + 5
			const height = lines.length * lineHeight + 3
			for (const [dx = 0, dy = 0] of offsets) {
				const box = { x: x + dx - width / 2, y: y + dy - height / 2, width, height }
				if (bounds) {
					box.x = Math.max(bounds.x, Math.min(bounds.x + bounds.width - width, box.x))
					box.y = Math.max(bounds.y, Math.min(bounds.y + bounds.height - height, box.y))
				}
				const collision = occupied.reduce((sum, other) => sum + overlap(box, other), 0)
				const distance = (box.x + width / 2 - x) ** 2 + (box.y + height / 2 - y) ** 2
				const cost = (collision > 0.001 ? 1e12 : 0) + collision * 1e6 + distance + (preferredSize - fontSize) ** 2 * 35
				if (cost < bestCost) {
					best = { box, lines, fontSize, lineHeight }
					bestCost = cost
				}
			}
		}
		// On very narrow screens, nearby offsets may have no free slot. Scan
		// horizontal gaps at every occupied edge, including gaps whose two edges
		// belong to different labels, and choose the nearest available position.
		if (bestCost >= 1e12) {
			const lines = wrapName(poi.name, Math.max(small ? 4 : 5, Math.min(10, availableWidth / minSize)))
			const lineHeight = minSize * 1.2
			const width = Math.max(...lines.map(textWidth)) * minSize + 5
			const height = lines.length * lineHeight + 3
			const left = bounds?.x ?? Math.min(x - width, ...occupied.map(other => other.x - width - 1))
			const right = bounds ? bounds.x + bounds.width : Math.max(x + width, ...occupied.map(other => other.x + other.width + width + 1))
			const rows = new Set([y - height / 2, ...occupied.flatMap(other => [other.y - height - 1, other.y + other.height + 1])])
			if (bounds) {
				rows.add(bounds.y)
				rows.add(bounds.y + bounds.height - height)
			}
			for (const row of rows) {
				if (bounds && (row < bounds.y || row + height > bounds.y + bounds.height))
					continue
				const blockers = occupied.filter(other => other.y < row + height && other.y + other.height > row).sort((a, b) => a.x - b.x)
				let cursor = left
				for (const other of [...blockers, { x: right + 1, width: 0 }]) {
					const end = Math.min(right, other.x - 1)
					if (end - cursor >= width) {
						const box = { x: Math.max(cursor, Math.min(end - width, x - width / 2)), y: row, width, height }
						const cost = (box.x + width / 2 - x) ** 2 + (box.y + height / 2 - y) ** 2 + (preferredSize - minSize) ** 2 * 35
						if (cost < bestCost) {
							best = { box, lines, fontSize: minSize, lineHeight }
							bestCost = cost
						}
					}
					cursor = Math.max(cursor, other.x + other.width + 1)
				}
			}
		}
		const { box, lines, fontSize, lineHeight } = best!
		occupied.push(box)
		const labelX = box.x + box.width / 2
		const labelY = box.y + box.height / 2
		return {
			poi,
			lines,
			x: labelX / scale,
			y: labelY / scale,
			width: box.width / scale,
			height: box.height / scale,
			fontSize: fontSize / scale,
			lineHeight: lineHeight / scale,
			leader: Math.hypot(labelX - x, labelY - y) > 8,
		}
	})
}
