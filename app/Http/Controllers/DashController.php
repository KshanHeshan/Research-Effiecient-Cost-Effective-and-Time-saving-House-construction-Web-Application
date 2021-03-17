<?php

namespace App\Http\Controllers;

use App\User;
use App\WorkDone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashController extends Controller
{
    // function to retrieve reviews for a particular service provider
    public function dashboardWithReviews($id) {
        $reviews = DB::table('reviews')->where('user_id', $id)->get();
        return $reviews;
    }

    // function to retrieve construction projects build by a particular customer
    public function dashboardWithConstructionProjects($id) {
        $constructionProjects = DB::table('construction_projects')->where('user_id', $id)->get();
        return $constructionProjects;
    }

    // function to retrieve all carpenters
    public function allCarpenters() {
        $carpenters = DB::table('users')->where('service_type', 'carpentry')->get();
        return response()->json($carpenters);
    }

    // function to retrieve all masons
    public function allMasons() {
        $masons = DB::table('users')->where('service_type', 'masonry')->get();
        return response()->json($masons);
    }

    // function to view a particular carpenter's profile
    public function showCarpenter($id){
        $carpenter = User::find($id);
        return $carpenter;
    }

    // function to view a particular mason's profile
    public function showMason($id){
        $mason = User::find($id);
        return $mason;
    }

    // function to retrieve all work dones of carpenters and masons
    public function allworksDonesByUserId($id) {
        $workdones = DB::table('work_dones')->where('belonged_user_id', $id)->get();
        return response()->json($workdones);
    }

    // Retrieve reviews of service providers
    public function serviceProviderBelongedReviews($id) {
        $serviceProviderReviews = DB::table('reviews')->where('review_on_id', $id)->get();
        return $serviceProviderReviews;
    }
    // Retrieve previous projects of service providers
    public function serviceProviderBelongedPreviousProjects($id) {
        $serviceProviderReviews = DB::table('work_dones')->where('belonged_user_id', $id)->get();
        return $serviceProviderReviews;
    }
}
