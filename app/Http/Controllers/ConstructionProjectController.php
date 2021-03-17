<?php

namespace App\Http\Controllers;

use App\User;
use App\ConstructionProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConstructionProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newConstruction = new ConstructionProject();
        $newConstruction->user_id = $request->user_id;
        $newConstruction->construction_projectName = $request->construction_projectName;
        $newConstruction->area = $request->area;
        $newConstruction->height = $request->height;
        $newConstruction->no_floors = $request->no_floors;
        $newConstruction->no_rooms = $request->no_rooms;
        $newConstruction->no_bathrooms = $request->no_bathrooms;
        $newConstruction->no_doors = $request->no_doors;
        $newConstruction->no_windows = $request->no_windows;
        $newConstruction->wall_material = $request->wall_material;
        $newConstruction->celing_material = $request->celing_material;
        $newConstruction->floor_material = $request->floor_material;
        $newConstruction->roof_material = $request->roof_material;
        $newConstruction->carpenter_id = $request->carpenter_id;
        $newConstruction->carpenter = $request->carpenter;
        $newConstruction->mason_id = $request->mason_id;
        $newConstruction->mason = $request->mason;
        $newConstruction->carpenterNuMeters = $request->carpenterNuMeters;
        $newConstruction->carpenterJobSpec = $request->carpenterJobSpec;
        $newConstruction->timberType = $request->timber_for_carpentry;
        $newConstruction->masonNuMeters = $request->masonNuMeters;
        $newConstruction->masonJobSpec = $request->masonJobSpec;
        $newConstruction->loc_nature = $request->loc_nature;
        $newConstruction->loc_situation = $request->loc_situation;
        $newConstruction->timber_for_carpentry = $request->timber_for_carpentry;
        $newConstruction->timber_for_celing = $request->timber_for_celing;
        $newConstruction->constructionCost = $request->constructionCost;
        $newConstruction->masonCost = $request->masonCost;
        $newConstruction->carpenterCost = $request->carpenterCost;
        $newConstruction->no_pillers = $request->no_pillers;
        $newConstruction->no_of_door_frames = $request->no_of_door_frames;
        $newConstruction->no_of_window_frames = $request->no_of_window_frames;
        $newConstruction->no_of_walls = $request->no_of_walls;
        $newConstruction->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //  View a particular Construction Project Details
        $constr_project = ConstructionProject::find($id);
        return $constr_project;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Modify Construction Project data
        $updateConstruction = ConstructionProject::find($id);
        $updateConstruction->user_id = $request->user_id;
        $updateConstruction->construction_projectName = $request->construction_projectName;
        $updateConstruction->no_floors = $request->no_floors;
        $updateConstruction->area = $request->area;
        $updateConstruction->height = $request->height;
        $updateConstruction->no_rooms = $request->no_rooms;
        $updateConstruction->no_bathrooms = $request->no_bathrooms;
        $updateConstruction->no_doors = $request->no_doors;
        $updateConstruction->no_windows = $request->no_windows;
        $updateConstruction->wall_material = $request->wall_material;
        $updateConstruction->celing_material = $request->celing_material;
        $updateConstruction->floor_material = $request->floor_material;
        $updateConstruction->roof_material = $request->roof_material;
        $updateConstruction->carpenter_id = $request->carpenter_id;
        $updateConstruction->carpenter = $request->carpenter;
        $updateConstruction->mason_id = $request->mason_id;
        $updateConstruction->mason = $request->mason;
        $updateConstruction->carpenterNuMeters = $request->carpenterNuMeters;
        $updateConstruction->carpenterJobSpec = $request->carpenterJobSpec;
        $updateConstruction->timberType = $request->timber_for_celing;
        $updateConstruction->masonNuMeters = $request->masonNuMeters;
        $updateConstruction->masonJobSpec = $request->masonJobSpec;
        $updateConstruction->loc_nature = $request->loc_nature;
        $updateConstruction->loc_situation = $request->loc_situation;
        $updateConstruction->timber_for_carpentry = $request->timber_for_carpentry;
        $updateConstruction->timber_for_celing = $request->timber_for_celing;
        $updateConstruction->constructionCost = $request->constructionCost;
        $updateConstruction->masonCost = $request->masonCost;
        $updateConstruction->carpenterCost = $request->carpenterCost;
        $updateConstruction->no_pillers = $request->no_pillers;
        $updateConstruction->no_of_door_frames = $request->no_of_door_frames;
        $updateConstruction->no_of_window_frames = $request->no_of_window_frames;
        $updateConstruction->no_of_walls = $request->no_of_walls;
        $updateConstruction->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //  Delete functionality for reviews
        $constr_project = ConstructionProject::find($id);
        $constr_project->delete();
    }

    public function carpenterById($id){
        $carpenter = User::find($id);
        return $carpenter;
    }

    public function masonById($id){
        $mason = User::find($id);
        return $mason;
    }

    public function carpenterSuggestion($value) {
        $min = (int)$value - 10000;
        $max = (int)$value + 10000;

        $string_min = (string)$min;
        $string_max = (string)$max;

        $selectedWorkDonesForCarpenters = DB::table('work_dones')->whereBetween('works_cost', [$min, $max])->where('user_service_type', 'Carpentry')->get();

        return response()->json($selectedWorkDonesForCarpenters);
    }

    public function masonSuggestion($value) {
        $min = (int)$value - 10000;
        $max = (int)$value + 10000;

        $string_min = (string)$min;
        $string_max = (string)$max;

        $selectedWorkDonesForMasons = DB::table('work_dones')->whereBetween('works_cost', [$min, $max])->where('user_service_type', 'Masonry')->get();

        return response()->json($selectedWorkDonesForMasons);
    }
}
