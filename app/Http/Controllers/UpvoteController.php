<?php

namespace App\Http\Controllers;

use App\Models\Upvote;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class UpvoteController extends Controller
{
    /**
     * Toggle upvote for a feature
     */
    public function toggle(Request $request, Feature $feature)
    {
        $user = Auth::user();
        
        $existingVote = Upvote::where('user_id', $user->id)
            ->where('feature_id', $feature->id)
            ->first();

        if ($existingVote) {
            if ((bool)$existingVote->is_upvote === (bool)$request->is_upvote) {
                // If same vote type exists, remove it (toggle off)
                $existingVote->delete();
                return redirect()->back()->with('message', 'Vote removed');
            } else {
                // If different vote type exists, update it
                $existingVote->update(['is_upvote' => $request->is_upvote]);
                return redirect()->back()->with('message', 'Vote updated');
            }
        }

        // Create new vote
        Upvote::create([
            'user_id' => $user->id,
            'feature_id' => $feature->id,
            'is_upvote' => $request->is_upvote
        ]);

        return redirect()->back()->with('message', 'Vote added');
    }
}
