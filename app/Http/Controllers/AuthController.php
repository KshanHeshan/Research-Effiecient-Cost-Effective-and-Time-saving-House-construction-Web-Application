<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'dashboardWithReviews']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:4|max:60'
        ]);

        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['errors' => ['error_result' => 'You are unauthorized. Please check your credentials....']], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        // Required Code for user image uploading

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

        // $fileNameToStore = 'male_default.jpg';
        $imagePath = 'http://localhost:8000/storage/uploads/profilePics/'.$fileNameToStore;

        // return response()->json([
        //     'user_image' => $fileNameToStore,
        //     'image_path' => $imagePath
        // ]);

        $request->validate([
            'name' => 'required|string',
            'bio' => 'required|string',
            'service_price' => 'required',
            'email' => 'required|email',
            'address' => 'required',
            'zip_code' => 'required',
            'reigion' => 'required',
            'mobile_number' => 'required|min:10|max:10',
            'tele_number' => 'required|min:10|max:10',
            'password' => 'required|min:4|max:60',
            'password_confirmation'=> 'required|same:password',
            'service_type' => 'required',
            'job_spec' => 'required',
        ]);

        User::create([
            'name' => request('name'),
            'email' => request('email'),
            'bio' =>  request('bio'),
            'address' => request('address'),
            'user_image' => $fileNameToStore,
            'image_url' => $imagePath,
            'job_spec' => request('job_spec'),
            'service_type' => request('service_type'),
            'service_price' => request('service_price'),
            'password' => Hash::make(request('password')),
            'reigion' => request('reigion'),
            'zip_code' => request('zip_code'),
            'mobile_number' => request('mobile_number'),
            'total_ratings' =>  request('total_ratings'),
            'ratings_count' =>  request('ratings_count'),
            'new_user_rate' =>  request('new_user_rate'),
            'tele_number' => request('tele_number'),
        ]);

        return $this->login(request());
        
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * update the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        auth()->user()->update($request->all());
        return response('update', Response::HTTP_ACCEPTED);
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user'  => auth()->user()
        ]);
    }

    // Retriew reviews belongs to user
    public function dashboardWithReviews($id) {
        $user = User::find($id);
        $userReviews = $user->reviews;
        return response()->json($id);
        
    }
}
