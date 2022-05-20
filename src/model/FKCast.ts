export class FKCast {
  public movieDetailId: number;
  public movieCastId: number;

  constructor(movieDetailId: number, movieCastId: number) {
    this.movieDetailId = movieDetailId;
    this.movieCastId = movieCastId;
  }
}
