'use strict';

const util = require('util');

const FromCase = require('./fromcase').FromCase;
const Executable = require('./executable').Executable;


class PjdbcManager {
	constructor(driver, datasource) {
		this.adaptor = require(DRIVER[driver]).connect(datasource);
	}

	from(entity) {
		return new FromCase(this.adaptor, entity);
	}

	drop(entity) {
		return new Executable(this.adaptor, util.format('DROP TABLE IF EXISTS %s', entity.name));
	}

	create(entity) {
		const columns = Object.keys(entity).map((column) => {
			if (['INTEGER', 'TEXT', 'BOOLEAN'].indexOf(entity[column]) < 0) {
				throw new Error(util.format('Error: 次の型は対応していません. :%s (%s)', column, entity[column]));
			}
			return util.format('%s %s', column, entity[column]);
		});
		return new Executable(this.adaptor, util.format('CREATE TABLE %s (%s)', entity.constructor.name, columns.join(', ')))
	}

	insert(data) {
		return new Executable(this.adaptor, util.format('INSERT INTO %s %s', data.constructor.name, _createSentence(data)))
	}
}
module.exports.PjdbcManager = PjdbcManager;


function _createSentence(data) {
	var columns = [];
	var values = [];
	Object.keys(data).forEach((column) => {
		columns.push(column);
		values.push(util.format("'%s'", data[column]));
	});
	return util.format('(%s) VALUES (%s)', columns.join(', '), values.join(', '));
}

const DRIVER = {
	SQLite3 : './adaptor/sqlite',
	Pg : './adaptor/pg',
	MySQL : './adaptor/mysql'
};


