import { Birthday } from "../../ts/models/Birthday";

describe("Birthday", () => {
  test("can parse yaml text.", () => {
    // 入力テキスト
    const yamlText = `
birthdays:
  - name: "sample1"
    date: "01/01"
  - name: "sample2"
    date: "01/02"
`;

    // 期待する結果
    const expects = [
      new Birthday("sample1", "01/01"),
      new Birthday("sample2", "01/02"),
    ];

    const birthdays = Birthday.parse(yamlText);
    expects.forEach((birthday, index) => {
      expect(birthday.name).toBe(birthdays[index].name);
      expect(birthday.date).toBe(birthdays[index].date);
    });
  });
});
