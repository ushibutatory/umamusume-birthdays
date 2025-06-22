import YAML from "yaml";
import { Name } from "./Name";

/**
 * 誕生日クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Birthday {
  public readonly name: Readonly<Name>;
  public readonly date: string;

  public constructor(name: Name, date: string) {
    this.name = Object.freeze({ ...name }); // ディープコピー
    this.date = date;
  }

  public static parse(yamlText: string): Birthday[] {
    try {
      const parsed = YAML.parse(yamlText);

      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid YAML: Root element must be an object");
      }
      if (!parsed.birthdays || !Array.isArray(parsed.birthdays)) {
        throw new Error('Invalid YAML: "birthdays" array not found');
      }

      return parsed.birthdays as Birthday[];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse YAML: ${error.message}`);
      } else {
        throw new Error("Failed to parse YAML: Unknown error");
      }
    }
  }
}
