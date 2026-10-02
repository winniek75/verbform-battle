# 関係詞＆分詞 ドリルマスター

英検３級・準２級レベルの関係詞（関係代名詞・関係副詞）と分詞を練習するドリルゲームです。
（リポジトリ名は verbform-battle ですが、動詞の活用練習ではありません。）

## 収録内容（全75問：３級 43問／準２級 32問、うち入力問題 12問）

### ３級レベル
- 関係代名詞 who / which / that
- **who か which か・what か that か のひっかけ問題**
- 現在分詞・過去分詞（前置・後置修飾）
- **気持ちを表す -ing / -ed（exciting / excited）のひっかけ問題**

### 準２級レベル
- 関係代名詞 whose
- 関係副詞 where / when、**which か where か のひっかけ問題**
- **コンマつき（非制限用法）のひっかけ問題**
- 分詞構文（〜しながら・〜なので・受け身・否定）
- **with＋分詞のひっかけ問題**
- 総合問題

## 採点ルール（入力問題）

- 大文字小文字・前後の空白・文末のピリオドなどは無視して採点します。
- 別解がある問題は `src/questions.js` の `accept: ["who", "that"]` に正解をすべて登録します
  （`answer` は代表の正解）。解説に「〜でもOK」と書くときは、必ず `accept` にも入れてください。

## URL パラメータ（ポータルからの直接起動）

| パラメータ | 値 | 意味 |
|---|---|---|
| `level`（または `grade`） | `grade3` / `pre2` / `all`（`3` / `p2` も可） | レベル |
| `unit` | `relative` `who` `which` `what` `participle` `ing-ed` `whose` `where` `when` `kobun` `with` `comma` `mix`（カンマ区切りで複数可） | 単元をしぼる |
| `count` | 1〜30 | 問題数（省略時 10） |
| `mode` | `lesson`（導入レッスンを開く）/ `menu`（選んだ状態でメニューを開く） | 省略時はすぐドリル開始 |

例: `?level=grade3&count=5` ／ `?unit=who&count=5` ／ `?unit=what,ing-ed&count=10` ／ `?level=grade3&mode=lesson`

## 機能

- 毎回ランダム出題（ひっかけ問題約38%を確保）
- コンボシステム（連続正解でボーナス点＋コンボ表示）
- ランク評価（S/A/B/C/D）
- 間違えた問題だけ再ドリル
- Enterキー対応
- 記述式問題（fill）あり（別解登録に対応）
- 時間制限なし・5問から

## セットアップ

```bash
npm install
npm run dev
```

## デプロイ（Vercel + GitHub）

1. このリポジトリを GitHub に push
2. [vercel.com](https://vercel.com) でリポジトリをインポート
3. フレームワーク: **Vite** を選択（自動検出されます）
4. Deploy ボタンをクリック

ビルドコマンド: `npm run build`  
出力ディレクトリ: `dist`
