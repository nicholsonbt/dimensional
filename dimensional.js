var DIMENSIONAL = {};

DIMENSIONAL.Dimensions = function(position) {
	return DIMENSIONAL.GetKeys(position).length;
}

DIMENSIONAL.GetKeys = function(position) {
	// Keys will be sorted using insertion sort, as we can expect them to be mostly ordered and small n.
	return SortedKeys(position);
}

function SortedKeys(object) {
	return SORT.InsertionSort(Object.keys(object));
}

DIMENSIONAL.Distance = function(positionA, positionB, metric) {
	if (!COMPARE.Equals(DIMENSIONAL.GetKeys(positionA), DIMENSIONAL.GetKeys(positionB)))
		throw "The passed positions have different number of dimensions.";
}