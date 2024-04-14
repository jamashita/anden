import type { ObjectLiteral } from '../../type/index.js';
import { Entity } from '../Entity.js';
import { Objet } from '../Objet.js';

export class MockEntity<V> extends Entity<V> {
  private readonly id: V;
  private other: ObjectLiteral;

  public constructor(id: V, other: ObjectLiteral) {
    super();
    this.id = id;
    this.other = other;
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
