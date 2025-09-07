<?php

use Laravel\Lumen\Testing\TestCase;

class PostTest extends TestCase
{
    public function createApplication()
    {
        return require __DIR__.'/../../bootstrap/app.php';
    }

    public function testUnauthorizedPosts()
    {
        $this->get('/api/posts')->seeStatusCode(401);
    }
}
