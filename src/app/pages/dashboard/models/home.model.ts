export class HomeData {
  constructor(
    albumId: number,
    id: number,
    thumbnailUrl: string,
    title: string,
    url: string
  ) {
    this.albumId = albumId;
    this.id = id;
    this.thumbnailUrl = thumbnailUrl;
    this.title = title;
    this.url = url;
  }

  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}
