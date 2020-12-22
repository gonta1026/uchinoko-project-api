# Api Environment
### main package version
- node 12.6.0
- npm 6.14.8 (古いものを使うと型系のパッケージでエラーになると思う)
- typescript 4.0.5 (合わせるならこれ) 
- express 4.17.1 (合わせるならこれ)
- mysql 5.6.47 (5.6以上なら多分大丈夫。古いとdatetimeでエラーになると思われる)

### procedure
```
git clone https://github.com/gonta1026/typescript_node_deploy_practice.git
```
```
npm install
```
- .envのファイルをルートに作成してください。下記の6つの変数を用意して実際の値は自身の環境に合わせてください！
```
APP_PORT=8080　　　　　# 好きな値にしてください。
DB_HOST=""           # 僕は空でいけました
DB_PORT=3306         # mysqlのポート指定なので同じだと思います。
DB_USER=""           # 僕はめんどくさかったらでrootを使ってください。
DB_PASS=""　　　　　　 # 設定していたら指定してください。
DB_NAME="db_name"
SECRET_KEY=""
```
- データベース作成
```
CREATE DATABASE db_name;
```
- マイグレーションを実行してテーブルを作成
```
npm run migrate:run
```
サーバーの起動
```
npm run dev:watch
```

### Dockerを使う場合
1. リポジトリをクローンします

2. パッケージをインストールします
```bash
npm install
```

3. .envファイルを編集します
```env
APP_PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER="root"
DB_PASS="123456"
DB_NAME="uchinoko_project"
SECRET_KEY="SOME_VALUE"
```

4. Dockerを起動します
```bash
docker-compose up -d
```

5. マイグレーションを実行します(テーブルの作成とシードの投入)
```bash
npm run migrate:run
```

6. サーバーを起動します
```bash
npm run dev:watch
```

7. Dockerを停止するとき
```bash
docker-compose stop
```