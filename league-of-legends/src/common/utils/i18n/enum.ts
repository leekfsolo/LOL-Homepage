export enum ScopeKey {
  LANG = "locale",
}

export enum ScopeValue {
  VIE = "vn",
  ENG = "en",
  KOR = "kr",
}

export interface localeItem {
  locale: string;
  code: string;
  isActive: boolean;
}
