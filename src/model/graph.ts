import { GraphNode } from "../typings";

export class Graph {
  graphData: Map<number, GraphNode>;

  constructor() {
    this.graphData = new Map<number, GraphNode>();
  }

  private checkNodeName(name: string): boolean {
    return Array.from(this.graphData.values()).some(
      (node) => node.name === name
    );
  }

  addNode(node: GraphNode) {
    if (!node.name) {
      throw new Error("Node name is required");
    }
    if (this.graphData.has(node.id)) {
      throw new Error("Node ID already exists");
    }
    if (this.checkNodeName(node.name)) {
      throw new Error("Node name already exists");
    }
    this.graphData.set(node.id, node);
  }

  addEdge(fromNodeId: number, toNodeId: number) {
    if (fromNodeId === toNodeId) {
      throw new Error("Both Edge Same");
    }
    const fromNode = this.graphData.get(fromNodeId);
    const toNode = this.graphData.get(toNodeId);
    if (fromNode && toNode) {
      if (
        fromNode.outbound_links.includes(toNodeId) ||
        toNode.inbound_links.includes(fromNodeId)
      ) {
        throw new Error("Edge already exists");
      } else {
        fromNode.outbound_links.push(toNodeId);
        toNode.inbound_links.push(fromNodeId);
      }
    } else {
      throw new Error(
        `Nodes with IDs ${fromNodeId} and/or ${toNodeId} do not exist`
      );
    }
  }

  deleteEdge(fromNodeId: number, toNodeId: number) {
    if (fromNodeId === toNodeId) {
      throw new Error("Both Node Same");
    }
    const fromNode = this.graphData.get(fromNodeId);
    const toNode = this.graphData.get(toNodeId);
    if (fromNode && toNode) {
      if (
        fromNode.outbound_links.includes(toNodeId) ||
        toNode.inbound_links.includes(fromNodeId)
      ) {
        fromNode.outbound_links = fromNode.outbound_links.filter(
          (id) => id !== toNodeId
        );
        toNode.inbound_links = toNode.inbound_links.filter(
          (id) => id !== fromNodeId
        );
      } else {
        throw new Error("Edge doesn't exists");
      }
    } else {
      throw new Error(
        `Nodes with IDs ${fromNodeId} and/or ${toNodeId} do not exist`
      );
    }
  }

  getGraphNode(id: number): GraphNode | undefined {
    return this.graphData.get(id);
  }

  getAllNodes(): GraphNode[] {
    return Array.from(this.graphData.values());
  }

  getLength(): number {
    return this.graphData.size;
  }

  getOutboundLinks(id: number): GraphNode[] {
    const node = this.graphData.get(id);
    if (node) {
      const neighbors = node.outbound_links.map((id) => this.graphData.get(id));
      return neighbors.filter((neighbor) => neighbor !== undefined);
    } else {
      throw new Error(`Node with ID ${id} does not exist`);
    }
  }

  getInboundLinks(id: number): GraphNode[] {
    const node = this.graphData.get(id);
    if (node) {
      const neighbors = node.inbound_links.map((id) => this.graphData.get(id));
      return neighbors.filter((neighbor) => neighbor !== undefined);
    } else {
      throw new Error(`Node with ID ${id} does not exist`);
    }
  }

  calculatePageRank(
    iterations = 1,
    dampingFactor = 0.85
  ): { id: number; pageRank: number }[] {
    const pageRanks = new Map<number, number>();
    const totalNodes = this.graphData.size;
    const initialPageRank = 1 / totalNodes;

    // Initialize PageRank values
    for (const [id, _] of this.graphData) {
      pageRanks.set(id, initialPageRank);
    }

    // Perform PageRank iterations
    for (let i = 0; i < iterations; i++) {
      const newPageRanks = new Map<number, number>();
      for (const [id, node] of this.graphData) {
        let rank = (1 - dampingFactor) / totalNodes;
        for (const inboundId of node.inbound_links) {
          const inboundNode = this.graphData.get(inboundId);
          if (inboundNode) {
            const numOutboundLinks = inboundNode.outbound_links.length;
            const inboundPageRank = pageRanks.get(inboundId) || 0;
            rank += dampingFactor * (inboundPageRank / numOutboundLinks);
          }
        }
        newPageRanks.set(id, rank);
      }
      pageRanks.clear();
      for (const [id, rank] of newPageRanks) {
        pageRanks.set(id, rank);
      }
    }

    const pageRanksList = Array.from(pageRanks).map(([id, pageRank]) => ({
      id,
      pageRank,
    }));
    return pageRanksList;
  }
}
