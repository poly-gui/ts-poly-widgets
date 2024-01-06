import { Widget } from "../widget/widget.np.js"
import { Center } from "./center.np.js"

function center(widget: Widget): Center {
	return new Center(null, widget)
}

export { center }
