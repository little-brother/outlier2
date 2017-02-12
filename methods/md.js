// Median Differencing
// Use this if the order of your data matters. 
// This looks at the difference between adjacent points best for time series data.
// Based on https://github.com/alyssaq/stats-analysis

'use strict'
const stat = require('../stat-func');

module.exports = function(array, opts) {
	let threshold = opts && opts.threshold || 3;
	
	let arr = array.map((e, i) => Math.round(Math.abs(e - (array[i > 0 && (i - 1) || 0]))) + 1);
	let median = stat.median(arr);

	let check = (e) => e / median > threshold;
	return (opts && !!opts.indexes) ?
		arr.map((e, i) => check(e) && i).filter((e) => e !== false): 
		array.filter((e, i) => check(arr[i]));	
}