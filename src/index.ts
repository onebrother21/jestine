import {Response} from "supertest";
import { Constructor, PureValue } from "./types";

export const desc = describe;
export const is = (a:any,b?:any) => b!==undefined?expect(a).toBe(b):expect(a).toBeDefined();
export const not = (a:any,b?:any) => b!==undefined?
expect(a).not.toBe(b):
expect(a).not.toBeDefined();
export const isNull = (a:any) => expect(a).toBeNull();
export const str = (a:string|any) => expect(typeof a).toBe("string");
export const num = (a:number|any) => expect(typeof a).toBe("number");
export const bool = (a:boolean|any) => expect(typeof a).toBe("boolean");
export const func = (a:Function|any) => expect(typeof a).toBe("function");
export const obj = (a:any) => expect(typeof a).toBe("object");
export const arr = (a:any) => expect(Array.isArray(a)).toBe(true);
export const instance = (a:any,b:Constructor<any>) => expect(a).toBeInstanceOf(b);
export const error = (o:any) => expect(o).toBeInstanceOf(Error);
export const noterror = (o:any) => expect(o).not.toBeInstanceOf(Error);
export const throws = (o:Function) => expect(o()).toThrow();
export const doesNotThrow = (o:Function) => expect(o()).not.toThrow();

export const eq = (a:number,b:number,c:number) => expect(a).toBeCloseTo(b,c||2);
export const ne = (a:number,b:number,c?:number) => expect(a).not.toBeCloseTo(b,c||2);
export const gt = (a:number,b:number) => expect(a).toBeGreaterThan(b);
export const lt = (a:number,b:number) => expect(a).toBeLessThan(b);
export const match = (a:string,b:RegExp) => expect(a).toMatch(b);
export const has = (a:string|PureValue[],b:PureValue) => expect(a).toContain(b);
export const hasArr = (a:string,b:string) => expect(a).toContain(b);
export const includes = (a:any[],b:any) => expect(a.includes(b)).toBe(true);
export const includesArr = (a:any[],b:any[]) => expect(b.every(o => a.includes(o))).toBe(true);
export const prop = (a:any,b:any) => expect(a).toHaveProperty(b);
export const truey = (o:any) => expect(o).toBeTruthy();
export const falsy = (o:any) => expect(o).toBeFalsy();

export type ResponseData = {
  cookieArr:string[];
  cookies:{[k:string]:any;};
  csrfToken?:string;
  authToken?:string;
  body?:any};
export const parseCookie = (cookieStr:string) => {
  const cookieObj:any = {name:"",cookie:{}};
  cookieStr
  .split(",")
  .map((p,i,a) => /Expires/.test(p)?(p = p.concat(",",a[i+1])):p)
  .filter((p,i) => !(i%2))
  .forEach((p,i) => {
    const o:any = {};
    let name = "_unknown_";
    p.split("; ").forEach((s,j) => {
      const k = s.split("=");
      if(!j){name = k[0];o["value"] = k[1];}
      else if(!k[1]){o[k[0].toLocaleLowerCase()] = true;}
      else{o[k[0].toLocaleLowerCase()] = k[1];}});
    cookieObj.name = name;
    cookieObj.cookie = o;});
  return cookieObj;};
export const parseCookieArray = (data:{cookieArr:string[];cookies:any;},arr:string[]) => {
  try{
    const cookieNames = [];
    if(!(arr&&arr.length)){return data;}
    else {
      for(let i=0;i<arr.length;i++){
        const {name,cookie} = parseCookie(arr[i]);
        cookie.index = i;
        cookieNames.push(name);
        data.cookies = Object.assign({},data.cookies,{[name]:cookie});}
      if(!data.cookieArr.length) data.cookieArr = arr;
      else {
        cookieNames.forEach((c,i) => {
          let didMatch = false,isMatch = false;
          const cookie = arr[i];
          data.cookieArr = data.cookieArr.map(k => {
            isMatch = new RegExp(c).test(k);
            didMatch = isMatch||didMatch;
            return isMatch?cookie:k;});
          !didMatch?data.cookieArr.push(cookie):null;});}}
      return data;}
  catch(e){console.error(e);throw e;}};
export const handleResponse = (data:ResponseData,res:Response) => {
  parseCookieArray(data,res.header["set-cookie"]);
  data.csrfToken = data.cookies["XSRF-TOKEN"]?data.cookies["XSRF-TOKEN"].value:"";
  data.body = res.body;
  return data;};
export const sleep = (n:number) => new Promise(done => setTimeout(done,n));