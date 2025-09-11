<template>
  <!-- 选择服务商 -->
  <t-dialog
    v-model:visible="visible"
    :close-on-overlay-click="false"
    header="选择服务商"
    width="min(1200px, 100%)"
    top="5vh"
    attach="body"
    @confirm="handleSelectServiceProvider()"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-form ref="queryRef" :data="queryParams" layout="inline" label-width="calc(4em + 12px)">
        <t-form-item label="单位称呼" name="unitNick">
          <t-input v-model="queryParams.unitNick" placeholder="请输入单位称呼" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="单位名称" name="unitName">
          <t-input v-model="queryParams.unitName" placeholder="请输入单位名称" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="工商识别号" name="unitIdcard" :label-width="80">
          <t-input v-model="queryParams.unitIdcard" placeholder="请输入工商识别号" clearable @enter="handleQuery" />
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
        row-key="providerId"
        :data="serviceProviderList"
        :columns="columns"
        :selected-row-keys="providerIds"
        :pagination="pagination"
        @select-change="handleSelectionChange"
      >
        <template #status="{ row }">
          <dict-tag :options="sys_normal_disable" :value="row.status" />
        </template>
        <template #operation="{ row }">
          <t-button size="medium" :theme="providerIds.length && providerIds.includes(row.providerId) ? 'success' : 'default'" 
            @click="handleSelectServiceProvider(row)">
            {{ providerIds.length && providerIds.includes(row.providerId) ? "已选" : "选择" }}
          </t-button>
        </template>
      </t-table>
    </t-space>
  </t-dialog>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'SelectProvider',
});
import { RefreshIcon, SearchIcon } from 'tdesign-icons-vue-next';
import type { PageInfo, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, getCurrentInstance, reactive, ref } from 'vue';

import type { PetServiceProviderQuery, PetServiceProviderVo } from '@/api/petFriendly/model/serviceProviderModel';
import { listServiceProvider } from '@/api/petFriendly/serviceProvider';

const props = defineProps({
  providerIds: {
    type: [Number, String],
  },
  providerId: {
    type: Number,
    default: '',
  },
  unitNick: {
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

const serviceProviderList = ref<PetServiceProviderVo[]>([]);
const loddingServiceProviderList = ref<PetServiceProviderVo[]>([]);
const visible = ref(false);
const loading = ref(false);
const total = ref(0);
const providerIds = ref([]);
const unitNicks = ref([]);

// const columns = ref<Array<PrimaryTableCol>>([
//   { title: `选择列`, colKey: 'row-select', type: props.selectType, width: 50, align: 'center' },
//   { title: `服务商名称`, colKey: 'unitName', align: 'center', ellipsis: true },
//   { title: `单位称呼`, colKey: 'unitNick', ellipsis: true, align: 'center' },
//   { title: `邮箱`, colKey: 'email', ellipsis: true, align: 'center' },
//   { title: `手机`, colKey: 'phonenumber', align: 'center', ellipsis: true },
//   { title: `状态`, colKey: 'status', align: 'center', ellipsis: true },
//   { title: `创建时间`, colKey: 'createTime', align: 'center', width: '180' },
//   { title: `操作`, colKey: 'operation', align: 'center' },
// ]);
const columns = computed<PrimaryTableCol<TableRowData>[]>(() => {
  const base: PrimaryTableCol<TableRowData>[] = [
    { title: '单位称呼', colKey: 'unitNick', align: 'center', ellipsis: true },
    { title: '服务商名称', colKey: 'unitName', align: 'center', ellipsis: true, width: 200 },
    { title: '工商识别号', colKey: 'unitIdcard', align: 'center', ellipsis: true },
    { title: `综合评分`, colKey: 'rate', align: 'center' },
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

const queryParams = reactive<PetServiceProviderQuery>({
  pageNum: 1,
  pageSize: 10,
  unitNick: undefined,
  unitName: undefined,
  unitIdcard: undefined,
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
  providerIds.value = props.providerIds ? String(props.providerIds).split(',') : (props.providerId ? [props.providerId] : []);
  getList();
  visible.value = true;
}
// 多选框选中数据
function handleSelectionChange(selection: Array<string | number>) {
  providerIds.value = selection;
  // 根据选中的 id 过滤出对应行，再取 unitNick
  unitNicks.value = serviceProviderList.value
    .filter(u => selection.includes(u.providerId))
    .map(u => u.unitNick);
}
// 查询表数据
function getList() {
  loading.value = true;
  listServiceProvider(queryParams).then((res) => {
    serviceProviderList.value = res.rows;
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
const emit = defineEmits(['update:providerId', 'update:unitNick', 'close']);
/** 选择服务商确认操作 */
function handleSelectServiceProvider(user?: PetServiceProviderVo) {
  if (user != null) {
    // 选择单个服务商
    proxy.$modal.msgSuccess('已确认');
    // 单选，将选择的服务商providerId，unitNick绑定到外部选择器的输入框内。
    emit('update:providerId', user.providerId);
    emit('update:unitNick', user.unitNick);
    visible.value = false;
    return
  }
  if (props.selectType == 'single') {
    visible.value = false;
    return;
  }
  const uIds = providerIds.value.join(',');
  if (!uIds) {
    proxy.$modal.msgError('请选择要指定的服务商');
    return;
  }
  proxy.$modal.msgSuccess('已确认');
  // 选择支持单选或多选，将选择的服务商providerId，unitNick绑定到外部选择器的输入框内。
  emit('update:providerId', providerIds.value.join(','));
  emit('update:unitNick', unitNicks.value.join(','));
  visible.value = false;
}

const exposed = {
  show,
};
export type SelectServiceProviderInstance = typeof exposed;
defineExpose<SelectServiceProviderInstance>(exposed);
</script>
