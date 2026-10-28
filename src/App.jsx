import { CommerceStore } from '@ecustodio123/kafka-commerce'
import '@ecustodio123/kafka-commerce/styles.css'
import { commerceConfig, configurationErrors, supabase } from './config/commerce.js'
import { brandStyle, commerceTheme, store } from './config/store.js'
import './App.css'

export default function App() {
  return (
    <div className="storefront" style={brandStyle}>
      <a className="skip-link" href="#tienda">Ir a la tienda</a>
      <div className="brand-bar">
        <a className="brand" href="/" aria-label={`${store.name}, inicio`}>
          <svg viewBox="0 0 40 40" width="36" height="36" fill="none" aria-hidden="true">
            <path d="m20 3 16 9v16l-16 9-16-9V12L20 3Z" stroke="currentColor" strokeWidth="2.5" />
            <path d="m4 12 16 9 16-9M20 21v16M12 8l16 9v8" stroke="currentColor" strokeWidth="2.5" />
          </svg>
          <span>Inflexion <strong>3D</strong></span>
        </a>
        <a className="instagram-link" href={store.instagram} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
      </div>
      <main id="tienda" tabIndex={-1}>
        {supabase ? (
          <CommerceStore
            supabase={supabase}
            storeId={commerceConfig.storeId}
            storeName={store.name}
            title={store.name}
            description={store.description}
            navigationMode="standalone"
            layout="sections"
            features={{ search: true, filters: true, cart: true }}
            checkout={{ type: 'whatsapp', phone: commerceConfig.whatsappPhone }}
            theme={commerceTheme}
          />
        ) : (
          <section className="configuration-state" aria-labelledby="store-title">
            <span className="eyebrow">{store.businessType}</span>
            <h1 id="store-title">{store.name}</h1>
            <p className="store-description">{store.description}</p>
            <div className="configuration-card" role="status">
              <h2>Estamos preparando nuestra tienda</h2>
              <p>Pronto podrás explorar nuestro catálogo. Mientras tanto, conoce nuestras creaciones en Instagram.</p>
              <a className="primary-link" href={store.instagram} target="_blank" rel="noopener noreferrer">Ver creaciones <span aria-hidden="true">↗</span></a>
            </div>
            {import.meta.env.DEV && (
              <aside className="configuration-details">
                <h2>Configuración local pendiente</h2>
                <p>Completa los datos de Inflexion 3D en <code>.env.local</code> y reinicia Vite.</p>
                <ul>{configurationErrors.map((error) => <li key={error}>{error}</li>)}</ul>
              </aside>
            )}
          </section>
        )}
      </main>
      <footer className="store-footer">
        <div><a className="footer-brand" href="/">{store.name}</a><p>{store.description}</p></div>
        <a href={store.instagram} target="_blank" rel="noopener noreferrer">Síguenos en Instagram ↗</a>
      </footer>
    </div>
  )
}
