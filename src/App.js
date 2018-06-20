import { createElement, Component } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles1 from "./App.css";
import Image from "rax-image";
import Slider from "rax-slider";
import Touchable from "rax-touchable";

import cardIcon from "./assets/card.png";
import gradeIcon from "./assets/chenji.png";
import eleIcon from "./assets/dianfei.png";
import websiteIcon from "./assets/website.png";
import infoIcon from "./assets/info.png";
import notiIcon from "./assets/noti.png";
import calIcon from "./assets/cal.png";
import bannerPlaceholder from "./assets/banner-placeholder.png";

const stream = require("@weex-module/stream");
const navigator = require("@weex-module/navigator");
const test = require("@weex-module/test");

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

function  foo (params) {
  alert(params)
}

class App extends Component {
  state = {
    banners: []
  };

  componentWillMount() {
    // test.mainLogin("444", 'fff', foo)
    // test.getGrade("2014", '3', foo)
    let requestOptions = {
      method: "GET",
      url: "https://ccnubox.muxixyz.com/api/ios/banner/"
    };

    stream.fetch(requestOptions, ret => {
      if (ret.ok) {
        this.setState({
          banners: JSON.parse(ret.data)
        });
      }
    });
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
                test.push(banner.url)
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
        <View style={styles1.content}>
          <View style={[styles1.item, styles1.item_top]}>
            <Touchable
              style={styles1.item}
              onPress={() => {
                test.push("ccnubox://grade")
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
                test.push("ccnubox://ele")
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
                test.push("ccnubox://card")
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
                test.push("ccnubox://cal")
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
                test.push("ccnubox://noti")
              }}
            >
              <Image style={[styles1.noti_icon]} source={notiIcon} />
              <Text style={[styles1.item_font]}>通知公告</Text>
            </Touchable>
          </View>
          <View style={styles1.item}>
            <Touchable
              style={styles1.item}
              onPress={() => {
                test.push("ccnubox://info")
              }}
            >
              <Image style={[styles1.info_icon]} source={infoIcon} />
              <Text style={[styles1.item_font]}>部门作息</Text>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}

export default App;
