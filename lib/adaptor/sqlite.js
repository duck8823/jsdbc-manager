'use strict';

const sqlite3 = require('sqlite3').verbose();

class SQLite3Adaptor {
	constructor(datasource) {
		this.db = new sqlite3.Database(datasource);
	}

	execute(sql, callback) {
		this.db.serialize(() => {
			this.db.exec(sql, (err) => {
				if (callback != undefined) {
					callback(err);
				}
			});
		});
	}

	fetchAll(sql, callback) {
		this.db.serialize(() => {
			this.db.all(sql, (err, rows) => {
				if (callback != undefined) {
					callback(err, rows);
				}
			});
		});
	}
}

function connect(datasource) {
	return new SQLite3Adaptor(datasource);
}
module.exports.connect = connect;