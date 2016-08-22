const expect = require('chai').expect;
const assert = require('chai').assert;
const rewire = require('rewire');

const jsdbc = require('../index');

const Test = jsdbc.struct('Test', ['id', 'name']);

describe('manager', () => {
	it('connection', () => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		expect(manager.constructor.name).to.equal('PjdbcManager');
	});

	it('create', (done) => {
		var manager = jsdbc.connect('SQLite3', './test.db');

		expect(() => {
			manager.create(new Test('Hoge'));
		}).to.throw('Error');

		manager.drop(Test).execute();
		manager.create(new Test('INTEGER', 'TEXT')).execute();

		manager.adaptor.db.serialize(()=>{
			manager.adaptor.db.all('PRAGMA TABLE_INFO(Test)', (err, rows) => {
				expect(err).to.be.null;
				expect(rows[0]['name']).to.equal('id');
				expect(rows[0]['type']).to.equal('INTEGER');
				expect(rows[1]['name']).to.equal('name');
				expect(rows[1]['type']).to.equal('TEXT');
				done();
			});
		});
	});

	it('drop', (done) => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		manager.drop(Test).execute();
		manager.create(new Test('INTEGER', 'TEXT')).execute();
		manager.drop(Test).execute();

		manager.adaptor.db.serialize(()=>{
			manager.adaptor.db.all('PRAGMA TABLE_INFO(Test)', (err, rows) => {
				expect(err).to.be.null;
				expect(rows).to.be.empty;
				done();
			});
		});
	});

	it('insert', (done) => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		manager.drop(Test).execute();
		manager.create(new Test('INTEGER', 'TEXT')).execute();

		manager.insert(new Test(1, 'name_1')).execute();
		manager.insert(new Test(2, 'name_2')).execute();

		manager.adaptor.db.serialize(()=>{
			manager.adaptor.db.all('SELECT * FROM Test', (err, rows) => {
				expect(err).to.be.null;
				assert.deepEqual(rows, [{id : 1, name : 'name_1'}, {id : 2, name : 'name_2'}]);
				done();
			});
		});
	});

	it('create_sentence', () => {
		const jsdbc = rewire('../lib/manager.js');
		const _createSentence = jsdbc.__get__('_createSentence');

		expect(_createSentence(new Test(1, 'name_1'))).to.equal("(id, name) VALUES ('1', 'name_1')")
	});
});