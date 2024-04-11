import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Video } from 'react-native-video'; 

const CustomVideoMessage = ({ currentMessage }) => {
  const renderVideo = () => {
    if (Platform.OS === 'web') {
      return (
        <Video controls style={{ width: 200, height: 200 }}>
          <source src={currentMessage.video} type="video/mp4" />
        </Video>
      );
    } else {
      return (
        <Video
          source={{ uri: currentMessage.video }}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          controls
        />
      );
    }
  };

  return (
    <View>
      {renderVideo()}
    </View>
  );
};

export default CustomVideoMessage;
