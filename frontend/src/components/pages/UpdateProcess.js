import React, { Component } from 'react';
import UpdateCostPredictionInfo from '../ML/UpdateCostPredictionInfo';
import UpdateServiceProviderInfo from '../pages/UpdateServiceProvider';
import UpdatePredictionSummary from '../ML/UpdatePredictionSummary';
import UpdateCarpenterSelection from '../carpenter/UpdateCarpenterSelection';
import UpdateMasonSelection from '../mason/UpdateMasonSelection';
import UpdateSummary from './UpdateSummary';
import Success from './Success';

import axios from 'axios';

export class UpdateProcess extends Component {

    // state
    state = {
        step: 1,
        area: 0,
        construction_projectName:'',
        no_floors: 0,
        no_rooms: 0,
        no_bathrooms: 0,
        no_doors: 0,
        no_windows: 0,
        wall_material: '',
        celing_material: '',
        floor_material: '',
        roof_material: '',
        carpenter_id:0,
        carpenterNuMeters:0,
        carpenterJobSpec:'',
        timberType:'',
        mason_id:0,
        masonNuMeters:0,
        masonJobSpec:'',
        loc_nature:'',
        loc_situation:'',
        timber_for_carpentry:'',
        timber_for_celing:'',
        project_id:''
    }

    componentDidMount() {

        // retieve selected construction project's data
        axios.get('http://127.0.0.1:8000/api/constructions/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                project_id:response.data.id,
                construction_projectName:response.data.construction_projectName,
                area:response.data.area,
                height:response.data.height,
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
                loc_nature:response.data.loc_nature,
                loc_situation:response.data.loc_situation,
                carpenterNuMeters:response.data.carpenterNuMeters,
                totalCarpentryCost:response.data.carpenterCost,
                mason_name:response.data.mason,
                masonJobSpec:response.data.masonJobSpec,
                masonNuMeters:response.data.masonNuMeters,
                totalMasonryCost:response.data.masonCost,
                totalCost:response.data.constructionCost,
                timber_for_carpentry:response.data.timber_for_carpentry,
                timber_for_celing:response.data.timber_for_celing,
                no_pillers:response.data.no_pillers,
                no_of_door_frames:response.data.no_of_door_frames,
                no_of_window_frames:response.data.no_of_window_frames,
                no_of_walls:response.data.no_of_walls
            });
        });
    }

    // Next Step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // Previous Step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // Field Change handler
    handleChange = input => e => {
        e.preventDefault();
        this.setState({[input]: e.target.value})
    }

    render() {
        // step
        const {step} = this.state;

        // data
        let { area ,
                height,
                construction_projectName,
                no_floors ,
                no_rooms ,
                no_bathrooms ,
                no_doors ,
                no_windows ,
                wall_material ,
                celing_material ,
                floor_material ,
                roof_material ,
                carpenter_id ,
                mason_id,
                carpenterNuMeters,
                carpenterJobSpec,
                timberType,
                masonNuMeters,
                masonJobSpec,
                loc_nature,
                loc_situation,
                timber_for_carpentry,
                timber_for_celing,
                no_pillers,
                no_of_door_frames,
                no_of_window_frames,
                no_of_walls,
                project_id} = this.state;

        // assign values to the valye variable
        let values = { area:this.state.area,
                        height:this.state.height,
                        construction_projectName:this.state.construction_projectName,
                        no_floors:this.state.no_floors,
                        no_rooms:this.state.no_rooms,
                        no_bathrooms:this.state.no_bathrooms,
                        no_doors:this.state.no_doors,
                        no_windows:this.state.no_windows,
                        wall_material:this.state.wall_material,
                        celing_material:this.state.celing_material,
                        floor_material:this.state.floor_material,
                        roof_material:this.state.roof_material,
                        carpenter_id,
                        mason_id,
                        carpenterNuMeters:this.state.carpenterNuMeters,
                        carpenterJobSpec:this.state.carpenterJobSpec,
                        timberType:this.state.timberType,
                        masonNuMeters:this.state.masonNuMeters,
                        masonJobSpec:this.state.masonJobSpec,
                        loc_nature:this.state.loc_nature,
                        loc_situation:this.state.loc_situation,
                        timber_for_carpentry:this.state.timber_for_carpentry,
                        timber_for_celing:this.state.timber_for_celing,
                        no_pillers:this.state.no_pillers,
                        no_of_door_frames:this.state.no_of_door_frames,
                        no_of_window_frames:this.state.no_of_window_frames,
                        no_of_walls:this.state.no_of_walls,
                        project_id:this.state.project_id,
                    };

            // Switch statement
            switch (step) {
                case 1:
                    return (
                        <UpdateCostPredictionInfo
                            nextStep = {this.nextStep}
                            handleChange = {this.handleChange}
                            values = {values}
                        />
                    );
                // case 2:
                //     return (
                //         <UpdateServiceProviderInfo 
                //             nextStep = {this.nextStep}
                //             handleChange = {this.handleChange}
                //             values = {values}
                //             prevStep = {this.prevStep}
                //         />
                //     );
                case 2:
                    return (
                        <UpdatePredictionSummary 
                            nextStep = {this.nextStep}
                            prevStep = {this.prevStep}
                            values = {values}
                        />
                );
                    
                case 3:
                    return (
                        <UpdateCarpenterSelection 
                            nextStep = {this.nextStep}
                            prevStep = {this.prevStep}
                            handleChange = {this.handleChange}
                            values = {values}
                        />
                    );
                        
                case 4:
                    return (
                        <UpdateMasonSelection
                            nextStep = {this.nextStep}
                            handleChange = {this.handleChange}
                            prevStep = {this.prevStep}
                            values = {values}
                        />
                    );
                
                case 5:
                    return (
                        <UpdateSummary
                            nextStep = {this.nextStep}
                            prevStep = {this.prevStep}
                            values = {values}
                        />
                    );
            
                case 6:
                    return (
                        <Success
                            prevStep = {this.prevStep}
                        />
                    );

            }
    }
}

export default UpdateProcess
