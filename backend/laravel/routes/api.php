<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\StudentController;
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

Route::group(['prefix' => 'site', ], function () {
    
    Route::get("state",[ApplicationController::class , "getAllState"]);
    Route::get("local-government/{id}", [ApplicationController::class, 'getLocalGovernment']);
    
});

Route::group(['prefix' => 'admin', ], function () {
    //this route is for usersfunctions that dontneed auth
    Route::post("login",[UserController::class , "login"]);
    Route::post("recoverpassword/{id}", [UserController::class, 'resetpassword']);
    Route::post("sendpasswordresetlink", [UserController::class, 'sendpasswordresetlink']);
   
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum']], function () {
   
    Route::post('/', [UserController::class, 'index'])->name('users');
    Route::delete("delete/{id}", [UserController::class, 'destroy']);
    Route::post("create", [UserController::class, 'register']);
    Route::post("/search",[UserController::class,"search"]);
    Route::get("/logout",[UserController::class,"logout"])->name("logout");
});

Route::group(['prefix' => 'student', 'middleware' => ['auth:student']], function(){ 
    Route::get('/', [StudentController::class, 'index'])->name('student-index');
    
});

Route::group(['prefix' => 'student'], function(){ 
    Route::post('/login', [StudentController::class, 'login'])->name('student-login');
    Route::post('/application', [StudentController::class, 'studentApplicationRegistraton'])->name('student-application');
    
});

Route::group(['prefix' => 'faculty'], function(){ 
    Route::get('/', [FacultyController::class, 'index'])->name('faculty-list');
    Route::post('/create', [FacultyController::class, 'create'])->name('create-faculty');
    Route::put('/update/{id}', [FacultyController::class, 'update'])->name('update-faculty');
    Route::delete('/delete/{id}', [FacultyController::class, 'delete'])->name('delete-faculty');
    Route::get('/view/{id}', [FacultyController::class, 'view'])->name('view-faculty');
    
});

Route::group(['prefix' => 'department'], function(){ 
    Route::get('/', [DepartmentController::class, 'index'])->name('faculty-list');
    Route::post('/create', [DepartmentController::class, 'create'])->name('create-faculty');
    Route::put('/update/{id}', [DepartmentController::class, 'update'])->name('update-faculty');
    Route::delete('/delete/{id}', [DepartmentController::class, 'delete'])->name('delete-faculty');
    Route::get('/view/{id}', [DepartmentController::class, 'view'])->name('view-faculty');
    
});




Route::group(['prefix' => 'clientadmin', 'middleware' => ['auth:client']], function(){ 
 });
