import graph from "../data";

/**
 * Controller for adding an edge
 * @param req
 * @param res
 */
export async function getOutboundLinks(req, res) {
  const id = req.params.id;
  try {
    const allNodes = graph.getOutboundLinks(Number(id));
    res.status(200).send(allNodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
