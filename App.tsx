import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import DoubleTapHeartAnimation from './components/DoubleTapHeartAnimation';

export default function App() {
  return (
    <View style={styles.container}>
      <DoubleTapHeartAnimation />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
