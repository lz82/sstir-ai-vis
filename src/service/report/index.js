import { AppPost } from '@/utils/request'

// 通过学科和排序获取专家列表
export function QueryExpertList (data) {
  return AppPost('/visual/expertOfRecommended', {
    ...data
  })
}
