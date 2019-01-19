<?php

namespace App\Models\Indicator;

use App\Models\Level\Level;
use Illuminate\Database\Eloquent\Model;

class Indicator extends Model
{
    protected $fillable =[
        "name"
    ];
    public  function  levels(){
        return $this->belongsToMany(Level::class)            
        ->withPivot('created_at', 'note');
    }
}
