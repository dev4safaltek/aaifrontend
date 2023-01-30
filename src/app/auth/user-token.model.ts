import { IAutoMapper } from "../core/automapper/interfaces";
import { StringHelper } from "../Utilities/contract/string-helper";

export const mapUserToken = (automapper: IAutoMapper): void => {
     automapper
    .createMap("default", "UserToken")
    .forMember("userID", (o: { userID: any; }) => o.userID)
    .forMember("userName", (o: { userName: any; }) => o.userName)
    .forMember("fullUserName", (o: { fullUserName: any; }) => o.fullUserName)
    .forMember("comment", (o: { comment: any; }) => o.comment)
    .forMember("userIP", (o: { userIP: any; }) => o.userIP)
    .forMember("email", (o: { email: any; }) => o.email)
    .forMember("phone", (o: { phone: any; }) => o.phone)
    .forMember("firstName", (o: { firstName: any; }) => o.firstName)
    .forMember("lastName", (o: { lastName: any; }) => o.lastName)
    .forMember("userType", (o: { userType: any; }) => o.userType)
    .forMember("profile", (o: { profile: any; }) => o.profile)
    .forMember("address", (o: { address: any; }) => o.address)
    .forMember("isSubscribed", (o: { isSubscribed: any; }) => o.isSubscribed)
    .forMember("subscribedFrom", (o: { subscribedFrom: any; }) => o.subscribedFrom)
    .forMember("subscribedTo", (o: { subscribedTo: any; }) => o.subscribedTo);
};

export class UserToken {
  userId: any;
  userName: any;
  fullUserName: any;
  userIP: any;
  accessToken: any;
  phone:any;
  email:any;
  firstName:any;
  lastName:any;
  userType:any;
  profile:any;
  address:any;
  isSubscribed:any;
  subscribedFrom:any;
  subscribedTo:any
  constructor(options: {
    userId: any;
    userName?: string;
    fullUserName?: string;
    userIP?: string;
    accessToken?: string;
    phone?:any;
    email?:any;
    firstName?:any;
    lastName?:any;
    userType?:any;
    profile?:any;
    address?:any;
    isSubscribed?:any;
    subscribedFrom?:any;
    subscribedTo?:any;
  } = {userId: undefined}) {

    this.userId = options.userId;
    this.userName = options.userName;
    this.userIP = options.userIP;
    this.fullUserName = options.firstName +" "+ options.lastName;
    this.accessToken = options.accessToken;
    this.phone = options.phone;
    this.email = options.email;
    this.userType = options.userType;
    this.profile = options.profile;
    this.address = options.address;
    this.isSubscribed = options.isSubscribed;
    this.subscribedFrom = options.subscribedFrom;
    this.subscribedTo = options.subscribedTo;
  }

  get isAuthenticated(): boolean {
    return StringHelper.isAvailable(this.userName);
  }
}
