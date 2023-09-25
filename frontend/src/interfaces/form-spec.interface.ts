export interface FormSpecData {
  formSpec: FormSpec;
  draft: Draft;
}

export interface Report {
  items: FilledItem[];
}

interface FilledItem {
  value: string; // fieldvalue
  aspects: any; // met period, startDate etc
  concept: { namespaceUri: string; localPart: string }; // the id
  entityIdentifier: { scheme: string; value: string };
  dimensions: Dimension[]; // in nieuwe NT's bevatten dimensions een domain-member
}

export interface Dimension {
  dimension: TypedDimension;
  member: PurpleMember | FluffyMember;
}

export interface TypedDimension {
  namespaceUri: string;
  localPart: string;
}

export interface PurpleMember {
  namespaceUri: string;
  localPart: string;
  type: MemberType;
}

export interface FluffyMember {
  elementName: TypedDimension;
  text: Text;
  type: MemberType;
}

export enum MemberType {
  Explicit = 'explicit',
  Typed = 'typed',
}

export interface FormSpec {
  formSpecVersion: Version;
  configuration: {
    flattenedTables: boolean;
    excludedFormulas: [];
    tableElrs: [];
  };
  metadata: Metadata;
  navigation: NavigationAbstract; // new
  formSections: FormSection[];
  // namespaceUriPrefixMap: NamespaceURIPrefixMap[];
  // formulaContext: string;
}

interface Version {
  major: number;
  minor: number;
  patch: number;
}
interface Metadata {
  schemaVersion: Version;
  coreEntrypoint: string; // url of taxonomy
  ontologyEntrypoint: string; // url of taxonomy
  generator: string; // name of the formspec generator
  translations: { en: string; nl: string };
}

/*  Uitklapbaar  */
export interface NavigationAbstract {
  label: string;
  expanded: boolean;
  children: (NavigationAbstract | PageAbstract)[];
  type: 'NAVIGATION_ABSTRACT' | 'PAGE_ABSTRACT';
}

/* Link */
export interface PageAbstract {
  label: string;
  type: 'NAVIGATION_ABSTRACT' | 'PAGE_ABSTRACT';
  pageId: string;
}

export interface FormSection {
  name: string | null; // the header
  id: string; // links to the pageId from the Page_Abstract
  type: 'FORMSECTION';
  controls: FormSectionControl[]; // can have multiple levels
  sectionText?: string;
}

export interface FormSectionControl {
  name: null | string;
  id: string;
  type: FormSectionType;
  controls: TableControl[];
}

/* seems to only be FORMSECTION */
export enum FormSectionType {
  Formsection = 'FORMSECTION',
}

export interface TableControl {
  // type: CellTypeEnum;
  type: 'INPUT';
  inputType: 'TABLE';
  table: Table;
}

export interface Table {
  id: string; // bijv urn:kvk:linkrole:document-information
  rows: TableRow[];
  type: 'INPUT';
  tableType?: 'TYPED-DIMENSIONS'; // this might be a form that can add new fields when pressing plus button, for example ondertekening van de jaarrekening
}

export interface TableRow {
  id: string;
  cols?: (HeaderOrEmptyCell | FormCell)[];
  // typedDimension?: TypedDimension;
  // columnOffset?: number;
  // rows?: PurpleRow [];
}

/* this can be different cellTypes, so padding-header, fixed,header with a value and repeat-header and INPUT.*/
export interface HeaderOrEmptyCell {
  cellType: CellTypeEnum;
  value?: string; // if fixed header
}

export enum ColInputType {
  CHOICE = 'CHOICE',
  DATE = 'DATE',
  FLOAT = 'FLOAT',
  GYEAR = 'GYEAR',
  INTEGER = 'INTEGER',
  PERCENTAGE = 'PERCENTAGE',
  TEXT = 'TEXT',
}

export enum CellTypeEnum {
  ASPECT_INPUT_HEADER = 'ASPECT-INPUT-HEADER',
  FIXED_HEADER = 'FIXED-HEADER',
  INPUT = 'INPUT',
  PADDING_CELL = 'PADDING-CELL',
  PADDING_HEADER = 'PADDING-HEADER',
  REPEAT_HEADER = 'REPEAT-HEADER',
}

export interface FormCell {
  cellType: 'INPUT';
  inputType:
    | 'TEXT'
    | 'DATE'
    | 'INTEGER'
    | 'FLOAT'
    | 'CHOICE' // ik denk dropdown button
    | 'PERCENTAGE'
    | 'GYEAR';
  aspects: Aspects;
  mandatory: boolean;
  facets?: {
    // de veldvalidaties
    maxLength?: number;
    minLength?: number;
    enumeration?: string[]; // bij choices dus dropdown buttons
    length?: number; // bijv 8 bij registratienummer KVK
    pattern?: string[]; // regex array, bijv [^@]+@[^@]+ of "[0-9]{1,5}"
    //   "pattern": ["([1-9][0-9]{7})|([0-9][1-9][0-9]{6})"]

    fractionDigits?: number; // bij float
    totalDigits?: number; // bij float
    minInclusive?: string; // met bijv 0,
  };
  choices?: { value: string; label: string }[]; // indien choice dus radio button

  dimensions: []; // geen idee wat dit is

  /* business rules: */
  factID: number; // voor andere alldependentFacts om hieraan te refereren denk ik
  allDependentFacts: number[]; // lijst met alle factID's die betrekking hebben hierop
  formulas?: any; // dit bepaalt validaties in betrekking met andere velden denk ik
}

interface Formula {
  assertions: [];
  assignment: unknown;
}

interface Aspects {
  period?: any;
  concept: { localPart: string };
}

export interface Draft {
  id: string;
  title: string; // Titel/naam van de aangemaakte jaarrekening
  report: Report;
  entrypoint: string;
  currentStartDate: Date;
  currentEndDate: Date;
  previousStartDate: Date;
  previousEndDate: Date;
  expirationDate: Date;
  created: Date;
  updated: Date;
  duplicable: boolean;
}
