// eslint-disable-next-line max-classes-per-file
import { asyncRandom } from '@jamashita/anden-helper';
import { ValidationRule } from '../../Rules/ValidationRule';
import { addRule, Validate } from '../Validate';

type TestValidationArgs = Readonly<{
  throwError: boolean;
}>;

class TestValidationRule implements ValidationRule {
  private readonly throwError: boolean;

  public constructor({ throwError }: TestValidationArgs) {
    this.throwError = throwError;
  }

  public evaluate(): void {
    if (this.throwError) {
      throw new TypeError('ERROR!');
    }
  }
}

const TestValidation = (args: TestValidationArgs): ParameterDecorator => {
  const v: TestValidationRule = new TestValidationRule(args);

  return (target: object, key: string | symbol, index: number) => {
    addRule(target, key, index, v);
  };
};

class Test1 {
  @Validate()
  public oneA(
    @TestValidation({ throwError: false }) arg1: unknown
  ): unknown {
    return arg1;
  }

  @Validate()
  public threeA(
    @TestValidation({ throwError: false }) _arg1: unknown,
    @TestValidation({ throwError: false }) _arg2: unknown,
    @TestValidation({ throwError: false }) arg3: unknown
  ): unknown {
    return arg3;
  }

  @Validate()
  public twoA(
    @TestValidation({ throwError: false }) _arg1: unknown,
    @TestValidation({ throwError: false }) arg2: unknown
  ): unknown {
    return arg2;
  }
}

class Test2 {
  @Validate()
  public oneA(
    @TestValidation({ throwError: true }) arg1: unknown
  ): unknown {
    return arg1;
  }

  @Validate()
  public threeA(
    @TestValidation({ throwError: true }) _arg1: unknown,
    @TestValidation({ throwError: false }) _arg2: unknown,
    @TestValidation({ throwError: false }) arg3: unknown
  ): unknown {
    return arg3;
  }

  @Validate()
  public twoA(
    @TestValidation({ throwError: true }) _arg1: unknown,
    @TestValidation({ throwError: false }) arg2: unknown
  ): unknown {
    return arg2;
  }
}

class Test3 {
  @Validate()
  public oneA(
    @TestValidation({ throwError: true }) arg1: unknown
  ): unknown {
    return arg1;
  }

  @Validate()
  public threeA(
    @TestValidation({ throwError: false }) _arg1: unknown,
    @TestValidation({ throwError: false }) _arg2: unknown,
    @TestValidation({ throwError: true }) arg3: unknown
  ): unknown {
    return arg3;
  }

  @Validate()
  public twoA(
    @TestValidation({ throwError: false }) _arg1: unknown,
    @TestValidation({ throwError: true }) arg2: unknown
  ): unknown {
    return arg2;
  }
}

class Test4 {
  @Validate()
  public oneA(
    @TestValidation({ throwError: true }) arg1: unknown
  ): unknown {
    return arg1;
  }

  @Validate()
  public threeA(
    @TestValidation({ throwError: true }) _arg1: unknown,
    @TestValidation({ throwError: true }) _arg2: unknown,
    @TestValidation({ throwError: true }) arg3: unknown
  ): unknown {
    return arg3;
  }

  @Validate()
  public twoA(
    @TestValidation({ throwError: true }) _arg1: unknown,
    @TestValidation({ throwError: true }) arg2: unknown
  ): unknown {
    return arg2;
  }
}

describe('Validate', () => {
  it('will not throw ValueError when any decorated args are not set to throw ValueError', () => {
    const test: Test1 = new Test1();

    expect(() => {
      test.oneA('');
    }).not.toThrow(TypeError);
    expect(() => {
      test.twoA('', '');
    }).not.toThrow(TypeError);
    expect(() => {
      test.threeA('', '', '');
    }).not.toThrow(TypeError);
  });

  it('returns the same value of its original return value', async () => {
    const [r1, r2, r3]: Array<string> = await Promise.all<string>([
      asyncRandom(200),
      asyncRandom(300),
      asyncRandom(400)
    ]);

    const test: Test1 = new Test1();

    expect(test.oneA(r1)).toBe(r1);
    expect(test.twoA(r1, r2)).toBe(r2);
    expect(test.threeA(r1, r2, r3)).toBe(r3);
  });

  it('will throw ValueError when each first decorated arg is set to throw ValueError', () => {
    const test: Test2 = new Test2();

    expect(() => {
      test.oneA('');
    }).toThrow(TypeError);
    expect(() => {
      test.twoA('', '');
    }).toThrow(TypeError);
    expect(() => {
      test.threeA('', '', '');
    }).toThrow(TypeError);
  });

  it('will throw ValueError when each last decorated arg is set to throw ValueError', () => {
    const test: Test3 = new Test3();

    expect(() => {
      test.oneA('');
    }).toThrow(TypeError);
    expect(() => {
      test.twoA('', '');
    }).toThrow(TypeError);
    expect(() => {
      test.threeA('', '', '');
    }).toThrow(TypeError);
  });

  it('will throw ValueError when all decorated args are set to throw ValueError', () => {
    const test: Test4 = new Test4();

    expect(() => {
      test.oneA('');
    }).toThrow(TypeError);
    expect(() => {
      test.twoA('', '');
    }).toThrow(TypeError);
    expect(() => {
      test.threeA('', '', '');
    }).toThrow(TypeError);
  });
});
