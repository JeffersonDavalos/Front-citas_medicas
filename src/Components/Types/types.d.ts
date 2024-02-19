import { IconType } from "react-icons";


export interface  SideBarMenuItem{
    id: String;
    label:String;
    icon:IconType;
    url: String;
}
 export interface SideBarMenuCard{
    id:string;
    displayName: String;
    photoUrl: String;
    title: String;
    url: String;
 }
