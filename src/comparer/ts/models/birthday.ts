import fs from "fs";
import YAML from "yaml";

export class Birthday {
  readonly name: string;
  readonly date: string;
  constructor(name: string, date: string) {
    this.name = name;
    this.date = date;
  }

  /**
   * 元になるデータが格納されているディレクトリ
   */
  private static _resourceDirectory: string = "../../data";

  /**
   * 誕生日リストを読み込みます。
   */
  static getBirthdays(): Birthday[] {
    return YAML.parse(
      fs.readFileSync(`${this._resourceDirectory}/birthdays.yaml`, "utf-8")
    )["birthdays"] as Birthday[];
  }
}
