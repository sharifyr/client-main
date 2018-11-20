export abstract class IHttp {
    public Get!: (url: string) => Promise<any>;
    public Delete!: (url: string) => Promise<any>;
    public Post!: (url: string, data: any) => Promise<any>;
    public Put!: (url: string, data: any) => Promise<any>;
}
