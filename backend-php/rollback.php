<?php
// Lightweight rollback runner (drops in reverse order).
// Usage: php rollback.php

$app = require __DIR__.'/bootstrap/app.php';
use Illuminate\Support\Facades\Schema;

$files = glob(__DIR__.'/database/migrations/*.php');
rsort($files);
foreach ($files as $file) {
    $migration = require $file;
    echo "Reverting migration: $file\n";
    $migration->down();
}
echo "Done.\n";
