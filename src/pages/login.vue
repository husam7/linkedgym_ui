<script>
//<script setup lang="ts">
// import tree from '@/assets/images/pages/tree.png'
// import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
// import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
// import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
// import { themeConfig } from '@themeConfig'

// import authV2LoginIllustrationBorderedDark from '@/assets/images/pages/auth-v2-login-illustration-bordered-dark.png'
// import authV2LoginIllustrationBorderedLight from '@/assets/images/pages/auth-v2-login-illustration-bordered-light.png'
// import authV2LoginIllustrationDark from '@/assets/images/pages/auth-v2-login-illustration-dark.png'
// import authV2LoginIllustrationLight from '@/assets/images/pages/auth-v2-login-illustration-light.png'
// import authV2MaskDark from '@/assets/images/pages/auth-v2-mask-dark.png'
// import authV2MaskLight from '@/assets/images/pages/auth-v2-mask-light.png'
// const form = ref({
//   email: '',
//   password: '',
//   remember: false,
// })

// const isPasswordVisible = ref(false)

// const authThemeImg = useGenerateImageVariant(
//   authV2LoginIllustrationLight,
//   authV2LoginIllustrationDark,
//   authV2LoginIllustrationBorderedLight,
//   authV2LoginIllustrationBorderedDark,
//   true)

