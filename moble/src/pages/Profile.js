import React from 'react';
import { WebView } from 'react-native-webview';

/**
 * 
 * @param navigation.getParam Recebe a chave do parametro passado
 */
const Profile = ({ navigation }) => {
    const githubUsername = navigation.getParam('github_username');
    return (
        <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
    );
}

export default Profile;