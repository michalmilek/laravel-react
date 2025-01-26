import { UserProfile as UserProfileComponent } from '@/Components/user-profile';
import { UserFeatures } from '@/Components/user-profile/user-features';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Datum } from '@/types/features/feature';
import { User } from '@/types/user-profile';
import { Head } from '@inertiajs/react';

interface DatumWithCommentsCount extends Datum {
    comments_count: number;
}

interface UserProfileProps {
    user: User;
    features?: DatumWithCommentsCount[];
}

export default function UserProfile({
    user,
    features,
}: Readonly<UserProfileProps>) {
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
            {features && <UserFeatures features={features} isFullWidth />}
        </AuthenticatedLayout>
    );
}
