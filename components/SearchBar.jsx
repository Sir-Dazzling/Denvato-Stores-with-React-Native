import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class CustomSearchBar extends React.Component 
{
    state = {
      search: '',
    };
  
    updateSearch = search => {
      this.setState({ search });
    };
  
    render() {
      const { search } = this.state;
      return (
      <View style = {styles.searchBarContainer}>  
        <SearchBar
          placeholder="Search for any item..."
          placeholderTextColor = {"black"}
          searchIcon = {{color: "black"}}
          onChangeText={this.updateSearch}
          value={search}
          round = {true}
          inputContainerStyle = {{backgroundColor: "silver", width: "85%"}}
          inputStyle = {{color: "black"}}
          containerStyle = {{backgroundColor: "transparent",borderBottomWidth: 0}}
          lightTheme = {true}  
        />
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  searchBarContainer: 
  {
        opacity: 0.8,
        width: "100%",
        marginLeft: 30
  }
}); 
