import { useEffect, useState } from "react";

import { GameCard } from "./components/GameCard";
import CreatedAdBanner from "./components/CreateAdBanner";
import CreateAdModal from "./components/CreateAdModal";

import logoImg from "./assets/logo-nlw-esports.svg";

import * as Dialog from "@radix-ui/react-dialog";

import "./styles/main.css";
import url from './tools/url';
import axios from "axios";
import FlatList  from 'flatlist-react';
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}
function App() {
  const [games, setGames] = useState<Game[]>([]);
  let widthScreen = window.screen.width;
  useEffect(() => {
    axios(url+"/games")
      .then((response) => {
        setGames(response.data);
      });
  }, []);

  function renderGame(game:Game){
    return (
      <GameCard
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              ads={game._count.ads}
            />
          )
   
  }
  

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo image" />
      <h1 className="md:text-[64px] text-[3rem] text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
        
        { widthScreen > 720 ? 

        <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              ads={game._count.ads}
            />
          );
        })}
      </div>
        
        :
        
        <div className=" mt-16 w-[80%] flex flex-row">
      <FlatList
          
          list={games}
          renderItem={renderGame}
          displayGrid
      />
      </div>
        
        }
        
        
      <Dialog.Root>
        <CreatedAdBanner />
        <CreateAdModal />

      </Dialog.Root>
    
    </div>
  );
}

export default App;
