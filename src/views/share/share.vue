<template>
  <div class="share">
    <div class="joinActivityHeader">分享</div>
    <div class="shareText">
        <van-field type="textarea" v-model="content" show-word-limit maxlength="80" placeholder="在这里写点有意思的东西分享吧" />
    </div>
    <div class="shareUpload">
        <div class="uploadTitle">
          <van-image class="uploadTitleImg" :src="require('./../../assets/img/recordRaio.png')" />
          <p>上传图片</p>
        </div>
        <div>
          <van-uploader v-model="uploadFileList" :after-read="onUploadShare" :max-size=" 10 * 1024 * 1024" @oversize="onOversize" multiple :max-count="1" />
        </div>
    </div>
    <div class="sharePopupButton">
        <span @click="shareConfirm">发 布</span>
    </div>
  </div>
</template>
<script>
import {
  apiUploadFile,
  apiSubminShare
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      uploadFileList: [],
      content: '',
      shareImgUrl: '',
      activityId: ''
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  methods: {
    onUploadShare (file, detail) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.code === 1) {
            file.status = 'done'
            file.message = '上传成功'
            this.shareImgUrl = res.data.filepath
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
    },
    onOversize () {
      this.$toast('上传大小不能超过10M')
    },
    /**
     * 分享提交
     */
    shareConfirm () {
      if (!this.content) {
        this.$toast('分享内容需超过十个字符')
        return
      }
      const currentChildId = sessionStorage.getItem('currentChildId')
      const currentChildName = sessionStorage.getItem('currentChildName')
      const data = {
        activityId: this.activityId,
        contentImg: this.shareImgUrl,
        content: this.content,
        studentId: currentChildId,
        studentName: currentChildName
      }
      apiSubminShare(data)
        .then(res => {
          this.$toast(res.message)
          if (res.code === 1) {
            this.$router.push('/clockShare')
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.activityId = this.$route.query.activityId
  }
}
</script>
<style lang="scss">
.share {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .shareText {
    .van-cell {
      padding: 10px;
      .van-cell__value {
        background: #F0F1F3;
        border-radius: 10px;
        padding: 5px;
      }
    }
  }
  .shareUpload {
    padding: 10px;
    .uploadTitle {
      display: flex;
      align-items: center;
      font-size: 16px;
      .uploadTitleImg {
        width: 28px;
        height: 28px;
        margin-right: 5px
      }
    }
    div {
      .van-uploader {
        margin-top: 10px;
        border: 1PX dashed #d9d9d9;
        .van-uploader__preview {
          margin: 0;
        }
        .van-uploader__upload {
          margin: 0;
        }
      }
    }
  }
  .sharePopupButton {
    margin-top: 10px;
    padding: 0 20px;
    span {
      display: block;
      padding: 10px 8px;
      margin: 6px;
      font-size: 14px;
      text-align: center;
      color: #fff;
      background: linear-gradient(45deg, #07e6da,#1cbbb4);
      border-radius: 20px;
    }
  }
}
</style>
