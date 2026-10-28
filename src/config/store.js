// Identidad de Inflexion 3D. El slug de marca no sustituye al storeId de Supabase.
export const store = {
  name: 'Inflexion 3D',
  slug: 'inflexion3d',
  businessType: 'Impresión 3D y productos personalizados',
  description: 'Impresiones 3D, figuras y productos personalizados hechos a tu medida.',
  currency: 'PEN',
  locale: 'es-PE',
  branding: {
    primary: '#F97316', primaryHover: '#EA580C', secondary: '#3B2116',
    accent: '#FFB020', background: '#FFF9F4', surface: '#FFFFFF',
    text: '#2D1B13', mutedText: '#765B4B', border: '#EBD8CA',
    success: '#15803D', error: '#DC2626', imageBackground: '#FFF2E5',
  },
  typography: { heading: 'Outfit', body: 'Inter', headingWeight: 700, bodyWeight: 400 },
  radius: '12px',
  // Sugerencias editoriales: las categorías visibles se leen de Supabase.
  suggestedCategories: ['Figuras 3D', 'Personalizados', 'Llaveros', 'Decoración', 'Accesorios', 'Regalos'],
  instagram: 'https://www.instagram.com/inflexion3d_impresion/',
}

// Kafka Commerce 0.3.0 usa PEN/es-PE internamente y admite estos campos de tema.
export const commerceTheme = {
  primary: store.branding.primary,
  primaryText: '#FFFFFF',
  background: store.branding.background,
  surface: store.branding.surface,
  text: store.branding.text,
  mutedText: store.branding.mutedText,
  border: store.branding.border,
  radius: store.radius,
  fontFamily: 'Inter, system-ui, sans-serif',
}

export const brandStyle = {
  ...Object.fromEntries(Object.entries(store.branding).map(([key, value]) => [
    `--brand-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value,
  ])),
  '--brand-radius': store.radius,
  '--brand-heading-font': `${store.typography.heading}, system-ui, sans-serif`,
  '--brand-heading-weight': store.typography.headingWeight,
  '--brand-body-weight': store.typography.bodyWeight,
}
