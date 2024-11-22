const prom1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("gfg1");
  }, 1000);
});

const prom2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("error");
  }, 2000);
});

const prom3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("gfg2");
  }, 3000);
});

const prom4 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("gfg3");
  }, 3000);
});

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

Promise.all([prom1, prom2, prom3])
  .then((res) => {
    console.log(res);
  })
  .catch((er) => {
    console.log(er);
  });

Promise.all([prom1, prom3, prom4])
  .then((res) => {
    console.log(res);
  })
  .catch((er) => {
    console.log(er);
  });
