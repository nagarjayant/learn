/*
implement data finder function:  it takes single argument data as array of integers and returns a new function find. find takes 3 arggumentts minrange, maxrange and value all integers. find searches for the value in data array in inclusive range [minrange-maxrange] using 0 based indexing. If value is found in the range it returns true else false. if minrange or maxrange is beyound an end of the array throe an error object with invalid array message javascript


 */

function dataFinder(data) {
  return function find(minRange, maxRange, value) {
    if (minRange < 0 || maxRange >= data.length) {
      throw new Error("Invalid array");
    }

    for (let i = minRange; i <= maxRange; i++) {
      if (data[i] === value) {
        return true;
      }
    }

    return false;
  };
}

// Example usage:
const data = [1, 2, 3, 4, 5];
const findFunction = dataFinder(data);
console.log(findFunction(1, 3, 3)); // Output: true
console.log(findFunction(2, 4, 6)); // Output: false
