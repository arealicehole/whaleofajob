# TS Review General

Performs comprehensive TypeScript code review with type safety and best practices analysis.

## Usage
`/TS-review-general [scope] [focus-areas] [strictness-level]`

## Arguments
- `scope`: Review scope (file/directory/project)
- `focus-areas`: Specific areas to focus on (types/patterns/performance/security)
- `strictness-level`: Review strictness (standard/pedantic/enterprise)

## Description
This command performs thorough TypeScript code review, analyzing type safety, modern patterns, performance implications, and adherence to TypeScript best practices. It provides actionable feedback for improving TypeScript code quality.

## What it does
1. **Type Safety Analysis**: Reviews type definitions, usage, and safety measures
2. **Pattern Review**: Analyzes usage of modern TypeScript patterns and features
3. **Performance Assessment**: Reviews performance implications of TypeScript patterns
4. **Best Practices Check**: Validates adherence to TypeScript and framework best practices
5. **Improvement Recommendations**: Provides specific, actionable improvement suggestions

## Example
```
/TS-review-general "src/" "types,patterns" "pedantic"
```

This will perform a pedantic review of the src directory focusing on types and patterns with detailed feedback.