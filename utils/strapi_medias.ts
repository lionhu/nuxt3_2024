export function getStrapiMedia(_image: any, options: string = '') {
  const runtimeConfig = useRuntimeConfig()
  const prefix = runtimeConfig.public.STRAPI_URL + '/uploads/'
  console.log('prefix: ', prefix, _image.startsWith(prefix))

  if (!_image || !_image.startsWith(prefix))
    return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'

  return `${_image}?${options !== '' ? options : ''}`
}
