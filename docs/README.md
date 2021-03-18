# メモ

## ローカルでの動作確認（ts-node）

コンパイルなしで手っ取り早く動作確認する場合はこっち。

```sh
umamusume-birthdays> cd src\app
umamusume-birthdays\src\app> npm run ts-node ts/server.ts
```

## ローカルでの動作確認（Docker）

本番に近い条件で動作確認する場合はこっち。

### Docker イメージのビルド

```sh
umamusume-birthdays> docker build -t ushibutatory/umamusume-birthdays .
```

### コンテナ起動

```sh
umamusume-birthdays> docker run -p 49160:8080 -d ushibutatory/umamusume
```
