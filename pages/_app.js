import '../styles/globals.css'
import AuthProvider from '../src/contexts/auth'
import { ProtectRoute } from '../src/contexts/auth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  )
}

export default MyApp
