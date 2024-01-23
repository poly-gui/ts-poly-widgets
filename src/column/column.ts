import { Widget } from "../widget/widget.np.js"
import { Column } from "./column.np.js"
import { Alignment, type TAlignment } from "../alignment/alignment.np.js"
import { MIN_CONTENT } from "../layout.js"

interface ColumnProps {
	width?: number
	height?: number
	horizontalAlignment?: TAlignment
	verticalAlignment?: TAlignment
}

function column(
	children: Widget[],
	{
		width = MIN_CONTENT,
		height = MIN_CONTENT,
		horizontalAlignment = Alignment.START,
		verticalAlignment = Alignment.CENTER,
	}: ColumnProps,
) {
	return new Column(
		null,
		width,
		height,
		horizontalAlignment,
		verticalAlignment,
		children,
	)
}

export { column }
export type { ColumnProps }
