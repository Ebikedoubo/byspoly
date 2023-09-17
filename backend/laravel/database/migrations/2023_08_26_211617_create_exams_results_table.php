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
        Schema::create('exams_results', function (Blueprint $table) {
            $table->id();
            $table->integer("student_id");
            $table->integer("exam_type_id");
            $table->string("exam_number");
            $table->string("exam_date");
            $table->integer("document_upload_id");
            $table->string("exam_score")->nullable()->comment("this is for jamb that provide a cummulative score");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams_results');
    }
};
