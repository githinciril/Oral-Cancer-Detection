// src/screens/LoginScreen.js
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../lib/firebaseConfig.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Inline field errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    setEmailError('');
    setPasswordError('');
    if (!email.trim()) {
      setEmailError('Enter an email');
      return 'Enter an email';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email');
      return 'Enter a valid email';
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return 'Password must be at least 6 characters';
    }
    return null;
  };

  const handleLogin = async () => {
    const err = validate();
    if (err) {
      Toast.show({ type: 'error', text1: 'Validation error', text2: err });
      Alert.alert('Validation error', err);
      return;
    }
    setLoading(true);
    try {
      console.log('Signing in', email);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log('Sign-in successful, navigating to Home');
      setLoading(false);
      navigation.replace('Home');
    } catch (e) {
      setLoading(false);
      const msg = e.code ? e.message : 'Login failed';
      console.error('Login error', e);
      Toast.show({ type: 'error', text1: 'Login error', text2: msg });
      Alert.alert('Login error', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oral Cancer Detect</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={[styles.input, emailError ? styles.inputError : null]} />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={[styles.input, passwordError ? styles.inputError : null]} />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log In</Text>}
      </TouchableOpacity>
      <View style={styles.row}>
        <Text>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}> Sign up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={async () => {
          setLoading(true);
          try {
            console.log('Attempting anonymous sign-in');
            await signInAnonymously(auth);
            console.log('Anonymous sign-in successful');
            Toast.show({ type: 'success', text1: 'Continuing as guest' });
            navigation.replace('Home');
          } catch (e) {
            console.warn('Anonymous sign-in failed, falling back to Home', e);
            Toast.show({ type: 'success', text1: 'Continuing as guest' });
            Alert.alert('Guest mode', 'Could not sign in anonymously. Proceeding as guest.');
            navigation.replace('Home');
          } finally {
            setLoading(false);
          }
        }}
        style={[styles.guest, loading && styles.buttonDisabled]}
        disabled={loading}
      >
        {loading ? <ActivityIndicator /> : <Text style={styles.guestText}>Continue as Guest</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  inputError: { borderColor: '#ff4d4f' },
  errorText: { color: '#ff4d4f', marginTop: -8, marginBottom: 8 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  buttonDisabled: { opacity: 0.6 },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  link: { color: '#007AFF', fontWeight: '600' },
  guest: { marginTop: 20, alignItems: 'center' },
  guestText: { color: '#666' }
});
