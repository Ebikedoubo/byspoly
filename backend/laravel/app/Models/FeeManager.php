<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeManager extends Model
{
    use HasFactory;

    public function faculty(){
        return $this->hasOne(Faculty::class,"id","faculty_id");

    }

    public function department(){
        return $this->hasOne(Department::class,"id","department_id");
    }

    public function type(){
        return $this->hasOne(FeeType::class,"id","fee_type");
    }

    public function session(){
        return $this->hasOne(AcademicSession::class,"id","session_id");
    }
}
