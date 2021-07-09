import { ObjectLiteral } from '@jamashita/anden-type';
import { Entity } from '../Entity.js';
import { Objet } from '../Objet.js';

export class MockEntity<V> extends Entity<V, MockEntity<V>, 'MockEntity'> {
  public readonly noun: 'MockEntity' = 'MockEntity';
  private readonly id: V;
  private other: ObjectLiteral;

  public constructor(id: V, other: ObjectLiteral) {
    super();
    this.id = id;
    this.other = other;
  }

  public duplicate(): MockEntity<V> {
    return new MockEntity<V>(this.id, this.other);
  }

  public getIdentifier(): V {
    return this.id;
  }

  public serialize(): string {
    return `${Objet.identify(this.id)}, ${JSON.stringify(this.other)}`;
  }

  public setObject(obj: ObjectLiteral): void {
    this.other = obj;
  }
}
