interface GameCardProps{
    bannerUrl: string,
    title: string,
    ads: number,
}


export function GameCard(props: GameCardProps){


    function adsCont(ads:number){

        if(ads<2){
            return ads + " anúncio"
        }else{
            return ads + " anúncios"
        }
    }

    return (
        <a href="" className="relative rounded-lg overflow-hidden">
        <img src={props.bannerUrl} alt="jogo 1"/>

        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">

          <strong className= "text-white font-bold block">{props.title}</strong>
          <span className= "text-zinc-300 font-normal text-sm block">
              {adsCont(props.ads)}
              </span>
        </div>

      </a>
    )
}