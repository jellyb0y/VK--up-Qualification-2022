export type IdList = string[];

export type Entity<T> = {
  ids: IdList;
  entities: {
    [id: string]: T;
  };
};

export type FoldersEntity = Entity<IdList>;

export type UsersEntity = Entity<User>;

export type LettersEntity = Entity<Letter>;

export type Data = {
  folders: FoldersEntity;
  users: UsersEntity;
  letters: LettersEntity;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar?: string;
};

export type Letter = {
  id: string;
  author: User;
  to: User[];
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  folder: string;
  date: string;
  doc?: {
    img: string;
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
  folder?: string;
  doc?: {
    img: string;
  }
}[];
