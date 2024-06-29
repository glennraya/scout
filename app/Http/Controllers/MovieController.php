<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Search movies
     */
    public function search(Request $request): JsonResponse
    {
        $search_result = Movie::search($request->keyword, function ($meiliSearch, string $query, array $options) {
            $options['attributesToHighlight'] = ['original_title', 'overview', 'release_date'];

            return $meiliSearch->search($query, $options);
        })->paginateRaw(10);

        return response()->json([
            'result' => $search_result,
        ], 200);
    }
}
