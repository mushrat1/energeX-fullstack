<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            error_log('Register request: ' . json_encode($request->all()));
            $this->validate($request, [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
            ]);

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => password_hash($request->input('password'), PASSWORD_BCRYPT),
            ]);

            error_log('User created: ' . json_encode(['id' => $user->id, 'email' => $user->email]));
            return response()->json(['id' => $user->id, 'email' => $user->email], 201);
        } catch (\Throwable $e) {
            error_log('Register error: ' . $e->getMessage() . "\n" . $e->getTraceAsString());
            return response()->json(['message' => 'Registration failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            error_log('Login request: ' . json_encode($request->all()));
            $this->validate($request, [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->input('email'))->first();
            if (!$user || !password_verify($request->input('password'), $user->password)) {
                error_log('Login failed: Invalid credentials for email ' . $request->input('email'));
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            $payload = [
                'iss' => 'energeX-lumen',
                'sub' => $user->id,
                'name' => $user->name,
                'iat' => time(),
                'exp' => time() + 3600
            ];

            $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');
            error_log('Login success: ' . json_encode(['id' => $user->id, 'email' => $user->email]));
            return response()->json(['token' => $token, 'user' => ['id' => $user->id, 'name'=>$user->name, 'email'=>$user->email]]);
        } catch (\Throwable $e) {
            error_log('Login error: ' . $e->getMessage() . "\n" . $e->getTraceAsString());
            return response()->json(['message' => 'Login failed', 'error' => $e->getMessage()], 500);
        }
    }
}
