export interface TranslationData {
  resources: Resources;
}

interface Resources {
  translation: Translation;
}

interface Translation {
  nl: { [key: string]: string };
  en: { [key: string]: string };
}
