import { Birthday } from "../../ts/models/Birthday";
import 

describe("Birthday", () => {
    test("Read and Parse yaml text.", () => {
      const generator = new Generator()

    // 期待する結果
    const expects = [
      new Birthday("sample1", "01/01"),
      new Birthday("sample2", "01/02"),
    ];

    const birthdays = Birthday.parse(yamlText);
    expects.forEach((birthday, index) => {
      expect(birthday.name_ja).toBe(birthdays[index].name_ja);
      expect(birthday.date).toBe(birthdays[index].date);
    });
  });
});
