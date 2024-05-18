import type { Widget } from "../widget/widget.np.js"
import { Alignment } from "../alignment/alignment.np.js"
import { Row as NpRow } from "./row.np.js"
import { MIN_CONTENT } from "../layout.js"
import { PolyWidget } from "../widget/widget.js"

class Row extends PolyWidget {
	public width = MIN_CONTENT
	public height = MIN_CONTENT
	public horizontalAlignment = Alignment.START
	public verticalAlignment = Alignment.CENTER

	private children: PolyWidget[] = []

	public addChildren(...children: PolyWidget[]) {
		this.children.push(...children)
	}

	override descriptor(): Widget {
		return new NpRow(
			this.tag,
			this.width,
			this.height,
			this.horizontalAlignment,
			this.verticalAlignment,
			this.children.map((child) => child.descriptor()),
		)
	}
}

export { Row }
