import type { ApplicationContext } from "poly/application"
import { ClickEvent } from "./click-event.np.js"
import { Button } from "./button.np.js"

interface ButtonProps {
	context: ApplicationContext
	onClick: (event: ClickEvent) => void
}

function button(text: string, { context, onClick }: ButtonProps) {
	const tag = context.idRegistry.newId("button")
	const handle = context.callbackRegistry.newCallback((argBytes) => {
		const event = ClickEvent.fromReader(argBytes)
		if (event) {
			onClick(event.result)
		}
	}, `${tag}`)

	return new Button(tag, text, handle)
}

export { button }
