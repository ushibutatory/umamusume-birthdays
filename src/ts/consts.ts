/**
 * 定数
 */
export const Consts = {
  /**
   * データファイル名
   */
  MasterFileName: {
    /**
     * 誕生日リスト
     */
    Birthdays: "birthdays.yaml",
    /**
     * 育成可能ウマ娘リスト
     */
    Playables: "playables.yaml",
  },
  /**
   * カレンダーファイル名
   */
  CalendarFileName: {
    /**
     * 全ウマ娘
     */
    All: "birthdays.ics",
    /**
     * 育成可能ウマ娘
     */
    Playables: "birthdays_p.ics",
  },
} as const;
