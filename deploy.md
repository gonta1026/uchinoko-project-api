### 2/28日に更新

### mysqlのバージョンの問題でdbは jawsdbを使用する。
heroku addons:create jawsdb:kitefin

```
$ heroku addons:create jawsdb:kitefin
// 下記が表示される。
JAWSDB_URL: mysql://ab0dfr9f5ghai6un:drlsauoda7m82p84@hwr4wkxs079mtb19.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/t42isnhqan28s7z5
```
### DBの情報の見方は下記でこれを分けていく
mysql://ユーザー名:パスワード@ホスト/データベース名?reconnect=true
- 注意事項: APP_PORTはherokuでは自動的にリクエストの度に振り直されるのでこちらはherokuに上げなくてもよい

- user:     ab0dfr9f5ghai6un
- pass:     drlsauoda7m82p84
- host:     hwr4wkxs079mtb19.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306
db_name:  t42isnhqan28s7z5

#ここは開発環境の.env
<!-- APP_PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER="root"
DB_PASS="123456"
DB_NAME="uchinoko_project"
SECRET_KEY="" -->

#ここはheroku環境の.env
#APP_PORT=8080
DB_HOST="hwr4wkxs079mtb19.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306"
DB_PORT=3306
DB_USER="ab0dfr9f5ghai6un"
DB_PASS="drlsauoda7m82p84"
DB_NAME="t42isnhqan28s7z5"
SECRET_KEY="gonta1026"
