import {StyleSheet} from 'react-native';
import { THEME } from '../../theme';


export const styles = StyleSheet.create({

    container : {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: 24,
        justifyContent: 'space-between',
    },
    logo: {
        width: 72,
        height: 42,
    },
    right:{
        width: 20,
        height: 20
    },
    cover:{
        width: 311,
        height: 130,
        borderRadius: 8,
        marginTop: 24,
    },
    containerList:{
        width: '100%',
    },
    contentList:{
        paddingLeft:32,
        paddingRight:64,
        alignItems: 'flex-start',
    },
    emptyListText:{
        color: THEME.COLORS.CAPTION_300,
        fontSize:THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    },
    empytListContent:{
        flex:1, 
        alignItems:'center' ,
        justifyContent:'center'
    }
})
