<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\InterviewEventController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('RecruitDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('candidates', CandidateController::class)->except(['show']);
    Route::resource('jobs', JobController::class)->except(['show']);
    Route::resource('interviews', InterviewEventController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::get('scheduling', [InterviewEventController::class, 'index'])->name('scheduling.index');
    Route::get('analytics', AnalyticsController::class)->name('analytics.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
