import React, { FC } from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';


interface Props {
  
  onPress: any
}

const ProfilePic : FC <Props> = ({onPress}) => {

 
  return (
    // <View style={styles.ImageContainer}>
      <TouchableOpacity  onPress={onPress} style = {styles.ImageContainer}>
      <Image
        source={require('../assets/app_images/avatar.png')}
        style={styles.Image}
      />
      
      </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});

export default ProfilePic;
