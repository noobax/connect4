import { InterpreterFrom, createMachine, interpret } from "xstate";
import { createModel } from 'xstate/lib/model';
import { Player, GridState, PlayerColors, Position, GameStates, GameContext} from "../types";
import { canDropTokenGuard, canJoinGuard, canLeaveGuard, canPickColorGuard, canStartGuard, isDrawMoveGuard, isWinningMoveGuard } from "./guards";
import { dropTokenAction, joinGameAction, leaveGameAction, pickColorAction, restartGameAction, setCurrentPlayerAction, switchPlayerAction } from "./actions";


export const GameModel = createModel({
	players: [] as Player[],
	currentPlayer: null as null | Player['id'],
	rowLength: 4,
	winningPos: {} as Position,
	grid: [
		['E', 'E', 'E', 'E', 'E', 'E', 'E'],
		['E', 'E', 'E', 'E', 'E', 'E', 'E'],
		['E', 'E', 'E', 'E', 'E', 'E', 'E'],
		['E', 'E', 'E', 'E', 'E', 'E', 'E'],
		['E', 'E', 'E', 'E', 'E', 'E', 'E'],
		['E', 'E', 'E', 'E', 'E', 'E', 'E']
	] as GridState,
	}, {
	events: {
		join: (playerId: Player['id'], playerName: Player['name']) => ({playerId, playerName}),
		leave: (playerId: Player['id']) => ({playerId}),
		start: (playerId: Player['id']) => ({playerId}),
		pickColor: (playerId: Player['id'], color: PlayerColors) => ({playerId, color}),
		dropToken: (playerId: Player['id'], x: number) => ({playerId, x}),
		restart: (playerId: Player['id']) => ({playerId})
	}
})

export const GameMachine = GameModel.createMachine({
	predictableActionArguments: true,
	id:'game',
	initial:GameStates.LOBBY,
	context: GameModel.initialContext,
	states:{
		[GameStates.LOBBY]: {
			on: {
				join: {
					cond: canJoinGuard,
					target: GameStates.LOBBY,
					actions: [GameModel.assign(joinGameAction)]
				},
				leave: {
					cond: canLeaveGuard,
					target: GameStates.LOBBY,
					actions: [GameModel.assign(leaveGameAction)]
				},
				pickColor: {
					cond: canPickColorGuard,
					target: GameStates.LOBBY,
					actions: [GameModel.assign(pickColorAction)]
				},
				start: {
					cond: canStartGuard,
					target: GameStates.PLAY,
					actions: [GameModel.assign(setCurrentPlayerAction)]
				}
			}
		},
		[GameStates.PLAY]: {
			on: {
				dropToken: [
					{
						cond: isWinningMoveGuard,
						target: GameStates.VICTORY,
						actions: [GameModel.assign(dropTokenAction)]
					},
					{
						cond: isDrawMoveGuard,
						target: GameStates.DRAW,
						actions: [GameModel.assign(dropTokenAction)]
					},
					{
					cond: canDropTokenGuard,
					target: GameStates.PLAY,
					actions: [GameModel.assign(dropTokenAction), GameModel.assign(switchPlayerAction)]
					}
				]
			}
		},
		[GameStates.VICTORY]: {
			on: {
				restart: {
					target: GameStates.LOBBY,
					actions: [GameModel.assign(restartGameAction)]
				}
			}
		},
		[GameStates.DRAW]: {
			on: {
				restart: {
					target: GameStates.LOBBY,
					actions: [GameModel.assign(restartGameAction)]
				}
			}
		}
	}
})

export function makeMachine(state: GameStates = GameStates.LOBBY, context: Partial<GameContext> = {}): InterpreterFrom<typeof GameMachine> {
	const machine =  interpret(
		GameMachine.withContext({
			...GameModel.initialContext,
			...context
		})
	).start()
	machine.state.value = state
	return machine
}
