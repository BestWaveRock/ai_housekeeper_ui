import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 智能体列查询对象
 */
export interface SmartQuery extends BaseEntity {
  /** 智能体名称 */
  sName?: string;
  /** 智能体提示词 */
  sPrompt?: string;
  /** 智能体版本 */
  sVersion?: number;
}
/**
 * 智能体列业务对象
 */
export interface SmartForm {
  /**  */
  id?: number;
  /** 智能体名称 */
  sName?: string;
  /** 智能体提示词 */
  sPrompt?: string;
  /** 智能体版本 */
  sVersion?: number;
  /** 备注 */
  remark?: string;
}
/**
 * 智能体列视图对象
 */
export interface SmartVo {
  /**  */
  id?: number;
  /** 智能体名称 */
  sName?: string;
  /** 智能体提示词 */
  sPrompt?: string;
  /** 智能体版本 */
  sVersion?: number;
  /** 创建时间 */
  createTime?: any;
  /** 更新时间 */
  updateTime?: any;
  /** 备注 */
  remark?: string;
}
