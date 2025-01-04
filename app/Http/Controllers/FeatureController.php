<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeatureController extends Controller
{
    public const VALIDATION_RULE = 'required|string|max:255';

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginatedFeatures = Feature::latest()->withCount(['upvotes as upvotes_count' => function ($query) {
            $query->select(DB::raw('SUM(CASE WHEN is_upvote = 1 THEN 1 WHEN is_upvote IS NULL THEN 0 ELSE -1 END) as upvotes_count'));
        }])->withExists(['upvotes as user_voted' => function ($query) {
            $query->select(DB::raw('CASE WHEN is_upvote = 1 THEN 1 WHEN is_upvote = 0 THEN 0 ELSE -1 END'))
                  ->where('user_id', auth()->id());
        }])->paginate(10);

        return Inertia::render('Feature/Index', [
            'features' => FeatureResource::collection($paginatedFeatures),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => self::VALIDATION_RULE,
            'description' => self::VALIDATION_RULE,
        ]);

        $data['user_id'] = auth()->user()->id;
        Feature::create($data);

        return redirect()->route('features.index')->with('success', 'Feature created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        $feature->loadCount('upvotes');
        $feature->loadExists(['upvotes as user_voted' => function ($query) {
            $query->where('user_id', auth()->id());
        }]);

        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'name' => self::VALIDATION_RULE,
            'description' => self::VALIDATION_RULE,
        ]);

        $feature->update($data);

        return redirect()->route('features.index')->with('success', 'Feature updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();

        return redirect()->route('features.index')->with('success', 'Feature deleted successfully');
    }
}
