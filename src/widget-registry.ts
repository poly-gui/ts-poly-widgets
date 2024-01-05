class WidgetRegistry {
	private widgetIds = new Set<number>()

	public newId() {
		let id: number
		do {
			id = Math.floor(Math.random() * 2147483648)
		} while (this.widgetIds.has(id))
		return id
	}
}

export { WidgetRegistry }
