# HTML-ASMX(C#)-SQL Serverサンプル
このドキュメントではHTMLクライアント、ASMX Webサービス、SQL Server連携させるアプリケーションのセットアップ方法について説明します。

## 技術スタック
- フロントエンド：HTML、JavaScript
- バックエンド：ASMX Web サービス (.NET Framework)
- データベース: Microsoft SQL Server 2022
- ホスティング: IIS
- 通信プロトコル: SOAP (Simple Object Access Protocol)
- OS:Windows
- エディタ：Visual Stadio 2022
  
## ディレクトリ構成
```txt
  /MyWebApp/
  │── Service.asmx          → Webサービスのエントリーポイント
  │── Web.config            → 設定ファイル
  │── App_Code/
  │   ├── Service.cs        → Webサービスの本体
  │── bin/                  → コンパイル後のDLL
  │── Scripts/              → JavaScript（フロントエンドの動作）
  │   ├── main.js           → Webサービスを呼び出すJS
  │── Styles/               → CSS（デザイン関連）
  │   ├── styles.css        → Webページのデザイン
  │── Pages/                → フロントエンドのHTML
  │   ├── index.html        → メインページ（JavaScriptでASMXを呼び出す）
```

## アプリ配置
- エクスプローラを開く `C:\Users\<あなたのユーザー名>\source\repos\` 配下にこのプロジェクトを配置
- プロジェクトフォルダ を開く(`MyAspNetApp.sln`)

## DB接続
### 1. SSMSを開いたら、ローカルのDBに接続する
  - サーバの種類：データベースエンジン（デフォルト）
  - サーバー名：(localdb)\MSSQLLocalDB
  - 認証：Windows認証（デフォルト）

### 2. データベースとテーブルの準備
  下記、SQL文を実行する。

```sql
    -- UTF-8 照合順序で testdb を作成
    CREATE DATABASE testdb COLLATE Latin1_General_100_CI_AS_SC_UTF8;
    GO

    -- testdb を使用
    USE testdb;
    GO

    -- users テーブルを作成
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY, -- 自動増加する ID
        name VARCHAR(255) NOT NULL,       -- UTF-8 で保存可能な名前
        email VARCHAR(255) UNIQUE NOT NULL, -- メールアドレス（ユニーク制約）
        created_at DATETIME DEFAULT GETDATE(), -- 作成日時（デフォルト: 現在時刻）
        updated_at DATETIME DEFAULT GETDATE() -- 更新日時（デフォルト: 現在時刻）
    );
    GO

    -- ダミーデータを挿入
    INSERT INTO users (name, email, created_at, updated_at)
    VALUES
        ('山田 太郎', 'taro.yamada@example.com', GETDATE(), GETDATE()),
        ('佐藤 花子', 'hanako.sato@example.com', GETDATE(), GETDATE()),
        ('鈴木 一郎', 'ichiro.suzuki@example.com', GETDATE(), GETDATE()),
        ('高橋 次郎', 'jiro.takahashi@example.com', GETDATE(), GETDATE()),
        ('田中 三郎', 'saburo.tanaka@example.com', GETDATE(), GETDATE());
    GO

    -- データ確認
    SELECT * FROM users;
    GO

 ```