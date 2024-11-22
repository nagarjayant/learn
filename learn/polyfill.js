//polyfills

//polyfill for the new ES6 String method startsWith():
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

//arrow function polyfill
[1, 2, 4].map((el) => el * 2);
[1, 2, 4].map(function (el) {
  return el * 2;
});

//promise all
if (!Promise.all) {
  Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
      if (!Array.isArray(promises)) {
        return reject(new TypeError("Promise.all accepts an array"));
      }
      var results = [];
      var completed = 0;
      promises.forEach(function (promise, index) {
        Promise.resolve(promise).then(
          function (value) {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          function (reason) {
            reject(reason);
          },
        );
      });
      if (promises.length === 0) {
        resolve(results);
      }
    });
  };
}

//foreach doesn't return anything
//callback(value, index, array)
const foreacharr = [1, 2, 3, 4, 5];
Array.prototype.myforEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};

function print(el) {
  console.log(el);
}

arr.myforEach(print);

//map always return
//callback(value, index, array)
const maparr = [1, 2, 3, 4, 5];
Array.prototype.myMap = function (cb) {
  const resArr = [];
  for (let i = 0; i < this.length; i++) {
    resArr.push(cb(this[i], i, this));
  }
  return resArr;
};

const newEle = maparr.myMap((el) => el * 2);
console.log(newEle);

//filter always return
const Filterarr = [1, 2, 3, 4, 5];
Array.prototype.myFilter = function (cb) {
  const resArr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      resArr.push(this[i]);
    }
  }
  return resArr;
};
const resFil = Filterarr.myFilter((el) => el < 5);
console.log(res);

//reduce
const reduceArr = [1, 2, 3, 4, 5];
const getMax = (a, b) => Math.max(a, b);
Array.prototype.myReduce = function (cb, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    acc = acc ? cb(acc, this[i]) : this[i];
  }
  return acc;
};
const resRed = reduceArr.myReduce((acc, cur) => {
  return acc + cur;
}, 0);
console.log(resRed);
const getMaxRes = reduceArr.myReduce(getMax, 0);
console.log(getMaxRes);

//call
let person1 = {
  name: "person1",
};

let person2 = {
  name: "person2",
};
function printInfo(age) {
  console.log(`${this.name} is ${age} years old`);
}
printInfo.call(person1, 23);

Function.prototype.myCall = function (obj = {}, ...args) {
  if (typeof this != "function") {
    throw newError("not a function");
  }
  obj.fn = this; //assign the function to the object
  obj.fn(...args); //pass parameters to the function
};
printInfo.myCall(person2, 27);

//apply takes argument in array format
Function.prototype.myApply = function (obj = {}, ...args) {
  if (typeof this != "function") {
    throw newError("not a function");
  }
  //if argummentts are not in array format i.e.,[arg] throw this error
  if (!Array.isArray(...args)) {
    throw newError("TypeArray: not an array");
  }
  obj.fn = this; //assign the function to the object
  obj.fn(...args); //pass parameters to the function
};
printInfo.myApply(person2, [27]); //argument in array format

//bind returns a function
let newFunc = printInfo.bind(person1);
newFunc(23); // person1 is 23 years old
function printDet(...args) {
  console.log(`${this.name} is ${args}`);
}
Function.prototype.myBind = function (obj = {}, ...args1) {
  if (typeof this != "function") {
    throw newError("not a function");
  }
  obj.fn = this; //assign the function to the object
  return function (...args2) {
    obj.fn(...args1, ...args2); //pass parameters to the function
  };
};
let newBind = printDet.myBind(person1);
newBind(23); //person1 is 23
let newData = printDet.myBind(person1, 23);
newData("Male"); //person1 is 23,Male

//flat
let unflatArr = [1, 2, 3, [[4, 5]]];
console.log(arr.flat(Infinity));

