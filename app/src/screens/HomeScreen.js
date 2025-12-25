
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../lib/firebaseConfig.js';


export default function HomeScreen({ navigation }) {
  // Keep the current Firebase user object so we can render avatar reliably
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user || null);
    });
    return unsubscribe;
  }, []);

  // Compute display name / avatar text derived from the user
  const getDisplayName = () => {
    if (!currentUser) return 'Guest';
    if (currentUser.isAnonymous) return 'GUEST';
    const name = currentUser.displayName || currentUser.email || 'Guest';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const displayName = getDisplayName();

  const onGetStarted = () => {
    navigation?.navigate?.('Explore') || alert('Get Started');
  };

  const onLogout = () => {
    // Sign out from Firebase then navigate to Login
    auth
      .signOut()
      .then(() => {
        navigation?.replace?.('Login');
      })
      .catch(err => {
        console.error('Sign out error', err);
        Alert.alert('Sign out failed', err.message || String(err));
        // Still navigate to Login as fallback
        navigation?.replace?.('Login');
      });
  };

  return (
    <View style={styles.container}>
      {currentUser?.photoURL ? (
        <Image source={{ uri: currentUser.photoURL }} style={styles.avatar} />
      ) : currentUser?.isAnonymous ? (
        <View style={[styles.avatar, styles.guestAvatar]}> 
          <Text style={styles.guestText}>GUEST</Text>
        </View>
      ) : (
        // Signed-in user without photo or no user: show initial (first letter) or fallback
        <View style={[styles.avatar, styles.initialsAvatar]}> 
          <Text style={styles.guestText}>{(displayName && displayName.charAt(0)) || 'G'}</Text>
        </View>
      )}

  <Text style={styles.title}>Oral Cancer Detect</Text>
  <Text style={styles.subtitle}>{displayName}</Text>
      
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
    overflow: 'hidden',
  },
  guestAvatar: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsAvatar: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
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
