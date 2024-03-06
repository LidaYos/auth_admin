<template>
    <div>
      <!-- 导入、导出按钮 -->
      <div style="display: flex; align-items: center;margin-bottom: 10px;">
        <el-upload action="#" :show-file-list="false" :before-upload="importBefore" accept=".xls,.xlsx"
          style="margin: 0 12px;display: flex;align-items: center;">
          <el-button type="success">表格导入</el-button>
        </el-upload>
        <el-button type="success" @click="userExport">导出表格</el-button>
      </div>
  
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" ref="tableRef">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="age" label="性别">
          <template slot-scope="scope" #default="scope">
            {{ fieldChange(scope.row['age']) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ElMessage, ElMessageBox, ElButton, ElLoading } from 'element-plus'
  import { reactive, toRefs, ref, h } from 'vue'
  import table2Excel from 'js-table2excel' // 引入  js-table2excel
  import * as XLSX from "xlsx" // 引入  xlsx
  
  const state = reactive({
    tableData: [ // 模拟请求数据
      {
        date: '2022/11/12 10:16:56',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        age: 1
      },
      {
        date: '2022/11/12 10:16:56',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        age: 1
      },
      {
        date: '2022/11/12 10:16:56',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        age: 2
      },
      {
        date: '2022/11/12 10:16:56',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        age: 2
      },
    ],
    exportConfig: [ // 导出Excel表格配置
      {
        title: '时间',
        key: 'date',
        type: 'text'
      },
      {
        title: '姓名',
        key: 'name',
        type: 'text'
      },
      {
        title: '地址',
        key: 'address',
        type: 'text'
      },
      {
        title: '性别',
        key: 'age',
        type: 'text'
      },
      /*
      { 导出图片这样配置，type为image
        title: '头像',
        key: 'avatar',
        type: 'image'
      },
      */
    ],
    formatColumns: [ // 导出特殊字段处理
      {
        prop: 'age',
        option: {
          '1': '男',
          '2': '女'
        },
      },
    ]
  })
  
  const { tableData } = toRefs(state)
  
  const tableRef = ref()
  
  // 表格导出
  // h函数官网使用 https://cn.vuejs.org/api/render-function.html#h
  const userExport = () => {
    ElMessageBox({
      title: '导出Excel表格',
      draggable: true,
      showCancelButton: true,
      showConfirmButton: false,
      message: h('div', null, [ // 这里用到了h函数
        h(ElButton, { text: true, type: 'primary', innerHTML: '导出选中数据', onClick: assignExport }),
        h(ElButton, { text: true, type: 'success', innerHTML: '导出所有数据', onClick: allExport })
      ])
    }).then((res) => { }).catch((res) => { })
  }
  // 选中数据导出
  function assignExport() {
    // getSelectionRows  Element Plus table表格组件方法，获取当前选中的数据
    let arr = tableRef.value.getSelectionRows()
    if (!arr.length) {
      return ElMessage({
        message: '请选择需要导出的数据',
        type: 'warning',
      })
    }
    ElMessageBox.close() // 关闭弹出框
    const loading = ElLoading.service({ // 打开遮罩层
      lock: true,
      text: '请稍等...',
      background: 'rgba(255, 255, 255, 0.5)',
    })
    let list = JSON.stringify(tableRef.value.getSelectionRows())
    list = formatExportData(JSON.parse(list))
    // table2Excel(state.exportConfig, list, '导出数据') state.exportConfig导出表格配置，list导出数据列表，“导出数据”：导出文件名称
    console.log(list)
    table2Excel(state.exportConfig, list, '导出数据')
    loading.close() // 关闭遮罩层
  }
  
  // 所有数据导出
  async function allExport() {
    ElMessageBox.close() // 关闭弹出框
    const loading = ElLoading.service({ // 打开遮罩层
      lock: true,
      text: '请稍等...',
      background: 'rgba(255, 255, 255, 0.5)',
    })
    /*
      const res = await userList()
      这里是去调后台接口，拿到需要导出的所有数据
  
      let list = formatExportData(res.data)
      res.data：就是接口返回的数据
    */
    let list = JSON.stringify(state.tableData)  // 这里直接用定义好的数据了
    list = formatExportData(JSON.parse(list))
    table2Excel(state.exportConfig, list, '导出数据')
    loading.close() // 关闭遮罩层
  }
  
  function formatExportData(list) {
    // 处理特殊字段
    /*
      比如：你请求的数据中的age返回的是1或者2，其1代表“男”2代表“女”
      导出表格时，总不能以1和2的方式展示，此方法用于处理特殊字段
    */
    list.forEach((item) => {
      state.formatColumns.forEach((i) => {
        item[i.prop] = i.option[item[i.prop]]
      })
      for (let key in item) {
        if (!item[key] && item[key] == null) {
          item[key] = ""
        }
      }
    });
    return list
  }
  
  // 表格导入
  function importBefore(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const results = XLSX.utils.sheet_to_json(worksheet);
      importAdd(results)
    };
    reader.readAsArrayBuffer(file);
  }
  
  function importAdd(list) {
    // 处理上传时excel中特殊字段
    // 如：性别：男/女 不能以文字形式上传，此方法时将数据转为对应的值
    list.forEach((item) => {
      state.exportConfig.forEach((i) => {
        item[i.key] = item[i.title]
        delete item[i.title]
      })
      // 处理时间，在使用FileReader解析后的时间可能是这样的 44877.4284259259 就需要专为时间戳或者时间格式
      for (let key in item) {
        if (key == "date") {
          // ExcelDateToJSDate(item[key]).getTime() // 返回时间戳 1668182400000 毫秒
          // ExcelDateToJSDate(item[key]) 返回时间格式 Sat Nov 12 2022 10:17:39 GMT+0800 (中国标准时间) {}
          // 注意：这个方法在转换的时间存在误差，误差在一分钟之内
          item[key] = ExcelDateToJSDate(item[key])
        }
      }
    })
    list = convertImportData(list)
    // list 返回上传的Excel文件，接下来掉后台接口批量添加就可以了。
    console.log(list)
  }
  
  function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }
  
  function convertImportData(list) {
    list.forEach((item) => {
      state.formatColumns.forEach((i) => {
        for (let key in i.option) {
          if (item[i.prop] == i.option[key]) {
            item[i.prop] = key
          }
        }
      })
      for (let key in item) {
        if (!item[key] && item[key] == undefined) {
          item[key] = ""
        }
      }
    });
    return list
  }
  
  // 处理特殊表格字段展示
  function fieldChange(row, option = { '1': '男', '2': '女' }) {
    if (option[row]) {
      return option[row]
    }
  }
  </script>
  
  <style scoped></style>