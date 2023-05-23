import {Image, FlatList} from 'react-native';
import {useEffect,useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles'
import uri from '../../utils/routes'
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { useNavigation } from  '@react-navigation/native';
import React from 'react';

export function Home (){


    const [games,setGames] = useState<GameCardProps[]>([]);

    useEffect(() => {

        fetch(uri+'/games')
        .then(response => response.json())
        .then(data => setGames(data))
    },[])

   const navigation = useNavigation(); 
    function handleOpenGame({id,title,bannerUrl}:GameCardProps){
        navigation.navigate('game',{id,title,bannerUrl});
    }

   return(
    <Background>
       <SafeAreaView style = {styles.container}>
           <Image 
            source={logoImg}
            style={styles.logo}
           />

        <Heading 
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
        />   
       
<FlatList
    data = {games}
    keyExtractor = {(item) => item.id}
    horizontal
    contentContainerStyle={styles.contentList}
    showsHorizontalScrollIndicator={false}
    renderItem= {
     ({item}) => (
        <GameCard data= {item} onPress= {() => handleOpenGame(item)}/>
    )}
/>
       </SafeAreaView>
       </Background>
   )

}