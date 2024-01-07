// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter } from "nanopack"

import { Widget } from "../widget/widget.np.js"
import { makeWidget } from "../widget/make-widget.np.js"

class Center extends Widget {
	public static TYPE_ID = 102

	constructor(
		tag: number | null,
		public child: Widget,
	) {
		super(tag)
	}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: Center } | null {
		const reader = new NanoBufReader(bytes)
		return Center.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: Center } | null {
		let ptr = 12

		let tag: number | null
		if (reader.readFieldSize(0) < 0) {
			tag = null
		} else {
			tag = reader.readInt32(ptr)
			ptr += 4
		}

		const maybe_child = makeWidget(reader.slice(ptr))
		if (!maybe_child) {
			return null
		}
		const child = maybe_child.result
		ptr += maybe_child.bytesRead

		return { bytesRead: ptr, result: new Center(tag, child) }
	}

	public override get typeId(): number {
		return 102
	}

	public override bytes(): Uint8Array {
		const writer = new NanoBufWriter(12)
		writer.writeTypeId(102)

		if (this.tag) {
			writer.appendInt32(this.tag)
			writer.writeFieldSize(0, 4)
		} else {
			writer.writeFieldSize(0, -1)
		}

		const childData = this.child.bytes()
		writer.appendBytes(childData)
		writer.writeFieldSize(1, childData.byteLength)

		return writer.bytes
	}

	public override bytesWithLengthPrefix(): Uint8Array {
		const writer = new NanoBufWriter(16, true)
		writer.writeTypeId(102)

		if (this.tag) {
			writer.appendInt32(this.tag)
			writer.writeFieldSize(0, 4)
		} else {
			writer.writeFieldSize(0, -1)
		}

		const childData = this.child.bytes()
		writer.appendBytes(childData)
		writer.writeFieldSize(1, childData.byteLength)

		writer.writeLengthPrefix(writer.currentSize - 4)

		return writer.bytes
	}
}

export { Center }
