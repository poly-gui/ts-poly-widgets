import type { Widget } from "../widget/widget.np.js"
import { Alignment, type TAlignment } from "../alignment/alignment.np.js"
import { Row } from "./row.np.js"
import { MIN_CONTENT } from "../layout.js"

interface RowProps {
	width?: number
	height?: number
	horizontalAlignment?: TAlignment
	verticalAlignment?: TAlignment
}

function row(
	children: Widget[],
	{
		width = MIN_CONTENT,
		height = MIN_CONTENT,
		horizontalAlignment = Alignment.START,
		verticalAlignment = Alignment.CENTER,
	}: RowProps,
) {
	return new Row(
		null,
		width,
		height,
		horizontalAlignment,
		verticalAlignment,
		children,
	)
}

export { row }
export type { RowProps }
