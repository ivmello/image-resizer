import { Request, Response } from 'express'
import fs from 'fs'
import sharp from 'sharp'

require('dotenv').config()

class ResizerController {
  private sourceImgPath: string = process.env.SOURCE_FILE_PATH || 'files'

  private destinationImgPath: string = process.env.DESTINATION_FILE_PATH || 'converted'

  /**
   * [GET] /
   * @param req: Request
   * @param res: Response
   */
  public index = async (req: Request, res: Response): Promise <any> => {
    const { image, width, height } = req.query

    if (!image || !width || !height) return res.send('Parametros invalidos (image, width, height)')

    const imageConverted = `${width}x${height}-${image}`

    const destinationExists = await this.fileExist(`${this.destinationImgPath}/${imageConverted}`)
    if (!destinationExists) {
      const sourceExists = await this.fileExist(`${this.sourceImgPath}/${image}`)
      if (!sourceExists) {
        return res.send('Arquivo nao encontrado')
      }

      try {
        await this.saveFileOnFolder(image, imageConverted, width, height)
      } catch (err) {
        return res.send(err)
      }
    }

    res.type(`image/png`)
    sharp(`${this.destinationImgPath}/${imageConverted}`).pipe(res)
  }

  // private renderImage()

  private fileExist = async (filepath: string): Promise <boolean> => {
    return new Promise((resolve): void => {
      fs.access(filepath, fs.F_OK, (err): void => {
        if (err) resolve(false)
        resolve(true)
      })
    })
  }

  private saveFileOnFolder = async (imageOriginal: string, imageConverted: string, width:string, height:string): Promise <object> => {
    return new Promise((resolve, reject): void => {
      let widthInt = null
      let heightInt = null

      if (width) widthInt = parseInt(width)
      if (height) heightInt = parseInt(height)

      sharp(`${this.sourceImgPath}/${imageOriginal}`)
        .resize(widthInt, heightInt, {
          withoutEnlargement: true
        })
        .toFile(`${this.destinationImgPath}/${imageConverted}`, (err, info): void => {
          if (err) reject(err)
          resolve(info)
        })
    })
  }
}

export default new ResizerController()
