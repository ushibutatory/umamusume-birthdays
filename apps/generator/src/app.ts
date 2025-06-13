import { Consts } from "./consts";
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
    console.info("読み込んだ誕生日データは以下の通りです。");
    console.info(birthdays);
    const playables = reader.getPlayables();
    console.info("読み込んだ育成可能キャラデータは以下の通りです。");
    console.info(playables);

    const writer = new Writer();
    const generator = new Generator();
    const langs = Object.keys({} as Name) as (keyof Name)[];

    langs.forEach((lang) => {
      // データファイルをiCalendar形式の文字列に変換して書き込み
      // 全員
      const iCalendar_all = generator.generateICalendar(birthdays, lang);
      writer.write(iCalendar_all, lang, Consts.CalendarFileName.All);

      // 育成可能のみ
      const iCalendar_playable = generator.generateICalendar(
        birthdays.filter((_) => playables.names.includes(_.name.ja)),
        lang
      );
      writer.write(iCalendar_playable, lang, Consts.CalendarFileName.Playables);
    });
  }
}

new Application().run();
