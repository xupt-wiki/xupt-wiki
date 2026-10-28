export interface ViewBox { x: number, y: number, width: number, height: number }

export function fitView(width: number, height: number, aspect: number): ViewBox {
	const viewHeight = Math.max(height + 120, (width + 120) / aspect)
	const viewWidth = viewHeight * aspect
	return { x: (width - viewWidth) / 2, y: (height - viewHeight) / 2, width: viewWidth, height: viewHeight }
}

export function zoomView(view: ViewBox, factor: number, anchorX = 0.5, anchorY = 0.5): ViewBox {
	const width = view.width / factor
	const height = view.height / factor
	return { x: view.x + (view.width - width) * anchorX, y: view.y + (view.height - height) * anchorY, width, height }
}

export function constrainView(view: ViewBox, width: number, height: number, overview?: ViewBox): ViewBox {
	const clamp = (value: number, size: number, min: number, max: number) => size > max - min ? (min + max - size) / 2 : Math.max(min, Math.min(max - size, value))
	return {
		...view,
		x: clamp(view.x, view.width, overview?.x ?? -60, overview ? overview.x + overview.width : width + 60),
		y: clamp(view.y, view.height, overview?.y ?? -60, overview ? overview.y + overview.height : height + 60),
	}
}
