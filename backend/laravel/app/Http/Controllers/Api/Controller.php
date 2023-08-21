<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;



/**
 * @OA\Info(
 *     title="Byspolye Api Documentation",
 *     version="1.0.0"
 * )
 * @OA\Server(
 *     url="http://byspolye.api.skillzserver.com",
 *     description="API Server"
 * )
 */

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
