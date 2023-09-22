<?php

namespace App\Http\Controllers\Api;

use App\Models\ExamsType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamTypesController extends Controller
{
    private $active = 1;
     /**
     * @OA\Get(
     *     path="/api/exam-type",
     *     summary="list of all types of exams",
     *     description = "This endpoint would fetch the list of all examination types",
     *     tags={"Exam Type"},
     *
     *

     *     @OA\Response(
     *         response=200,
     *         description="Exam Type list",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *             @OA\Property(property="data", type="array",
     *             @OA\Items({
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="log_user_id", type="integer"),
     *                 @OA\Property(property="status", type="string"),
     *              })
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
        $model = $this->model()->get();
        if($model){
            return response()->json(["status"=>"success", "data" => $model],200);
        }
        return response()->json(["status"=>"error","message"=>"Sorry there are no records available at the moment"],400);
        
     }

     /**
     * @OA\Post(
     *     path="/api/exam-type/create",
     *     summary="Create new exam type",
     *     tags={"Exam Type"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would create a new exam type",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="Student login data",
     *         @OA\JsonContent(
     *             required={"title"},
     *             @OA\Property(property="title", type="string",  example="WAEC"),
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
     *     @OA\Response(
     *         response=200,
     *         description="Exam Type successfully created",
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
            "title" => "required",
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }

        $model->title = $request->title;
        $model->status = $this->active;
        $model->log_user_id = auth()->guard('sanctum')->user()->id;

        if($model->save()){
            return  response()->json(["status" => "success"], 200);
        }
        return  response()->json(["status" => "error","message" => "Something went wrong, please try again later."], 400);

     }

      /**
     * @OA\Get(
     *     path="/api/exam-type/view/{id}",
     *     summary="view a perticular exam type",
     *     description = "This endpoint would fetch details of an exam type",
     *     tags={"Exam Type"},
     *
     *
     *     @OA\Response(
     *         response=200,
     *         description="Exam TYpe fetched",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *             @OA\Property(property="data", type="object",
     *             
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="log_user_id", type="integer"),

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
     public function view(ExamsType $id){
        return response()->json(["status"=>"success","data"=>$id],200);
     }

     /**
     * @OA\Put(
     *     path="/api/exam-type/update/{id}",
     *     summary="Update exam type",
     *     tags={"Exam Type"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would update exam type",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="Exam type update data",
     *         @OA\JsonContent(
     *             
     *             @OA\Property(property="title", type="string",  example="WAEC"),
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
     *     @OA\Response(
     *         response=200,
     *         description="Exam Type successfully updated",
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

     public function update(Request $request,ExamsType $id){
        $model = $id;

        if(!empty($request->title)){
            $model->title = $request->title;
        }

        
        if(empty($request->title) ){
            return response()->json(["error" => "All field can not be empty."],400);
        }

        if($model->save()){
            return response()->json(["status"=>"success", "message"=>"Updated successfully"],200);
        }

        return response()->json(["status"=>"error", "message"=>"Something went wrong , please try again"],400);


     }

      /**
     * @OA\Delete(
     *     path="/api/exam-type/delete/{id}",
     *     summary="Delete a perticular exam type",
     *     description = "This endpoint would delete a perticular exam type",
     *     tags={"Exam Type"},
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
     *         description="Exam type  has been removed",
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
     public function delete(ExamsType $id){
        if($id->delete()){
            return response()->json(["status" => "success","message"=>"Record has been removed"],200);
        }
        return response()->json(["status" => "error","message"=>"sorry something went wrong"],400);
     }

     private function model()
    {
        return new ExamsType();
    }
}
