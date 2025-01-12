'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/types/user-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Flag, MessageSquare, MoreHorizontal, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UserProfileProps {
    user: User;
    isFullWidth?: boolean;
}

export const UserProfile = ({
    user,
    isFullWidth = false,
}: Readonly<UserProfileProps>) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDM = () => {
        // TODO: Implement DM functionality
        console.log(`Sending DM to ${user.name}`);
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        console.log(`${isFollowing ? 'Unfollowed' : 'Followed'} ${user.name}`);
    };

    const handleReport = () => {
        setIsReportDialogOpen(true);
    };

    const closeDialog = () => {
        setIsReportDialogOpen(false);
    };

    const reportSchema = z.object({
        reportData: z
            .string()
            .min(100, 'Report must be at least 100 characters long.'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{
        reportData: string;
    }>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            reportData: '',
        },
    });

    const submitReport = (data: { reportData: string }) => {
        // TODO: Implement report submission logic
        console.log(`Reporting ${user.name} with data:`, data.reportData);
        closeDialog();
        reset();
    };

    return (
        <>
            <Card
                className={clsx(
                    'container mx-auto mt-12 w-full',
                    !isFullWidth && 'max-w-md',
                    isFullWidth && 'max-w-7xl',
                )}
            >
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                            alt={user.name}
                        />
                        <AvatarFallback>
                            {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{user.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                        {user.email_verified_at && (
                            <Badge variant="default">Verified</Badge>
                        )}
                    </div>
                    <p className="text-sm">
                        Member since: {formatDate(user.created_at)}
                    </p>
                    <p className="text-sm">
                        Last updated: {formatDate(user.updated_at)}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                        <Button onClick={handleDM} size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                        </Button>
                        <Button
                            onClick={handleFollow}
                            variant={isFollowing ? 'secondary' : 'default'}
                            size="sm"
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleReport}
                            variant="ghost"
                            size="sm"
                        >
                            <Flag className="mr-2 h-4 w-4" />
                            Report
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => console.log('Action 1')}
                                >
                                    Action 1
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => console.log('Action 2')}
                                >
                                    Action 2
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={isReportDialogOpen} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Report User</DialogTitle>
                        <DialogDescription>
                            Please provide details for your report.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={handleSubmit(submitReport)}
                    >
                        <Textarea
                            {...register('reportData', { required: true })}
                            placeholder="Enter your report. Try to be as specific as possible."
                            className="min-h-[250px]"
                        />
                        {errors.reportData && (
                            <span className="text-red-500">
                                {errors.reportData.message}
                            </span>
                        )}
                        <Button type="submit">Submit Report</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
