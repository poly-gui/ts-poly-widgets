import { PolyWidget, Widget } from "../widget/widget.js"
import { Column as NpColumn } from "./column.np.js"
import { Alignment, type TAlignment } from "../alignment/alignment.np.js"
import { ApplicationContext } from "poly/application"
import { MIN_CONTENT } from "../layout.js"

class Column extends PolyWidget {
	public width: number = MIN_CONTENT
	public height: number = MIN_CONTENT
	public horizontalAlignment: TAlignment = Alignment.START
	public verticalAlignment: TAlignment = Alignment.CENTER
	private children: PolyWidget[] = []

	constructor(context: ApplicationContext) {
		super(context)
	}

	public addChildren(...children: PolyWidget[]): void {
		this.children.push(...children)
	}

	public descriptor(): Widget {
		return new NpColumn(
			this.tag,
			this.width,
			this.height,
			this.horizontalAlignment,
			this.verticalAlignment,
			this.children.map((widget) => widget.descriptor()),
		)
	}
}

export { Column }
