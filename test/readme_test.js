const expect = require('chai').expect;
const jsdbc = require('../index');

describe('readme', () => {
	it('readme', () => {
		expect(() => {
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
		}).to.not.throw('Error');
	});
});