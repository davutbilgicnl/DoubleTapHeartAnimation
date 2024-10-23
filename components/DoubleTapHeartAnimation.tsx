import { Dimensions, Image, ImageBackground, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

const BACKGROUND_IMAGE = '../assets/image.jpg';
const HEART = '../assets/heart.png';

const { width: WIDTH } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTapHeartAnimation = () => {
  const heartScale = useSharedValue(0);

  const reanimatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(heartScale.value, 0) }],
    };
  });

  const doubleTapHandler = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      heartScale.value = withSpring(0.5, undefined, (isFinished) => {
        if (isFinished) {
          heartScale.value = withDelay(400, withSpring(0));
        }
      });
    });

  const taps = Gesture.Exclusive(doubleTapHandler);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={taps}>
        <Animated.View>
          <ImageBackground source={require(BACKGROUND_IMAGE)} style={styles.backgroundImage}>
            <AnimatedImage
              source={require(HEART)}
              style={[styles.heartImage, reanimatedHeartStyle]}
            />
          </ImageBackground>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default DoubleTapHeartAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B192C',
  },
  backgroundImage: {
    width: WIDTH,
    height: WIDTH,
  },
  heartImage: {
    width: WIDTH,
    height: WIDTH,
    resizeMode: 'center',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Shadow for Android
    elevation: 5,
  },
});
