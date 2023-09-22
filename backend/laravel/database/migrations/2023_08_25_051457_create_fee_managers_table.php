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
        Schema::create('fee_managers', function (Blueprint $table) {
            $table->id();
            $table->integer("faculty_id");
            $table->integer("department_id");
            $table->integer("fee_type");
            $table->string("amount");
            $table->integer("session_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_managers');
    }
};
