# ウマ娘誕生日カレンダー

## 概要

誕生日ボイスの聞き逃し防止のために、ウマ娘の誕生日を iCal 形式で配信しています。

- イメージ
  ![image](docs/image.png)

- [ブラウザで確認する](https://calendar.google.com/calendar/embed?src=ic16hku49i5i7v0lpahprkecru1kb516%40import.calendar.google.com&ctz=Asia%2FTokyo)
  - GoogleCalendar のプレビューページに遷移します

**※非公式です。**
**権利等で問題があれば即刻対応しますので下記までご連絡ください。**

不備・誤り・ご指摘などあれば Issues を作成するか、下記アカウントまで DM やメンションにてご連絡ください。

## カレンダーの URL

### 全ウマ娘（誕生日ボイスが未実装のキャラクターも含む）

[https://umamusume-birthdays-ical.herokuapp.com](https://umamusume-birthdays-ical.herokuapp.com)

![QR](docs/qr_code/url-all.png)

### 育成可能なウマ娘のみ

[https://umamusume-birthdays-ical.herokuapp.com/?filter=p](https://umamusume-birthdays-ical.herokuapp.com/?filter=p)

![QR](docs/qr_code/url-playables.png)

## カレンダーの購読方法（例）

- [Google Calendar](docs/how_to_subscribe/google_calendar)
- [Thunderbird](docs/how_to_subscribe/thunderbird)

その他、URL を指定して追加する機能があれば大抵のカレンダーアプリで購読可能なはずです。

また、上記 URL からダウンロードした`.ics` ファイルに適当な名前を付けて保存し、カレンダーアプリに取り込むこともできます。<br/>
（ただしその場合、追加や更新された誕生日は自動では反映されません。手動で取り込みなおす必要があります。）

気になる点や不明点、ご質問などあれば下記アカウントまでご連絡ください。

## 連絡先

- Twitter: [@ushibutatory](https://twitter.com/ushibutatory)

## 更新履歴

[![Build Application](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/build-application.yaml/badge.svg)](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/build-application.yaml)
[![Build Dockerfile](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/build-docker.yaml/badge.svg)](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/build-docker.yaml)
[![CodeQL](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/codeql-analysis.yaml/badge.svg)](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/codeql-analysis.yaml)
[![Deploy](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/deploy-prod.yaml/badge.svg)](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/deploy-prod.yaml)

[workflows/Deploy](https://github.com/ushibutatory/umamusume-birthdays/actions/workflows/deploy-prod.yaml)

## リンク

- [キャラクター一覧 | ウマ娘プリティーダービー](https://umamusume.jp/character/)
  - 公式ページ。
  - 2021/10/11 時点の状態を反映しています。
    - 誕生日が記載されているキャラクターのみ登録しています。
