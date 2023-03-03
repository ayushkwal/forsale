import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Following = ({ following }) => {
  return (
    <View style={styles.container}>
      {following.map(followingUser => (
        <View style={styles.followingContainer} key={followingUser.id}>
          <Image source={{ uri: followingUser.avatar }} style={styles.followingAvatar} />
          <View style={styles.followingInfo}>
            <Text style={styles.followingName}>{followingUser.name}</Text>
            <Text style={styles.followingUsername}>{`@${followingUser.username}`}</Text>
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
  followingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  followingAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  followingInfo: {
    flex: 1,
  },
  followingName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  followingUsername: {
    color: '#555',
    fontSize: 16,
  },
});

export default Following;
