<template>
  <div class="record">
    <div class="joinActivityHeader">活动专区</div>
    <div class="registerSurface">
        <div class="heighSurace">
            <van-image class="registerSurfaceLogo" :src="require('./../../../assets/img/recordHigh.png')" />
            <p>当前身高(cm)</p>
            <van-field v-model="hight" v-on:change="changeHight" />
        </div>
        <div class="weightSurface">
            <van-image class="registerSurfaceLogo" :src="require('./../../../assets/img/recordWegith.png')" />
            <p>当前体重(kg)</p>
            <van-field v-model="weight" v-on:change="changeWeight"  />
        </div>
        <div >
            <van-image class="registerSurfaceLogo" :src="require('./../../../assets/img/recordRaio.png')" />
            <p>上传照片</p>
            <div class="recordUpload">
                <div>
                  <van-uploader v-model="weightFileList" :after-read="onUploadRead" multiple :max-count="1" />
                </div>
                <!-- <div>
                    <van-uploader listType="picture-card" max="1" defaultFileList="weightImgUrl" url="commonUrl + '/common/attachment'" bind:prediv="weightPrediv" bind:success="weightSuccess" bind:fail="weightFail">
                        <van-image src="imageUrl" wx:if="imageUrl" />
                        <van-image wx:else :src="require('./../../../assets/img/upload.png')" />
                    </van-uploader>
                    <p>请上传体重照片</p>
                </div> -->
                <!-- <div>
                    <van-uploader listType="picture-card" max="1"  defaultFileList="shapeImgUrl" url="commonUrl +    '/common/attachment'"  bind:prediv="heightPrediv" bind:success="heightSuccess" bind:fail="heightFail" >
                        <van-image src="imageUrl" wx:if="imageUrl" />
                        <van-image wx:else :src="require('./../../../assets/img/upload.png')" />
                    </van-uploader>
                    <p>请上传体型照片</p>
                </div> -->
            </div>
        </div>
    </div>
    <div class="recordButton">
      <div bindtap="recordConfirm">确定</div>
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
        <van-overlay>
            <div class="recordPopupContent">
                <div class="recordPopupContentFront">
                    <p class="recordPopupContentFronttitle">参加活动前</p>
                    <p>身高：{{ dataCompare.beforeHight }}cm</p>
                    <p>体重：{{ dataCompare.beforeWeight }}kg</p>
                    <p>BMI值：{{ dataCompare.beforeBmi }}</p>
                </div>
                <div class="recordPopupContentCut">
                    <van-image :src="require('./../../../assets/img/recordVS.png')" />
                    <p></p>
                </div>
                <div class="recordPopupContentNow">
                    <p class="recordPopupContentFronttitle">当前</p>
                    <p>身高：{{ dataCompare.afterHight }}cm</p>
                    <p>体重：{{ dataCompare.afterWeight }}kg</p>
                    <p>BMI值：{{ dataCompare.afterBmi }}</p>
                </div>
            </div>
        </van-overlay>
    </div>
  </div>
</template>
<script>
import {
  apiSubminAntifatData,
  apiUploadFile
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      antifatDataId: '',
      isBefore: false,
      hight: '',
      heightImg: '',
      weight: '',
      weightImg: '',
      imageUrl: [],
      weightFileList: [],
      recordDialog: false,
      readFile: '',
      shapeImgUrl: [],
      weightImgUrl: [],
      dataCompare: {},
      commonUrl: ''
    }
  },
  methods: {
    /**
     * 上传
     */
    onUploadRead (file, detail) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.code === 1) {
            file.status = 'done'
            file.message = '上传成功'
            this.weightFileList.push(res.data)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
    },
    /**
     * 获取身高数据
     */
    changeHight (e) {
      this.hight = e.detail.value
    },
    /**
     * 获取体重数据
     */
    changeWeight (e) {
      this.weight = e.detail.value
    },
    /**
     * 提交记录数据
     */
    recordConfirm () {
      if (this.isBefore) {
        // 活动前
        const data = {
          beforeHight: this.hight,
          beforeShapeImg: this.shapeImgUrl.join(),
          beforeWeight: this.weight,
          beforeWeightImg: this.weightImgUrl.join()
        }
        apiSubminAntifatData().then(res => {
          if (res.code === 1) {
            // wx.setStorageSync('isShowWeightRecord', 1)
            // wx.navigateBack({
            //  delta: 1,
            // })
          }
        }).catch(e => {
          console.log(e)
        })
      } else {
        // 活动后
        const data = {
          afterHight: this.hight,
          afterShapeImg: this.shapeImgUrl.join(),
          afterWeight: this.weight,
          afterWeightImg: this.weightImgUrl.join()
        }
        apiSubminAntifatData().then(res => {
          if (res.code === 1) {
            this.dataCompare = res.data
            this.recordDialog = true
          }
        }).catch(e => {
          console.log(e)
        })
      }
    }
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
}
</style>
