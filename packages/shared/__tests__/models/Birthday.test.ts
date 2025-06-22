import { Birthday } from "../../src/models/Birthday";

describe("Birthday", () => {
  test("Read and parse yaml text.", () => {
    // 入力テキスト
    const yamlText = `
birthdays:
  - name: { ja: "サンプル1", en: "sample1" }
    date: "01/01"
  - name: { ja: "サンプル2", en: "sample2" }
    date: "01/02"
  - name: { ja: "サンプル3", en: "sample3" }
    date: "03/01"
`;

    // 期待する結果
    const expects = [
      new Birthday({ ja: "サンプル1", en: "sample1" }, "01/01"),
      new Birthday({ ja: "サンプル2", en: "sample2" }, "01/02"),
      new Birthday({ ja: "サンプル3", en: "sample3" }, "03/01"),
    ];

    const birthdays = Birthday.parse(yamlText);
    expects.forEach((birthday, index) => {
      expect(birthday.name.ja).toBe(birthdays[index].name.ja);
      expect(birthday.name.en).toBe(birthdays[index].name.en);
      expect(birthday.date).toBe(birthdays[index].date);
    });
  });
});
