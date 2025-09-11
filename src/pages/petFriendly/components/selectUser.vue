<template>
  <!-- 选择用户 -->
  <t-dialog
    v-model:visible="visible"
    :close-on-overlay-click="false"
    header="选择用户"
    width="min(1200px, 100%)"
    top="5vh"
    attach="body"
    @confirm="handleSelectUser()"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-form ref="queryRef" :data="queryParams" layout="inline" label-width="calc(4em + 12px)">
        <t-form-item label="用户名称" name="userName">
          <t-input
            v-model="queryParams.userName"
            placeholder="请输入用户名称"
            clearable
            style="width: 200px"
            @enter="handleQuery"
          />
        </t-form-item>
        <t-form-item label="手机号码" name="phonenumber">
          <t-input
            v-model="queryParams.phonenumber"
            placeholder="请输入手机号码"
            clearable
            style="width: 200px"
            @enter="handleQuery"
          />
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
        ref="refTable"
        hover
        :loading="loading"
        row-key="userId"
        :data="userList"
        :columns="columns"
        :selected-row-keys="userIds"
        :pagination="pagination"
        @select-change="handleSelectionChange"
      >
        <template #status="{ row }">
          <dict-tag :options="sys_normal_disable" :value="row.status" />
        </template>
        <template #operation="{ row }">
          <t-button size="medium" :theme="userIds.length && userIds.includes(row.userId) ? 'success' : 'default'" 
            @click="handleSelectUser(row)">
            {{ userIds.length && userIds.includes(row.userId) ? "已选" : "选择" }}
          </t-button>
        </template>
      </t-table>
    </t-space>
  </t-dialog>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'SelectUser',
});
import { RefreshIcon, SearchIcon } from 'tdesign-icons-vue-next';
import type { PageInfo, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, getCurrentInstance, reactive, ref } from 'vue';

import type { SysUserQuery, SysUserVo } from '@/api/system/model/userModel';
import { listUser } from '@/api/system/user';

const props = defineProps({
  userIds: {
    type: [Number, String],
  },
  userId: {
    type: Number,
    default: '',
  },
  nickName: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  /* 单选/多选 */
  selectType: {
    type: String as () => 'single' | 'multiple',
    default: 'multiple',
  },
});

const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const userList = ref<SysUserVo[]>([]);
const loddingUserList = ref<SysUserVo[]>([]);
const visible = ref(false);
const loading = ref(false);
const total = ref(0);
const userIds = ref([]);
const userNames = ref([]);
const phoneNumbers = ref([]);

// const columns = ref<Array<PrimaryTableCol>>([
//   { title: `选择列`, colKey: 'row-select', type: props.selectType, width: 50, align: 'center' },
//   { title: `用户名称`, colKey: 'userName', align: 'center', ellipsis: true },
//   { title: `用户昵称`, colKey: 'nickName', ellipsis: true, align: 'center' },
//   { title: `邮箱`, colKey: 'email', ellipsis: true, align: 'center' },
//   { title: `手机`, colKey: 'phonenumber', align: 'center', ellipsis: true },
//   { title: `状态`, colKey: 'status', align: 'center', ellipsis: true },
//   { title: `创建时间`, colKey: 'createTime', align: 'center', width: '180' },
//   { title: `操作`, colKey: 'operation', align: 'center' },
// ]);
const columns = computed<PrimaryTableCol<TableRowData>[]>(() => {
  const base: PrimaryTableCol<TableRowData>[] = [
    { title: '用户名称', colKey: 'userName', align: 'center', ellipsis: true },
    { title: '用户昵称', colKey: 'nickName', align: 'center', ellipsis: true },
    { title: '邮箱', colKey: 'email', align: 'center', ellipsis: true },
    { title: '手机', colKey: 'phonenumber', align: 'center', ellipsis: true },
    { title: '状态', colKey: 'status', align: 'center', ellipsis: true },
    { title: '创建时间', colKey: 'createTime', align: 'center', width: 180 },
  ];

  // 仅多选时插入“选择列”
  if (props.selectType !== 'single') {
    base.unshift({
      title: '选择列',
      colKey: 'row-select',
      type: props.selectType as any, // 'multiple' | 'single'
      width: 50,
      align: 'center',
    });
  } else {
    base.push({
      title: '操作',
      colKey: 'operation',
      align: 'center',
    });
  }
  return base;
});

const queryParams = reactive<SysUserQuery>({
  pageNum: 1,
  pageSize: 10,
  userName: undefined,
  phonenumber: undefined,
});

const pagination = computed(() => {
  return {
    current: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    total: total.value,
    showJumper: true,
    onChange: (pageInfo: PageInfo) => {
      queryParams.pageNum = pageInfo.current;
      queryParams.pageSize = pageInfo.pageSize;
      getList();
    },
  };
});
// 显示弹框
function show() {
  // 外部值 → 内部
  userIds.value = props.userIds ? String(props.userIds).split(',') : (props.userId ? [props.userId] : []);
  getList();
  visible.value = true;
}
// 多选框选中数据
function handleSelectionChange(selection: Array<string | number>) {
  userIds.value = selection;
  // 根据选中的 id 过滤出对应行，再取 nickName
  userNames.value = userList.value
    .filter(u => selection.includes(u.userId))
    .map(u => u.nickName);
  phoneNumbers.value = userList.value
    .filter(u => selection.includes(u.userId))
    .map(u => u.phonenumber);
}
// 查询表数据
function getList() {
  loading.value = true;
  listUser(queryParams).then((res) => {
    userList.value = res.rows;
    total.value = res.total;
    loading.value = false;
    // handleSelectionChange([]);
  });
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm('queryRef');
  handleQuery();
}
const emit = defineEmits(['update:userId', 'update:nickName', "update:phoneNumber"]);
/** 选择用户确认操作 */
function handleSelectUser(user?: SysUserVo) {
  if (user != null) {
    // 选择单个用户
    proxy.$modal.msgSuccess('已确认');
    visible.value = false;
    // 单选，将选择的用户userId，nickName绑定到外部选择器的输入框内。
    emit('update:userId', user.userId);
    emit('update:nickName', user.nickName);
    emit('update:phoneNumber', user.phonenumber);
    return
  }
  if (props.selectType == 'single') {
    visible.value = false;
    return;
  }
  const uIds = userIds.value.join(',');
  if (!uIds) {
    proxy.$modal.msgError('请选择要指定的用户');
    return;
  }
  proxy.$modal.msgSuccess('已确认');
  // 选择支持单选或多选，将选择的用户userId，nickName绑定到外部选择器的输入框内。
  emit('update:userId', userIds.value.join(','));
  emit('update:nickName', userNames.value.join(','));
  emit('update:phoneNumber', phoneNumbers.value.join(','));
  visible.value = false;
}

const exposed = {
  show,
};
export type SelectUserInstance = typeof exposed;
defineExpose<SelectUserInstance>(exposed);
</script>
