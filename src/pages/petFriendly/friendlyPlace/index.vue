<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <t-option
              v-for="dict in pet_friendly_place_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="场所名称" name="name">
          <t-input v-model="queryParams.name" placeholder="请输入场所名称" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="场所类型" name="type">
          <t-select v-model="queryParams.type" placeholder="请选择场所类型" clearable>
            <t-option
              v-for="dict in pet_friendly_place_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="综合评分" name="rate">
          <t-input v-model="queryParams.rate" placeholder="请输入综合评分" :min="0" :max="5" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="友好度" name="placeLevel">
          <t-select v-model="queryParams.placeLevel" placeholder="请选择友好度" clearable>
            <t-option
              v-for="dict in pet_friendly_place_place_level"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <!-- 省份 -->
        <t-form-item label="所属省份" name="proviceCode">
          <t-select
            v-model="queryParams.proviceCode"
            placeholder="请选择省份"
            clearable
            filterable
            :loading="provinceLoading"
            @change="onProvinceChange(queryParams.proviceCode)"
          >
            <t-option
              v-for="p in provinceList"
              :key="p.id"
              :label="p.extName"
              :value="p.id"
            />
          </t-select>
        </t-form-item>

        <!-- 城市 -->
        <t-form-item label="所属城市" name="cityCode">
          <t-select
            v-model="queryParams.cityCode"
            placeholder="请选择城市"
            clearable
            filterable
            :loading="cityLoading"
            :disabled="!queryParams.proviceCode"
            @change="onCityChange(queryParams.cityCode)"
          >
            <t-option
              v-for="c in cityList"
              :key="c.id"
              :label="c.extName"
              :value="c.id"
            />
          </t-select>
        </t-form-item>

        <!-- 区县 -->
        <t-form-item label="所属区县" name="districtCode">
          <t-select
            v-model="queryParams.districtCode"
            placeholder="请选择区县"
            clearable
            filterable
            :loading="districtLoading"
            :disabled="!queryParams.cityCode"
          >
            <t-option
              v-for="d in districtList"
              :key="d.id"
              :label="d.extName"
              :value="d.id"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="经度" name="longitude">
          <t-input v-model="queryParams.longitude" placeholder="请输入经度" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="纬度" name="latitude">
          <t-input v-model="queryParams.latitude" placeholder="请输入纬度" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="联系人" name="contactName">
          <t-input v-model="queryParams.contactName" placeholder="请输入联系人" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="联系方式" name="contactInformation">
          <t-input v-model="queryParams.contactInformation" placeholder="请输入联系方式" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="所属服务商id" name="providerId">
          <t-input v-model="queryParams.providerId" placeholder="请输入所属服务商id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="保留字端" name="ext">
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
        </t-form-item>
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
        row-key="placeId"
        :data="friendlyPlaceList"
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
              <t-button v-hasPermi="['petFriendly:friendlyPlace:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:friendlyPlace:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:friendlyPlace:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:friendlyPlace:export']" theme="default" variant="outline" @click="handleExport">
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
          <dict-tag :options="pet_friendly_place_status" :value="row.status" />
        </template>
        <template #type="{ row }">
          <dict-tag :options="pet_friendly_place_type" :value="row.type" />
        </template>
        <template #placeLevel="{ row }">
          <dict-tag :options="pet_friendly_place_place_level" :value="row.placeLevel" />
        </template>
        <template #proviceCode="{ row }">
          <!-- 使用 Suspense / 自定义指令 / 手动触发都行 -->
          <LazyRegionName :id="row.proviceCode" :loader="loadName" />
        </template>
        <template #cityCode="{ row }">
          <LazyRegionName :id="row.cityCode" :loader="loadName" />
        </template>
        <template #districtCode="{ row }">
          <LazyRegionName :id="row.districtCode" :loader="loadName" />
        </template>
        <template #operation="{ row }">
          <t-space :size="8" break-line>
            <my-link v-hasPermi="['petFriendly:friendlyPlace:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:friendlyPlace:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:friendlyPlace:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改宠物友好场所对话框 -->
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
      @confirm="friendlyPlaceRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="friendlyPlaceRef"
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
                v-for="dict in pet_friendly_place_status"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="场所名称" name="name">
            <t-input v-model="form.name" placeholder="请输入场所名称" clearable />
          </t-form-item>
          <t-form-item label="场所类型" name="type">
            <t-radio-group v-model="form.type">
              <t-radio
                v-for="dict in pet_friendly_place_type"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="综合评分" name="rate">
            <t-input-number v-model="form.rate" :min="0" :max="5" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="友好度" name="placeLevel">
            <t-radio-group v-model="form.placeLevel">
              <t-radio
                v-for="dict in pet_friendly_place_place_level"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-radio>
            </t-radio-group>
          </t-form-item>
          <!-- 省份 -->
          <t-form-item label="所属省份" name="proviceCode">
            <t-select
              v-model="form.proviceCode"
              placeholder="请选择省份"
              clearable
              filterable
              :loading="provinceLoading"
              @change="onProvinceChange(form.proviceCode)"
            >
              <t-option
                v-for="p in provinceList"
                :key="p.id"
                :label="p.extName"
                :value="String(p.id)"
              />
            </t-select>
          </t-form-item>

          <!-- 城市 -->
          <t-form-item label="所属城市" name="cityCode">
            <t-select
              v-model="form.cityCode"
              placeholder="请选择城市"
              clearable
              filterable
              :loading="cityLoading"
              :disabled="!form.proviceCode"
              @change="onCityChange(form.cityCode)"
            >
              <t-option
                v-for="c in cityList"
                :key="c.id"
                :label="c.extName"
                :value="String(c.id)"
              />
            </t-select>
          </t-form-item>

          <!-- 区县 -->
          <t-form-item label="所属区县" name="districtCode">
            <t-select
              v-model="form.districtCode"
              placeholder="请选择区县"
              clearable
              filterable
              :loading="districtLoading"
              :disabled="!form.cityCode"
            >
              <t-option
                v-for="d in districtList"
                :key="d.id"
                :label="d.extName"
                :value="String(d.id)"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="经度" name="longitude">
            <t-input v-model="form.longitude" placeholder="请输入经度" />
          </t-form-item>
          <t-form-item label="纬度" name="latitude">
            <t-input v-model="form.latitude" placeholder="请输入纬度" />
          </t-form-item>
          <t-form-item label="备注" name="remark">
            <t-input v-model="form.remark" placeholder="请输入备注" clearable />
          </t-form-item>
          <t-form-item label="联系人" name="contactName">
            <t-input v-model="form.contactName" placeholder="请输入联系人" clearable />
          </t-form-item>
          <t-form-item label="联系方式" name="contactInformation">
            <t-input v-model="form.contactInformation" placeholder="请输入联系方式" clearable />
          </t-form-item>
          <t-form-item label="所属服务商id" name="providerId">
            <t-input-number v-model="form.providerId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="保留字端" name="ext">
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
          </t-form-item>
        </t-form>
      </t-loading>
    </t-dialog>

    <!-- 宠物友好场所详情 -->
    <t-dialog
      v-model:visible="openView"
      header="宠物友好场所详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="ID">{{ form.placeId }}</t-descriptions-item>
        <t-descriptions-item label="创建时间">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="更新时间">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态">
          <dict-tag :options="pet_friendly_place_status" :value="form.status" />
        </t-descriptions-item>
        <t-descriptions-item label="场所名称">{{ form.name }}</t-descriptions-item>
        <t-descriptions-item label="场所类型">
          <dict-tag :options="pet_friendly_place_type" :value="form.type" />
        </t-descriptions-item>
        <t-descriptions-item label="综合评分">{{ form.rate }}</t-descriptions-item>
        <t-descriptions-item label="友好度">
          <dict-tag :options="pet_friendly_place_place_level" :value="form.placeLevel" />
        </t-descriptions-item>
        <t-descriptions-item label="所属省份">
          <LazyRegionName :id="form.proviceCode" :loader="loadName" />
        </t-descriptions-item>
        <t-descriptions-item label="所属城市">
          <LazyRegionName :id="form.cityCode" :loader="loadName" />
        </t-descriptions-item>
        <t-descriptions-item label="所属区县">
          <LazyRegionName :id="form.districtCode" :loader="loadName" />
        </t-descriptions-item>
        <t-descriptions-item label="经度">{{ form.longitude }}</t-descriptions-item>
        <t-descriptions-item label="纬度">{{ form.latitude }}</t-descriptions-item>
        <t-descriptions-item label="备注">{{ form.remark }}</t-descriptions-item>
        <t-descriptions-item label="联系人">{{ form.contactName }}</t-descriptions-item>
        <t-descriptions-item label="联系方式">{{ form.contactInformation }}</t-descriptions-item>
        <t-descriptions-item label="所属服务商id">{{ form.providerId }}</t-descriptions-item>
        <t-descriptions-item label="保留字端" :span="2">{{ form.ext }}</t-descriptions-item>
        <t-descriptions-item label="保留字端1" :span="2">{{ form.ext1 }}</t-descriptions-item>
        <t-descriptions-item label="保留字端2" :span="2">{{ form.ext2 }}</t-descriptions-item>
        <t-descriptions-item label="保留字端3" :span="2">{{ form.ext3 }}</t-descriptions-item>
      </my-descriptions>
    </t-dialog>
  </t-card>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'FriendlyPlace',
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

