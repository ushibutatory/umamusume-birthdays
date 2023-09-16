/**
 * 定数
 */
export class Constants {
  /**
   * データファイル名
   */
  public static MasterFileName = class {
    /**
     * 誕生日リスト
     */
    public static readonly Birthdays: string = "birthdays.yaml";

    /**
     * 育成可能ウマ娘リスト
     */
    public static readonly Playables: string = "playables.yaml";
  };

  /**
   * カレンダーファイル名
   */
  public static CalendarFileName = class {
    /**
     * 全ウマ娘
     */
    public static readonly All: string = "birthdays.ics";

    /**
     * 育成可能ウマ娘
     */
    public static readonly Playables: string = "birthdays_p.ics";
  };
}
