<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('address');
            $table->string('user_image');
            $table->string('image_url');
            $table->mediumText('bio')->nullable();
            $table->string('job_spec');
            $table->string('service_type');
            $table->float('service_price')->nullable();
            $table->string('reigion');
            $table->integer('zip_code');
            $table->string('mobile_number');
            $table->float('total_ratings')->nullable();
            $table->integer('ratings_count')->nullable();
            $table->float('new_user_rate')->nullable();
            $table->string('tele_number')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
