class Load {
  static images(...files: string[]): Promise<{ [key: string]: HTMLImageElement }> {
    let loaded = 0
    const images: { [key: string]: HTMLImageElement } = {}

    return new Promise(resolve => {
      files.forEach((file: string) => {
        const img = new Image()
        img.src = file
        img.onload = () => {
          loaded++
          images[file] = img
          if (loaded === files.length) {
            resolve(images)
          }
        }
      })
    })
  }
}

export default Load
