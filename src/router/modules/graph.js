const Graph = () => import(/* webpackChunkName: "searchresult" */ '@/views/graph/index')

export default {
  path: '/graph/:searchKey',
  props: true,
  component: Graph,
  name: 'GraphDetail'
}
