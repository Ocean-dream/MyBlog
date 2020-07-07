<template>
  <div class="box">
    <el-card class="box-card">
      <div class="amap-page-container">
        <el-amap
          vid="amapDemo"
          :center="center"
          :zoom="zoom"
          :mapStyle="mapStyle"
          class="amap-demo"
          :events="events">
        </el-amap>
      </div>
    </el-card>
  </div>
</template>
<script>
import AMap from 'vue-amap'
export default {
  data () {
    return {
      mapStyle: 'amap://styles/fresh',
      zoom: 3,
      center: [121.59996, 31.197646],
      address: '',
      events: {
        click (e) {
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      },
      lng: 0,
      lat: 0
    }
  }
}
</script>
<style scoped>
.box{
  width: 100%;
}
.amap-page-container{
  margin: 0 auto;
  width: 100%;
  height: 800px;
}
</style>
