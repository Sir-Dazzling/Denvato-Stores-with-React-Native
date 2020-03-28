import React, {useState, useEffect, useCallback} from 'react';
import { FlatList, Button, Platform, Alert, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/Products';

const AdminProductsScreen = (props) => 
{
  //Setting state for app loading items or not
  const [isLoading, setIsLoading] = useState(false);

  //Setting error of fetching process
  const [error, setError] = useState();

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => 
    {
        console.log("Loading Products");
        setError(null);
        setIsLoading(true);
        try
        {
            await dispatch(productActions.fetchProducts());
        } 
        catch(err)
        {
            setError(err.message);
        }
        setIsLoading(false);
    },[dispatch, setIsLoading, setError]);

    useEffect(() => 
    {
        loadProducts();
    },[dispatch, loadProducts]);

    //adding navigation listener
    useEffect(() => 
    {
        const willFocusSub = props.navigation.addListener("willFocus", loadProducts);

        return (() => {
            willFocusSub.remove();
        });
    }, [loadProducts]);

  const editProductHandler = (id) => {
    props.navigation.navigate('editProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        }
      }
    ]);
  };

  //Checking if an error ocured during processing fetch requests
  if(error)
  {
      <View style = {styles.spinner}>
          <Text>An Error Occured</Text>
          <Button title = "Try again" onPress = {loadProducts} color = {Colors.primary} />
      </View>
  }

  //Checking if app is still loading items or not
  if(isLoading)
  {
      return (
          <View style = {styles.centered}>
              <ActivityIndicator size = "large" color = {Colors.primary} />
          </View>
      );
  }

  //Checking if tere are no products to render or if list is empty
  if(!isLoading && products.length === 0)
  {
      return (
          <View style = {styles.centered}>
              <Text>No Products Found</Text>
          </View>
      );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

AdminProductsScreen.navigationOptions =(navData) => 
{
  return {
    headerTitle: 'Your Products',
    headerLeft: () =>
    (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => 
    (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('editProduct');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: 
  {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  }
});
export default AdminProductsScreen;