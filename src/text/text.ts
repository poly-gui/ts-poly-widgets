import { Text } from "./text.np.js"
import { WidgetProps } from "../widget/widget.js"

interface TextProps extends WidgetProps {}

function text(content: string, { tag }: TextProps): Text {
	return new Text(tag ?? null, content)
}

export { text }
