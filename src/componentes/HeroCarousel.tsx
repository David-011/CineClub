import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

export default function HeroCarousel({ peliculas }: any) {

  if (!peliculas || peliculas.length === 0) {
    return null
  }

  return (

    <View style={styles.container}>

      <Swiper
        autoplay
        autoplayTimeout={7}
        loop
        showsPagination

        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}

        paginationStyle={{
          bottom: 15,
        }}
      >

        {peliculas.map((item: any) => (

          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.slideContainer}
          >

            <ImageBackground
              source={{ uri: item.imagen }}
              style={styles.slide}
              imageStyle={styles.image}
            >

              <LinearGradient
                colors={['transparent', 'rgba(15,23,42,0.95)']}
                style={styles.overlay}
              >

                <Text style={styles.title}>
                  {item.titulo}
                </Text>

              </LinearGradient>

            </ImageBackground>

          </TouchableOpacity>

        ))}

      </Swiper>

    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
  },

  slideContainer: {
    flex: 1,
  },

  slide: {
    width: width - 30,
    height: 320,
    justifyContent: 'flex-end',
  },

  image: {
    borderRadius: 20,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  dot: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: '#e11d48',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },

})