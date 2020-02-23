import { AppPost } from '@/utils/request'

// 通过专家Id获取专家详情
export function GetExpertInfoById (id) {
  return AppPost('/expert/info', {
    id
  })
}

// 通过论文Id获取论文详情
export function GetPaperInfoById (id) {
  return AppPost('/paper/info', {
    id
  })
}

// 根据专利Id获取专利详情
export function GetPatentInfoById (id) {
  return AppPost('/patent/info', {
    id
  })
}

// 根据标准Id获取标准详情
export function GetStandardInfoById (id) {
  return AppPost('/standard/info', {
    id
  })
}

// 根据图书Id获取图书详情
export function GetBookInfoById (id) {
  return AppPost('/book/info', {
    id
  })
}
