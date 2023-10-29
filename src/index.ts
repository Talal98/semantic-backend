import express from "express";
import body from "body-parser";
import router from "./routes/graph";
import cors from "cors";

async function start() {
  try {
    const app = express();

    app.use(cors());

    app.use(
      body.json({
        limit: "500kb",
      })
    );

    // Routes
    app.use("/graph", router);

    // Start server
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
