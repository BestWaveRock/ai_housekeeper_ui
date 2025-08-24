import type { BaseEntity } from '@/api/model/resultModel';

/**
 * 宠物主人积分兑换商品查询对象
 */
export interface PetOwnerIntegralCommodityQuery extends BaseEntity {
  /** 状态:0=正常,1=停用,2=草稿 */
  status?: number;
  /** 商品名称 */
  commodityTitle?: string;
  /** 商品编码 */
  commodityCode?: string;
  /** 商品信息 */
  commodityInformation?: string;
  /** 商品图 */
  commodityImg?: string;
  /** 商品价值:积分 */
  commodityValue?: number;
  /** 库存 */
  inventory?: number;
  /** 保留字端 */
  ext?: string;
  /** 保留字端1 */
  ext1?: string;
  /** 保留字端2 */
  ext2?: string;
  /** 保留字端3 */
  ext3?: string;
}
/**
 * 宠物主人积分兑换商品业务对象
 */
export interface PetOwnerIntegralCommodityForm {
  /**  */
  integralCommodityId?: number;
  /** 状态:0=正常,1=停用,2=草稿 */
  status?: number;
  /** 商品名称 */
  commodityTitle?: string;
  /** 商品编码 */
  commodityCode?: string;
  /** 商品信息 */
  commodityInformation?: string;
  /** 商品图 */
  commodityImg?: string;
  /** 商品价值:积分 */
  commodityValue?: number;
  /** 库存 */
  inventory?: number;
  /** 备注 */
  remark?: string;
  /** 保留字端 */
  ext?: string;
  /** 保留字端1 */
  ext1?: string;
  /** 保留字端2 */
  ext2?: string;
  /** 保留字端3 */
  ext3?: string;
}
/**
 * 宠物主人积分兑换商品视图对象
 */
export interface PetOwnerIntegralCommodityVo {
  /**  */
  integralCommodityId?: number;
  /**  */
  createTime?: any;
  /**  */
  updateTime?: any;
  /** 状态:0=正常,1=停用,2=草稿 */
  status?: number;
  /** 商品名称 */
  commodityTitle?: string;
  /** 商品编码 */
  commodityCode?: string;
  /** 商品信息 */
  commodityInformation?: string;
  /** 商品图 */
  commodityImg?: string;
  /** 商品价值:积分 */
  commodityValue?: number;
  /** 库存 */
  inventory?: number;
  /** 备注 */
  remark?: string;
  /** 保留字端 */
  ext?: string;
  /** 保留字端1 */
  ext1?: string;
  /** 保留字端2 */
  ext2?: string;
  /** 保留字端3 */
  ext3?: string;
}
