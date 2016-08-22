# JsdbcManager
[![Build Status](https://travis-ci.org/duck8823/jsdbc-manager.svg?branch=master)](https://travis-ci.org/duck8823/jsdbc-manager)
[![Coverage Status](https://coveralls.io/repos/github/duck8823/jsdbc-manager/badge.svg?branch=master)](https://coveralls.io/github/duck8823/jsdbc-manager?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)  
  
クラスを動的に生成してデータベースを操作する  
  
## INSTALL
```sh
npm install https://github.com/duck8823/jsdbc-manager.git
```
  
## SYNOPSIS
```js
const jsdbc = require('jsdbc-manager');


// クラスの動的生成
const Hoge = jsdbc.struct('Hoge', ['id', 'name']);
// データベースへの接続
const manager = jsdbc.connect('SQLite3', './test.db');
// テーブルの作成
manager.create(new Hoge('INTEGER', 'TEXT')).execute();
// データの挿入
manager.insert(new Hoge(1, 'name_1')).execute();
manager.insert(new Hoge(2, 'name_2')).execute();
// データの取得（リスト）
manager.from(Hoge).list((err, rows) => {
	rows.forEach((row) => {
		console.log(row);
	});
});
manager.from(Hoge).where(new jsdbc.Where('name', 'name', jsdbc.Operator.LIKE)).list();
// データの取得（一意）
manager.from(Hoge).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).singleResult((err, row) => {
	console.log(row);
});
// データの削除
manager.from(Hoge).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).delete().execute();
// テーブルの削除
manager.drop(Hoge).execute();
// SQLの取得
var createSQL = manager.create(new Hoge('INTEGER', 'TEXT')).getSQL();
var insertSQL = manager.insert(new Hoge(1, 'name_1')).getSQL();
var deleteSQL = manager.from(Hoge).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).getSQL();
var dropSQL = manager.drop(Hoge).getSQL();
```

## License
MIT License