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
    /**
     * @OA\Get(
     *     path="/api/faculty",
     *     summary="Faculty List",
     *     tags={"Faculty"},
     * 
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Faculty List",
     *         @OA\JsonContent(
     *    
     *             @OA\Property(property="data", type="array",
     *              @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="faculty_code", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *                 
     * )
     *                  
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Please confirm you have access" ),
     *         )
     *     ),
     * )
     */
    public function index(): FacultyResource | AnonymousResourceCollection
    {
        $faculty = $this->model()->where(["status" => 1])->get();
        return FacultyResource::collection($faculty);
    }

    /**
     * @OA\Post(
     *     path="/api/faculty/create",
     *     summary="Create A New Faculty",
     *     description = " Create a new faculty, enables a user to add to the faculty etc",
     *     tags={"Faculty"},
     * 
     *   @OA\Parameter(
     *      name="code",
     *      in="query",
     *      description="This holds value of the faculty code",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *   @OA\Parameter(
     *      name="title",
     *      description="This holds value of the faculty name",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *      @OA\RequestBody(
     *         required=true,
     *         description="Staff member registration data",
     *         @OA\JsonContent(
     *             required={"code", "title"},
     *             @OA\Property(property="code", type="string",  example="ARSS"),
     *             @OA\Property(property="title", type="string", example="Arts And Social Science"),
     *             
     *         )
     *     ),
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Faculty Created",
     *         @OA\JsonContent(
     *    
     *             @OA\Property(property="data", type="object",
     *              {
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="faculty_code", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *               }
     *                 
     * )
     *                  
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Please confirm you have access ")
     *         )
     *     ),
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/faculty/view/{id}",
     *     summary="View a Faculty details",
     *     description = "This endpoint would be used to view a faculty details by providing the perticular faculty id",
     *     tags={"Faculty"},
     * 
     *   @OA\Parameter(
     *      name="id",
     *      description="This id of the faculty",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * 
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Faculty Details",
     *         @OA\JsonContent(
     *    
     *             @OA\Property(property="data", type="object",
     *              {
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="faculty_code", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *               }
     *                 
     * )
     *                  
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Please confirm you have access ")
     *         )
     *     ),
     * )
     */
    public function view($id): FacultyResource | JsonResponse
    {
        $model = $this->model()->where(["id" => $id])->first();
        if (!empty($model)) {
            return new FacultyResource($model);
        }
        return response()->json(["status" => "error"], 400);
    }

    /**
     * @OA\Put(
     *     path="/api/faculty/update/{id}",
     *     summary="Update a faculty",
     *     description = " this route enable admin to update a faculty detail",
     *     tags={"Faculty"},
     * 
     *    @OA\Parameter(
     *      name="id",
     *      in="path",
     *      description="This faculty id to be updated",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     *   @OA\Parameter(
     *      name="code",
     *      in="query",
     *      description="This holds value of the faculty code",
     *      required=false,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *   @OA\Parameter(
     *      name="title",
     *      description="This holds value of the faculty name",
     *      in="query",
     *      required=false,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *      @OA\RequestBody(
     *         required=true,
     *         description="Staff member registration data",
     *         @OA\JsonContent(
     *             required={"code", "title"},
     *             @OA\Property(property="code", type="string",  example="ARSS"),
     *             @OA\Property(property="title", type="string", example="Arts And Social Science"),
     *             
     *         )
     *     ),
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Faculty Created",
     *         @OA\JsonContent(
     *    
     *             @OA\Property(property="status", type="string",example="success" )
     *                  
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Please confirm you have access ")
     *         )
     *     ),
     * )
     */
    public function update(Request $request,$id)
    {
        $faculty = $this->model()->where(["id" => $id])->first();
        if(empty($faculty)){
            return response()->json(["status" => "error", "message" => "There is no faculty with the provided id "], 400);
        }
        if (!empty($request->title)) {
            $faculty->title = $request->title;
        }

        if (!empty($request->code)) {
            $faculty->faculty_code = $request->code;
        }

        if (!empty($request->code) || !empty($request->title)) {
            if ($faculty->save()) {
                return response()->json(["status" => "success"], 200);
            }
            return response()->json(["status" => "error", "message" => "something went wrong, please try again later"], 400);
        } else {
            return response()->json(["status" => "error", "message" => "Please atleast one filled should be filled "], 400);
        }
    }

     /**
     * @OA\Delete(
     *     path="/api/faculty/delete/{id}",
     *     summary="Delete a faculty",
     *     description = "This endpoint would be used to delete a faculty details by providing the perticular faculty id",
     *     tags={"Faculty"},
     * 
     *   @OA\Parameter(
     *      name="id",
     *      description="This id of the faculty",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * 
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Faculty Details",
     *         @OA\JsonContent(
     *    
     *             @OA\Property(property="status", type="string", example="success" )
     *                  
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Please confirm you have access ")
     *         )
     *     ),
     * )
     */
    public function delete($id)
    {
        $model = $this->model()->where(["id" => $id])->first();
        if (!empty($model)) {
            if ($model->delete()) {
                return response()->json(['status' => "success", "message" => "Record has been deleted"], 200);
            }
            return response()->json(['status' => "error", "message" => "Could not delete Record , something went wrong"], 400);
        }
        return response()->json(["status" => "error", "message" => "The requested record does not exixt"], 400);
    }

    public function getFacultyDepartment(Faculty $id){
        return response()->json(["data" => $id->department]);
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