Array.prototype.myFlat = function (depth) {
  const flattenArray = [];
  if (!Array.isArray(this)) {
    throw new Error(`${this} in not an array.. Require array`);
  }
  this.forEach((el) => {
    if (Array.isArray(el) && depth > 0) {
      flattenArray.push(...el.myFlat(depth - 1));
    } else {
      flattenArray.push(el);
    }
  });
  return flattenArray;
};

console.log(unflatArr.myFlat(Infinity));

//flatMap
if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function (callback, thisArg) {
    // Check if callback is a function
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // Create a new array to store the results
    const result = [];

    // Use map to apply the callback function to each element
    this.map((value, index, array) => {
      return callback.call(thisArg, value, index, array);
    }).forEach((subArray) => {
      // Flatten the array one level deep
      if (Array.isArray(subArray)) {
        result.push(...subArray);
      } else {
        result.push(subArray);
      }
    });

    return result;
  };
}

//includes
let incArr = [1, 2, 4, 5, 6, NaN];
Array.prototype.myInclude = function (searchVal, fromIndex) {
  if (fromIndex === undefined) {
    fromIndex = 0;
  }
  if (fromIndex < 0) {
    fromIndex = Math.max(this.length + fromIndex, 0);
  }

  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === searchVal || (searchVal !== searchVal && this[i] !== this[i])) {
      //(searchVal !== searchVal && this[i] !== this[i]) is used to handle the special case of NaN in JavaScript
      return true;
    }
  }
  return false;
};
console.log(incArr.myInclude(NaN));

//shallow copy don't change original array use spread operator for shallow copy only works for flat arrays
let arr1 = [1, 2, 4];
let arr3 = arr1; //create deep copy any change to arr3 willl also make change in arr1 as same reference is stored
let arr2 = [...arr1]; //creates shallow copy any change to arr2 will not make change in arr1

let nesArr1 = [1, 2, [3, 5]];
let nesArr2 = [...nesArr1];
nesArr[2].push(7); // adds 7 to both nesArr1 and nesArr2;
let nesArr3 = JSON.parse(JSON.stringify(nesArr1)); //creates deep copy
nesArr3[2].push(7); // adds 7 to nesArr3 only
/*
Shallow Copy
A shallow copy of an object or array copies the reference to the original elements. 
This means that if the original object contains nested objects or arrays, 
the shallow copy will still reference those nested structures. 
Any changes made to the nested structures in the copy will affect the original, and vice versa.
*/
let originalArray = [1, 2, 3, { a: 4 }];
let shallowCopy = [...originalArray];

shallowCopy[3].a = 42;
console.log(originalArray[3].a); // Output: 42

/*
Deep Copy
A deep copy, on the other hand, creates a new instance of the original object and recursively copies all nested objects and arrays. 
This ensures that the copy is completely independent of the original. 
Changes made to the nested structures in the copy do not affect the original.
*/
let originalArrayNew = [1, 2, 3, { a: 4 }];
let deepCopy = JSON.parse(JSON.stringify(originalArray));
deepCopy[3].a = 42;
console.log(originalArrayNew[3].a); // Output: 4

//polyyfill for deep copy
function deepCopy(value) {
  // Check for null or undefined
  if (value === null || typeof value !== "object") {
    return value; // Return the value if it is not an object
  }

  // Handle Array
  if (Array.isArray(value)) {
    let copy = [];
    for (let i = 0; i < value.length; i++) {
      copy[i] = deepCopy(value[i]); // Recursively copy each element
    }
    return copy;
  }

  // Handle Object
  if (value instanceof Object) {
    let copy = {};
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        copy[key] = deepCopy(value[key]); // Recursively copy each property
      }
    }
    return copy;
  }

  throw new Error("Unable to copy value! Its type isn't supported.");
}
// Example usage:
let original = { a: 1, b: { c: 2, d: [3, 4] } };
let copy = deepCopy(original);

copy.b.c = 42;
copy.b.d[0] = 99;

console.log(original.b.c); // Output: 2
console.log(original.b.d[0]); // Output: 3
console.log(copy.b.c); // Output: 42
console.log(copy.b.d[0]); // Output: 99
