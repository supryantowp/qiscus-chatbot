import { Scene } from '../core/Scene'
import { WebhookEvent } from '../types'

export class OnBoardingScene extends Scene {
  public async onText(event: WebhookEvent): Promise<void> {
    this.updateUserScene(event.from.email, 'OnBoardingScene')
    this.sendMainMenu(event)
  }

  public async onKarosel(payload: WebhookEvent): Promise<void> {
    const { message, room } = payload
    const user_info = this.stateUserInfo.get('user_info')
    if (message.text == 'Solusi Markethac / Data Insight') {
      this.stateUserInfo.persist('user_info', { ...user_info, demo_product_type: 'Markethac' })
      return this.loadScene('MarkethacScene').onEnter(payload)
    }
  }

  public async sendMainMenu(event: WebhookEvent) {
    const { from, room } = event
    const options = JSON.parse(room.options)
    const userInfo = this.stateUserInfo.get('user_info')

    if (options.source == 'qiscus') {

      if (!userInfo?.industry) {
        await this.widget.sendText(
          room.id_str,
          `Hi ${userInfo?.full_name}, Tau gak sih di Insignia kita percaya bahwa data adalah oli terbarukan yang dapat membantu lini bisnis di perusahaan anda`
        )
      }

      const cards = {
        cards: [
          {
            image: 'https://images.unsplash.com/photo-1647403026324-021d7a54b2a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
            title: 'Markethac',
            description: "",
            buttons: [
              {
                label: "Solusi Markethac / Data Insight",
                type: "postback",
                payload: {
                  method: 'get',
                  url: "https://insignia.co.id",
                  payload: {
                    type: 'carousel'
                  }
                }
              },
            ]
          },
          {
            image: 'https://images.unsplash.com/photo-1557409239-720ef57b99d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
            title: 'Dialox',
            description: "",
            buttons: [
              {
                label: "Solusi Chatbot",
                type: "postback",
                payload: {
                  method: 'get',
                  url: "https://insignia.co.id",
                  payload: {
                    type: 'carousel'
                  }
                }
              }
            ]
          },
        ]
      }

      await this.widget.sendCarousel(room.id_str, cards)
    }
  }
}
