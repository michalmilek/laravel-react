import FeatureList from '@/Components/features/feature-list';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Datum, Tag } from '@/types/features/feature';

type Props = {
    tag: Tag & {
        features: Datum[];
    };
    features: Datum[];
};

export default function Show({ tag, features }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Features tagged with {tag.name}
                    </h2>
                    <p className="text-gray-600">
                        Showing all features that have been tagged with "
                        {tag.name}".
                    </p>
                </div>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <FeatureList features={features} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
