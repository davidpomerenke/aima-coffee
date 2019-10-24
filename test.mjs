import { strict as assert } from 'assert'

import { tableVacuumAgent } from './intelligent-agents/table-driven-agent.mjs'
import { reflexVacuumAgent } from './intelligent-agents/simple-reflex-agent.mjs'
import { vacuumWorld, eightPuzzle, eightQueens, knuthConjecture, routeFinding } 
  from './problem-solving/problem.mjs'

// intelligent agents
// -- table-driven agent
assert.equal(tableVacuumAgent.action([['A', 'dirty']]), 'suck')
assert.equal(tableVacuumAgent.action([['A', 'clean']]), 'right')
assert.equal(tableVacuumAgent.action([['B', 'dirty']]), undefined)
// -- simple reflex agent
assert.equal(reflexVacuumAgent.action([['A', 'dirty']]), 'suck')
assert.equal(reflexVacuumAgent.action([['A', 'clean']]), 'right')
assert.equal(reflexVacuumAgent.action([['B', 'dirty']]), 'suck')
assert.equal(reflexVacuumAgent.action([['C', 'dirty']]), 'suck')
assert.equal(reflexVacuumAgent.action([['C', 'clean']]), undefined)
// problem solving
// -- toy problems
// -- -- vacuum world
assert.deepEqual(vacuumWorld.state, { location: 'A', A: 'dirty', B: 'dirty' })
vacuumWorld.action('suck')
assert.deepEqual(vacuumWorld.state, { location: 'A', A: 'clean', B: 'dirty' })
vacuumWorld.action('suck')
assert.deepEqual(vacuumWorld.state, { location: 'A', A: 'clean', B: 'dirty' })
vacuumWorld.action('left')
assert.deepEqual(vacuumWorld.state, { location: 'A', A: 'clean', B: 'dirty' })
vacuumWorld.action('right')
assert.deepEqual(vacuumWorld.state, { location: 'B', A: 'clean', B: 'dirty' })
assert(!vacuumWorld.isSolved)
vacuumWorld.action('suck')
assert.deepEqual(vacuumWorld.state, { location: 'B', A: 'clean', B: 'clean' })
assert(vacuumWorld.isSolved)
// -- -- eight puzzle
assert.deepEqual(eightPuzzle.state, [
  [1, 4, 2],
  [3, 0, 5],
  [6, 7, 8]
])
eightPuzzle.action('up')
assert.deepEqual(eightPuzzle.state, [
  [1, 0, 2],
  [3, 4, 5],
  [6, 7, 8]
])
assert(!eightPuzzle.isSolved)
eightPuzzle.action('left')
assert.deepEqual(eightPuzzle.state, [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
])
assert(eightPuzzle.isSolved)
// -- -- eight queens
eightQueens.action(3)
assert.deepEqual(eightQueens.state, [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
])
eightQueens.action(3)
assert.deepEqual(eightQueens.state, [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
])
eightQueens.action(5)
assert.deepEqual(eightQueens.state, [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
])
eightQueens.action(1)
assert.deepEqual(eightQueens.state, [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
])
// -- -- knuth conjecture
knuthConjecture.action('factorial')
knuthConjecture.action('factorial')
knuthConjecture.action('squareRoot')
knuthConjecture.action('squareRoot')
knuthConjecture.action('squareRoot')
knuthConjecture.action('squareRoot')
knuthConjecture.action('squareRoot')
knuthConjecture.action('floor')
assert(knuthConjecture.isSolved)
// -- real world problems
// -- -- route finding
assert.equal(routeFinding.state, 'Arad')
routeFinding.action('Sibiu')
assert.equal(routeFinding.state, 'Sibiu')
assert.equal(routeFinding.pathCost, 140)
routeFinding.action('RimnicuVilcea')
assert.equal(routeFinding.state, 'RimnicuVilcea')
assert.equal(routeFinding.pathCost, 220)
routeFinding.action('Arad')
assert.equal(routeFinding.state, 'RimnicuVilcea')
assert.equal(routeFinding.pathCost, Infinity)
