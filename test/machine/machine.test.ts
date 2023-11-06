import { InterpreterFrom, interpret } from "xstate"
import { GameMachine, GameModel, makeMachine } from '../../src/machine/GameMachine'
import { describe, beforeEach, it, expect } from 'vitest'
import { dropTokenAction, switchPlayerAction } from "../../src/machine/actions"
import { GameContext, GameStates, PlayerColors } from "../../src/types"
import { canDropTokenGuard } from "../../src/machine/guards"

describe("machine/GameMachine", () => {
	describe("join", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})
		it("first player should be able to join the game", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.state.context.players).length(1)
		})
		it("second player should be able to join the game", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.join('2', '1')).changed).toBe(true)
			expect(machine.state.context.players).length(2)
		})
		it("third player is should not be allow", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.join('2', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.join('3', '1')).changed).toBe(false)
			expect(machine.state.context.players).length(2)
		})
 })
	describe("leave", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})
		it("first player should be able to leave the game", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.leave('1')).changed).toBe(true)
			expect(machine.state.context.players).length(0)
		})
		it("second player should be able to join the game", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.join('2', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.leave('2')).changed).toBe(true)
			expect(machine.state.context.players).length(1)
		})
	})
describe("pickColor", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})
		it("should give yellow color to the player", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor("1", PlayerColors.YELLOW)).changed).toBe(true)
			expect(machine.state.context.players[0].color).toBe(PlayerColors.YELLOW)
		})
		it("should give yellow color to the player", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.join('2', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor("1", PlayerColors.YELLOW)).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor("2", PlayerColors.RED)).changed).toBe(true)
			expect(machine.state.context.players[1].color).toBe(PlayerColors.RED)
		})
	})
	describe("start", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})
		it("should set current player", () => {
			expect(machine.send(GameModel.events.join('1', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.join('2', '1')).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor("1", PlayerColors.YELLOW)).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor("2", PlayerColors.RED)).changed).toBe(true)
			expect(machine.send(GameModel.events.start("1")).changed).toBe(true)
			expect(machine.state.context.currentPlayer).toBe("1")
		})
	})

	describe("dropToken", () => {
		const machine = makeMachine(GameStates.PLAY, {
			players: [{id: "1", name: "1", color: PlayerColors.YELLOW},
				{id: "1", name: "1", color: PlayerColors.YELLOW}],
			currentPlayer: "1",
		grid: [
			['E'], ['E'], ['E'], ['E'], ['E'], ['E'], ['E'],
			['E'], ['E'], ['E'], ['E'], ['E'], ['E'], ['E'],
			['E'], ['E'], ['E'], ['E'], ['E'], ['E'], ['E'],
			['E'], ['E'], ['E'], ['E'], ['E'], ['E'], ['E'],
			['E'], ['E'], ['E'], ['E'], ['E'], ['E'], ['E'],
			['E'], ['E'], ['E'], ['E'], ['E'], ['E'], ['E'],
		]
		})

		it("shoud drop a yellow token", () => {
			expect(canDropTokenGuard(machine.state.context, dropTokenAction("1", 1))).toBe(true)
			//expect(GameMachine.send(GameModel.events.dropToken("1", 1)).changed).toBe(true)
		})
			
	})
})

