const childProcess = require('child_process')
const fs = require('fs')

function doExec(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, { env: process.env }, async (error, stdout, stderr) => {
      if (error) {
        console.trace(error)
        reject(error)
      }
      resolve(true)
    })
  })
}

async function bootstrap() {
  console.log('Start bundling assets')

  await doExec('rm -rf ./bundle')

  await doExec('yarn build:css')

  await doExec('rm -rf ./bundle/layouts')

  await doExec('cp -R views/layouts ./bundle/layouts')

  let value = fs.readFileSync('./bundle/layouts/default/index.hbs', 'utf-8')

  value = value.replace(`<link rel='stylesheet' href='layouts/default/assets/index.css' />`, '')

  const assets = fs.readdirSync('./bundle/assets')

  const links = assets.map((f) => {
    return `<link rel='stylesheet' href='assets/${f}' />`
  })

  value = value.replace(`</head>`, `${links.join('\n')}\n </head>`)

  fs.writeFileSync('./bundle/layouts/default/index.hbs', value)

  console.log('Finish bundling assets')
}

bootstrap()
