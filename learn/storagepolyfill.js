(function () {
  // Helper function to create a storage object
  function createStorage() {
    let storage = {};

    return {
      getItem: function (key) {
        return storage.hasOwnProperty(key) ? storage[key] : null;
      },
      setItem: function (key, value) {
        storage[key] = String(value);
      },
      removeItem: function (key) {
        delete storage[key];
      },
      clear: function () {
        storage = {};
      },
      key: function (index) {
        const keys = Object.keys(storage);
        return keys[index] || null;
      },
      getAllKeys: function () {
        return Object.keys(storage);
      },
      get length() {
        return Object.keys(storage).length; // localStorage.length;
      },
      length: function () {
        return Object.keys(storage).length; // localStorage.length() the difference is the way we call it;
      },
    };
  }

  // Check if localStorage is available and working
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const test = "__storage_test__";
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Assign polyfill if necessary
  if (!storageAvailable("localStorage")) {
    Object.defineProperty(window, "localStorage", {
      value: createStorage(),
      configurable: false,
      enumerable: true,
      writable: false,
    });
  }

  if (!storageAvailable("sessionStorage")) {
    Object.defineProperty(window, "sessionStorage", {
      value: createStorage(),
      configurable: false,
      enumerable: true,
      writable: false,
    });
  }
})();

/*
Breakdown:

    Object.defineProperty: This is a method that allows precise addition or modification of a property on an object. It provides control over the property's characteristics.

    window: This is the global object in browsers, representing the window in which the script is running.

    "sessionStorage": This is the name of the property being defined or modified. Here, we're defining sessionStorage on the window object.

    Property Descriptor: The second argument of Object.defineProperty is an object that describes the property being defined. It has the following characteristics:

        value: The value to be assigned to the property. In this case, createStorage() is a function that presumably returns an object implementing the sessionStorage functionality.

        configurable: If false, the property cannot be deleted or changed (excluding value changes if writable is true). Here, it is set to false, meaning the sessionStorage property cannot be deleted or redefined.

        enumerable: If true, the property will be listed in for...in loops and Object.keys. Setting this to true makes sessionStorage visible during enumeration of the window object's properties.

        writable: If false, the value of the property cannot be changed directly. Here, it is set to false, meaning the sessionStorage object itself cannot be reassigned (though its properties can be modified if the object allows it).

createStorage Function (Hypothetical Implementation):

The createStorage function is not defined in the snippet you provided, but it should return an object that mimics the sessionStorage API. Here's a simple implementation:


*/
