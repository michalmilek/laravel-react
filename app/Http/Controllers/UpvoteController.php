<?php

namespace App\Http\Controllers;

use App\Models\Upvote;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UpvoteController extends Controller
{
    /**
     * Toggle upvote for a feature
     */
    public function toggle(Request $request, Feature $feature): RedirectResponse
    {
        $user = Auth::user();
        logger($user);
        
        $existingVote = Upvote::where('user_id', $user->id)
            ->where('feature_id', $feature->id)
            ->first();

        if ($existingVote) {
            if ($existingVote->is_upvote === $request->is_upvote) {
                // If same vote type exists, remove it (toggle off)
                $existingVote->delete();
                return to_route('features.show', $feature->id);
            } else {
                // If different vote type exists, update it
                $existingVote->update(['is_upvote' => $request->is_upvote]);
                return to_route('features.show', $feature->id);
            }
        }

        // Create new vote
        Upvote::create([
            'user_id' => $user->id,
            'feature_id' => $feature->id,
            'is_upvote' => $request->is_upvote
        ]);

        return to_route('features.show', $feature->id);
    }
}
