import { ImageDictionary } from '@/entities/types/types'

class Load {
  static images(...files: string[]): Promise<ImageDictionary> {
    let loaded = 0
    const images: ImageDictionary = {}

    return new Promise(resolve => {
      files.forEach((file: string) => {
        const image = new Image()
        image.src = file
        image.onload = () => {
          loaded++
          images[file] = image
          if (loaded === files.length) {
            resolve(images)
          }
        }
      })
    })
  }
}

export default Load
