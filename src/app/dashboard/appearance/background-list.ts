export interface IBackground {
  name?: string,
  bgClass?: string,
  previewImage?: string,
  type?: string
}

export const backgrounds = [
  {
    name: 'Flat Color',
    color: '',
    previewImage: '/background/flat-color.png',
    type: 'Free'
  },
  {
    name: 'Gradient',
    bgClass: 'gradient',
    previewImage: '/background/gradient.png',
    type: 'Free'
  },
  {
    name: 'Image',
    bgClass: 'image',
    previewImage: '/background/image.png',
    type: 'Premium'
  },
  {
    name: 'Video',
    bgClass: 'video',
    previewImage: '/background/video.png',
    type: 'Premium'
  },
  {
    name: 'Circles',
    bgClass: 'circles',
    previewImage: '/background/circles.png',
    type: 'Premium'
  },
  {
    name: 'Rhombus',
    bgClass: 'rhombus',
    previewImage: '/background/rhombus.png',
    type: 'Premium'
  },
  {
    name: 'Zig Zag',
    bgClass: 'zig-zag',
    previewImage: '/background/zig-zag.png',
    type: 'Premium'
  },
  {
    name: 'Stripes',
    bgClass: 'stripes',
    previewImage: '/background/stripes.png',
    type: 'Premium'
  },
  {
    name: 'Polka',
    bgClass: 'polka',
    previewImage: '/background/polka.png',
    type: 'Premium'
  },
  {
    name: 'Cross',
    bgClass: 'cross',
    previewImage: '/background/cross.png',
    type: 'Premium'
  },
]