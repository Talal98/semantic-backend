import graph from "../data";
import { GraphNode } from "../typings";

/**
 * Controller for adding a node
 * @param req
 * @param res
 */
export async function addNode(req, res) {
  const { name } = req.body; // Assuming the request contains the node's ID and name

  const id = graph.getLength() + 1;

  const newNode: GraphNode = {
    id,
    name,
    outbound_links: [],
    inbound_links: [],
  };

  try {
    graph.addNode(newNode);
    res.status(200).send(newNode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
