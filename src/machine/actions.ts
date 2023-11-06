import { emptyCellRow } from "../func/game";
import { GameAction, PlayerColors } from "../types";
import { GameModel } from "./GameMachine";


export const joinGameAction: GameAction<"join"> = (context, event) => ({
	players: [...context.players, { id: event.playerId, name: event.playerName }]
})

export const leaveGameAction: GameAction<"leave"> = (context, event) => ({
	players: context.players.filter(p => p.id !== event.playerId)
})

export const pickColorAction: GameAction<"pickColor"> = (context, event) => ({
	players: context.players.map((p) => {
		if (p.id === event.playerId)
			p.color = event.color
		return p
	})
})

export const setCurrentPlayerAction: GameAction<"start"> = (context) => ({
	currentPlayer: context.players.filter(p => p.color === PlayerColors.YELLOW)[0].id
})

export const switchPlayerAction: GameAction<"dropToken"> = (content) => ({
	currentPlayer: content.players.filter(p => p.id !== content.currentPlayer)[0].id
})

export const dropTokenAction: GameAction<"dropToken"> = (context, event) => {
	const y = emptyCellRow(context.grid, event.x)
	if (y >= 0)
		return {grid: context.grid.map((row, j) => {
			if (j === y)
				row[event.x] = context.players.filter(p => p.id === event.playerId)[0].color
		})}
}

export const restartGameAction: GameAction<"restart"> = () => ({
	winningPos: GameModel.initialContext.winningPos,
	grid: GameModel.initialContext.grid,
	currentPlayer: null
})
