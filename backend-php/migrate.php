<?php
// Lightweight migration runner (no artisan).
// Usage: php migrate.php

$app = require __DIR__.'/bootstrap/app.php';
use Illuminate\Support\Facades\Schema;

$files = glob(__DIR__.'/database/migrations/*.php');
sort($files);
foreach ($files as $file) {
    $migration = require $file; // returns an instance
    echo "Running migration: $file\n";
    $migration->up();
}
echo "Done.\n";
