
export class Level {
  public id: number;
  public name: string;
  public country_id: number;
  public level_id: number;
  public population: number;
  public population_year: number;
  public shape: File;
  public area: number;

  constructor() {
    this.id = null;
    this.name = null;
    this.country_id = null;
    this.population = null;
    this.population_year = null;
    this.level_id = null;
    this.area = null;
    this.shape = null;
  }
}
