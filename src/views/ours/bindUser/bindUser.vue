<template>
  <div class="bindUser">
    <div class="joinActivityHeader">绑定孩子</div>
    <p class="bindUserTitle">基本情况</p>
    <div class="bindUserinfo">
      <!-- 与孩子关系 -->
      <van-field readonly clickable name="picker" :value="relationName" label="我 是" placeholder="点击选择" @click="changeRelation" />
      <van-popup v-model="relationFlag" position="bottom">
        <van-picker show-toolbar :columns="relationList" value-key="name" @confirm="relationConfirm" @cancel="relationFlag = false" />
      </van-popup>
      <!-- 孩子名称 -->
      <van-field  clickable name="picker" v-model="childName" label="孩子姓名" placeholder="请输入孩子名称" />
      <!-- 性别 -->
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 出生日期 -->
      <van-field readonly clickable name="datetimePicker" :value="birthday" @click="changeDate" label="出生日期" placeholder="点击选择日期" />
        <van-popup v-model="dateFlag" position="bottom">
          <van-datetime-picker v-model="currentDay" type="date" title="选择年月日" :min-date="minDate" @confirm="dateConfirm" @cancel="dateFlag = false" :max-date="maxDate"  />
        </van-popup>
        <p class="bindUserNotice">请填写2019-2020年 的学籍信息</p>
        <!-- 选择学校 -->
      <van-field readonly clickable name="picker" :value="schoolName" label="所在学校" placeholder="点击选择学校" @click="changeSchool" />
      <van-popup v-model="schoolflag" position="bottom">
        <van-picker show-toolbar :columns="schoolList" value-key="name" @confirm="schoolConfirm" @cancel="schoolflag = false" />
      </van-popup>
      <!-- 选择校区 -->
       <van-field readonly clickable name="picker" :value="campusName" label="所在校区" placeholder="点击选择校区" @click="changeCampus" />
      <van-popup v-model="campusflag" position="bottom">
        <van-picker show-toolbar :columns="campusList" value-key="name" @confirm="campusConfirm" @cancel="campusflag = false" />
      </van-popup>
      <!-- 选择学段 -->
      <van-field readonly clickable name="picker" :value="sectionName" label="所在学段" placeholder="点击选择学段" @click="changeSection" />
      <van-popup v-model="sectionflag" position="bottom">
        <van-picker show-toolbar :columns="sectionList" value-key="name" @confirm="sectionConfirm" @cancel="sectionflag = false" />
      </van-popup>
      <!-- 选择年级 -->
      <van-field readonly clickable name="picker" :value="gradeName" label="所在年级" placeholder="点击选择年级" @click="changeGrade" />
      <van-popup v-model="gradeflag" position="bottom">
        <van-picker show-toolbar :columns="gradeList" value-key="name" @confirm="gradeConfirm" @cancel="gradeflag = false" />
      </van-popup>
      <!-- 选择班级 -->
      <van-field readonly clickable name="picker" :value="className" label="所在班级" placeholder="点击选择班级" @click="changeClass" />
      <van-popup v-model="classflag" position="bottom">
        <van-picker show-toolbar :columns="classList" value-key="name" @confirm="classConfirm" @cancel="classflag = false" />
      </van-popup>
      <div class="bindUserButton">
        <p @click="confirmButton">确 认</p>
      </div>
      <van-dialog v-model="showCheckFlag" title="" @confirm="bindUserDefine">
         <div class="bindUserPopupContent" >
            <p>请确认孩子信息：</p>
            <div>
              <p><span>姓名：</span> {{ checkUserInfo.name }}</p>
              <p><span>性别：</span>{{ checkUserInfo.sex == 1 ? '男' : '女'  }}</p>
              <p v-if="checkUserInfo.birthday"><span>生日：</span>{{ checkUserInfo.birthday[0] }}年{{ checkUserInfo.birthday[1] }}月{{ checkUserInfo.birthday[2] }}日</p>
              <p><span>学校：</span>{{ checkUserInfo.schoolName }}</p>
              <p><span>年级：</span>{{ checkUserInfo.gradeName }}</p>
              <p><span>班级：</span>{{ checkUserInfo.className }}</p>
            </div>
        </div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import { apiGetSchool, apiGetCampus, apiGetGrade, apiGetClass, apiBindCheck, apiBindCheckDefine } from '@/services/api/index'
