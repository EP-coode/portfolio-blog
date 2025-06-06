import React from 'react'

// Put this in head
const Preloads = () => {
  return (
    <>
      {/* Fonts */}
      <link
        rel="preload"
        href="/fonts/ChakaraPetch/ChakraPetch-Regular.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/ChakaraPetch/ChakraPetch-Light.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/ChakaraPetch/ChakraPetch-SemiBold.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/ChakaraPetch/ChakraPetch-Bold.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/ChakaraPetch/ChakraPetch-Italic.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/LibreBarcode128Text/LibreBarcode128Text-Regular.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/Rajdhani/Rajdhani-Regular.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/Rajdhani/Rajdhani-Bold.ttf"
        as="font"
        crossOrigin=""
        type="font/ttf"
      />
    </>
  )
}

export default Preloads
