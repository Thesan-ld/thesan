import type { SanityCodegenConfig } from 'sanity-codegen'

const config: SanityCodegenConfig = {
    schemaPath: './studio/schemas/index.ts',
    outputPath: './src/lib/sanitySchema.ts',
}

export default config