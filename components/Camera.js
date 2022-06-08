import React , {useState , useEffect , useRef} from 'react';
import { Pressable, Text, View  , StyleSheet , TouchableHighlight} from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import CircleButton from "./CircleButton.js"

const CameraComp = (props) => { 

    const[hasCameraPermission , setHasCameraPermission] = useState(null)
    const[type , setType] = useState(Camera.Constants.Type.back)
    const [display , setDisplay] = useState(<View/>)

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
            const data = new FormData();
            data.append('photo', {
                uri: result.uri,
                type: 'image/jpeg',
                name: 'test'
            });
            let resultServer = await SecureStore.getItemAsync('server')
            let resultPort = await SecureStore.getItemAsync('port')
            fetch(`http://${resultServer}:${resultPort}/getFiles`, {method: 'POST' , body: data}).then(response => response.json()).then(data => {
            console.log(data)
        })
            
           
        }
    }

    const changeCamera = () => {
        console.log("s")
        setType(type == Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back )
    }

    let camera
    
    const makePhoto = async () => {
        
        if (camera) {
                let foto = await camera.takePictureAsync();
                let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
                ToastAndroid.showWithGravity(
                    'zdjęcie wykonane',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                props.route.params.addPhoto(asset)
                props.navigation.navigate('s2')
            }
    }

    useEffect(async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status == 'granted')
    }, [])

    useEffect(() => {
        if(hasCameraPermission == null){
            setDisplay(<View style={{flex:1 , backgroundColor: "#ff0000" }}><Text>asasa</Text></View>)
        }else if(hasCameraPermission == false){
            setDisplay(<Text>Brak  dostępu do kamery</Text>)
        }else{
            setDisplay(<View style={{ flex: 1 }}>
                <Camera
                    
                    style={{ flex: 1 }}
                    type={type}
                    ref={(r) => {
                        camera = r
                        }}>
                    <View style={{ flex: 1 , display: "flex" , justifyContent:"space-around" , paddingBottom: 15 , alignItems: "flex-end" , flexDirection:"row" }}>
                        
                        <Pressable onPress={makePhoto} style={styles.buttons} >
                            <CircleButton type="cam" />
                        </Pressable>
                        <TouchableHighlight onPress={changeCamera} style={styles.buttons} >
                            <CircleButton type="rotate" />
                        </TouchableHighlight>
                         <TouchableHighlight onPress={imagePicker} style={styles.buttons} >
                            <CircleButton type="crop" />
                        </TouchableHighlight>
                        
                    </View>
                </Camera>
                
            </View>)
        }
    }, [hasCameraPermission , type])



    

    return(
        <View style={{flex:1}}>
            {display}
        </View> 
       
    );
}


const styles = StyleSheet.create({
    buttons:{
        width:100,
        height:100,
        borderRadius: 50,
        opacity: 0.7,
        backgroundColor:"#444444",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CameraComp;
