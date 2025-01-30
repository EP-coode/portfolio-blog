import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons'
import Button from '@/modules/common/ui/Button'

export default function DesignSystemPage() {
  return (
    <div className="content-grid mb-20">
      <div className="content">
        <h1>Typography</h1>
        <h1>H1: Lorem Ipsum is simply dummy text.</h1>
        <h2>H2: Lorem Ipsum is simply dummy text.</h2>
        <h3>H3: Lorem Ipsum is simply dummy text.</h3>
        <h4>H4: Lorem Ipsum is simply dummy text.</h4>
        <h5>H5: Lorem Ipsum is simply dummy text.</h5>
        <h6>H6: Lorem Ipsum is simply dummy text.</h6>
        <p>
          Lorem Ipsum is simply <b>dummy</b> text of the printing and typesetting industry. Lorem
          Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and <i>scrambled</i> it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially <a href="https://www.google.pl/">unchanged</a>. It was
          popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
        <p className="font-barcode128Text">Barcode goes here</p>
      </div>
      <div className="full-width">
        <h1>Content full width</h1>
        <p>
          Lorem Ipsum is simply <b>dummy</b> text of the printing and typesetting industry. Lorem
          Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and <i>scrambled</i> it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially <a href="https://www.google.pl/">unchanged</a>. It was
          popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
      </div>
      <div className="breakout">
        <h1>Content breakout</h1>
        <p>
          Lorem Ipsum is simply <b>dummy</b> text of the printing and typesetting industry. Lorem
          Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and <i>scrambled</i> it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially <a href="https://www.google.pl/">unchanged</a>. It was
          popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
      </div>
      <div className="content">
        <h1>List</h1>
        <ul>
          <li>Lorem Ipsum is simply dummy</li>
          <li>Lorem Ipsum is simply dummy</li>
          <li>
            <ul>
              <li>Lorem Ipsum is simply dummy</li>
              <li>Lorem Ipsum is simply dummy</li>
              <li>Lorem Ipsum is simply dummy</li>
            </ul>
          </li>
          <li>Lorem Ipsum is simply dummy</li>
        </ul>
        <ol style={{ marginTop: '20px' }}>
          <li>Lorem Ipsum is simply dummy</li>
          <li>Lorem Ipsum is simply dummy</li>
          <li>
            <ol>
              <li>Lorem Ipsum is simply dummy</li>
              <li>Lorem Ipsum is simply dummy</li>
              <li>Lorem Ipsum is simply dummy</li>
            </ol>
          </li>
          <li>Lorem Ipsum is simply dummy</li>
        </ol>
      </div>
      <div className="content">
        <h1>Example icons</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FaceIcon />
          <SunIcon />
          <ImageIcon />
        </div>
      </div>
      <div className="content">
        <h1>Buttons</h1>
        <div style={{ display: 'flex', gap: '6px', flexDirection: 'row', alignItems: 'start' }}>
          <Button leftCornerCut="bottom" size="sm">
            Click Me
          </Button>
          <Button rightCornerCut="bottom" leftCornerCut="top">
            Click Me
          </Button>
          <Button rightCornerCut="bottom" size="lg">
            Click Me
          </Button>
        </div>
      </div>
    </div>
  )
}
