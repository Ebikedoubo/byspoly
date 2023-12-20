<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = ["first_name", "last_name", "maiden_name", "dob", "email", "country_id", "state_id", "lga_id", "session_id"];
}
