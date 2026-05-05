import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { supabase } from '../servicios/supabase'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

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
        <Text style={styles.title}>🎬 CineClub</Text>
        <Text style={styles.subtitle}>Tu mundo de películas y series</Text>

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonOutline} onPress={register}>
              <Text style={styles.buttonOutlineText}>Crear cuenta</Text>
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
    maxWidth: 400,
    backgroundColor: '#1e293b',
    padding: 25,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    color: '#fff',
  },
  button: {
    backgroundColor: '#e11d48',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#e11d48',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonOutlineText: {
    color: '#e11d48',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})