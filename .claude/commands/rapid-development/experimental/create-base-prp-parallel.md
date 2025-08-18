# Create Base PRP (Parallel)

Creates a comprehensive Product Requirement Prompt (PRP) using parallel research and analysis.

## Usage
`/create-base-prp-parallel [feature-name] [priority] [context]`

## Arguments
- `feature-name`: Name/identifier for the feature or capability
- `priority`: Priority level (P0/P1/P2/P3)
- `context`: Additional context about the feature requirements

## Description
This command creates a comprehensive PRP by running parallel research streams to gather context, analyze requirements, and generate implementation blueprints. It's optimized for rapid development cycles where time-to-implementation is critical.

## What it does
1. **Parallel Context Gathering**: Simultaneously researches codebase patterns, documentation, and similar implementations
2. **Requirements Analysis**: Analyzes user needs, technical constraints, and business value in parallel
3. **Implementation Planning**: Creates detailed blueprint with validation loops
4. **Template Generation**: Produces a complete PRP ready for execution

## Example
```
/create-base-prp-parallel user-authentication P1 "OAuth2 integration with role-based access control"
```

This will create a comprehensive PRP for user authentication with OAuth2, including all necessary context, implementation details, and validation steps.