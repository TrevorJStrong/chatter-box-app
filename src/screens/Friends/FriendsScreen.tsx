import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";

const FriendsScreen = ({ navigation }) => {

    const [search, setSearch] = React.useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
          headerSearchBarOptions: {
            onChangeText: (event) => setSearch(event.nativeEvent.text),
            onClear: () => setSearch(''),
            placeholder: 'Search Friends',
            hideWhenScrolling: false
          },
        });
    }, [navigation]);

    return (
        <View>
        </View>
    );
};

export default FriendsScreen;