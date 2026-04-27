export interface Question {
  id: number;
  title: string;
  difficulty: string;
  language: string;
  code: string;
  input: string;
  output: string;
  bug_type: string;
  options: string[];
  correct_answer: number;
  points: number;
}

export const questionsData: Question[] = [
  {
    id: 1,
    title: "Assignment vs Comparison",
    difficulty: "Medium",
    language: "C",
    code: `int a = 5;
if(a = 10)
    printf("Yes");
else
    printf("No");`,
    input: "a = 5",
    output: "Yes (prints Yes, not No)",
    bug_type: "ASSIGNMENT_IN_CONDITION",
    options: ["Yes", "No", "Error", "Undefined"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 2,
    title: "Post vs Pre Increment",
    difficulty: "Medium",
    language: "Java",
    code: `int x = 10;
System.out.println(x++);
System.out.println(++x);`,
    input: "x = 10",
    output: "10, 12",
    bug_type: "INCREMENT_ORDER",
    options: ["10 11", "10 12", "11 12", "11 11"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 3,
    title: "List Multiplication",
    difficulty: "Easy",
    language: "Python",
    code: `a = [1,2,3]
print(a*2)`,
    input: "a = [1,2,3]",
    output: "[1,2,3,1,2,3]",
    bug_type: "LIST_REPETITION",
    options: ["[1,2,3,1,2,3]", "Error", "[2,4,6]", "None"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 4,
    title: "Sizeof Integer",
    difficulty: "Medium",
    language: "C",
    code: `printf("%d", sizeof(10));`,
    input: "Integer literal 10",
    output: "4 (typically)",
    bug_type: "SIZEOF_LITERAL",
    options: ["2", "4", "8", "Depends"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 5,
    title: "Null String Length",
    difficulty: "Hard",
    language: "Java",
    code: `String s = null;
System.out.println(s.length());`,
    input: "s = null",
    output: "NullPointerException",
    bug_type: "NULL_POINTER",
    options: ["0", "NullPointerException", "Compile error", "-1"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 6,
    title: "Non-Empty String Boolean",
    difficulty: "Easy",
    language: "Python",
    code: `print(bool("False"))`,
    input: '"False" string',
    output: "True",
    bug_type: "STRING_TRUTHY",
    options: ["False", "True", "Error", "None"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 7,
    title: "Undefined Evaluation Order",
    difficulty: "Hard",
    language: "C",
    code: `int x = 10;
printf("%d %d", x, x++);`,
    input: "x = 10",
    output: "Undefined behavior",
    bug_type: "UNDEFINED_BEHAVIOR",
    options: ["10 11", "11 10", "Undefined behavior", "10 10"],
    correct_answer: 2,
    points: 2
  },
  {
    id: 8,
    title: "Array Out of Bounds",
    difficulty: "Hard",
    language: "Java",
    code: `int[] arr = new int[3];
System.out.println(arr[3]);`,
    input: "arr length = 3",
    output: "Runtime error",
    bug_type: "INDEX_OUT_OF_BOUNDS",
    options: ["0", "Runtime error", "Compile error", "Garbage"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 9,
    title: "Tuple Immutability",
    difficulty: "Medium",
    language: "Python",
    code: `a = (1,2,3)
a[0] = 5`,
    input: "Tuple modification",
    output: "Error",
    bug_type: "IMMUTABLE_MODIFICATION",
    options: ["Works", "Error", "Prints tuple", "None"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 10,
    title: "String Modification",
    difficulty: "Easy",
    language: "C",
    code: `char str[] = "Hello";
str[0] = 'h';
printf("%s", str);`,
    input: "str = 'Hello'",
    output: "hello",
    bug_type: "STRING_MODIFICATION",
    options: ["hello", "Hello", "Error", "Undefined"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 11,
    title: "Division by Zero",
    difficulty: "Medium",
    language: "Java",
    code: `int a = 10/0;`,
    input: "10/0",
    output: "Runtime error",
    bug_type: "ARITHMETIC_EXCEPTION",
    options: ["Compile error", "Runtime error", "0", "Infinity"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 12,
    title: "Floor Division",
    difficulty: "Easy",
    language: "Python",
    code: `print(10//3)`,
    input: "10//3",
    output: "3",
    bug_type: "FLOOR_DIVISION",
    options: ["3", "3.33", "Error", "4"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 13,
    title: "Post Increment Print",
    difficulty: "Easy",
    language: "C",
    code: `int a = 5;
printf("%d", a++);`,
    input: "a = 5",
    output: "5",
    bug_type: "POST_INCREMENT",
    options: ["5", "6", "Error", "Undefined"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 14,
    title: "String Concatenation Order",
    difficulty: "Medium",
    language: "Java",
    code: `System.out.println(5 + 3 + "A");`,
    input: "5 + 3 + 'A'",
    output: "8A",
    bug_type: "TYPE_COERCION",
    options: ["8A", "53A", "A8", "Error"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 15,
    title: "String Integer Addition",
    difficulty: "Medium",
    language: "Python",
    code: `print("2" + 3)`,
    input: '"2" + 3',
    output: "Error",
    bug_type: "TYPE_ERROR",
    options: ["23", "Error", "5", "None"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 16,
    title: "Bit Shift Left",
    difficulty: "Medium",
    language: "C",
    code: `int a = 2;
printf("%d", a<<1);`,
    input: "a = 2, left shift by 1",
    output: "4",
    bug_type: "BIT_SHIFT",
    options: ["2", "4", "1", "Error"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 17,
    title: "Empty If Semicolon",
    difficulty: "Hard",
    language: "Java",
    code: `int x = 5;
if(x > 2);
    System.out.println("Hi");`,
    input: "x = 5",
    output: "Hi",
    bug_type: "EMPTY_STATEMENT",
    options: ["No output", "Hi", "Error", "Depends"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 18,
    title: "List Reversal",
    difficulty: "Easy",
    language: "Python",
    code: `a = [1,2,3]
print(a[::-1])`,
    input: "a = [1,2,3]",
    output: "[3,2,1]",
    bug_type: "SLICE_REVERSAL",
    options: ["[3,2,1]", "Error", "[1,2,3]", "None"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 19,
    title: "Multiple Modifications",
    difficulty: "Hard",
    language: "C",
    code: `int a = 5;
printf("%d", ++a * ++a);`,
    input: "a = 5",
    output: "Undefined",
    bug_type: "UNDEFINED_BEHAVIOR",
    options: ["36", "Undefined", "49", "Error"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 20,
    title: "Mixed Type Concatenation",
    difficulty: "Easy",
    language: "Java",
    code: `System.out.println(10 + 20 + "30");`,
    input: "10 + 20 + '30'",
    output: "3030",
    bug_type: "LEFT_TO_RIGHT_EVAL",
    options: ["3030", "102030", "60", "Error"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 21,
    title: "Exponentiation Right Associative",
    difficulty: "Hard",
    language: "Python",
    code: `print(2**3**2)`,
    input: "2**3**2",
    output: "512",
    bug_type: "RIGHT_ASSOCIATIVE",
    options: ["64", "512", "256", "Error"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 22,
    title: "Wrong Format Specifier",
    difficulty: "Hard",
    language: "C",
    code: `int a = 10;
printf("%f", a);`,
    input: "int with %f",
    output: "Garbage",
    bug_type: "FORMAT_MISMATCH",
    options: ["10", "Error", "Garbage", "10.0"],
    correct_answer: 2,
    points: 2
  },
  {
    id: 23,
    title: "Compound Assignment",
    difficulty: "Medium",
    language: "Java",
    code: `int x = 10;
System.out.println(x += 5 * 2);`,
    input: "x = 10, x += 5 * 2",
    output: "20",
    bug_type: "COMPOUND_ASSIGNMENT",
    options: ["20", "30", "15", "Error"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 24,
    title: "String to List",
    difficulty: "Easy",
    language: "Python",
    code: `print(list("abc"))`,
    input: '"abc"',
    output: "['a','b','c']",
    bug_type: "STRING_ITERATION",
    options: ["['abc']", "['a','b','c']", "Error", "None"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 25,
    title: "Zero Falsy",
    difficulty: "Easy",
    language: "C",
    code: `int a = 0;
if(a)
    printf("Yes");
else
    printf("No");`,
    input: "a = 0",
    output: "No",
    bug_type: "ZERO_FALSY",
    options: ["Yes", "No", "Error", "Undefined"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 26,
    title: "String Immutability",
    difficulty: "Medium",
    language: "Java",
    code: `String s = "abc";
s.concat("def");
System.out.println(s);`,
    input: 's = "abc"',
    output: "abc",
    bug_type: "IMMUTABLE_STRING",
    options: ["abcdef", "abc", "Error", "null"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 27,
    title: "List Reference Copy",
    difficulty: "Hard",
    language: "Python",
    code: `a = [1,2]
b = a
b.append(3)
print(a)`,
    input: "a = [1,2], b = a",
    output: "[1,2,3]",
    bug_type: "REFERENCE_COPY",
    options: ["[1,2]", "[1,2,3]", "Error", "None"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 28,
    title: "Ternary Operator",
    difficulty: "Easy",
    language: "C",
    code: `int x = 5;
printf("%d", x == 5 ? 100 : 200);`,
    input: "x = 5",
    output: "100",
    bug_type: "TERNARY",
    options: ["100", "200", "Error", "Undefined"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 29,
    title: "Ternary Type Mismatch",
    difficulty: "Hard",
    language: "Java",
    code: `int x = 5;
System.out.println(x == 5 ? "Yes" : 10);`,
    input: "Ternary with different types",
    output: "Error",
    bug_type: "TYPE_MISMATCH",
    options: ["Yes", "10", "Error", "null"],
    correct_answer: 2,
    points: 2
  },
  {
    id: 30,
    title: "Type Comparison",
    difficulty: "Easy",
    language: "Python",
    code: `print(type([]) == list)`,
    input: "type([]) == list",
    output: "True",
    bug_type: "TYPE_CHECK",
    options: ["True", "False", "Error", "None"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 31,
    title: "Complex Post Increment",
    difficulty: "Hard",
    language: "C",
    code: `int a = 5;
printf("%d", a+++a);`,
    input: "a = 5, a+++a",
    output: "Undefined",
    bug_type: "UNDEFINED_BEHAVIOR",
    options: ["10", "11", "Error", "Undefined"],
    correct_answer: 3,
    points: 2
  },
  {
    id: 32,
    title: "Integer Division Java",
    difficulty: "Easy",
    language: "Java",
    code: `System.out.println(10/3);`,
    input: "10/3",
    output: "3",
    bug_type: "INTEGER_DIVISION",
    options: ["3", "3.33", "Error", "4"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 33,
    title: "Float Precision",
    difficulty: "Hard",
    language: "Python",
    code: `print(0.1 + 0.2 == 0.3)`,
    input: "0.1 + 0.2",
    output: "False",
    bug_type: "FLOAT_PRECISION",
    options: ["True", "False", "Error", "None"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 34,
    title: "Unsigned Conversion",
    difficulty: "Hard",
    language: "C",
    code: `int a = -1;
printf("%u", a);`,
    input: "a = -1 as unsigned",
    output: "Large positive number",
    bug_type: "UNSIGNED_WRAP",
    options: ["-1", "Large positive number", "Error", "0"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 35,
    title: "Integer Object Comparison",
    difficulty: "Hard",
    language: "Java",
    code: `Integer a = 1000;
Integer b = 1000;
System.out.println(a == b);`,
    input: "Integer objects 1000",
    output: "false",
    bug_type: "OBJECT_COMPARISON",
    options: ["true", "false", "error", "null"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 36,
    title: "String Index Error",
    difficulty: "Medium",
    language: "Python",
    code: `a = "hello"
print(a[5])`,
    input: "String length 5, index 5",
    output: "Error",
    bug_type: "INDEX_ERROR",
    options: ["o", "Error", "None", "''"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 37,
    title: "Array Overflow C",
    difficulty: "Hard",
    language: "C",
    code: `int arr[3] = {1,2,3};
printf("%d", arr[5]);`,
    input: "Array size 3, index 5",
    output: "Garbage",
    bug_type: "BUFFER_OVERFLOW",
    options: ["Error", "Garbage", "0", "3"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 38,
    title: "Pre and Post Mix",
    difficulty: "Medium",
    language: "Java",
    code: `int x = 5;
System.out.println(x+++x);`,
    input: "x = 5, x+++x",
    output: "11",
    bug_type: "INCREMENT_PARSE",
    options: ["10", "11", "Error", "Undefined"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 39,
    title: "String Repetition",
    difficulty: "Easy",
    language: "Python",
    code: `print("a" * 3)`,
    input: '"a" * 3',
    output: "aaa",
    bug_type: "STRING_MULTIPLICATION",
    options: ["aaa", "Error", "a3", "None"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 40,
    title: "Printf Return Value",
    difficulty: "Hard",
    language: "C",
    code: `printf("%d", printf("Hi"));`,
    input: 'printf returns character count',
    output: "Hi2",
    bug_type: "PRINTF_RETURN",
    options: ["Hi2", "Hi", "2Hi", "Error"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 41,
    title: "Char ASCII Addition",
    difficulty: "Medium",
    language: "Java",
    code: `System.out.println('A' + 1);`,
    input: "'A' + 1",
    output: "66",
    bug_type: "CHAR_ARITHMETIC",
    options: ["A1", "66", "B", "Error"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 42,
    title: "Set Indexing",
    difficulty: "Medium",
    language: "Python",
    code: `a = {1,2,3}
print(a[0])`,
    input: "Set indexing",
    output: "Error",
    bug_type: "SET_NO_INDEX",
    options: ["1", "Error", "None", "0"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 43,
    title: "Logical AND Short Circuit",
    difficulty: "Easy",
    language: "C",
    code: `int a = 10;
if(a > 5 && a < 8)
    printf("Yes");
else
    printf("No");`,
    input: "a = 10",
    output: "No",
    bug_type: "LOGICAL_AND",
    options: ["Yes", "No", "Error", "Undefined"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 44,
    title: "String charAt Bounds",
    difficulty: "Medium",
    language: "Java",
    code: `String s = "hello";
System.out.println(s.charAt(5));`,
    input: "String length 5, charAt(5)",
    output: "Error",
    bug_type: "STRING_INDEX_OUT_OF_BOUNDS",
    options: ["o", "Error", "null", "h"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 45,
    title: "Set Duplicates Removed",
    difficulty: "Easy",
    language: "Python",
    code: `print(len({1,1,2,2}))`,
    input: "{1,1,2,2}",
    output: "2",
    bug_type: "SET_UNIQUENESS",
    options: ["4", "2", "Error", "0"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 46,
    title: "While Decrement",
    difficulty: "Medium",
    language: "C",
    code: `int a = 5;
while(a--)
    printf("%d ", a);`,
    input: "a = 5, while(a--)",
    output: "4 3 2 1 0",
    bug_type: "POST_DECREMENT_LOOP",
    options: ["5 4 3 2 1", "4 3 2 1 0", "Infinite", "Error"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 47,
    title: "Division By Zero Float",
    difficulty: "Medium",
    language: "Java",
    code: `int x = 0;
System.out.println(10/x);`,
    input: "10/0",
    output: "Error",
    bug_type: "ARITHMETIC_EXCEPTION",
    options: ["0", "Error", "Infinity", "NaN"],
    correct_answer: 1,
    points: 2
  },
  {
    id: 48,
    title: "List Comprehension",
    difficulty: "Easy",
    language: "Python",
    code: `print([i for i in range(3)])`,
    input: "range(3)",
    output: "[0,1,2]",
    bug_type: "LIST_COMPREHENSION",
    options: ["[0,1,2]", "[1,2,3]", "Error", "None"],
    correct_answer: 0,
    points: 2
  },
  {
    id: 49,
    title: "Double Decrement",
    difficulty: "Hard",
    language: "C",
    code: `int a = 10;
printf("%d", a-- - --a);`,
    input: "a = 10, a-- - --a",
    output: "Undefined",
    bug_type: "UNDEFINED_BEHAVIOR",
    options: ["1", "2", "Undefined", "0"],
    correct_answer: 2,
    points: 2
  },
  {
    id: 50,
    title: "Boolean Assignment in If",
    difficulty: "Medium",
    language: "Java",
    code: `boolean b = false;
if(b = true)
    System.out.println("Yes");`,
    input: "b = false, if(b = true)",
    output: "Yes",
    bug_type: "ASSIGNMENT_IN_CONDITION",
    options: ["Yes", "No", "Error", "Nothing"],
    correct_answer: 0,
    points: 2
  }
];
