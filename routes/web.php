<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentUpvoteController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

const PROFILE_ROUTE = '/profile';
const DASHBOARD_ROUTE = '/dashboard';

Route::redirect('/', '/dashboard');

Route::middleware('auth')->group(function () {
    Route::get(PROFILE_ROUTE, [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch(PROFILE_ROUTE, [ProfileController::class, 'update'])->name('profile.update');
    Route::delete(PROFILE_ROUTE, [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified'])->group(function () {
        Route::get(DASHBOARD_ROUTE, function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('features', FeatureController::class);

        Route::post('features/{feature}/vote', [UpvoteController::class, 'toggle']);

        Route::post('features/{feature}/comments', [CommentController::class, 'store'])->name('comment.store');
        Route::put('comments/{comment}', [CommentController::class, 'update'])->name('comment.update');
        Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');

        Route::get('/user/{id}', [UserProfileController::class, 'show'])->name('user.profile');

        Route::post('comments/{comment}/vote', [CommentUpvoteController::class, 'toggle']);
    });

});

require __DIR__.'/auth.php';
