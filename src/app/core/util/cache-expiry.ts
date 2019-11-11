export class CacheExpiry {
    private expiresAt = 0;

    constructor(private expirationTime = 60 * 1000) {
        this.refresh();
    }

    public get isExpired() {
        return this.expiresAt < Date.now();
    }

    public updated() {
        this.expiresAt = Date.now() + this.expirationTime;
    }
    public refresh(): void {
        this.expiresAt = 0;
    }
}
