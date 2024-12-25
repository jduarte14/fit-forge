import HomeProfile from "./HomeProfile.jsx";
import Categories from './Categories.jsx';
import SearchField from "../layout/SerachField.jsx";
import HomeBanner from "./HomeBanner.jsx";

import { useUser } from './../../contexts/user/UserContext.jsx'

import { useEffect } from 'react';
import { View } from "react-native";

const HomeContent = () => {
    const { getUser } = useUser();
    const getUserPermissions = async () => {
        if (user) {
            const userData = getUser(user["_id"]);
            return userData;
        }
    }

    useEffect(() => {
        getUserPermissions();
    }, [])

    return (
        <View>
            <HomeProfile />
            <Categories />
            <SearchField />
            <HomeBanner title="title" link="link" />
        </View >
    );
}
export default HomeContent;