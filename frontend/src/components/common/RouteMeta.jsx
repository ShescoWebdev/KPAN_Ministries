import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, pages } from '../../seo/pages'

const upsert = (selector, tag, props, attr, value) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = Object.assign(document.createElement(tag), props)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const page = pages.find((item) => item.path === route) ?? SITE

    document.title = page.title
    upsert('meta[name="description"]', 'meta', { name: 'description' }, 'content', page.description)
    upsert('link[rel="canonical"]', 'link', { rel: 'canonical' }, 'href', `${window.location.origin}${route}`)
  }, [pathname])

  return null
}

export default RouteMeta