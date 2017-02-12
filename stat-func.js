'use strict'

function mean(values) {
	if (values.length == 0)
		return NaN;

	return values.reduce((sum, e) => sum + e, 0) / values.length;
}

function median(values) {
	if (values.length == 0)
		return NaN;

	let arr = values.slice(0).sort((a, b) => a - b);
	let half = ~~(arr.length / 2);

	return (arr.length % 2) ? arr[half] : (arr[half - 1] + arr[half]) / 2.0;
}

// Variance = average squared deviation from mean
function variance(values) {
	let avg = mean(values);
	return mean(values.map((e) => Math.pow(e - avg, 2)));
}

// Standard Deviation = sqrt of variance
function stdev(values) {
	return Math.sqrt(variance(values));
}

module.exports = {
	mean,
	median,
	variance,
	stdev
}