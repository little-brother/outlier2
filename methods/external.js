// Find outliers by external application, e.g. R script

'use strict'
const child_process = require('child_process');

module.exports = function(arr, opts, callback) {
	if (!opts || !opts.command) {
		let err = new Error('Bad command to execute');
		if (callback)
			return callback(error);
		else throw error;
	}

	let dataset = JSON.stringify(arr);
	let command = eval(`\`${opts.command}\``);

	if (!callback) {
		let res, error;
		try {
			res = child_process.execSync(command, opts);
			res = JSON.parse(res.toString());	
		} catch (err) {
			error = err;
		}
		
		if (error)
			throw error;
		
		return res;
	}

	child_process.exec(command, opts, function (err, stdout, stderr) {
		if (err)
			return callback(err);

		let res, error;
		try {
			res = JSON.parse(stdout);
		} catch (err) {
			error = err;
		}
		callback(error, res);
	})
}