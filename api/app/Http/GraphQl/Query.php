<?php

namespace App\Http\GraphQl;

use App\Models\Level\CategoryLevel;

class Query
{

    public function categoriesLevels($root, array $args)
    {
        return CategoryLevel::all();
    }
}
