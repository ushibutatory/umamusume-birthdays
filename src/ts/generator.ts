import moment from "moment";
import { Birthday } from "./models/Birthday";
import { CalendarEvent } from "./models/CalendarEvent";
import { Name } from "./models/Name";

export class Generator {
  /**
   * 誕生日カレンダーファイルデータを生成します。
   */
  public generateICalendar(birthdays: Birthday[], lang: keyof Name): string {
    const NEWLINE = "\r\n";
    const timestamp = moment().format("YYYYMMDDTHHmmssZ");
    const events = birthdays.map((birthday: Birthday) => {
      const name = birthday.name[lang];
      if (name) {
        const event = new CalendarEvent(name, birthday.date);
        const _ = [];
        _.push("BEGIN:VEVENT");

        _.push("CLASS:PUBLIC");
        _.push(`UID:${event.uniqueId}`);
        _.push(`DTSTAMP:${timestamp}`);
        _.push(`SUMMARY:${event.name}の誕生日`);
        _.push(`DESCRIPTION:${event.name}の誕生日です。`);
        _.push(`RRULE:FREQ=YEARLY`);
        _.push(
          `DTSTART;VALUE=DATE:${moment(event.datetime).format("YYYYMMDD")}`
        );
        _.push(
          `DTEND;VALUE=DATE:${moment(event.datetime)
            .add(1, "days") // RFC5545により、DTENDは翌日を指定する
            .format("YYYYMMDD")}`
        );

        _.push("END:VEVENT");
        return _.join(NEWLINE);
      }
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
