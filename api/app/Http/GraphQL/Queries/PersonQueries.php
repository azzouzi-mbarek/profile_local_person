<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Person;


class PersonQueries
{
    public function persons($root, array $args)
    {

        return $persons = Person::all();
    }
}

