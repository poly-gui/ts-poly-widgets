import type { ApplicationContext } from "poly/application"
import { CreatedWidget, WidgetTag } from "./widget.js"

const REGISTRY_KEY = "Poly.Widgets.WidgetRegistry"

class WidgetRegistry {
	private widgetIds = new Set<number>()
	private widgets = new Map<WidgetTag, CreatedWidget>()

	static addToContext(context: ApplicationContext) {
		context.addRegistry(REGISTRY_KEY, new WidgetRegistry())
	}

	static fromContext(context: ApplicationContext): WidgetRegistry {
		let instance = context.getRegistry<WidgetRegistry>(REGISTRY_KEY)
		if (!instance) {
			instance = new WidgetRegistry()
			context.addRegistry(REGISTRY_KEY, instance)
		}
		return instance
	}

	public register(widget: CreatedWidget) {
		this.widgets.set(widget.tag, widget)
	}

	public newId() {
		let id: number
		do {
			id = Math.floor(Math.random() * 2147483648)
		} while (this.widgetIds.has(id))
		return id
	}

	public findWidget(tag: WidgetTag): CreatedWidget | null {
		return this.widgets.get(tag) ?? null
	}
}

export { WidgetRegistry }
