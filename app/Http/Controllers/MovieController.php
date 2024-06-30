<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function search(Request $request)
    {
        $search_result = Movie::search($request->keyword, function($meiliSearch, string $query, array $options) {
            $options['attributesToHighlight'] = ['original_title', 'overview'];

            return $meiliSearch->search($query, $options);
        })->paginateRaw(10);

        return response()->json([
            'result' => $search_result
        ]);
    }
}
