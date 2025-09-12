<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <t-option
              v-for="dict in general_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="主人翁" name="ownerId">
          <t-select
            ref="refOwnerSelect"
            v-model="queryParams.ownerId"
            placeholder="请选择主人翁"
            clearable 
            filterable
            :loading="ownerLoading"
            @search="handleOwnerSearch"
            @enter="handleQuery"
            reserve-keyword
          >
            <!-- 空状态 -->
            <t-option
              v-if="ownerList.length == 0"
              :value="''"
              label=""
              disabled
            >
              <span v-if="ownerLoading">加载中...</span>
              <span v-else>暂无数据</span>
            </t-option>
            <t-option
              v-for="item in ownerList"
              :key="item.ownerId"
              :label="item.name + ' >> ' + item.contactInformation"
              :value="item.ownerId"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="用户" name="userId">
          <t-select
            v-model="queryParams.userId"
            placeholder="请选择用户"
            clearable @enter="handleQuery"
            filterable
            :loading="userLoading"
            @search="handleUserSearch"
            reserve-keyword
          >
            <!-- 空状态 -->
            <template v-if="!userList.length && !userLoading" #empty>
              暂无数据
            </template>
            <t-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.nickName + ' >> ' + item.phonenumber"
              :value="item.userId"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="友好场所" name="placeId">
          <t-select
            v-model="queryParams.placeId"
            placeholder="请选择友好场所"
            clearable @enter="handleQuery"
            filterable
            :loading="placeLoading"
            @search="handlePlaceSearch"
            reserve-keyword
          >
            <t-option
              v-for="item in placeList"
              :key="item.placeId"
              :label="item.name"
              :value="item.placeId"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="宠物" name="petId">
          <t-select
            v-model="queryParams.petId"
            placeholder="请选择宠物"
            clearable @enter="handleQuery"
            filterable
            :loading="petLoading"
            @search="handlePetSearch"
            reserve-keyword
          >
            <t-option
              v-for="item in petList"
              :key="item.petId"
              :label="item.name + (item.petIdcard ? ' >> ' + item.petIdcard : '')"
              :value="item.petId"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="服务商" name="providerId">
          <t-select
            v-model="queryParams.petId"
            placeholder="请选择服务商"
            clearable @enter="handleQuery"
            filterable
            :loading="providerLoading"
            @search="handleProviderSearch"
            reserve-keyword
          >
            <t-option
              v-for="item in providerList"
              :key="item.providerId"
              :label="item.unitNick + (item.unitName ? ' >> ' + item.unitName : '')"
              :value="item.providerId"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="服务商人员" name="providerOwnerId" label-width=100>
          <t-select
            v-model="queryParams.providerOwnerId"
            placeholder="请选择服务商人员"
            clearable @enter="handleQuery"
            filterable
            :loading="providerOwnerLoading"
            @search="handleProviderOwnerSearch"
            reserve-keyword
          >
            <t-option
              v-for="item in providerOwnerList"
              :key="item.ownerId"
              :label="item.name + ' >> ' + item.contactInformation"
              :value="item.ownerId"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="服务商用户" name="providerUserId" label-width="140">
          <t-select
            v-model="queryParams.providerUserId"
            placeholder="请选择服务商用户"
            clearable @enter="handleQuery"
            filterable
            :loading="providerUserLoading"
            @search="handleProviderUserSearch"
            reserve-keyword
          >
            <t-option
              v-for="item in providerUserList"
              :key="item.userId"
              :label="item.nickName + ' >> ' + item.phonenumber"
              :value="item.userId"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="档案类型" name="type">
          <t-select v-model="queryParams.type" placeholder="请选择档案类型" clearable>
            <t-option
              v-for="dict in pet_helath_record_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="档案简介" name="comments">
          <t-input v-model="queryParams.comments" placeholder="请输入档案简介" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="档案证明" name="certificate">
          <t-input v-model="queryParams.certificate" placeholder="请输入档案证明" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="档案信息" name="information">
          <t-input v-model="queryParams.information" placeholder="请输入档案信息" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="完成时间" name="downTime">
          <t-date-picker
            v-model="queryParams.downTime"
            allow-input
            clearable
            placeholder="请选择完成时间"
          />
        </t-form-item>
        <t-form-item label="消费金额" name="consumptionAmount">
          <t-input v-model="queryParams.consumptionAmount" placeholder="请输入消费金额" :min="0" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="退回金额" name="refundAmount">
          <t-input v-model="queryParams.refundAmount" placeholder="请输入退回金额" :min="0" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="实际交易金额" name="actualAmount" label-width="120">
          <t-input v-model="queryParams.actualAmount" placeholder="请输入实际交易金额" :min="0" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="记录IP" name="ip">
          <t-input v-model="queryParams.ip" placeholder="请输入记录IP" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="手机信息" name="phoneInformation">
          <t-input v-model="queryParams.phoneInformation" placeholder="请输入手机信息" clearable @enter="handleQuery" />
        </t-form-item>
        <!-- <t-form-item label="保留字端" name="ext">
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
        </t-form-item> -->
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
        row-key="healthId"
        :data="helathRecordList"
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
              <t-button v-hasPermi="['petFriendly:helathRecord:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:helathRecord:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:helathRecord:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:helathRecord:export']" theme="default" variant="outline" @click="handleExport">
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
          <dict-tag :options="general_status" :value="row.status" />
        </template>
        <template #type="{ row }">
          <dict-tag :options="pet_helath_record_type" :value="row.type" />
        </template>
        <template #operation="{ row }">
          <t-space :size="8" break-line>
            <my-link v-hasPermi="['petFriendly:helathRecord:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:helathRecord:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:helathRecord:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改宠物健康档案记录对话框 -->
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
      @confirm="helathRecordRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="helathRecordRef"
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
                v-for="dict in general_status"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="主人翁" name="ownerId">
            <t-select
              v-model="form.ownerId"
              placeholder="请选择主人翁"
              clearable @enter="handleQuery"
              filterable
              :loading="ownerLoading"
              :popup-props="popupPropsOwner"
              @search="handleOwnerSearch"
              reserve-keyword
            >
              <t-option
                v-for="item in ownerList"
                :key="item.ownerId"
                :label="item.name + ' >> ' + item.contactInformation"
                :value="item.ownerId"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="用户" name="userId">
            <t-select
              v-model="form.userId"
              placeholder="请选择用户"
              clearable @enter="handleQuery"
              filterable
              :loading="userLoading"
              :popup-props="popupPropsUser"
              @search="handleUserSearch"
              reserve-keyword
            >
              <t-option
                v-for="item in userList"
                :key="item.userId"
                :label="item.nickName + ' >> ' + item.phonenumber"
                :value="item.userId"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="友好场所" name="placeId">
            <t-select
              v-model="form.placeId"
              placeholder="请选择友好场所"
              clearable @enter="handleQuery"
              filterable
              :loading="placeLoading"
              :popup-props="popupPropsPlace"
              @search="handlePlaceSearch"
              reserve-keyword
            >
              <t-option
                v-for="item in placeList"
                :key="item.placeId"
                :label="item.name"
                :value="item.placeId"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="宠物" name="petId">
            <t-select
              v-model="form.petId"
              placeholder="请选择宠物"
              clearable @enter="handleQuery"
              filterable
              :loading="petLoading"
              :popup-props="popupPropsPet"
              @search="handlePetSearch"
              reserve-keyword
            >
              <t-option
                v-for="item in petList"
                :key="item.petId"
                :label="item.name + (item.petIdcard ? ' >> ' + item.petIdcard : '')"
                :value="item.petId"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="服务商" name="providerId">
            <t-select
              v-model="form.providerId"
              placeholder="请选择服务商"
              clearable @enter="handleQuery"
              filterable
              :loading="providerLoading"
              :popup-props="popupPropsProvider"
              @search="handleProviderSearch"
              reserve-keyword
            >
              <t-option
                v-for="item in providerList"
                :key="item.providerId"
                :label="item.unitNick + (item.unitName ? ' >> ' + item.unitName : '')"
                :value="item.providerId"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="服务商人员" name="providerOwnerId">
            <t-select
              v-model="form.providerOwnerId"
              placeholder="请选择服务商人员"
              clearable @enter="handleQuery"
              filterable
              :loading="providerOwnerLoading"
              :popup-props="popupPropsProviderOwner"
              @search="handleProviderOwnerSearch"
              reserve-keyword
            >
              <t-option
                v-for="item in providerOwnerList"
                :key="item.ownerId"
                :label="item.name + ' >> ' + item.contactInformation"
                :value="item.ownerId"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="服务商人员用户" name="providerUserId">
            <t-select
              v-model="form.providerUserId"
              placeholder="请选择服务商用户"
              clearable @enter="handleQuery"
              filterable
              :loading="providerUserLoading"
              :popup-props="popupPropsProviderUser"
              @search="handleProviderUserSearch"
              reserve-keyword
            >
              <t-option
                v-for="item in providerUserList"
                :key="item.userId"
                :label="item.nickName + ' >> ' + item.phonenumber"
                :value="item.userId"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="档案类型" name="type">
            <t-select v-model="form.type" placeholder="请选择档案类型" clearable>
              <t-option
                v-for="dict in pet_helath_record_type"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="档案简介" name="comments">
            <t-input v-model="form.comments" placeholder="请输入档案简介" clearable />
          </t-form-item>
          <t-form-item label="档案证明" name="certificate">
            <t-textarea v-model="form.certificate" placeholder="请输入档案证明" />
          </t-form-item>
          <t-form-item label="档案信息" name="information">
            <t-textarea v-model="form.information" placeholder="请输入档案信息" />
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
          <t-form-item label="消费金额" name="consumptionAmount">
            <t-input-number v-model="form.consumptionAmount" :min="0" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="退回金额" name="refundAmount">
            <t-input-number v-model="form.refundAmount" :min="0" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="实际交易金额" name="actualAmount">
            <t-input-number v-model="form.actualAmount" :min="0" placeholder="请输入" />
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
          <!-- <t-form-item label="保留字端" name="ext">
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
          </t-form-item> -->
        </t-form>
      </t-loading>
    </t-dialog>

    <!-- 宠物健康档案记录详情 -->
    <t-dialog
      v-model:visible="openView"
      header="宠物健康档案记录详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="ID">{{ form.healthId }}</t-descriptions-item>
        <t-descriptions-item label="创建时间">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="更新时间">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态">
          <dict-tag :options="general_status" :value="form.status" />
        </t-descriptions-item>
        <t-descriptions-item label="主人id">{{ form.ownerId }}</t-descriptions-item>
        <t-descriptions-item label="用户id">{{ form.userId }}</t-descriptions-item>
        <t-descriptions-item label="场所id">{{ form.placeId }}</t-descriptions-item>
        <t-descriptions-item label="宠物id">{{ form.petId }}</t-descriptions-item>
        <t-descriptions-item label="服务商id">{{ form.providerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员id">{{ form.providerOwnerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员用户id">{{ form.providerUserId }}</t-descriptions-item>
        <t-descriptions-item label="档案类型">
          <dict-tag :options="pet_helath_record_type" :value="form.type" />
        </t-descriptions-item>
        <t-descriptions-item label="档案简介">{{ form.comments }}</t-descriptions-item>
        <t-descriptions-item label="档案证明" :span="2">{{ form.certificate }}</t-descriptions-item>
        <t-descriptions-item label="档案信息" :span="2">{{ form.information }}</t-descriptions-item>
        <t-descriptions-item label="完成时间">{{ parseTime(form.downTime) }}</t-descriptions-item>
        <t-descriptions-item label="消费金额">{{ form.consumptionAmount }}</t-descriptions-item>
        <t-descriptions-item label="退回金额">{{ form.refundAmount }}</t-descriptions-item>
        <t-descriptions-item label="实际交易金额">{{ form.actualAmount }}</t-descriptions-item>
        <t-descriptions-item label="记录IP">{{ form.ip }}</t-descriptions-item>
        <t-descriptions-item label="手机信息">{{ form.phoneInformation }}</t-descriptions-item>
        <t-descriptions-item label="备注">{{ form.remark }}</t-descriptions-item>
        <!-- <t-descriptions-item label="保留字端" :span="2">{{ form.ext }}</t-descriptions-item>
        <t-descriptions-item label="保留字端1" :span="2">{{ form.ext1 }}</t-descriptions-item>
        <t-descriptions-item label="保留字端2" :span="2">{{ form.ext2 }}</t-descriptions-item>
        <t-descriptions-item label="保留字端3" :span="2">{{ form.ext3 }}</t-descriptions-item> -->
      </my-descriptions>
    </t-dialog>
  </t-card>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'HelathRecord',
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
import { computed, getCurrentInstance, ref, nextTick } from 'vue';
import { ArrayOps } from '@/utils/array';

import type { PetHelathRecordForm, PetHelathRecordQuery, PetHelathRecordVo } from '@/api/petFriendly/model/helathRecordModel';
import { listHelathRecord, getHelathRecord, delHelathRecord, addHelathRecord, updateHelathRecord } from '@/api/petFriendly/helathRecord';

const { proxy } = getCurrentInstance();
const { general_status, pet_helath_record_type } = proxy.useDict('general_status', 'pet_helath_record_type');

const openView = ref(false);
const openViewLoading = ref(false);
const helathRecordRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const helathRecordList = ref<PetHelathRecordVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  comments: [{ required: true, message: '档案简介不能为空' }, { max: 200, message: '档案简介不能超过200个字符' }],
  ip: [{ max: 20, message: '记录IP不能超过20个字符' }],
  phoneInformation: [{ max: 100, message: '手机信息不能超过100个字符' }],
  remark: [{ max: 200, message: '备注不能超过200个字符' }],
});