import type { PetFriendlyPlaceForm, PetFriendlyPlaceQuery, PetFriendlyPlaceVo } from '@/api/petFriendly/model/friendlyPlaceModel';
import { listFriendlyPlace, getFriendlyPlace, delFriendlyPlace, addFriendlyPlace, updateFriendlyPlace } from '@/api/petFriendly/friendlyPlace';

import { listRegionInfo, getRegionInfo } from '@/api/system/regionInfo';

const { proxy } = getCurrentInstance();
const { pet_friendly_place_type, pet_friendly_place_status, pet_friendly_place_place_level } = proxy.useDict('pet_friendly_place_type', 'pet_friendly_place_status', 'pet_friendly_place_place_level');

const openView = ref(false);
const openViewLoading = ref(false);
const friendlyPlaceRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const friendlyPlaceList = ref<PetFriendlyPlaceVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  name: [{ required: true, message: '场所名称不能为空' }, { max: 100, message: '场所名称不能超过100个字符' }],
  type: [{ required: true, message: '场所类型不能为空' }],
  proviceCode: [{ required: true, message: '所属省份不能为空' }],
  cityCode: [{ required: true, message: '所属城市不能为空' }],
  districtCode: [{ required: true, message: '所属区县不能为空' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
  contactName: [{ max: 30, message: '联系人不能超过30个字符' }],
  contactInformation: [{ max: 30, message: '联系方式不能超过30个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: `创建时间`, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: `更新时间`, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态`, colKey: 'status', align: 'center' },
  { title: `场所名称`, colKey: 'name', align: 'center' },
  { title: `场所类型`, colKey: 'type', align: 'center' },
  { title: `综合评分`, colKey: 'rate', align: 'center' },
  { title: `友好度`, colKey: 'placeLevel', align: 'center' },
  { title: `所属省份`, colKey: 'proviceCode', align: 'center' },
  { title: `所属城市`, colKey: 'cityCode', align: 'center' },
  { title: `所属区县`, colKey: 'districtCode', align: 'center' },
  { title: `经度`, colKey: 'longitude', align: 'center' },
  { title: `纬度`, colKey: 'latitude', align: 'center' },
  { title: `备注`, colKey: 'remark', align: 'center' },
  { title: `联系人`, colKey: 'contactName', align: 'center' },
  { title: `联系方式`, colKey: 'contactInformation', align: 'center' },
  { title: `所属服务商id`, colKey: 'providerId', align: 'center' },
  { title: `保留字端`, colKey: 'ext', align: 'center', ellipsis: true },
  { title: `保留字端1`, colKey: 'ext1', align: 'center', ellipsis: true },
  { title: `保留字端2`, colKey: 'ext2', align: 'center', ellipsis: true },
  { title: `保留字端3`, colKey: 'ext3', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<PetFriendlyPlaceVo & PetFriendlyPlaceForm>({});
// 查询对象
const queryParams = ref<PetFriendlyPlaceQuery>({
  pageNum: 1,
  pageSize: 10,
  status: undefined,
  name: undefined,
  type: undefined,
  rate: undefined,
  placeLevel: undefined,
  proviceCode: undefined,
  cityCode: undefined,
  districtCode: undefined,
  longitude: undefined,
  latitude: undefined,
  contactName: undefined,
  contactInformation: undefined,
  providerId: undefined,
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

/** 查询宠物友好场所列表 */
function getList() {
  loading.value = true;
  listFriendlyPlace(queryParams.value)
    .then((response) => {
      friendlyPlaceList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('friendlyPlaceRef');
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
  title.value = '添加宠物友好场所';
}

/** 详情按钮操作 */
function handleDetail(row: PetFriendlyPlaceVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const placeId = row.placeId;
  getFriendlyPlace(placeId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetFriendlyPlaceVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改宠物友好场所';
  const placeId = row?.placeId || ids.value.at(0);
  getFriendlyPlace(placeId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
    fetchRegion(1, form.value.proviceCode).then(res => (cityList.value = res.rows))
    fetchRegion(2, form.value.cityCode).then(res => (districtList.value = res.rows))
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.placeId) {
      updateFriendlyPlace(form.value)
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
      addFriendlyPlace(form.value)
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
function handleDelete(row?: PetFriendlyPlaceVo) {
  const placeIds = row?.placeId || ids.value;
  proxy.$modal.confirm(`是否确认删除宠物友好场所编号为${placeIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delFriendlyPlace(placeIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, placeIds);
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
    'petFriendly/friendlyPlace/export',
    {
      ...queryParams.value,
    },
    `friendlyPlace_${new Date().getTime()}.xlsx`,
  );
}


/** 查询行政区划管理列表 */
import type { ChinaRegionInfoVo, ChinaRegionInfoQuery } from '@/api/system/model/regionInfoModel';
/* -------------------- 基础数据 -------------------- */
const provinceLoading = ref(false)
const cityLoading = ref(false)
const districtLoading = ref(false)

const provinceList = ref<ChinaRegionInfoVo[]>([])
const cityList     = ref<ChinaRegionInfoVo[]>([])
const districtList = ref<ChinaRegionInfoVo[]>([])

const regionQueryParams = ref<ChinaRegionInfoQuery>({
  pageNum: 1,
  pageSize: 100,
  pid: undefined,
  deep: undefined
})

/* -------------------- 通用加载方法 -------------------- */
function fetchRegion(deep: 0 | 1 | 2, parentId?: string | number) {
  deep == 0 ? provinceLoading.value = true : (deep == 1 ? cityLoading.value = true : districtLoading.value = true)
  
  regionQueryParams.value.pid = parentId ? Number(parentId) : null
  regionQueryParams.value.deep = deep ? deep : null
  
  return listRegionInfo(regionQueryParams.value).finally(() => (deep == 0 ? provinceLoading.value = false : (deep == 1 ? cityLoading.value = false : districtLoading.value = false)))
}

/* -------------------- 联动 -------------------- */
function onProvinceChange(val?: string) {
  // 清空下级
  queryParams.value.cityCode = ''
  queryParams.value.districtCode = ''
  form.value.cityCode = ''
  form.value.districtCode = ''
  cityList.value = []
  districtList.value = []

  if (!val) return
  fetchRegion(1, val).then(res => (cityList.value = res.rows))
}

function onCityChange(val?: string) {
  queryParams.value.districtCode = ''
  form.value.districtCode = ''
  districtList.value = []

  if (!val) return
  fetchRegion(2, val).then(res => (districtList.value = res.rows))
}

/* 缓存：只存已经查过的 id -> name */
const cache = ref<Record<string, string>>({})

async function loadName(id: string | number) {
  if (!id) return ''
  const key = String(id)
  if (cache.value[key] !== undefined) return cache.value[key]

  try {
    const { data } = await getRegionInfo(Number(id))
    cache.value[key] = data.extName ?? ''
  } catch {
    cache.value[key] = ''
  }
  return cache.value[key]
}

/* -------------------- 初始化 -------------------- */
onMounted(() => {
  fetchRegion(0).then(res => (provinceList.value = res.rows))
})

getList();
</script>
