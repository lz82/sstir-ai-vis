const Layout = () => import(/*  */ '@/layout/search')

const PaperDetail = () => import(/* webpackChunkName: "paperdetail" */ '@/views/detail/paper')
const BookDetail = () => import(/* webpackChunkName: "bookdetail" */ '@/views/detail/book')
const PatentDetail = () => import(/* webpackChunkName: "patentdetail" */ '@/views/detail/patent')
const StandardDetail = () => import(/* webpackChunkName: "standarddetail" */ '@/views/detail/standard')
const ExpertDetail = () => import(/* webpackChunkName: "expertdetail" */ '@/views/detail/expert')

export default {
  path: '/detail',
  component: Layout,
  name: 'DetailLayout',
  children: [
    {
      path: 'paper/:id',
      props: true,
      component: PaperDetail,
      name: 'PaperDetail'
    },
    {
      path: 'book/:id',
      props: true,
      component: BookDetail,
      name: 'BookDetail'
    },
    {
      path: 'patent/:id',
      props: true,
      component: PatentDetail,
      name: 'PatentDetail'
    },
    {
      path: 'standard/:id',
      props: true,
      component: StandardDetail,
      name: 'StandardDetail'
    },
    {
      path: 'expert/:id',
      props: true,
      component: ExpertDetail,
      name: 'ExpertDetail'
    }
  ]
}
