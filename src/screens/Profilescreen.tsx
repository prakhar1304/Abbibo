import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, QuerySnapshot, DocumentData } from 'firebase/firestore';
import color from '../utility/color';
import MyButton from '../components/MyButton';

interface Address {
  id: string;
  name: string;
  houseNo: string;
  landmark: string;
  postalCode: string;
  phoneNumber: string;
}

export default function Profilescreen() {
  const navigation = useNavigation();
  const userUid = auth ?.currentUser?.uid;
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!userUid) {
          throw new Error('User not authenticated');
        }

        const addressCollectionRef = collection(db, 'users', userUid, 'userAddresses');
        const addressQuery = query(addressCollectionRef);
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(addressQuery);

        const fetchedAddresses: Address[] = [];
        querySnapshot.forEach((doc) => {
          const addressData = doc.data();
          fetchedAddresses.push({
            id: doc.id,
            name: addressData.name,
            houseNo: addressData.houseNo,
            landmark: addressData.landmark,
            postalCode: addressData.postalCode,
            phoneNumber: addressData.phoneNumber,
          });
        });

        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [userUid]);

  return (
    <View style={styles.container}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        {/* Display Profile Pic */}
        <Image source={require('../assets/app_images/avatar.png')} style={styles.profilePic} />
        {/* Display User Info */}
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <View key={address.id}>
              <Text style={styles.name}>{address.name}</Text>
              <Text style={styles.phoneNumber}>{address.phoneNumber}</Text>
              <Text style={styles.email}>{address.houseNo}, {address.landmark}, {address.postalCode}</Text>
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      {/* <MyButton title={'Login'} onPress={ navigation.navigate('Login')} /> */}

      {/* Bottom Container with Horizontal Components */}
      <View style={styles.bottomContainer}>
        {/* New Feature Component */}
        <View style={styles.horizontalComponent}>
          <Text style={styles.componentTitle}>New Feature</Text>
          {/* Your new feature content */}
        </View>

        {/* Social Media Handles Component */}
        <View style={styles.horizontalComponent}>
          <Text style={styles.componentTitle}>Social Media</Text>
          {/* Your social media handles content */}
        </View>

        {/* Contact Us Component */}
        <View style={styles.horizontalComponent}>
          <Text style={styles.componentTitle}>Contact Us</Text>
          {/* Your contact information content */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.gradiant1,
    padding: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  phoneNumber: {
    color: 'white',
    marginTop: 5,
  },
  email: {
    color: 'white',
    marginTop: 5,
  },
  bottomContainer: {
    marginTop: 20,
  },
  horizontalComponent: {
    marginBottom: 20,
  },
  componentTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
