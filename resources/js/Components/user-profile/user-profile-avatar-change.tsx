'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getAvatarUrl } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Loader2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

interface UserProfileAvatarChangeProps {
    avatar: string | null;
}

export const UserProfileAvatarChange = ({
    avatar,
}: UserProfileAvatarChangeProps) => {
    const avatarUrl = getAvatarUrl(avatar);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            setUploading(true);
            // Simulate upload delay
            router.post(route('profile.updateAvatar'), formData, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast({
                        title: 'Avatar updated',
                        description: 'Your avatar has been updated',
                    });
                },
                onError: (error) => {
                    console.log('🚀 ~ router.post ~ error:', error);
                    toast({
                        title: 'Error',
                        description: 'Failed to update avatar',
                    });
                },
                onFinish: () => {
                    setUploading(false);
                },
            });
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Change Avatar</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center space-y-4">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl || '/placeholder.svg'}
                            alt="Avatar"
                            className="h-[150px] w-[150px] rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gray-200">
                            <Upload className="h-12 w-12 text-gray-400" />
                        </div>
                    )}
                    <Label htmlFor="avatar" className="cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                                className="hidden"
                                ref={inputRef}
                            />
                            <Button
                                onClick={handleButtonClick}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload New Avatar
                                    </>
                                )}
                            </Button>
                        </div>
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
};
