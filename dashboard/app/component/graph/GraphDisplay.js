import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

function GraphDisplay() {
  // Base date setup
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  const [animationClass, setAnimationClass] = useState("");

  for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }

  // Example chart options for line chart (option3)
  const option3 = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
      axisLabel: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        name: "Fake Data",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: { color: "rgb(132, 204, 22)" },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(63, 98, 18)" },
            { offset: 1, color: "rgb(163, 230, 53)" },
          ]),
        },
        data: data,
      },
    ],
  };

  // Example chart options for pie chart (option2)
  const option2 = {
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [30, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: { borderRadius: 8 },
        data: [
          { value: 40, name: "toddler" },
          { value: 38, name: "children" },
          { value: 32, name: "teenager" },
          { value: 30, name: "young adult" },
          { value: 28, name: "adult" },
          { value: 25, name: "middle-aged adult" },
          { value: 20, name: "senior" },
        ],
      },
    ],
    legend: {
      show: false,
      data: [
        "toddler",
        "children",
        "teenager",
        "young adult",
        "adult",
        "middle-aged adult",
        "senior",
      ],
      textStyle: {
        color: "#000",
      },
      icon: "rect",
      itemWidth: 10,
      itemHeight: 10,
    },
  };

  const option1 = {
    dataset: [
      {
        dimensions: ['name', 'age', 'profession', 'score', 'date'],
        source: [
          ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
          ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
          ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
          ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
          ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
          ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
          ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
          ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
          ['Han Meimei', 67, 'Engineer', 366, '2011-03-12']
        ]
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30, show: false }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
  };

  const [option, setOption] = useState({}); // Set the initial option here

  const switchGraph = () => {
    setOption((prevOption) => {
      if (prevOption === option1) {
        return option2;
      } else if (prevOption === option2) {
        return option3;
      } else {
        return option1;
      }
    });
    setAnimationClass("animate");
    setTimeout(() => setAnimationClass(""), 2000);
  };

  // Set an interval to switch the graph every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(switchGraph, 4000); // 3000ms = 3 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the interval runs once when the component mounts

  return (
    <div className={`absolute bottom-0 left-0 w-full h-1/2 ${animationClass}`}
      style={{
        zIndex: 1,
        transition: "transform 1s ease-in-out",
        transform: animationClass ? "scale(1)" : "scale(0)",
      }}>
      <ReactECharts
        option={option}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        onEvents={{
          click: (params) => {
            const optionId = params.data[3]; // Get child groupId
            if (optionId) {
              goForward(optionId);
            }
          },
        }}
      />
    </div>
  );
}

export default GraphDisplay;
