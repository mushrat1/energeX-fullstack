<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);

$app->withFacades();
$app->withEloquent();

// Config
$app->configure('database');

// Middleware

$app->middleware([
    App\Http\Middleware\CorsMiddleware::class,
]);
$app->routeMiddleware([
    'auth' => App\Http\Middleware\AuthMiddleware::class,
]);

// Redis
$app->register(Illuminate\Redis\RedisServiceProvider::class);

// Routes
$app->router->group(['namespace' => 'App\Http\Controllers'], function ($router) {
    require __DIR__.'/../routes/web.php';
});

return $app;
