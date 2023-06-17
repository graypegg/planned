enum ComparisonResult {
  A_LOWER_THAN_B = -1,
  A_SAME_AS_B = 0,
  A_HIGHER_THAN_B = 1
}

export interface JSONUserResponse {
  age: number;
  country: string;
  email: string;
  name: { firstName: string; lastName: string };
}

export class User implements JSONUserResponse {
  public age
  public country
  public email
  public name

  constructor(singletonUser: JSONUserResponse) {
    this.age = singletonUser.age
    this.country = singletonUser.country
    this.email = singletonUser.email
    this.name = singletonUser.name
  }

  compareTo (other: User): ComparisonResult {
    const nameComparisonResult = this.getFullName().localeCompare(other.getFullName())

    if (nameComparisonResult === ComparisonResult.A_SAME_AS_B) {
      const diff = this.age - other.age
      if (diff > 0) return ComparisonResult.A_LOWER_THAN_B
      if (diff < 0) return ComparisonResult.A_HIGHER_THAN_B
      return ComparisonResult.A_SAME_AS_B
    }

    return nameComparisonResult
  }

  getFullName() {
    return `${this.name.firstName} ${this.name.lastName}`;
  }
}
