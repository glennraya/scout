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
        Schema::create('movie_casts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('movie_id');
            $table->foreign('movie_id')->references('movie_id')->on('movies');
            $table->string('name');
            $table->string('original_name');
            $table->string('popularity');
            $table->string('profile_path')->nullable();
            $table->text('character');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('casts');
    }
};
