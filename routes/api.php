<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Belongs to ReviewController
Route::get('/reviews', 'Api\ReviewController@index');
Route::get('/reviews/{id}', 'Api\ReviewController@show');
Route::post('/reviews/store', 'Api\ReviewController@store');
Route::delete('/reviews/delete/{id}', 'Api\ReviewController@destroy');
Route::get('/reviews/edit/{id}', 'Api\ReviewController@edit');
Route::put('/reviews/update/{id}', 'Api\ReviewController@update');
Route::get('/reviews/service_providers/{id}', 'Api\ReviewController@servieProviderBelongedReviews');

// Belongs to WorkDoneController
Route::get('/works_done', 'Api\WorkDoneController@index');
Route::get('/works_done/{id}', 'Api\WorkDoneController@show');
Route::post('/works_done/store', 'Api\WorkDoneController@store');
Route::delete('/works_done/delete/{id}', 'Api\WorkDoneController@destroy');
Route::get('/works_done/edit/{id}', 'Api\WorkDoneController@edit');
Route::put('/works_done/update/{id}', 'Api\WorkDoneController@update');


// Belongs to Dashboard Controller
Route::get('/breviews/{id}', 'DashController@dashboardWithReviews');
Route::get('/SPReviews/{id}', 'DashController@serviceProviderBelongedReviews');
Route::get('/dash_carpenters', 'DashController@allCarpenters');
Route::get('/dash_carpenters/{id}', 'DashController@showCarpenter');
Route::get('/dash_masons', 'DashController@allMasons');
Route::get('/dash_masons/{id}', 'DashController@showMason');
Route::get('/construction_proj/{id}', 'DashController@dashboardWithConstructionProjects');
Route::get('/previous_projects/{id}', 'DashController@serviceProviderBelongedPreviousProjects');
Route::get('/complete_projects/{id}', 'DashController@allworksDonesByUserId');


// Belongs to ConstructionProjectController
// Carpenter search/find by id
Route::get('/carpenter_details/{id}', 'ConstructionProjectController@carpenterById');
// Mason search/find by id
Route::get('/mason_details/{id}', 'ConstructionProjectController@masonById');
Route::post('/constructions/store', 'ConstructionProjectController@store');
Route::get('/constructions/carpenter_suggest/{value}', 'ConstructionProjectController@carpenterSuggestion');
Route::get('/constructions/mason_suggest/{value}', 'ConstructionProjectController@masonSuggestion');
Route::delete('/constructions/delete/{id}', 'ConstructionProjectController@destroy');
Route::get('/constructions/edit/{id}', 'ConstructionProjectController@edit');
Route::put('/constructions/update/{id}', 'ConstructionProjectController@update');
Route::get('/constructions/{id}', 'ConstructionProjectController@show');

// Auth routes belongs to AuthController
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::patch('update', 'AuthController@update');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

// TestsController related routes
Route::post('/user_image_upload', 'TestsController@userImageUpload');
Route::get('/user_image_uploads', 'TestsController@allImages');
Route::post('/multiple_images', 'TestsController@multipleImages');