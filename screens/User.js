import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utils/colors';
import {fetchUserContact} from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const User = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {avatar, name, phone} = user;

  const getContacts = async () => {
    try {
      const response = await fetchUserContact();
      setUser(response);
      setLoading(false);
      setError(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && (
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      )}
    </View>
  );
};

User.navigationOptions = ({navigation: {navigate, toggleDrawer}}) => ({
  title: 'Me',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: colors.blue,
  },
  headerLeft: () => (
    <Icon
      name="menu"
      size={24}
      style={styles.iconLeft}
      onPress={() => toggleDrawer()}
    />
  ),
  headerRight: () => (
    <Icon
      name="settings"
      size={24}
      style={styles.iconRight}
      onPress={() => navigate('Options')}
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  iconLeft: {color: 'white', marginLeft: 10},
  iconRight: {color: 'white', marginRight: 10},
});

export default User;
