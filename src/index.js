/*global gantt*/
/*global google*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import RandomDataGenerator from './RandomDataGenerator.js';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

google.charts.load('current', { 'packages': ['gantt'] });
google.charts.setOnLoadCallback(drawChart);

const resourceChartData = JSON.parse(window.localStorage.getItem('resourceChartData'));

RandomDataGenerator.parseDatesFromResourceData(resourceChartData);

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    data.addRows(resourceChartData);

    var options = {
        height: 400,
        gantt: {
            trackHeight: 30
        }
    };

    var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

    chart.draw(data, options);
}