import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colors';

const keyExtractor = ({phone}) => phone;

const Contacts = ({navigation: {navigate}}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const renderContact = ({item}) => {
    const {name, avatar, phone} = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate('Profile', {contact: item})}
      />
    );
  };

  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={sortedContacts}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

Contacts.navigationOptions = ({navigation: {toggleDrawer}}) => ({
  title: 'Contacts',
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
  icon: {color: colors.black, marginLeft: 10},
});

export default Contacts;
