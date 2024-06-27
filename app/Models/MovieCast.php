<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieCast extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'movie_id',
        'name',
        'original_name',
        'popularity',
        'profile_path',
        'character',
    ];

    /**
     * Cast the dates to human readable format.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:D, m/d/o',
        'updated_at' => 'datetime:D, m/d/o',
    ];
}
