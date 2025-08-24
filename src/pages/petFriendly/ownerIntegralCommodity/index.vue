<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态:0=正常,1=停用,2=草稿" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态:0=正常,1=停用,2=草稿" clearable>
            <t-option label="请选择字典生成" value="" />
          </t-select>
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
        <t-form-item label="商品图" name="commodityImg">
          <t-input v-model="queryParams.commodityImg" placeholder="请输入商品图" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="商品价值:积分" name="commodityValue">
          <t-input v-model="queryParams.commodityValue" placeholder="请输入商品价值:积分" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="库存" name="inventory">
          <t-input v-model="queryParams.inventory" placeholder="请输入库存" clearable @enter="handleQuery" />
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
        row-key="integralCommodityId"
        :data="ownerIntegralCommodityList"
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
              <t-button v-hasPermi="['petFriendly:ownerIntegralCommodity:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:ownerIntegralCommodity:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:ownerIntegralCommodity:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:ownerIntegralCommodity:export']" theme="default" variant="outline" @click="handleExport">
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
            <my-link v-hasPermi="['petFriendly:ownerIntegralCommodity:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:ownerIntegralCommodity:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:ownerIntegralCommodity:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改宠物主人积分兑换商品对话框 -->
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
      @confirm="ownerIntegralCommodityRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="ownerIntegralCommodityRef"
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
            <t-textarea v-model="form.commodityImg" placeholder="请输入商品图" />
          </t-form-item>
          <t-form-item label="商品价值:积分" name="commodityValue">
            <t-input-number v-model="form.commodityValue" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="库存" name="inventory">
            <t-input-number v-model="form.inventory" placeholder="请输入" />
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

    <!-- 宠物主人积分兑换商品详情 -->
    <t-dialog
      v-model:visible="openView"
      header="宠物主人积分兑换商品详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="">{{ form.integralCommodityId }}</t-descriptions-item>
        <t-descriptions-item label="创建时间">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="更新时间">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态:0=正常,1=停用,2=草稿">{{ form.status }}</t-descriptions-item>
        <t-descriptions-item label="商品名称">{{ form.commodityTitle }}</t-descriptions-item>
        <t-descriptions-item label="商品编码">{{ form.commodityCode }}</t-descriptions-item>
        <t-descriptions-item label="商品信息" :span="2">{{ form.commodityInformation }}</t-descriptions-item>
        <t-descriptions-item label="商品图" :span="2">{{ form.commodityImg }}</t-descriptions-item>
        <t-descriptions-item label="商品价值:积分">{{ form.commodityValue }}</t-descriptions-item>
        <t-descriptions-item label="库存">{{ form.inventory }}</t-descriptions-item>
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
  name: 'OwnerIntegralCommodity',
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

import type { PetOwnerIntegralCommodityForm, PetOwnerIntegralCommodityQuery, PetOwnerIntegralCommodityVo } from '@/api/petFriendly/model/ownerIntegralCommodityModel';
import { listOwnerIntegralCommodity, getOwnerIntegralCommodity, delOwnerIntegralCommodity, addOwnerIntegralCommodity, updateOwnerIntegralCommodity } from '@/api/petFriendly/ownerIntegralCommodity';

const { proxy } = getCurrentInstance();

const openView = ref(false);
const openViewLoading = ref(false);
const ownerIntegralCommodityRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const ownerIntegralCommodityList = ref<PetOwnerIntegralCommodityVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  commodityTitle: [{ max: 100, message: '商品名称不能超过100个字符' }],
  commodityCode: [{ max: 100, message: '商品编码不能超过100个字符' }],
  inventory: [{ required: true, message: '库存不能为空' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: `创建时间`, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: `更新时间`, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态:0=正常,1=停用,2=草稿`, colKey: 'status', align: 'center' },
  { title: `商品名称`, colKey: 'commodityTitle', align: 'center' },
  { title: `商品编码`, colKey: 'commodityCode', align: 'center' },
  { title: `商品信息`, colKey: 'commodityInformation', align: 'center', ellipsis: true },
  { title: `商品图`, colKey: 'commodityImg', align: 'center', ellipsis: true },
  { title: `商品价值:积分`, colKey: 'commodityValue', align: 'center' },
  { title: `库存`, colKey: 'inventory', align: 'center' },
  { title: `备注`, colKey: 'remark', align: 'center' },
  { title: `保留字端`, colKey: 'ext', align: 'center', ellipsis: true },
  { title: `保留字端1`, colKey: 'ext1', align: 'center', ellipsis: true },
  { title: `保留字端2`, colKey: 'ext2', align: 'center', ellipsis: true },
  { title: `保留字端3`, colKey: 'ext3', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<PetOwnerIntegralCommodityVo & PetOwnerIntegralCommodityForm>({});
// 查询对象
const queryParams = ref<PetOwnerIntegralCommodityQuery>({
  pageNum: 1,
  pageSize: 10,
  status: undefined,
  commodityTitle: undefined,
  commodityCode: undefined,
  commodityInformation: undefined,
  commodityImg: undefined,
  commodityValue: undefined,
  inventory: undefined,
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

/** 查询宠物主人积分兑换商品列表 */
function getList() {
  loading.value = true;
  listOwnerIntegralCommodity(queryParams.value)
    .then((response) => {
      ownerIntegralCommodityList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('ownerIntegralCommodityRef');
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
  title.value = '添加宠物主人积分兑换商品';
}

/** 详情按钮操作 */
function handleDetail(row: PetOwnerIntegralCommodityVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const integralCommodityId = row.integralCommodityId;
  getOwnerIntegralCommodity(integralCommodityId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetOwnerIntegralCommodityVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改宠物主人积分兑换商品';
  const integralCommodityId = row?.integralCommodityId || ids.value.at(0);
  getOwnerIntegralCommodity(integralCommodityId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.integralCommodityId) {
      updateOwnerIntegralCommodity(form.value)
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
      addOwnerIntegralCommodity(form.value)
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
function handleDelete(row?: PetOwnerIntegralCommodityVo) {
  const integralCommodityIds = row?.integralCommodityId || ids.value;
  proxy.$modal.confirm(`是否确认删除宠物主人积分兑换商品编号为${integralCommodityIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delOwnerIntegralCommodity(integralCommodityIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, integralCommodityIds);
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
    'petFriendly/ownerIntegralCommodity/export',
    {
      ...queryParams.value,
    },
    `ownerIntegralCommodity_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
