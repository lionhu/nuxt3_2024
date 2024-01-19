export const querySettings = `
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
