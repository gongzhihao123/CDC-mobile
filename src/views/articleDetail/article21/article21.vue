<template>
  <div class="articleDetail">
    <div class="info">
        <div class="infoTitle">
          <p>孩子胖胖的才健康？</p>
          <p decode="true"> {{ time }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
          <p>在很多家长，尤其是爷爷奶奶们的观念里，孩子瘦=弱=不健康，胖=壮=健康。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[0]"/>
          <p>其实，这种观念并不科学，如果孩子在儿童时期过度肥胖对健康造成的伤害十分巨大。</p>
          <p>人体内的脂肪细胞只在儿童时期分裂增殖，儿童时期肥胖会使脂肪细胞数量大大量增加，肥胖儿童的脂肪数量是正常孩子的3倍，这些脂肪细胞在孩子成人后也不会减少，为今后一生的健康，埋下隐患。所以某种意义上来说，小儿肥胖比成年后的肥胖更加可怕。
  那么，如何判断自家的宝宝是否肥胖呢？</p>

          <p>现在告诉大家一个身体质量指数公式，用宝宝的体重除以身高的平方得出的这个数字就是宝宝的体质指数，然后再对照这张表格中的数字就可以相对科学的判断，自家宝宝是否是肥胖宝宝了。</p>
          <p>对于男孩而言，身体质量指数超过下面这些指标，就属于肥胖宝宝了，需要及时减肥：</p>
          <p class="articleDetailcenter">
          三岁时超过18.1
  四岁超过17.8
  五岁超过17.9
  六岁超过18.4
  七岁超过19.2
  八岁超过20.1
  九岁超过21.1
  十岁超过22.2</p>
          <p>对于女孩而言，身体质量指数超过下面这些指标，属于肥胖宝宝了，也需要及时减肥：</p>
          <p class="articleDetailcenter">
  三岁时超过18.3
  四岁超过18.1
  五岁超过18.2
  六岁超过18.4
  七岁超过18.8
  八岁超过19.5
  九岁超过20.4
  十岁超过21.5</p>
          <p>既然孩子肥胖有了这些标准，那什么才导致了孩子肥胖呢？</p>
          <div class="articleTitle">1.不合理饮食危害大</div>
          <p>导致肥胖的最大原因就是不正确饮食，对于儿童来说更是如此。那么，家长又如何为宝宝配比健康科学的食物和食量？家长们可以根据中国儿童平衡膳食算盘的六五四三二一原则，搭配和控制孩子每天的饮食，来预防孩子肥胖。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[1]"/>

          <p>黄色的是谷类，六颗算珠表示每日摄入谷类物质是六份，相当于每天最多吃标准碗的三碗米饭。</p>
          <p>绿色是蔬菜类五颗算珠表示每日摄入蔬菜五份，相当于一天的蔬菜。</p>
          <p>紫色是水果类，四颗算珠表示每日摄入水果四份相当于每天最多吃两个完整的苹果份量的水果。</p>
          <p>橙色是肉类，三颗算珠表示每日摄入肉类三份相当于普通成年人手掌心的大小及厚度的肉三块。</p>
          <p>蓝色是豆奶类，两颗算珠表示每日舍入豆奶制品两份，相当于两杯400毫升豆浆的量，或是两盒300毫升的牛奶。</p>
          <p>红色算珠是油盐，一颗算珠表示每日摄入油盐量，一份油约为家用一匙勺的量盐摄入量每天要少于6克。</p>
          <p>以上的剂量是适合8—11岁儿童的参考量，其他年龄段的儿童也应该根据这个六五四三二一的比例进行配比。</p>

          <div class="articleTitle">另外，还有一肉蛋类的饮食注意：</div>
          <div class="articleTitle">1.肉类</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[2]"/>
          <p>学龄儿童每天肉食的摄入量大概在150克左右，但肉的选择也有讲究。很多家长爱给孩子吃的排骨，脂肪含量其实非常高，看似都是瘦肉，但100g的排骨，刨去骨头和水分的重量，大约只有40g的肉，这之中，脂肪的含量可达到一半以上。如果想通过给孩子吃肉补充蛋白质，里脊和腱子肉是最好的选择。因为这两个部位运动频繁，肌肉发达，蛋白很多，但口感没有那么好，比较柴。</p>

          <div class="articleTitle">2. 奶制品</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[3]"/>
          <p>儿童奶制品一定要保证，大概在250毫升左右，鸡蛋的做法也要留意，最好是煮三分钟，焖两分钟。煮的时间过长，蛋黄外会变绿，产生硫化物，吃多了会致癌。鸡蛋煮的时间太短，也就是俗称的溏心蛋，里面会有一种细菌，容易导致拉肚子，而且还有一种对胰腺很不好的抗胰蛋白酶。</p>

          <div class="articleTitle">2.孩子的胃容量有限，吃太多容易得胃炎</div>
          <p>大多数家长们都希望孩子能多吃点，觉得孩子吃得多才会不缺营养。但其实，孩子的胃容量是有限的，吃了过多高脂肪高热量的东西，胃其实是不舒服的，这也就是很多肥胖的孩子会患有胃炎的原因。</p>

          <div class="articleTitle">3.睡眠不好也会导致孩子肥胖</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[4]"/>
          <p>据英国《每日邮报》报道，新的研究表明儿童没有得到足够的睡眠，可能患上肥胖症。这项研究是对睡眠和儿童肥胖进行最全面的一次研究之一，青少年在婴儿和童年时期没有得到足够的睡眠，更有可能在七岁的时候发胖。</p>
          <p>每个孩子在睡觉时都有生长激素分泌。越小的孩子可能睡的时间要长，比如吃奶的孩子要保证10个小时以上的睡眠甚至还要再长一些，学龄前的孩子可能稍微要短一些，但也要保证7—9小时。到初中高中，可能更接近成人的睡眠时间。如果小朋友，没有睡到7—9个小时，就属于睡眠不足，容易导致肥胖。</p>
          <p>在临床上发现很多原来睡觉打鼾的孩子，采取手术处理后，消除了打鼾症状后，食欲增高了，个头长的很快，孩子的身高和体重反而呈正向发展。</p>
        </div>
    </div>
  </div>
</template>
<script>
import { apiArticleReading } from '@/services/api/index_cs'
export default {
  data () {
    return {
      imgList: [
        'articleimage/21/' + 1 + '.png',
        'articleimage/21/' + 2 + '.png',
        'articleimage/21/' + 3 + '.png',
        'articleimage/21/' + 4 + '.png',
        'articleimage/21/' + 5 + '.png'
      ],
      timer: '',
      time: '',
      clickCount: 0
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  mounted () {
    this.initTimer()
  },
  beforeDestroy () {
    this.destoryTimer()
  },
  methods: {
    initTimer () {
      this.timer = setInterval(() => { this.getReading() }, 10000)
    },
    destoryTimer () {
      clearInterval(this.timer)
    },
    getReading () {
      apiArticleReading(21)
        .then(res => {})
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
