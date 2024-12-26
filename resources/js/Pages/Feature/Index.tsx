import { FeatureList } from '@/Components/features';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Paginated } from '@/types';
import { Datum } from '@/types/features';
import { Head } from '@inertiajs/react';

export default function Index({ features }: { features: Paginated<Datum> }) {
    const { data, meta, links } = features;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Features
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <FeatureList features={data} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
