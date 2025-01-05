<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Feature extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'user_id'];

    public function upvotes(): HasMany
    {
        return $this->hasMany(Upvote::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Updated accessor for upvotes_count
    public function getUpvotesCountAttribute()
    {
        $positiveVotes = $this->upvotes()->where('is_upvote', true)->count();
        $negativeVotes = $this->upvotes()->where('is_upvote', false)->count();
        
        return $positiveVotes - $negativeVotes;
    }

    // Accessor for user_voted
    public function getUserVotedAttribute()
    {
        return $this->upvotes()->where('user_id', auth()->id())->first() ? 1 : 0;
    }
}
