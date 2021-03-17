<?php

namespace App\Http\Controllers;

use App\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TestsController extends Controller
{
    //  The test controller purpose is to make sure to test the success of functionality 
    // you want to add to the project before adding it.
     
    public function userImageUpload(Request $request) {

        $file = $request->file('file');
        $name = $request->input('file_name');
        $url = Storage::url($name);

        $this->validate($request, [
            'file' => 'image|nullable|max:1999'
        ]);

        // Handle file upload
        if ($request->hasFile('file')) {
            // Get file name with extension
            $fileNameWithExtension = $request->file('file')->getClientOriginalName();
            // Get Just file name
            $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
            // Get just extension
            $extension = $request->file('file')->getClientOriginalExtension();
            // File name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            // Upload Image
            $path = $request->file('file')->storeAs('public/uploads/profilePics', $fileNameToStore);
        }else{
            $fileNameToStore = 'male_default.jpg';
        }

        // $storageLink = Storage::url('path');
        // $asset = asset('storage/public/uploads/profilePics/'.$fileNameToStore);
        $imagePath = 'http://localhost:8000/storage/uploads/profilePics/'.$fileNameToStore;

        // Save Image
        $test = new Test;
        $test->user_image = $fileNameToStore;
        $test->image_url = $asset;
        $test->save();


        return response()->json([
            'storage_link' => $storageLink,
            'asset' => $asset,
            'name' => $name,
            'file' => $file
        ]);

    }

    public function allImages(){
        $testImages = Test::all();
        return response()->json([
            'data' => $testImages
        ]);
    }

    public function multipleImages(Request $request){
        
        $this->validate($request, [
            'custom_image' => 'image|nullable|max:1999',
            'project_image_1' => 'image|nullable|max:1999',
            'project_image_2' => 'image|nullable|max:1999',
            'project_image_3' => 'image|nullable|max:1999',
            'project_image_4' => 'image|nullable|max:1999',
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

        // return response()->json([
        //     'custom' => $fileNameToStore,
        //     'project_01' => $fileNameToStore1,
        //     'project_02' => $fileNameToStore2,
        //     'project_03' => $fileNameToStore3,
        //     'project_04' => $fileNameToStore4
        // ]);

        $test = new Test;
        $test->custom_image = $fileNameToStore;
        $test->project_image_1 = $fileNameToStore1;
        $test->project_image_2 = $fileNameToStore2;
        $test->project_image_3 = $fileNameToStore3;
        $test->project_image_4 = $fileNameToStore4;
        $test->image_url = $imagePath;
        $test->save();
        
    }
}
