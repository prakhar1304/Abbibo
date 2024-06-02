import { View, Text, Image, ImageBackground, StyleSheet, Alert } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MyButton from '../components/MyButton';
import MyTextInput from '../components/MyTextInput';
import color from '../utility/color';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

interface Signin_ScreenProps {
    navigation: any; // Change 'any' to the actual type if possible

}

export default function Signin_Screen({ navigation }: Signin_ScreenProps) {
    // const { signup } = useAuth();
    // const [userName, setUserName] = useState("");
    // const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


  
      
        const handleRegister = async () => {
          try {
            // Input validation
            if (!email || !password ) {
              throw new Error('Email and password are required.');
            }
      
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password,
              

            );
            const user = userCredential.user;
            const myUserUid = user.uid;
      
            await sendEmailVerification(user);
            await setDoc(doc(db, 'users', myUserUid), {
              email: user.email,
            });
      
            setEmail('');
            setPassword('');
      
            // Navigate to login screen after successful registration
            navigation.replace('Add');

          } catch (error) {
            console.error('Registration error:', error);
            // Handle registration error
            // You can display the error message to the user
          }
        };




    return (
        <View style={styles.Container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[color.gradiant1, color.gradiant]}
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
                            abibo
                        </Text>
                    </View>

                    {/* <View style={styles.innerContainer}> */}


                    <LinearGradient start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[color.Offwhite, color.Offwhite]}
                        style={styles.innerContainer}>
                         
                    {/* <MyTextInput onChangeText={(text: string) => setUserName(text)} placeholder="Name"  placeholderTextColor = {color.white}/>
                    <MyTextInput onChangeText={(text: string) => setPhone(text)} placeholder="Phone Number"  placeholderTextColor = {color.white} /> 
                    <MyTextInput onChangeText={(text: string) => setShopName(text)} placeholder="Shope Name"  placeholderTextColor = {color.white} />  */}
                    
                        <MyTextInput
                            value={email}
                            onChangeText={(text: string) => setEmail(text)}
                            placeholder="Enter E-Mail " placeholderTextColor={color.white}
                        />
                        <MyTextInput
                            value={password}
                            onChangeText={(text: string) => setPassword(text)}
                            placeholder="Password" placeholderTextColor={color.white}
                            secureTextEntry
                        />
                        <MyTextInput
                            value={confirmPassword}
                            onChangeText={(text: string) => setConfirmPassword(text)}
                            placeholder="Confirm Password"
                            secureTextEntry
                            placeholderTextColor={color.white}
                        />

                        <MyButton onPress={handleRegister} title={"Sign up"} />
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
        color: "red",
        marginTop: heightPercentageToDP('10%'),
        fontFamily: 'Cardo-Regular',

    },

    LogoImage: {
        height: heightPercentageToDP('15%'),
        width: widthPercentageToDP('40%'),
        position: 'absolute',
        left: 0,
        top: 0,
    },

    innerContainer: {
        height: heightPercentageToDP('60%'),
        width: widthPercentageToDP('90%'),
        backgroundColor: color.BLACK,
        borderRadius: widthPercentageToDP('5%'),
        paddingHorizontal: widthPercentageToDP('10%'),
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        top: "10%",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: color.BLACK,
        elevation: 5,

    },
});
