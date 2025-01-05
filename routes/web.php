<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('features', FeatureController::class);

        Route::post('features/{feature}/vote', [UpvoteController::class, 'toggle']);

        Route::post('features/{feature}/comments', [CommentController::class, 'store'])->name('comment.store');
        Route::put('comments/{comment}', [CommentController::class, 'update'])->name('comment.update');
        Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');
    });

});

require __DIR__.'/auth.php';
