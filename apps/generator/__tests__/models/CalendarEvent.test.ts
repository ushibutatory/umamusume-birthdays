import moment from "moment";
import { CalendarEvent } from "../../src/models/CalendarEvent";

describe("CalendarEvent", () => {
  const name = "test";
  const year = moment().year();
  const month = 1;
  const day = 1;

  const event = new CalendarEvent(name, `${month}/${day}`);

  test("can parse date.", () => {
    expect(event.year).toBe(year);
    expect(event.month).toBe(month);
    expect(event.day).toBe(day);
  });

  const datetime = event.datetime;
  test("can cast datetime.", () => {
    expect(datetime.getFullYear()).toBe(year);
    expect(datetime.getMonth()).toBe(month - 1);
    expect(datetime.getDate()).toBe(day);
  });

  test("generate unique id.", () => {
    expect(event.uniqueId).toBe(`${moment(datetime).format("YYYYMMDD")}-${name}`);
  });
});
