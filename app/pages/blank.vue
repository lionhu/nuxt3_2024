<script lang="ts" setup>
definePageMeta({ layout: 'page' })
useHead({ title: 'Blank Page' })
const { search } = useMeilisearch()

const { hits, nbHits } = await search('user', 'hu')
// console.log('hits', hits)

const key = 'system'
const role = 'public'
export interface Setting {
  [key: string]: any
}

const querySettings = `
  query getSetting($rolename: StringFilterInput!, $key: StringFilterInput!) {
    settings(filters: { role: $rolename, key: $key }) {
      data {
        attributes {
          key
          setting
        }
      }
    }
  }
`

const graphql = useStrapiGraphQL()
const variable = {
  rolename: {
    eq: role,
  },
  key: {
    eq: key,
  },
}
await graphql<{
  data: { settings: Array<Setting> }
}>(querySettings, variable)
  .then((response: any) => {
    const { data } = response
    console.log('data', data)
  })
  .catch((_error) => {
    console.log('_error', _error)
  })
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageHeader>
      <LayoutPageTitle text="Blank Page" class="capitalize" />
    </LayoutPageHeader>
    <LayoutPageSection>
      <h1>{{ $t('title') }}</h1>
    </LayoutPageSection>
    <LayoutPageSection>
      <LayoutPageSectionTitle text="Section Title" />
      <div>My Content</div>
    </LayoutPageSection>
    <LayoutPageSection>
      <LayoutPageSectionTitle text="Another Section" />
      <div>My Content</div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
