import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {fetchContacts} from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const keyExtractor = ({phone}) => phone;

const Favorites = ({navigation: {navigate}}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const favorites = contacts.filter(contact => contact.favorite);

  const getContacts = async () => {
    try {
      const response = await fetchContacts();
      setContacts(response);
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

  const renderFavoriteThumbnail = ({item}) => {
    const {avatar} = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', {contact: item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

Favorites.navigationOptions = ({navigation: {toggleDrawer}}) => ({
  title: 'Favorites',
  headerLeft: () => (
    <Icon
      name="menu"
      size={24}
      style={styles.icon}
      onPress={() => toggleDrawer()}
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
  icon: {color: colors.black, marginLeft: 10},
});

export default Favorites;
