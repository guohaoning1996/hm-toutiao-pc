<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn_box">
        <!-- 按钮单选框 label就是值 -->
        <el-radio-group @change="toggleList"
                        v-model="reqParams.collect"
                        size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button @click="open"
                   style="float:right"
                   type="success"
                   size="small">添加素材</el-button>
        <!-- 对话框 -->
        <el-dialog title="添加素材"
                   :visible.sync="dialogVisible"
                   width="300px">
          <el-upload class="avatar-uploader"
                     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                     :headers="headers"
                     :show-file-list="false"
                     :on-success="handleSuccess"
                     name="image">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-dialog>
        <!-- 素材列表 -->
        <div class="img_list">
          <div class="img_item"
               v-for="item in images"
               :key="item.id">
            <img :src="item.url" />
            <div class="footer"
                 v-if="!reqParams.collect">
              <span @click="toggleStatus(item)"
                    class="el-icon-star-off"
                    :class="{red:item.is_collected}"></span>
              <span @click="deleteImage(item.id)"
                    class="el-icon-delete"></span>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination background
                       layout="prev, pager, next"
                       :page-size="reqParams.per_page"
                       :current-page="reqParams.page"
                       @current-change="pager"
                       :total="total"
                       hide-on-single-page></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local.js'
export default {
  data () {
    return {
      reqParams: {
        // false 全部  true 收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      total: 0,
      // 对话框显示隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      // 设置文件上传的请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 添加收藏与取消收藏
    async toggleStatus (item) {
      // 修改请求
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功后  修改样式
      item.is_collected = data.collect
      // 提示
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    // 删除素材
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认
        await this.$http.delete(`user/images/${id}`)
        // 删除成功
        this.$message.success('删除成功')
        // 更新列表
        this.getImages()
      }).catch(() => {
        // 点击了取消
      })
    },
    // 当图片上传成功之后触发的函数
    handleSuccess (res) {
      this.$message.success('图片上传成功')
      // 从返回值中取得上传图片的路径
      let { data: { url } } = res
      console.log(res)

      // 将图片路径赋值给预览图
      this.imageUrl = url
      // 设定定时器
      window.setTimeout(() => {
        // 隐藏对话框
        this.dialogVisible = false
        // 初始化预览图的路径
        this.imageUrl = null
        // 获取图片列表
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  }

}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
