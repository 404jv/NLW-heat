import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg';
import { UserPhoto } from '../UserPhoto';

export function Header() {
  return (
    <View style={styles.container}>
      <LogoSvg />

      <UserPhoto imageUri='https://github.com/404jv.png' />

      <TouchableOpacity>
        <Text style={styles.logoOutText}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}
