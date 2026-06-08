import { loadScript } from './index'
import { NETWORK_ERROR_TEXT } from './errorCode'

interface FacebookAuthResponse {
  userID: string
  accessToken: string
}

interface GoogleAuthResponse {
  credential: string
  client_id: string
}

export interface LoginResponseData {
  uid?: string | number
  role_id?: string | number
  [key: string]: unknown
}

export interface LoginResponse {
  data?: LoginResponseData
  code?: number
  msg?: string
  [key: string]: unknown
}

export interface CampaignConfig {
  googleClientID: string
  appleServerID: string
  fbClientID: string
  productId: string
  gameId: string
  partnerType: number
}

export interface LoadingToastInstance {
  close: () => void
}

interface FacebookLoginParams {
  userID: string
  accessToken: string
  gameid: string | number
}

interface GoogleLoginParams {
  time: number
  IdToken: string
  client_id: string
  gameid: string | number
}

interface AppleLoginParams {
  id_token?: string
  code?: string
  state?: string
  gameid: string | number
}

export interface LoginServiceDeps {
  campaignConfig?: CampaignConfig
  facebookLogin: (params: FacebookLoginParams) => Promise<LoginResponse>
  googleLogin: (params: GoogleLoginParams) => Promise<LoginResponse>
  appleLogin: (params: AppleLoginParams) => Promise<LoginResponse>
  showFailToast?: (message: string) => void
  createShowLoadingToast?: () => LoadingToastInstance
  onLoginSuccess?: (res: LoginResponse) => Promise<boolean | void> | boolean | void
}

declare global {
  interface Window {
    FB?: any
    google?: any
    AppleID?: any
  }
}

const noopLoading = (): LoadingToastInstance => ({ close: () => {} })

export class LoginService {
  private isLoadSDK = false

  constructor(private readonly deps: LoginServiceDeps) {
    void this.initThirdPartySDK()
  }

  private get campaignConfig(): CampaignConfig {
      return this.deps.campaignConfig || {
        googleClientID: '',
        appleServerID: '',
        fbClientID: '',
        productId: '',
        gameId: '',
        partnerType: 0,
      }
  }

  private get showFailToast() {
    return (message: string = NETWORK_ERROR_TEXT) => {
      this.deps.showFailToast?.(message)
    }
  }

  private get createShowLoadingToast() {
    return this.deps.createShowLoadingToast || noopLoading
  }

  private async openFacebookLoginDialog(): Promise<FacebookAuthResponse> {
    return new Promise((resolve, reject) => {
      try {
        window?.FB?.login((res: any) => {
          if (res?.authResponse) {
            resolve(res.authResponse)
          } else {
            reject(res)
          }
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  async handleFacebookLogin() {
    try {
      const params = await this.openFacebookLoginDialog()
      const loadingInstance = this.createShowLoadingToast()
      const { userID = '', accessToken = '' } = params
      const res = await this.deps.facebookLogin({
        userID,
        accessToken,
        gameid: this.campaignConfig.gameId,
      })

      const isLoginSuccess = await this.handleLogin(res)
      if (!isLoginSuccess) {
        return
      }
      loadingInstance.close()
    } catch (err: any) {
      if (typeof err?.code !== 'number' && (err?.authResponse || err?.status !== 'unknown')) {
        this.showFailToast()
      }
    }
  }

  async initThirdPartySDK() {
    if (this.isLoadSDK) return

    try {
      await Promise.allSettled([
        loadScript('https://connect.facebook.net/en_US/sdk.js'),
        loadScript('https://accounts.google.com/gsi/client'),
        loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'),
      ])
      this.isLoadSDK = true

      if (this.campaignConfig.googleClientID) {
        window.google?.accounts?.id?.initialize({
          client_id: this.campaignConfig.googleClientID,
          cancel_on_tap_outside: false,
          callback: this.handleGoogleCallback,
          use_fedcm_for_prompt: true,
        })
      }

      if (this.campaignConfig.appleServerID) {
        const publicPath = process.env.NEXT_PUBLIC_BASE_PATH || ''
        window.AppleID?.auth?.init({
          clientId: this.campaignConfig.appleServerID,
          scope: 'email name',
          redirectURI: `${window.location.origin}${publicPath}`,
          state: 'test_apple_sign_in',
          usePopup: true,
        })
      }

      if (this.campaignConfig.fbClientID) {
        window.FB?.init({
          appId: this.campaignConfig.fbClientID,
          cookie: true,
          xfbml: true,
          version: 'v20.0',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  private handleGoogleCallback = async (googleRes: GoogleAuthResponse) => {
    try {
      const { credential: IdToken = '', client_id = this.campaignConfig.googleClientID || '' } = googleRes
      const loadingInstance = this.createShowLoadingToast()
      const res = await this.deps.googleLogin({
        time: Date.now(),
        IdToken,
        client_id,
        gameid: this.campaignConfig.gameId,
      })

      const isLoginSuccess = await this.handleLogin(res)
      if (!isLoginSuccess) {
        return
      }
      loadingInstance.close()
    } catch (err: any) {
      if (typeof err?.code !== 'number') {
        this.showFailToast()
      }
    }
  }

  handleGoogleLogin() {
    if (!window.google?.accounts?.id?.renderButton) {
      this.showFailToast()
      return
    }

    const match = navigator.userAgent.match(/Chrome\/(\d+)/)
    if (match && match[1]) {
      const version = parseInt(match[1], 10)
      if (version < 117) {
        this.showFailToast('Please use Chrome 117 or above')
        return
      }
    }

    this.showGoogleOneTapFallback()
  }

  private showGoogleOneTapFallback() {
    try {
      const tempDiv = document.createElement('div')
      tempDiv.style.display = 'none'
      tempDiv.id = 'temp-google-login'
      document.body.appendChild(tempDiv)

      window.google?.accounts?.id?.renderButton(tempDiv, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
      })

      setTimeout(() => {
        const button = tempDiv.querySelector('div[role="button"]')
        if (button) {
          ;(button as HTMLElement).click()
        }
        setTimeout(() => {
          if (tempDiv.parentNode) {
            tempDiv.parentNode.removeChild(tempDiv)
          }
        }, 1000)
      }, 100)
    } catch {
      this.showFailToast()
    }
  }

  private async openAppleLoginDialog(): Promise<Record<string, unknown>> {
    try {
      const appleRes = await window?.AppleID?.auth?.signIn()
      return appleRes?.authorization ?? {}
    } catch (err) {
      throw err
    }
  }

  async handleAppleLogin() {
    try {
      const params = await this.openAppleLoginDialog()
      const loadingInstance = this.createShowLoadingToast()
      const res = await this.deps.appleLogin({
        ...params,
        gameid: this.campaignConfig.gameId,
      })

      const isLoginSuccess = await this.handleLogin(res)
      if (!isLoginSuccess) {
        return
      }
      loadingInstance.close()
    } catch (err: any) {
      if (typeof err?.code !== 'number' && err?.error !== 'popup_closed_by_user') {
        this.showFailToast()
      }
    }
  }

  async handleLogin(res: LoginResponse): Promise<boolean> {
    try {
      if (this.deps.onLoginSuccess) {
        const result = await this.deps.onLoginSuccess(res)
        return result !== false
      }
      return true
    } catch (error: any) {
      // const msg = error?.message || NETWORK_ERROR_TEXT
      this.showFailToast()
      return false
    }
  }
}

export function createLoginService(deps: LoginServiceDeps) {
  return new LoginService(deps)
}
