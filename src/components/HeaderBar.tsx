import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import Profilescreen from '../screens/Profilescreen';
import { useNavigation } from '@react-navigation/native';

interface HeaderBarProps {
  title?: string;
  
}

const HeaderBar: React.FC<HeaderBarProps> = ({title }) => {

  const navigation = useNavigation();
  const handelProfile = () => {

    navigation.navigate('Profile');
  }
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic  onPress={handelProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
