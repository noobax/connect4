import { Position, Size, CellState, GridState } from "../types"

export function emptyCellRow(grid: GridState, x: number): number {
	for (let y = grid.length -1; y >= 0; y--) {
		if (grid[y][x] === 'E')
			return y
	}
	return -1
}

export function winningRowPosition(grid, color, x, requiredLen) {
	/*
	* [
	*		[x,x,x,x,x,x,x]
	*		[x,x,x,x,x,x,x]
	*		[x,x,x,x,x,x,x]
	*		[x,x,x,x,x,x,x]
	*		[x,x,x,x,x,x,x]
	*		[x,x,x,x,x,x,x]
	* ]
	*/
	return []
}

export function gridCellLeft(grid: GridState): number {
	let count = 0
		for (let j = 0; j < grid.length; j++) {
			for (let i = 0; i < grid[j].length; i++) {
				count++
			}
		}
	return count
}
