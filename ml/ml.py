from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

cost_predict = pickle.load(open('constr_ml_model.pkl', 'rb'))
house_predict = pickle.load(open('forecast_constr_ml_model.pkl', 'rb'))
carpentryCost_predict = pickle.load(open('forecast_carpenter_cost_model.pkl', 'rb'))
masonryCost_predict = pickle.load(open('forecast_mason_cost_model.pkl', 'rb'))
carpentryMeter_predict = pickle.load(open('forecast_carpentry_meter_ml_model.pkl', 'rb'))
masonryMeter_predict = pickle.load(open('forecast_masonry_meter_ml_model.pkl', 'rb'))


@app.route('/')
def hello_world():
    return render_template('cost_predict-form.html')


@app.route('/predict_cost', methods=['POST', 'GET'])
def predict():
    #### Using Form Data ####
    print(request.get_json())
    data = request.get_json()
    area = float(data.get('area'))
    no_doors = float(data.get('no_doors'))
    no_windows = float(data.get('no_windows'))

    height = float(data.get('height'))
    no_of_door_frames = float(data.get('no_of_door_frames'))
    no_of_window_frames = float(data.get('no_of_window_frames'))
    no_of_walls = float(data.get('no_of_walls'))

    carpenterMeters = carpentryMeter_predict.predict([[no_doors, no_windows, height]])
    masonMeters = masonryMeter_predict.predict([[height, area, no_of_walls, no_of_door_frames, no_of_window_frames]])

    print(carpenterMeters)
    print(masonMeters)

    # For Carpentry Meters
    final_Carpentry_meters_outcome = float(carpenterMeters)
    formated_Carpentry_meters_outcome = "{:.2f}".format(final_Carpentry_meters_outcome)
    floated_Carpentry_meters_value = float(formated_Carpentry_meters_outcome)
    final_formatted_Carpentry_meters_outcome = '{:,.2f}'.format(floated_Carpentry_meters_value)

    carpentry_meter_predict = int(carpenterMeters)
    rounded_carpentry_meter_predict_val = round(carpentry_meter_predict)

# For Masonry Meters
    final_mason_meters_outcome = float(masonMeters)
    formated_mason_meters_outcome = "{:.2f}".format(final_mason_meters_outcome)
    floated_mason_meters_value = float(formated_mason_meters_outcome)
    final_formatted_mason_meters_outcome = '{:,.2f}'.format(floated_mason_meters_value)

    masonry_meter_predict = int(masonMeters)
    rounded_masonry_meter_predict_val = round(masonry_meter_predict)

    print(carpenterMeters)
    print(rounded_carpentry_meter_predict_val)
    print(masonMeters)
    print(rounded_masonry_meter_predict_val)

    return jsonify(
        carp_meters=final_formatted_Carpentry_meters_outcome,
        mas_meters=final_formatted_mason_meters_outcome,
        roundedCarpMeter=rounded_carpentry_meter_predict_val,
        roundedMasMeter=rounded_masonry_meter_predict_val,
        )

    



