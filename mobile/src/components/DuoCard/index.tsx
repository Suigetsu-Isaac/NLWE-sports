import {View, Text, TouchableOpacity} from 'react-native';

import {GameController} from 'phosphor-react-native';

import { THEME } from '../../theme';
import {styles} from './styles';

import { DuoInfo } from '../DuoInfo';
export interface DuoCardProps{
    id: string,
    name: string,
    hoursStart: string,
    hoursEnd: string,
    weekDays:  string[],
    yearsPlaying: number,
    useVoiceChannel: boolean,
}

interface Props {
    data: DuoCardProps,
    onConnect: () => void,
}


function sInEnd(cond: number){

    if (cond >= 2) return 's' 
    return '';
    
}

export function DuoCard ({data, onConnect}:Props){

    return(
        <View style = {styles.container}>
            <DuoInfo label="Nome" value={data.name}/>
            <DuoInfo label="Tempo de Jogo" value={`${data.yearsPlaying} ano${sInEnd(data.yearsPlaying)}`}/>
            <DuoInfo label="Disponibilidade"
             value={`${data.weekDays.length} dia${sInEnd(data.weekDays.length)} \u2022 ${data.hoursStart} - ${data.hoursEnd}`}/>
            <DuoInfo label="Camada de áudio" value={data.useVoiceChannel? 'Sim':'Não' } colorValue= {
                data.useVoiceChannel? THEME.COLORS.SUCCESS:THEME.COLORS.ALERT
            }/>

            <TouchableOpacity style={styles.button} onPress={onConnect}>
                <GameController
                    color={THEME.COLORS.TEXT}
                    size={24}
                />

                <Text style={styles.buttonTitle} >Conectar</Text>

            </TouchableOpacity>

        </View>
    )
}