<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\WorkDone;

class WorkDoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // View all the workdones
        $worksDone = WorkDone::paginate(5);
        return $worksDone;
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

        $this->validate($request, [
            'custom_image' => 'image|nullable|max:2999',
            'project_image_1' => 'image|nullable|max:2999',
            'project_image_2' => 'image|nullable|max:2999',
            'project_image_3' => 'image|nullable|max:2999',
            'project_image_4' => 'image|nullable|max:2999',
            'belonged_user_id' => 'required',
            'user_service_type' => 'required',
            'work_subject' => 'required',
            'work_duration' => 'required',
            'work_cost' => 'required',
            'work_meters' => 'required',
            'work_description' => 'required'
        ]);

        // For custom Image
        // Handle file upload
        if ($request->hasFile('custom_image')) {
            // Get file name with extension
            $fileNameWithExtension = $request->file('custom_image')->getClientOriginalName();
            // Get Just file name
            $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
            // Get just extension
            $extension = $request->file('custom_image')->getClientOriginalExtension();
            // File name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            // Upload Image
            $path = $request->file('custom_image')->storeAs('public/uploads/profilePics', $fileNameToStore);
        }else{
            $fileNameToStore = 'male_default.jpg';
        }

        // For project Image 01
        // Handle file upload
        if ($request->hasFile('project_image_1')) {
            // Get file name with extension
            $fileNameWithExtension = $request->file('project_image_1')->getClientOriginalName();
            // Get Just file name
            $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
            // Get just extension
            $extension = $request->file('project_image_1')->getClientOriginalExtension();
            // File name to store
            $fileNameToStore1 = $fileName.'_'.time().'.'.$extension;
            // Upload Image
            $path = $request->file('project_image_1')->storeAs('public/uploads/profilePics', $fileNameToStore1);
        }else{
            $fileNameToStore1 = 'male_default.jpg';
        }

        // For project Image 02
        // Handle file upload
        if ($request->hasFile('project_image_2')) {
            // Get file name with extension
            $fileNameWithExtension = $request->file('project_image_2')->getClientOriginalName();
            // Get Just file name
            $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
            // Get just extension
            $extension = $request->file('project_image_2')->getClientOriginalExtension();
            // File name to store
            $fileNameToStore2 = $fileName.'_'.time().'.'.$extension;
            // Upload Image
            $path = $request->file('project_image_2')->storeAs('public/uploads/profilePics', $fileNameToStore2);
        }else{
            $fileNameToStore2 = 'male_default.jpg';
        }

        // // For project Image 03
        // Handle file upload
        if ($request->hasFile('project_image_3')) {
            // Get file name with extension
            $fileNameWithExtension = $request->file('project_image_3')->getClientOriginalName();
            // Get Just file name
            $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
            // Get just extension
            $extension = $request->file('project_image_3')->getClientOriginalExtension();
            // File name to store
            $fileNameToStore3 = $fileName.'_'.time().'.'.$extension;
            // Upload Image
            $path = $request->file('project_image_3')->storeAs('public/uploads/profilePics', $fileNameToStore3);
        }else{
            $fileNameToStore3 = 'male_default.jpg';
        }

        // For project Image 04
        // Handle file upload
        if ($request->hasFile('project_image_4')) {
            // Get file name with extension
            $fileNameWithExtension = $request->file('project_image_4')->getClientOriginalName();
            // Get Just file name
            $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
            // Get just extension
            $extension = $request->file('project_image_4')->getClientOriginalExtension();
            // File name to store
            $fileNameToStore4 = $fileName.'_'.time().'.'.$extension;
            // Upload Image
            $path = $request->file('project_image_4')->storeAs('public/uploads/profilePics', $fileNameToStore4);
        }else{
            $fileNameToStore4 = 'male_default.jpg';
        }

        $imagePath = 'http://localhost:8000/storage/uploads/profilePics/';


        // Add workdones
        $WorkDone = new WorkDone();
        $WorkDone->custom_image = $fileNameToStore;
        $WorkDone->project_image_1 = $fileNameToStore1;
        $WorkDone->project_image_2 = $fileNameToStore2;
        $WorkDone->project_image_3 = $fileNameToStore3;
        $WorkDone->project_image_4 = $fileNameToStore4;
        $WorkDone->image_url = $imagePath;
        $WorkDone->belonged_user_id = $request->belonged_user_id;
        $WorkDone->user_service_type = $request->user_service_type;
        $WorkDone->works_subject = $request->work_subject;
        $WorkDone->works_duration = $request->work_duration;
        $WorkDone->works_cost = $request->work_cost;
        $WorkDone->works_meters = $request->work_meters;
        $WorkDone->works_description = $request->work_description;
        $WorkDone->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // View a workdone of a service provider
        $work = WorkDone::find($id);
        return $work;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // find a particular workdone for Modification functionality
        $work = WorkDone::find($id);
        return $work;
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
        // $this->validate($request, [
        //     'custom_image' => 'image|nullable|max:1999',
        //     'project_image_1' => 'image|nullable|max:1999',
        //     'project_image_2' => 'image|nullable|max:1999',
        //     'project_image_3' => 'image|nullable|max:1999',
        //     'project_image_4' => 'image|nullable|max:1999',
        // ]);

        // // For custom Image
        // // Handle file upload
        // if ($request->hasFile('custom_image')) {
        //     // Get file name with extension
        //     $fileNameWithExtension = $request->file('custom_image')->getClientOriginalName();
        //     // Get Just file name
        //     $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
        //     // Get just extension
        //     $extension = $request->file('custom_image')->getClientOriginalExtension();
        //     // File name to store
        //     $fileNameToStore = $fileName.'_'.time().'.'.$extension;
        //     // Upload Image
        //     $path = $request->file('custom_image')->storeAs('public/uploads/profilePics', $fileNameToStore);
        // }else{
        //     $fileNameToStore = 'male_default.jpg';
        // }

        // // For project Image 01
        // // Handle file upload
        // if ($request->hasFile('project_image_1')) {
        //     // Get file name with extension
        //     $fileNameWithExtension = $request->file('project_image_1')->getClientOriginalName();
        //     // Get Just file name
        //     $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
        //     // Get just extension
        //     $extension = $request->file('project_image_1')->getClientOriginalExtension();
        //     // File name to store
        //     $fileNameToStore1 = $fileName.'_'.time().'.'.$extension;
        //     // Upload Image
        //     $path = $request->file('project_image_1')->storeAs('public/uploads/profilePics', $fileNameToStore1);
        // }else{
        //     $fileNameToStore1 = 'male_default.jpg';
        // }

        // // For project Image 02
        // // Handle file upload
        // if ($request->hasFile('project_image_2')) {
        //     // Get file name with extension
        //     $fileNameWithExtension = $request->file('project_image_2')->getClientOriginalName();
        //     // Get Just file name
        //     $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
        //     // Get just extension
        //     $extension = $request->file('project_image_2')->getClientOriginalExtension();
        //     // File name to store
        //     $fileNameToStore2 = $fileName.'_'.time().'.'.$extension;
        //     // Upload Image
        //     $path = $request->file('project_image_2')->storeAs('public/uploads/profilePics', $fileNameToStore2);
        // }else{
        //     $fileNameToStore2 = 'male_default.jpg';
        // }

        // // // For project Image 03
        // // Handle file upload
        // if ($request->hasFile('project_image_3')) {
        //     // Get file name with extension
        //     $fileNameWithExtension = $request->file('project_image_3')->getClientOriginalName();
        //     // Get Just file name
        //     $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
        //     // Get just extension
        //     $extension = $request->file('project_image_3')->getClientOriginalExtension();
        //     // File name to store
        //     $fileNameToStore3 = $fileName.'_'.time().'.'.$extension;
        //     // Upload Image
        //     $path = $request->file('project_image_3')->storeAs('public/uploads/profilePics', $fileNameToStore3);
        // }else{
        //     $fileNameToStore3 = 'male_default.jpg';
        // }

        // // For project Image 04
        // // Handle file upload
        // if ($request->hasFile('project_image_4')) {
        //     // Get file name with extension
        //     $fileNameWithExtension = $request->file('project_image_4')->getClientOriginalName();
        //     // Get Just file name
        //     $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
        //     // Get just extension
        //     $extension = $request->file('project_image_4')->getClientOriginalExtension();
        //     // File name to store
        //     $fileNameToStore4 = $fileName.'_'.time().'.'.$extension;
        //     // Upload Image
        //     $path = $request->file('project_image_4')->storeAs('public/uploads/profilePics', $fileNameToStore4);
        // }else{
        //     $fileNameToStore4 = 'male_default.jpg';
        // }
        
        // // Modification functionality of workdones
        // $work = WorkDone::find($id);
        // $work->custom_image = $fileNameToStore;
        // $work->project_image_1 = $fileNameToStore1;
        // $work->project_image_2 = $fileNameToStore2;
        // $work->project_image_3 = $fileNameToStore3;
        // $work->project_image_4 = $fileNameToStore4;
        // $work->works_subject = $request->works_subject;
        // $work->works_duration = $request->works_duration;
        // $work->works_cost = $request->works_cost;
        // $work->works_meters = $request->works_meters;
        // $work->works_no_doors = $request->works_no_doors;
        // $work->works_no_windows = $request->works_no_windows;
        // $work->works_description = $request->works_description;
        // $work->save();

        return $request;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Delete functionality for workdone
        $WorkDone = WorkDone::find($id);
        $WorkDone->delete();
    }
}
