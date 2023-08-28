<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{

    public function login(Request $request)
    {
        //return response()->json(['status' => 'success', 'message' => 'user logged in'], 200);
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }
        $user = Student::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $user['token'] = $user->createToken('MyAuthApp')->plainTextToken;
            return response()->json(['status' => 'success', 'message' => 'user logged in', "data" => $user], 200);
        } else {
            return  response()->json(["status" => "error", "message" => "Wrong Email or Password"], 400);
        }
    }

    public function studentApplicationRegistraton(Request $request): JsonResponse
    {
        $studentModel = new Student();
        // validate request entry 
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'maiden_name' => 'required',
            'dob' => 'required',
            'email' => 'required',
            'country_id' => 'required',
            'state_id' => 'required',
            'lga_id' => 'required',
        ]);
        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()],400) ;
        }
        DB::beginTransaction();
        try {

            DB::commit();
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(["status" => "error", "message" => "Something whent wrong, Please try again later"], 400);
        }






        return response()->json();
    }
}
