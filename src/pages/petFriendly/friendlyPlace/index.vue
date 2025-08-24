<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态:0=正常,1=停用,2=建设中,3=试运行" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态:0=正常,1=停用,2=建设中,3=试运行" clearable>
            <t-option label="请选择字典生成" value="" />
          </t-select>
        </t-form-item>
        <t-form-item label="场所名称" name="name">
          <t-input v-model="queryParams.name" placeholder="请输入场所名称" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养" name="type">
          <t-select v-model="queryParams.type" placeholder="请选择场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养" clearable>
            <t-option label="请选择字典生成" value="" />
          </t-select>
        </t-form-item>
        <t-form-item label="综合评分" name="rate">
          <t-input v-model="queryParams.rate" placeholder="请输入综合评分" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知" name="placeLevel">
          <t-input v-model="queryParams.placeLevel" placeholder="请输入友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="所属省份" name="proviceCode">
          <t-input v-model="queryParams.proviceCode" placeholder="请输入所属省份" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="所属城市" name="cityCode">
          <t-input v-model="queryParams.cityCode" placeholder="请输入所属城市" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="所属区县" name="districtCode">
          <t-input v-model="queryParams.districtCode" placeholder="请输入所属区县" clearable @enter="handleQuery" />
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
      width="min(500px, 100%)"
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
          <t-form-item label="状态:0=正常,1=停用,2=建设中,3=试运行" name="status">
            <t-radio-group v-model="form.status">
              <t-radio value="1">请选择字典生成</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="场所名称" name="name">
            <t-input v-model="form.name" placeholder="请输入场所名称" clearable />
          </t-form-item>
          <t-form-item label="场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养" name="type">
            <t-select v-model="form.type" placeholder="请选择场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养" clearable>
              <t-option label="请选择字典生成" value="" />
            </t-select>
          </t-form-item>
          <t-form-item label="综合评分" name="rate">
            <t-input-number v-model="form.rate" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知" name="placeLevel">
            <t-input-number v-model="form.placeLevel" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="所属省份" name="proviceCode">
            <t-input v-model="form.proviceCode" placeholder="请输入所属省份" clearable />
          </t-form-item>
          <t-form-item label="所属城市" name="cityCode">
            <t-input v-model="form.cityCode" placeholder="请输入所属城市" clearable />
          </t-form-item>
          <t-form-item label="所属区县" name="districtCode">
            <t-input v-model="form.districtCode" placeholder="请输入所属区县" clearable />
          </t-form-item>
          <t-form-item label="经度" name="longitude">
            <t-input-number v-model="form.longitude" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="纬度" name="latitude">
            <t-input-number v-model="form.latitude" placeholder="请输入" />
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
        <t-descriptions-item label="">{{ form.placeId }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态:0=正常,1=停用,2=建设中,3=试运行">{{ form.status }}</t-descriptions-item>
        <t-descriptions-item label="场所名称">{{ form.name }}</t-descriptions-item>
        <t-descriptions-item label="场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养">{{ form.type }}</t-descriptions-item>
        <t-descriptions-item label="综合评分">{{ form.rate }}</t-descriptions-item>
        <t-descriptions-item label="友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知">{{ form.placeLevel }}</t-descriptions-item>
        <t-descriptions-item label="所属省份">{{ form.proviceCode }}</t-descriptions-item>
        <t-descriptions-item label="所属城市">{{ form.cityCode }}</t-descriptions-item>
        <t-descriptions-item label="所属区县">{{ form.districtCode }}</t-descriptions-item>
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

const { proxy } = getCurrentInstance();

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
  type: [{ required: true, message: '场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养不能为空' }],
  proviceCode: [{ max: 20, message: '所属省份不能超过20个字符' }],
  cityCode: [{ max: 20, message: '所属城市不能超过20个字符' }],
  districtCode: [{ max: 20, message: '所属区县不能超过20个字符' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
  contactName: [{ max: 30, message: '联系人不能超过30个字符' }],
  contactInformation: [{ max: 30, message: '联系方式不能超过30个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: ``, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: ``, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态:0=正常,1=停用,2=建设中,3=试运行`, colKey: 'status', align: 'center' },
  { title: `场所名称`, colKey: 'name', align: 'center' },
  { title: `场所类型: 0=宠物公园,1=宠物医院,2=宠物友好餐厅,3=饮水点,4=小草坪,5=公开广场,6=派出所,7=宠物摄影,8=宠物美容,9=寄养`, colKey: 'type', align: 'center' },
  { title: `综合评分`, colKey: 'rate', align: 'center' },
  { title: `友好度: 1=很友好,2=友好,3=一般,4=不友好,5=未知`, colKey: 'placeLevel', align: 'center' },
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

getList();
</script>
