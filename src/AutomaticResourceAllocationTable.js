import React, { Component } from 'react';

class AutomaticResourceAllocationTable extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            Resource
                            </th>
                        <th>
                            Skills %
                            </th>
                        <th>
                            Availability %
                            </th>
                        <th>
                            Total %
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.resourceHeuristicResults.map((resourceHeuristicResult, index) => (
                        <tr key={index}>
                            <td>{resourceHeuristicResult.name}</td>
                            <td>{resourceHeuristicResult.skillsPercent}</td>
                            <td>{resourceHeuristicResult.availabilityPercent}</td>
                            <td>{resourceHeuristicResult.totalPercent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default AutomaticResourceAllocationTable;