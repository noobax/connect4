import { Position, Size, CellState, GridState, PlayerColors, Direction } from "../types"

export function emptyCellRow(grid: GridState, x: number): number {
	for (let y = grid.length -1; y >= 0; y--) {
		if (grid[y][x] === 'E')
			return y
	}
	return -1
}

export function winningRowPosition(grid: GridState, color: PlayerColors, x: number, rowLen: number): Position[] {
	const y = emptyCellRow(grid, x)
	if (y === -1) return []
	const directions = [
		[{i: 1, j: 0}, {i: -1, j: 0}], //hor
		[{i: 0, j: 1}, {i: 0, j: -1}], //ver
		[{i: 1, j: 1}, {i: -1, j: -1}],//diag1
		[{i: 1, j: -1}, {i: -1, j: 1}] //diag2
	] as Direction[][]
	for (let d of directions) {
		let d1 = tokenStreak(grid, color, {x: (x + d[0].i), y: (y + d[0].j)}, d[0])
		let d2 = tokenStreak(grid, color, {x: (x + d[1].i), y: (y + d[1].j)}, d[1])
		if (d1 + d2 + 1 >= rowLen)
			return [
				{x: (x + (d1 * d[0].i)), y: (y + (d1 * d[0].j))},
				{x: (x + (d2 * d[1].i)), y: (y + (d2 * d[1].j))}
			]
	}
	return []
}

function tokenStreak(grid: GridState, color: PlayerColors, pos: Position, dir: Direction): number {
	if (pos.x >= grid[0].length || pos.x < 0 || pos.y >= grid.length || pos.y < 0)
		return 0
	if (grid[pos.y][pos.x] === color)
		return 1 + tokenStreak(grid, color, {x: pos.x + dir.i, y: pos.y + dir.j}, dir)
	return 0
}

export function gridCellLeft(grid: GridState): number {
	let count = 0
		for (let j = 0; j < grid.length; j++) {
			for (let i = 0; i < grid[j].length; i++) {
				if (grid[j][i] === 'E')
					count++
			}
		}
	return count
}
