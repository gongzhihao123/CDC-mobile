<template>
  <div class="record">
    <div class="joinActivityHeader">活动专区</div>
    <div class="registerSurface">
        <div class="heighSurace">
            <van-image class="registerSurfaceLogo" :src="require('./../../../assets/img/recordHigh.png')" />
            <p>当前身高(cm)</p>
            <van-field v-model="hight" :value="hight" />
        </div>
        <div class="weightSurface">
            <van-image class="registerSurfaceLogo" :src="require('./../../../assets/img/recordWegith.png')" />
            <p>当前体重(kg)</p>
            <van-field v-model="weight" :value="weight"  />
        </div>
        <div >
            <van-image class="registerSurfaceLogo" :src="require('./../../../assets/img/recordRaio.png')" />
            <p>上传照片</p>
            <div class="recordUpload">
              <div>
                <van-uploader v-model="weightImgUrl" :after-read="onUploadWeight" :max-size=" 10 * 1024 * 1024" @oversize="onWeightOversize" multiple :max-count="1" />
                <p>请上传体重照片</p>
              </div>
              <div>
                <van-uploader v-model="shapeImgUrl" :after-read="onUploadheight" :max-size=" 10 * 1024 * 1024" @oversize="onHeightOversize" multiple :max-count="1" />
                <p>请上传体型照片</p>
              </div>
            </div>
        </div>
    </div>
    <div class="recordButton">
      <div @click="recordConfirm">确定</div>
    </div>
    <div class="recordNotice">
        <div class="recordNoticeHeader">
            <van-image :src="require('./../../../assets/img/recordNotice.png')" />
            <p>提示：</p><p>照片上传标准</p>
        </div>
        <div class="recordNoticeContent">
            <div class="recordNoticeContentInfo">
                <p>体重照片</p>
                <van-image :src="require('./../../../assets/img/recordShow1.png')" />
                <p>上传照片需脚踩体重秤， 且数值显示清晰。</p>
            </div>
            <div class="recordNoticeContentInfo">
                <p>体型照片</p>
                <van-image :src="require('./../../../assets/img/recordShow2.png')" />
                <p>上传照片需能显示出当 前体型状态。</p>
            </div>
        </div>
    </div>
    <div class="recordPopup">
        <van-popup v-model="recordDialog" closeable round @closed="closeDataShow">
            <div class="recordPopupContent">
                <div class="recordPopupContentFront">
                    <p class="recordPopupContentFronttitle">参加活动前</p>
                    <p>身高：<span>{{ dataCompare.beforeHight }}</span> cm</p>
                    <p>体重：<span>{{ dataCompare.beforeWeight }}</span> kg</p>
                    <p>BMI值：<span>{{ dataCompare.beforeBmi }}</span></p>
                </div>
                <div class="recordPopupContentCut">
                    <van-image :src="require('./../../../assets/img/recordVS.png')" />
                    <span></span>
                </div>
                <div class="recordPopupContentNow">
                    <p class="recordPopupContentFronttitle">当前</p>
                    <p>身高：<span>{{ dataCompare.afterHight }}</span> cm</p>
                    <p>体重：<span>{{ dataCompare.afterWeight }}</span> kg</p>
                    <p>BMI值：<span>{{ dataCompare.afterBmi }}</span></p>
                </div>
            </div>
        </van-popup>
    </div>
  </div>
