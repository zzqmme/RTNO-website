import React, { useRef, useEffect, useState } from "react";
import { Chart, DoughnutController, ArcElement } from "chart.js";

Chart.register(DoughnutController, ArcElement);

import { colors } from "./assets/colors";

function DonutChart({ keys, setSelectedKey, selectedKey }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const handleChartClick = (event) => {
    const activePoints = chartRef.current.getElementsAtEvent(event);
    if (activePoints.length > 0) {
      const clickedElementIndex = activePoints[0]._index;
      const clickedElementKey = data.labels[clickedElementIndex];
      console.log("Clicked element data:", clickedElementKey);
      console.log("selected element data: ", selectedKey);

      if (clickedElementKey === selectedKey) {
        setSelectedKey(null);
        console.log("if is called");
      } else {
        setSelectedKey(clickedElementKey);
        console.log("else is called");
      }
      console.log(selectedKey);
    }
  };

  let resultObject = null;

  if (Array.isArray(keys)) {
    resultObject = keys.reduce((acc, val) => {
      if (val !== null) {
        acc[val] = acc[val] ? acc[val] + 1 : 1;
      }
      return acc;
    }, {});
  } else {
    resultObject = keys;
  }

  const keysArray = Object.keys(resultObject);
  const valuesArray = Object.values(resultObject);

  const data = {
    labels: keysArray,
    datasets: [
      {
        data: valuesArray,
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    data.datasets[0].backgroundColor = colors.slice(
      0,
      data.datasets[0].data.length
    );
    data.datasets[0].hoverBackgroundColor = colors.slice(
      0,
      data.datasets[0].data.length
    );

    const options = {
      cutoutPercentage: 50,
      animation: {
        animateRotate: true,
        animateScale: true,
      },
      legend: {
        display: false,
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 20,
          bottom: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    };

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options,
    });
    chartRef.current = myChart;

    canvas.addEventListener("click", handleChartClick);

    return () => {
      myChart.destroy();
      canvas.removeEventListener("click", handleChartClick);
    };
  }, [keys]);

  return <canvas ref={canvasRef} />;
}

export default DonutChart;
