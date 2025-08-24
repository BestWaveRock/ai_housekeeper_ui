<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态:0=正常,1=停用" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态:0=正常,1=停用" clearable>
            <t-option label="请选择字典生成" value="" />
          </t-select>
        </t-form-item>
        <t-form-item label="宠物昵称" name="name">
          <t-input v-model="queryParams.name" placeholder="请输入宠物昵称" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="性别:0=未填写,1=弟弟,2=妹妹,3=保密" name="sex">
          <t-select v-model="queryParams.sex" placeholder="请选择性别:0=未填写,1=弟弟,2=妹妹,3=保密" clearable>
            <t-option label="请选择字典生成" value="" />
          </t-select>
        </t-form-item>
        <t-form-item label="宠物种类:sys_dict_type(pet_species)" name="species">
          <t-input v-model="queryParams.species" placeholder="请输入宠物种类:sys_dict_type(pet_species)" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="宠物品种:sys_dict_type(species_code)" name="breeds">
          <t-input v-model="queryParams.breeds" placeholder="请输入宠物品种:sys_dict_type(species_code)" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="生日" name="birthday">
          <t-date-picker
            v-model="queryParams.birthday"
            allow-input
            clearable
            placeholder="请选择生日"
          />
        </t-form-item>
        <t-form-item label="头像" name="petAvatar">
          <t-input v-model="queryParams.petAvatar" placeholder="请输入头像" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="排序" name="petSort">
          <t-input v-model="queryParams.petSort" placeholder="请输入排序" clearable @enter="handleQuery" />
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
        <t-form-item label="宠物证件号" name="petIdcard">
          <t-input v-model="queryParams.petIdcard" placeholder="请输入宠物证件号" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="联系人类型:0=主人,1=救助人" name="contactType">
          <t-select v-model="queryParams.contactType" placeholder="请选择联系人类型:0=主人,1=救助人" clearable>
            <t-option label="请选择字典生成" value="" />
          </t-select>
        </t-form-item>
        <t-form-item label="联系人id" name="contactUserId">
          <t-input v-model="queryParams.contactUserId" placeholder="请输入联系人id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="联系人昵称" name="contactName">
          <t-input v-model="queryParams.contactName" placeholder="请输入联系人昵称" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="联系方式" name="contactInformation">
          <t-input v-model="queryParams.contactInformation" placeholder="请输入联系方式" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="联系人地址" name="contactAddress">
          <t-input v-model="queryParams.contactAddress" placeholder="请输入联系人地址" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="上次接种日期" name="lastVaccination">
          <t-date-picker
            v-model="queryParams.lastVaccination"
            allow-input
            clearable
            placeholder="请选择上次接种日期"
          />
        </t-form-item>
        <t-form-item label="上次美容日期" name="lastCosmetic">
          <t-date-picker
            v-model="queryParams.lastCosmetic"
            allow-input
            clearable
            placeholder="请选择上次美容日期"
          />
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
        row-key="petId"
        :data="informationList"
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
              <t-button v-hasPermi="['petFriendly:information:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:information:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:information:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:information:export']" theme="default" variant="outline" @click="handleExport">
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
            <my-link v-hasPermi="['petFriendly:information:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:information:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:information:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改宠物信息档案对话框 -->
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
      @confirm="informationRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="informationRef"
          label-align="right"
          :data="form"
          :rules="rules"
          label-width="calc(5em + 41px)"
          scroll-to-first-error="smooth"
          @submit="submitForm"
        >
          <t-form-item label="状态:0=正常,1=停用" name="status">
            <t-radio-group v-model="form.status">
              <t-radio value="1">请选择字典生成</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="宠物昵称" name="name">
            <t-input v-model="form.name" placeholder="请输入宠物昵称" clearable />
          </t-form-item>
          <t-form-item label="性别:0=未填写,1=弟弟,2=妹妹,3=保密" name="sex">
            <t-select v-model="form.sex" placeholder="请选择性别:0=未填写,1=弟弟,2=妹妹,3=保密" clearable>
              <t-option label="请选择字典生成" value="" />
            </t-select>
          </t-form-item>
          <t-form-item label="宠物种类:sys_dict_type(pet_species)" name="species">
            <t-input-number v-model="form.species" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="宠物品种:sys_dict_type(species_code)" name="breeds">
            <t-input-number v-model="form.breeds" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="生日" name="birthday">
            <t-date-picker
              v-model="form.birthday"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择生日"
            />
          </t-form-item>
          <t-form-item label="头像" name="petAvatar">
            <t-input v-model="form.petAvatar" placeholder="请输入头像" clearable />
          </t-form-item>
          <t-form-item label="排序" name="petSort">
            <t-input-number v-model="form.petSort" placeholder="请输入" />
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
          <t-form-item label="备注" name="remark">
            <t-input v-model="form.remark" placeholder="请输入备注" clearable />
          </t-form-item>
          <t-form-item label="宠物证件号" name="petIdcard">
            <t-input v-model="form.petIdcard" placeholder="请输入宠物证件号" clearable />
          </t-form-item>
          <t-form-item label="联系人类型:0=主人,1=救助人" name="contactType">
            <t-select v-model="form.contactType" placeholder="请选择联系人类型:0=主人,1=救助人" clearable>
              <t-option label="请选择字典生成" value="" />
            </t-select>
          </t-form-item>
          <t-form-item label="联系人id" name="contactUserId">
            <t-input-number v-model="form.contactUserId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="联系人昵称" name="contactName">
            <t-input v-model="form.contactName" placeholder="请输入联系人昵称" clearable />
          </t-form-item>
          <t-form-item label="联系方式" name="contactInformation">
            <t-input v-model="form.contactInformation" placeholder="请输入联系方式" clearable />
          </t-form-item>
          <t-form-item label="联系人地址" name="contactAddress">
            <t-input v-model="form.contactAddress" placeholder="请输入联系人地址" clearable />
          </t-form-item>
          <t-form-item label="上次接种日期" name="lastVaccination">
            <t-date-picker
              v-model="form.lastVaccination"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择上次接种日期"
            />
          </t-form-item>
          <t-form-item label="上次美容日期" name="lastCosmetic">
            <t-date-picker
              v-model="form.lastCosmetic"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择上次美容日期"
            />
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

    <!-- 宠物信息档案详情 -->
    <t-dialog
      v-model:visible="openView"
      header="宠物信息档案详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="">{{ form.petId }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态:0=正常,1=停用">{{ form.status }}</t-descriptions-item>
        <t-descriptions-item label="宠物昵称">{{ form.name }}</t-descriptions-item>
        <t-descriptions-item label="性别:0=未填写,1=弟弟,2=妹妹,3=保密">{{ form.sex }}</t-descriptions-item>
        <t-descriptions-item label="宠物种类:sys_dict_type(pet_species)">{{ form.species }}</t-descriptions-item>
        <t-descriptions-item label="宠物品种:sys_dict_type(species_code)">{{ form.breeds }}</t-descriptions-item>
        <t-descriptions-item label="生日">{{ parseTime(form.birthday) }}</t-descriptions-item>
        <t-descriptions-item label="头像">{{ form.petAvatar }}</t-descriptions-item>
        <t-descriptions-item label="排序">{{ form.petSort }}</t-descriptions-item>
        <t-descriptions-item label="所属省份">{{ form.proviceCode }}</t-descriptions-item>
        <t-descriptions-item label="所属城市">{{ form.cityCode }}</t-descriptions-item>
        <t-descriptions-item label="所属区县">{{ form.districtCode }}</t-descriptions-item>
        <t-descriptions-item label="备注">{{ form.remark }}</t-descriptions-item>
        <t-descriptions-item label="宠物证件号">{{ form.petIdcard }}</t-descriptions-item>
        <t-descriptions-item label="联系人类型:0=主人,1=救助人">{{ form.contactType }}</t-descriptions-item>
        <t-descriptions-item label="联系人id">{{ form.contactUserId }}</t-descriptions-item>
        <t-descriptions-item label="联系人昵称">{{ form.contactName }}</t-descriptions-item>
        <t-descriptions-item label="联系方式">{{ form.contactInformation }}</t-descriptions-item>
        <t-descriptions-item label="联系人地址">{{ form.contactAddress }}</t-descriptions-item>
        <t-descriptions-item label="上次接种日期">{{ parseTime(form.lastVaccination) }}</t-descriptions-item>
        <t-descriptions-item label="上次美容日期">{{ parseTime(form.lastCosmetic) }}</t-descriptions-item>
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
  name: 'Information',
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

