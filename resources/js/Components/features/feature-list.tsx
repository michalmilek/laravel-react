import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Datum } from '@/types/features';
import { dateUtils } from '@/utils';

export default function FeatureList({
    features,
}: Readonly<{ features?: Datum[] }>) {
    return (
        <div className="container mx-auto space-y-4 p-4">
            {features?.map((feature) => (
                <Card key={`feature-${feature.id}`}>
                    <CardHeader>
                        <CardTitle>{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2 text-gray-600">
                            {feature.description}
                        </p>
                        <p className="mb-2 text-sm text-gray-500">
                            Created on:{' '}
                            {dateUtils.getTimeAgo(feature.created_at)}
                        </p>
                        <div className="flex items-center">
                            <Avatar className="mr-2 h-8 w-8">
                                <AvatarImage
                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${feature.user.name}`}
                                />
                                <AvatarFallback>
                                    {feature.user.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">
                                    {feature.user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {feature.user.email}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
