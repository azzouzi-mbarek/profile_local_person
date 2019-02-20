<?php

namespace App\Models\Indicator;

use Illuminate\Database\Eloquent\Model;
use Models\Indicator\Indicator;

class CategoryIndicator extends Model
{
    protected $fillable = [
        "name",
    ];
    protected $table = 'category_indicators';
    
    public  function  Indicator(){
        return $this->hasMany(Indicator::class);
    }
}
