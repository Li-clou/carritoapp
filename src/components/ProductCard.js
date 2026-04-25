import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity} from "react-native";

export default function ProductCard({name,price,image,description,navigation}){
  return(
    <TouchableOpacity
      style={styles.card}
      onPress={()=>
        navigation.navigate("ProductDetail",{
          name:name,
          price:price,
          description:description,
          image:image,
        })


      }
    >

      <Image source={{uri:image}} style={styles.image}/>

      <View style={styles.infoContainer}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>${price}</Text>
          <Text style={styles.productDescription}>{description}</Text>

      </View>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:6,
    shadowOffset:{width:0,height:3},
  },
  image: {
    width: "100%",
    height: 180,
  },
  infoContainer: {
    padding: 14,
  },
  productName: {
    fontSize: 17,
    fontWeight: "700",
    color:"#111"
  },
  productDescription: {
    fontSize: 15,
    color:"#111"
  },
  productPrice: {
    marginTop:6,
    fontSize: 16,
    color: "#666",
  }
});