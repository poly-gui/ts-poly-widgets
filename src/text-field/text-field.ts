import type { ApplicationContext } from "poly/application"

import { CreatedWidget, type WidgetProps } from "../widget/widget.js"
import { OnValueChanged } from "./on-value-changed.np.js"
import { WidgetRegistry } from "../widget/widget-registry.js"
import { TextField } from "./text-field.np.js"

type OnValueChangedCallback = (event: OnValueChanged) => void

interface TextFieldProps extends WidgetProps {
	context: ApplicationContext
	placeholder: string | null
	value: string
	onValueChanged: OnValueChangedCallback
}

interface CreatedTextField extends CreatedWidget {
	onValueChanged: OnValueChangedCallback
	onValueChangedHandle: number
}

function textField({
	context,
	placeholder = null,
	value,
	onValueChanged,
	tag = context.idRegistry.newId("textField"),
}: TextFieldProps) {
	const widgetRegistry = WidgetRegistry.fromContext(context)
	let createdTextField = widgetRegistry.findWidget(tag) as CreatedTextField

	if (!createdTextField) {
		createdTextField = {
			tag,
			onValueChanged,
			onValueChangedHandle: -1,
		}
		createdTextField.onValueChangedHandle =
			context.callbackRegistry.newCallback((argBytes) => {
				const event = OnValueChanged.fromReader(argBytes)
				if (event) {
					createdTextField.onValueChanged(event.result)
				}
			}, `${tag}`)
		widgetRegistry.register(createdTextField)
	}

	return new TextField(
		tag,
		placeholder,
		value,
		createdTextField.onValueChangedHandle,
	)
}

export { textField }
export type { OnValueChanged }
