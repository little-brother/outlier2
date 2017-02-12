// Interquartile range
// https://en.wikipedia.org/wiki/Interquartile_range#Interquartile_range_and_outliers
// Based on https://github.com/MatthewMueller/outliers

'use strict'
const stat = require('../stat-func');

module.exports = function (array, opts) {
	let arr = array.slice(0).sort((a, b) => a - b);

	let len = arr.length;
	let median = stat.median(arr);

	let q1 = stat.median(arr.slice(0, ~~(len / 2)));
	let q3 = stat.median(arr.slice(Math.ceil(len / 2)));
	let g = 1.5;
	let range = (q3 - q1) * g;

	let outliers = arr.filter((e) => Math.abs(e - median) > range);

	return (opts && !!opts.indexes) ?
		array.map((e, i) => outliers.indexOf(e) != -1 && i).filter((e) => e !== false):
		outliers;
}