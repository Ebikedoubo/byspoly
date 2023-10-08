<?php

use App\Http\Controllers\Api\AcademicSessionController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\FeeManagerController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\ExamTypesController;
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

/**
 * @OA\SecurityScheme(
 *     type="http",
 *     securityScheme="bearerAuth",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 * )
 */

Route::group(['prefix' => 'site',], function () {
    Route::get("state", [ApplicationController::class, "getAllState"]);
    Route::get("local-government/{id}", [ApplicationController::class, 'getLocalGovernment']);
});

Route::group(['prefix' => 'admin',], function () {
    Route::post("login", [UserController::class, "login"]);
    Route::post("recoverpassword/{id}", [UserController::class, 'resetpassword']);
    Route::post("sendpasswordresetlink", [UserController::class, 'sendpasswordresetlink']);
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/', [UserController::class, 'index'])->name('users');
    Route::delete("delete/{id}", [UserController::class, 'destroy']);
    Route::post("create", [UserController::class, 'register']);
    Route::post("/search", [UserController::class, "search"]);
    Route::get("/logout", [UserController::class, "logout"])->name("logout");
});

Route::group(['prefix' => 'student', 'middleware' => ['auth:student']], function () {
    Route::get('/', [StudentController::class, 'index'])->name('student-index');
});

Route::group(['prefix' => 'fee', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/', [FeeManagerController::class, 'index'])->name('fee-manager-index');
    Route::post('/create', [FeeManagerController::class, 'create'])->name('fee-manager-create');
    Route::get('/view/{id}', [FeeManagerController::class, 'view'])->name('fee-manager-view');
    Route::put('/update/{id}', [FeeManagerController::class, 'update'])->name('fee-manager-update');
    Route::delete('/delete/{id}', [FeeManagerController::class, 'delete'])->name('fee-manager-delete');

    Route::get('/type', [FeeManagerController::class, 'indexType'])->name('fee-manager-index-type');
    Route::post('/type/create', [FeeManagerController::class, 'createType'])->name('fee-manager-create-type');
    Route::get('/type/view/{id}', [FeeManagerController::class, 'viewType'])->name('fee-manager-view-type');
    Route::put('/type/update/{id}', [FeeManagerController::class, 'updateType'])->name('fee-manager-update-type');
    Route::delete('/type/delete/{id}', [FeeManagerController::class, 'deleteType'])->name('fee-manager-delete-type');
});

Route::group(['prefix' => 'fee'], function () {
    Route::get('/current-application-fee', [FeeManagerController::class, 'currentApplicationFee'])->name('current-application-fee');
});

Route::group(['prefix' => 'fee'], function () {
    Route::get('/', [FeeManagerController::class, 'index'])->name('fee-manager-index');
    Route::get('/view/{id}', [FeeManagerController::class, 'view'])->name('fee-manager-view');
});

Route::group(['prefix' => 'exam-type', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/create', [ExamTypesController::class, 'create'])->name('exam-type-create');
    Route::get('/view/{id}', [ExamTypesController::class, 'view'])->name('exam-type-view');
    Route::put('/update/{id}', [ExamTypesController::class, 'update'])->name('exam-type-update');
    Route::delete('/delete/{id}', [ExamTypesController::class, 'delete'])->name('exam-type-delete');
});

Route::group(['prefix' => 'exam-type'], function () {
    Route::get('/', [ExamTypesController::class, 'index'])->name('exam-type-index');
    Route::get('/get-jamb', [ExamTypesController::class, 'getJamb'])->name('get-jamb');
});

Route::group(['prefix' => 'accademic-session', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/create', [AcademicSessionController::class, 'create'])->name('accademic-session-create');
    Route::get('/view/{id}', [AcademicSessionController::class, 'view'])->name('accademic-session-view');
    Route::put('/update/{id}', [AcademicSessionController::class, 'update'])->name('accademic-session-update');
    Route::delete('/delete/{id}', [AcademicSessionController::class, 'delete'])->name('accademic-session-delete');
    Route::get('/mark-as-current-session/{id}', [AcademicSessionController::class, 'currentSession'])->name('accademic-session-current-session');
});

Route::group(['prefix' => 'accademic-session'], function () {
    Route::get('/', [AcademicSessionController::class, 'index'])->name('accademic-session-index');
});


Route::group(['prefix' => 'student'], function () {
    Route::post('/login', [StudentController::class, 'login'])->name('student-login');
    Route::post('/application', [StudentController::class, 'studentApplicationRegistraton'])->name('student-application');
});

Route::group(['prefix' => 'faculty', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/create', [FacultyController::class, 'create'])->name('create-faculty');
    Route::put('/update/{id}', [FacultyController::class, 'update'])->name('update-faculty');
    Route::delete('/delete/{id}', [FacultyController::class, 'delete'])->name('delete-faculty');
    Route::get('/view/{id}', [FacultyController::class, 'view'])->name('view-faculty');
});

Route::group(['prefix' => 'faculty'], function () {
    Route::get('/', [FacultyController::class, 'index'])->name('faculty-list');
    Route::get('/faculty-departments/{id}', [FacultyController::class, 'getFacultyDepartment'])->name('faculty-departments');
});

Route::group(['prefix' => 'department', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/create', [DepartmentController::class, 'create'])->name('create-department');
    Route::put('/update/{id}', [DepartmentController::class, 'update'])->name('update-department');
    Route::delete('/delete/{id}', [DepartmentController::class, 'delete'])->name('delete-department');
    Route::get('/view/{id}', [DepartmentController::class, 'view'])->name('view-department');
});

Route::group(['prefix' => 'department'], function () {
    Route::get('/', [DepartmentController::class, 'index'])->name('department-list');
});




Route::group(['prefix' => 'clientadmin', 'middleware' => ['auth:client']], function () {
});
