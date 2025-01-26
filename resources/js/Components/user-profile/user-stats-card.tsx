import { router } from '@inertiajs/react';
import { FlagIcon as Feature, MessageSquare } from 'lucide-react';

interface Stat {
    icon: React.ReactNode;
    label: string;
    value: number;
    onClick: () => void;
}

interface UserStatsCardProps {
    stats: {
        featuresCreated: number;
        commentsMade: number;
    };
}

export const UserStatsCard = ({ stats }: UserStatsCardProps) => {
    const handleParamsChange = (view: 'profile' | 'features' | 'comments') => {
        const params = new URLSearchParams(window.location.search);
        const currentView = params.get('view');
        if (currentView === view) {
            router.get(window.location.pathname, undefined, {
                preserveState: true,
            });
        } else {
            router.get(
                window.location.pathname,
                { view },
                { preserveState: true },
            );
        }
        window.history.pushState(
            {},
            '',
            `${window.location.pathname}?${params.toString()}`,
        );
    };

    const statItems: Stat[] = [
        {
            icon: <Feature className="h-4 w-4" />,
            label: 'Features Created',
            value: stats.featuresCreated,
            onClick: () => handleParamsChange('features'),
        },
        {
            icon: <MessageSquare className="h-4 w-4" />,
            label: 'Comments Made',
            value: stats.commentsMade,
            onClick: () => handleParamsChange('comments'),
        },
        // {
        //     icon: <Users className="h-4 w-4" />,
        //     label: 'Projects Joined',
        //     value: stats.projectsJoined,
        // },
        // {
        //     icon: <Star className="h-4 w-4" />,
        //     label: 'Total Likes',
        //     value: stats.totalLikes,
        // },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {statItems.map((stat, index) => (
                <button
                    key={index}
                    className="flex items-center space-x-2 rounded-lg border p-3 shadow-md transition-colors hover:bg-muted"
                    onClick={stat.onClick}
                >
                    <div className="rounded-full bg-primary p-1 text-primary-foreground">
                        {stat.icon}
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            {stat.label}
                        </p>
                        <p className="text-sm font-medium leading-none">
                            {stat.value}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
};
