// Three-sigma rule
// https://en.wikipedia.org/wiki/68%E2%80%9395%E2%80%9399.7_rule

'use strict'
const stat = require('../stat-func');

module.exports = function (arr, opts, callback) {
	var range = opts && opts.range || 3;

	let mean = stat.mean(arr);
	let stdev = stat.stdev(arr);

	let check = (e) => Math.abs(e - mean) > range * stdev;

	let res = (opts && !!opts.indexes) ?
		arr.map((e, i) => check(e) && i).filter((e) => e !== false): 
		arr.filter(check);

	return (callback) ? callback(null, res) : res;
}