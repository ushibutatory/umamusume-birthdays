import { Consts } from "./consts";
import { Generator } from "./generator";
import { MasterReader, MasterData, Name } from "@umamusume-birthdays/shared";
import { CalendarWriter } from "./writer";

/**
 * アプリケーション本体
 */
export class Application {
  /**
   * 一連の処理を実行します。
   */
  public run(): void {
    try {
      // データファイル読み込み
      const data = this.load();

      // カレンダー更新
      this.write(data);

      console.log("✅ 正常終了しました。");
    } catch (error) {
      console.error("❌ 異常終了しました。", error);
      throw error;
    }
  }

  /**
   * データを読み込みます。
   */
  private load(): MasterData {
    const reader = new MasterReader();
    const birthdays = reader.getBirthdays();
    console.info("💡読み込んだ誕生日データは以下の通りです。");
    console.info(birthdays);
    const playables = reader.getPlayables();
    console.info("💡読み込んだ育成可能キャラデータは以下の通りです。");
    console.info(playables);

    return {
      birthdays,
      playables,
    };
  }

  /**
   * iCalendarファイルを作成・更新します。
   */
  private write(data: MasterData): void {
    const writer = new CalendarWriter();
    const generator = new Generator();
    const langs = ["ja", "en"] as const satisfies readonly (keyof Name)[];

    langs.forEach((lang) => {
      console.log(`対象言語: ${lang}`);

      // データファイルをiCalendar形式の文字列に変換して書き込み
      // 全員
      const iCalendar_all = generator.generateICalendar(data.birthdays, lang);
      writer.write(iCalendar_all, lang, Consts.CalendarFileName.All);

      // 育成可能のみ
      const iCalendar_playable = generator.generateICalendar(
        data.birthdays.filter((_) => data.playables.names.includes(_.name.ja)),
        lang,
      );
      writer.write(iCalendar_playable, lang, Consts.CalendarFileName.Playables);
    });
  }
}

new Application().run();
