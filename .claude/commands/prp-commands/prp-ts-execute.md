# PRP TS Execute

Executes TypeScript PRPs with comprehensive type checking and TS-specific validation.

## Usage
`/prp-ts-execute [prp-file] [strict-level] [validation-mode]`

## Arguments
- `prp-file`: Path to the TypeScript PRP file
- `strict-level`: TypeScript strictness level (standard/strict/ultra-strict)
- `validation-mode`: Validation approach (continuous/milestone/final)

## Description
This command executes TypeScript-specific PRPs with comprehensive type checking, compilation validation, and TypeScript ecosystem integration. It ensures type safety and adherence to TypeScript best practices throughout implementation.

## What it does
1. **PRP Validation**: Validates the TypeScript PRP for completeness and executability
2. **Type Environment Setup**: Configures optimal TypeScript development environment
3. **Incremental Implementation**: Implements with continuous type checking and validation
4. **Compilation Monitoring**: Monitors TypeScript compilation throughout implementation
5. **Quality Assurance**: Ensures adherence to TypeScript quality standards

## Example
```
/prp-ts-execute "PRPs/ts-api-client.md" "strict" "continuous"
```

This will execute the TypeScript API client PRP with strict type checking and continuous validation throughout the implementation process.