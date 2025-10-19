import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigator';

export default function Index() {
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
}
