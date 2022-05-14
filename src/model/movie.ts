export class Movie {
  id: number;
  title: string;
  poster: string;
  detail: string;
  movieStatus: boolean;
  linkTrailer: string;
  linkMovie: string;
  releaseDate: string;
  movieDuration: string;
  viewNumber: number;

  constructor(id: number,
              title: string,
              poster: string,
              detail: string,
              movieStatus: boolean,
              linkTrailer: string,
              linkMovie: string,
              releaseDate: number[],
              movieDuration: string,
              viewNumber: number
  ) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.detail = detail;
    this.movieStatus = movieStatus;
    this.linkTrailer = linkTrailer;
    this.linkMovie = linkMovie;
    this.releaseDate = releaseDate[2] + '-' + releaseDate[1] + '-' + releaseDate[0];
    this.movieDuration = movieDuration;
    this.viewNumber = viewNumber;
  }
}
