<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="智能体名称" name="sName">
          <t-input v-model="queryParams.sName" placeholder="请输入智能体名称" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="智能体提示词" name="sPrompt">
          <t-input v-model="queryParams.sPrompt" placeholder="请输入智能体提示词" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="智能体版本" name="sVersion">
          <t-input v-model="queryParams.sVersion" placeholder="请输入智能体版本" clearable @enter="handleQuery" />
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
        :data="smartList"
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
              <t-button v-hasPermi="['smart:smart:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['smart:smart:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['smart:smart:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button
                v-hasPermi="['smart:smart:import']"
                theme="default"
                variant="outline"
                @click="openImportExcel = true"
              >
                <template #icon> <upload-icon /> </template>
                导入
              </t-button>
              <t-button v-hasPermi="['smart:smart:export']" theme="default" variant="outline" @click="handleExport">
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
            <my-link v-hasPermi="['smart:smart:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['smart:smart:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['smart:smart:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改智能体列对话框 -->
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
      @confirm="smartRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="smartRef"
          label-align="right"
          :data="form"
          :rules="rules"
          label-width="calc(5em + 41px)"
          scroll-to-first-error="smooth"
          @submit="submitForm"
        >
          <t-form-item label="智能体名称" name="sName">
            <t-input v-model="form.sName" placeholder="请输入智能体名称" clearable />
          </t-form-item>
          <t-form-item label="智能体提示词" name="sPrompt">
            <t-textarea v-model="form.sPrompt" placeholder="请输入智能体提示词" />
          </t-form-item>
          <t-form-item label="智能体版本" name="sVersion">
            <t-input-number v-model="form.sVersion" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="备注" name="remark">
            <t-textarea v-model="form.remark" placeholder="请输入备注" />
          </t-form-item>
        </t-form>
      </t-loading>
    </t-dialog>

    <!-- 智能体列详情 -->
    <t-dialog
      v-model:visible="openView"
      header="智能体列详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="智能体名称">{{ form.sName }}</t-descriptions-item>
        <t-descriptions-item label="智能体提示词" :span="2">{{ form.sPrompt }}</t-descriptions-item>
        <t-descriptions-item label="智能体版本">{{ form.sVersion }}</t-descriptions-item>
        <t-descriptions-item label="创建时间">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="更新时间">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="备注" :span="2">{{ form.remark }}</t-descriptions-item>
      </my-descriptions>
    </t-dialog>

    <!-- 智能体列导入对话框 -->
    <upload-excel
      v-model:visible="openImportExcel"
      title="敏感词导入"
      upload-api="smart/smart/importData"
      download-template-api="/smart/smart/importTemplate"
      template-filename="smart_template"
      @refresh="getList()"
    />
  </t-card>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'Smart',
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
  UploadIcon,
} from 'tdesign-icons-vue-next';
import type { FormInstanceFunctions, FormRule, PageInfo, PrimaryTableCol, SubmitContext  } from 'tdesign-vue-next';
import { computed, getCurrentInstance, ref } from 'vue';
import { ArrayOps } from '@/utils/array';

import type { SmartForm, SmartQuery, SmartVo } from '@/api/smart/model/smartModel';
import { listSmart, getSmart, delSmart, addSmart, updateSmart } from '@/api/smart/smart';

const { proxy } = getCurrentInstance();

const openView = ref(false);
const openViewLoading = ref(false);
const smartRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const smartList = ref<SmartVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const openImportExcel = ref(false);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  sName: [{ max: 255, message: '智能体名称不能超过255个字符' }],
  remark: [{ max: 500, message: '备注不能超过500个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: `智能体名称`, colKey: 'sName', align: 'center' },
  { title: `智能体提示词`, colKey: 'sPrompt', align: 'center', ellipsis: true },
  { title: `智能体版本`, colKey: 'sVersion', align: 'center' },
  { title: `创建时间`, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: `更新时间`, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `备注`, colKey: 'remark', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<SmartVo & SmartForm>({});
// 查询对象
const queryParams = ref<SmartQuery>({
  pageNum: 1,
  pageSize: 10,
  sName: undefined,
  sPrompt: undefined,
  sVersion: undefined,
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

/** 查询智能体列列表 */
function getList() {
  loading.value = true;
  listSmart(queryParams.value)
    .then((response) => {
      smartList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('smartRef');
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
  title.value = '添加智能体列';
}

/** 详情按钮操作 */
function handleDetail(row: SmartVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const id = row.id;
  getSmart(id).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: SmartVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改智能体列';
  const id = row?.id || ids.value.at(0);
  getSmart(id).then((response) => {
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
      updateSmart(form.value)
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
      addSmart(form.value)
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
function handleDelete(row?: SmartVo) {
  const $ids = row?.id || ids.value;
  proxy.$modal.confirm(`是否确认删除智能体列编号为${$ids}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delSmart($ids)
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
    'smart/smart/export',
    {
      ...queryParams.value,
    },
    `smart_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
