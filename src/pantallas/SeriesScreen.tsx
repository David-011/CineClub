import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { useEffect, useState } from 'react'

import { supabase } from '../servicios/supabase'
import Navbar from '../componentes/Navbar'

interface Serie {
  id: string
  titulo: string
  descripcion: string
  imagen: string
  fecha_estreno: string
}

export default function SeriesScreen({ navigation }: any) {

  const [series, setSeries] = useState<Serie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSeries()
  }, [])

  const getSeries = async () => {

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
        <ActivityIndicator
          size="large"
          color="#e11d48"
        />
      </View>
    )
  }

  return (

    <View style={styles.container}>

      <Navbar navigation={navigation} />

      <FlatList
        data={series}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('SerieDetail', {
                serieId: item.id,
              })
            }
          >

            <Image
              source={{ uri: item.imagen }}
              style={styles.image}
            />

            <Text style={styles.title}>
              {item.titulo}
            </Text>

          </TouchableOpacity>

        )}
      />

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },

  card: {
    flex: 1,
    margin: 8,
  },

  image: {
    width: '100%',
    height: 240,
    borderRadius: 15,
  },

  title: {
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },

})