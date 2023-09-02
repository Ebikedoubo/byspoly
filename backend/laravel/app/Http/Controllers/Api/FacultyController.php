<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\FacultyResource;
use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class FacultyController extends Controller
{
    public function index(): FacultyResource | AnonymousResourceCollection
    {
        $faculty = $this->model()->where(["status" => 1])->get();
        return FacultyResource::collection($faculty);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'title' => 'required',
        ]);
        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }
        $faculty = $this->model();
        $faculty->title = $request->title;
        $faculty->faculty_code = $request->code;
        DB::beginTransaction();
        try {
            if ($faculty->save()) {
                // if faculty has been saved ,check to see if department is available.
                if (!empty($request->department)) {
                    $departments = json_decode($request->department);
                    foreach ($departments as $department) {
                        $departmentModel = $this->departmentModel();
                        $departmentModel->faculty_id = $faculty->id;
                        $departmentModel->title = $department["title"];
                        $departmentModel->department_code = $department["code"];
                        $departmentModel->save();
                    }
                }
            }
            DB::commit();
            return response()->json(
                [
                    'status' => "success",
                    "message" => "faculty created",
                    "data" => $faculty
                ],
                200
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "error", "message" => "Something whent wrong, Please try again later", "data" => $e], 400);
        }
    }

    public function view($id): FacultyResource | JsonResponse
    {
        $model = $this->model()->where(["id" => $id])->first();
        if (!empty($model)) {
            return new FacultyResource($model);
        }
        return response()->json(["status"=>"error"],400);
    }

    public function update(Request $request){
        $faculty = $this->model();
        if(!empty($request->title)){
            $faculty->title = $request->title;
        }
        
        if(!empty($request->code)){
            $faculty->faculty_code = $request->code;
        }
        
        if(!empty($request->code) || !empty($request->title)){
            if($faculty->save()){
                return response()->json(["status" =>"success"],200);
            }
            return response()->json(["status" =>"error","message" => "something went wrong, please try again later"],400);
        }else{
            return response()->json(["status" =>"error","message" => "Please atleast one filled should be filled "],400);
        }
        
    }

    public function delete($id){
        $model = $this->model()->where(["id" => $id])->first();
        if (!empty($model)) {
            if($model->delete()){
                return response()->json(['status' => "success", "message" => "Record has been deleted" ],200);
            }
            return response()->json(['status' => "error", "message" => "Could not delete Record , something went wrong" ],400);
            }
            return response()->json(["status"=>"error","message" => "The requested record does not exixt"],400);
        }
        
        

    
        private function model()
    {
        return new Faculty();
    }

    private function departmentModel()
    {
        return new Department();
    }
}
