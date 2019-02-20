<?php
use App\Models\Indicator\CategoryIndicator;
use Faker\Generator as Faker;

$factory->define(App\Models\Indicator\Indicator::class, function (Faker $faker) {
    return [
      
        'name'=> function () {
            return collect([
                'Rôle et composition clairement définie',
                'CV et biographies des maires disponibles',
                'Email de la collectivité disponible',
                'Déclaration disponible',
                'Rapport annuel disponible',
                'Rapport sur le développement de la collectivité',
                'Rapport sur les manquements',
                'Plan stratégique disponible',
                'Plan financier disponible',
                'Rapport sur les recettes de taxes',
                'Publication transparence des taux',

            ])->random();
        },
        'category_indicator_id' => function () {
            return CategoryIndicator::all()->random();
        },
    ];
});
