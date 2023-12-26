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
      message: 'Hello from Default Layout!',
      header: {},
      footer: {},
      posts: [],
      recentPosts: []
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
