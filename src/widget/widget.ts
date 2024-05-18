import type { ApplicationContext } from "poly"
import { UpdateWidget } from "../update-widget.np.js"
import type { Widget } from "./widget.np.js"
import { CreateWidget } from "../create-widget.np.js"

type WidgetTag = number

abstract class PolyWidget {
	public readonly tag: WidgetTag

	protected constructor(protected readonly context: ApplicationContext) {
		this.tag = context.idRegistry.newId()
	}

	abstract descriptor(): Widget

	public async show({ window }: { window: string }) {
		const msg = new CreateWidget(this.descriptor(), window)
		await this.context.nativeLayer.sendMessage(msg)
	}

	public async update(updater: () => void) {
		updater()
		await this.dispatchUpdate()
		return this
	}

	protected async dispatchUpdate() {
		const msg = new UpdateWidget(this.tag, this.descriptor(), null)
		await this.context.nativeLayer.sendMessage(msg)
	}
}

abstract class WidgetController {
	protected constructor(protected readonly context: ApplicationContext) {}

	public abstract widget(): PolyWidget
}

export { PolyWidget, WidgetController }
export type { Widget }
export type { WidgetTag }
