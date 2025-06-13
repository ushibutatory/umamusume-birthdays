import fs from "fs";
import path from "path";
import { Consts } from "./consts";
import { Birthday } from "./models/Birthday";
import { Playables } from "./models/Playable";

/**
 * マスターファイル読み込みクラス
 */
export class Reader {
  /**
   * 元になるデータが格納されているディレクトリ
   */
  private readonly _masterDirectory: string;

  constructor(masterDirectory: string = "master") {
    if (!masterDirectory.trim()) {
      throw new Error("Master directory path cannot be empty");
    }
    this._masterDirectory = masterDirectory;

    // ディレクトリの存在確認
    if (!fs.existsSync(this._masterDirectory)) {
      throw new Error(
        `Master directory does not exist: ${this._masterDirectory}`
      );
    }
  }

  /**
   * 誕生日リストを読み込みます。
   */
  public getBirthdays(): Birthday[] {
    return this.readAndParse(Consts.MasterFileName.Birthdays, Birthday.parse);
  }

  /**
   * 育成可能キャラ名リストを読み込みます。
   */
  public getPlayables(): Playables {
    return this.readAndParse(Consts.MasterFileName.Playables, Playables.parse);
  }

  /**
   * ファイルを読み込んでパースします。
   * @template T パース結果の型
   * @param fileName 読み込むファイル名
   * @param parser パース関数 - ファイル内容を受け取り、型Tのオブジェクトを返す
   * @returns パースされたオブジェクト
   * @throws {Error} ファイルが存在しない、読み込み失敗、またはパース失敗時
   */
  private readAndParse<T>(fileName: string, parser: (content: string) => T): T {
    const filePath = path.join(this._masterDirectory, fileName);

    try {
      // ファイル存在チェック
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const content = fs.readFileSync(filePath, "utf-8");
      return parser(content);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse file ${fileName}: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
}
