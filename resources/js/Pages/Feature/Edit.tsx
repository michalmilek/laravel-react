import { FeatureForm } from '@/Components/features';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { FeatureData } from '@/types/features';
import { Head, router } from '@inertiajs/react';

interface FormProps {
    name: string;
    description: string;
}

export default function Edit(
    props: PageProps<{ feature: { data: FeatureData } }>,
) {
    const { toast } = useToast();
    const onSubmit = (data: FormProps) => {
        router.patch(
            `/features/${props.feature.data.id}`,
            {
                name: data.name,
                description: data.description,
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Feature updated successfully',
                        variant: 'success',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Something went wrong. Please try again.',
                        variant: 'destructive',
                    });
                },
            },
        );
    };

    const initialData = {
        name: props.feature.data.name,
        description: props.feature.data.description,
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit feature
                </h2>
            }
        >
            <Head title="Edit feature" />

            <div className="container mx-auto p-4">
                <Card className="mx-auto w-full max-w-3xl">
                    <CardContent className="mt-4">
                        <FeatureForm
                            onSubmit={onSubmit}
                            initialData={initialData}
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
