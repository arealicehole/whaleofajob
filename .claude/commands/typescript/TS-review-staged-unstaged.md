# TS Review Staged Unstaged

Reviews staged and unstaged TypeScript changes with type safety and impact analysis.

## Usage
`/TS-review-staged-unstaged [review-depth] [type-impact] [compatibility-check]`

## Arguments
- `review-depth`: Depth of review (surface/deep/comprehensive)
- `type-impact`: Type impact analysis level (basic/detailed/full)
- `compatibility-check`: Check compatibility with existing code (yes/no)

## Description
This command reviews both staged and unstaged TypeScript changes, analyzing type safety implications, compatibility with existing code, and potential breaking changes. It provides comprehensive feedback before committing TypeScript changes.

## What it does
1. **Change Analysis**: Analyzes all TypeScript changes in staged and unstaged files
2. **Type Impact Assessment**: Evaluates how changes affect type definitions and safety
3. **Compatibility Review**: Checks compatibility with existing TypeScript code
4. **Breaking Change Detection**: Identifies potential breaking changes and their impact
5. **Quality Recommendations**: Provides specific recommendations for improving the changes

## Example
```
/TS-review-staged-unstaged "deep" "detailed" "yes"
```

This will perform a deep review of staged and unstaged TypeScript changes with detailed type impact analysis and compatibility checking.