import { Text as NpText } from "./text.np.js"
import { PolyWidget, type Widget } from "../widget/widget.js"
import type { FontStyle } from "../style/style.js"
import { FontStyle as FontStyleMsg } from "../style/font-style.np.js"

class Text extends PolyWidget {
	public content = ""

	public style: FontStyle = {
		fontFamily: "",
		fontSize: 12,
		fontWeight: 400,
	}

	override descriptor(): Widget {
		const style = new FontStyleMsg(
			this.style.fontFamily,
			this.style.fontWeight,
			this.style.fontSize,
		)
		return new NpText(this.tag, this.content, style)
	}
}

export { Text }
