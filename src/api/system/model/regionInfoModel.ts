import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 行政区划管理查询对象
 */
export interface ChinaRegionInfoQuery extends BaseEntity {
  /**  */
  pid?: number;
  /**  */
  deep?: number;
  /**  */
  name?: string;
  /**  */
  pinyinPrefix?: string;
  /**  */
  pinyin?: string;
  /**  */
  extId?: string;
  /**  */
  extName?: string;
}
/**
 * 行政区划管理业务对象
 */
export interface ChinaRegionInfoForm {
  /**  */
  id?: number;
  /**  */
  pid?: number;
  /**  */
  deep?: number;
  /**  */
  name?: string;
  /**  */
  pinyinPrefix?: string;
  /**  */
  pinyin?: string;
  /**  */
  extId?: string;
  /**  */
  extName?: string;
}
/**
 * 行政区划管理视图对象
 */
export interface ChinaRegionInfoVo {
  /**  */
  id?: number;
  /**  */
  pid?: number;
  /**  */
  deep?: number;
  /**  */
  name?: string;
  /**  */
  pinyinPrefix?: string;
  /**  */
  pinyin?: string;
  /**  */
  extId?: string;
  /**  */
  extName?: string;
}
