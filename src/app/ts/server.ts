import express from "express";
import rateLimit from "express-rate-limit";
import { readFile } from "fs";

const PORT = process.env.PORT || 8080;

const app: express.Express = express();

app.use(
  // limit each IP
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150,
  })
);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.get("/", (req: express.Request, res: express.Response) => {
  // 返すファイルを判定
  const fileName = (() => {
    switch (req.query.filter) {
      case "t": // NOTE: 旧仕様との後方互換性のために残してある
      case "p":
        return "birthdays_p";
      default:
        return "birthdays";
    }
  })();

  // ファイル内容を返す
  readFile(`data/${fileName}.ics`, (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).end();
      return;
    }

    res.setHeader("Content-Type", "text/calendar; charset=UTF-8");
    res.status(200).send(data);
  });
});
