<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Level\CategoryLevel::class, function (Faker $faker) {
    return [
        'name' => function () {
            return collect([
                'Région',
                'Wilaya',
                'Gouvernorat',
                'Prefecture',
                'Province',
                'District',
                'District council',
                'Urban council',
                'Municipalité',
                'Commune',
                'Metropolitan municipality',
                'Local municipality',
                'District Municipality',
                'City council',
                'Community council',
                'Urban District',
                'Rural District',
                'Town',
                'Village council',
                'Rural council',
                'Council of Sectors',
                'Metropole',
                'Commune urbaine',
                'Commune rurale',
                'Counties',
                'Communauté urbaine',
                'Local government',
                'Ville',
                'Département',
                'Municipal council',
                'Sub-county council',
                'State',
                'Wards',
                'Hamlet',
                'Secteur',
                'Chefferie',
                'Communauté rurale',
                'association national'

            ])->random();
        },
    ];
});
