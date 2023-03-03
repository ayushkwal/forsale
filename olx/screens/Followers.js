import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Followers = ({ followers }) => {
  return (
    <View style={styles.container}>
      {followers.map(follower => (
        <View style={styles.followerContainer} key={follower.id}>
          <Image source={{ uri: follower.avatar }} style={styles.followerAvatar} />
          <View style={styles.followerInfo}>
            <Text style={styles.followerName}>{follower.name}</Text>
            <Text style={styles.followerUsername}>{`@${follower.username}`}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  followerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  followerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  followerInfo: {
    flex: 1,
  },
  followerName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  followerUsername: {
    color: '#555',
    fontSize: 16,
  },
});

export default Followers;
