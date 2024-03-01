import type { ApplicationContext } from "poly/application"

import { PolyWidget, Widget, WidgetController } from "../widget/widget.js"
import { RenderItemConfig } from "./render-item-config.np.js"
import { ListView as ListViewMsg } from "./list-view.np.js"
import { ListViewItem as ListViewItemMsg } from "./list-view-item.np.js"
import { MIN_CONTENT } from "../layout.js"
import { NanoBufReader } from "nanopack"
import { UpdateWidgets } from "../update-widgets.np.js"
import { UpdateWidget } from "../update-widget.np.js"

type ListViewCreateItemCallback<TItem extends ListViewItem> = ({
	sectionIndex,
	itemIndex,
}: {
	sectionIndex: number
	itemIndex: number
}) => TItem

type ListViewBindItemCallback<TItem extends ListViewItem> = ({
	sectionIndex,
	itemIndex,
	item,
}: {
	sectionIndex: number
	itemIndex: number
	item: TItem
}) => [PolyWidget]

class ListView<TItem extends ListViewItem> extends PolyWidget {
	public width = MIN_CONTENT
	public height = MIN_CONTENT
	public itemCount = 0
	public itemHeight = 0
	public onCreate: ListViewCreateItemCallback<TItem> | null = null
	public onBind: ListViewBindItemCallback<TItem> | null = null

	private items = new Map<number, TItem>()
	private readonly onCreateHandle: number
	private readonly onBindHandle: number

	constructor(context: ApplicationContext) {
		super(context)

		this.onCreateHandle = context.callbackRegistry.newCallback(
			this.onRequestCreate.bind(this),
		)
		this.onBindHandle = context.callbackRegistry.newCallback(
			this.onRequestBind.bind(this),
		)
	}

	descriptor(): Widget {
		return new ListViewMsg(
			this.tag,
			this.width,
			this.height,
			[this.itemCount],
			this.itemHeight,
			this.onCreateHandle,
			this.onBindHandle,
		)
	}

	private onRequestCreate(argReader: NanoBufReader) {
		const parsed = RenderItemConfig.fromReader(argReader)
		if (!parsed || !this.onCreate || !this.onBind) return

		const { sectionIndex, itemIndex } = parsed.result
		const listViewItem = this.onCreate({ sectionIndex, itemIndex })
		const itemTag = this.context.idRegistry.newId()
		this.items.set(itemTag, listViewItem)

		this.onBind({ sectionIndex, itemIndex, item: listViewItem })

		return new ListViewItemMsg(itemTag, listViewItem.widget().descriptor())
	}

	private onRequestBind(argReader: NanoBufReader) {
		const parsed = RenderItemConfig.fromReader(argReader)
		if (!parsed || !this.onBind) return

		const { sectionIndex, itemIndex, itemTag } = parsed.result
		if (!itemTag) return

		const listViewItem = this.items.get(itemTag)
		if (!listViewItem) return

		const updates = this.onBind({ sectionIndex, itemIndex, item: listViewItem })
		return new UpdateWidgets(
			updates.map(
				(updatedWidget) =>
					new UpdateWidget(updatedWidget.tag, updatedWidget.descriptor()),
			),
		)
	}
}

abstract class ListViewItem extends WidgetController {
	public readonly tag: number = 0

	protected constructor(context: ApplicationContext) {
		super(context)
		this.tag = context.idRegistry.newId()
	}
}

export { ListView, ListViewItem }
export type { ListViewCreateItemCallback, ListViewBindItemCallback }
