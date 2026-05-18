import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { useEffect, useState } from 'react'

import { supabase } from '../servicios/supabase'
import HeroCarousel from '../componentes/HeroCarousel'
import Navbar from '../componentes/Navbar'

export default function HomeScreen({ navigation }: any) {

  const [peliculas, setPeliculas] = useState<any[]>([])

  useEffect(() => {
    getPeliculas()
  }, [])

  const getPeliculas = async () => {

    const { data, error } = await supabase
      .from('peliculas')
      .select('*')

    if (!error) {
      setPeliculas(data || [])
    }

  }

  return (

    <ScrollView style={styles.container}>

      {/* NAVBAR */}
      <Navbar navigation={navigation} />

      {/* BUSCADOR */}
      <TextInput
        placeholder="Buscar películas..."
        placeholderTextColor="#94a3b8"
        style={styles.search}
      />

      {/* CARRUSEL */}
      <HeroCarousel peliculas={peliculas} />

      {/* CATEGORIAS */}
      <Text style={styles.section}>
        Categorías
      </Text>

      <View style={styles.categories}>

        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>
            Acción
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>
            Drama
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>
            Ciencia ficción
          </Text>
        </TouchableOpacity>

      </View>

      {/* EXPLORAR */}
      <Text style={styles.section}>
        Explorar
      </Text>

      <TouchableOpacity
        style={styles.bigButton}
        onPress={() => navigation.navigate('Movies')}
      >

        <Text style={styles.bigButtonText}>
          🎥 Ver Películas
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.bigButton}>

        <Text style={styles.bigButtonText}>
          📺 Ver Series
        </Text>

      </TouchableOpacity>

    </ScrollView>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 15,
  },

  search: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 15,
    color: '#fff',
    marginBottom: 20,
  },

  section: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  categories: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  category: {
    backgroundColor: '#1e293b',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryText: {
    color: '#fff',
    fontWeight: '600',
  },

  bigButton: {
    backgroundColor: '#e11d48',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },

  bigButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

})