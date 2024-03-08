// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter, type NanoPackMessage } from "nanopack"

class ListViewItemConfig implements NanoPackMessage {
	public static TYPE_ID = 4128951807

	public readonly typeId: number = 4128951807

	public readonly headerSize: number = 16

	constructor(
		public sectionIndex: number | null,
		public itemIndex: number | null,
		public itemTag: number | null,
	) {}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: ListViewItemConfig } | null {
		const reader = new NanoBufReader(bytes)
		return ListViewItemConfig.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: ListViewItemConfig } | null {
		let ptr = 16

		let sectionIndex: number | null
		if (reader.readFieldSize(0) >= 0) {
			sectionIndex = reader.readUint32(ptr)
			ptr += 4
		} else {
			sectionIndex = null
		}

		let itemIndex: number | null
		if (reader.readFieldSize(1) >= 0) {
			itemIndex = reader.readUint32(ptr)
			ptr += 4
		} else {
			itemIndex = null
		}

		let itemTag: number | null
		if (reader.readFieldSize(2) >= 0) {
			itemTag = reader.readUint32(ptr)
			ptr += 4
		} else {
			itemTag = null
		}

		return {
			bytesRead: ptr,
			result: new ListViewItemConfig(sectionIndex, itemIndex, itemTag),
		}
	}

	public writeTo(writer: NanoBufWriter, offset: number = 0): number {
		const writerSizeBefore = writer.currentSize

		writer.writeTypeId(4128951807, offset)

		if (this.sectionIndex) {
			writer.appendUint32(this.sectionIndex)
			writer.writeFieldSize(0, 4, offset)
		} else {
			writer.writeFieldSize(0, -1, offset)
		}

		if (this.itemIndex) {
			writer.appendUint32(this.itemIndex)
			writer.writeFieldSize(1, 4, offset)
		} else {
			writer.writeFieldSize(1, -1, offset)
		}

		if (this.itemTag) {
			writer.appendUint32(this.itemTag)
			writer.writeFieldSize(2, 4, offset)
		} else {
			writer.writeFieldSize(2, -1, offset)
		}

		return writer.currentSize - writerSizeBefore
	}

	public bytes(): Uint8Array {
		const writer = new NanoBufWriter(16)
		this.writeTo(writer)
		return writer.bytes
	}
}

export { ListViewItemConfig }
