import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/event-card.syles";

function EventCard({ event }) {
  return (
    <TouchableOpacity activeOpacity={0.75}>
      <View style={styles.cardContainer}>
        <View>
          <Image source={event.image} style={styles.cardImage} />
        </View>

        <View style={styles.cardContentContainer}>
          <View style={styles.creatorTextContainer}>
            <Text numberOfLines={1} style={styles.creator}>
              {event.creator}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {event.title}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.timeAgo}>
            {event.timeAgo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default EventCard;
