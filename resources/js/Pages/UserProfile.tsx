import { UserProfile as UserProfileComponent } from '@/Components/user-profile';
import { UserFeatures } from '@/Components/user-profile/user-features';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Datum } from '@/types/features/feature';
import { User } from '@/types/user-profile';
import { Head, router } from '@inertiajs/react';

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
    const handlePageChange = (page: number) => {
        router.get(`/user/${user.id}?view=features&page=${page}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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

            {/* Pagination Controls */}
            <div>
                {features?.prev_page_url && (
                    <button
                        onClick={() =>
                            handlePageChange(features.current_page - 1)
                        }
                    >
                        Previous
                    </button>
                )}
                <span>
                    Page {features?.current_page} of {features?.last_page}
                </span>
                {features?.next_page_url && (
                    <button
                        onClick={() =>
                            handlePageChange(features.current_page + 1)
                        }
                    >
                        Next
                    </button>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
