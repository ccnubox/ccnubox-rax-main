import { createElement, Component } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles1 from "./App.css";
import Image from "rax-image";
import Slider from "rax-slider";
import Touchable from "rax-touchable";
import ScrollView from "rax-scrollview";
import Notification from "../box-ui/common/notification";
import { confirm } from "../box-ui/common/modal";
import BannerService from "./services/banner";

import cardIcon from "./assets/card.png";
import gradeIcon from "./assets/chenji.png";
import eleIcon from "./assets/dianfei.png";
import websiteIcon from "./assets/website.png";
import xueerIcon from "./assets/xueer.png";
import gpaIcon from "./assets/gpa.png";
import cengkeIcon from "./assets/cengke.png";
import infoIcon from "./assets/info.png";
import notiIcon from "./assets/noti.png";
import calIcon from "./assets/cal.png";
import idleIcon from "./assets/idle.png";
import bannerPlaceholder from "./assets/banner-placeholder.png";

const native = require("@weex-module/test");

let styles = {
  slider: {
    width: 750,
    position: "relative",
    overflow: "hidden",
    height: 300,
    backgroundColor: "#cccccc"
  },
  itemWrap: {
    width: 750,
    height: 300
  },
  image: {
    width: 750,
    height: 300
  },
  button: {
    marginTop: 20,
    width: 340,
    height: 80
  },
  paginationStyle: {
    position: "absolute",
    width: 750,
    height: 40,
    bottom: 20,
    left: 0,
    itemColor: "rgba(255, 255, 255, 0.5)",
    itemSelectedColor: "rgb(255, 80, 0)",
    itemSize: 16
  }
};

class App extends Component {
  state = {
    banners: []
  };

  getBannerList() {
    BannerService.getList().then(data => {
      this.setState({
        banners: data
      });
    });
    // .catch(err => {
    //   confirm(`服务端错误: ${err.status}`, "重试", "取消").then(val => {
    //     if (val > 0) {
    //       this.getBannerList();
    //     }
    //   });
    // });
  }

  componentWillMount() {
    this.getBannerList();
    native.log("v2.0.0-beta2");
  }

  navToEle(eleInfo) {
    if (eleInfo) {
      native.push(
        `ccnubox://ele.result?building=${eleInfo.building}&region=${
          eleInfo.region
        }&dorm=${eleInfo.dorm}`
      );
    } else {
      native.push("ccnubox://ele.main");
    }
  }

  render() {
    let bannerViews = [];
    if (this.state.banners.length === 0) {
      bannerViews.push(
        <View style={styles.itemWrap}>
          <Image style={styles.image} source={bannerPlaceholder} />
        </View>
      );
    } else {
      bannerViews = this.state.banners.map(banner => {
        return (
          <View style={styles.itemWrap}>
            <Touchable
              style={styles.itemWrap}
              onPress={() => {
                native.push(banner.url);
                native.reportInsightUserEvent(
                  "bannerClick",
                  "",
                  "",
                  banner.url
                );
              }}
            >
              <Image
                style={styles.image}
                source={{
                  uri: banner.img
                }}
              />
            </Touchable>
          </View>
        );
      });
    }

    return (
      <ScrollView
        style={{
          height: screen.height
        }}
      >
        <Notification pageId="com.muxistudio.main" />
        <View style={styles1.app}>
          <Slider
            className="slider"
            width="750rem"
            height="300rem"
            style={styles.slider}
            autoPlay={true}
            loop={true}
            showsPagination={true}
            paginationStyle={styles.paginationStyle}
            autoplayTimeout={3000}
            onChange={this.onchange}
          >
            {bannerViews}
          </Slider>
          <View style={[styles1.content, styles1.content_first]}>
            <View style={[styles1.item, styles1.item_top]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.checkLogin(ret => {
                    if (ret) {
                      native.getStuInfo(ret => {
                        if (ret.code === "200") {
                          native.push(
                            `ccnubox://grade.main?sid=${ret.sid}&pwd=${ret.pwd}`
                          );
                        } else {
                          native.push("ccnubox://login");
                        }
                      });
                    } else {
                      native.push("ccnubox://login");
                    }
                  });
                }}
              >
                <Image style={[styles1.grade_icon]} source={gradeIcon} />
                <Text style={[styles1.item_font]}>成绩查询</Text>
              </Touchable>
            </View>
            <View style={[styles1.item, styles1.item_top]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.getDormInfo(this.navToEle);
                }}
              >
                <Image style={[styles1.ele_icon]} source={eleIcon} />
                <Text style={[styles1.item_font]}>电费查询</Text>
              </Touchable>
            </View>
            <View style={[styles1.item, styles1.item_top]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.checkLogin(ret => {
                    if (ret) {
                      native.push(`ccnubox://card?sid=${ret}`);
                    } else {
                      native.push("ccnubox://login");
                    }
                  });
                }}
              >
                <Image style={[styles1.card_icon]} source={cardIcon} />
                <Text style={[styles1.item_font]}>校园卡</Text>
              </Touchable>
            </View>
            <View style={[styles1.item]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.push("ccnubox://calendar");
                }}
              >
                <Image style={[styles1.cal_icon]} source={calIcon} />
                <Text style={[styles1.item_font]}>校历</Text>
              </Touchable>
            </View>

            <View style={styles1.item}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.checkLogin(ret => {
                    if (ret) {
                      native.getStuInfo(ret => {
                        if (ret.code === "200") {
                          native.push(
                            `ccnubox://gpa.main?sid=${ret.sid}&pwd=${ret.pwd}`
                          );
                        } else {
                          native.push("ccnubox://login");
                        }
                      });
                    } else {
                      native.push("ccnubox://login");
                    }
                  });
                }}
              >
                <Image style={[styles1.gpa_icon]} source={gpaIcon} />
                <Text style={[styles1.item_font]}>学分绩</Text>
              </Touchable>
            </View>

            <View style={[styles1.item]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.push("ccnubox://website");
                }}
              >
                <Image style={[styles1.website_icon]} source={websiteIcon} />
                <Text style={[styles1.item_font]}>常用网站</Text>
              </Touchable>
            </View>
          </View>

          <View style={styles1.content}>
            <View style={[styles1.item, styles1.item_top]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.push("ccnubox://noti.list");
                }}
              >
                <Image style={[styles1.noti_icon]} source={notiIcon} />
                <Text style={[styles1.item_font]}>通知公告</Text>
              </Touchable>
            </View>

            <View style={[styles1.item, styles1.item_top]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.push("ccnubox://classroom.main");
                }}
              >
                <Image style={[styles1.idle_icon]} source={idleIcon} />
                <Text style={[styles1.item_font]}>空闲教室</Text>
              </Touchable>
            </View>

            <View style={[styles1.item, styles1.item_top]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.push("ccnubox://cengke.main");
                }}
              >
                <Image style={[styles1.cengke_icon]} source={cengkeIcon} />
                <Text style={[styles1.item_font]}>蹭课</Text>
              </Touchable>
            </View>
            <View style={styles1.item}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.push("ccnubox://info");
                }}
              >
                <Image style={[styles1.info_icon]} source={infoIcon} />
                <Text style={[styles1.item_font]}>部门作息</Text>
              </Touchable>
            </View>
            <View style={[styles1.item, styles1.item_top]}>
              <Touchable
                style={styles1.item}
                onPress={() => {
                  native.push("https://xueer.muxixyz.com");
                }}
              >
                <Image style={[styles1.xueer_icon]} source={xueerIcon} />
                <Text style={[styles1.item_font]}>学而</Text>
              </Touchable>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default App;
