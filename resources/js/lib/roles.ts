export const roles = ['admin', 'moderator', 'user', 'guest'] as const;

export type Role = (typeof roles)[number];
