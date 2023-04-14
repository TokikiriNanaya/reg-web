<template>
  <div class="common-layout" style="
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;">
    <el-container style="height:100%">
      <!-- header -->
      <el-header style="padding: 0;">
        <reg_header></reg_header>
      </el-header>

      <!-- main -->
      <el-container>
        <el-main>
          <reg_main />
        </el-main>

      </el-container>

      <!-- footer -->
      <el-footer style="padding: 0;">
        <reg_footer></reg_footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import reg_header from '../components/reg_header.vue'
import reg_footer from '../components/reg_footer.vue'
import reg_main from '../components/main.vue'
</script>