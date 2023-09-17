<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    public function department(){
        return $this->hasMany(Department::class,"faculty_id");
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($faculty) {
            // Use the 'departments' relationship to delete related departments
            $faculty->department->each->delete();
        });
    }
}
