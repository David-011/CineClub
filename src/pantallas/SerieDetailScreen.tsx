import {View,Text,Image,ScrollView,StyleSheet,TextInput,TouchableOpacity,Alert,Linking,} from 'react-native'

import { useEffect, useState } from 'react'

import { supabase } from '../servicios/supabase'

interface Temporada {
  id: string
  numero_temporada: number
}

interface Episodio {
  id: string
  titulo: string
  numero_episodio: number
  temporada_id: string
}

export default function SerieDetailScreen({ route }: any) {

  const { serieId } = route.params

  const [serie, setSerie] = useState<any>(null)

  const [temporadas, setTemporadas] = useState<Temporada[]>([])
  const [episodios, setEpisodios] = useState<Episodio[]>([])

  const [resenas, setResenas] = useState<any[]>([])

  const [comentario, setComentario] = useState('')
  const [calificacion, setCalificacion] = useState(5)

  useEffect(() => {
    cargarDatos()
    obtenerResenas()
  }, [])

  async function abrirTrailer() {

    if (!serie?.trailer_url) {

      Alert.alert(
        'Error',
        'Trailer no disponible'
      )

      return
    }

    await Linking.openURL(
      serie.trailer_url
    )

  }

  async function cargarDatos() {

    const { data: serieData } = await supabase
      .from('series')
      .select('*')
      .eq('id', serieId)
      .single()

    if (serieData) {
      setSerie(serieData)
    }

    const { data: temporadasData } = await supabase
      .from('temporadas')
      .select('*')
      .eq('serie_id', serieId)
      .order('numero_temporada')

    if (temporadasData) {

      setTemporadas(temporadasData)

      const ids = temporadasData.map(
        t => t.id
      )

      const { data: episodiosData } =
        await supabase
          .from('episodios')
          .select('*')
          .in('temporada_id', ids)
          .order('numero_episodio')

      if (episodiosData) {
        setEpisodios(episodiosData)
      }

    }

  }

  async function obtenerResenas() {

    const { data, error } = await supabase
      .from('resenas')
      .select(`
        *,
        usuarios (
          nombre
        )
      `)
      .eq('serie_id', serieId)
      .order('fecha', {
        ascending: false
      })

    if (!error && data) {
      setResenas(data)
    }

  }

  async function guardarResena() {

    if (!comentario.trim()) {

      Alert.alert(
        'Error',
        'Escribe una reseña'
      )

      return
    }

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {

      Alert.alert(
        'Error',
        'Debes iniciar sesión'
      )

      return
    }

    const { error } = await supabase
      .from('resenas')
      .insert([
        {
          usuario_id: user.id,
          serie_id: serieId,
          comentario,
          calificacion,
        }
      ])

    if (error) {

      Alert.alert(
        'Error',
        error.message
      )

      return
    }

    Alert.alert(
      'Éxito',
      'Reseña publicada'
    )

    setComentario('')
    setCalificacion(5)

    obtenerResenas()

  }

  const promedio =
    resenas.length > 0
      ? (
          resenas.reduce(
            (acc, r) =>
              acc + r.calificacion,
            0
          ) / resenas.length
        ).toFixed(1)
      : '0'

  if (!serie) {

    return (

      <View style={styles.loadingContainer}>

        <Text style={{ color: '#fff' }}>
          Cargando...
        </Text>

      </View>

    )

  }

  return (

    <ScrollView style={styles.container}>

      <Image
        source={{ uri: serie.imagen }}
        style={styles.banner}
      />

      <View style={styles.content}>

        <Text style={styles.title}>
          {serie.titulo}
        </Text>

        <View style={styles.infoRow}>

          <Text style={styles.info}>
            📅 {serie.fecha_estreno}
          </Text>

        </View>

        <View style={styles.ratingContainer}>

          <Text style={styles.rating}>
            ⭐ {promedio} / 5
          </Text>

          <Text style={styles.ratingText}>
            {resenas.length} reseñas
          </Text>

        </View>

        <Text style={styles.section}>
          Descripción
        </Text>

        <Text style={styles.description}>
          {serie.descripcion}
        </Text>

        <Text style={styles.section}>
          Trailer
        </Text>

        <TouchableOpacity
          style={styles.trailerButton}
          onPress={abrirTrailer}
        >

          <Text style={styles.trailerButtonText}>
            ▶ Ver Trailer en YouTube
          </Text>

        </TouchableOpacity>

        <Text style={styles.section}>
          Temporadas
        </Text>

        {
          temporadas.map((temporada) => (

            <View
              key={temporada.id}
              style={styles.temporadaCard}
            >

              <Text style={styles.temporadaTitle}>
                Temporada {
                  temporada.numero_temporada
                }
              </Text>

              {
                episodios
                  .filter(
                    ep =>
                      ep.temporada_id ===
                      temporada.id
                  )
                  .map((ep) => (

                    <View
                      key={ep.id}
                      style={styles.episodioCard}
                    >

                      <Text style={styles.episodioText}>
                        Episodio {
                          ep.numero_episodio
                        }: {ep.titulo}
                      </Text>

                    </View>

                  ))
              }

            </View>

          ))
        }

        <Text style={styles.section}>
          Escribir Reseña
        </Text>

        <TextInput
          placeholder="Escribe tu reseña..."
          placeholderTextColor="#94a3b8"
          multiline
          value={comentario}
          onChangeText={setComentario}
          style={styles.input}
        />

        <View style={styles.starsContainer}>

          {[1,2,3,4,5].map((num) => (

            <TouchableOpacity
              key={num}
              onPress={() =>
                setCalificacion(num)
              }
            >

              <Text
                style={
                  num <= calificacion
                    ? styles.starActive
                    : styles.star
                }
              >
                ⭐
              </Text>

            </TouchableOpacity>

          ))}

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={guardarResena}
        >

          <Text style={styles.buttonText}>
            Publicar reseña
          </Text>

        </TouchableOpacity>

        <Text style={styles.section}>
          Reseñas
        </Text>

        {
          resenas.map((resena) => (

            <View
              key={resena.id}
              style={styles.reviewCard}
            >

              <Text style={styles.reviewUser}>

                {
                  resena.usuarios?.nombre
                  || 'Usuario'
                }

                {' '}

                {'⭐'.repeat(
                  resena.calificacion
                )}

              </Text>

              <Text style={styles.reviewText}>
                {resena.comentario}
              </Text>

            </View>

          ))
        }

      </View>

    </ScrollView>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  trailerButton: {
    backgroundColor: '#dc2626',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
  },

  trailerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  temporadaCard: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 15,
    marginBottom: 18,
  },

  temporadaTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  episodioCard: {
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  episodioText: {
    color: '#fff',
    fontSize: 15,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 15,
    padding: 15,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 15,
  },

  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  star: {
    fontSize: 30,
    opacity: 0.4,
    marginRight: 8,
  },

  starActive: {
    fontSize: 30,
    marginRight: 8,
  },

  button: {
    backgroundColor: '#e11d48',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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