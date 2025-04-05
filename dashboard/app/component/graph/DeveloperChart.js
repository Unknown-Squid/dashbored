import React from 'react';
import ReactECharts from 'echarts-for-react';

function DeveloperChart() {
  const option = {
    title: {
        text: 'Number of Developer Visits',
        left: 'center',  // Title aligned to the center
        top: '5%', // Title position from the top
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
    grid: {
      top: '35%', 
      left: '15%',
      right: '15%', 
      bottom: '20%',
    },
    xAxis: {
      type: 'category',
      data: ['Yes', 'No'],
      axisLabel: {
        formatter: (value) => (value === 'Yes' ? 'Developer' : 'Non-Developer'),
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: [],
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) =>
        `${params[0].name}: ${params[0].value} Visits`,
    },
    series: [
      {
        type: 'bar',
        data: [15, 10], // Number of "Yes" and "No" responses
        itemStyle: {
          color: (params) => (params.dataIndex === 0 ? '#4CAF50' : '#F44336'), // Color based on response type
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c} Visits',
        }
      }
    ]
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
  );
}

export default DeveloperChart;
