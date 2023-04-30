import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ItemCardContainer = ({ imageSrc, title, location, data }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity 
        onPress={() => navigation.navigate("ItemScreen", {param : data })}
        className="rounded-md border-gray-300 space-y-2 px-2 py-2 shadow-md bg-white w-[175px] my-2">
            <Image
                source={{ uri: imageSrc }}
                className="w-full h-40 rounded-md object-cover"
            />

            {title ? (
            <>
                <Text className="text-[#556b2f] text-[17px] font-semibold mt-1">
                    {title?.length > 14 ? `${title.slice(0, 14)}..` : title}
                </Text>

                <View className="flex-row items-center space-x-1">
                    <FontAwesome name="map-marker" size={20} color="#A0C4C7" />
                    <Text className="text-[#556b2f] text-[12px] font-bold mt-1">
                        {location?.length > 18 ? `${title.slice(0, 18)}..` : location}
                    </Text>
                </View></>
            ) : (
                <></>
            )}
        </TouchableOpacity>
    )
}

export default ItemCardContainer