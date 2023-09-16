import fs from "fs";
import { Constants } from "./consts";
import { Birthday } from "./models/Birthday";
import { Playables } from "./models/Playable";

/**
 * マスターファイル読み込みクラス
 */
export class Reader {
  /**
   * 元になるデータが格納されているディレクトリ
   */
  private readonly _masterDirectory: string = "master";

  /**
   * 誕生日リストを読み込みます。
   */
  public getBirthdays(): Birthday[] {
    const path = `${this._masterDirectory}/${Constants.MasterFileName.Birthdays}`;
    return Birthday.parse(fs.readFileSync(path, "utf-8"));
  }

  /**
   * 育成可能キャラ名リストを読み込みます。
   */
  public getPlayables(): Playables {
    const path = `${this._masterDirectory}/${Constants.MasterFileName.Playables}`;
    return Playables.parse(fs.readFileSync(path, "utf-8"));
  }
}
