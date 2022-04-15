export interface SortingType {
  title: string;
  isActive: boolean;
}

export interface ChampionData {
  name: string;
  region: string;
  image: string;
  imagePosition: string;
  release_date: string;
}

export interface RegionData {
  name: string;
  total: number;
}

export enum SortedOption {
  AZ = "AZ",
  REGION = "Region",
  NEWEST = "Newest",
}
