# Outlier2

Compilation of other packages to find outliers in dataset.

Supported criteria/test
* 3 sigma
* Grubbs
* Interquartile range
* Iglewicz and Hoaglin method (MAD)
* Median Differencing

## Install 

```
npm i outlier2
```

## Usage

```
var outlier = require('outlier');

var arr = [-2, 1, 2, 2, 3, 4, 15];
outlier.mad(arr) // Return outlier values [15]
outlier.mad(arr, {indexes: true}) // Return outlier indexes [6]
```



