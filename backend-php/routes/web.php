<?php

$router->post('/api/register', 'AuthController@register');
$router->post('/api/login', 'AuthController@login');

$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('/api/posts', 'PostController@index');
    $router->post('/api/posts', 'PostController@store');
    $router->get('/api/posts/{id}', 'PostController@show');
});
