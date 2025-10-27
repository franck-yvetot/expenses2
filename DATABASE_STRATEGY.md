# Database Strategy - Schema vs Table Prefix

## Recommended Approach: PostgreSQL Schema ✅

### What is a PostgreSQL Schema?
A schema is a namespace that contains database objects (tables, views, functions, etc.). It's the proper way to organize and isolate tables in PostgreSQL.

### Benefits of Using a Schema
1. **Clean Separation** - No naming conflicts with other applications
2. **Better Organization** - Logical grouping of related tables
3. **Security** - Easier to manage permissions per schema
4. **Professional** - Industry standard approach
5. **Scalable** - Can have multiple apps/versions in same database
6. **No Prefix Clutter** - Tables keep clean names

### Implementation

#### Schema Name: `expenses`
```sql
-- Create the schema
CREATE SCHEMA IF NOT EXISTS expenses;

-- Tables will be:
expenses.expense_reports
expenses.expenses
expenses.attachments
```

#### Alternative: Version-specific Schema
```sql
-- If you want version isolation
CREATE SCHEMA IF NOT EXISTS expenses_v2;

-- Tables:
expenses_v2.expense_reports
expenses_v2.expenses
expenses_v2.attachments
```

### TypeORM Configuration

```typescript
// Entity decorator with schema
@Entity('expense_reports', { schema: 'expenses' })
export class ExpenseReport {
  // ...
}

@Entity('expenses', { schema: 'expenses' })
export class Expense {
  // ...
}

@Entity('attachments', { schema: 'expenses' })
export class Attachment {
  // ...
}
```

### Database Connection Configuration

```typescript
// apps/backend/src/config/database.config.ts
TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get('DATABASE_URL'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
    logging: configService.get('DB_LOGGING') === 'true',
    schema: 'expenses', // Default schema for all entities
    ssl: {
      rejectUnauthorized: false,
    },
  }),
})
```

### Migration Example

```typescript
// Create schema migration
export class CreateExpensesSchema1698000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('expenses', true); // true = IF NOT EXISTS
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('expenses', true); // true = CASCADE
  }
}

// Create tables migration (will use schema from entity decorator)
export class CreateExpenseTables1698000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expenses.expense_reports',
        columns: [
          // ... columns
        ],
      }),
    );
  }
}
```

---

## Alternative: Table Prefix Approach

If you prefer table prefixes instead of schemas:

### With Prefix: `v2_`

```typescript
@Entity('v2_expense_reports')
export class ExpenseReport {
  // ...
}

@Entity('v2_expenses')
export class Expense {
  // ...
}

@Entity('v2_attachments')
export class Attachment {
  // ...
}
```

### Resulting Tables:
- `v2_expense_reports`
- `v2_expenses`
- `v2_attachments`

### Pros:
- Simple to implement
- Works with any database
- No schema management needed

### Cons:
- Clutters table names
- Less organized
- Harder to manage permissions
- Not the PostgreSQL best practice

---

## Recommendation

**Use the Schema Approach** for the following reasons:

1. **Professional Standard** - Schemas are the proper way to namespace in PostgreSQL
2. **Cleaner Code** - Tables keep their logical names
3. **Better Isolation** - Complete separation from other apps
4. **Future-Proof** - Easier to add new versions or applications
5. **Permissions** - Can grant access to entire schema easily

### Suggested Schema Name: `expenses`

Simple, clear, and descriptive. If you want version-specific isolation, use `expenses_v2`.

### Environment Variable

Add to `.env`:
```env
DB_SCHEMA=expenses
# or
DB_SCHEMA=expenses_v2
```

Then use in TypeORM config:
```typescript
schema: configService.get('DB_SCHEMA', 'expenses'),
```

---

## Decision Matrix

| Aspect | Schema Approach | Prefix Approach |
|--------|----------------|-----------------|
| Organization | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good |
| Isolation | ⭐⭐⭐⭐⭐ Complete | ⭐⭐⭐ Partial |
| Permissions | ⭐⭐⭐⭐⭐ Easy | ⭐⭐ Complex |
| Code Cleanliness | ⭐⭐⭐⭐⭐ Clean | ⭐⭐⭐ Cluttered |
| Setup Complexity | ⭐⭐⭐⭐ Simple | ⭐⭐⭐⭐⭐ Very Simple |
| PostgreSQL Standard | ⭐⭐⭐⭐⭐ Yes | ⭐⭐ No |
| Multi-Database | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Good |

**Winner**: Schema Approach ✅

---

## Implementation Steps

### Option 1: Schema Approach (Recommended)

1. Create schema migration
2. Add schema to all entity decorators: `@Entity('table_name', { schema: 'expenses' })`
3. Add schema to TypeORM config
4. Run migrations
5. Done!

### Option 2: Prefix Approach (If you prefer)

1. Update all entity decorators: `@Entity('v2_table_name')`
2. Run migrations
3. Done!

---

## Which Should We Use?

I recommend **Schema: `expenses`** for this project because:
- ✅ Professional and maintainable
- ✅ Easy to isolate from other applications
- ✅ PostgreSQL best practice
- ✅ Clean table names in code
- ✅ Better for future growth

But if you prefer the prefix approach for simplicity, we can use `v2_` prefix instead.

**What's your preference?**