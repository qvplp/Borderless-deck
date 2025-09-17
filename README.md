# Borderless - Welcome to the Borderless World

境界なき世界へようこそ。人類の歴史は、常に境界を越える挑戦の歴史でした。

## プロジェクト概要

Borderlessは、人類が地球市民として、国境を越えて価値創造する世界を実現するためのプレゼンテーションサイトです。

### 特徴

- **6つの章構成**: Road to the World Citizen, Technical Vision, Economic Impact, Social Impact, Future Vision, Conclusion
- **動的画像管理**: 各章ごとに背景画像と説明画像を管理
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **アクセシビリティ**: WCAG 2.1 AA準拠

## 技術スタック

- HTML5
- CSS3
- Vanilla JavaScript
- Vercel (デプロイ)

## ローカル開発

```bash
# リポジトリをクローン
git clone <repository-url>
cd borderless

# ローカルサーバーを起動
npm run dev
# または
cd deck && python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` にアクセスしてください。

## Vercelデプロイ

### 1. Vercel CLIを使用する場合

```bash
# Vercel CLIをインストール
npm i -g vercel

# プロジェクトルートで実行
vercel

# 本番環境にデプロイ
vercel --prod
```

### 2. Vercelダッシュボードを使用する場合

1. [Vercel](https://vercel.com)にアクセス
2. GitHubリポジトリを接続
3. プロジェクトをインポート
4. 自動デプロイが開始されます

## ファイル構造

```
borderless/
├── deck/                          # メインサイト
│   ├── index.html                 # メインページ
│   ├── styles.css                 # メインスタイル
│   ├── vertical-scroll.css        # スクロールスタイル
│   ├── responsive.css             # レスポンシブスタイル
│   ├── script.js                  # メインスクリプト
│   ├── vertical-scroll.js         # スクロール機能
│   ├── hamburger-menu.js          # ハンバーガーメニュー
│   └── assets/                    # アセット
│       ├── images/                # 画像ファイル
│       │   ├── shared/            # 共通画像
│       │   │   └── backgrounds/   # 背景画像
│       │   └── chapters/          # 章別画像
│       ├── css/                   # CSSファイル
│       ├── js/                    # JavaScriptファイル
│       └── data/                  # 設定ファイル
├── vercel.json                    # Vercel設定
├── package.json                   # パッケージ設定
└── README.md                      # このファイル
```

## 画像管理

各章の背景画像と説明画像は `assets/data/chapter-images.json` で管理されています。

### 画像の追加方法

1. 画像ファイルを適切なフォルダに配置
2. `chapter-images.json` で画像パスを設定
3. 自動的に画像が読み込まれます

## カスタマイズ

### 色調の変更

各章の色調は `assets/css/image-styles.css` で設定されています。

### コンテンツの変更

各章のコンテンツは `index.html` で編集できます。

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 連絡先

- プロジェクト: Borderless
- ウェブサイト: [デプロイされたURL]
