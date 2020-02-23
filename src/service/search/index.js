import { AppPost } from '@/utils/request'

// 根据关键字获取介绍
export function QueryIntroByKeyword (keyword) {
  return AppPost('/search/intro', {
    keyword
  })
}

// 根据关键词获取知识图谱信息
export function QueryGraphByKeyword (keyword, type) {
  return AppPost('/search/graph', {
    keyword,
    type
  })
}

// 根据关键词获取论文信息
export function QueryPaperByKeyword (param) {
  return AppPost('/search/paper', param)
}

// 根据关键词获取图书信息
export function QueryBookByKeyword (param) {
  return AppPost('/search/book', param)
}

// 根据关键词获取专利信息
export function QueryPatentByKeyword (param) {
  return AppPost('/search/patent', param)
}

// 根据关键词获取标准信息
export function QueryStandardByKeyword (param) {
  return AppPost('/search/standard', param)
}
