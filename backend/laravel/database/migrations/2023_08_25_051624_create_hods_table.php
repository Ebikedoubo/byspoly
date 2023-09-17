<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hods', function (Blueprint $table) {
            $table->id();
            $table->integer("faculty_id");
            $table->integer("department_id");
            $table->integer("lecturer_id");
            $table->date("start_date");
            $table->date("end_date")->nullable();
            $table->integer("status")->default(1)->comment("this status means it  a current HOD when the status is 1 and 0 meaning not a hod any more ");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hods');
    }
};
