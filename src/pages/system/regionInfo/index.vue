<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="上级行政区域编码" name="pid" label-width="100">
          <t-input v-model="queryParams.pid" placeholder="请输入" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="区域层级" name="deep">
          <t-select v-model="queryParams.deep">
            <t-option 
              v-for="dict in region_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="区域名称" name="name">
          <t-input v-model="queryParams.name" placeholder="请输入" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="行政区域名称拼音开头" name="pinyinPrefix" label-width="100">
          <t-input v-model="queryParams.pinyinPrefix" placeholder="请输入" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="行政区域名称全拼" name="pinyin" label-width="100">
          <t-input v-model="queryParams.pinyin" placeholder="请输入" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="行政区域编码（12位）" name="extId" label-width="100">
          <t-input v-model="queryParams.extId" placeholder="请输入" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="行政区域名称" name="extName" label-width="100">
          <t-input v-model="queryParams.extName" placeholder="请输入" clearable @enter="handleQuery" />
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
        row-key="id"
        :data="regionInfoList"
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
              <t-button v-hasPermi="['system:regionInfo:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['system:regionInfo:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['system:regionInfo:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['system:regionInfo:export']" theme="default" variant="outline" @click="handleExport">
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
        <template #deep="{ row }">
          <dict-tag :options="region_type" :value="row.deep" />
        </template>
        <template #operation="{ row }">
          <t-space :size="8" break-line>
            <my-link v-hasPermi="['system:regionInfo:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['system:regionInfo:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['system:regionInfo:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改行政区划管理对话框 -->
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
      @confirm="regionInfoRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="regionInfoRef"
          label-align="right"
          :data="form"
          :rules="rules"
          label-width="calc(5em + 41px)"
          scroll-to-first-error="smooth"
          @submit="submitForm"
        >
          <t-form-item label="上级行政区域编码" name="pid">
            <t-input-number v-model="form.pid" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="区域层级" name="deep">
            <t-radio-group v-model="form.deep">
              <t-radio 
                v-for="dict in region_type"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="区域名称" name="name">
            <t-input v-model="form.name" placeholder="请输入" clearable />
          </t-form-item>
          <t-form-item label="拼音开头" name="pinyinPrefix">
            <t-input v-model="form.pinyinPrefix" placeholder="请输入" clearable />
          </t-form-item>
          <t-form-item label="全拼" name="pinyin">
            <t-input v-model="form.pinyin" placeholder="请输入" clearable />
          </t-form-item>
          <t-form-item label="行政区域编码（12位）" name="extId">
            <t-input v-model="form.extId" placeholder="请输入" clearable />
          </t-form-item>
          <t-form-item label="行政区域名称" name="extName">
            <t-input v-model="form.extName" placeholder="请输入" clearable />
          </t-form-item>
        </t-form>
      </t-loading>
    </t-dialog>

    <!-- 行政区划管理详情 -->
    <t-dialog
      v-model:visible="openView"
      header="行政区划管理详情"
      placement="center"
      width="min(800px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="行政区域编码">{{ form.id }}</t-descriptions-item>
        <t-descriptions-item label="上级行政区域编码">{{ form.pid }}</t-descriptions-item>
        <t-descriptions-item label="区域层级">
          <dict-tag :options="region_type" :value="form.deep" />
        </t-descriptions-item>
        <t-descriptions-item label="区域名称">{{ form.name }}</t-descriptions-item>
        <t-descriptions-item label="拼音开头">{{ form.pinyinPrefix }}</t-descriptions-item>
        <t-descriptions-item label="全拼">{{ form.pinyin }}</t-descriptions-item>
        <t-descriptions-item label="行政区域编码（12位）">{{ form.extId }}</t-descriptions-item>
        <t-descriptions-item label="行政区域名称">{{ form.extName }}</t-descriptions-item>
      </my-descriptions>
    </t-dialog>
  </t-card>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'RegionInfo',
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

import type { ChinaRegionInfoForm, ChinaRegionInfoQuery, ChinaRegionInfoVo } from '@/api/system/model/regionInfoModel';
import { listRegionInfo, getRegionInfo, delRegionInfo, addRegionInfo, updateRegionInfo } from '@/api/system/regionInfo';

const { proxy } = getCurrentInstance();
const { region_type } = proxy.useDict('region_type')

const openView = ref(false);
const openViewLoading = ref(false);
const regionInfoRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const regionInfoList = ref<ChinaRegionInfoVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  pid: [{ required: true, message: '不能为空' }],
  deep: [{ required: true, message: '区域层级不能为空' }],
  name: [{ required: true, message: '区域名称不能为空' }, { max: 200, message: '不能超过200个字符' }],
  pinyinPrefix: [{ required: true, message: '拼音开头不能为空' }, { max: 2, message: '不能超过2个字符' }],
  pinyin: [{ required: true, message: '全拼不能为空' }, { max: 200, message: '不能超过200个字符' }],
  extId: [{ required: true, message: '行政区域编码（12位）不能为空' }, { max: 12, message: '不能超过12个字符' }],
  extName: [{ required: true, message: '行政区域名称不能为空' }, { max: 200, message: '不能超过200个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: `行政区域编码`, colKey: 'id', align: 'center' },
  { title: `上级行政区域编码`, colKey: 'pid', align: 'center' },
  { title: `区域层级`, colKey: 'deep', align: 'center' },
  { title: `区域名称`, colKey: 'name', align: 'center' },
  { title: `拼音开头`, colKey: 'pinyinPrefix', align: 'center' },
  { title: `全拼`, colKey: 'pinyin', align: 'center' },
  { title: `行政区域编码（12位）`, colKey: 'extId', align: 'center' },
  { title: `行政区域名称`, colKey: 'extName', align: 'center' },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<ChinaRegionInfoVo & ChinaRegionInfoForm>({});
// 查询对象
const queryParams = ref<ChinaRegionInfoQuery>({
  pageNum: 1,
  pageSize: 10,
  pid: undefined,
  deep: undefined,
  name: undefined,
  pinyinPrefix: undefined,
  pinyin: undefined,
  extId: undefined,
  extName: undefined,
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

/** 查询行政区划管理列表 */
function getList() {
  loading.value = true;
  listRegionInfo(queryParams.value)
    .then((response) => {
      regionInfoList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('regionInfoRef');
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
  title.value = '添加行政区划管理';
}

/** 详情按钮操作 */
function handleDetail(row: ChinaRegionInfoVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const id = row.id;
  getRegionInfo(id).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: ChinaRegionInfoVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改行政区划管理';
  const id = row?.id || ids.value.at(0);
  getRegionInfo(id).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.id) {
      updateRegionInfo(form.value)
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
      addRegionInfo(form.value)
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
function handleDelete(row?: ChinaRegionInfoVo) {
  const $ids = row?.id || ids.value;
  proxy.$modal.confirm(`是否确认删除行政区划管理编号为${$ids}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delRegionInfo($ids)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, $ids);
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
    'system/regionInfo/export',
    {
      ...queryParams.value,
    },
    `regionInfo_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
