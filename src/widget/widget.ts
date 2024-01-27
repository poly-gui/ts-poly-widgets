type WidgetTag = number

interface WidgetProps {
	tag?: WidgetTag
}

interface CreatedWidget {
	tag: WidgetTag
}

export type { Widget } from "./widget.np.js"
export type { WidgetProps, CreatedWidget, WidgetTag }
