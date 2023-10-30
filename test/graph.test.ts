import { Graph } from "../src/model";
import { GraphNode } from "../src/typings";

test("Add Node", () => {
  const graph = new Graph();
  // Creating a new node
  const newNode: GraphNode = {
    id: 1,
    name: "Test",
    outbound_links: [],
    inbound_links: [],
  };

  // Add new node to graph
  graph.addNode(newNode);

  // Getting added node from graph
  const queryNode = graph.getGraphNode(1);

  // Checking if node is equal to added node
  expect(queryNode).toEqual(newNode);
});

test("Add Nodes", () => {
  const graph = new Graph();
  // Creating new nodes
  const newNode1: GraphNode = {
    id: 1,
    name: "Test 1",
    outbound_links: [],
    inbound_links: [],
  };
  const newNode2: GraphNode = {
    id: 2,
    name: "Test 2",
    outbound_links: [],
    inbound_links: [],
  };

  // Add new nodes to graph
  graph.addNode(newNode1);
  graph.addNode(newNode2);

  // Getting all nodes from graph
  const allNodes = graph.getAllNodes();

  expect(allNodes).toEqual([newNode1, newNode2]);
});

test("Add Edges", () => {
  const graph = new Graph();
  // Creating new nodes
  const newNode1: GraphNode = {
    id: 1,
    name: "Test 1",
    outbound_links: [],
    inbound_links: [],
  };
  const newNode2: GraphNode = {
    id: 2,
    name: "Test 2",
    outbound_links: [],
    inbound_links: [],
  };

  // Add new nodes to graph
  graph.addNode(newNode1);
  graph.addNode(newNode2);

  // Adding a edge from node1 to node2
  graph.addEdge(1, 2);

  // Getting all nodes from graph
  const allNodes = graph.getAllNodes();

  expect(allNodes).toEqual([
    { ...newNode1, outbound_links: [2] },
    { ...newNode2, inbound_links: [1] },
  ]);
});

test("PageRank", () => {
  const graph = new Graph();
  // Creating new nodes
  const newNode1: GraphNode = {
    id: 1,
    name: "Test 1",
    outbound_links: [],
    inbound_links: [],
  };
  const newNode2: GraphNode = {
    id: 2,
    name: "Test 2",
    outbound_links: [],
    inbound_links: [],
  };

  // Add new nodes to graph
  graph.addNode(newNode1);
  graph.addNode(newNode2);

  // Adding a edge from node1 to node2
  graph.addEdge(1, 2);

  // Getting all nodes from graph
  const allNodes = graph.calculatePageRank();

  expect(allNodes).toEqual([
    { id: 1, pageRank: 0.07500000000000001 },
    { id: 2, pageRank: 0.5 },
  ]);
});
