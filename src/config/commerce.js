import { createClient } from '@supabase/supabase-js'
import { isValidWhatsAppPhone } from '@ecustodio123/kafka-commerce'

export const commerceConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL?.trim() ?? '',
  supabaseKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ?? '',
  storeId: import.meta.env.VITE_STORE_ID?.trim() ?? '',
  whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE?.trim() ?? '',
}

export const configurationErrors = []
for (const [name, value] of Object.entries(commerceConfig)) {
  if (!value) configurationErrors.push({
    supabaseUrl: 'Falta la URL de Supabase (VITE_SUPABASE_URL).',
    supabaseKey: 'Falta la clave pública de Supabase (VITE_SUPABASE_PUBLISHABLE_KEY).',
    storeId: 'Falta el ID real de Inflexion 3D (VITE_STORE_ID).',
    whatsappPhone: 'Falta el WhatsApp del negocio (VITE_WHATSAPP_PHONE).',
  }[name])
}
if (commerceConfig.supabaseUrl) {
  try {
    const url = new URL(commerceConfig.supabaseUrl)
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error()
  } catch {
    configurationErrors.push('La URL de Supabase no es válida.')
  }
}
if (commerceConfig.whatsappPhone && !isValidWhatsAppPhone(commerceConfig.whatsappPhone)) {
  configurationErrors.push('El WhatsApp debe ser un número internacional válido, solo con dígitos.')
}

// Acepta claves publishable y anon históricas; rechaza claves secretas y JWT privados.
function isPublicKey(key) {
  if (key.startsWith('sb_publishable_')) return true
  try {
    const payload = JSON.parse(atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload.role === 'anon'
  } catch {
    return false
  }
}
if (commerceConfig.supabaseKey && !isPublicKey(commerceConfig.supabaseKey)) {
  configurationErrors.push('Supabase requiere una clave pública publishable o anon.')
}

export const supabase = configurationErrors.length === 0
  ? createClient(commerceConfig.supabaseUrl, commerceConfig.supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  : null
