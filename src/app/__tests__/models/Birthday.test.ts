import { Birthday } from "../../ts/models/Birthday";

describe("Birthday", () => {
  test("can parse yaml text.", () => {
    // 入力テキスト
    const yamlText = `
birthdays:
  - date: "01/01"
    names: ["sample1"]
  - date: "01/02"
    names: ["sample2", "sample3"]
`;

    // 期待する結果
    const expects = [
      new Birthday("01/01", ["sample1"]),
      new Birthday("01/02", ["sample2", "sample3"]),
    ];

    const birthdays = Birthday.parse(yamlText);
    expects.forEach((birthday, index) => {
      expect(birthday.date).toBe(birthdays[index].date);
      expect(birthday.names).toStrictEqual(birthdays[index].names);
    });
  });
});
