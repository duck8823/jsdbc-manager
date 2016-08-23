# JsdbcManager
[![Build Status](https://travis-ci.org/duck8823/jsdbc-manager.svg?branch=master)](https://travis-ci.org/duck8823/jsdbc-manager)
[![Coverage Status](https://coveralls.io/repos/github/duck8823/jsdbc-manager/badge.svg?branch=master)](https://coveralls.io/github/duck8823/jsdbc-manager?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)  
  
�N���X�𓮓I�ɐ������ăf�[�^�x�[�X�𑀍삷��  
  
## INSTALL
```sh
npm install https://github.com/duck8823/jsdbc-manager.git
```
  
## SYNOPSIS
```js
const jsdbc = require('jsdbc-manager');


// �N���X�̓��I����
const Hoge = jsdbc.struct('Hoge', ['id', 'name']);
// �f�[�^�x�[�X�ւ̐ڑ�
const manager = jsdbc.connect('SQLite3', './test.db');
// �e�[�u���̍쐬
manager.create(new Hoge('INTEGER', 'TEXT')).execute();
// �f�[�^�̑}��
manager.insert(new Hoge(1, 'name_1')).execute();
manager.insert(new Hoge(2, 'name_2')).execute();
// �f�[�^�̎擾�i���X�g�j
manager.from(Hoge).list((err, rows) => {
	rows.forEach((row) => {
		console.log(row);
	});
});
manager.from(Hoge).where(new jsdbc.Where('name', 'name', jsdbc.Operator.LIKE)).list();
// �f�[�^�̎擾�i��Ӂj
manager.from(Hoge).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).singleResult((err, row) => {
	console.log(row);
});
// �f�[�^�̍폜
manager.from(Hoge).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).delete().execute();
// �e�[�u���̍폜
manager.drop(Hoge).execute();
// SQL�̎擾
var createSQL = manager.create(new Hoge('INTEGER', 'TEXT')).getSQL();
var insertSQL = manager.insert(new Hoge(1, 'name_1')).getSQL();
var deleteSQL = manager.from(Hoge).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).getSQL();
var dropSQL = manager.drop(Hoge).getSQL();
```

## License
MIT License