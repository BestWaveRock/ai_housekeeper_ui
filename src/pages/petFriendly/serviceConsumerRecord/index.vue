<template>
  <t-card>
    <t-space direction="vertical" style="width: 100%">
      <t-form v-show="showSearch" ref="queryRef" :data="queryParams" layout="inline" reset-type="initial" label-width="calc(4em + 12px)">
        <t-form-item label="状态" name="status">
          <t-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <t-option
              v-for="dict in pet_service_consumer_record_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
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
        <t-form-item label="是否预约单" name="reserve">
          <t-select v-model="queryParams.reserve">
            <t-option v-for="dict in pet_friendly_service_info_reserve"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="预约开始时间" name="reserveStartTime">
          <t-date-picker
            v-model="queryParams.reserveStartTime"
            allow-input
            clearable
            placeholder="请选择预约开始时间"
          />
        </t-form-item>
        <t-form-item label="预约结束时间" name="reserveEndTime">
          <t-date-picker
            v-model="queryParams.reserveEndTime"
            allow-input
            clearable
            placeholder="请选择预约结束时间"
          />
        </t-form-item>
        <t-form-item label="预约要求" name="reserveInformation">
          <t-input v-model="queryParams.reserveInformation" placeholder="请输入预约要求" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="服务id" name="serviceId">
          <t-input v-model="queryParams.serviceId" placeholder="请输入服务id" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="服务类型" name="serviceType">
          <t-select v-model="queryParams.serviceType" placeholder="请选择服务类型" clearable>
            <t-option
              v-for="dict in pet_friendly_service_info_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="服务内容" name="serviceName">
          <t-input v-model="queryParams.serviceName" placeholder="请输入服务内容" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="服务证明" name="serviceCertificate">
          <t-input v-model="queryParams.serviceCertificate" placeholder="请输入服务证明" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="服务信息" name="serviceInformation">
          <t-input v-model="queryParams.serviceInformation" placeholder="请输入服务信息" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="预约时间" name="appointmentTime">
          <t-date-picker
            v-model="queryParams.appointmentTime"
            allow-input
            clearable
            placeholder="请选择预约时间"
          />
        </t-form-item>
        <t-form-item label="服务时间" name="serviceTime">
          <t-date-picker
            v-model="queryParams.serviceTime"
            allow-input
            clearable
            placeholder="请选择服务时间"
          />
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
          <t-input v-model="queryParams.consumptionAmount" placeholder="请输入消费金额" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="退回金额" name="refundAmount">
          <t-input v-model="queryParams.refundAmount" placeholder="请输入退回金额" clearable @enter="handleQuery" />
        </t-form-item>
        <t-form-item label="实际交易金额" name="actualAmount">
          <t-input v-model="queryParams.actualAmount" placeholder="请输入实际交易金额" clearable @enter="handleQuery" />
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
        row-key="consumerId"
        :data="serviceConsumerRecordList"
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
              <t-button v-hasPermi="['petFriendly:serviceConsumerRecord:add']" theme="primary" @click="handleAdd">
                <template #icon> <add-icon /></template>
                新增
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:serviceConsumerRecord:edit']"
                theme="default"
                variant="outline"
                :disabled="single"
                @click="handleUpdate()"
              >
                <template #icon> <edit-icon /> </template>
                修改
              </t-button>
              <t-button
                v-hasPermi="['petFriendly:serviceConsumerRecord:remove']"
                theme="danger"
                variant="outline"
                :disabled="multiple"
                @click="handleDelete()"
              >
                <template #icon> <delete-icon /> </template>
                删除
              </t-button>
              <t-button v-hasPermi="['petFriendly:serviceConsumerRecord:export']" theme="default" variant="outline" @click="handleExport">
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
          <dict-tag :options="pet_service_consumer_record_status" :value="row.status" />
        </template>
        <template #reserve="{ row }">
          <dict-tag :options="pet_friendly_service_info_reserve" :value="row.reserve" />
        </template>
        <template #serviceType="{ row }">
          <dict-tag :options="pet_friendly_service_info_type" :value="row.serviceType" />
        </template>
        <template #operation="{ row }">
          <t-space :size="8" break-line>
            <my-link v-hasPermi="['petFriendly:serviceConsumerRecord:query']" @click.stop="handleDetail(row)">
              <template #prefix-icon><browse-icon /></template>详情
            </my-link>
            <my-link v-hasPermi="['petFriendly:serviceConsumerRecord:edit']" @click.stop="handleUpdate(row)">
              <template #prefix-icon><edit-icon /></template>修改
            </my-link>
            <my-link v-hasPermi="['petFriendly:serviceConsumerRecord:remove']" size="small" @click.stop="handleDelete(row)">
              <template #prefix-icon><delete-icon /></template>删除
            </my-link>
          </t-space>
        </template>
      </t-table>
    </t-space>

    <!-- 添加或修改宠物服务消费记录对话框 -->
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
      @confirm="serviceConsumerRecordRef.submit()"
    >
      <t-loading :loading="buttonLoading" size="small">
        <t-form
          ref="serviceConsumerRecordRef"
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
                v-for="dict in pet_service_consumer_record_status"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-radio>
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
          <t-form-item label="是否预约单" name="reserve">
            <t-select v-model="form.reserve">
              <t-option v-for="dict in pet_friendly_service_info_reserve"
                :key="dict.value"
                :label="dict.label"
                :value="Number(dict.value)"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="预约开始时间" name="reserveStartTime">
            <t-date-picker
              v-model="form.reserveStartTime"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择预约开始时间"
            />
          </t-form-item>
          <t-form-item label="预约结束时间" name="reserveEndTime">
            <t-date-picker
              v-model="form.reserveEndTime"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择预约结束时间"
            />
          </t-form-item>
          <t-form-item label="预约要求" name="reserveInformation">
            <t-input v-model="form.reserveInformation" placeholder="请输入预约要求" clearable />
          </t-form-item>
          <t-form-item label="服务id" name="serviceId">
            <t-input-number v-model="form.serviceId" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="服务类型" name="serviceType">
            <t-select v-model="form.serviceType" placeholder="请选择服务类型" clearable>
              <t-option
              v-for="dict in pet_friendly_service_info_type"
              :key="dict.value"
              :label="dict.label"
                :value="Number(dict.value)"
            ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="服务内容" name="serviceName">
            <t-input v-model="form.serviceName" placeholder="请输入服务内容" clearable />
          </t-form-item>
          <t-form-item label="服务证明" name="serviceCertificate">
            <t-textarea v-model="form.serviceCertificate" placeholder="请输入服务证明" />
          </t-form-item>
          <t-form-item label="服务信息" name="serviceInformation">
            <t-textarea v-model="form.serviceInformation" placeholder="请输入服务信息" />
          </t-form-item>
          <t-form-item label="预约时间" name="appointmentTime">
            <t-date-picker
              v-model="form.appointmentTime"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择预约时间"
            />
          </t-form-item>
          <t-form-item label="服务时间" name="serviceTime">
            <t-date-picker
              v-model="form.serviceTime"
              enable-time-picker
              allow-input
              clearable
              placeholder="请选择服务时间"
            />
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
            <t-input-number v-model="form.consumptionAmount" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="退回金额" name="refundAmount">
            <t-input-number v-model="form.refundAmount" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="实际交易金额" name="actualAmount">
            <t-input-number v-model="form.actualAmount" placeholder="请输入" />
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

    <!-- 宠物服务消费记录详情 -->
    <t-dialog
      v-model:visible="openView"
      header="宠物服务消费记录详情"
      placement="center"
      width="min(700px, 100%)"
      attach="body"
      :footer="false"
    >
      <my-descriptions :loading="openViewLoading">
        <t-descriptions-item label="ID">{{ form.consumerId }}</t-descriptions-item>
        <t-descriptions-item label="创建时间">{{ parseTime(form.createTime) }}</t-descriptions-item>
        <t-descriptions-item label="更新时间">{{ parseTime(form.updateTime) }}</t-descriptions-item>
        <t-descriptions-item label="状态">
          <dict-tag :options="pet_service_consumer_record_status" :value="form.status" />
        </t-descriptions-item>
        <t-descriptions-item label="主人id">{{ form.ownerId }}</t-descriptions-item>
        <t-descriptions-item label="用户id">{{ form.userId }}</t-descriptions-item>
        <t-descriptions-item label="场所id">{{ form.placeId }}</t-descriptions-item>
        <t-descriptions-item label="宠物id">{{ form.petId }}</t-descriptions-item>
        <t-descriptions-item label="服务商id">{{ form.providerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员id">{{ form.providerOwnerId }}</t-descriptions-item>
        <t-descriptions-item label="服务商人员用户id">{{ form.providerUserId }}</t-descriptions-item>
        <t-descriptions-item label="是否预约单">
          <dict-tag :options="pet_friendly_service_info_reserve" :value="form.reserve" />
        </t-descriptions-item>
        <t-descriptions-item label="预约开始时间">{{ parseTime(form.reserveStartTime) }}</t-descriptions-item>
        <t-descriptions-item label="预约结束时间">{{ parseTime(form.reserveEndTime) }}</t-descriptions-item>
        <t-descriptions-item label="预约要求">{{ form.reserveInformation }}</t-descriptions-item>
        <t-descriptions-item label="服务id">{{ form.serviceId }}</t-descriptions-item>
        <t-descriptions-item label="服务类型">
          <dict-tag :options="pet_friendly_service_info_type" :value="form.serviceType" />
        </t-descriptions-item>
        <t-descriptions-item label="服务内容">{{ form.serviceName }}</t-descriptions-item>
        <t-descriptions-item label="服务证明" :span="2">{{ form.serviceCertificate }}</t-descriptions-item>
        <t-descriptions-item label="服务信息" :span="2">{{ form.serviceInformation }}</t-descriptions-item>
        <t-descriptions-item label="预约时间">{{ parseTime(form.appointmentTime) }}</t-descriptions-item>
        <t-descriptions-item label="服务时间">{{ parseTime(form.serviceTime) }}</t-descriptions-item>
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
  name: 'ServiceConsumerRecord',
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

import type { PetServiceConsumerRecordForm, PetServiceConsumerRecordQuery, PetServiceConsumerRecordVo } from '@/api/petFriendly/model/serviceConsumerRecordModel';
import { listServiceConsumerRecord, getServiceConsumerRecord, delServiceConsumerRecord, addServiceConsumerRecord, updateServiceConsumerRecord } from '@/api/petFriendly/serviceConsumerRecord';

const { proxy } = getCurrentInstance();
const { pet_friendly_service_info_reserve, pet_friendly_service_info_type, pet_service_consumer_record_status } = proxy.useDict('pet_friendly_service_info_reserve', 'pet_friendly_service_info_type', 'pet_service_consumer_record_status');

const openView = ref(false);
const openViewLoading = ref(false);
const serviceConsumerRecordRef = ref<FormInstanceFunctions>();
const open = ref(false);
const buttonLoading = ref(false);
const title = ref('');
const serviceConsumerRecordList = ref<PetServiceConsumerRecordVo[]>([]);
const loading = ref(false);
const columnControllerVisible = ref(false);
const showSearch = ref(true);
const total = ref(0);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);

// 校验规则
const rules = ref<Record<string, Array<FormRule>>>({
  reserveInformation: [{ max: 200, message: '预约要求不能超过200个字符' }],
  serviceType: [{ required: true, message: '服务类型不能为空' }],
  serviceName: [{ required: true, message: '服务内容不能为空' }, { max: 100, message: '服务内容不能超过100个字符' }],
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
  { title: `是否预约单`, colKey: 'reserve', align: 'center' },
  { title: `预约开始时间`, colKey: 'reserveStartTime', align: 'center', minWidth: 112, width: 180 },
  { title: `预约结束时间`, colKey: 'reserveEndTime', align: 'center', minWidth: 112, width: 180 },
  { title: `预约要求`, colKey: 'reserveInformation', align: 'center' },
  { title: `服务id`, colKey: 'serviceId', align: 'center' },
  { title: `服务类型`, colKey: 'serviceType', align: 'center' },
  { title: `服务内容`, colKey: 'serviceName', align: 'center' },
  { title: `服务证明`, colKey: 'serviceCertificate', align: 'center', ellipsis: true },
  { title: `服务信息`, colKey: 'serviceInformation', align: 'center', ellipsis: true },
  { title: `预约时间`, colKey: 'appointmentTime', align: 'center', minWidth: 112, width: 180 },
  { title: `服务时间`, colKey: 'serviceTime', align: 'center', minWidth: 112, width: 180 },
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
const form = ref<PetServiceConsumerRecordVo & PetServiceConsumerRecordForm>({});
// 查询对象
const queryParams = ref<PetServiceConsumerRecordQuery>({
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
  reserve: undefined,
  reserveStartTime: undefined,
  reserveEndTime: undefined,
  reserveInformation: undefined,
  serviceId: undefined,
  serviceType: undefined,
  serviceName: undefined,
  serviceCertificate: undefined,
  serviceInformation: undefined,
  appointmentTime: undefined,
  serviceTime: undefined,
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

/** 查询宠物服务消费记录列表 */
function getList() {
  loading.value = true;
  listServiceConsumerRecord(queryParams.value)
    .then((response) => {
      serviceConsumerRecordList.value = response.rows;
      total.value = response.total;
    })
    .finally(() => (loading.value = false));
}

// 表单重置
function reset() {
  form.value = {};
  proxy.resetForm('serviceConsumerRecordRef');
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
  title.value = '添加宠物服务消费记录';
}

/** 详情按钮操作 */
function handleDetail(row: PetServiceConsumerRecordVo) {
  reset();
  openView.value = true;
  openViewLoading.value = true;
  const consumerId = row.consumerId;
  getServiceConsumerRecord(consumerId).then((response) => {
    form.value = response.data;
    openViewLoading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row?: PetServiceConsumerRecordVo) {
  buttonLoading.value = true;
  reset();
  open.value = true;
  title.value = '修改宠物服务消费记录';
  const consumerId = row?.consumerId || ids.value.at(0);
  getServiceConsumerRecord(consumerId).then((response) => {
    buttonLoading.value = false;
    form.value = response.data;
  });
}

/** 提交表单 */
function submitForm({ validateResult, firstError }: SubmitContext) {
  if (validateResult === true) {
    buttonLoading.value = true;
    const msgLoading = proxy.$modal.msgLoading('提交中...');
    if (form.value.consumerId) {
      updateServiceConsumerRecord(form.value)
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
      addServiceConsumerRecord(form.value)
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
function handleDelete(row?: PetServiceConsumerRecordVo) {
  const consumerIds = row?.consumerId || ids.value;
  proxy.$modal.confirm(`是否确认删除宠物服务消费记录编号为${consumerIds}的数据项？`, () => {
    const msgLoading = proxy.$modal.msgLoading('正在删除中...');
    return delServiceConsumerRecord(consumerIds)
      .then(() => {
        ids.value = ArrayOps.fastDeleteElement(ids.value, consumerIds);
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
    'petFriendly/serviceConsumerRecord/export',
    {
      ...queryParams.value,
    },
    `serviceConsumerRecord_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
