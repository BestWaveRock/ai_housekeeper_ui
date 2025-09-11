import type { R, TableDataInfo } from '@/api/model/resultModel';
import type { PetInformationForm, PetInformationQuery, PetInformationVo } from '@/api/petFriendly/model/informationModel';
import { request } from '@/utils/request';

/**
 * 查询宠物信息档案列表
 * @param query 查询参数
 */
export function listInformation(query?: PetInformationQuery) {
  return request.get<TableDataInfo<PetInformationVo>>({
    url: '/petFriendly/information/list',
    params: query,
  });
}

/**
 * 查询宠物信息档案详细
 * @param petId 主键
 */
export function getInformation(petId: string | number) {
  return request.get<R<PetInformationVo>>({
    url: `/petFriendly/information/${petId}`,
  });
}

/**
 * 新增宠物信息档案
 * @param data 表单数据
 */
export function addInformation(data: PetInformationForm) {
  return request.post<R<void>>({
    url: '/petFriendly/information',
    data,
  });
}

/**
 * 修改宠物信息档案
 * @param data
 */
export function updateInformation(data: PetInformationForm) {
  return request.put<R<void>>({
    url: '/petFriendly/information',
    data,
  });
}

/**
 * 删除宠物信息档案
 * @param petIds 主键串
 */
export function delInformation(petIds: number | Array<number>) {
  return request.delete<R<void>>({
    url: `/petFriendly/information/${petIds}`,
  });
}
