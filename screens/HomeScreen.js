import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { HeroImage } from '../assets';



const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1 relative">
            {/* First Section */}
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View className="w-16 h-16 bg bg-black rounded-full items-center justify-center">
                    <Text className="text-blue-200 text-3xl font-semibold">Go</Text>
                </View>
                <Text className="text-[#2f556b] text-3xl font-semibold">Travel</Text>
            </View>

            <View className="px-8 mt-6 space-y-3">
                <Text className="text-[#59305f] text-[43px]">It's a Big World Out There,</Text>
                <Text className="text-[#556b2f] text-[39px] font-bold">Go, Explore!</Text>

            </View>

            {/* Circle */}
            <View className="w-[400px] h-[400px] bg-[#556b2f] rounded-full absolute bottom-36 -right-36"></View>
            <View className="w-[400px] h-[400px] bg-[#282a4a] rounded-full absolute -bottom-36 -left-36"></View>

            {/*Image*/}
            <View className="flex-1 items-center justify-center">
                <Animatable.Image
                    animation="fadeIn"
                    easing="ease-in-out"
                    source={HeroImage}
                    className="w-full h-full mt-20"
                />
                <TouchableOpacity 
                onPress={() => navigation.navigate("Discover")}
                className="absolute bottom-20 w-24 h-24  border-l-2 border-r-2 border-t-4 border-[#556b2f] rounded-full items-center justify-center">    
                    <Animatable.View
                        animation={"pulse"}
                        easing="ease-in-out"
                        iterationCount={"infinite"}
                        className="w-20 h-20 items-center justify-center rounded-full bg-[#556b2f]">
                        <Text className="text-blue-50 text-[36px] font-semibold ">Go</Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>



        </SafeAreaView>
    )
}

export default HomeScreen