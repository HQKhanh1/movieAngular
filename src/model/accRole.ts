export class AccRole {
  id: number;
  name: string;

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
