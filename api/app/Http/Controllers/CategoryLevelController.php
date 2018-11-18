<?php

namespace App\Http\Controllers;

use App\Http\Resources\Level\CategoryLevelCollection;
use App\Http\Resources\Level\CategoryLevelResource;
use App\Models\Level\CategoryLevel;
use Illuminate\Http\Request;

class CategoryLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categoryLevel = CategoryLevel::all();

        return CategoryLevelCollection::collection($categoryLevel);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Level\CategoryLevel  $categoryLevel
     * @return \Illuminate\Http\Response
     */
    public function show($categoryLevel)
    {
        $category = CategoryLevel::find($categoryLevel)->first();

        return new CategoryLevelResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Level\CategoryLevel  $categoryLevel
     * @return \Illuminate\Http\Response
     */
    public function edit(CategoryLevel $categoryLevel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Level\CategoryLevel  $categoryLevel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CategoryLevel $categoryLevel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Level\CategoryLevel  $categoryLevel
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoryLevel $categoryLevel)
    {
        //
    }
}
