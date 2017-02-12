// Iglewicz and Hoaglin method
// Values with a Z-score > 3.5 are considered potential outliers
// Based on https://github.com/alyssaq/stats-analysis

'use strict'
const stat = require('../stat-func');

module.exports = function(arr, opts) {
	let threshold = opts && opts.threshold || 3.5;

	let median = stat.median(arr);
	let MAD = stat.median(arr.map((e) => Math.abs(e - median)));
	
	let check = (e) => Math.abs((0.6745 * (e - median)) / MAD) > threshold;
	return (opts && !!opts.indexes) ?
		arr.map((e, i) => check(e) && i).filter((e) => e !== false): 
		arr.filter(check);
}