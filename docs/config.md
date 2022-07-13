# Config

[> Back to homepage](../README.md)

## 説明

| 属性名 | 説明 |
| - | - |
| property | `.env`("env"), Properties Service("propertiesService")に設定した環境変数の値が`config.ts`の同名の設定に上書きされます。(default: "default") |
| mail |  |
| MAILING_LIST | メーリングリスト |
| MAIL_TITLE | タイトル（default: Googleフォーム申請） |
| SEND_BY | 送信者名（default: "Google Form Notifier"） |
| slack |  |
| SLACK_WEBHOOK_URL | Slack Webhook URL |
| triggers | トリガーを設定できます。省略する場合はGASのダッシュボードから設定してください。|

```js
// フォームの送信イベントでメール通知
triggers: [
  {
    notifiers: ["mail"],
    event: {
      eventType: "ON_FORM_SUBMIT",
    }
  }
]

// 指定時間(毎日10:00 JST)でメール通知とSlack通知
triggers: [
  {
    notifiers: ["mail", "slack"],
    event: {
      eventType: "CLOCK",
      atHour: 10,
    }
  }
]

// 指定時間 + フォームの送信イベント
triggers: [
  {
    notifiers: ["mail"],
    event: {
      eventType: "CLOCK",
      atHour: 10,
    }
  },
  {
    notifiers: ["mail"],
    event: {
      eventType: "ON_FORM_SUBMIT",
    }
  }
]
```

## 環境変数

```js
// .envファイルやProperties Serviceに記述する場合は","区切りの文字列で指定してください
MAILING_LIST: string | string[], 
SLACK_WEBHOOK_URL: string
```

設定できる場所

- `config.ts`の`privateConfig`
- `.env`
- GASのProperties Service

## 要望・バグ報告など

[GitHub Issue](https://github.com/x7ddf74479jn5/google-form-notification/issue)
