import type { NanoPackMessage } from "nanopack"

import { Widget } from "./widget/widget.np.js"
import { Center } from "./center/center.np.js"
import { CreateWidget } from "./create-widget.np.js"
import { Text } from "./text/text.np.js"

function makeNanoPackMessage(
	bytes: Uint8Array,
	typeId: number,
): { bytesRead: number; result: NanoPackMessage } | null {
	switch (typeId) {
		case 100:
			return Widget.fromBytes(bytes)
		case 102:
			return Center.fromBytes(bytes)
		case 20:
			return CreateWidget.fromBytes(bytes)
		case 101:
			return Text.fromBytes(bytes)
		default:
			return null
	}
}

export { makeNanoPackMessage }
