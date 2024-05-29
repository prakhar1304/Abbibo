import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import MyButton from '../components/MyButton';
import MyTextInput from '../components/MyTextInput';
import color from '../utility/color';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Login_ScreenProps {
    navigation: any; // Change 'any' to the actual type if possible
    
}

export default function Login_Screen({ navigation }: Login_ScreenProps) {
    // const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPasswword] = useState("");

      useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
            navigation.replace('Tab');
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    checkLoginStatus();
  }, []);

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password,);
            const user = userCredential.user;

            if (user) {
                const token = await user.getIdToken();
                await AsyncStorage.setItem("auth", token);
                // console.log("token" , user)
                navigation.replace('Tab'); // Navigate to the 'Tab' screen
            } else { 
                throw new Error("User not found");
            }
        } catch (error) {
            console.log("Login Error:", error);
            Alert.alert("Login Error", "Invalid credentials. Please try again.");
        }
    };

    return (

        <View style={styles.Container}>
            <LinearGradient start={{x: 0, y: 0}} 
                                end={{x: 1, y: 0}} 
                                colors={[color.gradiant1, color.gradiant ]} 
                                style={styles.Container}>
            <ImageBackground
                source={require('../assets/app_images/circle.png')}
                style={styles.loginScreen}
            >
                {/* <Image
          source={require('./../../../image/OneDrive-2024-02-07/logo.png')}
          style={styles.LogoImage}
        /> */}

                <View style={{ position: "relative", top: "5%" }} >
                    <Text style={styles.Title} >
                        party
                    </Text>
                </View>

             {/* <NeuMorph > */}
                {/* <View style={styles.innerContainer}> */}
                <LinearGradient start={{x: 0, y: 0}} 
                                end={{x: 1, y: 0}} 

                                // ['#242831', '#414345']
                                
                                colors={[color.Offwhite, color.Offwhite]} 
                                style={styles.innerContainer}>

                    

                    
                        <MyTextInput style={styles.inputText}
                            value={email}
                            onChangeText={(text: string) => setEmail(text)}
                            placeholder="Enter E-Mail" placeholderTextColor = {color.white}
                        />
                    

                   
                        <MyTextInput style={styles.inputText}
                            value={password}
                            onChangeText={(text: string) => setPasswword(text)}
                            placeholder="Password"
                            secureTextEntry
                            placeholderTextColor = {color.white}
                        />

                    
                        <Text
                            style={styles.TextAccount}
                            onPress={() => navigation.navigate("Signin_Screen")}
                        >
                            Don't Have an account yet ?
                        </Text>


                  

                    <MyButton title={"LOGIN"} onPress={handleLogin} />
                    


                    {/* <Text style={styles.Ortext}>OR</Text> */}
                    {/* <MyButton title={"LOGIN WITH GOOGLE"} onPress={onGoogleButtonPress} /> */}

                    </LinearGradient>
                {/* </View> */}
                

            </ImageBackground>

            

            </LinearGradient>
             
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

    loginScreen: {
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%'),
        alignItems: 'center',
    },

    Title: {
        textAlign: 'center',
        fontSize: widthPercentageToDP('7%'),
        color: color.Offwhite,
        marginTop: heightPercentageToDP('10%'),
        fontFamily: "Cardo-Bold"
    },

    LogoImage: {
        height: heightPercentageToDP('15%'),
        width: widthPercentageToDP('40%'),
        position: 'absolute',
        left: 0,
        top: 0,
    },

    innerContainer: {
        height: heightPercentageToDP('50%'),
        width: widthPercentageToDP('90%'),
        // backgroundColor: color.BLACK,
        borderRadius: widthPercentageToDP('5%'),
        paddingHorizontal: widthPercentageToDP('10%'),
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        top: "13%",
        shadowRadius: 2,
        shadowOffset: {
          width: 100,
          height: 100,
        },
        shadowColor:color.BLACK,
        elevation: 5,
    },

    TextAccount: {
        alignSelf: "flex-end",
        marginRight: widthPercentageToDP('5%'),
        color: color.PRIMARY,
        marginBottom: heightPercentageToDP('1%'),
        fontWeight: '400',
        fontSize: widthPercentageToDP('4%'),
    },

    Ortext: {
        fontSize: widthPercentageToDP('6%'),
        color: color.PRIMARY,
        marginTop: heightPercentageToDP('1%'),
        marginBottom: heightPercentageToDP('1%'),
    },
    inputText: {
        color: color.white,
        
    },

    linearGradient:{},

    inner:{
      backgroundColor:color.PRIMARY,
      alignItems:"center",
      justifyContent:"center",
      borderColor:color.Offwhite,
      borderWidth:1
    },
   
    topShadow:{
        shadowOffset:{
            width:-6,
            height: -6
        },

        shadowOpacity:1,
        shadowRadius:6,
        shadowColor:"FBFFFF"
    },
    bottomShadow:{
        shadowOffset:{
            width:  6,
            height: 6
        },

        shadowOpacity:1,
        shadowRadius:6,
        shadowColor:"B7C4DD"
    }

});
