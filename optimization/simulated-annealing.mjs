import gen from 'random-seed'

export const simulatedAnnealing = (problem, schedule = time => 1 / time, seed) => {
  const rand = gen.create(seed) // random seed initialization for testing
  const randEl = (array) => array[Math.floor(rand.random() * array.length)]

  let current = problem.rootNode
  let time = 1
  let temp = schedule(1)
  let next
  let evalSlope
  while (temp > 0) {
    temp = schedule(time)
    if (temp === 0) return current

    next = randEl(problem.expand(current))
    evalSlope = next.value - current.value

    if (evalSlope > 0) current = next
    else if (Math.E ** (evalSlope / temp) * rand.random() > 0.5) current = next
    time += 1
  }
}