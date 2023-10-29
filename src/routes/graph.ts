import {
  addEdge,
  addNode,
  getGraphNodes,
  getInboundLinks,
  getOutboundLinks,
  getPageRank,
} from "../controllers";

const express = require("express");
const router = express.Router();

router.get("/", getGraphNodes);
router.get("/:id/inbound", getInboundLinks);
router.get("/:id/outbound", getOutboundLinks);
router.get("/pageRank", getPageRank);

router.patch("/", addEdge);

router.post("/", addNode);

export default router;
