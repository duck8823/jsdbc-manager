'use strict';

const util = require('util');

const Executable = require('./executable').Executable;

class FromCase {
	constructor(manager, entity) {
		this._manager = manager;
		this._entity = entity;
	}

	where(where) {
		this._where = where;
		return this;
	}

	list(callback) {
		const columns = Object.keys(new this._entity()).join(', ');
		const table = this._entity.name;
		const where = this._where ? this._where.toString() : '';
		this._manager.adaptor.fetchAll(util.format('SELECT %s FROM %s %s', columns, table, where), (err, rows) => {
			if (callback == undefined) {
				return;
			}
			callback(err, rows ? rows.map((row) => {
				const Binded = this._entity.bind.apply(this._entity, [null].concat(Object.keys(row).map((field) => row[field])));
				return new Binded();
			}) : rows);
		});
	}

	singleResult(callback) {
		this.list((err, rows) => {
			if (callback == undefined) {
				return;
			}
			if (rows.length > 1) {
				callback(new Error('結果が一意でありません.', rows));
			} else {
				callback(err, rows ? rows[0] : rows);
			}
		});
	}

	delete() {
		return new Executable(this._manager, util.format('DELETE FROM %s %s', this._entity.name, this._where ? this._where : ''));
	}
}
module.exports.FromCase = FromCase;