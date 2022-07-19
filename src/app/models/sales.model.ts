export class Sales {
  constructor(
    public description: string,
    public amount: number,
    public type: string,
    public id: string | null = null
  ) {}
}
