function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = args.join("+");
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function add(a, b) {
  return a + b;
}
const memoFn = memoize(add);
console.log(memoFn(2, 3));
