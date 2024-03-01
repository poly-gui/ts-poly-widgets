import type { ApplicationContext } from "poly/application"
import { UpdateWidget } from "../update-widget.np.js"
import { Widget } from "./widget.np.js"
import { CreateWidget } from "../create-widget.np.js"

type WidgetTag = number

abstract class PolyWidget {
	public readonly tag: WidgetTag

	protected constructor(protected readonly context: ApplicationContext) {
		this.tag = context.idRegistry.newId()
	}

	abstract descriptor(): Widget

	public show({ window }: { window: string }) {
		const msg = new CreateWidget(this.descriptor(), window)
		this.context.messageChannel.sendMessage(msg)
	}

	public update(updater: () => void): this {
		updater()
		this.dispatchUpdate()
		return this
	}

	protected dispatchUpdate() {
		const msg = new UpdateWidget(this.tag, this.descriptor())
		this.context.messageChannel.sendMessage(msg)
	}
}

abstract class WidgetController {
	protected constructor(protected readonly context: ApplicationContext) {}

	public abstract widget(): PolyWidget
}

export { PolyWidget, WidgetController }
export type { Widget }
export type { WidgetTag }
