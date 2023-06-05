import React, { useEffect, useState } from "react";
import DonutChart from "./DonutChart";

const DialogueStats = ({ keys, setSelectedKey, selectedKey }) => {
  const resultObject = keys.reduce((acc, val) => {
    if (val !== null) {
      acc[val] = acc[val] ? acc[val] + 1 : 1;
    }
    return acc;
  }, {});

  const sortedResultObject = Object.fromEntries(
    Object.entries(resultObject).sort((a, b) => b[1] - a[1])
  );

  return (
    <div className="flex overflow-y-auto flex-col items-center p-5 bg-white rounded-3xl ">
      <div className="w-full h-full overflow-y-hidden max-h-[calc(100vh-10rem)] flex flex-col items-center overflow-x-hidden">
        <h1 className="text-lg">Key entity</h1>
        <div style={{ width: 500, height: 500 }}>
          <DonutChart
            keys={keys}
            setSelectedKey={setSelectedKey}
            selectedKey={selectedKey}
          />
        </div>
        <div className="flex flex-col -mt-10 justify-left overflow-y-auto">
          {Object.entries(sortedResultObject).map(([key, value]) => (
            <h1 key={key} className={"text-l text-left my-2"}>
              {`${key}: ${value}`}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueStats;
