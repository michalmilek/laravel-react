<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\CommentUpvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentUpvoteController extends Controller
{
    public function toggle(Request $request, Comment $comment)
    {
        $user = Auth::user();
        
        $existingVote = CommentUpvote::where('user_id', $user->id)
            ->where('comment_id', $comment->id)
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
        CommentUpvote::create([
            'user_id' => $user->id,
            'comment_id' => $comment->id,
            'is_upvote' => $request->is_upvote
        ]);

        return redirect()->back()->with('message', 'Vote added');
    }
}
