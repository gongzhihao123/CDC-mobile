<template>
  <div class="record">
    <wux-toptips id="wux-toptips" />
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
                    <van-uploader listType="picture-card" max="1" defaultFileList="weightImgUrl" url="commonUrl + '/common/attachment'" bind:prediv="weightPrediv" bind:success="weightSuccess" bind:fail="weightFail">
                        <van-image src="imageUrl" wx:if="imageUrl" />
                        <van-image wx:else :src="require('./../../../assets/img/upload.png')" />
                    </van-uploader>
                    <p>请上传体重照片</p>
                </div>
                <div>
                    <van-uploader listType="picture-card" max="1"  defaultFileList="shapeImgUrl" url="commonUrl +    '/common/attachment'"  bind:prediv="heightPrediv" bind:success="heightSuccess" bind:fail="heightFail" >
                        <van-image src="imageUrl" wx:if="imageUrl" />
                        <van-image wx:else :src="require('./../../../assets/img/upload.png')" />
                    </van-uploader>
                    <p>请上传体型照片</p>
                </div>
            </div>
        </div>
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
    <div class="recordButton">
        <div bindtap="recordConfirm">确定</div>
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
  apiSubminAntifatData
} from '@/services/api/index_cs'
export default {
  data () {
    return {}
  },
  methods: {
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
