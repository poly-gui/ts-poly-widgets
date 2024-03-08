// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter } from "nanopack"

import { Widget } from "../widget/widget.np.js"

class ListView extends Widget {
	public static TYPE_ID = 2164488861

	public override readonly typeId: number = 2164488861

	public override readonly headerSize: number = 32

	constructor(
		public tag: number | null,
		public width: number,
		public height: number,
		public sections: number[],
		public itemHeight: number,
		public onCreate: number,
		public onBind: number,
	) {
		super(tag)
	}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: ListView } | null {
		const reader = new NanoBufReader(bytes)
		return ListView.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: ListView } | null {
		let ptr = 32

		let tag: number | null
		if (reader.readFieldSize(0) >= 0) {
			tag = reader.readInt32(ptr)
			ptr += 4
		} else {
			tag = null
		}

		const width = reader.readDouble(ptr)
		ptr += 8

		const height = reader.readDouble(ptr)
		ptr += 8

		const sectionsByteLength = reader.readFieldSize(3)
		const sectionsLength = sectionsByteLength / 4
		const sections: number[] = new Array(sectionsLength)
		for (let i = 0; i < sectionsLength; i++) {
			const iItem = reader.readUint32(ptr)
			ptr += 4
			sections[i] = iItem
		}

		const itemHeight = reader.readDouble(ptr)
		ptr += 8

		const onCreate = reader.readInt32(ptr)
		ptr += 4

		const onBind = reader.readInt32(ptr)
		ptr += 4

		return {
			bytesRead: ptr,
			result: new ListView(
				tag,
				width,
				height,
				sections,
				itemHeight,
				onCreate,
				onBind,
			),
		}
	}

	public override writeTo(writer: NanoBufWriter, offset: number = 0): number {
		const writerSizeBefore = writer.currentSize

		writer.writeTypeId(2164488861, offset)

		if (this.tag) {
			writer.appendInt32(this.tag)
			writer.writeFieldSize(0, 4, offset)
		} else {
			writer.writeFieldSize(0, -1, offset)
		}

		writer.appendDouble(this.width)
		writer.writeFieldSize(1, 8, offset)

		writer.appendDouble(this.height)
		writer.writeFieldSize(2, 8, offset)

		writer.writeFieldSize(3, this.sections.length * 4, offset)
		for (const sections of this.sections) {
			writer.appendUint32(sections)
		}

		writer.appendDouble(this.itemHeight)
		writer.writeFieldSize(4, 8, offset)

		writer.appendInt32(this.onCreate)
		writer.writeFieldSize(5, 4, offset)

		writer.appendInt32(this.onBind)
		writer.writeFieldSize(6, 4, offset)

		return writer.currentSize - writerSizeBefore
	}

	public override bytes(): Uint8Array {
		const writer = new NanoBufWriter(32)
		this.writeTo(writer)
		return writer.bytes
	}
}

export { ListView }
