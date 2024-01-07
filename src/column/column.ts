import { Widget } from "../widget/widget.np.js"
import { Column } from "./column.np.js"

function column(children: Widget[]) {
	return new Column(null, children)
}

export { column }
