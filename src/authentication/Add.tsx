import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import color from "../utility/color";
import { COLORS } from "../theme/theme";


interface Login_ScreenProps {
  navigation: any; // Change 'any' to the actual type if possible
  
}
// const Add: React.FC = ({navigation}:Login_ScreenProps ) => {
  export default function Add({ navigation }: Login_ScreenProps) {
  const [name, setName] = useState<string>("");
  const [houseNo, setHouseNo] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");

  const userUid = auth?.currentUser?.uid;
  // const navigation = useNavigation();


 
  const addAddress = async () => {
    try {
      if (!userUid) {
        throw new Error("User not authenticated");
      }

      const addressCollectionRef = collection(
        db,
        "users",
        userUid,
        "userAddresses"
      );

      const addressDocRef = await addDoc(addressCollectionRef, {
        name: name,
        houseNo: houseNo,
        landmark: landmark,
        postalCode: postalCode,
        phonenumber: phonenumber,
      });

      console.log("Address added:", addressDocRef.id);

      // Navigate to a specific tab upon successful address addition
      navigation.navigate("Tab");
    } catch (error) {
      console.log("Error adding address:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.primaryDarkGreyHex}}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Add a new Address
        </Text>

        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.primaryWhiteHex}
          style={styles.input}
        />

        <TextInput
          value={houseNo}
          onChangeText={(text) => setHouseNo(text)}
          placeholder="Shop Name, Flat, House No, Building"
          placeholderTextColor={COLORS.primaryWhiteHex}
          style={styles.input}
        />

        <TextInput
          value={landmark}
          onChangeText={(text) => setLandmark(text)}
          placeholder="Landmark (e.g., near Apollo Hospital)"
          placeholderTextColor={COLORS.primaryWhiteHex}
          style={styles.input}
        />

        <TextInput
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
          placeholder="Enter Pincode"
          placeholderTextColor={COLORS.primaryWhiteHex}
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          value={phonenumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Enter Phone number"
          placeholderTextColor={COLORS.primaryWhiteHex}
          keyboardType="numeric"
          style={styles.input}
        />

        <Pressable onPress={addAddress} style={styles.button}>
          <Text style={{ color: "white" }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#FEBE10",
    padding: 19,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

// export default Add;
