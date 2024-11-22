function inventoryList() {
  const collection = [];

  function add(name) {
    if (name.trim().length != 0 && !collection.includes(name) && collection.length < 10) {
      collection.push(name);
    }
  }

  function remove(name) {
    const index = collection.indexOf(name);
    if (index !== -1) {
      collection.splice(index, 1);
    }
  }

  function getList() {
    if (collection.length === 0) {
      console.log("No Items");
    }
    return collection;
  }

  return {
    add,
    remove,
    getList,
  };
}

const elementIns = inventoryList();
elementIns.add("shirt");
elementIns.add(" ");
elementIns.add("pant");
console.log(elementIns.getList());

//another way to create
function inventoryListOtr() {
  const collection = [];
  return {
    add: function (name) {
      if (name.trim().length != 0 && !collection.includes(name) && collection.length < 10) {
        collection.push(name);
      }
    },
    remove: function (name) {
      const index = collection.indexOf(name);
      if (index !== -1) {
        collection.splice(index, 1);
      }
    },
    getList: function () {
      if (collection.length === 0) {
        console.log("No Items");
      }
      return collection;
    },
  };
}

const elementInsd = inventoryListOtr();
elementIns.add("shirt");
elementIns.add(" ");
elementIns.add("pant");
console.log(elementIns.getList());
