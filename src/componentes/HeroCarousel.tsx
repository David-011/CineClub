import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native'

import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient'

export default function HeroCarousel({ peliculas }: any) {

  // EVITAR ERROR SI NO HAY PELICULAS
  if (!peliculas || peliculas.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>

      <Swiper
        autoplay
        autoplayTimeout={4}
        showsPagination
      >

        {peliculas.map((item: any) => (

          <ImageBackground
            key={item.id}
            source={{ uri: item.imagen }}
            style={styles.slide}
          >

            <LinearGradient
              colors={['transparent', '#0f172a']}
              style={styles.overlay}
            >

              <Text style={styles.title}>
                {item.titulo}
              </Text>

            </LinearGradient>

          </ImageBackground>

        ))}

      </Swiper>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },

  slide: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  overlay: {
    padding: 20,
    height: '100%',
    justifyContent: 'flex-end',
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

})