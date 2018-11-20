export abstract class ILogger {
    public info!: (...args: any[]) => void;
    public warn!: (...args: any[]) => void;
    public error!: (...args: any[]) => void;
    public debug!: (...args: any[]) => void;
}