@app.route('/predict_constr_cost', methods=['POST', 'GET'])
def predictConstrJson():
    print(request.get_json())
    data = request.get_json()
    area = float(data.get('area'))
    no_floors = float(data.get('no_floors'))
    no_rooms = float(data.get('no_rooms'))
    no_bathrooms = float(data.get('no_bathrooms'))
    no_doors = float(data.get('no_doors'))
    no_windows = float(data.get('no_windows'))
    wall_material = data.get('wall_material')
    celing_material = data.get('celing_material')
    floor_material = data.get('floor_material')
    roof_material = data.get('roof_material')

    raw_carpenterNuMeters = data.get('carpenterNuMeters')
    typeOfraw_carpenterNuMeters = (type(raw_carpenterNuMeters))
    if (isinstance(raw_carpenterNuMeters, str)):
        commaRemovedCarpenterMeters = raw_carpenterNuMeters.replace(',', '')
        carpenterNuMeters = float(commaRemovedCarpenterMeters)
    else:
        carpenterNuMeters = float(raw_carpenterNuMeters)

    carpenterJobSpec = data.get('carpenterJobSpec')
    timberType = data.get('timber_for_carpentry')

    raw_masonNuMeters = data.get('masonNuMeters')
    typeOfraw_masonNuMeters = type(raw_masonNuMeters)
    if (isinstance(raw_masonNuMeters, str)):
        commaRemovedMasonMeters = raw_masonNuMeters.replace(',', '')
        masonNuMeters = float(commaRemovedMasonMeters)
    else:
        masonNuMeters = float(raw_masonNuMeters)
    
    masonJobSpec = data.get('masonJobSpec')
    height = float(data.get('height'))
    no_pillers = float(data.get('no_pillers'))
    no_of_door_frames = float(data.get('no_of_door_frames'))
    no_of_window_frames = float(data.get('no_of_window_frames'))
    no_of_walls = float(data.get('no_of_walls'))

    loc_nature = data.get('loc_nature')
    loc_situation = data.get('loc_situation')
    timber_for_carpentry = data.get('timber_for_carpentry')
    timber_for_celing = data.get('timber_for_celing')

    if (carpenterJobSpec):
        if (carpenterJobSpec == "Only Ceiling and Interior"):
            converted_carpenterJobSpec = float(1)

        elif(carpenterJobSpec == "Only Interior"):
            converted_carpenterJobSpec = float(2)

        elif(carpenterJobSpec == "Both Ceiling"):
            converted_carpenterJobSpec = float(0)

        else:
            converted_carpenterJobSpec = float(2)

    if (timberType):
        if (timberType == "Mahogani"):
            converted_timberType = float(0)

        elif(timberType == "Burutha"):
            converted_timberType = float(1)

        elif(timberType == "Kubuk"):
            converted_timberType = float(2)

        elif(timberType == "Thekka"):
            converted_timberType = float(3)

        else:
            converted_timberType = float(0)

    if (masonJobSpec):
        if (masonJobSpec == "Only Walls"):
            converted_masonJobSpec = float(0)

        elif(masonJobSpec == "Only Floors"):
            converted_masonJobSpec = float(2)

        elif(masonJobSpec == "Both Walls and Floors"):
            converted_masonJobSpec = float(1)

        else:
            converted_masonJobSpec = float(1)

    if (wall_material):
        if (wall_material == "Cement Block"):
            converted_wall_material = float(1)

        elif(wall_material == "Bricks"):
            converted_wall_material = float(0)

        else:
            converted_wall_material = float(0)

    if (celing_material):
        if (celing_material == "Ceiling Tiles"):
            converted_celing_material = float(0)

        elif(celing_material == "Wood"):
            converted_celing_material = float(1)

        elif(celing_material == "Concrete"):
            converted_celing_material = float(2)

        else:
            converted_celing_material = float(0)

    if (floor_material):
        if (floor_material == "Cement"):
            converted_floor_material = float(1)

        elif(floor_material == "Tiles"):
            converted_floor_material = float(0)

        else:
            converted_floor_material = float(0)

    if (roof_material):
        if (roof_material == "Concrete"):
            converted_roof_material = float(2)

        elif(roof_material == "Asbastos"):
            converted_roof_material = float(0)

        elif(roof_material == "Roof Tiles"):
            converted_roof_material = float(1)

        else:
            converted_roof_material = float(1)

    if (loc_nature):
        if (loc_nature == "Good"):
            converted_loc_nature = float(3)

        elif(loc_nature == "Poor soil Condition"):
            converted_loc_nature = float(0)
        
        elif(loc_nature == "Conflicting Utilities"):
            converted_loc_nature = float(2)
        
        elif(loc_nature == "Wet Land"):
            converted_loc_nature = float(1)

        else:
            converted_loc_nature = float(0)
    
    if (loc_situation):
        if (loc_situation == "Far"):
            converted_loc_situation = float(2)

        elif(loc_situation == "Cannot measure"):
            converted_loc_situation = float(0)
        
        elif(loc_situation == "Near"):
            converted_loc_situation = float(1)

        else:
            converted_loc_situation = float(0)

    if (timber_for_carpentry):
        if (timber_for_carpentry == "Mahogani"):
            converted_timber_for_carpentry = float(2)

        elif(timber_for_carpentry == "Kubuk"):
            converted_timber_for_carpentry = float(4)
        
        elif(timber_for_carpentry == "Jack"):
            converted_timber_for_carpentry = float(3)
        
        elif(timber_for_carpentry == "Burutha"):
            converted_timber_for_carpentry = float(0)
        
        elif(timber_for_carpentry == "Thekka"):
            converted_timber_for_carpentry = float(1)

        else:
            converted_timber_for_carpentry = float(0)

    if (timber_for_celing):
        if (timber_for_celing == "Burutha"):
            converted_timber_for_celing = float(1)

        elif(timber_for_celing == "Thekka"):
            converted_timber_for_celing = float(2)
        
        elif(timber_for_celing == "Jack"):
            converted_timber_for_celing = float(0)
        
        elif(timber_for_celing == "Mahogani"):
            converted_timber_for_celing = float(3)

        else:
            converted_timber_for_celing = float(1)
    else:
        pass

    #  Retreive Predictions
    houseCost = house_predict.predict([[area, height, converted_loc_nature, no_floors,no_rooms,no_bathrooms, no_doors, no_windows, converted_wall_material, converted_celing_material, converted_floor_material, converted_roof_material, converted_loc_situation, converted_timber_for_carpentry, converted_timber_for_celing]])
    
    

