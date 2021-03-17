<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    // Table Name
    protected $table = 'reviews';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    public function user() {
        return $this->belongsTo(User::class);
    }
    
}
