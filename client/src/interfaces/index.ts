export interface Artist{
    id: number;
    name: string;
    
}

export interface Album {
  id: number;
  name: string;
  artwork: string;
  artistId: number;
}

export interface iTuneResult{
    resultCount: number;
    results: any[]
}