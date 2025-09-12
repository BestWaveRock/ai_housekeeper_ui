<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <t-option
              v-for="dict in pet_owner_assets_record_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="主人id" name="ownerId">
          <t-input v-model="queryParams.ownerId" placeholder="请输入主人id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="用户id" name="userId">
          <t-input v-model="queryParams.userId" placeholder="请输入用户id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="场所id" name="placeId">
          <t-input v-model="queryParams.placeId" placeholder="请输入场所id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="宠物id" name="petId">
          <t-input v-model="queryParams.petId" placeholder="请输入宠物id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="服务商id" name="providerId">
          <t-input v-model="queryParams.providerId" placeholder="请输入服务商id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="服务商人员id" name="providerOwnerId">
          <t-input v-model="queryParams.providerOwnerId" placeholder="请输入服务商人员id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="服务商人员用户id" name="providerUserId">
          <t-input v-model="queryParams.providerUserId" placeholder="请输入服务商人员用户id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="资产类型" name="assetsType">
          <t-select v-model="queryParams.assetsType" placeholder="请选择资产类型" clearable>
            <t-option
              v-for="dict in pet_owner_assets_record_assets_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="变动识别单号" name="changeCode">
          <t-input v-model="queryParams.changeCode" placeholder="请输入变动识别单号" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="变动类型" name="changeType">
          <t-select v-model="queryParams.changeType" placeholder="请选择变动类型" clearable>
            <t-option
              v-for="dict in pet_owner_assets_record_change_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="变动时间" name="changeTime">
          <t-date-picker
            v-model="queryParams.changeTime"
            allow-input
            clearable
            placeholder="请选择变动时间"
          />
        </t-form-item>
        <t-form-item label="积分商品id" name="integralCommodityId">
          <t-input v-model="queryParams.integralCommodityId" placeholder="请输入积分商品id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="商品名称" name="commodityTitle">
          <t-input v-model="queryParams.commodityTitle" placeholder="请输入商品名称" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="商品编码" name="commodityCode">
          <t-input v-model="queryParams.commodityCode" placeholder="请输入商品编码" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="商品信息" name="commodityInformation">
          <t-input v-model="queryParams.commodityInformation" placeholder="请输入商品信息" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="商品价值:积分" name="commodityValue">
          <t-input v-model="queryParams.commodityValue" placeholder="请输入商品价值:积分" :min="0" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="变动值" name="changeValue">
          <t-input v-model="queryParams.changeValue" placeholder="请输入变动值" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="变动前值" name="beforeValue">
          <t-input v-model="queryParams.beforeValue" placeholder="请输入变动前值" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="变动后值" name="afterValue">
          <t-input v-model="queryParams.afterValue" placeholder="请输入变动后值" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="记录IP" name="ip">
          <t-input v-model="queryParams.ip" placeholder="请输入记录IP" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="手机信息" name="phoneInformation">
          <t-input v-model="queryParams.phoneInformation" placeholder="请输入手机信息" clearable @enter="handleQuery" />
        </t-form-item>
        <!-- <t-form-item label="保留字端" name="ext">
          <t-input v-model="queryParams.ext" placeholder="请输入保留字端" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="保留字端1" name="ext1">
          <t-input v-model="queryParams.ext1" placeholder="请输入保留字端1" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="保留字端2" name="ext2">
          <t-input v-model="queryParams.ext2" placeholder="请输入保留字端2" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="保留字端3" name="ext3">
          <t-input v-model="queryParams.ext3" placeholder="请输入保留字端3" clearable @enter="handleQuery" />
        </t-form-item> -->
        <t-form-item label-width="0px">
          <t-button theme="primary" @click="handleQuery">
            <template #icon> <search-icon /></template>
            搜索
          </t-button>
          <t-button theme="default" @click="resetQuery">
            <template #icon> <refresh-icon /></template>
            重置
          </t-button>
        </t-form-item>
      </t-form>

      <t-table
        v-model:column-controller-visible="columnControllerVisible"
        :loading="loading"
        hover
        row-key="ownerAssetsRecordId"
        :data="ownerAssetsRecordList"
        :columns="columns"
        :selected-row-keys="ids"
        select-on-row-click
        :pagination="pagination"
        :column-controller="{
          hideTriggerButton: true,
        }"
        @select-change="handleSelectionChange"
      >
        <template #topContent>
          <t-row>
            <t-col flex="auto">
              <t-button v-hasPermi="['petFriendly:ownerAssetsRecord:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:ownerAssetsRecord:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:ownerAssetsRecord:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:ownerAssetsRecord:export']" theme="default" variant="outline" @click="handleExport">
                <template #icon> <download-icon /> </template>
                导出
              </t-button>
              <span class="selected-count">已选 {{ ids.length }} 项</span>
            </t-col>
            <t-col flex="none">
              <t-button theme="default" shape="square" variant="outline" @click="showSearch = !showSearch">
                <template #icon> <search-icon /> </template>
              </t-button>
              <t-button theme="default" variant="outline" @click="columnControllerVisible = true">
                <template #icon> <setting-icon /> </template>
                列配置
              </t-button>
            </t-col>
          </t-row>
        </template>
        <template #status="{ row }">
          <dict-tag :options="pet_owner_assets_record_status" :value="row.status" />
        </template>
        <template #assetsType="{ row }">
          <dict-tag :options="pet_owner_assets_record_assets_type" :value="row.assetsType" />
        </template>
        <template #changeType="{ row }">
          <dict-tag :options="pet_owner_assets_record_change_type" :value="row.changeType" />
        </template>
        <template #operation="{ row }">
          <t-space :size="8" break-line>
            <my-link v-hasPermi="['petFriendly:ownerAssetsRecord:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:ownerAssetsRecord:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:ownerAssetsRecord:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改宠物主人资产变动记录对话框 -->
    <t-dialog
      v-model:visible="open"
      :header="title"
      destroy-on-close
      :close-on-overlay-click="false"
      width="min(800px, 100%)"
      attach="body"
      :confirm-btn="{
        loading: buttonLoading,
      }"
      @confirm="ownerAssetsRecordRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="ownerAssetsRecordRef"
          label-align="right"
          :data="form"
          :rules="rules"
          label-width="calc(5em + 41px)"
          scroll-to-first-error="smooth"
          @submit="submitForm"
        >
          <t-form-item label="状态" name="status">
            <t-radio-group v-model="form.status">
              <t-radio
                v-for="dict in pet_owner_assets_record_status"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="主人id" name="ownerId">
            <t-input-number v-model="form.ownerId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="用户id" name="userId">
            <t-input-number v-model="form.userId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="场所id" name="placeId">
            <t-input-number v-model="form.placeId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="宠物id" name="petId">
            <t-input-number v-model="form.petId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="服务商id" name="providerId">
            <t-input-number v-model="form.providerId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="服务商人员id" name="providerOwnerId">
            <t-input-number v-model="form.providerOwnerId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="服务商人员用户id" name="providerUserId">
            <t-input-number v-model="form.providerUserId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="资产类型" name="assetsType">
            <t-select v-model="form.assetsType" placeholder="请选择资产类型" clearable>
              <t-option
              v-for="dict in pet_owner_assets_record_assets_type"
              :key="dict.value"
              :label="dict.label"
                :value="Number(dict.value)"
            ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="变动识别单号" name="changeCode">
            <t-input v-model="form.changeCode" placeholder="请输入变动识别单号" clearable />
          </t-form-item>
          <t-form-item label="变动类型" name="changeType">
            <t-select v-model="form.changeType" placeholder="请选择变动类型" clearable>
              <t-option
              v-for="dict in pet_owner_assets_record_change_type"
              :key="dict.value"
              :label="dict.label"
                :value="Number(dict.value)"
            ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="变动时间" name="changeTime">
            <t-date-picker
              v-model="form.changeTime"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择变动时间"
            />
          </t-form-item>
          <t-form-item label="积分商品id" name="integralCommodityId">
            <t-input-number v-model="form.integralCommodityId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="商品名称" name="commodityTitle">
            <t-input v-model="form.commodityTitle" placeholder="请输入商品名称" clearable />
          </t-form-item>
          <t-form-item label="商品编码" name="commodityCode">
            <t-input v-model="form.commodityCode" placeholder="请输入商品编码" clearable />
          </t-form-item>
          <t-form-item label="商品信息" name="commodityInformation">
            <t-textarea v-model="form.commodityInformation" placeholder="请输入商品信息" />
          </t-form-item>
          <t-form-item label="商品图" name="commodityImg">
            <image-upload
              v-model="form.commodityImg"
              theme="image-flow"
              :support-select-file="false"
              :support-url="false"
            />
          </t-form-item>
          <t-form-item label="商品价值:积分" name="commodityValue">
            <t-input-number v-model="form.commodityValue" :min="0" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="变动值" name="changeValue">
            <t-input-number v-model="form.changeValue" :min="0" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="变动前值" name="beforeValue">
            <t-input-number v-model="form.beforeValue" :min="0" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="变动后值" name="afterValue">
            <t-input-number v-model="form.afterValue" :min="0" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="记录IP" name="ip">
            <t-input v-model="form.ip" placeholder="请输入记录IP" clearable />
          </t-form-item>
          <t-form-item label="手机信息" name="phoneInformation">
            <t-input v-model="form.phoneInformation" placeholder="请输入手机信息" clearable />
          </t-form-item>
          <t-form-item label="备注" name="remark">
            <t-input v-model="form.remark" placeholder="请输入备注" clearable />
          </t-form-item>
          <!-- <t-form-item label="保留字端" name="ext">
            <t-textarea v-model="form.ext" placeholder="请输入保留字端" />
          </t-form-item>
          <t-form-item label="保留字端1" name="ext1">
            <t-textarea v-model="form.ext1" placeholder="请输入保留字端1" />
          </t-form-item>
          <t-form-item label="保留字端2" name="ext2">
            <t-textarea v-model="form.ext2" placeholder="请输入保留字端2" />
          </t-form-item>
          <t-form-item label="保留字端3" name="ext3">
            <t-textarea v-model="form.ext3" placeholder="请输入保留字端3" />
          </t-form-item> -->
        </t-form>
      </t-loading>
    </t-dialog>

    <!-- 宠物主人资产变动记录详情 -->
    <t-dialog
      v-model:visible="openView"
      header="宠物主人资产变动记录详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="ID">{{ form.ownerAssetsRecordId }}</t-descriptions-item>
        <t-descriptions-item label="创建时间">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="更新时间">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态">
          <dict-tag :options="pet_owner_assets_record_status" :value="form.status" />
        </t-descriptions-item>
        <t-descriptions-item label="主人id">{{ form.ownerId }}</t-descriptions-item>
        <t-descriptions-item label="用户id">{{ form.userId }}</t-descriptions-item>
        <t-descriptions-item label="场所id">{{ form.placeId }}</t-descriptions-item>
        <t-descriptions-item label="宠物id">{{ form.petId }}</t-descriptions-item>
        <t-descriptions-item label="服务商id">{{ form.providerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员id">{{ form.providerOwnerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员用户id">{{ form.providerUserId }}</t-descriptions-item>
        <t-descriptions-item label="资产类型">
          <dict-tag :options="pet_owner_assets_record_assets_type" :value="form.assetsType" />
        </t-descriptions-item>
        <t-descriptions-item label="变动识别单号">{{ form.changeCode }}</t-descriptions-item>
        <t-descriptions-item label="变动类型">
          <dict-tag :options="pet_owner_assets_record_change_type" :value="form.changeType" />
        </t-descriptions-item>
        <t-descriptions-item label="变动时间">{{ parseTime(form.changeTime) }}</t-descriptions-item>
        <t-descriptions-item label="积分商品id">{{ form.integralCommodityId }}</t-descriptions-item>
        <t-descriptions-item label="商品名称">{{ form.commodityTitle }}</t-descriptions-item>
        <t-descriptions-item label="商品编码">{{ form.commodityCode }}</t-descriptions-item>
        <t-descriptions-item label="商品信息" :span="2">{{ form.commodityInformation }}</t-descriptions-item>
        <t-descriptions-item label="商品图" :span="2">{{ form.commodityImg }}</t-descriptions-item>
        <t-descriptions-item label="商品价值:积分">{{ form.commodityValue }}</t-descriptions-item>
        <t-descriptions-item label="变动值">{{ form.changeValue }}</t-descriptions-item>
        <t-descriptions-item label="变动前值">{{ form.beforeValue }}</t-descriptions-item>
        <t-descriptions-item label="变动后值">{{ form.afterValue }}</t-descriptions-item>
        <t-descriptions-item label="记录IP">{{ form.ip }}</t-descriptions-item>
        <t-descriptions-item label="手机信息">{{ form.phoneInformation }}</t-descriptions-item>
        <t-descriptions-item label="备注">{{ form.remark }}</t-descriptions-item>
        <!-- <t-descriptions-item label="保留字端" :span="2">{{ form.ext }}</t-descriptions-item>
        <t-descriptions-item label="保留字端1" :span="2">{{ form.ext1 }}</t-descriptions-item>
        <t-descriptions-item label="保留字端2" :span="2">{{ form.ext2 }}</t-descriptions-item>
        <t-descriptions-item label="保留字端3" :span="2">{{ form.ext3 }}</t-descriptions-item> -->
      </my-descriptions>
    </t-dialog>
  </t-card>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'OwnerAssetsRecord',
});
import {
  AddIcon,
  BrowseIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  RefreshIcon,
  SearchIcon,
  SettingIcon,
} from 'tdesign-icons-vue-next';
import type { FormInstanceFunctions, FormRule, PageInfo, PrimaryTableCol, SubmitContext,  } from 'tdesign-vue-next';
import { computed, getCurrentInstance, ref } from 'vue';
import { ArrayOps } from '@/utils/array';
import ImageUpload from '@/components/image-upload/index.vue';

