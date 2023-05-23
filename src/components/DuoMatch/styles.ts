import {StyleSheet} from 'react-native';
import { THEME } from '../../theme';


export const styles = StyleSheet.create({

    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.OVERLAY
    },
    content:{
        width: 311,
        backgroundColor: THEME.COLORS.SHAPE,
        borderRadius: 8,
        
    },
    closeIcon:{
        margin: 8,
        alignSelf: 'flex-end',
    },
    center:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    label :{
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginTop: 20,
        marginBottom: 8, 
    },
    discordButton :{
        width: 231,
        height: 48,
        backgroundColor: THEME.COLORS.BACKGROUND_900,
        borderRadius: 4,
        marginBottom: 32,
    },
    discord :{
        
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR
    }
})