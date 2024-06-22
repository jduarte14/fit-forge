import HomeProfile from "./HomeProfile.jsx";
import Categories from './Categories.jsx';
import SearchField from "../layout/SerachField.jsx";
import HomeBanner from "./HomeBanner.jsx";

import { View } from "react-native";

const HomeContent = () => {
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