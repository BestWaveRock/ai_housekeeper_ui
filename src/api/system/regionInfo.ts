import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { ChinaRegionInfoForm, ChinaRegionInfoQuery, ChinaRegionInfoVo } from '@/api/system/model/regionInfoModel';
import { request } from '@/utils/request';

/**
 * 查询行政区划管理列表
 * @param query 查询参数
 */
export function listRegionInfo(query?: ChinaRegionInfoQuery) {
  return request.get<TableDataInfo<ChinaRegionInfoVo>>({
    url: '/system/regionInfo/list',
    params: query,
  });
}

/**
 * 查询行政区划管理详细
 * @param id 主键
 */
export function getRegionInfo(id: number) {
  return request.get<R<ChinaRegionInfoVo>>({
    url: `/system/regionInfo/${id}`,
  });
}

/**
 * 新增行政区划管理
 * @param data 表单数据
 */
export function addRegionInfo(data: ChinaRegionInfoForm) {
  return request.post<R<void>>({
    url: '/system/regionInfo',
    data,
  });
}

/**
 * 修改行政区划管理
 * @param data
 */
export function updateRegionInfo(data: ChinaRegionInfoForm) {
  return request.put<R<void>>({
    url: '/system/regionInfo',
    data,
  });
}

/**
 * 删除行政区划管理
 * @param ids 主键串
 */
export function delRegionInfo(ids: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/system/regionInfo/${ids}`,
  });
}
