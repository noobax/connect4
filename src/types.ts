import { ContextFrom, EventFrom } from "xstate"
import { GameModel } from "./machine/GameMachine"

export enum PlayerColors {
	RED = 'R',
	YELLOW = 'Y',
}

export enum GameStates {
	LOBBY = 'LOBBY',
	PLAY = 'PLAY',
	VICTORY = 'VICTORY',
	DRAW = 'DRAW',
}

export type Position = {
	x: number,
	y: number
}

export type Direction = {
	i: number,
	j: number
}

export type Size = {
	i: number,
	j: number
}

export type Player = {
	id: string,
	name: string,
	color?: PlayerColors
}

export type Empty = 'E'
export type CellState = 'R' | 'Y' | Empty | PlayerColors.RED | PlayerColors.YELLOW
export type GridState = CellState[][]
export type GameContext = ContextFrom<typeof GameModel>
export type GameEvents = EventFrom<typeof GameModel>
export type GameEvent<T extends GameEvents["type"]> = GameEvents & {type: T}

export type GameGuard<T extends GameEvents["type"]> = (
	context: GameContext,
	event: GameEvent<T>
) => boolean

export type GameAction<T extends GameEvents["type"]> = (
	context: GameContext,
	event: GameEvent<T>
) => Partial<GameContext>

