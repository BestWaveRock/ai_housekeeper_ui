<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得" clearable>
            <t-option label="请选择字典生成" value="" />
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
        <t-form-item label="成就徽章id" name="achievementBadgeId">
          <t-input v-model="queryParams.achievementBadgeId" placeholder="请输入成就徽章id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="完成时间" name="downTime">
          <t-date-picker
            v-model="queryParams.downTime"
            allow-input
            clearable
            placeholder="请选择完成时间"
          />
        </t-form-item>
        <t-form-item label="记录IP" name="ip">
          <t-input v-model="queryParams.ip" placeholder="请输入记录IP" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="手机信息" name="phoneInformation">
          <t-input v-model="queryParams.phoneInformation" placeholder="请输入手机信息" clearable @enter="handleQuery" />
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
        row-key="achievementBadgeRecordId"
        :data="ownerAchievementBadgeRecordList"
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
              <t-button v-hasPermi="['petFriendly:ownerAchievementBadgeRecord:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:ownerAchievementBadgeRecord:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:ownerAchievementBadgeRecord:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:ownerAchievementBadgeRecord:export']" theme="default" variant="outline" @click="handleExport">
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
            <my-link v-hasPermi="['petFriendly:ownerAchievementBadgeRecord:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:ownerAchievementBadgeRecord:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:ownerAchievementBadgeRecord:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改宠物主人成就徽章记录对话框 -->
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
      @confirm="ownerAchievementBadgeRecordRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="ownerAchievementBadgeRecordRef"
          label-align="right"
          :data="form"
          :rules="rules"
          label-width="calc(5em + 41px)"
          scroll-to-first-error="smooth"
          @submit="submitForm"
        >
          <t-form-item label="状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得" name="status">
            <t-radio-group v-model="form.status">
              <t-radio value="1">请选择字典生成</t-radio>
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
          <t-form-item label="成就徽章id" name="achievementBadgeId">
            <t-input-number v-model="form.achievementBadgeId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="完成时间" name="downTime">
            <t-date-picker
              v-model="form.downTime"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择完成时间"
            />
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

    <!-- 宠物主人成就徽章记录详情 -->
    <t-dialog
      v-model:visible="openView"
      header="宠物主人成就徽章记录详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="">{{ form.achievementBadgeRecordId }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得">{{ form.status }}</t-descriptions-item>
        <t-descriptions-item label="主人id">{{ form.ownerId }}</t-descriptions-item>
        <t-descriptions-item label="用户id">{{ form.userId }}</t-descriptions-item>
        <t-descriptions-item label="场所id">{{ form.placeId }}</t-descriptions-item>
        <t-descriptions-item label="宠物id">{{ form.petId }}</t-descriptions-item>
        <t-descriptions-item label="服务商id">{{ form.providerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员id">{{ form.providerOwnerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员用户id">{{ form.providerUserId }}</t-descriptions-item>
        <t-descriptions-item label="成就徽章id">{{ form.achievementBadgeId }}</t-descriptions-item>
        <t-descriptions-item label="完成时间">{{ parseTime(form.downTime) }}</t-descriptions-item>
        <t-descriptions-item label="记录IP">{{ form.ip }}</t-descriptions-item>
        <t-descriptions-item label="手机信息">{{ form.phoneInformation }}</t-descriptions-item>
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
  name: 'OwnerAchievementBadgeRecord',
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

import type { PetOwnerAchievementBadgeRecordForm, PetOwnerAchievementBadgeRecordQuery, PetOwnerAchievementBadgeRecordVo } from '@/api/petFriendly/model/ownerAchievementBadgeRecordModel';
import { listOwnerAchievementBadgeRecord, getOwnerAchievementBadgeRecord, delOwnerAchievementBadgeRecord, addOwnerAchievementBadgeRecord, updateOwnerAchievementBadgeRecord } from '@/api/petFriendly/ownerAchievementBadgeRecord';

const { proxy } = getCurrentInstance();

const openView = ref(false);
const openViewLoading = ref(false);
const ownerAchievementBadgeRecordRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const ownerAchievementBadgeRecordList = ref<PetOwnerAchievementBadgeRecordVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  ip: [{ max: 20, message: '记录IP不能超过20个字符' }],
  phoneInformation: [{ max: 100, message: '手机信息不能超过100个字符' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: ``, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: ``, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态:0=正常,1=停用,2=未开始,3=进行中,4=已获得,5=标记作废,6=标记获得`, colKey: 'status', align: 'center' },
  { title: `主人id`, colKey: 'ownerId', align: 'center' },
  { title: `用户id`, colKey: 'userId', align: 'center' },
  { title: `场所id`, colKey: 'placeId', align: 'center' },
  { title: `宠物id`, colKey: 'petId', align: 'center' },
  { title: `服务商id`, colKey: 'providerId', align: 'center' },
  { title: `服务商人员id`, colKey: 'providerOwnerId', align: 'center' },
  { title: `服务商人员用户id`, colKey: 'providerUserId', align: 'center' },
  { title: `成就徽章id`, colKey: 'achievementBadgeId', align: 'center' },
  { title: `完成时间`, colKey: 'downTime', align: 'center', minWidth: 112, width: 180 },
  { title: `记录IP`, colKey: 'ip', align: 'center' },
  { title: `手机信息`, colKey: 'phoneInformation', align: 'center' },
  { title: `备注`, colKey: 'remark', align: 'center' },
  { title: `保留字端`, colKey: 'ext', align: 'center', ellipsis: true },
  { title: `保留字端1`, colKey: 'ext1', align: 'center', ellipsis: true },
  { title: `保留字端2`, colKey: 'ext2', align: 'center', ellipsis: true },
  { title: `保留字端3`, colKey: 'ext3', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<PetOwnerAchievementBadgeRecordVo & PetOwnerAchievementBadgeRecordForm>({});
// 查询对象
const queryParams = ref<PetOwnerAchievementBadgeRecordQuery>({
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
  achievementBadgeId: undefined,
  downTime: undefined,
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

/** 查询宠物主人成就徽章记录列表 */
function getList() {
  loading.value = true;
  listOwnerAchievementBadgeRecord(queryParams.value)
    .then((response) => {
      ownerAchievementBadgeRecordList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('ownerAchievementBadgeRecordRef');
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
  title.value = '添加宠物主人成就徽章记录';
}

/** 详情按钮操作 */
function handleDetail(row: PetOwnerAchievementBadgeRecordVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const achievementBadgeRecordId = row.achievementBadgeRecordId;
  getOwnerAchievementBadgeRecord(achievementBadgeRecordId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetOwnerAchievementBadgeRecordVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改宠物主人成就徽章记录';
  const achievementBadgeRecordId = row?.achievementBadgeRecordId || ids.value.at(0);
  getOwnerAchievementBadgeRecord(achievementBadgeRecordId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.achievementBadgeRecordId) {
      updateOwnerAchievementBadgeRecord(form.value)
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
      addOwnerAchievementBadgeRecord(form.value)
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
function handleDelete(row?: PetOwnerAchievementBadgeRecordVo) {
  const achievementBadgeRecordIds = row?.achievementBadgeRecordId || ids.value;
  proxy.$modal.confirm(`是否确认删除宠物主人成就徽章记录编号为${achievementBadgeRecordIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delOwnerAchievementBadgeRecord(achievementBadgeRecordIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, achievementBadgeRecordIds);
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
    'petFriendly/ownerAchievementBadgeRecord/export',
    {
      ...queryParams.value,
    },
    `ownerAchievementBadgeRecord_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
