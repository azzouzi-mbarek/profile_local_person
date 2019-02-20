<?php

namespace App\Models\Indicator;

use App\Models\Level\Level;
use App\Models\Indicator\CategoryIndicator;
use Illuminate\Database\Eloquent\Model;

class Indicator extends Model
{

    protected $table = 'indicators';

    protected $fillable =[
        "name",
        "category_indicator_id"
    ];
    public function CategoryIndicator()
    {
        return $this->belongsTo(CategoryIndicator::class);
    }

    public  function  levels(){
        return $this->belongsToMany(Level::class)            
        ->withPivot('created_at');
    }
}
