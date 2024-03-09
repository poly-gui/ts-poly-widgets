// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter, type NanoPackMessage } from "nanopack"

import { Widget } from "./widget/widget.np.js"

class CreateWidget implements NanoPackMessage {
	public static TYPE_ID = 2313387354

	public readonly typeId: number = 2313387354

	public readonly headerSize: number = 12

	constructor(
		public widget: Widget,
		public windowTag: string,
	) {}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: CreateWidget } | null {
		const reader = new NanoBufReader(bytes)
		return CreateWidget.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: CreateWidget } | null {
		let ptr = 12

		const maybeWidget = Widget.fromReader(reader.newReaderAt(ptr))
		if (!maybeWidget) {
			return null
		}
		const widget = maybeWidget.result
		ptr += maybeWidget.bytesRead

		const windowTagByteLength = reader.readFieldSize(1)
		const windowTag = reader.readString(ptr, windowTagByteLength)
		ptr += windowTagByteLength

		return { bytesRead: ptr, result: new CreateWidget(widget, windowTag) }
	}

	public writeTo(writer: NanoBufWriter, offset: number = 0): number {
		let bytesWritten = 12

		writer.writeTypeId(2313387354, offset)

		const widgetData = this.widget.bytes()
		writer.appendBytes(widgetData)
		writer.writeFieldSize(0, widgetData.byteLength, offset)
		bytesWritten += widgetData.byteLength

		const windowTagByteLength = writer.appendString(this.windowTag)
		writer.writeFieldSize(1, windowTagByteLength, offset)
		bytesWritten += windowTagByteLength

		return bytesWritten
	}

	public bytes(): Uint8Array {
		const writer = new NanoBufWriter(12)
		this.writeTo(writer)
		return writer.bytes
	}
}

export { CreateWidget }
