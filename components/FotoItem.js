import { useLinkProps } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";

const FotoItem = ({
  width,
  height,
  uri,
  id,
  navigation,
  refresh,
  selected,
  selectItem
}) => {
  const press = () => {
    navigation.navigate("Wybrane zdjecie", {
      uri: uri,
      id: id,
      refresh: refresh,
      navigation: navigation,
    });
  };

  return (
    <View>
      <TouchableHighlight onPress={press} onLongPress={()=> {selectItem(id)}}>
        <Image
          
          style={selected ? { width: width, height: width,margin: 3,borderRadius: 20 } : {width: width, height: width,margin: 3,borderRadius: 10} }
          source={{ uri: uri }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default FotoItem;
