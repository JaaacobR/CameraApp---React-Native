import React from 'react';
import { Text, View, Image } from 'react-native';

const CircleButton = ({type}) => 
{
    const icon = type == "cam" ? require('../assets/Photo.webp') : (type == "rotate" ? require('../assets/rotate.png') : require('../assets/crop.webp') )
    return(
        <View>
            <Image style={{width:50 , height:50}} source={icon}/>
        </View>
    );
}

export default CircleButton;
