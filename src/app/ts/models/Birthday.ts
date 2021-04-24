import YAML from "yaml";

/**
 * 誕生日クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Birthday {
  readonly name: string;
  readonly date: string;
  constructor(name: string, date: string) {
    this.name = name;
    this.date = date;
  }

  static parse(yamlText: string): Birthday[] {
    return YAML.parse(yamlText)["birthdays"] as Birthday[];
  }
}
