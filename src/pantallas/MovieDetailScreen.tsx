import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native'

import { Video, ResizeMode } from 'expo-av'

const { width } = Dimensions.get('window')

export default function MovieDetailScreen({ route }: any) {

  const { pelicula } = route.params

  return (
    <ScrollView style={styles.container}>

      {/* PORTADA */}
      <Image
        source={{ uri: pelicula.imagen }}
        style={styles.banner}
      />

      <View style={styles.content}>

        {/* TITULO */}
        <Text style={styles.title}>
          {pelicula.titulo}
        </Text>

        {/* INFO */}
        <View style={styles.infoRow}>

          <Text style={styles.info}>
            📅 {pelicula.fecha_estreno}
          </Text>

          <Text style={styles.info}>
            ⏱ {pelicula.duracion} min
          </Text>

        </View>

        {/* VALORACION */}
        <View style={styles.ratingContainer}>

          <Text style={styles.rating}>
            ⭐ 4.8 / 5
          </Text>

          <Text style={styles.ratingText}>
            Excelente valoración
          </Text>

        </View>

        {/* DESCRIPCION */}
        <Text style={styles.section}>
          Descripción
        </Text>

        <Text style={styles.description}>
          {pelicula.descripcion}
        </Text>

        {/* TRAILER */}
        <Text style={styles.section}>
          Trailer
        </Text>

        <Video
          source={{ uri: pelicula.trailer_url }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
        />

        {/* RESEÑAS */}
        <Text style={styles.section}>
          Reseñas
        </Text>

        <View style={styles.reviewCard}>

          <Text style={styles.reviewUser}>
            David ⭐⭐⭐⭐⭐
          </Text>

          <Text style={styles.reviewText}>
            Excelente película 🚀
          </Text>

        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  banner: {
    width: '100%',
    height: 350,
  },

  content: {
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  info: {
    color: '#94a3b8',
    marginRight: 20,
    fontSize: 15,
  },

  ratingContainer: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 15,
    marginBottom: 25,
  },

  rating: {
    color: '#facc15',
    fontSize: 24,
    fontWeight: 'bold',
  },

  ratingText: {
    color: '#94a3b8',
    marginTop: 5,
  },

  section: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
  },

  description: {
    color: '#cbd5e1',
    lineHeight: 24,
    fontSize: 16,
    marginBottom: 25,
  },

  video: {
    width: width - 40,
    height: 220,
    borderRadius: 15,
    backgroundColor: '#000',
    marginBottom: 25,
  },

  reviewCard: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  reviewUser: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },

  reviewText: {
    color: '#cbd5e1',
    lineHeight: 22,
  },

})