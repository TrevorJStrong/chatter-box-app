import React from 'react';
import * as Contacts from 'expo-contacts';

export const useContact = () => {
  const [contacts, setContacts] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName],
        });

        if (data.length > 0) {
          // const contact = data[0];
          // console.log(contact);
          setContacts(data)
        }
      }
    })();
  }, []);

  return contacts;
};
