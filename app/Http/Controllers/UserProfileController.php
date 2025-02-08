<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\User;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function show($id)
    {
        $user = User::withCount(['features', 'comments'])->findOrFail($id);
        $view = request()->query('view');
        
        // Check for 'view' query parameter
        if ($view === 'features') {
            $features = $user->features()
                ->withCount(['comments', 'upvotes as upvotes_count' => function ($query) {
                    $query->where('is_upvote', true);
                }, 'upvotes as downvotes_count' => function ($query) {
                    $query->where('is_upvote', false);
                }])
                ->orderBy('created_at', 'desc')
                ->paginate(10);
            return Inertia::render('UserProfile', [
                'user' => $user,
                'features' => $features,
            ]);
        } elseif ($view === 'comments') {
            $comments = $user->comments()
                ->with('user')
                ->withCount(['upvotes as upvotes_count' => function ($query) {
                    $query->where('is_upvote', true);
                }])
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return Inertia::render('UserProfile', [
                'user' => $user,
                'comments' => CommentResource::collection($comments),
            ]);
        }

        return Inertia::render('UserProfile', [
            'user' => $user,
        ]);
    }
}
