import { InterpreterFrom, interpret } from "xstate"
import { GameMachine, GameModel } from '../../src/machine/GameMachine'
import { describe, beforeEach, it, expect } from 'vitest'
import { switchPlayerAction } from "../../src/machine/actions"
import { PlayerColors } from "../../src/types"

describe("machine/guards", () => {

	describe("canJoinGame", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})

		it('should let a player join', () => {
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
		})

		it('should not let a player join twice', () => {
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(false)
		})

	})

	describe("canLeaveGuard", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})

		it("should let a player leave", () => {
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.leave("1")).changed).toBe(true)
		})

	})
	describe("canPickColorGuard", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})

		it("should receive red color", () => {
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor('1', PlayerColors.RED)).changed).toBe(true)
		})
	})
	describe("canStartGuard", () => {
		let machine: InterpreterFrom<typeof GameMachine>

		beforeEach(() => {
			machine = interpret(GameMachine).start()
		})

		it("should be able to start game", () => {
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.join("2", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor('1', PlayerColors.RED)).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor('2', PlayerColors.YELLOW)).changed).toBe(true)
			expect(machine.send(GameModel.events.start('1')).changed).toBe(true)
		})
		it("cannot start with one player", () => {
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor('1', PlayerColors.RED)).changed).toBe(true)
			expect(machine.send(GameModel.events.start('1')).changed).toBe(false)
		})
		it("cannot start with one player missing color", () => {
			expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.join("2", "1")).changed).toBe(true)
			expect(machine.send(GameModel.events.pickColor('1', PlayerColors.RED)).changed).toBe(true)
			expect(machine.send(GameModel.events.start('1')).changed).toBe(false)
		})
	})
})

