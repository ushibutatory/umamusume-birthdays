import YAML from "yaml";

/**
 * 育成可能クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Playables {
  public readonly names: string[];
  public constructor(names: string[]) {
    this.names = names;
  }

  public static parse(yamlText: string): Playables {
    return YAML.parse(yamlText)["playables"] as Playables;
  }
}
