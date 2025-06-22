import YAML from "yaml";

/**
 * 育成可能クラス
 * （YAMLファイルのデータ構造と対応）
 */
export class Playables {
  public readonly names: string[];

  private constructor(names: string[]) {
    this.names = names;
  }

  public static parse(yamlText: string): Playables {
    try {
      const parsed = YAML.parse(yamlText);

      if (!parsed || typeof parsed !== "object" || !parsed.playables) {
        throw new Error("Invalid YAML: Root element must be an object");
      }
      if (!parsed.playables.names || !Array.isArray(parsed.playables.names)) {
        throw new Error('Invalid YAML: "names" array not found');
      }

      return parsed.playables as Playables;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse YAML: ${error.message}`);
      } else {
        throw new Error("Failed to parse YAML: Unknown error");
      }
    }
  }
}
