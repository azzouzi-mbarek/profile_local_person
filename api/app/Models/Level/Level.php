<?php

namespace App\Models\Level;

use App\Models\Country;
use App\Models\Indicator\Indicator;
use App\Models\Institution\Institution;
use App\Models\Person\Person;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use spatialTrait;

    protected $spatialFields = ['shape'];

    public function Country()
    {
        return $this->belongsTo(Country::class);
    }
    public function category_level()
    {
        return $this->belongsTo(CategoryLevel::class);
    }
    public function level()
    {
        return $this->belongsTo(Level::class, 'id', 'level_id');
    }

    public function levels()
    {
        return $this->hasMany(Level::class, 'level_id', 'id');
    }
    public function Population()
    {
        return $this->hasMany(Population::class);
    }
    public function LegalFramework()
    {
        return $this->hasMany(LegalFramework::class);
    }
    public function CommunicationTool()
    {
        return $this->hasMany(CommunicationTool::class);
    }
    public function Finance()
    {
        return $this->hasMany(Finance::class);
    }
    public function Evenement()
    {
        return $this->hasMany(Evenement::class);
    }
    public function Programme()
    {
        return $this->hasMany(Programme::class);
    }
    public function Persons()
    {
        return $this->belongsToMany(Person::class)
        ->withPivot('function','level_id','person_id','status','start_date','end_date');
    }
    public function Institutions()
    {
        return $this->belongsToMany(Institution::class)
            ->withPivot('level_id', 'institution_id');
    }
    public function Indicators()
    {
        return $this->belongsToMany(Indicator::class)
            ->withPivot('created_at', 'note');
    }
}
