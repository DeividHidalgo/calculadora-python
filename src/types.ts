export type Operator = '+' | '-' | '*' | '/';

export interface CalculationItem {
  id: string;
  num1: number;
  operator: Operator;
  num2: number;
  result: number | string;
  isError?: boolean;
  expression: string;
  functionName: string;
  codeCall: string;
  timestamp: Date;
  explanation: string;
  pythonSnippet: string;
}

export interface ProgrammingConcept {
  id: string;
  title: string;
  shortDesc: string;
  analogy: string;
  pythonExample: string;
  breakdown: string[];
}
