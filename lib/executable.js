'use strict';

class Executable {
	constructor(manager, sql) {
		this.manager = manager;
		this.sql = sql;
	}

	execute(callback) {
		this.manager.adaptor.execute(this.sql, callback);
	}

	getSQL() {
		return this.sql;
	}
}
module.exports.Executable = Executable;