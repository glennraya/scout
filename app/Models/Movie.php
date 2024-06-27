<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Movie extends Model
{
    use HasFactory, HasUuids, Searchable;

    /**
     * Get the name of the index associated with the model.
     */
    public function searchableAs(): string
    {
        return 'movies_index';
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        return [
            'original_title' => $this->original_title,
            'overview' => $this->overview,
            'poster_path' => $this->poster_path,
            // 'movieCasts' => $this->movieCasts->map(function ($cast) {
            //     return $cast->only('original_name', 'character');
            // })->toArray(),
        ];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'original_title',
        'original_language',
        'overview',
        'popularity',
        'poster_path',
        'backdrop_path',
        'release_date',
        'vote_average',
        'vote_count',
        'is_adult',
    ];

    /**
     * Cast the dates to human readable format.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:D, m/d/o',
        'updated_at' => 'datetime:D, m/d/o',
        'release_date' => 'datetime:D, m/d/o',
    ];

    public function movieCasts(): HasMany
    {
        return $this->hasMany(MovieCast::class, 'movie_id', 'movie_id');
    }
}
