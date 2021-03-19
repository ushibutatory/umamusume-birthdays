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
}
