// src/screens/RegisterScreen.js
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../lib/firebaseConfig.js';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  // Field-specific error messages for inline feedback
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const validate = () => {
    // Reset previous errors
    setEmailError('');
    setPasswordError('');
    setUsernameError('');

    if (!email.trim()) {
      setEmailError('Enter an email');
      return 'Enter an email';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email address');
      return 'Enter a valid email address';
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return 'Password must be at least 6 characters';
    }
    if (!username.trim()) {
      setUsernameError('Enter a username');
      return 'Enter a username';
    }
    return null;
  };

  const handleRegister = async () => {
    const err = validate();
    if (err) {
      // Show toast and an alert for immediate feedback across platforms
      Toast.show({ type: 'error', text1: 'Validation error', text2: err });
      Alert.alert('Validation error', err);
      return;
    }
    setLoading(true);
    try {
      console.log('Registering', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log('UserCredential:', userCredential);
      // Set displayName to username
      await updateProfile(userCredential.user, { displayName: username.trim() });
      console.log('Profile updated');
      // Send email verification
      await sendEmailVerification(userCredential.user);
      console.log('Email verification sent');
      Toast.show({ type: 'success', text1: 'Account created', text2: 'Please check your email for verification.' });
      navigation.replace('Login');
    } catch (e) {
      console.error('Registration error', e);
      const msg = e.message || String(e);
      Toast.show({ type: 'error', text1: 'Registration error', text2: msg });
      Alert.alert('Registration error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, usernameError ? styles.inputError : null]}
        autoCapitalize="none"
      />
      {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, emailError ? styles.inputError : null]}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, passwordError ? styles.inputError : null]}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
        <Text style={{ color: '#007AFF' }}>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  inputError: { borderColor: '#ff4d4f' },
  errorText: { color: '#ff4d4f', marginTop: -8, marginBottom: 8 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
  ,buttonDisabled: { opacity: 0.6 }
});
