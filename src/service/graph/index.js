import { AppPost } from '@/utils/request'

// 根据关键词搜索图谱信息
export function QueryGraphInfoByKeyword (id) {
  return AppPost('/map/info', {
    id
  })
}
