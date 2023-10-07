export type player={
    id:number;
    name:string;
    iconclass:string;
    colorclass:string;
}
export type move={
    squareid:number;
    player:player;
}

export type gamestatus={
    iscomplete:boolean;
    winner:player|null;
}

export type game={
    moves:move[];
    status:gamestatus;
}



export type gamestate = {
    currentmoves:move[];
    history:{
        currentround:game[];
        allgames:game[];
    };
};