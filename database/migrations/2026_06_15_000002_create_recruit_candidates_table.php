<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recruit_candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('recruit_jobs')->cascadeOnDelete();
            $table->foreignId('recruiter_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('location')->nullable();
            $table->string('source')->default('Inbound');
            $table->string('stage')->default('applied');
            $table->unsignedTinyInteger('score')->default(0);
            $table->string('resume_url')->nullable();
            $table->longText('notes')->nullable();
            $table->timestamp('applied_at')->nullable();
            $table->timestamp('hired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recruit_candidates');
    }
};