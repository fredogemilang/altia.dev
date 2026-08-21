<?php
/**
 * ALTIA DEV — cPanel Storage Symlink Helper
 * Run this once via browser (e.g. https://serv.altiadev.com/cpanel_symlink_helper.php)
 * then DELETE this file for security.
 */

$target = __DIR__ . '/storage/app/public';
$shortcut = __DIR__ . '/public/storage';

if (file_exists($shortcut)) {
    echo "<h1>Storage symlink already exists!</h1>";
} else {
    if (symlink($target, $shortcut)) {
        echo "<h1>Storage symlink successfully created!</h1>";
        echo "<p>Path: <code>{$shortcut}</code> &rarr; <code>{$target}</code></p>";
        echo "<p style='color:red;'><strong>IMPORTANT: Delete this file now from cPanel File Manager.</strong></p>";
    } else {
        echo "<h1>Failed to create symlink.</h1>";
        echo "<p>Please ensure PHP function <code>symlink</code> is enabled in cPanel Select PHP Version -> Options.</p>";
    }
}
