
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  const onGetStarted = () => {
    navigation?.navigate?.('Explore') || alert('Get Started');
  };

  const onLogout = () => {
    navigation?.replace?.('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://ui-avatars.com/api/?name=Guest&length=5&background=007AFF&color=fff&size=256&font-size=0.2&bold=true' }}
        style={styles.avatar}
      />

      <Text style={styles.title}>Oral Cancer Detect</Text>
      <Text style={styles.subtitle}>A minimal demo home</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Did you know?</Text>
        <Text style={styles.cardText}>Early detection increases survival rates. Explore resources and tools in this app.</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onGetStarted}>
        <Text style={styles.primaryText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ghostButton} onPress={onLogout}>
        <Text style={styles.ghostText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111',
  },
  subtitle: {
    color: '#666',
    marginBottom: 18,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#f7f9fb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#007AFF',
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    color: '#333',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginBottom: 12,
  },
  primaryText: { color: '#fff', fontWeight: '600' },
  ghostButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  ghostText: { color: '#007AFF', fontWeight: '600' },
});
