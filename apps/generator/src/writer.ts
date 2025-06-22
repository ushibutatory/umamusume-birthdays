import fs from "fs";
import path from "path";
import { Name } from "@umamusume-birthdays/shared";

/**
 * カレンダー書き込みクラス
 */
export class CalendarWriter {
  /**
   * 配信用データを格納するディレクトリ
   */
  private readonly _distDirectory: string;

  public constructor(distDirectory: string = "dist") {
    if (!distDirectory.trim()) {
      throw new Error("Distribution directory cannot be empty");
    }
    this._distDirectory = distDirectory;
  }

  /**
   * iCalendarデータをファイルに書き込みます。
   * @param iCalendarString 書き込むiCalendarデータ
   * @param lang 言語（ディレクトリ名として使用）
   * @param fileName 出力ファイル名
   * @throws {Error} ファイル書き込みに失敗した場合
   */
  public write(iCalendarString: string, lang: keyof Name, fileName: string): void {
    if (!iCalendarString.trim()) {
      throw new Error("iCalendar string cannot be empty");
    }
    if (!fileName.trim()) {
      throw new Error("File name cannot be empty");
    }

    try {
      const directory = path.join(this._distDirectory, lang);

      if (!fs.existsSync(directory)) {
        console.info(`📁 ディレクトリを作成しました。: ${directory}`);
        fs.mkdirSync(directory, { recursive: true });
      }

      const filePath = path.join(directory, fileName);
      fs.writeFileSync(filePath, iCalendarString, { encoding: "utf-8" });
      console.info(`✅ ファイルを作成しました。: ${filePath}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to write file ${fileName}: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
}
