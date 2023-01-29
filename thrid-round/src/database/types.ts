export type IdList = string[];

export type Entity<T> = {
  ids: IdList;
  entities: {
    [id: string]: T;
  };
};

export type FoldersEntity = Entity<Folder>;

export type UsersEntity = Entity<User>;

export type LettersEntity = Entity<Letter>;

export type ShortLettersEntity = Entity<ShortLetter>;

export type UnionLettersEntity = Entity<Letter | ShortLetter>;

export type Data = {
  folders: FoldersEntity;
  users: UsersEntity;
  letters: LettersEntity;
  avatars: Avatars;
};

export type Folder = {
  id: string;
  name: string;
  letters: IdList;
  totalLetters: number;
};

export type Avatars = {
  [id: string]: string;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar?: string;
  hasAvatar?: boolean;
};

export type ShortLetter = Omit<Letter,
  | 'text'
  | 'to'
  | 'doc'
  | 'type'
> & {
  shortText?: string;
  type: 'short';
};

export type Letter = {
  id: string;
  author: string;
  to: IdList;
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  folder: string;
  date: string;
  type: 'full';
  hasDoc: boolean;
  category?: string;
  doc?: {
    img: string[];
  }
};

export type DenormalizedUser = {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
};

export type DenormalizedData = {
  author: DenormalizedUser;
  to: DenormalizedUser[];
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  date: string;
  flag: string;
  folder?: string;
  doc?: {
    img: string | string[];
  }
}[];
