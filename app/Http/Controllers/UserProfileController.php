<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function show($id)
    {
        $user = User::withCount(['features', 'comments'])->findOrFail($id);
        
        // Check for 'view' query parameter
        if (request()->query('view') === 'features') {
            $features = $user->features()->withCount(['comments'])->paginate(10); // Paginate features, 10 per page
            return Inertia::render('UserProfile', [
                'user' => $user,
                'features' => $features, // Pass paginated features to the view
            ]);
        }

        return Inertia::render('UserProfile', [
            'user' => $user,
        ]);
    }
}
