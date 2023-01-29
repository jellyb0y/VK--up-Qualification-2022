export enum Languages {
  Ru = 'ru',
  En = 'en',
}

export interface LanguagesProviderProps {
  lang?: Languages;
}

export type Context = {
  lang: Languages;
  setLang: (lang: Languages) => void;
};

export type LangTuple = [string, string];
