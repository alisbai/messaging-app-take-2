import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EventCard from "../../components/EventCard";
import IconCard from "../../components/IconCard";
import { eventsData, homeCardMenu } from "../../constants/data";
import { styles } from "../../styles/home.styles";

function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FlatList
          data={homeCardMenu}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <TouchableOpacity activeOpacity={0.4}>
                <IconCard iconName={item.iconName} bgColor={item.bgColor} />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.eventsTitle}>Latest news & events</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 15,
          }}
        >
          {eventsData.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Home;
