import { Request } from 'express'
import { getNameFromFullname, handleImage } from '~/utils/file'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { env } from '~/configs/environment'
class ImagesService {
  async uploadImage(req: Request) {
    const file = await handleImage(req)

    // use promise.all to file in file.map execution faster, rather than use file.map normally
    const result = await Promise.all(
      file.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)
        return isProduction
          ? `${env.HOST}/static/${newName}.jpg`
          : `http://localhost:${env.PORT}${env.API_VERSION}/static/image/${newName}.jpg`
      })
    )
    return result
  }
}

const imagesService = new ImagesService()

export default imagesService
