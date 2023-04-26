export type MovieType = {
    id: number;
    title: string;
    poster_path: string;
    // overview: string;
    // release_date: string;
    // vote_average: number;
};

// export type Ref = React.RefObject<HTMLDivElement|null>;
export type Ref = React.RefObject<HTMLDivElement> | null;
// export type Ref = React.RefObject<HTMLDivElement> | null;