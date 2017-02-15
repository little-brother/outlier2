// Grubbs
// https://en.wikipedia.org/wiki/Grubbs%27_test_for_outliers
// http://www.sediment.uni-goettingen.de/staff/dunkl/software/pep-grubbs.pdf
// Based on https://github.com/xcatliu/grubbs

'use strict'
const stat = require('../stat-func');

const CRITICAL = {
	0.01: [0, 0, 0, 1.15, 1.49, 1.75, 1.94, 2.1, 2.22, 2.32, 2.41, 2.48, 2.55, 2.61, 2.66, 2.71, 2.75, 2.79, 2.82, 2.85, 2.88, 2.91, 2.94, 2.96, 2.99, 3.01, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
	0.05 : [0, 0, 0, 1.15, 1.46, 1.67, 1.82, 1.94, 2.03, 2.11, 2.18, 2.23, 2.29, 2.33, 2.37, 2.41, 2.44, 2.47, 2.5, 2.53, 2.56, 2.58, 2.6, 2.62, 2.64, 2.66, 2.68, 2.7, 2.72, 2.73, 2.75, 2.76, 2.78, 2.79, 2.81, 2.82, 2.83, 2.84, 2.85, 2.86, 2.87, 2.88, 2.89, 2.9, 2.91, 2.92, 2.928, 2.936, 2.944, 2.952, 2.96, 2.967, 2.974, 2.981, 2.988, 2.995, 3.002, 3.009, 3.016, 3.023, 3.03, 3.036, 3.042, 3.048, 3.054, 3.06, 3.066, 3.072, 3.078, 3.084, 3.09, 3.095, 3.1, 3.105, 3.11, 3.115, 3.12, 3.125, 3.13, 3.135, 3.14, 3.144, 3.148, 3.152, 3.156, 3.16, 3.164, 3.168, 3.172, 3.176, 3.18, 3.183, 3.186, 3.189, 3.192, 3.195, 3.198, 3.201, 3.204, 3.207, 3.21],
	0.1: [0, 0, 0, 1.15, 1.42, 1.6, 1.73, 1.83, 1.91, 1.98, 2.03, 2.09, 2.13, 2.17, 2.21, 2.25, 2.28, 2.31, 2.34, 2.36, 2.38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

module.exports = function (array, opts, callback) {
	let critical = opts && opts.alpha && CRITICAL[opts.alpha] ? CRITICAL[opts.alpha] : CRITICAL[0.05];
	let arr = array.slice(0);

	if (arr.length >= 100) {
		let error = new Error('Max supported array length is 100');
		if (callback)
			return callback(error);
		else throw error;
	}

	let prev_len = 0;
	while (prev_len != arr.length) {
		let mean = stat.mean(arr);
		let stdev = stat.stdev(arr);

		let check = (e, i, arr) => Math.abs((e - mean) / stdev) < critical[prev_len];
		prev_len = arr.length;
		arr = arr.filter(check);
	}

	let res = array.map((e, i) => arr.indexOf(e) == -1 && ((opts && !!opts.indexes) ? i : e)).filter((e) => e !== false);

	return (callback) ? callback(null, res) : res;
}