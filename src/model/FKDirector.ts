export class FKDirector {
  public movieDetailId: number;
  public movieDirectorId: number;

  constructor(movieDetailId: number, movieDirectorId: number) {
    this.movieDetailId = movieDetailId;
    this.movieDirectorId = movieDirectorId;
  }
}
