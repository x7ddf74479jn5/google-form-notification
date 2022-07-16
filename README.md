# Google From Notification

Google Formの回答をSlackとメールに通知できます。
GASのフォーム送信トリガーと時間主導型日付ベーストリガーに対応しています。
フォーム送信トリガーによる通知ではフォームに入力された各回答データが含まれます。
日付ベーストリガーでは昨日に送信された回答数を指定時間に一括で通知します。

## 🎨 Features

- [clasp](https://github.com/google/clasp)
- TypeScript
- [esbuild](https://esbuild.github.io/)
- [ESLint](https://github.com/eslint/eslint)
- [prettier](https://github.com/prettier/prettier)

## 🚀 Try it now

```shell
git clone https://github.com/x7ddf74479jn5/google-form-notification
```

## ⚒ Usage

### Install clasp CLI if not installed

```shell
npm i -g @google/clasp
clasp login
```

### Config

```shell
mv .clasp.example.json .clasp.json
```

`.clasp.json`の`scriptId`を自身のAppScriptのIDで書き換えてください。

※ AppScriptのIDはAppScript管理画面のプロジェクト設定から確認できます。

※ **フォーム**のAppScript IDではなく**スプレッドシート**のAppScript IDです。

```json
{
  "scriptId": "<YOUR_SCRIPT_ID>",
  "rootDir": "./build"
}
```

環境変数の設定

`config.ts`に直接書く場合

```js
export const privateConfig: PrivateConfig = {
  MAILING_LIST: ["your_email_address@exmaple.com", "another_email_address@exmaple.com"],
  SLACK_WEBHOOK_URL:
    "hhttps://hooks.slack.com/services/*************************",
};
```

`.env`に書く場合

`config.property`を`env`に設定

```shell
cp .env.example .env
MAILING_LIST="your_email_address@exmaple.com,another_email_address@exmaple.com",
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/*************************"
```

GASのスクリプトプロパティに設定する場合

`config.property`を`propertiesService`に設定


プロジェクトのダッシュボードから設定しください。

「プロジェクトの設定」>「スクリプトプロパティの追加」

### Build

```js
npm run build
```

### Deploy

```js
npm run push
```

### Trigger Setting

GASのダッシュボードからトリガーを設定してください。

`config.ts`で`trigger`を設定している場合、`main`関数が実行されると自動的に各関数のトリガーが設定されます。

「エディター」>「`main.gs`」>「プルダウンメニューから`main`関数を選択」>「実行」

初回実行時はアプリを承認する必要があります。

「ポップアップ中の詳細をクリック」>「元のページへ戻るをクリック」

consoleから実行する場合（claspの設定によっては失敗する可能性があります）

```shell
npm run set-triggers
```

`config.ts`で`trigger`を設定していない場合は手動で各関数のトリガーを設定する必要があります。

「トリガー」>「トリガーを追加」

| 毎日定時にトリガーを設定 |  |
| - | - |
| 実行する関数を選択 | onScheduleから始まる関数 |
| 実行するデプロイを選択 | HEAD |
| イベントのソースを選択 | 時間主導型 |
| 時間ベースのトリガーのタイプを選択 | 日付ベースのタイマー |
| 時刻を選択 | 任意の時間帯 |

| フォーム送信時にトリガーを設定 |  |
| - | - |
| 実行する関数を選択 | onFormSubmitから始まる関数 |
| 実行するデプロイを選択 | HEAD |
| イベントのソースを選択 | フォームから |
| イベントの種類を選択 | フォーム送信時 |

## Appendix

[> Config詳細](./docs/config.md)

[> API詳細](./docs/api.md)

[> GAS Reference](https://developers.google.com/apps-script/reference/)
