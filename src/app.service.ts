import { Injectable, Logger } from '@nestjs/common'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

import Handlebars from 'handlebars'

@Injectable()
export class AppService {
  private layout: string = ''
  private readonly _logger = new Logger(AppService.name)

  constructor() {
    this.layout = join(process.cwd(), 'views/layouts/default/layout.hbs')
    this.registerPartials(join(process.cwd(), 'views/layouts/default/partials'))
  }

  getLayout(): string {
    return this.layout
  }

  changeLayout() {
    this.layout = join(process.cwd(), 'views/layouts/default/layout.hbs')
    this.unRegisterPartials(join(process.cwd(), 'views/layouts/default/partials'))
    this.registerPartials(join(process.cwd(), 'views/layouts/other/partials'))
    return { status: true }
  }

  private registerPartials(partialDir: string) {
    this._logger.log(`registerPartials -> ${partialDir}`)
    const partials = readdirSync(partialDir)
    partials.forEach((p) => {
      const partialName = p.split('.')[0]
      this._logger.log(`Registering partial: ${partialName}`)
      Handlebars.registerPartial(partialName, Handlebars.compile(readFileSync(join(partialDir, p), 'utf-8')))
    })
  }

  private unRegisterPartials(partialDir: string) {
    const partials = readdirSync(partialDir)
    partials.forEach((p) => {
      const partialName = p.split('.')[0]
      this._logger.log(`UnRegistering partial: ${partialName}`)
      Handlebars.unregisterPartial(partialName)
    })
  }
}
