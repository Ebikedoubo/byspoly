<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\State;
use App\Models\LocalGovernment;

class ApplicationController extends Controller
{


    /**
     * @OA\Get(
     *  path="/api/site/state",
     *  summary="Get all states",
     *  tags={"Site"},
     * 
     * @OA\Response(
     *  response=200,
     *  description="Successful operation",
     *  @OA\JsonContent(
     *  type="object",
     *  @OA\Property(property="status", type="string", example="success"),
     *  @OA\Property(property="data", type="array", 
     *      @OA\Items(
     *          {
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 
     *                }
     *      )
     *      )
     *      )),
     * 
     *  @OA\Response(
     *      response=400,
     *      description="No available state",
     *      @OA\JsonContent(
     *          type="object",
     *          @OA\Property(property="status", type="string", example="error"),
     *          @OA\Property(property="message", type="string", example="There is no available state")
     *      )
     *    )
     * )
     */
    public function getAllState()
    {
        $state = State::get();
        if (empty($state)) {
            return response()->json(["status" => "error", "message" => "There is no available state"], 400);
        }
        return response()->json(["status" => "success", "data" => $state], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/site/local-government/{id}",
     *     operationId="getLocalGovernment",
     *     tags={"Site"},
     *     summary="Get local government areas by state ID",
     *     description="Get a list of local government areas based on the state ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="State ID to filter local government areas.",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="state_id", type="integer"),
     *                     @OA\Property(property="name", type="string"),
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="ID can not be empty")
     *         )
     *     )
     * )
     */

    public function getLocalGovernment($id)
    {
        if (empty($id)) {
            return response()->json(["status" => "error", "message" => "ID can not be empty"], 400);
        }
        $localGovernment = LocalGovernment::where(["state_id" => $id])->get();
        if (!empty($localGovernment)) {
            return response()->json(["status" => "success", "data" => $localGovernment], 200);
        }
        return response()->json(["status" => "error", "message" => "Could not fetch local government"], 400);
    }
}
