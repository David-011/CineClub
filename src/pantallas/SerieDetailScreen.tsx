import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import { supabase } from '../servicios/supabase'

interface Serie {
  id: string
  titulo: string
  descripcion: string
  imagenurl: string
  fechaestreno: string
}

interface Temporada {
  id: string
  numero: number
  descripcion: string
}

interface Episodio {
  id: string
  titulo: string
  numero: number
  temporadaid: string
}

export default function SerieDetailScreen({ route }: any) {
  const { serieId } = route.params

  const [serie, setSerie] = useState<Serie | null>(null)
  const [temporadas, setTemporadas] = useState<Temporada[]>([])
  const [episodios, setEpisodios] = useState<Episodio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    // Obtener serie
    const { data: serieData } = await supabase
      .from('series')
      .select('*')
      .eq('id', serieId)
      .single()

    if (serieData) {
      setSerie(serieData)
    }

    // Obtener temporadas
    const { data: temporadasData } = await supabase
      .from('temporada')
      .select('*')
      .eq('seriesid', serieId)
      .order('numero', { ascending: true })

    if (temporadasData) {
      setTemporadas(temporadasData)

      const idsTemporadas = temporadasData.map(t => t.id)

      // Obtener episodios
      const { data: episodiosData } = await supabase
        .from('episodio')
        .select('*')
        .in('temporadaid', idsTemporadas)
        .order('numero', { ascending: true })

      if (episodiosData) {
        setEpisodios(episodiosData)
      }
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

  if (!serie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#fff' }}>
          Serie no encontrada
        </Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: serie.imagenurl }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {serie.titulo}
        </Text>

        <Text style={styles.date}>
          Estreno: {serie.fechaestreno}
        </Text>

        <Text style={styles.description}>
          {serie.descripcion}
        </Text>

        <Text style={styles.sectionTitle}>
          Temporadas
        </Text>

        {temporadas.map((temporada) => (
          <View
            key={temporada.id}
            style={styles.temporadaCard}
          >
            <Text style={styles.temporadaTitle}>
              Temporada {temporada.numero}
            </Text>

            <Text style={styles.temporadaDescription}>
              {temporada.descripcion}
            </Text>

            {episodios
              .filter(
                ep => ep.temporadaid === temporada.id
              )
              .map((ep) => (
                <View
                  key={ep.id}
                  style={styles.episodioCard}
                >
                  <Text style={styles.episodioText}>
                    Episodio {ep.numero}: {ep.titulo}
                  </Text>
                </View>
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },

  image: {
    width: '100%',
    height: 300
  },

  content: {
    padding: 16
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },

  date: {
    color: '#999',
    marginBottom: 16
  },

  description: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },

  temporadaCard: {
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16
  },

  temporadaTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },

  temporadaDescription: {
    color: '#bbb',
    marginBottom: 12
  },

  episodioCard: {
    backgroundColor: '#2b2b2b',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },

  episodioText: {
    color: '#fff'
  }
})