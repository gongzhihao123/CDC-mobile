<template>
  <div class="share">
    <div>
        <van-field type="textarea" show-word-limit maxlength="80" placeholder="在这里写点有意思的东西分享吧" />
    </div>
    <div class="shareUpload">
        <div class="uploadTitle">
          <van-image class="uploadTitleImg" :src="require('./../../assets/img/recordRaio.png')" />
          <p>上传图片</p>
        </div>
        <div>
            <van-uploader
              max="1"
              v-model="uploadFileList"
              url="commonUrl + '/common/attachment'"
              :after-read="afterRead">
            <van-image :src="require('./../../assets/img/upload.png')" />
        </van-uploader>
        </div>
    </div>
    <div class="sharePopupButton">
        <van-button type="info" v-on:click="shareConfirm">发布</van-button>
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
      uploadFileList: []
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      apiUploadFile(file).then(res => {
        console.log(res)
      })
    },
    /**
     * 分享提交
     */
    shareConfirm () {
      if (!this.data.content) {
        this.$toast('分享内容需超过十个字符')
        return
      }
      const studentInfo = '' // wx.getStorageSync('studentInfo')
      const userInfo = '' // wx.getStorageSync('userInfo')
      const data = {
        activityId: this.activityId,
        contentImg: this.uploadFileUrl.join(),
        content: this.content,
        studentId: studentInfo.studentId,
        studentName: studentInfo.studentName,
        wechatUserImg: userInfo.avatarUrl
      }
      apiSubminShare(data)
        .then(res => {
          this.$toast(res.data.message)
          if (res.data.code === 1) {
            /**
            wx.reLaunch({
              url: './../clockShare/clockShare'
            })
            */
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
  }
}
</script>
