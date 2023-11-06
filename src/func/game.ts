import { Position, Size, CellState, GridState } from "../types"

export function emptyCellRow(grid: GridState, x: number): number {
	/*
	for (let y = 0; y < grid.length; y++) {
		if (grid[x][y] === 'E')
			return y
	}
	return -1
	*/
	return 0
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
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 'E') 
				count++
		}
	}
	return count
}