import type { PetInformationForm, PetInformationQuery, PetInformationVo } from '@/api/petFriendly/model/informationModel';
import { listInformation, getInformation, delInformation, addInformation, updateInformation } from '@/api/petFriendly/information';

const { proxy } = getCurrentInstance();

const openView = ref(false);
const openViewLoading = ref(false);
const informationRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const informationList = ref<PetInformationVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  name: [{ required: true, message: '宠物昵称不能为空' }, { max: 100, message: '宠物昵称不能超过100个字符' }],
  petAvatar: [{ max: 100, message: '头像不能超过100个字符' }],
  proviceCode: [{ max: 20, message: '所属省份不能超过20个字符' }],
  cityCode: [{ max: 20, message: '所属城市不能超过20个字符' }],
  districtCode: [{ max: 20, message: '所属区县不能超过20个字符' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
  petIdcard: [{ max: 50, message: '宠物证件号不能超过50个字符' }],
  contactName: [{ max: 30, message: '联系人昵称不能超过30个字符' }],
  contactInformation: [{ max: 50, message: '联系方式不能超过50个字符' }],
  contactAddress: [{ max: 100, message: '联系人地址不能超过100个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: ``, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: ``, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态:0=正常,1=停用`, colKey: 'status', align: 'center' },
  { title: `宠物昵称`, colKey: 'name', align: 'center' },
  { title: `性别:0=未填写,1=弟弟,2=妹妹,3=保密`, colKey: 'sex', align: 'center' },
  { title: `宠物种类:sys_dict_type(pet_species)`, colKey: 'species', align: 'center' },
  { title: `宠物品种:sys_dict_type(species_code)`, colKey: 'breeds', align: 'center' },
  { title: `生日`, colKey: 'birthday', align: 'center', minWidth: 112, width: 180 },
  { title: `头像`, colKey: 'petAvatar', align: 'center' },
  { title: `排序`, colKey: 'petSort', align: 'center' },
  { title: `所属省份`, colKey: 'proviceCode', align: 'center' },
  { title: `所属城市`, colKey: 'cityCode', align: 'center' },
  { title: `所属区县`, colKey: 'districtCode', align: 'center' },
  { title: `备注`, colKey: 'remark', align: 'center' },
  { title: `宠物证件号`, colKey: 'petIdcard', align: 'center' },
  { title: `联系人类型:0=主人,1=救助人`, colKey: 'contactType', align: 'center' },
  { title: `联系人id`, colKey: 'contactUserId', align: 'center' },
  { title: `联系人昵称`, colKey: 'contactName', align: 'center' },
  { title: `联系方式`, colKey: 'contactInformation', align: 'center' },
  { title: `联系人地址`, colKey: 'contactAddress', align: 'center' },
  { title: `上次接种日期`, colKey: 'lastVaccination', align: 'center', minWidth: 112, width: 180 },
  { title: `上次美容日期`, colKey: 'lastCosmetic', align: 'center', minWidth: 112, width: 180 },
  { title: `所属服务商id`, colKey: 'providerId', align: 'center' },
  { title: `保留字端`, colKey: 'ext', align: 'center', ellipsis: true },
  { title: `保留字端1`, colKey: 'ext1', align: 'center', ellipsis: true },
  { title: `保留字端2`, colKey: 'ext2', align: 'center', ellipsis: true },
  { title: `保留字端3`, colKey: 'ext3', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<PetInformationVo & PetInformationForm>({});
// 查询对象
const queryParams = ref<PetInformationQuery>({
  pageNum: 1,
  pageSize: 10,
  status: undefined,
  name: undefined,
  sex: undefined,
  species: undefined,
  breeds: undefined,
  birthday: undefined,
  petAvatar: undefined,
  petSort: undefined,
  proviceCode: undefined,
  cityCode: undefined,
  districtCode: undefined,
  petIdcard: undefined,
  contactType: undefined,
  contactUserId: undefined,
  contactName: undefined,
  contactInformation: undefined,
  contactAddress: undefined,
  lastVaccination: undefined,
  lastCosmetic: undefined,
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

/** 查询宠物信息档案列表 */
function getList() {
  loading.value = true;
  listInformation(queryParams.value)
    .then((response) => {
      informationList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('informationRef');
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
  title.value = '添加宠物信息档案';
}

/** 详情按钮操作 */
function handleDetail(row: PetInformationVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const petId = row.petId;
  getInformation(petId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetInformationVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改宠物信息档案';
  const petId = row?.petId || ids.value.at(0);
  getInformation(petId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.petId) {
      updateInformation(form.value)
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
      addInformation(form.value)
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
function handleDelete(row?: PetInformationVo) {
  const petIds = row?.petId || ids.value;
  proxy.$modal.confirm(`是否确认删除宠物信息档案编号为${petIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delInformation(petIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, petIds);
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
    'petFriendly/information/export',
    {
      ...queryParams.value,
    },
    `information_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
