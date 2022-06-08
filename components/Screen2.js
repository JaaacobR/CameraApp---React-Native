import React , {useEffect , useState} from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import FotoItem from './FotoItem.js'
import * as SecureStore from 'expo-secure-store';
import Dialog from "react-native-dialog";


const Screen2 = (props) => {

  const [photos , setPhotos] = useState([])
  const [numColumns, setNumColumns] = useState(5)
  const [width, setWidth] = useState(1000)
  const [height, setHeight] = useState(1000)
  const [visible,setVisible] = useState(false)
  const [serverData , setServerData] = useState('')
  const [port , setPort] = useState('3000')
  
  
  
  const uploadSelected = () => {
      const data = new FormData();
        
        photos.forEach(item => {
          if(item.selected){
            data.append('photo', {
            uri: item.uri,
            type: 'image/jpeg',
            name: 'test'
        });
          }
        })
        
        fetch(`http://${serverData}:${port}/getFiles`, {method: 'POST' , body: data}).then(response => response.json()).then(data => {
            console.log(data)
        })
  }

  const showSettings = () => {
    setVisible(true)
  }

  const setNewServerData = async() => {
    await SecureStore.setItemAsync("server", serverData)
    await SecureStore.setItemAsync("port" , port)
  }
  

  const refresh = (id) => {
    const copyArray = photos.filter(item => {
      if(item.id != id){
        return item
      }
    })
    setPhotos([...copyArray])
  }

  const refreshMany = (idPhotos) => {
    alert(idPhotos)
    const copyArray = photos.filter(item => {
      if(!idPhotos.includes(item.id)){
        return item
      }
    })
    setPhotos([...copyArray])
  }

  const selectItem = (id) => {
    const copyArray = [...photos]
    photos.forEach((item,index) => {
      if(item.id == id){
        copyArray[index].selected = true
      }
    })
    setPhotos([...copyArray])
  }

  const removeSelected = async() => {
    let arrayOfId = []
    photos.forEach((item,index) => {
      if(item.selected){
        arrayOfId.push(item.id)
      }
    } )
    await MediaLibrary.deleteAssetsAsync(arrayOfId)
    refreshMany(arrayOfId)
    
  }

  const addPhoto = (photo) => {
    const copyArray = [...photos]
    console.log(photo)
    copyArray.unshift(photo)
    setPhotos([...copyArray])
  }

  const switchMode = () => {
    if(numColumns == 5){
      setNumColumns(1)
    }else{
      setNumColumns(5)
    }
  }

  useEffect(() => {
    setWidth(Dimensions.get("window").width/numColumns - 10)
  }, [numColumns])

  useEffect( async () => {
    setWidth(Dimensions.get("window").width/numColumns - 10) 
    setHeight(width) 

    let result = await SecureStore.getItemAsync("server")
    if(result){
      setServerData(result)
    }else{
      await SecureStore.setItemAsync("server", "192.168.100.3")
      setServerData("192.168.100.3")
    }

    let portRes = await SecureStore.getItemAsync("port")
    if(portRes){
      setPort(portRes)
    }else{
      await SecureStore.setItemAsync("port",'3000')
      setPort('3000')
    }

    let {status} = await MediaLibrary.requestPermissionsAsync()
    if(status != 'granted'){
      alert('brak uprawnien')
    }else{
      let obj = await MediaLibrary.getAssetsAsync({
      first:100,
      mediaType: 'photo'
    })
    //alert(JSON.stringify(obj.assets, null , 4))
    obj.assets.reverse()
    let objects = obj.assets.map(item => {
      let itemek = item 
      itemek['selected'] = false 
      return itemek
    })
    console.log(objects)
    setPhotos(objects)
    }
    
    
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableHighlight onPress={switchMode}>
          <Text>Grid/List</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            props.navigation.navigate("Camera", { addPhoto: addPhoto });
          }}
        >
          <Text>Camera</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={removeSelected}>
          <Text>Remove Selected</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={uploadSelected}>
          <Text>Upload Selected</Text>
        </TouchableHighlight>
         <TouchableHighlight onPress={showSettings}>
          <Text>Settings</Text>
        </TouchableHighlight>
        
      </View>
      <FlatList
        numColumns={numColumns}
        key={numColumns}
        data={photos}
        renderItem={({ item }) => (
          <FotoItem
            width={width}
            height={height}
            uri={item.uri}
            id={item.id}
            selected={item.selected}
            navigation={props.navigation}
            refresh={refresh}
            selectItem={selectItem}
          />
        )}
      />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Input value={serverData}></Dialog.Input>
        <Dialog.Input value={port}></Dialog.Input>
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setVisible(false);
          }}
        />
        <Dialog.Button label="Set" onPress={setNewServerData} />
      </Dialog.Container>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff00ff",
    height: "100%"
  },
  btnContainer:{
    display: "flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems: "center"
  }
})

export default Screen2;
