<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group(['prefix' => 'admin', ], function () {
    //this route is for usersfunctions that dontneed auth
    Route::post("login",[UserController::class , "login"]);
    Route::post("recoverpassword/{id}", [UserController::class, 'resetpassword']);
    Route::post("sendpasswordresetlink", [UserController::class, 'sendpasswordresetlink']);
   
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum']], function () {
    //Route::middleware('auth:sanctum')->group( function () {
    Route::post('/', [UserController::class, 'index'])->name('users');
    Route::delete("delete/{id}", [UserController::class, 'destroy']);
    Route::post("create", [UserController::class, 'register']);
    Route::post("/search",[UserController::class,"search"]);
    Route::get("/logout",[UserController::class,"logout"])->name("logout");
});




Route::group(['prefix' => 'clientadmin', 'middleware' => ['auth:client']], function(){ 
 });
