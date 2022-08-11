import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useDimensions } from "./utils/useDimensions";
const Toast = (props) => {
  let {
    id,
    onDestroy,
    type = "normal",
    message,
    duration = 5000,
    style,
    animationDuration = 250,
    placement,
    onPress,
    backgroundColor,
    messageColor = "#fff",
  } = props;
  const containerRef = useRef(null);
  const [animation] = useState(new Animated.Value(0));
  const closeTimeoutRef = useRef(null);
  const dims = useDimensions();
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: Platform.OS !== "web",
      duration: animationDuration,
    }).start();
    if (duration !== 0 && typeof duration === "number") {
      closeTimeoutRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => {
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current);
    };
  }, [duration]);

  useEffect(() => {
    if (!props.open) {
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current);
      handleClose();
    }
  }, [props.open]);
  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      useNativeDriver: Platform.OS !== "web",
      duration: animationDuration,
    }).start(() => onDestroy());
  };

  const animationStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: placement === "bottom" ? [20, 0] : [-20, 0],
        }),
      },
    ],
  };
  return (
    <Animated.View
      ref={containerRef}
      style={[styles.container, animationStyle]}
    >
      {props.renderType && props.renderType[type] ? (
        props.renderType[type](props)
      ) : props.renderToast ? (
        props.renderToast(props)
      ) : (
        <TouchableWithoutFeedback
          disabled={!onPress}
          onPress={() => onPress && onPress(id)}
        >
          <View
            style={[
              styles.toastContainer,
              {
                maxWidth: (dims.width / 10) * 9,
                backgroundColor: backgroundColor,
              },
              style,
            ]}
          >
            {React.isValidElement(message) ? (
              message
            ) : (
              <Text style={[styles.message, { color: messageColor }]}>
                {message}
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    //zIndex 형태로 줄려고 했지만 의미없음 뒤로 뜸 앞으로 뜨게 해야함!
  },
  toastContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  message: {
    color: "#fff",
    fontWeight: "500",
  },
});
export default Toast;
