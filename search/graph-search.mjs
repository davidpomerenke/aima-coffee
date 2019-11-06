import deepEqual from 'deep-equal'

export const makeGraphSearch = Queue => problem => {
  const frontier = new Queue()
  frontier.add(problem.rootNode)
  const explored = new Set()
  let node
  while (frontier.length > 0) {
    node = frontier.poll()
    if (problem.goalTest(node.state)) return node
    explored.add(node)
    for (const child of problem.expand(node)) {
      if (!frontier.some(node => node.state === child.state) && !explored.has(child)) {
        frontier.add(child)
      } else if (frontier.constructor.name === 'PriorityQueue') {
        const frontierChild = frontier.find(node => deepEqual(node.state, child.state))
        if (
          typeof frontierChild !== 'undefined' &&
          frontierChild.pathCost > child.pathCost
        ) {
          frontier.replace(frontierChild, child)
        }
      }
    }
  }
  return false
}