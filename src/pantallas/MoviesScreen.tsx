import {View,FlatList,Image,TouchableOpacity,Text,StyleSheet} from 'react-native'

import { useEffect, useState } from 'react'
import { supabase } from '../servicios/supabase'
import Navbar from '../componentes/Navbar'

export default function MoviesScreen({ navigation }: any) {

  const [peliculas, setPeliculas] = useState<any[]>([])

  useEffect(() => {
    getPeliculas()
  }, [])

  const getPeliculas = async () => {
    const { data } = await supabase
      .from('peliculas')
      .select('*')

    setPeliculas(data || [])
  }

  return (
    <View style={styles.container}>

      <Navbar navigation={navigation} />

      <FlatList
        data={peliculas}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('MovieDetail', {
                pelicula: item,
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
  },

})