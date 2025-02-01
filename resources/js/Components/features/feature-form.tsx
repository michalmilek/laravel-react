'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TagInput } from '@/components/ui/tag-input';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define the form schema
const formSchema = z.object({
    name: z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title must be 255 characters or less'),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(255, 'Description must be 255 characters or less'),
    tags: z.array(z.string()),
});

// Define the form input type based on the schema
type FeatureFormInput = z.infer<typeof formSchema>;

// Define props for the form component
interface FeatureFormProps {
    initialData?: FeatureFormInput;
    onSubmit: (data: FeatureFormInput) => void;
}

export function FeatureForm({ initialData, onSubmit }: FeatureFormProps) {
    const form = useForm<FeatureFormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            tags: [],
        },
    });

    const addTag = (tag: string) => {
        form.setValue('tags', [...(form.getValues('tags') || []), tag]);
    };

    const removeTag = (tag: string) => {
        form.setValue(
            'tags',
            (form.getValues('tags') || []).filter((t) => t !== tag),
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter feature name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The name of the feature (max 255 characters).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter feature description"
                                    className="min-h-[300px] resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                A brief description of the feature (max 255
                                characters).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <TagInput
                                    tags={form.getValues('tags') || []}
                                    addTag={addTag}
                                    removeTag={removeTag}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {/* {isSubmitting ? 'Saving...' : 'Save Feature'} */}
                    {initialData ? 'Update Feature' : 'Save Feature'}
                </Button>
            </form>
        </Form>
    );
}