// const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
// *************************************************
import store from '@/store'
import { useRouter } from '@core/utils'
import { requiredValidator } from '@core/utils/validators'
import { themeConfig } from '@themeConfig'
import { getCurrentInstance, ref } from 'vue'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const loading = ref(false)
    const loginForm = ref(null)
    const { router } = useRouter()
    const errorMessages = ref([])
    const vm = getCurrentInstance().proxy
    const capsTooltip = ref(false)
    const password = ref('')
    const username = ref('')
    const rememberme = ref('')
    const checkCapslock = ({ shiftKey, key } = {}) => {
      if (key && key.length === 1) {
        if ((shiftKey && key >= 'a' && key <= 'z') || (!shiftKey && key >= 'A' && key <= 'Z')) {
          capsTooltip.value = true
        } else {
          capsTooltip.value = false
        }
      }
      if (key === 'CapsLock' && capsTooltip.value === true) {
        capsTooltip.value = false
      }
    }
    const handleFormSubmit = () => {
      const isFormValid = loginForm.value.validate()
      loading.value = true
      if (!isFormValid) return

      /*
        1. Make HTTP request to get accessToken
        2. Store received token in localStorage for future use
        3. Make another HTTP request for getting user information
        4. On successful response of user information redirect to home page

        ? We have use promise chaining to get user data from access token
        ? Promise Chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining
      */
      // var str = password.value;
      // const arr = str.split("",);
      // let converted = ''
      // let tostr = arr.map( x => converted += '/$'+x +'/$');
      // console.log('tostring', tostr, 'converted', converted )
      // let encodedString = converted
      // password.value = encodedString;
      store
        .dispatch('user/login', { username: username.value, password: password.value, rememberme: rememberme.value })
        .then(response => {
          //const { accessToken } = response

          // ? Set access token in localStorage so axios interceptor can use it
          // Axios Interceptors: https://github.com/axios/axios#interceptors
          // localStorage.setItem('accessToken', accessToken)
          return response
        })
        .then(() => {
          store.dispatch('user/getInfo').then(response => {
            const user = response
            const { ability: userAbility } = user
            // Set user ability
            // ? https://casl.js.org/v5/en/guide/intro#update-rules
            var userAbilityO = JSON.parse(userAbility)
            console.log('userAbilityO', userAbilityO)

            vm.$ability.update(userAbilityO)

            // Set user's ability in localStorage for Access Control
            localStorage.setItem('userAbility', JSON.stringify(userAbilityO))

            // We will store `userAbility` in localStorage separate from userData
            // Hence, we are just removing it from user object
            delete user.ability

            // Set user's data in localStorage for UI/Other purpose
            localStorage.setItem('userData', JSON.stringify(user))

            // On success redirect to home
            router.push('/')
            loading.value = false
          })
        })
        .catch(error => {
          // TODO: Next Update - Show notification
          console.error('Oops, Unable to login!')
          console.log('error :>> ', error)
          localStorage.removeItem('accessToken')
          loading.value = false
          // Remove userData & Ability from localStorage
          localStorage.removeItem('userData')
          localStorage.removeItem('userAbility')
          errorMessages.value = { username: ['' + error + ''], password: ['' + error + ''] }
        })
    }
    return {
      checkCapslock,
      handleFormSubmit,
      isPasswordVisible,
      password,
      username,
      rememberme,
      capsTooltip,
      errorMessages,
      loading,
      validators: {
        requiredValidator,
      },
      // themeConfig
      appName: themeConfig.app.title,
      appLogo: themeConfig.app.logo,
      // Template Refs
      loginForm,
    }
  },
  methods: {},
}
</script>
<!-- <div class="text-h2">Hello world!</div> -->
<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner">
      <!-- brand logo
      <router-link
        to="/"
        class="brand-logo d-flex align-center"
      >
        <v-img
          :src="appLogo"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          class="me-3 "
        ></v-img>

        <h2 class="text--primary">
          {{ appName }}
        </h2>
      </router-link>
    / brand logo -->

      <v-row class="auth-row ma-0">
        <v-col lg="8" class="d-none d-lg-block position-relative overflow-hidden pa-0">
          <div class="auth-illustrator-wrapper">
            <!-- triangle bg -->
            <!-- <img
              height="362"
              class="auth-mask-bg"
              :src="require(`@/assets/images/misc/mask-v2-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
            /> -->

            <!-- tree -->
            <v-img height="226" width="300" class="auth-tree" src="@/assets/images/misc/tree-4.png"></v-img>

            <!-- 3d character -->
            <div class="d-flex align-center h-full pa-16 pe-0">
              <!-- <v-img
                contain
                max-width="100%"
                height="692"
                class="auth-3d-group"
                :src="require(`@/assets/images/3d-characters/n-group-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
              ></v-img> -->
            </div>
          </div>
        </v-col>

        <v-col lg="4" class="d-flex align-center auth-bg pa-10 pb-0">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="12" class="mx-auto">
              <v-card flat>
                <v-card-text>
                  <p class="text-2xl font-weight-semibold text--primary mb-2">Welcome to {{ appName }} 👋🏻</p>
                  <p class="mb-2"></p>
                </v-card-text>

                <!-- login form -->
                <v-card-text>
                  <v-form ref="loginForm" @submit.prevent="handleFormSubmit">
                    <v-text-field
                      v-model="username"
                      outlined
                      label="User Name"
                      placeholder="User Name"
                      :error-messages="errorMessages.username"
                      :rules="[validators.requiredValidator]"
                      hide-details="auto"
                      class="mb-6"
                    ></v-text-field>
                    <v-tooltip v-model="capsTooltip" left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="password"
                          outlined
                          :type="isPasswordVisible ? 'text' : 'password'"
                          label="Password"
                          :error-messages="errorMessages.password"
                          placeholder="Password"
                          :rules="[validators.requiredValidator]"
                          hide-details="auto"
                          class="mb-2"
                          @keydown="checkCapslock"
                          @click:append="isPasswordVisible = !isPasswordVisible"
                          @blur="capsTooltip = false"
                        ></v-text-field>
                      </template>
                      <span>Caps lock is On</span>
                    </v-tooltip>
                    <div class="d-flex align-center justify-space-between flex-wrap">
                      <v-checkbox v-model="rememberme" hide-details label="Remember Me" class="mt-0"> </v-checkbox>
                      <v-btn :loading="loading" :disabled="loading" block color="primary" type="submit" class="mt-6">
                        Login
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
