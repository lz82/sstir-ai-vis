const Layout = () => import(/*  */ '@/layout/search')

const SearchResult = () => import(/* webpackChunkName: "searchresult" */ '@/views/search-result/index')

export default {
  path: '/search',
  component: Layout,
  name: 'SearchLayout',
  children: [
    {
      path: 'result/:searchKey?',
      props: true,
      component: SearchResult,
      name: 'SearchResult'
    }
  ]
}
