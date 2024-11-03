import {
  FontAwesome6,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export const sportData = {
  tag: "double_row",
  name: "sports",
  items: {
    first_row: [
      {
        name: "calisthenic",
        icon: <FontAwesome6 name="person-swimming" size={50} color="white" />,
      },
      {
        name: "pilates",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "boxing",
        icon: (
          <MaterialCommunityIcons name="boxing-glove" size={50} color="white" />
        ),
      },
      {
        name: "bjj",
        icon: <MaterialIcons name="sports-mma" size={50} color="white" />,
      },
      {
        name: "mma",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "wrestling",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "weightlifting",
        icon: <FontAwesome5 name="dumbbell" size={50} color="white" />,
      },
      {
        name: "yoga",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
    ],
    second_row: [
      {
        name: "Swiming",
        icon: <FontAwesome6 name="person-swimming" size={50} color="white" />,
      },
      {
        name: "Karate",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "Taekwondo",
        icon: (
          <MaterialCommunityIcons name="boxing-glove" size={50} color="white" />
        ),
      },
      {
        name: "Capoeira",
        icon: <MaterialIcons name="sports-mma" size={50} color="white" />,
      },
    ],
  },
};

export const specialtyData = {
  tag: "double_row",
  name: "specialty",
  items: {
    first_row: [
      {
        name: "calisthenic",
        icon: <FontAwesome6 name="person-swimming" size={50} color="white" />,
      },
      {
        name: "pilates",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "boxing",
        icon: (
          <MaterialCommunityIcons name="boxing-glove" size={50} color="white" />
        ),
      },
      {
        name: "bjj",
        icon: <MaterialIcons name="sports-mma" size={50} color="white" />,
      },
      {
        name: "mma",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "wrestling",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "weightlifting",
        icon: <FontAwesome5 name="dumbbell" size={50} color="white" />,
      },
      {
        name: "yoga",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
    ],
    second_row: [
      {
        name: "Swiming",
        icon: <FontAwesome6 name="person-swimming" size={50} color="white" />,
      },
      {
        name: "Karate",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "Taekwondo",
        icon: (
          <MaterialCommunityIcons name="boxing-glove" size={50} color="white" />
        ),
      },
      {
        name: "Capoeira",
        icon: <MaterialIcons name="sports-mma" size={50} color="white" />,
      },
    ],
  },
};

export const facilitiesData = {
  tag: "double_row",
  name: "facilities",
  items: {
    first_row: [
      {
        name: "showers",
        icon: (
          <MaterialCommunityIcons name="shower-head" size={50} color="white" />
        ),
      },
      {
        name: "lockers",
        icon: (
          <MaterialCommunityIcons name="boxing-glove" size={50} color="white" />
        ),
      },
      {
        name: "canteen",
        icon: <MaterialIcons name="sports-mma" size={50} color="white" />,
      },
    ],
    second_row: [
      {
        name: "pingpong",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "spa",
        icon: <MaterialCommunityIcons name="yoga" size={50} color="white" />,
      },
      {
        name: "sauna",
        icon: <FontAwesome5 name="dumbbell" size={50} color="white" />,
      },
    ],
  },
};



export const schedulesData = {
  tag: "schedules_form",
  name: "schedules",
  items: {
    startHours: [],
    endHours: [],
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
};

export const pricesData = {
  tag: "prices_form",
  name: "prices",
  items: {
    twoDays: [],
    threeDays: [],
    fourDays: [],
    fiveDays: [],
    sixDays: [],
    freePass: [],
  },
};

export const galleryData = {
  tag: "gallery_form",
  name: "gallery",
  items: [],
};

export const avatarData = {
  tag: "avatar_form",
  name: "avatar",
  items: [],
};

export const infoForm = {
  tag: "info_form",
  name:"info",
  items: {},
};


export const userData = {
  tag:"user_data",
  name:"credentials",
  items: {
    username: "",
    password: "",
    email: "",
    phone: "",
  }
}