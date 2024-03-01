import type { ApplicationContext } from "poly/application"
import { NanoBufReader } from "nanopack"

import { PolyWidget, type Widget } from "../widget/widget.js"
import { TextField as NpTextField } from "./text-field.np.js"
import { OnValueChanged } from "./on-value-changed.np.js"

type OnValueChangedCallback = (event: OnValueChanged) => void

class TextField extends PolyWidget {
	public placeholder = ""
	public value = ""
	public onValueChanged: OnValueChangedCallback | null = null

	private readonly _onValueChangedHandle: number

	constructor(context: ApplicationContext) {
		super(context)

		this._onValueChangedHandle = this.context.callbackRegistry.newCallback(
			this.onValueChangedEvent.bind(this),
		)
	}

	override descriptor(): Widget {
		return new NpTextField(
			this.tag,
			this.placeholder,
			this.value,
			this._onValueChangedHandle,
		)
	}

	private onValueChangedEvent(argReader: NanoBufReader) {
		const event = OnValueChanged.fromReader(argReader)
		if (event) {
			this.onValueChanged?.(event.result)
		}
	}
}

export { TextField }
export type { OnValueChanged }
