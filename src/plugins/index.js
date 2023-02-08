/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import { loadFonts } from './webfontloader'
import pinia from '../store'
import router from '../router'

import '@/@iconify/icons-bundle'
import layoutsPlugin from './layouts'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(layoutsPlugin)
}
