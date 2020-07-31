<template>
  <div class="healthDarren">
    <div class="healthDarrenHeader">健康小达人</div>
    <div class="healthDarrenMain">
        <div class="healthDarrenMainheader">
            <img :src="require('./../../assets/img/healthDarrenHeader.png')" />
        </div>
        <div class="Organizer">
            <p>主办单位：北京市怀柔区疾病预防控制中心</p>
            <p>协办单位：北京市怀柔区中小学卫生保健所</p>
        </div>
        <div class="healthDarrenMainInfo">
            <p>活动介绍：</p>
            <div class="healthDarrenMainDetail">
                <p>一、活动主题：健康小达人评选活动</p>
                <p>二、活动时间：2020年8月1日-2020年8月31日</p>
                <p>三、参与人员：怀柔区在籍中小学生</p>
                <p>四、活动安排：</p>
                <p>鼓励全区中小学生可以暑期利用摄影、绘画、征文等形式提交丰富多样的防近视、控肥胖作品，分享假期中的保护视力、健康体重的心得及收获，帮助培养学生养成良好的健康生活习惯。</p>
                <p>五、参赛作品要求：</p>
                <p>摄影类（每组4张以内）、绘画类（每组4张以内）、征文类字符不限，作品文件夹统一用“学校+学生姓名+作品名称+作品类型”命名，发送至hrcdcjkjq@126.com邮箱。区疾控中心将组织专家对参赛作品进行评奖评优，并适时进行表彰奖励。</p>
                <p>六、投稿要求：</p>
                <p>参赛人员于9月15日前将活动参赛作品电子版报区疾控中心邮箱hrcdcjkjq@126.com。</p>
                <p>七、活动咨询：</p>
                <p>王老师 69642117</p>
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
.healthDarren {
  .healthDarrenHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .healthDarrenMain {
    padding: 10px;
    .healthDarrenMainheader {
      background: #FEF6E6;
    }
    .Organizer {
      background: #FEF6E6;
      padding: 9px 15px;
      > p {
        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        padding-bottom: 6px;
        color:rgba(51,51,51,1);
      }
    }
    .healthDarrenMainInfo {
      border-top: 1PX solid #999999;
      padding: 10px;
      background: #FEF6E6;
      > p {
        font-size:14px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .healthDarrenMainDetail {
        p {
          margin-top: 5px;
          text-indent: 32px;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:20px;
        }
      }
    }
  }
}

// .healthContentList {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
//   padding: 0 36rpx;
//   margin:  16rpx 0;
// }

// .healthArticleLogo {
//   width: 160rpx;
//   height: 120rpx;
// }

// .healthArticleList {
//   display: flex;
//   align-items: center;
// }

// .healthArticleListInfo {
//     margin-left: 20rpx;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     p:first-child {
//       font-size:32rpx;
//       font-family:PingFang SC;
//       font-weight:bold;
//       color:rgba(51,51,51,1);
//     }
//     p:last-child {
//       font-size:28rpx;
//       font-family:PingFang SC;
//       font-weight:500;
//       color:rgba(102,102,102,1);
//     }
// }

// .healthArticleListBro {
//   margin-bottom: 24rpx;
//   font-size:24rpx;
//   font-family:PingFang SC;
//   font-weight:400;
//   color:rgba(153,153,153,1);
// }

// .wux-cell-group .wux-cell-group__bd:after {
//   display: none;
// }

// .noContentNotice {
//   text-align: center;
// }
</style>
