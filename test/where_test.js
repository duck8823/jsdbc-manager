const expect = require('chai').expect;
const assert = require('chai').assert;
const rewire = require('rewire');

const jsdbc = require('../index');

describe('where', () => {
	it('new', () => {
		var where = new jsdbc.Where('id', 1, jsdbc.Operator.EQUAL);
		expect(where.constructor.name).to.equal('Where');

		var actual = where.toString();
		expect(actual).to.be.equal("WHERE id = '1'");
	});

	it('toString', () => {
		var where;
		where = new jsdbc.Where(undefined, 1, jsdbc.Operator.EQUAL);
		expect(() => {
			where.toString();
		}).to.throw('Error');

		where = new jsdbc.Where('id', undefined, jsdbc.Operator.EQUAL);
		expect(() => {
			where.toString();
		}).to.throw('Error');

		where = new jsdbc.Where(undefined, undefined, jsdbc.Operator.EQUAL);
		expect(() => {
			where.toString();
		}).to.throw('Error');

		where = new jsdbc.Where('id', {}, jsdbc.Operator.EQUAL);
		expect(() => {
			where.toString();
		}).to.throw('Error');

		where = new jsdbc.Where(undefined, undefined, undefined);
		expect(where.toString()).to.be.equal('');

		var actual = new jsdbc.Where('name', 'name', jsdbc.Operator.LIKE).toString();
		expect(actual).to.be.equal("WHERE name LIKE '%name%'");
	});

	it('Operator', () => {
		expect(jsdbc.Operator.EQUAL).to.be.equal('=');
		expect(jsdbc.Operator.NOT_EQUAL).to.be.equal('<>');
		expect(jsdbc.Operator.LIKE).to.be.equal('LIKE');
	});
});