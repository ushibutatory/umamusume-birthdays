import fs from "fs";
import { Name } from "./models/Name";

export class Writer {
  /**
   * 配信用データを格納するディレクトリ
   */
  private readonly _distDirectory: string = "dist";

  public write(iCalendarString: string, lang: keyof Name, fileName: string) {
    const directory = `${this._distDirectory}/${lang}`;

    // フォルダなければ作る
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(`${directory}/${fileName}`, iCalendarString, {
      encoding: "utf-8",
    });
  }
}
