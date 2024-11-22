// next greater element

function nextGreaterElements(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1); // Initialize result array with -1
  const stack = []; // Stack to store indices

  for (let i = 0; i < 2 * n; i++) {
    const currentIndex = i % n; // Current index in the circular array
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[currentIndex]) {
      const index = stack.pop(); // Get the index from the stack
      result[index] = nums[currentIndex]; // Set the next greater element
    }
    if (i < n) {
      stack.push(currentIndex); // Push the index onto the stack
    }
  }

  return result;
}

// Example usage
console.log(nextGreaterElements([1, 2, 1])); // Output: [2, -1, 2]
console.log(nextGreaterElements([1, 2, 3, 4, 3])); // Output: [2, 3, 4, -1, 4]
