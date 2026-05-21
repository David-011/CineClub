import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'

import { supabase } from '../servicios/supabase'

export default function Navbar({ navigation }: any) {

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => navigation.navigate('Home')}
      >

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.logoText}>
          CineClub
        </Text>

      </TouchableOpacity>

      {/* MENU */}
      <View style={styles.menu}>

        {/* PELICULAS */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Movies')}
        >

          <Text style={styles.link}>
            Películas
          </Text>

        </TouchableOpacity>

        {/* SERIES */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Series')}
        >

          <Text style={styles.link}>
            Series
          </Text>

        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity
          onPress={logout}
        >

          <Text style={styles.logout}>
            Logout
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    marginTop: 15,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 42,
    height: 42,
    marginRight: 10,
  },

  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  link: {
    color: '#fff',
    marginRight: 15,
    fontWeight: '600',
  },

  logout: {
    color: '#e11d48',
    fontWeight: 'bold',
  },

})