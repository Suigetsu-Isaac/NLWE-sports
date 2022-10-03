import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator,Screen} = createNativeStackNavigator();

import {Home} from '../screen/Home';
import {Game} from '../screen/Game';

export function AppRoutes(){

    return(
    <Navigator screenOptions={{headerShown: false}}>
        <Screen 
        name="home"
        component={Home}/>
        <Screen
        name="game"
        component={Game}
        />
    </Navigator>
    )
}