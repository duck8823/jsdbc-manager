const expect = require('chai').expect;
const assert = require('chai').assert;
const rewire = require('rewire');

const jsdbc = require('../index');

const Test = jsdbc.struct('Test', ['id', 'name']);

describe('fromcase', () => {
	it('list', (done) => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		manager.drop(Test).execute();
		manager.create(new Test('INTEGER', 'TEXT')).execute();

		manager.insert(new Test(1, 'name_1')).execute();
		manager.insert(new Test(2, 'name_2')).execute();

		manager.from(Test).list((err, actual) => {
			var expect = [{id : 1, name : 'name_1'}, {id : 2, name : 'name_2'}];
			assert.deepEqual(actual, expect);
		});

		expect(() => {
			manager.from(Test).list();
		}).to.not.throw('Error');

		const NotExist = jsdbc.struct('NotExist', ['id', 'name']);
		manager.from(NotExist).list((actual, rows) => {
			expect(actual).to.be.a('Error');
			done();
		});
	});

	it('singleResult', (done) => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		manager.drop(Test).execute();
		manager.create(new Test('INTEGER', 'TEXT')).execute();

		manager.insert(new Test(1, 'name_1')).execute();
		manager.insert(new Test(2, 'name_2')).execute();

		manager.from(Test).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).singleResult((err, actual) => {
			var expect = {id : 1, name : 'name_1'};
			assert.deepEqual(actual, expect);
		});

		expect(() => {
			manager.from(Test).where(new jsdbc.Where('id', {}, jsdbc.Operator.EQUAL)).singleResult();
		}).to.throw(Error);

		expect(() => {
			manager.from(Test).singleResult();
		}).to.not.throw('Error');

		manager.from(Test).singleResult((err, _) => {
			expect(err).to.be.a('Error');
			done();
		});
	});

	it('delete', (done) => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		manager.drop(Test).execute();
		manager.create(new Test('INTEGER', 'TEXT')).execute();

		manager.insert(new Test(1, 'name_1')).execute();
		manager.insert(new Test(2, 'name_2')).execute();

		manager.from(Test).where(new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL)).delete().execute();
		manager.from(Test).singleResult((err, actual) => {
			var expect = {id : 2, name : 'name_2'};
			assert.deepEqual(actual, expect);
			done();
		});
	});
});