<?php

namespace App\Models;

use App\Models\Level\Level;
use App\Models\Person\Person;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use spatialTrait;
    protected $fillable = [
        'name', 'region_id', 'iso_a3', 'iso_a2', 'iso_n3', 'capital', 'description', 'devise', 'indicatif_tele', 'drapeau_url',
    ];
    protected $spatialFields = ['area'];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function Levels()
    {
        return $this->hasMany(Level::class);
    }
    public function Persons()
    {
        return $this->belongsToMany(Person::class)
            ->withPivot('category_person_id', 'country_id', 'person_id');
    }
}
