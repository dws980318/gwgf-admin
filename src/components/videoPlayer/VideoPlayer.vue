<template>
  <div class="video_player" v-if="show">
      <div class="player_box">
        <video-player  class="video-player-box"
                       ref="videoPlayer"
                       :options="playerOptions"
                       :playsinline="true"
                       customEventName="customstatechangedeventname"
                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @statechanged="playerStateChanged($event)"
                       @ready="playerReadied">
        </video-player>
      </div>
<!--    </el-dialog>-->
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'

  import { videoPlayer } from 'vue-video-player'

  export default {
    name: "VideoPlayer",
    props: {
      dialogAdd: Object,
      sourcesObj: Object
    },
    components: {
      videoPlayer
    },
    data() {
      return {
        show: false,
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [],
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: false  //全屏按钮
          }
        }
      }
    },
    // mounted() {
    //   console.log('this is current player instance object', this.player)
    // },
    mounted() {
      this.$nextTick(() => {
        if(this.sourcesObj) {
          this.playerOptions.poster = this.sourcesObj.img
          this.playerOptions.sources[0]={
            src: this.sourcesObj.video,  // 路径
            type: 'video/mp4'  // 类型
          }
        }
      })
    },
    watch: {
      'dialogAdd.show'(val, oldVal) {
        this.show = val
      },
      'form.video'(val,oldVal) {
        console.log(111)
        console.log(val)
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      closePanel() {
        this.dialogAdd.show = false
      },
      videoplay() {
        this.player.play()
      },
      videopause() {
        this.player.pause()
      },
      // videostop() {
      //   this.player.requestFullscreen()
      // },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    }
  }
</script>

<style scoped>
  .player_box{
    width: auto;
    height: auto;
    max-width: 910px;
  }
.video-player-box{
  /*pointer-events: none;*/
  min-width: 640px;
  width: 100%;
  height: auto;
}

</style>
