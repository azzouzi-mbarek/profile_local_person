<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Indicator\Indicator;


class IndicatorQueries
{
    public function indicators($root, array $args)
    {

        return $indicators = Indicator::all();
    }
}