</template>
<script>
import {
  apiSubminAntifatData,
  apiUploadFile,
  apidelFile,
  apiGetAntifatInfo
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      activityId: '',
      antifatDataId: '',
      isAfter: false,
      hight: '',
      heightImg: '',
      weight: '',
      weightImg: '',
      imageUrl: [],
      recordDialog: true,
      readFile: '',
      shapeImgUrl: [],
      shapeFileUrl: '',
      weightFileUrl: '',
      weightImgUrl: [],
      dataCompare: {},
      commonUrl: '',
      fatInfo: {}
    }
  },
  methods: {
    // 获取肥胖信息
    getAntifatInfo () {
      const studentId = window.localStorage.getItem('currentChildId')
      apiGetAntifatInfo(this.activityId, studentId)
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            console.log(res)
            this.fatInfo = res.data
            this.antifatDataId = res.data.antifat.id
            console.log('s', this.antifatDataId)
          }
        })
    },
    /**
     * 上传体重
     */
    onUploadWeight (file, detail) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.code === 1) {
            file.status = 'done'
            file.message = '上传成功'
            this.weightFileUrl = res.data.filepath
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
    },
    onWeightOversize () {
      this.$toast('上传大小不能超过10M')
    },
    onHeightOversize () {
      this.$toast('上传大小不能超过10M')
    },
    /***
     * 删除上传体重
     */
    removeWeightUpload () {
      apidelFile({ filepath: this.weightFileUrl })
        .then(res => {
          this.$toast(res.message)
          if (res.code === 1) {
            this.$toast(res.message)
          }
        })
    },
    /**
     * 上传身高
     */
    onUploadheight (file, detail) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.code === 1) {
            file.status = 'done'
            file.message = '上传成功'
            this.shapeFileUrl = res.data.filepath
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
    },
    /**
     * 提交记录数据
     */
    recordConfirm () {
      if (this.fatInfo.antifat && this.fatInfo.antifat.beforeBmi === null) {
        // 活动前
        const data = {
          beforeHight: this.hight,
          beforeShapeImg: this.shapeFileUrl,
          beforeWeight: this.weight,
          beforeWeightImg: this.weightFileUrl
        }
        apiSubminAntifatData(this.antifatDataId, data).then(res => {
          this.$toast(res.message)
          if (res.code === 1) {
            this.$router.push('/clockIn')
          }
        }).catch(e => {
          console.log(e)
        })
      } else {
        // 活动后
        const data = {
          afterHight: this.hight,
          afterShapeImg: this.shapeFileUrl,
          afterWeight: this.weight,
          afterWeightImg: this.weightFileUrl
        }
        console.log(this.antifatDataId)
        apiSubminAntifatData(this.antifatDataId, data).then(res => {
          if (res.code === 1) {
            this.dataCompare = res.data
            this.recordDialog = true
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
    closeDataShow () {
      this.recordDialog = false
    }
  },
  async mounted () {
    this.activityId = this.$route.query.activityId
    await this.getAntifatInfo()
  }
}
</script>
<style lang="scss">
.record {
   .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4);
    background-size: 100% 100%;
  }
  .registerSurface {
    display: flex;
    flex-direction: column;
    padding: 20px 20px 10px;
    .heighSurace {
      display: flex;
      align-items: center;
      margin: 5px 0;
      .registerSurfaceLogo  {
        width: 30px;
        height: 25px;
      }
      > p {
        display: inline-block;
        margin-right: 5px;
      }
      .van-field {
        .van-field__body {
          padding: 3px;
          border-radius: 5px;
          background: #ccc;
        }
      }
    }
    .weightSurface {
      display: flex;
      align-items: center;
      margin: 5px 0;
      .registerSurfaceLogo  {
        width: 30px;
        height: 25px;
      }
      > p {
        display: inline-block;
        margin-right: 5px;
      }
      .van-field {
        .van-field__body {
          padding: 3px;
          border-radius: 5px;
          background: #ccc;
        }
      }
    }
    div {
      display: flex;
      align-items: center;
      margin: 10rpx 0;
      .registerSurfaceLogo {
        width: 25px;
        height: 25px;
      }
      > p {
        display: inline-block;
        margin-right: 5px;
      }
      .recordUpload {
        display: flex;
        margin-left: 9px;
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          .van-uploader {
            border: 1PX dashed #d9d9d9;
            .van-uploader__preview {
              margin: 0;
            }
            .van-uploader__upload {
              margin: 0;
            }
          }
          > p {
            margin: 5px 0;
            font-size: 12px;
            color: #ccc;
          }
        }
      }
    }
  }
  .recordButton {
    padding: 10px 20px;
    > div {
      padding: 9px 7px;
      width: 100%;
      color: #fff;
      background: linear-gradient(45deg, #07e6da,#1cbbb4);
      border-radius: 20px;
      text-align: center;
    }
  }
  .recordNotice {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .recordNoticeHeader {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .van-image {
        width: 16px;
        height: 16px;
        margin: 0 5px 0 10px;
      }
      p {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(229,89,89,1);
      }
    }
    .recordNoticeContent {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      padding: 0 10px;
      .recordNoticeContentInfo  {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80px;
        p {
          margin: 5px 0;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(153,153,153,1);
        }
        .van-image {
          width: 80px;
          height: 80px;
          background: #ccc;
        }
      }
    }
  }
  .recordPopup {
    .van-popup {
      width: 80%;
      height: 220px;
      .recordPopupContent {
        display: flex;
        padding-top: 50px;
        align-items: flex-start;
        justify-content: center;
        > div {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          > p {
            display: block;
            margin: 4px 0;
          }
        }
        .recordPopupContentFront {
          .recordPopupContentFronttitle {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(102,102,102,1);
          }
          span {
            color: #3CC3A0;
          }
        }
        .recordPopupContentCut {
          margin: 0 10px -10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .van-image {
            width: 35px;
            height: 35px;
          }
          span {
            display: block;
            margin: 4px 0;
            height: 50px;
            width: 1PX;
            border: 1PX dashed #ccc;
          }
        }
        .recordPopupContentNow {
          .recordPopupContentFronttitle {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(102,102,102,1);
          }
          P {
            span {
              color: #3CC3A0;
            }
          }
        }
      }
    }
  }
}
</style>
