export const permissions = [
    'manage-users',
    'manage-comments',
    'upvote-downvote',
    'manage-features',
    'comment',
] as const;

export type Permission = (typeof permissions)[number];
