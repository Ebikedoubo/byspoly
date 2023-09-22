<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\FeeManagerResource;
use App\Models\AcademicSession;
use App\Models\FeeManager;
use App\Models\FeeType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeeManagerController extends Controller
{
    /**
     * feemanager section starts here 
     *
     * 
     */


     /**
     * @OA\Get(
     *     path="/api/fee",
     *     summary="list of all types of fee",
     *     description = "This endpoint would fetch the list of all fee",
     *     tags={"Fee"},
     *
     *

     *     @OA\Response(
     *         response=200,
     *         description="Fee list",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *             @OA\Property(property="data", type="array",
     *              {
     * 
     *             @OA\Items({
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="amount", type="string", example="500"),
     *                 @OA\Property(property="fee", type="object",
     *  
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="title", type="string",example="School Fee"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     * 
     *                  ),
     *                 @OA\Property(property="faculty", type="object",
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="title", type="string",example="Arts and Social Science"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="faculty_code", type="string",example="ASS"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     *                  ),
     *                 @OA\Property(property="department", type="object",
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="faculty_id", type="integer",example="1"),
     *                      @OA\Property(property="title", type="string",example="Political Science"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="department_code", type="string",example="PSC"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     *                  ),
     *                 @OA\Property(property="session", type="object",
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="session_title", type="string",example="2006/2007"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="session_code", type="string",example="Test101"),
     *                      @OA\Property(property="session_start_date", type="date"),
     *                      @OA\Property(property="session_end_date", type="date"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     *                  ),
     *              })
     *              }
     *                
     *
     *
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *
     *         )
     *     ),
     * )
     */

     public function index(){
        $model = $this->model()->with(["session","type","department","faculty"])->get();
        return FeeManagerResource::collection($model);
     }

     /**
     * @OA\Post(
     *     path="/api/fee/create",
     *     summary="Create new fee",
     *     tags={"Fee"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would create a new fee",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="Student login data",
     *         @OA\JsonContent(
     *             required={"amount","type","faculty","department","session"},
     *             @OA\Property(property="amount", type="string",  example="500"),
     *             @OA\Property(property="type", type="integer",  example="2"),
     *             @OA\Property(property="faculty", type="integer",  example="1"),
     *             @OA\Property(property="department", type="integer",  example="1"),
     *             @OA\Property(property="session", type="integer",  example="1"),
     *             
     *         )
     *     ),
     *
     * @OA\Parameter(
     *      name="amount",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="type",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="faculty",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="department",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="session",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     *     @OA\Response(
     *         response=200,
     *         description="Fee successfully created",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *              
     *                    )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     * )
     */
     public function create(Request $request){
        $model = $this->model();
        $validator = Validator::make($request->all(),[
            "amount" => "required",
            "type" => "required",
            "faculty" => "required",
            "department" => "required",
            "session" => "required",
        ]);
        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }

        $model->faculty_id = $request->faculty;
        $model->department_id = $request->department;
        $model->amount = $request->amount;
        $model->fee_type = $request->type;
        $model->session_id = $request->session;

        if($model->save()){
            return  response()->json(["status" => "success"], 200);
        }
        return  response()->json(["status" => "error","message" => "Something went wrong, please try again later."], 400);

     }

     /**
     * @OA\Get(
     *     path="/api/fee/view/{id}",
     *     summary="view a perticular fee",
     *     description = "This endpoint would fetch details of fee",
     *     tags={"Fee"},
     *
     *
     *  @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     *     @OA\Response(
     *         response=200,
     *         description="Fee fetched",
     *         @OA\JsonContent(
     *               @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="amount", type="string", example="500"),
     *                 @OA\Property(property="fee", type="object",
     *  
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="title", type="string",example="School Fee"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     * 
     *                  ),
     *                 @OA\Property(property="faculty", type="object",
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="title", type="string",example="Arts and Social Science"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="faculty_code", type="string",example="ASS"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     *                  ),
     *                 @OA\Property(property="department", type="object",
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="faculty_id", type="integer",example="1"),
     *                      @OA\Property(property="title", type="string",example="Political Science"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="department_code", type="string",example="PSC"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     *                  ),
     *                 @OA\Property(property="session", type="object",
     *                      @OA\Property(property="id", type="integer",example="1"),
     *                      @OA\Property(property="session_title", type="string",example="2006/2007"),
     *                      @OA\Property(property="status", type="string",example="1"),
     *                      @OA\Property(property="session_code", type="string",example="Test101"),
     *                      @OA\Property(property="session_start_date", type="date"),
     *                      @OA\Property(property="session_end_date", type="date"),
     *                      @OA\Property(property="created_at", type="date"),
     *                      @OA\Property(property="updated_at", type="date"),
     *                  ),
     *              )
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="page not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *
     *         )
     *     ),
     * )
     */
     public function view(FeeManager $id){
        return new FeeManagerResource($id);
     }

     /**
     * @OA\Put(
     *     path="/api/fee/update/{id}",
     *     summary="Update fee",
     *     tags={"Fee"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would update Fee",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="fee Update data",
     *         @OA\JsonContent(
     *             
     *             @OA\Property(property="amount", type="string",  example="500"),
     *             @OA\Property(property="type", type="integer",  example="1"),
     *             @OA\Property(property="faculty", type="integer",  example="1"),
     *             @OA\Property(property="department", type="integer",  example="1"),
     *             @OA\Property(property="session", type="integer",  example="2"),
     *         )
     *     ),
     *
     * @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * @OA\Parameter(
     *      name="amount",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="type",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="faculty",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="department",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="session",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     *     @OA\Response(
     *         response=200,
     *         description="fee successfully updated",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="message", type="string",example="Updated successfully"),
     *              
     *                    )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     * )
     */

     public function update(Request $request,FeeManager $id){
        $model = $id;

        if(!empty($request->type)){
            $model->fee_type = $request->type;
        }

        if(!empty($request->faculty)){
            $model->faculty_id = $request->faculty;
        }

        if(!empty($request->department)){
            $model->department_id = $request->department;
        }

        if(!empty($request->amount)){
            $model->amount = $request->amount;
        }

        if(!empty($request->session)){
            $model->amount = $request->amount;
        }

        if(empty($request->session) && empty($request->amount) && empty($request->department) && empty($request->faculty) && empty($request->type)){
            return response()->json(["error" => "All field can not be empty."],400);
        }

        if($model->save()){
            return response()->json(["status"=>"success", "message"=>"Updated successfully"],200);
        }

        return response()->json(["status"=>"error", "message"=>"Something went wrong , please try again"],400);


     }

       /**
     * @OA\Delete(
     *     path="/api/fee/delete/{id}",
     *     summary="Delete a perticular fee",
     *     description = "This endpoint would delete a perticular fee",
     *     tags={"Fee"},
     *     security={{"bearerAuth": {}}},
     * 
     *  * @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     *
     *
     *     @OA\Response(
     *         response=200,
     *         description="Fee  has been removed",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="message", type="string",example="Record has been removed"),
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *
     *         )
     *     ),
     * )
     */
     public function delete(FeeManager $id){
        if($id->delete()){
            return response()->json(["status" => "success","message"=>"Record has been removed"],200);
        }
        return response()->json(["status" => "error","message"=>"sorry something went wrong"],400);
     }

    /**
     * fee type section starts here 
     */

     /**
     * @OA\Get(
     *     path="/api/fee/type",
     *     summary="list of all types of fee type",
     *     description = "This endpoint would fetch the list of all fee type",
     *     tags={"Fee Type"},
     *
     *
     *     @OA\Response(
     *         response=200,
     *         description="Fee type list",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *             @OA\Property(property="data", type="array",
     *              {
     * 
     *             @OA\Items({
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string", example="Application fee"),
     *                 @OA\Property(property="status", type="integer"),
     *                 @OA\Property(property="log_user_id", type="integer"),
     *                 @OA\Property(property="created_at", type="date" ),
     *                 @OA\Property(property="update_at", type="date"),
     *              })
     *              }
     *                
     *
     *
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *
     *         )
     *     ),
     * )
     */

    public function indexType()
    {
        $model = $this->typeModel()->get();
        return response()->json(["status" => "success", "message" => "Fee type list", "data" => $model], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/fee/type/create",
     *     summary="Create new fee",
     *     tags={"Fee Type"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would create a new fee type",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="",
     *         @OA\JsonContent(
     *             required={"title"},
     *             @OA\Property(property="title", type="string",  example="Application Fee"),
     *            
     *             
     *         )
     *     ),
     *
     * @OA\Parameter(
     *      name="title",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * 
     * 
     * 
     *     @OA\Response(
     *         response=200,
     *         description="Fee type successfully created",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="message", type="string",example="Fee type created succefully"),
     *              
     *                    )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     * )
     */
    public function createType(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }

        $model = $this->typeModel();
        $model->title = $request->title;
        $model->status = 1;
        $model->log_user_id = auth()->guard('sanctum')->user()->id;
        if ($model->save()) {
            return response()->json(["status" => "success", "message" => "Fee type created succefully"], 200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong please try again later"], 400);
    }

    /**
     * @OA\Get(
     *     path="/api/fee/type/view/{id}",
     *     summary="view a perticular fee type",
     *     description = "This endpoint would fetch details of fee type",
     *     tags={"Fee Type"},
     *
     *  @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Fee Type fetched",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string", example="Application Fee"),
     *                 @OA\Property(property="status", type="integer"),
     *                 @OA\Property(property="log_user_id", type="integer"),
     *                 @OA\Property(property="created_at", type="date"),
     *                 @OA\Property(property="updated_at", type="date" ),
     *              )
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="could not find any record with the above id",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *
     *         )
     *     ),
     * )
     */
    public function viewType($id)
    {
        $model = $this->typeModel()->where(["id" => $id])->first();
        if ($model) {
            return response()->json(["status" => "success", "data" => $model], 200);
        }
        return response()->json([], 400);
    }

    /**
     * @OA\Put(
     *     path="/api/fee/type/update/{id}",
     *     summary="Update fee type",
     *     tags={"Fee Type"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would update Fee type",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="fee Update data",
     *         @OA\JsonContent(
     *             
     *             @OA\Property(property="title", type="string",  example="Application fee"),
     *           
     *         )
     *     ),
     *
     * @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * @OA\Parameter(
     *      name="title",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * 
     * 
     * 
     * 
     *     @OA\Response(
     *         response=200,
     *         description="fee type successfully updated",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="message", type="string",example="Updated successfully"),
     *              
     *                    )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *         )
     *     ),
     * )
     */
    public function updateType(Request $request, $id)
    {
        $model = $this->typeModel()->where(["id" => $id])->first();
        if ($model) {
            if (empty($request->title)) {
                return response()->json(["status" => "error", "message" => "Sorry title cant be empty"]);
            }
            $model->title = $request->title;
            if ($model->save()) {
                return response()->json(["status" => "success", "message" => "updated successfully"]);
            }
        }
        return response()->json(["status" => "error", "message" => "Sorry there is no type with the above id"]);
    }

    /**
     * @OA\Delete(
     *     path="/api/fee/type/delete/{id}",
     *     summary="Delete a perticular fee type",
     *     description = "This endpoint would delete a perticular fee type",
     *     tags={"Fee Type"},
     *     security={{"bearerAuth": {}}},
     * 
     *  * @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     *
     *
     *     @OA\Response(
     *         response=200,
     *         description="Fee type  has been removed",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="message", type="string",example="Record has been removed"),
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *
     *         )
     *     ),
     * )
     */
    public function deleteType($id)
    {
        $model = $this->typeModel()->where(["id" => $id])->first();
        if (!empty($model)) {
            if ($model->delete()) {
                return response()->json(["status" => "success",], 200);
            }
            return response()->json(["status" => "error", "message" => "Something went wrong, Please retry."], 400);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong, Please retry."], 400);
    }

    /**
     * @OA\Get(
     *     path="/api/fee/current-application-fee",
     *     summary="view current application fee",
     *     description = "This endpoint would fetch details of the current application fee",
     *     tags={"Fee"},
     *
     *
     *     @OA\Response(
     *         response=200,
     *         description="Current Application fee",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="data", type="object",
     *                  @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="faculty_id", type="integer"),
     *                 @OA\Property(property="department_id", type="integer"),
     *                 @OA\Property(property="fee_type", type="integer"),
     *                 @OA\Property(property="status", type="integer"),
     *                 @OA\Property(property="amount", type="integer"),
     *                 @OA\Property(property="session_id", type="integer"),
     *                 @OA\Property(property="created_at", type="date"),
     *                 @OA\Property(property="updated_at", type="date" ),
     *              )
     *             
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="could not find any record with the above id",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *
     *         )
     *     ),
     * )
     */
    public function currentApplicationFee(){
        $currentSession = AcademicSession::where(["status" => AcademicSession::CURRENT])->first();
        if($currentSession){
            $currentApplicationFee = $this->model()->where(["department_id"=>0,"faculty_id"=>0,"session_id"=> $currentSession->id]);
            if($currentApplicationFee){
                return response()->json(["status"=>"success","data"=>$currentApplicationFee->first()],200);
            }
            return response()->json(["status"=>"error","message"=>"sorry there is presently no application fee available for this session"],400);
        }
        return response()->json(["status"=>"error","message"=>"There is no current session at the moment"],400);
    }


    private function typeModel()
    {
        return new FeeType();
    }

    private function model()
    {
        return new FeeManager();
    }
}
