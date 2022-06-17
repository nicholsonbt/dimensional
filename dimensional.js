var DIMENSIONAL = {};

// DIMENSIONAL.distanceMetrics = [ EUCLIDEAN, MANHATTAN, MINKOWSKI, HAMMING, COSINE]

DIMENSIONAL.Dimensions = function(vector) {
	return DIMENSIONAL.GetKeys(vector).length;
}

DIMENSIONAL.GetKeys = function(vector) {
	// Keys will be sorted using insertion sort, as we can expect them to be mostly ordered and small n.
	return SORT.InsertionSort(Object.keys(vector));
}


DIMENSIONAL.Distance = function(vectorA, vectorB, metric) {
	switch (metric) {
		case 'EUCLIDEAN':
			return DIMENSIONAL.EuclideanDistance(vectorA, vectorB);
		case 'MANHATTAN':
			return DIMENSIONAL.ManhattanDistance(vectorA, vectorB);
		case 'HAMMING':
			return DIMENSIONAL.HammingDistance(vectorA, vectorB);
		case 'COSINE':
			return DIMENSIONAL.CosineDistance(vectorA, vectorB);
		default:
			let metricType, p;
			try {
				[metricType, p] = metric;
				
			} catch(err) {
				throw ("Unknown metric: " + metric);
				
			} finally {
				if (metricType == 'MINKOWSKI')
					return DIMENSIONAL.MinkowskiDistance(vectorA, vectorB, p);
				else
					throw ("Unknown metric: " + metricType);
			}
	}
	console.log(vectorA, vectorB);
}

DIMENSIONAL.VectorOffset = function(vectorA, vectorB) {
	// If vectorA and vectorB have different numbers of dimensions or differently named dimensions, throw an error.
	if (!COMPARE.Equals(DIMENSIONAL.GetKeys(vectorA), DIMENSIONAL.GetKeys(vectorB)))
		throw "The passed vectors have a different number of dimensions.";
	
	let vector = {};
	let keys = DIMENSIONAL.GetKeys(vectorA);
	
	for (let i = 0; i < keys.length; i++) {
		vector[keys[i]] = Math.abs(vectorB[keys[i]] - vectorA[keys[i]]);
	}
	
	return vector;
}
	
DIMENSIONAL.MinkowskiDistance = function(vectorA, vectorB, p) {
	let offset = DIMENSIONAL.VectorOffset(vectorA, vectorB);
	let sum_of_powers = DIMENSIONAL.SumOfPowers(offset, p);

	return Math.pow(sum_of_powers, 1/p);
}

DIMENSIONAL.ManhattanDistance = function(vectorA, vectorB) {
	return DIMENSIONAL.MinkowskiDistance(vectorA, vectorB, 1);
}

DIMENSIONAL.EuclideanDistance = function(vectorA, vectorB) {
	return DIMENSIONAL.MinkowskiDistance(vectorA, vectorB, 2);
}

DIMENSIONAL.HammingDistance = function(vectorA, vectorB) {
	let offset = DIMENSIONAL.VectorOffset(vectorA, vectorB);
	
	let hamming = 0;
	
	let keys = DIMENSIONAL.GetKeys(vectorA);
	
	for (let i = 0; i < keys.length; i++) {
		if (offset[keys[i]] != 0)
			hamming += 1;
	}

	return hamming;
}

DIMENSIONAL.SumOfPowers = function(vector, p) {
	let sum_of_powers = 0;
	
	let keys = DIMENSIONAL.GetKeys(vector);
	
	for (let i = 0; i < keys.length; i++) {
		sum_of_powers += Math.pow(vector[keys[i]], p);
	}

	return sum_of_powers;
}

DIMENSIONAL.SumOfSquares = function(vector) {
	return DIMENSIONAL.SumOfPowers(vector, 2);
}

DIMENSIONAL.CosineDistance = function(vectorA, vectorB) {
	return 1 - DIMENSIONAL.CosineSimilarity(vectorA, vectorB);
}

DIMENSIONAL.CosineSimilarity = function(vectorA, vectorB) {
	// If vectorA and vectorB have different numbers of dimensions or differently named dimensions, throw an error.
	if (!COMPARE.Equals(DIMENSIONAL.GetKeys(vectorA), DIMENSIONAL.GetKeys(vectorB)))
		throw "The passed vectors have a different number of dimensions.";
	
	let numerator = DIMENSIONAL.DotProduct(vectorA, vectorB);
	let denominator = Math.sqrt(DIMENSIONAL.SumOfSquares(vectorA)) * Math.sqrt(DIMENSIONAL.SumOfSquares(vectorB));
	
	return numerator / denominator;
}


DIMENSIONAL.DotProduct = function(vectorA, vectorB) {
	let vector = DIMENSIONAL.HadamardProduct(vectorA, vectorB);
	
	let sum = 0;
	
	for (let i = 0; i < vector.length; i++) {
		sum += vector[keys[i]];
	}
	
	return sum;
}


DIMENSIONAL.HadamardProduct = function(vectorA, vectorB) {
	// If vectorA and vectorB have different numbers of dimensions or differently named dimensions, throw an error.
	if (!COMPARE.Equals(DIMENSIONAL.GetKeys(vectorA), DIMENSIONAL.GetKeys(vectorB)))
		throw "The passed vectors have a different number of dimensions.";
	
	let keys = DIMENSIONAL.GetKeys(vectorA);
	let vector = {}
	
	for (let i = 0; i < keys.length; i++) {
		vector[keys[i]] = vectorA[keys[i]] * vectorB[keys[i]];
	}
	
	return vector;
}

