// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter } from "nanopack"

import { Widget } from "../widget/widget.np.js"

class Button extends Widget {
	public static TYPE_ID = 104

	constructor(
		public tag: number | null,
		public text: string,
		public onClick: number,
	) {
		super(tag)
	}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: Button } | null {
		const reader = new NanoBufReader(bytes)
		return Button.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: Button } | null {
		let ptr = 16

		let tag: number | null
		if (reader.readFieldSize(0) >= 0) {
			tag = reader.readInt32(ptr)
			ptr += 4
		} else {
			tag = null
		}

		const textByteLength = reader.readFieldSize(1)
		const text = reader.readString(ptr, textByteLength)
		ptr += textByteLength

		const onClick = reader.readInt32(ptr)
		ptr += 4

		return { bytesRead: ptr, result: new Button(tag, text, onClick) }
	}

	public override get typeId(): number {
		return 104
	}

	public override bytes(): Uint8Array {
		const writer = new NanoBufWriter(16)
		writer.writeTypeId(104)

		if (this.tag) {
			writer.appendInt32(this.tag)
			writer.writeFieldSize(0, 4)
		} else {
			writer.writeFieldSize(0, -1)
		}

		const textByteLength = writer.appendString(this.text)
		writer.writeFieldSize(1, textByteLength)

		writer.appendInt32(this.onClick)
		writer.writeFieldSize(2, 4)

		return writer.bytes
	}

	public override bytesWithLengthPrefix(): Uint8Array {
		const writer = new NanoBufWriter(16 + 4, true)
		writer.writeTypeId(104)

		if (this.tag) {
			writer.appendInt32(this.tag)
			writer.writeFieldSize(0, 4)
		} else {
			writer.writeFieldSize(0, -1)
		}

		const textByteLength = writer.appendString(this.text)
		writer.writeFieldSize(1, textByteLength)

		writer.appendInt32(this.onClick)
		writer.writeFieldSize(2, 4)

		writer.writeLengthPrefix(writer.currentSize - 4)

		return writer.bytes
	}
}

export { Button }
