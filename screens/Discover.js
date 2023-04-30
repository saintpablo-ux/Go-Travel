import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';

import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';

const Discover = () => {
    const navigation = useNavigation();

    const [type, setType] = useState({ type })
    const [isLoading, setisLoading] = useState(false);
    const [mainData, setmainData] = useState([])
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        setisLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
            setmainData(data);
            setInterval(() => {
                setisLoading(false);

            }, 2000);
        })
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <View className="flex-row items-center justify-between px-8">
                <View>
                    <Text className="text-[40px] text-[#2f556b] font-bold">Explore</Text>
                    <Text className=" text-[32px] text-[#59305f]">and discover new places</Text>
                </View>

                <View className="w-12 h-12 bg-slate-600 rounded-md items-center justify-center shadow-lg">
                    <Image
                        source={Avatar}
                        className="w-full h-full rounded-md object-cover">
                    </Image>
                </View>
            </View>
            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 py-4 shadow-lg mt-4">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details?.geometry?.viewport);
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat)
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng)
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat)
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng)
                    }}
                    query={{
                        key: 'AIzaSyBXPe8WmI23RoLiwCCErz5CzO0RbS8c2UI',
                        language: 'en',
                    }}
                />

            </View>

            {/*MENU*/}
            {isLoading ? <View className="flex-1 item-center justify-center">
                <ActivityIndicator size="large" color="#556b2f" />
            </View> :

                <ScrollView>
                    <View className="flex-row items-center justify-between px-8 mt-8">
                        <MenuContainer
                            key={"hotels"}
                            title="Hotels"
                            imageSrc={Hotels}
                            type={type}
                            setType={setType}
                        />

                        <MenuContainer
                            key={"attractions"}
                            title="Attractions"
                            imageSrc={Attractions}
                            type={type}
                            setType={setType}
                        />

                        <MenuContainer
                            key={"restaurants"}
                            title="Restaurants"
                            imageSrc={Restaurants}
                            type={type}
                            setType={setType}
                        />
                    </View>

                    <View>
                        <View className="flex-row items-center justify-between px-8 mt-8">
                            <Text className="text-[#2f556b] text-[28px] font-bold">Top Places</Text>
                            <TouchableOpacity className="flex-row items-center justify-center space-x-2">

                                <FontAwesome name="chevron-down" size={24} color="#A0C4C7" />
                            </TouchableOpacity>
                        </View>

                        <View className="px-4 mt-5 flex-row items-center justify-evenly flex-wrap">
                            {mainData?.length > 0 ? (
                                <>
                                    {mainData?.map((data, i) => (
                                        <ItemCardContainer
                                            key={i}
                                            imageSrc={data?.photo?.images?.medium?.url ?
                                                data?.photo?.images?.medium?.url :
                                                "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"

                                            }
                                            title={data?.name}
                                            location={data?.location_string}
                                            data={data}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <View className="w-full h-[400px] items-center space-y-8 justify-center">
                                        <Image source={NotFound} className="w-32 h-32 object-cover" />
                                        <Text className="text-2xl text-[#428288] font-semibold">
                                            No Data Found
                                        </Text>
                                    </View>
                                </>
                            )}

                        </View>

                    </View>
                </ScrollView>
            }


        </SafeAreaView>
    )
}

export default Discover