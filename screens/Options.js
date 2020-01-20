import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DetailListItem from '../components/DetailListItem';
import colors from '../utils/colors';

const Options = () => {
  return (
    <View style={styles.container}>
      <DetailListItem title="Update Profile" />
      <DetailListItem title="Change Language" />
      <DetailListItem title="Sign Out" />
    </View>
  );
};

Options.navigationOptions = ({navigation: {goBack}}) => ({
  title: 'Options',
  headerLeft: () => (
    <Icon name="close" size={24} style={styles.icon} onPress={() => goBack()} />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {color: colors.black, marginLeft: 10},
});

export default Options;
