import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    storeId: bigint;
    name: string;
    description: string;
    price: bigint;
}
export interface Store {
    id: bigint;
    name: string;
    description: string;
    category: string;
}
export interface Review {
    productId: bigint;
    comment: string;
    rating: bigint;
    reviewer: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllStores(): Promise<Array<Store>>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: bigint): Promise<Product | null>;
    getProductsByStore(storeId: bigint): Promise<Array<Product>>;
    getReviews(productId: bigint): Promise<Array<Review>>;
    initialize(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(productIds: Array<bigint>, quantities: Array<bigint>, address: string): Promise<string>;
}
