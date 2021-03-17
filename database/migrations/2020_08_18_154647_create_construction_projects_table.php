<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConstructionProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('construction_projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('construction_projectName');
            $table->string('area');
            $table->string('height');
            $table->string('no_floors');
            $table->string('no_rooms');
            $table->string('no_bathrooms');
            $table->string('no_doors');
            $table->string('no_windows');
            $table->string('wall_material');
            $table->string('celing_material');
            $table->string('floor_material');
            $table->string('roof_material');
            $table->bigInteger('carpenter_id')->unsigned()->index();
            $table->foreign('carpenter_id')->references('id')->on('users');
            $table->string('carpenter');
            $table->bigInteger('mason_id')->unsigned()->index();
            $table->foreign('mason_id')->references('id')->on('users');
            $table->string('mason');
            $table->string('carpenterNuMeters');
            $table->string('carpenterJobSpec');
            $table->string('timberType');
            $table->string('masonNuMeters');
            $table->string('masonJobSpec');
            $table->string('loc_nature');
            $table->string('loc_situation');
            $table->string('timber_for_carpentry');
            $table->string('timber_for_celing');
            $table->string('constructionCost');
            $table->string('masonCost');
            $table->string('carpenterCost');
            $table->string('no_pillers');
            $table->string('no_of_door_frames');
            $table->string('no_of_window_frames');
            $table->string('no_of_walls');
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
        Schema::dropIfExists('construction_projects');
    }
}
