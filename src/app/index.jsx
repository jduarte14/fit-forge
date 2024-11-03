import { StyleSheet, ScrollView, View } from 'react-native';
import { useState, useEffect } from 'react';
import { UserProvider } from './contexts/user/UserContext';
import { InstructorProvider } from "./contexts/instructor/InstructorContext";
import HomeView from "./home";
import Login from './components/auth/login';
import BottomBar from './components/layout/BottomBar';
const Index = () => {
  const [userLogged, setUserLogged] = useState(false);
  const getUserLogged = () => {
    setUserLogged(true);
  }

  return (
    <UserProvider>
      <InstructorProvider>
        <View style={styles.container}>
          <ScrollView>
            {
              userLogged ? <HomeView /> : <Login setUserLogged={getUserLogged} />
            }
          </ScrollView>
          {
            userLogged && <BottomBar />
          }

        </View>
      </InstructorProvider>
    </UserProvider>

  );
};

let backgroundBase = "#1c2229"
let backgroundSecondBase = "#2b2e37"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundBase,
    paddingHorizontal: 10,
  }
})

export default Index;
