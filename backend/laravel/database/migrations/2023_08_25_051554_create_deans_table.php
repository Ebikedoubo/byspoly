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
        Schema::create('deans', function (Blueprint $table) {
            $table->id();
            $table->integer("faculty_id");
            $table->integer("lecturer_id");
            $table->date("start_date");
            $table->date("end_date")->nullable();
            $table->integer("status")->comment("this status means it couldbe a current dean or not");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deans');
    }
};
