<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'comment' => $this->comment,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'avatar' => $this->user->avatar,
            ],
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'upvotes_count' => $this->upvotes_count,
            'user_voted' => $this->user_voted ? true : false,
            'is_upvote' => $this->is_upvote,
            'is_downvote' => $this->is_downvote,
        ];
    }
} 