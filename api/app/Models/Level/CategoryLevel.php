<?php

namespace App\Models\Level;

use Illuminate\Database\Eloquent\Model;

class CategoryLevel extends Model
{
    public  function  Levels(){
        return $this->hasMany(Level::class);
    }
}
