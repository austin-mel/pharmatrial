import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native-web";

import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from './FirebaseHook'

function FBaseLoggedIn() {
  const logout = async () => {
    try { await signOut(auth); }
      catch (e) { console.error(e); }
    }
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logged in</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
}

function FBaseSignup() {
  const [email, emailSet] = useState('');
  const [pw, pwSet] = useState('');
  const [pwConfirm, pwConfirmSet] = useState('');
  const [error, errorSet] = useState('');
  
  const createAcct = async () => {
    try {
      if (pw === pwConfirm)
      await createUserWithEmailAndPassword(auth, email, pw); 
    } catch (e) { errorSet('There was a problem with creating your account.'); }
  };

  return (
    <View>
      <View>
        <Text>Signup</Text>

        {error && <Text>{error}</Text>}

        <TextInput
          value={email}
          onChangeText={emailSet}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          value={pw}
          onChangeText={pwSet}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          value={pwConfirm}
          onChangeText={pwConfirmSet}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />

        <Button
          title="Create Account"
          onPress={createAcct}
          disabled={!email || !pw || !pwConfirm}
        />
      </View>
    </View>
  );
}

export default function FirebaseApp() {
  const [loggedin, loggedinSet] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      loggedinSet(true);
    } else {
      // User is not logged in
      loggedinSet(false);
    }
  });

  const screenGet = () => {
    if (loggedin) return <FBaseLoggedIn/>;
    return <FBaseSignup/>
  }

  return (
    <View style={{ flex: 1 }}>
      {screenGet()}
    </View>
  );
}