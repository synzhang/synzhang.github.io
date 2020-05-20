import Document, { Html, Head, Main, NextScript } from 'next/document'

class ExtendedDocument extends Document {
  render () {
    return (
      <Html lang='zh-CN'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ExtendedDocument