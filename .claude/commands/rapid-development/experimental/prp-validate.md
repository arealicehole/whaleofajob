# PRP Validate

Validates PRP quality, completeness, and executability before implementation.

## Usage
`/prp-validate [prp-file] [validation-level] [output-format]`

## Arguments
- `prp-file`: Path to the PRP file to validate
- `validation-level`: Validation depth (quick/thorough/comprehensive)
- `output-format`: Output format (summary/detailed/checklist)

## Description
This command performs comprehensive validation of PRPs to ensure they meet quality standards and are ready for successful execution. It checks for completeness, clarity, executability, and adherence to PRP best practices.

## What it does
1. **Structure Validation**: Validates that the PRP follows the required template structure
2. **Content Completeness**: Checks that all required sections are complete and detailed
3. **Context Analysis**: Validates that sufficient context is provided for implementation
4. **Validation Loop Check**: Ensures executable validation commands are present and testable
5. **Quality Assessment**: Assesses overall PRP quality against best practices

## Example
```
/prp-validate "PRPs/api-redesign.md" "thorough" "detailed"
```

This will perform a thorough validation of the API redesign PRP and provide detailed feedback on any issues or improvements needed.