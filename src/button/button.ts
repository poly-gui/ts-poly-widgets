import type { ApplicationContext } from "poly/application"
import { ClickEvent } from "./click-event.np.js"
import { Button } from "./button.np.js"
import type { CreatedWidget, WidgetProps } from "../widget/widget.js"
import { WidgetRegistry } from "../widget/widget-registry.js"

type ButtonOnClickCallback = (event: ClickEvent) => void

interface ButtonProps extends WidgetProps {
	context: ApplicationContext
	onClick: ButtonOnClickCallback
}

interface CreatedButton extends CreatedWidget {
	onClick: ButtonOnClickCallback
	onClickHandle: number
}

function button(
	text: string,
	{ context, onClick, tag = context.idRegistry.newId("button") }: ButtonProps,
) {
	const widgetRegistry = WidgetRegistry.fromContext(context)
	let createdButton = widgetRegistry.findWidget(tag) as CreatedButton

	if (!createdButton) {
		createdButton = {
			tag,
			onClick,
			onClickHandle: context.callbackRegistry.newCallback((argReader) => {
				const event = ClickEvent.fromReader(argReader)
				if (event) {
					createdButton.onClick(event.result)
				}
			}, `${tag}`),
		}
		widgetRegistry.register(createdButton)
	} else {
		createdButton.onClick = onClick
	}

	return new Button(createdButton.tag, text, createdButton.onClickHandle)
}

export { button }
export type { ClickEvent, ButtonOnClickCallback }
