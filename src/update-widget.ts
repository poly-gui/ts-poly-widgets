import type { ApplicationContext } from "poly"
import type { Widget } from "./widget/widget.np.js"
import { UpdateWidget } from "./update-widget.np.js"
import { UpdateWidgets } from "./update-widgets.np.js"

async function updateWidget(
	tag: number,
	newWidget: Widget,
	context: ApplicationContext,
) {
	const message = new UpdateWidget(tag, newWidget, null)
	await context.nativeLayer.sendMessage(message)
}

async function updateWidgets(
	updates: { tag: number; newWidget: Widget }[],
	context: ApplicationContext,
) {
	const message = new UpdateWidgets(
		updates.map(
			(update) => new UpdateWidget(update.tag, update.newWidget, null),
		),
	)
	await context.nativeLayer.sendMessage(message)
}

export { updateWidget, updateWidgets }
