import YAML from "yaml";

/**
 * 育成可能クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Trainable {
  readonly names: string[];
  constructor(names: string[]) {
    this.names = names;
  }

  static parse(yamlText: string): Trainable {
    return YAML.parse(yamlText)["trainable"] as Trainable;
  }
}
