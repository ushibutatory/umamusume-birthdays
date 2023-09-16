import YAML from "yaml";
import { Name } from "./Name";

/**
 * 誕生日クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Birthday {
  public readonly name: Name;
  public readonly date: string;

  public constructor(name: Name, date: string) {
    this.name = name;
    this.date = date;
  }

  public static parse(yamlText: string): Birthday[] {
    return YAML.parse(yamlText)["birthdays"] as Birthday[];
  }
}
