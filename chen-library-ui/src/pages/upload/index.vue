<template>
   <div class="page page-upload">
      <el-row>
         <el-col :span="24">
            <el-card shadow="never">
               <template #header>
                  <div class="clearfix">
                     <strong>上传文档</strong>
                  </div>
               </template>
               <el-row :gutter="40">
                  <el-col :span="fileList.length == 0 ? 14 : 24" class="part-left">
                     <el-form ref="form" :model="document" label-position="top" label-width="80px">
                        <el-form-item label="文档分类" prop="category_id" :rules="[
                           {
                              required: true,
                              trigger: 'blur',
                              message: '请选择文档分类',
                           },
                        ]">
                           <el-cascader v-model="document.category_id"
                              :options="categoryStore.categoryTree.filter((x) => !x.type)" :filterable="true"
                              :disabled="loading" :props="{
                                 checkStrictly: true,
                                 expandTrigger: 'hover',
                                 label: 'title',
                                 value: 'id',
                              }" placeholder="请选择文档分类"></el-cascader>
                        </el-form-item>
                        <el-row :gutter="20">
                           <el-col :span="12">
                              <el-form-item :label="`默认售价（${settingStore.system.credit_name || '魔豆'
                                 }）`" prop="price">
                                 <el-input-number v-model="document.price" :min="0" :step="1"
                                    :disabled="loading"></el-input-number>
                              </el-form-item>
                           </el-col>
                           <el-col v-if="(settingStore.language || []).length > 0" :span="12">
                              <el-form-item label="默认语言" prop="language">
                                 <el-select v-model="document.language" filterable clearable>
                                    <el-option v-for="item in settingStore.language" :key="item.code"
                                       :label="item.language" :value="item.code"></el-option>
                                 </el-select>
                              </el-form-item>
                           </el-col>
                        </el-row>
                        <el-form-item label="文档选择">
                           <el-upload ref="upload" drag multiple :action="'/api/v1/upload/document'"
                              :headers="{ authorization: `bearer ${userStore.token}` }" :show-file-list="false"
                              :disabled="loading || !canIUploadDocument" :auto-upload="false" :on-change="onChange"
                              :file-list="fileList">
                              <el-icon>
                                 <Upload />
                              </el-icon>
                              <div class="el-upload__text">
                                 将文件拖到此处，或<em>点击上传</em>
                              </div>
                           </el-upload>
                           <el-table v-if="fileList.length > 0" :data="fileList" style="width: 100%" max-height="480"
                              stripe border="inner" :column-config="{ resizable: true }">
                              <el-table-column type="seq" width="60"></el-table-column>
                              <el-table-column v-if="(settingStore.language || []).length > 0" field="language"
                                 title="语言" :width="150">
                                 <template #default="{ row }">
                                    <el-select v-model="row.language" filterable clearable>
                                       <el-option v-for="item in settingStore.language" :key="item.code"
                                          :label="item.language" :value="item.code"></el-option>
                                    </el-select>
                                 </template>
                              </el-table-column>
                              <el-table-column field="title" title="文件" min-width="180">
                                 <template #default="{ row }">
                                    <el-input v-model="row.title" :disabled="loading">
                                       <template #append>{{
                                          row.ext
                                       }}</template></el-input>
                                    <div v-if="row.error">
                                       <el-progress :key="row.name" :percentage="row.percentage"
                                          status="exception"></el-progress>
                                       <small class="el-link el-link--danger error-tips">{{
                                          row.error
                                       }}</small>
                                    </div>
                                    <el-progress v-else-if="row.percentage > 0"
                                       :percentage="row.percentage"></el-progress>
                                 </template>
                              </el-table-column>
                              <el-table-column field="size" title="大小" width="100" sortable>
                                 <template #default="{ row }">
                                    <span>{{ formatBytes(row.size) }}</span>
                                 </template>
                              </el-table-column>
                              <el-table-column field="price" :title="`售价(${settingStore.system.credit_name || '魔豆'})`"
                                 :width="130" sortable>
                                 <template #default="{ row }">
                                    <el-input-number v-model="row.price" :min="0" :step="1" :disabled="loading"
                                       controls-position="right"></el-input-number>
                                 </template>
                              </el-table-column>
                              <el-table-column width="100" fixed="right">
                                 <template #header>
                                    操作 (<el-button type="text" size="small" :disabled="loading"
                                       @click="clearAllFiles">清空</el-button>)
                                 </template>
                                 <template #default="{ rowIndex }">
                                    <el-button size="small" type="primary" link :icon="Delete" :disabled="loading"
                                       @click="handleRemove(rowIndex)">
                                       移除
                                    </el-button>
                                 </template>
                              </el-table-column>
                           </el-table>
                        </el-form-item>
                        <el-form-item style="margin-bottom: 0">
                           <el-button v-if="canIUploadDocument" type="primary" class="btn-block" :loading="loading"
                              @click="onSubmit">
                              <span v-if="loading">请勿刷新页面，文档上传中...</span>
                              <span v-else>确定上传</span>
                           </el-button>
                           <el-button v-else type="primary" :icon="HotWater" class="btn-block" disabled>
                              <span v-if="userStore.user.id > 0">您暂无权限上传文档</span>
                              <span v-else>您未登录，请先登录</span>
                           </el-button>
                        </el-form-item>
                     </el-form>
                  </el-col>
                  <el-col v-if="fileList.length == 0" :span="10" class="upload-tips part-right">
                     <div><strong>温馨提示</strong></div>
                     <div class="help-block">
                        <ul>
                           <li>
                              1. 带有
                              <span class="el-link el-link--danger">*</span> 为必填项。
                           </li>
                           <li>
                              <!-- 应该从管理后台的配置中查询 -->
                              2. 允许上传的最大单个文档大小为：<span class="el-link el-link--primary">{{
                                 settingStore.security.max_document_size.toFixed(2) ||
                                 '50.00'
                              }}
                                 MB</span>
                              。
                           </li>
                           <li>3. 支持批量上传</li>
                           <!-- <li>
                    4.
                    <span class="el-link el-link--danger">同名覆盖</span>
                    表示相同名称的文档（含扩展名），直接用新文档文件替换，以达到更新文档文件的目的。
                  </li> -->
                           <li>
                              4. 目前支持的文档类型：
                              <div v-if="wordExt.length > 0">
                                 <img src="/static/images/word_24.png" alt="Word文档" />
                                 {{ wordExt.join('，') }}
                              </div>
                              <div v-if="pptExt.length > 0">
                                 <img src="/static/images/ppt_24.png" alt="PPT文档" />
                                 {{ pptExt.join('，') }}
                              </div>
                              <div v-if="excelExt.length > 0">
                                 <img src="/static/images/excel_24.png" alt="Excel文档" />
                                 {{ excelExt.join('，') }}
                              </div>
                              <div v-if="otherExt.length > 0">
                                 <img src="/static/images/other_24.png" alt="其他文档" />
                                 {{ otherExt.join('，') }}
                              </div>
                              <div v-if="allowExt.includes('.txt')">
                                 <img src="/static/images/text_24.png" alt="TXT文档" />
                                 .txt
                              </div>
                              <div v-if="allowExt.includes('.pdf')">
                                 <img src="/static/images/pdf_24.png" alt="PDF文档" />
                                 .pdf
                              </div>
                           </li>
                           <li>
                              5. 上传遇到问题需要帮助？请查看
                              <router-link to="/article/help" class="el-link el-link--primary">文库帮助</router-link>
                              和
                              <router-link to="/article/feedback" class="el-link el-link--primary">意见反馈</router-link>
                           </li>
                           <li>
                              6. 为营造绿色网络环境，严禁上传含有淫秽色情及低俗信息等文档
                           </li>
                           <li>
                              7.
                              对于涉嫌侵权和违法违规的文档，本站有权在不提前通知的情况下对文档进行删除，您在本站上传文档，表示认同该条款
                           </li>
                        </ul>
                     </div>
                  </el-col>
               </el-row>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Upload, HotWater, Delete } from '@element-plus/icons-vue'
import useSettingStore from '@/store/module/setting'
const settingStore = useSettingStore()
import useUserStore from '@/store/module/user'
const userStore = useUserStore()
import useCategoryStore from '@/store/module/category'
const categoryStore = useCategoryStore()
import { formatBytes } from '@/utils/utils'
import { wordExtEnum, pptExtEnum, excelExtEnum, otherExtEnum } from '@/utils/enum'

const loading = ref(false)
const document = reactive({
   category_id: 1,
   price: 1,
   language: ''
})

const canIUploadDocument = ref(true)
const onChange = () => {

}
const onSubmit = () => {

}
const clearAllFiles = () => {

}
const handleRemove = () => {

}

const fileList = ref([])

const allowExt = [
   '.doc',
   '.docx',
   '.rtf',
   '.wps',
   '.odt',
   '.dot',
   '.ppt',
   '.pptx',
   '.pps',
   '.ppsx',
   '.dps',
   '.odp',
   '.pot',
   '.xls',
   '.xlsx',
   '.csv',
   '.tsv',
   '.et',
   '.ods',
   '.epub',
   '.umd',
   '.chm',
   '.mobi',
   '.txt',
   '.pdf',
   '.azw',
   '.azw3',
   '.azw4',
]

const wordExt = []
const pptExt = []
const excelExt = []
const otherExt = []

onMounted(() => {
   allowExt.map((ext) => {
      if (wordExtEnum.includes(ext)) {
         wordExt.push(ext)
      } else if (pptExtEnum.includes(ext)) {
         pptExt.push(ext)
      } else if (excelExtEnum.includes(ext)) {
         excelExt.push(ext)
      } else if (otherExtEnum.includes(ext)) {
         otherExt.push(ext)
      }
   })
})
</script>

<style lang="scss">
.page-upload {
   .el-table {
      .el-input-number {
         width: 100%;
      }

      .el-header--column {
         .el-cell {
            white-space: normal;
         }
      }
   }

   .el-table {
      .el-input-number {
         width: 120px;
      }
   }

   .el-progress {
      position: absolute;
      width: 100%;
      bottom: -1px;
   }

   .error-tips {
      font-size: 12px;
   }

   .upload-tips {
      line-height: 180%;
      border-left: 1px dashed rgb(252, 155, 91);

      ul,
      li {
         list-style: none;
         margin: 0;
         padding: 0;
      }

      li {
         margin-bottom: 10px;
      }

      .el-link {
         top: -2px;
      }

      img {
         position: relative;
         top: 7px;
      }
   }
}

@media screen and (max-width: $mobile-width) {
   .page-upload {
      .part-left {
         width: 100% !important;

         .el-upload {
            display: block;

            .el-upload-dragger {
               width: 100% !important;
            }
         }
      }

      .part-right {
         width: 100% !important;
         margin-top: 20px;

         li {
            margin-bottom: 0;
         }
      }
   }
}
</style>