export default {
  data () {
    return {
      relation: '',
      relationName: '',
      relationList: [{ id: 1, name: '本人' }, { id: 2, name: '爸爸' }, { id: 3, name: '妈妈' }, { id: 4, name: '爷爷' }, { id: 5, name: '奶奶' }, { id: 6, name: '姥爷' }, { id: 7, name: '姥姥' }, { id: 8, name: '叔叔' }, { id: 9, name: '叔叔' }],
      relationFlag: false,
      childName: '',
      sex: '',
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDay: new Date(),
      birthday: '',
      dateFlag: false,
      schoolName: '',
      schoolId: '',
      schoolflag: false,
      schoolList: [],
      campusName: '',
      campusId: '',
      campusflag: false,
      campusList: [],
      sectionName: '',
      sectionId: '',
      sectionList: [],
      sectionflag: false,
      gradeName: '',
      gradeId: '',
      gradeList: [],
      gradeflag: false,
      className: '',
      classId: '',
      classList: [],
      classflag: false,
      showCheckFlag: false,
      checkUserInfo: {}
    }
  },
  methods: {
    // 孩子关系选择
    changeRelation () {
      this.columns = this.relationList
      this.relationFlag = true
    },
    // 孩子关系选择确定
    relationConfirm (e) {
      this.relationName = e.name
      this.relation = e.id
      this.relationFlag = false
    },
    timeFormat (time) { // 时间格式化 2019-09-08
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      let tempMonth = 0
      month > 10 ? tempMonth = month : tempMonth = '0' + month
      return year + '-' + tempMonth + '-' + day
    },
    // 选择出生日期
    changeDate () {
      this.dateFlag = true
    },
    dateConfirm (e) {
      console.log(this.timeFormat(e))
      this.birthday = this.timeFormat(e)
      this.dateFlag = false
    },
    // 选择学校
    async changeSchool () {
      await this.getSchoolList()
      this.schoolflag = true
    },
    // 选择学校确认
    schoolConfirm (e) {
      this.schoolName = e.name
      this.schoolId = e.id
      this.schoolflag = false
    },
    // 获取学校列表
    async getSchoolList () {
      await apiGetSchool()
        .then(res => {
          if (res.code === 1) {
            this.schoolList = res.data
          }
        })
    },
    // 选择校区
    async changeCampus () {
      await this.getCampusList()
      this.campusflag = true
    },
    // 选择校区确认
    campusConfirm (e) {
      this.campusName = e.name
      this.campusId = e.id
      this.sectionList = e.sections.split()
      this.campusflag = false
    },
    // 获取校区列表
    async getCampusList () {
      await apiGetCampus(this.schoolId)
        .then(res => {
          if (res.code === 1) {
            this.campusList = res.data
          }
        })
    },
    // 选择学段
    async changeSection () {
      await this.getSectionList()
      this.sectionflag = true
    },
    // 选择学段确认
    sectionConfirm (e) {
      this.sectionName = e.name
      this.sectionId = e.id
      this.sectionflag = false
    },
    // 获取学段列表
    getSectionList () {
      const arr = []
      for (let i = 0; i < this.sectionList.length; i++) {
        const obj = {}
        if (this.sectionList[i] * 1 === 1) {
          obj.id = 1
          obj.name = '小学'
        } else if (this.sectionList[i] * 1 === 2) {
          obj.id = 2
          obj.name = '初中'
        } else if (this.sectionList[i] * 1 === 3) {
          obj.id = 3
          obj.name = '高中'
        }
        arr.push(obj)
      }
      this.sectionList = arr
    },
    // 选择年级
    async changeGrade () {
      await this.getGradeList()
      this.gradeflag = true
    },
    // 选择年级确认
    gradeConfirm (e) {
      this.gradeName = e.name
      this.gradeId = e.id
      this.gradeflag = false
    },
    // 获取年级列表
    async getGradeList () {
      await apiGetGrade(this.campusId, this.sectionId)
        .then(res => {
          if (res.code === 1) {
            this.gradeList = res.data
          }
        })
    },
    // 选择年级
    async changeClass () {
      await this.getClassList()
      this.classflag = true
    },
    // 选择年级确认
    classConfirm (e) {
      this.className = e.name
      this.classId = e.id
      this.classflag = false
    },
    // 获取年级列表
    async getClassList () {
      await apiGetClass(this.gradeId)
        .then(res => {
          if (res.code === 1) {
            this.classList = res.data
          }
        })
    },
    // 确认提交
    confirmButton () {
      const data = {
        birthday: this.birthday,
        campusId: this.campusId,
        campusName: this.campusName,
        classId: this.classId,
        className: this.className,
        gradeId: this.gradeId,
        gradeName: this.gradeName,
        name: this.childName,
        relation: this.relation,
        schoolId: this.schoolId,
        schoolName: this.schoolName,
        sectionId: this.sectionId,
        sectionName: this.sectionName,
        sex: this.sex
      }
      apiBindCheck(data)
        .then(res => {
          if (res.code === 1) {
            this.showCheckFlag = true
            this.checkUserInfo = res.data
          }
        })
    },
    bindUserDefine () {
      const studentId = sessionStorage.getItem('currentChildId')
      const data = {
        campusName: this.campusName,
        className: this.className,
        gradeName: this.gradeName,
        name: this.childName,
        relation: this.relation,
        schoolName: this.schoolName,
        sectionName: this.sectionName,
        sex: this.sex,
        studentId: studentId
      }
      apiBindCheckDefine(data)
        .then(res => {
          if (res.code === 1) {
            this.$toast(res.message)
            this.$router.push('/ours')
          }
        })
    }
  }
}
</script>
<style lang="scss">
.bindUser {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .bindUserTitle {
    margin: 10px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
  .bindUserNotice {
    margin-top: 18px;
    display: flex;
    justify-content: center;
    font-size:12px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(153,153,153,1);
  }
  .bindUserinfo {
    > .van-cell {
      margin-bottom: 10px;
    }
    .bindUserButton {
      padding: 0 20px;
      p {
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
    .van-dialog {
      .van-dialog__header {
        padding-top: 14px;
      }
      .van-dialog__content {
        display: flex;
        justify-content: center;
        .bindUserPopupContent {
          > p {
            margin: 18px 0;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(153,153,153,1);
          }
          > div {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            padding: 15px;
            background: rgba(240,241,243,1);
            border-radius: 5px;
            > p {
              line-height: 1.5;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(51,51,51,1);
            }
          }
        }
      }
    }
  }
}
</style>
