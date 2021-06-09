import YAML from "yaml";

/**
 * 育成可能クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Playables {
  readonly names: string[];
  constructor(names: string[]) {
    this.names = names;
  }

  static parse(yamlText: string): Playables {
    return YAML.parse(yamlText)["playables"] as Playables;
  }
}
