import { useState,useEffect,FormHTMLAttributes, FormEvent } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToogleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import axios from 'axios';



interface Game {
  id: string;
  title: string;
}

export default function CreateAdModal() {
  
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays,setWeekDays] = useState<string[]>(['']);
  const [useVoiceChannel,setUseVoiceChannel] = useState<boolean>(false);  

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
        setGames(response.data);
      });
  }, []);
  

  async function handleFormSubmit(event : FormEvent){
    event.preventDefault()
 
    const formData = new FormData(event.target as HTMLFormElement)

    const data = Object.fromEntries(formData)
    try{
   await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
        
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hoursStart:data.hoursStart,
          hoursEnd:data.hoursEnd,
          useVoiceChannel: useVoiceChannel
        
      })
      alert('cadastrado com sucesso')
    }
    catch(err){
      console.error(err)
      alert('Erro no cadastro')
    }
  }

  
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black ">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleFormSubmit} className="mt-8 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <select
              id="game"
              name="game"
              defaultValue={'teste'}
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option disabled  >
              Selecione o game que deseja jogar
              </option>

              {games.map((item) => {
                return <option key={item.id} value={item.id}>  {item.title} </option>
              })
            } 
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input id="discord"
              name="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando constuma jogar?</label>
              <ToogleGroup.Root className="grid grid-cols-4 gap-2" type="multiple" onValueChange={setWeekDays}>

                <ToogleGroup.Item value="0"
                 
                title="Domingo" 
                className={`w-8 h-8 rounded ${weekDays.includes('0')? 'bg-violet-500': 'bg-zinc-900'}`}>
                  D
                </ToogleGroup.Item>

                <ToogleGroup.Item value="1" 
                title="Segunda" 
                className={`w-8 h-8 rounded ${weekDays.includes('1')? 'bg-violet-500': 'bg-zinc-900'}`}>
                  S
                </ToogleGroup.Item>

                <ToogleGroup.Item value="2" 
                title="Terça" 
                className={`w-8 h-8 rounded ${weekDays.includes('2')? 'bg-violet-500': 'bg-zinc-900'}`}>
                  T
                </ToogleGroup.Item>

                <ToogleGroup.Item value="3" 
                title="Quarta" 
                className={`w-8 h-8 rounded ${weekDays.includes('3')? 'bg-violet-500': 'bg-zinc-900'}`}>
                  Q
                </ToogleGroup.Item>

                <ToogleGroup.Item value="4" 
                title="Quinta" 
                className={`w-8 h-8 rounded ${weekDays.includes('4')? 'bg-violet-500': 'bg-zinc-900'}`}>
                  Q
                </ToogleGroup.Item>

                <ToogleGroup.Item value="5" 
                title="Sexta" 
                className={`w-8 h-8 rounded ${weekDays.includes('5')? 'bg-violet-500': 'bg-zinc-900'}`}>
                  S
                </ToogleGroup.Item>

                <ToogleGroup.Item value="6" 
                title="Sábado" 
                className={`w-8 h-8 rounded ${weekDays.includes('6')? 'bg-violet-500': 'bg-zinc-900'}`}>
                  S
                </ToogleGroup.Item>
                
            
              </ToogleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart">Qual horário do dia?</label>

              <div className="grid grid-cols-2 gap-2">
                <Input id="hoursStart" name="hoursStart" type="time" placeholder="De" />
                <Input id="hoursEnd" name="hoursEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div> 
          <label className="mt-2 flex gap-2 text-sm">
            <Checkbox.Root onCheckedChange={(checked) =>{
              if(checked === true) setUseVoiceChannel(true)
              else setUseVoiceChannel(false)
            }} className="w-6 h-6 p-1 rounded bg-zinc-900">
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Constumo me conectar no chat de voz
          </label>

          <footer className="mt-4 flex items-center justify-end  gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 text-white font-semibold rounded-md hover:bg-zinc-600 ">
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 text-white font-semibold rounded-md flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController className="h-6 w-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
