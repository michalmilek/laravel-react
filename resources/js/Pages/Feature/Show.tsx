import { Feature } from '@/Components/features';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Datum } from '@/types/features';
import { Head } from '@inertiajs/react';

export default function Index({ feature }: { feature?: { data: Datum } }) {
    const user = useCurrentUser();

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Feature
                </h2>
            }
        >
            <Head title="Feature" />

            {feature && <Feature feature={feature.data} />}
            {user && <div>Welcome, {user.name}!</div>}
        </AuthenticatedLayout>
    );
}
