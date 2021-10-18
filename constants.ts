import { ImageProps } from 'react-native'

export const BACKGROUND_COLOR = '#282534'

export interface PageInterface extends Pick<ImageProps, 'source'> {
  title: string
  description: string
}

export const PAGES: PageInterface[] = [
  {
    title: 'Best Digital Solution',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    source: require('./assets/image1.png')
  },
  {
    title: 'Achieve Your Goal',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    source: require('./assets/image2.png')
  },
  {
    title: 'Increase Your Value',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    source: require('./assets/image3.png')
  }
]
