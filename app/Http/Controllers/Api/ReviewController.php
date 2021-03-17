<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // View all the reviews
        $reviews = Review::orderBy('updated_at', 'desc')->paginate(5);
        return $reviews;
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
        // Add functionality for reviews

        $serviceProviderById = $request->review_on_id;
        $new_rate = $request->review_rate;

        // find the service provider
        $serviceProvider = User::find($serviceProviderById);
        // Find the old rating count
        $reviewsCount = $serviceProvider->ratings_count;
        // Find and add to total Ratings
        $current_rating = $serviceProvider->total_ratings;
        $finalTotal_rating = $current_rating + $new_rate;
        // testing
        $test = 4.5 + $new_rate;
        // Get the old review count and increase the count.
        $newReviewsCount = $reviewsCount + 1;
        // New USer Rating Calculation
        $calculatedUser_rate = $finalTotal_rating / $newReviewsCount;
        // Service Provider Name
        $serviceProvider_name = $serviceProvider->name;

        // User details modification and store them.
        $serviceProvider->total_ratings = $finalTotal_rating;
        $serviceProvider->ratings_count = $newReviewsCount;
        $serviceProvider->new_user_rate = $calculatedUser_rate;
        $serviceProvider->save();

        // Store the data on Reviews table

        $reviews = new Review();
        $reviews->user_id = $request->review_user_id;
        $reviews->review_on_id = $request->review_on_id;
        $reviews->review_on = $serviceProvider_name;
        $reviews->review_subject = $request->review_subject;
        $reviews->review_message = $request->review_message;
        $reviews->review_rate = $request->review_rate;
        $reviews->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // View a particular review
        $review = Review::find($id);
        return $review;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Find a particular review to update
        $review = Review::find($id);
        return $review;
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
    // Update a prticular review

        // Variables
        
        // 01. Old Review related variables
        $review = Review::find($id);
        $oldReviewRate = $review->review_rate;

        // 02. New update request related variables;
        $newReviewRate = $request->review_rate;

        // 03. User related variables
        $reviewOnUserId = $review->review_on_id;
        $reviewOnUser = User::find($reviewOnUserId);
        $totalCount = $reviewOnUser->ratings_count;
        $oldTotalRatigs = $reviewOnUser->total_ratings;

        // 04. Get the difference between old and new review rate
        $reviewDifference = abs($oldReviewRate - $newReviewRate);

        // 05. Review update logic
        if ($oldReviewRate > $newReviewRate) {
            $newTotalRatings = $oldTotalRatigs - $reviewDifference;

            if ($newTotalRatings <= 0) {
                $newTotalRatings = 0;
                $newRate = $newTotalRatings / $totalCount;
            } else {
                $newRate = $newTotalRatings / $totalCount;
            }
            
        } else {
            $newTotalRatings = $oldTotalRatigs + $reviewDifference;
            $newRate = $newTotalRatings / $totalCount;
        }

        // 06. Save new data

        // Saving new Review data
        $review->review_subject = $request->review_subject;
        $review->review_message = $request->review_message;
        $review->review_rate = $newReviewRate;
        $review->save();

        // Saving new user data related to the reviews 
        $reviewOnUser->total_ratings = $newTotalRatings;
        $reviewOnUser->new_user_rate = $newRate;
        $reviewOnUser->save();
        
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

        //01. Variables

        // Required review related info

        $review = Review::find($id);
        $reducingReviewRate = $review->review_rate;

        // Required user related info
        $reviewOnUserId = $review->review_on_id;
        $user = User::find($reviewOnUserId);
        $oldTotalRatings = $user->total_ratings;
        $totalCount = $user->ratings_count;
        $oldUserRate = $user->new_user_rate;

        //02. Calculations
        $newTotalRatings = $oldTotalRatings - $oldUserRate;
        $newTotalCount = $totalCount - 1;

        //03. Review deleting logic
        if ($newTotalRatings <= 0) {
            $newTotalRatings = 0;

            if ($newTotalCount <= 0) {
                
                $newTotalCount = 0;

                $newRate = $newTotalRatings / $newTotalCount;
            } else {
                $newRate = $newTotalRatings / $newTotalCount;
            }
            
        } else {
            $newRate = $newTotalRatings / $newTotalCount;
        }

        //04. Saving user related data

        $user->total_ratings = $newTotalRatings;
        $user->ratings_count = $newTotalCount;
        $user->new_user_rate = $newRate;
        $user->save();

        //05. deleting the review
        $review->delete();

    }

    // View Service Provider Belonged Reviews
    public function servieProviderBelongedReviews($id) {
        $reviews = DB::table('reviews')->where('review_on_id', $id)->get();
        return $reviews;
    }

}
