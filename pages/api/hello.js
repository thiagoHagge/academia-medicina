import api from "../../src/api";

export default function Api({pages}) {
  res.json(pages)
}
export async function getStaticProps(context) {
  return await api.get('/getPages').then(res => {
  if (res.data.success) {
    return {
      props: {
        pages: response.data.pages,
      },
      revalidate: 10
    }
  } 
});
}