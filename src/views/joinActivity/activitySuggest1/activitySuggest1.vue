<template>
  <div class="activitySuggest1">
    <div class="joinActivityHeader">活动详情</div>
    <div class="activitySuggest">
      <p>爱眼睛主题云活动</p>
      <div class="activitySuggestContent">
        <p>活动介绍：</p>
        <div class="SuggestInfo">
          <p>一、活动主题：爱眼睛主题云活动</p>
          <p>二、活动时间：2020年8月1日-2020年8月31日</p>
          <p>三、参与人员：怀柔区在籍中小学生</p>
          <p>四、活动安排：</p>
          <p class="SuggestInfoDetail">为全区中小学生暑期爱护眼睛工作，鼓励学生每天都做一次眼保健操，区疾病预防控制中心和区中小学生卫生保健所，共同举办爱眼睛主题云活动，通过自愿在小程序上完成打卡、分享等活动，结算最终积分，并给予奖励，培养良好的用眼习惯和用眼行为，帮助学生养成合理用眼、科学防控近视的正确意识。</p>
          <p class="SuggestInfoDetail">视频播放结束、眼保健操做完方可点击打卡分享，按照提示完成打卡与分享即可获得积分。活动结束后，按照积分排名，设有各类奖项及奖品。</p>
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
.activitySuggest1 {
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
