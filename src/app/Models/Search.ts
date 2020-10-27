export class Search{
    Title:string;
    Year:string;
    imdbID:string;
    Type:string;
    Poster:string;
}

export class SearchResult{
    Search:[Search];
    totalResult:string;
    Response:string;
}