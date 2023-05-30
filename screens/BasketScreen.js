import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItem,
  removeFromBasket,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItem);
  const [groupedItems, setGroupedItems] = useState([]);
  const dispatch = useDispatch();
  // avoid recomputing if the value of items didn't change
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item); // dict with key = item.id (id of dish) and value = item (the dish)
      return results;
    }, {});

    setGroupedItems(groupedItems);
  }, [items]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="EUR" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View>
          <View className="flex-row items-center space-x-3 bg-white py-2 px-5">
            <Text className="flex-1 text-gray-500">Subtotal</Text>
            <Text>
              <Currency quantity={basketTotal} currency="EUR" />
            </Text>
          </View>

          <View className="flex-row items-center space-x-3 bg-white py-2 px-5">
            <Text className="flex-1 text-gray-500">Delivery fee</Text>
            <Text>
              <Currency quantity={2.99} currency="EUR" />
            </Text>
          </View>

          <View className="flex-row items-center space-x-3 bg-white py-2 px-5">
            <Text className="flex-1 text-gray-500">Tax fee</Text>
            <Text>
              <Currency quantity={1.99} currency="EUR" />
            </Text>
          </View>

          <View className="bg-white">
            <View className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="flex-1 text-gray-500">Total</Text>
              <Text className="font-extrabold">
                <Currency quantity={basketTotal + 2.99 + 1.99} currency="EUR" />
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("PreparingOrderScreen")}
              className="bg-[#00CCBB] p-2 mb-5 mx-4 rounded-lg"
            >
              <Text className="text-center text-white text-lg font-bold">
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
