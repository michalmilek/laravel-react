<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class TagController extends Controller
{
    /**
     * Display a listing of all tags.
     */
    public function index()
    {
        $tags = Tag::all(); // Fetch all tags from the database
        return inertia('Tags/Index', ['tags' => $tags]); // Pass data to the Inertia view
    }

    /**
     * Show the form for creating a new tag.
     */
    public function create()
    {
        return inertia('Tags/Create'); // Render the form to create a new tag
    }

    /**
     * Store a newly created tag in the database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags',
        ]);

        Tag::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']), // Generate a slug
        ]);

        return redirect()->route('tags.index')->with('success', 'Tag created successfully!');
    }

    /**
     * Show the form for editing a specific tag.
     */
    public function edit(Tag $tag)
    {
        return inertia('Tags/Edit', ['tag' => $tag]); // Pass the tag data to the Inertia view
    }

    /**
     * Update the specified tag in the database.
     */
    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id,
        ]);

        $tag->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']), // Update the slug
        ]);

        return redirect()->route('tags.index')->with('success', 'Tag updated successfully!');
    }

    /**
     * Remove the specified tag from the database.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->route('tags.index')->with('success', 'Tag deleted successfully!');
    }

    /**
     * Display the specified tag and its features.
     */
    public function show(Tag $tag)
    {
        $tag->load(['features' => function($query) {
            $query->with('user')->withCount('upvotes')->orderBy('created_at', 'desc');
        }]); // Eager load the features relationship with user and upvotes count

        return inertia('Tags/Show', [
            'tag' => $tag,
            'features' => $tag->features
        ]);
    }
}