import type { PetOwnerAssetsRecordForm, PetOwnerAssetsRecordQuery, PetOwnerAssetsRecordVo } from '@/api/petFriendly/model/ownerAssetsRecordModel';
import { listOwnerAssetsRecord, getOwnerAssetsRecord, delOwnerAssetsRecord, addOwnerAssetsRecord, updateOwnerAssetsRecord } from '@/api/petFriendly/ownerAssetsRecord';

const { proxy } = getCurrentInstance();
const { pet_owner_assets_record_status, pet_owner_assets_record_assets_type, pet_owner_assets_record_change_type } = proxy.useDict('pet_owner_assets_record_status', 'pet_owner_assets_record_assets_type', 'pet_owner_assets_record_change_type');

const openView = ref(false);
const openViewLoading = ref(false);
const ownerAssetsRecordRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const ownerAssetsRecordList = ref<PetOwnerAssetsRecordVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  changeCode: [{ max: 50, message: '变动识别单号不能超过50个字符' }],
  commodityTitle: [{ max: 100, message: '商品名称不能超过100个字符' }],
  commodityCode: [{ max: 100, message: '商品编码不能超过100个字符' }],
  ip: [{ max: 20, message: '记录IP不能超过20个字符' }],
  phoneInformation: [{ max: 100, message: '手机信息不能超过100个字符' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: `创建时间`, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: `更新时间`, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态`, colKey: 'status', align: 'center' },
  { title: `主人id`, colKey: 'ownerId', align: 'center' },
  { title: `用户id`, colKey: 'userId', align: 'center' },
  { title: `场所id`, colKey: 'placeId', align: 'center' },
  { title: `宠物id`, colKey: 'petId', align: 'center' },
  { title: `服务商id`, colKey: 'providerId', align: 'center' },
  { title: `服务商人员id`, colKey: 'providerOwnerId', align: 'center' },
  { title: `服务商人员用户id`, colKey: 'providerUserId', align: 'center' },
  { title: `资产类型`, colKey: 'assetsType', align: 'center' },
  { title: `变动识别单号`, colKey: 'changeCode', align: 'center' },
  { title: `变动类型`, colKey: 'changeType', align: 'center' },
  { title: `变动时间`, colKey: 'changeTime', align: 'center', minWidth: 112, width: 180 },
  { title: `积分商品id`, colKey: 'integralCommodityId', align: 'center' },
  { title: `商品名称`, colKey: 'commodityTitle', align: 'center' },
  { title: `商品编码`, colKey: 'commodityCode', align: 'center' },
  { title: `商品信息`, colKey: 'commodityInformation', align: 'center', ellipsis: true },
  { title: `商品图`, colKey: 'commodityImg', align: 'center', ellipsis: true },
  { title: `商品价值:积分`, colKey: 'commodityValue', align: 'center' },
  { title: `变动值`, colKey: 'changeValue', align: 'center' },
  { title: `变动前值`, colKey: 'beforeValue', align: 'center' },
  { title: `变动后值`, colKey: 'afterValue', align: 'center' },
  { title: `记录IP`, colKey: 'ip', align: 'center' },
  { title: `手机信息`, colKey: 'phoneInformation', align: 'center' },
  { title: `备注`, colKey: 'remark', align: 'center' },
  // { title: `保留字端`, colKey: 'ext', align: 'center', ellipsis: true },
  // { title: `保留字端1`, colKey: 'ext1', align: 'center', ellipsis: true },
  // { title: `保留字端2`, colKey: 'ext2', align: 'center', ellipsis: true },
  // { title: `保留字端3`, colKey: 'ext3', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<PetOwnerAssetsRecordVo & PetOwnerAssetsRecordForm>({});
// 查询对象
const queryParams = ref<PetOwnerAssetsRecordQuery>({
  pageNum: 1,
  pageSize: 10,
  status: undefined,
  ownerId: undefined,
  userId: undefined,
  placeId: undefined,
  petId: undefined,
  providerId: undefined,
  providerOwnerId: undefined,
  providerUserId: undefined,
  assetsType: undefined,
  changeCode: undefined,
  changeType: undefined,
  changeTime: undefined,
  integralCommodityId: undefined,
  commodityTitle: undefined,
  commodityCode: undefined,
  commodityInformation: undefined,
  commodityImg: undefined,
  commodityValue: undefined,
  changeValue: undefined,
  beforeValue: undefined,
  afterValue: undefined,
  ip: undefined,
  phoneInformation: undefined,
  ext: undefined,
  ext1: undefined,
  ext2: undefined,
  ext3: undefined,
});
// 分页
const pagination = computed(() => {
  return {
    current: queryParams.value.pageNum,
    pageSize: queryParams.value.pageSize,
    total: total.value,
    showJumper: true,
    onChange: (pageInfo: PageInfo) => {
      queryParams.value.pageNum = pageInfo.current;
      queryParams.value.pageSize = pageInfo.pageSize;
      getList();
    },
  };
});

/** 查询宠物主人资产变动记录列表 */
function getList() {
  loading.value = true;
  listOwnerAssetsRecord(queryParams.value)
    .then((response) => {
      ownerAssetsRecordList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('ownerAssetsRecordRef');
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm('queryRef');
  handleQuery();
}

/** 多选框选中数据 */
function handleSelectionChange(selection: Array<string | number>) {
  ids.value = selection;
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = '添加宠物主人资产变动记录';
}

/** 详情按钮操作 */
function handleDetail(row: PetOwnerAssetsRecordVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const ownerAssetsRecordId = row.ownerAssetsRecordId;
  getOwnerAssetsRecord(ownerAssetsRecordId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetOwnerAssetsRecordVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改宠物主人资产变动记录';
  const ownerAssetsRecordId = row?.ownerAssetsRecordId || ids.value.at(0);
  getOwnerAssetsRecord(ownerAssetsRecordId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.ownerAssetsRecordId) {
      updateOwnerAssetsRecord(form.value)
        .then(() => {
          proxy.$modal.msgSuccess('修改成功');
          open.value = false;
          getList();
        })
        .finally(() => {
          buttonLoading.value = false;
          proxy.$modal.msgClose(msgLoading);
        });
    } else {
      addOwnerAssetsRecord(form.value)
        .then(() => {
          proxy.$modal.msgSuccess('新增成功');
          open.value = false;
          getList();
        })
        .finally(() => {
          buttonLoading.value = false;
          proxy.$modal.msgClose(msgLoading);
        });
    }
  } else {
    proxy.$modal.msgError(firstError);
  }
}

/** 删除按钮操作 */
function handleDelete(row?: PetOwnerAssetsRecordVo) {
  const ownerAssetsRecordIds = row?.ownerAssetsRecordId || ids.value;
  proxy.$modal.confirm(`是否确认删除宠物主人资产变动记录编号为${ownerAssetsRecordIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delOwnerAssetsRecord(ownerAssetsRecordIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, ownerAssetsRecordIds);
        getList();
        proxy.$modal.msgSuccess('删除成功');
      })
      .finally(() => {
        proxy.$modal.msgClose(msgLoading);
      });
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    'petFriendly/ownerAssetsRecord/export',
    {
      ...queryParams.value,
    },
    `ownerAssetsRecord_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
