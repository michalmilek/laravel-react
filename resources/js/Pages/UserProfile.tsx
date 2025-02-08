import { Button } from '@/components/ui/button';
import { UserProfile as UserProfileComponent } from '@/Components/user-profile';
import { UserComments } from '@/Components/user-profile/user-comments';
import { UserFeatures } from '@/Components/user-profile/user-features';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Comment, FeaturesPaginated } from '@/types/features';
import { User } from '@/types/user-profile';
import { Head, router } from '@inertiajs/react';

interface UserProfileProps {
    user: User;
    features?: FeaturesPaginated;
    comments?: {
        data: Comment[];
        current_page: number;
        last_page: number;
        next_page_url: string | null;
    };
}

export default function UserProfile({
    user,
    features,
    comments,
}: Readonly<UserProfileProps>) {
    const handlePageChange = (page: number, view: 'features' | 'comments') => {
        router.get(`/user/${user.id}?view=${view}&page=${page}`, {
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
            <Head title={`${user.name}'s Profile`} />
            <UserProfileComponent isFullWidth user={user} />
            {features && <UserFeatures features={features} isFullWidth />}
            {comments?.data.map((comment) => (
                <UserComments
                    key={comment.id}
                    comments={[comment]}
                    featureId={comment.feature.id}
                    featureName={comment.feature.name}
                    isFullWidth
                />
            ))}

            {(features || comments) && (
                <div className="mt-4 flex items-center justify-center gap-4">
                    {features && features.current_page > 1 && (
                        <Button
                            onClick={() =>
                                handlePageChange(
                                    features.current_page - 1,
                                    'features',
                                )
                            }
                            variant="outline"
                        >
                            Previous
                        </Button>
                    )}
                    {comments && comments.current_page > 1 && (
                        <Button
                            onClick={() =>
                                handlePageChange(
                                    comments.current_page - 1,
                                    'comments',
                                )
                            }
                            variant="outline"
                        >
                            Previous
                        </Button>
                    )}
                    <span>
                        Page{' '}
                        {(features?.current_page || comments?.current_page) ??
                            1}{' '}
                        of {(features?.last_page || comments?.last_page) ?? 1}
                    </span>
                    {features?.next_page_url && (
                        <Button
                            onClick={() =>
                                handlePageChange(
                                    features.current_page + 1,
                                    'features',
                                )
                            }
                            variant="outline"
                        >
                            Next
                        </Button>
                    )}
                    {comments?.next_page_url && (
                        <Button
                            onClick={() =>
                                handlePageChange(
                                    comments.current_page + 1,
                                    'comments',
                                )
                            }
                            variant="outline"
                        >
                            Next
                        </Button>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
