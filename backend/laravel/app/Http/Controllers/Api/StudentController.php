<?php

namespace App\Http\Controllers\Api;

use App\Models\AcademicSession;
use App\Models\ApplicationDocument;
use App\Models\ApplicationSchoolHistory;
use App\Models\Choice;
use App\Models\Document;
use App\Models\ExamsResult;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/student/login",
     *     summary="Student Login",
     *     tags={"Student"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Student login data",
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="secret")
     *         )
     *     ),
     * 
     * @OA\Parameter(
     *      name="email",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *  @OA\Parameter(
     *      name="password",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *     @OA\Response(
     *         response=200,
     *         description="Student loggedin successfully",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string"),
     *               @OA\Property(property="message", type="string", example="user logged in"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="first_name", type="string"),
     *                 @OA\Property(property="middle_name", type="string"),
     *                 @OA\Property(property="last_name", type="string"),
     *                 @OA\Property(property="maiden_name", type="string"),
     *                 @OA\Property(property="reg_number", type="string"),
     *                 @OA\Property(property="dob", type="date"),
     *                 @OA\Property(property="email_verified_at", type="date"),
     *                 @OA\Property(property="password", type="string"),
     *                 @OA\Property(property="country_id", type="integer"),
     *                 @OA\Property(property="state_id", type="integer"),
     *                 @OA\Property(property="lga_id", type="integer"),
     *                 @OA\Property(property="token", type="string"),
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="status", type="integer", example="1"),
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
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     * )
     */

    public function login(Request $request)
    {
        //return response()->json(['status' => 'success', 'message' => 'user logged in'], 200);
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }
        $user = Student::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $user['token'] = $user->createToken('MyAuthApp')->plainTextToken;
            return response()->json(['status' => 'success', 'message' => 'user logged in', "data" => $user], 200);
        } else {
            return  response()->json(["status" => "error", "message" => "Wrong Email or Password"], 400);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/student/application",
     *     summary="Student Application",
     *     description="This endpoint is used when a student is applying for a course of study in the university",
     *     tags={"Student"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Student Application Data",
     *         @OA\JsonContent(
     *             required={
     *                      "email", 
     *                      "first_name",
     *                      "last_name",
     *                      "maiden_name",
     *                      "dob",
     *                      "country_id",
     *                      "state_id",
     *                      "lga_id",
     *                      "choice",
     *                      "schools_attended",
     *                      "student_results",
     *                      },
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="first_name", type="string", ),
     *             @OA\Property(property="last_name", type="string", ),
     *             @OA\Property(property="maiden_name", type="string"),
     *             @OA\Property(property="dob", type="date"),
     *             @OA\Property(property="country_id", type="integer"),
     *             @OA\Property(property="state_id", type="integer"),
     *             @OA\Property(property="lga_id", type="integer"),
     *             @OA\Property(property="middle_name", type="string"),
     *             @OA\Property(property="student_results", type="array",
     *             @OA\Items(
     *             type="object",
     *             @OA\Property(property="exam_type_id", type="integer"),
     *             @OA\Property(property="exam_number", type="string"),
     *             @OA\Property(property="exam_date", type="date"),
     *             @OA\Property(property="exam_score", type="string"),
     *             @OA\Property(property="image", type="string", format="binary"),
     *             @OA\Property(property="title", type="string" ,example="Waec result",description="this is used to identify document in the document table relationship"),
     *             required={"exam_type_id","exam_number","exam_date","image","title"}
     *         ),),
     * 
     *             @OA\Property(property="schools_attended", type="array",
     *             @OA\Items(
     *             type="object",
     *             @OA\Property(property="school_name", type="string"),
     *             
     *             @OA\Property(property="graduation_year", type="date"),
     *             
     *             @OA\Property(property="image", type="string", format="binary"),
     *             @OA\Property(property="title", type="string" ,example="First leaving school certificate",description="this is used to identify document in the document table relationship"),
     *              required={"school_name","graduation_year","image","title"}
     * 
     *         ),),
     * 
     *             @OA\Property(property="choice", type="array",
     *             @OA\Items(
     *             type="object",
     *             @OA\Property(property="faculty_id", type="integer"),
     *             
     *             @OA\Property(property="department_id", type="integer"),
     *             
     * 
     *         ),),
     * 
     * 
     *              
     *             
     *         )
     *     ),
     * 
     * @OA\Parameter(
     *      name="email",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="middle_name",
     *      in="query",
     *      required=false,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="first_name",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="maiden_name",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="dob",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="date"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="country_id",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="state_id",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *      name="lga_id",
     *      in="query",
     *      required=true,
     * 
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     * @OA\Parameter(
     *     name="student_results",
     *     in="query",
     *     required=true,
     *     @OA\JsonContent(
     *         type="array",
     *         @OA\Items(
     *             type="object",
     *             @OA\Property(property="exam_type_id", type="string"),
     *             @OA\Property(property="exam_number", type="string"),
     *             @OA\Property(property="exam_date", type="string"),
     *             @OA\Property(property="exam_score", type="string"),
     *             @OA\Property(property="image", type="string", format="binary"),
     *              required={"exam_type_id","exam_number","exam_date","image"}
     *         ),
     *     ),
     *     
     *     description="JSON array containing multiple student result objects with properties like exam_type_id ,exam_number, exam_date ,image"
     * ),
     * 
     * @OA\Parameter(
     *     name="choice",
     *     in="query",
     *     required=true,
     *     @OA\JsonContent(
     *         type="array",
     *         @OA\Items(
     *             type="object",
     *             @OA\Property(property="faculty_id", type="integer"),
     *            @OA\Property(property="department_id", type="integer"),
     *         ),
     *     ),
     *     
     *     description="JSON array containing multiple student course choice objects with properties like faculty_id,department_id"
     * ),
     * 
     * @OA\Parameter(
     *     name="schools_attended",
     *     in="query",
     *     required=true,
     *     @OA\JsonContent(
     *         type="array",
     *         @OA\Items(
     *             type="object",
     *             @OA\Property(property="school_name", type="string"),
     *             @OA\Property(property="graduation_year", type="date"),
     *             @OA\Property(property="image", type="string", format="binary"),
     *         ),
     *     ),
     *     
     *     description="JSON array containing multiple student school attended  objects with properties like school_name , graduation_year, image"
     * ),
     *  
     *     @OA\Response(
     *         response=200,
     *         description="Student Application successfully",
     *         @OA\JsonContent(
     *               @OA\Property(property="status", type="string"),
     *               @OA\Property(property="message", type="string", example="Application successfull"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="first_name", type="string"),
     *                 @OA\Property(property="middle_name", type="string"),
     *                 @OA\Property(property="last_name", type="string"),
     *                 @OA\Property(property="maiden_name", type="string"),
     *                 
     *                 @OA\Property(property="dob", type="date"),
     *                 
     *                 
     *                 @OA\Property(property="country_id", type="integer"),
     *                 @OA\Property(property="state_id", type="integer"),
     *                 @OA\Property(property="lga_id", type="integer"),
     *   
     *                 @OA\Property(property="email", type="string"),
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
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     * )
     */

    public function studentApplicationRegistraton(Request $request): JsonResponse
    {
        $studentModel = new Student();

        //$studentModel = new ApplicationSchoolHistory();
        // validate request entry 
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'maiden_name' => 'required',
            'dob' => 'required',
            'email' => 'required',
            'country_id' => 'required',
            'state_id' => 'required',
            'lga_id' => 'required',
            'schools_attended' => 'required',
            'student_results' => 'required',
            'choice' => 'required',
        ]);
        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }

        $getCurrentAcademicSession = AcademicSession::where(["status" => 1])->first();
        if (!$getCurrentAcademicSession) {
            return  response()->json(["status" => "error", "message" => "session id is required please ."], 400);
        }
        DB::beginTransaction();
        try {
            // create a new student 
            $studentDetails = $request->all();
            array_push($studentDetails, ["session_id" => $getCurrentAcademicSession->id]);
            $student = $studentModel->create($studentDetails);
            if ($student) {
                // insert application school history

                $schoolsAttended = json_decode($request->schools_attended);
                foreach ($schoolsAttended as $schoolAttended) {
                    $applicationSchools = new ApplicationSchoolHistory();
                    $applicationDocument = new ApplicationDocument();
                    $document = new Document();
                    $applicationSchools->student_id = $student->id;
                    $applicationSchools->school_name = $schoolAttended["school_name"];
                    $applicationSchools->graduation_year = $schoolAttended["graduation_year"];
                    // make document upload here 
                    if (!empty($schoolAttended['image'])) {
                        $image = $schoolAttended['image'];
                        $imageName = time() . '.' . $image->getClientOriginalExtension();
                        $image->move(public_path('images/application'), $imageName);
                        $document->file_path = '/images/project/' . $imageName;
                        $document->status = 1;
                        // save school details and uploaded documents
                        if ($applicationSchools->save() && $document->save()) {
                            $applicationDocument->student_id = $student->id;
                            $applicationDocument->document_id = $document->id;
                            $applicationDocument->title = $schoolAttended["title"];
                            $applicationDocument->status = 1;
                            $applicationDocument->save();
                        }
                    } else {
                        $applicationSchools->save();
                    }
                }

                //manage student choice 
                $choices = json_decode($request->choice);
                $rank = 1;
                foreach ($choices as $choice) {
                    $choiceModel = new Choice();
                    $choiceModel->student_id = $student->id;
                    $choiceModel->faculty_id = $choice["faculty_id"];
                    $choiceModel->department_id = $choice["department_id"];
                    $choiceModel->rank_id = $rank;
                    $choiceModel->status = 1;
                    $rank++;
                    $choiceModel->save();
                }
                // save exam records with exam documents in document table 
                $results = json_decode($request->student_results);
                foreach ($results as $result) {
                    $resultDocument = new Document();
                    $resultApplicationDocument = new ApplicationDocument();
                    $resultFile = $result['image'];
                    $resultImageName = time() . '.' . $resultFile->getClientOriginalExtension();
                    $resultFile->move(public_path('images/application'), $resultImageName);
                    $resultDocument->file_path = '/images/project/' . $resultImageName;
                    $resultDocument->status = 1;
                    if ($resultDocument->save()) {
                        $examResult = new ExamsResult();
                        $examResult->student_id = $student->id;
                        $examResult->exam_type_id = $result["exam_type_id"];
                        $examResult->exam_number = $result["exam_number"];
                        $examResult->exam_date = $result["exam_date"];
                        $examResult->document_upload_id = $resultDocument->id;
                        if (!empty($result["exam_score"])) {
                            $examResult->exam_score = $result["exam_score"];
                        }
                        // add result application document relationship 
                        $resultApplicationDocument->student_id = $student->id;
                        $resultApplicationDocument->document_id = $resultDocument->id;
                        $resultApplicationDocument->title = $result["title"];
                        $resultApplicationDocument->status = 1;
                        $examResult->save();
                        $resultApplicationDocument->save();
                    }
                }
            }
            // remeber to send email to dtudent to confirm that their application was a success and the schould would reach out to them via their email
            DB::commit();
            return response()->json(['status' => "success", 'message' => "Application was a success", 'data' => $student], 200);
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(["status" => "error", "message" => "Something whent wrong, Please try again later", "data" => $e], 400);
        }






        return response()->json();
    }
}
