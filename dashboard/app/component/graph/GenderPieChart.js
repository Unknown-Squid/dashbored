import React from 'react';
import ReactECharts from 'echarts-for-react';

function GenderPieChart() {

  const option = {
    legend: {
      top: '5%',
      left: 'center', 
      itemWidth: 10,  
      itemHeight: 10, 
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
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        name: 'Gender Statistics',
        type: 'pie',
        radius: ['20%', '60%'],  // Adjust the size of the pie chart
        center: ['50%', '55%'],  // Center the pie chart in the container
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: 'Male' },
          { value: 25, name: 'Female' },
        ],
      },
    ],
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

export default GenderPieChart;
