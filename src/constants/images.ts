import { ImageSourcePropType } from "react-native";

const Images: Record<string, ImageSourcePropType> = {
  backgroundPattern: require("../assets/images/background_pattern.png"),
  brandName: require("../assets/images/brandName.png"),
  frame1: require("../assets/images/dummyImages/frame1.png"),
  loginLogo: require("../assets/images/loginLogo.png"),
  offerImage: require("../assets/images/offerImage.png"),
  placeholder1: require("../assets/images/dummyImages/placeholder1.png"),
  placeholder2: require("../assets/images/dummyImages/placeholder2.png"),
  placeholder3: require("../assets/images/dummyImages/placeholder3.png"),
  placeholder4: require("../assets/images/dummyImages/placeholder4.png"),
  search: require("../assets/images/search.png"),
  shopping: require("../assets/images/shopping.png"),
  square: require("../assets/images/square.png"),
  user: require("../assets/images/user.png"),
};

const Icons: Record<string, ImageSourcePropType> = {
  eyeShow: require("../assets/icons/eyeShow.png"),
  facebook: require("../assets/icons/facebookIcon.png"),
  google: require("../assets/icons/googleIcon.png"),
  leftArrow: require("../assets/icons/left-arrow.png"),
};

const Tabs: Record<string, ImageSourcePropType> = {
  tabHome: require("../assets/tabs/home.png"),
  tabCategory: require("../assets/tabs/category.png"),
  tabCart: require("../assets/tabs/cart.png"),
  tabProfile: require("../assets/tabs/profile.png"),
};

export { Icons, Tabs };
export default Images;
