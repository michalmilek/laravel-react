import { FlagIcon as Feature, MessageSquare } from 'lucide-react';

interface Stat {
    icon: React.ReactNode;
    label: string;
    value: number;
}

interface UserStatsCardProps {
    stats: {
        featuresCreated: number;
        commentsMade: number;
    };
}

export const UserStatsCard = ({ stats }: UserStatsCardProps) => {
    const statItems: Stat[] = [
        {
            icon: <Feature className="h-4 w-4" />,
            label: 'Features Created',
            value: stats.featuresCreated,
        },
        {
            icon: <MessageSquare className="h-4 w-4" />,
            label: 'Comments Made',
            value: stats.commentsMade,
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
                <div
                    key={index}
                    className="flex items-center space-x-2 rounded-lg border p-3 shadow-md transition-colors hover:bg-muted"
                >
                    <div className="rounded-full bg-primary p-1 text-primary-foreground">
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium leading-none">
                            {stat.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {stat.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
