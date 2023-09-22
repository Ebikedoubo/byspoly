<?php

namespace App\Http\Controllers\Api;

use App\Models\AcademicSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AcademicSessionController extends Controller
{
    private $currentSession = 1;
    /**
     * @OA\Get(
     *     path="/api/accademic-session",
     *     summary="list of all accademic session",
     *     description = "This endpoint would fetch the list of all accademic sessions",
     *     tags={"Accademic Session"},
     *
     *

     *     @OA\Response(
     *         response=200,
     *         description="Accademic session list",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *             @OA\Property(property="data", type="array",
     *             @OA\Items({
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="session_title", type="string"),
     *                 @OA\Property(property="session_code", type="string"),
     *                 @OA\Property(property="session_start_date", type="date"),
     *                 @OA\Property(property="session_end_date", type="date"),
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

    public function index()
    {
        $model = $this->model()->get();
        if ($model) {
            return response()->json(["status" => "success", "data" => $model], 200);
        }
        return response()->json(["status" => "error", "message" => "There are no records"], 400);
    }

    /**
     * @OA\Post(
     *     path="/api/accademic-session/create",
     *     summary="Create new accademic session",
     *     tags={"Accademic Session"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would create a new accademic sessions",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="Student login data",
     *         @OA\JsonContent(
     *             required={"title","code","start_date","end_date"},
     *             @OA\Property(property="title", type="string",  example="2007/2008"),
     *             @OA\Property(property="code", type="string", example="code"),
     *             @OA\Property(property="start_date", type="date"),
     *             @OA\Property(property="end_date", type="date"),
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
     *  @OA\Parameter(
     *      name="code",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *  @OA\Parameter(
     *      name="start_date",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="date"
     *      )
     *   ),
     *  @OA\Parameter(
     *      name="end_date",
     *      in="query",
     *      required=true,
     *
     *      @OA\Schema(
     *           type="date"
     *      )
     *   ),
     *     @OA\Response(
     *         response=200,
     *         description="Accademic session successfully created",
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

    public function create(Request $request)
    {
        $model = $this->model();
        $validator = Validator::make($request->all(), [
            "title" => "required",
            "code" => "required",
            "start_date" => "required",
            "end_date" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }

        $model->session_title = $request->title;
        $model->session_code = $request->code;
        $model->session_start_date = $request->start_date;
        $model->session_end_date = $request->end_date;
        $model->status = $this->currentSession;
        $currentSession = $this->model()->where(["status" => $this->currentSession])->first();
        if (!$currentSession) {
            if ($model->save()) {
                return response()->json(["status" => "success"], 200);
            }
        }

        if ($currentSession) {
            $currentSession->status = 0;
            if ($currentSession->save()) {
                if ($model->save()) {
                    return response()->json(["status" => "success"], 200);
                }
                return response()->json(["status" => "error", "message" => "could not disable current session, please retry later"], 400);
            }
        }

        return response()->json(["status" => "error", "message" => "Something went wrong, please try again later."], 400);
    }

    /**
     * @OA\Get(
     *     path="/api/accademic-session/view/{id}",
     *     summary="view a perticular accademic session",
     *     description = "This endpoint would fetch details of an accademic sessions",
     *     tags={"Accademic Session"},
     *
     *

     *     @OA\Response(
     *         response=200,
     *         description="Accademic session fetched",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *             @OA\Property(property="data", type="object",
     *             
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="session_title", type="string"),
     *                 @OA\Property(property="session_code", type="string"),
     *                 @OA\Property(property="session_start_date", type="date"),
     *                 @OA\Property(property="session_end_date", type="date"),
     *                 @OA\Property(property="status", type="string"),
     *              
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
    public function view(AcademicSession $id)
    {
        return response()->json(["status" => "success", "data" => $id], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/accademic-session/update/{id}",
     *     summary="Update accademic session",
     *     tags={"Accademic Session"},
     *     security={{"bearerAuth": {}}},
     *     description = "This endpoint would update accademic sessions",
     * 
     *     @OA\RequestBody(
     *         required=true,
     *         description="Student login data",
     *         @OA\JsonContent(
     *             
     *             @OA\Property(property="title", type="string",  example="2007/2008"),
     *             @OA\Property(property="code", type="string", example="code"),
     *             @OA\Property(property="start_date", type="date"),
     *             @OA\Property(property="end_date", type="date"),
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
     *  @OA\Parameter(
     *      name="code",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *  @OA\Parameter(
     *      name="start_date",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="date"
     *      )
     *   ),
     *  @OA\Parameter(
     *      name="end_date",
     *      in="query",
     *      required=false,
     *
     *      @OA\Schema(
     *           type="date"
     *      )
     *   ),
     *     @OA\Response(
     *         response=200,
     *         description="Accademic session successfully updated",
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

    public function update(Request $request, AcademicSession $id)
    {
        $model = $id;

        if (!empty($request->title)) {
            $model->session_title = $request->title;
        }

        if (!empty($request->code)) {
            $model->session_code = $request->code;
        }

        if (!empty($request->start_date)) {
            $model->session_start_date = $request->start_date;
        }

        if (!empty($request->end_date)) {
            $model->session_end_date = $request->end_date;
        }

        if (empty($request->title) && empty($request->code) && empty($request->start_date) && empty($request->end_date)) {
            return response()->json(["error" => "All field can not be empty."], 400);
        }

        if ($model->save()) {
            return response()->json(["status" => "success", "message" => "Updated successfully"], 200);
        }

        return response()->json(["status" => "error", "message" => "Something went wrong , please try again"], 400);
    }

    /**
     * @OA\Delete(
     *     path="/api/accademic-session/delete/{id}",
     *     summary="Delete a perticular accademic session",
     *     description = "This endpoint would delete a perticular accademic sessions",
     *     tags={"Accademic Session"},
     *     security={{"bearerAuth": {}}},
     *
     *
     *     @OA\Response(
     *         response=200,
     *         description="Accademic session  has been removed",
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
    public function delete(AcademicSession $id)
    {
        if ($id->delete()) {
            return response()->json(["status" => "success", "message" => "Record has been removed"], 200);
        }
        return response()->json(["status" => "error", "message" => "sorry something went wrong"], 400);
    }

     /**
     * @OA\Get(
     *     path="/api/accademic-session/mark-as-current-session/{id}",
     *     summary="Make a perticular accademic session current",
     *     description = "This endpoint would make a perticular accademic sessions to be the current session ",
     *     tags={"Accademic Session"},
     *     security={{"bearerAuth": {}}},
     *
     *   @OA\Parameter(
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
     *         description="Current session has been updated",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string",example="success"),
     *               @OA\Property(property="message", type="string",example="Current session has been updated"),
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
    public function currentSession(AcademicSession $id)
    {
        $model = $id;
        $current = $this->model()->where(["status" => $this->currentSession]);
        if($model->id == $current->first()->id){
            return response()->json(["status" => "error", "message" => "The selected session is already the current session"], 400);
        }
        if ($current->update(["status" => 0])) {
            $model->status = $this->currentSession;
            if ($model->save()) {
                return response()->json(["status" => "success", "message" => "Current session has been updated"], 200);
            }
            return response()->json(["status" => "error", "message" => "Something went wrong, please try again later "], 400);
        }
        
    }

    private function model()
    {
        return new AcademicSession();
    }
}
