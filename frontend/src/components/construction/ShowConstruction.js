import React, { Component } from 'react';
import axios from 'axios';

export default class ShowConstruction extends Component {
    
    // Constructor
    constructor(props) 
    {
        super(props);        
        this.state={
            project_name:'',
            area:'',
            no_floors:'',
            no_rooms:'',
            no_bathrooms:'',
            no_doors:'',
            no_windows:'',
            wall_material:'',
            celing_material:'',
            floor_material:'',
            roof_material:'',
            carpenter_name:'',
            carpenterJobSpec:'',
            timberType:'',
            carpenterNuMeters:'',
            totalCarpentryCost:'',
            mason_name:'',
            masonJobSpec:'',
            masonNuMeters:'',
            totalMasonryCost:'',
            totalCost:''
        }
    }

    // One of the lify cycle method in react
    componentDidMount() 
    {
        // Retrieve construction details
        axios.get('http://127.0.0.1:8000/api/constructions/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                name:response.data.construction_projectName,
                area:response.data.area,
                no_floors:response.data.no_floors,
                no_rooms:response.data.no_rooms,
                no_bathrooms:response.data.no_bathrooms,
                no_doors:response.data.no_doors,
                no_windows:response.data.no_windows,
                wall_material:response.data.wall_material,
                celing_material:response.data.celing_material,
                floor_material:response.data.floor_material,
                roof_material:response.data.roof_material,
                carpenter_name:response.data.carpenter,
                carpenterJobSpec:response.data.carpenterJobSpec,
                timberType:response.data.timberType,
                carpenterNuMeters:response.data.carpenterNuMeters,
                totalCarpentryCost:response.data.carpenterCost,
                mason_name:response.data.mason,
                masonJobSpec:response.data.masonJobSpec,
                masonNuMeters:response.data.masonNuMeters,
                totalMasonryCost:response.data.masonCost,
                totalCost:response.data.constructionCost
            });
        });
    }

    render() {
        return (
            <main className="main">

                {/* Construction project details view page starts from here */}
                <div className="text-center">
                    <h1>{this.state.name} - Construction Details</h1>
                </div>
                <hr/>
                <br/>
                <br/>
                <div className="container">
                <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="text-left"><h5><b>Description</b></h5></th>
                                <th className="text-center"><h5><b></b></h5></th>
                                <th className="text-right"><h5><b>Amount</b></h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td><b>Building Info</b></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Area (SqFt.)</td>
                                <td></td>
                                <td className="text-right">{this.state.area}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of floors</td>
                                <td></td>
                                <td className="text-right">{this.state.no_floors} floor(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Rooms</td>
                                <td></td>
                                <td className="text-right">{this.state.no_rooms} Room(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Bathrooms</td>
                                <td></td>
                                <td className="text-right">{this.state.no_bathrooms} Bathroom(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Doors</td>
                                <td></td>
                                <td className="text-right">{this.state.no_doors} door(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Windows</td>
                                <td></td>
                                <td className="text-right">{this.state.no_windows} window(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Wall Material</td>
                                <td></td>
                                <td className="text-right">{this.state.wall_material}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Celing Material</td>
                                <td></td>
                                <td className="text-right">{this.state.celing_material}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Floor Material</td>
                                <td></td>
                                <td className="text-right">{this.state.floor_material}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Roof Material</td>
                                <td></td>
                                <td className="text-right">{this.state.roof_material}</td>
                            </tr>
                            <tr className="">
                                <td><b>Carpentry Cost Prediction Info</b></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Carpenter</td>
                                <td></td>
                                <td className="text-right">{this.state.carpenter_name}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Job Specification</td>
                                <td></td>
                                <td className="text-right">{this.state.carpenterJobSpec}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Timber Type</td>
                                <td></td>
                                <td className="text-right">{this.state.timberType}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of meters</td>
                                <td></td>
                                <td className="text-right">{this.state.carpenterNuMeters}</td>
                            </tr>
                            <tr className="">
                                <td><b>Carpentery Cost Prediction</b></td>
                                <td></td>
                            <td className="text-right">{this.state.totalCarpentryCost}</td>
                            </tr>
                            <tr className="">
                                <td><b>Masonry</b></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Mason</td>
                                <td></td>
                                <td className="text-right">{this.state.mason_name}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Job Specification</td>
                                <td></td>
                                <td className="text-right">{this.state.masonJobSpec}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of meters</td>
                                <td></td>
                                <td className="text-right">{this.state.masonNuMeters}</td>
                            </tr>
                            <tr className="">
                                <td><b>Masonry Cost Prediction</b></td>
                                <td></td>
                                <td className="text-right">{this.state.totalMasonryCost}</td>
                            </tr>
                            <tr className="">
                                <td><b>Total House Construction Cost Prediction</b></td>
                                <td></td>
                                <td className="text-right">{this.state.totalCost}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                </div>
                
            </main>
        )
    }
}
