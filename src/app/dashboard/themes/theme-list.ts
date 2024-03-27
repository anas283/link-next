export interface ITheme {
  name?: string,
  themeClass?: string,
  previewImage?: string
}

export const themes = [
  {
    name: 'Iris Snow',
    themeClass: 'iris-snow',
    previewImage: '/themes/iris-snow.png'
  },
  {
    name: 'Iris White',
    themeClass: 'iris-white',
    previewImage: '/themes/iris-white.png'
  },
  {
    name: 'Iris Grey',
    themeClass: 'iris-grey',
    previewImage: '/themes/iris-grey.png'
  },
  {
    name: 'Iris Blue',
    themeClass: 'iris-blue',
    previewImage: '/themes/iris-blue.png'
  },
  {
    name: 'Iris Purple',
    themeClass: 'iris-purple',
    previewImage: '/themes/iris-purple.png'
  },
  {
    name: 'Iris Forest',
    themeClass: 'iris-forest',
    previewImage: '/themes/iris-forest.png'
  },
  {
    name: 'Iris Dark',
    themeClass: 'iris-dark',
    previewImage: '/themes/iris-dark.png'
  },
  {
    name: 'Iris Black',
    themeClass: 'iris-black',
    previewImage: '/themes/iris-black.png'
  }
]