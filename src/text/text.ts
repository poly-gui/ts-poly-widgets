import type { ApplicationContext } from "poly/application"

import { Text as NpText } from "./text.np.js"
import { PolyWidget, type Widget } from "../widget/widget.js"

class Text extends PolyWidget {
	public content = ""

	constructor(context: ApplicationContext) {
		super(context)
	}

	override descriptor(): Widget {
		return new NpText(this.tag, this.content)
	}
}

export { Text }
