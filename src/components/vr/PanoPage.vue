<template>

   <el-row class="match-parent" >
     <el-col :span="12" id="pano" style="height: 100%; width: calc(100% -  231px)"  ></el-col>
     <el-col style="height: 100%; width: 230px"  >
       <Editor  v-if="showeditor" :panopo="panopo" />
     </el-col>
   </el-row>
</template>

<script>
  import HtmlPanel from "./HtmlPanel";
  import Editor from "./Editor2";
  import URLManager from './js/URLManager.js'
  import SQLManager from './js/SQLManager'
  import ModelManager from './js/ModelManager'

  export default {
    name: "PanoPage",
    components: {HtmlPanel, Editor},
    data() {
      return {
        showeditor: false,
        panopo: {},
      }
    },
    created() {

    },
    mounted: function () {

      let vrid = this.$route.query.vrid;
      vrid = "1";
      if (vrid) {
        //找到vr对象，用于编辑
        this.$store.commit("postFormDataCustom", {
          url: URLManager.findDataBySql(),
          formdata: ModelManager.newZTSQLFormtData(SQLManager.findKrpanoById(vrid)),
          callback: datas => {
            if (datas.length > 0) {
              this.panopo = datas[0];
              //找到网页，用于展示
              this.$store.commit("getCustom", {
                url: URLManager.findvrurlbyid() + vrid,
                callback: htmlurl => {
                  console.log(htmlurl);
                  let basicUrl = htmlurl.replace("tour.html", "");
                  this.jsUrl = basicUrl + 'tour.js';
                  this.tourSwfUrl = basicUrl + 'tour.swf';
                  this.tourXmlUrl = basicUrl + 'tour.xml';
                  this.init();
                }
              });
            }
          }
        });
      }
    },
    methods: {
      init() {
        let that = this;
        // 加载动态JS文件
        var _doc = document.getElementsByTagName('head')[0];
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', this.jsUrl);    // jsUrl是JS文件的路径
        _doc.appendChild(js);

        // 下面是加载全景图, 针对不同浏览器做兼容
        if (document.all) { //如果是IE

          js.onreadystatechange = function () {
            if (js.readyState == 'loaded' || js.readyState == 'complete') {
              embedpano({                // js插件中的方法，用于加载全景图
                swf: that.tourSwfUrl,
                xml: that.tourXmlUrl,
                target: "pano",
                html5: "always",
                mobilescale: 1.0,
                passQueryParameters: true
              });
              that.krpano = document.getElementById("krpanoSWFObject");
            }
          }
        } else {
          js.onload = function () {
            //embedpano({swf:"http://localhost:8090/tour.swf", xml:"http://localhost:8090/tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
            //embedpano({swf:"http://localhost:8090/tour.swf", xml:"http://localhost:8090/tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});

            embedpano({
              swf: that.tourSwfUrl,        // krpano全景图的swf文件路径
              xml: that.tourXmlUrl,        // krpano全景图的xml文件路径
              target: "pano",
              html5: "auto",
              mobilescale: 1.0,
              passQueryParameters: true
            });

            that.krpano = document.getElementById("krpanoSWFObject")        // 保存全景图对象
            setTimeout(() => {
              that.showeditor = true;
            }, 1)

          }
        }
      },
    }
  }
</script>

<style>
  @-ms-viewport {
    width: device-width;
  }

  @media only screen and (min-device-width: 800px) {
    html {
      overflow: hidden;
    }
  }

  html {
    height: 100%;
    overflow: hidden !important;
  }



  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    background-color: #333;
  }
</style>

