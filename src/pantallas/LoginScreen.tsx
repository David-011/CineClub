import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native'

import { useState } from 'react'
import { supabase } from '../servicios/supabase'

export default function LoginScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // LOGIN
  const login = async () => {

    if (!email || !password) {
      alert('Completa todos los campos')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    }

  }

  // REGISTER
  const register = async () => {

    if (!email || !password) {
      alert('Completa todos los campos')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Revisa tu correo para confirmar la cuenta')
    }

  }

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        {/* LOGO */}
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />

        {/* TITULO */}
        <Text style={styles.title}>
          CineClub
        </Text>

        <Text style={styles.subtitle}>
          Tu mundo de películas y series
        </Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
        />

        {loading ? (

          <ActivityIndicator
            size="large"
            color="#e11d48"
          />

        ) : (

          <>
            {/* LOGIN */}
            <TouchableOpacity
              style={styles.button}
              onPress={login}
            >

              <Text style={styles.buttonText}>
                Ingresar
              </Text>

            </TouchableOpacity>

            {/* REGISTER */}
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={register}
            >

              <Text style={styles.buttonOutlineText}>
                Crear cuenta
              </Text>

            </TouchableOpacity>

          </>

        )}

      </View>

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#1e293b',
    padding: 28,
    borderRadius: 20,
  },

  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  subtitle: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
    fontSize: 15,
  },

  input: {
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    color: '#fff',
    fontSize: 15,
  },

  button: {
    backgroundColor: '#e11d48',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonOutline: {
    borderWidth: 1,
    borderColor: '#e11d48',
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
  },

  buttonOutlineText: {
    color: '#e11d48',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

})