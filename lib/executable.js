'use strict';

class Executable {
	constructor(adaptor, sql) {
		this.adaptor = adaptor;
		this.sql = sql;
	}

	execute(callback) {
		this.adaptor.execute(this.sql, callback);
	}

	getSQL() {
		return this.sql;
	}
}
module.exports.Executable = Executable;