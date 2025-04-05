import React from 'react';
import ReactECharts from 'echarts-for-react';

function AgeBarChart({
    data,
    ageClassification
}) {

  const option = {
    grid: {
      top: "40%",
      bottom: "20%",
    },
    toolbox: {
      show: true,
      bottom: '0%',
      right: '2%',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      max: "dataMax",
    },
    yAxis: {
      type: "category",
      data: ageClassification.map((item) => item.classification), // Categories defined as before
      inverse: true, // Reversed order to have higher values at the top
      max: 7, // Limit the number of categories shown
      axisLabel: {
        show: false, // Hide the y-axis labels
      }
    },
    series: [
      {
        realtimeSort: true,
        type: "bar",
        data: data
          .map((item, index) => ({
            value: item.value,
            isVisible: item.isVisible,
            // Retain the color mapping based on the original data order
            itemStyle: {
              color: ageClassification[index]?.graphColor,
            },
          }))
          .filter((item) => item.isVisible) // Filter only visible data
          .map((item) => ({
            value: item.value,
            itemStyle: { color: item.itemStyle.color },
          })),
        label: {
          show: false,
        },
        barCategoryGap: '20%',
      },
    ],
    legend: {
      show: false,
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };

  return (
    <ReactECharts 
        option={option}
        style={{
            width: '100%', 
            height: '100%',
            zIndex: 1 
        }}
    />
  )
}

export default AgeBarChart
