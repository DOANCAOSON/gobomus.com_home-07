import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  OnApplicationBootstrap,
  RequestMethod
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { HttpAdapterHost } from '@nestjs/core'
import type { Request, Response } from 'express'

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  private readonly _maxAge = 1000 * 60 * 5 // would expire after 5 minutes
  private readonly _logger = new Logger(LoggerMiddleware.name)

  use(req: Request, res: Response, next: () => any) {
    const start = Date.now()

    let reqId = req.cookies['reqId']
    if (!req.cookies['reqId']) {
      reqId = req.sessionID
      res.cookie('reqId', reqId, { maxAge: this._maxAge, httpOnly: true })
    }

    res.on('close', async () => {
      if (req.originalUrl.startsWith('/static')) {
        return
      }

      const message = `Request -> ${reqId} ${req.hostname} ${req.ip} ${req.get('User-Agent')} ${req.method} ${
        req.originalUrl
      } (${Date.now() - start} ms) ${res.statusCode}`
      this._logger.log(message)
      if (req.statusCode === 200) {
        setTimeout(() => {
          // make sure request coming from unique user
          // TODO save this info to database
          const json = {
            requestId: reqId,
            hostname: req.hostname,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            method: req.method,
            originalUrl: req.originalUrl,
            date: Date.now()
          }
        }, 0)
      }
    })
    next()
  }
}

@Module({ imports: [], controllers: [AppController], providers: [AppService] })
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private readonly refHost: HttpAdapterHost) {}

  onApplicationBootstrap() {
    const server = this.refHost.httpAdapter.getHttpServer()
    server.setMaxListeners(0)
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
