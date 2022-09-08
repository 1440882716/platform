<template>
  <Header></Header>
  <div class="flex-r flex-b">
    <!-- <div class="info-box">
      <div class="title-img fff font20">黄甲街道基本情况</div>
      <div class="m-t-18 font18 text-left line-height36">
        黄甲街道素有“中国麻羊之乡”美誉,幅员面积58.77平方公里,承载“中优”21.6平方公里、“南拓”37.2平方公里，辖7个社区,户籍人口2.6万人,常住人口10万人。区位交通便利。街道距成都市中心30分钟车程、双流国际机场15分钟车程,五环路在境内3.8公里，与正公路、西航港大道、航枢大道、天保大道等主通道形成“四纵四横”道路交通网络。产业支撑强劲。辖区40平方公里范围叠加承载中国(四川)内陆自由贸易试验区、航空经济区、天府国际生物城等重点产业功能区，4平方公里综保区全域处于黄甲范围。辖区企业2501家，以中电熊猫、通威太阳能、仁宝、纬创等74家龙头企业(规上企业66家)为代表的电子信息、航空制造、生物医药、绿色能源等高端制造业及现代服务业集群集聚。2020年，街道规上工业总产值222.86亿元，限上批发零售住宿餐饮业总产值56.56亿元，为双流GDP突破千亿目标作出了重大贡献。文旅资源丰厚。街道紧紧依托空港花田、黄甲麻羊等文旅资源,按照“文创+美食+旅游”思路,推进消费场景营造、土特产品营销、文旅项目引进，年接待游客超100万人次。社区治理有序。街道统筹社区、街区、景区、园区治理联动,形成了以“共享超市”“共享厨房”“共享菜园”、社区治理支持中心、双兴国际化社区等为代表的创新示范项目集群,在产业功能区社区治理机制、载体、项目创新上均走在了前列。
      </div>
      <div class="flex-r flex-b m-t-36">
        <div class="centent-box text-left">
          <div class="title-img fff font20">人大代表之家负责人</div>
          <div class="flex-r m-t-34">
            <img class="npc-img" src="../assets/img/peopel.png" alt="" />
            <div>
              <p class="title-color font24">晏巍</p>
              <div class="flex-r flex-b font18 m-t-16">
                <div class="deep-gray title-box">现任职位</div>
                <div class="title-color position">
                  黄甲街道党工委委员、 区人大常委会黄甲街道工委主任
                </div>
              </div>
              <div class="flex-r flex-b font18 m-t-16">
                <div class="deep-gray title-box">联系电话</div>
                <div class="title-color position">138 8021 8999</div>
              </div>
            </div>
          </div>
        </div>
        <div class="centent-box text-left">
          <div class="title-img fff font20">人大代表之家负责人</div>
          <div class="flex-r m-t-34">
            <img class="npc-img" src="../assets/img/peopel.png" alt="" />
            <div>
              <p class="title-color font24">晏巍</p>
              <div class="flex-r flex-b font18 m-t-16">
                <div class="deep-gray title-box">现任职位</div>
                <div class="title-color position">
                  黄甲街道党工委委员、 区人大常委会黄甲街道工委主任
                </div>
              </div>
              <div class="flex-r flex-b font18 m-t-16">
                <div class="deep-gray title-box">联系电话</div>
                <div class="title-color position">138 8021 8999</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 地图 -->
    <!-- <div class="map-img">
      <img src="../assets/img/map.png" alt="" @click="dialogVisible = true" />
    </div> -->
  </div>
  <!-- 弹框 -->
  <!-- <el-dialog v-model="dialogVisible" title="" width="70%">
    <div class="dialog-box flex-r">
      <div class="map-content">
        <div class="title-img fff font20">双华社区基本情况</div>
        <div class="m-t-56 font24 text-left">
          2004年6月，黄甲镇并村并组建社区，双华社区由原双华村和杨桥村组建而成。双华社区地处双流黄甲街道北面，幅员面积6.09平方公里，全域纳入西航港经济开发区范围。社区党委下设4个党支部(8个党小组)、125名党员；辖9个居民小组，1454户、4460人.现耕地面积276亩,按农村人口计算，0.063亩/人;除工业园区外，所剩农业区以种植业和养殖业为主。
        </div>
        <div class="font24 tab-red flex-r m-t-44">
          <div class="map-content-npc text-left">区人大代表</div>
          <span>2人（周洪彬、尹洪波）</span>
        </div>
        <div class="font24 tab-red flex-r m-t-16">
          <div class="map-content-npc text-left">选民</div>
          <span>3500人</span>
        </div>
      </div>
      <div>
        <img class="map-item" src="../assets/map/双华社区.svg" alt="" />
      </div>
    </div>
  </el-dialog> -->
  <div>
    <iframe
      src="src/static/map-page/index.html"
      scrolling="auto"
      frameborder="0"
      style="width: 100%; height: 900px"
    ></iframe>
  </div>
  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { ElMessageBox } from "element-plus"
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const dialogVisible = ref(false)
    const toDetail = () => {}
    onMounted(() => {
      let pageData = localStorage.getItem("mapData") as string
      let page = JSON.parse(pageData).url
      console.log(page)
    })
    return {
      dialogVisible,
      toDetail,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.info-box {
  width: 1138px;
  height: 678px;
  margin-top: 24px;
  margin-left: 24px;
  padding: 32px;
  background-color: #fff;
  border-radius: 16px;
}
.centent-box {
  width: 48%;
}
.title-img {
  width: 336px;
  height: 48px;
  line-height: 54px;
  background: url(../assets/img/info-icon.png) center center no-repeat;
  text-align: center;
}
.npc-img {
  width: 124px;
  height: 154px;
  border-radius: 8px;
  margin-right: 20px;
}
.title-box {
  width: 72px;
  height: 27px;
}
.position {
  width: calc(100% - 86px);
}
.map-img {
  width: 523px;
  height: 738px;
  margin-top: 24px;
  margin-right: 77px;
}
/* 弹框 */
.dialog-box {
  width: 100%;
  height: 600px;
  background: url(../assets/img/map-pop2.png) center center no-repeat;
}
.map-item {
  width: 401px;
  height: 525px;
}
.map-content {
  width: 50%;
  padding: 0 50px;
}
.map-content-npc {
  width: 120px;
  margin-right: 60px;
}
</style>
