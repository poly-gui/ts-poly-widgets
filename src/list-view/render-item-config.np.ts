// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter, type NanoPackMessage } from "nanopack"

class RenderItemConfig implements NanoPackMessage {
	public static TYPE_ID = 3591753548

	constructor(
		public sectionIndex: number,
		public itemIndex: number,
	) {}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: RenderItemConfig } | null {
		const reader = new NanoBufReader(bytes)
		return RenderItemConfig.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: RenderItemConfig } | null {
		let ptr = 12

		const sectionIndex = reader.readInt32(ptr)
		ptr += 4

		const itemIndex = reader.readInt32(ptr)
		ptr += 4

		return {
			bytesRead: ptr,
			result: new RenderItemConfig(sectionIndex, itemIndex),
		}
	}

	public get typeId(): number {
		return 3591753548
	}

	public bytes(): Uint8Array {
		const writer = new NanoBufWriter(12)
		writer.writeTypeId(3591753548)

		writer.appendInt32(this.sectionIndex)
		writer.writeFieldSize(0, 4)

		writer.appendInt32(this.itemIndex)
		writer.writeFieldSize(1, 4)

		return writer.bytes
	}

	public bytesWithLengthPrefix(): Uint8Array {
		const writer = new NanoBufWriter(12 + 4, true)
		writer.writeTypeId(3591753548)

		writer.appendInt32(this.sectionIndex)
		writer.writeFieldSize(0, 4)

		writer.appendInt32(this.itemIndex)
		writer.writeFieldSize(1, 4)

		writer.writeLengthPrefix(writer.currentSize - 4)

		return writer.bytes
	}
}

export { RenderItemConfig }