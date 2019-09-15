export type Constructor<T> = new (...args:any[]) => T;
export type Keys<T> = keyof T;
export type Method<T> = (...params:any[]) => T;
export type TypedMethod<T,U> = (...params:(T|any)[]) => U;
export type Callback<T> = (v:T) => void;
export type AsyncCallback<T> = (v:T) => Promise<void>;
export type Members<T> = {[k in Keys<T>]:T[k]};
export type Member<T> = Partial<T>;
export type Payload<T,K extends Keys<T>> = T[K];
export type PartialMap<T> = {[k:string]:Partial<T>};
export type PartialWithPartials<T> = Partial<{[k in keyof T]:Partial<T[k]>}>;

export type PureValue = string|number|boolean;
export type Primitive = PureValue|Function|{[k:string]:any;}|any[];
export type ReqValidationError = {msg:string;param:string;location:string;};
export type ReqValidationErrors = {errors:ReqValidationError[]};
export interface AppError extends Error {
  name:string;
  message:string;
  _message?:string;
  stack?:any;
  code?:number;
  status?:number;
  id?:string;
  level?:string;
  errors?:ReqValidationError[];}
export interface AppWarning extends AppError {warning:boolean;}
export class AppError extends Error {
  constructor(opts:any){
    super(opts.message);
    if(Error.captureStackTrace){Error.captureStackTrace(this,AppError);}
    Object.assign(this,opts);}
  json(){
    const {name,message,_message,code,status,errors} = this;
    return {name,message,_message,code,status,errors};}}
export class AppWarning extends AppError {
  constructor(opts:any){
    super(opts);
    if(Error.captureStackTrace) {Error.captureStackTrace(this,AppWarning);}
    this.warning = true;}
  json(){
    const {name,message,_message,code,status,errors} = this;
    return {name,message,_message,code,status,errors};}}
export type ErrorType = Error|AppError|AppWarning|ReqValidationErrors;
export type KnownType = Primitive|ErrorType|Date;

export type DataMap<T> = {[key:string]:T};
export type Primitives = DataMap<Primitive>;
export type PrimitiveKey = keyof Primitives;
export type Methods<T> = DataMap<Method<T>>;
export type TypedMethods<T,U> = DataMap<TypedMethod<T,U>>;
export type Values  = Primitives;
export type ValueMethods = Methods<KnownType>;
export type Strings = DataMap<string>;
export type StringMethods = Methods<string>;
export type Numbers = DataMap<number>;
export type Errors = DataMap<ErrorType>;
export type MiscInfo = DataMap<KnownType>;
export type TypeMap<K extends string,T> = {[k in K]:T};