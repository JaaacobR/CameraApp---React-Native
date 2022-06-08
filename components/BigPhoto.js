import React from 'react';
import { Text, View, Image, StyleSheet , Button  } from 'react-native';
import { Dimensions } from "react-native";
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import * as SecureStore from 'expo-secure-store';

const BigPhoto = (props) => {

    const uploadPhoto = async() => {
        const data = new FormData();
        data.append('photo', {
            uri: props.route.params.uri,
            type: 'image/jpeg',
            name: 'test'
        });

        let resultServer = await SecureStore.getItemAsync('server')
        let resultPort = await SecureStore.getItemAsync('port')
        fetch(`http://${resultServer}:${resultPort}/getFiles`, {method: 'POST' , body: data}).then(response => response.json()).then(data => {
            console.log(data)
        })
    }

    const sharePhoto = async () => {
        try {
      await Sharing.shareAsync('file://' + (props.route.params.uri).slice(5))
    } catch (error) {
        alert(error.message);
    }
    }
    const deletePhoto = async () => {
        await MediaLibrary.deleteAssetsAsync([props.route.params.id]);
        props.route.params.refresh(props.route.params.id)
        props.route.params.navigation.navigate('s2')
    }

    return(
        <View style={styles.container}>
            
            <Image style={{width: '97%' , height: '80%'}} source={{uri : props.route.params.uri}}/>
            <View style={styles.buttons}>
                <Button titleStyle={{
       color: "white",
       fontSize: 16,
   }} title="Share" onPress={sharePhoto}/>
                <Button titleStyle={{
       color: "white",
       fontSize: 16,
   }} title="Delete" onPress={deletePhoto}/>
    <Button titleStyle={{
       color: "white",
       fontSize: 16,
   }} title="Upload" onPress={uploadPhoto}/>
            </View>
        </View>
);
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: "#ff00ff"
    },
    buttons:{
        marginTop: 10,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent:"space-around",
        alignItems: 'center'
    }
})


export default BigPhoto;
