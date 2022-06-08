import React , {useEffect , useState} from "react";
import { Text, View , Button, Pressable , StyleSheet } from "react-native";
import * as Font from "expo-font";

const Screen1 = (props) => {
  const [fontLoaded , setFontLoaded] = useState(false)

  useEffect(async () => {
    await Font.loadAsync({'myfont': require('./coffe.ttf'),})
    setFontLoaded(true)
  }, [])
  return (
     
    <View style={styles.main}>
        {fontLoaded ? <Text style={{fontFamily: 'myfont' , fontSize: 50}}>Photos App</Text> : null}
        <Pressable style={styles.button} onPress={() => {props.navigation.navigate('s2')}}>
            <Text style={styles.text}>Show Gallery pictures</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        height: "100%",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ff0000"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})

export default Screen1;
