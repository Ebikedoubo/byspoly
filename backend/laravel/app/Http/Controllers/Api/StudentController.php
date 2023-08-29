<?php

namespace App\Http\Controllers\Api;

use App\Models\ApplicationDocument;
use App\Models\ApplicationSchoolHistory;
use App\Models\Choice;
use App\Models\Document;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{

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

    public function studentApplicationRegistraton(Request $request): JsonResponse
    {
        $files = $request->schools_attended;
        $ext = [];
        foreach ($files as $fileData) {
            
            $imageFile = $fileData->file('image');
            array_push($ext,$imageFile->getClientOriginalExtension());
        }
        
        return response()->json(["data" => $ext],200);
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
            //'schools_attended' => 'required',
            //'student_results' => 'required',
            'choice' => 'required',
        ]);
        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }
        DB::beginTransaction();
        try {
            // create a new student 
            $student = $studentModel->create($request->all());
            if ($student) {
                // insert application school history
                //return response()->json(['data' => $request->schools_attended], 200);
                $schoolsAttended = $request->schools_attended;//json_decode($request->schools_attended);
                foreach ($schoolsAttended as $schoolAttended) {
                    $applicationSchools = new ApplicationSchoolHistory();
                    $applicationDocument = new ApplicationDocument();
                    $document = new Document();
                    $applicationSchools->student_id = $student->id;
                    $applicationSchools->school_name = $schoolAttended["school_name"];
                    $applicationSchools->graduation_year = $schoolAttended["graduation_year"];
                    // make document upload here 
                    $image = $schoolAttended->file('image');
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('images/application'), $imageName);
                    $document->file_path = '/images/project/' . $imageName;
                    $document->status = 1;
                    // save school details and uploaded documents
                    if($applicationSchools->save() && $document->save()){
                        $applicationDocument->student_id = $student->id;
                        $applicationDocument->document_id = $document->id;
                        $applicationDocument->status = 1;
                        $applicationDocument->save();
                    }
                    
                }

                //manage student choice 
                $choices = $request->choice;//json_decode($request->choice);
                $rank = 1;
                foreach($choices as $choice){
                    $choiceModel = new Choice();
                    $choiceModel->student_id = $student->id ;
                    $choiceModel->faculty_id = $choice["faculty_id"] ;
                    $choiceModel->department_id = $choice["department_id"] ;
                    $choiceModel->rank_id = $rank ;
                    $choiceModel->status = 1 ;
                    $rank++;
                    $choiceModel->save();
                }
                // save exam records with exam documents in document table 
                $results = $request->student_results;//json_decode($request->student_results);
                foreach($results as $result){
                    $resultDocument = new Document();
                    $resultApplicationDocument = new ApplicationDocument();
                    $resultFile = $result->file('image');
                    $resultImageName = time() . '.' . $resultFile->getClientOriginalExtension();
                    $resultFile->move(public_path('images/application'), $resultImageName);
                    $resultDocument->file_path = '/images/project/' . $resultImageName;
                    $resultDocument->status = 1;
                    if($resultDocument->save()){
                        $results->student_id = $student->id;
                        $results->exam_type_id = $result["exam_type_id"];
                        $results->exam_number = $result["exam_number"];
                        $results->exam_date = $result["exam_date"];
                        $results->document_upload_id = $resultDocument->id;
                        if(!empty($result["exam_score"])){
                            $results->exam_score = $result["exam_score"];
                        }
                        // add result application document relationship 
                        $resultApplicationDocument->student_id = $student->id;
                        $resultApplicationDocument->document_id = $resultDocument->id;
                        $resultApplicationDocument->status = 1;
                        $results->save();
                        $resultApplicationDocument->save();
                    }
                   
                }
            }
            // remeber to send email to dtudent to confirm that their application was a success and the schould would reach out to them via their email
            DB::commit();
            return response()->json(['data' => $student], 200);
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(["status" => "error", "message" => "Something whent wrong, Please try again later", "data" => $e], 400);
        }






        return response()->json();
    }
}
