import fs, { WriteFileOptions } from "fs";
import moment from "moment";
import { Birthday } from "./models/Birthday";
import { CalendarEvent } from "./models/CalendarEvent";
import { Playables } from "./models/Playable";

export class Generator {
  // TODO: パス指定の方法がイマイチ
  /**
   * 元になるデータが格納されているディレクトリ
   */
  private readonly _resourceDirectory: string = "../../data";

  /**
   * 配信用データを格納するディレクトリ
   */
  private readonly _publishDirectory: string = "data";

  /**
   * 一連の処理を実行します。
   */
  run(): void {
    // データファイル読み込み
    const birthdays = this.getBirthdays();
    console.log("読み込んだ誕生日データは以下の通りです。");
    console.log(birthdays);
    const playables = this.getPlayables();
    console.log("読み込んだ育成可能キャラデータは以下の通りです。");
    console.log(playables);

    // iCalendar形式でファイル生成
    // TODO: パス指定がイマイチ
    if (!fs.existsSync(this._publishDirectory)) {
      fs.mkdirSync(this._publishDirectory);
    }
    const options: WriteFileOptions = {
      encoding: "utf-8",
    };

    // 全ウマ娘
    fs.writeFileSync(
      `${this._publishDirectory}/birthdays.ics`,
      this.generateICalendar(birthdays),
      options
    );

    // 育成可能なウマ娘
    fs.writeFileSync(
      `${this._publishDirectory}/birthdays_p.ics`,
      this.generateICalendar(
        birthdays.filter((birthday) => playables.names.includes(birthday.name))
      ),
      options
    );
  }

  /**
   * 誕生日リストを読み込みます。
   */
  getBirthdays(): Birthday[] {
    return Birthday.parse(
      fs.readFileSync(`${this._resourceDirectory}/birthdays.yaml`, "utf-8")
    );
  }

  /**
   * 育成可能キャラ名リストを読み込みます。
   */
  getPlayables(): Playables {
    return Playables.parse(
      fs.readFileSync(`${this._resourceDirectory}/playables.yaml`, "utf-8")
    );
  }

  /**
   * 誕生日カレンダーファイルデータを生成します。
   */
  generateICalendar(birthdays: Birthday[]): string {
    const NEWLINE = "\r\n";
    const timestamp = moment().format("YYYYMMDDTHHmmssZ");
    const events = birthdays.map((birthday: Birthday) => {
      const event = new CalendarEvent(birthday.name, birthday.date);
      const _ = [];
      _.push("BEGIN:VEVENT");

      _.push("CLASS:PUBLIC");
      _.push(`UID:${event.uniqueId}`);
      _.push(`DTSTAMP:${timestamp}`);
      _.push(`SUMMARY:${event.name}の誕生日`);
      _.push(`DESCRIPTION:${event.name}の誕生日です。`);
      _.push(`RRULE:FREQ=YEARLY`);
      _.push(`DTSTART;VALUE=DATE:${moment(event.datetime).format("YYYYMMDD")}`);
      _.push(
        `DTEND;VALUE=DATE:${moment(event.datetime)
          .add(1, "days") // RFC5545により、DTENDは翌日を指定する
          .format("YYYYMMDD")}`
      );

      _.push("END:VEVENT");
      return _.join(NEWLINE);
    });

    // iCalendar形式のカレンダーを生成
    const _prodId = "ushibutatory-umamusume-birthdays-calendar";
    const iCal = [];
    iCal.push("BEGIN:VCALENDAR");
    iCal.push(`PRODID:${_prodId}`);
    iCal.push("VERSION:2.0");
    iCal.push("METHOD:PUBLISH");
    {
      iCal.push("BEGIN:VTIMEZONE");
      iCal.push("TZID:Asia/Tokyo");
      {
        iCal.push("BEGIN:STANDARD");
        iCal.push("DTSTART:19390101T000000");
        iCal.push("TZOFFSETFROM:+0900");
        iCal.push("TZOFFSETTO:+0900");
        iCal.push("TZNAME:JST");
        iCal.push("END:STANDARD");
      }
      iCal.push("END:VTIMEZONE");
    }
    iCal.push(events.join(NEWLINE));
    iCal.push("END:VCALENDAR");

    return iCal.join(NEWLINE);
  }
}

new Generator().run();
