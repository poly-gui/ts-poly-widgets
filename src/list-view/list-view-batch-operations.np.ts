// AUTOMATICALLY GENERATED BY NANOPACK. DO NOT MODIFY BY HAND.

import { NanoBufReader, NanoBufWriter, type NanoPackMessage } from "nanopack"

import { ListViewOperation } from "./list-view-operation.np.js"

class ListViewBatchOperations implements NanoPackMessage {
	public static TYPE_ID = 3604546751

	constructor(public operations: ListViewOperation[]) {}

	public static fromBytes(
		bytes: Uint8Array,
	): { bytesRead: number; result: ListViewBatchOperations } | null {
		const reader = new NanoBufReader(bytes)
		return ListViewBatchOperations.fromReader(reader)
	}

	public static fromReader(
		reader: NanoBufReader,
	): { bytesRead: number; result: ListViewBatchOperations } | null {
		let ptr = 8

		const operationsLength = reader.readInt32(ptr)
		ptr += 4
		const operations: ListViewOperation[] = new Array(operationsLength)
		for (let i = 0; i < operationsLength; i++) {
			const maybeIItem = ListViewOperation.fromReader(reader.newReaderAt(ptr))
			if (!maybeIItem) {
				return null
			}
			const iItem = maybeIItem.result
			ptr += maybeIItem.bytesRead
			operations[i] = iItem
		}

		return { bytesRead: ptr, result: new ListViewBatchOperations(operations) }
	}

	public get typeId(): number {
		return 3604546751
	}

	public bytes(): Uint8Array {
		const writer = new NanoBufWriter(8)
		writer.writeTypeId(3604546751)

		writer.appendInt32(this.operations.length)
		let operationsByteLength = 4
		for (const iItem of this.operations) {
			const iItemData = iItem.bytes()
			writer.appendBytes(iItemData)
			operationsByteLength += iItemData.byteLength
		}
		writer.writeFieldSize(0, operationsByteLength)

		return writer.bytes
	}

	public bytesWithLengthPrefix(): Uint8Array {
		const writer = new NanoBufWriter(8 + 4, true)
		writer.writeTypeId(3604546751)

		writer.appendInt32(this.operations.length)
		let operationsByteLength = 4
		for (const iItem of this.operations) {
			const iItemData = iItem.bytes()
			writer.appendBytes(iItemData)
			operationsByteLength += iItemData.byteLength
		}
		writer.writeFieldSize(0, operationsByteLength)

		writer.writeLengthPrefix(writer.currentSize - 4)

		return writer.bytes
	}
}

export { ListViewBatchOperations }