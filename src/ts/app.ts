import { Constants } from "./consts";
import { Generator } from "./generator";
import { Name } from "./models/Name";
import { Reader } from "./reader";
import { Writer } from "./writer";

export class Application {
  /**
   * 一連の処理を実行します。
   */
  run(): void {
    // データファイル読み込み
    const reader = new Reader();
    const birthdays = reader.getBirthdays();
    console.log("読み込んだ誕生日データは以下の通りです。");
    console.log(birthdays);
    const playables = reader.getPlayables();
    console.log("読み込んだ育成可能キャラデータは以下の通りです。");
    console.log(playables);

    const writer = new Writer();
    const generator = new Generator();
    new Array<keyof Name>("ja", "en").forEach((lang) => {
      // データファイルをiCalendar形式の文字列に変換して書き込み
      // 全員
      const iCalendar_all = generator.generateICalendar(birthdays, lang);
      writer.write(iCalendar_all, lang, Constants.CalendarFileName.All);

      // 育成可能のみ
      const iCalendar_playable = generator.generateICalendar(
        birthdays.filter((_) => playables.names.includes(_.name.ja)),
        lang
      );
      writer.write(
        iCalendar_playable,
        lang,
        Constants.CalendarFileName.Playables
      );
    });
  }
}

new Application().run();
