import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '../servicios/supabase'

type Pelicula = {
  id: string
  titulo: string
  fecha_estreno: string
}

export default function HomeScreen() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPeliculas()
  }, [])

  const getPeliculas = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('peliculas')
      .select('*')

    if (error) {
      console.log('ERROR:', error.message)
    } else {
      setPeliculas(data || [])
    }

    setLoading(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando películas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 CineClub</Text>

      <FlatList
        data={peliculas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No hay películas aún</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.movieTitle}>{item.titulo}</Text>
            <Text>Estreno: {item.fecha_estreno}</Text>
          </View>
        )}
      />

      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})