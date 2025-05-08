import { type SchemaTypeDefinition } from 'sanity'

import { Author } from '@/sanity/schemaTypes/author'
import { Startup } from '@/sanity/schemaTypes/startup'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [Author, Startup],
}
