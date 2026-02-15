# shared

Paquete compartido de contratos y tipos TypeScript para Gym Tracker (frontend y backend).

Exporta modelos comunes de dominios como:
- autenticación
- ejercicios
- rutinas
- nutrición
- suscripciones

## Publicar una nueva versión

1. Actualiza la versión según el cambio:

```bash
npm version patch   # o minor / major
```

2. Sube commit y tag generados por `npm version`:

```bash
git push origin main --follow-tags
```

3. Publica el paquete en GitHub Packages:

```bash
npm publish
```

Notas:
- El script `prepublishOnly` ejecuta `npm run clean && npm run build` automáticamente antes de publicar.
- Debes tener `NODE_AUTH_TOKEN` configurado con permisos sobre `npm.pkg.github.com`.
