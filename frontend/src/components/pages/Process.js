import React, { Component } from 'react';
import CostPredictionInfo from '../ML/CostPredictionInfo';
import ServiceProviderInfo from '../pages/ServiceProvider';
import PredictionSummary from '../ML/PredictionSummary';
import CarpenterSelection2 from '../carpenter/CarpenterSelection2';
import MasonSelection from '../mason/MasonSelection';
import Summary from './Summary';
import Success from './Success';

export class Process extends Component {

    // state
    state = {
        step: 1,
        area: 0,
        height:0,
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
        no_pillers:'',
        no_of_door_frames:'',
        no_of_window_frames:'',
        no_of_walls:''
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

        // Step
        const {step} = this.state;

        // Retrieving values from props
        const { area ,
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
                no_of_walls,} = this.state;

        // Values
        const values = { area ,
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
                    };

            // Switch statement for steps
            switch (step) {
                case 1:
                    return (
                        <CostPredictionInfo
                            nextStep = {this.nextStep}
                            handleChange = {this.handleChange}
                            values = {values}
                        />
                    );
                // case 2:
                //     return (
                //         <ServiceProviderInfo 
                //             nextStep = {this.nextStep}
                //             handleChange = {this.handleChange}
                //             prevStep = {this.prevStep}
                //             values = {values}
                //         />
                //     );
                case 2:
                    return (
                        <PredictionSummary 
                            nextStep = {this.nextStep}
                            prevStep = {this.prevStep}
                            values = {values}
                        />
                );
                    
                case 3:
                    return (
                        <CarpenterSelection2 
                            nextStep = {this.nextStep}
                            prevStep = {this.prevStep}
                            handleChange = {this.handleChange}
                            values = {values}
                        />
                    );
                        
                case 4:
                    return (
                        <MasonSelection
                            nextStep = {this.nextStep}
                            handleChange = {this.handleChange}
                            prevStep = {this.prevStep}
                            values = {values}
                        />
                    );
                
                case 5:
                    return (
                        <Summary
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

export default Process