# Other predictions
    carpentryCost = carpentryCost_predict.predict([[converted_carpenterJobSpec, converted_timberType, converted_loc_situation,carpenterNuMeters]])
    masonCost = masonryCost_predict.predict([[converted_masonJobSpec, converted_loc_situation, masonNuMeters, no_pillers, no_floors, height, area]])

# For Total Cost for RF
    final_outcome_RF = float(houseCost)
    formated_outcome_RF = "{:.2f}".format(final_outcome_RF)
    floated_value_RF = float(formated_outcome_RF)
    final_formatted_outcome_RF = '{:,.2f}'.format(floated_value_RF)

# For Carpentry Cost
    final_Carpentry_cost_outcome = float(carpentryCost)
    formated_Carpentry_cost_outcome = "{:.2f}".format(final_Carpentry_cost_outcome)
    floated_Carpentry_cost_value = float(formated_Carpentry_cost_outcome)
    final_formatted_Carpentry_cost_outcome = '{:,.2f}'.format(floated_Carpentry_cost_value)
    
    carpentry_cost_predict = int(carpentryCost)
    rounded_carpentry_cost_predict_val = round(carpentry_cost_predict)

# For Masonry Cost
    final_mason_cost_outcome = float(masonCost)
    formated_mason_cost_outcome = "{:.2f}".format(final_mason_cost_outcome)
    floated_mason_cost_value = float(formated_mason_cost_outcome)
    final_formatted_mason_cost_outcome = '{:,.2f}'.format(floated_mason_cost_value)
    
    masonry_cost_predict = int(masonCost)
    rounded_masonry_cost_predict_val = round(masonry_cost_predict)

# Return the predictions

    print('===============================================')
    print('===============================================')
    print('=== Prediction from Random Forest ==============')
    print('===============================================')
    print('===============================================')
    print('===============================================')
    print('=== House Cost Prediction from Random Forest ==============')
    print(final_formatted_outcome_RF)
    print('===============================================')
    print('=== Carpentry cost Prediction from Random Forest ==============')
    print(final_formatted_Carpentry_cost_outcome)
    print('===============================================')
    print('=== Masonry cost Prediction from Random Forest ==============')
    print(final_formatted_mason_cost_outcome)
    print('===============================================')
    print('=== carpentry meters Prediction from Random Forest ==============')
    print('===============================================')
    print('=== Rounded carpentry cost Prediction from Random Forest ==============')
    print(rounded_carpentry_cost_predict_val)
    print('===============================================')
    print('=== Rounded masonry cost Prediction from Random Forest ==============')
    print(rounded_masonry_cost_predict_val)
    print('===============================================')
    print('===============================================')

    return jsonify(
        prediction=final_formatted_outcome_RF,
        carp_cost=final_formatted_Carpentry_cost_outcome,
        mas_cost=final_formatted_mason_cost_outcome,
        roundedCarpCost=rounded_carpentry_cost_predict_val,
        roundedMasonCost=rounded_masonry_cost_predict_val,
        )

if __name__ == '__main__':
    app.run()