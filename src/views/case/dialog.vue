<template>
  <!-- <Dialog v-model="isShow"> -->

  <div class="table">

    <Table
      :columns="tableOptions.columns"
      :data="tableOptions.data"
      :loading="tableOptions.loading"
      :width="autoWidth"
    >
    </Table>
  </div>

  <!-- </Dialog> -->
</template>

<script lang="ts" setup>
// import Dialog from "@/components/Dialog/index.vue"
import Table from "@/components/Table/index.vue";
import useAutoWidth from "@/hooks/useAutoWidth";

import { reactive } from "vue";

// 控制Dialog
// const isShow = ref(true)

const smsTypeEnum = [
  { value: "1", label: "登录", elTagType: "success" },
  { value: "2", label: "注册", elTagType: "warning" },
  { value: "3", label: "邀约", elTagType: "primary" },
];

const list = [
  {
    id: "4643856106174459905",
    type: "2",
    sendMobile: "15914133523",
    code: "583871",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"2640:362509189317098791743433352","PhoneNumber":"+8615914133523","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"f4bd9564-876b-478f-bae8-e0a3d07b9148"}',
    createId: "",
    createTime: "2024-03-08 14:26:14",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4643566881906536449",
    type: "4",
    sendMobile: "13689575503",
    code: "723673",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:414414413517098102179047550","PhoneNumber":"+8613689575503","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"d5c9bb6e-94bb-4583-971d-aefedb44fbf9"}',
    createId: "",
    createTime: "2024-03-07 19:16:57",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4643563737667514368",
    type: "5",
    sendMobile: "18908429316",
    code: "082110",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:146881548717098094682612931","PhoneNumber":"+8618908429316","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"abde7cbb-c0eb-4ebb-bb30-1fb74074d656"}',
    createId: "",
    createTime: "2024-03-07 19:04:28",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4643090917250478080",
    type: "5",
    sendMobile: "13689575503",
    code: "726968",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:340974482017096967390867550","PhoneNumber":"+8613689575503","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"2017f1e1-443e-42f7-b766-3ba1277fd5a6"}',
    createId: "",
    createTime: "2024-03-06 11:45:39",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4643081134933979136",
    type: "5",
    sendMobile: "13689575503",
    code: "736890",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:293381834017096944068027550","PhoneNumber":"+8613689575503","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"7969861c-9f26-43e9-8991-0b07b7bd07f6"}',
    createId: "",
    createTime: "2024-03-06 11:06:46",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4643080082096566273",
    type: "5",
    sendMobile: "15914133522",
    code: "026141",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:417953513417096941557883352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"bad15239-fbd4-4578-8aa8-7fff54e09a54"}',
    createId: "",
    createTime: "2024-03-06 11:02:35",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642795054062022657",
    type: "2",
    sendMobile: "13689575503",
    code: "038217",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:387102961217096261998087550","PhoneNumber":"+8613689575503","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"a3ab9683-8051-423d-92d0-e7d5dd8560bd"}',
    createId: "",
    createTime: "2024-03-05 16:09:59",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642794990715449344",
    type: "5",
    sendMobile: "13689575503",
    code: "847367",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:397602585017096261847057550","PhoneNumber":"+8613689575503","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"2d46403a-dddd-41b3-bb4a-08cb16da2d1a"}',
    createId: "",
    createTime: "2024-03-05 16:09:44",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642718594420879361",
    type: "2",
    sendMobile: "13342928734",
    code: "090668",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:67083746617096079704112873","PhoneNumber":"+8613342928734","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"2b411e23-8061-4691-8183-f50be7cedff2"}',
    createId: "",
    createTime: "2024-03-05 11:06:10",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642717509673201665",
    type: "4",
    sendMobile: "15914133522",
    code: "020044",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:181200873117096077117843352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"5e2e9d95-4e2c-4fad-8f9c-0fbfe05ce74e"}',
    createId: "",
    createTime: "2024-03-05 11:01:51",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642717274355970048",
    type: "5",
    sendMobile: "13342928734",
    code: "488107",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:3503409017096076556742873","PhoneNumber":"+8613342928734","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"6bb78ba4-5e7b-4e9b-a161-fa88b36dde94"}',
    createId: "",
    createTime: "2024-03-05 11:00:55",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642438666125844481",
    type: "4",
    sendMobile: "15914133522",
    code: "784252",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:327071688417095412302983352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"d3ecbb67-9313-4306-b953-f920145842a5"}',
    createId: "",
    createTime: "2024-03-04 16:33:50",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642437351551279104",
    type: "4",
    sendMobile: "15914133522",
    code: "440764",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:30068400917095409168823352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"9390ea8f-fae3-4fc4-9bcf-c977a9827066"}',
    createId: "",
    createTime: "2024-03-04 16:28:36",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642436492150972417",
    type: "4",
    sendMobile: "15914133522",
    code: "201352",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:115341145417095407119883352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"f1658b65-473c-491d-800a-7988b877deb5"}',
    createId: "",
    createTime: "2024-03-04 16:25:12",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642436451558498305",
    type: "4",
    sendMobile: "15914133522",
    code: "020548",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:321412010317095407023063352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"4097948e-f0d5-4590-ab13-6aef865e3b24"}',
    createId: "",
    createTime: "2024-03-04 16:25:02",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642436438715539457",
    type: "4",
    sendMobile: "15914133522",
    code: "655215",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:40040850417095406992453352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"f1b5c4d9-ffcd-406b-9f45-1bbef81e4cd0"}',
    createId: "",
    createTime: "2024-03-04 16:24:59",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642436397158375425",
    type: "4",
    sendMobile: "15914133522",
    code: "870910",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:183979950617095406893393352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"c9daf758-3228-4ab4-b41a-d7a0ca0f6516"}',
    createId: "",
    createTime: "2024-03-04 16:24:49",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4642436384718069760",
    type: "4",
    sendMobile: "15914133522",
    code: "411230",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:332165639017095406863643352","PhoneNumber":"+8615914133522","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"d6780394-6652-41d4-9ee9-233fa074a8b0"}',
    createId: "",
    createTime: "2024-03-04 16:24:46",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4641710800128040960",
    type: "5",
    sendMobile: "13689575503",
    code: "947758",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:348775594117093676935177550","PhoneNumber":"+8613689575503","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"5ddd82a0-b255-4063-90c2-d75d3bee6965"}',
    createId: "",
    createTime: "2024-03-02 16:21:33",
    updateId: "",
    updateTime: "",
  },
  {
    id: "4641609548551282689",
    type: "2",
    sendMobile: "13689575518",
    code: "314376",
    sendContent:
      '{"SendStatusSet":[{"SerialNo":"3369:134996755317093435532677551","PhoneNumber":"+8613689575518","Fee":1,"SessionContext":"","Code":"Ok","Message":"send success","IsoCode":"CN"}],"RequestId":"3ac8caea-13da-47ad-8853-824512884091"}',
    createId: "",
    createTime: "2024-03-02 09:39:13",
    updateId: "",
    updateTime: "",
  },
];

const tableOptions = reactive({
  loading: false,
  columns: [
    {
      prop: "id",
      label: "ID",
      align: "center",
      minWidth: 120,
      overflowTooltip: true,
    },
    { prop: "sendMobile", label: "手机号码", align: "center", minWidth: 120 },
    {
      prop: "sendContent",
      label: "短信内容",
      align: "center",
      minWidth: 160,
      //   overflowTooltip: true,
    },
    {
      prop: "type",
      label: "短信类型",
      align: "center",
      type: "tag",
      tags: smsTypeEnum,
    },
  ],
  data: list || [],
});

// 
const { autoWidth } = useAutoWidth({ width: 900, fullWidth: 900 })
console.log(autoWidth);


</script>

<style lang="scss" scoped>
.table{
    height: 100%;
    overflow: hidden;
    background-color: aqua;
    overflow: auto;
}
</style>
