<template>
  <div class="activitySuggest2">
    <div class="joinActivityHeader">活动详情</div>
    <div class="activitySuggest">
    <p>动起来主题云活动</p>
      <div class="activitySuggestContent">
        <p>活动介绍：</p>
        <div class="SuggestInfo">
          <p>一、活动主题：动起来主题云活动</p>
          <p>二、活动时间：2020年8月1日-2020年8月31日</p>
          <p>三、参与人员：怀柔区在籍中小学生</p>
          <p>四、活动安排</p>
          <p class="SuggestInfoDetail">鼓励全区中小学生利用暑期因地制宜的进行丰富多样的活动，每日完成小程序里的动起来打卡分享，获得活动积分（首次活动和活动结束前三天，参加活动的同学需两次手动填入实时身高体重信息）。学生可以通过合理膳食、健康运动达到减重的效果，同时还可以强健体魄，实现吃动平衡的目的，培养学生良好的膳食及运动习惯。活动结束后，按照积分排名，设有各类奖项及奖品。</p>
          <p>五、活动联系方式：</p>
          <p class="SuggestInfoDetail">活动咨询：王老师 69642117</p>
          <!-- <p class="SuggestInfoDetail">技术咨询：曹老师 15611131830</p> -->
          <p class="SuggestInfoDetail">技术咨询：曹老师 13146032798</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss">
.activitySuggest2 {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .activitySuggest {
    padding: 24px 16px;
    > p {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(51,51,51,1);
    }
    .activitySuggestContent {
      margin-top: 13px;
      border-top: 1PX solid #E5E5E5;
      padding-top: 15px;
      > p {
        margin-bottom: 10px;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51,51,51,1);
      }
      .SuggestInfo {
        P {
          line-height: 1.8;
          font-size: 16px;
        }
        .SuggestInfoDetail {
          text-indent: 32px;
        }
      }
    }
  }
}
</style>
