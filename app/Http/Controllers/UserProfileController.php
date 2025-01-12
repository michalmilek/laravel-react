<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function show($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('UserProfile', [
            'user' => $user,
        ]);
    }
} 
