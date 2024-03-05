import type { ApplicationContext } from "poly/application"

import { PolyWidget, Widget, WidgetController } from "../widget/widget.js"
import { ListView as ListViewMsg } from "./list-view.np.js"
import { ListViewItem as ListViewItemMsg } from "./list-view-item.np.js"
import { MIN_CONTENT } from "../layout.js"
import { NanoBufReader } from "nanopack"
import { UpdateWidgets } from "../update-widgets.np.js"
import { UpdateWidget } from "../update-widget.np.js"
import { ListViewOperation } from "./list-view-operation.np.js"
import { ListViewInsertOperation } from "./list-view-insert-operation.np.js"
import { ListViewBatchOperations } from "./list-view-batch-operations.np.js"
import { ListViewDeleteOperation } from "./list-view-delete-operation.np.js"
import { ListViewItemConfig } from "./list-view-item-config.np.js"

type ListViewCreateItemCallback<TItem extends ListViewItem> = () => TItem

type ListViewBindItemCallback<TItem extends ListViewItem> = ({
	sectionIndex,
	itemIndex,
	item,
}: {
	sectionIndex: number
	itemIndex: number
	item: TItem
}) => PolyWidget[]

class ListView<TItem extends ListViewItem> extends PolyWidget {
	public width = MIN_CONTENT
	public height = MIN_CONTENT
	public itemCount = 0
	public itemHeight = 0
	public onCreate: ListViewCreateItemCallback<TItem> | null = null
	public onBind: ListViewBindItemCallback<TItem> | null = null

	private items = new Map<number, TItem>()
	private pendingOperations: ListViewOperation[] = []

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

	public override descriptor(): Widget {
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

	protected override async dispatchUpdate() {
		const batchOperations = new ListViewBatchOperations(this.pendingOperations)
		const msg = new UpdateWidget(
			this.tag,
			this.descriptor(),
			new NanoBufReader(batchOperations.bytes()),
		)
		await this.context.nativeLayer.sendMessage(msg)
		this.pendingOperations = []
	}

	public appendItem() {
		this.itemCount += 1
		const insertOperation = new ListViewInsertOperation(this.tag, [
			this.itemCount - 1,
		])
		this.pendingOperations.push(insertOperation)
	}

	public insertItems(...indices: number[]) {
		this.itemCount += indices.length
		const insertOperation = new ListViewInsertOperation(this.tag, indices)
		this.pendingOperations.push(insertOperation)
	}

	public deleteItems(...indices: number[]) {
		this.itemCount -= indices.length
		const removeOperation = new ListViewDeleteOperation(this.tag, indices)
		this.pendingOperations.push(removeOperation)
	}

	private onRequestCreate(argReader: NanoBufReader): ListViewItemMsg | null {
		const parsed = ListViewItemConfig.fromReader(argReader)
		if (!parsed || !this.onCreate || !this.onBind) {
			return null
		}

		const { sectionIndex, itemIndex } = parsed.result
		const listViewItem = this.onCreate()
		const itemTag = this.context.idRegistry.newId()
		this.items.set(itemTag, listViewItem)

		if (sectionIndex !== null && itemIndex !== null) {
			this.onBind({ sectionIndex, itemIndex, item: listViewItem })
		}

		return new ListViewItemMsg(itemTag, listViewItem.widget().descriptor())
	}

	private onRequestBind(argReader: NanoBufReader) {
		const parsed = ListViewItemConfig.fromReader(argReader)
		if (!parsed || !this.onBind) return

		const { sectionIndex, itemIndex, itemTag } = parsed.result
		if (!itemTag || !sectionIndex || !itemIndex) return

		const listViewItem = this.items.get(itemTag)
		if (!listViewItem) return

		const updates = this.onBind({ sectionIndex, itemIndex, item: listViewItem })
		return new UpdateWidgets(
			updates.map(
				(updatedWidget) =>
					new UpdateWidget(updatedWidget.tag, updatedWidget.descriptor(), null),
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
