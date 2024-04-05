type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

interface FontStyle {
	fontFamily: string
	fontWeight: FontWeight
	fontSize: number
}

export type { FontStyle, FontWeight }
