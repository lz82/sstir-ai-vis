const Layout = () => import(/* webpackChunkName: "reportlayout" */ '@/layout/report')

const ReportList = () => import(/* webpackChunkName: "report-list" */ '@/views/report/report-list')

const ReportExpertDomain = () =>
  import(/* webpackChunkName: "report-expert-domain" */ '@/views/report/expert-domain')

const ReportExpertIndustry = () =>
  import(/* webpackChunkName: "report-expert-industry" */ '@/views/report/expert-industry')

const ReportOrg = () => import(/* webpackChunkName: "report-org" */ '@/views/report/org')

const ReportExpertRank = () =>
  import(/* webpackChunkName: "report-expert-rank" */ '@/views/report/expert-rank')

export default [
  {
    path: '/report',
    redirect: '/report/award',
    name: 'ReportLayout',
    component: Layout,
    children: [
      {
        path: '/report/list',
        component: ReportList,
        name: 'ReportList'
      },
      {
        path: '/report/expert-domain',
        component: ReportExpertDomain,
        name: 'ReportExpertDomain'
      },
      {
        path: '/report/expert-industry',
        component: ReportExpertIndustry,
        name: 'ReportExpertIndustry'
      },
      {
        path: '/report/org',
        component: ReportOrg,
        name: 'ReportOrg'
      },
      {
        path: '/report/expert-rank',
        component: ReportExpertRank,
        name: 'ReportExpertRank'
      }
    ]
  }
]
