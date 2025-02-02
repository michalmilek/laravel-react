import { FeatureVote } from '@/Components/features/feature-vote';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { getAvatarUrl } from '@/lib/utils';
import { Datum } from '@/types/features';
import { dateUtils } from '@/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function FeatureList({
    features,
}: Readonly<{
    features?: Datum[];
}>) {
    const user = usePage().props.auth.user;
    const [featureToDelete, setFeatureToDelete] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = () => {
        if (featureToDelete) {
            router.delete(route('features.destroy', featureToDelete), {
                onSuccess: () => {
                    toast({
                        title: 'Feature deleted',
                        description: 'The feature has been deleted',
                        variant: 'success',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description:
                            'An error occurred while deleting the feature',
                        variant: 'destructive',
                    });
                },
            });
            setIsDeleteDialogOpen(false);
            setFeatureToDelete(null);
        }
    };

    return (
        <>
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This feature will be
                            permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="container mx-auto space-y-4 p-4">
                {features?.map((feature) => (
                    <Card key={`feature-${feature.id}`}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{feature.name}</CardTitle>
                            {(user.email === feature.user.email ||
                                user.roles.includes('admin')) && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical className="h-5 w-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route(
                                                    'features.edit',
                                                    feature.id,
                                                )}
                                            >
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => {
                                                setFeatureToDelete(feature.id);
                                                setIsDeleteDialogOpen(true);
                                            }}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2 break-all text-gray-600">
                                {feature.description}
                            </p>
                            <p className="mb-2 text-sm text-gray-500">
                                Created on:{' '}
                                {dateUtils.getTimeAgo(feature.created_at)}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Avatar className="mr-2 h-8 w-8">
                                        <AvatarImage
                                            src={
                                                getAvatarUrl(
                                                    feature.user.avatar,
                                                ) || ''
                                            }
                                        />
                                        <AvatarFallback>
                                            {feature.user.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <Link
                                            className="text-sm font-medium"
                                            href={route(
                                                'user.profile',
                                                feature.user.id,
                                            )}
                                        >
                                            {feature.user.name}
                                        </Link>
                                        <a
                                            className="text-xs text-gray-500"
                                            href={`mailto:${feature.user.email}`}
                                        >
                                            {feature.user.email}
                                        </a>
                                    </div>
                                </div>
                                <Link
                                    className={buttonVariants({
                                        variant: 'link',
                                    })}
                                    href={route('features.show', feature.id)}
                                >
                                    Read More
                                </Link>
                            </div>
                            <div className="mt-4">
                                <FeatureVote
                                    featureId={feature.id.toString()}
                                    userVoted={feature.user_voted}
                                    initialVotes={feature.upvotes_count}
                                    isUpvote={feature.is_upvote}
                                    isDownvote={feature.is_downvote}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
