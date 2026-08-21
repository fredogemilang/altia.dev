<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EstimatorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Contact form submission (Brevo Transactional Email)
Route::post('/contact', [ContactController::class, 'send']);

// Estimator routes
Route::post('/estimator/estimate', [EstimatorController::class, 'estimate']);
Route::post('/estimator/lead', [EstimatorController::class, 'lead']);
