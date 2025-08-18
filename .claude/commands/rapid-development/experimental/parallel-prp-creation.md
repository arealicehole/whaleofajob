# Parallel PRP Creation

Creates multiple PRPs simultaneously for complex projects with interdependent components.

## Usage
`/parallel-prp-creation [project-name] [components] [dependencies]`

## Arguments
- `project-name`: Name of the overall project
- `components`: List of components/features to create PRPs for
- `dependencies`: Known dependencies between components

## Description
This command creates multiple related PRPs in parallel, ensuring consistency and proper dependency management across all components. Ideal for large projects that can be broken down into parallel development streams.

## What it does
1. **Component Analysis**: Analyzes the project to identify optimal component breakdown
2. **Dependency Mapping**: Maps dependencies and integration points between components
3. **Parallel PRP Generation**: Creates multiple PRPs simultaneously with consistent patterns
4. **Integration Planning**: Ensures all PRPs include proper integration and testing strategies
5. **Consistency Validation**: Validates that all PRPs use consistent patterns and interfaces

## Example
```
/parallel-prp-creation "e-commerce-platform" "user-auth,product-catalog,shopping-cart,payment-processing" "auth->cart,catalog->cart,cart->payment"
```

This will create PRPs for all four components of an e-commerce platform, ensuring proper dependency management and integration planning.