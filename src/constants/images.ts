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
};

const Icons: Record<string, ImageSourcePropType> = {
  eyeShow: require("../assets/icons/eyeShow.png"),
  facebook: require("../assets/icons/facebookIcon.png"),
  google: require("../assets/icons/googleIcon.png"),
  leftArrow: require("../assets/icons/left-arrow.png"),
  love: require("../assets/icons/love.png"),
  loveFilled: require("../assets/icons/loveFilled.png"),

  search: require("../assets/icons/search.png"),
  shopping: require("../assets/icons/shopping.png"),
  square: require("../assets/icons/square.png"),
  user: require("../assets/icons/user.png"),

  minus: require("../assets/icons/minus.png"),
  plus: require("../assets/icons/plus.png"),

  editProfile: require("../assets/icons/editProfile.png"),
  notifications: require("../assets/icons/notifications.png"),
  language: require("../assets/icons/language.png"),
  payment: require("../assets/icons/payment.png"),
  contactUs: require("../assets/icons/contactUs.png"),
  helpCenter: require("../assets/icons/helpCenter.png"),
  myOrders: require("../assets/icons/myOrders.png"),
  darklightMode: require("../assets/icons/darklightMode.png"),
  address: require("../assets/icons/address.png"),
  aboutUs: require("../assets/icons/aboutUs.png"),
  locatorMarker: require("../assets/icons/locatorMarker.png"),
  trash: require("../assets/icons/trash.png"),
};

const Tabs: Record<string, ImageSourcePropType> = {
  tabHome: require("../assets/tabs/home.png"),
  tabCategory: require("../assets/tabs/category.png"),
  tabFavorites: require("../assets/tabs/favorites.png"),
  tabCart: require("../assets/tabs/cart.png"),
  tabProfile: require("../assets/tabs/profile.png"),
};

export { Icons, Tabs };
export default Images;
