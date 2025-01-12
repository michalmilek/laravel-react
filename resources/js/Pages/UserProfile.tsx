import { UserProfile as UserProfileComponent } from '@/Components/user-profile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types/user-profile';
import { Head } from '@inertiajs/react';

interface UserProfileProps {
    user: User;
}

export default function UserProfile({ user }: Readonly<UserProfileProps>) {
    console.log('🚀 ~ UserProfile ~ user:', user);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {user.name}'s Profile
                </h2>
            }
        >
            <Head title={`${user.name}'s Profile sss`} />
            <UserProfileComponent isFullWidth user={user} />
        </AuthenticatedLayout>
    );
}
