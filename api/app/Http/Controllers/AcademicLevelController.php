<?php

namespace App\Http\Controllers;

use App\Http\Resources\Person\AcademicLevelCollection;
use App\Http\Resources\Person\AcademicLevelResource;
use App\Models\Person\AcademicLevel;

class AcademicLevelController extends Controller
{
    public function index()
    {
        $academicLevels = AcademicLevel::all();

        return AcademicLevelCollection::collection($academicLevels);

    }

    public function show($id)
    {
        $academicLevel = AcademicLevel::find($id);

        return new AcademicLevelResource($academicLevel);

    }

    public function destroy($id)
    {
        $academicLevel = AcademicLevel::find($id);
        $academicLevel->delete();
        return response(
            [
                'data' => new AcademicLevelResource($academicLevel),
                'message' => 'deleted',

            ],
            201
        );

    }

}
