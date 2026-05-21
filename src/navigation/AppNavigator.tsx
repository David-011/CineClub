import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../pantallas/HomeScreen'
import MoviesScreen from '../pantallas/MoviesScreen'
import MovieDetailScreen from '../pantallas/MovieDetailScreen'

import SeriesScreen from '../pantallas/SeriesScreen'
import SerieDetailScreen from '../pantallas/SerieDetailScreen'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator

        screenOptions={{

          headerStyle: {
            backgroundColor: '#0f172a',
          },

          headerTintColor: '#fff',

          contentStyle: {
            backgroundColor: '#0f172a',
          },

          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}

      >

        {/* HOME */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'CineClub',
          }}
        />

        {/* PELICULAS */}
        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{
            title: 'Películas',
          }}
        />

        {/* DETALLE PELICULA */}
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            title: 'Detalle Película',
          }}
        />

        {/* SERIES */}
        <Stack.Screen
          name="Series"
          component={SeriesScreen}
          options={{
            title: 'Series',
          }}
        />

        {/* DETALLE SERIE */}
        <Stack.Screen
          name="SerieDetail"
          component={SerieDetailScreen}
          options={{
            title: 'Detalle Serie',
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  )
}