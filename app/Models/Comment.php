<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    protected $fillable = ['comment', 'feature_id', 'user_id', 'author'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function feature(): BelongsTo
    {
        return $this->belongsTo(Feature::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function upvotes(): HasMany
    {
        return $this->hasMany(CommentUpvote::class);
    }

    public function getUpvotesCountAttribute()
    {

        $positiveVotes = $this->upvotes()->where('is_upvote', true)->count();
        $negativeVotes = $this->upvotes()->where('is_upvote', false)->count();
        
        return $positiveVotes - $negativeVotes;
    }

    // Accessor for user_voted
    public function getUserVotedAttribute()
    {
        return $this->upvotes()->where('user_id', auth()->id())->first() ? true : false;
    }

    // Accessor for is_upvote
    public function getIsUpvoteAttribute()
    {
        return $this->upvotes()->where('user_id', auth()->id())->where('is_upvote', true)->exists() ? true : false;
    }

    // Accessor for is_downvote
    public function getIsDownvoteAttribute()
    {
        return $this->upvotes()->where('user_id', auth()->id())->where('is_upvote', false)->exists() ? true : false;
    }
}
