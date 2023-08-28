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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string("first_name");
            $table->string("last_name");
            $table->string("middle_name");
            $table->string("maiden_name");
            $table->string("reg_number")->nullable();
            $table->string("dob");
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('passwordresetcode')->nullable();
            $table->rememberToken();
            $table->integer("log_user_id")->nullable();
            $table->integer("country_id");
            $table->integer("state_id");
            $table->integer("lga_id");
            $table->integer("status")->default(0)->comment("this status determine if a user is a student or not with 0 and one ");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
