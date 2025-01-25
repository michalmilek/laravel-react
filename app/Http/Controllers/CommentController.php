<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    private const VALIDATION_RULE = 'required|string|max:1000';

    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'comment' => self::VALIDATION_RULE,
        ]);

        $data['user_id'] = Auth::id();
        $data['feature_id'] = $feature->id;
        Comment::create($data);

        // Redirect back to the feature page with the new comment
        return redirect()->route('features.show', $feature->id)
            ->with('success', 'Comment added successfully');
    }

    /**
     * Update the specified comment in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $data = $request->validate([
            'comment' => self::VALIDATION_RULE,
        ]);

        $comment->update($data);

        // Redirect back to the feature page with the updated comment
        return redirect()->route('features.show', $comment->feature_id)
            ->with('success', 'Comment updated successfully');
    }

    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Comment $comment)
    {
        $featureId = $comment->feature_id; // Store the feature ID before deleting

        $comment->delete();

        // Redirect back to the feature page after deletion
        return redirect()->route('features.show', $featureId)
            ->with('success', 'Comment deleted successfully');
    }
}