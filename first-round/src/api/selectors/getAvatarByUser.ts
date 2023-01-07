import Database from '@database';

export const getAvatarByUser = (id: string) => Database.data.avatars[id];
