<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Indicator\CategoryIndicator::class, function (Faker $faker) {
    return [
        'name' => function () {
            return collect([
                'informations GÉNÉRALES',
                'Plans et planification',
                'Local taxes, rates and service charge',
                'Relationship with citizen',
                'Public procurement',
                'Economic and financial transparency',
                'Urban planning and land use',
            ])->random();
        },
    ];
});
