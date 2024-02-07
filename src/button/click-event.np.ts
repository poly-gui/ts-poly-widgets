// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter, type NanoPackMessage } from "nanopack"

class ClickEvent implements NanoPackMessage {
	public static TYPE_ID = 1041

	constructor(public timestamp: number) {}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: ClickEvent } | null {
		const reader = new NanoBufReader(bytes)
		return ClickEvent.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: ClickEvent } | null {
		let ptr = 8

		const timestamp = reader.readInt32(ptr)
		ptr += 4

		return { bytesRead: ptr, result: new ClickEvent(timestamp) }
	}

	public get typeId(): number {
		return 1041
	}

	public bytes(): Uint8Array {
		const writer = new NanoBufWriter(8)
		writer.writeTypeId(1041)

		writer.appendInt32(this.timestamp)
		writer.writeFieldSize(0, 4)

		return writer.bytes
	}

	public bytesWithLengthPrefix(): Uint8Array {
		const writer = new NanoBufWriter(8 + 4, true)
		writer.writeTypeId(1041)

		writer.appendInt32(this.timestamp)
		writer.writeFieldSize(0, 4)

		writer.writeLengthPrefix(writer.currentSize - 4)

		return writer.bytes
	}
}

export { ClickEvent }