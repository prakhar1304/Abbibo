import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';


const CartScreen = ({navigation, route}: any) => {
  const [price, setPrice] = useState<string>("");

  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  
  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
    
    if (CartPrice !== undefined) {
      addOrder();
    } else {
      console.log("CartPrice is undefined. Cannot place order.");
    }
  
  };
  const userUid = auth?.currentUser?.uid;
  

  const addOrder = async () => {
    try {
      if (!userUid) {
        throw new Error("User not authenticated");
      }

       // Prepare an array of cart items with required properties
    const orderItems = CartList.map((item: any) => ({
      id: item.id,
      name: item.name,
      special_ingredient: item.special_ingredient,
      // roasted: item.roasted,
      prices: item.prices,
      // type: item.type,
      // quantity: item.quantity || 1, // Assuming each item in CartList has a quantity property
    }));

      
      const orderCollectionRef = collection(
        db,
        "users",
        userUid,
        "order"
      );

      const orderDocRef = await addDoc(orderCollectionRef, {
        items: orderItems,
        totalPrice: CartPrice, // Include total price if needed
        createdAt: new Date(), // Include timestamp for ordering
        
        
      });

      console.log("order added:", orderCollectionRef.id);

      // Navigate to a specific tab upon successful address addition
    
    } catch (error) {
      console.log("Error adding order:", error.message);
      console.log("Error details:", error);
      
    }
  };


 

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />

            {CartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Order Now"
              price={{price: CartPrice, currency: '₹'}}

            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default CartScreen;
