<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    public function handle($request, Closure $next)
    {
        $auth = $request->header('Authorization');
        if (!$auth || !str_starts_with($auth, 'Bearer ')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $token = substr($auth, 7);
        try {
            $payload = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $request->attributes->set('user_id', $payload->sub ?? null);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        }
        return $next($request);
    }
}
