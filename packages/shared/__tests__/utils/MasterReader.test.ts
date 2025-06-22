// MasterReader.test.ts
import fs, { exists } from "fs";
import { MasterReader } from "../../src/utils/MasterReader";

// fsモジュールをモック
jest.mock("fs");
const MockFs = {
  existsSync: jest.mocked(fs.existsSync),
  readFileSync: jest.mocked(fs.readFileSync),
} as const;

const MockData = {
  birthdays: `
birthdays:
  - name: { ja: "スペシャルウィーク", en: "Special Week" }
    date: "05/02"
  - name: { ja: "サイレンススズカ", en: "Silence Suzuka" }
    date: "05/01"
`,

  playables: `
playables:
  names:
    - "スペシャルウィーク"
    - "サイレンススズカ"
    - "トウカイテイオー"
`,
} as const;

describe("MasterReader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    test("should create MasterReader with default data directory", () => {
      MockFs.existsSync.mockReturnValue(true);

      const reader = new MasterReader();

      expect(reader).toBeInstanceOf(MasterReader);
      expect(MockFs.existsSync).toHaveBeenCalledWith(expect.stringContaining("data"));
    });

    test("should throw error for invalid directory name", () => {
      expect(() => {
        new MasterReader("");
      }).toThrow();

      expect(() => {
        new MasterReader("   ");
      }).toThrow();

      {
        MockFs.existsSync.mockReturnValue(false);
        expect(() => {
          new MasterReader("non-existent");
        }).toThrow();
      }
    });
  });

  describe("getBirthdays", () => {
    test("should read and parse birthdays file successfully", () => {
      MockFs.existsSync.mockReturnValue(true);
      MockFs.readFileSync.mockReturnValue(MockData.birthdays);

      const reader = new MasterReader();
      const birthdays = reader.getBirthdays();

      expect(birthdays).toHaveLength(2);
      expect(birthdays[0].name).toEqual({
        ja: "スペシャルウィーク",
        en: "Special Week",
      });
      expect(birthdays[0].date).toBe("05/02");

      expect(MockFs.readFileSync).toHaveBeenCalledWith(
        expect.stringContaining("birthdays.yaml"),
        "utf-8",
      );
    });

    test("should throw error when birthdays file not found", () => {
      MockFs.existsSync
        .mockReturnValueOnce(true) // ディレクトリ存在チェック
        .mockReturnValueOnce(false); // ファイル存在チェック

      const reader = new MasterReader();

      expect(() => {
        reader.getBirthdays();
      }).toThrow();
    });

    test("should throw error when birthdays file read fails", () => {
      MockFs.existsSync.mockReturnValue(true);
      MockFs.readFileSync.mockImplementation(() => {
        throw new Error();
      });

      const reader = new MasterReader();
      expect(() => {
        reader.getBirthdays();
      }).toThrow();
    });

    test("should throw error when birthdays YAML parse fails", () => {
      MockFs.existsSync.mockReturnValue(true);
      MockFs.readFileSync.mockReturnValue("invalid: yaml: [");

      const reader = new MasterReader();
      expect(() => {
        reader.getBirthdays();
      }).toThrow();
    });
  });

  describe("getPlayables", () => {
    test("should read and parse playables file successfully", () => {
      MockFs.existsSync.mockReturnValue(true);
      MockFs.readFileSync.mockReturnValue(MockData.playables);

      const reader = new MasterReader();
      const playables = reader.getPlayables();

      expect(playables.names).toEqual([
        "スペシャルウィーク",
        "サイレンススズカ",
        "トウカイテイオー",
      ]);

      expect(MockFs.readFileSync).toHaveBeenCalledWith(
        expect.stringContaining("playables.yaml"),
        "utf-8",
      );
    });

    test("should throw error when playables file not found", () => {
      MockFs.existsSync
        .mockReturnValueOnce(true) // ディレクトリ存在チェック
        .mockReturnValueOnce(false); // ファイル存在チェック

      const reader = new MasterReader();

      expect(() => {
        reader.getPlayables();
      }).toThrow();
    });

    test("should throw error when playables file read fails", () => {
      MockFs.existsSync.mockReturnValue(true);
      MockFs.readFileSync.mockImplementation(() => {
        throw new Error();
      });

      const reader = new MasterReader();

      expect(() => {
        reader.getPlayables();
      }).toThrow();
    });

    test("should throw error when playables YAML parse fails", () => {
      MockFs.existsSync.mockReturnValue(true);
      MockFs.readFileSync.mockReturnValue("invalid yaml content");

      const reader = new MasterReader();

      expect(() => {
        reader.getPlayables();
      }).toThrow();
    });
  });
});
