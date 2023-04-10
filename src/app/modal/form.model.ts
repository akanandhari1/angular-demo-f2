import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';

export type OnChangeFn<T> = (value: T) => void;
export type OnTouchFn = () => void;
export type OnValidatorChangeFn = () => void;

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-explicit-any
export const noop: OnChangeFn<any> & OnTouchFn & OnValidatorChangeFn = () => {}; // NOSONAR

export interface TypedControlValueAccessor<T> extends ControlValueAccessor {
  writeValue(value: T): void;

  registerOnChange(fn: OnChangeFn<T>): void;

  registerOnTouched(fn: OnTouchFn): void;
}

/*

  Angular has planned to work on strict forms typing (currently, most types are `any`...).

  This is however not likely to happen soon, hence this file provides strict generic typing for
  reactive forms. It may be removed when Angular releases their update.

  See up-to-date Angular's roadmap advancement here:
  https://angular.io/guide/roadmap#strict-typing-for-angularforms

*/

/** */
export interface UpdateOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
}

/**
 * Extension to native Angular's AbstractControl adding generic typing, as Angular declares all as `any`...
 *
 * Angular has planned to work on strict forms typing (currently, most types are `any`...). This is
 * however not likely to happen soon, hence this file provides strict generic typing for reactive
 * forms. It may be removed when Angular releases their update. See up-to-date Angular's roadmap
 * advancement here: https://angular.io/guide/roadmap#strict-typing-for-angularforms
 *
 * @see https://angular.io/guide/roadmap#strict-typing-for-angularforms
 */
export interface TypedAbstractControl<T, PARTIAL = T> extends AbstractControl {
  readonly value: T;
  readonly valueChanges: Observable<T>;

  setValue(value: T, options?: UpdateOptions): void;

  patchValue(value: PARTIAL, options?: UpdateOptions): void;

  reset(value?: T, options?: UpdateOptions): void;
}

/**
 * Extension to native Angular's FormControl adding generic typing, as Angular declares all as `any`...
 *
 * @see https://angular.io/guide/roadmap#strict-typing-for-angularforms
 */
export interface TypedFormControl<T>
  extends TypedAbstractControl<T>,
    FormControl {
  readonly value: T;
  readonly valueChanges: Observable<T>;

  setValue(value: T, options?: UpdateOptions): void;

  patchValue(value: T, options?: UpdateOptions): void;

  reset(value?: T, options?: UpdateOptions): void;
}

/** Type of children controls of a form group */
export type ChildrenControls<T> = Record<keyof T, AbstractControl>;

/** Default type for children controls of a form group, resolves each child as a TypedAbstractControl */
export type DefaultChildrenControls<T> = {
  [P in keyof T]: TypedAbstractControl<T[P]>;
};

/**
 * Rich type for children controls of a form group, that resolves each child as a concrete type
 * depending of its value:
 * - if assignable to an array, defines it as a TypedFormArray
 * - if assignable to an object, defines it as a TypedFormGroup
 * - otherwise defines it as a TypedFormControl
 */
type DeepChildrenControl<T, P extends keyof T> = T[P] extends Array<infer E>
  ? TypedFormArray<E>
  : T[P] extends object
  ? TypedFormGroup<T[P]>
  : TypedFormControl<T[P]>;

/**
 * Extension type usable in place of DefaultChildrenControls, resolves some children as deep controls
 */
export type DeepChildrenControls<T, DEEP extends keyof T = keyof T> = {
  [P in keyof T]: P extends DEEP
    ? DeepChildrenControl<T, P>
    : TypedAbstractControl<T[P]>;
};

/**
 * Extension to native Angular's FormGroup adding generic typing, as Angular declares all as `any`...
 *
 * @see https://angular.io/guide/roadmap#strict-typing-for-angularforms
 */
export interface TypedFormGroup<
  T,
  PARTIAL = Partial<T>,
  CONTROLS extends ChildrenControls<T> = DefaultChildrenControls<T>
> extends TypedAbstractControl<T, PARTIAL>,
    FormGroup {
  /**
   * Partial value (because disabled fields are not included)
   *
   * @see getRawValue
   */
  readonly value: Readonly<Partial<T>>;

  /**
   * Observable partial value (because disabled fields are not included)
   *
   * @see getRawValue
   */
  readonly valueChanges: Observable<Readonly<Partial<T>>>;

  controls: CONTROLS;

  get<K extends keyof CONTROLS>(path: K | [K]): CONTROLS[K];

  get(
    path: Array<keyof CONTROLS | string | number> | keyof CONTROLS | string
  ): AbstractControl | null;

  setValue(value: T, options?: UpdateOptions): void;

  patchValue(value: PARTIAL, options?: UpdateOptions): void;

  reset(value?: T, options?: UpdateOptions): void;

  /** Full value of the form group */
  getRawValue(): Readonly<T>;
}

/**
 * Extension to native Angular's FormArray adding generic typing, as Angular declares all as `any`...
 *
 * @see https://angular.io/guide/roadmap#strict-typing-for-angularforms
 */
export interface TypedFormArray<
  T,
  PARTIAL = Partial<T>,
  C extends AbstractControl = TypedAbstractControl<T, PARTIAL>
> extends TypedAbstractControl<ReadonlyArray<T>, ReadonlyArray<PARTIAL>>,
    FormArray {
  readonly value: ReadonlyArray<T>;
  readonly valueChanges: Observable<ReadonlyArray<T>>;

  controls: C[];

  at(index: number): C;

  get(index: number): C;

  get(path: Array<string | number> | string): AbstractControl | null;

  setValue(value: T[], options?: UpdateOptions): void;

  patchValue(value: PARTIAL[], options?: UpdateOptions): void;

  reset(value?: T[], options?: UpdateOptions): void;

  getRawValue(): T[]; // Unable to use ReadonlyArray<T> here as base declaration is any[]...
}

/**
 * Shorthand type alias for an array of form groups
 *
 * @see https://angular.io/guide/roadmap#strict-typing-for-angularforms
 */
export type TypedFormGroupArray<
  T,
  PARTIAL = Partial<T>,
  CONTROLS extends ChildrenControls<T> = DefaultChildrenControls<T>
> = TypedFormArray<T, PARTIAL, TypedFormGroup<T, PARTIAL, CONTROLS>>;

/** Type alias of deep form groups for shorter type declaration */
export type DeepTypedFormGroupArray<
  T,
  DEEP extends keyof T,
  PARTIAL = Partial<T>
> = TypedFormGroupArray<T, PARTIAL, DeepChildrenControls<T, DEEP>>;

/** Type alias of deep form groups for shorter type declaration */
export type DeepTypedFormGroup<
  T,
  DEEP extends keyof T,
  PARTIAL = Partial<T>
> = TypedFormGroup<T, PARTIAL, DeepChildrenControls<T, DEEP>>;
