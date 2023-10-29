import graph from "../data";

/**
 * Controller for getting the graph
 * @param req
 * @param res
 */
export async function getGraphNodes(req, res) {
  try {
    const allNodes = graph.getAllNodes();
    res.status(200).send(allNodes);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}
