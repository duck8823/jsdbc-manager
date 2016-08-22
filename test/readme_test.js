const expect = require('chai').expect;
const jsdbc = require('../index');

describe('readme', () => {
	it('readme', () => {
		expect(() => {
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
		}).to.not.throw('Error');
	});
});