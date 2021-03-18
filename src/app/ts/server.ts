import express from "express";
import { readFile } from "fs";

// run application.
const PORT = process.env.PORT || 8080;

const app: express.Express = express();
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.get("/", (req: express.Request, res: express.Response) => {
  // load file
  readFile("data/birthdays.ical", (error, data) => {
    if (error) throw error;

    // send
    res.setHeader("Content-Type", "text/calendar; charset=UTF-8");
    res.status(200).send(data);
  });
});
