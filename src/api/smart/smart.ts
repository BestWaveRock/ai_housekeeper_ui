import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { SmartForm, SmartQuery, SmartVo } from '@/api/smart/model/smartModel';
import { request } from '@/utils/request';

/**
 * 查询智能体列列表
 * @param query 查询参数
 */
export function listSmart(query?: SmartQuery) {
  return request.get<TableDataInfo<SmartVo>>({
    url: '/smart/smart/list',
    params: query,
  });
}

/**
 * 查询智能体列详细
 * @param id 主键
 */
export function getSmart(id: number) {
  return request.get<R<SmartVo>>({
    url: `/smart/smart/${id}`,
  });
}

/**
 * 新增智能体列
 * @param data 表单数据
 */
export function addSmart(data: SmartForm) {
  return request.post<R<void>>({
    url: '/smart/smart',
    data,
  });
}

/**
 * 修改智能体列
 * @param data
 */
export function updateSmart(data: SmartForm) {
  return request.put<R<void>>({
    url: '/smart/smart',
    data,
  });
}

/**
 * 删除智能体列
 * @param ids 主键串
 */
export function delSmart(ids: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/smart/smart/${ids}`,
  });
}
