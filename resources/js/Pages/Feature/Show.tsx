import { Feature } from '@/Components/features';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Datum } from '@/types/features';
import { Head } from '@inertiajs/react';

export default function Index({ feature }: { feature?: { data: Datum } }) {
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
        </AuthenticatedLayout>
    );
}
