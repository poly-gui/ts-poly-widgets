import type { ApplicationContext } from "poly"
import { ClickEvent } from "./click-event.np.js"
import { Button as NpButton } from "./button.np.js"
import { PolyWidget, Widget } from "../widget/widget.js"
import { NanoBufReader } from "nanopack"

type ButtonOnClickCallback = (event: ClickEvent) => void

class Button extends PolyWidget {
	public label = ""
	public onClick: ButtonOnClickCallback | null = null

	private readonly onClickHandle: number

	constructor(context: ApplicationContext) {
		super(context)
		this.onClickHandle = context.callbackRegistry.newCallback(
			this.onClickEvent.bind(this),
		)
	}

	public descriptor(): Widget {
		return new NpButton(this.tag, this.label, this.onClickHandle)
	}

	private onClickEvent(argReader: NanoBufReader) {
		const event = ClickEvent.fromReader(argReader)
		if (event) {
			this.onClick?.(event.result)
		}
	}
}

export { Button }
export type { ClickEvent, ButtonOnClickCallback }
