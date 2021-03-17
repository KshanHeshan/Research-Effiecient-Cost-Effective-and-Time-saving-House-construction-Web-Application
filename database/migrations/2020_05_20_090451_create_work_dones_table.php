<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkDonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_dones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('belonged_user_id')->unsigned()->index();
            $table->foreign('belonged_user_id')->references('id')->on('users');
            $table->string('user_service_type');
            $table->string('custom_image');
            $table->string('image_url');
            $table->string('project_image_1');
            $table->string('project_image_2');
            $table->string('project_image_3');
            $table->string('project_image_4');
            $table->string('works_subject');
            $table->string('works_duration');
            $table->string('works_meters');
            $table->string('works_cost');
            $table->mediumText('works_description');
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
        Schema::dropIfExists('work_dones');
    }
}
