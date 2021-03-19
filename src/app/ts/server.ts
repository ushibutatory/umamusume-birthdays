import express from "express";
import { readFile } from "fs";

const PORT = process.env.PORT || 8080;

const app: express.Express = express();
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.get("/", (req: express.Request, res: express.Response) => {
  readFile("data/birthdays.ics", (error, data) => {
    if (error) throw error;

    res.setHeader("Content-Type", "text/calendar; charset=UTF-8");
    res.status(200).send(data);
  });
});
