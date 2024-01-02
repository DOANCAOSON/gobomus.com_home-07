import { Controller, Get, Res } from '@nestjs/common'
import { AppService } from './app.service'

import type { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly _service: AppService) {}

  // Home page
  @Get()
  root(@Res() res: Response) {
    return res.render('layouts/default/index', {
      layout: this._service.getLayout(),
      title: 'Title Default',
      message: '',
      header: {},
      footer: {},
      posts: [],
      latestposts: [ 
        {
          img: "https://gobomus.com/wp-content/uploads/2023/06/bhavya-pareek-HVB-XhdWOWo-unsplash-550x400.jpg",
          name: "Taking Control Of Your Daily Life Is Easy When You Know How!",
          date: "June 6, 2023",
          comment: "No Comment"
        },
         {
          img: "https://gobomus.com/wp-content/uploads/2023/06/benjamin-voros-X63FTIZFbZo-unsplash-550x400.jpg",
          name: "If You Were To Start A Business From Scratch Tomorrow",
          date: "June 6, 2023",
          comment: "No Comment"
        },
        {
          img: "https://gobomus.com/wp-content/uploads/2023/06/joakim-honkasalo-UQ7R2WWQQvA-unsplash-550x400.jpg",
          name: "A Journey Through The Majestic Mountains Of Switzerland",
          date: "June 6, 2023",
          comment: "No Comment"
        },
         {
          img: "https://gobomus.com/wp-content/uploads/2023/08/marissa-grootes-O8HHFS7InmA-unsplash-min-scaled-1-200x300.jpg",
          name: "How To Photograph A Model Like A Professional",
          date: "June 6, 2023",
          comment: "No Comment"
        },
          {
          img: "https://gobomus.com/wp-content/uploads/2023/08/roberto-nickson-_ju6Vk0gXwc-unsplash-min-scaled-1-550x400.jpg",
          name: "The Single Most Important Thing You Need To Know About Success",
          date: "June 6, 2023",
          comment: "No Comment"
        },
         {
          img: "https://gobomus.com/wp-content/uploads/2023/08/pierre-chatel-innocenti-pxoZSTdAzeU-unsplash-min-550x400.jpg",
          name: "How To Stay Positive During Challenging Times",
          date: "June 6, 2023",
          comment: "No Comment"
        },
         {
          img: "https://gobomus.com/wp-content/uploads/2023/06/scott-walsh-lxxX3fUqHDs-unsplash-scaled-1-550x400.jpg",
          name: "I’m Happy This Comfortable Trend Is Still Going To Be Cool In 2023",
          date: "June 6, 2023",
          comment: "No Comment"
        },
          {
          img: "https://gobomus.com/wp-content/uploads/2023/06/connor-poole-k5lTncJ95Fo-unsplash-550x400.jpg",
          name: "Finding Your Inner Peace Through Meditation",
          date: "June 6, 2023",
          comment: "No Comment"
        },
      ],
      featuredPosts:[
        {
            title: "Gobomus first test post",
            date: "September 29, 2023 • 1 Min Read",
            head: "Health",
            img: "https://gobomus.com/wp-content/uploads/2023/10/logo_v001-1000x340.jpg",
            className:"md:col-span-2 md:row-span-1  lg:row-span-2 lg:col-span-1"
        },
        {
            title: "Utilities for controlling how an element is positioned in the DOM.",
            date: "June 6, 2023 • 5 Min Read",
            head: "Uncategorized",
            img: "https://gobomus.com/wp-content/uploads/2023/06/brooke-cagle-B_LjR_poGgo-unsplash-1000x600.jpg",
            className:""
        },
        {
            title: "Health Tips And Benefits Of Healthy Lifestyle You Should Consider",
            date: "June 6, 2023 • 5 Min Read",
            head: "Health",
            img: "https://gobomus.com/wp-content/uploads/2023/06/michael-hirsch-tXkzUEuheU-unsplash-1000x600.jpg",
            className:"md:col-span-1 lg:col-span-2"
        },
        {
            title: "Style Is A Way To Say Who You Are, Without Having To Speak",
            date: "June 6, 2023 • 5 Min Read",
            head: "Lifestyle",
            img: "https://chancosvn.com/upload_images/images/2023/02/25/cac-style-thoi-trang-nu-co-dien(1).jpg",
            className:"md:col-span-1 lg:col-span-2 "
        },
        {
            title: "Style Is A Way To Say Who You Are, Without Having To Speak",
            date: "June 6, 2023 • 5 Min Read",
            head: "Technology",
            img: "https://gobomus.com/wp-content/uploads/2023/06/constantin-panagopoulos-Z1TaQKGo6Gw-unsplash-1000x600.jpg",
            className:""
        }
      ]

    })
  }

  @Get('other')
  other(@Res() res: Response) {
    return res.render('layouts/other', { message: 'Hello from Other Layout!' })
  }

  @Get('change')
  change() {
    return this._service.changeLayout()
  }
}
