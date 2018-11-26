<?php

namespace App\Models\Person;

use App\Models\Country;
use App\Models\Institution\Institution;
use App\Models\Level\Level;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        "first_name",
        "last_name",
        "image",
        'birthday',
        'nationality',
        'sex',
        'academic_level',
        'study_area',
        'short_biography',
        'email',
        'number_phone',
    ];
    protected $table = 'persons';

    public function academic_level()
    {
        return $this->belongsTo(AcademicLevel::class);
    }

    public function Levels()
    {
        return $this->belongsToMany(Level::class)
            ->withPivot('function', 'level_id', 'person_id', 'status', 'start_date', 'end_date');
    }

    public function Institutions()
    {
        return $this->belongsToMany(Institution::class);
    }
    public function Countries()
    {
        return $this->belongsToMany(Country::class)
            ->withPivot('category_person_id', 'country_id', 'person_id');
    }

}
