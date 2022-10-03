import { View, Modal, ModalProps, Text, Alert, ActivityIndicator,TouchableOpacity } from "react-native";

import {MaterialIcons} from "@expo/vector-icons";
import { THEME } from "../../theme";
import { styles } from "./styles";
import {CheckCircle} from 'phosphor-react-native';
import { Heading } from "../Heading";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";
interface Props extends ModalProps{
    discord: string,
    onClose: () => void
}

export function DuoMatch({discord,onClose,...rest}:Props) {

  const [isCopping,setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord);
   
    Alert.alert('Discord Copiado!','usuário copiado com sucesso, agora é só encontrar o seu duo no discord!!')
    setIsCopping(false)
    
  }

  return (
    <Modal {...rest} transparent animationType="fade">
      <View style={styles.container}>
        
        <View style={styles.content}>
        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons 
                name="close"
                size={24}
                color={THEME.COLORS.CAPTION_500}
            />
        </TouchableOpacity>
       
        <View style = {styles.center}>
        <CheckCircle 
        size={64}
        color={THEME.COLORS.SUCCESS}
        weight="bold"
        />
        <Heading 
          title="Let's play!"
          subtitle="Agora é só começar a jogar!"
          style={[styles.center,{marginTop:24}]}
        />
        <Text style={[styles.discord,styles.label]}>Adicione o Seu Discord</Text>
        
        <TouchableOpacity disabled={isCopping} style={[styles.discordButton,styles.center]} onPress={handleCopyDiscordToClipboard}>
        <Text style={styles.discord}>
            { isCopping? <ActivityIndicator color={THEME.COLORS.PRIMARY} />:discord}
        </Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    </Modal>
  );
}
