<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeatureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // dd($this);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'user' => $this->user,
            'upvotes_count' => $this->upvotes_count,
            'user_voted' => $this->user_voted ? true : false,
            'is_upvote' => $this->is_upvote,
            'is_downvote' => $this->is_downvote,
            'comments' => $this->comments,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
