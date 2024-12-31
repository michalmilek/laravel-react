import { FeatureList } from '@/Components/features';
import { buttonVariants } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Paginated } from '@/types';
import { Datum } from '@/types/features';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

export default function Index({ features }: { features: Paginated<Datum> }) {
    const { data, meta, links } = features;
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Features
                    </h2>
                    <Link
                        className={buttonVariants({ variant: 'default' })}
                        href="/features/create"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Create feature
                    </Link>
                </div>
            }
        >
            <Head title="Features" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <FeatureList features={data} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
