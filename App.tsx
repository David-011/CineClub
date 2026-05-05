import { useEffect, useState } from 'react'
import { supabase } from './src/servicios/supabase'
import AppNavigator from './src/navigation/AppNavigator'
import LoginScreen from './src/pantallas/LoginScreen'

export default function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession()
    setSession(data.session)
  }

  return session ? <AppNavigator /> : <LoginScreen />
}