const expect = require('chai').expect;
const assert = require('chai').assert;
const rewire = require('rewire');

const jsdbc = require('../index');

const Test = jsdbc.struct('Test', ['id', 'name']);

describe('executable', () => {
	it('execute', (done) => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		const Fail = jsdbc.struct('Fail', ['id', 'fail']);

		manager.create(Fail).execute((err) => {
			expect(err).to.be.a('Error');
		});

		const Success = jsdbc.struct('Success', ['id', 'name']);
		manager.create(new Success('INTEGER', 'TEXT')).execute();
		manager.create(new Success('INTEGER', 'TEXT')).execute((err) => {
			expect(err).to.be.a('Error');
			done();
		});
	});

	it('getSql', () => {
		var manager = jsdbc.connect('SQLite3', './test.db');
		const Hoge = jsdbc.struct('Hoge', ['id', 'name']);

		const actual = manager.create(new Hoge('INTEGER', 'TEXT')).getSQL();
		expect(actual).to.be.equal("CREATE TABLE Hoge (id INTEGER, name TEXT)");
	});
});