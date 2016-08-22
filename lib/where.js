'use strict';

const util = require('util');

class Where {
	constructor(column, value, operator) {
		this.column = column;
		this.value = value;
		this.operator = operator;
	}

	toString() {
		if(!this.column && !this.value && !this.operator) {
			return '';
		} else if ((['string', 'number', 'boolean'].indexOf(typeof this.value) < 0) || (this.column && !this.value) || (!this.column && this.value)) {
			throw new Error(`Error: ${this.column} (${this.value})`);
		}
		var value = this.value;
		if (this.operator === Operator.LIKE) {
			value = `%${value}%`
		}
		return util.format("WHERE %s %s '%s'", this.column, this.operator, value);
	}
}

const Operator = {
	EQUAL : '=',
	NOT_EQUAL : '<>',
	LIKE : 'LIKE'
};

module.exports = {
	Where : Where,
	Operator : Operator
};