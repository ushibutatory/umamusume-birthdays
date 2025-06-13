import moment from "moment";

/**
 * カレンダー用のイベント定義
 */
export class CalendarEvent {
  readonly name: string;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  constructor(name: string, date: string) {
    this.name = name;

    const tokens = date.split("/");

    this.year = moment().year();
    this.month = Number(tokens[0]);
    this.day = Number(tokens[1]);
  }

  get uniqueId(): string {
    return `${moment(this.datetime).format("YYYYMMDD")}-${this.name}`;
  }

  get datetime(): Date {
    return moment([this.year, this.month - 1, this.day]).toDate();
  }
}
