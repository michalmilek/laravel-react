<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name', 'slug'];

    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }
}