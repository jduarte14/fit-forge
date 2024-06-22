import { View, Image, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const HomeBanner = ({ title, link, button, bannerTitle, bannerDescirption }) => {
    return (
        <>
            <View style={styles.wrapper}>
                {
                    title || link ? (
                        <View style={styles.row}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity style={styles.link}>
                                <Text style={styles.link}>
                                    {link}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }

                <ScrollView horizontal>
                    <View style="position: relative">
                        <Image style={styles.image} source={require('./../../../img/arnold.jpg')} />
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.subTitle}>Gyms near you</Text>
                            <Text style={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </Text>
                        </View>
                    </View>
                    <View style="position: relative">
                        <Image style={styles.image} source={require('./../../../img/arnold.jpg')} />
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.subTitle}>Gyms near you</Text>
                            <Text style={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                {
                    title || link ? (
                        <View style={styles.row}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity style={styles.link}>
                                <Text style={styles.link}>
                                    {link}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }

                <ScrollView horizontal>
                    <View style="position: relative">
                        <Image style={styles.image} source={require('./../../../img/arnold.jpg')} />
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.subTitle}>Gyms near you</Text>
                            <Text style={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </Text>
                        </View>
                    </View>
                    <View style="position: relative">
                        <Image style={styles.image} source={require('./../../../img/arnold.jpg')} />
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.subTitle}>Gyms near you</Text>
                            <Text style={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 10,
        marginHorizontal: 10,
        flex: 1,
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 10,
        paddingBottom: 5,
    },
    title: {
        color: "white",
        marginLeft: 10,
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize:25,
    },
    subTitle: {
        color: "white",
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 18,
    },
    link: {
        color: "#e4fb17",
        marginRight: 10,
        textDecorationLine: "underline",
        textTransform: "capitalize",
    },
    image: {
        borderRadius: 5,
        width: screenWidth - 80,
        height: 200,
        marginRight: 10,
    },
    description: {
        color: "white",
        lineHeight: 20,
        paddingTop: 10,
    },
    descriptionContainer: {
        width: screenWidth - 150,
        position: "absolute",
        inset: 0,
        top: 20,
        left: 20,
    }
})

export default HomeBanner;

