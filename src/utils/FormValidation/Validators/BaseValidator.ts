export class BaseValidator<T> {
    public value: T;
    private readonly name: string
    private isRequired: boolean = false;
    private minValue: number | undefined;
    private maxValue: number | undefined;
    public errors: string[] = []
    protected type = "text";

    public constructor(name: string) {
        this.name = name;
    }

    public getType() {
        return this.type;
    }

    getName(): string {
        return this.name;
    }

    required(): this {
        this.isRequired = true;
        return this;
    }

    validate(): boolean {
        if(this.isRequired && this.value == undefined) {
            this.errors.push(`${this.name} field is required`)
        }
        this.analyseMinMax();

        return this.errors.length === 0;
    }

    getMin(): number | undefined {
        return this.minValue;
    }

    min(min: number): this {
        this.minValue = min;
        return this;
    }

    max(max: number): this {
        this.maxValue = max;
        return this;
    }

    private analyseMinMax() {
        if(typeof this.value === 'string') {
            if(this.minValue !== undefined && this.value.length < this.minValue) {
                this.errors.push(`${this.name} must be at least ${this.minValue} long`)
            }
            if(this.maxValue !== undefined && this.value.length > this.maxValue) {
                this.errors.push(`${this.name} can only be ${this.maxValue} characters long`)
            }
        } else if(typeof this.value === 'number') {
            if(this.minValue !== undefined && this.value < this.minValue) {
                this.errors.push(`${this.name} must be at least ${this.minValue}`)
            }
            if(this.maxValue !== undefined && this.value > this.maxValue) {
                this.errors.push(`${this.name} has a maximum of ${this.maxValue}`)
            }
        }
    }
}
