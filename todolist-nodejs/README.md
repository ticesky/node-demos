# todolist-demos

node + sqlite 实现一个todolist，public里为静态资源

### 开始开发

通过`npm start`即可以快速在本地创建开发服务。如果没有`database/todolist.db`文件需要使用sqlite命令行建立数据库。已有测试账号junyux密码123456

```bash
# 创建session表
CREATE TABLE IF NOT EXISTS session (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "key" char(128) NOT NULL,
  name char(128) NOT NULL,
  value text NOT NULL,
  created integer NOT NULL,
  expires integer NOT NULL
);

# 创建todo表
CREATE TABLE IF NOT EXISTS todo (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "text" text(128) NOT NULL,
  state integer NOT NULL,
  userid integer NOT NULL
);

# 创建user表
CREATE TABLE IF NOT EXISTS user (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  name char(128) NOT NULL,
  password char(128) NOT NULL
);
```