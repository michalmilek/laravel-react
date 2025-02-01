<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureListResource;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
class FeatureController extends Controller
{
    public const VALIDATION_RULE = 'required|string|max:255';

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paginatedFeatures = Feature::latest()
            ->withExists([
                'upvotes as is_upvote' => function ($query) {
                    $query->where('user_id', auth()->id())
                        ->where('is_upvote', true);
                }
            ])
            ->withExists([
                'upvotes as is_downvote' => function ($query) {
                    $query->where('user_id', auth()->id())
                        ->where('is_upvote', false);
                }
            ])
            ->withExists([
                'comments as is_comment_upvote' => function ($query) {
                    $query->where('user_id', auth()->id())
                        ->where('is_upvote', true);
                }
            ])
            ->with(['comments', 'tags'])
            ->paginate(10);

        return Inertia::render('Feature/Index', [
            'features' => FeatureListResource::collection($paginatedFeatures),
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
            'tags' => 'nullable|array',
            'tags.*' => 'string',
        ]);

        $data['user_id'] = auth()->user()->id;
        $feature = Feature::create($data);

        if (isset($data['tags']) && is_array($data['tags'])) {
            $tagIds = [];

            foreach ($data['tags'] as $tagName) {

                $tagName = trim($tagName);
                if (empty($tagName)) {
                    continue;
                }


                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                );


                $tagIds[] = $tag->id;
            }


            $feature->tags()->sync($tagIds);
        } else {

            $feature->tags()->detach();
        }

        return redirect()->route('features.index')->with('success', 'Feature created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResource($feature)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResource($feature),
            'allTags' => Tag::all(),
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
            'tags' => 'nullable|array',
            'tags.*' => 'string',
        ]);

        $feature->update($data);

        if (isset($data['tags']) && is_array($data['tags'])) {
            $tagIds = [];

            foreach ($data['tags'] as $tagName) {

                $tagName = trim($tagName);
                if (empty($tagName)) {
                    continue;
                }


                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                );


                $tagIds[] = $tag->id;
            }


            $feature->tags()->sync($tagIds);
        } else {

            $feature->tags()->detach();
        }

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
