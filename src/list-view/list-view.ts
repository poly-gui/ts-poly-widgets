import type { ApplicationContext } from "poly/application"

import type { Widget, WidgetProps } from "../widget/widget.js"
import { RenderItemConfig } from "./render-item-config.np.js"
import { ListView } from "./list-view.np.js"
import { MIN_CONTENT } from "../layout.js"

type ListViewItemRenderer = (sectionIndex: number, itemIndex: number) => Widget

interface ListViewProps extends WidgetProps {
	context: ApplicationContext
	width?: number
	height?: number
	itemCount: number
	renderItem: ListViewItemRenderer
}

function listView({
	tag,
	context,
	width = MIN_CONTENT,
	height = MIN_CONTENT,
	itemCount,
	renderItem,
}: ListViewProps): Widget {
	return new ListView(
		tag ?? null,
		width,
		height,
		[itemCount],
		context.callbackRegistry.newCallback((argReader) => {
			const parsed = RenderItemConfig.fromReader(argReader)
			if (parsed) {
				return renderItem(parsed.result.sectionIndex, parsed.result.itemIndex)
			}
			return null
		}),
	)
}

export { listView }
export type { ListViewProps, ListViewItemRenderer }
