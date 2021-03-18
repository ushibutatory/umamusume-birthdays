# メモ

## 処理概要

![overview](overview.drawio.svg)

- アプリケーション
  - generator
    - node.js
    - 元になる yaml ファイルを読み込んで iCal 形式データに変換する。
  - app
    - node.js
      - Express
    - iCal データを返す。

1. 元の yaml データが更新されたら、GitHubActions で generator を実行する。
1. iCal ファイルの変更を反映するための PullRequest を自動生成する。
1. 目視確認してマージする。
1. GitHubActions で Heroku に反映する。

## ローカルでの動作確認（ts-node）

コンパイルなしで手っ取り早く動作確認する場合はこっち。

### カレンダーデータの更新

```sh
umamusume-birthdays> cd src\generator
umamusume-birthdays\src\generator> npm run app
```

### カレンダーデータの配信

```sh
umamusume-birthdays> cd src\app
umamusume-birthdays\src\app> npm run ts-node ts/server.ts
```

## ローカルでの動作確認（Docker）

本番に近い条件で動作確認する場合はこっち。

なお、カレンダーデータは上記 ts-node であらかじめ更新しておくこと。

### Docker イメージのビルド

```sh
umamusume-birthdays> docker build -t ushibutatory/umamusume-birthdays .
```

### コンテナ起動

```sh
umamusume-birthdays> docker run -p 49160:8080 -d ushibutatory/umamusume
```
