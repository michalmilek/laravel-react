<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = 'admin';
    case Moderator = 'moderator';
    case User = 'user';
    case Guest = 'guest';

    public static function labels(): array
    {
        return [
            self::Admin => 'Admin',
            self::Moderator => 'Moderator',
            self::User => 'User',
            self::Guest => 'Guest',
        ];
    }

    public function label(): string
    {
        return self::labels()[$this->value];
    }
}
