import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const { data: { data } } = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,

            {
                params: {
                    bl_latitude: bl_lat ? bl_lat : '18.89286755846978',
                    tr_latitude: tr_lat ? tr_lat : '19.27163385833489',
                    bl_longitude: bl_lng ? bl_lng : '72.98649944916775',
                    tr_longitude: tr_lng ? tr_lng : '72.77587292177071',
                    limit: '30',
                    currency: 'USD',
                    lunit: 'km',
                    lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': '0713c02427mshff6a94eee31318dp1e874bjsna8acb374bf5a',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                },
            }
        );
        return data;
    } catch (error) {
        return null
    }
}

