import React, { Component } from 'react';
import RandomDataGenerator from './RandomDataGenerator.js';

// TODO: Remove this from here

const resources = RandomDataGenerator.resources;

window.localStorage.setItem('resources', JSON.stringify(resources));

class ResourceTable extends Component {
    render() {
        return (
            <div className="resource-table">
                <h1>Resource Table</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Skills
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map(resource => (
                            <tr key={resource.id}>
                                <td className="resource-name">{resource.name}</td>
                                <td className="resource-skills">
                                    {resource.skills.map((skill,index) => (
                                        <span key={index}>{skill}</span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        );
    }
}

export default ResourceTable;