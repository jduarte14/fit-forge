import { TouchableOpacity, Text, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';

const Categories = () => {
    const [selected, setSelected] = useState(null);

    const categories = [
        { id: 1, title: "Strength" },
        { id: 2, title: "Yoga" },
        { id: 3, title: "Meditation" },
        { id: 4, title: "Mma" },
        { id: 5, title: "Boxing" },
        { id: 6, title: "Swimming" }
    ];

    const handleSelectedCategory = (id) => {
        setSelected(id);
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[styles.categories, selected === category.id && styles.selected]}
                        onPress={() => handleSelectedCategory(category.id)}
                    >
                        <Text style={[styles.title, selected === category.id && styles.selectedText ]}>
                            {category.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingHorizontal: 5,
    },
    title: {
        color: "white",
        fontSize: 15,
    },
    categories: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
        height: 35,
        marginRight: 5,
        backgroundColor: "#2b2e37",
    },
    selected: {
        backgroundColor: "#e4fb17", 
    },
    selectedText:{
        color:"black",
    },
});
export default Categories;