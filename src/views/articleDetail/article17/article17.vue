<template>
  <div class="articleDetail">
    <div class="info">
        <div class="infoTitle">
          <p>教您正确做眼保健操</p>
          <p decode="true"> {{ time }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
        <div class="articleTitle">眼 保 健 操</div>
          <p>眼保健操是根据中医的传统理论来编制而成的，主要通过眼部和头部，还有身体局部穴位的按摩来达到缓解眼部疲劳和眼部紧张的肌肉，疏通气血经络来防治近视。</p>
          <p class="articleDetail-noIndent">眼保健操的正确打开方式是怎样的？</p>
          <div class="articleTitle">第一步：预备</div>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[0]"></image>
          <p>预备首先要放松，轻闭双眼，身体坐直，肩部和腿部放松，放松心情，深呼气两次。</p>

          <div class="articleTitle">第二步：揉捏耳垂 脚趾抓地</div>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[1]"></image>
          <p>耳垂正中有一个眼穴，这个眼穴是我们临床上治疗假性近视常用的针刺穴位，用大拇指和食指揉按耳垂正中的眼穴，要以轻度的酸胀按揉力度，能够达到缓解疲劳，防治假性近视的作用。</p>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[2]"></image>
          <p>在揉按耳垂正中眼穴的同时，还要进行脚趾抓地，因为脚趾上有丰富的穴位，足阳经和足阴经的交接穴位都在脚趾上面，通过脚趾抓地能够起到疏通整个身体经络，缓解因长时间久坐伏案带来的身体疲劳，这个组合要做四个八拍。</p>

          <div class="articleTitle">第三步：揉按太阳穴</div>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[3]"></image>
          <p>上眼眶周围有重要的眼部穴位，如眉头的攒竹、中间的鱼腰、眉梢的丝竹空、两侧的太阳穴，都是治疗眼病常用的一些针刺穴位。揉按这些穴位，能够使大脑血运更加丰富，气血更加调畅。</p>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[4]"></image>
          <p>首先用大拇指放在两侧的太阳穴上，太阳穴是由眉梢和眼角向后延伸的凹陷处，做轻度的按压，有些酸胀感为宜。做完太阳穴揉按之后刮上眼眶。按揉太阳穴做四次，刮上眼眶做两次，如此交替做四个八拍。</p>

          <div class="articleTitle">第四步：按揉四白穴</div>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[5]"></image>
          <p>四白穴是眼睛下方的一个穴位，四白穴按揉能够缓解用眼过度带来的眼肌疲劳。</p>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[6]"></image>
          <p>食指轻轻放到鼻翼两旁适度按揉，大拇指放在下颌凹陷处，做四个八拍。</p>

          <div class="articleTitle">第五步：按揉风池穴</div>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[7]"></image>
          <p>风池穴在头颈后部两条大筋旁的凹陷处，揉按这两个穴位，一个是能够健脑提神，二是能够缓解长时间用眼导致的眼部疲劳，以及长时间伏案导致的颈部、肩部酸痛。</p>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[8]"></image>
          <p>找到风池穴的位置，用食指和中指合并按揉，做四个八拍。</p>

          <div class="articleTitle">第六步：按头部督脉穴</div>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[9]"></image>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[10]"></image>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[11]"></image>
          <image mode="widthFix"  v-if="imgList.length > 0" :src="imgList[12]"></image>
          <p>头部督脉穴是人体中阳气最充沛的一个经络，按这个经络能够使我们的身体的阳气更加振奋，使头目的气血更加充沛。整个督脉是从头部、颈部、背部、腰部、骶部，整个一条正中线，这是一条漫长的督脉。其他督脉穴因为选取不方便，我们只选取头部督脉穴，这样便于操作。如上图沿着头部督脉穴做四个八拍。</p>

          <div class="articleTitle">温馨提醒</div>
          <p>眼保健操不一定限于青少年，工作劳累、用眼过度的人都可以做眼保健操来放松眼睛肌肉缓解疲劳。但需要注意的是，眼部及眼周围的皮肤、头面部有病变的人，患角膜炎、结膜炎、霰粒肿、麦粒肿等急性眼部疾病的人，皮肤有擦伤、瘙痒等其他皮肤疾病的人，这些人不适合做眼保健操。</p>
        </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      imgList: [
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 1 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 2 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 3 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 4 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 5 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 6 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 7 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 8 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 9 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 10 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 11 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 12 + '.png',
        this.readPath + '/common/attachment?filepath=/articleimage/17/' + 13 + '.png'
      ]
    }
  }
}
</script>
