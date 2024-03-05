import { Widget } from "./widget/widget.np.js"
import { ApplicationContext } from "poly/application"
import { CreateWidget } from "./create-widget.np.js"

function createWidget(
	widget: Widget,
	windowTag: string,
	context: ApplicationContext,
) {
	const message = new CreateWidget(widget, windowTag)
	context.nativeLayer.sendMessage(message)
}

export { createWidget }
