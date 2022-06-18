var SORT = {};

SORT.InsertionSort = function(array) {
	let insert = function(array, rightIndex, value) {
		// Search for the first (from the right of index i) index (j) such that the value at j is less than 'value'.
		// Increment the index of all values between i and j.
		for (var j = rightIndex; j >= 0 && array[j] > value; j--) {
			array[j + 1] = array[j];
		}
		
		// Insert 'value' in its sorted location.
		array[j + 1] = value;
	}
	
	// Iterate (i) from index 1 to N.
	for (let i = 1; i < array.length; i++) {
		// Foreach i, compare the element at index i ('value') insert 'value' in its sorted location.
		insert(array, i-1, array[i]);
	}
	
	// Return the sorted array.
	return array;
}
