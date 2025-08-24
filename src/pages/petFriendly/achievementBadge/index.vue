<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态:0=正常,1=停用,2=草稿" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态:0=正常,1=停用,2=草稿" clearable>
            <t-option label="请选择字典生成" value="" />
          </t-select>
        </t-form-item>
        <t-form-item label="成就标题" name="achievementTitle">
          <t-input v-model="queryParams.achievementTitle" placeholder="请输入成就标题" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="成就副标题" name="achievementSubtitle">
          <t-input v-model="queryParams.achievementSubtitle" placeholder="请输入成就副标题" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="成就描述" name="achievementDescribe">
          <t-input v-model="queryParams.achievementDescribe" placeholder="请输入成就描述" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="成就达成条件" name="achievementRules">
          <t-input v-model="queryParams.achievementRules" placeholder="请输入成就达成条件" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="成就奖励积分值" name="achievementRewardPoints">
          <t-input v-model="queryParams.achievementRewardPoints" placeholder="请输入成就奖励积分值" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="成就奖励爱心值" name="achievementRewardLove">
          <t-input v-model="queryParams.achievementRewardLove" placeholder="请输入成就奖励爱心值" clearable @enter="handleQuery" />
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
        row-key="achievementBadgeId"
        :data="achievementBadgeList"
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
              <t-button v-hasPermi="['petFriendly:achievementBadge:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:achievementBadge:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:achievementBadge:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:achievementBadge:export']" theme="default" variant="outline" @click="handleExport">
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
            <my-link v-hasPermi="['petFriendly:achievementBadge:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:achievementBadge:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:achievementBadge:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改成就徽章系统对话框 -->
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
      @confirm="achievementBadgeRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="achievementBadgeRef"
          label-align="right"
          :data="form"
          :rules="rules"
          label-width="calc(5em + 41px)"
          scroll-to-first-error="smooth"
          @submit="submitForm"
        >
          <t-form-item label="状态:0=正常,1=停用,2=草稿" name="status">
            <t-radio-group v-model="form.status">
              <t-radio value="1">请选择字典生成</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="成就标题" name="achievementTitle">
            <t-input v-model="form.achievementTitle" placeholder="请输入成就标题" clearable />
          </t-form-item>
          <t-form-item label="成就副标题" name="achievementSubtitle">
            <t-input v-model="form.achievementSubtitle" placeholder="请输入成就副标题" clearable />
          </t-form-item>
          <t-form-item label="成就描述" name="achievementDescribe">
            <t-input v-model="form.achievementDescribe" placeholder="请输入成就描述" clearable />
          </t-form-item>
          <t-form-item label="成就达成条件" name="achievementRules">
            <t-textarea v-model="form.achievementRules" placeholder="请输入成就达成条件" />
          </t-form-item>
          <t-form-item label="成就奖励积分值" name="achievementRewardPoints">
            <t-input-number v-model="form.achievementRewardPoints" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="成就奖励爱心值" name="achievementRewardLove">
            <t-input-number v-model="form.achievementRewardLove" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="备注" name="remark">
            <t-input v-model="form.remark" placeholder="请输入备注" clearable />
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

    <!-- 成就徽章系统详情 -->
    <t-dialog
      v-model:visible="openView"
      header="成就徽章系统详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="">{{ form.achievementBadgeId }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态:0=正常,1=停用,2=草稿">{{ form.status }}</t-descriptions-item>
        <t-descriptions-item label="成就标题">{{ form.achievementTitle }}</t-descriptions-item>
        <t-descriptions-item label="成就副标题">{{ form.achievementSubtitle }}</t-descriptions-item>
        <t-descriptions-item label="成就描述">{{ form.achievementDescribe }}</t-descriptions-item>
        <t-descriptions-item label="成就达成条件" :span="2">{{ form.achievementRules }}</t-descriptions-item>
        <t-descriptions-item label="成就奖励积分值">{{ form.achievementRewardPoints }}</t-descriptions-item>
        <t-descriptions-item label="成就奖励爱心值">{{ form.achievementRewardLove }}</t-descriptions-item>
        <t-descriptions-item label="备注">{{ form.remark }}</t-descriptions-item>
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
  name: 'AchievementBadge',
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

import type { PetAchievementBadgeForm, PetAchievementBadgeQuery, PetAchievementBadgeVo } from '@/api/petFriendly/model/achievementBadgeModel';
import { listAchievementBadge, getAchievementBadge, delAchievementBadge, addAchievementBadge, updateAchievementBadge } from '@/api/petFriendly/achievementBadge';

const { proxy } = getCurrentInstance();

const openView = ref(false);
const openViewLoading = ref(false);
const achievementBadgeRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const achievementBadgeList = ref<PetAchievementBadgeVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  achievementTitle: [{ max: 100, message: '成就标题不能超过100个字符' }],
  achievementSubtitle: [{ max: 100, message: '成就副标题不能超过100个字符' }],
  achievementDescribe: [{ max: 300, message: '成就描述不能超过300个字符' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: ``, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: ``, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态:0=正常,1=停用,2=草稿`, colKey: 'status', align: 'center' },
  { title: `成就标题`, colKey: 'achievementTitle', align: 'center' },
  { title: `成就副标题`, colKey: 'achievementSubtitle', align: 'center' },
  { title: `成就描述`, colKey: 'achievementDescribe', align: 'center' },
  { title: `成就达成条件`, colKey: 'achievementRules', align: 'center', ellipsis: true },
  { title: `成就奖励积分值`, colKey: 'achievementRewardPoints', align: 'center' },
  { title: `成就奖励爱心值`, colKey: 'achievementRewardLove', align: 'center' },
  { title: `备注`, colKey: 'remark', align: 'center' },
  { title: `保留字端`, colKey: 'ext', align: 'center', ellipsis: true },
  { title: `保留字端1`, colKey: 'ext1', align: 'center', ellipsis: true },
  { title: `保留字端2`, colKey: 'ext2', align: 'center', ellipsis: true },
  { title: `保留字端3`, colKey: 'ext3', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<PetAchievementBadgeVo & PetAchievementBadgeForm>({});
// 查询对象
const queryParams = ref<PetAchievementBadgeQuery>({
  pageNum: 1,
  pageSize: 10,
  status: undefined,
  achievementTitle: undefined,
  achievementSubtitle: undefined,
  achievementDescribe: undefined,
  achievementRules: undefined,
  achievementRewardPoints: undefined,
  achievementRewardLove: undefined,
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

/** 查询成就徽章系统列表 */
function getList() {
  loading.value = true;
  listAchievementBadge(queryParams.value)
    .then((response) => {
      achievementBadgeList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('achievementBadgeRef');
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
  title.value = '添加成就徽章系统';
}

/** 详情按钮操作 */
function handleDetail(row: PetAchievementBadgeVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const achievementBadgeId = row.achievementBadgeId;
  getAchievementBadge(achievementBadgeId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetAchievementBadgeVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改成就徽章系统';
  const achievementBadgeId = row?.achievementBadgeId || ids.value.at(0);
  getAchievementBadge(achievementBadgeId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.achievementBadgeId) {
      updateAchievementBadge(form.value)
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
      addAchievementBadge(form.value)
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
function handleDelete(row?: PetAchievementBadgeVo) {
  const achievementBadgeIds = row?.achievementBadgeId || ids.value;
  proxy.$modal.confirm(`是否确认删除成就徽章系统编号为${achievementBadgeIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delAchievementBadge(achievementBadgeIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, achievementBadgeIds);
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
    'petFriendly/achievementBadge/export',
    {
      ...queryParams.value,
    },
    `achievementBadge_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