// 列显隐信息
const columns = ref<Array<PrimaryTableCol>>([
  { title: `选择列`, colKey: 'row-select', type: 'multiple', width: 50, align: 'center' },
  { title: `创建时间`, colKey: 'createTime', align: 'center', minWidth: 112, width: 180 },
  { title: `更新时间`, colKey: 'updateTime', align: 'center', minWidth: 112, width: 180 },
  { title: `状态`, colKey: 'status', align: 'center' },
  { title: `主人id`, colKey: 'ownerId', align: 'center' },
  { title: `用户id`, colKey: 'userId', align: 'center' },
  { title: `场所id`, colKey: 'placeId', align: 'center' },
  { title: `宠物id`, colKey: 'petId', align: 'center' },
  { title: `服务商id`, colKey: 'providerId', align: 'center' },
  { title: `服务商人员id`, colKey: 'providerOwnerId', align: 'center' },
  { title: `服务商人员用户id`, colKey: 'providerUserId', align: 'center' },
  { title: `档案类型`, colKey: 'type', align: 'center' },
  { title: `档案简介`, colKey: 'comments', align: 'center' },
  { title: `档案证明`, colKey: 'certificate', align: 'center', ellipsis: true },
  { title: `档案信息`, colKey: 'information', align: 'center', ellipsis: true },
  { title: `完成时间`, colKey: 'downTime', align: 'center', minWidth: 112, width: 180 },
  { title: `消费金额`, colKey: 'consumptionAmount', align: 'center' },
  { title: `退回金额`, colKey: 'refundAmount', align: 'center' },
  { title: `实际交易金额`, colKey: 'actualAmount', align: 'center' },
  { title: `记录IP`, colKey: 'ip', align: 'center' },
  { title: `手机信息`, colKey: 'phoneInformation', align: 'center' },
  { title: `备注`, colKey: 'remark', align: 'center' },
  // { title: `保留字端`, colKey: 'ext', align: 'center', ellipsis: true },
  // { title: `保留字端1`, colKey: 'ext1', align: 'center', ellipsis: true },
  // { title: `保留字端2`, colKey: 'ext2', align: 'center', ellipsis: true },
  // { title: `保留字端3`, colKey: 'ext3', align: 'center', ellipsis: true },
  { title: `操作`, colKey: 'operation', align: 'center', width: 180 },
]);
// 提交表单对象
const form = ref<PetHelathRecordVo & PetHelathRecordForm>({});
// 查询对象
const queryParams = ref<PetHelathRecordQuery>({
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
  type: undefined,
  comments: undefined,
  certificate: undefined,
  information: undefined,
  downTime: undefined,
  consumptionAmount: undefined,
  refundAmount: undefined,
  actualAmount: undefined,
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

/** 查询宠物健康档案记录列表 */
function getList() {
  loading.value = true;
  listHelathRecord(queryParams.value)
    .then((response) => {
      helathRecordList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('helathRecordRef');
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
  title.value = '添加宠物健康档案记录';
}

/** 详情按钮操作 */
function handleDetail(row: PetHelathRecordVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const healthId = row.healthId;
  getHelathRecord(healthId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetHelathRecordVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改宠物健康档案记录';
  const healthId = row?.healthId || ids.value.at(0);
  getHelathRecord(healthId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.healthId) {
      updateHelathRecord(form.value)
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
      addHelathRecord(form.value)
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
function handleDelete(row?: PetHelathRecordVo) {
  const healthIds = row?.healthId || ids.value;
  proxy.$modal.confirm(`是否确认删除宠物健康档案记录编号为${healthIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delHelathRecord(healthIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, healthIds);
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
    'petFriendly/helathRecord/export',
    {
      ...queryParams.value,
    },
    `helathRecord_${new Date().getTime()}.xlsx`,
  );
}

let searchTimer: any = null;          // 简单防抖

/* ---------  查询主人翁 ------- */
import type { PetOwnerQuery, PetOwnerVo } from '@/api/petFriendly/model/ownerModel';
import { listOwner } from '@/api/petFriendly/owner';

/** 定义 */
const ownerQueryParams = ref<PetOwnerQuery>({
  pageNum: 1,
  pageSize: 20,
  name: undefined
})
const ownerLoading = ref(false)
const ownerList = ref<PetOwnerVo[]>([]);
const ownerFinished = ref(false);   // 是否已加载完

/* 远程搜索（防抖 300 ms） */
function handleOwnerSearch(keyword: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    ownerQueryParams.value.name = keyword.trim();
    ownerQueryParams.value.pageNum   = 1;
    ownerFinished.value = false;
    loadOwnerList(true);   // true 表示重置列表
  }, 300);
}
/** 加载主人翁 */
async function loadOwnerList(reset = false): Promise<void> {
  if (ownerFinished.value) return;
  ownerLoading.value = true;
  try {
    if (reset) {
      ownerQueryParams.value.pageNum = 1;
      ownerFinished.value = false;
      ownerList.value = [];
    }
    const { rows = [], total = 0 } = await listOwner(ownerQueryParams.value);
    ownerList.value.push(...rows);
    ownerFinished.value = ownerList.value.length >= total;
  } finally {
    ownerLoading.value = false;
  }
}

/* ---------  查询用户 ------- */
import type { SysUserQuery, SysUserVo } from '@/api/system/model/userModel';
import { listUser } from '@/api/system/user';

/** 定义 */
const userQueryParams = ref<SysUserQuery>({
  pageNum: 1,
  pageSize: 20,
  nickName: undefined
})
const userLoading = ref(false)
const userList = ref<SysUserVo[]>([]);
const userFinished = ref(false);   // 是否已加载完

/* 远程搜索（防抖 300 ms） */
function handleUserSearch(keyword: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    userQueryParams.value.nickName = keyword.trim();
    userQueryParams.value.pageNum   = 1;
    userFinished.value = false;
    loadUserList(true);   // true 表示重置列表
  }, 300);
}
/** 加载用户 */
async function loadUserList(reset = false): Promise<void> {
  if (userFinished.value) return;
  userLoading.value = true;
  try {
    if (reset) {
      userQueryParams.value.pageNum = 1;
      userFinished.value = false;
      userList.value = [];
    }
    const { rows = [], total = 0 } = await listUser(userQueryParams.value);
    userList.value.push(...rows);
    userFinished.value = userList.value.length >= total;
  } finally {
    userLoading.value = false;
  }
}


/* ---------  查询友好场所 ------- */
import type { PetFriendlyPlaceQuery, PetFriendlyPlaceVo } from '@/api/petFriendly/model/friendlyPlaceModel';
import { listFriendlyPlace } from '@/api/petFriendly/friendlyPlace';

/** 定义 */
const placeQueryParams = ref<PetFriendlyPlaceQuery>({
  pageNum: 1,
  pageSize: 20,
  name: undefined
})
const placeLoading = ref(false)
const placeList = ref<PetFriendlyPlaceVo[]>([]);
const placeFinished = ref(false);   // 是否已加载完

/* 远程搜索（防抖 300 ms） */
function handlePlaceSearch(keyword: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    placeQueryParams.value.name = keyword.trim();
    placeQueryParams.value.pageNum   = 1;
    placeFinished.value = false;
    loadPlaceList(true);   // true 表示重置列表
  }, 300);
}
/** 加载友好场所 */
function loadPlaceList(isSearch = false) {
  if (placeFinished.value) return;
  placeLoading.value = true;
  listFriendlyPlace(placeQueryParams.value).then((res) => {
    placeLoading.value = false;
    if (isSearch) placeList.value = [];    
    placeList.value.push(...res.rows);
  });
}


/* ---------  查询宠物档案 ------- */
import type { PetInformationQuery, PetInformationVo } from '@/api/petFriendly/model/informationModel';
import { listInformation } from '@/api/petFriendly/information';

/** 定义 */
const petQueryParams = ref<PetInformationQuery>({
  pageNum: 1,
  pageSize: 20,
  name: undefined
})
const petLoading = ref(false)
const petList = ref<PetInformationVo[]>([]);
const petFinished = ref(false);   // 是否已加载完

/* 远程搜索（防抖 300 ms） */
function handlePetSearch(keyword: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    petQueryParams.value.name = keyword.trim();
    petQueryParams.value.pageNum   = 1;
    petFinished.value = false;
    loadPetList(true);   // true 表示重置列表
  }, 300);
}
/** 加载宠物 */
function loadPetList(isSearch = false) {
  if (petFinished.value) return;
  petLoading.value = true;
  listInformation(petQueryParams.value).then((res) => {
    petLoading.value = false;
    if (isSearch) petList.value = [];    
    petList.value.push(...res.rows);
  });
}

/* ---------  查询服务商 ------- */
import type { PetServiceProviderQuery, PetServiceProviderVo } from '@/api/petFriendly/model/serviceProviderModel';
import { listServiceProvider } from '@/api/petFriendly/serviceProvider';

/** 定义 */
const providerQueryParams = ref<PetServiceProviderQuery>({
  pageNum: 1,
  pageSize: 20,
  unitNick: undefined
})
const providerLoading = ref(false)
const providerList = ref<PetServiceProviderVo[]>([]);
const providerFinished = ref(false);   // 是否已加载完

/* 远程搜索（防抖 300 ms） */
function handleProviderSearch(keyword: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    providerQueryParams.value.unitNick = keyword.trim();
    providerQueryParams.value.pageNum   = 1;
    providerFinished.value = false;
    loadProviderList(true);   // true 表示重置列表
  }, 300);
}
/** 加载服务商 */
function loadProviderList(isSearch = false) {
  if (providerFinished.value) return;
  providerLoading.value = true;
  listServiceProvider(providerQueryParams.value).then((res) => {
    providerLoading.value = false;
    if (isSearch) providerList.value = [];    
    providerList.value.push(...res.rows);
  });
}

/** 查询服务商主人翁 */
/** 定义 */
const providerOwnerQueryParams = ref<PetOwnerQuery>({
  pageNum: 1,
  pageSize: 20,
  name: undefined
})
const providerOwnerLoading = ref(false)
const providerOwnerList = ref<PetOwnerVo[]>([]);
const providerOwnerFinished = ref(false);   // 是否已加载完

/* 远程搜索（防抖 300 ms） */
function handleProviderOwnerSearch(keyword: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    providerOwnerQueryParams.value.name = keyword.trim();
    providerOwnerQueryParams.value.pageNum   = 1;
    providerOwnerFinished.value = false;
    loadProviderOwnerList(true);   // true 表示重置列表
  }, 300);
}
/** 加载主人翁 */
function loadProviderOwnerList(isSearch = false) {
  if (providerOwnerFinished.value) return;
  providerOwnerLoading.value = true;
  listOwner(providerOwnerQueryParams.value).then((res) => {
    providerOwnerLoading.value = false;
    if (isSearch) providerOwnerList.value = [];    
    providerOwnerList.value.push(...res.rows);
  });
}


/** 查询服务商用户 */
/** 定义 */
const providerUserQueryParams = ref<SysUserQuery>({
  pageNum: 1,
  pageSize: 20,
  nickName: undefined
})
const providerUserLoading = ref(false)
const providerUserList = ref<SysUserVo[]>([]);
const providerUserFinished = ref(false);   // 是否已加载完

/* 远程搜索（防抖 300 ms） */
function handleProviderUserSearch(keyword: string) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    providerUserQueryParams.value.nickName = keyword.trim();
    providerUserQueryParams.value.pageNum   = 1;
    providerUserFinished.value = false;
    loadProviderUserList(true);   // true 表示重置列表
  }, 300);
}
/** 加载主人翁 */
function loadProviderUserList(isSearch = false) {
  if (providerUserFinished.value) return;
  providerUserLoading.value = true;
  listUser(providerUserQueryParams.value).then((res) => {
    providerUserLoading.value = false;
    if (isSearch) providerUserList.value = [];    
    providerUserList.value.push(...res.rows);
  });
}

/* -------------------- 初始化 -------------------- */
onMounted(async () => {
  // 加载用户
  loadUserList()
  // 加载主人翁
  loadOwnerList()
  // 加载场所
  loadPlaceList()
  // 加载宠物
  loadPetList()
  // 加载服务商
  loadProviderList()
  // 加载服务商主人翁
  loadProviderOwnerList()
  // 加载服务商用户
  loadProviderUserList()
})

getList();
</script>
