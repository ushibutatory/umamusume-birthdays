import YAML from "yaml";

/**
 * 誕生日クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Birthday {
  readonly date: string;
  readonly names: string[];
  constructor(date: string, names: string[]) {
    this.date = date;
    this.names = names;
  }

  static parse(yamlText: string): Birthday[] {
    const rootKey = "birthdays";
    return YAML.parse(yamlText)[rootKey] as Birthday[];
  }
}
