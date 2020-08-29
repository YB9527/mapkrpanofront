<template>
  <div>
    <h1>上传全景图dialog</h1>
    <el-button type="primary"  @click="showUploadDialog">上传</el-button>
    <el-dialog title="制作全景图" :visible.sync="dialogTableVisible">

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UploadPano",
    data() {
      return {
        dialogTableVisible:false,
      }
    },
    created(){

    },
    methods:{
      showUploadDialog(){
        dialogTableVisible =true;
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
