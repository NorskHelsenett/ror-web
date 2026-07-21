/**
 * Interface of a resource in Node, as gotten from clusterlistview
 *
 * @param {string} capacity - The capacity value (e.g., "8" for CPU, "32845072Ki" for memory)
 * @param {string} allocated - The allocated value (e.g., "292257902n" for CPU, "5277000Ki" for memory)
 */
export interface NodeResource {
  capacity: string
  allocated: string
}

/**
 * Interface for a node, as gotten from clusterlistview
 *
 * @param {string} name - The node name
 * @param {NodeResource} cpu - CPU capacity and allocated values
 * @param {NodeResource} memory - Memory capacity and allocated values
 * @param {string} architecture - The node architecture (e.g., "amd64")
 * @param {string} kubernetesVersion - The Kubernetes version running on the node
 */
export interface Node {
  name: string
  cpu: NodeResource
  memory: NodeResource
  architecture: string
  kubernetesVersion: string
}

/**
 * Interface for a nodepool, as gotten from clusterlistview
 *
 * @param {string} name - The nodepool name
 * @param {Node[]} nodes - Array of nodes in this nodepool
 */
export interface Nodepool {
  name: string
  nodes: Node[]
}
