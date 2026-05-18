import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native'

import { supabase } from '../servicios/supabase'

interface Serie {
  id: string
  titulo: string
  descripcion: string
  imagenurl: string
  fechaestreno: string
}

export default function SeriesScreen({ navigation }: any) {
  const [series, setSeries] = useState<Serie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    obtenerSeries()
  }, [])

  async function obtenerSeries() {
    const { data, error } = await supabase
      .from('series')
      .select('*')

    if (!error && data) {
      setSeries(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Series</Text>

      <FlatList
        data={series}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('SerieDetail', {
                serieId: item.id
              })
            }
          >
            <Image
              source={{ uri: item.imagenurl }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.movieTitle}>
                {item.titulo}
              </Text>

              <Text style={styles.description} numberOfLines={2}>
                {item.descripcion}
              </Text>

              <Text style={styles.date}>
                {item.fechaestreno}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden'
  },

  image: {
    width: 120,
    height: 180
  },

  info: {
    flex: 1,
    padding: 12
  },

  movieTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },

  description: {
    color: '#bbb',
    marginBottom: 8
  },

  date: {
    color: '#888'
  }
})