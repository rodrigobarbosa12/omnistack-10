import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

/**
 * createAppContainer precisa estar em volta de todas as rotas
 * Rotas como Main, Profile, recebe de forma automatica uma propriedade
 */
const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: "DevRadar"
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Perfil do Github"
            }
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#7D40E7'
            },

        }
    })
);

export default Routes;
