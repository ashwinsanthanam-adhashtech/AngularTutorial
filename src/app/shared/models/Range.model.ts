export class Range {
    private readonly _min: number;
    private readonly _max: number;

    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
    }

    public get min(): number {
        return this._min;
    }

    public get max(): number {
        return this._max;
    }

    public get randomNumber(): number {
        const random = require('random');
        return random.int(this._min, this._max);
    }
}