import React, { Component } from 'react';
import RandomDataGenerator from './RandomDataGenerator.js';

window.localStorage.setItem('resourceChartData', JSON.stringify(RandomDataGenerator.resourceDataForGantt));

// TODO: CSS
class ResourceCalendar extends Component {
    render() {
        return (
            <div className="resource-calendar">
                <h1>Resource Calendar</h1>
                <div id="chart_div"></div>
            </div>
        );
    }
}

export default ResourceCalendar;