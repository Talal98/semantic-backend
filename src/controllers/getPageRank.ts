import graph from "../data";

export async function getPageRank(req, res) {
  try {
    const pageRank = graph.calculatePageRank();
    res.status(200).send(pageRank);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}
