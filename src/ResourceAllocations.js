import React, { Component } from 'react';
import moment from 'moment';

const resourceChartData = JSON.parse(window.localStorage.getItem('resourceChartData'));

class ResourceTable extends Component {
    render() {
        return (
            <div className="resource-allocations-table">
                <h1>Resource Allocations</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Start Date
                            </th>
                            <th>
                                End Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {resourceChartData.map(resourceData => (
                            <tr key={resourceData[0]}>
                                <td className="resource-name">{resourceData[1]}</td>
                                <td>{moment(resourceData[3]).format('MM-DD-YYYY')}</td>
                                <td>{moment(resourceData[4]).format('MM-DD-YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        );
    }
}

export default ResourceTable;