import { Center as NpCenter } from "./center.np.js"
import type { ApplicationContext } from "poly/application"
import { PolyWidget } from "../widget/widget.js"

class Center extends PolyWidget {
	public child: PolyWidget | null = null

	constructor(context: ApplicationContext) {
		super(context)
	}

	descriptor(): NpCenter {
		if (!this.child) {
			throw new Error("Child cannot be null")
		}
		return new NpCenter(this.tag, this.child.descriptor())
	}
}

export { Center }
