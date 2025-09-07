<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class PostController extends Controller
{
    public function index()
    {
        $cacheKey = 'posts:all';
        $cached = Redis::get($cacheKey);
        if ($cached) {
            return response($cached, 200)->header('Content-Type', 'application/json');
        }
        $posts = Post::with('user:id,name,email')->orderBy('created_at','desc')->get();
        Redis::setex($cacheKey, 60, $posts->toJson());
        return response()->json($posts);
    }

    public function show($id)
    {
        $cacheKey = "posts:$id";
        $cached = Redis::get($cacheKey);
        if ($cached) {
            return response($cached, 200)->header('Content-Type', 'application/json');
        }
        $post = Post::with('user:id,name,email')->findOrFail($id);
        Redis::setex($cacheKey, 60, $post->toJson());
        return response()->json($post);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $userId = $request->attributes->get('user_id');
        $post = Post::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'user_id' => $userId,
        ]);

        // Invalidate caches
        Redis::del('posts:all');
        Redis::del("posts:{$post->id}");

        return response()->json($post, 201);
    }
}
