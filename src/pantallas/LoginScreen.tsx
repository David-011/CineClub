import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Modal,
  Alert,
  Platform,
  Linking,
} from 'react-native'

import { useState } from 'react'
import { supabase } from '../servicios/supabase'

export default function LoginScreen() {

  // LOGIN
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // REGISTER
  const [name, setName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  // ALERTAS WEB + MOVIL
  const showMessage = (
    title: string,
    message: string
  ) => {

    if (Platform.OS === 'web') {

      alert(`${title}\n\n${message}`)

    } else {

      Alert.alert(title, message)

    }

  }

  // LOGIN
  const login = async () => {

    if (!email || !password) {

      showMessage(
        'Error',
        'Completa todos los campos'
      )

      return
    }

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      })

    setLoading(false)

    if (error) {

      // CREDENCIALES INCORRECTAS
      if (
        error.message.includes(
          'Invalid login credentials'
        )
      ) {

        showMessage(
          'Error',
          'Correo o contraseña incorrectos'
        )

      }

      // EMAIL NO VERIFICADO
      else if (
        error.message.includes(
          'Email not confirmed'
        )
      ) {

        showMessage(
          'Correo no verificado',
          'Debes verificar tu correo antes de ingresar'
        )

      }

      else {

        showMessage(
          'Error',
          error.message
        )

      }

    }

  }

  // REGISTER
  const register = async () => {

    if (
      !name ||
      !registerEmail ||
      !registerPassword
    ) {

      showMessage(
        'Error',
        'Completa todos los campos'
      )

      return
    }

    setLoading(true)

    // CREAR USUARIO
    const { data, error } =
      await supabase.auth.signUp({

        email: registerEmail,
        password: registerPassword,

      })

    // ERROR
    if (error) {

      setLoading(false)

      showMessage(
        'Error',
        error.message
      )

      return

    }

    // GUARDAR USUARIO
    if (data.user) {

      await supabase
        .from('usuarios')
        .insert({

          id: data.user.id,
          nombre: name,
          correo: registerEmail,

        })

    }

    setLoading(false)
    setModalVisible(false)

    // LIMPIAR
    setName('')
    setRegisterEmail('')
    setRegisterPassword('')

    // WEB
    if (Platform.OS === 'web') {

      showMessage(
        'Cuenta creada ✅',
        'Revisa tu correo para verificar tu cuenta'
      )

      setTimeout(() => {

        Linking.openURL(
          'https://mail.google.com'
        )

      }, 1000)

    }

    // MOVIL
    else {

      Alert.alert(
        'Cuenta creada ✅',
        'Revisa tu correo para verificar tu cuenta',
        [

          {
            text: 'Aceptar',
          },

          {
            text: 'Abrir Gmail',

            onPress: () => {

              Linking.openURL(
                'https://mail.google.com'
              )

            },
          },

        ]
      )

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

        <Text style={styles.title}>
          CineClub
        </Text>

        <Text style={styles.subtitle}>
          Películas y series
        </Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Correo"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (

          <ActivityIndicator color="#e11d48" />

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
              onPress={() =>
                setModalVisible(true)
              }
            >

              <Text style={styles.buttonOutlineText}>
                Crear cuenta
              </Text>

            </TouchableOpacity>

          </>

        )}

      </View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >

        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>
              Crear Cuenta
            </Text>

            {/* NOMBRE */}
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            {/* EMAIL */}
            <TextInput
              placeholder="Correo"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={registerEmail}
              onChangeText={setRegisterEmail}
            />

            {/* PASSWORD */}
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              secureTextEntry
              value={registerPassword}
              onChangeText={setRegisterPassword}
            />

            {/* CREAR */}
            <TouchableOpacity
              style={styles.button}
              onPress={register}
            >

              <Text style={styles.buttonText}>
                Crear cuenta
              </Text>

            </TouchableOpacity>

            {/* CANCELAR */}
            <TouchableOpacity
              onPress={() =>
                setModalVisible(false)
              }
            >

              <Text style={styles.closeText}>
                Cancelar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

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
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    color: '#fff',
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
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#1e293b',
    padding: 25,
    borderRadius: 20,
  },

  modalTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  closeText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 15,
  },

})