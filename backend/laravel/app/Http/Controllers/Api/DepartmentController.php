<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends Controller
{
     /**
     * @OA\Get(
     *     path="/api/department",
     *     summary="Department List",
     *     tags={"Department"},
     * 
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Department List",
     *         @OA\JsonContent(
     *    
     *             @OA\Property(property="data", type="array",
     *              @OA\Items(
     * 
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="department_code", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="faculty", type="object",
     *              {
     * 
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="faculty_code", type="string"),
     *                 @OA\Property(property="title", type="string"),
     *                
     * 
     *                 
     * }
     *                  
     *             )
     * ),
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
    public function index(): DepartmentResource | AnonymousResourceCollection
    {
        $department = $this->model()->where(["status" => 1])->with("faculty")->get();
        return DepartmentResource::collection($department);
    }

    /**
     * @OA\Post(
     *     path="/api/department/create",
     *     summary="Create A New Department",
     *     description = " Create a new department, enables a user to add to the department etc",
     *     tags={"Department"},
     * 
     *   @OA\Parameter(
     *      name="code",
     *      in="query",
     *      description="This holds value of the department code",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *   @OA\Parameter(
     *      name="title",
     *      description="This holds value of the department name",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *   @OA\Parameter(
     *      name="faculty",
     *      description="This holds value of the faculty the department would belong to",
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
     *             required={"code", "title","faculty"},
     *             @OA\Property(property="code", type="string",  example="PSC"),
     *             @OA\Property(property="faculty", type="integer",  example="1"),
     *             @OA\Property(property="title", type="string", example="Political Science"),
     *             
     *         )
     *     ),
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Department Created",
     *         @OA\JsonContent(
     *              @OA\Property(property="status", type="string",example="success"),
     *              @OA\Property(property="message", type="string", example="Department Created"),
     *             @OA\Property(property="data", type="object",
     *              {
     *                 @OA\Property(property="id", type="integer",example="1"),
     *                 @OA\Property(property="department_code", type="string",example="PSC"),
     *                 @OA\Property(property="faculty_id", type="integer",example="1"),
     *                 @OA\Property(property="title", type="string",example="Political Science"),
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
            'faculty' => 'required',
        ]);
        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }
        $department = $this->model();
        $department->title = $request->title;
        $department->department_code = $request->code;
        $department->faculty_id = $request->faculty;
        DB::beginTransaction();
        try {
            if ($department->save()) {
                DB::commit(); 
                return response()->json(
                    [
                        'status' => "success",
                        "message" => "Department created",
                        "data" => $department
                    ],
                    200
                ); 
            }
            return response()->json(["status" => "error", "message" => "Something whent wrong, Please try again later", "data" => $e], 400);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["status" => "error", "message" => "Something whent wrong, Please try again later", "data" => $e], 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/department/view/{id}",
     *     summary="View a Department details",
     *     description = "This endpoint would be used to view a department details by providing the perticular department id",
     *     tags={"Department"},
     * 
     *   @OA\Parameter(
     *      name="id",
     *      description="This id of the department",
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
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="code", type="string"),
     *                 @OA\Property(property="faculty", type="object",
     *                  {
     *                      @OA\Property(property="id", type="integer"),
     *                      @OA\Property(property="faculty_code", type="string"),
     *                      @OA\Property(property="title", type="string"),
     *                  }),
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
    public function view($id): DepartmentResource | AnonymousResourceCollection | JsonResponse
    {
        $model = $this->model()->where(["id" => $id])->first();
        if (!empty($model)) {
            return new DepartmentResource($model);
        }
        return response()->json(["status" => "error"], 400);
    }

    /**
     * @OA\Put(
     *     path="/api/department/update/{id}",
     *     summary="Update a department",
     *     description = " this route enable admin to update a department detail",
     *     tags={"Department"},
     * 
     *    @OA\Parameter(
     *      name="id",
     *      in="path",
     *      description="The department id to be updated",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     *   @OA\Parameter(
     *      name="code",
     *      in="query",
     *      description="This holds value of the department code",
     *      required=false,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *   @OA\Parameter(
     *      name="title",
     *      description="This holds value of the department name",
     *      in="query",
     *      required=false,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     *   @OA\Parameter(
     *      name="faculty",
     *      description="This holds value of the faculty id of the department",
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
     *             
     *             @OA\Property(property="code", type="string",  example="PSC"),
     *             @OA\Property(property="faculty", type="integer", example="1"),
     *             @OA\Property(property="title", type="string", example="Political Science"),
     *             
     *         )
     *     ),
     *    
     *     @OA\Response(
     *         response=201,
     *         description="Department Updated",
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
        $department = $this->model()->where("id",$id)->first();
        if (!empty($request->title)) {
            $department->title = $request->title;
        }

        if (!empty($request->code)) {
            $department->department_code = $request->code;
        }

        if (!empty($request->faculty)) {
            $department->faculty_id = $request->faculty;
        }

        if (!empty($request->code) || !empty($request->title) || !empty($request->faculty)) {
            if ($department->save()) {
                return response()->json(["status" => "success"], 200);
            }
            return response()->json(["status" => "error", "message" => "something went wrong, please try again later"], 400);
        } else {
            return response()->json(["status" => "error", "message" => "Please atleast one filled should be filled "], 400);
        }
    }

     /**
     * @OA\Delete(
     *     path="/api/department/delete/{id}",
     *     summary="Delete a department",
     *     description = "This endpoint would be used to delete a department details by providing the perticular department id",
     *     tags={"Department"},
     * 
     *   @OA\Parameter(
     *      name="id",
     *      description="The id of the department",
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
     *             @OA\Property(property="status", type="string", example="success" ),
     *             @OA\Property(property="message", type="string", example="Record has been deleted" )
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




    private function model()
    {
        return new Department();
    }

   
}
