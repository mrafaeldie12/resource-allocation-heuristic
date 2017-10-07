import React, { Component } from 'react';
import ResourceTable from './ResourceTable';
import AutomaticResourceAllocation from './AutomaticResourceAllocation';
import ResourceCalendar from './ResourceCalendar';
import ResourceAllocations from './ResourceAllocations';

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1>Automatic Resource Selection</h1>
                <ResourceTable />
                <ResourceCalendar/>
                <ResourceAllocations/>
                <AutomaticResourceAllocation />
            </div>
        );
    }
}

export default App;