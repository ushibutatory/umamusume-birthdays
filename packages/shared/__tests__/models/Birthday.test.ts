// Birthday.test.ts
import { Birthday } from "../../src/models/Birthday";

describe("Birthday", () => {
  describe("constructor", () => {
    test("should create Birthday instance with valid data", () => {
      const name = { ja: "テスト", en: "Test" };
      const date = "01/01";

      const birthday = new Birthday(name, date);

      expect(birthday.name).toEqual(name);
      expect(birthday.date).toBe(date);
    });
  });

  describe("parse", () => {
    test("should parse valid YAML text correctly", () => {
      const yaml = `
birthdays:
  - name: { ja: "サンプル1", en: "sample1" }
    date: "01/01"
  - name: { ja: "サンプル2", en: "sample2" }
    date: "01/02"
`;

      const birthdays = Birthday.parse(yaml);

      expect(birthdays).toHaveLength(2);
      expect(birthdays[0]).toEqual({
        name: { ja: "サンプル1", en: "sample1" },
        date: "01/01",
      });
      expect(birthdays[1]).toEqual({
        name: { ja: "サンプル2", en: "sample2" },
        date: "01/02",
      });
    });

    test("should parse empty birthdays array", () => {
      const yaml = `
birthdays: []
`;
      const birthdays = Birthday.parse(yaml);

      expect(birthdays).toEqual([]);
      expect(birthdays).toHaveLength(0);
    });

    test("should throw error for invalid YAML", () => {
      {
        const yaml = "invalid: yaml: content: [unclosed";
        expect(() => {
          Birthday.parse(yaml);
        }).toThrow();
      }
      {
        const yaml = `
other_data:
  - name: "test"
`;
        expect(() => {
          Birthday.parse(yaml);
        }).toThrow();
      }

      {
        const yaml = `
birthdays: null
`;
        expect(() => {
          Birthday.parse(yaml);
        }).toThrow();
      }

      {
        expect(() => {
          Birthday.parse("");
        }).toThrow();
      }
    });
  });
});
