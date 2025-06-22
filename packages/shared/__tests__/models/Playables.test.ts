// Playables.test.ts
import { Playables } from "../../src/models/Playables";

describe("Playables", () => {
  describe("parse", () => {
    test("should parse valid YAML text correctly", () => {
      const yaml = `
playables:
  names:
    - "スペシャルウィーク"
    - "サイレンススズカ"
    - "トウカイテイオー"
`;

      const playables = Playables.parse(yaml);

      expect(playables.names).toEqual([
        "スペシャルウィーク",
        "サイレンススズカ",
        "トウカイテイオー",
      ]);
      expect(playables.names).toHaveLength(3);
    });

    test("should parse empty playables array", () => {
      const yaml = `
playables:
  names:
     []
`;

      const playables = Playables.parse(yaml);

      expect(playables.names).toEqual([]);
      expect(playables.names).toHaveLength(0);
    });

    test("should handle names with quotes and special characters", () => {
      const yaml = `
playables:
  names:
    - 'Single "quoted" name'
    - "Double 'quoted' name"
`;

      const playables = Playables.parse(yaml);

      expect(playables.names).toHaveLength(2);
      expect(playables.names[0]).toBe('Single "quoted" name');
      expect(playables.names[1]).toBe("Double 'quoted' name");
    });

    test("should throw error for invalid YAML", () => {
      {
        const yaml = "invalid: yaml: content: [unclosed";

        expect(() => {
          Playables.parse(yaml);
        }).toThrow();
      }
      {
        const yaml = `
other_data:
  - "test"
`;
        expect(() => {
          Playables.parse(yaml);
        }).toThrow();
      }
      {
        expect(() => {
          Playables.parse("");
        }).toThrow();
      }
    });

    test("should handle mixed data types in playables array", () => {
      const yaml = `
playables:
  names:
    - "String name"
    - 123
    - true
    - null
    - { name: "object" }
`;
      const playables = Playables.parse(yaml);

      expect(playables.names).toHaveLength(5);
      expect(playables.names[0]).toBe("String name");
      expect(playables.names[1]).toBe(123);
      expect(playables.names[2]).toBe(true);
      expect(playables.names[3]).toBe(null);
      expect(playables.names[4]).toEqual({ name: "object" });
    });
  });
});
