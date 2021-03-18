import express from "express";

// run application.
const PORT = process.env.PORT || 8080;

const app: express.Express = express();
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("this is express application.");
});
