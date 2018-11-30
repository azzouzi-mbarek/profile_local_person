<?php

namespace App\Models\Person;

use Illuminate\Database\Eloquent\Model;

class AcademicLevel extends Model
{
    protected $fillable = [
        "name",
        "bac_level",
    ];
    protected $table = 'academic_levels';
    
    public  function  Persons(){
        return $this->belongsToMany(Person::class);
    }
}
