export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type DateComparisonExp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _containedIn?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _hasKey?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _hasKeysAll?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _hasKeysAny?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_profiles" */
export type UserProfiles = {
  __typename?: 'UserProfiles';
  aboutMe?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "user_profiles" */
export type UserProfilesAggregate = {
  __typename?: 'UserProfilesAggregate';
  aggregate?: Maybe<UserProfilesAggregateFields>;
  nodes: Array<UserProfiles>;
};

/** aggregate fields of "user_profiles" */
export type UserProfilesAggregateFields = {
  __typename?: 'UserProfilesAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<UserProfilesMaxFields>;
  min?: Maybe<UserProfilesMinFields>;
};


/** aggregate fields of "user_profiles" */
export type UserProfilesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UserProfilesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_profiles". All fields are combined with a logical 'AND'. */
export type UserProfilesBoolExp = {
  _and?: InputMaybe<Array<UserProfilesBoolExp>>;
  _not?: InputMaybe<UserProfilesBoolExp>;
  _or?: InputMaybe<Array<UserProfilesBoolExp>>;
  aboutMe?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  deletedAt?: InputMaybe<TimestamptzComparisonExp>;
  fullName?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  profileImageUrl?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  username?: InputMaybe<StringComparisonExp>;
};

/** input type for inserting data into table "user_profiles" */
export type UserProfilesInsertInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  fullName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type UserProfilesMaxFields = {
  __typename?: 'UserProfilesMaxFields';
  aboutMe?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type UserProfilesMinFields = {
  __typename?: 'UserProfilesMinFields';
  aboutMe?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_profiles" */
export type UserProfilesMutationResponse = {
  __typename?: 'UserProfilesMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserProfiles>;
};

/** Ordering options when selecting data from "user_profiles". */
export type UserProfilesOrderBy = {
  aboutMe?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  deletedAt?: InputMaybe<OrderBy>;
  fullName?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  profileImageUrl?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  username?: InputMaybe<OrderBy>;
};

/** select columns of table "user_profiles" */
export enum UserProfilesSelectColumn {
  /** column name */
  AboutMe = 'aboutMe',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  FullName = 'fullName',
  /** column name */
  Id = 'id',
  /** column name */
  ProfileImageUrl = 'profileImageUrl',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user_profiles" */
export type UserProfilesSetInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  fullName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "user_profiles" */
export type UserProfilesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UserProfilesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserProfilesStreamCursorValueInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  fullName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserProfilesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UserProfilesSetInput>;
  /** filter the rows which have to be updated */
  where: UserProfilesBoolExp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'Users';
  aboutMe: Scalars['String'];
  birthday?: Maybe<Scalars['date']>;
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email: Scalars['String'];
  firebaseId: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['uuid'];
  lastAuthProvider: Scalars['String'];
  lastName: Scalars['String'];
  originalAuthProvider: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  profileImageUrl: Scalars['String'];
  signupProviderData?: Maybe<Scalars['jsonb']>;
  stripeCustomerId: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  username?: Maybe<Scalars['String']>;
  zipcode: Scalars['String'];
};


/** columns and relationships of "users" */
export type UsersSignupProviderDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UsersAppendInput = {
  signupProviderData?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  aboutMe?: InputMaybe<StringComparisonExp>;
  birthday?: InputMaybe<DateComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  deletedAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  firebaseId?: InputMaybe<StringComparisonExp>;
  firstName?: InputMaybe<StringComparisonExp>;
  fullName?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  lastAuthProvider?: InputMaybe<StringComparisonExp>;
  lastName?: InputMaybe<StringComparisonExp>;
  originalAuthProvider?: InputMaybe<StringComparisonExp>;
  phoneNumber?: InputMaybe<StringComparisonExp>;
  profileImageUrl?: InputMaybe<StringComparisonExp>;
  signupProviderData?: InputMaybe<JsonbComparisonExp>;
  stripeCustomerId?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  username?: InputMaybe<StringComparisonExp>;
  zipcode?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "firebase_id" */
  UsersFirebaseIdKey = 'users_firebase_id_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "stripe_customer_id" */
  UsersStripeCustomerIdKey = 'users_stripe_customer_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UsersDeleteAtPathInput = {
  signupProviderData?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UsersDeleteElemInput = {
  signupProviderData?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UsersDeleteKeyInput = {
  signupProviderData?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['date']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  firebaseId?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastAuthProvider?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  originalAuthProvider?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  signupProviderData?: InputMaybe<Scalars['jsonb']>;
  stripeCustomerId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  aboutMe?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['date']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  firebaseId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  lastAuthProvider?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  originalAuthProvider?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  aboutMe?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['date']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  firebaseId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  lastAuthProvider?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  originalAuthProvider?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  updateColumns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  aboutMe?: InputMaybe<OrderBy>;
  birthday?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  deletedAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  firebaseId?: InputMaybe<OrderBy>;
  firstName?: InputMaybe<OrderBy>;
  fullName?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  lastAuthProvider?: InputMaybe<OrderBy>;
  lastName?: InputMaybe<OrderBy>;
  originalAuthProvider?: InputMaybe<OrderBy>;
  phoneNumber?: InputMaybe<OrderBy>;
  profileImageUrl?: InputMaybe<OrderBy>;
  signupProviderData?: InputMaybe<OrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  username?: InputMaybe<OrderBy>;
  zipcode?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UsersPrependInput = {
  signupProviderData?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  AboutMe = 'aboutMe',
  /** column name */
  Birthday = 'birthday',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Email = 'email',
  /** column name */
  FirebaseId = 'firebaseId',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  FullName = 'fullName',
  /** column name */
  Id = 'id',
  /** column name */
  LastAuthProvider = 'lastAuthProvider',
  /** column name */
  LastName = 'lastName',
  /** column name */
  OriginalAuthProvider = 'originalAuthProvider',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  ProfileImageUrl = 'profileImageUrl',
  /** column name */
  SignupProviderData = 'signupProviderData',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Zipcode = 'zipcode'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['date']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  firebaseId?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastAuthProvider?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  originalAuthProvider?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  signupProviderData?: InputMaybe<Scalars['jsonb']>;
  stripeCustomerId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "users" */
export type UsersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStreamCursorValueInput = {
  aboutMe?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['date']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  firebaseId?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastAuthProvider?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  originalAuthProvider?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  signupProviderData?: InputMaybe<Scalars['jsonb']>;
  stripeCustomerId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  AboutMe = 'aboutMe',
  /** column name */
  Birthday = 'birthday',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Email = 'email',
  /** column name */
  FirebaseId = 'firebaseId',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  FullName = 'fullName',
  /** column name */
  Id = 'id',
  /** column name */
  LastAuthProvider = 'lastAuthProvider',
  /** column name */
  LastName = 'lastName',
  /** column name */
  OriginalAuthProvider = 'originalAuthProvider',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  ProfileImageUrl = 'profileImageUrl',
  /** column name */
  SignupProviderData = 'signupProviderData',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Zipcode = 'zipcode'
}

export type UsersUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<UsersAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<UsersDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<UsersDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<UsersDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<UsersPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "user_profiles" */
  deleteUserProfiles?: Maybe<UserProfilesMutationResponse>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** insert data into the table: "user_profiles" */
  insertUserProfiles?: Maybe<UserProfilesMutationResponse>;
  /** insert a single row into the table: "user_profiles" */
  insertUserProfilesOne?: Maybe<UserProfiles>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** update data of the table: "user_profiles" */
  updateUserProfiles?: Maybe<UserProfilesMutationResponse>;
  /** update multiples rows of table: "user_profiles" */
  updateUserProfilesMany?: Maybe<Array<Maybe<UserProfilesMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteUserProfilesArgs = {
  where: UserProfilesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertUserProfilesArgs = {
  objects: Array<UserProfilesInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertUserProfilesOneArgs = {
  object: UserProfilesInsertInput;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateUserProfilesArgs = {
  _set?: InputMaybe<UserProfilesSetInput>;
  where: UserProfilesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUserProfilesManyArgs = {
  updates: Array<UserProfilesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _append?: InputMaybe<UsersAppendInput>;
  _deleteAtPath?: InputMaybe<UsersDeleteAtPathInput>;
  _deleteElem?: InputMaybe<UsersDeleteElemInput>;
  _deleteKey?: InputMaybe<UsersDeleteKeyInput>;
  _prepend?: InputMaybe<UsersPrependInput>;
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersByPkArgs = {
  _append?: InputMaybe<UsersAppendInput>;
  _deleteAtPath?: InputMaybe<UsersDeleteAtPathInput>;
  _deleteElem?: InputMaybe<UsersDeleteElemInput>;
  _deleteKey?: InputMaybe<UsersDeleteKeyInput>;
  _prepend?: InputMaybe<UsersPrependInput>;
  _set?: InputMaybe<UsersSetInput>;
  pkColumns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "user_profiles" */
  userProfiles: Array<UserProfiles>;
  /** fetch aggregated fields from the table: "user_profiles" */
  userProfilesAggregate: UserProfilesAggregate;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type Query_RootUserProfilesArgs = {
  distinctOn?: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserProfilesOrderBy>>;
  where?: InputMaybe<UserProfilesBoolExp>;
};


export type Query_RootUserProfilesAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserProfilesOrderBy>>;
  where?: InputMaybe<UserProfilesBoolExp>;
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersByPkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "user_profiles" */
  userProfiles: Array<UserProfiles>;
  /** fetch aggregated fields from the table: "user_profiles" */
  userProfilesAggregate: UserProfilesAggregate;
  /** fetch data from the table in a streaming manner: "user_profiles" */
  userProfilesStream: Array<UserProfiles>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  usersStream: Array<Users>;
};


export type Subscription_RootUserProfilesArgs = {
  distinctOn?: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserProfilesOrderBy>>;
  where?: InputMaybe<UserProfilesBoolExp>;
};


export type Subscription_RootUserProfilesAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserProfilesOrderBy>>;
  where?: InputMaybe<UserProfilesBoolExp>;
};


export type Subscription_RootUserProfilesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<UserProfilesStreamCursorInput>>;
  where?: InputMaybe<UserProfilesBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<UsersStreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

export type GetViewerByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetViewerByIdQuery = { __typename?: 'query_root', usersByPk?: { __typename?: 'Users', createdAt: any, email: string, id: any, stripeCustomerId: string, updatedAt: any, fullName: string, username?: string | null } | null };
