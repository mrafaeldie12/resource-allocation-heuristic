import React, { Component } from 'react';
import HeuristicRunner from './HeuristicRunner.js';
import moment from 'moment';
import AutomaticResourceAllocationTable from './AutomaticResourceAllocationTable';

class AutomaticResourceAllocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findPressed: false,
            resourceHeuristicResults: [],
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().add(10, 'days').format('YYYY-MM-DD'),
            skillsSeparatedByComma: ''
        }
        this.handleFind = this.handleFind.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    runHeuristic() {
        return HeuristicRunner.runHeuristic(new Date(this.state.startDate), new Date(this.state.endDate), this.state.skillsSeparatedByComma);
    }

    handleFind(event) {
        let resourceHeuristicResults = this.runHeuristic()

        resourceHeuristicResults = resourceHeuristicResults.sort((item, otherItem) => item.totalPercent > otherItem.totalPercent);

        this.setState({
            findPressed: true,
            resourceHeuristicResults : resourceHeuristicResults
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="resource-allocation">
                <h1>Resource Tool</h1>
                <div>
                    <label>
                        Start Date:
                        <input name="startDate" type="date" value={this.state.startDate} onChange={this.handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                        End Date:
                        <input name="endDate" type="date" value={this.state.endDate} onChange={this.handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Skills:
                        <input name="skillsSeparatedByComma" type="text" value={this.state.skillsSeparatedByComma} onChange={this.handleInputChange} />
                    </label>
                </div>
                <button onClick={this.handleFind}>
                    Find
                </button>
                {this.state.findPressed && <AutomaticResourceAllocationTable resourceHeuristicResults={this.state.resourceHeuristicResults}/>}
            </div>
        );
    }
}

export default AutomaticResourceAllocation;