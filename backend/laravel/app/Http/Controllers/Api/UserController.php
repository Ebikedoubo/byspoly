<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\Welcomeemail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Mail\Forgotpassword;
use App\Http\Resources\LoginResources;
use App\Http\Resources\UsersResource;
use Illuminate\Http\JsonResponse;






class UserController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/admin",
     *     summary="Get a list of users with pagination",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="perpage",
     *         in="query",
     *         description="Number of items per page",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             default=10
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response with paginated users",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="email", type="string")
     *             )),
     *             @OA\Property(property="links", type="object", @OA\Property(property="first", type="string"), @OA\Property(property="last", type="string"), @OA\Property(property="prev", type="string"), @OA\Property(property="next", type="string")),
     *             @OA\Property(property="meta", type="object", @OA\Property(property="current_page", type="integer"), @OA\Property(property="from", type="integer"), @OA\Property(property="last_page", type="integer"), @OA\Property(property="links", type="array", @OA\Items(type="object", @OA\Property(property="url", type="string"), @OA\Property(property="label", type="string"), @OA\Property(property="active", type="boolean"))), @OA\Property(property="path", type="string"), @OA\Property(property="per_page", type="integer"), @OA\Property(property="to", type="integer"), @OA\Property(property="total", type="integer")))
     *         )
     *     )
     * )
     */

    public function index(Request $request)
    {

        $query = $request->all();

        if (array_key_exists('perpage', $query)) { //check if perpage is in query string
            $perpage = $query["perpage"];
        } else {
            $perpage = 10;
        }

        $users = User::orderBy('id', 'desc')->paginate($perpage);
        $data = $users;

        return UsersResource::collection($data);
        $totalpages = ceil($users["total"] / $perpage);
        return response()->json(['status' => 'success', 'message' => 'subitems fetched with pagination', 'data' => $data,  'totalpages' => $totalpages, 'perpage' => $perpage], 200);
    }



    /**
     * @OA\Post(
     *     path="/api/admin/create",
     *     summary="Register a new staff member",
     *     tags={"Admin"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Staff member registration data",
     *         @OA\JsonContent(
     *             required={"email", "firstname", "lastname", "designation"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="firstname", type="string", example="John"),
     *             @OA\Property(property="lastname", type="string", example="Doe"),
     *             @OA\Property(property="designation", type="string", example="Manager")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Staff created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Staff created successfully"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="firstname", type="string"),
     *                 @OA\Property(property="lastname", type="string"),
     *                 @OA\Property(property="log_user_id", type="integer"),
     *                 @OA\Property(property="email_verified_at", type="string", format="date-time"),
     *                 @OA\Property(property="passwordresetcode", type="string"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="id", type="integer")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     * )
     */
    public function register(Request $request)
    {
        $userAuth = auth()->guard('sanctum')->user();
        if ($userAuth) {
            $validator = Validator::make($request->all(), [
                'email' => 'required|unique:users',
                'firstname' => 'required',
                'lastname' => 'required',
                'designation' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
            }

            $user = new User();
            $time = new \DateTime("Africa/Lagos");
            $user->email = $request->input('email');
            $user->password = "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";
            $user->firstname = ucwords($request->input('firstname'));
            $user->lastname = ucwords($request->input('lastname'));
            $user->log_user_id = $userAuth->id;
            $user->email_verified_at = $time->format("Y-m-d h:m:s");
            $codex = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), -3);
            $user->passwordresetcode = $codex . str_shuffle('1234567');

            if ($user->save()) {

                // note change the sending of email to become a queue
                try {
                    //$user->link = time().str_shuffle("01234567893ABCDEFGHIJKLMN01234567893ABCDEFGHIJKLMN").$user->emailresetcode;
                    Mail::to($user->email)->send(new Welcomeemail($user));
                } catch (\Exception $e) {

                    return response()->json(['status' => 'success', 'message' => "Staff created successfully", 'data' => $user], 201);
                }

                return response()->json(['status' => 'success', 'message' => "Staff created successfully", 'data' => $user], 201);
            } else {
                return response()->json(['status' => 'error', 'message' => 'cannot create Staff', 'data' => $user], 400);
            }
        }
        return response()->json(['status' => 'error', 'message' => 'You must be An Admin Member to use this route'], 400);
    }


    /**
     * @OA\Post(
     *     path="/api/admin/login",
     *     summary="User Login",
     *     tags={"Admin"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="User login data",
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="secret")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User logged in successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="token", type="string"),
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="status", type="string", example="success"),
     *                 @OA\Property(property="designation", type="string"),
     *                 @OA\Property(property="message", type="string", example="user logged in")
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
    public function login(Request $request): LoginResources | JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $authUser = Auth::user();
            $authUser['token'] = $authUser->createToken('MyAuthApp')->plainTextToken;

            //return response()->json(['status' => 'success', 'message' => 'user logged in', 'data' => $authUser], 200);
            return new LoginResources($authUser);
        } else {
            return  response()->json(["status" => "error", "message" => "Wrong Email or Password"], 400);
        }
    }



    public function sendpasswordresetlink(Request $request)
    {

        $time = new \DateTime("Africa/Lagos");
        $validator = Validator::make($request->all(), [
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (empty($user)) {
            return response()->json(["status" => "error", "message" => "The email address you entered does not exist.", "data" => ''], 400);
        } else {
            $codex = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), -3);
            $user->passwordresetcode = $codex . str_shuffle('1234567');

            $user->save();
            $data = array(
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,

                'link' => $user->passwordresetcode,
            );

            try {

                Mail::to($email)->send(new Forgotpassword($data));
            } catch (\Exception $e) {
                //throw $e("Email not sent");

                return response()->json(['status' => 'error', 'email was not sent', 'data' => $e], 400);
            }
            return response()->json(['status' => 'success', 'message' => 'Please check your email for further instruction'], 200);
        }
    }


    public function resetpassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 200);
        }

        $password = $request->input('password');
        $code = $id;
        $code = substr($code, -10);
        $user = User::where('passwordresetcode', $code)->first();

        if ($user == null) {
            return response()->json(["status" => "error", "message" => "code does not exist or expired", "data" => ''], 400);
        } else {
            $user->passwordresetcode = time();
            $user->password = bcrypt($password);
            $time = new \DateTime("Africa/Lagos");
            $user->email_verified_at = $time->format("Y-m-d h:m:s");
            $user->save();
            return response()->json(['status' => 'success', 'message' => 'password changed successfully', 'data' => $user], 200);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/admin/delete/{id}",
     *     summary="Delete a user by ID",
     *     tags={"Admin"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the user to be deleted",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="The user with 1 ID was deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="you dont have write and edit access")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="No user was found with the above id {id}")
     *         )
     *     )
     * )
     */
    public function destroy($id)
    {
        $loggedinuser = $userAuth = auth()->guard('sanctum')->user();;
        if (empty($loggedinuser)) {
            return response()->json(['status' => 'error', 'message' => 'you dont have write and edit access',  'data' => ''], 400);
        }

        $user = User::find($id);
        if (empty($user)) {
            return response()->json(["status" => "error", "message" => "No user was found with the above id ${id}"], 400);
        }
        $user->delete();
        return response()->json(["status" => "success", "message" => "The user with ${id} ID was deleted successfully"], 200);
    }


    /**
     * @OA\Get(
     *     path="/api/admin/search",
     *     summary="Search for users",
     *     tags={"Admin"},
     *     @OA\Parameter(
     *         name="query",
     *         in="query",
     *         required=true,
     *         description="Search query",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number",
     *         @OA\Schema(
     *             type="integer",
     *             default=1
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="perpage",
     *         in="query",
     *         required=false,
     *         description="Number of items per page",
     *         @OA\Schema(
     *             type="integer",
     *             default=10
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Search results",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="email", type="string")
     *             )),
     *             @OA\Property(property="links", type="object", @OA\Property(property="first", type="string"), @OA\Property(property="last", type="string"), @OA\Property(property="prev", type="string"), @OA\Property(property="next", type="string")),
     *             @OA\Property(property="meta", type="object", @OA\Property(property="current_page", type="integer"), @OA\Property(property="from", type="integer"), @OA\Property(property="last_page", type="integer"), @OA\Property(property="links", type="array", @OA\Items(type="object", @OA\Property(property="url", type="string"), @OA\Property(property="label", type="string"), @OA\Property(property="active", type="boolean"))), @OA\Property(property="path", type="string"), @OA\Property(property="per_page", type="integer"), @OA\Property(property="to", type="integer"), @OA\Property(property="total", type="integer"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="ensure that all required filed are properly filled")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No records found",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="No record matches your search.")
     *         )
     *     )
     * )
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }


        $query = $request->input('query');
        $page = $request->input('page', 1);
        $perPage = $request->input('perpage', 10);

        $users = User::where('firstname', 'LIKE', "%$query%")
            ->orWhere('lastname', 'LIKE', "%$query%")
            ->orWhere('email', 'LIKE', "%$query%")
            ->paginate($perPage, ["*"], "page", $page);

        if (!empty($users)) {
            return UsersResource::collection($users);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }

    public function logout()
    {
        $auth = Auth::user();
        if ($auth->tokens()->delete()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error"], 400);
    }
}
