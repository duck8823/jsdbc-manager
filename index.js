'use strict';

const vm = require('vm');

const PjdbcManager = require('./lib/manager').PjdbcManager;
const where = require('./lib/where');

function struct(typename, fieldNames) {
	return vm.runInNewContext(`
'use strict';

class ${typename} {
	constructor(${fieldNames.join(', ')}) {
		${fieldNames.map(name => `this.${name} = ${name};`).join('\n		')}
	}
}
`);
}

function connect(driver, datasource) {
	return new PjdbcManager(driver, datasource);
}

module.exports = {
	struct : struct,
	connect : connect,
	Where : where.Where,
	Operator : where.Operator
};