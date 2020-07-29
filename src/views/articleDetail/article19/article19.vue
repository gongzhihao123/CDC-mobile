<template>
  <div class="articleDetail">
    <div class="info">
        <div class="infoTitle">
          <p>漫画科普 | 近视到底怎么防？同仁眼科专家给你讲讲</p>
          <p decode="true"> {{ time }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
          <div class='div_img' v-for="(image, index) in imgList" :item="image" :key="index">
              <image :src="image"></image>
          </div>
          <!-- <image src="./../../../assets/img/banner1.jpg"></image>
          <div class="articleTitle">措施十：严格强化监督问责</div>
          <image src="./../../../assets/img/banner1.png"></image>
          <p>学校：建立并严格落实各区、学校、班级每年开展儿童青少年近视防控工作评议考核制度。将儿童青少年近视防控工作、总体近视率和体质健康状况纳入学校绩效考核，对儿童青少年体质健康水平下降的区、校依法依规予以问责。学校对视力明显下降的学生家长和班主任进行约谈。</p> -->
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgList: [
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 1 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 2 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 3 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 4 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 5 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 6 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 7 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 8 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 9 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 10 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 11 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 12 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 13 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 14 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 15 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 16 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 17 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 18 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 19 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 20 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 21 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 22 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 23 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 24 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 25 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 26 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 27 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 28 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 29 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 30 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 31 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 32 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 33 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 34 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 35 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 36 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 37 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 38 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 39 + '.jpg',
        this.readPath + '/common/attachment?filepath=/articleimage/19/' + 40 + '.jpg'
      ]
    }
  }
}
</script>
