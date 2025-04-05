import React from 'react';
import ReactECharts from 'echarts-for-react';

function TotalVisitChart() {

    const data = [
        10, 150, 420, 211, 587, 758, 220, 835, 80, 248, 320, 200
    ]
    const option = {
        title: {
            text: 'Total Visits by Month',
            left: '10%',
            top: '3%',
            textStyle: {
                fontSize: "1.2rem",
            },
        },
        toolbox: {
            show: true,
            top: '3%',
            left: '2%',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        legend: {
            data: ['2025'],
            top: '3.3%',
            left: '27%',
            icon: 'square', 
            itemWidth: 12,
            itemHeight: 12, // Match this to the text size for better alignment
            itemGap: 10, // Adjust spacing between items
            textStyle: {
                color: 'green',
                padding: [0, 0, 0, 8], // Adjust padding as needed
                fontSize: 12,
                lineHeight: 12, // Ensure lineHeight matches the fontSize for centering
            },
        },
      
        xAxis: {
            type: 'category',
            data: ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'],
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1000,
            interval: 200,
        },
        series: [
            {
                name: '2025',
                data: data,
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: 'green', // Line color
                },
                areaStyle: {
                    color: 'rgba(0, 128, 0, 0.3)', // Transparent green for area fill
                },
            },
        ],
        color: ['green'], // Ensure legend icon color matches this
    };

    return (
        <ReactECharts
            option={option}
            style={{
                width: '100%',
                height: '100%',
                zIndex: 1,
            }}
        />
    );
}

export default TotalVisitChart;
