var COMPARE = {};

COMPARE.Equals = function(a, b) {
	if (typeof a != typeof b)
		return false;
	
	switch (typeof a) {
		case 'boolean':
		case 'null':
		case 'undefined':
		case 'number':
		case 'bigint':
		case 'string':
		case 'symbol':
		case 'function':
			// Function is true if and only if a and b point to the same function.
			return a == b;
		case 'object':
			if (a == null || b == null) {
				if (a == null && b == null)
					return true;
				return false;
			}
			
			if (a.constructor != b.constructor)
				return false;
			
			switch (a.constructor) {
				case Array:
					if (a.length != b.length) {
						return false;
					} else {
						for (var i=0; i < a.length; i++) {
							if (!COMPARE.Equals(a[i], b[i])) {
								return false;
							}
						}
					}
					return true;
					
				case Object:
					let aKeys = SortedKeys(a);
					let bKeys = SortedKeys(b);
					
					if (!COMPARE.Equals(aKeys, bKeys))
						return false;
					
					for (let i = 0; i < aKeys.length; i++) {
						if (!COMPARE.Equals(a[aKeys[i]], b[bKeys[i]])) {
							return false;
						}
					}
					return true;
					
				case Date:
					return a.getTime() == b.getTime();
					
				default:
					console.log("Unrecognised object:", (a.constructor));
					return false;
			}

			return true;
		default:
			console.log("Unrecognised type:", (typeof a));
			return false;
	}
}