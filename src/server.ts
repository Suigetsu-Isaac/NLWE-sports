import express from 'express';
import {PrismaClient} from '@prisma/client';
import {convertHoursStringToMinutes} from './convert-hours-string-to-minute';
import {convertMinutesAmountToHourString} from './convert-minutes-amount-to-hours-string'
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors());
// O prisma Cliente funciona é uma classe logo devemos instanciala
const prisma = new PrismaClient()

// o primeiro parametro é o caminho, e o segundo é a função

app.post("/games/:id/ads", async (request,response) =>{

    const gameId = request.params.id

    const body = request.body

    const ad = await prisma.ad.create({
        data : {
            gameId,
            name: body.name,
            yearsPlaying : body.yearsPlaying,
            discord : body.discord,
            weekDays : body.weekDays.join(','),
            hoursStart : convertHoursStringToMinutes(body.hoursStart),
            hoursEnd : convertHoursStringToMinutes(body.hoursEnd),
            useVoiceChannel : body.useVoiceChannel,
        }
    })


    // resposta que retorna o json caso o status seja igual a 201
    return response.status(201).json(ad)

})

app.post('/games/:pass', async (request,response) =>{
    const pass:string = request.params.pass
    
    if (pass === "LetRiper"){
        const body = request.body 

        const game = await prisma.game.create({
            data:{
                title: body.title,
                bannerUrl: body.bannerUrl
            }
        })
        response.status(201).json(game)
    } else{
        return response.status(404).send();
    }
} )

app.put('/games/:id/:pass',async(request,response)=>{
    const pass:string = request.params.pass

    if (pass === "Demise"){

        const id = request.params.id
        const body = request.body

        const game = await prisma.game.update({
            where:{
                id:id
            },data:{
                title: body.title,
                bannerUrl: body.bannerUrl
            }
        })
        response.status(201).json(game)
    }
    else{
        return response.status(404).send()
    }
})

app.get("/games", async (request,response) => {
    
    const games = await prisma.game.findMany(
        {include: 
            {
                _count : {
                    select: {
                        ads : true
                    }
                }
            }
        }
    );
    

    return response.json(games)
})

app.get("/games/:id/ads", async(request,response) => {
   const gameId =  request.params.id
 
   const ads = await prisma.ad.findMany(
       {select: {
           id : true,
           name: true,
           weekDays: true,
           hoursStart: true,
           hoursEnd: true,
           useVoiceChannel: true,
           yearsPlaying: true,

       },
       where : {gameId,},
       orderBy: {createdAt: 'desc'} 
    }
   )

    return response.json(ads.map(
        ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hoursStart: convertMinutesAmountToHourString(ad.hoursStart),
                hoursEnd: convertMinutesAmountToHourString(ad.hoursEnd)
            }
        }
    ))
})

app.get("/ads/:id/discord", async (request,response) => {
    const adId =  request.params.id
 
    const discord = await prisma.ad.findUniqueOrThrow({
        select : {
            discord: true,
        },where: {
            id: adId
        }
    })

    return response.json(discord)
})


app.listen(3333, ()=>{
    console.log('server running');
})
