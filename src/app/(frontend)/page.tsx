import Hero from '@/modules/common/components/Hero'
import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons'

export default function HomePage() {
  return (
    <>
      <div>
        <Hero></Hero>
        <FaceIcon />
        <SunIcon />
        <ImageIcon />
      </div>
    </>
  )
}
