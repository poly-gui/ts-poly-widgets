import type { ApplicationContext } from "poly/application"
import { ClickEvent } from "./click-event.np.js"
import { Button } from "./button.np.js"
import type { WidgetProps } from "../widget/widget.js"
import { CreatedWidget } from "../widget.js"
import { WidgetRegistry } from "../widget-registry.js"

interface ButtonProps extends WidgetProps {
	context: ApplicationContext
	onClick: (event: ClickEvent) => void
}

interface CreatedButton extends CreatedWidget {
	onClickHandle: number
}

function button(
	text: string,
	{ context, onClick, tag = context.idRegistry.newId("button") }: ButtonProps,
) {
	const widgetRegistry = WidgetRegistry.fromContext(context)
	let createdButton = widgetRegistry.findWidget(tag) as CreatedButton
	let onClickHandle: number

	if (!createdButton) {
		onClickHandle = context.callbackRegistry.newCallback((argBytes) => {
			const event = ClickEvent.fromReader(argBytes)
			if (event) {
				onClick(event.result)
			}
		}, `${tag}`)
		createdButton = { tag, onClickHandle }
		widgetRegistry.register(createdButton)
	}

	return new Button(createdButton.tag, text, createdButton.onClickHandle)
}

export { button }
