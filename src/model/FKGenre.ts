export class FKGenre {
  public movieDetailId: number;
  public movieGenreId: number;

  constructor(movieDetailId: number, movieGenreId: number) {
    this.movieDetailId = movieDetailId;
    this.movieGenreId = movieGenreId;
  }
}
