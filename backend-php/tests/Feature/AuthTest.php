<?php

use Laravel\Lumen\Testing\TestCase;

class AuthTest extends TestCase
{
    public function createApplication()
    {
        return require __DIR__.'/../../bootstrap/app.php';
    }

    public function testRegisterValidation()
    {
        $this->post('/api/register', [])
            ->seeStatusCode(422);
    }
}
