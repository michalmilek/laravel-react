import { FeatureForm } from '@/Components/features';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface FormProps {
    name: string;
    description: string;
}

export default function Index() {
    const { toast } = useToast();
    const onSubmit = (data: FormProps) => {
        router.post(
            '/features',
            {
                name: data.name,
                description: data.description,
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Feature created successfully',
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create feature
                </h2>
            }
        >
            <Head title="Create feature" />

            <div className="container mx-auto p-4">
                <Card className="mx-auto w-full max-w-3xl">
                    <CardContent className="mt-4">
                        <FeatureForm onSubmit={onSubmit} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
