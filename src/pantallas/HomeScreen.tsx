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
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPeliculas()
  }, [])

  // OBTENER PELICULAS
  const getPeliculas = async () => {

    const { data, error } = await supabase
      .from('peliculas')
      .select('*')

    if (!error) {
      setPeliculas(data || [])
    }

  }

  // BUSCADOR
  const buscarPeliculas = async (texto: string) => {

    setSearch(texto)

    // SI ESTÁ VACÍO
    if (texto.trim() === '') {
      getPeliculas()
      return
    }

    // BUSCAR EN SUPABASE
    const { data, error } = await supabase
      .from('peliculas')
      .select('*')
      .ilike('titulo', `%${texto}%`)

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
        value={search}
        onChangeText={buscarPeliculas}
      />

      {/* RESULTADOS BÚSQUEDA */}
      {search !== '' ? (

        <View style={styles.results}>

          <Text style={styles.resultTitle}>
            Resultados
          </Text>

          {peliculas.length > 0 ? (

            peliculas.map((item) => (

              <TouchableOpacity
                key={item.id}
                style={styles.resultCard}
                onPress={() =>
                  navigation.navigate('MovieDetail', {
                    pelicula: item,
                  })
                }
              >

                <Text style={styles.resultText}>
                  🎬 {item.titulo}
                </Text>

              </TouchableOpacity>

            ))

          ) : (

            <Text style={styles.noResults}>
              No se encontraron películas
            </Text>

          )}

        </View>

      ) : (

        <>
          {/* CARRUSEL */}
          <HeroCarousel peliculas={peliculas} />

          {/* EXPLORAR */}
          <Text style={styles.section}>
            Explorar
          </Text>

          {/* BOTÓN PELÍCULAS */}
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => navigation.navigate('Movies')}
          >

            <Text style={styles.bigButtonText}>
              🎥 Ver Películas
            </Text>

          </TouchableOpacity>

          {/* BOTÓN SERIES */}
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => navigation.navigate('Series')}
          >

            <Text style={styles.bigButtonText}>
              📺 Ver Series
            </Text>

          </TouchableOpacity>

        </>
      )}

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

  results: {
    marginTop: 5,
  },

  resultTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  resultCard: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  resultText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  noResults: {
    color: '#94a3b8',
    marginTop: 10,
    fontSize: 16,
  },

})