<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $moderatorRole = Role::create(['name' => RolesEnum::Moderator->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $manageUsersPermission = Permission::create(['name' => PermissionsEnum::ManageUsers->value]);
        $manageCommentsPermission = Permission::create(['name' => PermissionsEnum::ManageComments->value]);
        $upvoteDownvotePermission = Permission::create(['name' => PermissionsEnum::UpvoteDownvote->value]);
        $manageFeaturesPermission = Permission::create(['name' => PermissionsEnum::ManageFeatures->value]);
        $commentPermission = Permission::create(['name' => PermissionsEnum::Comment->value]);

        $adminRole->givePermissionTo($manageUsersPermission);
        $adminRole->givePermissionTo($manageCommentsPermission);
        $adminRole->givePermissionTo($upvoteDownvotePermission);
        $adminRole->givePermissionTo($manageFeaturesPermission);
        $adminRole->givePermissionTo($commentPermission);

        $moderatorRole->givePermissionTo($manageCommentsPermission);
        $moderatorRole->givePermissionTo($upvoteDownvotePermission);
        $moderatorRole->givePermissionTo($commentPermission);
        
        $userRole->givePermissionTo($upvoteDownvotePermission);
        $userRole->givePermissionTo($commentPermission);
        
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ])->assignRole(RolesEnum::User->value);

        User::factory()->create([
            'name' => 'Test Moderator',
            'email' => 'moderator@example.com',
            'password' => 'password',
        ])->assignRole(RolesEnum::Moderator->value);

        User::factory()->create([
            'name' => 'Test Admin',
            'password' => 'password',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin->value);

        Feature::factory()->count(10)->create();
    }
}
