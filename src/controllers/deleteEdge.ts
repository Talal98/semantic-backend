import graph from "../data";

/**
 * Controller for adding an edge
 * @param req
 * @param res
 */
export async function deleteEdge(req, res) {
  const { source, target } = req.body;
  try {
    graph.deleteEdge(source, target);
    const allNodes = graph.getAllNodes();
    res.status(200).send(allNodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
