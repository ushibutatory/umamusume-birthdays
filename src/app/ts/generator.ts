import fs from "fs";
import moment from "moment";
import { Birthday } from "./models/Birthday";
import { CalendarEvent } from "./models/CalendarEvent";
import { Trainable } from "./models/Trainable";

export class Generator {
  /**
   * 一連の処理を実行します。
   */
  run() {
    // データファイル読み込み
    const birthdays = this.getBirthdays();
    console.log("読み込んだ誕生日データは以下の通りです。");
    console.log(birthdays);
    const trainable = this.getTrainable();
    console.log("読み込んだ育成可能キャラデータは以下の通りです。");
    console.log(trainable);

    // iCalendar形式に変換
    const ical_allCharacters = this.generateICalendar(birthdays);
    const ical_trainableCharacters = this.generateICalendar(
      birthdays.filter((birthday) => trainable.names.includes(birthday.name))
    );

    // ファイル書き込み
    // TODO: パス指定がイマイチ
    if (!fs.existsSync("data")) {
      fs.mkdirSync("data");
    }
    fs.writeFileSync("data/birthdays.ics", ical_allCharacters, {
      encoding: "utf-8",
    });
    fs.writeFileSync("data/birthdays_t.ics", ical_trainableCharacters, {
      encoding: "utf-8",
    });
  }

  // TODO: パス指定の方法がイマイチ

  /**
   * 誕生日リストを読み込みます。
   */
  getBirthdays(): Birthday[] {
    return Birthday.parse(fs.readFileSync("../../birthdays.yaml", "utf-8"));
  }

  /**
   * 育成可能キャラ名リストを読み込みます。
   */
  getTrainable(): Trainable {
    return Trainable.parse(fs.readFileSync("../../trainable.yaml", "utf-8"));
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
      _.push(`DTEND;VALUE=DATE:${moment(event.datetime).format("YYYYMMDD")}`);

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
