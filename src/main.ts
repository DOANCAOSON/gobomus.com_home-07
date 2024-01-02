import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { engine } from 'express-handlebars'
import { join } from 'path'
import { AppModule } from './app.module'

import * as cookie from 'cookie-parser'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(session({ secret: 'META', resave: false, saveUninitialized: false }))
  app.use(cookie())

  app.useStaticAssets(join(__dirname, '..', 'public'))

  app.engine('hbs', engine({ extname: 'hbs' }))

  app.setViewEngine('hbs')

  await app.listen(3000)
}
bootstrap()
