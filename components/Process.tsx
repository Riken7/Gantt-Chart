export function Process({ 
    id,
    AT,
    BT,
    CT,
    ST
  }: {
    id: string,
    AT: string,
    BT: string,
    CT: string,
    ST: string
  }) {
      return <div>
        <div className="">{"P"+id}</div>
      </div>
    }