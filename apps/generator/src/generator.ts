import moment from "moment";
import { Birthday, Name } from "@umamusume-birthdays/shared";
import { CalendarEvent } from "./models/CalendarEvent";

/**
 * カレンダーファイルデータ生成クラス
 */
export class Generator {
  private static readonly CONSTS = {
    PROD_ID: "ushibutatory-umamusume-birthdays-calendar",
    TIMEZONE: "Asia/Tokyo",
    NEWLINE: "\r\n",
  } as const;

  /**
   * 誕生日カレンダーファイルデータを生成します。
   */
  public generateICalendar(birthdays: Birthday[], lang: keyof Name): string {
    const timestamp = moment().format("YYYYMMDDTHHmmssZ");
    const events = birthdays
      .filter((_) => _.name[lang])
      .map((birthday: Birthday) => {
        const name = birthday.name[lang];
        const event = new CalendarEvent(name, birthday.date);
        const eventSection = [];
        eventSection.push("BEGIN:VEVENT");

        eventSection.push("CLASS:PUBLIC");
        eventSection.push(`UID:${event.uniqueId}`);
        eventSection.push(`DTSTAMP:${timestamp}`);
        eventSection.push(`SUMMARY:${this.eventSummary(event, lang)}`);
        eventSection.push(`DESCRIPTION:${this.eventDescription(event, lang)}`);
        eventSection.push(`RRULE:FREQ=YEARLY`);
        eventSection.push(
          `DTSTART;VALUE=DATE:${moment(event.datetime).format("YYYYMMDD")}`
        );
        eventSection.push(
          `DTEND;VALUE=DATE:${moment(event.datetime)
            .add(1, "days") // RFC5545により、DTENDは翌日を指定する
            .format("YYYYMMDD")}`
        );

        eventSection.push("END:VEVENT");
        return eventSection.join(Generator.CONSTS.NEWLINE);
      });

    // iCalendar形式のカレンダーを生成
    const iCal = [];
    iCal.push("BEGIN:VCALENDAR");
    iCal.push(`PRODID:${Generator.CONSTS.PROD_ID}`);
    iCal.push("VERSION:2.0");
    iCal.push("METHOD:PUBLISH");
    {
      iCal.push("BEGIN:VTIMEZONE");
      iCal.push(`TZID:${Generator.CONSTS.TIMEZONE}`);
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
    iCal.push(events.join(Generator.CONSTS.NEWLINE));
    iCal.push("END:VCALENDAR");

    return iCal.join(Generator.CONSTS.NEWLINE);
  }

  private eventSummary(event: CalendarEvent, lang: keyof Name): string {
    switch (lang) {
      case "ja":
        return `${event.name}の誕生日`;
      case "en":
        return `${event.name}'s Birthday`;
      default:
        throw new Error(`Unsupported language: ${lang}`);
    }
  }

  private eventDescription(event: CalendarEvent, lang: keyof Name): string {
    switch (lang) {
      case "ja":
        return `${event.name}の誕生日です。`;
      case "en":
        return `${event.name}'s Birthday`;
      default:
        throw new Error(`Unsupported language: ${lang}`);
    }
  }
}
