import { createContext } from "react";

const TransContext = createContext();
export default TransContext;
export function parseObject(data) {
  let cellData, propName, dataObject;
  const dataObjectsArray = [];
  const cols = data.table.cols;
  const rows = data.table.rows;
  const propNames = convertPropNames(cols);

  for (let i = 0; i < rows.length; i++) {
    dataObject = {};

    for (let j = 0; j < propNames.length; j++) {
      propName = propNames[j];
      cellData = rows[i]["c"][j];

      if (cellData === null) {
        dataObject[propName] = "";
      } else if (typeof cellData["v"] == "string" && cellData["v"].startsWith("Date")) {
        // dataObject[propName] = new Date(cellData["f"]);
        dataObject[propName] = cellData["f"];
      } else {
        dataObject[propName] = cellData["v"];
      }
    }

    dataObjectsArray.push(dataObject);
  }

  return dataObjectsArray;
}

function convertPropNames(props) {
  let propsArray = [];
  let prop, propPieces;

  for (let i = 0; i < props.length; i++) {
    prop = props[i].label;

    if (prop.includes(" ") || prop.includes("-")) {
      prop = props[i].label.toLowerCase();
      propPieces = prop.split(/[- ]+/);

      propPieces = propPieces.map((prop, i) => {
        return i > 0 ? prop.charAt(0).toUpperCase() + prop.slice(1) : prop;
      });

      propsArray.push(propPieces.join(""));
    } else if (Boolean(prop.match(/\b([A-Z])/))) {
      propsArray.push(prop.toLowerCase());
    } else {
      propsArray.push(prop);
    }
  }

  return propsArray;
}
