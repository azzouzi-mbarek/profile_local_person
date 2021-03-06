<?php

use App\Models\Region;
use Faker\Generator as Faker;

$factory->define(App\Models\Country::class, function (Faker $faker) {
    return [
        'region_id' => function () {
            return Region::all()->random();
        },
        'name' => function () {
            return collect([
                'Algérie',
                'Egypte',
                'Lybie',
                'Maroc',
                'Mauritanie',
                'Tunisie',
                'Burundi',
                'Cameroun',
                'Congo',
                'Gabon',
                'Guinée Equatoriale',
                'Republique centrafricaine',
                'Republlique Démocratique du Congo',
                'Sao Tomé etPrincipe',
                'Tchad',
                'Comores',
                'Djibouti',
                'Ethiopie',
                'Erythrée',
                'Kenya',
                'Madagascar',
                'Maurice',
                'Ouganda',
                'Rwanda',
                'Seychelles',
                'Somalie',
                'Soudan du Sud',
                'Soudan',
                'Tanzanie',
                'Bénin',
                'Burkina Faso',
                'Cabo verde',
                'Côte divoire',
                'Gambie',
                'Ghana',
                'Guinée',
                'Guinée Bissau',
                'Libéria',
                'Mali',
                'Niger',
                'Nigéria',
                'Sénégal',
                'Sierra Leone',
                'Togo',
                'Afrique du Sud',
                'Angola',
                'Botswana',
                'Lesotho',
                'Malawi',
                'Mozambique',
                'Namibie',
                'Eswatini',
                'Zambie',
                'Zimbabwe',
            ])->random();
        },
        'population' => $faker->numberBetween($min = 1000, $max = 9000),
        'population_year' => $faker->year,
        'description' => $faker->text,
        'capital' => $faker->city,
        'devise' => $faker->currencyCode,
    ];
});
