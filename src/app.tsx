import { useState } from "react";
import Footer from "./components/footer"
import Menu from "./components/menu";
import Modal from "./components/modal"
import { gamestate, player } from "./components/types";
import { useLocalStorage } from "./components/uselocalstorage";

const players:player[] =[
    {
        id:1,
        name:"player 1",
        iconclass:"fa-x",
        colorclass:"turquoise",
    },
    {
        id:2,
        name:"player 2",
        iconclass:"fa-o",
        colorclass:"yellow",
    },
];

function derivedgame (state:gamestate){
    const currentPlayer =players[state.currentmoves.length % 2];

        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];
        let winner=null;

        for(const player of players){
            const selectecsquareid=state.currentmoves.filter(move=>move.player.id===player.id).map(move=>move.squareid);
            for(const pattern of winningPatterns){
                if(pattern.every(v=>selectecsquareid.includes(v))){winner=player;}
            }
        }

        return{
            moves:state.currentmoves,
            currentPlayer,
            status:{
                iscomplete : winner!=null || state.currentmoves.length === 9,
                winner,
            },
        };
}

function derivedstats(state:gamestate){
    return {
            playerwithstats: players.map(player => {
            const wins=state.history.currentround.filter(game=>game.status.winner?.id===player.id).length;
            return{
                ...player,
                wins
            }
        }),
        ties:state.history.currentround.filter(game=>game.status.winner===null).length,
    };

}

export default function App(){

    
    const [state,setState]=useLocalStorage('game-state-key',{
        currentmoves:[],
        history:{
            currentround:[],
            allgames:[],
        }
        } as gamestate)
    const game=derivedgame(state);
    const stats=derivedstats(state);

    function hanleplayermove(squareid:number,player:player){
        setState((prev:gamestate) => {
            const stateclone= structuredClone(prev);
        stateclone.currentmoves.push({
            squareid,
            player
        });
        return(stateclone);
        })
    }


    function resetgame(checknewround:boolean){

        setState((prev:gamestate)=>{
            const stateclone= structuredClone(prev);
        const {status,moves}=game
        if(status.iscomplete){
            stateclone.history.currentround.push({
                moves,
                status,
            })
        }
        stateclone.currentmoves=[];

        if(checknewround){
            stateclone.history.allgames.push(...stateclone.history.currentround)
            stateclone.history.currentround=[]
        }
       return(stateclone);
        })
    }

    return(
        <div>
              <main>
                <div className="grid">
                
                <div className="turn" >
                    <i className={`fa-solid ${game.currentPlayer.iconclass} ${game.currentPlayer.colorclass}`}></i>
                    <p className={`${game.currentPlayer.colorclass}`}>{`${game.currentPlayer.name} ,you are up!`}</p>
                </div>
                <Menu onaction={(action)=>resetgame(action==='newround')}/>
                {[1,2,3,4,5,6,7,8,9].map((squareid)=>{
                    const existingMove=game.moves.find(move =>move.squareid=== +squareid);
                    return (
                        <div key={squareid} className="square shadow" onClick={()=>{
                            if(existingMove){return}

                            hanleplayermove(squareid,game.currentPlayer);
                        }}>
                        {existingMove && 
                        <i className={`fa-solid ${existingMove.player.colorclass} ${existingMove.player.iconclass}`}></i>
                        }
                    </div>);
                })}

                <div className="score shadow" style={{backgroundColor: "var(--turquoise)"}}>
                    <p>Player 1</p>
                <span data-id="p1-wins">{stats.playerwithstats[0].wins}</span>
                </div>
                <div className="score shadow" style={{backgroundColor: "var(--light-gray)"}}>
                    <p>Ties</p>
                    <span data-id="ties">{stats.ties}</span>
                </div>
                <div className="score shadow" style={{backgroundColor: "var(--yellow)"}}>
                <p>Player 2</p>
                <span data-id="p2-wins">{stats.playerwithstats[1].wins}</span>
                </div>
            </div>
        </main>
            <Footer/>
           { game.status.iscomplete && <Modal message={game.status.winner ?`${game.status.winner.name} wins!`:'Tie!'}
           onclick={()=>resetgame(false)}
           />}
        </div>
    )
}