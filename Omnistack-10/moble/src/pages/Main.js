import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

/**
 * @function requestPermissionsAsync Pede permisão para usar a localização
 * @function getCurrentPositionAsync Pega a localização
 * @param enableHighAccuracy usa a lozalização do gps
 * @component Marker marca uma localização
 * @param navigation é passado automaticamente
 */
const Main = ({ navigation }) => {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState(null);

    useEffect(() => {
        const loadInitialPosition = async () => {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                   latitude,
                   longitude,
                   latitudeDelta: 0.04,
                   longitudeDelta: 0.04,
                });
            }            
         };

         loadInitialPosition();
    }, []);

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);

    const setupWebsocket = () => {
        disconnect();

        const { latitude, longitude } = currentRegion;

        connect(latitude, longitude, techs);
    }

    const loadDevs = async () => {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: { 
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs);
        setupWebsocket();
    };

    const handleRegionChanged = (region) => setCurrentRegion(region);

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion} 
                style={style.map}
            >
                {devs.map(({
                    _id,
                    location,
                    github_username,
                    avatar_url,
                    name,
                    bio,
                    techs,
                }) => (
                    <Marker 
                        key={_id}
                        coordinate={{ 
                            latitude: location.coordinates[0], 
                            longitude: location.coordinates[1], 
                        }}
                    >
                        <Image 
                            style={style.avatar} 
                            source={{ uri: avatar_url }} 
                        />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username })
                        }} >
                            <View style={style.callout}>
                                <Text style={style.devName}>{name}</Text>
                                <Text style={style.devBio}>{bio}</Text>
                                <Text style={style.devTech}>{techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={style.searchForm }>
                <TextInput 
                    style={style.searchInput}
                    placeholder="Buscar dev por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={style.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    );
};

const style = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,   
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTech: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        //bottom: 30, embaixo
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    /**
     * @prop shadowColor é para IOS
     * @prop elevation é para Android
     */
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
});

export default Main;