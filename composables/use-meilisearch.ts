import { storeToRefs } from 'pinia'

export interface MilisearchResponse {
  hits: any[]
  nbHits: number
  [key: string]: any
}
export const useMeilisearch = () => {
  // watch(_keyword, (value) => {
  //   search()
  // })
  async function search(index: string, keyword: string): Promise<any> {
    try {
      const client = useStrapiClient()
      const { hits, nbHits } = await client<MilisearchResponse>(
        '/meilisearch/by_keyword',
        {
          method: 'GET',
          params: { index, keyword },
        },
      )
      return { hits, nbHits }
    } catch (error) {
      console.log('milisearch error', error)
    }
  }

  return {
    search,
  }
}
